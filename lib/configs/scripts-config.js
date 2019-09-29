const paths = require('../paths');

const config = require(paths.config);

function overwrite(param, callback) {
  if (param) {
    callback(param);
  }
}

class ScriptOptions {
  constructor(configs) {
    this.compilation = new CompilationOptions(config.compilation);
    this.download = new DownloadOptions(configs.download);
  }
}

class CompilationOptions {
  constructor(configs) {
    this.mainProcess = new MainProcessOptions(configs.mainProcess);
    this.rendererProcess = new RendererProcess(configs.rendererProcess);
  }
}

class MainProcessOptions {
  constructor(configs) {
    this.main = 'src/main.ts';
    this.tsConfig = 'tsconfig.json';
    if (!configs) {
      return;
    }
    overwrite(configs.main, (value) => {
      this.main = value;
    });
    overwrite(configs.tsConfig, (value) => {
      this.tsConfig = value;
    });
  }
}

class RendererProcess {
  constructor(configs) {
    this.projects = 'renderer';
    if (!configs) {
      return;
    }
    overwrite(configs.projects, (value) => {
      this.projects = value;
    });
  }
}

class DownloadOptions {
  constructor(configs) {
    this.mirror = '';
    if (!configs) {
      return;
    }
    overwrite(configs.mirror, (value) => {
      this.mirror = value;
    });
  }
}

module.exports = new ScriptOptions(config);
