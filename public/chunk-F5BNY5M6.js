import{c as W}from"./chunk-BGUH4UV6.js";import{d as $,f as j}from"./chunk-DRMASW6M.js";var u=$(j());var w,B=w||(w={});B.Pop="POP";B.Push="PUSH";B.Replace="REPLACE";var F=function(e){return e};function J(e){e.preventDefault(),e.returnValue=""}function z(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter(function(n){return n!==t})}},call:function(t){e.forEach(function(n){return n&&n(t)})}}}function ie(){return Math.random().toString(36).substr(2,8)}function C(e){var t=e.pathname,n=e.search;return e=e.hash,(t===void 0?"/":t)+(n===void 0?"":n)+(e===void 0?"":e)}function x(e){var t={};if(e){var n=e.indexOf("#");0<=n&&(t.hash=e.substr(n),e=e.substr(0,n)),n=e.indexOf("?"),0<=n&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Y(e){function t(){var c=l.location,d=h.state||{};return[d.idx,F({pathname:c.pathname,search:c.search,hash:c.hash,state:d.usr||null,key:d.key||"default"})]}function n(c){return typeof c=="string"?c:C(c)}function a(c,d){return d===void 0&&(d=null),F(W({pathname:f.pathname,hash:"",search:""},typeof c=="string"?x(c):c,{state:d,key:ie()}))}function r(c){y=c,c=t(),p=c[0],f=c[1],v.call({action:y,location:f})}function o(c,d){function D(){o(c,d)}var P=w.Push,E=a(c,d);if(!N.length||(N.call({action:P,location:E,retry:D}),!1)){var V=[{usr:E.state,key:E.key,idx:p+1},n(E)];E=V[0],V=V[1];try{h.pushState(E,"",V)}catch{l.location.assign(V)}r(P)}}function i(c,d){function D(){i(c,d)}var P=w.Replace,E=a(c,d);N.length&&(N.call({action:P,location:E,retry:D}),1)||(E=[{usr:E.state,key:E.key,idx:p},n(E)],h.replaceState(E[0],"",E[1]),r(P))}function s(c){h.go(c)}e===void 0&&(e={}),e=e.window;var l=e===void 0?document.defaultView:e,h=l.history,m=null;l.addEventListener("popstate",function(){if(m)N.call(m),m=null;else{var c=w.Pop,d=t(),D=d[0];if(d=d[1],N.length){if(D!=null){var P=p-D;P&&(m={action:c,location:d,retry:function(){s(-1*P)}},s(P))}}else r(c)}});var y=w.Pop;e=t();var p=e[0],f=e[1],v=z(),N=z();return p==null&&(p=0,h.replaceState(W({},h.state,{idx:p}),"")),{get action(){return y},get location(){return f},createHref:n,push:o,replace:i,go:s,back:function(){s(-1)},forward:function(){s(1)},listen:function(c){return v.push(c)},block:function(c){var d=N.push(c);return N.length===1&&l.addEventListener("beforeunload",J),function(){d(),N.length||l.removeEventListener("beforeunload",J)}}}}function R(e,t){if(!e)throw new Error(t)}var L=(0,u.createContext)(null),A=(0,u.createContext)(null),S=(0,u.createContext)({outlet:null,matches:[]});function K(e){return Q()}function q(e){R(!1)}function I(e){let{basename:t="/",children:n=null,location:a,navigationType:r=w.Pop,navigator:o,static:i=!1}=e;b()&&R(!1);let s=xe(t),l=(0,u.useMemo)(()=>({basename:s,navigator:o,static:i}),[s,o,i]);typeof a=="string"&&(a=x(a));let{pathname:h="/",search:m="",hash:y="",state:p=null,key:f="default"}=a,v=(0,u.useMemo)(()=>{let N=re(h,s);return N==null?null:{pathname:N,search:m,hash:y,state:p,key:f}},[s,h,m,y,p,f]);return v==null?null:(0,u.createElement)(L.Provider,{value:l},(0,u.createElement)(A.Provider,{children:n,value:{location:v,navigationType:r}}))}function se(e){let{children:t,location:n}=e;return X(M(t),n)}function T(e){b()||R(!1);let{basename:t,navigator:n}=(0,u.useContext)(L),{hash:a,pathname:r,search:o}=k(e),i=r;if(t!=="/"){let s=we(e),l=s!=null&&s.endsWith("/");i=r==="/"?t+(l?"/":""):O([t,r])}return n.createHref({pathname:i,search:o,hash:a})}function b(){return(0,u.useContext)(A)!=null}function _(){return b()||R(!1),(0,u.useContext)(A).location}function U(){b()||R(!1);let{basename:e,navigator:t}=(0,u.useContext)(L),{matches:n}=(0,u.useContext)(S),{pathname:a}=_(),r=JSON.stringify(n.map(s=>s.pathnameBase)),o=(0,u.useRef)(!1);return(0,u.useEffect)(()=>{o.current=!0}),(0,u.useCallback)(function(s,l){if(l===void 0&&(l={}),!o.current)return;if(typeof s=="number"){t.go(s);return}let h=ae(s,JSON.parse(r),a);e!=="/"&&(h.pathname=O([e,h.pathname])),(l.replace?t.replace:t.push)(h,l.state)},[e,t,r,a])}function Q(){return(0,u.useContext)(S).outlet}function le(){let{matches:e}=(0,u.useContext)(S),t=e[e.length-1];return t?t.params:{}}function k(e){let{matches:t}=(0,u.useContext)(S),{pathname:n}=_(),a=JSON.stringify(t.map(r=>r.pathnameBase));return(0,u.useMemo)(()=>ae(e,JSON.parse(a),n),[e,a,n])}function X(e,t){b()||R(!1);let{matches:n}=(0,u.useContext)(S),a=n[n.length-1],r=a?a.params:{},o=a?a.pathname:"/",i=a?a.pathnameBase:"/",s=a&&a.route,l=_(),h;if(t){var m;let v=typeof t=="string"?x(t):t;i==="/"||((m=v.pathname)==null?void 0:m.startsWith(i))||R(!1),h=v}else h=l;let y=h.pathname||"/",p=i==="/"?y:y.slice(i.length)||"/",f=Z(e,{pathname:p});return Ne(f&&f.map(v=>Object.assign({},v,{params:Object.assign({},r,v.params),pathname:O([i,v.pathname]),pathnameBase:v.pathnameBase==="/"?i:O([i,v.pathnameBase])})),n)}function M(e){let t=[];return u.Children.forEach(e,n=>{if(!(0,u.isValidElement)(n))return;if(n.type===u.Fragment){t.push.apply(t,M(n.props.children));return}n.type!==q&&R(!1);let a={caseSensitive:n.props.caseSensitive,element:n.props.element,index:n.props.index,path:n.props.path};n.props.children&&(a.children=M(n.props.children)),t.push(a)}),t}function Z(e,t,n){n===void 0&&(n="/");let a=typeof t=="string"?x(t):t,r=re(a.pathname||"/",n);if(r==null)return null;let o=G(e);ue(o);let i=null;for(let s=0;i==null&&s<o.length;++s)i=ge(o[s],e,r);return i}function G(e,t,n,a){return t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a=""),e.forEach((r,o)=>{let i={relativePath:r.path||"",caseSensitive:r.caseSensitive===!0,childrenIndex:o};i.relativePath.startsWith("/")&&(i.relativePath.startsWith(a)||R(!1),i.relativePath=i.relativePath.slice(a.length));let s=O([a,i.relativePath]),l=n.concat(i);r.children&&r.children.length>0&&(r.index===!0&&R(!1),G(r.children,t,l,s)),!(r.path==null&&!r.index)&&t.push({path:s,score:ve(s,r.index),routesMeta:l})}),t}function ue(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ye(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var ce=/^:\w+$/,he=3,pe=2,fe=1,de=10,me=-2,ee=e=>e==="*";function ve(e,t){let n=e.split("/"),a=n.length;return n.some(ee)&&(a+=me),t&&(a+=pe),n.filter(r=>!ee(r)).reduce((r,o)=>r+(ce.test(o)?he:o===""?fe:de),a)}function ye(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function ge(e,t,n){let a=t,{routesMeta:r}=e,o={},i="/",s=[];for(let l=0;l<r.length;++l){let h=r[l],m=l===r.length-1,y=i==="/"?n:n.slice(i.length)||"/",p=te({path:h.relativePath,caseSensitive:h.caseSensitive,end:m},y);if(!p)return null;Object.assign(o,p.params);let f=a[h.childrenIndex];s.push({params:o,pathname:O([i,p.pathname]),pathnameBase:O([i,p.pathnameBase]),route:f}),p.pathnameBase!=="/"&&(i=O([i,p.pathnameBase])),a=f.children}return s}function Ne(e,t){return t===void 0&&(t=[]),e==null?null:e.reduceRight((n,a,r)=>(0,u.createElement)(S.Provider,{children:a.route.element!==void 0?a.route.element:(0,u.createElement)(K,null),value:{outlet:n,matches:t.concat(e.slice(0,r+1))}}),null)}function te(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=Ee(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let o=r[0],i=o.replace(/(.)\/+$/,"$1"),s=r.slice(1);return{params:a.reduce((h,m,y)=>{if(m==="*"){let p=s[y]||"";i=o.slice(0,o.length-p.length).replace(/(.)\/+$/,"$1")}return h[m]=Re(s[y]||"",m),h},{}),pathname:o,pathnameBase:i,pattern:e}}function Ee(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(i,s)=>(a.push(s),"([^\\/]+)"));return e.endsWith("*")?(a.push("*"),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r+=n?"\\/*$":"(?:\\b|$)",[new RegExp(r,t?void 0:"i"),a]}function Re(e,t){try{return decodeURIComponent(e)}catch{return e}}function ne(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?x(e):e;return{pathname:n?n.startsWith("/")?n:Pe(n,t):t,search:Oe(a),hash:Se(r)}}function Pe(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function ae(e,t,n){let a=typeof e=="string"?x(e):e,r=e===""||a.pathname===""?"/":a.pathname,o;if(r==null)o=n;else{let s=t.length-1;if(r.startsWith("..")){let l=r.split("/");for(;l[0]==="..";)l.shift(),s-=1;a.pathname=l.join("/")}o=s>=0?t[s]:"/"}let i=ne(a,o);return r&&r!=="/"&&r.endsWith("/")&&!i.pathname.endsWith("/")&&(i.pathname+="/"),i}function we(e){return e===""||e.pathname===""?"/":typeof e=="string"?x(e).pathname:e.pathname}function re(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=e.charAt(t.length);return n&&n!=="/"?null:e.slice(t.length)||"/"}var O=e=>e.join("/").replace(/\/\/+/g,"/"),xe=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Oe=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Se=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;var g=$(j());function H(){return H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},H.apply(this,arguments)}function oe(e,t){if(e==null)return{};var n={},a=Object.keys(e),r,o;for(o=0;o<a.length;o++)r=a[o],!(t.indexOf(r)>=0)&&(n[r]=e[r]);return n}var _e=["onClick","reloadDocument","replace","state","target","to"],De=["aria-current","caseSensitive","className","end","style","to"];function Ye(e){let{basename:t,children:n,window:a}=e,r=(0,g.useRef)();r.current==null&&(r.current=Y({window:a}));let o=r.current,[i,s]=(0,g.useState)({action:o.action,location:o.location});return(0,g.useLayoutEffect)(()=>o.listen(s),[o]),(0,g.createElement)(I,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:o})}function be(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}var Ve=(0,g.forwardRef)(function(t,n){let{onClick:a,reloadDocument:r,replace:o=!1,state:i,target:s,to:l}=t,h=oe(t,_e),m=T(l),y=ke(l,{replace:o,state:i,target:s});function p(f){a&&a(f),!f.defaultPrevented&&!r&&y(f)}return(0,g.createElement)("a",H({},h,{href:m,onClick:p,ref:n,target:s}))}),Ke=(0,g.forwardRef)(function(t,n){let{"aria-current":a="page",caseSensitive:r=!1,className:o="",end:i=!1,style:s,to:l}=t,h=oe(t,De),m=_(),y=k(l),p=m.pathname,f=y.pathname;r||(p=p.toLowerCase(),f=f.toLowerCase());let v=p===f||!i&&p.startsWith(f)&&p.charAt(f.length)==="/",N=v?a:void 0,c;typeof o=="function"?c=o({isActive:v}):c=[o,v?"active":null].filter(Boolean).join(" ");let d=typeof s=="function"?s({isActive:v}):s;return(0,g.createElement)(Ve,H({},h,{"aria-current":N,className:c,ref:n,style:d,to:l}))});function ke(e,t){let{target:n,replace:a,state:r}=t===void 0?{}:t,o=U(),i=_(),s=k(e);return(0,g.useCallback)(l=>{if(l.button===0&&(!n||n==="_self")&&!be(l)){l.preventDefault();let h=!!a||C(i)===C(s);o(e,{replace:h,state:r})}},[i,o,s,a,r,n,e])}export{K as a,q as b,se as c,U as d,le as e,Ye as f,Ve as g,Ke as h};
/**
 * React Router DOM v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */