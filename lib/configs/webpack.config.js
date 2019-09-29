const paths = require('../paths');
const configs = require('./scripts-config');

module.exports = {
  entry: configs.compilation.mainProcess.main,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: configs.compilation.mainProcess.tsConfig
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
};
