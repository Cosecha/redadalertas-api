import { Event } from '../../shared/models';

const eventStore = {
  // TO-DO: fill in authLevel stubs
  async createEvent(payload) {
    return Event.create([
      { ...payload }
    ], {
      authLevel: false
    });
  },
  updateEvent(payload) {
    return Event.findOneAndUpdate(
      { _id: payload._id },
      payload,
      {
        overwrite: true,
        authLevel: false,
        returnNewDocument: true
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
      { _id: id },
      { authLevel: false }
    );
  },
};

export default eventStore;
