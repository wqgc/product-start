import{a as ae}from"./chunk-Z3EJIW72.js";import"./chunk-S6LVBEUU.js";import{a as w}from"./chunk-D4RARUUX.js";import{a as u}from"./chunk-AVVFLK4W.js";import{a as re,b as p,c as te,d as se,f as ie,g as ne,h as b}from"./chunk-F5BNY5M6.js";import{c as ue}from"./chunk-M5VJKR3C.js";import{a as de}from"./chunk-G27EFIGX.js";import{A as E,B as U,I as _,L as h,M as m,N as me,a as We,b as N,e as ee,f as v,g as oe,u as O,v as V,w as q,x as Z,y as B}from"./chunk-FXRGY3TF.js";import{a as X,b as R,c as d,g as le,i as pe,j as ce}from"./chunk-BGUH4UV6.js";import{a as J,b as Q,d as n,f as l}from"./chunk-DRMASW6M.js";var De="firebase",Ve="9.5.0";R(De,Ve,"app");var j=n(l()),$e=n(We());var e=n(l());var fe=class{static setUserStatus(r){let t=pe();return r?le(t,i=>{i&&i.displayName?r({uid:i.uid,signedIn:!0,profile:{displayName:i.displayName}}):r(s=>Q(J({},s),{uid:"",signedIn:!1}))}):null}static async logoutHandler(r){if(r!==null)try{await de.logout(),r({message:"Successfully logged out!",type:"success"})}catch(t){r({message:t.message,type:"error"})}}},$=fe;var y=n(l());var ke=n(l()),mr=n(ee());function ge(o){return E("MuiAlert",o)}var qe=U("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),G=qe;var H=n(l()),Eo=n(ee());function ye(o){return E("MuiIconButton",o)}var Ze=U("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),ve=Ze;var Pe=n(v()),Ge=["edge","children","className","color","disabled","disableFocusRipple","size"],Ke=o=>{let{classes:r,disabled:t,color:i,edge:s,size:g}=o,S={root:["root",t&&"disabled",i!=="default"&&`color${m(i)}`,s&&`edge${m(s)}`,`size${m(g)}`]};return B(S,ye,r)},Ye=h(ue,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,r)=>{let{ownerState:t}=o;return[r.root,t.color!=="default"&&r[`color${m(t.color)}`],t.edge&&r[`edge${m(t.edge)}`],r[`size${m(t.size)}`]]}})(({theme:o,ownerState:r})=>d({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:o.palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!r.disableRipple&&{"&:hover":{backgroundColor:V(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},r.edge==="start"&&{marginLeft:r.size==="small"?-3:-12},r.edge==="end"&&{marginRight:r.size==="small"?-3:-12}),({theme:o,ownerState:r})=>d({},r.color==="inherit"&&{color:"inherit"},r.color!=="inherit"&&r.color!=="default"&&d({color:o.palette[r.color].main},!r.disableRipple&&{"&:hover":{backgroundColor:V(o.palette[r.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),r.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},r.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${ve.disabled}`]:{backgroundColor:"transparent",color:o.palette.action.disabled}})),Je=H.forwardRef(function(r,t){let i=_({props:r,name:"MuiIconButton"}),{edge:s=!1,children:g,className:S,color:L="default",disabled:M=!1,disableFocusRipple:T=!1,size:D="medium"}=i,k=N(i,Ge),z=d({},i,{edge:s,color:L,disabled:M,disableFocusRipple:T,size:D}),C=Ke(z);return(0,Pe.jsx)(Ye,d({className:O(C.root,S),centerRipple:!0,focusRipple:!T,disabled:M,ref:t,ownerState:z},k,{children:g}))}),K=Je;var Yo=n(l());var he=n(v()),be=u((0,he.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined");var Xo=n(l());var xe=n(v()),Se=u((0,xe.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined");var or=n(l());var Te=n(v()),Ce=u((0,Te.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline");var sr=n(l());var Ie=n(v()),Ae=u((0,Ie.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined");var ar=n(l());var je=n(v()),Le=u((0,je.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");var c=n(v()),ze=n(v()),Me,Qe=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],Xe=o=>{let{variant:r,color:t,severity:i,classes:s}=o,g={root:["root",`${r}${m(t||i)}`,`${r}`],icon:["icon"],message:["message"],action:["action"]};return B(g,ge,s)},Re=h(me,{name:"MuiAlert",slot:"Root",overridesResolver:(o,r)=>{let{ownerState:t}=o;return[r.root,r[t.variant],r[`${t.variant}${m(t.color||t.severity)}`]]}})(({theme:o,ownerState:r})=>{let t=o.palette.mode==="light"?q:Z,i=o.palette.mode==="light"?Z:q,s=r.color||r.severity;return d({},o.typography.body2,{borderRadius:o.shape.borderRadius,backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&r.variant==="standard"&&{color:t(o.palette[s].light,.6),backgroundColor:i(o.palette[s].light,.9),[`& .${G.icon}`]:{color:o.palette.mode==="dark"?o.palette[s].main:o.palette[s].light}},s&&r.variant==="outlined"&&{color:t(o.palette[s].light,.6),border:`1px solid ${o.palette[s].light}`,[`& .${G.icon}`]:{color:o.palette.mode==="dark"?o.palette[s].main:o.palette[s].light}},s&&r.variant==="filled"&&{color:"#fff",fontWeight:o.typography.fontWeightMedium,backgroundColor:o.palette.mode==="dark"?o.palette[s].dark:o.palette[s].main})}),eo=h("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,r)=>r.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),oo=h("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,r)=>r.message})({padding:"8px 0"}),Ne=h("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,r)=>r.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),Oe={success:(0,c.jsx)(be,{fontSize:"inherit"}),warning:(0,c.jsx)(Se,{fontSize:"inherit"}),error:(0,c.jsx)(Ce,{fontSize:"inherit"}),info:(0,c.jsx)(Ae,{fontSize:"inherit"})},ro=ke.forwardRef(function(r,t){let i=_({props:r,name:"MuiAlert"}),{action:s,children:g,className:S,closeText:L="Close",color:M,icon:T,iconMapping:D=Oe,onClose:k,role:z="alert",severity:C="success",variant:He="standard"}=i,Fe=N(i,Qe),I=d({},i,{color:M,severity:C,variant:He}),A=Xe(I);return(0,ze.jsxs)(Re,d({role:z,square:!0,elevation:0,ownerState:I,className:O(A.root,S),ref:t},Fe,{children:[T!==!1?(0,c.jsx)(eo,{ownerState:I,className:A.icon,children:T||D[C]||Oe[C]}):null,(0,c.jsx)(oo,{ownerState:I,className:A.message,children:g}),s!=null?(0,c.jsx)(Ne,{className:A.action,children:s}):null,s==null&&k?(0,c.jsx)(Ne,{ownerState:I,className:A.action,children:(0,c.jsx)(K,{size:"small","aria-label":L,title:L,color:"inherit",onClick:k,children:Me||(Me=(0,c.jsx)(Le,{fontSize:"small"}))})}):null]}))}),Y=ro;var a=n(l());var to=({user:o})=>{let{setAlert:r}=(0,a.useContext)(w),t=()=>$.logoutHandler(r);return a.default.createElement("div",null,a.default.createElement("ul",{className:"topbar menu__horizontal"},o.signedIn?a.default.createElement(a.default.Fragment,null,a.default.createElement("li",null,a.default.createElement("strong",{className:"topbar__display-name"},o.profile.displayName)),a.default.createElement("li",null,a.default.createElement(b,{to:"/",onClick:t},"Logout"))):a.default.createElement(a.default.Fragment,null,a.default.createElement("li",null,a.default.createElement("strong",null,a.default.createElement(b,{to:"/login"},"Login"))),a.default.createElement("li",null,a.default.createElement(b,{to:"/register"},"Register")))))},Be=to;var F=n(l());var so=()=>F.default.createElement("header",null,F.default.createElement("h1",{className:"site-name"},F.default.createElement(ne,{to:"/"},ce.SITE_NAME))),Ee=so;var x=n(l());var io=({user:o})=>o.signedIn?x.default.createElement("nav",null,x.default.createElement("ul",{className:"main-navigation menu__horizontal"},x.default.createElement("li",null,x.default.createElement(b,{to:"/products"},"My Products")),x.default.createElement("li",null,x.default.createElement(b,{to:"/pledges"},"My Pledges")))):null,Ue=io;var no=({alert:o,setAlert:r,user:t})=>y.default.createElement("div",null,y.default.createElement(Be,{user:t}),y.default.createElement(Ee,null),y.default.createElement(Ue,{user:t}),y.default.createElement("div",{className:"alert-container"},o.message&&y.default.createElement(Y,{onClose:()=>{r({message:"",type:void 0})},severity:o.type},o.message)),y.default.createElement("main",null,y.default.createElement(re,null))),_e=no;var W=n(l());var ao=({enforce:o,user:r,children:t})=>{let i=se();return(0,W.useEffect)(()=>{o==="signedIn"&&r.signedIn===!1?i("/login",{replace:!1}):o==="signedOut"&&r.signedIn===!0&&i("/",{replace:!1})},[o,r]),W.default.createElement("div",null,t)},P=ao;var lo=(0,e.lazy)(()=>import("./LandingPage-BT42ANDV.js")),po=(0,e.lazy)(()=>import("./LoginPage-GVNYILA6.js")),co=(0,e.lazy)(()=>import("./RegisterPage-L3DY2EHL.js")),mo=(0,e.lazy)(()=>import("./ProductsPage-DNJ5LROZ.js")),uo=(0,e.lazy)(()=>import("./CreatePage-KY46VNR2.js")),fo=(0,e.lazy)(()=>import("./ProductPage-RC27ZUKJ.js")),go=(0,e.lazy)(()=>import("./EditPage-ONB7NEHR.js")),yo=(0,e.lazy)(()=>import("./PledgeSuccessPage-V5EWG3XF.js")),vo=(0,e.lazy)(()=>import("./PledgesPage-LK2D5XF3.js")),Po=(0,e.lazy)(()=>import("./NotFound-LFPLZNGH.js")),f=e.default.createElement("div",null),ho=()=>{let[o,r]=(0,e.useState)({message:"",type:void 0}),[t,i]=(0,e.useState)({uid:"",signedIn:null,profile:{displayName:""}});(0,e.useEffect)(()=>{$.setUserStatus(i)},[]);let s=(0,e.useMemo)(()=>({alert:o,setAlert:r}),[]),g=(0,e.useMemo)(()=>({user:t,setUser:i}),[]);return e.default.createElement(ae.Provider,{value:g},e.default.createElement(w.Provider,{value:s},e.default.createElement(ie,null,e.default.createElement(te,null,e.default.createElement(p,{path:"/",element:e.default.createElement(_e,{alert:o,setAlert:r,user:t})},e.default.createElement(p,{index:!0,element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(lo,{user:t}))}),e.default.createElement(p,{path:"login",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedOut",user:t},e.default.createElement(po,null)))}),e.default.createElement(p,{path:"register",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedOut",user:t},e.default.createElement(co,null)))}),e.default.createElement(p,{path:"products",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedIn",user:t},e.default.createElement(mo,{user:t})))}),e.default.createElement(p,{path:"products/create",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedIn",user:t},e.default.createElement(uo,null)))}),e.default.createElement(p,{path:"products/:id",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(fo,{user:t}))}),e.default.createElement(p,{path:"products/:id/edit",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedIn",user:t},e.default.createElement(go,{user:t})))}),e.default.createElement(p,{path:"products/:id/:pledgeAmount/success",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedIn",user:t},e.default.createElement(yo,{user:t})))}),e.default.createElement(p,{path:"pledges",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(P,{enforce:"signedIn",user:t},e.default.createElement(vo,{user:t})))}),e.default.createElement(p,{path:"*",element:e.default.createElement(e.Suspense,{fallback:f},e.default.createElement(Po,null))}))))))},we=ho;var bo={apiKey:"AIzaSyDm43g2Ad3uqfqc0yVWR7-3Wjjva0pG7HI",authDomain:"rn-db-823f5.firebaseapp.com",databaseURL:"https://rn-db-823f5-default-rtdb.firebaseio.com",projectId:"rn-db-823f5",storageBucket:"rn-db-823f5.appspot.com",messagingSenderId:"960434173894",appId:"1:960434173894:web:ea8054234881ce580c24c7"};X(bo);$e.default.render(j.default.createElement(j.default.StrictMode,null,j.default.createElement(oe,{injectFirst:!0},j.default.createElement(we,null))),document.getElementById("root"));
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
