const clui = require('clui');
const chalk = require('chalk');

const gray = chalk.default.gray;
const print = (msg) => {
  console.log(` - ` + gray(msg));
}

/**
 * 非CI环境使用的Spinner
 * 控制台会显示一些loading动画
 */
const Spinner = clui.Spinner;

/**
 * CI环境使用的Spinner
 * 使用console.log打印信息，没有动画。防止出现过多无用控制台日志
 */
class CiSpinner {
  constructor(statusText, styles) {
    this.statusText = statusText;
    this.styles = styles;
  }

  /**
   * 开始
   */
  start() {
    print(this.statusText);
  }

  /**
   * 结束
   */
  stop() {}

  /**
   * 显示消息
   *
   * @param {*} statusMessage 消息内容
   */
  message(statusMessage) {
    print(statusMessage);
  }
}

const exportObj = {
  Spinner: Spinner
}

if (process.env.CI === 'true') {
  exportObj.Spinner = CiSpinner;
}

module.exports = exportObj;
