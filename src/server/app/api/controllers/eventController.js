import mongoose from 'mongoose';
import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import eventStore from '../stores/eventStore';
import userStore from '../stores/userStore';

const ObjectId = mongoose.Types.ObjectId;

const eventController = {
  async createEvent(req, h) {
    let data;
    try {
      data = req.payload;
      // Fetch user id from username and add to created.by.user
      const user = await userStore.getUserByPhoneOrEmail(data.user.username);
      delete data["user"];
      data["created.by.user"] = user._id;
      const event = await eventStore.createEvent(data);
      if (!event) throw new Error("Event returned empty.");
      const response = h.response(event);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController createEvent error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating event.");
    }
  },
  async updateEvent(req, h) {
    let event;
    let updatedEvent;
    try {
      if (!req.payload || !req.payload._id) throw new Error("Did not receive valid information for update.");
      if (!ObjectId.isValid(req.payload._id)) throw new Error("Event ID is not valid.");
      event = await eventStore.updateEvent(req.payload);
      if (!event) throw new Error("Event not found.");
      updatedEvent = await eventStore.getEvent(event.id);
      const response = h.response(updatedEvent);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController updateEvent error: ", err.message || err);
      return Boom.badRequest(err.message || "Error updating event.");
    }
  },
  async getEvents(req, h) {
    // only fetches unexpired events
    let events;
    try {
      events = await eventStore.getEvents();
      if (!events) throw new Error("No events found.");
      const response = h.response(events);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController getEvents error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving events.");
    }
  },
  async getEvent(req, h) {
    let event;
    try {
      event = await eventStore.getEvent(ObjectId(req.params.eventID));
      if (!event) throw new Error("No event found.");
      const response = h.response(event);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController getEvent error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving event.");
    }
  },
  async deleteEvent(req, h) {
    let event;
    try {
      event = await eventStore.deleteEvent(ObjectId(req.params.eventID));
      if (!event) throw new Error("Event not found.");
      const response = h.response(event);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController deleteEvent error: ", err.message || err);
      return Boom.badRequest(err.message || "Error deleting event.");
    }
  },
  async getAllEvents(req, h) {
    let events;
    try {
      events = await eventStore.getAllEvents();
      if (!events) throw new Error("No events found.");
      const response = h.response(events);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("eventController getAllEvents error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving events.");
    }
  },
};

export default eventController;
