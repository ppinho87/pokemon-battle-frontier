App.GameBoards = React.createClass({
    mixins: [ReactMeteorData],

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let gameId = this.props.game._id,
            creator = this.props.game.creator,
            destroyer = this.props.game.destroyer,
            selector = {gameId: gameId},
            subscription = Meteor.subscribe('boards', selector);

        return {
            isLoading: !subscription.ready(),
            gameId: gameId,
            creator: creator,
            destroyer: destroyer,
            creatorBoard: Boards.findOne({gameId: gameId, owner: creator}),
            destroyerBoard: Boards.findOne({gameId: gameId, owner: destroyer}),
            game: Games.findOne({_id: gameId})
        };
    },

    // @TODO: refactor bot spawn into separate client module

    spawnBot(event) {
        event.preventDefault();
        let gameId = this.data.gameId,
            bot = 'HAL9000';

        // when bot is on offensive - generate random targetId (1 to 5 + A to E)
        // ensure random targetId is never the same each round (has to change after each attack)
        // add some generated comments when bot hits or misses or gets hit, etc (low priority)
        // this loops until game ends

        let joinAttributes = {
            gameId: gameId,
            destroyer: bot
        };

        Meteor.call('joinGame', joinAttributes, (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {

                let boardAttributes = {
                    gameId: gameId,
                    owner: bot
                };

                Meteor.call('createGameBoard', boardAttributes, (error, boardId) => {
                    if (error) {
                        Bert.alert(error.reason, 'success');
                    } else {
                        let board = boardId,
                            targets = ['5A', '2B', '4C', '3D', '1E'];

                        // @TODO: make a collection of unit placements for bot - get one at random

                        for (var target = 0; target < targets.length; target++) {
                            let targetAttributes = {
                                boardId: board._id,
                                targetId: targets[target]
                            };

                            Meteor.call('placeUnit', targetAttributes, (error) => {
                                if (error) {
                                    Bert.alert(error.reason, 'warning');
                                } else {
                                    console.log('Bot placed unit on ' + targetAttributes.targetId);
                                }
                            });
                        }

                        let updateAttributes = {
                            boardId: board._id,
                            status: 'ready'
                        };

                        Meteor.call('updateStatus', updateAttributes, (error) => {
                            if (error) {
                                Bert.alert(error.reason, 'warning');
                            } else {
                                Bert.alert('HAL9000 joins the battle!', 'success');
                            }
                        });
                    }
                });
            }
        });
    },

    goHome() {
        FlowRouter.go('root');
    },

    renderNotice() {
        let game = this.data.game,
            gameOver = game.winner && game.completedAt;

        // @TODO: messages module

        if (gameOver) {
            return (
                <module className="messages module">
                    <p className="centered light message">
                        The game is over! The winner is <span className="user">{game.winner}</span>!
                    </p>
                    <button type="button" className="primary centered button" onClick={this.goHome}>Take me home</button>
                </module>
            );
        } else {
            return (
                <module className="messages module">
                    <p className="centered light message">
                        This game has been marked completed! Find or make a new game!
                    </p>
                    <button type="button" className="primary centered button" onClick={this.goHome}>Take me home</button>
                </module>
            );
        }
    },

    // @TODO: refactor board render into smaller modules - employ micro-branching

    renderGameBoard() {
        let user = Meteor.user(),
            isCreator = this.data.creator === user.username,
            creatorBoard = this.data.creatorBoard,
            destroyerBoard = this.data.destroyerBoard,
            noOpponent = creatorBoard.status === 'ready' && !destroyerBoard,
            gameProps = {
                gameId: this.data.gameId,
                creator: this.data.creator
            };

        if (isCreator) {
            if (noOpponent) {
                // @TODO: messages module - move into renderNotice
                return (
                    <module className="messages module">
                        <p className="centered light message">
                            No one dares to oppose you! Wait for someone foolish enough to try...
                        </p>
                        <button type="button" className="primary centered button" onClick={this.spawnBot}>Spawn bot
                        </button>
                    </module>
                );
            } else {

                let ready = creatorBoard.status === 'ready' && destroyerBoard.status === 'ready',
                    offensive = creatorBoard.status === 'offense',
                    botOpponent = creatorBoard.status === 'defense' && destroyerBoard.owner === 'HAL9000';

                if (ready || offensive) {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                    );
                } else {

                    if (botOpponent) {
                        // @TODO: make this into separate function - break it up

                        let targets = _.filter(creatorBoard.targets, function(target) {
                                if (target.status === 'empty' || target.status === 'selected') {
                                    return target
                                }
                                //return ~target.status.indexOf('empty', 'selected');
                            }),
                            attackTarget = _.sample(targets);

                        let attackAttributes = {
                            boardId: creatorBoard._id,
                            boardStatus: 'offense',
                            targetId: attackTarget.id,
                            targetStatus: attackTarget.status
                        };

                        setTimeout(() => {
                            Meteor.call('attackTarget', attackAttributes, (error, report) => {
                                if (error) {
                                    console.error(error.reason, 'warning');
                                } else {

                                    let targetStatus = report.status,
                                        updateAttributes = {
                                        boardId: destroyerBoard._id,
                                        status: 'defense'
                                    };

                                    Meteor.call('updateStatus', updateAttributes, (error) => {
                                        if (error) {
                                            console.error(error.reason, 'warning');
                                        } else {

                                            if (targetStatus === 'destroyed') {
                                                let scoreAttributes = {
                                                    gameId: this.data.gameId,
                                                    attacker: destroyerBoard.owner
                                                };

                                                Meteor.call('updateScore', scoreAttributes, (error) => {
                                                    if (error) {
                                                        console.error(error.reason, 'warning');
                                                    } else {

                                                        if (this.data.game.destroyerScore === 25) {
                                                            let winnerAttributes = {
                                                                gameId: this.data.gameId,
                                                                winner: destroyerBoard.owner
                                                            };

                                                            Meteor.call('declareWinner', winnerAttributes, (error) => {
                                                                if (error) {
                                                                    Bert.alert(error.reason, 'warning');
                                                                } else {
                                                                    Bert.alert(game.destroyer + ' is the winner of this battle', 'success');
                                                                }
                                                            });
                                                        } else {
                                                            Bert.alert('HAL9000 destroyed your position at ' + attackAttributes.targetId + '!', 'warning');
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }, 3000);
                    }

                    return (
                        <App.GameBoard gameProps={gameProps} boardId={creatorBoard._id}/>
                    );
                }
            }
        } else {
            let noUnitsDeployed = destroyerBoard.status === null,
                ready = destroyerBoard.status === 'ready' && creatorBoard.status === 'ready',
                defensive = destroyerBoard.status === 'defense';

            if (noUnitsDeployed) {
                return (
                    <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                );
            } else {


                if (ready || defensive) {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={destroyerBoard._id}/>
                    );
                } else {
                    return (
                        <App.GameBoard gameProps={gameProps} boardId={creatorBoard._id}/>
                    );
                }
            }
        }
    },

    render () {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            let gameOver = this.data.game.winner || this.data.game.completedAt;

            return (
                <module className="game boards module">
                    {(gameOver) ? this.renderNotice() : this.renderGameBoard()}
                </module>
            )
        }
    }
});