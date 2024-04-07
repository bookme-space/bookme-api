import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validate } from "@core/config";
import { AlsModule } from "@core/modules/als";
import { DatabaseModule } from "@core/modules/database";
import { SharedModule } from "@core/modules/shared/shared.module";

import { PlaceModule } from "./modules/place/place.module";

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

const modules = [PlaceModule];

@Module({
  imports: [...infrastructure, ...modules],
})
export class AppModule {}
