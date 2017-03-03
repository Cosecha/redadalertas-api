import mongoose from 'mongoose';
import removeUnderscore from '../plugins/removeUnderscore';
import { userSchema } from './user';
import { sessionSchema } from './session';
import { raidSchema } from './raid';

const schemas = [
  userSchema,
  sessionSchema,
  raidSchema,
];

schemas.map((schema) => {
  schema.plugin(removeUnderscore);
});

export const Raid = mongoose.model('Raid', raidSchema);
export const Session = mongoose.model('Session', sessionSchema);
export const User = mongoose.model('User', userSchema);
