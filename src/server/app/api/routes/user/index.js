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
    method: 'PUT',
    path: '/user',
    handler: userController.updateUser,
    // config: config.updatedUser,
  },
  {
    method: 'GET',
    path: '/users',
    handler: userController.getUsers,
  },
  {
    method: 'GET',
    path: '/user/{userID}',
    handler: userController.getUser,
    // config: config.id,
  },
];
