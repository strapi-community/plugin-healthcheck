const { getService } = require('../utils');

module.exports = {
  async alive(ctx) {
    return getService('server').uptime();
  },

  async database(ctx) {
    return getService('database').uptime();
  },
};
