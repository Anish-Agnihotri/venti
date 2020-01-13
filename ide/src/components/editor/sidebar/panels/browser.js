import React from 'react';
import './index.css'

import Explorer from './components/explorer';

export default class Browser extends React.Component {
	render() {
		return(
			<div>
				<div className="panel-header">
					<span>File Browser</span>
					<p>Create, import, or save Solidity files.</p>
				</div>
				<Explorer />
			</div>
		)
	}
}
