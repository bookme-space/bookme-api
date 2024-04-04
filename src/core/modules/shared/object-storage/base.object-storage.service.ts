export enum Folder {
  Users,
  Places,
}

export interface IUploadOptions {
  name: string;
  folder?: Folder;
}

export interface IUploadResult {
  uri: string;
}

export abstract class IObjectStorageService {
  public abstract upload(
    object: Buffer,
    options: IUploadOptions,
  ): Promise<IUploadResult>;

  public abstract delete(key: string): Promise<void>;
}
