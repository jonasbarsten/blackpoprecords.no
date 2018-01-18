Releases = new Meteor.Collection( 'releases' );

// Make the name field searchable by making an index called text

if (Meteor.isServer) {
	Releases._ensureIndex({name: 'text'});
}


Releases.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Releases.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ReleasesSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"views": {
		type: Number,
		optional: true
	},
	"releaseDate": {
		type: Date,
		optional: true
	},
	"releaseDatePrecision": {
		type: String,
		optional: true
	},
	"about": {
		type: Object,
		optional: true,
		blackbox: true
	},
	"artists": {
		type: [String],
		optional: true
	},
	"imageUrl": {
		type: String,
		optional: true
	},
	"links": {
		type: [Object],
		optional: true
	},
	"links.$.name": {
		type: String,
		optional: true
	},
	"links.$.url": {
		type: String,
		optional: true
	},
	"links.$.id": {
		type: String,
		optional: true
	},
	"links.$.sortIndex": {
		type: Number,
		optional: true
	},
	"localImageId": {
		type: String,
		optional: true
	},
	"lastChanged": {
		type: Date,
		label: "Last changed",
	},
	"spotifyRaw": {
		type: Object,
		optional: true,
		blackbox: true // For some reason to be able to push object on insert
	},
	"albumType": {
		type: String,
		optional: true
	}
});

Releases.attachSchema( ReleasesSchema );