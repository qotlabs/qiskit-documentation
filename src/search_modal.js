// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import { parseUrl, createElement } from "./common";

class ModalSearchElement {
  static divSectionButtonsElement() {
    const buttons = [
      {
        label: 'All',
        value: 'all',
      },
      {
        label: 'Documentation',
        value: 'documentation',
        checked: true,
        paragraph: 'Searching documentation and additional resources.',
      },
      {
        label: 'Tutorials',
        value: 'tutorials',
      },
      {
        label: 'API Reference',
        value: 'api',
        paragraph: 'Searching in API Reference',
      },
      {
        label: 'Learning',
        value: 'learning',
      },
    ];
    const classButton =
      'appearance-none border-0 inline-flex items-center justify-center align-middle cursor-pointer text-label-01 m-4 px-8 py-2 rounded data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)] data-[state=checked]:bg-background-inverse data-[state=checked]:text-icon-inverse';
    return `
      <div
        role="radiogroup"
        aria-required="false"
        dir="ltr"
        aria-label="Search filter"
        tabindex="0"
        style="outline: none">
          ${buttons
            .map(
              (button) => `
                <button
                  type="button"
                  role="radio"
                  aria-checked=${button.checked ? 'true' : 'false'}
                  data-state=${button.checked ? 'checked' : 'unchecked'}
                  value=${button.value}
                  id="search-radio-${button.value}"
                  class="${classButton}"
                  aria-label="${button.label}"
                  tabindex="0"
                  data-radix-collection-item=""
                  ${
                    button.paragraph
                      ? `data-paragraph="${button.paragraph}"`
                      : ''
                  }
                >${button.label}</button>`
            )
            .join('')}
      </div>`;
  }
  static modalSearchResultsElement() {
    return `
      <div
        class="bg-layer-01 text-text-primary px-8 text-body-compact-01 overflow-y-auto max-h-[455px] scrollbar scrollbar-variant"
      >
        <div class="px-8 py-16 text-body-compact-01 hidden">
          <p class="text-body-compact-02">No results found</p>
          <p class="mt-8 text-label-01">
            Please try a different search query or
            <a class="cds--link text-label-01" href="/docs/guides">browse all documentation</a>.
          </p>
        </div>
        <ul
          id="downshift-:r0:-menu"
          role="listbox"
          aria-labelledby="downshift-:r0:-label"
          class="list-none p-0 m-0 hidden"
          aria-hidden="true"></ul>
        </div>`;
  }
  static loadingIndicatorElement() {
    return `
    <div
      class="w-48 h-47 flex items-center justify-center text-icon-primary border-0 border-solid outline-none cursor-pointer bg-transparent focus:shadow-[0_0_0_1px_var(--cds-background)_inset] focus:border-focus focus:border-2 focus:border-b focus:pb-2 hover:bg-layer-hover active:bg-layer-active"
      id="loading-indicator"
    >
      <div
        aria-atomic="true"
        aria-live="assertive"
        class="Loading"
        data-size="small"
      >
        <svg class="LoadingIndicator" viewBox="0 0 100 100">
          <title>Active loading indicator</title>
          <circle class="LoadingIndicatorBackground" cx="50%" cy="50%" r="42"></circle>
          <circle class="LoadingIndicatorCircle" cx="50%" cy="50%" r="42"></circle>
        </svg>
      </div>
    </div>`;
  }
  static clearSearchButtonElement() {
    return `
      <button
        class="w-48 h-47 flex items-center justify-center text-icon-primary border-0 border-solid outline-none cursor-pointer bg-transparent focus:shadow-[0_0_0_1px_var(--cds-background)_inset] focus:border-focus focus:border-2 focus:border-b focus:pb-2 hover:bg-layer-hover active:bg-layer-active"
        type="reset"
        aria-label="Clear search"
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
          <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16
                8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
        </svg>
      </button>`;
  }
  static focusSentinelButtonElement() {
    return `<button type="button" class="cds--visually-hidden">Focus sentinel</button>`;
  }
  static divSearchElement() {
    return `
      <div
        class="relative flex focus-within-outline h-48 bg-layer-02 border-0 border-b border-solid border-border-strong-01"
      >
        <label
          id="downshift-:r0:-label"
          for="downshift-:r0:-input"
          class="sr-only"
        >
          Search Documentation
        </label>
        <span
          class="absolute flex items-center justify-center w-48 h-48 pointer-events-none"
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
            <path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,
                              3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5
                              S9,11,6.5,11S2,9,2,6.5z"</path>
          </svg>
        </span>
        <input
          aria-activedescendant=""
          aria-autocomplete="list"
          aria-controls="downshift-:r0:-menu"
          aria-expanded="false"
          aria-labelledby="downshift-:r0:-label"
          autocomplete="off"
          id="downshift-:r0:-input"
          role="combobox"
          placeholder="Search documentation"
          data-modal-primary-focus="true"
          class="border-0 font-[inherit] text-[100%] pl-48 h-48 outline-none flex-1 bg-transparent placeholder-text-placeholder text-text-primary clear-search-decoration"
          type="search"
          value=""
          autofocus
        >
      </div>`;
  }
  static modalBodyElement() {
    return `
    <div class="cds--modal-container-body">
      <div class="cds--modal-content p-0 m-0 overflow-y-hidden">
        <search>
          <div
            class="p-16 min-h-[48px] border-0 border-b border-solid border-border-subtle-00 theme-variant"
          >
            <div class="flex items-center justify-between buttons-toolbar"></div>
          </div>
        </search>
      </div>
    </div>`;
  }
  static modalElement() {
    return `
      <div
        class="cds--modal-container w-full max-w-[600px] max-md:static max-md:h-auto"
        role="dialog"
        aria-modal="true"
      ></div>`;
  }
  static rootElement() {
    return `
      <div role="presentation" aria-hidden="false"
        class="cds--modal is-visible px-16 pt-[80px] md:pt-[112px] items-start modal-search"
      ></div>`;
  }
  constructor(parent) {
    this.parent = parent;
    this.root = createElement(ModalSearchElement.rootElement());
    this.modalElement = createElement(ModalSearchElement.modalElement());
    this.modalBodyElement = createElement(
      ModalSearchElement.modalBodyElement()
    );
    this.focusSentinelButtonElement = createElement(
      ModalSearchElement.focusSentinelButtonElement()
    );
    this.divSearchElement = createElement(
      ModalSearchElement.divSearchElement()
    );
    this.clearSearchButtonElement = createElement(
      ModalSearchElement.clearSearchButtonElement()
    );
    this.loadingIndicatorElement = createElement(
      ModalSearchElement.loadingIndicatorElement()
    );
    this.modalSearchResultsElement = createElement(
      ModalSearchElement.modalSearchResultsElement()
    );
    this.divSectionButtonsElement = createElement(
      ModalSearchElement.divSectionButtonsElement()
    );
    this.modalWindowElement = null;
    this.backendURL = `${location.origin}/api/search`;
    this.searchData = {
      query: '',
      module: 'documentation',
    };
    this.controller = new AbortController();
    localStorage.setItem('search_value', '');
  }

