const configs = require('../configs/scripts-config');
const winInstaller = require('./winInstaller');

async function installation() {
  const platform = configs.compilation.product.platform;
  if (platform === 'win32') {
    await winInstaller();
  } else {
    console.log(`${platform} not support`);
  }
}

module.exports = installation;
