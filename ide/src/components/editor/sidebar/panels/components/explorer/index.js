import React from 'react';
import './index.css';
import Store from '../../../../../../stores/files';
import Modal from 'react-responsive-modal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

// Import modals
import CreateFile from './modals/CreateFile';
import UploadFile from './modals/UploadFile';
import GistSaveAll from './modals/GistSaveAll';
import DeleteFile from './modals/DeleteFile';

// TODO: Fix open on click

class Explorer extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false, // Default position of modal opened to false
			modalContent: 0 // Default dynamically rendered modal content to 0,
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.duplicateFile = this.duplicateFile.bind(this);
	}

	// Open modal
	openModal(num) {
		this.setState({ modalOpen: true, modalContent: num })
	}

	// Close modal
	closeModal() {
		this.setState({ modalOpen: false })
	}

	// Dynamically render modal content
	renderModal() {
		if (this.state.modalContent === 0) {
			return <CreateFile closeModal={this.closeModal}/>
		} else if (this.state.modalContent === 1) {
			return <UploadFile closeModal={this.closeModal}/>
		} else if (this.state.modalContent === 2) {
			return <GistSaveAll closeModal={this.closeModal}/>
		} else if (this.state.modalContent === 3) {
			return <DeleteFile closeModal={this.closeModal} fileToDelete={this.state.fileToDelete}/>
		}
	}

	// Handle right-click menu clicks;
	handleClick(e, data) {
		if (data.action === 'Rename') {

		} else if (data.action === 'Delete') {
			this.setState({ fileToDelete: data.name })
			this.openModal(3)
		} else if (data.action === 'Duplicate') {
			this.duplicateFile(data.name)
		}
	}

	// Duplicate file (check for name first)
	duplicateFile(name) {
		let occurences = 0
		let copyIndex = 0

		for (let i = 0; i < this.props.store.get('files').length; i++) {
			if (this.props.store.get('files')[i]["name"].includes(name.slice(0, -4))) {
				occurences++
			} else if (this.props.store.get('files')[i]["name"] === name) {
				copyIndex = i
			}
		}

		this.props.store.get('files').push({"name": `${name.slice(0, -4)}-${occurences}.sol`, "code": this.props.store.get('files')[copyIndex]["code"], "shown": true})
		this.props.store.set('files')(this.props.store.get('files'))

		this.props.store.get('tabMgmt')[0] += 1
		this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
	}

	render() {
		let store = this.props.store; // Setup easy access to store

		return(
			<div className="browser-container">
				<div className="explorer">
					{/* For each file in files, render an ExplorerItem */}
					{store.get('files').map(function(d, idx) {
						return (
							<ExplorerItem key={idx} position={idx} name={d.name} store={store} isShown={d.shown} delete={() => this.openModal()}/>
						)
					})}
				</div>
				{/* Create File Button */}
				<div className="explorer-bottom">
					<CreateFileButton onClick={() => this.openModal(0)}/>
					<LocalFileButton onClick={() => this.openModal(1)}/>
					<SaveAllGistButton onClick={() => this.openModal(2)}/>
				</div>
				{/* Render modal */}
				<Modal 
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "explorer-modal-overlay",
						modal: "explorer-modal"
					}}
					center
				>
					{/* Dynamically render modal content */}
					{this.renderModal()}
				</Modal>
				<ContextMenu id="explorer-menu">
					<MenuItem data={{ action: 'Rename' }} onClick={this.handleClick}>Rename</MenuItem>
					<MenuItem data={{ action: 'Duplicate' }} onClick={this.handleClick}>Duplicate</MenuItem>
					<MenuItem data={{ action: 'Download' }} onClick={this.handleClick}>Download</MenuItem>
					<MenuItem data={{ action: 'Delete' }} onClick={this.handleClick}>Delete</MenuItem>
				</ContextMenu>
			</div>
		)
	}
}

class ExplorerItem extends React.Component {
	constructor() {
		super();

		this.selectItem = this.selectItem.bind(this);
	}

	// selectItem functionality
	selectItem() {
		// Basic declerations
		let store = this.props.store
		let itemPosition = this.props.position

		// If not already shown
		if (store.get('files')[itemPosition]["shown"] === false) {
			
			// Set current item to shown, rendering its tab instantly.
			store.get('files')[itemPosition]["shown"] = true;
			store.set('files')(store.get('files'))
			
			// Filter through all tabs that show, find position, and set it to current index.
			var tempFilter = store.get('files').filter(function(item) {
				return !item["shown"] === false
			})

			// FIXME: Matching by name breaks if files have identical names.
			// Find name of this item in new filtered array, tab position, and set to focus.
			store.get('tabMgmt')[0] = tempFilter.findIndex(x => x.name === this.props.name);
			store.set('tabMgmt')(store.get('tabMgmt'))
		} else { // If already shown
			var tempFilterTwo = store.get('files').filter(function(item) {
				return !item["shown"] === false
			})

			store.get('tabMgmt')[0] = tempFilterTwo.findIndex(x => x.name === this.props.name);
			store.set('tabMgmt')(store.get('tabMgmt'))
		}
	}

	render(props) {
		function collect(props) {
			return { name: props.name };
		}
		return(
			<ContextMenuTrigger id="explorer-menu" name={this.props.name} collect={collect}>
				<div className="explorer-item" onClick={this.selectItem}>
					<div>
						<span><span className="truncateable">{this.props.name}</span><span className="explorer-item-status">{this.props.isShown ? ' (open)' : ''}</span></span>
					</div>
				</div>
			</ContextMenuTrigger>
		);
	}
}

class CreateFileButton extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick} className="button-blue">
				<span>Create new file</span>
			</button>
		)
	}
}

class LocalFileButton extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick} className="button-blue">
				<span>Upload file</span>
			</button>
		)
	}
}

class SaveAllGistButton extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick} className="button-blue">
				<span>Gist save files</span>
			</button>
		)
	}
}

export default Store.withStore(Explorer);
