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

  // keys.forEach(key =>
  //   assert(
  //     typeof definitions[key] === 'string',
  //     `Missing value for '${key}' in Inno Setup package step`
  //   )
  // );

  const defs = keys.map(key => `/d${key}=${definitions[key]}`);
  const args = [
    iss,
    ...defs
  ];

  if (!(options && options.verbose)) {
    args.push('/q');
  }

  const innoSetupPath = path.resolve(__dirname, 'bin', 'ISCC.exe');

  spawn(innoSetupPath, args, { stdio: ['ignore', 'inherit', 'inherit'] })
    .on('error', cb)
    .on('exit', () => cb(null));
}

module.exports = packageInnoSetup;
