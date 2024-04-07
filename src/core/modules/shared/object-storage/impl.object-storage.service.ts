// import fs from "node:fs/promises";
import {
  Folder,
  IObjectStorageService,
  IUploadOptions,
  IUploadResult,
} from "./base.object-storage.service";

export class ObjectStorageService extends IObjectStorageService {
  private static readonly UPLOADS_PATH: string = `./uploads`;

  public override upload(
    _object: Buffer,
    _options: IUploadOptions,
  ): Promise<IUploadResult> {
    throw new Error("Method not implemented.");
  }

  public override delete(_key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private createFolder(_: Folder): void {}
}
