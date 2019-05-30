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
  async validateAuthToken(req, h) {
    let validation;
    try {
      if (!req.payload) throw new Error("Missing authentication payload.");
      if (!req.payload.token) throw new Error("Missing authentication token.");
      if (!req.payload.username) throw new Error("Auth payload missing username.");
      validation = await validateToken(req.payload.username, req.payload.token);
      if (Bounce.isError(validation)) throw new Error(validation.message || "No validation returned.");
      if (!validation.isValid) throw new Error("Auth token not valid.");
      const response = h.response(validation);
      return response;
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController validateAuthToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error validating user login token.");
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
