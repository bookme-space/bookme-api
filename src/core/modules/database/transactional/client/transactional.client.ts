/* eslint @typescript-eslint/ban-types: 0 */
import { Prisma, PrismaClient } from "@prisma/client";

import { TransactionalContext } from "../context";

const ExtendClient = (client: PrismaClient) =>
  client.$extends({
    client: {
      async $transaction<T>(
        handler: () => Promise<T>,
      ): Promise<T> {
        if (TransactionalContext.getTransaction())
          return handler();

        return client.$transaction(async (tx) =>
          TransactionalContext.run(tx, handler),
        );
      },
    },
    query: {
      $allModels: {
        $allOperations({ model, operation, args, query }) {
          const tx = TransactionalContext.getTransaction();

          if (tx) {
            const _model = (model.at(0)?.toLowerCase() +
              model.slice(1)) as Uncapitalize<typeof model>;

            return (tx[_model][operation] as Function)(args);
          }

          return query(args);
        },
      },
    },
  });

export type IExtendedClient = new (
  options?: Prisma.PrismaClientOptions,
) => PrismaClient & {
  $transaction: <T>(handler: () => Promise<T>) => Promise<T>;
};

export const ExtendedClient = <IExtendedClient>(
  class extends PrismaClient {
    constructor(options?: Prisma.PrismaClientOptions) {
      super(options);
      ExtendClient(this);
    }
  }
);
