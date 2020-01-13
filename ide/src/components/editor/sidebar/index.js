import React from 'react';
import './index.css';

// Import Venti logo
import logo from './logo.svg';

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

/* TODO: Fix hover effects and icons */

class Sidebar extends React.Component {
	constructor() {
		super();

		this.state = {
			panel: 2 // Setup default panel to display ("Solidity Compiler")
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
							<li>
								<button onClick={(e) => this.updatePanel(1)} className={`${this.state.panel === 1 ? "active" : ""}`}>
									<img src={`${this.state.panel === 1 ? documentblue : document }`} alt="File explorer"/>
								</button>
							</li>
							<li>
								<button onClick={(e) => this.updatePanel(2)} className={`${this.state.panel === 2 ? "active" : ""}`}>
									<img src={`${this.state.panel === 2 ? solidityblue : solidity }`} alt="Solidity compiler"/>
								</button>
							</li>
							<li>
								<button onClick={(e) => this.updatePanel(3)} className={`${this.state.panel === 3 ? "active" : ""}`}>
									<img src={`${this.state.panel === 3 ? transactionblue : transaction }`} alt="Send transaction"/>
								</button>
							</li>
							<li>
								<button onClick={(e) => this.updatePanel(4)} className={`${this.state.panel === 4 ? "active" : ""}`}>
									<img src={`${this.state.panel === 4 ? bugblue : bug }`} alt="Unit testing"/>
								</button>
							</li>
							<li>
								<button onClick={(e) => this.updatePanel(5)} className={`${this.state.panel === 5 ? "active" : ""}`}>
									<img src={`${this.state.panel === 5 ? settingsblue : settings }`} alt="Venti settings"/>
								</button>
							</li>
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
