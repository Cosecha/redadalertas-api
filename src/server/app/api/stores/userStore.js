import { User } from '../../shared/models';

const userStore = {
  createUser(payload) {
    return User.create({
      password: payload.password,
      profile: {
        email: payload.email,
      },
    });
  },
  getUser(payload) {
    return User.findOne({
      _id: payload,
    });
  },
  // This method will be used for when loggin in. People will have the option to
  // use their email of phone as a username.
  getUserByPhoneOrEmail(payload) {
    return User.findOne().or([
      { 'profile.phone': payload },
      { 'profile.email': payload },
    ]);
  },
};

export default userStore;
