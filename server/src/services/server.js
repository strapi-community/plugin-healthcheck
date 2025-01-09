const { convertUptime, getConfig } = require('../utils');

module.exports = {
  uptime: () => {
    const config = getConfig();

    let response = {
      alive: true,
      uptime: config.alive.detailedUptime ? convertUptime(process.uptime()) : undefined,
    };

    return response;
  },
};
