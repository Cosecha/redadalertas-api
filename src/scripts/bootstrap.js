import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bcrypt from 'bcrypt-nodejs';
import env from 'dotenv';
import {
  User,
  Event
} from '../server/app/shared/models';

env.config();

mongoose.Promise = bluebird;


let dbURL;

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

switch (process.env.NODE_ENV) {
  case 'test':
    dbURL = process.env.DB_CONNECTION_STRING_TEST;
    break;

  case 'docker':
    dbURL = process.env.DB_CONNECTION_STRING_DOCKER;
    break;

  default:
    dbURL = process.env.DB_CONNECTION_STRING_DEFAULT;
    break;
}

let user1;
let user2;

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

console.log(`Mongo connection: ${dbURL}`);

let hash1;

const deletedb = ()=> {
  return new Promise((resolve, reject)=> {
    mongoose.connect(dbURL, { useNewUrlParser: true }, ()=> {
      console.log('Connecting to database.');
      mongoose.connection.db.dropDatabase((err)=> {
        console.log('Dropping database.');
        if (!err) {
          console.log('Database dropped.');
          resolve();
        } else {
          console.error('Error dropping database: ', err);
          reject(err);
        }
      });
    });
  });
};

const disconnect = ()=> {
  return new Promise((resolve, reject)=> {
    mongoose.disconnect((err)=> {
      if (!err) {
        console.log('Disconnected.');
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

const reconnect = ()=> {
  return new Promise((resolve, reject)=> {
    mongoose.createConnection(dbURL, { useNewUrlParser: true }, (err)=> {
      if (!err) {
        console.log('Reconnected..');
        mongoose.connect(dbURL, { useNewUrlParser: true });
        resolve();
      } else {
        console.log(err);
        reject(err);
      }
    });
  });
};

deletedb().then(disconnect)
  .then(reconnect)
  .then(()=> new Promise((resolve, reject)=> {
    bcrypt.genSalt(10, (err, res)=> {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating salt...');
      }
    });
  }))
  .then((salt)=> new Promise((resolve, reject) => {
    bcrypt.hash('password', salt, null, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating password');
      }
    });
  }))
  .then((res)=> {
    hash1 = res;
    console.log(`Password: ${res}`);
    console.log('Creating first user...');
    return User.create({
      email: 'person@mail.com',
      phone: '5555555555',
      password: hash1
    });
  })
  .then((user)=> {
    user1 = user;
    console.log(`New user created (${user.email})... now creating another user...`);
    return User.create({
      email: 'person2@mail.com',
      phone: '5556667777',
      password: hash1,
    });
  })
  .then((user)=> {
    user2 = user;
    console.log(`New user created (${user.email})... now creating event...`);
    return Event.create({
      location: {
        zipcode: '85004',
        latitude: '33.4591465',
        longitude: '-112.0774334',
        description: 'A car behind the building on the corner.'
      },
      description: 'ICE checkpoint',
      type: 'checkpoint',
      present: [{
        agency: 'ICE'
      }, {
        agency: 'CBP'
      }],
    });
  })
  .then((event)=> {
    console.log(`New event created (${event.description})... now creating event...`);
    return Event.create({
      location: {
        zipcode: '85012',
        latitude: '33.5083858',
        longitude: '-112.0774334',
        description: 'Public School'
      },
      description: 'ICE is at the school',
      type: 'targeted',
      present: [{
        agency: 'ICE'
      }, {
        agency: 'Police'
      }],
    });
  })
  .then(()=> {
    console.log('Finished bootstrapping.');
    process.exit(0);
  })
  .catch((err)=> {
    console.error(err);
    process.exit(1);
    return err;
  });
/* eslint-enable max-len */
/* eslint-enable no-underscore-dangle */
/* eslint-enable no-console */
