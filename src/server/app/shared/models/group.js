import { Schema } from 'mongoose';

const groupSchema = new Schema({
  created: {
    at: {
      type: Date,
      default: Date.now
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  name: String,
  description: {
    type: String,
    intl: true
  },
  location: {
    city: String,
    state: String,
    zipcode: Number
  },
  defaults: {
    event: {
      expire: {
        at: Date,
        deleteOnExpire: Boolean
      },
    },
    alert: {
      radius: Number,
      expire: {
        at: Date,
        deleteOnExpire: Boolean
      },
    }
  },
  accessTokens: {
    type: [ String ]
  }
});

export default groupSchema;
