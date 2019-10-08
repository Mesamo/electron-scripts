const chalk = require('chalk');

const printLogo = require('../lib/printing/index');

version();

async function version() {
  try {
    await printLogo();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
