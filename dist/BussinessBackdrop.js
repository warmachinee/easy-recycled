(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["BussinessBackdrop"],{

/***/ "./src/page/Business/BussinessBackdrop.tsx":
/*!*************************************************!*\
  !*** ./src/page/Business/BussinessBackdrop.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n\r\n\r\n\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])((theme) => ({\r\n    backdrop: {\r\n        zIndex: theme.zIndex.drawer + 1,\r\n        color: \"#fff\"\r\n    }\r\n}));\r\nconst BussinessBackdrop = ({ backDrop, setBackDrop }) => {\r\n    const classes = useStyles();\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Backdrop\"], { className: classes.backdrop, open: backDrop === null },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"CircularProgress\"], { color: \"primary\" })));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (BussinessBackdrop);\r\n\n\n//# sourceURL=webpack:///./src/page/Business/BussinessBackdrop.tsx?");

/***/ })

}]);