import { WindowContainer } from './windows/window-container';
import { AppWindow } from './windows/app-window';
import { IpcHandler } from './ipc/ipc-handler';

const container = WindowContainer.getInstance();

/**
 * 启动
 *
 * @export
 */
export function bootstrap() {
  // 1. 开启主线程事件监听
  IpcHandler.startAllListeners();

  // 2. 创建主窗口，保存到容器中
  const appWindow = new AppWindow();
  container.set(appWindow);
  appWindow.onClosed(() => container.remove('AppWindow'));

  // 3. 启动主窗口
  appWindow.load();
}
