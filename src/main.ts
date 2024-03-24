import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { RootConfig } from "@core/config";

import { AppModule } from "src/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const { port, prefix } = app
    .get(ConfigService<RootConfig, true>)
    .get("app", { infer: true });

  app.setGlobalPrefix(prefix ?? "");
  await app.listen(port, "0.0.0.0");
}

bootstrap();
