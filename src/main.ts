import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { RootConfig } from "./core/config";

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
