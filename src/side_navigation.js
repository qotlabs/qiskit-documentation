// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import {
  createElement,
  menuStruct,
  fetchToc,
  uid,
  matchSection,
  semverCompare,
  parseUrl,
} from './common';

class HamburgerButton {
  static openIconHtml() {
    return `
    <path
      d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2 7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"
    ></path>`;
  }

  static closeIconHtml() {
    return `
    <path
      d="M17.4141 16L24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"
    ></path>`;
  }

  static buttonHtml() {
    return `
    <button
      aria-expanded="false"
      aria-label="Open menu"
      class="cds--header__action cds--header__menu-trigger cds--header__menu-toggle cds--header__menu-toggle__hidden"
      title="Open menu"
      type="button"
    >
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        fill="currentColor"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${HamburgerButton.openIconHtml()}
      </svg>
    </button>`;
  }

  constructor(parent) {
    this.button = createElement(HamburgerButton.buttonHtml());
    this.svg = this.button.querySelector('svg');
    parent.insertAdjacentElement('afterend', this.button);
  }

  onclick(handler) {
    this.button.addEventListener('click', handler);
  }

  toggle(open) {
    const title = open ? 'Close menu' : 'Open menu';
    this.button.setAttribute('aria-expanded', open);
    this.button.setAttribute('title', title);
    this.button.setAttribute('aria-label', title);
    this.button.classList.toggle('cds--header__action--active', open);

    const icon = open
      ? HamburgerButton.closeIconHtml()
      : HamburgerButton.openIconHtml();
    this.svg.setAttribute('viewBox', open ? '0 0 32 32' : '0 0 20 20');
    this.svg.innerHTML = icon;
  }
}

class Menu {
  // Gray background overlay when menu is opened
  static overlayHtml() {
    return `
    <div
      class="z-[600] bg-overlay fixed inset-0 top-[var(--shell-header-height)]"
      style="opacity: 1"
    ></div>`;
  }

  // Side panel where menu is shown
  static panelHtml() {
    return `
    <div
      class="fixed z-[800] top-[var(--shell-header-height)] bottom-0 left-0 overflow-x-hidden overflow-y-auto w-[var(--shell-header-mobile-nav-width)] bg-background scrollbar"
      aria-label="Side Navigation"
      style="transform: none"
    >
      <div
        class="h-48 mx-16 flex items-center border-solid border-0 border-b border-border-subtle"
      >
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1 16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z"
          ></path>
          <path
            d="M5.91 15H26.080000000000002V17H5.91z"
            transform="rotate(-75 15.996 16)"
          ></path>
        </svg>
      </div>
      <h2 class="text-heading-03 text-text-primary px-16 my-16">Documentation</h2>
      <ul class="cds--side-nav__header-navigation static p-0"></ul>
    </div>`;
  }

  // Divider between menu sections
  static dividerHtml() {
    return `<li class="cds--side-nav__divider"><hr /></li>`;
  }

  constructor(menuStruct, parent) {
    this.isOpened = false;
    this.parent = parent;
    this.button = new HamburgerButton(
      document.querySelector('.cds--skip-to-content')
    );
    this.overlay = createElement(Menu.overlayHtml());
    this.panel = createElement(Menu.panelHtml());
    this.menu = this.panel.querySelector('ul');

    this.items = [];
    for (const dict of menuStruct) {
      if (dict.hasOwnProperty('children')) {
        this.appendDivider();
        for (const child of dict.children) {
          this.appendItem(child);
        }
      } else {
        this.appendItem(dict);
      }
    }

    this.button.onclick(() => this.toggle());
    this.overlay.addEventListener('click', () => this.toggle(false));
    this.highlight();
  }

  appendDivider() {
    const divider = createElement(Menu.dividerHtml());
    this.menu.appendChild(divider);
  }

  appendItem(dict) {
    const ItemType = dict.toc ? Submenu : MenuItem;
    this.items.push(new ItemType(dict, this.menu));
  }

