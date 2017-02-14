import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  phoneNumber: String,
  receiveAlerts: Boolean,
  hasReported: Boolean,
});

export default mongoose.model('User', userSchema);
