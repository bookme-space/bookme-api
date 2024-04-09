import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";

export class TokenConfig {
  @IsString()
  @IsNotEmpty()
  readonly secret!: string;

  @IsString()
  @IsNotEmpty()
  readonly expiresIn!: string;
}

export class AuthConfig {
  @ValidateNested()
  @Type(() => TokenConfig)
  readonly access!: TokenConfig;

  @ValidateNested()
  @Type(() => TokenConfig)
  readonly refresh!: TokenConfig;
}
