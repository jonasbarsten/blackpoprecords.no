import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import swal from 'sweetalert';

export default class AllTracks extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				tracks: Meteor.subscribe('tracks'),
				artists: Meteor.subscribe('artists')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.tracks.stop();
		this.state.subscription.artists.stop();
	}

	getTracks() {
		return Tracks.find().fetch();
	}

	getArtist(artistId) {
		return Artists.find({_id: artistId}).fetch();
	}

	deleteTrack(track) {
		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this track!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('deleteTrack', track, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Track removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	render() {

		var numberOfTracks = this.getTracks().length;

		return (
			<div className="container">
				<h4>All Tracks ({numberOfTracks})</h4>
				<p>Click track to delete ...</p>
				<ul>
					{this.getTracks().map((track) => {

						if (track.artists[0]) {

							var artistName = this.getArtist(track.artists[0]);

							if (artistName[0]) {
								artistName = artistName[0].name;
							} else {
								artistName = 'No artist';
							}
							
						}

						return <li key={track._id} onClick={() => {this.deleteTrack(track)}}>{artistName} - {track.name}</li>
					})}
				</ul>
			</div>
		);
	}
}