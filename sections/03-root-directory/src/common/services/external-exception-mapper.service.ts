import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAxiosError } from 'axios';
import type { ErrorContext } from '../interfaces/exception-mapper.interface';
import type { ExceptionMappingStrategy } from '../interfaces/exception-mapping-strategy.interface';

/**
 * Maps exceptions from external integrations (like HTTP requests) to appropriate HTTP exceptions.
 * @params error - The original error thrown by the external integration.
 * @params context - Optional context about the error, such as the source of the external call or the operation being performed.
 * @throws HttpException - Throws an appropriate HttpException based on the error type and context. 
 * For Axios errors, it maps HTTP status codes to exceptions like UnauthorizedException or BadGatewayException.
 */
@Injectable()
export class ExternalExceptionMapperService implements ExceptionMappingStrategy {
  canHandle(error: unknown, context?: ErrorContext): boolean {
    return context?.type === 'external' || isAxiosError(error);
  }

  mapAndThrow(error: unknown, context?: ErrorContext): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (isAxiosError(error)) {
      const source = context?.source ?? 'External API';
      const status = error.response?.status;
      const data = error.response?.data;
      const message =
        (typeof data === 'object' && data !== null && 'message' in data
          ? (data as { message?: string }).message
          : undefined) ?? error.message;

      if (status === 401 || status === 403) {
        throw new UnauthorizedException(`${source} authentication failed: ${message}`);
      }

      throw new BadGatewayException(
        `${source} responded with status ${status}: ${message}`,
      );
    }

    throw new InternalServerErrorException('Unexpected external integration error.');
  }
}
