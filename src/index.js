// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

// Additional files in docs
import './index.md'

// JavaScript stuff
import renderTopNavigation from './top_navigation.js'
import renderSideNavigation from './side_navigation.js'
import renderSearchModal from './search_modal.js'

import { setActiveLink } from './top_navigation.js'

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
    setActiveLink();
  }
}).observe(document, {subtree: true, childList: true});

// Wait for hydration is finished
const customInterval = setInterval(() => {
  const headerName = document.querySelector('.cds--header__name');
  // hydrateRoot() adds onclick event so just wait until it appears
  if (headerName && typeof headerName.onclick === 'function') {
    clearInterval(customInterval);
    render();
  }
}, 100);

// Watchdog
setInterval(() => {
  if (!document.querySelector('.cds--header__nav')) {
    render();
  }
}, 1000);
