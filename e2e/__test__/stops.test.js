jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const request = require('../request');
const db = require('../db');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

describe('stops api', () => {
  beforeEach(() => {
    db.dropCollection('tours');
  });

  const tour = {
    title: 'tour',
    activities: ['touring', 'more touring'],
    stops: []
  };

  const stop = {
    attendance: 1
  };

  function postStop(stop, tourId) {
    return request
      .post(`/api/tours/${tourId}/stops`)
      .send(stop)
      .expect(200)
      .then(({ body }) => body);
  }

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  // post tour
  // return tour with id
  // body._id

  it('posts a stop to a tour', () => {
    return postTour(tour).then(tour => {
      console.log(tour);
      
      return postStop(stop, tour._id)
        .then(res => {
          console.log(res);
        });
    });
  });

  it('deletes a cancelled stop', () => {

  });

  it('it updates how many people attended', () => {

  });
});