import { MultipartFile } from "@fastify/multipart";
import { FastifyRequest } from "fastify/types/request";

import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from "@nestjs/common";

import { UPLOADED_FILE_KEY } from "./symbols";

export const UploadedFile = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): MultipartFile => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    // @ts-ignore: get uploaded file, that was setted in UploadGuard
    const file = req[UPLOADED_FILE_KEY];

    if (!file)
      throw new BadRequestException(
        "Uploaded file receiving error",
      );

    return file as MultipartFile;
  },
);
