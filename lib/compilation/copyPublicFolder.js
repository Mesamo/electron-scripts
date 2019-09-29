const fs = require('fs-extra');
const clui = require('clui');
const path = require('path');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');
const resolveFromApp = require('../utils/resolveFromApp');
const configs = require('../configs/scripts-config');

const Spinner = clui.Spinner;

const spinner = new Spinner('qwerty');
const taskTimer = new TaskTimer('Copy-Public-Folder');

async function copyPublicFolder() {
  taskTimer.start();
  spinner.start();
  spinner.message('Clear build dir');
  fs.emptyDirSync(paths.appBuild);
  spinner.message('Copy the public dir to build dir');
  const projects = configs.compilation.rendererProcess.projects;
  projects.forEach((project) => {
    if (typeof project === 'string') {
      fs.copySync(resolveFromApp(project), paths.rendererOutput);
    } else if (typeof project === 'object') {
      fs.copySync(resolveFromApp(project.input), path.resolve(paths.rendererOutput, project.output));
    }
  });
  fs.copyFileSync(resolveFromApp(configs.compilation.pkgJson), paths.appPackageJson);
  spinner.stop();
  taskTimer.stop();
}

module.exports = copyPublicFolder;
