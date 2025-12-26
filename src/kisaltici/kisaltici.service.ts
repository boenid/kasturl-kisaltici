import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class KisalticiService {
	private readonly karakter_kumesi = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	constructor(
		@InjectRepository(Url)
		private urlRepo: Repository<Url>,
	) {}

	kodla(sayi: number): string {
		if (sayi === 0) return this.karakter_kumesi[0];

		let kodlanmis = '';

		while (sayi > 0) {
			const kalan = sayi % 62;

			kodlanmis = this.karakter_kumesi[kalan] + kodlanmis;

			sayi = Math.floor(sayi / 62);
		}

		return kodlanmis;
	}

	async kisalt(asilUrl: string): Promise<string> {
		const yeniUrl = this.urlRepo.create({ asilUrl });
		const kayitliUrl = await this.urlRepo.save(yeniUrl);

		const kod = this.kodla(kayitliUrl.id);

		kayitliUrl.kisaKod = kod;
		await this.urlRepo.save(kayitliUrl);

		return kod;
	}

	async retrieve(kod: string): Promise<string> {
		const url = await this.urlRepo.findOneBy({ kisaKod: kod });

		if (!url) {
			throw new NotFoundException('böyle bir kısa kod yok');
		}

		return url.asilUrl;
	}
}
