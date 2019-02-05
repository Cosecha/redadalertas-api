'use strict';
import env from 'dotenv';
import { log, logErr } from '../server/app/shared/utils';

env.config();

// API_DOMAINS is a comma-delimited string of domains
log(`API_DOMAINS: ${process.env.API_DOMAINS.split(',')}`);

const greenlock = require('greenlock-hapi').create({
  version: 'draft-11' // Let's Encrypt v2
  // You MUST change this to 'https://acme-v02.api.letsencrypt.org/directory' in production
, server: 'https://acme-staging-v02.api.letsencrypt.org/directory'

, email: ***REMOVED***
, agreeTos: true
, approveDomains: process.env.API_DOMAINS.split(',')

, configDir: require('os').homedir() + '/acme/etc'

//, debug: true
});

export default greenlock;
