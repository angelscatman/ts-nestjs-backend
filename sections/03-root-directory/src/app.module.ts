import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaxonomiaModule } from './taxonomia/taxonomia.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TaxonomiaModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-plants', {}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
