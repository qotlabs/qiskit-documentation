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
<div
  class="z-[600] bg-overlay fixed inset-0 top-[var(--shell-header-height)]"
  style="opacity: 1"
></div>
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
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="16"
      height="16"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        d="M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1
                16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z"
      ></path>
      <path
        d="M5.91 15H26.080000000000002V17H5.91z"
        transform="rotate(-75 15.996 16)"
      ></path>
    </svg>
  </div>
  <h2 class="text-heading-03 text-text-primary px-16 my-16">Documentation</h2>
  <ul class="cds--side-nav__header-navigation static p-0">
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[1] === 'start'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/start"
      >
        <span class="cds--side-nav__submenu-title" title="Start">Start</span>
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[1] === 'build'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/build"
      >
        <span class="cds--side-nav__submenu-title" title="Build">Build</span>
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[1] === 'transpile'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/transpile"
      >
        <span class="cds--side-nav__submenu-title" title="Transpile"
          >Transpile</span
        >
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[1] === 'verify'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/verify"
      >
        <span class="cds--side-nav__submenu-title" title="Verify">Verify</span>
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[1] === 'run'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/run"
      >
        <span class="cds--side-nav__submenu-title" title="Run">Run</span>
        ${navSubmenuChevron}
      </button>
    </li>
    <li class="cds--side-nav__divider"><hr /></li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[2] === 'qiskit'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/api/qiskit"
      >
        <span class="cds--side-nav__submenu-title" title="Qiskit SDK"
          >Qiskit SDK</span
        >
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[2] === 'qiskit-ibm-runtime'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/api/qiskit-ibm-runtime"
      >
        <span
          class="cds--side-nav__submenu-title"
          title="Qiskit Runtime IBM Client"
          >Qiskit Runtime IBM Client</span
        >
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[2] === 'qiskit-ibm-provider'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/api/qiskit-ibm-provider"
      >
        <span class="cds--side-nav__submenu-title" title="Qiskit IBM Provider"
          >Qiskit IBM Provider</span
        >
        ${navSubmenuChevron}
      </button>
    </li>
    <li
      class="cds--side-nav__item${
        location.pathname.split('/')[2] === 'migration-guides'
          ? ' cds--side-nav__item--active'
          : ''
      }"
    >
      <button
        aria-expanded="false"
        class="cds--side-nav__submenu section__button"
        type="button"
        data-href="/api/migration-guides"
      >
        <span class="cds--side-nav__submenu-title" title="Migration guides"
          >Migration guides</span
        >
        ${navSubmenuChevron}
      </button>
    </li>
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

const expandingValues = {
  true: true,
  false: false,
};

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

function sortVersions(versionA, versionB) {
  if (!versionA) {
    return 1;
  }
  if (!versionB) {
    return -1;
  }

  const arrA = versionA.version.split('.');
  const arrB = versionB.version.split('.');

  if (!arrA || !arrA.length) {
    return 1;
  }

  if (!arrB || !arrB.length) {
    return -1;
  }

  for (let i = 0; i < Math.min(arrA.length, arrB.length); i++) {
    const numberA = +arrA[i].replace(/\D/g, '') + 100000;
    const numberB = +arrB[i].replace(/\D/g, '') + 100000;

    if (numberA === numberB) {
      continue;
    }

    return numberB - numberA;
  }
  return arrB.length - arrA.length;
}

