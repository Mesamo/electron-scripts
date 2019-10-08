#!/usr/bin/env node

process.on('unhandledRejection', error => {
  throw error;
});

const spawn = require('cross-spawn');
const args = process.argv.splice(2);

const scriptIndex = args.findIndex(
  x => x === 'init' || x === 'build' || x === 'start' || x === 'test' || x === 'version'
);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.splice(0, scriptIndex) : [];

switch (script) {
  case 'init':
  case 'build':
  case 'start':
  case 'test':
  case 'version': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );
    process.exit(result.status);
  }
  default:
    console.log(`Unknown script "${script}".`);
    break;
}
