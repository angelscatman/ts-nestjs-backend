import { ErrorContext } from './exception-mapper.interface';

/**
 * This file defines the ExceptionMappingStrategy interface for strategies that can map exceptions to HTTP responses based on context.
 */
export interface ExceptionMappingStrategy {
  canHandle(error: unknown, context?: ErrorContext): boolean;
  mapAndThrow(error: unknown, context?: ErrorContext): never;
}
