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
        text-text-secondary`.split('\n        ');
        classNameList.forEach(className => linkElement.classList.add(className));
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
    
    const apiReferenceButtonTextContent = document.createTextNode('API Reference');
    const apiReferenceButtonClassList = `relative
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
    text-text-secondary`.split('\n    ');
    const arrowDownIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowDownIcon.setAttribute('focusable', false);
    arrowDownIcon.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    arrowDownIcon.setAttribute('fill', 'currentColor');
    arrowDownIcon.setAttribute('width', 16);
    arrowDownIcon.setAttribute('height', 16);
    arrowDownIcon.setAttribute('viewBox', '0 0 16 16');
    arrowDownIcon.setAttribute('aria-hidden', true);
    arrowDownIcon.classList.add('cds--header__menu-arrow');
    const arrowDownIconPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    arrowDownIconPath.setAttribute('d', 'M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z');
    arrowDownIcon.appendChild(arrowDownIconPath);
    const apiReferenceButton = document.createElement('button');
    apiReferenceButton.setAttribute('role', 'menuitem');
    apiReferenceButton.setAttribute('aria-haspopup', 'menu');
    apiReferenceButton.setAttribute('aria-expanded', apiReferenceListToggled);
    apiReferenceButton.setAttribute('aria-controls', 'radix-:R1k6ta:');
    apiReferenceButton.setAttribute('aria-label', 'API Reference');
    apiReferenceButton.appendChild(apiReferenceButtonTextContent);
    apiReferenceButtonClassList.forEach((className) =>
        apiReferenceButton.classList.add(className)
    );
    apiReferenceButton.appendChild(arrowDownIcon);
    checkCurrentLink();

    const apiReferenceLinksMenuClassList = `flex
    cds--header__menu
    m-0
    p-0
    flex-col
    bg-layer
    min-w-[200px]
    shadow-[0_0_6px_-1px_var(--cds-shadow)]`.split('\n    ');
    const apiReferenceLinksMenu = document.createElement('ul');
    apiReferenceLinksMenu.setAttribute('role', 'menu');
    apiReferenceLinksMenu.setAttribute('tabindex', 0);
    apiReferenceLinksMenu.setAttribute('id', 'radix-:R1k6ta:');
    apiReferenceLinksMenu.style.outline = 'none';
    apiReferenceLinksMenuClassList.forEach(className => 
        apiReferenceLinksMenu.classList.add(className)
    );

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
};