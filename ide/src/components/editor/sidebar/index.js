import React from 'react';
import './index.css';

// Import Venti logo
import logo from './logo.png';

// Import sidebar buttons
import solidity from './images/solidity.png';
import solidityblue from './images/solidity-blue.png';
import settings from './images/settings.png';
import settingsblue from './images/settings-blue.png';
import bug from './images/bug.png';
import bugblue from './images/bug-blue.png';
import transaction from './images/transaction.png';
import transactionblue from './images/transaction-blue.png';
import document from './images/document.png';
import documentblue from './images/document-blue.png';

// Import sub sidebar panels
import Browser from './panels/browser';
import Bugs from './panels/bugs';
import Settings from './panels/settings';
import Solidity from './panels/solidity';
import Transactions from './panels/transactions';

class Sidebar extends React.Component {
	constructor() {
		super();

		this.state = {
			panel: 1, // Setup default panel to display ("Solidity Compiler")
			// FIXME: Change to 2 before production deploy
		}

		this.updatePanel = this.updatePanel.bind(this);
	}
	// Update panel on click
	updatePanel(num) {
		this.setState({
			panel: num
		})
	}
	// Dynamically render panel component
	renderPanel() {
		switch(this.state.panel) {
			case 1:
				return <Browser />
			case 2:
				return <Solidity />
			case 3:
				return <Transactions />
			case 4:
				return <Bugs />
			case 5:
				return <Settings />
			default: 
				return <Solidity />
		}
	}
	render() {
		// Panel setup
		const nav = [{"panel": 1, "image": document, "imageblue": documentblue, "alttext": "File explorer"},
					{"panel": 2, "image": solidity, "imageblue": solidityblue, "alttext": "Solidity compiler"},
					{"panel": 3, "image": transaction, "imageblue": transactionblue, "alttext": "Send transactions"},
					{"panel": 4, "image": bug, "imageblue": bugblue, "alttext": "Unit testing"},
					{"panel": 5, "image": settings, "imageblue": settingsblue, "alttext": "Venti settings"}]
		return (
			<div className="layout-sidebar">
				<div className="layout-nav">
					<div className="layout-nav-logo">
						<button onClick={(e) => this.updatePanel(2)}>
							<img src={logo} alt="Venti logo"/>
						</button>
					</div>
					<div className="layout-nav-selectors">
						<ul>
							{nav.map(function(d, idx) {
								// For each item in nav, render a sidebar navigation component
								return(
									<li>
										<button onClick={(e) => this.updatePanel(d.panel)} className={`${this.state.panel === d.panel ? "active" : ""}`}>
											<img src={`${this.state.panel === d.panel ? d.imageblue : d.image }`} alt={d.alttext}/>
										</button>
									</li>
								)
							}.bind(this))}
						</ul>
					</div>
					<div className="layout-version">
						<span>Ver 0.0.1a</span>
					</div>
				</div>
				<div className="layout-panel">
					{ this.renderPanel() }
				</div>
			</div>
		)
	}
}

export default Sidebar;
