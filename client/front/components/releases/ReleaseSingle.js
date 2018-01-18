import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Link} from 'react-router';
import moment from 'moment';
import _ from 'lodash';

import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';

export default class ReleaseSingle extends TrackerReact(React.Component) {


	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				releases: Meteor.subscribe('releases'),
				tracks: Meteor.subscribe('tracks')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.releases.stop();
		this.state.subscription.tracks.stop();
	}

	getRelease() {
		return Releases.find({_id: this.props.params.releaseId}).fetch();
	}

	getTracks() {
		return Tracks.find({release: this.props.params.releaseId}, {sort: {trackNumber: 1}}).fetch();
	}

	goToLink(link) {
		console.log(link);
		browserHistory.push(link.url);
	}

	getLinks() {
		const release = this.getRelease();

		if (release[0] == undefined) {
			return [];
		}

		if (release[0].links) {

			var links = release[0].links;
			var sortedLinks = _.sortBy(links, 'sortIndex');

			return sortedLinks;

		} else {
			return [];
		}
		
	}

	parseDate(ISOdate) {

		const date = moment(ISOdate).format('YYYY-MM-DD');
		return date;

	}

	render () {
		return (
			<div id="releaseEdit">
				{this.getRelease().map((release) => {

					return (
						<div key={release._id}>

							<div className="container-fluid">

								<div className="release-banner">
									<img src={release.imageUrl} className="img-responsive" />
								</div>
								
								<div className="container">

									<div className="release-single-content">

										<div className="text-center">
											<h2>{release.name}</h2>
										</div>

										<div className="row">
											<div className="col-sm-6 text-capitalize">
												{release.albumType}
											</div>
											<div className="col-sm-6 text-right">
												{this.parseDate(release.releaseDate)}
											</div>
										</div>

										<hr />

										<div className="row link-list">
											{this.getLinks().map((link) => {
												return (
													<div key={link.id} className="col-sm-3">
														<Link target="_blank" to={link.url}>{link.name}</Link>
													</div>
												);
											})}
										</div>

										<hr />

										<BarstenViewer content={release.about} placeholder='No about text yet ...'/>

										<hr />

										<h4>Tracks</h4>

										<ul className="track-list">

										{this.getTracks().map((track) => {

											var x = track.duration / 1000;
											const seconds = Math.round(x % 60);
											x = x / 60;
											const minutes = Math.round(x % 60);

											return (
												<li key={track._id}>
													<Link to={track.spotifyRaw.external_urls.spotify} target="_blank">
														{track.trackNumber} - {track.name} - {minutes}:{seconds}
													</Link>
												</li>
											);
										})}

										</ul>


										<hr />

									</div>
									
								</div>

							</div>

						</div>
					);
				})}
			</div>
		);
	}
}