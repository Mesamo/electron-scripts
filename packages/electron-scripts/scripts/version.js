const { chalk } = require('@mesamo/es-dev-utils');

const printLogo = require('../lib/printing/index');

async function version() {
  try {
    await printLogo();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

module.exports = version;
