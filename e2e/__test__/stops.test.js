jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

describe.skip('stops api', () => {
  beforeEach(() => {
    db.dropCollection('tours');
  });

  it('posts a stop to a tour', () => {

  });

  it('deletes a cancelled stop', () => {

  });

  it('it updates how many people attended', () => {

  });
});