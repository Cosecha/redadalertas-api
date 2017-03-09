import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

/* eslint-disable */
const dropdb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/redadalertas-test', () => {
      mongoose.connection.db.dropDatabase((err) => {
        if (!err) {
          console.log('Test database dropped...');
          resolve();
        } else {
          reject(err);
        }
      });
    });
  });
};
/* eslint-enable */

dropdb().then(() => {
  process.exit(0);
});
