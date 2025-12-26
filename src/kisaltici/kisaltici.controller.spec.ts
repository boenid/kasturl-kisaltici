import { Test, TestingModule } from '@nestjs/testing';
import { KisalticiController } from './kisaltici.controller';
import { KisalticiService } from './kisaltici.service';

describe('KisalticiController', () => {
  let controller: KisalticiController;
  let service: KisalticiService;

  const mockService = {
    shorten: jest.fn().mockResolvedValue('G8'),
    retrieve: jest.fn().mockResolvedValue('https://kastamonu.edu.tr'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KisalticiController],
      providers: [
        {
          provide: KisalticiService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<KisalticiController>(KisalticiController);
    service = module.get<KisalticiService>(KisalticiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('shorten', () => {
    it('servisi çağırıp kısa kod döndürmeli', async () => {
      const dto = { url: 'https://kastamonu.edu.tr' };
      const result = await controller.shorten(dto);

     // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.shorten).toHaveBeenCalledWith(dto.url);
      expect(result).toEqual({ shortCode: 'G8' });
    });
  });

  describe('redirect', () => {
    it('servisten gelen URL e yönlendirme yapmalı', async () => {
      const result = await controller.redirect('G8');
      
   // eslint-disable-next-line @typescript-eslint/unbound-method   
      expect(service.retrieve).toHaveBeenCalledWith('G8');
      expect(result).toEqual({ url: 'https://kastamonu.edu.tr' });
    });
  });
});
