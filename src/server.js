import Glue from 'glue';
import manifest from './manifest.json';
import env from 'dotenv';
import Labbable from 'labbable';
/*eslint-disable*/
export const labbable = new Labbable();
/*eslint-enable*/
env.config();

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  labbable.using(server);
  server.initialize((err) => {
    if (err) {
      throw err;
    }
    if (module.parent) {
      return;
    }
    server.start((err) => {
      if (err) {
        throw err;
      } else {
        /* eslint-disable no-console */
        console.log('Server has started...');
        /* eslint-enable no-console */
      }
    });
  });
});
