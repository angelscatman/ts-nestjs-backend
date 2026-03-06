import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';

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
   * Extracts and formats validation error messages from Mongoose ValidationError objects.
   * @param error 
   * @returns A string containing all validation error messages concatenated, or a default message if no specific messages are found.
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