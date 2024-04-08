import { Injectable } from "@nestjs/common";

import { FileShapes } from "@core/infrastructure/pipes/image.sharp.pipe";
import {
  Folder,
  IObjectStorageService,
} from "@core/modules/shared/object-storage";

import {
  SourceType,
  UnmarshalledSource,
} from "src/modules/abstract/values";

@Injectable()
export class UploadService {
  constructor(
    private readonly objectStorage: IObjectStorageService,
  ) {}

  public async upload(
    {
      metadata: { type, names },
      original,
      thumbnail,
    }: FileShapes,
    folder?: Folder,
  ): Promise<UnmarshalledSource> {
    const { uri: originalUri } = await this.objectStorage.upload(
      original,
      { name: names.original, folder },
    );

    const { uri: thumbnailUri } =
      await this.objectStorage.upload(thumbnail, {
        name: names.thumbnail,
        folder,
      });

    return {
      type: SourceType[type] as keyof typeof SourceType,
      original: originalUri,
      thumbnail: thumbnailUri,
    };
  }
}
