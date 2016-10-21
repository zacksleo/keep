'use strict';
const ipc = require('electron').ipcRenderer;

function isKeep() {
  return window.location.hostname === 'keep.google.com';
}

function handleDOMLoaded() {
  if (!isKeep()) return;

  document.styleSheets[0].insertRule(`
    #og-nwrapper {
      display: none !important;
    }
  `, 0);

  document.styleSheets[0].insertRule(`
    .notes-container {
      padding-top: 0 !important;
    }
  `, 0);

  document.styleSheets[0].insertRule(`
    .search-container {
      position: absolute;
      top: 7px;
      left: 165px;
      right: 125px;
    }
  `, 0);

  document.styleSheets[0].insertRule(`
    .color-container {
      margin-left: 60px;
      position: relative;
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
