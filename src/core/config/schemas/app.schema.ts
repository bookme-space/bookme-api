import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class AppConfig {
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  readonly port!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly prefix?: string;

  @IsString()
  @IsNotEmpty()
  readonly baseUrl!: string;

  @IsString()
  @IsNotEmpty()
  readonly dbUrl!: string;
}
