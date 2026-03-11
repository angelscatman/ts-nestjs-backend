import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  ErrorContext,
  ExceptionMapper,
} from '../interfaces/exception-mapper.interface';
import type { ExceptionMappingStrategy } from '../interfaces/exception-mapping-strategy.interface';

/**
 * Composite exception mapper. Delegates exception mapping to the first matching strategy.
 */
@Injectable()
export class ExceptionHandlerService implements ExceptionMapper {
  private readonly logger = new Logger(ExceptionHandlerService.name);

  constructor(
    private readonly strategies: ExceptionMappingStrategy[],
  ) {}

  mapAndThrow(error: unknown, context?: ErrorContext): never {
    for (const strategy of this.strategies) {
      if (strategy.canHandle(error, context)) {
        strategy.mapAndThrow(error, context);
      }
    }

    this.logger.error(
      `No exception strategy matched. Context: ${JSON.stringify(context ?? {})}`,
      error as any,
    );
    throw new InternalServerErrorException('Unexpected error, check server logs.');
  }
}