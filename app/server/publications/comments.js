Meteor.publish('comments', function (selector) {
    check(selector, Object);
    return Comments.find(selector);
});

Meteor.publish('comment', function (commentId) {
    check(commentId, String);
    return Games.find({_id: commentId});
});
