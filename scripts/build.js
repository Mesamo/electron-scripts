const chalk = require('chalk');

const copyPublicFolder = require('../lib/compilation/copyPublicFolder');
const electronPackage = require('../lib/compilation/electronPackage');
const compileTs = require('../lib/compilation/compileTs');

copyPublicFolder();
compileTs()
  .then(({ stats, warnings }) => {
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log(
        '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
      );
      console.log(
        'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }
    return electronPackage();
  })
  .catch(error => {
    console.log(chalk.red(error.message));
    process.exit(1);
  });
