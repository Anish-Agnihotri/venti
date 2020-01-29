import React from 'react';
import GitHubButton from 'react-github-btn';
import Store from '../../../../../../../stores/files';
import logo from './large-logo.png';
import './modal.css';

class InitModal extends React.Component {
	constructor() {
		super();

		this.modalOperation = this.modalOperation.bind(this);
	}

	modalOperation(num) {
		this.props.closeModal()
		this.props.openModal(num)
	}
	render() {
		return(
			<div className='init-modal-outer'>
				<div className="init-modal-top">
					<img src={logo} alt="Venti logo"/>
					<p>The <i>hip</i> browser-only Ethereum IDE and runtime environment.</p>
					<div className="github-star-container">
						<GitHubButton href="https://github.com/Anish-Agnihotri/venti" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-show-count="true" aria-label="Star Anish-Agnihotri/venti on GitHub">Star</GitHubButton>
					</div>
				</div>
				<div className="init-modal-bottom">
					<div>
						<button onClick={() => this.modalOperation(1)}>Create new file</button>
						<button onClick={() => this.modalOperation(2)}>Upload file</button>
						{/* TODO: Add restore session functionality */}
					</div>
				</div>
			</div>
		)
	}
}

export default Store.withStore(InitModal);
