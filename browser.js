'use strict';
const ipc = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', handleDOMLoaded, false);
ipc.on('navigate', handleNavigate);

function handleDOMLoaded() {
  if (!isKeep()) return;

  const wrapper = document.querySelector('#og-nwrapper');
  const notesLine = document.querySelector('.notes-container > :first-child > :first-child');
  const searchForm = wrapper.querySelector('form');

  const searchLine = document.createElement('div');
  searchLine.className = 'search-container';
  searchLine.appendChild(searchForm);

  const colorLine = document.createElement('div');
  colorLine.className = 'color-container';

  Array.from(notesLine.childNodes).forEach(node => {
    colorLine.appendChild(node);
  });

  // colorLine.appendChild(searchLine);

  const fragrment = document.createDocumentFragment();
  fragrment.appendChild(colorLine);

  wrapper.remove();
  notesLine.appendChild(fragrment);
  colorLine.childNodes[3].style.top = '45px';

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

function isKeep() {
  return window.location.hostname === 'keep.google.com';
}

function handleNavigate(event, hash) {
  window.location.hash = hash;
}
