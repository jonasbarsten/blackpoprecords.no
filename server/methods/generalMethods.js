Meteor.methods({
	'getServerTime': function () {
		return Date.parse(new Date());
	}
});