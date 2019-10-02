const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { latitude } = req.body;
  const { longitude } = req.body;

  if(!latitude || !longitude) {
    return next({
      statusCode: 400,
      error: 'location must be supplied'
    });
  }

  getForecast(latitude, longitude)
    .then(weather => {
      if(!weather) {
        throw {
          statusCode: 400,
          error: 'address must be resolvable to weather'
        };
      }

      req.body.weather.temperature = weather.currently.temperature;
      req.body.weather.summary = weather.currently.weather;
      next();
    })
    .catch(next);
};