const { getService } = require('../utils');

module.exports = {
  async ping(ctx) {
    return {
      data: {
        message: 'pong',
      },
    };
  },

  async server(ctx) {
    return {
      data: await getService('response').transform('server'),
    };
  },

  async database(ctx) {
    return {
      data: await getService('response').transform('database'),
    };
  },

  async all(ctx) {
    return {
      data: {
        server: await getService('response').transform('server'),
        database: await getService('response').transform('database'),
      },
    };
  },

  async teapot(ctx) {
    ctx.status = 418;
    return {
      data: {
        message: "I'm a teapot, short and stout. Here is my handle, here is my spout.",
      },
    };
  },
};
