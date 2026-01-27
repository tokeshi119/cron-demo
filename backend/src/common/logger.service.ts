import { LoggerService, LogLevel } from '@nestjs/common';

export class JsonLogger implements LoggerService {
  private logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

  log(message: any, context?: string) {
    this.writeLog('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.writeLog('error', message, context, { trace });
  }

  warn(message: any, context?: string) {
    this.writeLog('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.writeLog('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.writeLog('verbose', message, context);
  }

  private writeLog(level: LogLevel, message: any, context?: string, extra?: Record<string, any>) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context: context || 'Application',
      message: typeof message === 'string' ? message : JSON.stringify(message),
      ...extra,
    };

    console.log(JSON.stringify(logEntry));
  }

  setLogLevels?(levels: LogLevel[]) {
    this.logLevels = levels;
  }
}
