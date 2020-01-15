import React from 'react';
import Store from '../../../../../../../stores/files';

class RenameFile extends React.Component {
	constructor() {
		super();
		
		this.state = {
			renameName: '',
			disabledViaDuplicate: false,
			isDisabledSubmit: true,
			names: []
		}

		this.renameName = this.renameName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	renameName(evt) {
		let val = evt.target.value;

		this.setState({
			renameName: val
		})

		if (val === '') {
			this.setState({ isDisabledSubmit: true, disabledViaDuplicate: false })
		} else if (this.state.names.indexOf(val) !== -1 || this.state.names.indexOf(val + ".sol") !== -1) {
			this.setState({ isDisabledSubmit: true, disabledViaDuplicate: true })
		} else {
			this.setState({ isDisabledSubmit: false, disabledViaDuplicate: false })
		}
	}
	onSubmit() {
		var currentName = this.props.fileToRename;
		var newName = this.state.renameName;

		if (!newName.endsWith(".sol")) {
			newName += ".sol"
		}

		if (!this.state.isDisabledSubmit) {
			let renameIndex = this.props.store.get('files').findIndex(x => x.name === currentName);
			this.props.store.get('files')[renameIndex]["name"] = newName;
			this.props.store.set('files')(this.props.store.get('files'));

			this.props.closeModal();
		}
	}
	componentDidMount() {
		for (let i = 0; i < this.props.store.get('files').length; i++) {
			this.state.names.push(this.props.store.get('files')[i]["name"])
		}
	}
	render() {
		return(
			<div className="modal-outer">
				<div className="modal-header">
					<h1>Rename file</h1>
					<span>Quickly rename <span className='rename-file-name'>{this.props.fileToRename}</span>.</span>
				</div>
				<div className="modal-content rename-file-modal">
					<input placeholder={"myFancyNewName.sol"} value={this.state.renameName} onChange={this.renameName} onKeyDown={event => { if (event.key === 'Enter') {this.onSubmit()}}}/>
					{this.state.disabledViaDuplicate ? <p className="duplicate-error">File already exists.</p> : ''}
				</div>
				<div className="modal-actions rename-file-actions">
					{this.state.isDisabledSubmit ? <button onClick={this.onSubmit} disabled>Please enter filename</button> : <button onClick={this.onSubmit}>Rename</button>}
				</div>
			</div>
		)
	}
}

export default Store.withStore(RenameFile);
