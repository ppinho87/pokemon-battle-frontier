App.Signup = React.createClass({
    componentDidMount() {
        Modules.client.signup({
            form: '#signup'
        });
    },
    handleSubmit(event) {
        event.preventDefault();
    },
    render() {
        return (
            <view className="animated fadeIn account signup view">
                <h2 className="title">Sign Up</h2>

                <form id="signup" className="signup form" onSubmit={this.handleSubmit}>
                    <div className="input group">
                        <label className="label" htmlFor="emailAddress"><i className="fa fa-envelope"></i></label>
                        <input type="email" name="emailAddress" className="email input" placeholder="Email Address"/>
                    </div>
                    <div className="input group">
                        <label className="label" htmlFor="username"><i className="fa fa-user"></i></label>
                        <input type="text" name="username" className="username input" placeholder="Username"/>
                    </div>
                    <div className="input group">
                        <label className="label" htmlFor="password"><i className="fa fa-unlock"></i></label>
                        <input type="password" name="password" className="password input" placeholder="Password"/>
                    </div>
                    <button type="submit" className="primary centered button">Sign Up</button>
                </form>
                <p className="message">Already have an account? <a className="route link" href={RouterHelpers.pathFor('login')}>Log In</a>.</p>
            </view>
        );
    }
});