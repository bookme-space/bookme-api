import { Inject } from '@nestjs/common';

export const DATABASE_CONNECTION_KEY = Symbol(
  'DATABASE_CONNECTION',
);

export function InjectDatabase() {
  return Inject(DATABASE_CONNECTION_KEY);
}
