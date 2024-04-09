import { FastifyReply, FastifyRequest } from "fastify";

import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { RootConfig } from "@core/config";
import { IsPublic } from "@core/decorators/is-public";
import { IDateService } from "@core/modules/shared/dates";

import { AuthService } from "./application/services/auth.service";
import {
  LoginDto,
  RegisterDto,
  UserAuthorizedResultDto,
} from "./dtos";
import { RefreshGuard } from "./infrastructure/guards/refresh.cookie.guard";
import { UserMapper } from "./infrastructure/persistence/mappers/user.mapper";

@ApiTags("auth")
@Controller("auth")
@IsPublic()
export class AuthController {
  constructor(
    private readonly config: ConfigService<RootConfig, true>,
    private readonly dateService: IDateService,
    private readonly service: AuthService,
    private readonly mapper: UserMapper,
  ) {}

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @Post("login")
  public async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() { email, password }: LoginDto,
  ) {
    const { access, refresh, user } = await this.service.login({
      email,
      password,
    });

    this.setRefreshCookie(refresh, reply);
    return { access, user: this.mapper.toDto(user) };
  }

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @Post("register")
  public async register(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body()
    { email, firstname, lastname, password }: RegisterDto,
  ) {
    const { access, refresh, user } =
      await this.service.register({
        email,
        firstname,
        lastname,
        password,
      });

    this.setRefreshCookie(refresh, reply);
    return { access, user: this.mapper.toDto(user) };
  }

  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @UseGuards(RefreshGuard)
  @Post("refresh")
  public async refresh(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const { refresh: oldRefresh } = request.cookies;
    const { access, refresh, user } = await this.service.refresh(
      { refresh: oldRefresh ?? "" },
    );

    this.setRefreshCookie(refresh, reply);
    return { access, user: this.mapper.toDto(user) };
  }

  private setRefreshCookie(
    refresh: string,
    reply: FastifyReply,
  ): FastifyReply {
    return reply.cookie("refresh", refresh, {
      httpOnly: true,
      sameSite: "strict",
      expires: this.dateService.end(
        this.config.get("auth.refresh.expiresIn", {
          infer: true,
        }),
      ),
    });
  }
}
