import { expect } from 'chai';
import Wreck from 'wreck';
import '../../../../server';

const baseURL = 'http://127.0.0.1:8080';

describe('POST /api/session', () => {
  it('is successful', (done) => {
    const options = {
      payload: {
        email: 'person@mail.com',
        password: 'password',
      },
    };
    Wreck.post(`${baseURL}/api/session`, options, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  it('fails gracefully', (done) => {
    const options = {
      payload: {
        email: 'person@mail.com',
        password: 'wrong-password',
      },
    };
    Wreck.post(`${baseURL}/api/v1/session`, options, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
