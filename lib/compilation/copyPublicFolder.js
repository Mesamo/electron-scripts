const fs = require('fs-extra');
const clui = require('clui');
const glob = require('glob');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');
const configs = require('../configs/scripts-config');

const Spinner = clui.Spinner;

const spinner = new Spinner('qwerty');
const taskTimer = new TaskTimer('Copy-Public-Folder');

function checkExcludeFiles(patterns) {
  const excludeFiles = [];
  if (patterns && Array.isArray(patterns) && patterns.length > 0) {
    configs.compilation.rendererProcess.exclude.forEach((pattern) => {
      const files = glob.sync(pattern);
      excludeFiles.push(files);
    });
  }
  return excludeFiles;
}

async function copyPublicFolder() {
  taskTimer.start();
  spinner.start();
  spinner.message('Clear build dir');
  fs.emptyDirSync(paths.appBuild);
  // await delay(2000);
  spinner.message('Copy the public dir to build dir');
  fs.copySync(configs.compilation.rendererProcess.dir, paths.rendererOutput, {
    // filter: (src) => {
    //   const exclude = configs.compilation.rendererProcess.exclude;
    //   const excludeFiles = checkExcludeFiles(exclude);
    //   return excludeFiles.some((file) => {
    //     return file !== src;
    //   });
    // }
  });
  fs.copySync(paths.appPublic, paths.appResources);
  // await delay(2000);
  spinner.stop();
  taskTimer.stop();
}

module.exports = copyPublicFolder;
