import React, {Component} from 'react';

import AdminNavBar from './AdminNavBar.js';

export default class AdminLayout extends Component {
	render() {
		return (
			<div>
				<AdminNavBar />
				{this.props.children}
			</div>
		);
	}
}