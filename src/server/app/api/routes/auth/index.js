import authController from '../../controllers/authController';

export default [
  {
    method: 'PUT',
    path: '/auth',
    handler: authController.authenticateUser,
    options: { auth: false }
  },
];
