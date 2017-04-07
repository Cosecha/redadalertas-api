import { expect } from 'chai';
import Wreck from 'wreck';
import '../../../../server';

const baseURL = 'http://127.0.0.1:8080';

describe('POST /api/user', () => {
  const options = {
    payload: {
      email: 'test@place.com',
      password: 'password',
    },
  };

  it('is successful', (done) => {
    Wreck.post(`${baseURL}/api/user`, options, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  it('returns 404 with no required fields', (done) => {
    Wreck.post(`${baseURL}/api/v1/session`, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
