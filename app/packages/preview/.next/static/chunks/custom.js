const customInterval = setInterval(() => {
    const header_name = document.querySelector('.cds--header__name');
    // hydrateRoot() adds onclick event so just wait until it appears
    if(header_name && typeof header_name.onclick === "function") {
        clearInterval(customInterval);
        customClientRender();
    }
}, 10);

const regularLinks = [
    {
        href: '/start',
        text: 'Start'
    },
    {
        href: '/build',
        text: 'Build'
    },
    {
        href: '/verify',
        text: 'Verify'
    },
    {
        href: '/run',
        text: 'Run'
    }
];

const apiReferenceLinks = [
    {
        href: '/api/qiskit',
        text: 'Qiskit'
    },
    {
        href: '/api/qiskit-ibm-runtime',
        text: 'Qiskit Runtime IBM Client'
    },
    {
        href: '/api/qiskit-ibm-provider',
        text: 'Qiskit IBM Provider'
    },
    {
        href: '/api/migration-guides',
        text: 'Migration guides'
    }
];

const pathName = document.location.pathname;

const createNavigationLinkElement = (href, text) => {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', href);
    linkElement.setAttribute('role', 'menuitem');
    linkElement.setAttribute('tabindex', 0);
    let spanClass = 'cds--text-truncate--end';
    if (!href.match('api')){
        linkElement.classList.add('cds--header__menu-item');
        linkElement.addEventListener('click', (event) => {
            if (href === pathName) {
                event.preventDefault(); 
            }
            else {
                const activeLink = document.querySelector('.cds--header__menu-item--current');
                activeLink.classList.remove('cds--header__menu-item--current');
                activeLink.classList.remove('!text-text-primary');
            }
        });
        if (href === pathName) {
            linkElement.setAttribute('tabindex', -1);
            linkElement.classList.add('cds--header__menu-item--current'); 
            linkElement.classList.add('!text-text-primary');
        }
    }
    else {
        const classNameList = `text-body-compact-01
        flex
        items-center
        h-48
        px-16
        border-2
        transition-colors
        hover:bg-background-hover
        hover:text-text-primary
        border-transparent
        focus-outline
        bg-layer
        text-text-secondary`;
        linkElement.className = classNameList;
        spanClass = 'truncate';
    }
    const spanElement = document.createElement('span');
    spanElement.classList.add(spanClass);
    const textContent = document.createTextNode(text);
    spanElement.appendChild(textContent);
    linkElement.appendChild(spanElement);
    return linkElement;
};

const createNavigationListElement = () => {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('cds--header__menu-bar');
    ulElement.setAttribute('role', 'menubar');
    ulElement.setAttribute('aria-label', 'IBM Documentation');
    return ulElement;
};

const createNavigationElement = () => {
    const navElement = document.createElement('nav');
    navElement.classList.add('cds--header__nav');
    navElement.setAttribute('aria-label', 'IBM Documentation');
    return navElement;
};

const createIcon = (pathAttribute) => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('focusable', false);
    icon.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    icon.setAttribute('fill', 'currentColor');
    icon.setAttribute('width', 16);
    icon.setAttribute('height', 16);
    icon.setAttribute('viewBox', '0 0 16 16');
    icon.setAttribute('aria-hidden', true);
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', pathAttribute);
    icon.appendChild(path);
    return icon;
}

