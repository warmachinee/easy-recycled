(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{580:function(e,t,s){"use strict";s.r(t);var n=s(0),o=s.n(n),a=s(26),r=s.n(a),i=s(104),c=s(31);const l=r()({loader:()=>Promise.all([s.e(0),s.e(2),s.e(1),s.e(3),s.e(24)]).then(s.bind(null,590)),loading:()=>null}),m=r()({loader:()=>Promise.all([s.e(0),s.e(2),s.e(1),s.e(3),s.e(22)]).then(s.bind(null,591)),loading:()=>null}),u=Object(i.a)(e=>({})),p=({form:e})=>{const{customer_condition:t,business_type:s}=e,{sess:a}=Object(n.useContext)(c.a),r=(a.permission&&a.permission.permission.some(e=>1===e),a.permission&&a.permission.permission.some(e=>2===e),a.permission&&a.permission.permission.some(e=>3===e),a.permission&&a.permission.permission.some(e=>4===e));a.permission&&a.permission.permission.some(e=>5===e);return o.a.createElement(o.a.Fragment,null,r&&o.a.createElement(o.a.Fragment,null,o.a.createElement(l,{data:t}),o.a.createElement(m,{data:s})))};t.default=()=>{u();const{csrf:e,setCsrf:t,_xhrPost:s,_onLocalhostFn:a}=Object(n.useContext)(c.a),[r,i]=Object(n.useState)(null),l={...Object(n.useContext)(c.a),form:r,handleFetch:m,onInserForm:async function({state:n,setState:o,type:a}){const r=await s({csrf:e,url:"ausersystem",body:{action:"setup",type:a,setaction:"insert",newtext:n}});t(r.csrf),o(""),m()},onDeleteForm:async function({text:n,type:o}){const a=await s({csrf:e,url:"ausersystem",body:{action:"setup",type:o,setaction:"delete",oldtext:n}});t(a.csrf),m()},onEditForm:async function({oldtext:n,newtext:o,type:a,afterEdit:r}){const i=await s({csrf:e,url:"ausersystem",body:{action:"setup",type:a,setaction:"edit",oldtext:n,newtext:o}});t(i.csrf),r(),m()}};async function m(){const n=await s({csrf:e,url:"aloadcustomer",body:{action:"customer_register"}});t(n.csrf),i(n.data)}return Object(n.useEffect)(()=>{m()},[]),o.a.createElement(c.a.Provider,{value:l},o.a.createElement("div",null,r&&o.a.createElement(p,Object.assign({},{form:r}))))}}}]);