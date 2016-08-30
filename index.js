'use strict';
const app = require('electron').app;
const config = require('./src/config');
const createMainMenu = require('./src/menu');
const createMainWindow = require('./src/window');

require('electron-debug')();

let mainWindow;

function handleResize() {
  if (!mainWindow.isFullScreen()) {
    config.set('lastWindowState', mainWindow.getBounds());
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
    mainWindow = createMainWindow(handleResize, handleClosed);
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow(handleResize, handleClosed);
  createMainMenu();
});
