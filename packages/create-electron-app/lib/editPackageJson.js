const path = require('path');
const os = require('os');
const { TaskTimer, Spinner, fs } = require('@mesamo/es-dev-utils');

exports.editPackageJson = function(appName, dir) {
  const spinner = new Spinner('Edit package.json ...');
  const taskTimer = new TaskTimer('Edit package.json');

  taskTimer.start();
  spinner.start();

  const pkgPath = path.resolve(dir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath));
  pkg.name = appName;
  pkg.version = '0.1.0';
  pkg.private = true;

  delete pkg.repository;
  delete pkg.author;
  delete pkg.license;
  delete pkg.gitHead;

  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(pkg, null, 2) + os.EOL
  );

  spinner.stop();
  taskTimer.finish();
};
