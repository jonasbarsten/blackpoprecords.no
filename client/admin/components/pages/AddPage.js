import React, {Component} from 'react';

//TODO: only accept standard letters (not æøå) and numbers in url-friendly name

export default class AddPage extends Component {

	addPage(event) {

		event.preventDefault();

		Meteor.call('addPage', this.refs.name.value, this.refs.urlFriendlyName.innerHTML, (err, res) => {
			if (err) {
				console.log(err);
			} else if (res == 'exists') {
				Bert.alert('Page URL exists', 'warning', 'growl-bottom-right', 'fa-smile-o');
			} else {
				this.refs.name.value = '';
				Bert.alert('Page added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	urlFriendly() {

		var url = this.refs.name.value.replace(/[^\w\s]/gi, '');
		url = url.replace(/\s+/g, '-').toLowerCase();

		this.refs.urlFriendlyName.innerHTML = url;
	}

	render() {
		return(
			<div>
				<h4>Add Page</h4>

				<form onSubmit={this.addPage.bind(this)} onChange={this.urlFriendly.bind(this)}>
					<input
						placeholder="About us ..."
						type="text"
						ref="name"
					/>
				</form>

				<p>
					{Meteor.settings.public.url}/
					<span ref="urlFriendlyName"></span>
				</p>
			</div>
		);
	}
}