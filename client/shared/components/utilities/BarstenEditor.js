// REMEMBER: <meta charset="utf-8" /> to head in main html

import React, {Component} from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

// For auto save :)
import debounce from 'debounce';

export default class BarstenEditor extends Component {

	componentDidMount() {
		if (this.props.content) {

			const rawFromDB = convertFromRaw(this.props.content.editorState);
			const newState = EditorState.createWithContent(rawFromDB);

			this.setState({
				editorState: newState
			});
		}

	}	

	constructor(props) {
		super(props);
		this.state = {
				editorState: EditorState.createEmpty(),
				saveEditorState: debounce(this.save.bind(this), 2000)

		};
	}

	onChange (editorState) {

		this.setState({editorState});

		if (editorState.getCurrentContent() !== this.state.editorState.getCurrentContent()) {
			// content has changed
			this.state.saveEditorState(editorState);
		}
		if (editorState.getSelection() !== this.state.editorState.getSelection()) {
			// selection has changed

		}

	}

	save () {

		// Send editor state to parent onChange prop
		const rawState = convertToRaw(this.state.editorState.getCurrentContent());

		this.props.onChange({
			editorState: rawState
    	});

	}

	handleKeyCommand(command) {

  		// Shortcuts typ: cmd + B
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	makeBold() {
		this.onChange(RichUtils.toggleInlineStyle(
			this.state.editorState, 'BOLD'
		));
	}


	render() {

		return (
			<div>
				<button onClick={() => this.makeBold()}>Bold</button>
				<div className="clearfix"></div>
				<br />
				<Editor 
					placeholder="Write here ..."
					editorState={this.state.editorState} 
					onChange={(editorState) => {this.onChange(editorState)}} 
					handleKeyCommand={this.handleKeyCommand.bind(this)}
					spellCheck={true}
				/>
			</div>
		);
	}
}