const webpack = require('webpack');
const clui = require('clui');
const TaskTimer = require('../utils/task-timer');
const formatWebpackMessages = require('../utils/formatWebpackMessages');

const Spinner = clui.Spinner;
const spinner = new Spinner('Compile TypeScript...');
const taskTimer = new TaskTimer('Compile TypeScript');

async function compileTs() {
  try {
    taskTimer.start();
    spinner.start();
    await runWebpack();
    spinner.stop();
    taskTimer.finish();
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw error;
  }
}

function runWebpack() {
  const options = require('../configs/webpack.config');
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

      if (messages.warnings.length) {
        return reject(new Error(messages.warnings));
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
