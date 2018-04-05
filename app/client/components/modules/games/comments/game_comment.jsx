App.GameComment = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        let commentId = this.props.comment._id;

        return {
            comment: Comments.findOne({_id: commentId})
        };
    },

    shouldComponentUpdate() {
        return true;
    },

    componentDidMount() {
        let $comments = $('.comments.list'),
            $comment = $('.comment.item:last-child');

        $comments.scrollTop($comments.scrollTop() + $comment.position().top);
    },

    render() {
        let sender = this.data.comment.sender,
            date = DateHelpers.format(this.data.comment.createdAt),
            comment = this.data.comment.comment;

        return (
            <li className="comment item">
                <h4 className="user">
                    <span className="date">[{date}]</span> {sender}:
                </h4>
                <p className="comment">{comment}</p>
            </li>
        );
    }
});