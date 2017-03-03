import User from '../../shared/models/user';

const userStore = {
  createUser(payload) {
    return User.create({
      phoneNumber: payload.phoneNumber,
    });
  },
  getUser(payload) {
    return User.findOne({
      _id: payload,
    });
  },
};

export default userStore;
