import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import { generateToken, validateUser, validateToken } from '../../shared/plugins/auth';

const authController = {
  async createAuthToken(req, h) {
    let auth, token;
    try {
      if (!req.payload.username) throw new Error("Login requires username.");
      if (!req.payload.password) throw new Error("Login requires password.");
      auth = await validateUser(req, req.payload.username, req.payload.password, h);
      if (!auth.credentials || !auth.isValid) throw new Error("Login not valid.");
      token = await generateToken(auth, req.payload.username, req.payload.password);
      if (Bounce.isError(token)) throw new Error(token.message || "No authentication token returned.");
      const response = h.response(auth);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController createAuthToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating user login token.");
    }
  },
  async authenticateUser(req, h) {
    let auth;
    try {
      if (!req.payload.username) throw new Error("Login requires username.");
      if (!req.payload.password) throw new Error("Login requires password.");
      auth = await validateUser(req, req.payload.username, req.payload.password, h);
      if (!auth.credentials || !auth.isValid) throw new Error("Login not valid.");
      const response = h.response(auth);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController authenticateUser error: ", err.message || err);
      return Boom.badRequest(err.message || "Error authenticating user.");
    }
  },
}

export default authController;
