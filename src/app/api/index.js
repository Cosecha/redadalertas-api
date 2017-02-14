import routes from './routes';

export const register = (server, options, next) => {
  server.route(routes);
  next();
};

export default register;

register.attributes = {
  name: 'api',
};

