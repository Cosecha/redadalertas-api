import mongoose from 'mongoose';
import { log, logErr, getFullPaths } from '../utils';
import userSchema from './user';
import { eventSchema } from './event';
import alertSchema from './alert';
import groupSchema from './group';

const schemas = [
  userSchema,
  eventSchema,
  alertSchema,
  groupSchema
];

export const Event = mongoose.model('Event', eventSchema);
export const Alert = mongoose.model('Alert', alertSchema);
export const User = mongoose.model('User', userSchema);
export const Group = mongoose.model('Group', groupSchema);
