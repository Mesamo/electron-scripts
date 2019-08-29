const packager = require('electron-packager');
const fs = require('fs-extra');
const clui = require('clui');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');

const Spinner = clui.Spinner;

const spinner = new Spinner('qwerty');
const taskTimer = new TaskTimer('Electron Package');

async function electronPackager() {
  taskTimer.start();
  spinner.start();
  spinner.message('Clear dist dir');
  await fs.emptyDir(paths.appUnpack);
  spinner.message('Packaging...');
  await packager({
    dir: paths.appResources,
    out: paths.appUnpack,
    icon: 'build/icon.ico',
    platform: 'win32',
    arch: 'x64',
    quiet: true
  });
  spinner.stop();
  taskTimer.stop();
}

module.exports = electronPackager;
