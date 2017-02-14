import userController from '../../controllers/userController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/user',
    handler: userController.createUser,
    config: config.user,
  },
];

