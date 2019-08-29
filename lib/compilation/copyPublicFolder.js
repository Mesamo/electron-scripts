const fs = require('fs-extra');
const clui = require('clui');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');

const Spinner = clui.Spinner;

const spinner = new Spinner('qwerty');
const taskTimer = new TaskTimer('Copy-Public-Folder');

async function copyPublicFolder() {
  taskTimer.start();
  spinner.start();
  spinner.message('Clear build dir');
  await fs.emptyDir(paths.appBuild);
  // await delay(2000);
  spinner.message('Copy the public dir to build dir');
  await fs.copy(paths.appPublic, paths.appResources);
  // await delay(2000);
  spinner.stop();
  taskTimer.stop();
}

module.exports = copyPublicFolder;
