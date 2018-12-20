import { User } from '../../shared/models';
import { generateSalt, hashPassword } from '../../shared/utils';

const userStore = {
  // TO-DO: fill in authLevel stubs
  // TO-DO: assume the password gets hashed and salted on the client side
  // TO-DO: use .findOne(query).populate() to populate subdocs
  async createUser(payload) {
    const salt = await generateSalt();
    return User.create([{
      ...payload,
      password: await hashPassword(payload.password, salt),
    }], {
      authLevel: false
    });
  },
  async updateUser(payload) {
    if (payload.password) {
      const salt = await generateSalt();
      payload.password = await hashPassword(payload.password, salt);
    }
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
  // This method will be used for when logging in. People will have the option to
  // use their email of phone as a username.
  getUserByPhoneOrEmail(payload) {
    return User.findOne().or([
      { 'phone': payload },
      { 'email': payload },
    ]);
  }
};

export default userStore;
