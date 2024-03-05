// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

// Wait for hydration is finished
const customInterval = setInterval(() => {
  const header_name = document.querySelector('.cds--header__name');
  // hydrateRoot() adds onclick event so just wait until it appears
  if (header_name && typeof header_name.onclick === 'function') {
    clearInterval(customInterval);
    customClientRender();
  }
}, 100);

// Check navigation panel is loaded
setInterval(() => {
  if (!document.querySelector('.cds--header__nav')) {
    customClientRender();
  }
}, 1000);

// HTML Markup
const openTopLeftMenuElement = `<button
    aria-expanded="false"
    aria-label="Open menu"
    class="cds--header__action cds--header__menu-trigger cds--header__menu-toggle
    cds--header__menu-toggle__hidden"
    title="Open menu" type="button"
    >
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20"
        height="20" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2
            7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"></path>
        </svg>
</button>`;

const closeTopLeftMenuElement = `<button
    aria-expanded="true"
    aria-label="Close menu"
    class="cds--header__action cds--header__menu-trigger
    cds--header__action--active cds--header__menu-toggle cds--header__menu-toggle__hidden"
    title="Close menu" type="button">
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="20"
        height="20" viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4141 16L24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8
            22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"></path>
        </svg>
</button>`;

const navElement = `<nav class="cds--header__nav" aria-label="IBM Documentation">
    <ul class="cds--header__menu-bar" role="menubar" aria-label="IBM Documentation">
        <li role="none">
            <a href="/start" role="menuitem" tabindex="0" class="cds--header__menu-item">
                <span class="cds--text-truncate--end">Start</span>
            </a>
        </li>
        <li role="none">
            <a href="/build" role="menuitem" tabindex="0" class="cds--header__menu-item">
                <span class="cds--text-truncate--end">Build</span>
            </a>
        </li>
        <li role="none">
            <a href="/transpile" role="menuitem" tabindex="0" class="cds--header__menu-item">
                <span class="cds--text-truncate--end">Transpile</span>
            </a>
        </li>
        <li role="none">
            <a href="/verify" role="menuitem" tabindex="0" class="cds--header__menu-item">
                <span class="cds--text-truncate--end">Verify</span>
            </a>
        </li>
        <li role="none">
            <a href="/run" role="menuitem" tabindex="0" class="cds--header__menu-item">
                <span class="cds--text-truncate--end">Run</span>
            </a>
        </li>
        <li class="cds--header__submenu" role="none">
            <button role="menuitem" aria-haspopup="menu" aria-expanded="false"
                aria-controls="radix-:R1k6ta:" aria-label="API Reference"
                class="relative text-body-compact-01 flex items-center h-full whitespace-nowrap px-16
                border-2 transition-colors hover:bg-background-hover hover:text-text-primary
                border-transparent focus-outline text-text-secondary bg-background">
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
                    class="cds--header__menu-arrow">
                    <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                </svg>
            </button>
        </li>
    </ul>
</nav>`;

const apiReferencesListElement = `
<ul id="radix-:R1s6ta:" role="menu"
        class="flex cds--header__menu m-0 p-0 flex-col bg-layer min-w-[200px]
        shadow-[0_0_6px_-1px_var(--cds-shadow)] api-references-list" tabindex="0" style="outline: none;">
    <li class="" role="none">
        <a role="menuitem"
            class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors
            hover:bg-background-hover hover:text-text-primary border-transparent focus-outline
            bg-layer text-text-secondary" tabindex="0" data-radix-collection-item=""
            href="/api/qiskit">
            <span class="truncate">Qiskit</span>
        </a>
    </li>
    <li class="" role="none">
        <a role="menuitem"
            class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors
            hover:bg-background-hover hover:text-text-primary border-transparent focus-outline
            bg-layer text-text-secondary" tabindex="0" data-radix-collection-item=""
            href="/api/qiskit-ibm-runtime">
            <span class="truncate">Qiskit Runtime IBM Client</span>
        </a>
    </li>
    <li class="" role="none">
        <a role="menuitem"
            class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors
            hover:bg-background-hover hover:text-text-primary border-transparent focus-outline
            bg-layer text-text-secondary" tabindex="0" data-radix-collection-item=""
            href="/api/qiskit-ibm-provider">
            <span class="truncate">Qiskit IBM Provider</span>
        </a>
    </li>
    <li class="" role="none">
        <a role="menuitem"
            class="text-body-compact-01 flex items-center h-48 px-16 border-2 transition-colors
            hover:bg-background-hover hover:text-text-primary border-transparent focus-outline
            bg-layer text-text-secondary" tabindex="0"
            data-radix-collection-item="" href="/api/migration-guides">
            <span class="truncate">Migration guides</span>
        </a>
    </li>
</ul>`;

