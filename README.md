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
- [Contributing](#contributing)
- [License](#license)

## 🚦 Current Status

This package is currently maintained and should be considered **Beta** in terms of state. I/We are currently accepting contributions and/or dedicated contributors to help develop and maintain this package.

For more information on contributing please see [the contrib message below](#contributing).

## 🛑 Foreword

This package's lead maintainer is an employee of Strapi however this package is not officially maintained by Strapi Solutions SAS nor Strapi, Inc. and is currently maintained in the free time of the lead maintainer.

> [!WARNING]
**Absolutely no part of this code should be considered covered under any agreement you have with Strapi proper** including but not limited to any Enterprise and/or Cloud Agreement you have with Strapi.

## ✨ Features

These are the primary features that are finished or currently being worked on:

- [x] Generic `alive` endpoint to check if the server is running, current uptime, and version
- [x] Generic `database` endpoint to check if the database is connected, current database uptime, total database size, and database version
- [ ] Generic `server` endpoint to check if the server is running, current server uptime, server memory usage, and server version
- [ ] Additional metrics for all endpoints as needed
- [ ] Simple `ping` endpoint to check if the server is running (good for overall response time checking)
- [ ] Integration with other plugins and providers (Redis, Upload, ect)
- [ ] Combined `health` endpoint to check all components at once

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
| v5.x.x         | >= 1.0.0       | ✅         | Jan 2025  |

## ⏳ Installation

Install the plugin in your Strapi project or your Strapi plugin.

| Strapi Version | Plugin Version | Package Manager | Command                                         |
|----------------|----------------|-----------------|-------------------------------------------------|
| v5.x.x         | Latest         | Yarn            | `yarn add @strapi-community/plugin-healthcheck` |
| v5.x.x         | Latest         | npm             | `npm i @strapi-community/plugin-healthcheck`    |

## 🔧 Configuration

There is a very simple configuration to tailor the plugin to your needs and enable or disable certain responses (like the database size).

By default, all options are enabled, however you must enable specific endpoints in the Users-Permissions configuration or API Tokens Configuration to access them.

```javascript
// ./config/plugins.js

module.exports = (env) => ({
// ...
  healthcheck: {
    enabled: true, // Enable or disable the healthcheck plugin
    config: {
      alive: {
        detailedUptime: true, // Enable or disable detailed uptime
        version: true, // Enable or disable the version response
      },
      database: {
        client: true, // Show or hide the database client
        detailedUptime: true, // Enable or disable detailed uptime
        size: true, // Enable or disable the database size response
        version: true, // Enable or disable the version response
      },
    }
  },
});
```

## Contributing

I/We are actively looking for contributors, maintainers, and others to help shape this package.

If interested please feel free to open up a GitHub issue/PR or ping `DMehaffy` on Discord.

> [!NOTE]
This package is maintained collectively by the [strapi community organization](https://github.com/strapi-community). While there may be a lead maintainer, they are not the sole maintainer of this code and this code does not belong to the lead maintainer.

## License

See the [LICENSE](./LICENSE.md) file for licensing information.
