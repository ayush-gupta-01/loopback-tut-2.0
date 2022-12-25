// 'use strict';

// module.exports = function (User) {
//     User.validatesLengthOf("password", { min: 5, message: { min: "Password is too short" } })
// }

// // module.exports = function(user) {
// //     user.validatesPresenceOf('name', 'email');
// //     user.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
// //     user.validatesInclusionOf('gender', {in: ['male', 'female']});
// //     user.validatesExclusionOf('domain', {in: ['www', 'billing', 'admin']});
// //     user.validatesNumericalityOf('age', {int: true});
// //     user.validatesUniquenessOf('email', {message: 'email is not unique'});
// //   };

var config = require('../../server/config.json');
var path = require('path');

module.exports = function (User) {
    //send verification email after registration
    User.afterRemote('create', function (context, userInstance, next) {
        console.log('> user.afterRemote triggered');

        var verifyOptions = {
            type: 'email',
            to: userInstance.email,
            from: 'noreply@loopback.com',
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/verified',
            user: userInstance
        };

        userInstance.verify(verifyOptions, function (err, response, next) {
            if (err) return next(err);

            console.log('> verification email sent:', response);

            context.res.render('response', {
                title: 'Signed up successfully',
                content: 'Please check your email and click on the verification link ' -
                    'before logging in.',
                redirectTo: '/',
                redirectToLinkText: 'Log in'
            });
        });
    })
}