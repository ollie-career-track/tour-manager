jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const request = require('../request');
const db = require('../db');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

getLocation.mockResolvedValue({
  latitude: 45.5266975,
  longitude: -122.6880503
});

getForecast.mockResolvedValue({
  currently: {
    temperature: 99,
    summary: 'i dont get this'
  }
});

describe('stops api', () => {
  beforeEach(() => {
    db.dropCollection('tours');
  });

  const tour = {
    title: 'tour',
    activities: ['touring', 'more touring']
  };

  const stop = {
    address: '97205',
    attendance: 1
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  function postTourWithStop(tour, stop) {
    return postTour(tour)
      .then(tour => {
        return request
          .post(`/api/tours/${tour._id}/stops`)
          .send(stop)
          .expect(200)
          .then(({ body }) => [tour, body]);
      });
  }

  it.skip('posts a stop to a tour', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(stop)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            [
              {
                _id: expect.any(String)
              }
            ],
            `
            Object {
              "0": Object {
                "_id": "5d953610bc9ce02456ed3d73",
                "attendance": 1,
                "location": Object {
                  "latitude": 45.5266975,
                  "longitude": -122.6880503,
                },
                "weather": Object {
                  "summary": "i dont get this",
                  "temperature": 99,
                },
              },
            }
          `
          );
        });
    });
  });

  it('deletes a cancelled stop', () => {
    return postTourWithStop(tour, stop)
      .then(([tour, stops]) => {
        return request
          .delete(`/api/tours/${tour._id}/stops/${stops[0]._id}`)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });

  it('it updates how many people attended', () => {
    return postTourWithStop(tour, stop)
      .then(([tour, stops]) => {
        return request
          .put(`/api/tours/${tour._id}/stops/${stops[0]._id}/attendance`)
          .send({ attendance: 8 })
          .expect(200);
      })
      .then(({ body }) => {
        expect(body[0].attendance).toBe(8);
      });
  });
});