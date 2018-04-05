Games = new Mongo.Collection('games');

Games.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Games.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let GamesSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of the game'
    },
    'creator': {
        type: String,
        label: 'The username of user that created the game'
    },
    'creatorScore': {
        type: Number,
        label: 'The score of the user that created the game'
    },
    'createdAt': {
        type: Date,
        label: 'The date the game was created'
    },
    'destroyer': {
        type: String,
        label: 'The username of user that joined the game',
        optional: true
    },
    'destroyerScore': {
        type: Number,
        label: 'The score of the user that joined the game'
    },
    'playerCount': {
        type: Number,
        label: 'The player count of the game'
    },
    'winner': {
        type: String,
        label: 'The username of the winner of this game',
        optional: true
    },
    'completedAt': {
        type: Date,
        label: 'The date the game was completed',
        optional: true
    }
});

Games.attachSchema(GamesSchema);