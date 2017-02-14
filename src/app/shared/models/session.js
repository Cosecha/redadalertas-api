import mongoose, { Schema } from 'mongoose';

export const sessionSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  accessToken: String,
  accessLevel: Number,
});

export default mongoose.model('Session', sessionSchema);

