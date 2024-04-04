/* eslint
    @typescript-eslint/no-explicit-any: 0,
    @typescript-eslint/ban-types: 0 
*/
import { Inject } from "@nestjs/common";

import { DatabaseClient } from "../../database.service";

export function Transactional(
  key?: string | symbol,
): MethodDecorator {
  const injectDb = Inject(DatabaseClient);

  return (
    target: Object,
    _: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value;
    const _key = key ?? "_db";

    if (!key) injectDb(target, _key);

    descriptor.value = async function (...args: unknown[]) {
      if (
        !(_key in this) ||
        !("$transaction" in (this as any)[_key])
      )
        throw new Error(
          `Unknown Inject key '${_key.toString()}'`,
        );

      const db: DatabaseClient = (this as any)[_key];
      return db.$transaction(async () =>
        original.apply(this, args),
      );
    };

    return descriptor;
  };
}
