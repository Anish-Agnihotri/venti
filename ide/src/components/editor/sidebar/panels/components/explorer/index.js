import React from 'react';
import './index.css';
import Store from '../../../../../../stores/files';
import Modal from 'react-responsive-modal';

import CreateFile from './modals/CreateFile';

// TODO: Fix open on click

class Explorer extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false,
			modalContent: 0
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalOpen: true})
	}

	closeModal() {
		this.setState({ modalOpen: false, modalContent: 0 })
	}
	renderModal() {
		if (this.state.modalContent === 0) {
			return <CreateFile closeModal={this.closeModal}/>
		}
	}
	render() {
		let store = this.props.store;
		return(
			<div>
				<div className="explorer">
					{store.get('files').map(function(d, idx) {
						return <ExplorerItem key={idx} position={idx} name={d.name} store={store} isShown={d.shown}/>
					})}
				</div>
				<CreateFileButton onClick={this.openModal}/>
				<Modal 
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "explorer-modal-overlay",
						modal: "explorer-modal"
					}}
					center
				>
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
	selectItem() {
		this.props.store.get('files')[this.props.position]["shown"] = true;
		this.props.store.set('files')(this.props.store.get('files'))

		this.props.store.get('tabMgmt')[0] = this.props.position
		this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
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
