import { IEnvVarialbes } from "./types";

export const load = (config: IEnvVarialbes) => ({
  app: {
    port: config.PORT,
    prefix: config.API_PREFIX,
    baseUrl: config.BASE_URL,
    dbUrl: config.DATABASE_URL,
    logLevels: config.LOG_LEVELS,
  },
});
