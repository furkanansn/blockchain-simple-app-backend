/**
 * MAIN APP CONFIG
 */

import * as DotEnvFlow from "dotenv-flow";

export enum Environments {
  PRODUCTION = "production",
  STAGING = "staging",
  DEVELOPMENT = "development",
}

const envFound = DotEnvFlow.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || Environments.DEVELOPMENT;

// Set ENV to loaded, ensuring it does not load again
process.env.ENV_LOADED = "true";

const frontEndURL = process.env.FRONT_END_URL || "http://localhost:3000";
const backEndURL = process.env.BACK_END_URL || "http://localhost:5001";

export default {
  // Current Environment
  environment: process.env.NODE_ENV,
  frontEndURL,
  backEndURL,
  // App Port
  port: process.env.PORT || 5001,

  explorerURL:process.env.EXPLORER_URL || "https://chain.api.btc.com/v3/"
};
