import Boom from 'boom';

const userController = {
  createUser(req, reply) {
    reply('Hi there').code(201);
  },
};

export default userController;
