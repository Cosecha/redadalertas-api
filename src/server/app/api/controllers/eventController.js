import Boom from 'boom';
import eventStore from '../stores/eventStore';

const eventController = {
  async createEvent(req, reply) {
    eventStore.createEvent(req.payload)
    .then((event) => {
      reply(event).code(201);
    })
    .catch((err) => {
      req.server.log('Error. Could not create Event');
      Boom.badRequest(err);
    });
  },
  async getEvents(req, h) {
    let events;
    try {
      events = await eventStore.getEvents();
      const response = h.response(events);
      return response;
    } catch (err) {
      console.error("getEvents error: ", err);
      h.response(Boom.badRequest(err));
    }
  },
};

export default eventController;
