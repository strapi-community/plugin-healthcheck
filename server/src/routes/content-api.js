const routes = [
  {
    method: 'GET',
    path: '/alive',
    handler: 'healthcheck.alive',
    config: {
      description: 'Check if the server is alive',
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/database',
    handler: 'healthcheck.database',
    config: {
      description: "Check if the server's database is alive",
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = routes;
