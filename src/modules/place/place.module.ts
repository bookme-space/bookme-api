import { Module, forwardRef } from "@nestjs/common";

import { DatabaseClient } from "@core/modules/database";

import { UserModule } from "../user/user.module";
import { PlaceService } from "./application/services/place.service";
import { PlaceFactory } from "./domain/factories/place.factory";
import { SeatFactory } from "./domain/factories/seat.factory";
import { TenantFactory } from "./domain/factories/tenant.factory";
import { TimeslotFactory } from "./domain/factories/timeslot.factory";
import { IPlaceRepository } from "./domain/place.repository";
import { PlaceMapper } from "./infrastructure/persistence/mappers/place.mapper";
import { SeatMapper } from "./infrastructure/persistence/mappers/seat.mapper";
import { TenantMapper } from "./infrastructure/persistence/mappers/tenant.mapper";
import { TimeslotMapper } from "./infrastructure/persistence/mappers/timeslot.mapper";
import { PlaceRepositoryImpl } from "./infrastructure/persistence/place.repository.impl";
import { PlaceController } from "./place.controller";

const infrastructure = [
  PlaceMapper,
  SeatMapper,
  TimeslotMapper,
  TenantMapper,
  {
    provide: IPlaceRepository,
    useFactory: (mapper: PlaceMapper, db: DatabaseClient) =>
      new PlaceRepositoryImpl(mapper, db),
    inject: [PlaceMapper, DatabaseClient],
  },
];

const application = [PlaceService];

const domain = [
  PlaceFactory,
  SeatFactory,
  TimeslotFactory,
  TenantFactory,
];

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [...infrastructure, ...application, ...domain],
  controllers: [PlaceController],
  exports: [IPlaceRepository, PlaceMapper],
})
export class PlaceModule {}
