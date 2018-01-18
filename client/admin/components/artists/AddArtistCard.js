import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AddArtistCard extends TrackerReact(React.Component) {

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

	addArtist() {

		var artist = {
			name: this.props.artist.name,
			nameLower: this.props.artist.name.toLowerCase(),
			imageUrl: this.props.image,
			lastChanged: new Date,
			spotifyRaw: this.props.artist
		}

		Meteor.call('addArtist', artist, (err, res) => {
			if (err) {
				console.log(err);
			} else if (res == 'exists') {
				Bert.alert('Artist exists', 'warning', 'growl-bottom-right', 'fa-info');
				
			} else {
				this.addArtistsReleases(res);
				Bert.alert('Artist added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

		$('.add-artist-card').fadeOut();
	}

	addArtistsReleases(localArtistId) {
		var localArtistId = localArtistId;
		var spotifyArtistId = this.props.artist.id;

	    $.ajax({
	        url: 'https://api.spotify.com/v1/artists/' + spotifyArtistId + '/albums',
	        data: {
		        limit: 50
		    },
	        success: (response) => {
	        	var releases = response.items;

	        	releases.map((releaseRaw) => {

	        		$.ajax({
	        			url: 'https://api.spotify.com/v1/albums/' + releaseRaw.id,
	        			success: (album) => {

			        		var release = {
			        			name: album.name,
			        			releaseDate: album.release_date,
			        			releaseDatePrecision: album.release_date_precision,
			        			lastChanged: new Date,
			        			albumType: album.album_type,
			        			artists: [localArtistId],
			        			spotifyRaw: album
			        		}

			        		if (album.images[0] != undefined) {
								release.imageUrl = album.images[0].url;
							} else {
								release.imageUrl = 'http://placehold.it/640x640?text=No+Image';
							}

							// If release name and albumType already exists, do not add, but push artistId to artists array if not already there

			        		Meteor.call('addRelease', release, (err, res) => {
			        			if (err) {
			        				console.log(err);
			        			}

			        			if (res) {

			        				this.addReleaseTracks(res.localReleaseId, res.spotifyReleaseId);
			        			}
			        			
			        		});

	        			}
	        		});
	        	});
	        } 
	    });

	}

	addReleaseTracks(localReleaseId, spotifyReleaseId) {

		$.ajax({
	        url: 'https://api.spotify.com/v1/albums/' + spotifyReleaseId + '/tracks',
	        data: {
		        limit: 50
		    },
	        success: (response) => {

	        	var tracks = response.items;

	        	tracks.map((trackRaw) => {

	        		var track = {
	        			name: trackRaw.name,
	        			lastChanged: new Date,
	        			duration: trackRaw.duration_ms,
	        			trackNumber: trackRaw.track_number,
	        			release: localReleaseId,
	        			artists: [],
	        			spotifyRaw: trackRaw
	        		}

	        		trackRaw.artists.map((artist) => {
	        			var trackArtist = Artists.findOne({'spotifyRaw.id': artist.id}, {_id: 1});

	        			if (trackArtist)
	        			track.artists.push(trackArtist._id);

	        		});

					// If track name and albumType already exists, do not add, but push artistId to artists array if not already there

	        		Meteor.call('addTrack', track, (err, res) => {
	        			if (err) {
	        				console.log(err);
	        			} else {

	        				
	        			}
	        		});

	        	});
	        } 
	    });

	}

	render() {

		return (
			<div id={this.props.artist.id} onClick={this.addArtist.bind(this)} className="artist-card add-artist-card col-xs-6 col-sm-4">
				<img src={this.props.image} className="img-responsive center-block" />
				<p>{this.props.artist.name}</p>
			</div>
		);
	}
}