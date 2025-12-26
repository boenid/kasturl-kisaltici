// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { kisalticiController } from './kisaltici.controller';
import { kisalticiService } from './kisaltici.service';

describe('KisalticiController', () => {
	let kontrolcu = KisalticiController;
	let servis: KisalticiService;

	const mockService = {
		kisalt: jest.fn().mockResolvedValue('G8'),
		retrieve: jest.fn().mockResolvedValue('https://kastamonu.edu.tr/'),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [KisalticiController],
			provide: mockService,
		})
	})
})
