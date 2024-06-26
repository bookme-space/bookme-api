import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import {
  IBaseMapper,
  PersistType,
} from "@core/domain/abstract/base.mapper";

import { SourceType } from "src/modules/abstract/values";
import {
  Place,
  PlaceInclude,
  PlaceOrder,
  PlacePreview,
  PlaceTimerange,
  PlaceWhere,
  UnmarshalledPlace,
} from "src/modules/place/domain/entities";
import { PlaceFactory } from "src/modules/place/domain/factories/place.factory";

import { SeatMapper } from "./seat.mapper";

type IPlacePersistenceUpsert = {
  [PersistType.Create]: Prisma.PlaceCreateInput;
  [PersistType.Update]: Prisma.PlaceUpdateInput;
};

type IPlacePersistenceInclude = Prisma.PlaceInclude;

type IPlacePersistenceWhere = Prisma.PlaceWhereInput;

@Injectable()
export class PlaceMapper extends IBaseMapper<
  Place,
  UnmarshalledPlace,
  PlaceInclude,
  PlaceWhere,
  PlaceOrder
> {
  constructor(
    private readonly factory: PlaceFactory,
    private readonly seatMapper: SeatMapper,
  ) {
    super();
  }

  public override toInclude(
    include: PlaceInclude,
  ): IPlacePersistenceInclude {
    const { seats } = include;

    return {
      seats:
        typeof seats == "boolean"
          ? seats
          : {
              ...(typeof seats.timeslots != "boolean" &&
                typeof seats.timeslots.tenant == "string" && {
                  where: {
                    timeslots: {
                      some: { tenantId: seats.timeslots.tenant },
                    },
                  },
                }),
              include: {
                timeslots:
                  typeof seats.timeslots == "boolean"
                    ? seats.timeslots
                    : {
                        include: {
                          tenant: Boolean(
                            seats.timeslots.tenant,
                          ),
                        },
                      },
              },
            },
    };
  }
  public override toWhere(
    where: PlaceWhere,
  ): IPlacePersistenceWhere {
    return {
      seats: {
        some: {
          timeslots: { some: { tenantId: where.tenant } },
        },
      },
    };
  }
  public override toOrder(order: PlaceOrder): unknown {
    return order;
  }

  public override toDomain(raw: any): Place {
    return this.factory.create({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      address: raw.address,
      owner: raw.ownerId,
      timerange: new PlaceTimerange(raw.startAt, raw.endAt),
      preview: new PlacePreview(
        SourceType[raw.pvSrcType] as any,
        raw.pvOriginal,
        raw.pvThumbnail,
      ),
      seats: raw.seats?.map((x: any) =>
        this.seatMapper.toDomain(x),
      ),
    });
  }

  public override toPersistence<T extends PersistType>(
    entity: Place,
    type?: T,
  ): IPlacePersistenceUpsert[T] {
    return {
      id: entity.Id,
      name: entity.Name,
      description: entity.Description,
      address: entity.Address,
      ...(entity.Preview && {
        pvSrcType: SourceType[entity.Preview.Type] as any,
        pvOriginal: entity.Preview.Original,
        pvThumbnail: entity.Preview.Thumbnail,
      }),
      startAt: new Date(entity.Timerange.StartAt.timestamp),
      endAt: new Date(entity.Timerange.EndAt.timestamp),
      owner: { connect: { id: entity.Owner } },
      ...(entity.IsSeatsDefined && {
        seats: {
          ...(type == PersistType.Create && {
            create: entity.Seats.map((seat) =>
              this.seatMapper.toPersistence(
                seat,
                PersistType.Create,
              ),
            ),
          }),
          ...(type == PersistType.Update && {
            deleteMany: {
              placeId: entity.Id,
              id: { notIn: entity.Seats.map((x) => x.Id) },
            },
            upsert: entity.Seats.map((seat) => ({
              where: { id: seat.Id },
              update: this.seatMapper.toPersistence(
                seat,
                PersistType.Update,
              ),
              create: this.seatMapper.toPersistence(
                seat,
                PersistType.Create,
              ),
            })),
          }),
        },
      }),
    };
  }

  public override toDto(entity: Place): UnmarshalledPlace {
    return {
      id: entity.Id,
      name: entity.Name,
      description: entity.Description,
      address: entity.Address,
      timerange: {
        start: entity.Timerange.StartAt,
        end: entity.Timerange.EndAt,
      },
      preview: entity.Preview,
      seats: entity.IsSeatsDefined
        ? entity.Seats.map((x) => this.seatMapper.toDto(x))
        : undefined,
    };
  }
}
