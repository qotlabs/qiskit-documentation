(()=>{"use strict";var e={},r={};function __webpack_require__(_){var t=r[_];if(void 0!==t)return t.exports;var a=r[_]={id:_,loaded:!1,exports:{}},u=!0;try{e[_].call(a.exports,a,a.exports,__webpack_require__),u=!1}finally{u&&delete r[_]}return a.loaded=!0,a.exports}__webpack_require__.m=e,__webpack_require__.amdO={},(()=>{var e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",_="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",resolveQueue=e=>{e&&!e.d&&(e.d=1,e.forEach(e=>e.r--),e.forEach(e=>e.r--?e.r++:e()))},wrapDeps=t=>t.map(t=>{if(null!==t&&"object"==typeof t){if(t[e])return t;if(t.then){var a=[];a.d=0,t.then(e=>{u[r]=e,resolveQueue(a)},e=>{u[_]=e,resolveQueue(a)});var u={};return u[e]=e=>e(a),u}}var o={};return o[e]=e=>{},o[r]=t,o});__webpack_require__.a=(t,a,u)=>{u&&((o=[]).d=1);var o,i,p,c,n=new Set,b=t.exports,s=new Promise((e,r)=>{c=r,p=e});s[r]=b,s[e]=e=>(o&&e(o),n.forEach(e),s.catch(e=>{})),t.exports=s,a(t=>{i=wrapDeps(t);var a,getResult=()=>i.map(e=>{if(e[_])throw e[_];return e[r]}),u=new Promise(r=>{(a=()=>r(getResult)).r=0;var fnQueue=e=>e!==o&&!n.has(e)&&(n.add(e),e&&!e.d&&(a.r++,e.push(a)));i.map(r=>r[e](fnQueue))});return a.r?u:getResult()},e=>(e?c(s[_]=e):p(b),resolveQueue(o))),o&&(o.d=0)}})(),__webpack_require__.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(r,{a:r}),r},(()=>{var e,r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;__webpack_require__.t=function(_,t){if(1&t&&(_=this(_)),8&t||"object"==typeof _&&_&&(4&t&&_.__esModule||16&t&&"function"==typeof _.then))return _;var a=Object.create(null);__webpack_require__.r(a);var u={};e=e||[null,r({}),r([]),r(r)];for(var o=2&t&&_;"object"==typeof o&&!~e.indexOf(o);o=r(o))Object.getOwnPropertyNames(o).forEach(e=>u[e]=()=>_[e]);return u.default=()=>_,__webpack_require__.d(a,u),a}})(),__webpack_require__.d=(e,r)=>{for(var _ in r)__webpack_require__.o(r,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:r[_]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce((r,_)=>(__webpack_require__.f[_](e,r),r),[])),__webpack_require__.u=e=>""+e+".js",__webpack_require__.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),__webpack_require__.X=(e,r,_)=>{var t=r;_||(r=e,_=()=>__webpack_require__(__webpack_require__.s=t)),r.map(__webpack_require__.e,__webpack_require__);var a=_();return void 0===a?e:a},__webpack_require__.v=(e,r,_,t)=>new Promise(function(e,r){try{var{readFile:t}=require("fs"),{join:a}=require("path");t(a(__dirname,"static/wasm/"+_+".wasm"),function(_,t){if(_)return r(_);e({arrayBuffer:()=>t})})}catch(e){r(e)}}).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,t)).then(r=>Object.assign(e,r.instance.exports)),__webpack_require__.p="/_next/",__webpack_require__.nc=void 0,(()=>{var e={658:1},installChunk=r=>{var _=r.modules,t=r.ids,a=r.runtime;for(var u in _)__webpack_require__.o(_,u)&&(__webpack_require__.m[u]=_[u]);a&&a(__webpack_require__);for(var o=0;o<t.length;o++)e[t[o]]=1};__webpack_require__.f.require=(r,_)=>{e[r]||(658!=r?installChunk(require("./chunks/"+__webpack_require__.u(r))):e[r]=1)},module.exports=__webpack_require__,__webpack_require__.C=installChunk})()})();