FlowRouter.notFound = {
    action() {
        ReactLayout.render(App.Layout, {view: <App.Redirect />});
    }
};

Accounts.onLogin(() => {
    let currentRoute = FlowRouter.current();
    if (currentRoute && currentRoute.route.group.name === 'public') {
        FlowRouter.go('root');
    }
});

if (Meteor.isClient) {
    Tracker.autorun(() => {
        if (!Meteor.userId() && FlowRouter.current().route) {
            FlowRouter.go('login');
        }
    });
}