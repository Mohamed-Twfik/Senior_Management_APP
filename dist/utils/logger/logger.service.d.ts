import { ConsoleLogger, LoggerService } from '@nestjs/common';
export declare class CustomLoggerService extends ConsoleLogger implements LoggerService {
    log(message: string, context: string): void;
    error(message: string, context: string, trace?: string): void;
}
