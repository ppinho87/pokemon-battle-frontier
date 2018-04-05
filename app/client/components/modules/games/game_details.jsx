App.GameDetails = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            subscription = Meteor.subscribe('game', gameId);

        return {
            isLoading: !subscription.ready(),
            game: Games.findOne({_id: gameId})
        };
    },

    // @TODO: refactor both player renders into own component

    renderCreator() {
        if (this.data.game.creator === null) {
            // @TODO: show button to add opponent ai
            return (
                <div className="player creator">
                    <span className="username label">
                        No Opponent
                    </span>
                </div>
            )
        } else {
            return (
                <div className="player creator">
                    <span className="username label">
                        {this.data.game.creator} <span className="points">
                        {this.data.game.creatorScore} points</span>
                    </span>
                </div>
            );
        }
    },

    renderDestroyer() {
        if (this.data.game.destroyer === null) {
            // @TODO: show button to add opponent ai
            return (
                <div className="player destroyer">
                    <span className="username label">
                        No Opponent
                    </span>
                </div>
            )
        } else {
            return (
                <div className="player destroyer">
                    <span className="username label">
                        {this.data.game.destroyer} <span className="points">
                        {this.data.game.destroyerScore} points</span>
                    </span>
                </div>
            );
        }
    },

    render() {
        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="game details module">
                    {this.renderCreator()}
                    {this.renderDestroyer()}
                </module>
            );
        }
    }
});