const path = require('path');
const clui = require('clui');
const fs = require('fs-extra');

const paths = require('../paths');
const TaskTimer = require('../utils/task-timer');
const configs = require('../configs/scripts-config');
const innoSetupCompiler = require('../innosetup/iscc');
const resolveFromApp = require('../utils/resolveFromApp');

const Spinner = clui.Spinner;
const spinner = new Spinner('Packaging...');
const taskTimer = new TaskTimer('Win32 Installer');

const product = configs.compilation.product;

const buildPath = (arch) => path.join(paths.appUnpack, `${product.name}-${product.platform}-${arch}`);
const buildSetupName = (arch) => `${product.name}-${arch}-${product.version}-setup`;
const buildInstallMode = (arch) => {
  if (arch && typeof arch === 'string' && arch.indexOf('64') >= 0) {
    return arch;
  } else {
    return '';
  }
};

async function installation() {
  const configPath = path.resolve(__dirname, '../configs/inno-scripts.iss');
  const innoSetupPath = path.resolve(__dirname, '..', 'innosetup');

  const sourcePath = buildPath(product.arch);
  const outputPath = paths.appPack;
  const setupName = buildSetupName(product.arch);
  const setupIcon = resolveFromApp(configs.compilation.icon);
  const installMode = buildInstallMode(product.arch);

  const definitions = {
    AppId: product.appId,
    Name: product.name,
    Version: product.version,
    DirName: product.dirName,
    ExeBasename: `${product.name}.exe`,
    Publisher: product.publisher,
    SourceDir: sourcePath,
    OutputDir: outputPath,
    SetupName: setupName,
    SetupIcon: setupIcon,
    InnoSetupPath: innoSetupPath,
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
