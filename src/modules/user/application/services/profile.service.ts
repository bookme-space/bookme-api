import { Injectable } from "@nestjs/common";

import { IAls } from "@core/modules/als";

import { Place } from "src/modules/place/domain/entities";
import { IPlaceRepository } from "src/modules/place/domain/place.repository";

import { ITokenPayload } from "../../domain/adapters";
import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/user.repository";

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

  public async getReservations(): Promise<Place[]> {
    const { id } = this.als.get("user") as ITokenPayload;

    const reservations = await this.placeRepo.find({
      where: { tenant: id },
      include: { seats: { timeslots: { tenant: id } } },
    });

    return reservations;
  }
}
