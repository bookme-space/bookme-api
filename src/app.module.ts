import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validate } from "@core/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
