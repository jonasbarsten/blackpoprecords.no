import React, {Component} from 'react';

export default class AddLink extends Component {

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit({
			name: this.refs.name.value,
			url: this.refs.url.value,
			id: Random.hexString( 15 )
		});

		this.refs.name.value = '';
		this.refs.url.value = '';
	}

	render() {
		return (
			<div>
				<h4>Add link</h4>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						type="text"
						ref="name"
						placeholder="Homepage / Spotify"
					/>
					<input
						type="text"
						ref="url"
						placeholder="http://thebeatles.com"
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