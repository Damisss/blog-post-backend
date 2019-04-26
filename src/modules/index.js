const { routes } = require('./user/user.router');
const { postRoutes } = require('../modules/post/post.router');

const apiRoutes = function (app) {
  app.use('/api/v1/users', routes);
  app.use('/api/v1/posts', postRoutes);
};

module.exports = { apiRoutes };
