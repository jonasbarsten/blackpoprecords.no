import React, {Component} from 'react';

import {Link} from 'react-router';
import NavLink from '../../shared/components/utilities/NavLink.js';
import AccountsUI from '../../AccountsUI.js';

export default class AdminNavBar extends Component {

	componentDidMount() {

		// Collapse mobile menu after clicking on link
		$(document).ready(function () {
			$(".navbar-nav li a").click(function(event) {
		    	$(".navbar-collapse").collapse('hide');
			});
		});
	}

	render() {
		return (
			<nav id="admin-nav" className="navbar navbar-default">
				<div className="container-fluid">

					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/admin">
							<h4>Blackpop admin</h4>
						</Link>
					</div>
					
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<AccountsUI />
						<ul className="nav navbar-nav navbar-right">

							<NavLink to="/admin/pages/all">Pages</NavLink>
							<NavLink to="/admin/artists">Artists</NavLink>
							<NavLink to="/admin/releases">Releases</NavLink>
							<NavLink to="/admin/users">Users</NavLink>
							<NavLink to="/admin/tracks/all">Tracks</NavLink>

						</ul>
					</div>
				</div>
			</nav>
		);
	}

}