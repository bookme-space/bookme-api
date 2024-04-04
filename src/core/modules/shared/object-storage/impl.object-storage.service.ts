import {
  IObjectStorageService,
  IUploadOptions,
  IUploadResult,
} from "./base.object-storage.service";

export class ObjectStorageService extends IObjectStorageService {
  public override upload(
    _object: Buffer,
    _options: IUploadOptions,
  ): Promise<IUploadResult> {
    throw new Error("Method not implemented.");
  }

  public override delete(_key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
