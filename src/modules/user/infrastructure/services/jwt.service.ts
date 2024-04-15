import { ConfigService } from "@nestjs/config";
import { JwtService as NestJwtService } from "@nestjs/jwt";

import { RootConfig } from "@core/config";

import {
  IJwtService,
  ITokenPayload,
  TokenType,
} from "../../domain/adapters/jwt.adapter";

export type ConfigAuthTokensPaths =
  | "auth.access"
  | "auth.refresh";

export class JwtServiceImplementation implements IJwtService {
  private static readonly types: Record<
    TokenType,
    ConfigAuthTokensPaths
  > = {
    [TokenType.Access]: "auth.access",
    [TokenType.Refresh]: "auth.refresh",
  };

  constructor(
    private readonly jwt: NestJwtService,
    private readonly configs: ConfigService<RootConfig, true>,
  ) {}

  public verify(
    token: string,
    type: TokenType,
  ): Promise<ITokenPayload> {
    return this.jwt.verifyAsync<ITokenPayload>(
      token,
      this.configs.get(JwtServiceImplementation.types[type], {
        infer: true,
      }),
    );
  }

  public sign(
    payload: ITokenPayload,
    type: TokenType,
  ): Promise<string>;
  public sign(payload: ITokenPayload): Promise<[string, string]>;
  public sign(payload: ITokenPayload, type?: TokenType) {
    if (!Object.is(type, undefined))
      return this.jwt.signAsync(
        payload,
        this.configs.get(JwtServiceImplementation.types[type!], {
          infer: true,
        }),
      );

    return Promise.all([
      this.jwt.signAsync(
        payload,
        this.configs.get(
          JwtServiceImplementation.types[TokenType.Access],
          { infer: true },
        ),
      ),
      this.jwt.signAsync(
        payload,
        this.configs.get(
          JwtServiceImplementation.types[TokenType.Refresh],
          { infer: true },
        ),
      ),
    ]);
  }
}
