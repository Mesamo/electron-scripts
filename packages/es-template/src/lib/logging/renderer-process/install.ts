import { ipcRenderer } from 'electron';

import { LogInfo } from '../../../models/log-info';
import { formatError } from '../format-error';

const g = window as any;

function withProcessName(message: string) {
  return `[renderer] ${message}`;
}

const logger: ILog = {
  error(message: string, error: Error) {
    const logInfo = new LogInfo('error', formatError(error, withProcessName(message)));
    ipcRenderer.send('renderer-log', logInfo);
  },
  warn(message: string) {
    const logInfo = new LogInfo('warn', withProcessName(message));
    ipcRenderer.send('renderer-log', logInfo);
  },
  info(message: string) {
    const logInfo = new LogInfo('info', withProcessName(message));
    ipcRenderer.send('renderer-log', logInfo);
  },
  debug(message: string) {
    const logInfo = new LogInfo('debug', withProcessName(message));
    ipcRenderer.send('renderer-log', logInfo);
  }
};

g.log = logger;
