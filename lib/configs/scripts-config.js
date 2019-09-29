const paths = require('../paths');
const resolveFromApp = require('../utils/resolveFromApp');

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
    this.main = resolveFromApp('src/main.ts');
    this.tsConfig = resolveFromApp('tsconfig.json');
    if (!configs) {
      return;
    }
    overwrite(configs.main, (value) => {
      this.main = resolveFromApp(value);
    });
    overwrite(configs.tsConfig, (value) => {
      this.tsConfig = resolveFromApp(value);
    });
  }
}

class RendererProcess {
  constructor(configs) {
    this.dir = resolveFromApp('renderer');
    this.index = 'index.html';
    this.exclude = [];
    if (!configs) {
      return;
    }
    overwrite(configs.dir, (value) => {
      this.dir = resolveFromApp(value);
    });
    overwrite(configs.index, (value) => {
      this.index = value;
    });
    overwrite(configs.exclude, (value) => {
      this.exclude = value;
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
