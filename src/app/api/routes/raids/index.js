import raidController from '../../controllers/raidController';
import * as config from './config';

export default [
  {
    method: 'POST',
    path: '/raid',
    handler: raidController.createRaid,
    config: config.raid,
  },
  {
    method: 'GET',
    path: '/raids',
    handler: raidController.getRaids,
  },
];
