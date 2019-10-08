const nodeResolve = require('resolve');

function resolvePackage(pkgName) {
  return new Promise((resolve, reject) => {
    nodeResolve(pkgName, (error, resolved, pkg) => {
      if (error) {
        reject(error);
      } else {
        resolve(pkg);
      }
    });
  });
};

module.exports = resolvePackage;
