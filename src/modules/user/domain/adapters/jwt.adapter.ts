import { EntityId } from "@core/domain";

import { UserRole } from "../entities";

export enum TokenType {
  Access,
  Refresh,
}

export interface ITokenPayload {
  id: EntityId;
  email: string;
  role: UserRole;
}

export abstract class IJwtService {
  public abstract verify(
    token: string,
    type: TokenType,
  ): Promise<ITokenPayload>;

  public abstract sign(
    payload: ITokenPayload,
    type: TokenType,
  ): Promise<string>;
  public abstract sign(
    payload: ITokenPayload,
  ): Promise<[string, string]>;
}
