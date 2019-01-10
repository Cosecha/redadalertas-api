import mongoose from 'mongoose';
import Boom from 'boom';
import Bounce from 'bounce';
import { log, logErr } from '../../shared/utils';
import eventStore from '../stores/eventStore';
import alertStore from '../stores/alertStore';
import userStore from '../stores/userStore';

const ObjectId = mongoose.Types.ObjectId;

const alertController = {
  async createAlert(req, h) {
    let alert = null;
    let user;
    let payloadEvent;
    try {
      if (!ObjectId.isValid(req.payload.event)) throw new Error("Event ID is not valid.");
      payloadEvent = await eventStore.getEvent(req.payload.event);
      if (!payloadEvent) throw new Error("Event not found.");
      if (req.payload && req.payload["sent.by"]) {
        if (!ObjectId.isValid(req.payload["sent.by"])) throw new Error("Sent by user ID is not valid.");
        user = await userStore.getUser(ObjectId(req.payload["sent.by"]));
        if (!user) throw new Error("Sent by user not found.");
      }
      const newLoad = {
        ...payloadEvent.toObject(),
        // TO-DO: add parser with string formatting
        type: payloadEvent.type.toString(),
        event: ObjectId(req.payload.event),
        sent: {
          by: (req.payload["sent.by"]) ? req.payload["sent.by"] : null,
          at: Date.now()
        }
      };
      delete newLoad["id"];
      alert = await alertStore.createAlert(newLoad);
      if (!alert) throw new Error("Alert returned empty.");
      const response = h.response(alert);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("alertController createAlert error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating alert.");
    }
  },
  async updateAlert(req, h) {
    // updateAlert just sets expireNow to true
    let alert;
    let updatedAlert;
    try {
      alert = await alertStore.updateAlert(req.params.alertID);
      if (!alert) throw new Error("Alert not found.");
      updatedAlert = await alertStore.getAlert(alert.id);
      const response = h.response(updatedAlert);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("alertController updateAlert error: ", err.message || err);
      return Boom.badRequest(err.message || "Error updating alert.");
    }
  },
  async getAlerts(req, h) {
    let alerts;
    try {
      alerts = await alertStore.getAlerts();
      if (!alerts) throw new Error("No alerts found.");
      const response = h.response(alerts);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("alertController getAlerts error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving alerts.");
    }
  },
  async getAlert(req, h) {
    let alert;
    try {
      alert = await alertStore.getAlert(ObjectId(req.params.alertID));
      if (!alert) throw new Error("Alert not found.");
      const response = h.response(alert);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("alertController getAlert error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving alert.");
    }
  }
};

export default alertController;
