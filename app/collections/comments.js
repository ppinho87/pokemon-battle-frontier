Comments = new Mongo.Collection('comments');

Comments.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Comments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let CommentsSchema = new SimpleSchema({
    'gameId': {
        type: String,
        label: 'The id of the game this comment belongs to'
    },
    'comment': {
        type: String,
        label: 'The contents of the comment'
    },
    'sender': {
        type: String,
        label: 'The username of user that sent the comment'
    },
    'createdAt': {
        type: Date,
        label: 'The date the board was created'
    }
});

Comments.attachSchema(CommentsSchema);