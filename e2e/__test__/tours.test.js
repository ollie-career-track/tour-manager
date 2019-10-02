const request = require('../request');
const db = require('../db');
// const { matchMongoId } = require('../match-helpers');

describe('tours api', () => {
  beforeEach(() => {
    db.dropCollection('tours');
  });

  const tour = {
    title: 'tour',
    activities: ['touring', 'more touring'],
    stops: []
  };

  function postTour(tour) {
    return request 
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it.only('posts a tour', () => {
    return postTour(tour).then(tour => {
      expect(tour).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...tour
      });
    });
  });

  it('gets a tour by id', () => {
    return postTour(tour)
      .then(tour => {
        return request.get(`/api/tours/${tour._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(tour);
          });
      });
  });

  it('gets all tours', () => {

  });
});