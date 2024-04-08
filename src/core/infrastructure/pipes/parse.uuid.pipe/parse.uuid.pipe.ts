import {
  BadRequestException,
  ParseUUIDPipe as NestParseUUIDPipe,
  ParseUUIDPipeOptions,
} from "@nestjs/common";

export class ParseUUIDPipe extends NestParseUUIDPipe {
  constructor(opts?: ParseUUIDPipeOptions) {
    super({
      ...opts,
      exceptionFactory: (error: string) =>
        new BadRequestException(error),
    });
  }
}
