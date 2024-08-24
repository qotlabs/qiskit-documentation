// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright (c) 2024 Quantum Optical Technologies Laboratories
// SPDX-FileContributor: Gleb Struchalin <struchalin.gleb@physics.msu.ru>

/**
 * Top-level menu structure.
 *
 * Keys:
 *  1. title - text of the menu item.
 *  2. url - URL of the menu item.
 *  3. toc - if `true` then this item has additional table of contents (TOC).
 *     Such item is expandable in the side navigation.
 *  4. children - items in the current section.
 */
// prettier-ignore
export const menuStruct = [
    {title: 'Home', url: '/', toc: false},
    {title: 'Guides', url: '/guides', toc: true},
    {title: 'API reference', children: [
      {title: 'Qiskit SDK', url: '/api/qiskit', toc: true},
      {title: 'Qiskit Runtime IBM Client', url: '/api/qiskit-ibm-runtime', toc: true},
      {title: 'Qiskit Transpiler Service Client', url: '/api/qiskit-transpiler-service', toc: true},
    ]},
    {title: 'Additional resources', children: [
      {title: 'Migration guides', url: '/migration-guides', toc: true},
      {title: 'Open-source resources', url: '/open-source', toc: true},
      {title: 'Responsible quantum computing', url: '/responsible-quantum-computing', toc: false},
      {title: 'Qiskit ecosystem', url: 'https://www.ibm.com/quantum/ecosystem', toc: false},
    ]},
  ];

/**
 * Return numeric unique ID.
 * @returns The number that is incremented after each call.
 */
export let uid = (() => {
  let id = 0;
  return () => id++;
})();

/**
 * Create an element given HTML code.
 * @param {string} html - HTML string.
 * @returns Created `Element` or `HTMLCollection`.
 */
export function createElement(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  const result = t.content.children;
  return result.length === 1 ? result[0] : result;
}

/**
 * Check whether the given URL matches the given section URL.
 * @param {string} section - section URL for checking.
 * @param {string} url - URL for checking.
 * @returns `true` if URL belongs to section, `false` otherwise.
 */
export function matchSection(section, url) {
  return section === url || url.startsWith(section + '/');
}

/**
 * Download table of contents (TOC) for the given section URL.
 * @param {string} url - section URL.
 * @returns JSON corresponding to the TOC.
 * This function is asynchronous and caches the result.
 */
export let fetchToc = (() => {
  let tocs = {};
  return async (url) => {
    if (tocs.hasOwnProperty(url)) {
      return tocs[url];
    }
    const response = await fetch('/api/toc' + url, {
      headers: {'Content-Type': 'application/json'},
    });
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    tocs[url] = await response.json();
    return tocs[url];
  }
})();

/**
 * Compare versions.
 * @param {string} v1 - the first version string.
 * @param {string} v2 - the second version string.
 * @returns Positive integer if v1 > v2, negative integer if v1 < v2, and zero
 * if v1 = v2.
 *
 * The function assumes that version strings are in the format:
 * "major.minor.patch-suffix",
 * where "suffix" and "-" are optional.
 */
export function versionCompare(v1, v2) {
  const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)\-?(\D\w*)?$/;
  let [_1, major1, minor1, patch1, suf1] = v1.match(regex);
  let [_2, major2, minor2, patch2, suf2] = v2.match(regex);
  suf1 = suf1 ?? '';
  suf2 = suf2 ?? '';
  if (major1 !== major2) return major1 - major2;
  else if (minor1 !== minor2) return minor1 - minor2;
  else if (patch1 !== patch2) return patch1 - patch2;
  // `localeCompare` gives the correct result since:
  // '' < 'dev' , 'dev' < 'rc', 'rc1' < 'rc2', etc.
  else return suf1.localeCompare(suf2);
}

/**
 * Parse the given URL to determine version and whether the URL corresponds
 * to a package.
 * @param {string} url - URL for parsing.
 * @returns Object with fields `{package, version}`.
 * `package` is `true` is the URL is versioned.
 * `version` is the parsed version or `undefined` if version is not found.
 */
export function parseUrl(url) {
  const [_1, section, _2, version] = url.split('/');
  if (section !== 'api') {
    return {package: false, version: undefined};
  }
  if (version && version.match(/^(dev|[0-9]\.[0-9]+)$/)) {
    return {package: true, version: version};
  }
  return {package: true, version: undefined};
}
