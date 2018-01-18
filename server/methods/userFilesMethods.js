Meteor.methods({
	'RemoveFile': function (fileId) {
		UserFiles.remove({_id: fileId});
	}
});