import { Schema } from 'mongoose';

const userSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: String,
  accessLevel: {
    type: Number,
    default: 1,
  },
  profile: {
    type: {
      _id: false,
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: false,
      },
      receivesAlerts: {
        type: Boolean,
        default: false,
      },
    },
  },
  credibility: {
    type: {
      _id: false,
      automated: {
        type: Number,
        default: 0,
      },
      social: {
        type: Number,
        default: 0,
      },
      endorsedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      hasEndorsed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      raidsReported: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
      raidsVerified: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
      flaggedBy: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
    },
  },
});


export default userSchema;
