import React from 'react';
import Store from '../../../../../../../stores/files';

class DeleteFile extends React.Component {
	render() {
		return(
			<p>Delete file</p>
		)
	}
}

export default Store.withStore(DeleteFile);
