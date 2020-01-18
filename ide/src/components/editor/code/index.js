import React from 'react';
import './index.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-responsive-modal';
import 'react-tabs/style/react-tabs.css';
import Store from '../../../stores/files';
import CreateFile from '../sidebar/panels/components/explorer/modals/CreateFile';

import Type from './type';

// TODO: Get scroll offset functioning using ('tabMgmt')[1]
class Code extends React.Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false
		}
		
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	// Open modal
	openModal(num) {
		this.setState({ modalOpen: true })
	}

	// Close modal
	closeModal() {
		this.setState({ modalOpen: false })
	}

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
				<div className="scrollable" id='scrollable'>
					<TabList>
						{store.get('files').map(function(d, idx) {
							if (d.shown === true) {
								return (
									<Tab key={idx}>
										<span>{d.name}</span>
										<button className="tab-button" onClick={() => closeTab(idx)}><i className="fa fa-close"></i></button>
									</Tab>
								)
							}
							return null;
						})}
					</TabList>
				</div>
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
				{/* No files shown */}
				{store.get('files').findIndex(x => x.shown === true) === -1 && store.get('files').length !== 0 ?
					<div className="no-files">
						<h1>No files selected</h1>
						<p>Select a file to show editor:</p>
						<div>
							{store.get('files').map(function(d, idx) {
								return(
									<FileItems key={idx} position={idx} name={d.name} store={store}/>
								)
							})}
						</div>
					</div>
				: ''}
				{/* No files exist */}
				{store.get('files').length === 0 ? 
					<>
						<div className="no-files">
							<h1>Uh oh! No files found.</h1>
							<p>Get started by creating a file:</p>
							<button onClick={this.openModal}>Create new file</button>
						</div>
						<Modal 
							open={this.state.modalOpen}
							onClose={this.closeModal}
							classNames={{
								overlay: "explorer-modal-overlay",
								modal: "explorer-modal"
							}}
							center
						>
							<CreateFile closeModal={this.closeModal}/>
						</Modal>
					</>
				: ''}
			</Tabs>
		)
	}
}

class FileItems extends React.Component {
	constructor() {
		super();

		this.selectItem = this.selectItem.bind(this);
	}
	selectItem() {
		let store = this.props.store;
		let itemPosition = this.props.position;

		store.get('files')[itemPosition]["shown"] = true
		store.set('files')(store.get('files'))

		store.get('tabMgmt')[0] = 0
		store.set('tabMgmt')(store.get('tabMgmt'))
	}
	render() {
		return(
			<div className="file-item" onClick={this.selectItem}>
				<span className="file-truncateable">{this.props.name}</span>
			</div>
		)
	}
}

export default Store.withStore(Code);
