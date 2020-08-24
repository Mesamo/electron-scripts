const resolvePackage = require('./resolvePackage');

function getElectronVersion(electronPkgName = 'electron') {
  return resolvePackage(electronPkgName).then((pkg) => pkg.version);
};

module.exports = getElectronVersion;
