const execSync = require('child_process').execSync;

const DEFAULT_REGISTRY = '';

exports.getNpmRegistry = function() {
  const registry = execSync('npm config get registry', { stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .replace(/\n$/, '');

  return registry || DEFAULT_REGISTRY;
};
