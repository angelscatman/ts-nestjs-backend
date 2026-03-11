import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TaxonomiaModule } from './taxonomia/taxonomia.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TaxonomiaModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-plants', {}),
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
