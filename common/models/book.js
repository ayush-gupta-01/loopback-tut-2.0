'use strict';

module.exports = function (Book) {
    Book.greet = function (msg, cb) {
        cb(null, msg);
    }

    Book.remoteMethod('greet', {
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } , "description" : "enter name" },
        returns: { arg: 'msg', type: 'object' },
        http: { path: '/greet', verb: 'post' }
    });
};
