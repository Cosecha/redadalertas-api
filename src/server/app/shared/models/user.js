import { Schema } from 'mongoose';

const userSchema = new Schema({
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
  belongs: {
    type: [{
      _id: false,
      to: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
      },
      since: {
        type: Date,
        default: Date.now
      },
      as: {
        type: Number,
        default: 1
      },
    }]
  },
  name: String,
  email: String,
  phone: String,
  password: String
});


export default userSchema;
