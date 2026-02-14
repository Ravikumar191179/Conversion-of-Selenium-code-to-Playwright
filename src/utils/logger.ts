import winston from 'winston';

/**
 * Logger utility for test execution
 */
export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'playwright-tests' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ],
});

/**
 * Log test start
 */
export function logTestStart(testName: string) {
    logger.info(`🧪 Starting test: ${testName}`);
}

/**
 * Log test end
 */
export function logTestEnd(testName: string, status: string) {
    logger.info(`✅ Test completed: ${testName} - Status: ${status}`);
}

/**
 * Log error
 */
export function logError(message: string, error?: Error) {
    logger.error(`❌ Error: ${message}`, { error: error?.message, stack: error?.stack });
}
