const { crossSpawn, TaskTimer } = require('@mesamo/es-dev-utils');

exports.installDependencies = async function(dir) {
  const taskTimer = new TaskTimer('Install Dependencies');

  return new Promise((resolve, reject) => {
    taskTimer.start();
    const child = crossSpawn('npm', ['i'], { stdio: 'inherit', cwd: dir });
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error('Install Dependencies Error.'));
        return;
      }
      taskTimer.finish();
      resolve();
    });

    child.on('error', error => {
      console.log(error);
      taskTimer.error();
      reject(new Error('Install Dependencies Error.'));
    });
  });
};
