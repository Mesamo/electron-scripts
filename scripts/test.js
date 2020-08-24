const rawArgs = process.argv.slice(2);

const jestArgs = [
  '--env', 'node',
  '--runInBand',
  ...rawArgs
];

require('jest').run(jestArgs);
