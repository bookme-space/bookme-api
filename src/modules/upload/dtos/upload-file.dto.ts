import { MultipartFile } from "@fastify/multipart";
import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({ type: String, format: "binary" })
  @IsString()
  @IsNotEmpty()
  readonly file!: MultipartFile;
}
