const newRouter = require('./new');
const siteRouter = require('./site');
const courseRouter = require('./course');

function route(app) {
    app.use('/news', newRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
