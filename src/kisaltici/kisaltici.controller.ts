import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { KisalticiService } from './kisaltici.service';
import { KisaUrlOlusturDto } from './kisa-url-olustur.dto';

@Controller()
export class KisalticiController {
  constructor(private readonly service: KisalticiService) {}

  // Kısaltma isteği (POST /shorten)
  @Post('shorten')
  async shorten(@Body() kisaUrlOlusturDto: KisaUrlOlusturDto) {
    const code = await this.service.shorten(kisaUrlOlusturDto.url);
    return { shortCode: code };
  }

  // Yönlendirme isteği (GET /:code)
  @Get(':code')
  @Redirect()
  async redirect(@Param('code') code: string) {
    const url = await this.service.retrieve(code);
    return { url }; // NestJS bunu otomatik 302 Yönlendirmesine çevirir
  }
}
