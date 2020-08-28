const path = require('path');
const { TaskTimer, Spinner, fs } = require('@mesamo/es-dev-utils');

const paths = require('../paths');
const resolveFromApp = require('../utils/resolveFromApp');
const configs = require('../configs/scripts-config');

const spinner = new Spinner('Copy Files...');
const taskTimer = new TaskTimer('Copy Files');

async function copyFiles() {
  try {
    taskTimer.start();
    spinner.start();
    spinner.message('Clear Resource dir');
    fs.emptyDirSync(paths.appResources);

    spinner.message('Copy assets');
    const assets = configs.compilation.assets;
    assets.forEach((asset) => {
      if (typeof asset === 'string') {
        const from = resolveFromApp(asset);
        const stats = fs.lstatSync(from);
        if (stats.isDirectory()) {
          fs.copySync(from, paths.appResources);
        } else if (stats.isFile()) {
          const to = path.resolve(paths.appResources, path.basename(asset));
          fs.copySync(from, to);
        }
      } else if (typeof asset === 'object') {
        const from = resolveFromApp(asset.input);
        const stats = fs.lstatSync(from);
        if (stats.isDirectory()) {
          const to = path.resolve(paths.appResources, asset.output);
          fs.copySync(from, to);
        } else if (stats.isFile()) {
          const to = path.resolve(paths.appResources, asset.output, path.basename(asset.input));
          fs.copySync(from, to);
        }
      }
    });

    spinner.message('Copy the Projects dir');
    const projects = configs.compilation.rendererProcess.projects;
    projects.forEach((project) => {
      if (typeof project === 'string') {
        fs.copySync(resolveFromApp(project), paths.rendererOutput);
      } else if (typeof project === 'object') {
        fs.copySync(resolveFromApp(project.input), path.resolve(paths.rendererOutput, project.output));
      }
    });

    spinner.stop();
    taskTimer.finish();
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw error;
  }
}

module.exports = copyFiles;
