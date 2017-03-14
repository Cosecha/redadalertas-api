import { Schema } from 'mongoose';

const raidSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: String,
  location: {
    type: [Number],
    required: true,
    index: '2d',
  },
  type: {
    type: String,
    required: true,
    enum: ['workplace', 'home', 'checkpoint'],
  },
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  zip: String,
  photos: [String],
  reports: [{type: Schema.Types.ObjectId, ref: 'RaidReport'}],
});

export default raidSchema;
