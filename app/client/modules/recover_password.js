let recoverPassword = (options) => {
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
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            }
        },
        submitHandler() {
            _handleRecovery(component);
        }
    };
};

let _handleRecovery = () => {
    let email = $('[name="emailAddress"]').val();

    Accounts.forgotPassword({email: email}, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Check your inbox for a reset link!', 'success');
        }
    });
};

Modules.client.recoverPassword = recoverPassword;