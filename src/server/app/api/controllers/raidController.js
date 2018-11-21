import Boom from 'boom';
import raidStore from '../stores/raidStore';

const raidController = {
  async createRaid(req, reply) {
    raidStore.createRaid(req.payload)
    .then((raid) => {
      reply(raid).code(201);
    })
    .catch((err) => {
      req.server.log('Error. Could not create Raid');
      Boom.badRequest(err);
    });
  },
  async getRaids(req, h) {
    let raids;
    try {
      raids = await raidStore.getRaids();
      const response = h.response(raids);
      return response;
    } catch (err) {
      console.error("getRaids error: ", err);
      h.response(Boom.badRequest(err));
    }
  },
};

export default raidController;
