Tracks = new Meteor.Collection( 'tracks' );

Tracks.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Tracks.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const TracksSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"views": {
		type: Number,
		optional: true
	},
	"lyrics": {
		type: String,
		optional: true
	},
	"artists": {
		type: [String],
		optional: true
	},
	"duration": {
		type: Number,
		optional: true
	},
	"release": {
		type: String,
		optional: true
	},
	"trackNumber": {
		type: Number,
		optional: true
	},
	"lastChanged": {
		type: Date,
		optional: true
	},
	"spotifyRaw": {
		type: Object,
		optional: true,
		blackbox: true
	}
});

Tracks.attachSchema( TracksSchema );