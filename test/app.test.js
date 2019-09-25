const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('Playstore Test App', () => {
  it('returns 400 if no query with message "Must include a query!"', () => {
    return supertest(app)
      .get('/apps')
      .expect(400, 'Must include a query!');
  });

  it('returns 400 if genres is not valid with message "Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card."', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'INVALID' })
      .expect(
        400,
        'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card.'
      );
  });

  it('returns 400 if sort is not valid with message "Sort must be one of rating or app."', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'INVALID' })
      .expect(400, 'Sort must be one of rating or app.');
  });

  it('returns 200 with an array of 2 objects (Block Puzzle Classic..., Block Puzzle) when requesting by Puzzle and Rating', () => {
    return supertest(app)
      .get('/apps')
      .query({
        genres: 'Puzzle',
        sort: 'Rating',
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body)
          .to.be.a('array')
          .to.have.lengthOf(2);
        expect(res.body[0]).to.have.property('App', 'Block Puzzle Classic Legend !');
        expect(res.body[1]).to.have.property('App', 'Block Puzzle');
      });
  });
});
