App.GameBoard = React.createClass({
    mixins: [ReactMeteorData],

    PropTypes: {
        gameProps: React.PropTypes.object,
        boardId: React.PropTypes.string
    },

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let user = Meteor.user(),
            boardId = this.props.boardId,
            subscription = Meteor.subscribe('board', boardId);

        return {
            isLoading: !subscription.ready(),
            gameId: this.props.gameProps.gameId,
            creator: this.props.gameProps.creator,
            board: Boards.findOne({_id: boardId}),
            userBoard: Boards.findOne({owner: user.username}),
            game: Games.findOne({_id: this.props.gameProps.gameId})
        };
    },

    // @TODO: refactor unit deployment into separate client module

    handleUnitDeployment(event) {
        event.preventDefault();

        let updateAttributes = {
            boardId: this.data.board._id,
            status: 'ready'
        }, allUnitsPlaced = this.data.board.placementCount === 5;

        if (allUnitsPlaced) {
            Meteor.call('updateStatus', updateAttributes, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {
                    Bert.alert('Your units are deployed, get ready for battle!', 'success');
                }
            });
        } else {
            Bert.alert('You still have units in reserve, place them on the board!', 'warning');
        }
    },

    // @TODO: refactor target attack into separate client module - employ micro-branching

    handleTargetAttack(event) {
        event.preventDefault();

        let user = Meteor.user(),
            gameId = this.data.gameId,
            targetId = this.data.board.targetId,
            targets = this.data.board.targets,
            target = _.find(targets, function (target) {
                return target.id === targetId
            }),
            userBoardId = this.data.userBoard._id;

        if (!target) {
            Bert.alert('You must lock on a target before attacking', 'warning');
        } else {
            let attackAttributes = {
                boardId: this.data.board._id,
                boardStatus: 'offense',
                targetId: target.id,
                targetStatus: target.status
            };

            // @TODO: break all these calls down into functions

            Meteor.call('attackTarget', attackAttributes, (error, report) => {
                if (error) {
                    Bert.alert(error.reason, 'warning');
                } else {

                    let targetStatus = report.status,
                        updateAttributes = {
                            boardId: userBoardId,
                            status: 'defense'
                        };

                    Meteor.call('updateStatus', updateAttributes, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'warning');
                        } else {

                            if (targetStatus === 'destroyed') {

                                let scoreAttributes = {
                                    gameId: gameId,
                                    attacker: user.username
                                };

                                Meteor.call('updateScore', scoreAttributes, (error, response) => {
                                    if (error) {
                                        Bert.alert(error.reason, 'warning');
                                    } else {

                                        let game = this.data.game;

                                        if (response.attacker === 'creator' && game.creatorScore === 25) {
                                            let winnerAttributes = {
                                                gameId: gameId,
                                                winner: game.creator
                                            };

                                            Meteor.call('declareWinner', winnerAttributes, (error) => {
                                                if (error) {
                                                    Bert.alert(error.reason, 'warning');
                                                } else {
                                                    Bert.alert(game.creator + ' is the winner of this battle', 'success');
                                                }
                                            });
                                        }
                                        if (response.attacker === 'destroyer' && game.destroyerScore === 25) {
                                            let winnerAttributes = {
                                                gameId: gameId,
                                                winner: game.destroyer
                                            };

                                            Meteor.call('declareWinner', winnerAttributes, (error) => {
                                                if (error) {
                                                    Bert.alert(error.reason, 'warning');
                                                } else {
                                                    Bert.alert(game.destroyer + ' is the winner of this battle', 'success');
                                                }
                                            });
                                        } else {
                                            Bert.alert('You completely wiped out the enemy\'s position at ' + attackAttributes.targetId + '!', 'success');
                                        }
                                    }
                                });
                            } else {
                                Bert.alert('Your attack failed! No units were found at ' + attackAttributes.targetId + '.', 'warning');
                            }
                        }
                    });
                }
            });
        }
    },

    // @TODO: component for board actions

    renderActions() {
        let user = Meteor.user(),
            isOwner = this.data.board.owner === user.username,
            noUnitsDeployed = this.data.board.status === null,
            ready = this.data.board.status === 'ready',
            offensive = this.data.board.status === 'defense';

        if (noUnitsDeployed && isOwner) {
            return (
                <module className="actions module">
                    <button type="button" className="fluid centered button" onClick={this.handleUnitDeployment}>Deploy
                        Units
                    </button>
                </module>
            );
        }
        if (offensive && !isOwner) {
            return (
                <module className="actions module">
                    <button type="button" className="fluid centered button" onClick={this.handleTargetAttack}>Attack
                        Target
                    </button>
                </module>
            );
        }
        if (ready && !isOwner) {
            return (
                <module className="actions module">
                    <button type="button" className="fluid centered button" onClick={this.handleTargetAttack}>Attack
                        Target
                    </button>
                </module>
            );
        } else {
            return (
                // @TODO: messages module
                <module className="messages module">
                    <p className="light message">
                        Opponent is planning something...
                    </p>
                </module>
            );
        }
    },

    render() {
        let boardProps = {
            gameId: this.data.gameId,
            boardId: this.data.board._id,
            owner: this.data.board.owner,
            status: this.data.board.status,
            targetId: this.data.board.targetId
        };

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game board module" id={boardProps.boardId}>
                    <div className="grid">
                        {this.data.board.targets.map((target) => {
                            return (
                                <App.GameBoardTarget key={target.id} boardProps={boardProps} targetProps={target}/>
                            );
                        })}
                    </div>
                    {this.renderActions()}
                </module>
            );
        }
    }
});