const headerGlobalElement = `<div class="cds--header__global">
    <span class="cds--popover-container cds--popover--caret
    cds--popover--high-contrast cds--popover--bottom cds--tooltip cds--icon-tooltip">
        <div class="cds--tooltip-trigger__wrapper">
            <button aria-label="Search" aria-labelledby="tooltip-:Rae6ta:"
            class="cds--btn--icon-only cds--header__action cds--btn cds--btn--primary
            cds--btn--icon-only cds--btn cds--btn--primary" type="button">
                <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16"
                viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,
                    5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z">
                    </path>
                </svg>
            </button>
        </div>
        <span aria-hidden="true" id="tooltip-:Rae6ta:" role="tooltip" class="cds--popover">
            <span class="cds--popover-content cds--tooltip-content">Search</span>
            <span class="cds--popover-caret"></span></span>
        </span>
    </span>
</div>`;

const modalElement = `
    <div role="presentation" aria-hidden="false" class="cds--modal is-visible px-16 pt-[80px]
    md:pt-[112px] items-start">
        <div class="cds--modal-container w-full max-w-[600px] max-md:static max-md:h-auto" role="dialog"
        aria-modal="true">
            <button type="button" class="cds--visually-hidden">Focus sentinel</button>
            <div class="cds--modal-container-body">
                <div class="cds--modal-content p-0 m-0 overflow-y-hidden">
                    <div class="relative flex focus-within-outline h-48 bg-layer-02
                        border-0 border-b border-solid border-border-strong-01">
                        <label id="downshift-:r0:-label" for="downshift-:r0:-input" class="sr-only">
                        Search Documentation</label>
                        <span class="absolute flex items-center
                        justify-center w-48 h-48 pointer-events-none">
                            <svg focusable="false" preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16"
                            viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,
                                3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5
                                S9,11,6.5,11S2,9,2,6.5z"></path>
                            </svg>
                        </span>
                        <input aria-activedescendant="" aria-autocomplete="list"
                        aria-controls="downshift-:r0:-menu" aria-expanded="false"
                        aria-labelledby="downshift-:r0:-label" autocomplete="off"
                        id="downshift-:r0:-input" role="combobox" placeholder="Search documentation"
                        data-modal-primary-focus="true" class="border-0 font-[inherit] text-[100%]
                        pl-48 h-48 outline-none flex-1 bg-transparent placeholder-text-placeholder
                        text-text-primary clear-search-decoration" type="search" value=""
                        autofocus />
                    </div>
                    <div class="flex p-16 min-h-[48px]
                    items-center justify-between border-0 border-b border-solid
                    border-border-subtle-01 theme-variant">
                        <div role="radiogroup" aria-required="false" dir="ltr" aria-label="Search filter"
                        tabindex="0" style="outline: none;">
                            <button type="button" role="radio" aria-checked="true" data-state="checked"
                            value="documentation" id="search-radio-documentation"
                            class="appearance-none border-0 inline-flex items-center
                            justify-center align-middle cursor-pointer text-label-01
                            m-4 px-8 py-2 rounded
                            data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary
                            data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)]
                            data-[state=checked]:bg-background-inverse
                            data-[state=checked]:text-icon-inverse" aria-label="Documentation"
                            tabindex="0" data-radix-collection-item="">Documentation</button>
                            <button type="button" role="radio" aria-checked="false"
                            data-state="unchecked" value="api" id="search-radio-api"
                            class="appearance-none border-0 inline-flex items-center
                            justify-center align-middle cursor-pointer
                            text-label-01 m-4 px-8 py-2 rounded
                            data-[state=unchecked]:bg-background
                            data-[state=unchecked]:text-text-secondary
                            data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)]
                            data-[state=checked]:bg-background-inverse
                            data-[state=checked]:text-icon-inverse"
                            aria-label="API Reference" tabindex="0"
                            data-radix-collection-item="">API Reference</button>
                        </div>
                        <div class="max-md:hidden">
                            <span class="cds--popover-container cds--popover--caret
                            cds--popover--high-contrast cds--popover--top-right cds--tooltip">
                                <div class="cds--tooltip-trigger__wrapper">
                                    <button type="button" class="inline-flex justify-center
                                    items-center w-24 h-24 bg-background text-text-secondary
                                    appearance-none
                                    rounded border-0 border-solid search-query-button"
                                    style="box-shadow: 0px 0px 5px 0px var(--cds-layer-active);"
                                    aria-labelledby="tooltip-:r4:">/</button>
                                </div>
                                <span aria-hidden="true" id="tooltip-:r4:"
                                    role="tooltip" class="cds--popover">
                                    <span class="cds--popover-content
                                    cds--tooltip-content">Press "/" to open search</span>
                                    <span class="cds--popover-caret"></span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="cds--visually-hidden">Focus sentinel</button>
        </div>
    </div>`;

