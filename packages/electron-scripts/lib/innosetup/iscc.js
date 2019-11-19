const path = require('path');
const spawn = require('child_process').spawn;

function packageInnoSetup(iss, options, cb) {
  options = options || {};

  const definitions = options.definitions || {};

  if (process.argv.some(arg => arg === '--debug-inno')) {
    definitions['Debug'] = 'true';
  }

  if (process.argv.some(arg => arg === '--sign')) {
    definitions['Sign'] = 'true';
  }

  const keys = Object.keys(definitions);
  const defs = keys.map(key => `/d${key}=${definitions[key]}`);
  const args = [iss, '/q', ...defs];
  const innoSetupPath = path.resolve(__dirname, 'bin', 'ISCC.exe');

  const child = spawn(innoSetupPath, args);
  // child.stdout.pipe(process.stdout);
  // child.stderr.pipe(process.stderr);

  let stderr = '';
  child.on('error', cb);
  child.stderr.on('data', data => {
    stderr += data;
  });
  child.on('exit', code => {
    if (code === 0) {
      if (cb) {
        cb(null);
      }
    } else {
      if (cb) {
        cb(stderr);
      }
    }
  });
}

module.exports = packageInnoSetup;
