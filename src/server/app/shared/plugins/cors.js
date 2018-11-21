import addCorsHeaders from 'hapi-cors-headers';

const register = (server, options, next) => {
  server.ext('onPreResponse', addCorsHeaders);
};

exports.plugin = {
  name: 'cors',
  register: register
};
