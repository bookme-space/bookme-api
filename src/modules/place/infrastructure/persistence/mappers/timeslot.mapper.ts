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

import { TenantMapper } from "./tenant.mapper";

type ITimeslotPersistenceUpsert = {
  [PersistType.Create]: Prisma.SeatTimeslotCreateWithoutSeatInput;
  [PersistType.Update]: Prisma.SeatTimeslotUpdateWithoutSeatInput;
};

@Injectable()
export class TimeslotMapper extends IBaseMapper<
  Timeslot,
  UnmarshalledTimeslot
> {
  constructor(
    private readonly factory: TimeslotFactory,
    private tenantMapper: TenantMapper,
  ) {
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
      tenant: !Object.is(raw.tenant, undefined)
        ? raw.tenant && this.tenantMapper.toDomain(raw.tenant)
        : undefined,
    });
  }

  public override toPersistence<T extends PersistType>(
    entity: Timeslot,
    type?: T,
  ): ITimeslotPersistenceUpsert[T] {
    return {
      id: entity.Id,
      status: TimeslotStatus[entity.Status] as any,
      day: DayOfWeek[entity.Timerange.Day] as any,
      startAt: new Date(entity.Timerange.StartAt.timestamp),
      endAt: new Date(entity.Timerange.EndAt.timestamp),
      ...(entity.IsTenantDefined && {
        tenant: {
          ...(type == PersistType.Create &&
            entity.Tenant && {
              connect: { id: entity.Tenant.Id },
            }),
          ...(type == PersistType.Update && {
            ...(!Object.is(entity.Tenant, null)
              ? { disconnect: true }
              : { connect: { id: entity.Tenant?.Id } }),
          }),
        },
      }),
    };
  }

  public override toDto(entity: Timeslot): UnmarshalledTimeslot {
    return {
      id: entity.Id,
      status: TimeslotStatus[
        entity.Status
      ] as keyof typeof TimeslotStatus,
      timerange: {
        day: DayOfWeek[
          entity.Timerange.Day
        ] as keyof typeof DayOfWeek,
        start: entity.Timerange.StartAt,
        end: entity.Timerange.EndAt,
      },
      tenant: entity.IsTenantDefined
        ? entity.Tenant && this.tenantMapper.toDto(entity.Tenant)
        : undefined,
    };
  }
}
