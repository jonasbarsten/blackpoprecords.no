// REMEMBER: <meta charset="utf-8" /> to head in main html

import React, {Component} from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';

export default class BarstenViewer extends Component {

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

		};
	}

	render() {

		const placeholder = this.props.placeholder ? this.props.placeholder : '';

		return(
			<div>
				<Editor 
					readOnly={true}
					placeholder={placeholder}
					editorState={this.state.editorState} 
				/>
			</div>
		);
	}
}