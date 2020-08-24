const { delay } = require('./lib/delay');
const { getTime } = require('./lib/getTime');
const { formatTimeString } = require('./lib/formatTimeString');
const { Spinner } = require('./lib/spinner');
const { TaskTimer } = require('./lib/task-timer');

exports.delay = delay;
exports.getTime = getTime;
exports.formatTimeString = formatTimeString;
exports.Spinner = Spinner;
exports.TaskTimer = TaskTimer;

/**
 * 导出第三方包
 */
exports.chalk = require('chalk');
exports.clear = require('clear');
exports.clui = require('clui');
exports.figlet = require('figlet');
exports.inquirer = require('inquirer');
