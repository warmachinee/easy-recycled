(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{124:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),s=a(10),r=a(20),c=a(137);t.default=({children:e,variant:t,buttonColor:a,light:l=!1,...o})=>{const i=Object(r.a)();function u(e){switch(e){case"text":return{color:a?a[600]:i.palette.text.primary,"&:hover":{backgroundColor:a?a[l?100:50]:i.palette.action.hover}};case"contained":return{color:a?i.palette.getContrastText(a[l?700:600]):i.palette.text.primary,backgroundColor:a?a[l?600:500]:i.palette.background.default,"&:hover":{backgroundColor:a?a[l?800:700]:i.palette.action.hover}};case"outlined":return{color:a?a[600]:i.palette.text.primary,border:`1px solid ${a?a[600]:i.palette.text.primary}`,"&:hover":{backgroundColor:a?a[l?100:50]:i.palette.action.hover}};default:return{color:i.palette.text.primary,"&:hover":{backgroundColor:i.palette.action.hover}}}}const m=Object(s.a)(e=>({root:{...u(t)}}))(c.a);return n.a.createElement(m,Object.assign({},o,{variant:t}),e)}},569:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),s=a(104),r=a(26),c=a.n(r),o=a(622),i=a(633),u=a(175),m=a(137),d=a(138),p=a(151),g=a(143),b=a(168),h=a(165),y=a(276),E=a(159),f=a.n(E),v=a(124),x=a(39),C=a(31);const _=c()({loader:()=>a.e(36).then(a.bind(null,196)),loading:()=>null}),k=c()({loader:()=>Promise.all([a.e(0),a.e(37)]).then(a.bind(null,133)),loading:()=>null}),j=c()({loader:()=>a.e(65).then(a.bind(null,583)),loading:()=>null}),O=Object(s.a)(e=>({avatar:{height:128,width:128,margin:"auto"},label:{fontWeight:700,width:"30%"},text:{width:"70%"},textField:{marginBottom:12}}));function w(e){const{inputRef:t,...a}=e;return n.a.createElement(f.a,Object.assign({},a,{ref:e=>{t(e?e.inputElement:null)},mask:["(",/[0-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/],placeholderChar:" "}))}const N=["id_card","house_regist","access","cert_book","doc_20","doc_105","doc_106"],D=["บัตรประชาชน","สำเนาทะเบียนบ้าน","ใบอนุญาติค้าของเก่า","หนังสือรับรองบริษัท","ภพ. 20","ใบรง. 4 ลำดับที่ 105","ใบรง. 4 ลำดับที่ 106"],F={id_card:"บัตรประชาชน",house_regist:"สำเนาทะเบียนบ้าน",access:"ใบอนุญาติค้าของเก่า",cert_book:"หนังสือรับรองบริษัท",doc_20:"ภพ. 20",doc_105:"ใบรง. 4 ลำดับที่ 105",doc_106:"ใบรง. 4 ลำดับที่ 106"},T=e=>{O();const{csrf:t,setCsrf:a,profileData:s,_xhrPost:r,_fetchFile:c,addSnackbar:m}=Object(l.useContext)(C.a),{docsType:d,setDocsType:p,handleChange:g,docsDisplay:b,setDocsDisplay:h,docs:y,setDocs:E,setIsUpload:f,getInfo:_}=e;return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement(o.a,null,n.a.createElement(i.a,{value:d,onChange:g,variant:"outlined"},N.map((e,t)=>n.a.createElement(u.a,{value:e},D[t])))),n.a.createElement("div",{style:{display:"flex",marginTop:16}},n.a.createElement(j,Object.assign({fullWidth:!0,label:"อัพโหลด"},e)),y&&n.a.createElement(v.default,{buttonColor:x.a,onClick:()=>{E(null),h(null)}},"รีเซ็ต")),b&&n.a.createElement("img",{src:b,alt:"docsimg",style:{width:"100%",marginTop:16}}),n.a.createElement(v.default,{buttonColor:x.a,variant:"contained",style:{margin:"16px 0",width:"100%"},disabled:!y,onClick:async function(){const e=await c({url:"usersystem",csrf:t,headers:{action:"docs",type:"customer",docstype:d},body:{[`${d}image`]:y}});"success"===e.data.status?(m({message:"อัพโหลดเอกสารสำเร็จ",variant:"success"}),E(null),h(null),f(!1),p("id_card"),a(e.csrf),_()):m({message:"อัพโหลดเอกสารไม่สำเร็จ",variant:"error"})}},"บันทึก")))},$=({data:e})=>{const t=e.split(".")[0],{sess:a}=Object(l.useContext)(C.a),[s,r]=Object(l.useState)(!1);return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:{marginBottom:8},onClick:()=>r(!0)},n.a.createElement(m.a,{variant:"text",color:"primary"},F[t])),n.a.createElement(_,{open:s,onClose:()=>r(!1),title:F[t],fullScreen:!0},n.a.createElement("img",{style:{width:"100%",maxHeight:"calc(100% - 64px)"},src:`https://easyrecycle.ml/customer/${a.userid}/${e}`,alt:F[t]})))},S=({data:e,booleanDispatch:t,getInfo:a,userDocs:s})=>{const r=O(),{csrf:c,setCsrf:o,profileData:i,_xhrPost:u,checkSession:m,phoneFormatToNumber:E,stringToPhone:f,realtimeAccess:_}=Object(l.useContext)(C.a),[j,N]=Object(l.useState)(!1),[D,F]=Object(l.useState)({...e,tel:f(`0${e.tel}`)}),[S,I]=Object(l.useState)(null),[W,P]=Object(l.useState)(null),[U,z]=Object(l.useState)(!1),[B,J]=Object(l.useState)("id_card");function A(){z(!1),I(null),P(null)}return n.a.createElement("div",{style:{position:"relative"}},n.a.createElement(d.a,{style:{position:"absolute",top:-12,right:0},onClick:()=>N(e=>!e)},n.a.createElement(y.a,null)),j?n.a.createElement(n.a.Fragment,null,n.a.createElement(p.a,{style:{marginTop:24},className:r.textField,fullWidth:!0,label:"ชื่อที่แสดง",value:D.displayname,onChange:e=>F({...D,displayname:e.target.value})}),n.a.createElement(p.a,{className:r.textField,fullWidth:!0,label:"ชื่อ",value:D.fullname,onChange:e=>F({...D,fullname:e.target.value})}),n.a.createElement(p.a,{className:r.textField,fullWidth:!0,label:"นามสกุล",value:D.lastname,onChange:e=>F({...D,lastname:e.target.value})}),n.a.createElement(g.a,{style:{margin:"12px 0"}}),n.a.createElement(p.a,{className:r.textField,fullWidth:!0,label:"เบอร์โทรศัพท์",InputProps:{inputComponent:w},value:D.tel,onChange:e=>F({...D,tel:e.target.value})}),n.a.createElement(p.a,{className:r.textField,fullWidth:!0,label:"ชื่อกิจการ",value:D.business_name,onChange:e=>F({...D,business_name:e.target.value})}),n.a.createElement(g.a,{style:{margin:"12px 0"}}),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(v.default,{buttonColor:x.a,variant:"outlined",style:{flex:1,margin:8},onClick:()=>{F({...e,tel:`0${e.tel}`}),N(!1)}},"ยกเลิก"),n.a.createElement(v.default,{buttonColor:x.a,variant:"contained",style:{flex:1,margin:8},onClick:async function(){const t={action:"editprofile",linetoken:i.userId,type:"customer",picture:i.pictureUrl},l=["displayname","fullname","lastname","business_name"];for(var n=0;n<l.length;n++)D[l[n]]!==e[l[n]]&&Object.assign(t,{[l[n]]:D[l[n]]});D.tel!==`0${e.tel}`&&Object.assign(t,{tel:E(D.tel)});const s=await u({csrf:c,url:"usersystem",body:t});o(s.csrf),"status"in s.data&&"this is not user account or have been delete account"===s.data.status?m():(a(),N(!1)),_()},disabled:function(){const t=["displayname","fullname","lastname","business_name"],a=[];for(var l=0;l<t.length;l++)D[t[l]]!==e[t[l]]&&a.push(D[t[l]]);return D.tel!==`0${e.tel}`&&a.push(D[t[l]]),0===a.length}()},"บันทึก"))):n.a.createElement(n.a.Fragment,null,n.a.createElement(b.a,{src:e.picture,className:r.avatar}),n.a.createElement(h.a,{align:"center",variant:"h6"},e.displayname),n.a.createElement(h.a,{align:"center"},`${e.fullname} ${e.lastname}`),n.a.createElement(h.a,{align:"center"},e.statusmassage),n.a.createElement(g.a,{style:{margin:"12px 0"}}),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(h.a,{className:r.label},"เบอร์โทรศัพท์"),n.a.createElement(h.a,{className:r.text},f(`0${e.tel}`))),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(h.a,{className:r.label},"ชื่อกิจการ"),n.a.createElement(h.a,{className:r.text},e.business_name)),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(h.a,{className:r.label},"ประเภทกิจการ"),n.a.createElement(h.a,{className:r.text},e.business_type)),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(h.a,{className:r.label},"ขนาดองค์กร"),n.a.createElement(h.a,{className:r.text},e.org_size)),n.a.createElement("div",{style:{display:"flex"}},n.a.createElement(h.a,{className:r.label},"สถานที่"),n.a.createElement(h.a,{className:r.text},e.location)),n.a.createElement(g.a,{style:{margin:"12px 0"}}),n.a.createElement("div",{style:{margin:"8px 0"}},n.a.createElement(v.default,{buttonColor:x.a,variant:"outlined",size:"large",onClick:()=>z(!0),style:{width:"100%"}},"อัพโหลดรูปเอกสาร")),s&&n.a.createElement("div",{style:{marginTop:16}},s.filter(e=>"webp"!==e.split(".")[1]&&"topup"!==e&&"log.txt"!==e).map((e,t)=>n.a.createElement($,{key:e,data:e})))),n.a.createElement(k,{open:U,onClose:A,title:"อัพโหลดรูปเอกสาร"},n.a.createElement(T,Object.assign({},{docs:S,setDocs:I,docsDisplay:W,setDocsDisplay:P,onCloseUpload:A,docsType:B,setDocsType:J,handleChange:e=>{J(e.target.value)},getInfo:a,setIsUpload:z}))))};t.default=e=>{O();const{userInfo:t}=e,{info:a,docs:l}=t;return n.a.createElement("div",null,a&&n.a.createElement(S,Object.assign({data:a,userDocs:l},e)))}}}]);