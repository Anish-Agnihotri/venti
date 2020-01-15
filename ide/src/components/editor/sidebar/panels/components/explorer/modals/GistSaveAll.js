import React from 'react';
import Store from '../../../../../../../stores/files';

class GistSaveAll extends React.Component {
	render() {
		return(
			<div className="modal-outer">
				<div className="modal-header">
					<h1>Save to Gist</h1>
					<span>Save your files to a GitHub Gist automatically.</span>
				</div>
				<div className="modal-content save-gist-modal">
					
				</div>
				<div className="modal-actions save-gist-actions">
					<button onClick={this.onSubmit}>Create</button>
				</div>
			</div>
		)
	}
}

export default Store.withStore(GistSaveAll);
