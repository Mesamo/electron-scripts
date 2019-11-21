/**
 * 任务计时器
 */
export declare class TaskTimer {
  /**
   * 创建任务计时器
   *
   * @param taskName 任务名称
   */
  constructor(taskName: string);

  /**
   * 任务开始
   */
  start(): void;

  /**
   * 任务结束
   */
  finish(): void;

  /**
   * 任务出错
   */
  error(): void;
}
