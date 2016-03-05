'use strict';
window.addEventListener('DOMContentLoaded', handleLoad, false);

function handleLoad() {
  if (!isKeep()) return;
  const searchContainer = document.querySelector('.gb_Xd');
  const accountContainer = document.querySelector('.gb_9a');
  const faceContainer = document.querySelector('.gb_6a');
  const faceAnchor = document.querySelector('.gb_4a');
  const labelChangeButton = document.querySelector('.DyVDA-x00ATb');
  searchContainer.style.paddingLeft = '80px';
  accountContainer.style.minWidth = 'auto';
  labelChangeButton.style.top = '10px';
  faceContainer.style.paddingLeft = '0';
  faceContainer.parentNode.style.minWidth = 'auto';
  faceAnchor.href = '#';

  const elements = [
    document.querySelector('.gb_Ib'),
    document.querySelector('.gb_ea'),
    document.querySelector('.gb_ic'),
    document.querySelector('.hSRGPd-haAclf'),
    document.querySelector('.neVct-SX9D7d-ornU0b'),
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
