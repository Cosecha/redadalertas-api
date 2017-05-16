import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bcrypt from 'bcrypt-nodejs';
import {
  User,
  Raid
} from '../server/app/shared/models';

mongoose.Promise = bluebird;


const envTesting = process.env.NODE_ENV === 'test';
let dbURL = 'mongodb://localhost/redadalertas';

let user1;
let user2;

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

if (envTesting) {
  dbURL += '-test';
  console.log('Setting up test database...');
}

console.log(`Mongo connection: ${dbURL}`);

let hash1;
console.log(`Hash created: ${hash1}`);

const deletedb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbURL, () => {
      mongoose.connection.db.dropDatabase((err) => {
        if (!err) {
          console.log('Database dropped...');
          resolve();
        } else {
          reject(err);
        }
      });
    });
  });
};

const disconnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.disconnect((err) => {
      if (!err) {
        console.log('Disconnected...');
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

const reconnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.createConnection(dbURL, (err) => {
      if (!err) {
        console.log('Reconnected..');
        mongoose.connect(dbURL);
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
  .then(() => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating salt...');
      }
    });
  }))
  .then((salt) => new Promise((resolve, reject) => {
    bcrypt.hash('password', salt, null, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating password');
      }
    });
  }))
  .then((res) => {
    hash1 = res;
    console.log(`Password: ${res}`);
    console.log('Creating first user...');
    return User.create({
      profile: {
        email: 'person@mail.com',
        phoneNumber: '5555555555',
      },
      password: hash1,
    });
  })
  .then((user) => {
    user1 = user;
    console.log(`New user created (${user.profile.email})... now creating another user...`);
    return User.create({
      profile: {
        email: 'person2@mail.com',
        phoneNumber: '5556667777',
      },
      password: hash1,
    });
  })
  .then((user) => {
    user2 = user;
    console.log(`New user created (${user.profile.email})... now creating a raid...`);
    return Raid.create({
      userId: user1.id,
      zip: '85004',
      geo: {
        lat: '33.4591465',
        long: '-112.0774334',
      },
      description: 'ICE checkpoint',
      type: 'checkpoint',
      present: {
        police: false,
        ice: true,
        cpb: false,
      },
    });
  })
  .then((raid) => {
    console.log(`New raid created (${raid.description})... now creating a raid...`);
    return Raid.create({
      userId: user2.id,
      zip: '85012',
      geo: {
        lat: '33.5083858',
        long: '-112.0774334',
      },
      description: 'ICE is at the school',
      type: 'public',
      present: {
        police: true,
        ice: true,
        cpb: false,
      },
    });
  })
  .then(() => {
    console.log('Finished bootstrapping.');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
    return err;
  });
/* eslint-enable max-len */
/* eslint-enable no-underscore-dangle */
/* eslint-enable no-console */
