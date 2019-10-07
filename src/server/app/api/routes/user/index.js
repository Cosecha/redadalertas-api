import userController from '../../controllers/userController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/user',
    handler: userController.createUser
  },
  {
    method: 'PUT',
    path: '/user',
    handler: userController.updateUser
  },
  {
    method: 'GET',
    path: '/users',
    handler: userController.getUsers,
  },
  {
    method: 'GET',
    path: '/user/{userID}',
    handler: userController.getUser
  },
  {
    method: 'DELETE',
    path: '/user/{userID}',
    handler: userController.deleteUser
  }
];
