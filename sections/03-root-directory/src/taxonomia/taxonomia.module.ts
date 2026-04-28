import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TaxonomiaService } from './taxonomia.service';
import { TaxonomiaController } from './taxonomia.controller';
import { Taxonomia, TaxonomiaSchema } from './entities/taxonomia.entity';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [TaxonomiaController],
  providers: [TaxonomiaService],
  exports: [MongooseModule],
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([{ name: Taxonomia.name, schema: TaxonomiaSchema }]),
  ]
})
export class TaxonomiaModule {}