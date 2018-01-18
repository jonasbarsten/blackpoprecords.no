Invites = new Meteor.Collection( 'invites' );

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

const InvitesSchema = new SimpleSchema({
	"email": {
		type: String,
		label: "Email address of the person requesting the invite."
	},
	"token": {
		type: String,
		label: "The token for this invitation.",
		optional: true
	},
	"assignedRoles": {
		type: [String],
		optional: true
	},
	"globalGroup": {
		type: Boolean
	},
	"roleGroup": {
		type: [String]
	},
	"dateInvited": {
		type: Date,
		label: "The date this user was invited",
	}
});

Invites.attachSchema( InvitesSchema );