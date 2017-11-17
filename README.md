# keep [![Build Status][travis-image]][travis-url]

> Desktop app for [Google Keep][google-keep] packaged with [Electron][electron]

![](screenshot.png)

## Install

```sh
git clone https://github.com/andrepolischuk/keep
cd keep
npm install
```

If you use Ubuntu or Debian, you also may need to install `nodejs-legacy` that creates `node` symlink.

```sh
sudo apt-get install nodejs-legacy
```

## Run

```sh
npm start
```

## Build

Build the application for specified platform:

```sh
npm run build:macos
npm run build:linux
npm run build:windows
```

## License

[UNLICENSE][unlicense]

[travis-url]: https://travis-ci.org/andrepolischuk/keep
[travis-image]: https://travis-ci.org/andrepolischuk/keep.svg?branch=master

[google-keep]: https://keep.google.com
[electron]: http://electron.atom.io
[unlicense]: http://unlicense.org
