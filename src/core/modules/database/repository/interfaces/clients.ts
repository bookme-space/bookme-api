import { Prisma, PrismaClient } from "@prisma/client";
import { Operation } from "@prisma/client/runtime/library";

import { ModelArgs, ModelName } from "./models";
import { GetResult } from "./prisma";

export interface Clients<
  T extends ModelName,
  A extends ModelArgs<T, O>,
  O extends Operation,
> {
  User: Prisma.Prisma__UserClient<GetResult<T, A, O>, never>;
  Place: Prisma.Prisma__PlaceClient<GetResult<T, A, O>, never>;
}

new PrismaClient().user.findMany({ include: {} });
