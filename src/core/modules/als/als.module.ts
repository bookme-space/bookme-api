import { AsyncLocalStorage } from "node:async_hooks";

import { DynamicModule } from "@nestjs/common";

import { Als, IAls } from "./als.storage";

interface AsyncContextModuleConfig {
  isGlobal?: boolean;
  alsInstance?: AsyncLocalStorage<Map<unknown, unknown>>;
}

export class AlsModule {
  public static register(
    options?: AsyncContextModuleConfig,
  ): DynamicModule {
    const isGlobal = options?.isGlobal ?? false;
    const alsInstance =
      options?.alsInstance ?? new AsyncLocalStorage();

    const alsProvider = {
      provide: IAls,
      useValue: new Als(alsInstance),
    };

    return {
      module: AlsModule,
      global: isGlobal,
      providers: [alsProvider],
      exports: [IAls],
    };
  }
}
