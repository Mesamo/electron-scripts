const figlet = require('figlet');
const clear = require('clear');

function printLogo() {
  return new Promise((resolve, reject) => {
    // Clear the terminal screen
    clear();

    // print 'Electron-Scripts' Logo
    figlet('Electron Scripts', (error, result) => {
      if (error) {
        console.dir(error);
        reject(error);
        return;
      }
      console.log(result);
      resolve();
    });
  });
}

module.exports = printLogo;
