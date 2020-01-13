import React from 'react';
import './index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Store from '../../../stores/files';

import Type from './type';

class Code extends React.Component {
	render() {
		let store = this.props.store;
		return(
			<Tabs className="layout-code">
				<TabList>
					{store.get('files').map(function(d, idx) {
						return <Tab key={idx}>{d.name}</Tab>
					})}
				</TabList>
				{store.get('files').map(function(d, idx) {
					return (
						<TabPanel key={idx}>
							<Type key={idx} position={idx}/>
						</TabPanel>
					)
				})}
			</Tabs>
		)
	}
}

export default Store.withStore(Code);

// Type />
