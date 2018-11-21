import routes from './routes';

const register = (server, options, next) => {
  server.route(routes);
};

exports.plugin = {
  name: 'api',
  register: register
};
