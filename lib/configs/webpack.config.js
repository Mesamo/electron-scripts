const paths = require('../paths');

module.exports = {
  entry: './template/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: paths.tsConfig
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
    path: paths.appOut,
    filename: 'main.js'
  }
};
