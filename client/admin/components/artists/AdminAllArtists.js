import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AdminArtistCard from './AdminArtistCard.js';
import AddArtistFromSpotify from './AddArtistFromSpotify.js';
import AddArtistManually from './AddArtistManually.js';

export default class AdminAllArtists extends TrackerReact(React.Component) {
	
	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
	}

	getArtists() {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}

	render() {

		var numberOfArtists = this.getArtists().length;

		return (

			<div className="container">
				<h4>All Artists ({numberOfArtists})</h4>
				<hr />
				<div className="col-md-12">
					<h4>Add artist from Spofity</h4>
					<AddArtistFromSpotify />
				</div>
				<div className="col-md-12">
					<h4>Add artist manually</h4>
					<AddArtistManually />
				</div>

				<hr />
				
				<div className="col-md-12">
					<h4>Edit artists</h4>
				
					<div className="row">
						{this.getArtists().map((artist) => {
							
							return <AdminArtistCard key={artist._id} artist={artist} />
						})}
					</div>
				</div>
			</div>
		);	
	}
}