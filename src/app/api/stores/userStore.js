import User from '../../shared/models/user';

const userStore = {
  createUser(payload) {
    return User.create({
      phoneNumber: payload.phoneNumber,
    });
  },
};

export default userStore;
