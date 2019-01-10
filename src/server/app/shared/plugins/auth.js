import bcrypt from 'bcrypt-nodejs';
import Bounce from 'bounce';
import mongoose from 'mongoose';
import { hashPassword, log, logErr } from '../utils';
import userStore from '../../api/stores/userStore';

const ObjectId = mongoose.Types.ObjectId;

export async function validateUser(req, username, password, h) {
  let user;
  try {
    user = await userStore.getUserByPhoneOrEmail(username);
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = bcrypt.compareSync(password, user.password);
    const credentials = { id: user._id, name: user.email };
    return { isValid, credentials };
  } catch (err) {
    if (Bounce.isSystem(err)) logErr("validateUser error: ", err.message || err);
    return new Error(err);
  }
};
