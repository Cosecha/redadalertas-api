import mongoose from 'mongoose';
import mongooseAuth from 'mongoose-authorization';
import mongooseIntl from 'mongoose-intl';
import removeUnderscore from '../plugins/removeUnderscore';
import userSchema from './user';
import sessionSchema from './session';
import { eventSchema } from './event';
import alertSchema from './alert';
import groupSchema from './group';
import agencySchema from './agency';

const schemas = [
  userSchema,
  sessionSchema,
  eventSchema,
  alertSchema,
  groupSchema
];

schemas.map((schema) => {

  var langs = [ 'en', 'es', 'fr' ];

  // Initialize plugins
  schema.plugin(removeUnderscore);
  schema.plugin(mongooseAuth);
  schema.plugin(mongooseIntl, {
    languages: langs,
    defaultLanguage: 'en'
  });

  // Include first-level and subdoc paths
  // for mongooseAuth with mongooseIntl
  const paths = Object.keys(schema.paths);
  var fullPaths = paths.slice(0, paths.length);
  paths.forEach(path => {
    if (path.indexOf('.') > -1) {
      var firstLevel = path.slice(0, path.indexOf('.'));
      if (!fullPaths.includes(firstLevel)) {
        fullPaths.push(firstLevel);
      }
    }
    langs.forEach(lang => {
      if (path.endsWith('.' + lang)) {
        var nestLevel = path.slice(0, path.indexOf('.' + lang));
        if (!fullPaths.includes(nestLevel)) {
          fullPaths.push(nestLevel);
        }
      }
    });
  });

  // Default permissions for mongoose-authorization
  if (!schema.permissions) {
    schema.permissions = {
      defaults: {
        read: fullPaths
      },
      member: {
        write: fullPaths,
        create: true
      },
      admin: {
        write: fullPaths,
        create: true,
        remove: true
      }
    };
  }

});

export const Event = mongoose.model('Event', eventSchema);
export const Alert = mongoose.model('Alert', alertSchema);
export const User = mongoose.model('User', userSchema);
export const Group = mongoose.model('Group', groupSchema);
export const Session = mongoose.model('Session', sessionSchema);
