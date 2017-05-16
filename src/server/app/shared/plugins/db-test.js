import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const register = (server, options, next) => {
  mongoose.Promise = bluebird;
  mongoose.connect(`${process.env.DB_CONNECTION_STRING}-test`);
  next();
};

export default register;

register.attributes = {
  name: 'db-test',
};
