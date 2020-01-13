import React from 'react';
import './index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Store from '../../../stores/files';

import Type from './type';

class Code extends React.Component {
	constructor() {
		super();

		this.state = {
			tabIndex: 0 // Initialize default tabIndex
		}

		this.updateIndex = this.updateIndex.bind(this);
	}
	// Update tabIndex
	updateIndex(index) {
		this.props.store.get('tabMgmt')[0] = index
		this.props.store.set('tabMgmt')(this.props.store.get('tabMgmt'))
	}
	render() {
		let store = this.props.store;
		// Setup functionality to close tabs
		function closeTab(position) {
			store.get('files')[position]["shown"] = false;
			store.set('files')(store.get('files'))
		}
		return(
			<Tabs className="layout-code" selectedIndex={store.get('tabMgmt')[0]} onSelect={tabIndex => this.updateIndex(tabIndex)}>
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
