import { Schema } from 'mongoose';
import { eventSchemaObj } from './event';

const alertSchema = new Schema({
  // Event copy schema
  ...eventSchemaObj,
  // but ensure intl strings get cast properly:
  description: {
    type: String,
    intl: true,
    required: true
  },
  "location.description": {
    type: String,
    intl: true
  },

  // Alert-specific schema
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  sent: {
    by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    at: {
      type: Date,
      default: Date.now
    },
  },
  expireNow: {
    // TO-DO: make sure this is the only thing users can edit
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: "created.at",
    updatedAt: "updated.at"
  },
  toJSON: {
    virtuals: true
  },
});

export default alertSchema;
