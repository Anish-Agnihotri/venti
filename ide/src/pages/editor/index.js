import React from 'react';
import Sidebar from '../../components/editor/sidebar';
import Code from '../../components/editor/code';


class Editor extends React.Component {
	render() {
		return(
			<div className="layout">
				<Sidebar />
				<Code />
			</div>
		);
	}
}

export default Editor;
