import { Body, Controller, Post } from "@nestjs/common";
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
import { RefreshDto } from "./dtos/auth.dtos/refresh.dto";
import { UserMapper } from "./infrastructure/persistence/mappers/user.mapper";

@ApiTags("auth")
@Controller("auth")
@IsPublic()
export class AuthController {
  private readonly expIn: { access: string; refresh: string };

  constructor(
    private readonly config: ConfigService<RootConfig, true>,
    private readonly dateService: IDateService,
    private readonly service: AuthService,
    private readonly mapper: UserMapper,
  ) {
    this.expIn = {
      access: this.config.get("auth.access.expiresIn", {
        infer: true,
      }),
      refresh: this.config.get("auth.refresh.expiresIn", {
        infer: true,
      }),
    };
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @Post("login")
  public async login(@Body() { email, password }: LoginDto) {
    const { access, refresh, user } = await this.service.login({
      email,
      password,
    });

    return {
      tokenData: {
        access,
        refresh,
        exp: this.dateService.end(this.expIn.access).getTime(),
      },
      user: this.mapper.toDto(user),
    };
  }

  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @Post("register")
  public async register(
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

    return {
      tokenData: {
        access,
        refresh,
        exp: this.dateService.end(this.expIn.access).getTime(),
      },
      user: this.mapper.toDto(user),
    };
  }

  @ApiBody({ type: RefreshDto })
  @ApiOkResponse({ type: UserAuthorizedResultDto })
  @Post("refresh")
  public async refresh(
    @Body() { refresh: _refresh }: RefreshDto,
  ) {
    const { access, refresh, user } = await this.service.refresh(
      { refresh: _refresh ?? "" },
    );

    return {
      tokenData: {
        access,
        refresh,
        exp: this.dateService.end(this.expIn.access).getTime(),
      },
      user: this.mapper.toDto(user),
    };
  }
}
