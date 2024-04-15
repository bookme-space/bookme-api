import { FastifyRequest } from "fastify";

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest>();

    const { refresh: token } = request.cookies;

    if (!token)
      throw new BadRequestException("Refresh token not passed");

    return true;
  }
}
