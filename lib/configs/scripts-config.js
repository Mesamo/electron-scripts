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
    this.pkgJson = 'package.json';
    this.icon = 'assets/app-icon.ico';
    this.mainProcess = new MainProcessOptions(configs.mainProcess);
    this.rendererProcess = new RendererProcess(configs.rendererProcess);
    this.product = new ProductOptions(configs.product);
    overwrite(configs.pkgJson, (value) => {
      this.pkgJson = value;
    });
    overwrite(configs.icon, (value) => {
      this.icon = value;
    });
    const asarOptions = configs.asar;
    if (typeof asarOptions === 'boolean') {
      this.asar = asarOptions;
    } else {
      this.asar = new AsarOptions(configs.asar);
    }
  }
}

class AsarOptions {
  constructor(configs) {
    this.unpack = '';
    this.unpackDir = '';
    if (!configs) {
      return;
    }
    overwrite(configs.unpack, (value) => {
      this.unpack = value;
    });
    overwrite(configs.unpackDir, (value) => {
      this.unpackDir = value;
    });
  }
}

class ProductOptions {
  constructor(configs) {
    this.appId = '';
    this.name = '';
    this.version = '';
    this.dirName = '';
    this.arch = 'x64';
    this.platform = 'win32';
    this.publisher = '';
    this.copyright = '';
    if (!configs) {
      return;
    }
    overwrite(configs.appId, (value) => {
      this.appId = value;
    });
    overwrite(configs.name, (value) => {
      this.name = value;
    });
    overwrite(configs.version, (value) => {
      this.version = value;
    });
    overwrite(configs.dirName, (value) => {
      this.dirName = value;
    });
    overwrite(configs.arch, (value) => {
      this.arch = value;
    });
    overwrite(configs.publisher, (value) => {
      this.publisher = value;
    });
    overwrite(configs.copyright, (value) => {
      this.copyright = value;
    });
  }
}

class MainProcessOptions {
  constructor(configs) {
    this.main = 'src/main.ts';
    this.preload = '';
    this.tsConfig = 'tsconfig.json';
    this.tslint = 'tslint.json';
    if (!configs) {
      return;
    }
    overwrite(configs.main, (value) => {
      this.main = value;
    });
    overwrite(configs.preload, (value) => {
      this.preload = value;
    });
    overwrite(configs.tsConfig, (value) => {
      this.tsConfig = value;
    });
    overwrite(configs.tslint, (value) => {
      this.tslint = value;
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
