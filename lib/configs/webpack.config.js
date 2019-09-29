// const TslintPlugin = require('tslint-webpack-plugin');

const paths = require('../paths');
const configs = require('./scripts-config');
const resolveFromApp = require('../utils/resolveFromApp');

const entryFile = resolveFromApp(configs.compilation.mainProcess.main);
const tsConfigFile = resolveFromApp(configs.compilation.mainProcess.tsConfig);
const tslintFile = resolveFromApp(configs.compilation.mainProcess.tslint);

module.exports = {
  entry: entryFile,
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: tslintFile
              /* Loader options go here */
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfigFile
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  target: 'electron-main',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: paths.mainOutput,
    filename: 'main.js'
  }
  // plugins: [
  //   new TslintPlugin({
  //     files: ['*/src/**/*.ts'],
  //     project: tslintFile,
  //     silent: false,
  //     waitForLinting: true,
  //     warningsAsError: false
  //   })
  // ]
};
