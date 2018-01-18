import React, {Component} from 'react';

export default class AddReleaseManually extends Component {
	handleSubmit (event) {
		event.preventDefault();

		check(this.refs.name.value, String);

		var release = {
			name: this.refs.name.value,
			imageUrl: 'http://placehold.it/640x640?text=No+Image',
			lastChanged: new Date()
		}

		if (this.props.artistId) {
			release.artists = [this.props.artistId];
		}

		Meteor.call('addRelease', release, (err, data) => {
			if (err) {
				console.log(err);
				this.refs.name.value = "";
			} else {
				this.refs.name.value = "";
				Bert.alert('Release added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						className="col-md-3"
						type="text"
						ref="name"
						placeholder="name"
					/>
					<input
						type="submit"
						className="btn btn-success"
						value="Add"
					/>
				</form>
			</div>
		);
	}
}