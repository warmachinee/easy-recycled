(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Header"],{

/***/ "./src/page/Business/Header.tsx":
/*!**************************************!*\
  !*** ./src/page/Business/Header.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons */ \"./node_modules/@material-ui/icons/esm/index.js\");\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../AppContext */ \"./src/AppContext.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst ConfirmDialog = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\r\n    loader: () => Promise.all(/*! import() | ConfirmDialog */[__webpack_require__.e(\"vendors~AddFab~AdminHeader~AdminList~BusinessList~BusinessProfile~BusinessType~Condition~ConfirmDial~e27619d6\"), __webpack_require__.e(\"ConfirmDialog\")]).then(__webpack_require__.bind(null, /*! ../../component/Dialog/ConfirmDialog */ \"./src/component/Dialog/ConfirmDialog.tsx\")),\r\n    loading: () => null,\r\n});\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__[\"makeStyles\"])((theme) => ({ title: { flexGrow: 1 } }));\r\nconst Header = ({ profileData, handleLogout }) => {\r\n    const classes = useStyles();\r\n    const { useConfirmDeleteItem, notifications, readNotifications, booleanDispatch, } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_5__[\"AppContext\"]);\r\n    const [{ confirmState }, onLogout] = useConfirmDeleteItem();\r\n    const [anchorEl, setAnchorEl] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null);\r\n    const open = Boolean(anchorEl);\r\n    const handleClick = (event) => {\r\n        setAnchorEl(event.currentTarget);\r\n    };\r\n    const handleClose = () => {\r\n        setAnchorEl(null);\r\n    };\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"AppBar\"], { position: \"static\", color: \"inherit\" },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Toolbar\"], { style: { paddingRight: 0 } },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Link\"], { to: \"/business/profile\", style: { textDecoration: \"none\", color: \"inherit\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"IconButton\"], { style: { padding: 0, marginRight: 16 } }, profileData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Avatar\"], { src: profileData.pictureUrl }))),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { variant: \"h6\", className: classes.title, color: \"primary\" }, \"EasyRecycled\"),\r\n            notifications && !(\"status\" in notifications) && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"IconButton\"], { onClick: () => {\r\n                    if (notifications.filter((item) => item.read === 0).length > 0) {\r\n                        readNotifications();\r\n                    }\r\n                    booleanDispatch({ type: \"true\", key: \"noti\" });\r\n                }, style: { marginRight: 16 } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Badge\"], { badgeContent: notifications.filter((item) => item.read === 0).length, color: \"secondary\" },\r\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"Notifications\"], null)))),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Menu\"], { anchorEl: anchorEl, open: open, onClose: handleClose },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Link\"], { to: \"/business/profile\", style: { textDecoration: \"none\", color: \"inherit\" } },\r\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"MenuItem\"], { onClick: handleClose }, \"\\u0E42\\u0E1B\\u0E23\\u0E44\\u0E1F\\u0E25\\u0E4C\"))))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\r\n\n\n//# sourceURL=webpack:///./src/page/Business/Header.tsx?");

/***/ })

}]);