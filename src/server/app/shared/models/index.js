import mongoose from 'mongoose';
import mongooseAuth from 'mongoose-authorization';
import mongooseIntl from 'mongoose-intl';
import removeUnderscore from '../plugins/removeUnderscore';
import userSchema from './user';
import sessionSchema from './session';
import eventSchema from './event';
import groupSchema from './group';
import agencySchema from './agency';

const schemas = [
  userSchema,
  sessionSchema,
  eventSchema,
  groupSchema
];

schemas.map((schema) => {

  // Default permissions for mongoose-authorization
  if (!schema.permissions) schema.permissions = {
    defaults: {
      read: Object.keys(schema)
    },
    member: {
      write: Object.keys(schema),
      create: true
    },
    admin: ()=> {
      return {
        ...this.member,
        remove: true
      }
    }
  };

  // Initialize plugins
  schema.plugin(removeUnderscore);
  schema.plugin(mongooseAuth);
  schema.plugin(mongooseIntl, {
    languages: [ 'en', 'es', 'fr' ],
    defaultLanguage: 'en'
  });
});

export const Event = mongoose.model('Event', eventSchema);
export const User = mongoose.model('User', userSchema);
export const Group = mongoose.model('Group', groupSchema);
export const Session = mongoose.model('Session', sessionSchema);
