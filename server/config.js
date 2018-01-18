Meteor.startup(function () {

	// Defining initial user credentials
	var initialUser = {};
	initialUser.email = Meteor.settings.private.initialUser.email;
	initialUser.password = Meteor.settings.private.initialUser.password;

	// Checking if initial user exists based on email
	var initialUserExists = Meteor.users.findOne({'emails.address': initialUser.email});

	if (!initialUserExists) {

		// If Initial user doesn't exist, create it
		let newUserId = Accounts.createUser( { email: initialUser.email, password: initialUser.password } );

		// Give initial user the role of admin
		Roles.addUsersToRoles( newUserId, 'super-admin', Roles.GLOBAL_GROUP );
	}

	// Set mail settings
	process.env.MAIL_URL = Meteor.settings.private.smtp;
});