  createModalWindow() {
    this.modalWindowElement = this.root;
    this.modalBodyElement
      .querySelector('search')
      .insertBefore(
        this.divSearchElement,
        this.modalBodyElement.querySelector('.theme-variant')
      );
    this.modalBodyElement
      .querySelector('.buttons-toolbar')
      .appendChild(this.divSectionButtonsElement);
    this.modalElement.appendChild(this.focusSentinelButtonElement);
    this.modalElement.appendChild(this.modalBodyElement);
    this.modalElement.appendChild(this.focusSentinelButtonElement.cloneNode(true));
    this.modalWindowElement.appendChild(this.modalElement);
    this.parent.appendChild(this.modalWindowElement);

    // Elements to interact after pasting modal window
    this.sectionButtonsGroup = this.modalWindowElement.querySelector('div[role="radiogroup"]');
    this.radioButtons = Array.from(
      this.sectionButtonsGroup.querySelectorAll('button[role="radio"]')
    );
    this.checkedButton = this.sectionButtonsGroup.querySelector(
      '[aria-checked="true"]'
    );
    this.inputSearch = this.modalWindowElement.querySelector('input[type="search"]');
    this.searchSection = this.modalWindowElement.querySelector('search');
    this.searchDiv = this.searchSection.querySelector('.relative.flex.focus-within-outline');
    this.clearSearchButton = this.searchDiv.querySelector('button[aria-label="Clear search"]');
    this.themeVariant = this.modalWindowElement.querySelector('.theme-variant');
  }

  closeModalWindow() {
    this.controller.abort();
    this.blockFocusOnElements(false);
    document.body.removeAttribute('class');
    document.body.removeAttribute('wfd-invisible');
    document.body.removeEventListener('click', this.listenClose);
    document.body.removeEventListener('keydown', this.listenClose);
    document.body.removeEventListener('keydown', this.listenEnterKey);
    const cdsModal = document.querySelector('.cds--modal');
    if (cdsModal !== null) {
      cdsModal.outerHTML = '';
    }
  }

