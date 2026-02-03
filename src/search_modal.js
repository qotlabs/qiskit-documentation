// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Fedor Medvedev <fedor_medvedev42@rambler.ru>
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

import { parseUrl } from "./common";

const modalElement = `
<div
  role="presentation"
  aria-hidden="false"
  class="cds--modal is-visible px-16 pt-[80px] md:pt-[112px] items-start modal-search"
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
          class="p-16 min-h-[48px] border-0 border-b border-solid border-border-subtle-00 theme-variant"
          >
          <div class="flex items-center justify-between">
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
                data-paragraph="Searching documentation and additional resources."
                data-radix-collection-item=""
              >
                Documentation
              </button>
              <button
                type="button"
                role="radio"
                aria-checked="false"
                data-state="unchecked"
                value="tutorials"
                id="search-radio-tutorials"
                class="appearance-none border-0 inline-flex items-center justify-center align-middle cursor-pointer text-label-01 m-4 px-8 py-2 rounded data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)] data-[state=checked]:bg-background-inverse data-[state=checked]:text-icon-inverse"
                aria-label="Tutorials"
                tabindex="0"
                data-radix-collection-item=""
              >
                Tutorials
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
                data-paragraph="Searching latest API versions."
              >
                API Reference
              </button>
              <button
                type="button"
                role="radio"
                aria-checked="false"
                data-state="unchecked"
                value="learning"
                id="search-radio-learning"
                class="appearance-none border-0 inline-flex items-center justify-center align-middle cursor-pointer text-label-01 m-4 px-8 py-2 rounded data-[state=unchecked]:bg-background data-[state=unchecked]:text-text-secondary data-[state=unchecked]:shadow-[0_0_0_1px_var(--cds-layer-active)] data-[state=checked]:bg-background-inverse data-[state=checked]:text-icon-inverse"
                aria-label="Learning"
                tabindex="0"
                data-radix-collection-item=""
              >
                Learning
              </button>
            </div>
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

let controller = new AbortController();

function blockFocusOnElements(status) {
  const selectors = [
    'header',
    'footer',
    'nav[aria-label="Side navigation"]',
    'main',
    'aside',
  ];
  selectors.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.toggleAttribute('inert', status);
  });
}

function closeModalWindow() {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }
  controller.abort();
  modalWindow.outerHTML = '';
  blockFocusOnElements(false);
  document.body.removeAttribute('class');
  document.body.removeAttribute('wfd-invisible');
  document.body.removeEventListener('click', listenClose);
  document.body.removeEventListener('keydown', listenClose);
  document.body.removeEventListener('keydown', listenEnterKey);
}

function removeScrollbar() {
  const scrollbar = document.querySelector('.modal-search div.scrollbar');
  if (scrollbar) {
    scrollbar.outerHTML = '';
  }
}

async function fetchSearchResults() {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }

  const listBox = modalWindow.querySelector('ul[role="listbox"]');
  const offset = listBox.children.length;
  let url = backendURL;
  url += `?query=${encodeURIComponent(searchData.query)}`;
  url += `&module=${searchData.module}`;
  url += `&offset=${offset}`;

  if (searchData.module === 'api') {
    const version = parseUrl(location.pathname).version;
    if (version) url += `&version=${version}`;
  }

  controller = new AbortController();
  const response = await fetch(url, {signal: controller.signal});
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }
  listBox.setAttribute('aria-hidden', false);
  listBox.classList.remove('hidden');
  return await response.json();
}

function listenClose(event) {
  const modalWindow = document.querySelector('.modal-search');
  const clickedOutside = event.type === 'click' && event.target === modalWindow;
  const escapePressed = event.type === 'keydown' && event.key === 'Escape';
  if (clickedOutside || escapePressed) {
    closeModalWindow();
  }
}

function listenEnterKey(event) {
  if (event.key === 'Enter') {
    search();
  }
}



function toggleEventListener(element, force, type, listener, options) {
  if (force) {
    element.addEventListener(type, listener, options);
  } else {
    element.removeEventListener(type, listener, options);
  }
}

function toggleLoader(show) {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }

  const clearSearchButton = modalWindow.querySelector(
    'button[aria-label="Clear search"]'
  );
  clearSearchButton.classList.toggle('hidden', show);
  if (show) {
    clearSearchButton.insertAdjacentHTML('afterend', loadingIndicatorElement);
  } else {
    modalWindow.querySelector('#loading-indicator').outerHTML = '';
  }
  modalWindow.querySelector('input[type="search"]').disabled = show;
  Array.from(
    modalWindow.querySelectorAll('.cds--modal button[role="radio"]')
  ).forEach((button) => (button.disabled = show));
  const scrollbar = modalWindow.querySelector('div.scrollbar');
  toggleEventListener(scrollbar, !show, 'scroll', loadMoreResults, {
    passive: true,
  });
  toggleEventListener(document.body, !show, 'keydown', listenEnterKey);
}

function getListElement(searchResult) {
  return `
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
        <div class="text-label-01 text-text-helper mb-4">${searchResult.section} / ${searchResult.pageTitle}</div>
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
    </li>`;
}

async function loadSearchResults() {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }
  toggleLoader(true);
  const listBox = modalWindow.querySelector('ul[role="listbox"]');
  try {
    const response = await fetchSearchResults();
    if (response.length > 0) {
      response.forEach((result) => {
        listBox.insertAdjacentHTML('beforeend', getListElement(result));
      });
      listBox.setAttribute('aria-hidden', false);
      listBox.classList.remove('hidden');
    } else {
      if (listBox.children.length === 0) {
        modalWindow
          .querySelector('.px-8.py-16.text-body-compact-01')
          .classList.remove('hidden');
      }
    }
  } catch (error) {
    if (error.name !== 'AbortError') throw error;
  }
  toggleLoader(false);
}

function loadMoreResults(event) {
  const {scrollTop, scrollHeight, offsetHeight} = event.target;
  if (scrollTop + offsetHeight >= scrollHeight) {
    loadSearchResults();
  }
}

function search() {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }
  searchData.query = modalWindow
    .querySelector('input[type="search"]')
    .value.trim();
  if (searchData.query.length === 0) {
    return;
  }

  removeScrollbar();
  modalWindow
    .querySelector('.cds--modal-content')
    .insertAdjacentHTML('beforeend', modalSearchResultsElement);
  modalWindow
    .querySelector('div.scrollbar')
    .addEventListener('scroll', loadMoreResults, {passive: true});
  loadSearchResults();
}

function checkRadioButton(button) {
  // Uncheck previous button
  const modalWindow = document.querySelector('.modal-search');
  const prevButton = modalWindow.querySelector(
    'button[role="radio"][aria-checked="true"]'
  );
  prevButton.setAttribute('aria-checked', false);
  prevButton.dataset.state = 'unchecked';

  // Check new button
  button.setAttribute('aria-checked', true);
  button.dataset.state = 'checked';

  searchData.module = button.value;
  localStorage.setItem('module', button.value);
}

function insertClearSearchButton(event) {
  const modalWindow = document.querySelector('.modal-search');
  if (!modalWindow) {
    return;
  }
  const searchValue = event.target.value.trim();
  const clearSearchButton = modalWindow.querySelector(
    'button[aria-label="Clear search"]'
  );
  const inputSearch = modalWindow.querySelector('input[type="search"]');
  if (searchValue.length > 0) {
    const resetSearchData = () => {
      inputSearch.value = '';
      removeScrollbar();
      modalWindow.querySelector('button[aria-label="Clear search"]').outerHTML =
        '';
    };
    if (!clearSearchButton) {
      inputSearch.insertAdjacentHTML('afterend', clearSearchButtonElement);
      modalWindow
        .querySelector('button[aria-label="Clear search"]')
        .addEventListener('click', resetSearchData);
    }
  } else {
    clearSearchButton.outerHTML = '';
  }
}

function insertParagraph() {
  const modalWindow = document.querySelector('.modal-search')
	const newDivTooltip = '<div class="pt-8 text-label-01 text-text-helper"><p class="m-0"></p></div>';
	const oldDivTooltip = modalWindow.querySelector('.pt-8.text-label-01.text-text-helper');
	const checkedElement = modalWindow.querySelector(
    'button[role="radio"][aria-checked="true"]'
  );
	if (oldDivTooltip) {
		oldDivTooltip.outerHTML = '';
	}
	if('paragraph' in checkedElement.dataset) {
		modalWindow.querySelector('.theme-variant').insertAdjacentHTML('beforeend', newDivTooltip);
		modalWindow.querySelector('.pt-8.text-label-01.text-text-helper').querySelector('.m-0').textContent = checkedElement.dataset.paragraph;
	}
}

function openModalWindow() {
  document.body.className = 'cds--body--with-modal-open';
  document.body.setAttribute('wfd-invisible', true);
  blockFocusOnElements(true);
  document.body.insertAdjacentHTML('beforeend', modalElement);
  document.body.addEventListener('click', listenClose);
  document.body.addEventListener('keydown', listenClose);
  document.body.addEventListener('keydown', listenEnterKey);

  const modalWindow = document.querySelector('.modal-search');
  const module = localStorage.getItem('module') || 'documentation';
  const radioButtons = Array.from(
    modalWindow.querySelectorAll('button[role="radio"]')
  );
  const previouslyCheckedButton = radioButtons.find(
    (button) => button.value === module
  );
  checkRadioButton(previouslyCheckedButton);

  const searchInput = modalWindow.querySelector('input[type="search"]');
  searchInput.value = '';
  searchInput.focus();
  searchInput.addEventListener('input', insertClearSearchButton);


  radioButtons.forEach((button) =>
    button.addEventListener('click', (event) => {
      checkRadioButton(event.target);
      insertParagraph();
      search();
    })
  );

  insertParagraph();
}

export default function render() {
  document
    .querySelector('button[aria-label="Search"]')
    .addEventListener('click', openModalWindow);
}
