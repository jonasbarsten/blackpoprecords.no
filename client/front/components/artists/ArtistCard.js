import React, {Component} from 'react';

export default class ArtistCard extends Component {
	render() {
		return (
			<div className="artist-card col-xs-6 col-sm-4" onClick={this.props.onClick}>
				<img src={this.props.artist.imageUrl} className="img-responsive center-block" />
				<span>{this.props.artist.name}</span>
			</div>
		);
	}
}