  toggle(open) {
    if (open === undefined) open = !this.isOpened;
    if (open === this.isOpened) return;
    this.isOpened = open;

    this.button.toggle(open);
    if (open) {
      this.parent.appendChild(this.overlay);
      this.parent.appendChild(this.panel);
    } else {
      this.overlay.remove();
      this.panel.remove();
    }
  }

  highlight() {
    for (const item of this.items) {
      item.highlight();
    }
  }
}

class MenuItem {
  static itemHtml(title, url) {
    return `
    <li class="cds--side-nav__item">
      <a
        class="cds--side-nav__link"
        tabindex="0"
        href="${url}"
      >
        <span class="cds--side-nav__link-text">${title}</span>
      </a>
    </li>`;
  }

  constructor(dict, parent) {
    this.parent = parent;
    this.root = createElement(MenuItem.itemHtml(dict.title, dict.url));
    this.anchor = this.root.querySelector('a');
    this.parent.appendChild(this.root);
  }

  highlight() {
    const url = location.pathname;
    this.anchor.classList.toggle(
      'cds--side-nav__link--current',
      matchSection(this.anchor.getAttribute('href'), url)
    );
  }
}

class Submenu {
  static rootHtml(title) {
    return `
    <li class="cds--side-nav__item">
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
      >
        <span class="cds--side-nav__submenu-title" title="${title}">
          ${title}
        </span>
        <div
          class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"></path>
          </svg>
        </div>
      </button>
    </li>`;
  }

  static insetHtml() {
    return `
    <div
      class="bg-background absolute inset-0 inset-bg-element"
      style="opacity: 0.7"
    ></div>`;
  }

  static panelHtml(title) {
    return `
    <div
      class="submenu-content absolute inset-0 bg-background z-10"
      style="transform: none"
    >
      <div>
        <button
          class="h-48 w-full px-16 flex items-center text-helper-text-02 gap-4 focus-outline border-0 cursor-pointer bg-transparent text-inherit all-documentation"
          type="button"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M10 16L20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"></path>
          </svg>
          <span>All documentation</span>
        </button>
        <div
          class="mx-16 border-solid border-0 border-b border-border-subtle"
        ></div>
      </div>
      <h2 class="text-heading-03 text-text-primary px-16 my-16">
        ${title}
      </h2>
      <ul class="cds--side-nav__items pt-0 pb-16 overflow-hidden"></ul>
    </div>`;
  }

  constructor(toc, parent) {
    this.url = toc.url;
    this.parent = parent;
    this.root = createElement(Submenu.rootHtml(toc.title));
    this.button = this.root.querySelector('button');
    this.inset = createElement(Submenu.insetHtml());
    this.panel = createElement(Submenu.panelHtml(toc.title));
    this.backButton = this.panel.querySelector('button');
    this.menu = this.panel.querySelector('ul');
    if (parseUrl(this.url).package) {
      this.dropdown = new VersionDropdown(null, this.menu);
    }
    this.parent.appendChild(this.root);
    this.button.addEventListener('click', () => this.toggle());
    this.backButton.addEventListener('click', () => this.toggle(false));
  }

  get isOpened() {
    return this.button.getAttribute('aria-expanded') === 'true';
  }

  set isOpened(open) {
    this.button.setAttribute('aria-expanded', open);
  }

  getVersionedUrl() {
    let url = this.url;
    if (matchSection(url, location.pathname)) {
      const version = parseUrl(location.pathname).version;
      if (version) url += '/' + version;
    }
    return url;
  }

  async createToc() {
    const url = this.getVersionedUrl();
    if (url === this.createdTocForUrl) return;

    const toc = await fetchToc(url);
    this.dropdown?.setPackage(toc.package);
    this.menu.innerHTML = '';
    itemFactory(toc.toc, 1, 16, this.menu);
    this.createdTocForUrl = url;
  }

