import { BrowserWindow, ipcMain, app } from 'electron';
import { performance } from 'perf_hooks';
import path from 'path';

import { IpcMessage } from '../models/ipc-message';
import { EventQueue } from '../lib/event-queue';

export abstract class BaseWindow {
  //#region private field
  private _rendererReadyTime: number | null = null;
  private _loadTime: number | null = null;
  private eventQueue = new EventQueue<IpcMessage>();
  //#endregion

  //#region protected field
  protected window: Electron.BrowserWindow;
  //#endregion

  //#region public property
  public abstract readonly windowName: string;

  /**
   * 页面加载完成，且渲染线程准备就绪？
   *
   * @readonly
   * @type {boolean}
   * @memberof BaseWindow
   */
  public get rendererReady(): boolean {
    return !!this._loadTime && !!this._rendererReadyTime;
  }

  /**
   * 获取页面加载时间(毫秒数)
   *
   * @readonly
   * @type {(number | null)}
   * @memberof BaseWindow
   */
  public get loadTime(): number | null {
    return this._loadTime;
  }

  /**
   * 获取渲染线程准备就绪时间(毫秒数)
   *
   * @readonly
   * @type {(number | null)}
   * @memberof BaseWindow
   */
  public get rendererReadyTime(): number | null {
    return this._rendererReadyTime;
  }
  //#endregion

  constructor() {
    const appPath = app.getAppPath();
    const preloadPath = path.join(appPath, 'main/preload.js');
    const windowOptions: Electron.BrowserWindowConstructorOptions = {
      show: false,
      webPreferences: {
        preload: preloadPath
      }
    };

    this.window = new BrowserWindow(windowOptions);

    this.window.once('ready-to-show', () => {
      this.show();
    });
  }

  //#region protected method

  /**
   * 加载渲染进程页面
   * 由继承类实现
   *
   * @protected
   * @abstract
   * @memberof BaseWindow
   */
  protected abstract loadRenderer(): void;
  //#endregion

  //#region public method
  /**
   * 发送消息到UI线程
   *
   * @param {string} channel 消息类型
   * @param {...any[]} args 参数列表
   * @memberof BaseWindow
   */
  public send(channel: string, ...args: any[]): void {
    if (this.rendererReady) {
      // 如果UI线程准备就绪，直接发送ipc消息
      this.window.webContents.send(channel, ...args);
    } else {
      // 如果UI线程未准备就绪，则将消息保存在消息队列中
      this.eventQueue.enqueue({ channel, payload: args });
    }
  }

  public load(): void {
    let startLoad = 0;

    this.window.webContents.once('did-start-loading', () => {
      log.debug(`${this.windowName} start loading`);
      this._loadTime = null;
      this._rendererReadyTime = null;
      startLoad = performance.now();
    });

    this.window.webContents.once('did-finish-load', () => {
      this._loadTime = performance.now() - startLoad;
      log.debug(`${this.windowName} finish load, spend ${this._loadTime}ms`);
    });

    this.window.webContents.on(
      'did-fail-load',
      (
        event,
        errorCode,
        errorDescription,
        validatedURL,
        isMainFrame,
        frameProcessId,
        frameRoutingId
      ) => {
        log.error(`${errorDescription}, ${validatedURL}`, new Error(errorDescription));
        this.window.webContents.openDevTools();
        this.window.show();
      }
    );

    ipcMain.once(
      'renderer-ready',
      (event: Electron.Event, windowName: string) => {
        if (windowName !== this.windowName) {
          return;
        }
        this._rendererReadyTime = performance.now();
        log.debug(
          `${this.windowName} renderer ready, ${this._rendererReadyTime}ms`
        );

        // UI线程准备就绪后，发送缓存的ipc消息
        this.eventQueue.emit(e => {
          this.window.webContents.send(e.channel, ...e.payload);
        });
      }
    );

    this.loadRenderer();
  }

  /**
   * 窗口关闭时触发
   *
   * @param {Function} fn
   * @memberof BaseWindow
   */
  public onClosed(fn: Function): void {
    this.window.on('closed', fn);
  }

  /**
   * 窗口是否最小化
   *
   * @returns {boolean}
   * @memberof BaseWindow
   */
  public isMinimized(): boolean {
    return this.window.isMinimized();
  }

  /**
   * 窗口是否可见
   *
   * @returns {boolean}
   * @memberof BaseWindow
   */
  public isVisible(): boolean {
    return this.window.isVisible();
  }

  /**
   * 显示窗口
   *
   * @memberof BaseWindow
   */
  public show(): void {
    this.window.show();
  }

  /**
   * 隐藏窗口
   *
   * @memberof BaseWindow
   */
  public hide(): void {
    this.window.hide();
  }

  /**
   * 恢复窗口状态
   *
   * @memberof BaseWindow
   */
  public restore(): void {
    this.window.restore();
  }

  /**
   * 聚焦窗口
   *
   * @memberof BaseWindow
   */
  public focus(): void {
    this.window.focus();
  }

  /**
   * 销毁窗口
   *
   * @memberof BaseWindow
   */
  public destroy(): void {
    this.window.destroy();
  }
  //#endregion
}
