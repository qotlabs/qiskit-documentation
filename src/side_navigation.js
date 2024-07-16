// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

const openTopLeftMenuElement = `
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
    <path
      d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2
      7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"
    ></path>
  </svg>
</button>`;

const navSubmenuChevron = `
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
</div>`;

const expandedNavSubMenuChevron = `
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
    <path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path>
  </svg>
</div>`;

const topLeftNavElement = `
<div class="z-[600] bg-overlay fixed inset-0 top-[var(--shell-header-height)]" style="opacity: 1;"></div>
	<div class="fixed z-[800] top-[var(--shell-header-height)] bottom-0 left-0 overflow-x-hidden overflow-y-auto w-[var(--shell-header-mobile-nav-width)] bg-background scrollbar"
		aria-label="Side Navigation" style="transform: none;">
		<div class="h-48 mx-16 flex items-center border-solid border-0 border-b border-border-subtle"><svg
				focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="16" height="16"
				viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1 16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z">
				</path>
				<path d="M5.91 15H26.080000000000002V17H5.91z" transform="rotate(-75 15.996 16)"></path>
			</svg></div>
		<h2 class="text-heading-03 text-text-primary px-16 my-16">Documentation</h2>
		<ul class="cds--side-nav__header-navigation static p-0">
			<li class="cds--side-nav__item"><a class="cds--side-nav__link cds--side-nav__link--current" tabindex="0"
					href="/"><span class="cds--side-nav__link-text">Overview</span></a></li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/guides"><span class="cds--side-nav__submenu-title"
						title="Guides">Guides</span>
            ${navSubmenuChevron}
				</button></li>
			<li class="cds--side-nav__divider">
				<hr>
			</li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/api/qiskit"><span class="cds--side-nav__submenu-title" title="Qiskit SDK">Qiskit SDK</span>
            ${navSubmenuChevron}
				</button></li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/api/qiskit-ibm-runtime"><span class="cds--side-nav__submenu-title"
						title="Qiskit Runtime IBM Client">Qiskit
						Runtime IBM Client</span>
            ${navSubmenuChevron}
				</button></li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/api/qiskit-transpiler-service"><span class="cds--side-nav__submenu-title"
						title="Qiskit Transpiler Service Client">Qiskit Transpiler Service Client</span>
            ${navSubmenuChevron}
				</button></li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/api/qiskit-ibm-provider"><span class="cds--side-nav__submenu-title"
						title="Qiskit IBM Provider (deprecated)">Qiskit IBM Provider (deprecated)</span>
            ${navSubmenuChevron}
				</button></li>
			<li class="cds--side-nav__item"><button aria-expanded="false" class="cds--side-nav__submenu section__button"
					type="button" data-href="/api/migration-guides"><span class="cds--side-nav__submenu-title"
						title="Migration guides">Migration
						guides</span>
            ${navSubmenuChevron}
				</button></li>
		</ul>
	</div>`;

const insetBgElement = `
<div
  class="bg-background absolute inset-0 inset-bg-element"
  style="opacity: 0.7"
></div>`;

const dropdownMenuElement = `
<div class="cds--form-item px-16 mb-24">
  <div class="cds--select">
    <label for=":r26:" class="cds--label cds--visually-hidden" dir="auto"
      >Select</label
    >
    <div class="cds--select-input__wrapper">
      <select id=":r26:" class="cds--select-input" title=""></select>
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

const submenuElement = `
<div
  class="submenu-content absolute inset-0 bg-background z-10 submenu-element"
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
  <h2
    class="text-heading-03 text-text-primary px-16 my-12 submenu-text-heading"
  ></h2>
  <ul class="cds--side-nav__items pt-0 pb-16 overflow-hidden submenu-list"></ul>
</div>`;

const hamburgerPath = `
<path
  d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2 7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"
></path>`;

const crossPath = `
<path
  d="M17.4141 16L24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"
