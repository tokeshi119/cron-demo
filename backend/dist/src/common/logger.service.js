"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLogger = void 0;
class JsonLogger {
    logLevels = ['log', 'error', 'warn', 'debug', 'verbose'];
    log(message, context) {
        this.writeLog('log', message, context);
    }
    error(message, trace, context) {
        this.writeLog('error', message, context, { trace });
    }
    warn(message, context) {
        this.writeLog('warn', message, context);
    }
    debug(message, context) {
        this.writeLog('debug', message, context);
    }
    verbose(message, context) {
        this.writeLog('verbose', message, context);
    }
    writeLog(level, message, context, extra) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            context: context || 'Application',
            message: typeof message === 'string' ? message : JSON.stringify(message),
            ...extra,
        };
        console.log(JSON.stringify(logEntry));
    }
    setLogLevels(levels) {
        this.logLevels = levels;
    }
}
exports.JsonLogger = JsonLogger;
//# sourceMappingURL=logger.service.js.map