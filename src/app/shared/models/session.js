import mongoose, { Schema } from 'mongoose';

export const sessionSchema = new Schema({
  userID: String,
  accessLevel: Number,
  authenticated: Boolean,
});

export default mongoose.model('Session', sessionSchema);
