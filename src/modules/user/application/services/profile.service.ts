import { Injectable } from "@nestjs/common";

import { IPaging } from "@core/domain/abstract/interfaces";
import { IAls } from "@core/modules/als";
import { Transactional } from "@core/modules/database";

import { Place } from "src/modules/place/domain/entities";
import { IPlaceRepository } from "src/modules/place/domain/place.repository";

import { ITokenPayload } from "../../domain/adapters";
import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/user.repository";

export interface IGetReservationsParams {
  take: number;
  skip: number;
}

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly placeRepo: IPlaceRepository,
    private readonly als: IAls,
  ) {}

  public async getProfile(): Promise<User> {
    const { id } = this.als.get("user") as ITokenPayload;
    const profile = await this.userRepo.findById({ id });
    return profile;
  }

  @Transactional()
  public async getReservations({
    take,
    skip,
  }: IGetReservationsParams): Promise<IPaging<Place>> {
    const { id } = this.als.get("user") as ITokenPayload;

    const total = await this.placeRepo.count({
      where: { tenant: id },
    });
    const reservations = await this.placeRepo.find({
      take,
      skip,
      where: { tenant: id },
      include: { seats: { timeslots: { tenant: id } } },
    });

    return {
      pagination: { total, take, skip },
      items: reservations,
    };
  }
}
