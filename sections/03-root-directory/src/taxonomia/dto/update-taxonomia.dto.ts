import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxonomiaDto } from './create-taxonomia.dto';

export class UpdateTaxonomiaDto extends PartialType(CreateTaxonomiaDto) {}
