import Boom from 'boom';
import eventStore from '../stores/eventStore';
import alertStore from '../stores/alertStore';

const alertController = {
  async createAlert(req, h) {
    let alert = null;
    let payloadEvent;
    try {
      payloadEvent = await eventStore.getEvent(req.payload.event);
      const newLoad = {
        ...payloadEvent,
        // TO-DO: add parser with string formatting
        type: payloadEvent.type.toString(),
        event: req.payload.event,
        sent: {
          by: (req.payload && req.payload.sent) ? req.payload.sent.by : null
        }
      };
      delete newLoad["id"];
      alert = await alertStore.createAlert(newLoad);
      const response = h.response(alert);
      return response;
    } catch (err) {
      console.error("createAlert error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async updateAlert(req, h) {
    let alert;
    try {
      alert = await alertStore.updateAlert(req.params.alertID);
      const response = h.response(alert);
      return response;
    } catch (err) {
      console.error("updateAlert error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getAlerts(req, h) {
    let alerts;
    try {
      alerts = await alertStore.getAlerts();
      const response = h.response(alerts);
      return response;
    } catch (err) {
      console.error("getAlerts error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getAlert(req, h) {
    let alert;
    try {
      alert = await alertStore.getAlert(req.params.alertID);
      const response = h.response(alert);
      return response;
    } catch (err) {
      console.error("getAlert error: ", err);
      return h.response(Boom.badRequest(err));
    }
  }
};

export default alertController;
