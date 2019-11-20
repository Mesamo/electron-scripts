const spawn = require('child_process').spawn;
const path = require('path');

function signFile(options, cb) {
  options = options || {};
  const { pfxFile, pfxPwd, file } = options;
  const singTool = path.resolve(__dirname, 'lib', 'signtool.exe');

  const args = ['sign', '/f', pfxFile, '/p', pfxPwd, file];
  const child = spawn(singTool, args);
  // child.stdout.pipe(process.stdout);
  // child.stderr.pipe(process.stderr);

  let stderr = '';
  child.on('error', cb);
  child.stderr.on('data', data => {
    stderr += data;
  });
  child.on('exit', code => {
    if (code === 0) {
      if (cb) {
        cb(null);
      }
    } else {
      if (cb) {
        cb(stderr);
      }
    }
  });
}

async function signTool(options) {
  return new Promise((resolve, reject) => {
    signFile(options, (error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve();
      }
    });
  });
}

module.exports = signTool;
