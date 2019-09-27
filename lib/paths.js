const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appResources: resolveApp('build/resources'),
  appOut: resolveApp('build/resources/out'),
  appUnpack: resolveApp('build/unpack'),
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
  tsConfig: resolveApp('tsconfig.app.json'),
  config: resolveApp('electron-scripts.json')
};
