import { Module } from '@nestjs/common';
import { TaxonomiaService } from './taxonomia.service';
import { TaxonomiaController } from './taxonomia.controller';
import { Taxonomia, TaxonomiaSchema } from './entities/taxonomia.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [TaxonomiaController],
  providers: [TaxonomiaService],
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Taxonomia.name, schema: TaxonomiaSchema }]),
  ]
})
export class TaxonomiaModule {}