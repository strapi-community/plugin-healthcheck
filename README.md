<div align="center">
<h1>Strapi Healthcheck Plugin</h1>
	
<p style="margin-top: 0;">Adds additional API endpoints for checking health of Strapi Components</p>
	
<p>
  <a href="https://discord.strapi.io">
    <img src="https://img.shields.io/discord/811989166782021633?color=blue&label=strapi-discord" alt="Strapi Discord">
  </a>
  <a href="https://www.npmjs.com/package/@strapi-community/plugin-healthcheck">
    <img src="https://img.shields.io/npm/v/@strapi-community/plugin-healthcheck/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.org/package/strapi-plugin-healthcheck">
    <img src="https://img.shields.io/npm/dm/@strapi-community/plugin-healthcheck" alt="Monthly download on NPM" />
  </a>
</p>
</div>

## Table of Contents <!-- omit in toc -->

- [🚦 Current Status](#-current-status)
- [🛑 Foreword](#-foreword)
- [✨ Features](#-features)
- [🤔 Motivation](#-motivation)
- [🖐 Requirements](#-requirements)
- [⏳ Installation](#-installation)
- [🔧 Configuration](#-configuration)
  - [Sample Configuration](#sample-configuration)
  - [Configuration Options](#configuration-options)
- [API Endpoints](#api-endpoints)
  - [Ping Endpoint Sample](#ping-endpoint-sample)
  - [Server Endpoint Sample](#server-endpoint-sample)
  - [Database Endpoint Sample](#database-endpoint-sample)
    - [PostgreSQL](#postgresql)
    - [MySQL/MariaDB](#mysqlmariadb)
    - [SQLite](#sqlite)
  - [All Endpoint Sample](#all-endpoint-sample)
- [Contributing](#contributing)
- [License](#license)

## 🚦 Current Status

This package is currently maintained and should be considered **Stable** in terms of state. I/We are currently accepting contributions and/or dedicated contributors to help develop and maintain this package.

For more information on contributing please see [the contrib message below](#contributing).

## 🛑 Foreword

This package's lead maintainer is an employee of Strapi however this package is not officially maintained by Strapi Solutions SAS nor Strapi, Inc. and is currently maintained in the free time of the lead maintainer.

> [!WARNING]
**Absolutely no part of this code should be considered covered under any agreement you have with Strapi proper** including but not limited to any Enterprise and/or Cloud Agreement you have with Strapi.

## ✨ Features

These are the primary features that are finished or currently being worked on:

- [x] Generic `ping` endpoint to check if the server is running (good for checking network response time)
- [x] Generic `server` endpoint to check if the server is running, server uptime, server memory usage, and server/strapi version
- [x] Generic `database` endpoint to check if the database is connected, current/max connections, current database uptime, total database size, and database version
- [x] Generic `all` endpoint to check all components at once
- [x] Completely configurable to disable any data you don't want to be shown
- [ ] Integration with other plugins and providers (Redis, Upload, ect)

## 🤔 Motivation

The purpose of this package is to have a deeper insight into the health of a Strapi instance. This is especially useful for monitoring and debugging purposes.

## 🖐 Requirements

> [!CAUTION]
> This plugin will not work with Strapi v3 or v4 projects

Supported Strapi Versions:

| Strapi Version | Plugin Version | Supported | Tested On |
|----------------|----------------|-----------|-----------|
| v3.x.x         | N/A            | ❌         | N/A       |
| v4.x.x         | N/A            | ❌         | N/A       |
| v5.x.x         | >= 1.0.0       | ✅         | Dec 2025  |

## ⏳ Installation

Install the plugin in your Strapi project or your Strapi plugin.

| Strapi Version | Plugin Version | Package Manager | Command                                         |
|----------------|----------------|-----------------|-------------------------------------------------|
| v5.x.x         | Latest         | Yarn            | `yarn add @strapi-community/plugin-healthcheck` |
| v5.x.x         | Latest         | npm             | `npm i @strapi-community/plugin-healthcheck`    |

## 🔧 Configuration

There is a very simple configuration to tailor the plugin to your needs and enable or disable certain responses (like the database size).

By default, all options are enabled, however you must enable specific endpoints in the Users-Permissions configuration or API Tokens Configuration to access them.

### Sample Configuration

```javascript
// ./config/plugins.js

module.exports = (env) => ({
// ...
  healthcheck: {
    enabled: true,
    config: {
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
  },
// ...
});
```

### Configuration Options

| Option                 | Type    | Default | Description                    |
|------------------------|---------|---------|--------------------------------|
| `server`               | Object  | `{}`    | Server configuration options   |
| `server.uptime`        | Boolean | `true`  | Show server uptime             |
| `server.memory`        | Boolean | `true`  | Show server memory usage       |
| `server.version`       | Boolean | `true`  | Show server version            |
| `database`             | Object  | `{}`    | Database configuration options |
| `database.client`      | Boolean | `true`  | Show database client           |
| `database.connections` | Boolean | `true`  | Show database connections      |
| `database.uptime`      | Boolean | `true`  | Show database uptime           |
| `database.size`        | Boolean | `true`  | Show database size             |
| `database.version`     | Boolean | `true`  | Show database version          |

## API Endpoints

| Endpoint                    | Description                                                | Sample Response                     |
|-----------------------------|------------------------------------------------------------|-------------------------------------|
| `/api/healthcheck/ping`     | Responds with a simple "Pong"                              | [Sample](#ping-endpoint-sample)     |
| `/api/healthcheck/server`   | Responds with information about the Strapi and Node Server | [Sample](#server-endpoint-sample)   |
| `/api/healthcheck/database` | Responds with information about the connected database     | [Sample](#database-endpoint-sample) |
| `/api/healthcheck/all`      | Responds with with server and database information         | [Sample](#all-endpoint-sample)      |

### Ping Endpoint Sample

```json
{
  "data": {
    "message": "pong"
  }
}
```

### Server Endpoint Sample

```json
{
  "data": {
    "alive": true,
    "uptime": {
      "raw": 10.052894558,
      "text": "0d 0h 0m 10s",
      "days": 0,
      "hours": 0,
      "minutes": 0,
      "seconds": 10
    },
    "memory": {
      "memory": {
        "total": {
          "raw": 148.984375,
          "text": "149 MB"
        },
        "used": {
          "raw": 117.34453582763672,
          "text": "117 MB"
        },
        "free": {
          "raw": 31.63903045654297,
          "text": "32 MB"
        },
        "max": {
          "raw": 4144,
          "text": "4144 MB"
        },
        "percent": {
          "totalRaw": 78.77086269336654,
          "totalText": "78.77 %",
          "maxRaw": 2.831986143782332,
          "maxText": "2.83 %"
        }
      }
    },
    "version": {
      "application": "0.1.0",
      "strapi": "5.7.0"
    }
  }
}
```

### Database Endpoint Sample

#### PostgreSQL

```json
{
  "data": {
    "alive": true,
    "client": "postgres",
    "connections": {
      "max": 100,
      "current": "18"
    },
    "uptime": {
      "raw": 2426042.935729,
      "text": "28d 1h 54m 2s",
      "days": 28,
      "hours": 1,
      "minutes": 54,
      "seconds": 2
    },
    "size": {
      "raw": 17.502691,
      "text": "17.50 MB"
    },
    "version": "PostgreSQL: 16.6"
  }
}
```

#### MySQL/MariaDB

```json
{
  "data": {
    "alive": true,
    "client": "mysql",
    "connections": {
      "max": 151,
      "current": 13
    },
    "uptime": {
      "raw": 170685,
      "text": "1d 23h 24m 45s",
      "days": 1,
      "hours": 23,
      "minutes": 24,
      "seconds": 45
    },
    "size": {
      "raw": 2.6050560000000003,
      "text": "2.61 MB"
    },
    "version": "MariaDB: 11.6.2"
  }
}
```

#### SQLite

> [!NOTE]
> SQLite does not have a max connection limit, so that value is always 1.

> [!IMPORTANT]
> SQLite does not have an uptime value, so the Node process uptime is used instead.

```json
{
  "data": {
    "alive": true,
    "client": "sqlite",
    "connections": {
      "max": 1,
      "current": 1
    },
    "uptime": {
      "raw": 4.93527706,
      "text": "0d 0h 0m 4s",
      "days": 0,
      "hours": 0,
      "minutes": 0,
      "seconds": 4
    },
    "size": {
      "raw": 0.90112,
      "text": "0.90 MB"
    },
    "version": "SQLite: 3.46.1"
  }
}
```

### All Endpoint Sample

```json
{
  "data": {
    "server": {
      "alive": true,
      "uptime": {
        "raw": 5.126152349,
        "text": "0d 0h 0m 5s",
        "days": 0,
        "hours": 0,
        "minutes": 0,
        "seconds": 5
      },
      "memory": {
        "memory": {
          "total": {
            "raw": 148.984375,
            "text": "149 MB"
          },
          "used": {
            "raw": 117.34453582763672,
            "text": "117 MB"
          },
          "free": {
            "raw": 31.63903045654297,
            "text": "32 MB"
          },
          "max": {
            "raw": 4144,
            "text": "4144 MB"
          },
          "percent": {
            "totalRaw": 78.77086269336654,
            "totalText": "78.77 %",
            "maxRaw": 2.831986143782332,
            "maxText": "2.83 %"
          }
        }
      },
      "version": {
        "application": "0.1.0",
        "strapi": "5.7.0"
      }
    },
    "database": {
      "alive": true,
      "client": "postgres",
      "connections": {
        "max": 100,
        "current": "15"
      },
      "uptime": {
        "raw": 2503002.43527,
        "text": "28d 23h 16m 42s",
        "days": 28,
        "hours": 23,
        "minutes": 16,
        "seconds": 42
      },
      "size": {
        "raw": 17.502691,
        "text": "17.50 MB"
      },
      "version": "PostgreSQL: 16.6"
    }
  }
}
```

## Contributing

I/We are actively looking for contributors, maintainers, and others to help shape this package.

If interested please feel free to open up a GitHub issue/PR or ping `DMehaffy` on Discord.

> [!NOTE]
This package is maintained collectively by the [strapi community organization](https://github.com/strapi-community). While there may be a lead maintainer, they are not the sole maintainer of this code and this code does not belong to the lead maintainer.

## License

See the [LICENSE](./LICENSE.md) file for licensing information.
