App.GameComments = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        let gameId = FlowRouter.getParam('_id'),
            selector = {gameId: gameId},
            subscription = Meteor.subscribe('comments', selector);

        return {
            isLoading: !subscription.ready(),
            comments: Comments.find({}, {sort: {createdAt: 1}}).fetch()
        };
    },

    render() {
        let noComments = this.data.comments.length === 0;

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <modal className="game comments modal">
                    {noComments ? <p className="centered light message">There are no comments for this game.</p> :
                    <App.GameCommentsFeed comments={this.data.comments}/>}
                    <App.GameCommentForm />
                </modal>
            );
        }
    }
});