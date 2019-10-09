import { ipcMain } from 'electron';

import { log } from '../lib/logging/log';
import { LogInfo } from '../models/log-info';

export class IpcHandler {

  static startAllListeners() {
    ipcMain.on('renderer-log', (event: Electron.Event, logInfo: LogInfo) => {
      log(logInfo.level, logInfo.message);
    });
  }
}
