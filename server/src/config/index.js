module.exports = {
  default: {
    server: {
      uptime: true,
      memory: true,
      version: true,
    },
    database: {
      client: true,
      connections: true,
      uptime: true,
      size: true,
      version: true,
    },
  },
  validator() {},
};
