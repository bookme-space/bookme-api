import { Nullable } from "@app.types/common";

export interface DomainErrorMessage {
  target: Nullable<string>;
  message: string;
}

export interface IDomainErrorOptions extends ErrorOptions {
  messages: DomainErrorMessage[];
}

export class DomainError extends Error {
  private readonly messages: DomainErrorMessage[];

  constructor(message: string, opts?: IDomainErrorOptions) {
    super(message, opts);
    this.messages = opts?.messages ?? [];
  }

  public get Messages(): DomainErrorMessage[] {
    return this.messages;
  }
}
