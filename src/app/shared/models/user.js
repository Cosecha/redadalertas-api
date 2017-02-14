import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  phoneNumber: String,
});

export default mongoose.model('User', userSchema);
