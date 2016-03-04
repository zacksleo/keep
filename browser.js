'use strict';
window.addEventListener('DOMContentLoaded', handleLoad, false);

function handleLoad() {
  if (!isKeep()) return;
  const searchContainer = document.querySelector('.gb_Xd');
  const faceContainer = document.querySelector('.gb_6a');
  const faceAnchor = document.querySelector('.gb_4a');
  searchContainer.style.paddingLeft = '80px';
  faceContainer.style.paddingLeft = '0';
  faceContainer.parentNode.style.minWidth = 'auto';
  faceAnchor.href = '#';

  const elements = [
    document.querySelector('.gb_Ib'),
    document.querySelector('.gb_ea'),
    document.querySelector('.gb_ic'),
    faceContainer.querySelector('.gb_ab'),
    faceContainer.querySelector('.gb_bb'),
    faceContainer.querySelector('.gb_cb')
  ];

  elements.forEach(element => {
    element.remove();
  });
}

function isKeep() {
  return window.location.hostname === 'keep.google.com';
}
