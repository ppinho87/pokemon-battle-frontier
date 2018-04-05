App.Root = React.createClass({
    render() {
        return (
            <view className="animated fadeIn root view">
                <App.Games />
                <App.GameCreate />
            </view>
        );
    }
});