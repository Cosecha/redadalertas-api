import Boom from 'boom';
import sessionStore from '../stores/sessionStore';
import userStore from '../stores/userStore';
import bcrypt from 'bcrypt-nodejs';
import { comparePassword, checkPasswordExists } from '../../shared/utils';

// TO-DO: implement sessions

const sessionController = {
  createSession(req, reply) {
    // get User by email or phone
    userStore.getUserByPhoneOrEmail(req.payload.email)
      .then((user) => checkPasswordExists(user))
    // compare passwords using bcrypt
      .then((password) => comparePassword(req.payload.password, password))
      .then((matches) => getUserIfPasswordMatches(matches, req.payload.username))
      .then((user) => {
        return createSession(user);
      })
      .then((session) => {
        reply({
          sessionToken: session.id,
        }).code(201);
      })
    // if match create session
    // reply with the sessionToken only
      .catch((err) => reply(Boom.badRequest(err)));
  },
  deleteSession(req, reply) {
    reply('deleted session');
  },
};

const getUserIfPasswordMatches = (matches, username) => {
  if (matches) {
    return userStore.getUserByPhoneOrEmail(username);
  } else {
    throw new Error('Password does not match');
  }
};

const createSession = (user) => sessionStore.createSession(user);

export default sessionController;
