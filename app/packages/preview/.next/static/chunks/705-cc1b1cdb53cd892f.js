(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[705],{12808:function(e,t,n){var r=n(54070),i=function(){try{var e=r(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=i},90889:function(e,t,n){"use strict";n.d(t,{C:function(){return a},Z:function(){return l}});var r=n(99260),i=n(3436),u=n.n(i),o=n(7653),s=n(98604);function LinkRenderFunction(e,t){var n;let{element:i,as:u,isSideNavExpanded:s,...l}=e,a=null!==(n=null!=u?u:i)&&void 0!==n?n:"a";return o.createElement(a,(0,r.gY)({ref:t},l))}let l=(0,o.forwardRef)(LinkRenderFunction),a={as:u().elementType,element:(0,s.Z)(u().elementType,"The `element` prop for `Link` has been deprecated. Please use `as` instead. This will be removed in the next major release."),isSideNavExpanded:u().bool};l.displayName="Link",l.propTypes=a},48556:function(e,t,n){"use strict";n.d(t,{b:function(){return u}});var r=n(3436),i=n.n(r);function isRequiredOneOf(e){let t=Object.keys(e),checker=e=>function(t,n,r){for(var i=arguments.length,u=Array(i>3?i-3:0),o=3;o<i;o++)u[o-3]=arguments[o];return e(t,n,r,...u)};return t.reduce((t,n)=>({...t,[n]:checker(e[n])}),{})}let u=isRequiredOneOf({"aria-label":i().string,"aria-labelledby":i().string})},29190:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7653),i="undefined"!=typeof window?r.useLayoutEffect:r.useEffect},39848:function(e,t,n){"use strict";n.d(t,{j:function(){return u}});var r=n(98005),i=n(9163);let FocusManager=class FocusManager extends r.l{constructor(){super(),this.setup=e=>{if(!i.sk&&window.addEventListener){let listener=()=>e();return window.addEventListener("visibilitychange",listener,!1),window.addEventListener("focus",listener,!1),()=>{window.removeEventListener("visibilitychange",listener),window.removeEventListener("focus",listener)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setFocused(e):this.onFocus()})}setFocused(e){this.focused=e,e&&this.onFocus()}onFocus(){this.listeners.forEach(e=>{e()})}isFocused(){return"boolean"==typeof this.focused?this.focused:"undefined"==typeof document||[void 0,"visible","prerender"].includes(document.visibilityState)}};let u=new FocusManager},96094:function(e,t,n){"use strict";n.d(t,{V:function(){return i}});var r=n(9163);function createNotifyManager(){let e=[],t=0,notifyFn=e=>{e()},batchNotifyFn=e=>{e()},schedule=n=>{t?e.push(n):(0,r.A4)(()=>{notifyFn(n)})},flush=()=>{let t=e;e=[],t.length&&(0,r.A4)(()=>{batchNotifyFn(()=>{t.forEach(e=>{notifyFn(e)})})})};return{batch:e=>{let n;t++;try{n=e()}finally{--t||flush()}return n},batchCalls:e=>(...t)=>{schedule(()=>{e(...t)})},schedule,setNotifyFunction:e=>{notifyFn=e},setBatchNotifyFunction:e=>{batchNotifyFn=e}}}let i=createNotifyManager()},44502:function(e,t,n){"use strict";n.d(t,{N:function(){return u}});var r=n(98005),i=n(9163);let OnlineManager=class OnlineManager extends r.l{constructor(){super(),this.setup=e=>{if(!i.sk&&window.addEventListener){let listener=()=>e();return window.addEventListener("online",listener,!1),window.addEventListener("offline",listener,!1),()=>{window.removeEventListener("online",listener),window.removeEventListener("offline",listener)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setOnline(e):this.onOnline()})}setOnline(e){this.online=e,e&&this.onOnline()}onOnline(){this.listeners.forEach(e=>{e()})}isOnline(){return"boolean"==typeof this.online?this.online:"undefined"==typeof navigator||void 0===navigator.onLine||navigator.onLine}};let u=new OnlineManager},5339:function(e,t,n){"use strict";n.d(t,{DV:function(){return isCancelledError},Kw:function(){return canFetch},Mz:function(){return createRetryer}});var r=n(39848),i=n(44502),u=n(9163);function defaultRetryDelay(e){return Math.min(1e3*2**e,3e4)}function canFetch(e){return(null!=e?e:"online")!=="online"||i.N.isOnline()}let CancelledError=class CancelledError{constructor(e){this.revert=null==e?void 0:e.revert,this.silent=null==e?void 0:e.silent}};function isCancelledError(e){return e instanceof CancelledError}function createRetryer(e){let t,n,o,s=!1,l=0,a=!1,c=new Promise((e,t)=>{n=e,o=t}),shouldPause=()=>!r.j.isFocused()||"always"!==e.networkMode&&!i.N.isOnline(),resolve=r=>{a||(a=!0,null==e.onSuccess||e.onSuccess(r),null==t||t(),n(r))},reject=n=>{a||(a=!0,null==e.onError||e.onError(n),null==t||t(),o(n))},pause=()=>new Promise(n=>{t=e=>{let t=a||!shouldPause();return t&&n(e),t},null==e.onPause||e.onPause()}).then(()=>{t=void 0,a||null==e.onContinue||e.onContinue()}),run=()=>{let t;if(!a){try{t=e.fn()}catch(e){t=Promise.reject(e)}Promise.resolve(t).then(resolve).catch(t=>{var n,r;if(a)return;let i=null!=(n=e.retry)?n:3,o=null!=(r=e.retryDelay)?r:defaultRetryDelay,c="function"==typeof o?o(l,t):o,f=!0===i||"number"==typeof i&&l<i||"function"==typeof i&&i(l,t);if(s||!f){reject(t);return}l++,null==e.onFail||e.onFail(l,t),(0,u.Gh)(c).then(()=>{if(shouldPause())return pause()}).then(()=>{s?reject(t):run()})})}};return canFetch(e.networkMode)?run():pause().then(run),{promise:c,cancel:t=>{a||(reject(new CancelledError(t)),null==e.abort||e.abort())},continue:()=>{let e=null==t?void 0:t();return e?c:Promise.resolve()},cancelRetry:()=>{s=!0},continueRetry:()=>{s=!1}}}},98005:function(e,t,n){"use strict";n.d(t,{l:function(){return Subscribable}});let Subscribable=class Subscribable{constructor(){this.listeners=[],this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.push(e),this.onSubscribe(),()=>{this.listeners=this.listeners.filter(t=>t!==e),this.onUnsubscribe()}}hasListeners(){return this.listeners.length>0}onSubscribe(){}onUnsubscribe(){}}},9163:function(e,t,n){"use strict";n.d(t,{A4:function(){return scheduleMicrotask},G9:function(){return getAbortController},Gh:function(){return sleep},I6:function(){return parseFilterArgs},Kp:function(){return timeUntilStale},PN:function(){return isValidTimeout},Rm:function(){return hashQueryKeyByOptions},SE:function(){return functionalUpdate},VS:function(){return shallowEqualObjects},X7:function(){return matchMutation},ZT:function(){return noop},_v:function(){return parseQueryArgs},_x:function(){return matchQuery},oE:function(){return replaceData},sk:function(){return r},to:function(){return partialMatchKey},yF:function(){return hashQueryKey}});let r="undefined"==typeof window||"Deno"in window;function noop(){}function functionalUpdate(e,t){return"function"==typeof e?e(t):e}function isValidTimeout(e){return"number"==typeof e&&e>=0&&e!==1/0}function timeUntilStale(e,t){return Math.max(e+(t||0)-Date.now(),0)}function parseQueryArgs(e,t,n){return isQueryKey(e)?"function"==typeof t?{...n,queryKey:e,queryFn:t}:{...t,queryKey:e}:e}function parseFilterArgs(e,t,n){return isQueryKey(e)?[{...t,queryKey:e},n]:[e||{},t]}function matchQuery(e,t){let{type:n="all",exact:r,fetchStatus:i,predicate:u,queryKey:o,stale:s}=e;if(isQueryKey(o)){if(r){if(t.queryHash!==hashQueryKeyByOptions(o,t.options))return!1}else{if(!partialDeepEqual(t.queryKey,o))return!1}}if("all"!==n){let e=t.isActive();if("active"===n&&!e||"inactive"===n&&e)return!1}return("boolean"!=typeof s||t.isStale()===s)&&(void 0===i||i===t.state.fetchStatus)&&(!u||!!u(t))}function matchMutation(e,t){let{exact:n,fetching:r,predicate:i,mutationKey:u}=e;if(isQueryKey(u)){if(!t.options.mutationKey)return!1;if(n){if(hashQueryKey(t.options.mutationKey)!==hashQueryKey(u))return!1}else{if(!partialDeepEqual(t.options.mutationKey,u))return!1}}return("boolean"!=typeof r||"loading"===t.state.status===r)&&(!i||!!i(t))}function hashQueryKeyByOptions(e,t){let n=(null==t?void 0:t.queryKeyHashFn)||hashQueryKey;return n(e)}function hashQueryKey(e){return JSON.stringify(e,(e,t)=>isPlainObject(t)?Object.keys(t).sort().reduce((e,n)=>(e[n]=t[n],e),{}):t)}function partialMatchKey(e,t){return partialDeepEqual(e,t)}function partialDeepEqual(e,t){return e===t||typeof e==typeof t&&!!e&&!!t&&"object"==typeof e&&"object"==typeof t&&!Object.keys(t).some(n=>!partialDeepEqual(e[n],t[n]))}function replaceEqualDeep(e,t){if(e===t)return e;let n=isPlainArray(e)&&isPlainArray(t);if(n||isPlainObject(e)&&isPlainObject(t)){let r=n?e.length:Object.keys(e).length,i=n?t:Object.keys(t),u=i.length,o=n?[]:{},s=0;for(let r=0;r<u;r++){let u=n?r:i[r];o[u]=replaceEqualDeep(e[u],t[u]),o[u]===e[u]&&s++}return r===u&&s===r?e:o}return t}function shallowEqualObjects(e,t){if(e&&!t||t&&!e)return!1;for(let n in e)if(e[n]!==t[n])return!1;return!0}function isPlainArray(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function isPlainObject(e){if(!hasObjectPrototype(e))return!1;let t=e.constructor;if(void 0===t)return!0;let n=t.prototype;return!!(hasObjectPrototype(n)&&n.hasOwnProperty("isPrototypeOf"))}function hasObjectPrototype(e){return"[object Object]"===Object.prototype.toString.call(e)}function isQueryKey(e){return Array.isArray(e)}function sleep(e){return new Promise(t=>{setTimeout(t,e)})}function scheduleMicrotask(e){sleep(0).then(e)}function getAbortController(){if("function"==typeof AbortController)return new AbortController}function replaceData(e,t,n){return null!=n.isDataEqual&&n.isDataEqual(e,t)?e:"function"==typeof n.structuralSharing?n.structuralSharing(e,t):!1!==n.structuralSharing?replaceEqualDeep(e,t):t}},10040:function(e,t,n){"use strict";n.d(t,{NL:function(){return useQueryClient},aH:function(){return QueryClientProvider}});var r=n(7653);let i=r.createContext(void 0),u=r.createContext(!1);function getQueryClientContext(e,t){return e||(t&&"undefined"!=typeof window?(window.ReactQueryClientContext||(window.ReactQueryClientContext=i),window.ReactQueryClientContext):i)}let useQueryClient=({context:e}={})=>{let t=r.useContext(getQueryClientContext(e,r.useContext(u)));if(!t)throw Error("No QueryClient set, use QueryClientProvider to set one");return t},QueryClientProvider=({client:e,children:t,context:n,contextSharing:i=!1})=>{r.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]);let o=getQueryClientContext(n,i);return r.createElement(u.Provider,{value:!n&&i},r.createElement(o.Provider,{value:e},t))}}}]);