import Wreck from 'wreck';
import { expect } from 'chai';
import '../../../../server';

const baseURL = 'http://127.0.0.1:8080/api';

describe('GET /raids', () => {
  it('is successful', (done) => {
    Wreck.get(`${baseURL}/raids`, (err, res) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
