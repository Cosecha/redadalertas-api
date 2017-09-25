import mongoose from 'mongoose';
import bluebird from 'bluebird';

export const register = (server, options, next) => {
  mongoose.Promise = bluebird;
  let dbConnectionString;
  switch (process.env.NODE_ENV) {
    case 'docker':
      dbConnectionString = process.env.DB_CONNECTION_STRING_DOCKER;
      break;

    default:
      dbConnectionString = process.env.DB_CONNECTION_STRING_DEFAULT;
      break;
  }
  mongoose.connect(dbConnectionString);
  next();
};

export default register;

register.attributes = {
  name: 'db',
};
