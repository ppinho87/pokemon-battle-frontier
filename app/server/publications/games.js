Meteor.publish('games', function (selector) {
    check(selector, Object);
    return Games.find(selector);
});

Meteor.publish('creatorsGames', function (selector) {
    check(selector, Object);
    return Games.find(selector, {fields: {'creator': 1}});
});

Meteor.publish('game', function (gameId) {
    check(gameId, String);
    return Games.find({_id: gameId});
});
