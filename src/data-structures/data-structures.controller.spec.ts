import { Test, TestingModule } from '@nestjs/testing';
import { DataStructuresController } from './data-structures.controller';
import { DataStructuresService } from './data-structures.service';

describe('DataStructuresController', () => {
  let controller: DataStructuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataStructuresController],
      providers: [DataStructuresService],
    }).compile();

    controller = module.get<DataStructuresController>(DataStructuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
