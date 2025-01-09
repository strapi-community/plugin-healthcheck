/**
 * Application methods
 */
const bootstrap = require('./bootstrap');
const register = require('./register');

/**
 * Plugin server methods
 */
const config = require('./config');
const controllers = require('./controllers');
const services = require('./services');
const routes = require('./routes');

module.exports = {
  bootstrap,
  register,

  config,
  controllers,
  services,
  routes,
};
