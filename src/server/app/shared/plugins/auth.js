import bcrypt from 'bcrypt';
import jwt from 'json-web-token';
import { Base64 } from 'js-base64';
import Bounce from 'bounce';
import mongoose from 'mongoose';
import { addHours, hashPassword, log, logErr } from '../utils';
import userStore from '../../api/stores/userStore';
import groupStore from '../../api/stores/groupStore';

const ObjectId = mongoose.Types.ObjectId;

export async function validateUser(req, username, password, h) {
  try {
    const user = await userStore.getUserByPhoneOrEmail(username);
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = bcrypt.compareSync(password, user.password);
    return { isValid, id: user._id, email: user.email };
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateUser error: ", err.message || err);
    return new Error(err.message || err);
  }
};

async function getSecretFromUserId(userId) {
  let user, group, secret;
  // fetch user from auth credentials user ID
  user = await userStore.getUser(userId);
  if (!user) throw new Error("User not found");
  // fetch group ID from username
  group = await groupStore.getGroup(user.belongs.to);
  if (!group) throw new Error("User group not found");
  // fetch group secret from group
  secret = group.secret;
  if (!secret) throw new Error("User group has no secret key");
  return secret;
}

export async function generateToken(auth) {
  try {
    const secret = await getSecretFromUserId(auth.id);
    const payloadAndHeaders = {
      payload: {
        username: auth.email,
        dateGenerated: Date.now(),
        expireAt: addHours(Date.now(), 7 * 24) // 1 week
      },
      header: { // must declare headers explicitly to add kid
        typ: "JWT", // type of token
        alg: "HS256", // algorithm used to encode token
        kid: auth.email // key ID is hint to server on which secret to use
      }
    }
    // encode token
    const token = await jwt.encode(secret, payloadAndHeaders, (err, t)=> { return t; });
    return token;
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("generateToken error: ", err.message || err);
    return new Error(err.message || err);
  }
};

export async function validateToken(name, token) {
  try {
    const user = await userStore.getUserByPhoneOrEmail(name);
    if (Bounce.isError(user) || !user) throw new Error(user.message || "User not found.");
    const secret = await getSecretFromUserId(user._id);
    const decodedToken = await jwt.decode(secret, token, (err, payload, header)=> {
      if (err) throw err;
      return payload;
    });
    const { username, dateGenerated, expireAt } = decodedToken;
    if (!username) throw new Error("Login token missing username.");
    if (!dateGenerated) throw new Error("Login token missing creation date.");
    if (!expireAt) throw new Error("Login token missing expiration date.");

    const now = Date.now();
    if (expireAt < now) throw new Error("Login token has expired. Please log in again.");
    if (dateGenerated > now) throw new Error("Login token has invalid creation date.");
    const tokenValidation = { ...decodedToken, id: user._id };

    return tokenValidation;
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateToken error: ", err.message || err);
    return new Error(err.message || err);
  }
};

export async function validateHeader(req) {
  try {
    if (!req) throw new Error("Missing request.");
    if (!req.headers['authorization']) throw new Error("Missing authorization header.");

    const token = req.headers['authorization'].replace("Bearer ", "");
    if (!token) throw new Error("Missing login token.");

    const tokenHeader = JSON.parse(Base64.decode(token.split(".")[0]));
    if (!tokenHeader.kid) throw new Error("Missing authentication key id.");

    const tokenValidation = await validateToken(tokenHeader.kid, token);
    if (Bounce.isError(tokenValidation) || !tokenValidation) {
      throw new Error(tokenValidation.message || "Login token missing or not valid.");
    }

    const validation = { isValid: true, ...tokenValidation };
    return validation;
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateHeader error: ", err.message || err);
    return new Error(err.message || err);
  }
}
