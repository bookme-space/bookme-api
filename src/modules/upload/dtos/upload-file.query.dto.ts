import { ToApiEnum } from "@swagger/api.properties";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Folder } from "@core/modules/shared/object-storage";

export class UploadFileQueryDto {
  @ApiProperty({ enum: ToApiEnum(Folder), required: false })
  @IsOptional()
  @IsEnum(Folder)
  @Transform(({ value }) => Folder[value])
  readonly folder?: Folder;
}
