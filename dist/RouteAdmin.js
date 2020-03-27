(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RouteAdmin"],{

/***/ "./src/img/adminbg.jpeg":
/*!******************************!*\
  !*** ./src/img/adminbg.jpeg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/img/adminbg.jpeg\");\n\n//# sourceURL=webpack:///./src/img/adminbg.jpeg?");

/***/ }),

/***/ "./src/page/Admin/Admin.tsx":
/*!**********************************!*\
  !*** ./src/page/Admin/Admin.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../AppContext */ \"./src/AppContext.tsx\");\n/* harmony import */ var _img_adminbg_jpeg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../img/adminbg.jpeg */ \"./src/img/adminbg.jpeg\");\n\r\n\r\n\r\n\r\n\r\nconst AdminLogin = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\r\n    loader: () => __webpack_require__.e(/*! import() | AdminLogin */ \"AdminLogin\").then(__webpack_require__.bind(null, /*! ./AdminLogin */ \"./src/page/Admin/AdminLogin.tsx\")),\r\n    loading: () => null\r\n});\r\nconst Dashboard = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\r\n    loader: () => Promise.all(/*! import() | Dashboard */[__webpack_require__.e(\"vendors~Dashboard\"), __webpack_require__.e(\"Dashboard\")]).then(__webpack_require__.bind(null, /*! ./Dashboard */ \"./src/page/Admin/Dashboard.tsx\")),\r\n    loading: () => null\r\n});\r\nconst AdminBackdrop = react_loadable__WEBPACK_IMPORTED_MODULE_1___default()({\r\n    loader: () => __webpack_require__.e(/*! import() | AdminBackdrop */ \"AdminBackdrop\").then(__webpack_require__.bind(null, /*! ./AdminBackdrop */ \"./src/page/Admin/AdminBackdrop.tsx\")),\r\n    loading: () => null\r\n});\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__[\"makeStyles\"])(theme => ({}));\r\nconst Admin = () => {\r\n    const classes = useStyles();\r\n    const { csrf, setCsrf, enQSnackbar, closeSnackbar, _xhrPost, _xhrGet, _onLocalhost } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_3__[\"AppContext\"]);\r\n    const [sess, setSess] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\r\n    const passingProps = {\r\n        ...Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_3__[\"AppContext\"]),\r\n        sess,\r\n        getSess,\r\n        ic_bg: _img_adminbg_jpeg__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\r\n        handleLogout\r\n    };\r\n    async function handleLogout() {\r\n        const res = await _xhrGet(\"logout\");\r\n        setCsrf(res.csrf);\r\n        console.log(res.data);\r\n        getSess();\r\n    }\r\n    async function getSess() {\r\n        const res = await _xhrGet(\"asession\");\r\n        setCsrf(res.csrf);\r\n        console.log(res.data);\r\n        if (res.data.status === \"not member\") {\r\n            handleLogout();\r\n        }\r\n        else {\r\n            setSess(res.data);\r\n        }\r\n    }\r\n    Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\r\n        getSess();\r\n    }, []);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContext__WEBPACK_IMPORTED_MODULE_3__[\"AppContext\"].Provider, { value: passingProps },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, _onLocalhost(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dashboard, null), sess ? (sess.status === \"need login before\" ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AdminLogin, null)) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dashboard, null))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AdminBackdrop, null))))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Admin);\r\n\n\n//# sourceURL=webpack:///./src/page/Admin/Admin.tsx?");

/***/ })

}]);