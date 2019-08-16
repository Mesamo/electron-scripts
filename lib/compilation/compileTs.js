
const webpack = require('webpack');
const formatWebpackMessages = require('../utils/formatWebpackMessages');

function compileTs() {
  console.log('Starting build task...');
  const options = require('../lib/webpack.config');
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

      // if (messages.warnings.length) {
      //   return reject(new Error(messages.warnings));
      // }

      const resolveArgs = {
        stats,
        warnings: messages.warnings
      };

      return resolve(resolveArgs);
    });
  });
}

module.exports = compileTs;
