import authController from '../../controllers/authController';

export default [
  {
    method: 'POST',
    path: '/auth',
    handler: authController.createAuthorizationToken,
    options: { auth: false }
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: authController.validateAuthorizationToken,
    options: { auth: false }
  }
];
