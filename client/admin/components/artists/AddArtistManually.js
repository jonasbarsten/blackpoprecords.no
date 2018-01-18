import React, {Component} from 'react';

export default class AddArtistManually extends Component {
	handleSubmit (event) {
		event.preventDefault();

		check(this.refs.name.value, String);

		var artist = {
			name: this.refs.name.value,
			nameLower: this.refs.name.value.toLowerCase(),
			imageUrl: 'http://placehold.it/640x640?text=No+Image',
			lastChanged: new Date()
		}

		Meteor.call('addArtist', artist, (err, res) => {
			if (err) {
				console.log(err);
				this.refs.name.value = "";
			} else if (res == 'exists'){
				this.refs.name.value = "";
				Bert.alert('Artist exists', 'warning', 'growl-bottom-right', 'fa-info');
			} else {
				this.refs.name.value = "";
				Bert.alert('Artist added', 'success', 'growl-bottom-right', 'fa-smile-o');
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