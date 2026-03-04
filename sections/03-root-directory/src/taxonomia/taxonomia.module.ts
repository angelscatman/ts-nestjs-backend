import { Module } from '@nestjs/common';
import { TaxonomiaService } from './taxonomia.service';
import { TaxonomiaController } from './taxonomia.controller';

@Module({
  controllers: [TaxonomiaController],
  providers: [TaxonomiaService],
})
export class TaxonomiaModule {}
