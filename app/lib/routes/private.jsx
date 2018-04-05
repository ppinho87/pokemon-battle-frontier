const privateRedirect = () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        FlowRouter.go('login');
    }
};

const privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [privateRedirect]
});

privateRoutes.route('/battle/:_id', {
    name: 'battle',
    action(params) {
        ReactLayout.render(App.Layout, {view: <App.Battle id={params._id} />});
        GAnalytics.pageview();
    }
});

privateRoutes.route('/dashboard', {
    name: 'dashboard',
    action() {
        ReactLayout.render(App.Layout, {view: <App.Dashboard />});
        GAnalytics.pageview();
    }
});