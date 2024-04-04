export enum Folder {
  Users = "users",
  Places = "places",
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
