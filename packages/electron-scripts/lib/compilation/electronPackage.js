const packager = require('electron-packager');
const fs = require('fs-extra');
const path = require('path');
const { TaskTimer } = require('@mesamo/es-dev-utils');
const { Spinner } = require('@mesamo/es-dev-utils');
const signTool = require('@mesamo/windows-sign-tool');

const paths = require('../paths');
const getElectronVersion = require('../utils/getElectronVersion');
const configs = require('../configs/scripts-config');
const resolveFromApp = require('../utils/resolveFromApp');
const pkg = require('../utils/resolvePkgJson');

const spinner = new Spinner('Packaging...');
const taskTimer = new TaskTimer('Electron Package');

const product = configs.compilation.product;

const appName = pkg.productName || pkg.name;
const appVersion = pkg.version;

const requireAdmin = product.privileges === 'admin';

async function electronPackager() {
  try {
    taskTimer.start();
    spinner.start();
    spinner.message('Clear Unpack dir');
    await fs.emptyDir(paths.appUnpack);
    spinner.message('Packaging...');

    const electronVersion = await getElectronVersion();
    const result = await packager({
      name: appName,
      appVersion: appVersion,
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
      },
      tmpdir: resolveFromApp('./node_modules/.tmp'),
      win32metadata: {
        'requested-execution-level': requireAdmin ? 'requireAdministrator' : 'asInvoker'
      }
    });

    spinner.message(`Signing Executable ${appName}.exe`);
    const exePath = path.resolve(result[0], `${appName}.exe`);
    const options = {
      pfxFile: configs.compilation.pfxFile,
      pfxPwd: configs.compilation.pfxPwd,
      file: exePath
    };
    if (options.pfxFile && options.pfxPwd) {
      await signTool(options);
    }
    spinner.stop();
    taskTimer.finish();
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw error;
  }
}

module.exports = electronPackager;
