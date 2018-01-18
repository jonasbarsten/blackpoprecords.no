import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Masonry from 'react-masonry-component';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

export default class AttachRelease extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				releases: Meteor.subscribe('releases')
			},
			search: '',
			result: []
		}
	}

	componentWillUnmount() {
		this.state.subscription.releases.stop();
	}

	getItems() {
		if (this.state.search !== '') {
			return Releases.find().fetch();
		} else {
			return [];
		}
	}

	search() {
		this.setState({
			search: this.refs.query.value
		});
	}

	attachRelease(release) {

		Meteor.call('attachReleaseToArtist', this.props.artistId, release, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Release attached', 'success', 'growl-bottom-right', 'fa-smile-o');
				this.setState({
					search: ''
				});
				this.refs.query.value = '';
			}
		});
	}

	preventDefault(e) {
		e.preventDefault();
	}

	render() {

		const masonryOptions = {
    		transitionDuration: 0
		};

		var filteredItems = this.getItems().filter(
				(item) => {
					return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
				}
			)

		return(
			<div>

					<input
						onChange={this.search.bind(this)}
						
						type="text"
						ref="query"
						placeholder="Search ..."
					/>

				<br />
				<br />

				<div className="row">


		            <Masonry
		            	className={''} // default '' 
		            	elementType={'div'} // default 'div'
		            	options={masonryOptions}
		            	disableImagesLoaded={false} // default false 
		            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
		            >

						{filteredItems.map((item) => {
							
							return <ReleaseCard key={item._id} release={item} onClick={() => {this.attachRelease(item)}}/>
						})}

					</Masonry>
				</div>

			</div>
		);
	}
}