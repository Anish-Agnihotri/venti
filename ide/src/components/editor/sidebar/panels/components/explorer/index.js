import React from 'react';
import './index.css';
import Store from '../../../../../../stores/files';
import Modal from 'react-responsive-modal';

// Import modals
import CreateFile from './modals/CreateFile';

// TODO: Fix open on click

class Explorer extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false, // Default position of modal opened to false
			modalContent: 0 // Default dynamically rendered modal content to 0
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	// Open modal
	openModal() {
		this.setState({ modalOpen: true})
	}

	// Close modal
	closeModal() {
		this.setState({ modalOpen: false, modalContent: 0 })
	}

	// Dynamically render modal content
	renderModal() {
		if (this.state.modalContent === 0) {
			return <CreateFile closeModal={this.closeModal}/>
		}
	}
	render() {
		let store = this.props.store; // Setup easy access to store

		return(
			<div>
				<div className="explorer">
					{/* For each file in files, render an ExplorerItem */}
					{store.get('files').map(function(d, idx) {
						return <ExplorerItem key={idx} position={idx} name={d.name} store={store} isShown={d.shown}/>
					})}
				</div>
				{/* Create File Button */}
				<CreateFileButton onClick={this.openModal}/>
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
			</div>
		)
	}
}

class ExplorerItem extends React.Component {
	constructor() {
		super();

		this.selectItem = this.selectItem.bind(this);
	}
	// selectItem changes shown to true, and changes the tab focus
	selectItem() {
		let store = this.props.store
		let itemPosition = this.props.position

		// Set item to shown
		store.get('files')[itemPosition]["shown"] = true;
		store.set('files')(store.get('files'))

		// Change tab position globally to selected item
		store.get('tabMgmt')[0] = itemPosition
		store.set('tabMgmt')(store.get('tabMgmt'))
	}
	render(props) {
		return(
			<div className="explorer-item" onClick={this.selectItem}>
				<div>
					<span>{this.props.name}<span className="explorer-item-status">{this.props.isShown ? ' (open)' : ''}</span></span>
				</div>
				<div>
					<button><i className="fa fa-trash"></i></button>
					<button><i className="fa fa-save"></i></button>
				</div>
			</div>
		);
	}
}

class CreateFileButton extends React.Component {
	render() {
		return(
			<button onClick={this.props.onClick} className="button-blue create-file-button">
				<span>Create new file</span>
			</button>
		)
	}
}

export default Store.withStore(Explorer);
