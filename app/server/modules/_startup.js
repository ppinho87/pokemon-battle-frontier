let startup = () => {
    _generateAccounts();
};

var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;