App.Logo = React.createClass({
    render() {
        return (
            <module className="animated fadeInDown logo module">
                <a className="logo" href={RouterHelpers.pathFor('root')}>Pokemon <i className="fa fa-dot-circle-o"></i> Battle</a>
            </module>
        );
    }
});