const modalSearchResultsElement = `<div class="bg-layer-01 text-text-primary
px-8 text-body-compact-01 overflow-y-auto max-h-[455px]
scrollbar scrollbar-variant">
    <div class="px-8 py-16 text-body-compact-01 hidden">
        <p class="m-0">No results found</p>
        <p class="m-0 mt-4 text-label-01 text-text-secondary">
            Please try a different search query or browse all documentation.
        </p>
    </div>
    <ul id="downshift-:r0:-menu" role="listbox"
    aria-labelledby="downshift-:r0:-label" class="list-none p-0 m-0 hidden"
    aria-hidden="true"></ul>
</div>`;

const navSubmenuChevron = `<div
  class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
>
  <svg focusable="false" preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20"
  viewBox="0 0 32 32" aria-hidden="true">
    <path d="M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"></path>
  </svg>
</div>`;
const expandedNavSubMenuChevron = `<div
class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron">
  <svg focusable="false"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20"
  viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path>
  </svg>
</div>`;

const divLgHidden = '<div class="lg:hidden" id="lg-hidden"></div>';
const topLeftNavElement = `
    <div class="z-[600] bg-overlay fixed inset-0 top-[var(--shell-header-height)]"
    style="opacity: 1;"></div>
    <div class="fixed z-[800] top-[var(--shell-header-height)]
    bottom-0 left-0 overflow-x-hidden overflow-y-auto w-[var(--shell-header-mobile-nav-width)]
    bg-background scrollbar"
    aria-label="Side Navigation"
    style="transform: none;">
        <div class="h-48 mx-16 flex items-center border-solid border-0 border-b border-border-subtle">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" width="16" height="16" viewBox="0 0 32 32"
            aria-hidden="true">
                <path d="M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1
                16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z"></path>
                <path d="M5.91 15H26.080000000000002V17H5.91z"
                transform="rotate(-75 15.996 16)"></path>
            </svg>
        </div>
        <h2 class="text-heading-03 text-text-primary px-16 my-16">Documentation</h2>
        <ul class="cds--side-nav__header-navigation static p-0">
            <li class="cds--side-nav__item${location.pathname.split('/')[1] === 'start' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                aria-expanded="false"
                class="cds--side-nav__submenu"
                type="button"
                data-href="/start"
                data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Start"
                >Start</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${location.pathname.split('/')[1] === 'build' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                aria-expanded="false"
                class="cds--side-nav__submenu"
                type="button"
                data-href="/build"
                data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Build"
                >Build</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${location.pathname.split('/')[1] ==='transpile' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                aria-expanded="false"
                class="cds--side-nav__submenu"
                type="button"
                data-href="/transpile"
                data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Transpile"
                >Transpile</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${location.pathname.split('/')[1] ==='verify' ?
            ' cds--side-nav__item--active' : ''}">
                <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/verify"
                  data-menu-level="0"
                >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Verify"
                >Verify</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${location.pathname.split('/')[1] ==='run' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/run"
                  data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Run"
                >Run</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__divider"><hr></li>
            <li class="cds--side-nav__item${
              location.pathname.split('/')[1]==='api' &&
              location.pathname.split('/')[2]==='qiskit' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/api/qiskit"
                  data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Qiskit"
                >Qiskit</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${
              location.pathname.split('/')[1]==='api' &&
              location.pathname.split('/')[2]==='qiskit-ibm-runtime' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/api/qiskit-ibm-runtime"
                  data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Qiskit Runtime IBM Client"
                >Qiskit Runtime IBM Client</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${
              location.pathname.split('/')[1]==='api' &&
              location.pathname.split('/')[2]==='qiskit-ibm-provider' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/api/qiskit-ibm-provider"
                  data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Qiskit IBM Provider"
                >Qiskit IBM Provider</span>
                ${navSubmenuChevron}
              </button>
            </li>
            <li class="cds--side-nav__item${
              location.pathname.split('/')[1]==='api' &&
              location.pathname.split('/')[2]==='migration-guides' ?
            ' cds--side-nav__item--active' : ''}">
              <button
                  aria-expanded="false"
                  class="cds--side-nav__submenu"
                  type="button"
                  data-href="/api/migration-guides"
                  data-menu-level="0"
              >
                <span
                  class="cds--side-nav__submenu-title"
                  title="Migration guides"
                >Migration guides</span>
                ${navSubmenuChevron}
              </button>
            </li>
        </ul>
    </div>`;

