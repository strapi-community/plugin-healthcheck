const convertUptime = (uptime) => {
  const uptimeInSeconds = uptime;

  const seconds = Math.floor(uptimeInSeconds % 60);
  const minutes = Math.floor((uptimeInSeconds / 60) % 60);
  const hours = Math.floor((uptimeInSeconds / 3600) % 24);
  const days = Math.floor(uptimeInSeconds / 86400);

  return {
    raw: uptimeInSeconds,
    text: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    days,
    hours,
    minutes,
    seconds,
  };
};

module.exports = convertUptime;
