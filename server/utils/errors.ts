export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown,
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const ErrorCodes = {
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FORBIDDEN: 'FORBIDDEN'
} as const;
