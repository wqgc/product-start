import{a as E}from"./chunk-5FQ5YIN4.js";import{a}from"./chunk-IHUE33HU.js";import{a as c}from"./chunk-T2BU323Z.js";import"./chunk-S6LVBEUU.js";import{a as i}from"./chunk-2WQVVDJJ.js";import"./chunk-FDL32AD7.js";import{a as D}from"./chunk-GFLQL2OI.js";import"./chunk-AVVFLK4W.js";import{d as P,e as f}from"./chunk-F5BNY5M6.js";import{a as v}from"./chunk-MLLMWUDP.js";import{a as b}from"./chunk-XCKYJCSI.js";import"./chunk-M5VJKR3C.js";import"./chunk-G27EFIGX.js";import"./chunk-FXRGY3TF.js";import"./chunk-BGUH4UV6.js";import{d as p,f as x}from"./chunk-DRMASW6M.js";var t=p(x());var l=p(E());var N=({user:e})=>{let[s,U]=(0,t.useState)(null),[o,S]=(0,t.useState)(null),[d,h]=(0,t.useState)(""),[B,m]=(0,t.useState)(!1),[C,L]=(0,t.useState)(!0),[g,I]=(0,t.useState)(!0),[y,F]=(0,t.useState)(!1),{id:n}=f(),u=P();return(0,t.useEffect)(()=>{let r=!0;return(async()=>{n&&(e&&e.signedIn===!0&&!s&&await i.setPledgeData({setUserPledgeData:U,productId:n,isMounted:r}),o||await i.setProduct({id:n,setProduct:S,setProductLoading:I,navigate:u,isMounted:r}))})(),()=>{r=!1}},[e]),(0,t.useEffect)(()=>{let r=i.isPledgeValid(d,m);L(!r)},[d]),t.default.createElement("div",null,g&&t.default.createElement(v,null),!g&&o&&t.default.createElement(t.default.Fragment,null,t.default.createElement("h2",null,o.title),t.default.createElement("div",{className:"details"},t.default.createElement("div",null,t.default.createElement("em",null,"By ",o.creatorName)),t.default.createElement("div",null,t.default.createElement("strong",null,"Goal:")," ",l.default.format("USD",o.goal)),t.default.createElement("div",null,t.default.createElement("strong",null,"Raised so far:")," ",l.default.format("USD",o.currentFunds))),t.default.createElement("br",null),t.default.createElement(a,null),t.default.createElement("p",null,o.description),(e==null?void 0:e.signedIn)&&(e==null?void 0:e.uid)!==o.creatorUID&&t.default.createElement(t.default.Fragment,null,t.default.createElement(a,null),t.default.createElement("br",null),t.default.createElement("h3",null,"Pledge to ",o.title),s?t.default.createElement("p",null,"You've pledged ",l.default.format("USD",s.amount),"!"):t.default.createElement("div",null,t.default.createElement(D,{id:"pledge-input",helperText:"Please input a valid USD amount less than 12 numbers long",label:"Pledge Amount in USD",error:B,value:d,onChange:({target:r})=>h(r.value),required:!0}),t.default.createElement("br",null),t.default.createElement(c,{variant:"contained",loading:y,onClick:()=>i.submitPledge({id:n,pledgeAmount:d.replace(/,/g,""),setPledgeError:m,setSubmitLoading:F}),disabled:C},"Pledge"))),(e==null?void 0:e.uid)===o.creatorUID&&t.default.createElement(t.default.Fragment,null,t.default.createElement(a,null),t.default.createElement("br",null),t.default.createElement(b,{variant:"contained",onClick:()=>u("edit",{replace:!1})},"Edit Campaign Details"))))},Y=N;export{Y as default};
