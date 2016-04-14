'use strict';
const app = require('electron').app;
const Configstore = require('configstore');
const pkg = require('./package.json');
const createMainMenu = require('./src/main-menu');
const createMainWindow = require('./src/main-window');

require('electron-debug')();

const config = new Configstore(pkg.name, {
  height: 768,
  width: 1024
});

let mainWindow;

function handleResize() {
  const isFullScreen = mainWindow.isFullScreen();
  const bounds = mainWindow.getBounds();

  if (isFullScreen) {
    config.set('fullscreen', true);
  } else {
    config.set('height', bounds.height);
    config.set('width', bounds.width);
    config.del('fullscreen');
  }
}

function handleClosed() {
  mainWindow = null;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow(config, { handleResize, handleClosed });
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow(config, { handleResize, handleClosed });
  createMainMenu();
});
