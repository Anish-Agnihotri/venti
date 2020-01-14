import React from 'react';
import Store from '../../../../../../../stores/files';

class GistSaveAll extends React.Component {
	render() {
		return(
			<p>Save to GIST</p>
		)
	}
}

export default Store.withStore(GistSaveAll);
