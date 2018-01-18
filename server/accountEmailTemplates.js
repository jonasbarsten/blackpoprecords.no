Accounts.emailTemplates.siteName = Meteor.settings.public.siteTitle;

var fromString = Meteor.settings.public.siteTitle + ' Accounts <no-reply@' + Meteor.settings.public.urlStripped + '>';

Accounts.emailTemplates.from = fromString;

Accounts.emailTemplates.resetPassword = {
	subject(user) {
		return "Reset your password on " + Meteor.settings.public.siteTitle;
	},
	text(user, url) {
		return `Hello!
Click the link below to reset your password.
${url}
If you didn't request this email, please ignore it.
Thanks.
`
	},
	html(user, url) {
		// This is where HTML email content would go.
		// See the section about html emails below.
	}
};