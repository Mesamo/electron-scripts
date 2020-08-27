const semver = require('semver');
const chalk = require('chalk');

exports.checkNodeVersion = function(wanted, id) {
  const unsupportedNodeVersion = !semver.satisfies(process.version, wanted);
  if (unsupportedNodeVersion) {
    console.log(chalk.red(
      `You are using Node ${process.version}, but this version of ${id}` +
      ` requires Node ${wanted}. \nPlease upgrade your Node version.`
    ));
    process.exit(1);
  }
};
