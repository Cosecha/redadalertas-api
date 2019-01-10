import Glue from 'glue';
import { log, logErr } from './app/shared/utils';
import manifest from './manifest.json';
import env from 'dotenv';
import { validateUser as validate } from './app/shared/plugins/auth.js';

env.config();

let servers = {};
let stopSignal = false;

async function startServer(name) {
  let server;
  try {
    server = await Glue.compose(manifest[name], { relativeTo: __dirname });
    servers[name] = server;
    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');
    await server.start();
    log(`The ${name} server has started: ${new Date()}`);
  } catch (error) {
    logErr(`Error starting ${name} server: `, error);
  }
}

async function stopServer(name) {
  try {
    log(`Stopping ${name} server...`);
    await servers[name].stop({ timeout: 10000 });
    log(`The ${name} server has stopped: ${new Date()}`);
  } catch (error) {
    logErr(`Error stopping ${name} server: `, error);
  }
}

async function startServers() {
  try {
    await startServer("api");
    await startServer("admin");
  } catch (error) {
    logErr("Error starting process: ", error);
  }
};

async function stopServers(signal) {
  stopSignal = true;
  try {
    await stopServer("api");
    await stopServer("admin");
  } catch (error) {
    logErr("Error stopping servers: ", error);
  }
}

startServers();
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal=> {
  process.on(signal, async()=> {
    try {
      if (!stopSignal) {
        log(`${signal} received, stopping servers...`);
        await stopServers(signal);
        log('Exiting Node process.');
        process.exit();
      } else {
        log(`(${signal} received but Node process already exiting.)`);
      }
    } catch (error) {
      logErr("Error exiting Node process: ", error);
      process.exit(1);
    }
  });
});
