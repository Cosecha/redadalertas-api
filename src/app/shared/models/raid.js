import mongoose, { Schema } from 'mongoose';

export const raidSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: String,
  location: [Number],
  type: {
    type: String,
    required: true,
    enum: ['workplace', 'home'],
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('Raid', raidSchema);
