import React, {Component} from 'react';
import Moment from 'moment';

export default class InviteSingle extends Component {
	deleteInvite() {
		Meteor.call('deleteInvite', this.props.invite.email, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Invite deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}
	render () {
		const dateInvited = this.props.invite.dateInvited;

		return (
			<li className="collection-item">
				{this.props.invite.email}
				
				<span onClick={this.deleteInvite.bind(this)} className="new badge red hoverable" data-badge-caption="">Revoke</span>
				<span className="new badge blue" data-badge-caption="">{Moment(dateInvited).format('YY/MM/DD - HH:mm')}</span>
				
			</li>
		);
	}
};