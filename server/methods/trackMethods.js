Meteor.methods({
	'addTrack': function (track) {
		Tracks.insert(track);
	},
	'deleteTrack': function (track) {
		Tracks.remove(track);
	}
});