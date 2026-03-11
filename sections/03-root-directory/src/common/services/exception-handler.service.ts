import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAxiosError } from 'axios';

/**
 * Centralized service for handling exceptions across the application, particularly those related to database operations.
 */
@Injectable()
export class ExceptionHandlerService {
  private readonly logger = new Logger(ExceptionHandlerService.name);

  // Mapping of MongoDB error codes to corresponding HTTP exceptions with custom messages.
  private readonly mongoCodeHandlers: Record<
    number,
    (error: any) => HttpException
  > = {
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

  private readonly mongooseErrorHandlers: Record<
    string,
    (error: any) => HttpException
  > = {
    CastError: (error) =>
      new BadRequestException(
        `Invalid value for '${error?.path}': '${error?.value}'.`,
      ),
    ValidationError: (error) =>
      new BadRequestException(this.getValidationMessage(error)),
    DocumentNotFoundError: () => new NotFoundException('Resource not found.'),
    BSONTypeError: () => new BadRequestException('Invalid ObjectId format.'),
  };

  /**
   * Handles exceptions thrown during database operations by checking against known MongoDB error codes 
   * and Mongoose error names, and throwing appropriate HTTP exceptions. 
   * If the error does not match any known patterns, it logs the error and throws a generic Internal Server Error.
   * @param error 
   */
  handleDBExceptions(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const mongoCodeHandler = this.mongoCodeHandlers[error?.code as number];
    if (mongoCodeHandler) {
      throw mongoCodeHandler(error);
    }

    const mongooseErrorHandler = this.mongooseErrorHandlers[error?.name as string];
    if (mongooseErrorHandler) {
      throw mongooseErrorHandler(error);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }

  /**
   * Handles exceptions that occur during HTTP requests to external APIs, particularly those made using Axios.
   * It checks if the error is an Axios error and maps specific HTTP status codes to corresponding NestJS exceptions.
   * @param error An unknown error object that may be an Axios error or another type of error.
   */
  handleAxiosExceptions(error: unknown): never {
    if (error instanceof HttpException) throw error;

    if (isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message ?? error.message;

      if (status === 401 || status === 403) {
        throw new UnauthorizedException(`External API authentication failed: ${message}`);
      }

      throw new BadGatewayException(
        `External API responded with status ${status}: ${message}`,
      );
    }

    this.logger.error('Unexpected error on external fetch', error);
    throw new InternalServerErrorException('Unexpected error fetching from external API.');
  }

  private getValidationMessage(error: any): string {
    const messages = Object.values(error?.errors ?? {})
      .map((validationError: any) => validationError?.message)
      .filter(Boolean);

    return messages.length
      ? messages.join(', ')
      : 'Validation error in request data.';
  }
}