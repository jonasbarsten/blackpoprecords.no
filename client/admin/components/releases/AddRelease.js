import React, {Component} from 'react';

import AddReleaseFromSpotify from './AddReleaseFromSpotify.js';
import AddReleaseManually from './AddReleaseManually.js';
import AttachRelease from './AttachRelease.js';

export default class AddRelease extends Component {
	render () {
		return (
			<div>
				<h4>Add release from Spotify</h4>
				<AddReleaseFromSpotify artistId={this.props.artistId}/>
				<br />
				<h4>Add release manually</h4>
				<AddReleaseManually artistId={this.props.artistId}/>
				<h4>Attach existing release</h4>
				<AttachRelease artistId={this.props.artistId}/>
			</div>
		);
	}
}