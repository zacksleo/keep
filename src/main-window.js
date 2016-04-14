'use strict';
const join = require('path').join;
const objectAssign = require('object-assign');
const BrowserWindow = require('electron').BrowserWindow;

module.exports = function createMainWindow(config, { handleResize, handleClosed }) {
  const defaults = {
    minWidth: 615,
    icon: join(__dirname, '../assets/icon.png'),
    title: 'Keep',
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  };

  const window = new BrowserWindow(objectAssign(defaults, config.all));

  window.loadURL('https://keep.google.com');
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  return window;
};
