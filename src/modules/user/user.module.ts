import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { RootConfig } from "@core/config";
import { DatabaseClient } from "@core/modules/database";

import { AuthService } from "./application/services/auth.service";
import { AuthController } from "./auth.controller";
import { IJwtService } from "./domain/adapters";
import { UserFactory } from "./domain/factories/user.factory";
import { IUserRepository } from "./domain/user.repository";
import { UserMapper } from "./infrastructure/persistence/mappers/user.mapper";
import { UserRepositoryImpl } from "./infrastructure/persistence/user.repository.impl";
import { JwtServiceImplementation } from "./infrastructure/services";

const infrastructure = [
  UserMapper,
  {
    provide: IUserRepository,
    useFactory: (mapper: UserMapper, db: DatabaseClient) =>
      new UserRepositoryImpl(mapper, db),
    inject: [UserMapper, DatabaseClient],
  },
  {
    provide: IJwtService,
    useFactory: (
      jwt: JwtService,
      config: ConfigService<RootConfig, true>,
    ) => new JwtServiceImplementation(jwt, config),
    inject: [JwtService, ConfigService],
  },
];

const application = [AuthService];

const domain = [UserFactory];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<RootConfig, true>) => {
        const { access } = config.get("auth", { infer: true });

        return {
          secret: access.secret,
          signOptions: { expiresIn: access.expiresIn },
        };
      },
    }),
  ],
  providers: [...infrastructure, ...application, ...domain],
  controllers: [AuthController],
  exports: [IUserRepository, IJwtService],
})
export class UserModule {}
