import winston from 'winston'
import { format } from 'winston'
import { logConfig, logTemplates } from '@/server/lib/config/logger.config'

// Define log levels
enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace'
}

// Define log entry interface
interface LogContext {
  requestId: string;
  userId?: string;
  action?: string;
  resource?: string;
}

interface LogMetadata {
  duration?: number;
  statusCode?: number;
  path?: string;
  method?: string;
}

interface LogError {
  code: string;
  message: string;
  stack?: string;
  details?: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  metadata?: LogMetadata;
  error?: LogError;
}

// Update LogInfo interface to extend TransformableInfo properly
interface LogInfo extends winston.Logform.TransformableInfo {
  timestamp?: string;
  level: string;
  message: unknown;
  context?: LogContext;
  metadata?: LogMetadata;
  error?: LogError;
}

// Custom format for consistent log structure
const logFormat = format.combine(
  format.timestamp(),
  format.json(),
  format.printf((info: winston.Logform.TransformableInfo) => {
    const log: Partial<LogEntry> = {
      timestamp: info.timestamp as string,
      level: info.level as LogLevel,
      message: String(info.message),
      context: {
        ...(info.context as LogContext || {})
      },
      metadata: info.metadata as LogMetadata,
      error: info.error as LogError
    };
    return JSON.stringify(log);
  })
)

// Create Winston logger instance
export const logger = winston.createLogger({
  levels: logConfig.levels,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      ...logConfig.fileConfig
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      ...logConfig.fileConfig
    })
  ]
})

// Add request context middleware
export const addRequestContext = (requestId: string, userId?: string) => {
  return winston.format((info) => {
    info.context = {
      requestId,
      userId,
      ...(info.context || {})
    }
    return info
  })()
}

// Development logging
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level')
}

// Add error logging helper using templates
export const logError = (error: Error, context?: any) => {
  logger.error(logTemplates.error(error, context))
}

// Add request logging helper
export const logRequest = (req: any, context?: any) => {
  logger.info(logTemplates.request(req, context))
}

// Add response logging helper
export const logResponse = (res: any, duration: number, context?: any) => {
  logger.info(logTemplates.response(res, duration, context))
}

export default logger
