(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["CustomerDetail"],{

/***/ "./src/page/Admin/Customer/CustomerDetail.tsx":
/*!****************************************************!*\
  !*** ./src/page/Admin/Customer/CustomerDetail.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../AppContext */ \"./src/AppContext.tsx\");\n\r\n\r\n\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])(theme => ({}));\r\nconst CustomerDetail = props => {\r\n    const classes = useStyles();\r\n    const { match } = props;\r\n    const { csrf, setCsrf, _xhrPost, _onLocalhostFn } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_2__[\"AppContext\"]);\r\n    const [detail, setDetail] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\r\n    async function getBaseDetail() {\r\n        const { params } = match;\r\n        const res = await _xhrPost({\r\n            csrf,\r\n            url: \"aloadcustomer\",\r\n            body: {\r\n                action: \"base_detail\",\r\n                customerid: parseInt(params.customerid)\r\n            }\r\n        });\r\n        console.log(res.data);\r\n        setCsrf(res.csrf);\r\n        setDetail(res.data);\r\n    }\r\n    Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\r\n        getBaseDetail();\r\n    }, []);\r\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null);\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (CustomerDetail);\r\n\n\n//# sourceURL=webpack:///./src/page/Admin/Customer/CustomerDetail.tsx?");

/***/ })

}]);