import React from 'react';
import './index.css';

import AceEditor from 'react-ace';

// Search box
import 'ace-builds/src-min-noconflict/ext-searchbox';

// Language snippets
import "ace-builds/src-min-noconflict/ext-language_tools";

// Custom mode and theme import
import '../../../../utils/mode-solidity';
import '../../../../utils/theme-solidity';

// Import store
import Store from '../../../../stores/files';

// TODO: Save editor state

class Type extends React.Component {
	constructor() {
		super();

		this.handleCodeChange = this.handleCodeChange.bind(this);
		this.handleCursorChange = this.handleCursorChange.bind(this);
	}
	handleCodeChange(newValue) {
		this.props.store.get('files')[this.props.position]["code"] = newValue;
		this.props.store.set('files')(this.props.store.get('files'))
	}
	handleCursorChange() {
		var selection = this.refs.aceEditor.editor.getSelectionRange().end;
		var row = selection.row;
		var col = selection.column;

		this.props.store.get('files')[this.props.position]["row"] = row + 1;
		this.props.store.get('files')[this.props.position]["col"] = col;
		this.props.store.set('files')(this.props.store.get('files'))
	}
	render(props) {
		let store = this.props.store;
		return(
			<div className="type">
				<AceEditor
					mode="solidity"
					theme="solidity"
					onChange={this.handleCodeChange}
					value={store.get('files')[this.props.position]["code"]}
					name="solidity-editor"
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					onCursorChange={this.handleCursorChange}
					editorProps={{ $blockScrolling: true }}
					style={{lineHeight: 1.75}}
					ref='aceEditor'
				/>
				<div>
					<div className="op-buttons">
						<button onClick={() => {this.refs.aceEditor.editor.undo()}}><i className="fa fa-undo"></i></button>
						<button onClick={() => {this.refs.aceEditor.editor.redo()}}><i className="fa fa-repeat"></i></button>
					</div>
					<span>
						{store.get('files')[this.props.position]["row"] !== undefined ? `Ln ${store.get('files')[this.props.position]["row"]}, Col ${store.get('files')[this.props.position]["col"]} | Solidity (Venti)` : 'Solidity (Venti)'}
					</span>
				</div>
			</div>
		)
	}
}

export default Store.withStore(Type);