export default function render() {
  // Checking top-left menu is opened
  let isTopLeftMenuOpened = false;

  document
    .querySelector('.cds--skip-to-content')
    .insertAdjacentHTML('afterend', openTopLeftMenuElement);

  // Clicking top-left menu button
  const topLeftMenuButton = document.querySelector(
    'button.cds--header__menu-toggle'
  );
  topLeftMenuButton.addEventListener('click', () => {
    isTopLeftMenuOpened = !isTopLeftMenuOpened;
    const setTopLeftMenuButtonStatus = (status) => {
      const buttonLabel = `${status ? 'Close' : 'Open'} menu`;
      const buttonSvgPath = status ? crossPath : hamburgerPath;
      topLeftMenuButton.setAttribute('aria-expanded', status);
      topLeftMenuButton.setAttribute('title', buttonLabel);
      topLeftMenuButton.setAttribute('aria-label', buttonLabel);
      topLeftMenuButton
        .querySelector('svg')
        .setAttribute('viewBox', `0 0 ${status ? '32 32' : '20 20'}`);
      topLeftMenuButton.querySelector('svg').innerHTML = buttonSvgPath;
      if (status) {
        topLeftMenuButton.classList.add('cds--header__action--active');
      } else {
        topLeftMenuButton.classList.remove('cds--header__action--active');
      }
      document.querySelector('#lg-hidden').innerHTML = `${
        status ? topLeftNavElement : ''
      }`;
    };
    setTopLeftMenuButtonStatus(isTopLeftMenuOpened);
    const closeTopLeftMenu = (event) => {
      if (event.target.classList.contains('bg-overlay')) {
        setTopLeftMenuButtonStatus(false);
        isTopLeftMenuOpened = false;
        document.body.removeEventListener('click', closeTopLeftMenu);
      }
    };
    document.body.addEventListener('click', closeTopLeftMenu);

    const topLevelMenuButtons = Array.from(
      document.querySelectorAll('.section__button')
    );
    if (location.pathname.split('/')[1] === 'api') {
      const apiLinkButton = topLevelMenuButtons.find(
        (button) =>
          button.dataset.href === `/api/${location.pathname.split('/')[2]}`
      );
      const apiVersion =
        !isNaN(parseFloat(location.pathname.split('/')[3])) ||
        location.pathname.split('/')[3] === 'dev';
      if (apiVersion) {
        apiLinkButton.dataset.href += `/${location.pathname.split('/')[3]}`;
      }
    }
    topLevelMenuButtons.forEach((button) =>
      button.addEventListener('click', () => {
        if (document.querySelector('.cds--side-nav__item--active')) {
          document
            .querySelector('.cds--side-nav__item--active')
            .classList.remove('cds--side-nav__item--active');
        }
        button.setAttribute(
          'aria-expanded',
          !expandingValues[button.getAttribute('aria-expanded')]
        );
        const createSubmenuLiElement = (children, url, title, type) => {
          const isExpanded = type === 'default';
          const submenuLiElement = '<li class="cds--side-nav__item">';
          if (children.length === 1) {
            const link = `<a
            class="cds--side-nav__link${
              location.pathname === url ? ' cds--side-nav__link--current' : ''
            }"
            style="padding-left: 16px;" href="${url}">
              <span class="cds--side-nav__link-text">${title}</span>
            </a>`;
            return `${submenuLiElement}${link}</li>`;
          }
          const buttonNavSubmenu = `<button aria-expanded="${isExpanded}"
            class="cds--side-nav__submenu expanding-button" type="button" style="padding-left: 16px;">
              <span class="cds--side-nav__submenu-title" title="${title}">${title}</span>
              ${expandedNavSubMenuChevron}
            </button>`;
          const ulSideMenu = `<ul class="cds--side-nav__menu${
            isExpanded ? '' : ' hidden'
          }">`;
          const sideMenuLiElements = children.map(
            (item) => `<li class="cds--side-nav__menu-item">
              <a class="cds--side-nav__link${
                location.pathname === item.url
                  ? ' cds--side-nav__link--current'
                  : ''
              }"
                style="padding-left: 32px; font-weight: 400"
                href="${item.url}">
                <span class="cds--side-nav__link-text">${item.title}</span>
              </a>
            </li>`
          );
          return `${submenuLiElement}${buttonNavSubmenu}
          ${ulSideMenu}${sideMenuLiElements.join('')}</ul></li>`;
        };

        if (!document.querySelector('.inset-bg-element')) {
          button.parentElement.insertAdjacentHTML('beforeend', insetBgElement);
          button.parentElement.insertAdjacentHTML('beforeend', submenuElement);
          document
            .querySelector('.all-documentation')
            .addEventListener('click', () => {
              document.querySelector('.submenu-element').outerHTML = '';
              document.querySelector('.inset-bg-element').outerHTML = '';
              button.setAttribute('aria-expanded', false);
              if (location.pathname.split('/')[1] !== 'api') {
                topLevelMenuButtons
                  .find(
                    (element) =>
                      element.dataset.href ===
                      `/${location.pathname.split('/')[1]}`
                  )
                  .parentElement.classList.add('cds--side-nav__item--active');
              } else if (location.pathname.split('/')[1] === 'api') {
                topLevelMenuButtons
                  .find(
                    (element) =>
                      element.dataset.href ===
                      `/api/${location.pathname.split('/')[2]}`
                  )
                  .parentElement.classList.add('cds--side-nav__item--active');
              }
            });
          getTreeFromQuery(button.dataset.href).then((data) => {
            document.querySelector('.submenu-text-heading').textContent =
              data.toc.title;
            if (data.package) {
              document
                .querySelector('.submenu-list')
                .insertAdjacentHTML('beforebegin', dropdownMenuElement);
              const versions = data.package.versions.sort(sortVersions);
              versions.forEach((item) => {
                document.querySelector('.cds--select-input').insertAdjacentHTML(
                  'beforeend',
                  `<option class="cds--select-option" value="${item.version}"
                    data-path="${item.path}">${item.version}</option>`
                );
              });
              document.querySelector('.cds--select-input').value =
                data.package.version;
              document
                .querySelector('.cds--select-input')
                .addEventListener('change', (event) => {
                  const options = Array.from(
                    document.querySelectorAll('.cds--select-option')
                  );
                  const selectedOption = options.find(
                    (option) => option.value === event.target.value
                  );
                  location.href = location.origin + selectedOption.dataset.path;
                });
            }
            data.toc.children.forEach((item) => {
              document
                .querySelector('.submenu-list')
                .insertAdjacentHTML(
                  'beforeend',
                  createSubmenuLiElement(
                    item.children === undefined ? [[]] : item.children,
                    item.url === undefined ? '' : item.url,
                    item.title,
                    data.type
                  )
                );
            });
            Array.from(document.querySelectorAll('.expanding-button')).forEach(
              (btn) => {
                btn.addEventListener('click', () => {
                  btn.setAttribute(
                    'aria-expanded',
                    !expandingValues[btn.getAttribute('aria-expanded')]
                  );
                  if (btn.getAttribute('aria-expanded')) {
                    btn.nextElementSibling.classList.remove('hidden');
                  } else {
                    btn.nextElementSibling.classList.add('hidden');
                  }
                });
                if (
                  btn.nextElementSibling.querySelector(
                    '.cds--side-nav__link--current'
                  )
                ) {
                  btn.setAttribute('aria-expanded', true);
                  btn.nextElementSibling.classList.remove('hidden');
                }
              }
            );
          });
        }
      })
    );
  });
}
