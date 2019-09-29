const chalk = require('chalk');

const printLogo = require('../lib/printing/index');
const copyPublicFolder = require('../lib/compilation/copyPublicFolder');
const compileTs = require('../lib/compilation/compileTs');
const electronPackage = require('../lib/compilation/electronPackage');

build();

async function build() {
  try {
    await printLogo();
    await copyPublicFolder();
    await compileTs();
    await electronPackage();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
