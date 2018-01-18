import React, {Component} from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {

	componentDidMount() {

	}

	handleSubmit (event) {

		// Prevent reload
		event.preventDefault();

		// Fetch data from form
		const email = this.refs.emailAddress.value;
		const password = this.refs.password.value;

		// Validate
		check(email, ValidEmail);
		check(password, String);

		// Login
		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				alert( error.reason );
			} else {
				// send to /secure, then, if admin, they will be sent to /admin (see routes)
				browserHistory.push('/secure');
			}
		});
	}

	render () {
		return (
			<div className="login container">
				<h4>Login</h4>
				<div className="divider"></div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-4">
						<form onSubmit={ this.handleSubmit.bind(this) }>
								
							<div className="row">
						        <div className="input-field col s12 m6">
						        	<input ref="emailAddress" id="email" type="email" className="validate" />
						        	<label htmlFor="email">Email</label>
						        </div>
						    </div>
						    <div className="row">
								<div className="input-field col s12 m6">
									<input ref="password" id="password" type="password" className="validate" />
									<label htmlFor="password">Password</label>
								</div>
							</div>
							
							<button className="btn grey waves-effect waves-light" type="submit">Login</button>
			
						</form>
					</div>
					<br />
					<p>Don't have an account? <a href="/signup">Signup</a></p>
					<p>Forgot your password? <a href="/forgot">Reset password</a></p>
				</div>
			</div>
		);
	}
}