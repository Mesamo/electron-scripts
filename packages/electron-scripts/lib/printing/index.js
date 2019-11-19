const chalk = require('chalk');
const figlet = require('figlet');

const getElectronVersion = require('../utils/getElectronVersion');
const pkg = require('../../package.json');

const cyan = chalk.default.cyan;

async function printLogo() {
  const electronVersion = await getElectronVersion();
  return new Promise((resolve, reject) => {
    figlet('Electron Scripts', (error, result) => {
      if (error) {
        console.dir(error);
        reject(error);
        return;
      }
      // print 'Electron-Scripts' Logo
      console.log(result);

      // print versions
      console.log(`Electron Scripts CLI: ${cyan(pkg.version)}`);
      console.log(`Node: ${cyan(process.versions.node)}`);
      console.log(`OS: ${cyan(process.platform)} ${cyan(process.arch)}`);
      console.log(`Electron: ${cyan(electronVersion)}`);
      resolve();
    });
  });
}

module.exports = printLogo;
