import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";

import {
  Capacity,
  Seat,
  UnmarshalledSeat,
} from "src/modules/place/domain/entities";
import { SeatFactory } from "src/modules/place/domain/factories/seat.factory";

import { TimeslotMapper } from "./timeslot.mapper";

type ISeatPersistenceUpsert = {
  [PersistType.Create]: Prisma.PlaceSeatCreateWithoutPlaceInput;
  [PersistType.Update]: Prisma.PlaceSeatUpdateWithoutPlaceInput;
};

@Injectable()
export class SeatMapper extends IBaseMapper<
  Seat,
  UnmarshalledSeat
> {
  constructor(
    private readonly factory: SeatFactory,
    private readonly timeslotMapper: TimeslotMapper,
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

  public override toDomain(raw: any): Seat {
    return this.factory.create({
      id: raw.id,
      name: raw.name,
      capacity: new Capacity(raw.capacity),
      timeslots: raw.timeslots?.map((x: any) =>
        this.timeslotMapper.toDomain(x),
      ),
    });
  }

  public override toPersistence<T extends PersistType>(
    entity: Seat,
    type?: T,
  ): ISeatPersistenceUpsert[T] {
    return {
      id: entity.Id,
      name: entity.Name,
      capaciry: entity.Capacity.valueOf(),
      ...(entity.IsTimeslotsDefined && {
        timeslots: {
          ...(type == PersistType.Create && {
            create: entity.Timeslots.map((timeslot) =>
              this.timeslotMapper.toPersistence(
                timeslot,
                PersistType.Create,
              ),
            ),
          }),
          ...(type == PersistType.Update && {
            deleteMany: {
              seatId: entity.Id,
              id: { notIn: entity.Timeslots.map((x) => x.Id) },
            },
            upsert: entity.Timeslots.map((timeslot) => ({
              where: { id: timeslot.Id },
              update: this.timeslotMapper.toPersistence(
                timeslot,
                PersistType.Update,
              ),
              create: this.timeslotMapper.toPersistence(
                timeslot,
                PersistType.Create,
              ),
            })),
          }),
        },
      }),
    };
  }

  public override toDto(entity: Seat): UnmarshalledSeat {
    return {
      id: entity.Id,
      name: entity.Name,
      capacity: entity.Capacity.valueOf(),
      timeslots: entity.IsTimeslotsDefined
        ? entity.Timeslots.map((x) =>
            this.timeslotMapper.toDto(x),
          )
        : undefined,
    };
  }
}
