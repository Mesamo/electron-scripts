const path = require('path');
const fs = require('fs-extra');
const { TaskTimer } = require('@mesamo/es-dev-utils/task-timer');
const { Spinner } = require('@mesamo/es-dev-utils/spinner');
const innoSetupCompiler = require('@mesamo/inno-setup-compiler');
const signTool = require('@mesamo/windows-sign-tool');

const paths = require('../paths');
const configs = require('../configs/scripts-config');
const resolveFromApp = require('../utils/resolveFromApp');
const pkg = require('../utils/resolvePkgJson');

const spinner = new Spinner('Packaging...');
const taskTimer = new TaskTimer('Win32 Installer');

const product = configs.compilation.product;

const appName = pkg.productName || pkg.name;
const appVersion = pkg.version;

const buildPath = (arch) => path.join(paths.appUnpack, `${appName}-${product.platform}-${arch}`);
const buildSetupName = (arch) => `${appName}-Setup-${arch}-${appVersion}`;
const buildInstallMode = (arch) => {
  if (arch && typeof arch === 'string' && arch.indexOf('64') >= 0) {
    return arch;
  } else {
    return '';
  }
};

async function installation() {
  const configPath = path.resolve(__dirname, '../configs/inno-scripts.iss');

  const sourcePath = buildPath(product.arch);
  const outputPath = paths.appPack;
  const setupName = buildSetupName(product.arch);
  const setupIcon = resolveFromApp(configs.compilation.icon);
  const installMode = buildInstallMode(product.arch);

  const definitions = {
    AppId: product.appId,
    Name: appName,
    Version: appVersion,
    DirName: product.dirName,
    ExeBasename: `${appName}.exe`,
    Publisher: product.publisher,
    SourceDir: sourcePath,
    OutputDir: outputPath,
    SetupName: setupName,
    SetupIcon: setupIcon,
    Copyright: product.copyright,
    Privileges: product.privileges,
    InstallMode: installMode
  };

  try {
    taskTimer.start();
    spinner.start();
    spinner.message('Clear Pack dir');
    await fs.emptyDir(paths.appPack);
    spinner.message('Packaging...');
    await runInnoSetup(configPath, { definitions });

    spinner.message(`Signing Installer ${setupName}.exe`);
    const exePath = path.resolve(outputPath, `${setupName}.exe`);
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

async function runInnoSetup(configPath, options) {
  return new Promise((resolve, reject) => {
    innoSetupCompiler(configPath, options, (error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });
}

module.exports = installation;
