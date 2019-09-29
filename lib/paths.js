const resolveFromApp = require('./utils/resolveFromApp');

module.exports = {
  appPath: resolveFromApp('.'),
  appBuild: resolveFromApp('build'),
  appResources: resolveFromApp('build/resources'),
  mainOutput: resolveFromApp('build/resources/main'),
  rendererOutput: resolveFromApp('build/resources/renderer'),
  appUnpack: resolveFromApp('build/unpack'),
  appDist: resolveFromApp('dist'),
  appSrc: resolveFromApp('src'),
  appPublic: resolveFromApp('public'),
  appPackageJson: resolveFromApp('package.json'),
  appNodeModules: resolveFromApp('node_modules'),
  config: resolveFromApp('electron-scripts.json')
};
