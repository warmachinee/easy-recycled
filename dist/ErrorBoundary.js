(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ErrorBoundary"],{

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _typeof = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./src/AppComponent/AppButton.tsx":
/*!****************************************!*\
  !*** ./src/AppComponent/AppButton.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n\r\n\r\n\r\nconst AppButton = ({ children, variant, buttonColor: color, light = false, ...props }) => {\r\n    const theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"useTheme\"])();\r\n    function styleFromVariant(variant) {\r\n        switch (variant) {\r\n            case \"text\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"contained\":\r\n                return {\r\n                    color: color\r\n                        ? theme.palette.getContrastText(color[light ? 700 : 600])\r\n                        : theme.palette.text.primary,\r\n                    backgroundColor: color\r\n                        ? color[light ? 600 : 500]\r\n                        : theme.palette.background.default,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 800 : 700]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"outlined\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    border: `1px solid ${color ? color[600] : theme.palette.text.primary}`,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            default:\r\n                return {\r\n                    color: theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: theme.palette.action.hover\r\n                    }\r\n                };\r\n        }\r\n    }\r\n    const StyledButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"withStyles\"])((theme) => ({\r\n        root: { ...styleFromVariant(variant) }\r\n    }))(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Button\"]);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton, Object.assign({}, props, { variant: variant }), children));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppButton);\r\n\n\n//# sourceURL=webpack:///./src/AppComponent/AppButton.tsx?");

/***/ }),

/***/ "./src/component/Utils/ErrorBoundary.js":
/*!**********************************************!*\
  !*** ./src/component/Utils/ErrorBoundary.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/esm/Paper */ \"./node_modules/@material-ui/core/esm/Paper/index.js\");\n/* harmony import */ var _material_ui_core_esm_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/esm/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/esm/Button */ \"./node_modules/@material-ui/core/esm/Button/index.js\");\n/* harmony import */ var _AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../AppComponent/AppButton */ \"./src/AppComponent/AppButton.tsx\");\n/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/colors */ \"./node_modules/@material-ui/core/esm/colors/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nvar ErrorBoundary =\n/*#__PURE__*/\nfunction (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ErrorBoundary, _Component);\n\n  function ErrorBoundary(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ErrorBoundary);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ErrorBoundary).call(this, props));\n    _this.state = {\n      hasError: false,\n      errMsg: null\n    };\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ErrorBoundary, [{\n    key: \"componentDidCatch\",\n    value: function componentDidCatch(error, info) {\n      this.setState({\n        errMsg: {\n          error: error,\n          stack: info.componentStack\n        }\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      if (this.state.hasError) {\n        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n          style: {\n            padding: 16,\n            maxWidth: 360,\n            width: \"100%\",\n            margin: \"36px auto\"\n          },\n          elevation: 4\n        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_esm_Typography__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n          variant: \"h4\",\n          align: \"center\",\n          style: {\n            marginTop: 36\n          }\n        }, \"\\u0E21\\u0E35\\u0E1A\\u0E32\\u0E07\\u0E2D\\u0E22\\u0E48\\u0E32\\u0E07\\u0E1C\\u0E34\\u0E14\\u0E1E\\u0E25\\u0E32\\u0E14\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n          style: {\n            margin: \"24px 0\",\n            display: \"flex\",\n            justifyContent: \"center\"\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n          buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_10__[\"green\"],\n          variant: \"outlined\",\n          onClick: function onClick() {\n            return window.location.reload();\n          }\n        }, \"\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E43\\u0E2B\\u0E21\\u0E48\")));\n      }\n\n      return this.props.children;\n    }\n  }], [{\n    key: \"getDerivedStateFromError\",\n    value: function getDerivedStateFromError(error) {\n      return {\n        hasError: true\n      };\n    }\n  }]);\n\n  return ErrorBoundary;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ErrorBoundary);\n\n//# sourceURL=webpack:///./src/component/Utils/ErrorBoundary.js?");

/***/ })

}]);