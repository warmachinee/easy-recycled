(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{156:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),i=a.n(o),s=(a(3),a(7)),l=a(10),c=a(634),d=a(148),m=a(19),u=a(132),f=a(16),g=a.n(f),b="undefined"==typeof window?i.a.useEffect:i.a.useLayoutEffect,p=i.a.forwardRef((function(e,t){var a=e.alignItems,o=void 0===a?"center":a,l=e.autoFocus,f=void 0!==l&&l,p=e.button,h=void 0!==p&&p,v=e.children,O=e.classes,y=e.className,j=e.component,x=e.ContainerComponent,C=void 0===x?"li":x,E=e.ContainerProps,w=(E=void 0===E?{}:E).className,R=Object(r.a)(E,["className"]),k=e.dense,N=void 0!==k&&k,S=e.disabled,I=void 0!==S&&S,z=e.disableGutters,P=void 0!==z&&z,T=e.divider,$=void 0!==T&&T,B=e.focusVisibleClassName,D=e.selected,F=void 0!==D&&D,L=Object(r.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),M=i.a.useContext(u.a),A={dense:N||M.dense||!1,alignItems:o},V=i.a.useRef(null);b((function(){f&&V.current&&V.current.focus()}),[f]);var G=i.a.Children.toArray(v),H=G.length&&Object(d.a)(G[G.length-1],["ListItemSecondaryAction"]),W=i.a.useCallback((function(e){V.current=g.a.findDOMNode(e)}),[]),J=Object(m.a)(W,t),Z=Object(n.a)({className:Object(s.a)(O.root,y,A.dense&&O.dense,!P&&O.gutters,$&&O.divider,I&&O.disabled,h&&O.button,"center"!==o&&O.alignItemsFlexStart,H&&O.secondaryAction,F&&O.selected),disabled:I},L),q=j||"li";return h&&(Z.component=j||"div",Z.focusVisibleClassName=Object(s.a)(O.focusVisible,B),q=c.a),H?(q=Z.component||j?q:"div","li"===C&&("li"===q?q="div":"li"===Z.component&&(Z.component="div")),i.a.createElement(u.a.Provider,{value:A},i.a.createElement(C,Object(n.a)({className:Object(s.a)(O.container,w),ref:J},R),i.a.createElement(q,Z,G),G.pop()))):i.a.createElement(u.a.Provider,{value:A},i.a.createElement(q,Object(n.a)({ref:J},Z),G))}));t.a=Object(l.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(p)},168:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),i=a.n(o),s=(a(3),a(7)),l=a(10),c=a(130),d=Object(c.a)(i.a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=i.a.forwardRef((function(e,t){var a=e.alt,o=e.children,l=e.classes,c=e.className,m=e.component,u=void 0===m?"div":m,f=e.imgProps,g=e.sizes,b=e.src,p=e.srcSet,h=e.variant,v=void 0===h?"circle":h,O=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),y=null,j=function(e){var t=e.src,a=e.srcSet,n=i.a.useState(!1),r=n[0],o=n[1];return i.a.useEffect((function(){if(t||a){o(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&o("loaded")},n.onerror=function(){e&&o("error")},function(){e=!1}}}),[t,a]),r}({src:b,srcSet:p}),x=b||p,C=x&&"error"!==j;return y=C?i.a.createElement("img",Object(n.a)({alt:a,src:b,srcSet:p,sizes:g,className:l.img},f)):null!=o?o:x&&a?a[0]:i.a.createElement(d,{className:l.fallback}),i.a.createElement(u,Object(n.a)({className:Object(s.a)(l.root,l.system,l[v],c,!C&&l.colorDefault),ref:t},O),y)}));t.a=Object(l.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(m)},175:function(e,t,a){"use strict";var n=a(2),r=a(5),o=a(1),i=a(0),s=a.n(i),l=(a(3),a(7)),c=a(10),d=a(156),m=s.a.forwardRef((function(e,t){var a,r=e.classes,i=e.className,c=e.component,m=void 0===c?"li":c,u=e.disableGutters,f=void 0!==u&&u,g=e.role,b=void 0===g?"menuitem":g,p=e.selected,h=e.tabIndex,v=Object(n.a)(e,["classes","className","component","disableGutters","role","selected","tabIndex"]);return e.disabled||(a=void 0!==h?h:-1),s.a.createElement(d.a,Object(o.a)({button:!0,role:b,tabIndex:a,component:m,selected:p,disableGutters:f,classes:{dense:r.dense},className:Object(l.a)(r.root,i,p&&r.selected,!f&&r.gutters),ref:t},v))}));t.a=Object(c.a)((function(e){return{root:Object(o.a)({},e.typography.body1,Object(r.a)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:Object(o.a)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(m)},348:function(e,t,a){"use strict";var n=a(1),r=a(2),o=a(0),i=a.n(o),s=(a(3),a(7)),l=a(10),c=a(25),d=i.a.forwardRef((function(e,t){var a=e.anchorOrigin,o=void 0===a?{vertical:"top",horizontal:"right"}:a,l=e.badgeContent,d=e.children,m=e.classes,u=e.className,f=e.color,g=void 0===f?"default":f,b=e.component,p=void 0===b?"span":b,h=e.invisible,v=e.max,O=void 0===v?99:v,y=e.overlap,j=void 0===y?"rectangle":y,x=e.showZero,C=void 0!==x&&x,E=e.variant,w=void 0===E?"standard":E,R=Object(r.a)(e,["anchorOrigin","badgeContent","children","classes","className","color","component","invisible","max","overlap","showZero","variant"]),k=h;null==h&&(0===l&&!C||null==l&&"dot"!==w)&&(k=!0);var N="";return"dot"!==w&&(N=l>O?"".concat(O,"+"):l),i.a.createElement(p,Object(n.a)({className:Object(s.a)(m.root,u),ref:t},R),d,i.a.createElement("span",{className:Object(s.a)(m.badge,m["".concat(o.horizontal).concat(Object(c.a)(o.vertical),"}")],m["anchorOrigin".concat(Object(c.a)(o.vertical)).concat(Object(c.a)(o.horizontal)).concat(Object(c.a)(j))],"default"!==g&&m["color".concat(Object(c.a)(g))],k&&m.invisible,"dot"===w&&m.dot)},N))}));t.a=Object(l.a)((function(e){return{root:{position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0},badge:{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,zIndex:1,transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.enteringScreen})},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},colorError:{backgroundColor:e.palette.error.main,color:e.palette.error.contrastText},dot:{borderRadius:4,height:8,minWidth:8,padding:0},anchorOriginTopRightRectangle:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightRectangle:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftRectangle:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftRectangle:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},anchorOriginTopRightCircle:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightCircle:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftCircle:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftCircle:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},invisible:{transition:e.transitions.create("transform",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.leavingScreen})}}}),{name:"MuiBadge"})(d)},349:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(123);t.a=Object(o.a)(r.a.createElement("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"}),"Notifications")},568:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(104),i=a(243),s=a(191),l=a(138),c=a(168),d=a(165),m=a(348),u=a(606),f=a(175),g=a(349),b=a(31),p=a(26),h=a.n(p);h()({loader:()=>Promise.all([a.e(2),a.e(16)]).then(a.bind(null,124)),loading:()=>null}),h()({loader:()=>Promise.all([a.e(0),a.e(6),a.e(25)]).then(a.bind(null,135)),loading:()=>null});const v=Object(o.a)(e=>({title:{flexGrow:1}}));t.default=({userInfo:e,handleLogout:t,booleanDispatch:a})=>{const o=v(),{useConfirmDeleteItem:p,profileData:h,notifications:O,readNotifications:y}=Object(n.useContext)(b.a),[{confirmState:j},x]=p(),[C,E]=r.a.useState(null),w=Boolean(C),R=()=>{E(null)};return r.a.createElement(i.a,{position:"static",color:"inherit",elevation:0},r.a.createElement(s.a,{style:{paddingRight:0}},r.a.createElement(l.a,{style:{padding:0,marginRight:16},onClick:()=>{R(),a({type:"true",key:"userProfile"})}},e&&e.info&&r.a.createElement(c.a,{src:e.info.picture})),r.a.createElement(d.a,{variant:"h6",className:o.title,color:"primary"},"EasyRecycled"),O&&!("status"in O)&&r.a.createElement(l.a,{style:{marginRight:16},onClick:()=>{y(),a({type:"true",key:"noti"})}},r.a.createElement(m.a,{badgeContent:O.filter(e=>0===e.read).length,color:"secondary"},r.a.createElement(g.a,null))),r.a.createElement(u.a,{anchorEl:C,open:w,onClose:R},r.a.createElement(f.a,{onClick:()=>{R(),a({type:"true",key:"userProfile"})}},"โปรไฟล์"))))}}}]);