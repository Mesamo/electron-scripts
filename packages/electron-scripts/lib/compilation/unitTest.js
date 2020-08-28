const jest = require('jest');

const paths = require('../paths');

function unitTest() {
  jest.runCLI(
    {
      preset: 'ts-jest',
      testEnvironment: 'node'
    },
    [paths.appPath]
  );
}

module.exports = unitTest;
