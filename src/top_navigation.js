// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

const navElement = `
<nav class="cds--header__nav" aria-label="IBM Documentation">
  <ul
    class="cds--header__menu-bar"
    role="menubar"
    aria-label="IBM Documentation"
  >
    <li role="none">
      <a
        href="/start"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">Start</span>
      </a>
    </li>
    <li role="none">
      <a
        href="/build"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">Build</span>
      </a>
    </li>
    <li role="none">
      <a
        href="/transpile"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">Transpile</span>
      </a>
    </li>
    <li role="none">
      <a
        href="/verify"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">Verify</span>
      </a>
    </li>
    <li role="none">
      <a
        href="/run"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">Run</span>
      </a>
    </li>
    <li class="cds--header__submenu" role="none">
      <button
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="radix-:R1k6ta:"
        aria-label="API Reference"
        class="relative text-body-compact-01 flex items-center h-full whitespace-nowrap px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline text-text-secondary bg-background"
      >
        API Reference
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          class="cds--header__menu-arrow"
        >
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
        </svg>
      </button>
    </li>
  </ul>
</nav>`;

const divLgHidden = '<div class="lg:hidden" id="lg-hidden"></div>';

const apiReferencesListElement = `
<ul
  id="radix-:R1s6ta:"
  role="menu"
  class="flex cds--header__menu m-0 p-0 flex-col bg-layer min-w-[200px] shadow-[0_0_6px_-1px_var(--cds-shadow)] api-references-list"
  tabindex="0"
  style="outline: none"
>
  <li class="" role="none">
    <a
      role="menuitem"
      class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary"
      tabindex="0"
      data-radix-collection-item=""
      href="/api/qiskit"
    >
      <span class="truncate">Qiskit SDK</span>
    </a>
  </li>
  <li class="" role="none">
    <a
      role="menuitem"
      class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary"
      tabindex="0"
      data-radix-collection-item=""
      href="/api/qiskit-ibm-runtime"
    >
      <span class="truncate">Qiskit Runtime IBM Client</span>
    </a>
  </li>
  <li class="" role="none">
    <a
      role="menuitem"
      class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary"
      tabindex="0"
      data-radix-collection-item=""
      href="/api/qiskit-transpiler-service"
    >
      <span class="truncate">Qiskit Transpiler Service Client</span>
    </a>
  </li>
  <li class="" role="none">
    <a
      role="menuitem"
      class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary"
      tabindex="0"
      data-radix-collection-item=""
      href="/api/qiskit-ibm-provider"
    >
      <span class="truncate">Qiskit IBM Provider (deprecated)</span>
    </a>
  </li>
  <li class="" role="none">
    <a
      role="menuitem"
      class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary"
      tabindex="0"
      data-radix-collection-item=""
      href="/api/migration-guides"
    >
      <span class="truncate">Migration guides</span>
    </a>
  </li>
</ul>`;

const headerGlobalElement = `
<div class="cds--header__global">
  <span
    class="cds--popover-container cds--popover--caret cds--popover--high-contrast cds--popover--bottom cds--tooltip cds--icon-tooltip"
  >
    <div class="cds--tooltip-trigger__wrapper">
      <button
        aria-label="Search"
        aria-labelledby="tooltip-:Rae6ta:"
        class="cds--btn--icon-only cds--header__action cds--btn cds--btn--primary cds--btn--icon-only cds--btn cds--btn--primary"
        type="button"
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,
          5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"
          ></path>
        </svg>
      </button>
    </div>
    <span
      aria-hidden="true"
      id="tooltip-:Rae6ta:"
      role="tooltip"
      class="cds--popover"
    >
      <span class="cds--popover-content cds--tooltip-content">Search</span>
      <span class="cds--popover-caret"></span>
    </span>
  </span>
</div>`;

function activateSubmenu(submenu, active) {
  const button = submenu.querySelector('button');
  button.classList.toggle('text-text-primary', active);
  button.classList.toggle('text-text-secondary', !active);
  if (active) {
    submenu.className = `cds--header__submenu after:absolute after:bottom-0
      after:w-full after:bg-border-interactive after:h-[3px]`;
  } else {
    submenu.className = 'cds--header__submenu';
  }
}

export function setActiveLink() {
  // Unactivate old link
  const currentNavLink = document.querySelector(
    '.cds--header__menu-item--current'
  );
  if (currentNavLink) {
    currentNavLink.className = 'cds--header__menu-item';
  }

  // Activate new link
  const headerSubmenu = document.querySelector('.cds--header__submenu');
  if (location.pathname.match('/api/')) {
    activateSubmenu(headerSubmenu, true);
  } else {
    activateSubmenu(headerSubmenu, false);
    const activeLink = document.querySelector(
      `.cds--header__menu-item[href="/${location.pathname.split('/')[1]}"]`
    );
    if (activeLink) {
      activeLink.classList.add(
        'cds--header__menu-item--current',
        '!text-text-primary'
      );
    }
  }
}

function toggleMenu(button, open) {
  const wasOpened = button.getAttribute('aria-expanded') === 'true';
  if (open === undefined) open = !wasOpened;
  if (open === wasOpened) return;

  button.setAttribute('aria-expanded', open);
  button.classList.toggle('bg-layer', open);
  button.classList.toggle('bg-background', !open);
  if (open) {
    button.parentElement.insertAdjacentHTML(
      'beforeend',
      apiReferencesListElement
    );
  } else {
    button.nextElementSibling.outerHTML = '';
  }

  if (location.pathname.match('/api/')) {
    activateSubmenu(button.parentElement, !open);
  }
}

export default function render() {
  const header = document.querySelector('.cds--header');
  header.insertAdjacentHTML('beforeend', navElement);
  header.insertAdjacentHTML('beforeend', divLgHidden);
  header.insertAdjacentHTML('beforeend', headerGlobalElement);

  setActiveLink();

  const apiReferenceButton = document.querySelector(
    'button[aria-label="API Reference"]'
  );
  apiReferenceButton.addEventListener('click', () => {
    toggleMenu(apiReferenceButton);
  });
  document.body.addEventListener('click', (event) => {
    if (event.target !== apiReferenceButton) {
      toggleMenu(apiReferenceButton, false);
    }
  });
}
