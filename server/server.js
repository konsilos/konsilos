Meteor.startup(function () {
    Meteor.publish('AdviceList', function() {
        return adviceList.find({ creator: this.userId });
    });
    process.env.MAIL_URL = 'smtp://postmaster%40mg.futureadvices.com:1231u1z456130n4rd0789@smtp.mailgun.org:587';
});

Accounts.config({
    sendVerificationEmail: true
});

Meteor.methods({
    addAdvice: function(adviceData) {
        //TODO proper authorization checks (Iron Router?)
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        adviceData.creator = Meteor.userId();
        adviceList.insert(adviceData);
    }
});

//TODO i18n
Accounts.emailTemplates.siteName = 'Future Advices';
Accounts.emailTemplates.from = 'Future Advices <contact@futureadvices.com>';
//TODO we currently have no user.profile
var welcomeMessage = function(user) {
    return 'Welcome to Future Advices, ' + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.subject = welcomeMessage;
Accounts.emailTemplates.verifyEmail.subject = welcomeMessage;
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Welcome to Future Advices,........... Click to verify you email: ' + url;
};

// function isAdmin(user) {
//     var adminEmails = ['lfilho@gmail.com'];
//     var adminUser = Meteor.users.findOne({ 'emails.address': adminEmails[0] });
//
//     return adminUser && adminUser._id === user._id;
// }

//TODO remove and do proper user logic later
function TEMP_ALLOW(userId) {
    return userId;
}

//TODO Do the following in a smarter way, check slides from spotify/soundcloud crew on how\
//they hire / interview code examples
adviceList.allow({
    insert: TEMP_ALLOW,
    update: TEMP_ALLOW,
    remove: TEMP_ALLOW
});
