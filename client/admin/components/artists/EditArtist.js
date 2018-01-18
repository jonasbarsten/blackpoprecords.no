import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import swal from 'sweetalert';
import {browserHistory} from 'react-router';
import Masonry from 'react-masonry-component';
import Reorder from 'react-reorder';
import _ from 'lodash';

import UploadSingleFile from '../../../shared/components/files/UploadSingleFile.js';
import BarstenEditor from '../../../shared/components/utilities/BarstenEditor.js';
import AddLink from '../../../shared/components/links/AddLink.js';

import AddRelease from '../releases/AddRelease.js';
import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';

var ListItem = React.createClass({

  render: function () {

  	return (
  		<div>
  			{this.props.item.name}
  		</div>
  	);

    // return React.createElement('div', {
    //   className: 'inner col-sm-3',
    //   style: {
    //     color: this.props.item.color
    //   }
    // }, this.props.sharedProps ? this.props.sharedProps.prefix : undefined, this.props.item.name);
  }
});

export default class EditArtist extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				releases: Meteor.subscribe('releases')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.releases.stop();
	}

	getArtist() {
		return Artists.find({_id: this.props.params.artistId}).fetch();
	}

	getReleases() {
		return Releases.find({artists: this.props.params.artistId}).fetch();
	}

	deleteArtist () {

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this artist!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('deleteArtist', this.props.params.artistId, function(err, data) {
				if (err) {
					swal("Deleted!", "The user cound not be deleted.", "warning");
				} else {
					browserHistory.push('/admin/artists');
					Bert.alert('Artist deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	openEditBanner () {
		
		$('#newArtistBanner').trigger('click');
	}

	editName () {
		 swal({
			title: "Change Artist Name",
			text: "Well well well, go ahead!",
			type: "input",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New Artist name",
			closeOnConfirm: true
		},
		(inputValue) => {
			if (inputValue === false) return false;
			
			if (inputValue === "") {
				swal.showInputError("You need to write something!");
				return false
			}
			
			Meteor.call('changeArtistName', this.props.params.artistId, inputValue, function (err, data) {
				if (err) {
					swal.showInputError("Whoops, try again!");
				} else {
					Bert.alert('Name changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
			
		});
	}

	editRelease(release) {
		browserHistory.push('/admin/release/edit/' + release._id);
	}

	onBioChange(editorState) {

		Meteor.call('updateArtist', this.props.params.artistId, 'bio', editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('Bio saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	addLink(link) {

		Meteor.call('addLinkToArtist', link, this.props.params.artistId, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Link added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	deleteLink(event, link) {

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this link!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('removeLinkFromArtist', link, this.props.params.artistId, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Link removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});

	}

	reorderLinks(event, itemThatHasBeenMoved, itemsPreviousIndex, itemsNewIndex, reorderedArray) {

		reorderedArray.map((link, i) => {
			Meteor.call('reorderArtistLinks', this.props.params.artistId, link, i);
		});
	}

	updateSongkickId(e) {
		e.preventDefault();
		console.log(this.refs.songkickId.value);

		Meteor.call('updateSongkickId', this.props.params.artistId, this.refs.songkickId.value, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Songkick ID updated', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	// linkClicked(event, itemThatHasBeenClicked, itemsIndex) {
	// 	console.log(itemThatHasBeenClicked);
	// }

	render () {


		const masonryOptions = {
    		transitionDuration: 0
		};

		return (
			<div id="artistEdit">
				{this.getArtist().map((artist) => {

					const songkickId = artist.songkickId ? artist.songkickId : '';

					var links = '';

					if (artist.links) {

						if (artist.links[0]) {

							var sortedLinks = _.sortBy(artist.links, 'sortIndex');

							links = <Reorder
										// The key of each object in your list to use as the element key
										itemKey='id'
										// Lock horizontal to have a vertical list
										// lock='horizontal'
										// The milliseconds to hold an item for before dragging begins
										holdTime='100'
										// The list to display
										list={sortedLinks}
										// A template to display for each list item
										template={ListItem}
										// Function that is called once a reorder has been performed
										callback={this.reorderLinks.bind(this)}
										// Class to be applied to the outer list element
										listClass='row link-list'
										// Class to be applied to each list item's wrapper element
										itemClass='col-sm-3'
										// A function to be called if a list item is clicked (before hold time is up)
										itemClicked={this.deleteLink.bind(this)}
										// The item to be selected (adds 'selected' class)
										selected={this.state.selected}
										// The key to compare from the selected item object with each item object
										selectedKey='uuid'
										// Allows reordering to be disabled
										disableReorder={false}
									/>
						}
					}


					return (
						<div key={artist._id}>

							<div className="container-fluid">

								<div className="artist-banner" onClick={this.openEditBanner.bind(this)}>
									<img src={artist.imageUrl} className="img-responsive" />
								</div>

								<UploadSingleFile 
									elementId="newArtistBanner" 
									attatchToCategory="artistImage"
									attatchToId={artist._id}
									postUploadMethod="changeArtistImage"
									postUploadMethodArgument={artist._id}
								/>
								
								<div className="container">

									<div className="artist-single-content">

										<div className="text-center text-uppercase" onClick={this.editName.bind(this)}>
											<h2>{artist.name}</h2>
										</div>

										<hr />

										<AddLink onSubmit={(link) => {this.addLink(link)}} />

										<br />

										<p>Click link to delete, hold and drag to reorder</p>

										{links}
										
										<hr />

										<h4>Songkick ID</h4>
										<form onSubmit={this.updateSongkickId.bind(this)}>
											<input
												type="text"
												ref="songkickId"
												placeholder="Songkick ID"
												defaultValue={songkickId}
											/>
										</form>

										<hr />

										<h4>Bio</h4>

										<BarstenEditor 
											onChange={(editorState) => {this.onBioChange(editorState)}} 
											content={artist.bio}
										/>

										<br />

										<hr />

										<AddRelease artistId={artist._id}/>

										<hr />

										<h4>Edit releases</h4>

							            <Masonry
							            	className={''} // default '' 
							            	options={masonryOptions}
							            	elementType={'div'} // default 'div'
							            	disableImagesLoaded={false} // default false 
							            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
							            >

											{this.getReleases().map((release) => {
										
												return <ReleaseCard key={release._id} release={release} onClick={() => {this.editRelease(release)}}/>
											})}

										</Masonry>

										<div className="row artist-single-releases">

										</div>


										<hr />
										<div className="deleteArtistField" onClick={this.deleteArtist.bind(this)}>
											<h4>Delete artist</h4>
										</div>
									</div>
									
								</div>

							</div>

						</div>
					);
				})}
			</div>
		);
	}
}