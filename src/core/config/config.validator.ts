import { plainToInstance } from "class-transformer";
import { validateSync as validator } from "class-validator";

import { load } from "./config.loader";
import { RootConfig } from "./schemas/root.schema";
import { IEnvVarialbes } from "./types";

export const validate = (raw: IEnvVarialbes) => {
  const config = plainToInstance(RootConfig, load(raw));
  const errors = validator(config);

  if (errors.length)
    throw new Error(
      "Invalid environment variables:\n" +
        errors.map((error) => error.toString()),
    );

  return config;
};
