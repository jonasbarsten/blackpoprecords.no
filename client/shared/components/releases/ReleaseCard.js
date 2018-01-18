import React, {Component} from 'react';

export default class ReleaseCard extends Component {

	render() {

		return (
			<div className='release-card col-xs-6 col-sm-4' onClick={this.props.onClick}>
				<img src={this.props.release.imageUrl} className="img-responsive center-block" />
				<span className="truncate">{this.props.release.name} ({this.props.release.albumType})</span>
			</div>
		);
	}
}