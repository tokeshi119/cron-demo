import { LoggerService, LogLevel } from '@nestjs/common';
export declare class JsonLogger implements LoggerService {
    private logLevels;
    log(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    verbose(message: any, context?: string): void;
    private writeLog;
    setLogLevels?(levels: LogLevel[]): void;
}
