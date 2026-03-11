import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ErrorContext } from '../interfaces/exception-mapper.interface';
import type { ExceptionMappingStrategy } from '../interfaces/exception-mapping-strategy.interface';

/**
 * Maps MongoDB and Mongoose exceptions to appropriate HTTP exceptions. Handles common error codes and types from both libraries.
 * @params error - The original error thrown by MongoDB or Mongoose.
 * @params context - Optional context about the error, such as the operation being performed or the entity involved.
 * @throws HttpException - Throws an appropriate HttpException based on the error type and context.
 */
@Injectable()
export class DatabaseExceptionMapperService implements ExceptionMappingStrategy {
  private readonly mongoCodeHandlers: Record<number, (error: any) => HttpException> = {
    2: (error) =>
      new BadRequestException(
        error?.errmsg ?? 'Invalid MongoDB operation parameters.',
      ),
    50: () =>
      new RequestTimeoutException('Database operation timeout, try again.'),
    66: () =>
      new BadRequestException('Attempt to modify an immutable field.'),
    11000: (error) =>
      new ConflictException(
        `Resource with ${JSON.stringify(error?.keyValue)} already exists.`,
      ),
    121: () =>
      new BadRequestException('Document validation failed at database level.'),
  };

  private readonly mongooseErrorHandlers: Record<string, (error: any) => HttpException> = {
    CastError: (error) =>
      new BadRequestException(
        `Invalid value for '${error?.path}': '${error?.value}'.`,
      ),
    ValidationError: (error) =>
      new BadRequestException(this.getValidationMessage(error)),
    DocumentNotFoundError: () => new NotFoundException('Resource not found.'),
    BSONTypeError: () => new BadRequestException('Invalid ObjectId format.'),
  };

  canHandle(error: unknown, context?: ErrorContext): boolean {
    if (context?.type === 'database') {
      return true;
    }

    if (error instanceof HttpException) {
      return true;
    }

    const code = (error as any)?.code as number | undefined;
    const name = (error as any)?.name as string | undefined;

    return !!this.mongoCodeHandlers[code ?? -1] || !!this.mongooseErrorHandlers[name ?? ''];
  }

  mapAndThrow(error: unknown, _context?: ErrorContext): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const mongoCodeHandler = this.mongoCodeHandlers[(error as any)?.code as number];
    if (mongoCodeHandler) {
      throw mongoCodeHandler(error);
    }

    const mongooseErrorHandler = this.mongooseErrorHandlers[(error as any)?.name as string];
    if (mongooseErrorHandler) {
      throw mongooseErrorHandler(error);
    }

    throw new InternalServerErrorException('Unexpected database error.');
  }

  /**
   * Extracts and formats validation error messages from a Mongoose ValidationError object.
   * @param error - The Mongoose ValidationError object containing details.
   */
  private getValidationMessage(error: any): string {
    const messages = Object.values(error?.errors ?? {})
      .map((validationError: any) => validationError?.message)
      .filter(Boolean);

    return messages.length
      ? messages.join(', ')
      : 'Validation error in request data.';
  }
}
