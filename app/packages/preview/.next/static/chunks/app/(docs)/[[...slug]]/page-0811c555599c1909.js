(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[723],{74410:function(e,t,n){"use strict";var r,a,o=n(7653),l=n(63693);n(8560),n(3436);var i=o&&"object"==typeof o&&"default"in o?o:{default:o};let s=i.default.forwardRef(function(e,t){let{children:n,size:o=16,...s}=e;return i.default.createElement(l.Icon,{width:o,height:o,ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"currentColor",...s},r||(r=i.default.createElement("path",{d:"M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"})),a||(a=i.default.createElement("path",{d:"M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"})),n)});e.exports=s},82223:function(e){var t=Math.ceil,n=Math.max;function baseRange(e,r,a,o){for(var l=-1,i=n(t((r-e)/(a||1)),0),s=Array(i);i--;)s[o?i:++l]=e,e+=a;return s}e.exports=baseRange},15967:function(e,t,n){var r=n(82223),a=n(12841),o=n(69569);function createRange(e){return function(t,n,l){return l&&"number"!=typeof l&&a(t,n,l)&&(n=l=void 0),t=o(t),void 0===n?(n=t,t=0):n=o(n),l=void 0===l?t<n?1:-1:o(l),r(t,n,l,e)}}e.exports=createRange},12841:function(e,t,n){var r=n(41233),a=n(97703),o=n(21497),l=n(41548);function isIterateeCall(e,t,n){if(!l(n))return!1;var i=typeof t;return("number"==i?!!(a(n)&&o(t,n.length)):"string"==i&&t in n)&&r(n[t],e)}e.exports=isIterateeCall},98561:function(e,t,n){var r=n(15967)();e.exports=r},91275:function(e,t,n){Promise.resolve().then(n.t.bind(n,9265,23)),Promise.resolve().then(n.bind(n,38593)),Promise.resolve().then(n.bind(n,86459)),Promise.resolve().then(n.bind(n,48969)),Promise.resolve().then(n.bind(n,85945)),Promise.resolve().then(n.bind(n,37772)),Promise.resolve().then(n.bind(n,14669)),Promise.resolve().then(n.bind(n,53287))},48505:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return dynamic}});let r=n(87675);n(7653);let a=r._(n(59941));function convertModule(e){return{default:(null==e?void 0:e.default)||e}}function dynamic(e,t){let n=a.default,r={loading:e=>{let{error:t,isLoading:n,pastDelay:r}=e;return null}};"function"==typeof e&&(r.loader=e),Object.assign(r,t);let o=r.loader;return n({...r,loader:()=>null!=o?o().then(convertModule):Promise.resolve(convertModule(()=>null))})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},75124:function(e,t,n){"use strict";function NoSSR(e){let{children:t}=e;return t}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NoSSR",{enumerable:!0,get:function(){return NoSSR}}),n(20077)},59941:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let r=n(87675),a=r._(n(7653)),o=n(75124);function Loadable(e){let t=Object.assign({loader:null,loading:null,ssr:!0},e);function LoadableComponent(e){let n=t.loading,r=a.default.createElement(n,{isLoading:!0,pastDelay:!0,error:null}),l=t.ssr?a.default.Fragment:o.NoSSR,i=t.lazy;return a.default.createElement(a.default.Suspense,{fallback:r},a.default.createElement(l,null,a.default.createElement(i,e)))}return t.lazy=a.default.lazy(t.loader),LoadableComponent.displayName="LoadableComponent",LoadableComponent}let l=Loadable},38593:function(e,t,n){"use strict";n.r(t),n.d(t,{ButtonLink:function(){return f},ButtonLinkIcon:function(){return u}});var r=n(27573),a=n(7653),o=n(88377),l=n(97157),i=n(66548);let s=(0,a.forwardRef)((e,t)=>{let{kind:n="secondary",size:a="default",className:i,asChild:s,...u}=e,c=s?o.g7:"a",d=(0,l.W)("Button",i);return(0,r.jsx)(c,{ref:t,className:d,"data-kind":n,"data-size":a,...u})});s.displayName="ButtonLink";let u=i.E;var c=n(2056),d=n.n(c);let f=(0,a.forwardRef)((e,t)=>{let{children:n,href:a,...o}=e;return(0,r.jsx)(s,{asChild:!0,...o,children:(0,r.jsx)(d(),{href:a,ref:t,children:n})})});f.displayName="ButtonLink"},86459:function(e,t,n){"use strict";n.r(t),n.d(t,{Composer:function(){return o}});var r=n(48505),a=n.n(r);let o=a()(()=>Promise.all([n.e(613),n.e(449),n.e(706),n.e(845),n.e(199)]).then(n.bind(n,47199)).then(e=>e.ComposerReadOnly),{loadableGenerated:{webpack:()=>[47199]}})},48969:function(e,t,n){"use strict";n.r(t),n.d(t,{DefinitionTooltip:function(){return DefinitionTooltip_DefinitionTooltip}});var r=n(27573),a=n(99260),o=n(20446),l=n.n(o),i=n(3436),s=n.n(i),u=n(7653),c=n(28569),d=n(63026),f=n(87180),m=n(98604),p=n(83690),h=n(1985);let DefinitionTooltip=e=>{let{align:t="bottom-left",className:n,children:r,definition:o,defaultOpen:i=!1,id:s,openOnHover:m,tooltipText:b,triggerClassName:g,...x}=e,[v,j]=(0,u.useState)(i),y=(0,f.A)(),C=(0,d.E)(s);function onKeyDown(e){v&&(0,p.E)(e,h.L1)&&(e.stopPropagation(),j(!1))}return u.createElement(c.J,{align:t,className:n,dropShadow:!1,highContrast:!0,onMouseLeave:()=>{j(!1)},onMouseEnter:()=>{m&&j(!0)},open:v},u.createElement("button",(0,a.gY)({},x,{className:l()("".concat(y,"--definition-term"),g),"aria-controls":C,"aria-expanded":v,onBlur:()=>{j(!1)},onClick:()=>{j(!v)},onKeyDown:onKeyDown,type:"button"}),r),u.createElement(c.y,{className:"".concat(y,"--definition-tooltip"),id:C},null!=b?b:o))};function DefinitionTooltip_DefinitionTooltip(e){return(0,r.jsx)(DefinitionTooltip,{openOnHover:!0,...e})}DefinitionTooltip.propTypes={align:s().oneOf(["top","top-left","top-right","bottom","bottom-left","bottom-right","left","left-bottom","left-top","right","right-bottom","right-top"]),children:s().node.isRequired,className:s().string,defaultOpen:s().bool,definition:s().node.isRequired,id:s().string,openOnHover:s().bool,tooltipText:(0,m.Z)(s().node,"The tooltipText prop has been deprecated. Please use the `definition` prop instead."),triggerClassName:s().string}},85945:function(e,t,n){"use strict";n.r(t),n.d(t,{Image:function(){return Image},ImageModal:function(){return ImageModal},ImageModalContext:function(){return c},ImageModalProvider:function(){return ImageModalProvider},InlineImage:function(){return InlineImage}});var r=n(27573),a=n(96072),o=n.n(a),l=n(97157),i=n(7653),s=n(33158),u=n(46551);function Image(e){let{className:t,title:n,...a}=e,{setModalImageProps:o}=(0,i.useContext)(c),handleModalImageProps=()=>{o({title:n,...a})};return n?(0,r.jsxs)("figure",{className:"flex flex-col gap-4",children:[(0,r.jsx)(BaseImage,{className:(0,l.Z)(t,"border-none max-w-full h-auto cursor-pointer"),title:n,display:"block",...a,onClick:handleModalImageProps}),(0,r.jsx)("figcaption",{className:"text-left text-label-01 text-text-helper",children:n})]}):(0,r.jsx)(BaseImage,{className:(0,l.Z)(t,"border-none max-w-full h-auto cursor-pointer"),display:"block",onClick:handleModalImageProps,...a})}function InlineImage(e){let{className:t,...n}=e;return(0,r.jsx)(BaseImage,{display:"inline",className:(0,l.Z)(t,"border-none max-w-full h-auto"),...n})}function BaseImage(e){let{alt:t="",src:n,srcDark:a,display:i,className:s,...u}=e;if(a){let e=(0,l.Z)({block:"block"===i,inline:"inline"===i},"dark:hidden",s),c=(0,l.Z)("hidden",{"dark:block":"block"===i,"dark:inline":"inline"===i},s);return n.startsWith("/")?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o(),{alt:t,src:n,className:e,...u}),(0,r.jsx)(o(),{alt:t,src:a,className:c,...u})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("img",{alt:t,src:n,className:e,...u}),(0,r.jsx)("img",{alt:t,src:a,className:c,...u})]})}let c=(0,l.Z)({block:"block"===i,inline:"inline"===i},s);return n.startsWith("/")?(0,r.jsx)(o(),{alt:t,src:n,className:c,...u}):(0,r.jsx)("img",{alt:t,src:n,className:c,...u})}let c=(0,i.createContext)({modalImageProps:null,setModalImageProps:()=>{}});function ImageModalProvider(e){let{children:t}=e,[n,a]=(0,i.useState)(null),o=(0,i.useMemo)(()=>({modalImageProps:n,setModalImageProps:a}),[n]);return(0,r.jsx)(c.Provider,{value:o,children:t})}function ImageModal(){let{modalImageProps:e,setModalImageProps:t}=(0,i.useContext)(c),[n,a]=(0,i.useState)(e);e&&n!==e&&a(e);let o=null!=e?e:n;return(0,r.jsxs)(s.Z,{open:!!e,onClose:()=>t(null),containerClassName:"w-auto max-w-[98%]",children:[(0,r.jsx)(u.x,{className:"h-48"}),(0,r.jsx)(s.f,{className:"flex items-center justify-center",children:(null==o?void 0:o.src)&&(0,r.jsx)(BaseImage,{...o,className:"max-h-full"})})]})}},37772:function(e,t,n){"use strict";n.r(t),n.d(t,{MdTabItem:function(){return MdTabItem},MdTabs:function(){return MdTabs},MdTabsGroupContextProvider:function(){return MdTabsGroupContextProvider},OperatingSystemMdTabs:function(){return OperatingSystemMdTabs},sanitizeTabsChildren:function(){return sanitizeTabsChildren}});var r=n(27573),a=n(12461),o=n.n(a),l=n(7653),i=n(54551);let s=i.td,u=i.nP;function getOperatingSystem(){if(navigator.platform){if(navigator.platform.startsWith("Mac"))return"mac";if(navigator.platform.startsWith("Win"))return"win";if(navigator.platform.startsWith("Linux"))return"linux"}}function useHash(){let[e,t]=(0,l.useState)();return(0,l.useEffect)(()=>{let onHashChange=()=>{t(window.location.hash)};return onHashChange(),window.addEventListener("hashchange",onHashChange),()=>{window.removeEventListener("hashchange",onHashChange)}},[]),e}function MdTabs(e){let{defaultValue:t,group:n}=e,a=sanitizeTabsChildren(e.children),o=a.map(e=>e.props.value),[c,d]=useTabsGroup(n),f=(0,l.useRef)(null),[m,p]=(0,l.useState)(()=>void 0!==t&&o.includes(t)?t:o[0]),h=(0,l.useMemo)(()=>n&&c&&o.includes(c)?c:m,[n,c,m,o]),b=useHash();return(0,l.useEffect)(()=>{if(f.current&&b){let t=f.current.querySelector('[id="'.concat(b.slice(1),'"]'));if(t){var e;let n=null===(e=t.closest("[data-tab-value]"))||void 0===e?void 0:e.getAttribute("data-tab-value");n&&(p(n),d(n))}}},[b,d]),(0,l.useEffect)(()=>{n&&!c&&d(m)},[n,c,m,d]),(0,r.jsx)("div",{ref:f,children:(0,r.jsxs)(i.mQ,{selectedIndex:o.indexOf(h),onChange:e=>{let{selectedIndex:t}=e,n=o[t];p(n),d(n)},children:[(0,r.jsx)(s,{"aria-label":"List of tabs",children:a.map(e=>(0,r.jsx)(i.OK,{children:e.props.label},e.props.value))}),(0,r.jsx)(u,{children:a})]})})}function OperatingSystemMdTabs(e){let t="operating-system",[n,a]=(0,l.useState)(),[o,i]=useTabsGroup(t);return(0,l.useEffect)(()=>{let e=getOperatingSystem();e&&(a(e),i(e))},[i]),(0,r.jsx)(MdTabs,{...e,group:t,defaultValue:n},n)}function MdTabItem(e){let{children:t}=e;return(0,r.jsx)(i.x4,{"data-tab-value":e.value,children:t})}function isMdTabItem(e){return o()(e.props,"value")}function sanitizeTabsChildren(e){return l.Children.toArray(e).filter(e=>null!=e&&"\n"!==e).map(e=>{if((0,l.isValidElement)(e)&&isMdTabItem(e))return e;throw Error("Bad <Tabs> child")})}let c=(0,l.createContext)(void 0);function MdTabsGroupContextProvider(e){let[t,n]=(0,l.useState)({}),a=(0,l.useCallback)((e,t)=>{n(n=>({...n,[e]:t}))},[]),o=(0,l.useMemo)(()=>({valuesByGroup:t,setValue:a}),[a,t]);return(0,r.jsx)(c.Provider,{value:o,children:e.children})}function useTabsGroup(e){let t=(0,l.useContext)(c);if(void 0===t)throw Error("Missing MdTabsGroupContextProvider");let n=t.setValue,r=(0,l.useCallback)(t=>{e&&n(e,t)},[e,n]);return void 0===e?[void 0,r]:[t.valuesByGroup[e],r]}},14669:function(e,t,n){"use strict";n.r(t),n.d(t,{PageToc:function(){return PageToc}});var r=n(27573),a=n(97157),o=n(98561),l=n.n(o),i=n(7653),s=n(32859);function useHeadingObserver(e){let[t,n]=(0,i.useState)(),r=(0,s.usePathname)();return(0,i.useEffect)(()=>{let t=Array.from(document.querySelectorAll(e)).filter(e=>!e.classList.contains("sr-only")),r=new Map;t.forEach(e=>r.set(e.id,!1));let a=new IntersectionObserver(e=>{for(let[t,a]of(e.forEach(e=>{r.set(e.target.id,e.isIntersecting)}),r))if(!0===a){n(t);break}},{rootMargin:"-48px 0px -20% 0px"});return t.forEach(e=>a.observe(e)),()=>a.disconnect()},[e,r]),{activeId:t}}var u=n(2056),c=n.n(u),d=n(30370),f=n(18474),m=n.n(f);function Link(e){let{href:t,className:n,...o}=e,l=t?(0,d.pv)(t):void 0;return"absolute"===l?(0,r.jsx)(c(),{...o,href:t,className:(0,a.Z)(p,"inline",n)}):"external"===l||"external-quantum"===l?(0,r.jsxs)("a",{...o,href:t,className:(0,a.Z)(p,"inline",n),...(0,d.D1)(t),children:[e.children,(0,r.jsx)("span",{className:"sr-only",children:"(opens in a new tab)"}),"external"===l&&(0,r.jsx)(m(),{className:"inline ml-2",width:16})]}):(0,r.jsx)("a",{...o,href:t,className:(0,a.Z)(p,"inline",n)})}let p="text-link-primary no-underline hover:underline bg-transparent";function Code(e){return(0,r.jsx)("code",{...e,className:(0,a.Z)(["text-code-02 inline whitespace-nowrap px-4 bg-background border border-transparent","group-[.pre-el]:text-code-01 group-[.pre-el]:inline-block group-[.pre-el]:whitespace-pre group-[.pre-el]:p-12 group-[.pre-el]:pr-[50px]","group-[.pre-el]:bg-inherit","group-[.paragraph-el]:whitespace-normal"])})}function MdxCompiled(e){let{compiled:t,components:n}=e,a=Object.assign({opts:{...r,useMDXComponents:{}}}),o=Object.keys(a),l=Object.values(a),i=Reflect.construct(Function,o.concat(t)),s=i.apply(i,l).default;return(0,r.jsx)(s,{components:n})}var h=n(924);function PageToc(e){let{headings:t,minHeadingLevel:n,maxHeadingLevel:o,className:s}=e,u=(0,i.useMemo)(()=>t.filter(e=>e.depth>=n&&e.depth<=o),[t,o,n]),c=l()(n,o+1).map(e=>"main h".concat(e)).join(", "),{activeId:d}=useHeadingObserver(c),{containerRef:f}=(0,h.F)({elementId:"PageTocItem--".concat(d,"__active")});return 0===u.length?null:(0,r.jsxs)("div",{ref:f,className:(0,a.Z)(["text-label-01 bg-background md:bg-inherit overflow-y-auto max-h-[var(--right-toc-max-height)] scrollbar scrollbar-variant",s]),children:[(0,r.jsx)("p",{className:"text-text-helper font-600",children:"On this page"}),(0,r.jsx)("ul",{className:"border-border-subtle border-l",children:u.map(e=>(0,r.jsx)(PageTocItem,{minHeadingLevel:n,heading:e,activeId:d},e.id))})]})}function PageTocItem(e){let{heading:t,minHeadingLevel:n,activeId:o}=e,l={paddingLeft:(t.depth-n)*16},i=o===t.id;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{id:i?"PageTocItem--".concat(t.id,"__active"):void 0,className:(0,a.Z)(["relative pl-16 my-[12px]",{"before:block before:absolute before:w-[1px] before:h-full before:-left-[1px] before:bg-layer-selected-inverse":i}]),children:(0,r.jsx)(Link,{style:l,className:(0,a.Z)(["!block transition-colors ease-in-out duration-200 hover:no-underline",{"text-text-helper hover:text-text-primary":!i},{"text-text-primary":i}]),href:"#".concat(t.id),"aria-label":"Navigate to the ".concat(t.value," section"),children:t.compiledValue?(0,r.jsx)(MdxCompiled,{compiled:t.compiledValue,components:b}):t.value})},t.id)})}let b={code:Code}},53287:function(e,t,n){"use strict";n.r(t),n.d(t,{Pre:function(){return Pre}});var r=n(27573),a=n(7653),o=n(87799),l=n(66548),i=n(89203);let s=(0,i.B)(l.z,"IconButton");var u=n(74410),c=n.n(u),d=n(97157);function Pre(e){let{maxHeight:t,className:n,...l}=e,i=(0,a.useRef)(null),[u,f]=(0,a.useState)(!1);function handleClickCopy(){if(i.current){let e=i.current.textContent;e&&(navigator.clipboard.writeText(e),f(!0))}}(0,a.useEffect)(()=>{if(u){let e=setTimeout(()=>{f(!1)},3e3);return()=>{clearTimeout(e)}}},[u]);let m=void 0!==t;return(0,r.jsxs)("div",{className:(0,d.Z)(["snippet relative bg-[var(--shiki-color-background)]",{"overflow-hidden":!m},n]),children:[(0,r.jsx)("div",{className:(0,d.Z)(["text-end absolute top-0",{"right-0":!m},{"right-12":m}]),children:(0,r.jsxs)(o.u,{open:u||void 0,children:[(0,r.jsx)(o.aJ,{asChild:!0,children:(0,r.jsx)(s,{size:"small",kind:"ghost",className:"data-[kind='ghost']:bg-[var(--shiki-color-background)]",onClick:handleClickCopy,"aria-label":"Copy code",children:(0,r.jsx)(c(),{})})}),(0,r.jsx)(o.NM,{children:(0,r.jsxs)(o._v,{children:[u?"Copied!":"Copy code",(0,r.jsx)(o.Ce,{})]})})]})}),(0,r.jsx)("pre",{ref:i,className:(0,d.Z)(["group pre-el text-code-01 max-w-full overflow-auto scrollbar"]),style:{maxHeight:t},...l})]})}},924:function(e,t,n){"use strict";n.d(t,{F:function(){return useScrollContainerToElement}});var r=n(7653);function useScrollContainerToElement(e){let{elementId:t}=e,n=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=document.getElementById(t);if(e&&n.current){let t=n.current.offsetTop,r=t+n.current.offsetHeight,a=e.offsetTop,o=a+e.offsetHeight;(a<t||o>r)&&(n.current.scrollTop=a-t)}},[t]),{containerRef:n}}},30370:function(e,t,n){"use strict";n.d(t,{D1:function(){return linkProps},pv:function(){return getUrlType}});var r=n(69453);function getUrlType(e){return(0,r.Z)(e)?isQuantumUrl(e)?"external-quantum":"external":e.startsWith("/")?"absolute":"relative"}function isQuantumUrl(e){let{hostname:t}=new URL(e);return"quantum-computing.ibm.com"===t||t.endsWith(".quantum-computing.ibm.com")||"quantum.ibm.com"===t||t.endsWith(".quantum.ibm.com")}function linkProps(e){if(!e)return{};let t=getUrlType(e);return"external"===t?{target:"_blank",rel:"noopener noreferrer nofollow"}:"external-quantum"===t?{target:"_blank"}:{}}n(54703)},66548:function(e,t,n){"use strict";n.d(t,{E:function(){return s},z:function(){return i}});var r=n(27573),a=n(7653),o=n(97157),l=n(88377);let i=(0,a.forwardRef)((e,t)=>{let{kind:n="secondary",size:a="default",type:i="button",className:s,asChild:u,...c}=e,d=u?l.g7:"button";return(0,r.jsx)(d,{ref:t,className:(0,o.W)("Button",s),type:i,"data-kind":n,"data-size":a,...c})});i.displayName="Button";let s=(0,a.forwardRef)((e,t)=>{let{className:n,children:a}=e;return(0,r.jsx)("span",{ref:t,className:(0,o.W)("ButtonIcon",n),children:a})});s.displayName="ButtonIcon"}},function(e){e.O(0,[833,52,642,799,293,53,744],function(){return e(e.s=91275)}),_N_E=e.O()}]);