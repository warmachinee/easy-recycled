(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{575:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(104),r=a(255),i=a(202),c=a(139),s=a(161),m=a(176),u=a(372),d=a(612),p=a(188),y=a(373),E=a(374),g=a(576),h=a(37),f=a(28),b=a(26),C=a.n(b);C()({loader:()=>Promise.all([a.e(1),a.e(16)]).then(a.bind(null,124)),loading:()=>null});const k=C()({loader:()=>Promise.all([a.e(0),a.e(25)]).then(a.bind(null,131)),loading:()=>null}),w=Object(o.a)(e=>({title:{flexGrow:1}}));t.default=({userInfo:e,handleLogout:t,booleanDispatch:a})=>{const o=w(),{useConfirmDeleteItem:b,profileData:C,notifications:P,readNotifications:R}=Object(n.useContext)(f.a),[{confirmState:v},x]=b(),[D,I]=l.a.useState(null),S=Boolean(D),j=()=>{I(null)};return l.a.createElement(r.a,{position:"static",color:"inherit",elevation:0},l.a.createElement(i.a,{style:{paddingRight:0}},l.a.createElement(c.a,{style:{padding:0,marginRight:16},onClick:()=>{j(),a({type:"true",key:"userProfile"})}},C&&l.a.createElement(s.a,{src:C.pictureUrl})),l.a.createElement(m.a,{variant:"h6",className:o.title,color:"primary"},"EasyRecycled"),P&&!("status"in P)&&l.a.createElement(c.a,{style:{marginRight:16},onClick:()=>{P.filter(e=>0===e.read).length>0&&R(),a({type:"true",key:"noti"})}},l.a.createElement(u.a,{badgeContent:P.filter(e=>0===e.read).length,color:"secondary"},l.a.createElement(y.a,null))),l.a.createElement(c.a,{edge:"start",color:"primary"},l.a.createElement(E.a,{style:{color:h.a[700]}})),l.a.createElement(k,{type:"delete",open:v,onClose:()=>x({action:"cancel"}),onCancel:()=>x({action:"cancel"}),onSubmit:()=>{j(),t()},title:"คุณแน่ใจหรือไม่ว่าต้องการจะลงชื่อออกหรือไม่ ?",submitText:"ลงชื่อออก",headIcon:g.a}),l.a.createElement(d.a,{anchorEl:D,open:S,onClose:j},l.a.createElement(p.a,{onClick:()=>{j(),a({type:"true",key:"userProfile"})}},"โปรไฟล์"),l.a.createElement(p.a,{onClick:()=>x({action:"delete"})},"ลงชื่อออก"))))}}}]);