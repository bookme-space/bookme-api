import { DynamicModule } from "@nestjs/common";

import { CryptoService, ICryptoService } from "./crypto";
import { DateService, IDateService } from "./dates";
import { AppLogger, IAppLogger } from "./logger";
import {
  IObjectStorageService,
  ObjectStorageService,
} from "./object-storage";

interface SharedModuleOptions {
  isGlobal?: boolean;
}

export class SharedModule {
  static forRoot(options?: SharedModuleOptions): DynamicModule {
    const isGlobal = options?.isGlobal ?? false;
    const providers = [
      { provide: IAppLogger, useClass: AppLogger },
      { provide: IDateService, useClass: DateService },
      { provide: ICryptoService, useClass: CryptoService },
      {
        provide: IObjectStorageService,
        useClass: ObjectStorageService,
      },
    ];

    return {
      providers,
      global: isGlobal,
      module: SharedModule,
      exports: [
        IAppLogger,
        IDateService,
        ICryptoService,
        IObjectStorageService,
      ],
    };
  }
}
