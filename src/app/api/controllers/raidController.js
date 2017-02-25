import Boom from 'boom';
import raidStore from '../stores/raidStore';

const raidController = {
  createRaid(req, reply) {
    raidStore.createRaid(req.payload)
    .then((raid) => {
      reply(raid).code(201);
    })
    .catch((err) => {
      req.server.log('Error. Could not create Raid');
      Boom.badRequest(err);
    });
  },
};

export default raidController;
