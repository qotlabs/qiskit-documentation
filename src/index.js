// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024-2025 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

// Additional files in docs
import './docs/index.md';
import './docs/410.md';
import './learning/index.mdx';

// JavaScript stuff
import renderTopNavigation from './top_navigation.js';
import renderSideNavigation from './side_navigation.js';
import renderSearchModal from './search_modal.js';

import {topMenu} from './top_navigation.js';
import {sideMenu} from './side_navigation.js';

function render() {
  renderTopNavigation();
  renderSideNavigation();
  renderSearchModal();
}

// Observe changes in URL
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    topMenu.highlight();
    sideMenu.highlight();
  }
}).observe(document, {subtree: true, childList: true});

// Wait for hydration is finished
const renderInterval = setInterval(() => {
  const headerName = document.querySelector('.cds--header__name');
  // hydrateRoot() adds onclick event so just wait until it appears
  if (headerName && typeof headerName.onclick === 'function') {
    clearInterval(renderInterval);
    render();

    // Watchdog
    setInterval(() => {
      if (!document.querySelector('.cds--header__nav')) {
        render();
      }
    }, 1000);
  }
}, 100);
