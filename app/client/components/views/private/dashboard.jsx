App.Dashboard = React.createClass({
    render() {
        return (
            <view className="animated fadeIn dashboard view">
                <module className="module">
                    <p className="centered message">dashboard view coming soon</p>
                    <button type="button" className="centered secondary icon button" onClick={Meteor.logout}>
                        <i className="fa fa-power-off"></i> Logout
                    </button>
                </module>
            </view>
        );
    }
});