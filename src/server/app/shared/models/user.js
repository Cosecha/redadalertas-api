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
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    },
    since: {
      type: Date,
      default: Date.now
    },
    as: {
      type: String,
      enum: [
        'member',
        'admin'
      ]
    }
  },
  name: String,
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  password: String
}, {
  timestamps: {
    createdAt: "created.at",
    updatedAt: "updated.at"
  }
});


export default userSchema;
