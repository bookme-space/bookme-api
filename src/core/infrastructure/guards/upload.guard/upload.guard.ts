import { FastifyRequest } from "fastify/types/request";

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";

import { UPLOADED_FILE_KEY } from "@core/decorators/uploaded-file";

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context
      .switchToHttp()
      .getRequest<FastifyRequest>();
    const isMultipart = req.isMultipart();

    if (!isMultipart)
      throw new BadRequestException(
        "multipart/form-data expected",
      );

    const file = await req.file({ limits: { fileSize: 3e6 } });
    if (!file) throw new BadRequestException("File expected");

    // @ts-ignore: only for get file in @File decorator
    req[UPLOADED_FILE_KEY] = file;
    return true;
  }
}
