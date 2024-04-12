import { Injectable } from "@nestjs/common";

import { EntityId } from "@core/domain";
import { IPaging } from "@core/domain/abstract/interfaces";
import { IAls } from "@core/modules/als";
import { Transactional } from "@core/modules/database";

import { ICreateSourceParms } from "src/modules/abstract/dtos";
import { ICraeteTimerangeParams } from "src/modules/abstract/dtos/timerange.dto";
import { Timerange } from "src/modules/abstract/values";
import { ITokenPayload } from "src/modules/user/domain/adapters";

import {
  DayOfWeek,
  Place,
  PlacePreview,
  PlaceTimerange,
  Timeslot,
  TimeslotRange,
  TimeslotStatus,
} from "../../domain/entities";
import { PlaceFactory } from "../../domain/factories/place.factory";
import { SeatFactory } from "../../domain/factories/seat.factory";
import { TimeslotFactory } from "../../domain/factories/timeslot.factory";
import { IPlaceRepository } from "../../domain/place.repository";

export interface ICreatePlaceParams {
  readonly name: string;
  readonly description: string;
  readonly address: string;
  readonly seatsCount: number;
  readonly timerange: ICraeteTimerangeParams;
  readonly preview?: ICreateSourceParms;
}

export interface IGetAllParams {
  take: number;
  skip: number;
}

export interface IGetByIdParams {
  id: EntityId;
}

@Injectable()
export class PlaceService {
  constructor(
    private readonly repo: IPlaceRepository,
    private readonly factory: PlaceFactory,
    private readonly seatFactory: SeatFactory,
    private readonly timeslotFactory: TimeslotFactory,
    private readonly als: IAls,
  ) {}

  public async create({
    name,
    description,
    address,
    seatsCount,
    timerange: _timerange,
    preview: _preview,
  }: ICreatePlaceParams): Promise<Place> {
    const { id } = this.als.get("user") as ITokenPayload;

    const timerange = new PlaceTimerange(
      _timerange.start,
      _timerange.end,
    );

    const preview =
      _preview &&
      new PlacePreview(
        _preview.type,
        _preview.original,
        _preview.thumbnail,
      );

    const timeslotsCount =
      this.getTimeslotsCountByTimerange(timerange);

    const seats = Array.from(new Array(seatsCount)).map(() =>
      this.seatFactory.create({
        capacity: 4,
        timeslots: Array.from(new Array(7))
          .map((_, day) =>
            this.createTimeslotsForDay(
              timerange,
              day,
              timeslotsCount,
            ),
          )
          .flat(),
      }),
    );

    const place = this.factory.create({
      name,
      description,
      address,
      owner: id,
      timerange,
      preview,
      seats,
    });

    await this.repo.save(place);

    return place;
  }

  @Transactional()
  public async getAll({
    take,
    skip,
  }: IGetAllParams): Promise<IPaging<Place>> {
    const total = await this.repo.count();
    const items = await this.repo.find({
      take,
      skip,
      include: { seats: true },
    });
    return { pagination: { total, take, skip }, items };
  }

  public async getById({ id }: IGetByIdParams): Promise<Place> {
    return this.repo.findById({
      id,
      include: { seats: { timeslots: { tenant: true } } },
    });
  }

  private getTimeslotsCountByTimerange({
    StartAt,
    EndAt,
  }: Timerange): number {
    const hDelta = Math.abs(StartAt.hours - EndAt.hours);
    const minsGap = 60 - StartAt.minutes + EndAt.minutes;
    return hDelta - (minsGap >= 60 ? 0 : 1);
  }

  private createTimeslotsForDay(
    { StartAt }: Timerange,
    day: DayOfWeek,
    count: number,
  ): Timeslot[] {
    return Array.from(new Array(count)).map((_, j) =>
      this.timeslotFactory.create({
        status: TimeslotStatus.Available,
        timerange: new TimeslotRange(
          new Date(
            new Date(0).setUTCHours(
              StartAt.hours + j,
              StartAt.minutes,
            ),
          ),
          new Date(
            new Date(0).setUTCHours(
              StartAt.hours + j + 1,
              StartAt.minutes,
            ),
          ),
          day,
        ),
      }),
    );
  }
}
