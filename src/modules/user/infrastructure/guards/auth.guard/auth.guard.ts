import { FastifyRequest } from "fastify";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { Constants } from "@core/constants/app.constants";
import { IS_PUBLIC } from "@core/decorators/is-public";
import { IAls } from "@core/modules/als";

import {
  IJwtService,
  TokenType,
} from "src/modules/user/domain/adapters";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: IJwtService,
    private readonly als: IAls<string>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest>();

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC,
      context.getClass(),
    );

    if (isPublic) return true;

    try {
      const authorization = request.headers.authorization;
      const [tokenType, token] = authorization?.split(" ") || [];

      if (tokenType !== Constants.TOKEN_TYPE || !token)
        throw new UnauthorizedException("Token not provided");

      const payload = await this.jwt.verify(
        token,
        TokenType.Access,
      );

      this.als.set("user", payload);
      return true;
    } catch (exception) {
      if (exception instanceof UnauthorizedException)
        throw exception;
      throw new UnauthorizedException(
        "Token verification failed",
      );
    }
  }
}
