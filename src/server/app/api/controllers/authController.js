import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import { generateToken, validateUser, validateToken } from '../../shared/plugins/auth';

const authController = {
  async createAuthenticationToken(req, h) {
    try {
      const { payload: { username, password } } = req;
      if (!username) throw new Error("Login requires username.");
      if (!password) throw new Error("Login requires password.");

      const auth = await validateUser(req, username, password, h);
      if (!auth.id || !auth.email || !auth.isValid) throw new Error("Login not valid.");

      const token = await generateToken(auth);
      if (Bounce.isError(token)) throw new Error(token.message || "No authentication token returned.");

      return h.response({ token, username });
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController createAuthenticationToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error creating user login token.");
    }
  },
  async validateAuthenticationToken(req, h) {
    try {
      if (!req.payload) throw new Error("Missing authentication payload.");

      const { payload: { token, username } } = req;
      if (!token) throw new Error("Missing authentication token.");
      if (!username) throw new Error("Authentication payload missing username.");

      const validation = await validateToken(username, token);
      if (Bounce.isError(validation)) throw new Error(validation.message || "No validation returned.");
      if (!validation) throw new Error("Authentication token not valid.");

      return h.response(validation);
    } catch (err) {
      if (Bounce.isSystem(err)) logErr("userController validateAuthenticationToken error: ", err.message || err);
      return Boom.badRequest(err.message || "Error validating user login token.");
    }
  }
}

export default authController;
