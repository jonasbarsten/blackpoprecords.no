import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Link} from 'react-router';

export default class ListPages extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.pages.stop();
	}

	getPages() {
		return Pages.find().fetch();
	}

	render() {
		return(
			<div>
				<h4>All Pages</h4>
				{this.getPages().map((page) => {

					const editUrl = '/admin/pages/edit/' + page.urlFriendlyName;

					return (
						<div key={page._id}>
							<Link to={editUrl}>{page.name}</Link> - {page.views} views
						</div>
					);

							
				})}
			</div>
		);
	}
}