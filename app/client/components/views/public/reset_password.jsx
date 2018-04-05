App.ResetPassword = React.createClass({
    componentDidMount() {
        Modules.client.resetPassword({
            form: '#resetPassword'
        });
    },
    handleSubmit(event) {
        event.submitHandler();
    },
    render() {
        return (
            <view className="animated fadeIn reset account password view">
                    <h2 className="title">Reset Password</h2>

                    <form id="resetPassword" className="reset password form" onSubmit={this.handleSubmit}>
                        <p className="info alert">To reset your password, enter a new one below. You will be logged in with
                            your new password.</p>

                        <div className="input group">
                            <label className="label" htmlFor="newPassword"><i className="fa fa-lock"></i></label>
                            <input type="password" name="newPassword" className="password input" placeholder="New password"/>
                        </div>
                        <div className="input group">
                            <label className="label" htmlFor="password"><i className="fa fa-lock"></i></label>
                            <input type="password" name="repeatNewPassword" className="password input" placeholder="Repeat new password"/>
                        </div>
                        <button type="submit" className="primary centered button">Reset Password &amp; Login</button>
                    </form>
            </view>
        );
    }
});