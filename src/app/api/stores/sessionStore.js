import { Session } from '../../shared/models';

const sessionStore = {
  createSession(userId) {
    return Session.create({
      userId,
    });
  },  
};

export default sessionStore;
