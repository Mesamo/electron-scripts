const { chalk } = require('@mesamo/es-dev-utils');

const copyFiles = require('../lib/compilation/copyFiles');
const compileTs = require('../lib/compilation/compileTs');
const electronPackage = require('../lib/compilation/electronPackage');
const installation = require('../lib/compilation/winInstaller');

async function build() {
  try {
    await copyFiles();
    await compileTs('production');
    await electronPackage();
    await installation();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

module.exports = build;
