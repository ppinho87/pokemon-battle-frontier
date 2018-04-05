App.Layout = React.createClass({
    render() {
        return (
            <layout className="layout">
                <header className="header">
                    <App.Logo />
                </header>

                <main className="main">
                    {this.props.view}
                </main>

                <footer className="footer">
                    <App.Menu />
                    <App.Copyright />
                </footer>
            </layout>
        );
    }
});