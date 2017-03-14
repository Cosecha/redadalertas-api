import mongoose, { Schema } from 'mongoose';

export const sessionSchema = new Schema({
  userID: String,
  accessLevel: Number,
});

export default mongoose.model('Session', sessionSchema);
