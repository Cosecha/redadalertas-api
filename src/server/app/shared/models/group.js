import { Schema } from 'mongoose';

const groupSchema = new Schema({
  name: String,
  // TO-DO:
  // event alert preferences defaults
  // members
  // what to do when an event expires-- delete or archive?
});

export default groupSchema;
