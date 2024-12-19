"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[538],{2027:(e,t,r)=>{r.d(t,{A:()=>n});let n=(0,r(3943).A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},9957:(e,t,r)=>{r.d(t,{m:()=>n});function n(e,t,{checkForDefaultPrevented:r=!0}={}){return function(n){if(e?.(n),!1===r||!n.defaultPrevented)return t?.(n)}}},2980:(e,t,r)=>{r.d(t,{UC:()=>ei,Y9:()=>eo,q7:()=>en,bL:()=>er,l9:()=>ea});var n=r(6540),o=r(2133),a=r(6214),i=r(1071),l=r(9957),s=r(1351),c=r(2579),u=r(8200),d=r(7971),f=r(8723),p=r(4848),m="Collapsible",[v,N]=(0,o.A)(m),[b,h]=v(m),x=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,open:o,defaultOpen:a,disabled:i,onOpenChange:l,...u}=e,[d=!1,m]=(0,s.i)({prop:o,defaultProp:a,onChange:l});return(0,p.jsx)(b,{scope:r,disabled:i,contentId:(0,f.B)(),open:d,onOpenToggle:n.useCallback(()=>m(e=>!e),[m]),children:(0,p.jsx)(c.sG.div,{"data-state":A(d),"data-disabled":i?"":void 0,...u,ref:t})})});x.displayName=m;var g="CollapsibleTrigger",y=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,...n}=e,o=h(g,r);return(0,p.jsx)(c.sG.button,{type:"button","aria-controls":o.contentId,"aria-expanded":o.open||!1,"data-state":A(o.open),"data-disabled":o.disabled?"":void 0,disabled:o.disabled,...n,ref:t,onClick:(0,l.m)(e.onClick,o.onOpenToggle)})});y.displayName=g;var C="CollapsibleContent",R=n.forwardRef((e,t)=>{let{forceMount:r,...n}=e,o=h(C,e.__scopeCollapsible);return(0,p.jsx)(d.C,{present:r||o.open,children:({present:e})=>(0,p.jsx)(w,{...n,ref:t,present:e})})});R.displayName=C;var w=n.forwardRef((e,t)=>{let{__scopeCollapsible:r,present:o,children:a,...l}=e,s=h(C,r),[d,f]=n.useState(o),m=n.useRef(null),v=(0,i.s)(t,m),N=n.useRef(0),b=N.current,x=n.useRef(0),g=x.current,y=s.open||d,R=n.useRef(y),w=n.useRef();return n.useEffect(()=>{let e=requestAnimationFrame(()=>R.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,u.N)(()=>{let e=m.current;if(e){w.current=w.current||{transitionDuration:e.style.transitionDuration,animationName:e.style.animationName},e.style.transitionDuration="0s",e.style.animationName="none";let t=e.getBoundingClientRect();N.current=t.height,x.current=t.width,R.current||(e.style.transitionDuration=w.current.transitionDuration,e.style.animationName=w.current.animationName),f(o)}},[s.open,o]),(0,p.jsx)(c.sG.div,{"data-state":A(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!y,...l,ref:v,style:{"--radix-collapsible-content-height":b?`${b}px`:void 0,"--radix-collapsible-content-width":g?`${g}px`:void 0,...e.style},children:y&&a})});function A(e){return e?"open":"closed"}var j=r(1427),I="Accordion",_=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[O,M,k]=(0,a.N)(I),[E,S]=(0,o.A)(I,[k,N]),D=N(),T=n.forwardRef((e,t)=>{let{type:r,...n}=e;return(0,p.jsx)(O.Provider,{scope:e.__scopeAccordion,children:"multiple"===r?(0,p.jsx)(H,{...n,ref:t}):(0,p.jsx)(G,{...n,ref:t})})});T.displayName=I;var[P,U]=E(I),[L,$]=E(I,{collapsible:!1}),G=n.forwardRef((e,t)=>{let{value:r,defaultValue:o,onValueChange:a=()=>{},collapsible:i=!1,...l}=e,[c,u]=(0,s.i)({prop:r,defaultProp:o,onChange:a});return(0,p.jsx)(P,{scope:e.__scopeAccordion,value:c?[c]:[],onItemOpen:u,onItemClose:n.useCallback(()=>i&&u(""),[i,u]),children:(0,p.jsx)(L,{scope:e.__scopeAccordion,collapsible:i,children:(0,p.jsx)(W,{...l,ref:t})})})}),H=n.forwardRef((e,t)=>{let{value:r,defaultValue:o,onValueChange:a=()=>{},...i}=e,[l=[],c]=(0,s.i)({prop:r,defaultProp:o,onChange:a}),u=n.useCallback(e=>c((t=[])=>[...t,e]),[c]),d=n.useCallback(e=>c((t=[])=>t.filter(t=>t!==e)),[c]);return(0,p.jsx)(P,{scope:e.__scopeAccordion,value:l,onItemOpen:u,onItemClose:d,children:(0,p.jsx)(L,{scope:e.__scopeAccordion,collapsible:!0,children:(0,p.jsx)(W,{...i,ref:t})})})}),[q,B]=E(I),W=n.forwardRef((e,t)=>{let{__scopeAccordion:r,disabled:o,dir:a,orientation:s="vertical",...u}=e,d=n.useRef(null),f=(0,i.s)(d,t),m=M(r),v="ltr"===(0,j.jH)(a),N=(0,l.m)(e.onKeyDown,e=>{if(!_.includes(e.key))return;let t=e.target,r=m().filter(e=>!e.ref.current?.disabled),n=r.findIndex(e=>e.ref.current===t),o=r.length;if(-1===n)return;e.preventDefault();let a=n,i=o-1,l=()=>{(a=n+1)>i&&(a=0)},c=()=>{(a=n-1)<0&&(a=i)};switch(e.key){case"Home":a=0;break;case"End":a=i;break;case"ArrowRight":"horizontal"===s&&(v?l():c());break;case"ArrowDown":"vertical"===s&&l();break;case"ArrowLeft":"horizontal"===s&&(v?c():l());break;case"ArrowUp":"vertical"===s&&c()}let u=a%o;r[u].ref.current?.focus()});return(0,p.jsx)(q,{scope:r,disabled:o,direction:a,orientation:s,children:(0,p.jsx)(O.Slot,{scope:r,children:(0,p.jsx)(c.sG.div,{...u,"data-orientation":s,ref:f,onKeyDown:o?void 0:N})})})}),z="AccordionItem",[F,K]=E(z),X=n.forwardRef((e,t)=>{let{__scopeAccordion:r,value:n,...o}=e,a=B(z,r),i=U(z,r),l=D(r),s=(0,f.B)(),c=n&&i.value.includes(n)||!1,u=a.disabled||e.disabled;return(0,p.jsx)(F,{scope:r,open:c,disabled:u,triggerId:s,children:(0,p.jsx)(x,{"data-orientation":a.orientation,"data-state":et(c),...l,...o,ref:t,disabled:u,open:c,onOpenChange:e=>{e?i.onItemOpen(n):i.onItemClose(n)}})})});X.displayName=z;var Y="AccordionHeader",J=n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=B(I,r),a=K(Y,r);return(0,p.jsx)(c.sG.h3,{"data-orientation":o.orientation,"data-state":et(a.open),"data-disabled":a.disabled?"":void 0,...n,ref:t})});J.displayName=Y;var Q="AccordionTrigger",V=n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=B(I,r),a=K(Q,r),i=$(Q,r),l=D(r);return(0,p.jsx)(O.ItemSlot,{scope:r,children:(0,p.jsx)(y,{"aria-disabled":a.open&&!i.collapsible||void 0,"data-orientation":o.orientation,id:a.triggerId,...l,...n,ref:t})})});V.displayName=Q;var Z="AccordionContent",ee=n.forwardRef((e,t)=>{let{__scopeAccordion:r,...n}=e,o=B(I,r),a=K(Z,r),i=D(r);return(0,p.jsx)(R,{role:"region","aria-labelledby":a.triggerId,"data-orientation":o.orientation,...i,...n,ref:t,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});function et(e){return e?"open":"closed"}ee.displayName=Z;var er=T,en=X,eo=J,ea=V,ei=ee},6214:(e,t,r)=>{r.d(t,{N:()=>s});var n=r(6540),o=r(2133),a=r(1071),i=r(3362),l=r(4848);function s(e){let t=e+"CollectionProvider",[r,s]=(0,o.A)(t),[c,u]=r(t,{collectionRef:{current:null},itemMap:new Map}),d=e=>{let{scope:t,children:r}=e,o=n.useRef(null),a=n.useRef(new Map).current;return(0,l.jsx)(c,{scope:t,itemMap:a,collectionRef:o,children:r})};d.displayName=t;let f=e+"CollectionSlot",p=n.forwardRef((e,t)=>{let{scope:r,children:n}=e,o=u(f,r),s=(0,a.s)(t,o.collectionRef);return(0,l.jsx)(i.DX,{ref:s,children:n})});p.displayName=f;let m=e+"CollectionItemSlot",v="data-radix-collection-item",N=n.forwardRef((e,t)=>{let{scope:r,children:o,...s}=e,c=n.useRef(null),d=(0,a.s)(t,c),f=u(m,r);return n.useEffect(()=>(f.itemMap.set(c,{ref:c,...s}),()=>void f.itemMap.delete(c))),(0,l.jsx)(i.DX,{[v]:"",ref:d,children:o})});return N.displayName=m,[{Provider:d,Slot:p,ItemSlot:N},function(t){let r=u(e+"CollectionConsumer",t);return n.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll(`[${v}]`));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},s]}},2133:(e,t,r)=>{r.d(t,{A:()=>a});var n=r(6540),o=r(4848);function a(e,t=[]){let r=[],i=()=>{let t=r.map(e=>n.createContext(e));return function(r){let o=r?.[e]||t;return n.useMemo(()=>({[`__scope${e}`]:{...r,[e]:o}}),[r,o])}};return i.scopeName=e,[function(t,a){let i=n.createContext(a),l=r.length;function s(t){let{scope:r,children:a,...s}=t,c=r?.[e][l]||i,u=n.useMemo(()=>s,Object.values(s));return(0,o.jsx)(c.Provider,{value:u,children:a})}return r=[...r,a],s.displayName=t+"Provider",[s,function(r,o){let s=o?.[e][l]||i,c=n.useContext(s);if(c)return c;if(void 0!==a)return a;throw Error(`\`${r}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let r=()=>{let r=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=r.reduce((t,{useScope:r,scopeName:n})=>{let o=r(e)[`__scope${n}`];return{...t,...o}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return r.scopeName=t.scopeName,r}(i,...t)]}},1427:(e,t,r)=>{r.d(t,{jH:()=>a});var n=r(6540);r(4848);var o=n.createContext(void 0);function a(e){let t=n.useContext(o);return e||t||"ltr"}},8723:(e,t,r)=>{r.d(t,{B:()=>s});var n,o=r(6540),a=r(8200),i=(n||(n=r.t(o,2)))["useId".toString()]||(()=>void 0),l=0;function s(e){let[t,r]=o.useState(i());return(0,a.N)(()=>{e||r(e=>e??String(l++))},[e]),e||(t?`radix-${t}`:"")}},7971:(e,t,r)=>{r.d(t,{C:()=>l});var n=r(6540),o=r(961),a=r(1071),i=r(8200),l=e=>{let{present:t,children:r}=e,l=function(e){var t,r;let[a,l]=n.useState(),c=n.useRef({}),u=n.useRef(e),d=n.useRef("none"),[f,p]=(t=e?"mounted":"unmounted",r={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},n.useReducer((e,t)=>r[e][t]??e,t));return n.useEffect(()=>{let e=s(c.current);d.current="mounted"===f?e:"none"},[f]),(0,i.N)(()=>{let t=c.current,r=u.current;if(r!==e){let n=d.current,o=s(t);e?p("MOUNT"):"none"===o||t?.display==="none"?p("UNMOUNT"):r&&n!==o?p("ANIMATION_OUT"):p("UNMOUNT"),u.current=e}},[e,p]),(0,i.N)(()=>{if(a){let e=e=>{let t=s(c.current).includes(e.animationName);e.target===a&&t&&o.flushSync(()=>p("ANIMATION_END"))},t=e=>{e.target===a&&(d.current=s(c.current))};return a.addEventListener("animationstart",t),a.addEventListener("animationcancel",e),a.addEventListener("animationend",e),()=>{a.removeEventListener("animationstart",t),a.removeEventListener("animationcancel",e),a.removeEventListener("animationend",e)}}p("ANIMATION_END")},[a,p]),{isPresent:["mounted","unmountSuspended"].includes(f),ref:n.useCallback(e=>{e&&(c.current=getComputedStyle(e)),l(e)},[])}}(t),c="function"==typeof r?r({present:l.isPresent}):n.Children.only(r),u=(0,a.s)(l.ref,function(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(r=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}(c));return"function"==typeof r||l.isPresent?n.cloneElement(c,{ref:u}):null};function s(e){return e?.animationName||"none"}l.displayName="Presence"},263:(e,t,r)=>{r.d(t,{c:()=>o});var n=r(6540);function o(e){let t=n.useRef(e);return n.useEffect(()=>{t.current=e}),n.useMemo(()=>(...e)=>t.current?.(...e),[])}},1351:(e,t,r)=>{r.d(t,{i:()=>a});var n=r(6540),o=r(263);function a({prop:e,defaultProp:t,onChange:r=()=>{}}){let[a,i]=function({defaultProp:e,onChange:t}){let r=n.useState(e),[a]=r,i=n.useRef(a),l=(0,o.c)(t);return n.useEffect(()=>{i.current!==a&&(l(a),i.current=a)},[a,i,l]),r}({defaultProp:t,onChange:r}),l=void 0!==e,s=l?e:a,c=(0,o.c)(r);return[s,n.useCallback(t=>{if(l){let r="function"==typeof t?t(e):t;r!==e&&c(r)}else i(t)},[l,e,i,c])]}},8200:(e,t,r)=>{r.d(t,{N:()=>o});var n=r(6540),o=globalThis?.document?n.useLayoutEffect:()=>{}}}]);