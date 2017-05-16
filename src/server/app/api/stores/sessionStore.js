import { Session } from '../../shared/models';

const sessionStore = {
  createSession(user) {
    return Session.create({
      userId: user._id,
      accessLevel: user.accessLevel,
    });
  },
};

export default sessionStore;
