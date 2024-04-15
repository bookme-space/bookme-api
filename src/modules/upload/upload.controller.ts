import {
  Controller,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from "@nestjs/swagger";

import { UploadedFile } from "@core/decorators/uploaded-file";
import { UploadGuard } from "@core/infrastructure/guards/upload.guard";
import {
  FileShapes,
  ImageSharpPipe,
} from "@core/infrastructure/pipes/image.sharp.pipe";

import { UploadService } from "./application/services/upload.service";
import { UploadFileDto, UploadFileQueryDto } from "./dtos";

@ApiBearerAuth()
@ApiTags("uploads")
@Controller("uploads")
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadFileDto })
  @Post("upload-file")
  @UseGuards(UploadGuard)
  public async upload(
    @UploadedFile(ImageSharpPipe) shapes: FileShapes,
    @Query() { folder }: UploadFileQueryDto,
  ) {
    return this.service.upload(shapes, folder);
  }
}
