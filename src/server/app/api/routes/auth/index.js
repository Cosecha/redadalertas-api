import authController from '../../controllers/authController';

export default [
  {
    method: 'POST',
    path: '/auth',
    handler: authController.createAuthenticationToken,
    options: { auth: false }
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: authController.validateAuthenticationToken,
    options: { auth: false }
  }
];
