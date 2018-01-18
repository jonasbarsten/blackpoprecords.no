Artists = new Meteor.Collection( 'artists' );

Artists.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Artists.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const ArtistsSchema = new SimpleSchema({
	"name": {
		type: String
	},
	"nameLower": {
		type: String
	},
	"views": {
		type: Number,
		optional: true
	},
	"text": {
		type: String,
		optional: true
	},
	"bio": {
		type: Object,
		optional: true,
		blackbox: true
	},
	"songkickId": {
		type: Number,
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
	"releases": {
		type: [String],
		optional: true
	},
	"imageUrl": {
		type: String,
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
	}
});

Artists.attachSchema( ArtistsSchema );