const chalk = require('chalk');
const { formatTimeString } = require('./formatTimeString');
const { getTime } = require('./getTime');

const gray = chalk.gray;
const cyan = chalk.cyan;
const magenta = chalk.magenta;

class TaskTimer {
  constructor(taskName) {
    this.taskName = taskName;
  }

  start() {
    this.startTime = new Date();
    console.log(
      `[${gray(getTime(this.startTime))}] Starting '${cyan(this.taskName)}'...`
    );
  }

  finish() {
    const now = new Date();
    const spend = now.getTime() - this.startTime.getTime();
    console.log(
      `[${gray(getTime(now))}] Finished '${cyan(this.taskName)}' after ${magenta(formatTimeString(spend))}`
    );
  }

  error() {
    const now = new Date();
    const spend = now.getTime() - this.startTime.getTime();
    console.log(
      `[${gray(getTime(now))}] Error Occurred '${cyan(this.taskName)}' after ${magenta(formatTimeString(spend))}`
    );
  }
}

module.exports = { TaskTimer };
