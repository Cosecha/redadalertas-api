import Glue from 'glue';
import env from 'dotenv';
import http from 'http';
import https from 'https';
import { log, logErr } from './app/shared/utils';
import greenlock from './greenlock';
import manifest from './manifest.json'; // Generated from confidence.json
import { validateUser as validate } from './app/shared/plugins/auth.js';

env.config();

let servers = {};
let stopSignal = false;
let acmeResponder = null;

async function startServer(name) {
  let server;
  try {
    const isApiRemote = (name === "api" && process.env.API_DOMAINS &&
      process.env.API_DOMAINS.split(",").length > 0) ? true : false;
    if (isApiRemote) {
      log(`Configuring HTTPS redirection for ${name.toUpperCase()} server...`);
      acmeResponder = greenlock.middleware();
      // Create https server with Node httpsOptions from Greenlock:
      let httpsServer = https.createServer(greenlock.httpsOptions);
      // Change Confidence manifest to have api server listen to https server:
      manifest[name].server.listener = httpsServer;
      manifest[name].server.tls = true;
      // Create http server to listen on port 80 and redirect traffic to https:
      http.createServer(greenlock.middleware(require("redirect-https")())).listen(80, ()=> {
        log(`Listening on port 80 to handle ACME http-01 challenge and redirect to ${name.toUpperCase()} server on https.`);
      });
    }
    log(`Creating server with Glue for ${name.toUpperCase()}...`);
    server = await Glue.compose(manifest[name], { relativeTo: __dirname });
    server.auth.strategy('simple', 'basic', { validate });
    server.auth.default('simple');
    servers[name] = server;
    await server.start();
    log(`The ${name.toUpperCase()} server has started on port ${server.info.port}: ${new Date().toUTCString()}`);
  } catch (error) {
    logErr(`Error starting ${name} server: `, error);
  }
}

async function stopServer(name) {
  try {
    log(`Stopping ${name} server...`);
    await servers[name].stop({ timeout: 10000 });
    log(`The ${name} server has stopped: ${new Date().toUTCString()}`);
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
