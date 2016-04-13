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
  width: 1024
});

let mainWindow;

function handleResize() {
  const isFullScreen = mainWindow.isFullScreen();
  const bounds = mainWindow.getBounds();

  if (isFullScreen) {
    conf.set('fullscreen', true);
  } else {
    conf.set('height', bounds.height);
    conf.set('width', bounds.width);
    conf.del('fullscreen');
  }
}

function handleClosed() {
  mainWindow = null;
}

function createMainWindow() {
  const defaults = {
    minWidth: 615,
    icon: `${__dirname}/assets/icon.png`,
    title: 'Keep',
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  };

  const opts = objectAssign(defaults, conf.all);
  const window = new BrowserWindow(opts);

  window.loadURL('https://keep.google.com');
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  return window;
}

function createMenu() {
  const template = [
    {
      label: 'Keep',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Keep',
          accelerator: 'Cmd+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Alt+Cmd+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
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
          accelerator: 'Ctrl+Cmd+F',
          click: (item, win) => {
            if (win) win.setFullScreen(!win.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Cmd+I',
          click: (item, win) => {
            if (win) win.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        {
          type: 'separator'
        },
        {
          label: 'Notes',
          accelerator: 'CmdOrCtrl+1',
          click: (item, win) => {
            win.webContents.send('navigate', 'home');
          },
          type: 'radio',
          checked: true
        },
        {
          label: 'Reminders',
          accelerator: 'CmdOrCtrl+2',
          click: (item, win) => {
            win.webContents.send('navigate', 'reminders');
          },
          type: 'radio'
        },
        {
          label: 'Archive',
          accelerator: 'CmdOrCtrl+3',
          click: (item, win) => {
            win.webContents.send('navigate', 'archive');
          },
          type: 'radio'
        },
        {
          label: 'Trash',
          accelerator: 'CmdOrCtrl+4',
          click: (item, win) => {
            win.webContents.send('navigate', 'trash');
          },
          type: 'radio'
        }
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
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

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
