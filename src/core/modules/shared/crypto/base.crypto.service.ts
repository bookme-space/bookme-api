export abstract class ICryptoService {
  public abstract hash(data: string): Promise<string>;

  public abstract compare(
    stored: string,
    supplied: string,
  ): Promise<boolean>;
}
