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
  getUser(req, reply) {
    userStore.getUser(req.params.userID)
    .then((user) => {
      reply(user).code(200);
    })
    .catch((err) => {
      req.server.log('Error. Could not retrieve user.');
      Boom.badRequest(err);
    });
  },
  // createSession(req, reply) {
  //   // Stores a new session in db
  //   //
  //   // Will need to wait for authentication for session to be active
  // },
  // authenticateSession(req, reply) {
  //   // Will authenticate session with code received through SMS
  //   //
  //   // Will set the session to authenticated
  // },
  // deleteSession(req, reply) {
  //   // Will delete the session
  // },
};

export default userController;
