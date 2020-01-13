import React from 'react';
import Store from '../../../../../../../stores/files';

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
		this.setState({
			name: evt.target.value
		})
	}
	onSubmit() {
		this.props.store.get('files').push({"name": this.state.name, "code": "", "shown": true});
		this.props.store.set('files')(this.props.store.get('files'));

		this.props.store.get('tabMgmt')[0] += 1;
		this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
		this.props.closeModal();
	}
	render() {
		return(
			<div>
				<h1>Create File</h1>
				<input placeholder="File name" value={this.state.name} onChange={this.updateName}/>
				<button onClick={this.onSubmit}>Create</button>
			</div>
		)
	}
}

export default Store.withStore(CreateFile);
