(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AppButton"],{

/***/ "./src/AppComponent/AppButton.tsx":
/*!****************************************!*\
  !*** ./src/AppComponent/AppButton.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n\r\n\r\n\r\nconst AppButton = ({ children, variant, buttonColor: color, light = false, ...props }) => {\r\n    const theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"useTheme\"])();\r\n    function styleFromVariant(variant) {\r\n        switch (variant) {\r\n            case \"text\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"contained\":\r\n                return {\r\n                    color: color\r\n                        ? theme.palette.getContrastText(color[light ? 700 : 600])\r\n                        : theme.palette.text.primary,\r\n                    backgroundColor: color\r\n                        ? color[light ? 600 : 500]\r\n                        : theme.palette.background.default,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 800 : 700]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"outlined\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    border: `1px solid ${color ? color[600] : theme.palette.text.primary}`,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            default:\r\n                return {\r\n                    color: theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: theme.palette.action.hover\r\n                    }\r\n                };\r\n        }\r\n    }\r\n    const StyledButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"withStyles\"])((theme) => ({\r\n        root: { ...styleFromVariant(variant) }\r\n    }))(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Button\"]);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton, Object.assign({}, props, { variant: variant }), children));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppButton);\r\n\n\n//# sourceURL=webpack:///./src/AppComponent/AppButton.tsx?");

/***/ })

}]);