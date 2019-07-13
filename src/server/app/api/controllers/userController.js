import mongoose from 'mongoose';
import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import userStore from '../stores/userStore';

const ObjectId = mongoose.Types.ObjectId;

const userController = {
  async createUser(req, h) {
    let user;
    try {
      user = await userStore.createUser(req.payload);
      if (!user) throw new Error("User returned empty.");
      const response = h.response(user);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController createUser error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating user.");
    }
  },
  async getUser(req, h) {
    let user;
    try {
      user = await userStore.getUser(ObjectId(req.params.userID));
      if (!user) throw new Error("User not found.");
      const response = h.response(user);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController getUser error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving user.");
    }
  },
  async getUsers(req, h) {
    let users;
    try {
      users = await userStore.getUsers();
      if (!users) throw new Error("No users found.");
      const response = h.response(users);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController getUsers error: ", err.message || err);
      return Boom.badRequest(err.message || "Error retrieving users.");
    }
  },
  async updateUser(req, h) {
    let data, user, updatedUser;
    try {
      if (!req.payload) throw new Error("Did not receive valid information for update.");
      data = req.payload;

      // Fetch user id from username
      user = await userStore.getUserByPhoneOrEmail(data.user.username);
      if (!ObjectId.isValid(user._id)) throw new Error("User ID is not valid.");

      // Modify update data to remove username and add id
      delete data["user"];
      data["_id"] = ObjectId(user._id);

      // Update user with data
      user = await userStore.updateUser(data);
      if (!user) throw new Error("User not found.");

      // Fetch new user info for response
      updatedUser = await userStore.getUser(data._id);
      const response = h.response(updatedUser);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController updateUser error: ", err.message || err);
      return Boom.badRequest(err.message || "Error updating user.");
    }
  },
  async deleteUser(req, h) {
    let user;
    try {
      user = await userStore.deleteUser(ObjectId(req.params.userID));
      if (!user) throw new Error("User not found.");
      const response = h.response(user);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController deleteUser error: ", err.message || err);
      return Boom.badRequest(err.message || "Error deleting user.");
    }
  }
};

export default userController;
