const { delay } = require('./lib/delay');
const { getTime } = require('./lib/getTime');
const { formatTimeString } = require('./lib/formatTimeString');
const { Spinner } = require('./lib/spinner');
const { TaskTimer } = require('./lib/task-timer');
const { checkNodeVersion } = require('./lib/checkNodeVersion');

exports.delay = delay;
exports.getTime = getTime;
exports.formatTimeString = formatTimeString;
exports.Spinner = Spinner;
exports.TaskTimer = TaskTimer;
exports.checkNodeVersion = checkNodeVersion;

/**
 * 导出第三方包
 */
exports.chalk = require('chalk');
exports.clear = require('clear');
exports.clui = require('clui');
exports.figlet = require('figlet');
exports.inquirer = require('inquirer');
exports.commander = require('commander');
exports.fs = require('fs-extra');
exports.crossSpawn = require('cross-spawn');
