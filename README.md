# Electron Scripts

![Build Status][win-build] ![Super Linter][super-lint] [![NPM version][npm-version]][npm] [![NPM downloads][npm-download]][npm]

Configuration and scripts for create electron app.

## 📚 Document

* Coming soon

## ✨ Features

* Quickly create an Electron app
* The Main process supports Typescript
* Multi platform
* Use Inno Setup to package Windows Installer

## 📦 Install

```sh
npm i @mesamo/electron-scripts -D
```

## 🔨 Usage

### Create the project

npx

```bash
npx @mesamo/create-electron-app my-electron-app
```

npm

```bash
npm init @mesamo/electron-app my-electron-app
```

yarn

```bash
yarn create @mesamo/electron-app my-electron-app
```

### Runs the project in development mode

```bash
electron-scripts start
```

### Builds the app for production to the build folder

```bash
electron-scripts build
```

### Run unit tests

```bash
electron-scripts test
```

## 🤝 Contributing

We welcome all contributions, please read our CONTRIBUTING.md first,  
let's build a better CLI Tools library together.

## ✅ License

[MIT](https://github.com/Mesamo/electron-scripts/blob/development/LICENSE)

[npm]: https://www.npmjs.com/package/@mesamo/electron-scripts

[win-build]: https://github.com/Mesamo/electron-scripts/workflows/Windows%20Build/badge.svg

[npm-version]: https://img.shields.io/npm/v/@mesamo/electron-scripts.svg

[npm-download]: https://img.shields.io/npm/dm/@mesamo/electron-scripts.svg?style=flat

[super-lint]: https://github.com/Mesamo/electron-scripts/workflows/Super%20Linter/badge.svg
