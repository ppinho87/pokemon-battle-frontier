let fromNow = (date) => {
    return moment(date).fromNow();
};

let format = (date) => {
    return moment(date).format('lll');
};

DateHelpers = {
    fromNow: fromNow,
    format: format
};