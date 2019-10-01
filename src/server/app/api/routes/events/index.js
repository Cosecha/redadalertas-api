import eventController from '../../controllers/eventController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/event',
    handler: eventController.createEvent
  },
  {
    method: 'PUT',
    path: '/event',
    handler: eventController.updateEvent
  },
  {
    method: 'GET',
    path: '/events',
    handler: eventController.getEvents
  },
  {
    method: 'GET',
    path: '/event/{eventID}',
    handler: eventController.getEvent
  },
  {
    method: 'DELETE',
    path: '/event/{eventID}',
    handler: eventController.deleteEvent
  }
];
