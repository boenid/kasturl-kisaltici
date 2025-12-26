/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class KisalticiService {
  private readonly alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  private readonly base = this.alphabet.length;

  constructor(
    @InjectRepository(Url)
    private urlRepo: Repository<Url>,
  ) {}

  encode(num: number): string {
    if (num === 0) return this.alphabet[0];
    let encoded = '';
    while (num > 0) {
      const remainder = num % this.base;
      encoded = this.alphabet[remainder] + encoded;
      num = Math.floor(num / this.base);
    }
    return encoded;
  }

  // BURAYA DİKKAT: Adı 'shorten'
  async shorten(originalUrl: string): Promise<string> {
    const newUrl = this.urlRepo.create({ originalUrl });
    const savedUrl = await this.urlRepo.save(newUrl);

    const code = this.encode(savedUrl.id);

    savedUrl.shortCode = code;
    await this.urlRepo.save(savedUrl);

    return code;
  }

  async retrieve(code: string): Promise<string> {
    const url = await this.urlRepo.findOneBy({ shortCode: code });
    if (!url) {
      throw new NotFoundException('Bu kısa kod sistemde bulunamadı!');
    }
    return url.originalUrl;
  }
}
