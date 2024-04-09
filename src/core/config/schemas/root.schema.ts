import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { AppConfig } from "./app.schema";
import { AuthConfig } from "./auth.schema";

export class RootConfig {
  @ValidateNested()
  @Type(() => AppConfig)
  readonly app!: AppConfig;

  @ValidateNested()
  @Type(() => AuthConfig)
  readonly auth!: AuthConfig;
}
