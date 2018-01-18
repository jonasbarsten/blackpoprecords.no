import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import swal from 'sweetalert';
import BarstenEditor from '../../../shared/components/utilities/BarstenEditor.js';
import {browserHistory} from 'react-router';

export default class EditPage extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.pages.stop();
	}

	getPage() {
		var page = Pages.find({urlFriendlyName: this.props.params.urlFriendlyName}).fetch();

		if (page[0]) {

			return page[0];
		}

		return page;
	}

	saveContent(editorState) {
		Meteor.call('updatePageContent', this.props.params.urlFriendlyName, editorState, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Content saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deletePage () {

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this page!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('deletePage', this.props.params.urlFriendlyName, function(err, data) {
				if (err) {
					swal("Deleted!", "The page cound not be deleted.", "warning");
				} else {
					browserHistory.push('/admin/pages/all');
					Bert.alert('Page deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	toggleInMenu() {
		Meteor.call('togglePageInMenu', this.props.params.urlFriendlyName, function (err, res) {
			if (err) {
			} else {
				if (res == 'added') {
					Bert.alert('Added to menu', 'success', 'growl-bottom-right', 'fa-smile-o');
				}

				if (res == 'removed') {
					Bert.alert('Removed from menu', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			}
		})
	}

	isInMenu() {
		const page = this.getPage();

		if (page.isInMenu) {
			return true;
		}

		if (!page.isInMenu) {
			return false;
		}
	}

	render() {

		const page = this.getPage();

		return(
			<div className="container">
				<h4>{page.name}</h4>
				<hr />
				<div className="checkbox">
					<label>
						<input							
							type="checkbox" 
							readOnly
							checked={this.isInMenu()}
							onClick={this.toggleInMenu.bind(this)}
						/>
						In menu
					</label>

				</div>
				<hr />
				<BarstenEditor 
					onChange={(editorState) => {this.saveContent(editorState)}} 
					content={page.content}
				/>
				<hr />
				<div className="deleteArtistField" onClick={this.deletePage.bind(this)}>
					<h4>Delete page</h4>
				</div>
			</div>
		);
	}
}