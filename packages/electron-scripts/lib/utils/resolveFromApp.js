const { fs } = require('@mesamo/es-dev-utils');
const path = require('path');

function resolveFromApp(relativePath) {
  const appDirectory = fs.realpathSync(process.cwd());
  return path.resolve(appDirectory, relativePath);
}

module.exports = resolveFromApp;
