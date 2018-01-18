import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Link} from 'react-router';
import NavLink from '../../shared/components/utilities/NavLink.js';

export default class NavBar extends TrackerReact(React.Component) {

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

	componentDidMount() {

		// Collapse mobile menu after clicking on link
		$(document).ready(function () {
			$(".navbar-nav li a").click(function(event) {
		    	$(".navbar-collapse").collapse('hide');
			});
		});
	}

	getMenuPages() {
		return Pages.find({isInMenu: true}).fetch();
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">

					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">
							<img alt="Brand" src="/images/logo-horizontal.png" />
						</Link>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">


						<ul className="nav navbar-nav navbar-right">
							<NavLink to="/artists">Artists</NavLink>
							<NavLink to="/releases">Releases</NavLink>
							<NavLink to="/upcoming">Upcoming</NavLink>

							{this.getMenuPages().map((page) => {
								const link = '/pages/' + page.urlFriendlyName;

								return <NavLink key={page._id} to={link}>{page.name}</NavLink>
							})}

							<li><a target="self" href="http://www.blackpop.tigernet.no/">Store</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}

}