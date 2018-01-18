Meteor.publish('currentUser', function () {
	return Meteor.users.find(this.userId);
});

// PUBLISH

Meteor.publish('userFiles', function () {
	// if ( Roles.userIsInRole(this.userId, ['super-admin'])) {
	// 	return UserFiles.find().cursor;
	// } else if (Roles.userIsInRole(this.userId, ['applicant'])) {
	// 	return UserFiles.find({'userId': this.userId}).cursor;
	// } else if (Roles.userIsInRole(this.userId, ['moderator'])) {
	// 	return UserFiles.find({'meta.attachTo.type': 'application'}).cursor;
	// } else {
	// 	this.stop();
 //    	return;
	// }

	return UserFiles.find().cursor;
	
});

Meteor.publish('userList', function (){

	// var usersRoles = Roles.getRolesForUser(this.userId);

	// usersRoles.forEach(function(role) {
	// 	console.log('role: ' + role);
	// 	switch (role) {
	// 		case 'super-admin':
	// 			return Meteor.users.find();
	// 			console.log('super');
	// 		case 'manage-users':
	// 			return Meteor.users.find({'roles': 'moderator'});
	// 			console.log('manage');
	// 		case 'moderator':
	// 			return Meteor.users.find({'roles': 'applicant'});
	// 			console.log('moderator');
	// 		case 'user':
	// 			break;
	// 		default:
	// 			console.log('stop');
	// 			this.stop();
	//     		return;
	// 	}
	// });

	// TODO: do this smarter:

	if ( Roles.userIsInRole(this.userId, ['super-admin'], Roles.GLOBAL_GROUP)) {
		
    	return Meteor.users.find();

	} else if (Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {

		// Return all users except those with role "super-admin"
		return Meteor.users.find({
			"roles": {$ne: "super-admin"}
		});

		// Check if user also is moderator
		// if (Roles.userIsInRole(this.userId, ['moderator'])) {
		// 	return Meteor.users.find({
		// 		$or: [
		// 			{'roles': 'moderator'},
		// 			{'roles': 'applicant'},
		// 		]
		// 	});
		// } else {

		// 	return Meteor.users.find({'roles': 'moderator'});
		// }

	// } else if (Roles.userIsInRole(this.userId, ['moderator'])) {
	
	// 	// Check if user also can manage users
	// 	if (Roles.userIsInRole(this.userId, ['manage-users'])) {
	// 		return Meteor.users.find({
	// 			$or: [
	// 				{'roles': 'moderator'},
	// 				{'roles': 'applicant'},
	// 			]
	// 		});
	// 	} else {

	// 		return Meteor.users.find({'roles': 'applicant'});
	// 	}

	} else {
		
    	this.stop();
    	return;
	}
});

Meteor.publish('profile', function () {
	return Meteor.users.find({_id: this.userId});
});

// Meteor.publish('moderatorList', function (){
// 	if ( Roles.userIsInRole(this.userId, ['super-admin', 'admin', 'manage-users'])) {
//     	return Meteor.users.find({'roles': 'moderator'});
// 	} else {
		
// 		// user not authorized
//     	this.stop();
//     	return;
// 	}
// });

// Meteor.publish('applicantList', function (){
// 	if ( Roles.userIsInRole(this.userId, ['super-admin', 'moderator'])) {
//     	return Meteor.users.find({'roles': 'applicant'});
// 	} else {
		
// 		// user not authorized
//     	this.stop();
//     	return;
// 	}
// });

Meteor.publish('invites', function (){ 

	if ( Roles.userIsInRole(this.userId, ['super-admin', 'manage-users'], Roles.GLOBAL_GROUP)) {
    	return Invites.find();
	} else {
		// user not authorized
    	this.stop();
    	return;
	}

});

Meteor.publish('artists', function () {
	return Artists.find();
});

Meteor.publish('releases', function () {
	return Releases.find();
});

Meteor.publish('tracks', function () {
	return Tracks.find();
});

Meteor.publish('pages', function () {
	return Pages.find();
});

// Meteor.publish('applications', function (){ 

// 	if ( Roles.userIsInRole(this.userId, ['super-admin', 'moderator'])) {
//     	return Applications.find();

// 	} else if (Roles.userIsInRole(this.userId, 'applicant')) {

// 		// TODO: remove grading fields

// 		return Applications.find({'applicantId': this.userId});

// 	} else {

// 		// user not authorized
//     	this.stop();
//     	return;
// 	}

// });

// Meteor.publish('siteInfo', function (){ 
// 	return SiteInfo.find();
// });