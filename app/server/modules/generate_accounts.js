let administrators = [
    {
        name: {first: 'Admin', last: 'McAdmin'},
        username: 'admin',
        email: 'admin@spacebattle.co',
        password: 'admin'
    },
    {
        name: {first: 'ASH', last: '99'},
        username: 'ASH99',
        email: 'ash@email.com',
        password: 'password'
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