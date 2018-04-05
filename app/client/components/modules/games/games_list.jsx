App.GamesList = React.createClass({
    render() {
        return (
            <ul className="unstyled games list">
                {this.props.games.map((game, index) => {
                    return <App.GameItem key={index} game={game} />;
                })}
            </ul>
        );
    }
});