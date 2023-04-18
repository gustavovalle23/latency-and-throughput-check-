import { Controller, Get } from '@nestjs/common';

@Controller('data-structures')
export class DataStructuresController {
  constructor(private readonly dataStructuresService: DataStructuresService) {}

  @Get()
  findAll() {
    return this.dataStructuresService.findAll();
  }
}
