import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: String,
  password: String,
  createdAt: Date,
  credibility: {
    automated: Number,
    social: Number,
  },
  phoneNumber: String,
  receiveAlerts: Boolean,
  hasReported: Boolean,
});

export default mongoose.model('User', userSchema);
