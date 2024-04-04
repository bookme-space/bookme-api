/* eslint @typescript-eslint/no-explicit-any: 0 */
import { Prisma } from "@prisma/client";
import { Operation } from "@prisma/client/runtime/library";

import { Clients } from "./clients";
import { PrismaModelMethod } from "./prisma";

/* Prisma models */
export type ModelName = Prisma.ModelName;

/* Prisma model arguments */
export type ModelArgs<
  T extends ModelName,
  O extends Operation,
> = PrismaModelMethod<T>[O extends keyof PrismaModelMethod<T>
  ? O
  : never] extends (args: infer A) => any
  ? NonNullable<A>
  : never;

/* Prisma model return types */
export type ModelResult<
  T extends ModelName,
  A extends ModelArgs<T, O>,
  O extends Operation,
> =
  PrismaModelMethod<T> extends {
    [K in O]: (args: A) => any;
  }
    ? Clients<T, A, O>[T extends keyof Clients<T, A, O>
        ? T
        : never]
    : never;

export type MethodsWithParams<T, M extends ModelName> = {
  [K in keyof T & Operation]: T[K] extends true
    ? <A extends ModelArgs<M, K>>(
        args?: Prisma.SelectSubset<A, ModelArgs<M, K>>,
      ) => ModelResult<M, A, K>
    : <A extends ModelArgs<M, K>>(
        args: Prisma.SelectSubset<A, ModelArgs<M, K>>,
      ) => ModelResult<M, A, K>;
};

export type IBasePrismaService<T extends ModelName> =
  MethodsWithParams<Operation, T>;
