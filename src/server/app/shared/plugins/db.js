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
  console.log(`Database connection: ${dbConnectionString}`);
  mongoose.connect(dbConnectionString, { useNewUrlParser: true }, (err)=> {
    if (err) console.error('Connection error: ', err);
    else console.log('Database connected.');
  });
  next();
};

export default register;

register.attributes = {
  name: 'db',
};
