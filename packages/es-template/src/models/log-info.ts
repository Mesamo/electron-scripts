import { LogLevel } from '../lib/logging/log-level';

export class LogInfo {
  level: LogLevel;
  message: string;

  constructor(level: LogLevel, message: string) {
    this.level = level;
    this.message = message;
  }
}
