import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import { generateToken, validateUser, validateToken } from '../../shared/plugins/auth';

const authController = {
  async createAuthorizationToken(req, h) {
    const { payload: { username, password } } = req;
    let auth, token;
    try {
      if (!username) throw new Error("Login requires username.");
      if (!password) throw new Error("Login requires password.");

      auth = await validateUser(req, username, password, h);

      if (!auth.credentials || !auth.isValid) throw new Error("Login not valid.");

      token = await generateToken(auth, username, password);

      if (Bounce.isError(token)) throw new Error(token.message || "No authentication token returned.");

      return h.response(auth);
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController createAuthorizationToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating user login token.");
    }
  },
  async validateAuthorizationToken(req, h) {
    let validation;
    try {
      if (!req.payload) throw new Error("Missing authentication payload.");

      const { payload: { token, username } } = req;
      if (!token) throw new Error("Missing authentication token.");
      if (!username) throw new Error("Auth payload missing username.");

      validation = await validateToken(username, token);

      if (Bounce.isError(validation)) throw new Error(validation.message || "No validation returned.");
      if (!validation.isValid) throw new Error("Auth token not valid.");

      return h.response(validation);
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController validateAuthorizationToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error validating user login token.");
    }
  }
}

export default authController;
