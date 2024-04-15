import { DomainError } from "src/modules/abstract/throwable";

export class Capacity extends Number {
  constructor(n: number) {
    if (!Number.isInteger(n))
      throw new DomainError("Capacity must be Int");

    super(n);
  }
}
