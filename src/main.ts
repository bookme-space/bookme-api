import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import statics from "@fastify/static";
import path from "node:path";

import { ValidationPipe } from "@nestjs/common";
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

const isProd = process.env.NODE_ENV == "prod";

const serveStaticOpts = {
  prefix: "/uploads/",
  root: path.join(__dirname, "..", "uploads"),
};

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

  if (!isProd) await app.register(statics, serveStaticOpts);

  app.useLogger(app.get(IAppLogger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  if (!!prefix) app.setGlobalPrefix(prefix);

  await BootstrapSwagger(app);
  await app.listen(port, "0.0.0.0");
}

bootstrap();