></path>`;

const navDivider = `<li class="cds--side-nav__divider border-t border-border-subtle-00"><hr></li>`;

async function getTreeFromQuery(href) {
  const url = `/api/toc${href}`;
  const response = await fetch(url, {
    headers: {'Content-Type': 'application/json'},
  });
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }
  return await response.json();
}

function compareVersions(node1, node2) {
  const arr1 = node1.version.replace('-dev', '').split('.');
  const arr2 = node2.version.replace('-dev', '').split('.');
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    const v1 = parseInt(arr1[i]);
    const v2 = parseInt(arr2[i]);
    if (v1 === v2) {
      continue;
    }
    return v2 - v1;
  }
  return arr2.length - arr1.length;
}

function setActiveLink() {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }
  let item = sideNavigation.querySelector('.cds--side-nav__item--active');
  if (item) {
    item.classList.remove('cds--side-nav__item--active');
  }
  const link_current = sideNavigation.querySelector('.cds--side-nav__link');
  if (link_current.classList.contains('cds--side-nav__link--current')) {
    link_current.classList.remove('cds--side-nav__link--current');
  }
  const loc = location.pathname.split('/');
  let href = loc[1] === 'api' ? `/api/${loc[2]}` : `/${loc[1]}`;
  if (loc[3]) {
    if (!isNaN(parseFloat(loc[3])) || loc[3] === 'dev') {
      href = `/api/${loc[2]}/${loc[3]}`;
    } else {
      href = `/api/${loc[2]}`;
    }
  }
  item = sideNavigation.querySelector(`button[data-href="${href}"]`);

  if (item) {
    item.parentElement.classList.add('cds--side-nav__item--active');
  } else if (loc[1] === '') {
    link_current.classList.add('cds--side-nav__link--current');
  }
}

// Checking top-left menu is opened
let isTopLeftMenuOpened = false;

window.addEventListener('popstate', setActiveLink);

function setTopLeftMenuButtonStatus(status) {
  const topLeftMenuButton = document.querySelector(
    'button.cds--header__menu-toggle'
  );
  if (!topLeftMenuButton) {
    return;
  }
  const buttonLabel = `${status ? 'Close' : 'Open'} menu`;
  const buttonSvgPath = status ? crossPath : hamburgerPath;
  topLeftMenuButton.setAttribute('aria-expanded', status);
  topLeftMenuButton.setAttribute('title', buttonLabel);
  topLeftMenuButton.setAttribute('aria-label', buttonLabel);
  topLeftMenuButton
    .querySelector('svg')
    .setAttribute('viewBox', `0 0 ${status ? '32 32' : '20 20'}`);
  topLeftMenuButton.querySelector('svg').innerHTML = buttonSvgPath;
  document.querySelector('#lg-hidden').innerHTML = `${
    status ? topLeftNavElement : ''
  }`;
  if (status) {
    topLeftMenuButton.classList.add('cds--header__action--active');
    setSideLinks();
    setActiveLink();
    document.body.addEventListener('click', closeTopLeftMenu);
  } else {
    topLeftMenuButton.classList.remove('cds--header__action--active');
  }
}

function setStatusTopLeftMenu() {
  isTopLeftMenuOpened = !isTopLeftMenuOpened;
  setTopLeftMenuButtonStatus(isTopLeftMenuOpened);
}

function closeTopLeftMenu(event) {
  if (event.target.classList.contains('bg-overlay')) {
    setTopLeftMenuButtonStatus(false);
    isTopLeftMenuOpened = false;
    document.body.removeEventListener('click', closeTopLeftMenu);
  }
}

function returnToSideMenu() {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }
  const clickedButtonLink = sideNavigation.querySelector('.selected-section');
  const currentSideNavElement = clickedButtonLink.parentElement;
  currentSideNavElement.querySelector('.submenu-element').outerHTML = '';
  currentSideNavElement.querySelector('.inset-bg-element').outerHTML = '';
  clickedButtonLink.classList.remove('selected-section');
  clickedButtonLink.setAttribute('aria-expanded', false);
  const loc = location.pathname.split('/');
  const href = loc[1] === 'api' ? `/api/${loc[2]}` : `/${loc[1]}`;
  const topLevelMenuButtons = Array.from(
    sideNavigation.querySelectorAll('.section__button')
  );
  const activeButtonLink = topLevelMenuButtons.find(
    (element) => element.dataset.href === href
  );
  if (activeButtonLink) {
    activeButtonLink.parentElement.classList.add('cds--side-nav__item--active');
  }
}

function insertDropdownElement(pack) {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }
  const clickedButtonLink = sideNavigation.querySelector('.selected-section');
  const currentSideNavElement = clickedButtonLink.parentElement;
  currentSideNavElement
    .querySelector('.submenu-list')
    .insertAdjacentHTML('beforebegin', dropdownMenuElement);
  const versions = pack.versions.sort(compareVersions);
  const selectVersionInput =
    currentSideNavElement.querySelector('.cds--select-input');
  const latestVersion = versions[0].version.match('dev')
    ? versions[1].version
    : versions[0].version;
  versions.forEach((item) => {
    selectVersionInput.insertAdjacentHTML(
      'beforeend',
      `<option class="cds--select-option" value="${item.version}"
                  data-path="${item.path}">${
        item.version !== latestVersion
          ? item.version
          : item.version + ' (latest)'
      }</option>`
    );
  });
  selectVersionInput.value = pack.version;
  selectVersionInput.addEventListener('change', (event) => {
    const options = Array.from(
      document.querySelectorAll('.cds--select-option')
    );
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    location.href = location.origin + selectedOption.dataset.path;
  });
}

function expandSubMenu() {
  this.setAttribute(
    'aria-expanded',
    !JSON.parse(this.getAttribute('aria-expanded'))
  );
}

function insertSecondLevelSubmenu() {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }

  const clickedButtonLink = sideNavigation.querySelector('.selected-section');

  const currentSideNavElement = clickedButtonLink.parentElement;
  currentSideNavElement.insertAdjacentHTML('beforeend', insetBgElement);
  currentSideNavElement.insertAdjacentHTML('beforeend', submenuElement);
  currentSideNavElement.querySelector('h2').textContent =
    clickedButtonLink.textContent.trim();
  currentSideNavElement
    .querySelector('.all-documentation')
    .addEventListener('click', returnToSideMenu);
  const submenuList = document.querySelector('.submenu-list');

  function createGuidesLinks(child, level) {
    if (Array.isArray(child)) {
      return `<ul class="cds--side-nav__menu">
    ${child
      .map((item) => {
        if (Object.hasOwn(item, 'url')) {
          return `<li class="cds--side-nav__item">
            <a
              class="cds--side-nav__link ${location.pathname === item.url ? 'cds--side-nav__link--current' : ''} ![block-size:auto] !py-[6px] [&amp;>span]:break-words [&amp;>span]:!whitespace-normal"
              style="padding-left: ${16 * level}px; font-weight: normal;"
              href="${item.url}"
              ${location.pathname === item.url ? 'id="TocTreeElement__active"' : ''}
              >
                <span class="cds--side-nav__link-text">${item.title}</span>
            </a>
          </li>`;
        } else if (Object.hasOwn(item, 'children')) {
          return `<li class="cds--side-nav__item [&>.cds--side-nav\\_\\_submenu]:![block-size:auto] [&>.cds--side-nav\\_\\_submenu]:[min-block-size:2rem] [&>.cds--side-nav\\_\\_submenu]:flex [&>.cds--side-nav\\_\\_submenu]:gap-4 [&>.cds--side-nav\\_\\_submenu]:py-[6px] [&>.cds--side-nav\\_\\_submenu]:items-start [&>.cds--side-nav\\_\\_submenu>span]:break-words [&>.cds--side-nav\\_\\_submenu>span]:!whitespace-normal [&>.cds--side-nav\\_\\_submenu>.cds--side-nav\\_\\_icon]:items-baseline">
            <button
              aria-expanded="false"
              class="cds--side-nav__submenu"
              type="button"
              style="padding-left: ${16 * level}px; font-weight: normal;"
            >
              <span class="cds--side-nav__submenu-title" title="${item.title}">
                ${item.title}
              </span>${expandedNavSubMenuChevron}</button>
              ${createGuidesLinks(item.children, level + 1)}
          </li>`;
        }
      })
      .join('')}
    </ul>`;
    } else if (Object.hasOwn(child, 'children')) {
      return `<ul class="cds--side-nav__menu">
    ${child.children
      .map((item) => {
        if (Object.hasOwn(item, 'url')) {
          return `<li class="cds--side-nav__item">
            <a
              class="cds--side-nav__link ${location.pathname === item.url ? 'cds--side-nav__link--current' : ''} ![block-size:auto] !py-[6px] [&amp;>span]:break-words [&amp;>span]:!whitespace-normal"
              style="padding-left: ${16 * level}px; font-weight: normal;"
              href="${item.url}"
              ${location.pathname === item.url ? 'id="TocTreeElement__active"' : ''}
              >
                <span class="cds--side-nav__link-text">${item.title}</span>
            </a>
          </li>`;
        } else if (Object.hasOwn(item, 'children')) {
          return `<li class="cds--side-nav__item [&>.cds--side-nav\\_\\_submenu]:![block-size:auto] [&>.cds--side-nav\\_\\_submenu]:[min-block-size:2rem] [&>.cds--side-nav\\_\\_submenu]:flex [&>.cds--side-nav\\_\\_submenu]:gap-4 [&>.cds--side-nav\\_\\_submenu]:py-[6px] [&>.cds--side-nav\\_\\_submenu]:items-start [&>.cds--side-nav\\_\\_submenu>span]:break-words [&>.cds--side-nav\\_\\_submenu>span]:!whitespace-normal [&>.cds--side-nav\\_\\_submenu>.cds--side-nav\\_\\_icon]:items-baseline">
            <button
              aria-expanded="false"
              class="cds--side-nav__submenu"
              type="button"
              style="padding-left: ${16 * level}px; font-weight: normal;"
            >
              <span class="cds--side-nav__submenu-title" title="${item.title}">
                ${item.title}
              </span>${expandedNavSubMenuChevron}</button>
              ${createGuidesLinks(item.children, level + 1)}
          </li>`;
        }
      })
      .join('')}
    </ul>`;
    }
  }
  function createAPILinks(child, level) {

    if (Array.isArray(child)) {
      return `<ul class="cds--side-nav__menu">
      ${child
        .map((item) => {
          if (Object.hasOwn(item, 'url')) {
            return `<li class="cds--side-nav__item">
              <a
                class="cds--side-nav__link ${location.pathname === item.url ? 'cds--side-nav__link--current' : ''} ![block-size:auto] !py-[6px] [&>span]:break-words [&>span]:!whitespace-normal"
                style="padding-left: ${16 * level}px;"
                href="${item.url}"
                ${location.pathname === item.url ? 'id="TocTreeElement__active"' : ''}
                >
                  <span class="cds--side-nav__link-text">${item.title}</span>
              </a>
            </li>`;
          } else if (Object.hasOwn(item, 'children')) {
            return `<li class="cds--side-nav__item [&>.cds--side-nav\\_\\_submenu]:![block-size:auto] [&>.cds--side-nav\\_\\_submenu]:[min-block-size:2rem] [&>.cds--side-nav\\_\\_submenu]:flex [&>.cds--side-nav\\_\\_submenu]:gap-4 [&>.cds--side-nav\\_\\_submenu]:py-[6px] [&>.cds--side-nav\\_\\_submenu]:items-start [&>.cds--side-nav\\_\\_submenu>span]:break-words [&>.cds--side-nav\\_\\_submenu>span]:!whitespace-normal [&>.cds--side-nav\\_\\_submenu>.cds--side-nav\\_\\_icon]:items-baseline">
              <button
                aria-expanded="false"
                class="cds--side-nav__submenu"
                type="button"
                style="padding-left: ${16 * level}px; font-weight: normal"
              >
                <span class="cds--side-nav__submenu-title" title="${
                  item.title
                }">
                  ${item.title}
                </span>${expandedNavSubMenuChevron}</button>
                ${createAPILinks(item.children, level + 1)}
            </li>`;
          }
        })
        .join('')}
      </ul>`;
    } else if (Object.hasOwn(child, 'url')) {
      return `<li class="cds--side-nav__item">
        <a
          class="cds--side-nav__link ${location.pathname === child.url ? 'cds--side-nav__link--current' : ''} ![block-size:auto] !py-[6px] [&>span]:break-words [&>span]:!whitespace-normal"
          style="padding-left: ${16 * level}px;"
          href="${child.url}"
          ${location.pathname === child.url ? 'id="TocTreeElement__active"' : ''}
          >
            <span class="cds--side-nav__link-text">${child.title}</span>
        </a>
      </li>`;
    } else if (Object.hasOwn(child, 'children')) {
      return `<li class="cds--side-nav__item [&>.cds--side-nav\\_\\_submenu]:![block-size:auto] [&>.cds--side-nav\\_\\_submenu]:[min-block-size:2rem] [&>.cds--side-nav\\_\\_submenu]:flex [&>.cds--side-nav\\_\\_submenu]:gap-4 [&>.cds--side-nav\\_\\_submenu]:py-[6px] [&>.cds--side-nav\\_\\_submenu]:items-start [&>.cds--side-nav\\_\\_submenu>span]:break-words [&>.cds--side-nav\\_\\_submenu>span]:!whitespace-normal [&>.cds--side-nav\\_\\_submenu>.cds--side-nav\\_\\_icon]:items-baseline">
        <button
          aria-expanded="false"
          class="cds--side-nav__submenu"
          type="button"
          style="padding-left: ${16 * level}px;"
        >
          <span class="cds--side-nav__submenu-title" title="${child.title}">
            ${child.title}
          </span>${expandedNavSubMenuChevron}</button>
          ${createAPILinks(child.children, level + 1)}
      </li>`;
    }
  }
  getTreeFromQuery(clickedButtonLink.dataset.href).then((data) => {
    if (data.package) {
      insertDropdownElement(data.package);
    }
    if (data.path.match('/guides')) {
      for (let child of data.toc.children) {
        submenuList.insertAdjacentHTML(
          'beforeend',
          `<li
            class="cds--side-nav__item [&amp;>.cds--side-nav\\_\\_submenu]:![block-size:auto] [&amp;>.cds--side-nav\\_\\_submenu]:[min-block-size:2rem] [&amp;>.cds--side-nav\\_\\_submenu]:flex [&amp;>.cds--side-nav\\_\\_submenu]:gap-4 [&amp;>.cds--side-nav\\_\\_submenu]:py-[6px] [&amp;>.cds--side-nav\\_\\_submenu]:items-start [&amp;>.cds--side-nav\\_\\_submenu>span]:break-words [&amp;>.cds--side-nav\\_\\_submenu>span]:!whitespace-normal [&amp;>.cds--side-nav\\_\\_submenu>.cds--side-nav\\_\\_icon]:items-baseline">
            <p
              aria-expanded="true"
              class="cds--side-nav__submenu pointer-events-none"
              style="padding-left: 16px;">
                <span
                  class="cds--side-nav__submenu-title"
                    title="${child.title}">${child.title}</span>
            </p>
            ${createGuidesLinks(child, 1)}
          </li>`
        );
      }
    } else if (data.path.match('/api')) {
      for (let child of data.toc.children) {
        submenuList.insertAdjacentHTML('beforeend', createAPILinks(child, 1));
      }
    }
    Array.from(
      submenuList.querySelectorAll('.cds--side-nav__submenu[type="button"]')
    ).forEach((button) => button.addEventListener('click', expandSubMenu));
    if (data.path.match('/guides')) {
      Array.from(submenuList.children).forEach((child, index) => {
        if (index < data.toc.children.length - 1) {
          console.log(child.insertAdjacentHTML('afterend', navDivider));
        }
      })
    }
  });
}
function insertSubmenu() {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }
  const clickedButtonLink = sideNavigation.querySelector('.selected-section');
  if (sideNavigation.querySelector('.cds--side-nav__item--active')) {
    sideNavigation
      .querySelector('.cds--side-nav__item--active')
      .classList.remove('cds--side-nav__item--active');
  }
  const expanded = clickedButtonLink.getAttribute('aria-expanded') === 'true';
  clickedButtonLink.setAttribute('aria-expanded', !expanded);
  if (!sideNavigation.querySelector('.inset-bg-element')) {
    insertSecondLevelSubmenu();
  }
}

function setSideLinks() {
  const sideNavigation = document.querySelector(
    '[aria-label="Side Navigation"]'
  );
  if (!sideNavigation) {
    return;
  }
  const loc = location.pathname.split('/');
  const topLevelMenuButtons = Array.from(
    sideNavigation.querySelectorAll('.section__button')
  );
  if (loc[1] === 'api') {
    const apiLinkButton = topLevelMenuButtons.find(
      (button) => button.dataset.href === `/api/${loc[2]}`
    );
    const apiVersion = !isNaN(parseFloat(loc[3])) || loc[3] === 'dev';
    if (apiVersion) {
      apiLinkButton.dataset.href += `/${loc[3]}`;
    }
  }
  topLevelMenuButtons.forEach((button) =>
    button.addEventListener('click', () => {
      button.classList.add('selected-section');
      insertSubmenu();
    })
  );
}

export default function render() {
  document
    .querySelector('.cds--skip-to-content')
    .insertAdjacentHTML('afterend', openTopLeftMenuElement);

  const topLeftMenuButton = document.querySelector(
    'button.cds--header__menu-toggle'
  );
  topLeftMenuButton.addEventListener('click', setStatusTopLeftMenu);
}
