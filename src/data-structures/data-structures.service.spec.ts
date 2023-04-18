import { Test, TestingModule } from '@nestjs/testing';
import { DataStructuresService } from './data-structures.service';

describe('DataStructuresService', () => {
  let service: DataStructuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataStructuresService],
    }).compile();

    service = module.get<DataStructuresService>(DataStructuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
