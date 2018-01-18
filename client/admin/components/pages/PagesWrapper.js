import React, {Component} from 'react';

import AddPage from './AddPage.js';
import ListPages from './ListPages.js';

export default class PagesWrapper extends Component {
	render() {
		return(
			<div className="container">
				<AddPage />
				<ListPages />
			</div>
		);
	}
}