  checkRadioButton(button) {
    // Uncheck previous button
    const prevButton = this.checkedButton;
    prevButton.setAttribute('aria-checked', false);
    prevButton.dataset.state = 'unchecked';

    // Check new button
    button.setAttribute('aria-checked', true);
    button.dataset.state = 'checked';

    this.searchData.module = button.value;
    localStorage.setItem('module', button.value);

    this.checkedButton = button;
  }

  removeScrollbar() {
    if (this.divScrollbar) {
      this.divScrollbar.outerHTML = '';
      this.divScrollbar = null;
    }
  }

  resetSearchData() {
    this.inputSearch.value = '';
    localStorage.setItem('search_value', '');
    this.removeScrollbar();
    if (this.clearSearchButton) {
      this.clearSearchButton.outerHTML = '';
      this.clearSearchButton = null;
    }
  }

  insertClearSearchButton() {
    if (this.inputSearch.value.trim().length > 0) {
      if (!this.clearSearchButton) {
        this.searchDiv.appendChild(this.clearSearchButtonElement);
        this.clearSearchButton = this.searchDiv.querySelector('button[aria-label="Clear search"');
        this.clearSearchButton.addEventListener('click', () =>
          this.resetSearchData()
        );
      }
    } else {
      this.resetSearchData();
    }
  }

