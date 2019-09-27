import { Schema } from 'mongoose';

const userSchema = new Schema({
  created: {
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
    by: {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
      }
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
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: "created.at",
    updatedAt: "updated.at"
  }
});


export default userSchema;
