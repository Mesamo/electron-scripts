const path = require('path');
const { chalk } = require('@mesamo/es-dev-utils');

const { checkAppName } = require('./lib/checkAppName');
const { downloadTemplate } = require('./lib/downloadTemplate');
const { editPackageJson } = require('./lib/editPackageJson');
const { installDependencies } = require('./lib/installDependencies');

async function createElectronApp(appName) {
  try {
    checkAppName(appName);

    const cwd = process.cwd();
    const root = path.resolve(cwd, appName);

    const defaultTemplateName = '@mesamo/es-template';
    await downloadTemplate(defaultTemplateName, root);

    editPackageJson(appName, root);

    await installDependencies(root);

    console.log();
    console.log(` Create new Electron app in ${chalk.green(root)}\n`);

    console.log(' Get started with the following commands:\n');

    console.log(chalk.cyan(` ${chalk.gray('$')} cd ${appName}`));
    console.log(chalk.cyan(` ${chalk.gray('$')} npm run build`));
    console.log(chalk.cyan(` ${chalk.gray('$')} npm run launch`));
  } catch (error) {
    console.log();
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

module.exports = createElectronApp;
