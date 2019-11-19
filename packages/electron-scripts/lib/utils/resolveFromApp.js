const fs = require('fs-extra');
const path = require('path');

function resolveFromApp(relativePath) {
  const appDirectory = fs.realpathSync(process.cwd());
  return path.resolve(appDirectory, relativePath);
}

module.exports = resolveFromApp;
