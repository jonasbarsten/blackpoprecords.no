import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ArtistCard from '../artists/ArtistCard.js';
import Footer from '../Footer.js';

export default class Home extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				pages: Meteor.subscribe('pages')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.pages.stop();
	}

	getArtists() {
		return Artists.find({}, {sort: {name: 1}}).fetch();
	}

	getPages() {
		return Pages.find({isInMenu: true}).fetch();
	}

	goToArtist(artist) {
		browserHistory.push('/artists/' + artist._id);
	}

	render() {
		return (
			<div>

				<div id="home-wrapper" className="container">

					<div className="row">
						<img src="/images/logo-full.png" alt="Jansen logo" className="img-responsive center-block home-logo" />
					</div>

					<div id="home-menu" className="row row-centered">
						<span className="col-centered col-sm-2 col-xs-4"><Link to="/artists">Artists</Link></span>
						<span className="col-centered col-sm-2 col-xs-4"><Link to="/releases"> Releases</Link></span>
						<span className="col-centered col-sm-2 col-xs-4"><Link to="/upcoming"> Upcoming</Link></span>
						{this.getPages().map((page) => {
							const url = '/pages/' + page.urlFriendlyName;
							return <span key={page._id} className="col-centered col-sm-2 col-xs-4"><Link to={url}> {page.name}</Link></span>
						})}
						<span className="col-centered col-sm-2 col-xs-4"><a target="self" href="http://www.blackpop.tigernet.no/"> Store</a></span>

						<span id="mobile-ekstra-menu-item" className="col-centered col-sm-2 col-xs-4"><Link to="#">-</Link></span>

					</div>

					<div className="spacer-40"></div>

					<div className="social-icons row">
						<div className="col-sm-4 col-sm-offset-4 col-xs-12">
							<a target="self" href="https://www.facebook.com/blackpoprecords/"> <i className="mdi mdi-facebook col-xs-4 mdi-24px"></i></a>
							<a target="self" href="https://www.instagram.com/blackpoprecords/"> <i className="mdi mdi-instagram col-xs-4 mdi-24px"></i></a>
							<a target="self" href="https://blackpoprecords.bandcamp.com/">
								<div className="col-xs-4">
									<img src="/images/bandcamp.png" />
								</div>
							</a>

							<div className="spacer-40"></div>
							<div className="spacer-20"></div>

							<a target="self" href="https://soundcloud.com/blackpoprecords"> <i className="mdi mdi-soundcloud col-xs-4 mdi-24px"></i></a>
							<a target="self" href="https://open.spotify.com/user/blackpoprecords"> <i className="mdi mdi-spotify col-xs-4 mdi-24px"></i></a>
							<a target="self" href="https://www.youtube.com/channel/UCG8wKL4FrYw0m7l5S9iWzdA"> <i className="mdi mdi-youtube-play col-xs-4 mdi-24px"></i></a>
						</div>
					</div>

					<div className="spacer-40"></div>

					<div className="row">

						{this.getArtists().map((artist) => {
							return <ArtistCard key={artist._id} artist={artist} onClick={() => {this.goToArtist(artist)}}/>
						})}

					</div>
				
				</div>

				<Footer />
				
			</div>
		);
	};
}



