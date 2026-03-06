import { Module } from '@nestjs/common';
import { TaxonomiaService } from './taxonomia.service';
import { TaxonomiaController } from './taxonomia.controller';
import { Taxonomia, TaxonomiaSchema } from './entities/taxonomia.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ExceptionHandlerService } from '../common/services/exception-handler.service';

@Module({
  controllers: [TaxonomiaController],
  providers: [TaxonomiaService, ExceptionHandlerService],
  imports: [
    MongooseModule.forFeature([{ name: Taxonomia.name, schema: TaxonomiaSchema }])
  ]
})
export class TaxonomiaModule {}