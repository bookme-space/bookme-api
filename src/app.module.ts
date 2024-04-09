import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";

import { validate } from "@core/config";
import { AlsModule, IAls } from "@core/modules/als";
import { DatabaseModule } from "@core/modules/database";
import { SharedModule } from "@core/modules/shared/shared.module";

import { FastifyAdaptedNextFn } from "@app.types/fastify";

import { PlaceModule } from "./modules/place/place.module";
import { UploadModule } from "./modules/upload/upload.module";
import { AuthGuard } from "./modules/user/infrastructure/guards/auth.guard";
import { UserModule } from "./modules/user/user.module";

const infrastructure = [
  ConfigModule.forRoot({
    validate,
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }),
  SharedModule.register({ isGlobal: true }),
  AlsModule.register({ isGlobal: true }),
  DatabaseModule.register({ isGlobal: true }),
];

const modules = [UserModule, PlaceModule, UploadModule];

const guards = [{ provide: APP_GUARD, useClass: AuthGuard }];

@Module({
  imports: [...infrastructure, ...modules],
  providers: [...guards],
})
export class AppModule {
  constructor(private readonly als: IAls) {}

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        (_: unknown, __: unknown, next: FastifyAdaptedNextFn) =>
          this.als.run(() => next()),
      )
      .forRoutes("*");
  }
}
