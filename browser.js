'use strict';
const ipc = require('electron').ipcRenderer;

function isKeep() {
  return window.location.hostname === 'keep.google.com';
}

function handleDOMLoaded() {
  if (!isKeep()) return;

  document.styleSheets[0].insertRule(`
    #ognwrapper {
      -webkit-app-region: drag;
    }
  `, 0);

  document.styleSheets[0].insertRule(`
    #ognwrapper form,
    #ognwrapper [role="menu"],
    #ognwrapper [role="button"] {
      -webkit-app-region: no-drag;
    }
  `, 0);

  document.styleSheets[0].insertRule(`
    ::-webkit-scrollbar {
      display: none !important;
    }
  `, 0);
}

function handleClick(event) {
  const node = event.target;

  if (node.nodeName === 'A' && node.target === '_blank') {
    event.preventDefault();
    ipc.send('clicklink', node.href);
  }
}

function handleNavigate(event, hash) {
  window.location.hash = hash;
}

window.addEventListener('DOMContentLoaded', handleDOMLoaded, false);
window.addEventListener('click', handleClick, false);
ipc.on('navigate', handleNavigate);
