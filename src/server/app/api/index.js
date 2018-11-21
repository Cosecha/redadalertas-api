import routes from './routes';

const register = (server, options)=> {
  try {
    server.route(routes);
  } catch (error) {
    console.error("API register error: ", error);
  }
};

exports.plugin = {
  name: 'api',
  register: register
};
