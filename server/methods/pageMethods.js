Meteor.methods({
	'addPage': function (pageName, urlFriendlyName) {

		let exists = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (exists) {
			return 'exists';
		}

		var page = {
			name: pageName,
			urlFriendlyName: urlFriendlyName,
			lastChanged: new Date,
			lastChangedBy: Meteor.userId(),
			views: 0,
			created: new Date,
			createdBy: Meteor.userId()
		}

		Pages.insert(page);
	},
	'deletePage': function (urlFriendlyName) {
		Pages.remove({urlFriendlyName: urlFriendlyName});
	},
	'updatePageContent': function (urlFriendlyName, content) {
		Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {content: content}});
	},
	'togglePageInMenu': function (urlFriendlyName) {
		const page = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (page.isInMenu) {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInMenu: false}});
			return 'removed';
		} else {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInMenu: true}});
			return 'added';
		}

	},
	'pageView': function (urlFriendlyName) {
		Pages.update({urlFriendlyName: urlFriendlyName}, {$inc: {views: 1}});
	}
});