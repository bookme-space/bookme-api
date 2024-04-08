import { MultipartFile } from "@fastify/multipart";
import { randomUUID } from "node:crypto";
import path from "node:path";
import sharp from "sharp";

import { Injectable, PipeTransform } from "@nestjs/common";

import { SourceType } from "src/modules/abstract/values";

export interface FileMetadata {
  names: { original: string; thumbnail: string };
  originalname: string;
  type: SourceType;
}

export interface FileShapes {
  metadata: FileMetadata;
  original: Buffer;
  thumbnail: Buffer;
}

@Injectable()
export class ImageSharpPipe
  implements PipeTransform<MultipartFile, Promise<FileShapes>>
{
  public async transform(
    file: MultipartFile,
  ): Promise<FileShapes> {
    const { filename: rawname } = file;

    const uuid = randomUUID();
    const filename = path.parse(rawname).name;

    const name = `${filename}_${uuid}.webp`;
    const thumbnailName = `${filename}_${uuid}_thumbnail.webp`;

    const buffer = await file.toBuffer();

    const original = await sharp(buffer)
      .webp({ effort: 3, quality: 90 })
      .toBuffer();

    const thumbnail = await sharp(original)
      .resize(256, null)
      .toBuffer();

    return {
      metadata: {
        names: { original: name, thumbnail: thumbnailName },
        originalname: rawname,
        type: SourceType.Image,
      },
      original,
      thumbnail,
    };
  }
}
