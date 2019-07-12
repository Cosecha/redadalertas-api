import bcrypt from 'bcrypt-nodejs';

export const getFullPaths = p => {
  const paths = Object.keys(p);
  let fullPaths = paths;
  paths.forEach(path => {
    if (path.indexOf('.') > -1) {
      let paths = path.split('.');
      for (var i = 0; i < paths.length; i++) {
        const newPath = paths.slice(0, i + 1).join('.');
        if (!fullPaths.includes(newPath)) {
          fullPaths.push(newPath);
        }
      }
    }
  });
  return fullPaths;
};

export const ensureObjectExists = (obj, msg) => new Promise((resolve, reject) => {
  if (obj) {
    resolve(obj);
  } else {
    reject(msg || 'Expected object to exist');
  }
});

export const addHours = (date, hours)=> {
  return date + (1000 * 60 * 60 * hours);
}

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

export const log = async (string, object = null)=> {
  /* eslint-disable no-console */
  console.log("\x1b[36m%s\x1b[0m", string);
  if (object) console.log(object);
  /* eslint-enable no-console */
}

export const logErr = async (string, error = null)=> {
  /* eslint-disable no-console */
  console.error("\x1b[31m%s\x1b[0m", string);
  if (error) console.error(error);
  /* eslint-enable no-console */
}

async function generateSalt() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Error generating salt...');
      }
    });
  });
}

async function hashPassword(nonHashed, salt) {
 return new Promise((resolve, reject) => {
   bcrypt.hash(nonHashed, salt, null, (err, res) => {
     if (!err) {
       resolve(res);
     } else {
       reject('Error generating password');
     }
   });
 });
}
module.exports.generateSalt = generateSalt;
module.exports.hashPassword = hashPassword;
