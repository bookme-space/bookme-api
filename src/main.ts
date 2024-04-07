import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { RootConfig } from "@core/config";
import { IAppLogger } from "@core/modules/shared/logger";

import { AppModule } from "src/app.module";

import { BootstrapSwagger } from "./swagger/bootstrap";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const { port, prefix } = app
    .get(ConfigService<RootConfig, true>)
    .get("app", { infer: true });

  await app.register(cookie);
  await app.register(multipart);

  app.useLogger(app.get(IAppLogger));
  app.setGlobalPrefix(prefix ?? "");

  await BootstrapSwagger(app);
  await app.listen(port, "0.0.0.0");
}

bootstrap();
