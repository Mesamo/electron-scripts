const paths = require('../paths');
const configs = require('./scripts-config');
const resolveFromApp = require('../utils/resolveFromApp');

const entryFile = resolveFromApp(configs.compilation.mainProcess.main);
const tsConfigFile = resolveFromApp(configs.compilation.mainProcess.tsConfig);
const tslintFile = resolveFromApp(configs.compilation.mainProcess.tslint);

const entryFiles = {
  main: entryFile
};

if (configs.compilation.mainProcess.preload) {
  entryFiles.preload = resolveFromApp(configs.compilation.mainProcess.preload);
}

module.exports = {
  entry: entryFiles,
  devtool: 'source-map',
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
    filename: '[name].js'
  }
};
