import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { HttpClientService } from 'src/common/services/http-client.service';

@Module({
  imports: [HttpModule],
  providers: [ExceptionHandlerService, HttpClientService],
  exports: [ExceptionHandlerService, HttpClientService],
})
export class CommonModule {}
