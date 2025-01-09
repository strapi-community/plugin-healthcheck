const { convertUptime, getConfig } = require('../utils');

module.exports = {
  async uptime() {
    const config = getConfig();
    const database = strapi.db.connection;
    const databaseConfig = strapi.config.database;
    const client = databaseConfig.connection.client;

    let uptime;
    let size;
    let queryUptime;
    let querySize;

    switch (client) {
      case 'postgres':
        try {
          // If size is enabled, get the size of the database in MB
          if (config.database.size) {
            querySize = await database.raw("SELECT pg_database_size('strapi') as size;");
          }
          size = {
            raw: querySize.rows[0].size / 1024 / 1024,
            text: `${(querySize.rows[0].size / 1024 / 1024).toFixed(2)} MB`,
          };

          // Get the Server Uptime and also use this for alive check
          queryUptime = await database.raw(
            'select extract(epoch from current_timestamp - pg_postmaster_start_time()) as uptime;'
          );
          uptime = queryUptime.rows[0].uptime;
        } catch (error) {
          strapi.log.error(error);
        }
        break;
      case 'mysql':
        try {
          // If size is enabled, get the size of the database in MB
          if (config.database.size) {
            querySize = await database.raw(
              'SELECT table_schema AS "database", sum(data_length + index_length) AS "size" FROM information_schema.TABLES where table_schema = "strapi";'
            );
          }
          size = {
            raw: querySize[0][0].size / 1024 / 1024,
            text: `${(querySize[0][0].size / 1024 / 1024).toFixed(2)} MB`,
          };

          // Get the Server Uptime and also use this for alive check
          queryUptime = await database.raw('show status like "Uptime"');
          uptime = parseInt(queryUptime[0][0].Value);
        } catch (error) {
          strapi.log.error(error);
        }
        break;
      default:
        throw new Error(`Client ${client} is not supported`);
    }

    let response = {
      alive: queryUptime ? true : false,
      client: config.database.client ? client : undefined,
      uptime: config.database.detailedUptime ? convertUptime(uptime) : undefined,
      size: config.database.size ? size : undefined,
    };

    return response;
  },
};
