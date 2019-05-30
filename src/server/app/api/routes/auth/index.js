import authController from '../../controllers/authController';

export default [
  {
    method: 'POST',
    path: '/auth',
    handler: authController.createAuthToken,
    options: { auth: false }
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: authController.validateAuthToken,
    options: { auth: false }
  }
];
