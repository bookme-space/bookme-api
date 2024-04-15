import { AsyncLocalStorage } from "node:async_hooks";

import { Optional } from "@app.types/common";

import { PrismaPureClient } from "../../repository/interfaces";
import { Context } from "./interfaces";

export class TransactionalContext {
  private static readonly als = new AsyncLocalStorage<Context>();

  static getTransaction(): Optional<PrismaPureClient> {
    const context = this.getContext();
    return context?.transaction;
  }

  private static getContext(): Optional<Context> {
    return this.als.getStore();
  }

  static async run<T>(
    tx: PrismaPureClient,
    handler: () => Promise<T>,
  ): Promise<T> {
    return this.als.run({ transaction: tx }, handler);
  }
}
