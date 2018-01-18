import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AdminArtistCard extends Component {
	render() {
		const editArtistUrl = '/admin/artist/edit/' + this.props.artist._id;

		return (
			<Link to={editArtistUrl}>
				<div className="artist-card col-xs-6 col-sm-4">
					<img src={this.props.artist.imageUrl} className="img-responsive center-block" />
					<p>{this.props.artist.name}</p>
				</div>
			</Link>
		);
	}
}