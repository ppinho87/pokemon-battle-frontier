const publicRedirect = () => {
    if (Meteor.userId()) {
        FlowRouter.go('root');
    }
};

const publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [publicRedirect]
});

publicRoutes.route('/', {
    name: 'root',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Root />});
        GAnalytics.pageview();
    }
});

publicRoutes.route('/leaderboard', {
    name: 'leaderboard',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Leaderboard />});
        GAnalytics.pageview();
    }
});

publicRoutes.route('/signup', {
    name: 'signup',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Signup />});
        GAnalytics.pageview();
    }
});

publicRoutes.route('/login', {
    name: 'login',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Login />});
        GAnalytics.pageview();
    }
});

publicRoutes.route('/recover-password', {
    name: 'recoverPassword',
    action() {
        ReactLayout.render(App.Layout, {view: <App.RecoverPassword />});
        GAnalytics.pageview();
    }
});

publicRoutes.route('/reset-password/:token', {
    name: 'resetPassword',
    action() {
        ReactLayout.render(App.Layout, {view: <App.ResetPassword />});
        GAnalytics.pageview();
    }
});