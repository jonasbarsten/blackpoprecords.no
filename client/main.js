import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { composeWithTracker } from 'react-komposer';


import FrontLayout from './front/components/FrontLayout.js';
import SecureLayout from './secure/components/SecureLayout.js';
import AdminLayout from './admin/components/AdminLayout.js';

// SECURE
import SecureDashboard from './secure/components/SecureDashboard.js';

// ADMIN
import AdminDashboard from './admin/components/AdminDashboard.js';
import AdminUsers from './admin/components/users/UsersWrapper.js';
import AdminAllArtists from './admin/components/artists/AdminAllArtists.js';
import EditArtist from './admin/components/artists/EditArtist.js';
import AdminAllReleases from './admin/components/releases/AdminAllReleases.js';
import EditRelease from './admin/components/releases/EditRelease.js';
import AllTracks from './admin/components/tracks/AllTracks.js';
import PagesWrapper from './admin/components/pages/PagesWrapper.js';
import EditPage from './admin/components/pages/EditPage.js';
// import AddArtist from './admin/components/artists/AddArtist.js';


// FRONT
import Home from './front/components/pages/Home.js';
import AllArtists from './front/components/artists/AllArtists.js';
import ArtistSingle from './front/components/artists/ArtistSingle.js';
import AllReleases from './front/components/releases/AllReleases.js';
import UpcomingReleases from './front/components/releases/UpcomingReleases.js';
import ReleaseSingle from './front/components/releases/ReleaseSingle.js';
import PageSingle from './front/components/pages/PageSingle.js';


// ACCOUNT

import Login from './front/components/users/Login.js';
import InviteSignUp from './front/components/users/InviteSignUp.js';
import Forgot from './front/components/users/Forgot.js';

// ACCOUNT ROUTES

// Redirect to '/' on logout, uses gwendall:accounts-helpers
Accounts.onLogout(function() {
	browserHistory.push('/login');
});

// AUTH LOGIC
const authenticateSecure = (nextState, replace, callback) => {

	// If no user, redirect to login
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
		callback();
	}

	// If user is admin, redirect to /admin
	Meteor.subscribe("currentUser", {
		onReady: function () { 
			if (Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'])) {
				replace({
					pathname: '/admin',
					state: { nextPathname: nextState.location.pathname },
				});
			};
			callback();
		},
		onError: function () { 
			console.log("error"); 
		}
	});		
};


const authenticateAdmin = (nextState, replace, callback) => {

	// If no user, redirect to login
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
	}

	// If user is not admin, redirect to /secure
	Meteor.subscribe("currentUser", {
		onReady: function () { 
			if (!Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'])) {
				replace({
					pathname: '/secure',
					state: { nextPathname: nextState.location.pathname },
				});
			};
			callback();
		},
		onError: function () { 
			console.log("error"); 
		}
	});	
};

const isLoggedIn = (nextState, replace) => {
	if (Meteor.userId()) {
		replace({

			// If user is logged in, send to /secure, if is admin, secure will sendt to /admin
			pathname: '/secure',
			state: { nextPathname: nextState.location.pathname },
		});
	}
}


const routes = (
	<Router history={browserHistory}>

		<Route path="/" component={Home}></Route>

		<Route path="/login" component={Login} onEnter={isLoggedIn}></Route>
		<Route path="/invite/:token" component={InviteSignUp}></Route>
		<Route path="/forgot" component={Forgot}></Route>

		<Route path="/pages" component={FrontLayout}>
			<Route path=":urlFriendlyName" component={PageSingle} />
		</Route>

		<Route path="/artists" component={FrontLayout}>
			<IndexRoute component={AllArtists} />
			<Route path=":artistId" component={ArtistSingle} />
		</Route>

		<Route path="/upcoming" component={FrontLayout}>
			<IndexRoute component={UpcomingReleases} />
		</Route>

		<Route path="/releases" component={FrontLayout}>
			<IndexRoute component={AllReleases} />
			<Route path=":releaseId" component={ReleaseSingle} />
		</Route>

		<Route path="/secure" component={SecureLayout}>
			<IndexRoute component={SecureDashboard} onEnter={authenticateSecure} />
		</Route>

		<Route path="/admin" component={AdminLayout}>
			<IndexRoute component={AdminDashboard} onEnter={authenticateAdmin}/>
			<Route path="users" component={AdminUsers} onEnter={authenticateAdmin} />
			<Route path="artists" component={AdminAllArtists} onEnter={authenticateAdmin} />
			<Route path="artist/edit/:artistId" component={EditArtist} onEnter={authenticateAdmin} />
			<Route path="releases" component={AdminAllReleases} onEnter={authenticateAdmin} />
			<Route path="release/edit/:releaseId" component={EditRelease} onEnter={authenticateAdmin} />
			<Route path="tracks/all" component={AllTracks} onEnter={authenticateAdmin} />
			<Route path="pages/all" component={PagesWrapper} onEnter={authenticateAdmin} />
			<Route path="pages/edit/:urlFriendlyName" component={EditPage} onEnter={authenticateAdmin} />
		</Route>

	</Router>
);


Meteor.startup( () => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});