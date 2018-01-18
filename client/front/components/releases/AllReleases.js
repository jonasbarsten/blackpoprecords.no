import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import Masonry from 'react-masonry-component';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

export default class AllReleases extends TrackerReact(React.Component) {

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
		const today = new Date();

		return Releases.find({releaseDate: {$lt: today}}, {sort: {releaseDate: -1}}).fetch();
	}

	goToRelease(release) {
		browserHistory.push('/releases/' + release._id);
	}

	render() {

		const masonryOptions = {
    		transitionDuration: 0
		};

		const releases = this.state.releases;

		return (
			<div className="container">
				<div className="row">


		            <Masonry
		            	className={''} // default '' 
		            	elementType={'div'} // default 'div'
		            	options={masonryOptions}
		            	disableImagesLoaded={false} // default false 
		            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
		            >
						{this.getReleases().map((release) => {
							
							return <ReleaseCard key={release._id} release={release} onClick={() => {this.goToRelease(release)}}/>
						})}
		            </Masonry>

				</div>
			</div>
		);
	}
}