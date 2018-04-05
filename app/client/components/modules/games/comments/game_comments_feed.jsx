App.GameCommentsFeed = React.createClass({
    render() {
        return (
            <ul className="unstyled comments list">
                {this.props.comments.map((comment, index) => {
                    return <App.GameComment key={index} comment={comment}/>;
                })}
            </ul>
        );
    }
});