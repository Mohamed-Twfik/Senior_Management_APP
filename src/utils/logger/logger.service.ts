import {
  ConsoleLogger,
  Injectable,
  LoggerService
} from '@nestjs/common';

/**
 * - Extends NestJS ConsoleLogger to log messages to the console and a log file.
 * - Ensures a log file exists and writes log messages to it with a timestamp.
 * 
 * Methods:
 * - log: Logs a message to the console and writes it to the log file.
 * - error: Logs an error message to the console and writes it to the log file.
 * - clearLogFile: Clears the log file.
 * - writeToFile: Writes a log message to the log file with a timestamp.
 */
@Injectable()
export class CustomLoggerService extends ConsoleLogger implements LoggerService {
  /**
   * log - Logs a message to the console and writes it to the log file.
   * @param message - The message to log.
   * @param context - The context or origin of the log (optional).
   */
  log(message: string, context: string) {
    const formattedMessage = context
    ? `[${context}] ${message}`
    : `${message}`;
    super.log(message, context);
  }

  /**
   * error - Logs an error message to the console and writes it to the log file.
   * @param message - The error message to log.
   * @param context - The context or origin of the error (optional).
   * @param trace - The error stack trace (optional).
   */
  error(message: string, context: string, trace?: string) {
    const formattedMessage = context
      ? `[${context}] ${message} ${trace || ''}`
      : `${message} ${trace || ''}`;
    super.error(message, trace, context);
  }
}
