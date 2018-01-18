import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import swal from 'sweetalert';
import {browserHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Reorder from 'react-reorder';
import _ from 'lodash';

import UploadSingleFile from '../../../shared/components/files/UploadSingleFile.js';
import BarstenEditor from '../../../shared/components/utilities/BarstenEditor.js';
import AddLink from '../../../shared/components/links/AddLink.js';
import ListLinks from '../../../shared/components/links/ListLinks.js'
import ArtistCard from '../../../front/components/artists/ArtistCard.js'


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

export default class EditRelease extends TrackerReact(React.Component) {


	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				releases: Meteor.subscribe('releases'),
				tracks: Meteor.subscribe('tracks')
			},
			startDate: moment()
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.releases.stop();
		this.state.subscription.tracks.stop();
	}


	getArtist(artistId) {
		return Artists.find({_id: artistId}).fetch();
	}

	getRelease() {
		return Releases.find({_id: this.props.params.releaseId}).fetch();
	}

	getTracks() {
		return Tracks.find({release: this.props.params.releaseId}, {sort: {trackNumber: 1}}).fetch();
	}

	deleteRelease () {

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this release!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('deleteRelease', this.props.params.releaseId, function(err, data) {
				if (err) {
					swal("Deleted!", "The release cound not be deleted.", "warning");
				} else {
					browserHistory.goBack();
					Bert.alert('Release deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	openEditImage () {
		
		$('#newReleaseImage').trigger('click');
	}

	editName () {
		 swal({
			title: "Change Release Name",
			text: "Well well well, go ahead!",
			type: "input",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New Release name",
			closeOnConfirm: true
		},
		(inputValue) => {
			if (inputValue === false) return false;
			
			if (inputValue === "") {
				swal.showInputError("You need to write something!");
				return false
			}
			
			Meteor.call('changeReleaseName', this.props.params.releaseId, inputValue, function (err, data) {
				if (err) {
					swal.showInputError("Whoops, try again!");
				} else {
					Bert.alert('Name changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
			
		});
	}

	addLink(link) {

		Meteor.call('addLinkToRelease', link, this.props.params.releaseId, function (err, res) {
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
			Meteor.call('removeLinkFromRelease', link, this.props.params.releaseId, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Link removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});

	}

	onAboutChange(editorState) {

		Meteor.call('updateReleaseAbout', this.props.params.releaseId, editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('About saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	changeReleaseDate(date) {

		Meteor.call('changeReleaseDate', this.props.params.releaseId, date.toDate(), function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Release date changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	changeReleaseType () {
		 swal({
			title: "Change release type",
			text: "Album / EP / Single / etc ...",
			type: "input",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New release type",
			closeOnConfirm: true
		},
		(inputValue) => {
			if (inputValue === false) return false;
			
			if (inputValue === "") {
				swal.showInputError("You need to write something!");
				return false
			}
			
			Meteor.call('changeReleaseType', this.props.params.releaseId, inputValue, function (err, data) {
				if (err) {
					swal.showInputError("Whoops, try again!");
				} else {
					Bert.alert('Type changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
			
		});
	}

	detachArtist(artistId) {

		swal({
			title: "Are you sure?",
			text: "You may re-attach this artist later and the artist will not be deleted",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, detach it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('detachArtistFromRelease', artistId, this.props.params.releaseId, function (err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Artist detached', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	reorderLinks(event, itemThatHasBeenMoved, itemsPreviousIndex, itemsNewIndex, reorderedArray) {

		reorderedArray.map((link, i) => {
			Meteor.call('reorderReleaseLinks', this.props.params.releaseId, link, i);
		});
	}

	render () {
		return (
			<div id="releaseEdit">
				{this.getRelease().map((release) => {

					const releaseType = release.albumType ? release.albumType : 'no album type ...';

					var links = '';

					if (release.links) {
						if (release.links[0]) {

							var sortedLinks = _.sortBy(release.links, 'sortIndex');

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
						<div key={release._id}>

							<div className="container-fluid">

								<div className="release-banner" onClick={this.openEditImage.bind(this)}>
									<img src={release.imageUrl} className="img-responsive" />
								</div>

								<UploadSingleFile 
									elementId="newReleaseImage" 
									attatchToCategory="releaseImage"
									attatchToId={release._id}
									postUploadMethod="changeReleaseImage"
									postUploadMethodArgument={release._id}
								/>
								
								<div className="container">

									<div className="release-single-content">

										<div className="text-center">
											<h2 onClick={this.editName.bind(this)}>{release.name}</h2>
										</div>

										<div className="row">
											<div className="col-sm-6">
												<p onClick={this.changeReleaseType.bind(this)}>{releaseType}</p>
											</div>
											<div className="col-sm-6 text-right">

												<DatePicker 
													withPortal
													showMonthDropdown 
													showYearDropdown 
													dropdownMode="select"
													dateFormat="YYYY-MM-DD"
													selected={moment(release.releaseDate)}
													onChange={this.changeReleaseDate.bind(this)}
												/>

											</div>
										</div>

										<hr />

										<AddLink onSubmit={(link) => {this.addLink(link)}} />

										<br />

										<p>Click link to delete ... </p>

										{links}

										<hr />

										<h4>About</h4>

										<BarstenEditor 
											onChange={(editorState) => {this.onAboutChange(editorState)}} 
											content={release.about}
										/>

										<hr />

										<h4>Tracks</h4>

										<ul>

										{this.getTracks().map((track) => {

											var x = track.duration / 1000;
											const seconds = Math.round(x % 60);
											x = x / 60;
											const minutes = Math.round(x % 60);

											return <li key={track._id}>{track.trackNumber} - {track.name} - {minutes}:{seconds}</li>
										})}

										</ul>
										<hr />

										<p>Click artist to remove from release (artist will not be removed) ... </p>

										<div className="row">

											{release.artists.map((artistId) => {
												var artist = this.getArtist(artistId);

												artist = artist[0];

												if (artist) {
													return <ArtistCard 
																key={artist._id} 
																artist={artist} 
																onClick={() => {this.detachArtist(artist._id)}}
															/>
												}
											})}

										</div>



										<hr />
										<div className="deleteArtistField" onClick={this.deleteRelease.bind(this)}>
											<h4>Delete release</h4>
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