const chalk = require('chalk');

const copyFiles = require('../lib/compilation/copyFiles');
const compileTs = require('../lib/compilation/compileTs');
const electronPackage = require('../lib/compilation/electronPackage');

build();

async function build() {
  try {
    await copyFiles();
    await compileTs();
    await electronPackage();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
