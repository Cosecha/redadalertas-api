import Boom from 'boom';
import userStore from '../stores/userStore';

const userController = {
  createUser(req, reply) {
    userStore.createUser(req.payload)
    .then((user) => {
      reply(user).code(201);
    })
    .catch((err) => {
      req.server.log('Error. Could not create User');
      Boom.badRequest(err);
    });
  },
};

export default userController;
