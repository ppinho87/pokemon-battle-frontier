Boards = new Mongo.Collection('boards');

Boards.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Boards.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let BoardsSchema = new SimpleSchema({
    'gameId': {
        type: String,
        label: 'The id of the game this board belongs to'
    },
    'owner': {
        type: String,
        label: 'The username of user that owns the board'
    },
    'createdAt': {
        type: Date,
        label: 'The date the board was created'
    },
    'status': {
        type: String,
        label: 'The status of the game',
        optional: true
    },
    'targets.$.id': {
        type: String,
        label: 'The id of the target cell'
    },
    'targets.$.status': {
        type: String,
        label: 'Status of the target cell'
    },
    'targets.$.isTarget': {
        type: Boolean,
        label: 'Target cell is targeted by opponent'
    },
    placementCount: {
        type: Number,
        label: 'The number of units placed on game board',
        min: 0,
        max: 5
    },
    targetId: {
        type: String,
        label: 'The id of target being attacked',
        optional: true
    }
});

Boards.attachSchema(BoardsSchema);