import { Prisma, PrismaClient } from "@prisma/client";
import {
  ITXClientDenyList,
  Operation,
  GetResult as PrismaGetResult,
} from "@prisma/client/runtime/library";

import { ModelArgs, ModelName } from "./models";

/* Prisma pure client */
export type PrismaPureClient = Omit<
  PrismaClient,
  ITXClientDenyList
>;

/* Prisma model methods */
export type PrismaModelMethods<T extends ModelName> =
  keyof PrismaClient[Uncapitalize<T> extends keyof PrismaClient
    ? Uncapitalize<T>
    : never];

export type PrismaModelMethod<T extends ModelName> = {
  [K in PrismaModelMethods<T>]: PrismaClient[Uncapitalize<T> extends keyof PrismaClient
    ? Uncapitalize<T>
    : never][K];
};

/* Prisma payload */
export type PrismaPayload<T extends ModelName> =
  Prisma.TypeMap["model"][T]["payload"];

/* Prisma includes */
export type PrismaInclude<T extends ModelName> =
  Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"]["include"];

export type PrismaWhere<T extends ModelName> =
  Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"]["where"];

/* Prisma GetResult */
export type GetResult<
  T extends ModelName,
  A extends ModelArgs<T, O>,
  O extends Operation,
> = PrismaGetResult<PrismaPayload<T>, A, O>;

export type Subset<T, U> = Prisma.Subset<T, U>;

export type SelectSubset<T, U> = Prisma.SelectSubset<T, U>;
