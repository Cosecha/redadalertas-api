import sessionController from '../../controllers/sessionController';
import config from './config';

export default [
  {
    method: 'POST',
    path: '/session',
    handler: sessionController.createSession,
    config: config.username,
  },
  {
    method: 'DELETE',
    path: '/session',
    handler: sessionController.deleteSession,
  },
];
