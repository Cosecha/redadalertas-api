import Lab from 'lab';
import { expect } from 'chai';
import { labbable } from '../server.js';

const lab = exports.lab = Lab.script();

lab.experiment('API', () => {

  let server;

  lab.before((done) => {
    labbable.ready((err, srv) => {
      if (err) {
        return done(err);
      }
      server = srv;
      return done();
    });
  });

  lab.describe('User API', () => {

    let createUserRequest;

    lab.before((done) => {
      createUserRequest = {
        method: 'POST',
        url: '/api/user',
        payload: {
          phoneNumber: '4805551234'
        }
      };
      done();
    });

    lab.test('It creates a user', (done) => {
      server.select('api').inject(createUserRequest, (res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });

  });
});
