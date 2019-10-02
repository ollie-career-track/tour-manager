const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const latitude = req.body.location.latitude;
  const longitude = req.body.location.longitude;

  if(!latitude || !longitude) {
    return next({
      statusCode: 400,
      error: 'location must be supplied'
    });
  }

  getForecast(latitude, longitude)
    .then(fetchedWeather => {
      if(!fetchedWeather) {
        throw {
          statusCode: 400,
          error: 'address must be resolvable to weather'
        };
      }

      req.body.weather = {
        temperature: fetchedWeather.currently.temperature,
        summary: fetchedWeather.currently.summary
      };
      
      next();
    })
    .catch(next);
};