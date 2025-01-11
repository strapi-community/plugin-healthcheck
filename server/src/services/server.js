const { convertUptime } = require('../utils');
const v8 = require('v8');

module.exports = {
  memory() {
    return {
      memory: {
        total: {
          raw: process.memoryUsage().heapTotal / 1024 / 1024,
          text: Math.round(process.memoryUsage().heapTotal / 1024 / 1024, 2) + ' MB',
        },
        used: {
          raw: process.memoryUsage().heapUsed / 1024 / 1024,
          text: Math.round(process.memoryUsage().heapUsed / 1024 / 1024, 2) + ' MB',
        },
        free: {
          raw: (process.memoryUsage().heapTotal - process.memoryUsage().heapUsed) / 1024 / 1024,
          text:
            Math.round(
              (process.memoryUsage().heapTotal - process.memoryUsage().heapUsed) / 1024 / 1024,
              2
            ) + ' MB',
        },
        max: {
          raw: v8.getHeapStatistics().heap_size_limit / 1024 / 1024,
          text: Math.round(v8.getHeapStatistics().heap_size_limit / 1024 / 1024, 2) + ' MB',
        },
        percent: {
          totalRaw: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
          totalText:
            ((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100).toFixed(2) +
            ' %',
          maxRaw: (process.memoryUsage().heapUsed / v8.getHeapStatistics().heap_size_limit) * 100,
          maxText:
            (
              (process.memoryUsage().heapUsed / v8.getHeapStatistics().heap_size_limit) *
              100
            ).toFixed(2) + ' %',
        },
      },
    };
  },

  uptime: () => {
    return {
      alive: true,
      uptime: convertUptime(process.uptime()),
    };
  },

  version: () => {
    return {
      application: strapi['internal_config'].info.version,
      strapi: strapi['internal_config'].info.strapi,
    };
  },
};
