import { Event } from '../../shared/models';

const eventStore = {
  createEvent(payload) {
    // TO-DO: fill out CRUD stubs
    return Event.create({ ...payload });
  },
  getEvent(payload) {
    return Event.findOne({
      _id: payload._id,
    });
  },
  getEvents() {
    return Event.find();
  },
};

export default eventStore;
