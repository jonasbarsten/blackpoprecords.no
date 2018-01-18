Meteor.methods({
	'addArtist': function (artist) {

		var artistExists = Artists.findOne({'nameLower': artist.name.toLowerCase()});

		if (artistExists) {
			return 'exists'
		} else {
			let newArtist = Artists.insert(artist);
			return newArtist;
		}

	},
	'deleteArtist': function (artistId) {

		// Delete files associated with artist from s3
		var artist = Artists.findOne({_id: artistId});

		if (artist.localImageId) {
			UserFiles.remove({_id: artist.localImageId});
		}

		// Delete artist
		Artists.remove({_id: artistId});
	},
	'changeArtistName': function (artistId, newName) {
		Artists.update({_id: artistId}, {$set: {name: newName}});
	},
	'changeArtistImage': function (artistId, imageId) {

		// Get old image id
		var artist = Artists.findOne({_id: artistId});

		if (artist.localImageId) {
			var oldId = artist.localImageId;
		}

		// Update to new image
		var link = UserFiles.findOne({_id: imageId}).link();

		Artists.update({_id: artistId}, {$set: {
			imageUrl: link,
			localImageId: imageId,
			lastChanged: new Date()
		}});

		// Remove old image
		if (oldId) {
			UserFiles.remove({_id: oldId});
		}
		
	},
	'updateArtist': function (artistId, field, content) {

		var setObject = {}

		setObject[field] = content;

		Artists.update(
			{_id: artistId},
			{
				$set: setObject
			}
		);
	},
	'addLinkToArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$push: {links: link}});
	},
	'removeLinkFromArtist': function (link, artistId) {

		// Schema validation done by simple schema

		Artists.update({_id: artistId}, {$pull: {links: {id: link.id}}});
	},
	'reorderArtistLinks': function (artistId, link, index) {

		Artists.update(
			{_id: artistId, 'links.id': link.id}, 
			{$set: {'links.$.sortIndex': index}}
		);
	},
	'updateSongkickId': function (artistId, songkickId) {
		Artists.update({_id: artistId}, {$set: {songkickId: songkickId}});
	}
})