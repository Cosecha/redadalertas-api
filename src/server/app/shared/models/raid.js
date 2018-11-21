// TO-DO: this is superseded by eventSchema and should be removed

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
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  credScore: {
    type: Number,
    default: 0,
  },
  verifiedBy: { type: [{
    _id: false,
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }] },
  media: {
    type: [{
      _id: false,
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      mediaUrl: String,
    }],
  },
});

export default raidReportSchema;
