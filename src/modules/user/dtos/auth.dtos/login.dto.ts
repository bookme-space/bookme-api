import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { ILoginParams } from "../../application/services/auth.service";

export class LoginDto implements ILoginParams {
  @ApiProperty({ type: String, example: "user@gmail.com" })
  @IsString()
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ type: String, example: "top#secret" })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