const loadingIndicatorElement = `<div
    class="w-48 h-47 flex items-center justify-center text-icon-primary border-0
    border-solid outline-none cursor-pointer bg-transparent
    focus:shadow-[0_0_0_1px_var(--cds-background)_inset]
    focus:border-focus focus:border-2 focus:border-b focus:pb-2
    hover:bg-layer-hover active:bg-layer-active"
    id="loading-indicator">
        <div aria-atomic="true" aria-live="assertive" class="Loading" data-size="small">
            <svg class="LoadingIndicator" viewBox="0 0 100 100">
                <title>Active loading indicator</title>
                <circle class="LoadingIndicatorBackground" cx="50%" cy="50%" r="42"></circle>
                <circle class="LoadingIndicatorCircle" cx="50%" cy="50%" r="42"></circle>
            </svg>
        </div>
</div>`;

const clearSearchButtonElement = `<button
  class="w-48 h-47 flex items-center justify-center text-icon-primary border-0
  border-solid outline-none cursor-pointer bg-transparent
  focus:shadow-[0_0_0_1px_var(--cds-background)_inset]
  focus:border-focus focus:border-2 focus:border-b focus:pb-2
  hover:bg-layer-hover active:bg-layer-active" type="reset" aria-label="Clear search">
  <svg focusable="false" preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16
          8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
  </svg>
</button>`;

const insetBgElement = `<div class="bg-background absolute inset-0 inset-bg-element"
style="opacity: 0.7;"></div>`;
const submenuElement = `<div class="submenu-content absolute inset-0 bg-background z-10 submenu-element"
style="transform: none;">
  <div>
    <button class="h-48 w-full px-16 flex items-center text-helper-text-02 gap-4
    focus-outline border-0 cursor-pointer bg-transparent text-inherit all-documentation"
    type="button">
      <svg focusable="false" preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg" fill="currentColor"
      width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 16L20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"></path>
      </svg>
      <span>All documentation</span>
    </button>
    <div class="mx-16 border-solid border-0 border-b border-border-subtle"></div>
  </div>
  <h2 class="text-heading-03 text-text-primary px-16 my-12 submenu-text-heading"></h2>
  <ul class="cds--side-nav__items pt-0 pb-16 overflow-hidden submenu-list"></ul>
</div>`;

const hamburgerPath = `<path d="M2 14.8H18V16H2zM2 11.2H18V12.399999999999999H2zM2
7.6H18V8.799999999999999H2zM2 4H18V5.2H2z"></path>`;
const crossPath = `<path d="M17.4141 16L24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8
22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"></path>`;
const dropdownMenuElement =
`<div class="cds--form-item px-16 mb-24">
  <div class="cds--select">
    <label for=":r26:" class="cds--label cds--visually-hidden" dir="auto">Select</label>
    <div class="cds--select-input__wrapper">
      <select id=":r26:" class="cds--select-input" title="">
      </select>
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" fill="currentColor"
      width="16" height="16" viewBox="0 0 16 16"
      aria-hidden="true" class="cds--select__arrow"
      xmlns="http://www.w3.org/2000/svg">
        <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
      </svg>
    </div>
  </div>
</div>`;


const expandingValues = {
  'true': true,
  'false': false
};

// Checking top-left menu is opened
let isTopLeftMenuOpened = false;

// Checking current link
function setActiveLink() {
  const currentNavLink = document.querySelector(
    '.cds--header__menu-item--current'
  );
  if (currentNavLink) {
    currentNavLink.className = 'cds--header__menu-item';
  }
  const headerSubmenuCurrent = document.querySelector('.cds--header__submenu');
  if (headerSubmenuCurrent) {
    headerSubmenuCurrent.className = 'cds--header__submenu';
  }
  if (!location.pathname.match('api') && location.pathname !== '/') {
    const section = location.pathname.split('/');
    const activeLink = document.querySelector(
      `.cds--header__menu-item[href="/${section[1]}"]`
    );
    if (activeLink) {
      activeLink.className +=
        ' cds--header__menu-item--current !text-text-primary';
    }
  } else if (location.pathname.match("api")) {
    if (headerSubmenuCurrent) {
      headerSubmenuCurrent.className = `cds--header__submenu after:absolute after:bottom-0
            after:w-full after:bg-border-interactive after:h-[3px]`;
      headerSubmenuCurrent
        .querySelector('button')
        .classList.remove('text-text-secondary');
      headerSubmenuCurrent
        .querySelector('button')
        .classList.add('text-text-primary');
    }
  }
}

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setActiveLink();
  }
}).observe(document, { subtree: true, childList: true });

