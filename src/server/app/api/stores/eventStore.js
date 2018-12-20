import { Event } from '../../shared/models';

const eventStore = {
  // TO-DO: fill in authLevel stubs
  createEvent(payload) {
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
      { authLevel: false }
    );
  },
  getEvent(id) {
    return Event.findById(id);
  },
  getEvents() {
    return Event.find();
  },
};

export default eventStore;
