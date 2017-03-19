import { Schema } from 'mongoose';

const raidReportSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  zip: String,
  geo: {
    lat: String,
    long: String,
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum: [
      'workplace',
      'home',
      'checkpoint',
      'public',
      'other',
    ],
  },
  present: {
    police: Boolean,
    ice: Boolean,
    cbp: Boolean,
  },
});

export default raidReportSchema;
