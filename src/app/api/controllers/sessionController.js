import Boom from 'boom';
import sessionStore from '../stores/sessionStore';
import userStore from '../stores/userStore';
import bcrypt from 'bcrypt';

const sessionController = {
  createSession(req, reply) {
    // get User by email or phone
    userStore.getUserByPhoneOrEmail(req.payload.username)
      .then((user) => checkPasswordExists(user))
    // compare passwords using bcrypt
      .then((password) => comparePassword(req.payload.password, password))
      .then((matches) => getUserIfPasswordMatches(matches, req.payload.username))
      .then((user) => createSession(user.id))
      .then((session) => {
        reply({ sessionToken: session.id });
      })
    // if match create session
    // reply with the sessionToken only
      .catch((err) => reply(Boom.badRequest(err)));
  },
  deleteSession(req, reply) {
    reply('deleted session');
  },
};

const checkPasswordExists = (user) => {
  if (user.password) {
    return user.password;
  } else {
    throw new Error('No password stored');
  }
};

const comparePassword = (providedPassword, storedPassword) => {
  return bcrypt.compare(providedPassword, storedPassword);
};

const getUserIfPasswordMatches = (matches, username) => {
  if (matches) {
    return userStore.getUserByPhoneOrEmail(username);
  } else {
    throw new Error('Password does not match');
  }
};

const createSession = (userId) => sessionStore.createSession(userId);

export default sessionController;
