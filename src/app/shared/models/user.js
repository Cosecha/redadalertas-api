import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  createdAt: Date,
  password: String,
  profile: {
    email: String,
    phone: String,
    receivesAlerts: Boolean,
  },
  credibility: {
    automated: Number,
    social: Number,
    endorsedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    hasEndorsed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    raidsReported: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
    raidsVerified: [{ type: Schema.Types.ObjectId, ref: 'Raid' }],
  },
});

export default mongoose.model('User', userSchema);
