import mongoose from 'mongoose';
import removeUnderscore from '../plugins/removeUnderscore';
import userSchema from './user';
import sessionSchema from './session';
import raidReportSchema from './raid';
import eventSchema from './event';
import groupSchema from './group';
import agencySchema from './group';

const schemas = [
  userSchema,
  sessionSchema,
  raidReportSchema,
  eventSchema,
  groupSchema
];

schemas.map((schema) => {
  schema.plugin(removeUnderscore);
});

export const Raid = mongoose.model('Raid', raidReportSchema);
export const Session = mongoose.model('Session', sessionSchema);
export const User = mongoose.model('User', userSchema);
