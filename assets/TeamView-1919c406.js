import{aq as g,o as t,e as n,i as l,f as e,t as o,F as b,n as f,d as x,g as r,au as c,S as p,w as v,at as k,V as $}from"./index-1092b788.js";const w={key:0,class:"p-5"},y={class:"flex items-center gap-14 mb-8"},T={class:"text-2xl"},M={class:"flex justify-center items-center w-10 h-10 rounded-lg border border-emerald-500 bg-emerald-200 dark:bg-emerald-900"},V={class:"flex justify-between items-center"},B={class:"block mb-6"},j=["src"],C={class:"block text-sm text-light-gray"},N={key:1,class:"ml-72 text-3xl"},S={__name:"TeamMembers",setup(i){const{data:a}=g();function d(s,m){return Math.floor(s+Math.random()*(m+1-s))}return(s,m)=>{var u,h;return t(),n("div",null,[(u=l(a))!=null&&u.length?(t(),n("div",w,[e("div",y,[e("h2",T,o(s.$t("titles.team")),1),e("span",M,o((h=l(a))==null?void 0:h.length),1)]),(t(!0),n(b,null,f(l(a),_=>(t(),n("div",{key:_.uid,class:"border-2 border-emerald-500 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3 mb-5"},[e("div",V,[e("span",B,o(_.username),1),e("img",{src:`./svg/avatars/${d(1,10)}-avatar.svg`,alt:"avatar",class:"w-12"},null,8,j)]),e("span",C,o(_.jobTitle),1)]))),128))])):(t(),n("div",N,[e("h2",null,o(s.$t("titles.noTeam")),1)]))])}}},A={class:"p-5"},F={class:"flex flex-col gap-5"},L={__name:"TeamMembersSceleton",setup(i){return(a,d)=>{const s=x("AnimatedPlaceholder");return t(),n("div",A,[e("div",F,[r(s,{class:"w-40 h-10"}),r(c),r(c),r(c),r(c)])])}}},P={class:"xl:ml-64"},z={__name:"TeamView",setup(i){const{isLoading:a}=g();return(d,s)=>(t(),p(k,null,{default:v(()=>[e("div",P,[r(S),l(a)?(t(),p(L,{key:0})):$("",!0)])]),_:1}))}};export{z as default};
