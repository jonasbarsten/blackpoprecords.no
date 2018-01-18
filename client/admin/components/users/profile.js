import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Profile extends TrackerReact(React.Component) {

	componentDidMount() {
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 100, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd',
			firstDay: 'monday',
			min: undefined,
			max: 'today',
		});

		Materialize.updateTextFields();
	}

	constructor() {
		super();
		this.state = {
			subscription: {
				profile: Meteor.subscribe('profile')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.profile.stop();
	}

	getProfile() {
		return Meteor.users.findOne({_id: Meteor.userId()}, {fields: {profile: 1}}).profile;
	}

	handleSubmit (event) {
		event.preventDefault();

		const profile = {};

		profile.firstName = this.refs.firstName.value;
		profile.lastName = this.refs.lastName.value;
		profile.dateOfBirth = this.refs.dateOfBirth.value;

		Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}}, (error, result) => {
			if (error) {
				Bert.alert('Saving failed, check your internet connection', 'danger', 'growl-bottom-right', 'fa-frown-o');
			} else {
				Bert.alert('Profile saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	resetUserPassword() {

		// Not sending userID from client, grabbing it in the method for security
		Meteor.call('resetUserPassword', function(err, res) {
			if (err) {
				throw err.reason;
			} else {
				Bert.alert('Reset email sendt', 'success', 'fixed-top', 'fa-smile-o');
			}
		})
	}

	destroyAccount() {

		var user = Meteor.users.findOne({_id: Meteor.userId()});

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover anything!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, destroy my account!",
			closeOnConfirm: true
		},
		function(){

			Meteor.call('deleteUserApplications', user);
			Meteor.call('deleteUserFiles', user);
			Meteor.call('deleteUser', user);
	
		});
	}

	render() {

		const profile = this.getProfile();

		const firstName = profile && profile.firstName;
		const lastName = profile && profile.lastName;
		const dateOfBirth = profile && profile.dateOfBirth;

		return (
			<div className="container">
				<h3>My Profile</h3>



				<div className="section">
					<form className="col s12" onSubmit={ this.handleSubmit.bind(this) }>
						<div className="row">
							<div className="input-field col s6">
								<input ref="firstName" id="first_name" type="text" className="validate" defaultValue={firstName}/>
								<label htmlFor="first_name">First Name</label>
							</div>
							<div className="input-field col s6">
								<input ref="lastName" id="last_name" type="text" className="validate" defaultValue={lastName}/>
								<label htmlFor="last_name">Last Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<label htmlFor="dateOfBirth">Date of birth</label>
								<input ref="dateOfBirth" id="dateOfBirth" type="date" className="datepicker" defaultValue={dateOfBirth}/>
								
							</div>
						</div>

						<button className="btn waves-effect waves-light" type="submit">Save</button>
					</form>
				</div>
				<div className="divider"></div>
				<div className="section">
					<a onClick={this.resetUserPassword.bind(this)}className="waves-effect waves-light btn blue">Reset Password</a>
				</div>
				<div className="divider"></div>
				<div className="section">
					<a onClick={this.destroyAccount.bind(this)}className="waves-effect waves-light btn red">Destroy Account</a>
				</div>
					

				

			</div>
			
		);
	}
}