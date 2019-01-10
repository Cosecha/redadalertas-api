import alertController from '../../controllers/alertController';

export default [
  {
    method: 'POST',
    path: '/alert',
    handler: alertController.createAlert,
  },
  {
    method: 'PUT',
    path: '/alert/{alertID}',
    handler: alertController.updateAlert,
  },
  {
    method: 'GET',
    path: '/alerts',
    handler: alertController.getAlerts,
    options: { auth: false }
  },
  {
    method: 'GET',
    path: '/alert/{alertID}',
    handler: alertController.getAlert,
    options: { auth: false }
  }
];
