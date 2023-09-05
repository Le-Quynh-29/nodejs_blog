const newRouter = require('./new');
const siteRouter = require('./site');

function route(app) {
 app.use('/news', newRouter);
 app.use('/', siteRouter);
}

module.exports = route;
