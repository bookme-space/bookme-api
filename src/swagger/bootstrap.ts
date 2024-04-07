import fs from "node:fs/promises";

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
};
