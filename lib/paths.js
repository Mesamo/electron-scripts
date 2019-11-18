const resolveFromApp = require('./utils/resolveFromApp');

module.exports = {
  appPath: resolveFromApp('.'),
  appBuild: resolveFromApp('build'),
  appPackageJson: resolveFromApp('package.json'),
  appResources: resolveFromApp('build/resources'),
  mainOutput: resolveFromApp('build/resources/main'),
  rendererOutput: resolveFromApp('build/resources/renderer'),
  appUnpack: resolveFromApp('build/unpack'),
  appPack: resolveFromApp('build/pack'),
  appDist: resolveFromApp('dist'),
  appSrc: resolveFromApp('src'),
  appNodeModules: resolveFromApp('node_modules'),
  config: resolveFromApp('electron-scripts.json'),
  signtool: resolveFromApp('lib/signtool/signtool.exe')
};
