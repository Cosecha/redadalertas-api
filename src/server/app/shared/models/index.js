import mongoose from 'mongoose';
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
  schema.plugin(removeUnderscore);
});

export const Event = mongoose.model('Event', eventSchema);
export const User = mongoose.model('User', userSchema);
export const Group = mongoose.model('Group', groupSchema);
export const Session = mongoose.model('Session', sessionSchema);
