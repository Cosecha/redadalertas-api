import mongoose from 'mongoose';
import mongooseIntl from 'mongoose-intl';
import { log, logErr, getFullPaths } from '../utils';
import removeUnderscore from '../plugins/removeUnderscore';
import userSchema from './user';
import { eventSchema } from './event';
import alertSchema from './alert';
import groupSchema from './group';
import agencySchema from './agency';

const schemas = [
  userSchema,
  eventSchema,
  alertSchema,
  groupSchema
];

schemas.map((schema) => {

  var langs = [ 'en', 'es', 'fr' ];

  // Initialize plugins
  schema.plugin(removeUnderscore);
  schema.plugin(mongooseIntl, {
    languages: langs,
    defaultLanguage: 'en'
  });

});

export const Event = mongoose.model('Event', eventSchema);
export const Alert = mongoose.model('Alert', alertSchema);
export const User = mongoose.model('User', userSchema);
export const Group = mongoose.model('Group', groupSchema);
