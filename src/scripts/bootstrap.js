import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import { log, logErr } from '../server/app/shared/utils';
import {
  User,
  Group,
  Event,
  Alert
} from '../server/app/shared/models';

env.config();

mongoose.Promise = bluebird;


let dbURL;

log(`NODE_ENV: ${process.env.NODE_ENV}`);

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

let group1;
let group2;
let hash1;
let user1;
let user2;
let event1;
let event2;
let alert1;
let alert2;

/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

log(`Mongo connection: ${dbURL}`);

const deletedb = ()=> {
  return new Promise((resolve, reject)=> {
    mongoose.connect(dbURL, { useNewUrlParser: true }, ()=> {
      log('Connecting to database.');
      mongoose.connection.db.dropDatabase((err)=> {
        log('Dropping database.');
        if (!err) {
          log('Database dropped.');
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
        log('Disconnected.');
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
        log('Reconnected..');
        mongoose.connect(dbURL, { useNewUrlParser: true });
        resolve();
      } else {
        log(err);
        reject(err);
      }
    });
  });
};

deletedb().then(disconnect)
  .then(reconnect)
  .then(()=> new Promise((resolve, reject)=> {
    log('Creating first test group...');
    return Group.create([{
      name: 'Test Group 1',
      description: {
        en: 'A test group'
      },
      location: {
        zipcode: '94110'
      },
      secret: 'testgroup1secret'
    }],
    null,
    function(err, doc) {
      if (err) {
        reject(err);
      } else if (doc) {
        resolve(doc);
      }
    });
  }))
  .then((res)=> new Promise((resolve, reject)=> {
    group1 = res[0];
    log(`First test group created (${group1.name}) with id (${group1.id}).\nCreating second test group...`);
    return Group.create([{
      name: 'Test Group 2',
      description: {
        en: 'Another test group'
      },
      location: {
        zipcode: '94110'
      },
      secret: 'testgroup2secret'
    }],
    null,
    function(err, doc) {
      if (err) {
        reject(err);
      } else if (doc) {
        resolve(doc);
      }
    });
  }))
  .then((res)=> new Promise((resolve, reject)=> {
    group2 = res[0];
    log(`Second group created (${group2.name}) with id (${group2.id}).\nNow creating a password salt...`);
    bcrypt.genSalt(10, (err, res)=> {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating salt');
      }
    });
  }))
  .then((salt)=> new Promise((resolve, reject) => {
    log(`Salt created: ${salt}\nHashing password...`);
    bcrypt.hash('password', salt, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating password');
      }
    });
  }))
  .then((res)=> {
    hash1 = res;
    log(`Password hash: ${hash1}`);
    log('Creating first user...');
    return User.create([{
      name: 'person1',
      email: 'person1@mail.com',
      phone: '1111111111',
      password: hash1,
      belongs: {
        to: group1.id,
        as: 'admin'
      }
    }], null);
  })
  .then((res)=> {
    user1 = res[0];
    log(`New user created (${user1.email})... now creating another user...`);
    return User.create([{
      name: 'person2',
      email: 'person2@mail.com',
      phone: '2222222222',
      password: hash1,
      belongs: {
        to: group2.id,
        as: 'member'
      },
    }], null);
  })
  .then((res)=> {
    user2 = res[0];
    log(`New user created (${user2.email})... now creating event...`);
    return Event.create([{
      type: 'checkpoint',
      description: {
        en: 'ICE checkpoint',
        es: 'Punto de control de ICE',
        fr: 'Point de contrôle de ICE'
      },
      present: [{
        agency: 'ICE'
      }, {
        agency: 'CBP'
      }],
      created: {
        by: {
          user: user1.id
        }
      },
      location: {
        address_1: '24th St Mission Station',
        city: 'San Francisco',
        state: 'CA',
        zipcode: '94110',
        latitude: '37.7549323',
        longitude: '-122.4194287',
        description: {
          en: 'A car behind the building on the corner.',
          es: 'Un coche detrás del edificio en la esquina.',
          fr: 'Une voiture derrière du bâtiment au coin.'
        }
      },
    }], null);
  })
  .then((res)=> {
    event1 = res[0];
    log(`New event created (${event1.description.en})... now creating alert...`);
    return Alert.create([{
      ...event1.toObject(),
      event: event1.id,
      sent: {
        by: user1.id
      }
    }], null);
  })
  .then((res)=> {
    alert1 = res[0];
    log(`New alert created (${alert1.description.en})... now creating second event...`);
    return Event.create([{
      location: {
        address_1: "John O'Connell Technical High School",
        city: 'San Francisco',
        state: 'CA',
        zipcode: '94110',
        latitude: '37.7595222',
        longitude: '-122.4140747',
        description: {
          en: 'Public school',
          es: 'Escuela publica',
          fr: 'École publique'
        }
      },
      description: {
        en: 'ICE is at the school',
        es: 'ICE esta en la escuela',
        fr: "ICE est à l'école"
      },
      type: 'targeted',
      present: [{
        agency: 'ICE'
      }, {
        agency: 'Police'
      }],
      created: {
        by: {
          user: user2.id
        }
      },
    }], null);
  })
  .then((res)=> {
    event2 = res[0];
    log(`Second event created (${event2.description.en})... now creating second alert....`);
    return Alert.create([{
      ...event2.toObject(),
      event: event2.id,
      sent: {
        by: user2.id
      }
    }], null);
  })
  .then((res)=> {
    alert2 = res[0];
    log(`Second alert created (${alert2.description.en}).\nFinished bootstrapping.`);
    process.exit(0);
  })
  .catch((err)=> {
    logErr(err);
    process.exit(1);
    return err;
  });
/* eslint-enable max-len */
/* eslint-enable no-underscore-dangle */
/* eslint-enable no-console */
