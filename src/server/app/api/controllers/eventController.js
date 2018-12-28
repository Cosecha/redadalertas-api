import Boom from 'boom';
import eventStore from '../stores/eventStore';

const eventController = {
  async createEvent(req, h) {
    let event;
    try {
      event = await eventStore.createEvent(req.payload);
      const response = h.response(event);
      return response;
    } catch (err) {
      console.error("createEvent error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async updateEvent(req, h) {
    let event;
    try {
      event = await eventStore.updateEvent(req.payload);
      const response = h.response(event);
      return response;
    } catch (err) {
      console.error("updateEvent error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getEvents(req, h) {
    let events;
    try {
      events = await eventStore.getEvents();
      const response = h.response(events);
      return response;
    } catch (err) {
      console.error("getEvents error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getEvent(req, h) {
    let event;
    try {
      event = await eventStore.getEvent(req.params.eventID);
      const response = h.response(event);
      return response;
    } catch (err) {
      console.error("getEvent error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async deleteEvent(req, h) {
    let res;
    try {
      res = await eventStore.deleteEvent(req.params.eventID);
      const response = h.response(res);
      return response;
    } catch (err) {
      console.error("deleteEvent error: ", err);
      return h.response(Boom.badRequest(err));
    }
  }
};

export default eventController;
