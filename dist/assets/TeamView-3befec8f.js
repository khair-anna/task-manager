import{u as f,ao as g,B as i,o as a,c as o,b as e,t as n,F as x,I as k,a as v,d as t,as as _,X as p,w as m,ar as w,aq as y}from"./index-e8e1b9b6.js";const $={key:0,class:"ml-64 p-5"},M={class:"flex items-center gap-14 mb-8"},T={class:"text-2xl"},B={class:"flex justify-center items-center w-10 h-10 rounded-lg border border-emerald-500 bg-emerald-200 dark:bg-emerald-900"},S={class:"flex justify-between items-center"},j={class:"block mb-6"},A=["src"],C={class:"block text-sm text-light-gray"},P={key:1,class:"ml-72 text-3xl"},V={__name:"TeamMembers",async setup(u){let c,l;const r=f();r.getTeamMembers.refetch(),[c,l]=g(()=>new Promise(s=>setTimeout(s,500))),await c,l();function b(s,h){return Math.floor(s+Math.random()*(h+1-s))}return(s,h)=>i(r).teamMembers.length!==0?(a(),o("div",$,[e("div",M,[e("h2",T,n(s.$t("titles.team")),1),e("span",B,n(i(r).teamMembers.length),1)]),(a(!0),o(x,null,k(i(r).teamMembers,d=>(a(),o("div",{key:d.uid,class:"border-2 border-emerald-500 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3 mb-5"},[e("div",S,[e("span",j,n(d.username),1),e("img",{src:`/svg/avatars/${b(1,10)}-avatar.svg`,alt:"avatar",class:"w-12"},null,8,A)]),e("span",C,n(d.jobTitle),1)]))),128))])):(a(),o("div",P,[e("h2",null,n(s.$t("titles.noTeam")),1)]))}},F={class:"ml-64 p-5"},I={class:"flex flex-col gap-5"},N={__name:"TeamMembersSceleton",setup(u){return(c,l)=>{const r=v("AnimatedPlaceholder");return a(),o("div",F,[e("div",I,[t(r,{class:"w-40 h-10"}),t(_),t(_),t(_),t(_)])])}}},z={__name:"TeamView",setup(u){return(c,l)=>(a(),p(w,null,{default:m(()=>[(a(),p(y,null,{fallback:m(()=>[t(N)]),default:m(()=>[t(V)]),_:1}))]),_:1}))}};export{z as default};