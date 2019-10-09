import { BaseWindow } from './base-window';

/**
 * 窗口容器
 *
 * @export
 * @class WindowContainer
 */
export class WindowContainer {
  /**
   * 单例
   *
   * @private
   * @static
   * @type {WindowContainer}
   * @memberof WindowContainer
   */
  private static instance: WindowContainer;

  /**
   * Window Map
   *
   * @private
   * @type {Map<string, BaseWindow>}
   * @memberof WindowContainer
   */
  private _container: Map<string, BaseWindow>;

  private constructor() {
    this._container = new Map<string, BaseWindow>();
  }

  /**
   * 获取WindowContainer实例
   *
   * @static
   * @returns {WindowContainer}
   * @memberof WindowContainer
   */
  public static getInstance(): WindowContainer {
    if (!WindowContainer.instance) {
      WindowContainer.instance = new WindowContainer();
    }
    return WindowContainer.instance;
  }

  /**
   * 根据窗口名称获取窗口
   *
   * @param {string} windowName 窗口名称
   * @returns {(BaseWindow | undefined)} 窗口
   * @memberof WindowContainer
   */
  get(windowName: string): BaseWindow | undefined {
    return this._container.get(windowName);
  }

  /**
   * 保存窗口
   *
   * @param {BaseWindow} window 窗口
   * @returns {void}
   * @memberof WindowContainer
   */
  set(window: BaseWindow): void {
    const key = window.windowName;
    if (this._container.has(key)) {
      log.error(`BrowserWindow of name [${key}] is exist.`);
      return;
    }
    this._container.set(key, window);
  }

  /**
   * 窗口是否存在
   *
   * @param {string} windowName 窗口名称
   * @returns {boolean}
   * @memberof WindowContainer
   */
  isPresent(windowName: string): boolean {
    return this._container.has(windowName);
  }

  /**
   * 如果窗口存在，执行回调
   *
   * @param {string} windowName 窗口名称
   * @param {(window: BaseWindow) => void} callback 回调
   * @memberof WindowContainer
   */
  ifPresent(windowName: string, callback: (window: BaseWindow) => void): void {
    const _window = this.get(windowName);
    if (_window && callback && typeof callback === 'function') {
      callback(_window);
    }
  }

  /**
   * 移除窗口
   *
   * @param {string} windowName 窗口名称
   * @returns {void}
   * @memberof WindowContainer
   */
  remove(windowName: string): void {
    if (!this._container.has(windowName)) {
      log.warn(
        `BrowserWindow of name [${windowName}] is not exist, don't need remove.`
      );
      return;
    }
    this._container.delete(windowName);
  }

  /**
   * 清空窗口容器
   *
   * @returns {void}
   * @memberof WindowContainer
   */
  clear(): void {
    this._container.clear();
  }
}
