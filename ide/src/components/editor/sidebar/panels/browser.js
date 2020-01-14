import React from 'react';
import './index.css'

import Explorer from './components/explorer';

export default class Browser extends React.Component {
	render() {
		return(
			<div>
				<div className="panel-header">
					<span>File Browser</span>
				</div>
				<Explorer />
			</div>
		)
	}
}
