import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';

import ArtistCard from './ArtistCard.js';

export default class AllArtists extends TrackerReact(React.Component) {

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

	generateLink(id) {

		return UserFiles.findOne({_id: id}).link();  //The "view/download" link
	}

	getArtists() {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}

	goToArtist(artist) {
		browserHistory.push('/artists/' + artist._id);
	}

	render() {

		return (
			<div className="container">
				{this.getArtists().map((artist) => {
					return <ArtistCard key={artist._id} artist={artist} onClick={() => {this.goToArtist(artist)}}/>
				})}
			</div>
		);	
	}
}