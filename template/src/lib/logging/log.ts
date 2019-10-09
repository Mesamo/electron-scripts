import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { LogLevel } from './log-level';
import { getLogFilePath, getLogDirectoryPath, ensureDir } from './helpers';

const MAX_LOG_FILES = 14;

const { combine, printf, timestamp } = winston.format;

function initializeWinston(filename: string): winston.LogMethod {
  const fileLogger = new DailyRotateFile({
    filename: filename,
    level: 'info',
    maxFiles: MAX_LOG_FILES
  });

  const consoleLogger = new winston.transports.Console({
    level: 'debug'
  });

  winston.configure({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [consoleLogger, fileLogger]
  });

  return winston.log;
}

let loggerPromise: Promise<winston.LogMethod> | null = null;

function getLogger(): Promise<winston.LogMethod> {
  if (loggerPromise) {
    return loggerPromise;
  }

  loggerPromise = new Promise<winston.LogMethod>((resolve, reject) => {
    const logDirectory = getLogDirectoryPath();
    try {
      ensureDir(logDirectory);
      const logger = initializeWinston(getLogFilePath(logDirectory));
      resolve(logger);
    } catch (err) {
      reject(err);
    }
  });

  return loggerPromise;
}

export async function log(level: LogLevel, message: string) {
  try {
    const logger = await getLogger();
    await new Promise<void>((resolve, reject) => {
      logger(level, message, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(error);
    /**
     * Welp. I guess we have to ignore this for now, we
     * don't have any good mechanisms for reporting this.
     * In the future we can discuss whether we should
     * IPC to the renderer or dump it somewhere else
     * but for now logging isn't a critical thing.
     */
  }
}
