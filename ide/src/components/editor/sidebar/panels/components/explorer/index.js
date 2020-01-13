import React from 'react';
import './index.css';
import Store from '../../../../../../stores/files';
import Modal from 'react-responsive-modal';

import CreateFile from './modals/CreateFile';

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
						return <ExplorerItem key={idx} position={idx} name={d.name} store={store}/>
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
	render(props) {
		return(
			<div className="explorer-item">
				<div>
					<span>{this.props.name}</span>
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
