App.GameCommentForm = React.createClass({
    handleSubmit(event) {
        event.preventDefault();
        let gameId = FlowRouter.getParam('_id'),
            commentAttributes = {
                gameId: gameId,
                comment: $('[name="comment"]').val()
            };

        Meteor.call('postComment', commentAttributes, (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                $('[name="comment"]').val('');
            }
        });
    },

    render() {
        return (
            <form className="game comment form" onSubmit={this.handleSubmit}>
                <div className="input group">
                    <label className="label" htmlFor="comment"><i className="fa fa-comment"></i></label>
                    <input type="text" name="comment" className="comment input" placeholder="Write a comment..."
                           autofocus/>
                    <button type="submit" className="primary icon button"><i className="fa fa-send"></i></button>
                </div>
            </form>
        );
    }
});