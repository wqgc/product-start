import{A as w,B as D,I as j,L as l,M as a,b as S,c as v,d as b,e as K,f as L,u as _,y as $}from"./chunk-FXRGY3TF.js";import{c as t}from"./chunk-BGUH4UV6.js";import{d as g,f as F}from"./chunk-DRMASW6M.js";var z=g(F()),or=g(K());function M(r){return w("MuiCircularProgress",r)}var X=D("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=g(L()),V=["className","color","disableShrink","size","style","thickness","value","variant"],p=r=>r,R,N,O,U,o=44,B=b(R||(R=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),G=b(N||(N=p`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Y=r=>{let{classes:e,variant:s,color:i,disableShrink:u}=r,f={root:["root",s,`color${a(i)}`],svg:["svg"],circle:["circle",`circle${a(s)}`,u&&"circleDisableShrink"]};return $(f,M,e)},Z=l("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:s}=r;return[e.root,e[s.variant],e[`color${a(s.color)}`]]}})(({ownerState:r,theme:e})=>t({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:e.palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&v(O||(O=p`
      animation: ${0} 1.4s linear infinite;
    `),B)),q=l("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),A=l("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{let{ownerState:s}=r;return[e.circle,e[`circle${a(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>t({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&v(U||(U=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),G)),H=z.forwardRef(function(e,s){let i=j({props:e,name:"MuiCircularProgress"}),{className:u,color:f="primary",disableShrink:E=!1,size:d=40,style:I,thickness:n=3.6,value:y=0,variant:T="indeterminate"}=i,W=S(i,V),c=t({},i,{color:f,disableShrink:E,size:d,thickness:n,value:y,variant:T}),h=Y(c),P={},k={},x={};if(T==="determinate"){let C=2*Math.PI*((o-n)/2);P.strokeDasharray=C.toFixed(3),x["aria-valuenow"]=Math.round(y),P.strokeDashoffset=`${((100-y)/100*C).toFixed(3)}px`,k.transform="rotate(-90deg)"}return(0,m.jsx)(Z,t({className:_(h.root,u),style:t({width:d,height:d},k,I),ownerState:c,ref:s,role:"progressbar"},x,W,{children:(0,m.jsx)(q,{className:h.svg,ownerState:c,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:(0,m.jsx)(A,{className:h.circle,style:P,ownerState:c,cx:o,cy:o,r:(o-n)/2,fill:"none",strokeWidth:n})})}))}),J=H;export{J as a};
