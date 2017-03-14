import sessionController from '../../controllers/sessionController';

export default [
  {
    method: 'POST',
    path: '/session',
    handler: sessionController.createSession,
  },
];
