import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import {
  User,
  Raid
} from '../app/shared/models';


const envTesting = process.env.NODE_ENV === 'test';
let dbURL = '';

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

if (envTesting) {
  dbURL = 'mongodb://localhost/redadalertas-test';
  console.log('Setting up test database...');
} else {
  dbURL = 'mongodb://localhost/redadalertas';
}

const hash1 = bcrypt.hashSync("password", 10);
console.log(`Hash created: ${hash1}`);

mongoose.Promise = bluebird;

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
  .then(() => {
    return User.create({
      profile: {
        email: 'person@mail.com',
        phoneNumber: '5555555555',
        receiveAlerts: false,
      },
      password: hash1,
      accessLevel: 1,
      createdAt: new Date(),
      credibility: {
        automated: 0,
        social: 0,
        endorsedBy: [],
        hasEndorsed: [],
        raidsReported: [],
        raidsVerified: [],
      },
    });
  })
  .then((user) => {
    console.log(`New user created (${user.username})... now creating another user...`);
    return User.create({
      profile: {
        email: 'person2@mail.com',
        phoneNumber: '5556667777',
        receiveAlerts: false,
      },
      accessLevel: 1,
      password: hash1,
      createdAt: new Date(),
      credibility: {
        automated: 0,
        social: 0,
        endorsedBy: [],
        hasEndorsed: [],
        raidsReported: [],
        raidsVerified: [],
      },
    });
  })
  .then((user) => {
    console.log(`New user created (${user.username})... now creating a raid...`);
    return Raid.create({
      date: new Date(),
      description: 'Traffic checkpoint on central and McDowell',
      location: [
        40.029,
        -132,
      ],
      type: 'checkpoint',
    });
  })
  .then((raid) => {
    console.log(`New raid created (${raid.description})... now creating a raid...`);
    return Raid.create({
      date: new Date(),
      description: 'ICE is at my neighbor\'s door.',
      location: [
        40.029,
        -132,
      ],
      type: 'home',
    });
  })
  .then((raid) => {
    console.log(`New raid created (${raid.description})... now creating a raid...`);
    return Raid.create({
      date: new Date(),
      description: 'ICE is at my door.',
      location: [
        40.029,
        -132,
      ],
      type: 'home',
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
