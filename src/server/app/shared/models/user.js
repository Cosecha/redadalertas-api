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
