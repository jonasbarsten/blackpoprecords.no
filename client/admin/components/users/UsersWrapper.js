import React from 'react';
// import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

// Import Components
import InvitedUserSingle from './InvitedUserSingle.js';
import InviteAdminForm from './InviteAdminForm.js';
import InviteSingle from './InviteSingle.js';
import ArtistAdminSingle from './ArtistAdminSingle.js';
// import ApplicantEmailList from './ApplicantEmailList.js';


// Resolutions component

export default class UsersWrapper extends TrackerReact(React.Component) {

	componentDidMount() {
		
	}

	// Subscribe
	constructor() {
		super();
		this.state = {
			subscription: {
				userList: Meteor.subscribe('userList'),
				invites: Meteor.subscribe('invites')
			}
		}
	}

	// Stop subscription when component unmounts
	componentWillUnmount() {
		this.state.subscription.userList.stop();
		this.state.subscription.invites.stop();
	}

	// Get users

	userList() {
		return Meteor.users.find().fetch();
	}

	// Get invites
	invites() {
		return Invites.find().fetch();
	}

	// Render component
	render() {

		if (this.userList()) {
			var userList = this.userList();
		} else {
			var userList = [];
		}

		return (
			<div className="container">
				<h3>Users</h3>
				<div className="divider"></div>
				<div className="row">

					<div id="crewTab" className="col-md-4">
						<h5>Invite Admin</h5>

						<InviteAdminForm />

						<h5>Admins</h5>
						<div className="row z-depth-1 div-list">
							{this.userList().map( (user) => {

								var isInvited = Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP);

								if (isInvited) {

									// Do not show current user
									if (user._id !== Meteor.userId()) {
										return <InvitedUserSingle key={user._id} user={user}></InvitedUserSingle>
									}
								}

							})}
						</div>
					</div>

					<div id="pendingInvitesTab" className="col-md-4">
						<ul className="collection">
							{this.invites().map( (invite) => {

								// Filter out invitations that have been used
								if (invite.accountCreated !== true) {
									return <InviteSingle key={invite._id} invite={invite}></InviteSingle>
								}
								
							})}
						</ul>
					</div>


					<div id="applicantsTab" className="col-md-4">
						
						<ul className="collection">
							{this.userList().map( (user) => {

								var isArtistAdmin = Roles.userIsInRole(user._id, 'artist-admin');

								if (isArtistAdmin) {
									return <ArtistAdminSingle key={user._id} user={user}></ArtistAdminSingle>
								}
								
							})}
						</ul>
					</div>

				</div>

			</div>
		);
	}

};