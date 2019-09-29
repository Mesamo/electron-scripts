const fs = require('fs-extra');
const clui = require('clui');
const path = require('path');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');
const resolveFromApp = require('../utils/resolveFromApp');
const configs = require('../configs/scripts-config');

const Spinner = clui.Spinner;

const spinner = new Spinner('Copy Files...');
const taskTimer = new TaskTimer('Copy Files');

async function copyFiles() {
  try {
    taskTimer.start();
    spinner.start();
    spinner.message('Clear build dir');
    fs.emptyDirSync(paths.appBuild);
    spinner.message('Copy the Projects dir');
    const projects = configs.compilation.rendererProcess.projects;
    projects.forEach((project) => {
      if (typeof project === 'string') {
        fs.copySync(resolveFromApp(project), paths.rendererOutput);
      } else if (typeof project === 'object') {
        fs.copySync(resolveFromApp(project.input), path.resolve(paths.rendererOutput, project.output));
      }
    });
    spinner.message('Copy package.json');
    fs.copyFileSync(resolveFromApp(configs.compilation.pkgJson), paths.appPackageJson);
    spinner.stop();
    taskTimer.finish();
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw error;
  }
}

module.exports = copyFiles;
