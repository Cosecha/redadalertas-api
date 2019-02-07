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
    // then rm -rf letsencrypt dir and restart to regenerate certs
  , server: 'https://acme-staging-v02.api.letsencrypt.org/directory'

  , email: process.env.EMAIL
  , agreeTos: true
  , approveDomains: process.env.API_DOMAINS.split(',')

// Run Docker with this flag to bind mounts: -v "$(pwd)"/letsencrypt:/root/app/letsencrypt
    // Uses root in Docker container:
    // (/root/app/letsencrypt or ~/app/letsencrypt)
    // Maps to user's repo directory in Docker host:
    // (/home/[USERNAME]/redadalertas-api/letsencrypt or ~/redadalertas-api/letsencrypt)
  , configDir: require('os').homedir() + '/app/letsencrypt' // In Docker container

  // , debug: true
  });
} else {
  log("API_DOMAINS: none");
  greenlock = null;
}

export default greenlock;
