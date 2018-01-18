import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';

export default class PageSingle extends TrackerReact(React.Component) {
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

	componentDidMount() {
		Meteor.call('pageView', this.props.params.urlFriendlyName);
	}

	getPage() {
		return Pages.find({urlFriendlyName: this.props.params.urlFriendlyName}).fetch();

	}

	render() {

		return (
			<div className="container">
				{this.getPage().map((page) => {
					return <BarstenViewer key={page._id} content={page.content} placeholder='No content yet ...' />
				})}
			</div>
		);
	}
}