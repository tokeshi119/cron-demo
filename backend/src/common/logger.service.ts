import { LoggerService, LogLevel } from '@nestjs/common';

export class JsonLogger implements LoggerService {
  private logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

  log(message: any, context?: string) {
    this.writeLog('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    // エラーメッセージを適切に抽出
    let errorMessage: string;
    let errorDetails: Record<string, any> = {};

    if (typeof message === 'string') {
      errorMessage = message;
    } else if (message instanceof Error) {
      errorMessage = message.message || 'Unknown error';
      errorDetails = {
        name: message.name,
        stack: message.stack,
        ...(trace && { trace }),
      };
    } else if (message && typeof message === 'object') {
      // オブジェクトから有用な情報を抽出
      errorMessage = message.message || message.error || JSON.stringify(message);
      if (message.stack) errorDetails.stack = message.stack;
      if (message.name) errorDetails.name = message.name;
      if (trace) errorDetails.trace = trace;
      // その他のプロパティも含める（空でない場合）
      const otherProps = Object.keys(message).filter(
        (key) => !['message', 'error', 'stack', 'name'].includes(key),
      );
      if (otherProps.length > 0) {
        errorDetails.details = Object.fromEntries(
          otherProps.map((key) => [key, message[key]]),
        );
      }
    } else {
      errorMessage = String(message || 'Unknown error');
      if (trace) errorDetails.trace = trace;
    }

    this.writeLog('error', errorMessage, context, errorDetails);
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
      ...(extra && Object.keys(extra).length > 0 ? extra : {}),
    };

    console.log(JSON.stringify(logEntry));
  }

  setLogLevels?(levels: LogLevel[]) {
    this.logLevels = levels;
  }
}
