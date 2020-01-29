import React from 'react';
import Modal from 'react-responsive-modal';

// Split layout
import Sidebar from '../../components/editor/sidebar';
import Code from '../../components/editor/code';

// Initial modal
import InitModal from '../../components/editor/sidebar/panels/components/explorer/modals/InitModal';

// Additional modals
import CreateFile from '../../components/editor/sidebar/panels/components/explorer/modals/CreateFile'
import UploadFile from '../../components/editor/sidebar/panels/components/explorer/modals/UploadFile'

class Editor extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: true,
			modalContent: 0
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.renderModal = this.renderModal.bind(this);
	}

	// Open specific modal
	openModal(num) {
		this.setState({ modalOpen: true, modalContent: num })
	}

	// Close modal
	closeModal(num) {
		this.setState({ modalOpen: false })
	}
	
	// Render appropriate modal
	renderModal() {
		if (this.state.modalContent === 0) {
			return <InitModal closeModal={this.closeModal} openModal={this.openModal}/>
		} else if (this.state.modalContent === 1) {
			return <CreateFile closeModal={this.closeModal}/>
		} else if (this.state.modalContent === 2) {
			return <UploadFile closeModal={this.closeModal}/>
		}
	}

	render() {
		return(
			<>
				<div className="layout">
					<Sidebar />
					<Code />
				</div>
				<Modal
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "init-modal-overlay",
						modal: this.state.modalContent === 0 ? "init-modal" : "explorer-modal"
					}}
					center
				>
					{this.renderModal()}
				</Modal>
			</>
		);
	}
}

export default Editor;
