import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import Masonry from 'react-masonry-component';


// import AdminArtistCard from './AdminArtistCard.js';
// import AddArtistFromSpotify from './AddArtistFromSpotify.js';
// import AddArtistManually from './AddArtistManually.js';

import AddRelease from './AddRelease.js';
import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

export default class AdminAllReleases extends TrackerReact(React.Component) {
	
	constructor() {
		super();
		this.state = {
			subscription: {
				releases: Meteor.subscribe('releases')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.releases.stop();
	}

	getReleases() {
		return Releases.find({}, {sort: {releaseDate: -1}}).fetch();
	}

	editRelease(release) {
		browserHistory.push('/admin/release/edit/' + release._id);
	}

	render() {

		const masonryOptions = {
    		transitionDuration: 0
		};

		var numberOfReleases = this.getReleases().length;

		return (

			<div className="container">
				<h4>All Releases ({numberOfReleases})</h4>
				<hr />
				<div className="col-md-12">
					<AddRelease artistId=''/>
				</div>

				<div className="col-md-12">
					<h4>Edit releases</h4>
				
					<div className="row">


			            <Masonry
			            	className={''} // default '' 
			            	elementType={'div'} // default 'div'
			            	options={masonryOptions}
			            	disableImagesLoaded={false} // default false 
			            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
			            >

							{this.getReleases().map((release) => {
								
								return <ReleaseCard key={release._id} release={release} onClick={() => {this.editRelease(release)}}/>
							})}

						</Masonry>
					</div>
				</div>
			</div>
		);	
	}
}