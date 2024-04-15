import { Module } from "@nestjs/common";

import { UploadService } from "./application/services/upload.service";
import { UploadController } from "./upload.controller";

const application = [UploadService];

@Module({
  providers: [...application],
  controllers: [UploadController],
})
export class UploadModule {}
