// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

const modalElement = `
<div
  role="presentation"
  aria-hidden="false"
  class="cds--modal is-visible px-16 pt-[80px] md:pt-[112px] items-start"
>
  <div
    class="cds--modal-container w-full max-w-[600px] max-md:static max-md:h-auto"
    role="dialog"
    aria-modal="true"
  >
    <button type="button" class="cds--visually-hidden">Focus sentinel</button>
    <div class="cds--modal-container-body">
      <div class="cds--modal-content p-0 m-0 overflow-y-hidden">
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
              <path
                d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,
                                3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5
                                S9,11,6.5,11S2,9,2,6.5z"
              ></path>
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
          />
        </div>
        <div
          class="flex p-16 min-h-[48px] items-center justify-between border-0 border-b border-solid border-border-subtle-01 theme-variant"
        >
          <div
            role="radiogroup"
            aria-required="false"
            dir="ltr"
            aria-label="Search filter"
            tabindex="0"
            style="outline: none"
          >
            <button
              type="button"
              role="radio"
              aria-checked="true"
              data-state="checked"
              value="documentation"
              id="search-radio-documentation"
              class="appearance-none border-0 inline-flex items-center justify-center align-middle cursor-pointer text-label-01 m-4 px-8 py-2 rounded data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)] data-[state=checked]:bg-background-inverse data-[state=checked]:text-icon-inverse"
              aria-label="Documentation"
              tabindex="0"
              data-radix-collection-item=""
            >
              Documentation
            </button>
            <button
              type="button"
              role="radio"
              aria-checked="false"
              data-state="unchecked"
              value="api"
              id="search-radio-api"
              class="appearance-none border-0 inline-flex items-center justify-center align-middle cursor-pointer text-label-01 m-4 px-8 py-2 rounded data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)] data-[state=checked]:bg-background-inverse data-[state=checked]:text-icon-inverse"
              aria-label="API Reference"
              tabindex="0"
              data-radix-collection-item=""
            >
              API Reference
            </button>
          </div>
          <div class="max-md:hidden">
            <span
              class="cds--popover-container cds--popover--caret cds--popover--high-contrast cds--popover--top-right cds--tooltip"
            >
              <div class="cds--tooltip-trigger__wrapper">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-24 h-24 bg-background text-text-secondary appearance-none rounded border-0 border-solid search-query-button"
                  style="box-shadow: 0px 0px 5px 0px var(--cds-layer-active)"
                  aria-labelledby="tooltip-:r4:"
                >
                  /
                </button>
              </div>
              <span
                aria-hidden="true"
                id="tooltip-:r4:"
                role="tooltip"
                class="cds--popover"
              >
                <span class="cds--popover-content cds--tooltip-content">
                  Press "/" to open search
                </span>
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

const modalSearchResultsElement = `
<div
  class="bg-layer-01 text-text-primary px-8 text-body-compact-01 overflow-y-auto max-h-[455px] scrollbar scrollbar-variant"
>
  <div class="px-8 py-16 text-body-compact-01 hidden">
    <p class="m-0">No results found</p>
    <p class="m-0 mt-4 text-label-01 text-text-secondary">
      Please try a different search query or browse all documentation.
    </p>
  </div>
  <ul
    id="downshift-:r0:-menu"
    role="listbox"
    aria-labelledby="downshift-:r0:-label"
    class="list-none p-0 m-0 hidden"
    aria-hidden="true"
  ></ul>
</div>`;

const loadingIndicatorElement = `
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
      <circle
        class="LoadingIndicatorBackground"
        cx="50%"
        cy="50%"
        r="42"
      ></circle>
      <circle class="LoadingIndicatorCircle" cx="50%" cy="50%" r="42"></circle>
    </svg>
  </div>
</div>`;

const clearSearchButtonElement = `
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
    <path
      d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16
          8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"
    ></path>
  </svg>
</button>`;

const backendURL = `${location.origin}/api/search`;

let searchData = {
  query: '',
  module: 'documentation',
};

let controller = null;
let signal = null;

export default function render() {
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
      const offsetStart = index > 0 ? `&offset=${index}` : '';
      const url = backendURL + query + module + offsetStart;
      const options = {
        signal,
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
      if (document.querySelector('.cds--modal[aria-hidden="false"]')) {
        document
          .querySelector('button[aria-label="Clear search"]')
          .classList.remove('hidden');
        document.querySelector('#loading-indicator').outerHTML = '';
        document.querySelector('input[type="search"]').disabled = false;
        Array.from(
          document.querySelectorAll('.cds--modal button[role="radio"]')
        ).forEach((button) => (button.disabled = false));
        document.querySelector('.search-query-button').disabled = false;
        scrollbarList.addEventListener('scroll', getMoreData, {
          passive: true,
        });
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
        .insertAdjacentHTML('afterend', loadingIndicatorElement);
      document.querySelector('input[type="search"]').disabled = true;
      Array.from(
        document.querySelectorAll('.cds--modal button[role="radio"]')
      ).forEach((button) => (button.disabled = true));
      document.querySelector('.search-query-button').disabled = true;
      scrollbarList.removeEventListener('scroll', getMoreData, {
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
      const {scrollTop, scrollHeight, offsetHeight} = event.target;
      if (scrollTop + offsetHeight >= scrollHeight) {
        loadSearchResults();
      }
    };
    scrollbarList.addEventListener('scroll', getMoreData, {passive: true});
    loadSearchResults();
  };
  const modalWindowEventDetect = (event) => {
    const modalWindow = document.querySelector(
      '.cds--modal[aria-hidden="false"]'
    );
    switch (event.type) {
      case 'click':
        if (event.target === modalWindow) {
          removeModule();
        }
      case 'keydown':
        if (event.key === 'Escape') {
          removeModule();
        }
        if (event.key === 'Enter') {
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
                ).outerHTML = '';
              });
          }
        } else {
          if (clearSearchButton) {
            clearSearchButton.outerHTML = '';
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
