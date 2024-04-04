import { Injectable, LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { RootConfig } from "@core/config";

import { Optional } from "@app.types/common";

import { IAppLogger } from "./base.logger.service";

@Injectable()
export class AppLogger extends IAppLogger {
  protected readonly logLevels: Optional<LogLevel[]> = ["log"];

  constructor(_: ConfigService<RootConfig, true>) {
    super();
    // todo:
    // this.logLevels = config.get("app.logLevels", {
    //   infer: true,
    // });
  }

  protected override printMessages(
    messages: unknown[],
    context?: string,
    logLevel?: LogLevel,
    writeStreamType?: "stdout" | "stderr",
  ): void {
    if (!this.isCanBePrinted(logLevel)) return;
    super.printMessages(
      messages,
      context,
      logLevel,
      writeStreamType,
    );
  }

  protected isCanBePrinted = (logLevel?: LogLevel) =>
    !logLevel ||
    !this.logLevels?.length ||
    this.logLevels.includes(logLevel);
}
