(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[369],{72531:function(e,t,n){Promise.resolve().then(n.t.bind(n,65469,23)),Promise.resolve().then(n.bind(n,3618)),Promise.resolve().then(n.bind(n,61095)),Promise.resolve().then(n.bind(n,37330)),Promise.resolve().then(n.bind(n,55856)),Promise.resolve().then(n.bind(n,6447)),Promise.resolve().then(n.bind(n,53371)),Promise.resolve().then(n.bind(n,47574))},14406:function(e,t,n){"use strict";var r,l,o=n(7653),a=n(75496);n(59597),n(84207),n(24523);var i=o&&"object"==typeof o&&"default"in o?o:{default:o};let s=i.default.forwardRef(function(e,t){let{children:n,size:o=16,...s}=e;return i.default.createElement(a,{width:o,height:o,ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",fill:"currentColor",...s},r||(r=i.default.createElement("path",{d:"M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"})),l||(l=i.default.createElement("path",{d:"M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"})),n)});e.exports=s},93849:function(e){var t=Math.ceil,n=Math.max;e.exports=function(e,r,l,o){for(var a=-1,i=n(t((r-e)/(l||1)),0),s=Array(i);i--;)s[o?i:++a]=e,e+=l;return s}},90895:function(e,t,n){var r=n(93849),l=n(44908),o=n(65163);e.exports=function(e){return function(t,n,a){return a&&"number"!=typeof a&&l(t,n,a)&&(n=a=void 0),t=o(t),void 0===n?(n=t,t=0):n=o(n),a=void 0===a?t<n?1:-1:o(a),r(t,n,a,e)}}},44908:function(e,t,n){var r=n(21438),l=n(94604),o=n(48373),a=n(83919);e.exports=function(e,t,n){if(!a(n))return!1;var i=typeof t;return("number"==i?!!(l(n)&&o(t,n.length)):"string"==i&&t in n)&&r(n[t],e)}},17525:function(e,t,n){var r=n(90895)();e.exports=r},31727:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let r=n(84732);n(27573),n(7653);let l=r._(n(19484));function o(e,t){var n;let r={loading:e=>{let{error:t,isLoading:n,pastDelay:r}=e;return null}};"function"==typeof e&&(r.loader=e);let o={...r,...t};return(0,l.default)({...o,modules:null==(n=o.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},897:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return l}});let r=n(86463);function l(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new r.BailoutToCSRError(t);return n}},19484:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let r=n(27573),l=n(7653),o=n(897),a=n(30697);function i(e){return{default:e&&"default"in e?e.default:e}}let s={loader:()=>Promise.resolve(i(()=>null)),loading:null,ssr:!0},u=function(e){let t={...s,...e},n=(0,l.lazy)(()=>t.loader().then(i)),u=t.loading;function c(e){let i=u?(0,r.jsx)(u,{isLoading:!0,pastDelay:!0,error:null}):null,s=t.ssr?(0,r.jsxs)(r.Fragment,{children:["undefined"==typeof window?(0,r.jsx)(a.PreloadCss,{moduleIds:t.modules}):null,(0,r.jsx)(n,{...e})]}):(0,r.jsx)(o.BailoutToCSR,{reason:"next/dynamic",children:(0,r.jsx)(n,{...e})});return(0,r.jsx)(l.Suspense,{fallback:i,children:s})}return c.displayName="LoadableComponent",c}},30697:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return o}});let r=n(27573),l=n(51458);function o(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,l.getExpectedRequestStore)("next/dynamic css"),o=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));o.push(...t)}}return 0===o.length?null:(0,r.jsx)(r.Fragment,{children:o.map(e=>(0,r.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}},3618:function(e,t,n){"use strict";n.d(t,{ButtonLink:function(){return d},ButtonLinkIcon:function(){return u}});var r=n(27573),l=n(7653),o=n(71200),a=n(53433),i=n(35894);let s=(0,l.forwardRef)((e,t)=>{let{kind:n="secondary",size:l="default",className:i,asChild:s,...u}=e,c=s?o.g7:"a",d=(0,a.W)("Button",i);return(0,r.jsx)(c,{ref:t,className:d,"data-kind":n,"data-size":l,...u})});s.displayName="ButtonLink";let u=i.E;var c=n(87659);let d=(0,l.forwardRef)((e,t)=>{let{children:n,href:l,...o}=e;return(0,r.jsx)(s,{asChild:!0,...o,children:(0,r.jsx)(c.default,{href:l,ref:t,children:n})})});d.displayName="ButtonLink"},61095:function(e,t,n){"use strict";n.r(t),n.d(t,{Composer:function(){return l}});var r=n(31727);let l=n.n(r)()(()=>Promise.all([n.e(613),n.e(712),n.e(168),n.e(642),n.e(28)]).then(n.bind(n,53028)).then(e=>e.ComposerReadOnly),{loadableGenerated:{webpack:()=>[53028]}})},37330:function(e,t,n){"use strict";n.d(t,{DefinitionTooltip:function(){return b}});var r=n(27573),l=n(74057),o=n(29102),a=n.n(o),i=n(24523),s=n.n(i),u=n(7653),c=n(39281),d=n(47437),f=n(12641),p=n(24364),m=n(55555),h=n(45652);let x=e=>{let{align:t="bottom-left",className:n,children:r,definition:o,defaultOpen:i=!1,id:s,openOnHover:p,tooltipText:x,triggerClassName:b,...v}=e,[g,j]=(0,u.useState)(i),y=(0,f.A)(),w=(0,d.E)(s);return u.createElement(c.J,{align:t,className:n,dropShadow:!1,highContrast:!0,onMouseLeave:()=>{j(!1)},onMouseEnter:()=>{p&&j(!0)},open:g},u.createElement("button",(0,l.gY)({},v,{className:a()("".concat(y,"--definition-term"),b),"aria-controls":w,"aria-expanded":g,onBlur:()=>{j(!1)},onClick:()=>{j(!g)},onKeyDown:function(e){g&&(0,m.E)(e,h.L1)&&(e.stopPropagation(),j(!1))},type:"button"}),r),u.createElement(c.y,{className:"".concat(y,"--definition-tooltip"),id:w},null!=x?x:o))};function b(e){return(0,r.jsx)(x,{openOnHover:!0,...e})}x.propTypes={align:s().oneOf(["top","top-left","top-right","bottom","bottom-left","bottom-right","left","left-bottom","left-top","right","right-bottom","right-top"]),children:s().node.isRequired,className:s().string,defaultOpen:s().bool,definition:s().node.isRequired,id:s().string,openOnHover:s().bool,tooltipText:(0,p.Z)(s().node,"The tooltipText prop has been deprecated. Please use the `definition` prop instead."),triggerClassName:s().string}},55856:function(e,t,n){"use strict";n.d(t,{Image:function(){return u},ImageModal:function(){return m},ImageModalProvider:function(){return p},InlineImage:function(){return c}});var r=n(27573),l=n(65880),o=n(53433),a=n(7653),i=n(15450),s=n(95687);function u(e){let{className:t,title:n,...l}=e,{setModalImageProps:i}=(0,a.useContext)(f),s=()=>{i({title:n,...l})};return n?(0,r.jsxs)("figure",{className:"flex flex-col gap-4",children:[(0,r.jsx)(d,{className:(0,o.Z)(t,"border-none max-w-full h-auto cursor-pointer"),title:n,display:"block",...l,onClick:s}),(0,r.jsx)("figcaption",{className:"text-left text-label-01 text-text-helper",children:n})]}):(0,r.jsx)(d,{className:(0,o.Z)(t,"border-none max-w-full h-auto cursor-pointer"),display:"block",onClick:s,...l})}function c(e){let{className:t,...n}=e;return(0,r.jsx)(d,{display:"inline",className:(0,o.Z)(t,"border-none max-w-full h-auto"),...n})}function d(e){let{alt:t="",src:n,srcDark:a,display:i,className:s,...u}=e;if(a){let e=(0,o.Z)({block:"block"===i,inline:"inline"===i},"dark:hidden",s),c=(0,o.Z)("hidden",{"dark:block":"block"===i,"dark:inline":"inline"===i},s);return n.startsWith("/")?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.default,{alt:t,src:n,className:e,...u}),(0,r.jsx)(l.default,{alt:t,src:a,className:c,...u})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("img",{alt:t,src:n,className:e,...u}),(0,r.jsx)("img",{alt:t,src:a,className:c,...u})]})}let c=(0,o.Z)({block:"block"===i,inline:"inline"===i},s);return n.startsWith("/")?(0,r.jsx)(l.default,{alt:t,src:n,className:c,...u}):(0,r.jsx)("img",{alt:t,src:n,className:c,...u})}let f=(0,a.createContext)({modalImageProps:null,setModalImageProps:()=>{}});function p(e){let{children:t}=e,[n,l]=(0,a.useState)(null),o=(0,a.useMemo)(()=>({modalImageProps:n,setModalImageProps:l}),[n]);return(0,r.jsx)(f.Provider,{value:o,children:t})}function m(){let{modalImageProps:e,setModalImageProps:t}=(0,a.useContext)(f),[n,l]=(0,a.useState)(e);e&&n!==e&&l(e);let o=null!=e?e:n;return(0,r.jsxs)(i.Z,{open:!!e,onClose:()=>t(null),containerClassName:"w-auto max-w-[98%]",children:[(0,r.jsx)(s.x,{className:"h-48"}),(0,r.jsx)(i.f,{className:"flex items-center justify-center",children:(null==o?void 0:o.src)&&(0,r.jsx)(d,{...o,className:"max-h-full"})})]})}},6447:function(e,t,n){"use strict";n.r(t),n.d(t,{MdTabItem:function(){return f},MdTabs:function(){return c},MdTabsGroupContextProvider:function(){return h},OperatingSystemMdTabs:function(){return d},sanitizeTabsChildren:function(){return p}});var r=n(27573),l=n(40034),o=n.n(l),a=n(7653),i=n(62567);let s=i.td,u=i.nP;function c(e){let{defaultValue:t,group:n}=e,l=p(e.children),o=l.map(e=>e.props.value),[c,d]=x(n),f=(0,a.useRef)(null),[m,h]=(0,a.useState)(()=>void 0!==t&&o.includes(t)?t:o[0]),b=(0,a.useMemo)(()=>n&&c&&o.includes(c)?c:m,[n,c,m,o]),v=function(){let[e,t]=(0,a.useState)();return(0,a.useEffect)(()=>{let e=()=>{t(window.location.hash)};return e(),window.addEventListener("hashchange",e),()=>{window.removeEventListener("hashchange",e)}},[]),e}();return(0,a.useEffect)(()=>{if(f.current&&v){let t=f.current.querySelector('[id="'.concat(v.slice(1),'"]'));if(t){var e;let n=null===(e=t.closest("[data-tab-value]"))||void 0===e?void 0:e.getAttribute("data-tab-value");n&&(h(n),d(n))}}},[v,d]),(0,a.useEffect)(()=>{n&&!c&&d(m)},[n,c,m,d]),(0,r.jsx)("div",{ref:f,children:(0,r.jsxs)(i.mQ,{selectedIndex:o.indexOf(b),onChange:e=>{let{selectedIndex:t}=e,n=o[t];h(n),d(n)},children:[(0,r.jsx)(s,{"aria-label":"List of tabs",children:l.map(e=>(0,r.jsx)(i.OK,{children:e.props.label},e.props.value))}),(0,r.jsx)(u,{children:l})]})})}function d(e){let t="operating-system",[n,l]=(0,a.useState)(),[o,i]=x(t);return(0,a.useEffect)(()=>{let e=function(){if(navigator.platform){if(navigator.platform.startsWith("Mac"))return"mac";if(navigator.platform.startsWith("Win"))return"win";if(navigator.platform.startsWith("Linux"))return"linux"}}();e&&(l(e),i(e))},[i]),(0,r.jsx)(c,{...e,group:t,defaultValue:n},n)}function f(e){let{children:t}=e;return(0,r.jsx)(i.x4,{"data-tab-value":e.value,children:t})}function p(e){return a.Children.toArray(e).filter(e=>null!=e&&"\n"!==e).map(e=>{if((0,a.isValidElement)(e)&&o()(e.props,"value"))return e;throw Error("Bad <Tabs> child")})}let m=(0,a.createContext)(void 0);function h(e){let[t,n]=(0,a.useState)({}),l=(0,a.useCallback)((e,t)=>{n(n=>({...n,[e]:t}))},[]),o=(0,a.useMemo)(()=>({valuesByGroup:t,setValue:l}),[l,t]);return(0,r.jsx)(m.Provider,{value:o,children:e.children})}function x(e){let t=(0,a.useContext)(m);if(void 0===t)throw Error("Missing MdTabsGroupContextProvider");let n=t.setValue,r=(0,a.useCallback)(t=>{e&&n(e,t)},[e,n]);return void 0===e?[void 0,r]:[t.valuesByGroup[e],r]}},53371:function(e,t,n){"use strict";n.d(t,{PageToc:function(){return b}});var r=n(27573),l=n(53433),o=n(17525),a=n.n(o),i=n(7653),s=n(67754),u=n(87659),c=n(82296),d=n(75752),f=n.n(d);function p(e){let{href:t,className:n,...o}=e,a=t?(0,c.pv)(t):void 0;return"absolute"===a?(0,r.jsx)(u.default,{...o,href:t,className:(0,l.Z)(m,"inline",n)}):"external"===a||"external-quantum"===a?(0,r.jsxs)("a",{...o,href:t,className:(0,l.Z)(m,"inline",n),...(0,c.D1)(t),children:[e.children,(0,r.jsx)("span",{className:"sr-only",children:"(opens in a new tab)"}),"external"===a&&(0,r.jsx)(f(),{className:"inline ml-2",width:16})]}):(0,r.jsx)("a",{...o,href:t,className:(0,l.Z)(m,"inline",n)})}let m="text-link-primary no-underline hover:underline bg-transparent";function h(e){let{compiled:t,components:n}=e,l=Object.assign({opts:{...r,useMDXComponents:{}}}),o=Object.keys(l),a=Object.values(l),i=Reflect.construct(Function,o.concat(t)),s=i.apply(i,a).default;return(0,r.jsx)(s,{components:n})}var x=n(9516);function b(e){let{headings:t,minHeadingLevel:n,maxHeadingLevel:o,className:u}=e,c=(0,i.useMemo)(()=>t.filter(e=>e.depth>=n&&e.depth<=o),[t,o,n]),{activeId:d}=function(e){let[t,n]=(0,i.useState)(),r=(0,s.usePathname)();return(0,i.useEffect)(()=>{let t=Array.from(document.querySelectorAll(e)).filter(e=>!e.classList.contains("sr-only")),r=new Map;t.forEach(e=>r.set(e.id,!1));let l=new IntersectionObserver(e=>{for(let[t,l]of(e.forEach(e=>{r.set(e.target.id,e.isIntersecting)}),r))if(!0===l){n(t);break}},{rootMargin:"-48px 0px -20% 0px"});return t.forEach(e=>l.observe(e)),()=>l.disconnect()},[e,r]),{activeId:t}}(a()(n,o+1).map(e=>"main h".concat(e)).join(", ")),{containerRef:f}=(0,x.F)({elementId:"PageTocItem--".concat(d,"__active")});return 0===c.length?null:(0,r.jsxs)("div",{ref:f,className:(0,l.Z)(["text-label-01 bg-background md:bg-inherit overflow-y-auto scrollbar scrollbar-variant",u]),children:[(0,r.jsx)("p",{className:"text-text-helper font-600",children:"On this page"}),(0,r.jsx)("ul",{className:"border-border-subtle border-l",children:c.map(e=>(0,r.jsx)(v,{minHeadingLevel:n,heading:e,activeId:d},e.id))})]})}function v(e){let{heading:t,minHeadingLevel:n,activeId:o}=e,a={paddingLeft:(t.depth-n)*16},i=o===t.id;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{id:i?"PageTocItem--".concat(t.id,"__active"):void 0,className:(0,l.Z)(["relative pl-16 my-[12px]",{"before:block before:absolute before:w-[1px] before:h-full before:-left-[1px] before:bg-layer-selected-inverse":i}]),children:(0,r.jsx)(p,{style:a,className:(0,l.Z)(["!block transition-colors ease-in-out duration-200 hover:no-underline [&>:first-child]:break-words",{"text-text-helper hover:text-text-primary":!i},{"text-text-primary":i}]),href:"#".concat(t.id),"aria-label":"Navigate to the ".concat(t.value," section"),children:t.compiledValue?(0,r.jsx)(h,{compiled:t.compiledValue,components:g}):(0,r.jsx)("div",{children:t.value})})},t.id)})}let g={code:function(e){return(0,r.jsx)("code",{...e,className:(0,l.Z)(["text-code-02 inline whitespace-nowrap px-4 bg-background border border-transparent","group-[.pre-el]:text-code-01 group-[.pre-el]:inline-block group-[.pre-el]:whitespace-pre group-[.pre-el]:p-12 group-[.pre-el]:pr-[50px]","group-[.pre-el]:bg-inherit","group-[.paragraph-el]:whitespace-normal"])})}}},47574:function(e,t,n){"use strict";n.r(t),n.d(t,{Pre:function(){return d}});var r=n(27573),l=n(7653),o=n(44610),a=n(35894);let i=(0,n(59938).B)(a.z,"IconButton");var s=n(14406),u=n.n(s),c=n(53433);function d(e){let{maxHeight:t,className:n,...a}=e,s=(0,l.useRef)(null),[d,f]=(0,l.useState)(!1);(0,l.useEffect)(()=>{if(d){let e=setTimeout(()=>{f(!1)},3e3);return()=>{clearTimeout(e)}}},[d]);let p=void 0!==t;return(0,r.jsxs)("div",{className:(0,c.Z)(["snippet relative bg-[var(--shiki-color-background)]",{"overflow-hidden":!p},n]),children:[(0,r.jsx)("div",{className:(0,c.Z)(["text-end absolute top-0",{"right-0":!p},{"right-12":p}]),children:(0,r.jsxs)(o.u,{open:d||void 0,children:[(0,r.jsx)(o.aJ,{asChild:!0,children:(0,r.jsx)(i,{size:"small",kind:"ghost",className:"data-[kind='ghost']:bg-[var(--shiki-color-background)]",onClick:function(){if(s.current){let e=s.current.textContent;e&&(navigator.clipboard.writeText(e),f(!0))}},"aria-label":"Copy code",children:(0,r.jsx)(u(),{})})}),(0,r.jsx)(o.NM,{children:(0,r.jsxs)(o._v,{children:[d?"Copied!":"Copy code",(0,r.jsx)(o.Ce,{})]})})]})}),(0,r.jsx)("pre",{ref:s,className:(0,c.Z)(["group pre-el text-code-01 max-w-full overflow-auto scrollbar scrollbar-variant"]),style:{maxHeight:t},...a})]})}},9516:function(e,t,n){"use strict";n.d(t,{F:function(){return l}});var r=n(7653);function l(e){let{elementId:t}=e,n=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=document.getElementById(t);if(e&&n.current){let t=n.current.offsetTop,r=t+n.current.offsetHeight,l=e.offsetTop,o=l+e.offsetHeight;(l<t||o>r)&&(n.current.scrollTop=l-t)}},[t]),{containerRef:n}}},82296:function(e,t,n){"use strict";n.d(t,{D1:function(){return o},pv:function(){return l}});var r=n(86629);function l(e){return(0,r.Z)(e)?!function(e){let{hostname:t}=new URL(e);return"quantum-computing.ibm.com"===t||t.endsWith(".quantum-computing.ibm.com")||"quantum.ibm.com"===t||t.endsWith(".quantum.ibm.com")}(e)?"external":"external-quantum":e.startsWith("/")?"absolute":"relative"}function o(e){if(!e)return{};let t=l(e);return"external"===t?{target:"_blank",rel:"noopener noreferrer nofollow"}:"external-quantum"===t?{target:"_blank"}:{}}n(16144)},35894:function(e,t,n){"use strict";n.d(t,{E:function(){return s},z:function(){return i}});var r=n(27573),l=n(7653),o=n(53433),a=n(71200);let i=(0,l.forwardRef)((e,t)=>{let{kind:n="secondary",size:l="default",type:i="button",className:s,asChild:u,...c}=e,d=u?a.g7:"button";return(0,r.jsx)(d,{ref:t,className:(0,o.W)("Button",s),type:i,"data-kind":n,"data-size":l,...c})});i.displayName="Button";let s=(0,l.forwardRef)((e,t)=>{let{className:n,children:l}=e;return(0,r.jsx)("span",{ref:t,className:(0,o.W)("ButtonIcon",n),children:l})});s.displayName="ButtonIcon"}},function(e){e.O(0,[880,193,275,610,293,286,744],function(){return e(e.s=72531)}),_N_E=e.O()}]);