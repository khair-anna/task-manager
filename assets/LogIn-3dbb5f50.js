import{u as x,a as _,b as $,l as y,r as b,c as V,d as N,o as S,e as I,f as t,g as r,w as i,h as C,i as d,t as c,F as E,j as p,_ as F,k as L}from"./index-1092b788.js";import{u as U,_ as f,r as g,e as q}from"./InputUI-bd212db8.js";import{_ as A}from"./ButtonUI-362414bf.js";function B(){const u=x(),e=_();return $({mutationFn:a=>y(a),onSuccess:()=>{u.invalidateQueries({queryKey:["user"]})},onError:a=>{switch(a.code){case"auth/user-not-found":e.addNotification("error","User not found!");break;case"auth/wrong-password":e.addNotification("error","Wrong password!");break;case"auth/invalid-login-credentials":e.addNotification("error","Invalid login credentials!");break;default:e.addNotification("error","Error logging in!")}}})}const j={class:"pl-32 pt-7"},z=t("img",{src:F,alt:"logo"},null,-1),K=t("span",{class:"text-2xl tracking-widest"},"TASKIE",-1),M={class:"flex flex-col items-center justify-center h-screen -mt-7"},Q={class:"mt-10 block text-center"},T={class:"block pb-3 dark:text-zinc-400"},G={__name:"LogIn",setup(u){const e=b({email:"",password:""}),a=V(()=>({email:{required:g,email:q},password:{required:g}})),l=U(a,e),h=_(),{mutateAsync:w,isLoading:k}=B(),v=async s=>{await l.value.$validate()&&w(s,{onSuccess:()=>{L.push("/"),h.addNotification("success","You are successfully logged in")}})};return(s,o)=>{const m=N("router-link");return S(),I(E,null,[t("div",j,[r(m,{to:{name:"home"},class:"flex gap-3 items-center"},{default:i(()=>[z,K]),_:1})]),t("div",M,[t("form",{onSubmit:o[2]||(o[2]=C(n=>v(e),["prevent"])),class:"flex flex-col gap-5"},[r(f,{type:"email",name:"email",placeholder:s.$t("placeholders.email"),modelValue:e.email,"onUpdate:modelValue":o[0]||(o[0]=n=>e.email=n),errors:d(l).email.$errors},null,8,["placeholder","modelValue","errors"]),r(f,{type:"password",name:"password",placeholder:s.$t("placeholders.password"),modelValue:e.password,"onUpdate:modelValue":o[1]||(o[1]=n=>e.password=n),errors:d(l).password.$errors},null,8,["placeholder","modelValue","errors"]),r(A,{"is-loading":d(k)},{default:i(()=>[p(c(s.$t("buttons.logIn")),1)]),_:1},8,["is-loading"])],32),t("div",Q,[t("span",T,c(s.$t("texts.textLogIn")),1),r(m,{to:{name:"signup"},class:"underline text-lg dark:text-zinc-300"},{default:i(()=>[p(c(s.$t("buttons.signUp")),1)]),_:1})])])],64)}}};export{G as default};
