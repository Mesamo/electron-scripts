import { app } from 'electron';

import { WindowContainer } from './windows/window-container';
import { bootstrap } from './bootstrap';
import './lib/logging/main-process/install';
import './lib/global-error-handler';

const container = WindowContainer.getInstance();

app.on('ready', () => {
  app.accessibilitySupportEnabled = true;
  bootstrap();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (!container.isPresent('AppWindow')) {
    bootstrap();
  }
});
