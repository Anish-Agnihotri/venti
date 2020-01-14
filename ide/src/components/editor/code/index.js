import React from 'react';
import './index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Store from '../../../stores/files';

import Type from './type';

class Code extends React.Component {
	render() {
		let store = this.props.store;

		// Update tab index
		function updateIndex(index) {
			// Filter for shown items
			var tempFilter = store.get('files').filter(function(item) {
				return !item["shown"] === false
			})
			
			// Set a new shown item
			store.get('tabMgmt')[0] = index;
			store.set('tabMgmt')(store.get('tabMgmt'))

			// If the indices match (they shouldn't since one is 0-based and another 1-based)
			if (index === tempFilter.length) {
				store.get('tabMgmt')[0] = index - 1; // Simply shift index -1 
				store.set('tabMgmt')(store.get('tabMgmt'))
			}
		}

		// Setup functionality to close tabs
		function closeTab(position) {
			store.get('files')[position]["shown"] = false;
			store.set('files')(store.get('files'));
		}

		return(
			<Tabs className="layout-code" selectedIndex={store.get('tabMgmt')[0]} onSelect={tabIndex => updateIndex(tabIndex)}>
				<TabList>
					{store.get('files').map(function(d, idx) {
						if (d.shown === true) {
							return (
								<Tab key={idx}>
									{d.name}
									<button className="tab-button" onClick={() => closeTab(idx)}><i className="fa fa-close"></i></button>
								</Tab>
							)
						}
						return null;
					})}
				</TabList>
				{store.get('files').map(function(d, idx) {
					if (d.shown === true) {
						return (
							<TabPanel key={idx}>
								<Type key={idx} position={idx}/>
							</TabPanel>
						)
					}
					return null;
				})}
			</Tabs>
		)
	}
}

export default Store.withStore(Code);
