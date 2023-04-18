import { PartialType } from '@nestjs/mapped-types';
import { CreateDataStructureDto } from './create-data-structure.dto';

export class UpdateDataStructureDto extends PartialType(CreateDataStructureDto) {}
