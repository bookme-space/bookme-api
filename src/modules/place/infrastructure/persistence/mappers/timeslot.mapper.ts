import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";

import {
  DayOfWeek,
  Timeslot,
  TimeslotRange,
  TimeslotStatus,
  UnmarshalledTimeslot,
} from "src/modules/place/domain/entities";
import { TimeslotFactory } from "src/modules/place/domain/factories/timeslot.factory";

type ITimeslotPersistenceUpsert = {
  [PersistType.Create]: Prisma.SeatTimeslotCreateWithoutSeatInput;
  [PersistType.Update]: Prisma.SeatTimeslotUpdateWithoutSeatInput;
};

@Injectable()
export class TimeslotMapper extends IBaseMapper<
  Timeslot,
  UnmarshalledTimeslot
> {
  constructor(private readonly factory: TimeslotFactory) {
    super();
  }

  public override toInclude(): unknown {
    throw new Error("Method not implemented.");
  }
  public override toWhere(): unknown {
    throw new Error("Method not implemented.");
  }
  public override toOrder(): unknown {
    throw new Error("Method not implemented.");
  }

  public override toDomain(raw: any): Timeslot {
    return this.factory.create({
      id: raw.id,
      status: TimeslotStatus[raw.status] as any,
      timerange: new TimeslotRange(
        raw.startAt,
        raw.endAt,
        DayOfWeek[raw.day] as any,
      ),
    });
  }

  public override toPersistence<T extends PersistType>(
    entity: Timeslot,
    _?: T,
  ): ITimeslotPersistenceUpsert[T] {
    return {
      id: entity.Id,
      status: TimeslotStatus[entity.Status] as any,
      day: DayOfWeek[entity.Timerange.Day] as any,
      startAt: new Date(entity.Timerange.StartAt.timestamp),
      endAt: new Date(entity.Timerange.EndAt.timestamp),
    };
  }

  public override toDto(entity: Timeslot): UnmarshalledTimeslot {
    return {
      id: entity.Id,
      status: entity.Status,
      timerange: entity.Timerange,
    };
  }
}
