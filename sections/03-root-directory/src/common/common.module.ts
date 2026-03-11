import { Module } from '@nestjs/common';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { AxiosAdapter } from './adapters/axios.adapter';
import { DatabaseExceptionMapperService } from './services/database-exception-mapper.service';
import { ExternalExceptionMapperService } from './services/external-exception-mapper.service';
import {
  EXCEPTION_MAPPER,
  HTTP_ADAPTER,
} from './constants/injection-tokens';

@Module({
  providers: [
    AxiosAdapter,
    DatabaseExceptionMapperService,
    ExternalExceptionMapperService,
    {
      provide: ExceptionHandlerService,
      useFactory: (
        databaseMapper: DatabaseExceptionMapperService,
        externalMapper: ExternalExceptionMapperService,
      ) => new ExceptionHandlerService([externalMapper, databaseMapper]),
      inject: [DatabaseExceptionMapperService, ExternalExceptionMapperService],
    },
    {
      provide: HTTP_ADAPTER,
      useExisting: AxiosAdapter,
    },
    {
      provide: EXCEPTION_MAPPER,
      useExisting: ExceptionHandlerService,
    },
  ],
  exports: [HTTP_ADAPTER, EXCEPTION_MAPPER],
})
export class CommonModule {}
