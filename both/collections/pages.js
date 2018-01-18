Pages = new Meteor.Collection( 'pages' );

Invites.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Invites.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const PagesSchema = new SimpleSchema({
	"name": {
		type: String,
		optional: true
	},
	"urlFriendlyName": {
		type: String,
		optional: true
	},
	"lastChanged": {
		type: Date                                  
	},
	"lastChangedBy": {
		type: String
	},
	"isInMenu": {
		type: Boolean,
		optional: true
	},
	"views": {
		type: Number,
		optional: true
	},
	"created": {
		type: Date,
		optional: true
	},
	"createdBy": {
		type: String,
		optional: true
	},
	"content": {
		type: Object,
		optional: true,
		blackbox: true
	}
});

Pages.attachSchema( PagesSchema );