const resolvePackage = require('./resolvePackage');

function getElectronVersion(electronPkgName = 'electron') {
  return resolvePackage('electron').then((pkg) => pkg.version);
  // return new Promise((resolve, reject) => {
  //   nodeResolve(electronPkgName, (error, resolved, pkg) => {
  //     if (error) {
  //       reject(error);
  //     } else {
  //       resolve(pkg.version);
  //     }
  //   });
  // });
};

module.exports = getElectronVersion;
