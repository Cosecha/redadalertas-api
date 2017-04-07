import Boom from 'boom';
import userStore from '../stores/userStore';

const userController = {
  createUser(req, reply) {
    userStore.createUser(req.payload)
      .then((user) => reply(user).code(201))
      .catch((err) => reply(Boom.badRequest(err)));
  },
  getUser(req, reply) {
    userStore.getUser(req.params.userID)
      .then((user) => reply(user).code(200))
      .catch((err) => reply(Boom.badRequest(err)));
  },
};

export default userController;
