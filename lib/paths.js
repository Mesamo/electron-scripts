const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules')
};
