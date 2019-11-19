const chalk = require('chalk');
const gray = chalk.default.gray;
const cyan = chalk.default.cyan;
const magenta = chalk.default.magenta;

const formatShortDate = require('./formatShortDate');
const formatTimeString = require('./formatTimeString');

class TaskTimer {
  constructor(taskName) {
    this.taskName = taskName;
  }

  start() {
    this.startTime = new Date();
    console.log(
      `[${gray(formatShortDate(this.startTime))}] Starting '${cyan(this.taskName)}'...`
    );
  }

  finish() {
    const now = new Date();
    const spend = now.getTime() - this.startTime.getTime();
    console.log(
      `[${gray(formatShortDate(now))}] Finished '${cyan(this.taskName)}' after ${magenta(formatTimeString(spend))}`
    );
  }

  error() {
    const now = new Date();
    const spend = now.getTime() - this.startTime.getTime();
    console.log(
      `[${gray(formatShortDate(now))}] Error Occurred '${cyan(this.taskName)}' after ${magenta(formatTimeString(spend))}`
    );
  }
}

module.exports = TaskTimer;
