import Boom from 'boom';
import Bounce from 'bounce';
import { logErr } from '../../shared/utils';
import { validateUser } from '../../shared/plugins/auth';

const authController = {
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