const customClientRender = () => {
    const header = document.querySelector('.cds--header');
    const linksList = createNavigationListElement();
    const navigation = createNavigationElement();
    regularLinks.forEach(
        (link) => {
            const listElement = document.createElement('li');
            listElement.setAttribute('role', 'none')
            listElement.appendChild(createNavigationLinkElement(
                link.href,
                link.text
            ));
            linksList.appendChild(listElement);
        }
    );

    const apiReferenceListElement = document.createElement('li');
    apiReferenceListElement.classList.add('cds--header__submenu');
    apiReferenceListElement.setAttribute('role', 'none');
    const checkCurrentLink = () => {
        if (pathName.match('api')) {
            apiReferenceListElement.classList.add('after:absolute');
            apiReferenceListElement.classList.add('after:bottom-0');
            apiReferenceListElement.classList.add('after:w-full');
            apiReferenceListElement.classList.add('after:bg-border-interactive');
            apiReferenceListElement.classList.add('after:h-[3px]');
            apiReferenceButton.classList.remove('text-text-secondary');
            apiReferenceButton.classList.add('text-text-primary');
        }
    };
    

    let apiReferenceListToggled = false;

    const arrowDownIcon = createIcon('M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z');
    arrowDownIcon.classList.add('cds--header__menu-arrow');
    const apiReferenceButton = document.createElement('button');
    apiReferenceButton.setAttribute('role', 'menuitem');
    apiReferenceButton.setAttribute('aria-haspopup', 'menu');
    apiReferenceButton.setAttribute('aria-expanded', apiReferenceListToggled);
    apiReferenceButton.setAttribute('aria-controls', 'radix-:R1k6ta:');
    apiReferenceButton.setAttribute('aria-label', 'API Reference');
    apiReferenceButton.appendChild(document.createTextNode('API Reference'));
    apiReferenceButton.className = `relative
        text-body-compact-01
        flex
        items-center
        h-full
        whitespace-nowrap
        px-16
        border-2
        transition-colors
        hover:bg-background-hover
        hover:text-text-primary
        border-transparent
        focus-outline
        text-text-secondary`;
    apiReferenceButton.appendChild(arrowDownIcon);
    checkCurrentLink();

    const apiReferenceLinksMenu = document.createElement('ul');
    apiReferenceLinksMenu.setAttribute('role', 'menu');
    apiReferenceLinksMenu.setAttribute('tabindex', 0);
    apiReferenceLinksMenu.setAttribute('id', 'radix-:R1k6ta:');
    apiReferenceLinksMenu.style.outline = 'none';
    apiReferenceLinksMenu.className = `flex
    cds--header__menu
    m-0
    p-0
    flex-col
    bg-layer
    min-w-[200px]
    shadow-[0_0_6px_-1px_var(--cds-shadow)]`;

    const apiReferenceMenuClose = () => {
        if(apiReferenceLinksMenu) {
            apiReferenceLinksMenu.outerHTML = '';
            apiReferenceButton.classList.remove('bg-layer');
            apiReferenceButton.classList.add('bg-background');
            checkCurrentLink();
        }
    };

    const addElementsToLinksMenu = () => {
        apiReferenceListElement.classList.remove('after:absolute');
        apiReferenceListElement.classList.remove('after:bottom-0');
        apiReferenceListElement.classList.remove('after:w-full');
        apiReferenceListElement.classList.remove('after:bg-border-interactive');
        apiReferenceListElement.classList.remove('after:h-[3px]');
        apiReferenceButton.classList.add('text-text-secondary');
        apiReferenceButton.classList.remove('text-text-primary');
        apiReferenceListToggled = !apiReferenceListToggled;
        apiReferenceButton.setAttribute('aria-expanded', apiReferenceListToggled);
        if(apiReferenceListToggled) {
            apiReferenceButton.insertAdjacentElement('afterend', apiReferenceLinksMenu);
            apiReferenceLinksMenu.innerHTML = '';
            apiReferenceLinks.forEach((link) => {
                const apiReferenceLinkElement = createNavigationLinkElement(
                    link.href,
                    link.text
                );
                if (pathName === link.href) {
                    apiReferenceLinkElement.setAttribute('tabindex', -1);
                    apiReferenceLinkElement.addEventListener(
                        'click', (event) => event.preventDefault()
                    );
                }
                const apiReferenceMenuElement = document.createElement('li');
                apiReferenceMenuElement.setAttribute('role', 'none');
                apiReferenceMenuElement.appendChild(apiReferenceLinkElement);
                apiReferenceLinksMenu.appendChild(apiReferenceMenuElement);
            });
            apiReferenceButton.classList.remove('bg-background');
            apiReferenceButton.classList.add('bg-layer');
        }
        else {
            apiReferenceMenuClose(); 
        };
    }

    apiReferenceListElement.addEventListener('click', addElementsToLinksMenu);
    apiReferenceListElement.appendChild(apiReferenceButton);
    linksList.appendChild(apiReferenceListElement);
    navigation.appendChild(linksList);
    header.appendChild(navigation);
    document.body.addEventListener('click', (event) =>
        {
            if (event.target !== apiReferenceButton) {
                apiReferenceMenuClose();
                apiReferenceListToggled = false;
            }
        }
    );

    const rightToolbar = document.createElement('div');
    rightToolbar.classList.add('cds--header__global');
    const searchButtonSpanElement = document.createElement('span');
    const searchButtonDivWrapper = document.createElement('div');
    searchButtonDivWrapper.classList.add('cds--tooltip-trigger__wrapper');
    const searchButton = document.createElement('button');
    searchButton.dataset.bsToggle = 'modal';
    searchButton.dataset.bsTarget = '#modalSearch';
    searchButton.setAttribute('type', 'button');
    searchButton.setAttribute('aria-label', 'Search');
    searchButton.setAttribute('aria-labelledby','tooltip-:Rae6ta:');
    searchButton.className = `cds--btn--icon-only cds--header__action cds--btn cds--btn--primary 
    cds--btn--icon-only cds--btn cds--btn--primary`;
    const searchButtonIcon = createIcon(`M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,
    3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z
    M2,6.5 C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z`);
    searchButton.appendChild(searchButtonIcon);
    searchButtonDivWrapper.appendChild(searchButton);
    const searchButtonSpanTooltip = document.createElement('span');
    searchButtonSpanTooltip.setAttribute('aria-hidden', true);
    searchButtonSpanTooltip.setAttribute('id', 'tooltip-:Rae6ta:');
    searchButtonSpanTooltip.setAttribute('role', 'tooltip');
    searchButtonSpanTooltip.classList.add('cds--popover');
    const searchButtonToolipContent = document.createElement('span');
    searchButtonToolipContent.classList.add('cds--popover-content');
    searchButtonToolipContent.classList.add('cds--tooltip-content');
    searchButtonToolipContent.setAttribute('wfd-invisible', true);
    searchButtonToolipContent.appendChild(document.createTextNode('Search'));
    const searchButtonPopoverCaret = document.createElement('span');
    searchButtonPopoverCaret.classList.add('cds--popover-caret');
    searchButtonPopoverCaret.setAttribute('wfd-invisible', true);
    searchButtonSpanTooltip.appendChild(searchButtonToolipContent);
    searchButtonSpanTooltip.appendChild(searchButtonPopoverCaret);
    searchButtonSpanElement.appendChild(searchButtonDivWrapper);
    searchButtonSpanElement.appendChild(searchButtonSpanTooltip);
    rightToolbar.appendChild(searchButtonSpanElement);
    header.appendChild(rightToolbar);
};