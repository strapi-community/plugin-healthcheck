const { getConfig, getService } = require('../utils');

module.exports = {
  async transform(type) {
    const config = getConfig();

    let aliveUptime;
    let client;
    let connections;
    let memory;
    let size;
    let version;

    switch (type) {
      case 'server':
        aliveUptime = await getService('server').uptime();
        memory = config.server.memory ? await getService('server').memory() : undefined;
        version = config.server.version ? await getService('server').version() : undefined;

        return {
          alive: aliveUptime.alive,
          uptime: config.server.uptime ? aliveUptime.uptime : undefined,
          memory,
          version,
        };

      case 'database':
        client = config.database.client ? await getService('database').client() : undefined;
        connections = config.database.connections
          ? await getService('database').connections()
          : undefined;
        aliveUptime = await getService('database').uptime();
        size = config.database.size ? await getService('database').size() : undefined;
        version = config.database.version ? await getService('database').version() : undefined;

        return {
          alive: aliveUptime.alive,
          client,
          connections,
          uptime: config.database.uptime ? aliveUptime.uptime : undefined,
          size,
          version,
        };

      default:
        throw new Error('Invalid healthcheck construct type');
    }
  },
};
