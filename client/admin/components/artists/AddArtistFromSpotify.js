import React, {Component} from 'react';

import AddArtistCard from './AddArtistCard.js';

export default class AddArtistFromSpotify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			artists: []
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		var fetchArtists = (query) => {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/search',
		        data: {
		            q: 'artist:' + query,
		            type: 'artist',
		            limit: 50
		        },
		        success: (response) => {
		            this.setState({
		            	artists: response.artists.items
		            })
		        }
		    });
		};

		fetchArtists(this.refs.artistSearch.value);

		// Meteor.call('addArtist', artist);

	}

	render () {

		var result = this.state.artists;

		return (
			<div>
				<div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="form-group">
						  	<input type="text" ref="artistSearch" className="form-control" placeholder="Search" />
						</div>
					</form>
				</div>
				<div className="row">

					{result.map((artist) => {

						if (artist.images[0] != undefined) {
							var image = artist.images[0].url;
						} else {
							var image = 'http://placehold.it/640x640?text=No+Image';
						}
						
						return <AddArtistCard key={artist.id} artist={artist} image={image}/>
					})}
				</div>

			</div>
		);
	}
}