import env from 'dotenv';
import { log, logErr } from './app/shared/utils';
import * as greenlockExpress from 'greenlock-express';

env.config();
let greenlock;

// API_DOMAINS environment variable is a comma-delimited string of domains
if (process.env.API_DOMAINS && process.env.API_DOMAINS.split(",").length > 0) {
  log(`API_DOMAINS: ${process.env.API_DOMAINS.split(',')}`);
  greenlock = greenlockExpress.create({
    version: 'draft-11' // Let's Encrypt v2
    // You MUST change this to 'https://acme-v02.api.letsencrypt.org/directory' in production
  , server: 'https://acme-staging-v02.api.letsencrypt.org/directory'

  , email: ***REMOVED***
  , agreeTos: true
  , approveDomains: process.env.API_DOMAINS.split(',')

    // Uses root in Docker container (/root/app/letsencrypt or ~/app/letsencrypt)
  , configDir: require('os').homedir() + '/app/letsencrypt'

  , debug: true
  });
} else {
  log("API_DOMAINS: none");
  greenlock = null;
}

export default greenlock;
