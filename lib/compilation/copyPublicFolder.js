const fs = require('fs-extra');
const paths = require('../lib/paths');

function copyPublicFolder() {
  fs.emptyDirSync(paths.appBuild);
  fs.copySync(paths.appPublic, paths.appBuild);
}

module.exports = copyPublicFolder;
