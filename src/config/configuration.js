import { config } from 'dotenv';

config();

const { PORT, APOLLO_ENV, SERVICE_URL } = process.env;
const configuration = Object.freeze({
  port: PORT,
  env: APOLLO_ENV,
  serviceUrl: SERVICE_URL
});

export default configuration;
