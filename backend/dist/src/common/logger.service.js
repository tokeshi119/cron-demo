"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLogger = void 0;
class JsonLogger {
    logLevels = ['log', 'error', 'warn', 'debug', 'verbose'];
    log(message, context) {
        this.writeLog('log', message, context);
    }
    error(message, trace, context) {
        let errorMessage;
        let errorDetails = {};
        if (typeof message === 'string') {
            errorMessage = message;
        }
        else if (message instanceof Error) {
            errorMessage = message.message || 'Unknown error';
            errorDetails = {
                name: message.name,
                stack: message.stack,
                ...(trace && { trace }),
            };
        }
        else if (message && typeof message === 'object') {
            errorMessage = message.message || message.error || JSON.stringify(message);
            if (message.stack)
                errorDetails.stack = message.stack;
            if (message.name)
                errorDetails.name = message.name;
            if (trace)
                errorDetails.trace = trace;
            const otherProps = Object.keys(message).filter((key) => !['message', 'error', 'stack', 'name'].includes(key));
            if (otherProps.length > 0) {
                errorDetails.details = Object.fromEntries(otherProps.map((key) => [key, message[key]]));
            }
        }
        else {
            errorMessage = String(message || 'Unknown error');
            if (trace)
                errorDetails.trace = trace;
        }
        this.writeLog('error', errorMessage, context, errorDetails);
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
        const requestId = global.requestId || undefined;
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            context: context || 'Application',
            message: typeof message === 'string' ? message : JSON.stringify(message),
            ...(requestId && { requestId }),
            ...(extra && Object.keys(extra).length > 0 ? extra : {}),
        };
        console.log(JSON.stringify(logEntry));
    }
    setLogLevels(levels) {
        this.logLevels = levels;
    }
}
exports.JsonLogger = JsonLogger;
//# sourceMappingURL=logger.service.js.map