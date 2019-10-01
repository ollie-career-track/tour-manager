const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');

describe.skip('tours api', () => {
  beforeEach(() => {
    db.dropCollection('tours');
  });

  it('posts a tour', () => {

  });

  it('gets a tour by id', () => {

  });

  it('gets all tours', () => {

  });
});