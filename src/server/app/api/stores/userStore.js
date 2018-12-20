import { User } from '../../shared/models';

const userStore = {
  // TO-DO: fill in authLevel stubs
  createUser(payload) {
    return User.create([{
      password: payload.password,
      email: payload.email,
    }], {
      authLevel: false
    });
  },
  updateUser(payload) {
    return User.findOneAndUpdate(
      { _id: payload._id },
      payload,
      { authLevel: false }
    );
  },
  getUser(id) {
    return User.findById(id);
  },
  getUsers() {
    return User.find();
  },
  // This method will be used for when loggin in. People will have the option to
  // use their email of phone as a username.
  getUserByPhoneOrEmail(payload) {
    return User.findOne().or([
      { 'phone': payload },
      { 'email': payload },
    ]);
  }
};

export default userStore;
