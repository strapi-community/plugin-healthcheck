const getConfig = () => {
  return strapi.config.get('plugin::healthcheck');
};

module.exports = getConfig;
