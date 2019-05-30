import bcrypt from 'bcrypt-nodejs';
import jwt from 'json-web-token';
import Bounce from 'bounce';
import mongoose from 'mongoose';
import { hashPassword, log, logErr } from '../utils';
import userStore from '../../api/stores/userStore';
import groupStore from '../../api/stores/groupStore';

const ObjectId = mongoose.Types.ObjectId;

export async function validateUser(req, username, password, h) {
  let user;
  try {
    user = await userStore.getUserByPhoneOrEmail(username);
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = bcrypt.compareSync(password, user.password);
    const credentials = { id: user._id, email: user.email };
    return { isValid, credentials };
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateUser error: ", err.message || err);
    return new Error(err);
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
  let secret, payload, token;
  try {
    secret = await getSecretFromUserId(auth.credentials.id);
    // create payload
    payload = {
      ...auth.credentials,
      dateGenerated: Date.now()
    }
    // encode token
    token = await jwt.encode(secret, payload, (err, t)=> { return t; });
    auth.credentials = payload;
    auth.token = token;
    return auth;
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("generateToken error: ", err.message || err);
    return new Error(err);
  }
};

export async function validateToken(username, token) {
  let user, secret, decodedToken, validation;
  try {
    user = await userStore.getUserByPhoneOrEmail(username);
    if (!user) throw new Error("User not found");
    secret = await getSecretFromUserId(user._id);
    decodedToken = await jwt.decode(secret, token, (err, payload, header)=> {
      if (err) throw err;
      return payload;
    });
    validation = { ...decodedToken, isValid: true }
    return validation;
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateToken error: ", err.message || err);
    return new Error(err);
  }
};
