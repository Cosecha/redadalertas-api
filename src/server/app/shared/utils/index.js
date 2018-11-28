import bcrypt from 'bcrypt-nodejs';

export const ensureObjectExists = (obj, msg) => new Promise((resolve, reject) => {
  if (obj) {
    resolve(obj);
  } else {
    reject(msg || 'Expected object to exist');
  }
});

export const checkPasswordExists = (user) => new Promise((resolve, reject) => {
  if (user.password) {
    resolve(user.password);
  } else {
    reject('Password has not been set.');
  }
});

export const comparePassword = (providedPassword, storedPassword) => new Promise(
  (resolve, reject) => {
    bcrypt.compare(providedPassword, storedPassword, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Password does not match');
      }
    });
  });

export const generateSalt = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, res) => {
    if (!err) {
      resolve(res);
    } else {
      reject('Error generating salt...');
    }
  });
});

export const hashPassword = (nonHashed, salt) => new Promise((resolve, reject) => {
  bcrypt.hash(nonHashed, salt, null, (err, res) => {
    if (!err) {
      resolve(res);
    } else {
      reject('Error generating password');
    }
  });
});

export const log = async (string, object = null)=> {
  /* eslint-disable no-console */
  console.log(string);
  if (object) console.log(object);
  /* eslint-enable no-console */
}

export const err = async (string, error = null)=> {
  /* eslint-disable no-console */
  console.error(string);
  if (error) console.error(error);
  /* eslint-enable no-console */
}
