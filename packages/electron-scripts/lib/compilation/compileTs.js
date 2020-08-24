const webpack = require('webpack');
const chalk = require('chalk');
const { TaskTimer } = require('@mesamo/es-dev-utils');
const { Spinner } = require('@mesamo/es-dev-utils');
const formatWebpackMessages = require('../utils/formatWebpackMessages');

const spinner = new Spinner('Compile TypeScript...');
const taskTimer = new TaskTimer('Compile TypeScript');

async function compileTs(mode = 'development') {
  try {
    taskTimer.start();
    spinner.start();
    const result = await runWebpack(mode);
    spinner.stop();
    taskTimer.finish();
    // 打印编译警告
    if (result.warnings.length) {
      console.log(chalk.yellow(`\nCompiled TypeScript with warnings.\n`));
      console.log(result.warnings.join('\n\n'));
    }
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw error;
  }
}

function runWebpack(mode = 'development') {
  const options = require('../configs/webpack.config');
  options.mode = mode;
  if (mode === 'production') {
    options.devtool = false;
  }
  const compiler = webpack(options);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: []
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }

      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        warnings: messages.warnings
      };

      return resolve(resolveArgs);
    });
  });
}

module.exports = compileTs;
