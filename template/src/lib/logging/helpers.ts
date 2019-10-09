import { app } from 'electron';
import path from 'path';
import fs from 'fs';

export function getLogFilePath(directory: string): string {
  const fileName = 'electron.log';
  const logFilePath = path.join(directory, fileName);
  return logFilePath;
}

export function getLogDirectoryPath(): string {
  const userDataPath = app.getPath('userData');
  const logDirectoryPath = path.join(userDataPath, 'logs');
  return logDirectoryPath;
}

export function ensureDir(directory: string): void {
  if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
    fs.mkdirSync(directory);
  }
}
