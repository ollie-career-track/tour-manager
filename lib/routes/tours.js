/* eslint-disable new-cap */
const router = require('express').Router();
const Tour = require('../models/tour');

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
  });

module.exports = router;