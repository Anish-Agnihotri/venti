import React from 'react';
import Store from '../../../../../../../stores/files';

/* TODO: Refactor */

class CreateFile extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			names: [],
			isDisabledSubmit: true
		};

		this.updateName = this.updateName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	updateName(evt) {
		let val = evt.target.value;

		this.setState({
			name: val
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
		var name = this.state.name;


		if (!name.endsWith(".sol")) {
			name += ".sol"
		}

		if (!this.state.isDisabledSubmit) {
			this.props.store.get('files').push({"name": name, "code": "", "shown": true});
			this.props.store.set('files')(this.props.store.get('files'));

			this.props.store.get('tabMgmt')[0] += 1;
			this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
			this.props.closeModal();
		}

		this.setState({ isDisabledSubmit: true })
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
					<h1>Create new file</h1>
					<span>Quickly generate a new Solidity file.</span>
				</div>
				<div className="modal-content create-file-modal">
					<input placeholder="myAwesomeERC20token.sol" value={this.state.name} onChange={this.updateName} onKeyDown={event => { if (event.key === 'Enter') {this.onSubmit()}}} autoFocus/>
					{this.state.disabledViaDuplicate ? <p className="duplicate-error">File already exists.</p> : ''}
				</div>
				<div className="modal-actions create-file-actions">
					{this.state.isDisabledSubmit ? <button onClick={this.onSubmit} disabled>Please enter filename</button> : <button onClick={this.onSubmit}>Create</button>}
				</div>
			</div>
		)
	}
}

export default Store.withStore(CreateFile);
