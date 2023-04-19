import geoip from 'geoip-lite';

const logger = (req, res, next) => {
  const ipAddress = req.ip;
  const geo = geoip.lookup(ipAddress);
  const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown location';
  const method = req.method;
  const url = req.url;
  const startTime = new Date();

  res.on('finish', () => {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;
    const status = res.statusCode;
    const error = res.statusMessage !== 'OK' ? res.statusMessage : undefined;

    console.log(`${startTime.toISOString()} - ${ipAddress} - ${location} - ${method} ${url} - ${status} (${elapsedTime} ms) - ${error}`);
  });

  next();
}

export default logger;