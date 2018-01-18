import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// import Preloader from '../../../shared/components/preloader/Preloader.js';

export default class ArtistEvents extends Component {

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			// loading: true
		}
	}

	componentDidMount() {

		var request = '';

		const requestUpcoming = "https://api.songkick.com/api/3.0/artists/" + this.props.songkickId + "/calendar.json?location=clientip&apikey=" + Meteor.settings.public.songkickApiKey + '&jsoncallback=?';
		const requestPast = "https://api.songkick.com/api/3.0/artists/" + this.props.songkickId + "/gigography.json?location=clientip&apikey=" + Meteor.settings.public.songkickApiKey + '&jsoncallback=?';

		if (this.props.scope == "past") {
			request = requestPast;
		} else {
			request = requestUpcoming;
		}

		$.getJSON(request, (res) => {

			var eventsArray = res.resultsPage.results.event;

			if (this.props.scope == "past") {
				eventsArray.reverse();
			}

			eventsArray.map((event) => {

				const onClick = () => {
					window.open(event.uri, '_blank');
				};

				// Comes in format: "Oslo, Norway"
				const rawLocation = event.location.city;
				const city = rawLocation.substr(0,rawLocation.indexOf(','));
				const country = rawLocation.substr(rawLocation.indexOf(',')+1);

				var location = city;

				if (country !== " Norway") {
					location = city + ', ' + country;
				}

				var thisEvent = '';

				if (this.props.scope == "past") {

					thisEvent = 
						<div key={event.id} className="col-sm-6">
							<div className="row event-row" onClick={onClick}>
								<div className="text-uppercase text-center">
									{event.start.date} @ {location}
								</div>
							</div>
						</div>


				} else {

					thisEvent = 

						<div key={event.id} className="row event-row" onClick={onClick}>
							<div className="col-xs-4 text-uppercase">
								{event.start.date}
							</div>
							<div className="col-xs-4 text-center text-uppercase">
								{location}
							</div>
							<div className="col-xs-4 text-right text-uppercase">
								{event.venue.displayName}
							</div>
						</div>

				}

				this.setState({
					events: this.state.events.concat(thisEvent)
				});
			});

			// this.setState({loading: false})

		});

		// this.setState({
		// 	events: []
		// });
	}

	getMoreEvents() {
		// let moreEvents = [];
		// let count = this.state.events.length;
		// for (let i = 0; i < 10; i++) {
		// 	moreEvents.push(
		// 		<div key={'div' + count++} style={{background: 'cornsilk'}}>
		// 			Div no {count}
		// 		</div>
		// 	);
		// }
		// setTimeout(() => {
		// 	this.setState({events: this.state.events.concat(moreEvents)});
		// }, 500);
	}

	render () {

		// const scrollable = 
		// 	<div>
		// 		<InfiniteScroll
		// 			next={this.getMoreEvents.bind(this)}
		// 			hasMore={true}
		// 			loader={<h4>Loading...</h4>}
		// 		>
		// 			{this.state.events}
		// 		</InfiniteScroll>
		// 	</div>

		// if (this.state.loading) {
		// 	return <Preloader />
		// }

		return (
			<div className="events-list">
				<div className="row">
					{this.state.events}
				</div>
				<div className="row">
					<div className="col-md-1 col-md-offset-11 col-xs-2 col-xs-offset-10 text-right">
						<img className="img img-responsive songkick-logo" src="/images/powered-by-songkick-black.png" />
					</div>
				</div>
			</div>
		);
	}
}