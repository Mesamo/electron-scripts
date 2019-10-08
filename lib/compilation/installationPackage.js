const path = require('path');

const paths = require('../paths');
const innoSetupCompiler = require('../innosetup/iscc');

const appName = 'my-app';

const buildPath = (arch) => path.join(paths.appUnpack, `${appName}-win32-${arch}`);
const setupDir = (arch) => path.join(paths.appPack);
const setupName = (arch) => `${appName}-win32-${arch}`;

function installation() {
  const configPath = path.resolve(__dirname, '../innosetup/inno-scripts.iss');

  const sourcePath = buildPath('x64');
  const outputPath = setupDir('x64');

  const definitions = {
    SourceDir: sourcePath,
    OutputDir: outputPath,
    SetupName: setupName
  };

  return new Promise((resolve, reject) => {
    innoSetupCompiler(configPath, { definitions }, (error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });
}

module.exports = installation;
