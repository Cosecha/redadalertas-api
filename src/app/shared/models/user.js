import { Schema } from 'mongoose';

const profileSchema = new Schema({
  _id: false,
  email: String,
  phone: String,
  receivesAlerts: Boolean,
});

const credibilitySchema = new Schema({
  _id: false,
  automated: Number,
  social: Number,
  endorsedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  hasEndorsed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  raidsReported: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
  raidsVerified: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
});

const userSchema = new Schema({
  createdAt: Date,
  password: String,
  accessLevel: Number,
  profile: profileSchema,
  credibility: credibilitySchema,
});


export default userSchema;
