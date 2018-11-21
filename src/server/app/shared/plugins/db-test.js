import mongoose from 'mongoose';
import bluebird from 'bluebird';

const register = (server, options)=> {
  mongoose.Promise = bluebird;
  mongoose.connect(`${process.env.DB_CONNECTION_STRING_TEST}`, { useNewUrlParser: true });
};

exports.plugin = {
  name: 'db-test',
  register: register
};
