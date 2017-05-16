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
  getRaids(req, reply) {
    raidStore.getRaids()
      .then((raids) => {
        reply(raids).code(200);
      })
      .catch((err) => {
        reply(Boom.badRequest(err));
      });
  },
};

export default raidController;
