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
  description: {
    type: String,
    intl: true
  },
  present: {
    type: [{
      // TO-DO: implement Agency stub in bootstrap.js
      // _id: false,
      // agency: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'Agency'
      // }
      agency: String
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
        required: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
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
      required: false
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
    description: {
      type: String,
      intl: true
    }
  }
});

export default eventSchema;
