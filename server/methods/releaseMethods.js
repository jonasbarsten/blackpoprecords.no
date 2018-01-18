Meteor.methods({
	'addRelease': function (release) {

		if (release.spotifyRaw) {
			var spotifyId = release.spotifyRaw.id;
		}

		let existingRelease = Releases.findOne({name: release.name, albumType: release.albumType});

		if (existingRelease) {

			// Duplicate

			// Check if the release is already in db, if so add the artist to its artist array if not already there

			// Check if supplied release has artists array
			if (release.artists) {

				// Check if existing release contains artists array 
				if (existingRelease.artists) {

					// Check if supplied artist is already in existing array
					if (existingRelease.artists.indexOf(release.artists[0]) == -1) {
						Releases.update({_id: existingRelease._id}, {$push: {artists: release.artists[0]}});
					}
				}
			}
			
		} else {
			let newRelease = Releases.insert(release);

			var ids = {
				localReleaseId: newRelease
			};

			if (spotifyId) {
				ids['spotifyReleaseId'] = spotifyId;
			}

			return ids;
		}
		
	},
	'deleteRelease': function (releaseId) {

		// Delete files associated with artist from s3
		var release = Releases.findOne({_id: releaseId});

		if (release.localImageId) {
			UserFiles.remove({_id: release.localImageId});
		}

		// Delete artist
		Releases.remove({_id: releaseId});
	},
	'changeReleaseName': function (releaseId, newName) {
		Releases.update({_id: releaseId}, {$set: {name: newName}});
	},
	'changeReleaseImage': function (releaseId, imageId) {

		// Get old image id
		var release = Releases.findOne({_id: releaseId});

		if (release.localImageId) {
			var oldId = release.localImageId;
		}

		// Update to new image
		var link = UserFiles.findOne({_id: imageId}).link();

		Releases.update({_id: releaseId}, {$set: {
			imageUrl: link,
			localImageId: imageId,
			lastChanged: new Date()
		}});

		// Remove old image
		if (oldId) {
			UserFiles.remove({_id: oldId});
		}
		
	},
	'changeReleaseDate': function (releaseId, date) {

		Releases.update({_id: releaseId}, {$set: {releaseDate: date}});
	},
	'changeReleaseType': function (releaseId, type) {
		Releases.update({_id: releaseId}, {$set: {albumType: type}});
	},
	'addLinkToRelease': function (link, releaseId) {

		// Schema validation done by simple schema

		Releases.update({_id: releaseId}, {$push: {links: link}});
	},
	'removeLinkFromRelease': function (link, releaseId) {

		// Schema validation done by simple schema

		Releases.update({_id: releaseId}, {$pull: {links: {id: link.id}}});
	},
	'updateReleaseAbout': function (releaseId, about) {

		Releases.update({_id: releaseId}, {$set: {about: about}});
	},
	'attachReleaseToArtist': function (artistId, release) {
		// $push will not create array if it doen't exist, $addToSet also only adds element if it doesn't already exist
		Releases.update({_id: release._id}, {$addToSet: {artists: artistId}});
	},
	'detachArtistFromRelease': function (artistId, releaseId) {
		Releases.update({_id: releaseId}, {$pull: {artists: artistId}});
	},
	'reorderReleaseLinks': function (releaseId, link, index) {

		Releases.update(
			{_id: releaseId, 'links.id': link.id}, 
			{$set: {'links.$.sortIndex': index}}
		);
	}
})