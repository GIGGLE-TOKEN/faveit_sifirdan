import { format } from 'winston';
import { ApiError } from '../../utils/errors';

export const logConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'gray'
  },
  fileConfig: {
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    tailable: true
  }
};

export const logTemplates = {
  error: (error: Error, context?: any) => ({
    message: error.message,
    error: {
      code: error instanceof ApiError ? error.code : 'INTERNAL_ERROR',
      message: error.message,
      stack: error.stack,
      details: error instanceof ApiError ? error.details : undefined
    },
    context
  }),
  request: (req: any, context?: any) => ({
    message: `${req.method} ${req.url}`,
    metadata: {
      method: req.method,
      path: req.url,
      query: req.query,
      headers: req.headers
    },
    context
  }),
  response: (res: any, duration: number, context?: any) => ({
    message: `Response sent in ${duration}ms`,
    metadata: {
      statusCode: res.statusCode,
      duration
    },
    context
  })
};

