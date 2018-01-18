import React, {Component} from 'react';
import { browserHistory } from 'react-router';

export default class SecureLayout extends Component {
	componentDidMount() {

	}

	render() {
		return (
			<div>
				Secure Header
				{this.props.children}
			</div>
		);
	}
}