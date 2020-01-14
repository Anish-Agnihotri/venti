import React from 'react';
import Store from '../../../../../../../stores/files';

/* TODO: Refactor */

class CreateFile extends React.Component {
	constructor() {
		super();

		this.state = {
			name: ''
		};

		this.updateName = this.updateName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	updateName(evt) {
		let val = evt.target.value;

		this.setState({
			name: val
		})
	}
	onSubmit() {
		var name = this.state.name;
		if (!name.endsWith(".sol")) {
			name += ".sol"
		}

		this.props.store.get('files').push({"name": name, "code": "", "shown": true});
		this.props.store.set('files')(this.props.store.get('files'));

		this.props.store.get('tabMgmt')[0] += 1;
		this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
		this.props.closeModal();
	}
	render() {
		return(
			<div className="modal-outer">
				<div className="modal-header">
					<h1>Create new file</h1>
					<span>Quickly generate a new Solidity file.</span>
				</div>
				<div className="modal-content create-file-modal">
					<input placeholder="myAwesomeERC20token.sol" value={this.state.name} onChange={this.updateName}/>
				</div>
				<div className="modal-actions create-file-actions">
					<button onClick={this.onSubmit}>Create</button>
				</div>
			</div>
		)
	}
}

export default Store.withStore(CreateFile);
