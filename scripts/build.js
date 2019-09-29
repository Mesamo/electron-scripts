const chalk = require('chalk');

const printLogo = require('../lib/printing/index');
const copyFiles = require('../lib/compilation/copyFiles');
const compileTs = require('../lib/compilation/compileTs');
const electronPackage = require('../lib/compilation/electronPackage');

build();

async function build() {
  try {
    await printLogo();
    await copyFiles();
    await compileTs();
    await electronPackage();
  } catch (error) {
    console.log('\n');
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
