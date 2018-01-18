import React, {Component} from 'react';
import swal from 'sweetalert';

export default class InvitedUserSingle extends Component {
	toggleManageUsers() {
		Meteor.call('toggleManageUsers', this.props.user);
	}

	toggleModerator() {
		Meteor.call('toggleModerator', this.props.user);
	}

	deleteUser() {
		var user = this.props.user;

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this user!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		function(){
			Meteor.call('deleteUser', user, function(err, data) {
				if (err) {
					swal("Deleted!", "The user cound not be deleted.", "warning");
				} else {
					// swal("Deleted!", "The user has been deleted.", "success");
				}
			});
		});
	}
	render () {

		const profile = this.props.user.profile;
		const online = this.props.user.status.online ? <span className="new badge green" data-badge-caption="">Online</span> : "";

		return (
			<div className="row">
				<div className="col-sm-4">
					{profile.firstName} {profile.lastName}
					{online}
				</div>
				<div className="col-sm-8">
					<div className="col-sm-4">
						<button className="btn waves-effect waves-light red" onClick={this.deleteUser.bind(this)}>
							delete
						</button>
					</div>
				</div>

				
			</div>
		);
	}
};