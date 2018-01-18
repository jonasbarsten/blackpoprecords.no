import React, {Component} from 'react';

export default class ApplicantEmailList extends Component {
	componentDidMount() {


	}

	render () {

		if (this.props.userList) {
			var userList = this.props.userList;
		}
		
		var emailList = [];

		if (document.getElementById('applicantEmailList')) {
			var textArea = document.getElementById('applicantEmailList');
		}
		

		if (userList) {
			if (textArea) {
				userList.map( (user) => {
				if (Roles.userIsInRole(user._id, 'applicant')) {
					emailList.push(user.emails[0].address);
				}
			});
			textArea.value = emailList;	
			}
			
		}	

		return (
			<div>
				<p>Email List</p>
				<textarea id="applicantEmailList"></textarea>
			</div>

			);
	}
}