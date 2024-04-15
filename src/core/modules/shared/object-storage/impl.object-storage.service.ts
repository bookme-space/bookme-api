import fsSync from "node:fs";
import fs, { constants } from "node:fs/promises";
import path from "node:path";

import {
  Folder,
  IObjectStorageService,
  IUploadOptions,
  IUploadResult,
} from "./base.object-storage.service";

function getAppRootDir() {
  let dir = __dirname;
  while (!fsSync.existsSync(path.join(dir, "package.json")))
    dir = path.join(dir, "..");
  return dir;
}

const UPLOADS_FOLDER = "uploads";
const ROOT_PATH = path.join(getAppRootDir(), UPLOADS_FOLDER);

export class ObjectStorageService extends IObjectStorageService {
  public override async upload(
    object: Buffer,
    { name, folder }: IUploadOptions,
  ): Promise<IUploadResult> {
    const folderName = !Object.is(folder, undefined)
      ? Folder[folder!].toLowerCase()
      : null;

    const target = path.join(ROOT_PATH, folderName ?? "");

    const isExists = await fs
      .access(target, constants.W_OK)
      .then(() => true)
      .catch(() => false);

    if (!isExists) await fs.mkdir(target, { recursive: true });

    const filePath = path.join(target, name);
    await fs.writeFile(filePath, object);

    const uri = `/${path.join(UPLOADS_FOLDER, folderName ?? "", name)}`;
    return { uri };
  }

  public override delete(_key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private createFolder(_: Folder): void {}
}
