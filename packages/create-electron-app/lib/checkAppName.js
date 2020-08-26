const validateProjectName = require('validate-npm-package-name');
const { TaskTimer, chalk } = require('@mesamo/es-dev-utils');

exports.checkAppName = function(appName) {
  const taskTimer = new TaskTimer('Check App Name');
  taskTimer.start();
  const result = validateProjectName(appName);
  if (result.validForNewPackages) {
    taskTimer.finish();
  } else {
    result.errors && result.errors.forEach((err) => {
      console.log(chalk.red(`Error: ${err}`));
    });
    result.warnings && result.warnings.forEach((warn) => {
      console.log(chalk.yellow(`Warning: ${warn}`));
    });
    taskTimer.error();
    throw new Error(`Invalid app name: "${appName}"`);
  }
};
