// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import {
  uid,
  createElement,
  matchSection,
  menuStruct,
  arrowIconHtml,
} from './common.js';

const headerGlobalHtml = `
  <div class="lg:hidden" id="lg-hidden"></div>
  <div class="cds--header__global">
	  <span class="cds--popover-container cds--popover--caret cds--popover--high-contrast cds--popover--bottom cds--tooltip cds--icon-tooltip">
	  	<div class="cds--tooltip-trigger__wrapper">
	  		<button aria-label="Open search dialog" aria-labelledby="tooltip-:Raloqkvfa:" class="lg:hidden cds--header__action cds--btn cds--btn--lg cds--layout--size-lg cds--btn--ghost cds--btn--icon-only" type="button">
	  			<svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
	  				<path d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"></path>
	  			</svg>
	  		</button>
	  	</div>
	  	<span aria-hidden="true" id="tooltip-:Raloqkvfa:" role="tooltip" class="cds--popover">
	  		<span class="cds--popover-content cds--tooltip-content">Open search dialog</span>
	  		<span class="cds--popover-caret"></span>
	  	</span>
	  </span>
	  <div class="hidden lg:block border-solid border-y-0 border-x border-border-subtle ml-[-1px]">
	  	<button aria-label="Open search dialog" class="h-full items-center text-text-secondary hover:text-text-primary max:w-[180px] cds--btn cds--btn--lg cds--layout--size-lg cds--btn--ghost" type="button">
	  		<svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" class="!fill-icon-secondary group-hover:!fill-icon-primary" xmlns="http://www.w3.org/2000/svg">
	  			<path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"></path>
	  		</svg>
	  		<span class="flex-1 mx-[16px]">Search</span>
	  	</button>
	  </div>
</div>`;

class Menu {
  static rootHtml() {
    return `
    <nav class="cds--header__nav" aria-label="IBM Documentation">
      <ul
        class="cds--header__menu-bar"
        role="menubar"
        aria-label="IBM Documentation"
      >
      </ul>
    </nav>`;
  }

  constructor(menuStruct, parent) {
    this.parent = parent;
    this.root = createElement(Menu.rootHtml());
    this.menu = this.root.querySelector('ul');
    this.items = [];
    for (const dict of menuStruct) {
      const ItemType = dict.hasOwnProperty('children') ? Submenu : MenuItem;
      this.items.push(new ItemType(dict, this.menu));
    }
    this.parent.appendChild(this.root);
    this.highlight();
  }

  highlight() {
    for (const item of this.items) {
      item.highlight();
    }
  }
}

class MenuItem {
  static rootHtml(title, url) {
    return `
    <li role="none">
      <a
        href="${url}"
        role="menuitem"
        tabindex="0"
        class="cds--header__menu-item"
      >
        <span class="cds--text-truncate--end">${title}</span>
      </a>
    </li>`;
  }

  constructor(dict, parent) {
    this.parent = parent;
    this.root = createElement(MenuItem.rootHtml(dict.title, dict.url));
    this.anchor = this.root.querySelector('a');
    this.parent.appendChild(this.root);
  }

  highlight() {
    const url = location.pathname;
    if (matchSection(this.anchor.getAttribute('href'), url)) {
      this.anchor.className = 'cds--header__menu-item cds--header__menu-item--current !text-text-primary';
    } else {
      this.anchor.className = 'cds--header__menu-item';
    }
  }
}

class Submenu {
  // Open/close button in the header
  static rootHtml(title, ariaControls) {
    return `
    <li class="cds--header__submenu" role="none">
      <button
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="${ariaControls}"
        aria-label="${title}"
        class="relative text-body-compact-01 flex items-center h-full whitespace-nowrap px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline text-text-secondary bg-background"
      >
        ${title}
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
    </li>`;
  }

  // Pulldown menu
  static menuHtml(id) {
    return `
    <ul
      id="${id}"
      role="menu"
      class="flex cds--header__menu m-0 p-0 flex-col bg-layer min-w-[200px] shadow-[0_0_6px_-1px_var(--cds-shadow)] absolute left-0"
      tabindex="0"
      style="outline: none"
    >
    </ul>`;
  }

  // Clickable item in the menu
  static itemHtml(title, url) {
    const externalUrl = !url.startsWith('/');
    // prettier-ignore
    return `
    <li class="" role="none">
      <a
        role="menuitem"
        class="text-link-primary no-underline hover:underline inline text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors hover:bg-background-hover hover:text-text-primary border-transparent focus-outline bg-layer text-text-secondary hover:no-underline"
        tabindex="0"
        data-radix-collection-item=""
        href="${url}"
        ${externalUrl ? 'target="_blank" rel="noopener noreferrer nofollow"' : ''}
      >
        <span class="truncate">${title}</span>
        ${externalUrl ? arrowIconHtml('inline ml-2 mt-[1%]') : ''}
      </a>
    </li>`;
  }

  constructor(dict, parent) {
    const id = uid();
    this.highlighted = false;
    this.parent = parent;
    this.root = createElement(Submenu.rootHtml(dict.title, id));
    this.button = this.root.querySelector('button');
    this.menu = createElement(Submenu.menuHtml(id));
    for (const child of dict.children) {
      const item = createElement(Submenu.itemHtml(child.title, child.url));
      this.menu.appendChild(item);
    }
    this.parent.appendChild(this.root);

    this.button.addEventListener('click', () => this.toggle());
    document.body.addEventListener('click', (event) => {
      if (event.target !== this.button) {
        this.toggle(false);
      }
    });
  }

  get isOpened() {
    return this.button.getAttribute('aria-expanded') === 'true';
  }

  toggle(open) {
    const wasOpened = this.isOpened;
    if (open === undefined) open = !wasOpened;
    if (open === wasOpened) return;

    this.button.setAttribute('aria-expanded', open);
    this.button.classList.toggle('bg-layer', open);
    this.button.classList.toggle('bg-background', !open);
    this.highlightButton(this.highlighted & !open);
    if (open) {
      this.root.appendChild(this.menu);
    } else {
      this.menu.remove();
    }
  }

  highlight() {
    const url = location.pathname;
    let someOn = false;
    for (const item of this.menu.children) {
      const anchor = item.querySelector('a');
      const on = matchSection(anchor.getAttribute('href'), url);
      if (on) {
        item.className = `relative after:absolute after:w-[3px] after:left-0
        after:top-0 after:bg-border-interactive after:h-full`;
      } else {
        item.className = '';
      }
      anchor.classList.toggle('bg-layer-selected', on);
      anchor.classList.toggle('text-text-primary', on);
      anchor.classList.toggle('bg-layer', !on);
      anchor.classList.toggle('text-text-secondary', !on);
      someOn |= on;
    }
    this.highlightButton(someOn & !this.isOpened);
    this.highlighted = someOn;
  }

  highlightButton(on) {
    this.button.classList.toggle('text-text-primary', on);
    this.button.classList.toggle('text-text-secondary', !on);
    if (on) {
      this.root.className = `cds--header__submenu after:absolute after:bottom-0
        after:w-full after:bg-border-interactive after:h-[3px]`;
    } else {
      this.root.className = 'cds--header__submenu';
    }
  }
}

export let topMenu;

export default function render() {
  const header = document.querySelector('.cds--header');
  topMenu = new Menu(menuStruct, header);
  header.insertAdjacentHTML('beforeend', headerGlobalHtml);
}
