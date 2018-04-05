let signup = (options) => {
    _validate(options.form, options.component);
};

let _validate = (form, component) => {
    $(form).validate(validation(component));
};

let validation = (component) => {
    return {
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            },
            username: {
                required: 'Need a username here.',
                minlength: 'Need at least three characters, please.'
            },
            password: {
                required: 'Need a password here.',
                minlength: 'Use at least six characters, please.'
            }
        },
        submitHandler() {
            _handleSignup(component);
        }
    };
};

let _handleSignup = () => {
    let user = {
        email: $('[name="emailAddress"]').val(),
        username: $('[name="username"]').val(),
        password: $('[name="password"]').val()
    };

    Accounts.createUser(user, (error) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            Bert.alert('Welcome!', 'success');
        }
    });
};

Modules.client.signup = signup;