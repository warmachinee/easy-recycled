(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UploadAlbum"],{

/***/ "./src/component/Utils/UploadAlbum.tsx":
/*!*********************************************!*\
  !*** ./src/component/Utils/UploadAlbum.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons */ \"./node_modules/@material-ui/icons/esm/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../AppContext */ \"./src/AppContext.tsx\");\n\r\n\r\n\r\n\r\n\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])((theme) => ({}));\r\nconst UploadAlbum = (props) => {\r\n    const { album, setAlbum, albumDisplay, setAlbumDisplay, label, fullWidth = false, editting, } = props;\r\n    const classes = useStyles();\r\n    const { _isSupportMultipleFile } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_4__[\"AppContext\"]);\r\n    function handlePicture(event) {\r\n        const isSupport = false;\r\n        if (isSupport) {\r\n            if (event.target.files && event.target.files.length > 0) {\r\n                const files = event.target.files;\r\n                setAlbum(files);\r\n                if (setAlbumDisplay) {\r\n                    const tempImgArr = [];\r\n                    const imageArr = Array.from(files);\r\n                    imageArr.forEach((image, i) => {\r\n                        tempImgArr.push(URL.createObjectURL(image));\r\n                    });\r\n                    setAlbumDisplay(tempImgArr);\r\n                }\r\n            }\r\n            else {\r\n                setAlbum(null);\r\n                if (setAlbumDisplay) {\r\n                    setAlbumDisplay(null);\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            if (event.target.files && event.target.files.length > 0) {\r\n                const files = event.target.files[0];\r\n                const thisAlbum = album ? [...album] : [];\r\n                thisAlbum.push(files);\r\n                setAlbum(thisAlbum);\r\n                // console.log({ files, album, thisAlbum });\r\n                if (setAlbumDisplay) {\r\n                    var reader = new FileReader();\r\n                    reader.readAsDataURL(files);\r\n                    reader.onloadend = function () {\r\n                        const thisAlbumDisplay = albumDisplay ? [...albumDisplay] : [];\r\n                        thisAlbumDisplay.push(reader.result);\r\n                        setAlbumDisplay(thisAlbumDisplay);\r\n                        // console.log({ albumDisplay, thisAlbumDisplay });\r\n                    };\r\n                }\r\n            }\r\n            else {\r\n                setAlbum(null);\r\n                if (setAlbumDisplay) {\r\n                    setAlbumDisplay(null);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    const isDis = album && album.length > 10;\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { ...(fullWidth && { width: \"100%\" }) } },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { \r\n            // multiple={_isSupportMultipleFile()}\r\n            accept: \"image/*\", style: { display: \"none\" }, id: \"contained-button-file\", type: \"file\", onChange: handlePicture }),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", { htmlFor: \"contained-button-file\" },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], { startIcon: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_2__[\"PhotoCamera\"], { fontSize: \"large\", style: {\r\n                        ...(!isDis && { color: \"white\" }),\r\n                    } }), disabled: isDis, variant: \"contained\", color: isDis ? \"default\" : \"primary\", style: {\r\n                    ...(fullWidth && { width: \"100%\" }),\r\n                    ...(!isDis && { color: \"white\" }),\r\n                }, size: \"large\", component: \"span\" }, label))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (UploadAlbum);\r\n\n\n//# sourceURL=webpack:///./src/component/Utils/UploadAlbum.tsx?");

/***/ })

}]);