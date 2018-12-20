import Boom from 'boom';
import userStore from '../stores/userStore';

const userController = {
  async createUser(req, h) {
    let user;
    try {
      user = await userStore.createUser(req.payload);
      const response = h.response(user);
      return response;
    } catch (err) {
      console.error("createUser error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getUser(req, h) {
    let user;
    try {
      user = await userStore.getUser(req.params.userID);
      const response = h.response(user);
      return response;
    } catch (err) {
      console.error("getUser error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async getUsers(req, h) {
    let users;
    try {
      users = await userStore.getUsers();
      const response = h.response(users);
      return response;
    } catch (err) {
      console.error("getUsers error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
  async updateUser(req, h) {
    let user;
    try {
      user = await userStore.updateUser(req.payload);
      const response = h.response(user);
      return response;
    } catch (err) {
      console.error("updateUser error: ", err);
      return h.response(Boom.badRequest(err));
    }
  },
};

export default userController;
