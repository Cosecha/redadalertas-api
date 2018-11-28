import { Event } from '../../shared/models';

const eventStore = {
  createEvent(payload) {
    // TO-DO: fill out CRUD stubs
    return Event.create({
      date: payload.date,
      description: payload.description,
      location: payload.location,
      type: payload.type,
    });
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
