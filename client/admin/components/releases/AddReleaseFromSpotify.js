import React, {Component} from 'react';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

export default class AddReleaseFromSpotify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			releases: []
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		var fetchReleases = (query) => {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/search',
		        data: {
		            q: 'album:' + query,
		            type: 'album',
		            limit: 50
		        },
		        success: (response) => {

		            this.setState({
		            	releases: response.albums.items
		            })
		        }
		    });
		};

		fetchReleases(this.refs.releaseSearch.value);
	}

	addRelease (release) {

		var release = {
			name: release.name,
			imageUrl: release.imageUrl,
			lastChanged: new Date,
			spotifyRaw: release,
			albumType: release.albumType
		}


		if (this.props.artistId) {
			release.artists = [this.props.artistId];
		}	



		Meteor.call('addRelease', release, (err, res) => {
			if (err) {

			} else {
				Bert.alert('Release added', 'success', 'growl-bottom-right', 'fa-smile-o');
				this.setState({
					releases: []
				});
				this.refs.releaseSearch.value = '';
			}
		});
	}

	render () {

		var result = this.state.releases;

		return (
			<div>
				<div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group">
						  	<input type="text" ref="releaseSearch" className="form-control" placeholder="Search" />
						</div>
					</form>
				</div>
				<div className="results">
					{result.map((release) => {

						if (release.images[0] != undefined) {
							release.imageUrl = release.images[0].url;
						} else {
							release.imageUrl = 'http://placehold.it/640x640?text=No+Image';
						}

						if (release.album_type != undefined) {
							release.albumType = release.album_type;
						} else {
							release.albumType = '';
						}

						return <ReleaseCard key={release.id} release={release} onClick={() => {this.addRelease(release)}}/>
					})}
				</div>
			</div>
		);
	}
}