'use strict';
const app = require('electron').app;
const shell = require('electron').shell;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;
const Configstore = require('configstore');
const objectAssign = require('object-assign');
const pkg = require('./package.json');
require('electron-debug')();

const conf = new Configstore(pkg.name, {
  height: 768,
  width: 1024,
  fullscreen: false
});

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
  createMenu();
});

function createMainWindow() {
  const defaults = {
    fullscreenable: true,
    minWidth: 615,
    icon: `${__dirname}/assets/icon.png`,
    preload: `${__dirname}/browser.js`,
    title: 'Keep',
    titleBarStyle: 'hidden-inset'
  };

  const opts = objectAssign(defaults, conf.all);
  const mainWindow = new BrowserWindow(opts);
  mainWindow.loadURL('https://keep.google.com');
  mainWindow.on('resize', handleResize);
  mainWindow.on('closed', handleClosed);
  return mainWindow;
}

function handleResize() {
  const isMaximized = mainWindow.isMaximized();
  const bounds = mainWindow.getBounds();

  if (!isMaximized) {
    conf.set('height', bounds.height);
    conf.set('width', bounds.width);
  }

  conf.set('fullscreen', isMaximized);
}

function handleClosed() {
  mainWindow = null;
}

function createMenu() {
  const template = [
    {
      label: 'Keep',
      submenu: [
        { label: 'Services', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Hide Keep', accelerator: 'Command+H', role: 'hide' },
        { label: 'Hide Others', accelerator: 'Command+Alt+H', role: 'hideothers' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, win) => {
            if (win) win.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: (item, win) => {
            if (win) win.setFullScreen(!win.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: (item, win) => {
            if (win) win.webContents.toggleDevTools();
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'View on GitHub',
          click: () => {
            shell.openExternal('http://github.com/andrepolischuk/keep');
          }
        },
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
