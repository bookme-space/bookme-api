import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { AppConfig } from "./app.schema";

export class RootConfig {
  @ValidateNested()
  @Type(() => AppConfig)
  readonly app!: AppConfig;
}
