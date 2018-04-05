let administrators = [
    {
        name: {first: 'Admin', last: 'McAdmin'},
        username: 'admin',
        email: 'admin@spacebattle.co',
        password: 'admin'
    },
    {
        name: {first: 'HAL', last: '9000'},
        username: 'HAL9000',
        email: 'hal@spacebattle.co',
        password: 'daisy'
    }
];

let generateAccounts = () => {
    let usersExist = _checkIfAccountsExist(administrators.length);

    if (!usersExist) {
        _createUsers(administrators);
    }
};

let _checkIfAccountsExist = (count) => {
    let userCount = Meteor.users.find().count();
    return userCount < count ? false : true;
};

let _createUsers = (users) => {
    for (let i = 0; i < users.length; i++) {
        let user = users[i],
            userExists = _checkIfUserExists(user.email);

        if (!userExists) {
            _createUser(user);
        }
    }
};

let _checkIfUserExists = (email) => {
    return Meteor.users.findOne({'emails.address': email});
};

let _createUser = (user) => {
    Accounts.createUser({
        email: user.email,
        username: user.username,
        password: user.password,
        profile: {
            name: user.name
        }
    });
};

Modules.server.generateAccounts = generateAccounts;