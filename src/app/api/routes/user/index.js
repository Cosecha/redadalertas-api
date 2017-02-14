import userController from '../../controllers/userController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/user',
    handler: userController.createUser,
    config: config.user,
  },
  {
    method: 'GET',
    path: '/user/{userID}',
    handler: userController.getUser,
    config: config.id,
  },
  {
    method: 'POST',
    path: '/user/session',
    handler: userController.createSession,
    config: config.newSession,
  },
];

