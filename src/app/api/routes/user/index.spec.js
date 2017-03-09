import { expect } from 'chai';
import Wreck from 'wreck';
import '../../../../server';

const baseURL = 'http://127.0.0.1:8080';

describe('POST /api/user', () => {
  const payload = {
    payload: {
      phoneNumber: '5555555555',
    },
  };

  it('successfully creates a user', (done) => {
    Wreck.post(`${baseURL}/api/user`, payload, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });

  it('fails gracefully', (done) => {
    const payload = {
      payload: {
        phoneNumber: 'noise',
      },
    };
    Wreck.post(`${baseURL}/api/v1/session`, payload, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
