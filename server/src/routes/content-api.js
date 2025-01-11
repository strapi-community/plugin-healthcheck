const routes = [
  {
    method: 'GET',
    path: '/ping',
    handler: 'healthcheck.ping',
    config: {
      description: 'Check if the server is alive',
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/server',
    handler: 'healthcheck.server',
    config: {
      description: 'Get alive and uptime information about the server',
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/database',
    handler: 'healthcheck.database',
    config: {
      description: 'Check alive, uptime, and size information about the database',
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/all',
    handler: 'healthcheck.all',
    config: {
      description: 'Get all healthcheck information about the server and database',
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/teapot',
    handler: 'healthcheck.teapot',
    config: {
      description: 'Just a funny joke',
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = routes;
