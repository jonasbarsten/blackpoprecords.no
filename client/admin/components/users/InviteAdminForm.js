import React, {Component} from 'react';

export default class InviteAdminForm extends Component {
	constructor() {
		super();
 
 		// Set default loading state to false
		this.state = {
			isLoading: false
		};
	}

	inviteAdmin(event) {
		// Set loading to true
		this.setState({isLoading: true});
		
		// do not reload on submit
		event.preventDefault();

		// get content from input
		var email = this.refs.email.value.trim();

		if (email) {
			// Insert into DB
			// Use (), not function since a normal function would not know "this"
			Meteor.call('inviteAdmin', email, (error, data) => {
				// call is complete
				if(error) {
					Bert.alert('Could not invite user, check your internet connection', 'danger', 'growl-bottom-right', 'fa-frown-o');
					
					// No longer loading
					this.setState({isLoading: false});
					this.refs.email.value = "";

					// If invite was not sent, delete invite from db
					Meteor.call('deleteInvite', email);

				} else {
					Bert.alert('User invited', 'success', 'growl-bottom-right', 'fa-smile-o');
					
					// No longer loading
					this.setState({isLoading: false});

					// Clear input field
					this.refs.email.value = "";
				}
			});
		}
	}

	render () {

		const loading = this.state.isLoading ? 
			<div className="progress">
    			<div className="indeterminate"></div>
			</div>
		: "";

		return (
			<div className="row z-depth-1">
				
				<form className="col s12" onSubmit={this.inviteAdmin.bind(this)}>
					<div className="row">

						<div className="input-field col s4">
							<input
								id="email"
								className="validate"
								type="email" 
								ref="email"
							/>
							<label htmlFor="email">Email</label>
						</div>

						<div className="input-field col s8">
							<div className="col s4">
								<button className="btn waves-effect waves-light blue" type="submit">Send &nbsp;
									<i className="mdi mdi-send"></i>
								</button>
							</div>
						</div>

					</div>



				</form>
				{loading}
			</div>
		);
	}
};