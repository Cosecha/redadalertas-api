import Wreck from 'wreck';
import { expect } from 'chai';
import '../../../../server';

const baseURL = 'http://127.0.0.1:8080/api';

describe('GET /events', () => {
  it('is successful', (done) => {
    Wreck.get(`${baseURL}/events`, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
