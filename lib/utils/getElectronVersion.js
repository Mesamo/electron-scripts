const nodeResolve = require('resolve');

function getElectronVersion(electronPkgName = 'electron') {
  return new Promise((resolve, reject) => {
    nodeResolve(electronPkgName, (error, resolved, pkg) => {
      if (error) {
        reject(error);
      } else {
        resolve(pkg.version);
      }
    });
  });
};

module.exports = getElectronVersion;
