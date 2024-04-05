import { EntityId, UnmarshalledEntity } from "@core/domain";

import { Nullable } from "@app.types/common";

export type SeatEssentialProps = Readonly<
  Required<{
    capacity: number;
  }>
>;

export type SeatOptionalProps = Readonly<
  Partial<{
    id: EntityId;
    name: string;
  }>
>;

export type SeatProps = SeatEssentialProps & SeatOptionalProps;

export interface UnmarshalledSeat extends UnmarshalledEntity {
  name: Nullable<string>;
  capacity: number;
}
