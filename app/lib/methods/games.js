Meteor.methods({
    createGame(creatorAttributes) {
        check(creatorAttributes, {
            title: String
        });

        let now = new Date(),
            user = Meteor.user(),
            duplicateTitle = Games.findOne({title: creatorAttributes.title, completedAt: null});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'You need to be logged in to create games.');
        }
        if (duplicateTitle) {
            return Meteor.Error('game-title-already-exists', 'This game title already exists.');
        } else {

            let game = _.extend(creatorAttributes, {
                creator: user.username,
                creatorScore: 0,
                createdAt: now,
                destroyer: null,
                destroyerScore: 0,
                playerCount: 1,
                winner: null,
                completedAt: null
            }), gameId = Games.insert(game);

            return {
                _id: gameId
            };
        }
    },
    joinGame(joinAttributes) {
        check(joinAttributes, {
            gameId: String,
            destroyer: String
        });

        let user = Meteor.user(),
            game = Games.findOne({_id: joinAttributes.gameId});

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to join a game');
        }
        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        } else {
            Games.update(joinAttributes.gameId, {
                $set: {'destroyer': joinAttributes.destroyer, 'playerCount': 2}
            });
        }
    },
    completeGame(gameId) {
        check(gameId, String);

        let user = Meteor.user(),
            game = Games.findOne({_id: gameId}),
            now = new Date();

        if (!user) {
            throw new Meteor.Error('user-not-logged-in', 'Need to be logged in to close a game');
        }
        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        } else {
            Games.update(gameId, {
                $set: {'completedAt': now}
            });
        }
    },
    updateScore(scoreAttributes) {
        check(scoreAttributes, {
            gameId: String,
            attacker: String
        });

        let game = Games.findOne({_id: scoreAttributes.gameId, completedAt: null});

        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        }

        let creatorScoredPoints = game.creator === scoreAttributes.attacker,
            winner = game.creatorScore === 25 || game.destroyerScore === 25,
            points = +5;

        if (winner) {
            throw new Meteor.Error('winner-already-exists', 'The max number of points already has been awarded.');
        } else {
            if (creatorScoredPoints) {
                Games.update(scoreAttributes.gameId, {
                    $inc: {'creatorScore': points}
                });

                let response = {attacker: 'creator'};

                return response;
            } else {
                Games.update(scoreAttributes.gameId, {
                    $inc: {'destroyerScore': points}
                });

                let response = {attacker: 'destroyer'};

                return response;
            }
        }
    },
    declareWinner(winnerAttributes) {
        check(winnerAttributes, {
            gameId: String,
            winner: String
        });

        let game = Games.findOne({_id: winnerAttributes.gameId}),
            now = new Date();

        if (!game) {
            throw new Meteor.Error('game-does-not-exist', 'This game is not in the collection');
        } else {
            Games.update(winnerAttributes.gameId, {
                $set: {'winner': winnerAttributes.winner, 'completedAt': now}
            });
        }
    }
});
