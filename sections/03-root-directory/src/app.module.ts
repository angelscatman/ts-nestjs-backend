import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaxonomiaModule } from './taxonomia/taxonomia.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TaxonomiaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
