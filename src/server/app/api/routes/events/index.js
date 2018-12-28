import eventController from '../../controllers/eventController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/event',
    handler: eventController.createEvent,
    // config: config.event,
  },
  {
    method: 'PUT',
    path: '/event',
    handler: eventController.updateEvent,
    // config: config.updatedEvent,
  },
  {
    method: 'GET',
    path: '/events',
    handler: eventController.getEvents,
  },
  {
    method: 'GET',
    path: '/event/{eventID}',
    handler: eventController.getEvent,
  },
];
