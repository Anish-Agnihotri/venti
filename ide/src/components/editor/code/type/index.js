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

class Type extends React.Component {
	constructor() {
		super();

		this.cursorMovement = this.cursorMovement.bind(this);
	}

	// Editor cursor movements.
	cursorMovement() {
		var rowPos = this.refs.aceEditor.editor.getCursorPosition().row + 1
		var colPos = this.refs.aceEditor.editor.getCursorPosition().column
		// Figure out how to save without setState
	};

	render() {
		return(
			<div className="type">
				<AceEditor
					mode="solidity"
					theme="solidity"
					onChange={this.onChange}
					name="solidity-editor"
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					editorProps={{ $blockScrolling: true }}
					onCursorChange={this.cursorMovement}
					style={{lineHeight: 1.75}}
					ref='aceEditor'
				/>
				<div>
					<div className="op-buttons">
						<button onClick={() => {this.refs.aceEditor.editor.undo()}}><i className="fa fa-undo"></i></button>
						<button onClick={() => {this.refs.aceEditor.editor.redo()}}><i className="fa fa-repeat"></i></button>
					</div>
					<span>
						Solidity (Venti)
					</span>
				</div>
			</div>
		)
	}
}

export default Type;