  async toggle(open) {
    const wasOpened = this.isOpened;
    if (open === undefined) open = !wasOpened;
    if (open === wasOpened) return;

    this.isOpened = open;
    if (open) {
      this.root.appendChild(this.inset);
      this.root.appendChild(this.panel);
      await this.createToc();
    } else {
      this.inset.remove();
      this.panel.remove();
    }
    this.highlight();
  }

  highlight() {
    const url = location.pathname;
    const needsHighlight = !this.isOpened && matchSection(this.url, url);
    this.root.classList.toggle('cds--side-nav__item--active', needsHighlight);

    this.activeItem?.classList.remove('cds--side-nav__link--current');
    this.activeItem = this.menu.querySelector(`a[href="${url}"]`);
    this.activeItem?.classList.add('cds--side-nav__link--current');
  }
}

/**
 * Construct submenu items according to the description in `toc`.
 * @param {Object} toc - table of contents object.
 * @param {int} level - level of child elements.
 * @param {int} padding - padding in pixels of child elements.
 * @param {Element} parent - parent element for appending childs.
 */
function itemFactory(toc, level, padding, parent) {
  for (const child of toc.children) {
    const hasChildren = child.hasOwnProperty('children');
    // prettier-ignore
    const ItemType =
      !hasChildren      ? ChildlessItem :
      child.collapsible ? CollapsibleItem :
                          NonCollapsibleItem;
    new ItemType(child, level, padding, parent);
  }
}

/**
 * Collapsible item inside Submenu.
 */
class CollapsibleItem {
  static rootHtml(title, level, padding) {
    return `
    <li
      class="cds--side-nav__item [&>.cds--side-nav__submenu]:![block-size:auto] [&>.cds--side-nav__submenu]:[min-block-size:2rem] [&>.cds--side-nav__submenu]:flex [&>.cds--side-nav__submenu]:gap-4 [&>.cds--side-nav__submenu]:py-[6px] [&>.cds--side-nav__submenu]:items-start [&>.cds--side-nav__submenu>span]:break-words [&>.cds--side-nav__submenu>span]:!whitespace-normal [&>.cds--side-nav__submenu>.cds--side-nav__icon]:items-baseline"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu"
        type="button"
        style="padding-left: ${padding}px;
              ${level > 1 ? 'font-weight: normal' : ''}"
      >
        <span class="cds--side-nav__submenu-title" title="${title}">${title}</span>
        <div
          class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path>
          </svg>
        </div>
      </button>
      <ul class="cds--side-nav__menu"></ul>
    </li>`;
  }

  constructor(toc, level, padding, parent) {
    this.parent = parent;
    this.level = level;
    this.root = createElement(
      CollapsibleItem.rootHtml(toc.title, level, padding)
    );
    this.button = this.root.querySelector('button');
    this.svg = this.root.querySelector('svg');
    this.menu = this.root.querySelector('ul');
    itemFactory(toc, level + 1, padding + 16, this.menu);
    this.parent.appendChild(this.root);
    this.button.addEventListener('click', () => this.toggle());
  }

  toggle(open) {
    const wasOpened = this.button.getAttribute('aria-expanded') === 'true';
    if (open === undefined) open = !wasOpened;
    if (open === wasOpened) return;

    this.button.setAttribute('aria-expanded', open);
  }
}

/**
 * Childless item (ordinary link) inside Submenu.
 */
class ChildlessItem {
  static rootHtml(title, url, level, padding) {
    return `
    <li class="cds--side-nav__item">
      <a
        class="cds--side-nav__link ![block-size:auto] !py-[6px] [&>span]:break-words [&>span]:!whitespace-normal"
        style="padding-left: ${padding}px;
               ${level > 1 ? 'font-weight: normal' : ''}"
        href="${url}"
      >
        <span class="cds--side-nav__link-text">${title}</span>
      </a>
    </li>`;
  }

