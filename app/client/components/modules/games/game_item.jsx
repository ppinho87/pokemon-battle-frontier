App.GameItem = React.createClass({
    handleGameJoin(event) {
        event.preventDefault();

        // @TODO: refactor - break down these calls
        let user = Meteor.user(),
            gameId = this.props.game._id;

        if (!user) {
            Bert.alert('not-logged-in', 'You need to be logged in to join a game.', 'warning');
        } else {
            let userIsPlaying = this.props.game.creator === user.username || this.props.game.destroyer === user.username,
                gameIsFull = this.props.game.playerCount === 2 && !userIsPlaying,
                pathDef = '/battle/:_id',
                params = {_id: gameId},
                path = FlowRouter.path(pathDef, params);

            if (gameIsFull) {
                // @TODO: method for joining a recently created and available game
                Bert.alert('game-full', 'This game is full.', 'warning');
            } else {
                if (userIsPlaying) {
                    FlowRouter.go(path);
                } else {

                    let joinAttributes = {
                        gameId: gameId,
                        destroyer: user.username
                    };

                    Meteor.call('joinGame', joinAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {
                            Bert.alert('Get ready to destroy!', 'success');

                            // @TODO: refactor - separate function for createGameBoard
                            let boardAttributes = {
                                gameId: gameId,
                                owner: user.username
                            };

                            Meteor.call('createGameBoard', boardAttributes, (error) => {
                                if (error) {
                                    Bert.alert(error.reason, 'success');
                                } else {
                                    FlowRouter.go(path);
                                }
                            });
                        }
                    });
                }
            }
        }
    },

    render() {
        let className = 'game item';

        if (this.props.game.playerCount === 2) {
            className += ' full'
        }

        return (
            <li className={className} onClick={this.handleGameJoin}>

                <h2 className="title">
                    {this.props.game.title}
                    <small className="meta">
                        created {DateHelpers.fromNow(this.props.game.createdAt)} by <span
                        className="user">{this.props.game.creator}</span>
                    </small>
                </h2>
            </li>
        );
    }
});