import { Module } from '@nestjs/common';
import { DataStructuresController } from './data-structures.controller';

@Module({
  controllers: [DataStructuresController],
  providers: [],
})
export class DataStructuresModule {}
