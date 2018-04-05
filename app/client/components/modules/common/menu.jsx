App.Menu = React.createClass({
    PropTypes: {},

    shouldComponentUpdate() {
        return true;
    },

    handleModalToggle(event) {
        event.preventDefault();

        $('.modal').toggleClass('active');
    },

    handleCompleteGameClick(event) {
        event.preventDefault();
        // @TODO: refactor - move this call into gameComplete with reactive gameId

        let gameId = FlowRouter.getParam('_id');

        Meteor.call('completeGame', gameId, (error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                Bert.alert('Game completed!', 'success');
                FlowRouter.go('root');
            }
        });
    },

    // @TODO: move to actions module
    renderLeftButton() {
        // @TODO: make a router helper
        if (FlowRouter.current().route.name === 'battle') {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleCompleteGameClick}>
                    <i className="fa fa-ban"></i>
                </button>
            )
        } else {
            return (
                <button type="button" className="left secondary icon button" onClick={this.handleModalToggle}>
                    <i className="fa fa-gamepad"></i>
                </button>
            )
        }
    },

    renderRightButton() {
        // @TODO: make a router helper
        if (FlowRouter.current().route.name === 'root') {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('dashboard')}>
                    <i className="fa fa-users"></i>
                </a>
            );
        }
        if (FlowRouter.current().route.name === 'battle') {
            return (
                <button type="button" className="right secondary icon button" onClick={this.handleModalToggle}>
                    <i className="fa fa-comments-o"></i>
                </button>
            );
        } else {
            return (
                <a className="right secondary icon button" href={RouterHelpers.pathFor('root')}>
                    <i className="fa fa-home"></i>
                </a>
            );
        }
    },

    renderButtons() {
        // @TODO: move these buttons into own component with propTypes for different button varieties
        if (!Meteor.loggingIn() && Meteor.user()) {
            return (
                <module className="actions module">
                    {this.renderLeftButton()}
                    {this.renderRightButton()}
                </module>

            );
        } else {
            return (
                <module className="actions module">
                    <a className="right secondary icon button" href={RouterHelpers.pathFor('login')}>
                        <i className="fa fa-plug"></i>
                    </a>
                </module>
            );
        }
    },

    render() {
        return (
            <module className="menu module">
                {this.renderButtons()}
            </module>
        );
    }
});