const contentAPIRoutes = require('./content-api');

const routes = {
  'content-api': {
    type: 'content-api',
    routes: contentAPIRoutes,
  },
};

module.exports = routes;
