#!/usr/bin/env node

const { commander, checkNodeVersion } = require('@mesamo/es-dev-utils');

const packageJson = require('../package.json');

checkNodeVersion(packageJson.engines.node, packageJson.name);

const program = new commander.Command('electron-scrips')
  .version(packageJson.version)
  .usage('<command> [options]');

program
  .command('build')
  .description('build electron app in production mode')
  .action(() => require('../scripts/build')());

program
  .command('start')
  .description('build electron app in development mode')
  .action(() => require('../scripts/start')());

program
  .command('test')
  .description('Run unit tests')
  .action(() => require('../scripts/test')());

program
  .command('version')
  .description('show versions')
  .action(() => require('../scripts/version')());

program.parse(process.argv);
