import addCorsHeaders from 'hapi-cors-headers';

export const register = (server, options, next) => {
  server.ext('onPreResponse', addCorsHeaders);
  next();
};

export default register;

register.attributes = {
  name: 'cors',
};
