import React from 'react';
import Store from '../../../../../../../stores/files';
import AceEditor from 'react-ace';

// Custom mode and theme import
import '../../../../../../../utils/mode-solidity';
import '../../../../../../../utils/theme-solidity';

// TODO: Fix tab index on deletion

class DeleteFile extends React.Component {
	constructor() {
		super();
		
		this.state = {
			deleteName: '',
			editorValue: '',
			isDisabledSubmit: true
		}

		this.updateDeleteName = this.updateDeleteName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	updateDeleteName(evt) {
		let val = evt.target.value;

		if (this.props.fileToDelete === val) {
			this.setState({ isDisabledSubmit: false })
		} else {
			this.setState({ isDisabledSubmit: true })
		}

		this.setState({	deleteName: val })
	}
	onSubmit() {
		if (!this.state.isDisabledSubmit && this.state.fileIndex > -1) {
			this.props.store.get('files').splice(this.state.fileIndex, 1);
			this.props.store.set('files')(this.props.store.get('files'))

			this.props.store.get('tabMgmt')[0] -= 1;
			this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
			this.props.closeModal();
		}
	}
	componentDidMount() {
		let fileIndex = this.props.store.get('files').findIndex(x => x.name === this.props.fileToDelete);
		this.setState({ editorValue: this.props.store.get('files')[fileIndex]["code"], fileIndex: fileIndex })
	}
	render() {
		return(
			<div className="modal-outer">
				<div className="modal-header">
					<h1>Delete file</h1>
					<span>Are you sure you want to delete <span className="delete-file-name">{this.props.fileToDelete}</span>?</span>
				</div>
				<div className="modal-content delete-file-modal">
					<span>File content</span>
					<AceEditor
						mode="solidity"
						theme="solidity"
						value={this.state.editorValue}
						name="delete-editor"
						editorProps={{ $blockScrolling: true }}
						style={{lineHeight: 1.75}}
						ref='aceEditor'
						readOnly={true}
					/>
					<p>Type file name to continue:</p>
					<input placeholder={this.props.fileToDelete} value={this.state.deleteName} onChange={this.updateDeleteName} onKeyDown={event => { if (event.key === 'Enter') {this.onSubmit()}}} autoFocus/>
				</div>
				<div className="modal-actions delete-file-actions">
					{this.state.isDisabledSubmit ? <button onClick={this.onSubmit} disabled>Please confirm deletion</button> : <button onClick={this.onSubmit}>Delete</button>}
				</div>
			</div>
		)
	}
}

export default Store.withStore(DeleteFile);
