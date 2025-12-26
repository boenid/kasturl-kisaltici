/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KisalticiService } from './kisaltici.service';
import { Url } from './url.entity';
import { NotFoundException } from '@nestjs/common';

describe('KisalticiService', () => {
  let service: KisalticiService;

  // Dublör Depo (Mock Repository)
  const mockUrlRepository = {
    create: jest.fn().mockImplementation((dto) => dto),

    save: jest.fn().mockImplementation((dto) => {
      // Veritabanı simülasyonu: Kayıt başarılıysa ID dönüyoruz
      return Promise.resolve({ id: 1000, ...dto });
    }),

    findOneBy: jest.fn().mockImplementation((kriter) => {
      // Testten 'g8' aranırsa bul, yoksa null dön.
      // Kriterin hangi isimle geldiğine takılma (shortCode, kisaKod vs.)
      const arananKod = kriter.shortCode || kriter.kisaKod || kriter.code;

      if (arananKod === 'g8') {
        return Promise.resolve({
          id: 1000,
          shortCode: 'g8',
          originalUrl: 'https://google.com',
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

  // --- ENCODE (Eski adı: kodla) TESTLERİ ---
  describe('encode', () => {
    it('0 sayısını "0" olarak kodlamalı', () => {
      // DİKKAT: Metot adı encode
      expect(service.encode(0)).toEqual('0');
    });

    it('61 sayısını "Z" olarak kodlamalı', () => {
      // Alfabe sırasına göre 61. indeks "Z" (Büyük harf) denk gelir
      expect(service.encode(61)).toEqual('Z');
    });
    
    // Test amaçlı başka bir örnek
    it('62 sayısını "10" olarak kodlamalı', () => {
      expect(service.encode(62)).toEqual('10');
    });
  });

  // --- SHORTEN (Eski adı: kisalt) TESTLERİ ---
  describe('shorten', () => {
    it('URL yi veritabanına kaydedip kısa kod döndürmeli', async () => {
      const longUrl = 'https://google.com';
      
      // DİKKAT: Metot adı shorten
      const result = await service.shorten(longUrl);

      // (16 * 62) + 8 = 1000 -> g8
      expect(result).toEqual('g8');
    });
  });

  // --- RETRIEVE (Geri getirme) TESTLERİ ---
  describe('retrieve', () => {
    it('var olan bir kısa kodun orijinal adresini döndürmeli', async () => {
      const url = await service.retrieve('g8');
      expect(url).toEqual('https://google.com');
    });

    it('kod bulunamazsa hata fırlatmalı', async () => {
      // 'x99' diye bir kod Mock'ta yok, hata fırlatmalı
      await expect(service.retrieve('x99')).rejects.toThrow(NotFoundException);
    });
  });
});