  constructor(toc, level, padding, parent) {
    this.parent = parent;
    this.level = level;
    this.root = createElement(
      ChildlessItem.rootHtml(toc.title, toc.url, level, padding)
    );
    this.parent.appendChild(this.root);
  }
}

/**
 * Non-collapsible item inside Submenu.
 */
class NonCollapsibleItem {
  static rootHtml(title, level, padding) {
    return `
    <li
      class="[&>.cds--side-nav__submenu]:![block-size:auto] [&>.cds--side-nav__submenu]:[min-block-size:2rem] [&>.cds--side-nav__submenu]:flex [&>.cds--side-nav__submenu]:gap-4 [&>.cds--side-nav__submenu]:py-[6px] [&>.cds--side-nav__submenu]:items-start [&>.cds--side-nav__submenu>span]:break-words [&>.cds--side-nav__submenu>span]:!whitespace-normal [&>.cds--side-nav__submenu>.cds--side-nav__icon]:items-baseline"
    >
      <p
        aria-expanded="true"
        class="cds--side-nav__submenu hover:bg-transparent hover:text-text-secondary cursor-default"
        style="padding-left: ${padding}px;
              ${level > 1 ? 'font-weight: normal' : ''}"
      >
        <span
          class="cds--side-nav__submenu-title cursor-text select-text"
          title="${title}"
        >
          ${title}
        </span>
      </p>
      <ul class="cds--side-nav__menu"></ul>
    </li>`;
  }

  static dividerHtml() {
    return `
    <li class="cds--side-nav__divider border-t border-border-subtle-00">
      <hr>
    </li>`;
  }

  constructor(toc, level, padding, parent) {
    this.parent = parent;
    this.level = level;
    this.root = createElement(
      NonCollapsibleItem.rootHtml(toc.title, level, padding)
    );
    this.menu = this.root.querySelector('ul');
    itemFactory(toc, level + 1, padding, this.menu);
    this.divider = createElement(NonCollapsibleItem.dividerHtml());
    this.parent.appendChild(this.root);
    this.parent.appendChild(this.divider);
  }
}

/**
 * Dropdown to select version.
 */
class VersionDropdown {
  static rootHtml(id) {
    return `
    <div class="cds--form-item px-16 mb-24">
      <div class="cds--select">
        <label for="${id}" class="cds--label cds--visually-hidden" dir="auto">
          Select
        </label>
        <div class="cds--select-input__wrapper">
          <select id="${id}" class="cds--select-input" title=""></select>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
            class="cds--select__arrow"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
          </svg>
        </div>
      </div>
    </div>`;
  }

  static optionHtml(title, value) {
    return `
    <option class="cds--select-option" value="${value}">
      ${title}
    </option>`;
  }

  constructor(pack, parent) {
    this.parent = parent;
    this.root = createElement(VersionDropdown.rootHtml(uid()));
    this.select = this.root.querySelector('select');
    this.setPackage(pack);
    this.parent.insertAdjacentElement('beforebegin', this.root);
    this.select.addEventListener('change', (event) => {
      location.href = this.paths[event.target.value];
    });
  }

  setPackage(pack) {
    this.paths = {};
    this.select.innerHTML = '';
    if (!pack) return;

    const latestVersion = pack.versions[0].version;
    pack.versions.sort((v1, v2) => semverCompare(v2.version, v1.version));
    for (const version of pack.versions) {
      const value = version.version;
      let title = 'v' + value;
      if (value === latestVersion) title += ' (latest)';
      if (value.endsWith('-dev')) title = title.replace('-dev', ' (dev)');

      const option = createElement(VersionDropdown.optionHtml(title, value));
      this.select.appendChild(option);
      this.paths[value] = version.path;
    }
    this.select.value = pack.version;
  }
}

export let sideMenu;

export default function render() {
  const lghidden = document.querySelector('#lg-hidden');
  sideMenu = new Menu(menuStruct, lghidden);
}
