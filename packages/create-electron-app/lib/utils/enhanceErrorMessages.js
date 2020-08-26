const { commander } = require('@mesamo/es-dev-utils');

module.exports = (methodName, log) => {
  commander.Command.prototype[methodName] = function(...args) {
    log(...args);
    process.exit(1);
  };
};
