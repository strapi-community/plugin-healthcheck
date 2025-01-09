const getService = (serviceName) => {
  return strapi.plugins['healthcheck'].services[serviceName];
};

module.exports = getService;
