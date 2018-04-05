App.Loading = React.createClass({
    render() {
        return (
            <module className="animated fadeIn loading module">
                <div className="loader">
                    <p className="message">Hatching Plans...</p>
                    <div className="hands"></div>
                    <div className="body"></div>
                    <div className="head">
                        <div className="eye"></div>
                    </div>
                </div>
            </module>
        );
    }
});