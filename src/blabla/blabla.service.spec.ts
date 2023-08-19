import { Test, TestingModule } from '@nestjs/testing';
import { BlablaService } from './blabla.service';

describe('BlablaService', () => {
  let service: BlablaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlablaService],
    }).compile();

    service = module.get<BlablaService>(BlablaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
