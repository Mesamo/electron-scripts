interface ILog {
  /**
   * Writes a log message at the 'error' level.
   *
   * @param message The text to write to the log file
   * @param error   An optional error instance that will be formatted to
   *                include the stack trace (if one is available) and
   *                then appended to the log message.
   */
  error(message: string, error?: Error): void;

  /**
   * Writes a log message at the 'warn' level.
   *
   * @param message The text to write to the log file
   */
  warn(message: string): void;

  /**
   * Writes a log message at the 'info' level.
   *
   * @param message The text to write to the log file
   */
  info(message: string): void;

  /**
   * Writes a log message at the 'debug' level.
   *
   * @param message The text to write to the log file
   */
  debug(message: string): void;
}

declare const log: ILog;
