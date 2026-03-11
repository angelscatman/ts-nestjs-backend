/**
 * This file defines the ExceptionMapper interface and related types for mapping exceptions to HTTP responses.
 */
export type ErrorType = 'database' | 'external';

export interface ErrorContext {
  type: ErrorType;
  source?: string;
  operation?: string;
  entity?: string;
}

export interface ExceptionMapper {
  mapAndThrow(error: unknown, context?: ErrorContext): never;
}
