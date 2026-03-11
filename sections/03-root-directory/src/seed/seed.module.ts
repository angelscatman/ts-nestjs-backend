import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from '../common/common.module';
import { TaxonomiaModule } from '../taxonomia/taxonomia.module';

@Module({
  imports: [CommonModule, TaxonomiaModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
