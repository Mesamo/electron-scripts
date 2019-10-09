const packager = require('electron-packager');
const fs = require('fs-extra');
const clui = require('clui');
const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');
const getElectronVersion = require('../utils/getElectronVersion');
const configs = require('../configs/scripts-config');
const resolveFromApp = require('../utils/resolveFromApp');

const Spinner = clui.Spinner;

const spinner = new Spinner('Packaging...');
const taskTimer = new TaskTimer('Electron Package');

const product = configs.compilation.product;

async function electronPackager() {
  try {
    taskTimer.start();
    spinner.start();
    spinner.message('Clear Unpack dir');
    await fs.emptyDir(paths.appUnpack);
    spinner.message('Packaging...');

    const electronVersion = await getElectronVersion();
    await packager({
      name: product.name,
      appVersion: product.version,
      buildVersion: product.version,
      appCopyright: product.copyright,
      dir: paths.appResources,
      out: paths.appUnpack,
      icon: resolveFromApp(configs.compilation.icon),
      platform: product.platform,
      arch: product.arch,
      quiet: true,
      asar: configs.compilation.asar,
      download: {
        mirrorOptions: {
          mirror: configs.download.mirror,
          customDir: electronVersion
        }
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

module.exports = electronPackager;