// Action connected to API Reference button
let apiReferencesListToggled = false;
function apiReferenceMenuClose() {
  const apiReferencesLinksMenu = document.querySelector(
    '.api-references-list'
  );
  if (apiReferencesLinksMenu) {
    apiReferencesLinksMenu.outerHTML = '';
  }
}

let searchData = {
  query: '',
  module: 'documentation',
};
let controller = null;
let signal = null;
const backendURL = `${location.protocol}//${location.hostname}/api/search`;

function customClientRender() {
  const header = document.querySelector('.cds--header');
  document
    .querySelector('.cds--skip-to-content')
    .insertAdjacentHTML('afterend', openTopLeftMenuElement);
  header.insertAdjacentHTML('beforeend', navElement);
  header.insertAdjacentHTML('beforeend', divLgHidden);
  header.insertAdjacentHTML('beforeend', headerGlobalElement);
  setActiveLink();
  // Clicking top-left menu button
  const topLeftMenuButton = document.querySelector(
    'button.cds--header__menu-toggle'
  );
  topLeftMenuButton.addEventListener('click', () => {
    isTopLeftMenuOpened = !isTopLeftMenuOpened;
    const buttonLabel = `${isTopLeftMenuOpened ? 'Close' : 'Open'} menu`;
    const buttonSvgPath = isTopLeftMenuOpened ? crossPath : hamburgerPath;
    topLeftMenuButton.setAttribute('aria-expanded', isTopLeftMenuOpened);
    topLeftMenuButton.setAttribute('title', buttonLabel);
    topLeftMenuButton.setAttribute('aria-label', buttonLabel);
    topLeftMenuButton
      .querySelector('svg')
      .setAttribute(
        'viewBox',
        `0 0 ${isTopLeftMenuOpened ? '32 32' : '20 20'}`
      );
    topLeftMenuButton.querySelector('svg').innerHTML = buttonSvgPath;
    topLeftMenuButton.classList.toggle('cds--header__action--active');
    document.querySelector('#lg-hidden').innerHTML = `${
      isTopLeftMenuOpened ? topLeftNavElement : ''
    }`;
    const topLevelMenuButtons = Array.from(
      document.querySelector('#lg-hidden').querySelectorAll('button[data-menu-level="0"]')
    );
    const getTreeFromQuery = async (href) => {
      const url = `/api/toc${href}`;
      const response = await fetch(url, {
        headers: {'Content-Type': 'application/json'}
      });
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }
      return await response.json();
    }
    topLevelMenuButtons.forEach(
      (button) => button.addEventListener('click', () => {
        button.setAttribute('aria-expanded', !expandingValues[button.getAttribute('aria-expanded')]);
        button.parentElement.classList.remove('cds--side-nav__item--active');
        const createSubmenuLiElement = (children, url, title, type, package) => {
          const isExpanded = type === 'default';
          const submenuLiElement = '<li class="cds--side-nav__item">';
          if (children.length === 1) {
            const link = `<a
            class="cds--side-nav__link${location.pathname === url ?
              ' cds--side-nav__link--current': '' }"
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
          const ulSideMenu = `<ul class="cds--side-nav__menu${isExpanded ? '' : ' hidden'}">`;
          const sideMenuLiElements = children.map(
            (item) => `<li class="cds--side-nav__menu-item">
              <a class="cds--side-nav__link${location.pathname.indexOf(item.url) !== -1 ?
                ' cds--side-nav__link--current': '' }" style="padding-left: 32px; font-weight: 400"
                href="${item.url}">
                <span class="cds--side-nav__link-text">${item.title}</span>
              </a>
            </li>`
          );

          return `${submenuLiElement}${buttonNavSubmenu}
          ${ulSideMenu}${sideMenuLiElements.join('')}</ul></li>`;
        }

        if(!document.querySelector('.inset-bg-element')) {
          button.parentElement.insertAdjacentHTML('beforeend', insetBgElement);
          button.parentElement.insertAdjacentHTML('beforeend', submenuElement);
          document.querySelector('.all-documentation').addEventListener(
            'click',
            () => {
              document.querySelector('.submenu-element').outerHTML = '';
              document.querySelector('.inset-bg-element').outerHTML = '';
              button.setAttribute('aria-expanded', false);
              Array.from(document.querySelectorAll('button[data-menu-level="0"]')).forEach(
                (element) => {
                  if(location.pathname.indexOf(element.dataset.href) !== -1) {
                    element.parentElement.classList.add('cds--side-nav__item--active');
                  }
                }
              )
            }
          )
          getTreeFromQuery(button.dataset.href).then(
            (data) => {
              document.querySelector('.submenu-text-heading').textContent = data.toc.title;
              if(data.package) {
                document.querySelector('.submenu-list').insertAdjacentHTML(
                  'beforebegin',
                  dropdownMenuElement
                );
                data.package.versions.sort(
                  (a, b) => parseFloat(b.version) - parseFloat(a.version)
                );
                data.package.versions.forEach((item) => {
                  document.querySelector('.cds--select-input').insertAdjacentHTML(
                    'beforeend',
                    `<option class="cds--select-option" value="${item.version}">${item.version}</option>`
                  )
                });
                Array.from(document.querySelectorAll('.cds--select-option')).forEach(
                  (option) => {
                    option.addEventListener('click', (event) => {
                      const versionNumber = parseFloat(event.target.value);
                      const apiSection = button.dataset.href;
                      const protocol = location.protocol;
                      const hostname = location.hostname;
                      const port = location.port;
                      location.href = `${protocol}//${hostname}:${port}/${apiSection}/${versionNumber}`;
                    });
                  }
                )
              }
              data.toc.children.forEach(
                (item) => {
                  document.querySelector('.submenu-list').insertAdjacentHTML(
                    'beforeend',
                    createSubmenuLiElement(
                      item.children === undefined ? [[]] : item.children,
                      item.url === undefined ? '' : item.url,
                      item.title,
                      data.type
                    )
                  );
                }
              );
              Array.from(document.querySelectorAll('.expanding-button')).forEach(
                (btn) => {
                  btn.addEventListener('click', () => {
                    btn.setAttribute(
                      'aria-expanded',
                      !expandingValues[btn.getAttribute('aria-expanded')]
                    );
                    if (btn.getAttribute('aria-expanded')) {
                      btn.nextElementSibling.classList.remove('hidden');
                    }
                    else {
                      btn.nextElementSibling.classList.add('hidden');
                    }
                  });
                }
              );
            }
          );
        }
      })
    )
  });
  // Clicking API Reference button
  const apiReferenceButton = document.querySelector(
    'button[aria-label="API Reference"]'
  );
  apiReferenceButton.addEventListener('click', () => {
    apiReferencesListToggled = !apiReferencesListToggled;
    apiReferenceButton.setAttribute('aria-expanded', apiReferencesListToggled);
    const checkApiLink = () => {
      if (location.pathname.match('api')) {
        document.querySelector('.cds--header__submenu').className = `
                    cds--header__submenu after:absolute after:bottom-0 after:w-full
                    after:bg-border-interactive after:h-[3px]`;
        apiReferenceButton.classList.remove('text-text-secondary');
        apiReferenceButton.classList.add('text-text-primary');
      }
    };
    if (apiReferencesListToggled) {
      apiReferenceButton.classList.add('bg-layer');
      apiReferenceButton.classList.remove('bg-background');
      apiReferenceButton.classList.add('text-text-secondary');
      apiReferenceButton.classList.remove('text-text-primary');
      apiReferenceButton.parentElement.insertAdjacentHTML(
        'beforeend',
        apiReferencesListElement
      );
      if (location.pathname.match('api')) {
        document.querySelector('.cds--header__submenu').className =
          'cds--header__submenu';
      }
      document.body.addEventListener('click', (event) => {
        if (event.target !== apiReferenceButton) {
          apiReferenceButton.classList.remove('bg-layer');
          apiReferenceButton.classList.add('bg-background');
          apiReferencesListToggled = false;
          apiReferenceMenuClose();
          checkApiLink();
        }
      });
    } else {
      apiReferenceButton.classList.remove('bg-layer');
      apiReferenceButton.classList.add('bg-background');
      apiReferenceMenuClose();
      checkApiLink();
    }
  });
  // Actions connecting to modal window
  const blockFocusOnElements = (status) => {
    const elements = [
      document.querySelector('header'),
      document.querySelector('footer'),
    ];
    if (document.querySelector('nav[aria-label="Side navigation"]')) {
      elements.push(
        document.querySelector('nav[aria-label="Side navigation"]')
      );
    }
    if (document.querySelector('main')) {
      elements.push(document.querySelector('main'));
    }
    if (document.querySelector('aside')) {
      elements.push(document.querySelector('aside'));
    }
    if (status) {
      elements.forEach((element) => element.setAttribute('inert', ''));
    } else {
      elements.forEach((element) => element.removeAttribute('inert'));
    }
  };
  const removeModule = () => {
    document.querySelector('.cds--modal[aria-hidden="false"]').outerHTML = '';
    blockFocusOnElements(false);
    document.body.removeAttribute('class');
    document.body.removeAttribute('wfd-invisible');
    document.body.removeEventListener('click', modalWindowEventDetect);
    document.body.removeEventListener('keydown', modalWindowEventDetect);
    document.body.addEventListener('keydown', slashKeyPressFunction);
  };

  const clearSearchResults = () => {
    if (document.querySelector('.cds--modal div.scrollbar')) {
      document.querySelector('.cds--modal div.scrollbar').outerHTML = '';
    }
  };

  const getSearchData = () => {
    clearSearchResults();
    document
      .querySelector('.cds--modal.is-visible .cds--modal-content')
      .insertAdjacentHTML('beforeend', modalSearchResultsElement);
    const scrollbarList = document.querySelector('.cds--modal div.scrollbar');
    const resultsList = document.querySelector(
      '.cds--modal ul[role="listbox"]'
    );
    const noResultsDiv = document.querySelector(
      '.cds--modal .px-8.py-16.text-body-compact-01'
    );
    const getSearchResults = async () => {
      controller = new AbortController();
      signal = controller.signal;
      const index = resultsList.children.length;
      const query = `?query=${encodeURIComponent(searchData.query)}`;
      const module = `&module=${searchData.module}`;
      const offsetStart = index > 0 ? `&offset=${index}` : "";
      const url = backendURL + query + module + offsetStart;
      const options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors',
        signal
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }
      resultsList.setAttribute('aria-hidden', false);
      resultsList.classList.remove('hidden');
      return await response.json();
    };
    const showSearchResults = (response) =>
      response.forEach((result) => {
        const listElement = `<li
                aria-disabled="false"
                aria-selected="false"
                id="downshift-:r0:-item-2"
                role="option"
                class="border-0 border-solid border-b border-border-subtle-01 last:border-0"
                >
                    <a
                        class="block text-text-primary hover:text-text-primary cursor-pointer no-underline
                        px-16 py-8 my-8"
                        href="${result.url}">
                        <div class="text-label-01 text-text-helper mb-4">${result.pageTitle}</div>
                        <div class="[&amp;>em]:font-600 [&amp;>em]:not-italic text-body-compact-01
                        truncate mb-4">
                            ${result.title}
                        </div>
                        <div class="[&amp;>em]:font-600 [&amp;>em]:not-italic text-label-01
                        truncate break-all">
                            ${result.text}
                        </div>
                    </a>
                </li>`;
        resultsList.insertAdjacentHTML('beforeend', listElement);
      });
    const closeModalWindowWhileLoading = (event) => {
      const isEscKeyPressed =
        event.type === 'keydown' && event.key === 'Escape';
      const isClickedOutsideModalWindow =
        event.type === 'click' && event.target.classList.contains('cds--modal');
      if (isEscKeyPressed || isClickedOutsideModalWindow) {
        controller.abort();
        removeModule();
      }
    };
    const hideLoader = () => {
      if(document.querySelector('.cds--modal[aria-hidden="false"]')) {
        document.querySelector('button[aria-label="Clear search"]').classList.remove('hidden');
        document.querySelector('#loading-indicator').outerHTML = '';
        document.querySelector('input[type="search"]').disabled = false;
        Array.from(
          document.querySelectorAll('.cds--modal button[role="radio"]')
        ).forEach((button) => (button.disabled = false));
        document.querySelector('.search-query-button').disabled = false;
        scrollbarList.addEventListener('scroll', getMoreData, { passive: true });
      }
      document.body.addEventListener('keydown', modalWindowEventDetect);
      document.body.addEventListener('click', modalWindowEventDetect);
      document.body.removeEventListener(
        'keydown',
        closeModalWindowWhileLoading
      );
      document.body.removeEventListener('click', modalWindowEventDetect);
    };
    const showLoader = () => {
      document
        .querySelector('button[aria-label="Clear search"]')
        .classList.add('hidden');
      document
        .querySelector('button[aria-label="Clear search"]')
        .insertAdjacentHTML("afterend", loadingIndicatorElement);
      document.querySelector('input[type="search"]').disabled = true;
      Array.from(
        document.querySelectorAll('.cds--modal button[role="radio"]')
      ).forEach((button) => (button.disabled = true));
      document.querySelector('.search-query-button').disabled = true;
      scrollbarList.removeEventListener("scroll", getMoreData, {
        passive: true,
      });
      document.body.removeEventListener('keydown', modalWindowEventDetect);
      document.body.removeEventListener('click', modalWindowEventDetect);
      document.body.addEventListener('keydown', closeModalWindowWhileLoading);
      document.body.addEventListener('click', closeModalWindowWhileLoading);
    };
    const loadSearchResults = async () => {
      showLoader();
      const launchSearch = async () => {
        try {
          const response = await getSearchResults();
          if (response.length > 0) {
            showSearchResults(response);
            resultsList.setAttribute('aria-hidden', false);
            resultsList.classList.remove('hidden');
          } else {
            if (resultsList.children.length === 0) {
              noResultsDiv.classList.remove('hidden');
            } else {
              return;
            }
          }
        } catch (error) {
          throw new Error(error.message);
        } finally {
          hideLoader();
        }
      };
      launchSearch();
    };
    const getMoreData = (event) => {
      const { scrollTop, scrollHeight, offsetHeight } = event.target;
      if (scrollTop + offsetHeight >= scrollHeight) {
        loadSearchResults();
      }
    };
    scrollbarList.addEventListener('scroll', getMoreData, { passive: true });
    loadSearchResults();
  };
  const modalWindowEventDetect = (event) => {
    const modalWindow = document.querySelector(
      '.cds--modal[aria-hidden="false"]'
    );
    switch (event.type) {
      case "click":
        if (event.target === modalWindow) {
          removeModule();
        }
      case "keydown":
        if (event.key === "Escape") {
          removeModule();
        }
        if (event.key === "Enter") {
          searchData.query = modalWindow
            .querySelector('input[type="search"]')
            .value.trim();
          getSearchData();
        }
    }
  };
  const slashKeyPressFunction = (event) => {
    if (event.key === '/') {
      event.preventDefault();
      searchWindowOpen();
    }
  };
  const searchWindowOpen = () => {
    document.body.className = 'cds--body--with-modal-open';
    document.body.setAttribute('wfd-invisible', true);
    blockFocusOnElements(true);
    document.body.insertAdjacentHTML('beforeend', modalElement);
    const modalWindow = document.querySelector(
      '.cds--modal[aria-hidden="false"]'
    );
    if (modalWindow) {
      searchData.query = '';
      document.body.addEventListener('click', modalWindowEventDetect);
      document.body.addEventListener('keydown', modalWindowEventDetect);
      document.body.removeEventListener('keydown', slashKeyPressFunction);
      const modalRadioButtons = Array.from(
        modalWindow.querySelectorAll('button[role="radio"]')
      );
      const uncheckRadioButtons = (value) => {
        const otherRadioButtons = modalRadioButtons.filter(
          (item) => item.value !== value
        );
        otherRadioButtons.forEach((button) => {
          button.dataset.state = 'unchecked';
          button.setAttribute('aria-checked', false);
        });
      };
      const checkRadioButton = (button, value) => {
        button.setAttribute('aria-checked', true);
        button.dataset.state = 'checked';
        searchData.module = value;
        uncheckRadioButtons(value);
        localStorage.setItem('module', value);
      };
      if (!localStorage.getItem('module')) {
        localStorage.setItem('module', 'documentation');
        searchData.module = 'documentation';
      } else {
        const previouslySelectedRadioButton = modalRadioButtons.find(
          (button) => button.value === localStorage.getItem('module')
        );
        checkRadioButton(
          previouslySelectedRadioButton,
          localStorage.getItem('module')
        );
      }
      const searchInput = document.querySelector('input[type="search"]');
      searchInput.focus();
      searchInput.value = '';

      searchInput.addEventListener(
        'change',
        (event) => (searchData.query = event.target.value.trim())
      );
      searchInput.addEventListener('input', (event) => {
        const clearSearchButton = document.querySelector(
          'button[aria-label="Clear search"]'
        );
        if (event.target.value.trim().length > 0) {
          if (!clearSearchButton) {
            searchInput.insertAdjacentHTML(
              'afterend',
              clearSearchButtonElement
            );
            document
              .querySelector('button[aria-label="Clear search"]')
              .addEventListener('click', () => {
                searchInput.value = '';
                searchData.query = '';
                clearSearchResults();
                document.querySelector(
                  'button[aria-label="Clear search"]'
                ).outerHTML ='';
              });
          }
        } else {
          if (clearSearchButton) {
            clearSearchButton.outerHTML = "";
          }
        }
      });
      const searchDataButton = document.querySelector('.search-query-button');
      searchDataButton.addEventListener('click', getSearchData);
      modalRadioButtons.forEach((button) =>
        button.addEventListener('click', (event) => {
          checkRadioButton(event.target, event.target.value);
          if (searchInput.value.trim().length > 0) {
            getSearchData();
          }
        })
      );
    }
  };
  const searchButton = document.querySelector('button[aria-label="Search"]');
  searchButton.addEventListener('click', searchWindowOpen);
  document.body.addEventListener('keydown', slashKeyPressFunction);
}
