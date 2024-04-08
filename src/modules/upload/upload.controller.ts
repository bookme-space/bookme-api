import {
  Controller,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

import { UploadedFile } from "@core/decorators/uploaded-file";
import { UploadGuard } from "@core/infrastructure/guards/upload.guard";
import {
  FileShapes,
  ImageSharpPipe,
} from "@core/infrastructure/pipes/image.sharp.pipe";

import { UploadFileDto } from "./dtos/upload-file.dto";
import { UploadFileQueryDto } from "./dtos/upload-file.query.dto";

@ApiTags("uploads")
@Controller("uploads")
export class UploadController {
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadFileDto })
  @Post("upload-file")
  @UseGuards(UploadGuard)
  async upload(
    @UploadedFile(ImageSharpPipe) file: FileShapes,
    @Query() { folder }: UploadFileQueryDto,
  ) {
    console.log(file, folder);
    return "hello";
  }
}
