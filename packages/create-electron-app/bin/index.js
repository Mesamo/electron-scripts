#!/usr/bin/env node

const { commander, chalk, checkNodeVersion } = require('@mesamo/es-dev-utils');

const enhanceErrorMessages = require('../lib/utils/enhanceErrorMessages');
const packageJson = require('../package.json');

const majorVersion = 10;

checkNodeVersion(majorVersion, packageJson.name);

let appName;

const program = new commander.Command('create-electron-app')
  .version(packageJson.version)
  .arguments('<app-name>')
  .usage(chalk.green('<app-name>'))
  .description(
    `create a electron new project powered by ${chalk.green('@mesamo/electron-scripts')}`
  )
  .action((name) => {
    appName = name;
  });

enhanceErrorMessages('missingArgument', (argName) => {
  console.log('Please specify the argument:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green(`<${argName}>`)}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-electron-app')}`);
});

program.parse(process.argv);

require('../create')(appName);
