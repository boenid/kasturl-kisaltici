import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { KisalticiService } from './kisaltici.service';
import { KisaUrlOlusturDto } from './kisa-url-olustur.dto';

@Controller()
export class KisalticiController {
  constructor(private readonly service: KisalticiService) {}

  @Post('shorten')
  async shorten(@Body() kisaUrlOlusturDto: KisaUrlOlusturDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const code = await this.service.shorten(kisaUrlOlusturDto.url);
    return { shortCode: code };
  }

  @Get(':code')
  @Redirect()
  async redirect(@Param('code') code: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const url = await this.service.retrieve(code);
    return { url };
  }
}
