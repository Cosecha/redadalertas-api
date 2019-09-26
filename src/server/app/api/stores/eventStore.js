import { Event } from '../../shared/models';

const eventStore = {
  async createEvent(payload) {
    return Event.create([
      { ...payload }
    ]);
  },
  updateEvent(payload) {
    return Event.findOneAndUpdate(
      { _id: payload._id },
      payload,
      {
        new: true
      }
    );
  },
  getEvent(id) {
    return Event.findById(id);
  },
  getEvents() {
    return Event.find({
      "expire.at": { $gt: Date.now() }
    });
  },
  getAllEvents() {
    return Event.find();
  },
  deleteEvent(id) {
    return Event.findOneAndDelete(
      { _id: id }
    );
  },
};

export default eventStore;
