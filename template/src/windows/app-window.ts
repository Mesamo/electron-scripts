import { BaseWindow } from './base-window';

export class AppWindow extends BaseWindow {

  public readonly windowName = 'AppWindow';

  constructor() {
    super();
  }

  protected loadRenderer(): void {
    const filePath = 'renderer/index.html';
    this.window.loadFile(filePath);
  }
}
