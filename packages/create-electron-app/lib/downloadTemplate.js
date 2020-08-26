const got = require('got');

const { TaskTimer, Spinner, chalk } = require('@mesamo/es-dev-utils');

const { getNpmRegistry } = require('./utils/getNpmRegistry');
const { extractStream } = require('./utils/extractStream');

exports.downloadTemplate = async function(templateName, dir, options) {
  const spinner = new Spinner('Download Template...');
  const taskTimer = new TaskTimer('Download Template');
  try {
    taskTimer.start();
    spinner.start();
    console.log(`Template Name: ${chalk.green(templateName)}`);
    const registry = getNpmRegistry();
    const url = `${registry}${templateName}`;
    spinner.message(url);
    const result = await got(url).json();
    const latest = result['dist-tags'].latest;
    const pkg = result.versions[latest];
    const tarballUrl = pkg.dist.tarball;
    spinner.message(tarballUrl);
    const stream = got.stream(tarballUrl);
    await extractStream(stream, dir);
    spinner.stop();
    taskTimer.finish();
  } catch (error) {
    spinner.stop();
    taskTimer.error();
    throw new Error('Download Template Error');
  }
};
