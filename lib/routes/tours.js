/* eslint-disable new-cap */
const router = require('express').Router();
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addWeather = require('../middleware/add-weather');

router
  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tour.findById(req.params.id)
      .lean()
      .then(tour => {
        return res.json(tour);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tours => {
        res.json(tours);
      })
      .catch(next);
  })

  .post('/:id/stops', addGeo(), addWeather(), ({ params, body }, res, next) => {
    Tour.addStop(params.id, body)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .delete('/:id/stops/:stopId', ({ params }, res, next) => {
    Tour.removeStop(params.id, params.stopId)
      .then(stops => res.json(stops))
      .catch(next);
  })

  .put('/:id/stops/:stopId/attendance', ({ params, body }, res, next) => {    
    Tour.updateStopAttendance(params.id, params.stopId, body.attendance)
      .then(stops => res.json(stops))
      .catch(next);
  });

module.exports = router;

