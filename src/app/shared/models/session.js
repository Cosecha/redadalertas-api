import { Schema } from 'mongoose';

const sessionSchema = new Schema({
  userID: String,
  accessLevel: Number,
});

export default sessionSchema;
