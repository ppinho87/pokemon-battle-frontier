Meteor.methods({
    postComment: function (commentAttributes) {
        check(commentAttributes, {
            gameId: String,
            comment: String
        });

        let now = new Date(),
            user = Meteor.user(),
            game = Games.findOne(commentAttributes.gameId),
            noComment = !commentAttributes.comment;

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to login to post a comment.');
        }
        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game no longer exists, cannot post the comment.');
        }
        if (noComment) {
            return Meteor.Error('no-comment', 'There is no comment to post.');
        } else {
            let comment = _.extend(_.pick(commentAttributes, 'gameId', 'comment'), {
                sender: user.username,
                createdAt: now
            });

            let postedComment = Comments.insert(comment);

            return postedComment;
        }
    }
});