import {
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

import { Injectable } from "@nestjs/common";

import { ICryptoService } from "./base.crypto.service";

@Injectable()
export class CryptoService extends ICryptoService {
  static HASH_KEYLEN = 64;

  public async hash(data: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await promisify(scrypt)(
      data,
      salt,
      CryptoService.HASH_KEYLEN,
    )) as Buffer;

    return `${buf.toString("hex")}${salt}`;
  }

  public async compare(
    stored: string,
    supplied: string,
  ): Promise<boolean> {
    const hexHashLen = CryptoService.HASH_KEYLEN * 2;

    const [hash, salt] = [
      stored.slice(0, hexHashLen),
      stored.slice(hexHashLen),
    ];

    const hashedBuf = Buffer.from(hash, "hex");
    const suppliedBuf = (await promisify(scrypt)(
      supplied,
      salt,
      CryptoService.HASH_KEYLEN,
    )) as Buffer;

    return timingSafeEqual(hashedBuf, suppliedBuf);
  }
}
