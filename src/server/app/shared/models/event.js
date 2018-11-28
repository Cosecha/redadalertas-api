import { Schema } from 'mongoose';

// TO-DO: replace Strings with more appropriate data types

const eventSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'sweep',
      'targeted',
      'checkpoint',
      'traffic',
      'i9',
      'action',
      'other'
    ],
  },
  description: String,
  present: {
    type: [{
      _id: false,
      agency: {
        type: Schema.Types.ObjectId,
        ref: 'Agency'
      }
    }]
  },
  created: {
    at: {
      type: Date,
      default: Date.now
    },
    by: {
      group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
        default: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: false
      }
    },
  },
  updated: {
    at: {
      type: Date,
      default: Date.now
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      default: false
    },
  },
  expire: {
    at: Date,
    deleteOnExpire: Boolean
  },
  verified: {
    type: [{
      _id: false,
      required: false,
      default: false,
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      at: {
        type: Date,
        default: Date.now,
      },
    }]
  },
  location: {
    address_1: String,
    address_2: String,
    city: String,
    state: String,
    zipcode: Number,
    geo: {
      latitude: Number,
      longitude: Number
    },
    description: String
  }
});

export default eventSchema;
