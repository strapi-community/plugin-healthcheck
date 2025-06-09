const { convertUptime } = require('../utils');

module.exports = {
  client() {
    return strapi.config.database.connection.client;
  },

  name() {
    return strapi.config.database.connection.connection.database || 'strapi';
  },

  async connections() {
    const database = strapi.db.connection;
    const client = this.client();

    let maxConn;
    let queryMaxConn;
    let currentConn;
    let queryCurrentConn;

    switch (client) {
      case 'postgres':
        try {
          queryMaxConn = await database.raw(
            "SELECT setting::int FROM pg_settings WHERE name = 'max_connections';"
          );
          maxConn = queryMaxConn.rows[0].setting;
          queryCurrentConn = await database.raw('SELECT count(*) FROM pg_stat_activity;');
          currentConn = queryCurrentConn.rows[0].count;
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'mysql':
        try {
          queryMaxConn = await database.raw('show variables like "max_connections"');
          maxConn = parseInt(queryMaxConn[0][0].Value);
          queryCurrentConn = await database.raw('show status like "Threads_connected"');
          currentConn = parseInt(queryCurrentConn[0][0].Value);
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'sqlite':
        queryMaxConn = true;
        maxConn = 1;
        queryCurrentConn = true;
        currentConn = 1;
        break;

      default:
        throw new Error(`Client ${client} is not supported`);
    }

    return {
      max: maxConn,
      current: currentConn,
    };
  },

  async uptime() {
    const database = strapi.db.connection;
    const client = this.client();

    let uptime;
    let queryUptime;

    switch (client) {
      case 'postgres':
        try {
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
          queryUptime = await database.raw('show status like "Uptime"');
          uptime = parseInt(queryUptime[0][0].Value);
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'sqlite':
        queryUptime = true;
        uptime = process.uptime();
        break;

      default:
        throw new Error(`Client ${client} is not supported`);
    }

    return {
      alive: queryUptime ? true : false,
      uptime: convertUptime(uptime),
    };
  },

  async size() {
    const database = strapi.db.connection;
    const client = this.client();
    const name = this.name();

    let size;
    let querySize;

    switch (client) {
      case 'postgres':
        try {
          querySize = await database.raw(`SELECT pg_database_size('${name}') as size;`);
          size = {
            raw: querySize.rows[0].size / 1000 / 1000,
            text: `${(querySize.rows[0].size / 1000 / 1000).toFixed(2)} MB`,
          };
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'mysql':
        try {
          querySize = await database.raw(
            `SELECT table_schema AS "database", sum(data_length + index_length) AS "size" FROM information_schema.TABLES where table_schema = "${name}";`
          );
          size = {
            raw: querySize[0][0].size / 1000 / 1000,
            text: `${(querySize[0][0].size / 1000 / 1000).toFixed(2)} MB`,
          };
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'sqlite':
        try {
          querySize = await database.raw(
            `SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size();`
          );
          size = {
            raw: querySize[0].size / 1000 / 1000,
            text: `${(querySize[0].size / 1000 / 1000).toFixed(2)} MB`,
          };
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      default:
        throw new Error(`Client ${client} is not supported`);
    }

    return size;
  },

  async version() {
    const database = strapi.db.connection;
    const client = this.client();

    let versionQuery;
    let version;

    switch (client) {
      case 'postgres':
        try {
          versionQuery = await database.raw('SELECT version();');
          version = versionQuery.rows[0].version;
          version = 'PostgreSQL: ' + version.split(' ')[1];
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'mysql':
        try {
          versionQuery = await database.raw('SELECT VERSION();');
          version = versionQuery[0][0]['VERSION()'];

          if (version.includes('MariaDB')) {
            version = 'MariaDB: ' + version.split('-')[0];
          } else {
            version = 'MySQL: ' + version;
          }
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      case 'sqlite':
        try {
          versionQuery = await database.raw('SELECT sqlite_version();');
          version = 'SQLite: ' + versionQuery[0]['sqlite_version()'];
        } catch (error) {
          strapi.log.error(error);
        }
        break;

      default:
        throw new Error(`Client ${client} is not supported`);
    }

    return version;
  },
};
