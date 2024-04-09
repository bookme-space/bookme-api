import { IEnvVarialbes } from "./types";

export const load = (config: IEnvVarialbes) => ({
  app: {
    port: config.PORT,
    prefix: config.API_PREFIX,
    baseUrl: config.BASE_URL,
    dbUrl: config.DATABASE_URL,
    logLevels: config.LOG_LEVELS,
  },
  auth: {
    access: {
      secret: config.JWT_ACCESS_SECRET,
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    },
    refresh: {
      secret: config.JWT_REFRESH_SECRET,
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    },
  },
});
