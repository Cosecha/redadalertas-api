import mongoose, { Schema } from 'mongoose';

const validateExactlyTwoCoordinates = (coordinates) => {
  return coordinates.length === 2;
};

export const raidSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  description: String,
  location: {
    type: [Number],
    required: true,
    index: '2d',
    validate: {
      validator: validateExactlyTwoCoordinates,
      message: 'Location requires both latitude and longitude!'
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['workplace', 'home']
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.model('Raid', raidSchema);
