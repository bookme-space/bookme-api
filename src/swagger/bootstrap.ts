import fs from "node:fs/promises";

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const BEARER_AUTH_OPTIONS = {
  type: "http",
  in: "header",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "JWT Authorization",
} as const;

export const BootstrapSwagger = async (
  app: INestApplication,
): Promise<void> => {
  const { name, description, version } = await fs
    .readFile("./package.json", "utf-8")
    .then(JSON.parse);

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(BEARER_AUTH_OPTIONS)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
};
