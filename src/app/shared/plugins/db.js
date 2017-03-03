import mongoose from 'mongoose';
import bluebird from 'bluebird';

const getDBConnectionString = () => {
  const defaultConnectionString = process.env.MONGO_URI;
  if (process.env.NODE_ENV === 'test') {
    return `${defaultConnectionString}_test`;
  } else {
    return defaultConnectionString
  }
};

export const register = (server, options, next) => {
  mongoose.Promise = bluebird;
  mongoose.connect(getDBConnectionString());
  next();
};

export default register;

register.attributes = {
  name: 'db',
};