  blockFocusOnElements(status) {
    const selectors = [
      'header',
      'footer',
      'nav[aria-label="Side navigation"]',
      'main',
      'aside',
    ];
    selectors.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.toggleAttribute('inert', status);
      }
    });
  }

  async fetchSearchResults() {
    let url = this.backendURL;
    url += `?query=${encodeURIComponent(this.searchData.query)}`;
    url += `&module=${this.searchData.module}`;
    url += `&offset=${this.listbox.children.length}`;
    if (this.searchData.module === 'api') {
      url += parseUrl(location.pathname).version ? `&version=${parseUrl(location.pathname).version}` : ''
    }
    this.controller = new AbortController();
    const response = await fetch(url, { signal: this.controller.signal });
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    this.listbox.setAttribute('aria-hidden', false);
    this.listbox.classList.remove('hidden');
    return await response.json();
  }

  listenClose(event) {
    const clickedOutside =
      event.type === 'click' && event.target === this.modalWindowElement;
    const escapePressed = event.type === 'keydown' && event.key === 'Escape';
    if (clickedOutside || escapePressed) {
      this.closeModalWindow();
    }
  }

  listenEnterKey(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  insertParagraph() {
    if (this.divTooltip) {
      this.divTooltip.outerHTML = '';
    }
    if ('paragraph' in this.checkedButton.dataset) {
      const divToolTipParagraph = createElement(
        '<div class="pt-8 text-label-01 text-text-helper"><p class="m-0"></p></div>'
      );
      this.themeVariant.appendChild(divToolTipParagraph);
      this.divTooltip = this.themeVariant.querySelector('.pt-8.text-label-01.text-text-helper');
      const paragraphTooltip = this.divTooltip.querySelector('.m-0');
      paragraphTooltip.textContent = this.checkedButton.dataset.paragraph;
      if (this.searchData.module === 'api') {
        const version = parseUrl(location.pathname).version;
        if (version) {
          const apiSectionTitle = document.querySelector(
            'nav[aria-label="Side navigation (docs)"] .text-heading-03.px-16.text-text-primary'
          ).textContent;
          paragraphTooltip.textContent = `Searching ${apiSectionTitle}${
            version === 'dev' ? ` dev version` : ` v${version}`
          } and latest versions of other APIs.`;
        } else {
          paragraphTooltip.textContent = 'Searching latest API versions.';
        }
      }
    }
  }

  openModalWindow() {
    document.body.className = 'cds--body--with-modal-open';
    document.body.setAttribute('wfd-invisible', true);
    this.blockFocusOnElements(true);
    this.createModalWindow();
    document.body.addEventListener('click', (event) => this.listenClose(event));
    document.body.addEventListener('keydown', (event) =>
      this.listenClose(event)
    );
    document.body.addEventListener('keydown', (event) =>
      this.listenEnterKey(event)
    );

    const module = localStorage.getItem('module') || 'documentation';
    const search_value = localStorage.getItem('search_value');

    const previouslyCheckedButton = this.radioButtons.find(
      (button) => button.value === module
    );
    this.checkRadioButton(previouslyCheckedButton);

    this.inputSearch.value = search_value;
    this.inputSearch.focus();
    this.inputSearch.addEventListener('input', () =>
      this.insertClearSearchButton()
    );

    this.radioButtons.forEach((button) =>
      button.addEventListener('click', (event) => {
        this.checkRadioButton(event.target);
        this.insertParagraph();
        this.search();
      })
    );
    this.insertParagraph();
  }

  toggleEventListener(element, force, type, listener, options) {
    if (force) {
      element.addEventListener(type, listener, options);
    } else {
      element.removeEventListener(type, listener, options);
    }
  }

  toggleLoader(show) {
    const loadingIndicator = this.modalWindowElement.querySelector('#loading-indicator');
    this.clearSearchButton.classList.toggle('hidden', show);
    show ? this.divSearchElement.appendChild(this.loadingIndicatorElement) : loadingIndicator.outerHTML = '';
    this.inputSearch.disabled = show;
    this.radioButtons.forEach((button) => (button.disabled = show));
    this.toggleEventListener(this.divScrollbar, !show, 'scroll', this.loadMoreResults, {
      passive: true,
    });
    this.toggleEventListener(document.body, !show, 'keydown', this.listenEnterKey);
  }

  getListElement(searchResult) {
    let pageTitle = searchResult.pageTitle;
    if (this.searchData.module === 'api') {
      let url = `/${searchResult.url.split('/').slice(3).join('/')}`;
      const version = parseUrl(url).version;
      if (version) {
        pageTitle =
          version === 'dev'
            ? `${pageTitle} (dev version)`
            : `${pageTitle} (v${version})`;
      } else {
        pageTitle = `${pageTitle} (latest version)`;
      }
    }
    return createElement(`
      <li
        aria-disabled="false"
        aria-selected="false"
        id="downshift-:r0:-item-2"
        role="option"
        class="border-0 border-solid border-b border-border-subtle-01 last:border-0"
      >
        <a
          class="block text-text-primary hover:text-text-primary cursor-pointer no-underline px-16 py-8 my-8"
          href="${searchResult.url}"
        >
          <div class="text-label-01 text-text-helper mb-4">${searchResult.section} / ${pageTitle}</div>
          <div
            class="[&amp;>em]:font-600 [&amp;>em]:not-italic text-body-compact-01 truncate mb-4"
          >
            ${searchResult.title}
          </div>
          <div
            class="[&amp;>em]:font-600 [&amp;>em]:not-italic text-label-01 truncate break-all"
          >
            ${searchResult.text}
          </div>
        </a>
      </li>`);
  }

  async loadSearchResults() {
    this.toggleLoader(true);
    try {
      const response = await this.fetchSearchResults();
      if (response.length > 0) {
        response.forEach((result) => {
          this.listbox.appendChild(this.getListElement(result));
        });
        this.listbox.setAttribute('aria-hidden', false);
        this.listbox.classList.remove('hidden');
      } else {
        if (this.listbox.children.length === 0) {
          this.noSearchResultsElement.classList.remove('hidden');
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') throw error;
    }
    this.toggleLoader(false);
  }

  loadMoreResults(event) {
    const {scrollTop, scrollHeight, offsetHeight} = event.target;
    if (scrollTop + offsetHeight >= scrollHeight) {
      this.loadSearchResults();
    }
  }

  search() {
    this.searchData.query = this.inputSearch.value.trim();
    if (this.searchData.query.length === 0) {
      return;
    }
    localStorage.setItem('search_value', this.searchData.query);
    this.removeScrollbar();

    this.searchSection.appendChild(this.modalSearchResultsElement);
    this.divScrollbar = this.searchSection.querySelector('.scrollbar');
    this.listbox = this.divScrollbar.querySelector('ul[role="listbox"');
    this.listbox.innerHTML = '';
    this.noSearchResultsElement = this.divScrollbar.querySelector('.px-8.py-16.text-body-compact-01')
    this.divScrollbar.removeEventListener('scroll', (event) => this.loadMoreResults(event), {passive: true});
    this.divScrollbar.addEventListener('scroll', (event) => this.loadMoreResults(event), {passive: true});
    this.loadSearchResults();
  }
}

export default function render() {
  const searchMenu = new ModalSearchElement(document.body);
  const searchButtons = document.querySelectorAll(
    'button[aria-label="Open search dialog"]'
  );
  for (const button of searchButtons) {
    button.addEventListener('click', () => searchMenu.openModalWindow());
  }
}
