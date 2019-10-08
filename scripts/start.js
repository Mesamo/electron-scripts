const chalk = require('chalk');

const copyFiles = require('../lib/compilation/copyFiles');
const compileTs = require('../lib/compilation/compileTs');

start();

async function start() {
  try {
    await copyFiles();
    await compileTs();
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
