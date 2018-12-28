import userRoutes from './user';
import eventRoutes from './events';
import alertRoutes from './alerts';
import sessionRoutes from './session';

export default [].concat(userRoutes, eventRoutes, alertRoutes, sessionRoutes);
