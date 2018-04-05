App.Logo = React.createClass({
    render() {
        return (
            <module className="animated fadeInDown logo module">
                <a className="logo" href={RouterHelpers.pathFor('root')}>Space <i className="fa fa-rocket"></i> Battle</a>
            </module>
        );
    }
});