App.Games = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let selector = {completedAt: null},
            subscription = Meteor.subscribe('games', selector);

        return {
            isLoading: !subscription.ready(),
            games: Games.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },
    render() {
        let noGames = this.data.games.length === 0;

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <module className="animated fadeInDown games module">
                    {noGames ? <p className="centered message">There are no active games at the moment!</p> :
                        <App.GamesList games={this.data.games}/>}
                </module>
            );
        }
    }
});