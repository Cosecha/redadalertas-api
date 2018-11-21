import Glue from 'glue';
import manifest from './manifest.json';
import env from 'dotenv';

env.config();

async function startApiServer() {
  let server;
  try {
    server = await Glue.compose(manifest.api, { relativeTo: __dirname });
    await server.start();
    /* eslint-disable no-console */
    console.log(`API server has started: ${new Date()}`);
    /* eslint-enable no-console */
  } catch (error) {
    console.error("Error starting API server: ", error);
  }
}

async function startAdminServer() {
  let server;
  try {
    server = await Glue.compose(manifest.admin, { relativeTo: __dirname });
    await server.start();
    /* eslint-disable no-console */
    console.log(`Admin server has started: ${new Date()}`);
    /* eslint-enable no-console */
  } catch (error) {
    console.error("Error starting admin server: ", error);
  }
}

startApiServer();
startAdminServer();
