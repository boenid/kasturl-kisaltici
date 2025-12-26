import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KisalticiService } from './kisaltici.service';
import { Url } from './url.entity';

describe('KisalticiService', () => {
  let service: KisalticiService;

  const mockUrlRepository = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      create: jest.fn().mockImplementation((dto) => dto),
  
      save: jest.fn().mockImplementation((dto) => {
        return Promise.resolve({ id: 1000, ...dto });
      }),
  
      findOneBy: jest.fn().mockImplementation((kriter) => {
        // BURAYI DİKKATLİCE KOPYALA
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const arananKod = kriter.shortCode || kriter.kisaKod || kriter.code;
  
        // Hem 'g8' (beklenen) hem de testten gelebilecek diğer ihtimalleri kapsayalım
        if (arananKod === 'g8') {
          return Promise.resolve({
            id: 1000,
            shortCode: 'g8',
            kisaKod: 'g8', // Garanti olsun
            originalUrl: 'https://google.com',
            asilUrl: 'https://google.com' // Garanti olsun
          });
        }
        return Promise.resolve(null);
      }),
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KisalticiService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockUrlRepository,
        },
      ],
    }).compile();

    service = module.get<KisalticiService>(KisalticiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('kodla', () => {
  	it('kodlamaya göre 0 -> "0" olmalı', () => {
  		expect(service.kodla(0)).toEqual('0');
  	});

  	it('kodlamaya göre 61 -> "Z" olmalı', () => {
  		expect(service.kodla(61)).toEqual('z');
  	});

  	it('kodlamaya göre 62 -> "0" olmalı', () => {
  		expect(service.kodla(62)).toEqual('10');
  	});
  });

  describe('kisalt', () => {
  	it('URLnin kısa kodu dönmeli', async () => {
  		const asilUrl = 'https://kastamonu.edu.tr/';

  		const kisaKod = await service.kisalt(asilUrl);

  		expect(kisaKod).toEqual('G8');
  	});
  });

  describe('retrieve', () => {
  	it('kisaltilmis kodun orijinali gorunmeli', async () => {
  		const url = await service.retrieve('G8');
  		expect(url).toEqual('https://kastamonu.edu.tr/');
  	});

  	it('kod yoksa da exception fırlatılmalı', async () => {
  		await expect(service.retrieve('x99')).rejects.toThrow();
  	});
  });
});
