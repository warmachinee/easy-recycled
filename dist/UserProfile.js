(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserProfile"],{

/***/ "./src/AppComponent/AppButton.tsx":
/*!****************************************!*\
  !*** ./src/AppComponent/AppButton.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n\r\n\r\n\r\nconst AppButton = ({ children, variant, buttonColor: color, light = false, ...props }) => {\r\n    const theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"useTheme\"])();\r\n    function styleFromVariant(variant) {\r\n        switch (variant) {\r\n            case \"text\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"contained\":\r\n                return {\r\n                    color: color\r\n                        ? theme.palette.getContrastText(color[light ? 700 : 600])\r\n                        : theme.palette.text.primary,\r\n                    backgroundColor: color\r\n                        ? color[light ? 600 : 500]\r\n                        : theme.palette.background.default,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 800 : 700]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            case \"outlined\":\r\n                return {\r\n                    color: color ? color[600] : theme.palette.text.primary,\r\n                    border: `1px solid ${color ? color[600] : theme.palette.text.primary}`,\r\n                    \"&:hover\": {\r\n                        backgroundColor: color\r\n                            ? color[light ? 100 : 50]\r\n                            : theme.palette.action.hover\r\n                    }\r\n                };\r\n            default:\r\n                return {\r\n                    color: theme.palette.text.primary,\r\n                    \"&:hover\": {\r\n                        backgroundColor: theme.palette.action.hover\r\n                    }\r\n                };\r\n        }\r\n    }\r\n    const StyledButton = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"withStyles\"])((theme) => ({\r\n        root: { ...styleFromVariant(variant) }\r\n    }))(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Button\"]);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledButton, Object.assign({}, props, { variant: variant }), children));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppButton);\r\n\n\n//# sourceURL=webpack:///./src/AppComponent/AppButton.tsx?");

/***/ }),

/***/ "./src/page/Customer/UserProfile.tsx":
/*!*******************************************!*\
  !*** ./src/page/Customer/UserProfile.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/styles */ \"./node_modules/@material-ui/styles/esm/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ \"./node_modules/react-loadable/lib/index.js\");\n/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/esm/index.js\");\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons */ \"./node_modules/@material-ui/icons/esm/index.js\");\n/* harmony import */ var react_text_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-text-mask */ \"./node_modules/react-text-mask/dist/reactTextMask.js\");\n/* harmony import */ var react_text_mask__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_text_mask__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../AppComponent/AppButton */ \"./src/AppComponent/AppButton.tsx\");\n/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/colors */ \"./node_modules/@material-ui/core/esm/colors/index.js\");\n/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../AppContext */ \"./src/AppContext.tsx\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst FullscreenImage = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\r\n    loader: () => __webpack_require__.e(/*! import() | FullscreenImage */ \"FullscreenImage\").then(__webpack_require__.bind(null, /*! ../../component/Dialog/FullscreenImage */ \"./src/component/Dialog/FullscreenImage.tsx\")),\r\n    loading: () => null,\r\n});\r\nconst GeneralDialog = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\r\n    loader: () => Promise.all(/*! import() | GeneralDialog */[__webpack_require__.e(\"vendors~AddFab~AdminHeader~AdminList~BusinessList~BusinessProfile~BusinessType~Condition~ConfirmDial~e27619d6\"), __webpack_require__.e(\"GeneralDialog\")]).then(__webpack_require__.bind(null, /*! ../../component/Dialog/GeneralDialog */ \"./src/component/Dialog/GeneralDialog.tsx\")),\r\n    loading: () => null,\r\n});\r\nconst UploadDocs = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({\r\n    loader: () => __webpack_require__.e(/*! import() | UploadDocs */ \"UploadDocs\").then(__webpack_require__.bind(null, /*! ../../component/Utils/UploadDocs */ \"./src/component/Utils/UploadDocs.tsx\")),\r\n    loading: () => null,\r\n});\r\nconst useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])((theme) => ({\r\n    avatar: { height: 128, width: 128, margin: \"auto\" },\r\n    label: { fontWeight: 700, width: \"30%\" },\r\n    text: { width: \"70%\" },\r\n    textField: { marginBottom: 12 },\r\n}));\r\nfunction TextMaskCustom(props) {\r\n    const { inputRef, ...other } = props;\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_text_mask__WEBPACK_IMPORTED_MODULE_5___default.a, Object.assign({}, other, { ref: (ref) => {\r\n            inputRef(ref ? ref.inputElement : null);\r\n        }, mask: [\r\n            \"(\",\r\n            /[0-9]/,\r\n            /\\d/,\r\n            /\\d/,\r\n            \")\",\r\n            \" \",\r\n            /\\d/,\r\n            /\\d/,\r\n            /\\d/,\r\n            \"-\",\r\n            /\\d/,\r\n            /\\d/,\r\n            /\\d/,\r\n            /\\d/,\r\n        ], placeholderChar: \"\\u2000\" })));\r\n}\r\nconst docsArr = [\r\n    \"id_card\",\r\n    \"house_regist\",\r\n    \"access\",\r\n    \"cert_book\",\r\n    \"doc_20\",\r\n    \"doc_105\",\r\n    \"doc_106\",\r\n];\r\nconst docsArrString = [\r\n    \"บัตรประชาชน\",\r\n    \"สำเนาทะเบียนบ้าน\",\r\n    \"ใบอนุญาติค้าของเก่า\",\r\n    \"หนังสือรับรองบริษัท\",\r\n    \"ภพ. 20\",\r\n    \"ใบรง. 4 ลำดับที่ 105\",\r\n    \"ใบรง. 4 ลำดับที่ 106\",\r\n];\r\nconst docsLabel = {\r\n    id_card: \"บัตรประชาชน\",\r\n    house_regist: \"สำเนาทะเบียนบ้าน\",\r\n    access: \"ใบอนุญาติค้าของเก่า\",\r\n    cert_book: \"หนังสือรับรองบริษัท\",\r\n    doc_20: \"ภพ. 20\",\r\n    doc_105: \"ใบรง. 4 ลำดับที่ 105\",\r\n    doc_106: \"ใบรง. 4 ลำดับที่ 106\",\r\n};\r\nconst DocsForm = (props) => {\r\n    const classes = useStyles();\r\n    const { csrf, setCsrf, profileData, _xhrPost, _fetchFile, addSnackbar, } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_8__[\"AppContext\"]);\r\n    const { docsType, setDocsType, handleChange, docsDisplay, setDocsDisplay, docs, setDocs, setIsUpload, getInfo, } = props;\r\n    async function uploadDocs() {\r\n        const imgRes = await _fetchFile({\r\n            url: \"usersystem\",\r\n            csrf,\r\n            headers: {\r\n                action: \"docs\",\r\n                type: \"customer\",\r\n                docstype: docsType,\r\n            },\r\n            body: { [`${docsType}image`]: docs },\r\n        });\r\n        if (imgRes.data.status === \"success\") {\r\n            addSnackbar({ message: \"อัพโหลดเอกสารสำเร็จ\", variant: \"success\" });\r\n            setDocs(null);\r\n            setDocsDisplay(null);\r\n            setIsUpload(false);\r\n            setDocsType(\"id_card\");\r\n            setCsrf(imgRes.csrf);\r\n            getInfo();\r\n        }\r\n        else {\r\n            addSnackbar({ message: \"อัพโหลดเอกสารไม่สำเร็จ\", variant: \"error\" });\r\n        }\r\n    }\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"FormControl\"], null,\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Select\"], { value: docsType, onChange: handleChange, variant: \"outlined\" }, docsArr.map((d, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"MenuItem\"], { key: i, value: d }, docsArrString[i]))))),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\", marginTop: 16 } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UploadDocs, Object.assign({ fullWidth: true, label: \"\\u0E2D\\u0E31\\u0E1E\\u0E42\\u0E2B\\u0E25\\u0E14\" }, props)),\r\n                docs && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__[\"green\"], onClick: () => {\r\n                        setDocs(null);\r\n                        setDocsDisplay(null);\r\n                    } }, \"\\u0E23\\u0E35\\u0E40\\u0E0B\\u0E47\\u0E15\"))),\r\n            docsDisplay && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", { src: docsDisplay, alt: \"docsimg\", style: { width: \"100%\", marginTop: 16 } })),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__[\"green\"], variant: \"contained\", style: { margin: \"16px 0\", width: \"100%\" }, disabled: !docs, onClick: uploadDocs }, \"\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\"))));\r\n};\r\nconst UserDocs = ({ data }) => {\r\n    const keys = data.split(\".\")[0];\r\n    const { sess } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_8__[\"AppContext\"]);\r\n    const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { marginBottom: 8 }, onClick: () => setOpen(true) },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], { variant: \"text\", color: \"primary\" }, docsLabel[keys])),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FullscreenImage, { open: open, onClose: () => setOpen(false), title: docsLabel[keys], fullScreen: true },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", { style: { width: \"100%\", maxHeight: \"calc(100% - 64px)\" }, src: `https://easyrecycle.ml/customer/${sess.userid}/${data}`, alt: docsLabel[keys] }))));\r\n};\r\nconst ProfileComponent = ({ data, booleanDispatch, getInfo, userDocs, }) => {\r\n    const classes = useStyles();\r\n    const { csrf, setCsrf, profileData, _xhrPost, checkSession, phoneFormatToNumber, stringToPhone, realtimeAccess, } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_AppContext__WEBPACK_IMPORTED_MODULE_8__[\"AppContext\"]);\r\n    const [isEditing, setIsEditing] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\r\n    const [thisData, setThisData] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\r\n        ...data,\r\n        tel: stringToPhone(`0${data.tel}`),\r\n    });\r\n    const [docs, setDocs] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\r\n    const [docsDisplay, setDocsDisplay] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\r\n    const [isUpload, setIsUpload] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\r\n    const [docsType, setDocsType] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(\"id_card\");\r\n    const handleChange = (event) => {\r\n        setDocsType(event.target.value);\r\n    };\r\n    function checkDisabled() {\r\n        const keyArr = [\"displayname\", \"fullname\", \"lastname\", \"business_name\"];\r\n        const thisArr = [];\r\n        for (var i = 0; i < keyArr.length; i++) {\r\n            if (thisData[keyArr[i]] !== data[keyArr[i]]) {\r\n                thisArr.push(thisData[keyArr[i]]);\r\n            }\r\n        }\r\n        if (thisData.tel !== `0${data.tel}`) {\r\n            thisArr.push(thisData[keyArr[i]]);\r\n        }\r\n        return thisArr.length === 0;\r\n    }\r\n    function onCloseUpload() {\r\n        setIsUpload(false);\r\n        setDocs(null);\r\n        setDocsDisplay(null);\r\n    }\r\n    async function onSave() {\r\n        const sendObj = {\r\n            action: \"editprofile\",\r\n            linetoken: profileData.userId,\r\n            type: \"customer\",\r\n            picture: profileData.pictureUrl,\r\n        };\r\n        const keyArr = [\"displayname\", \"fullname\", \"lastname\", \"business_name\"];\r\n        for (var i = 0; i < keyArr.length; i++) {\r\n            if (thisData[keyArr[i]] !== data[keyArr[i]]) {\r\n                Object.assign(sendObj, { [keyArr[i]]: thisData[keyArr[i]] });\r\n            }\r\n        }\r\n        if (thisData.tel !== `0${data.tel}`) {\r\n            Object.assign(sendObj, { tel: phoneFormatToNumber(thisData.tel) });\r\n        }\r\n        const res = await _xhrPost({\r\n            csrf,\r\n            url: \"usersystem\",\r\n            body: sendObj,\r\n        });\r\n        setCsrf(res.csrf);\r\n        if (\"status\" in res.data &&\r\n            res.data.status === \"this is not user account or have been delete account\") {\r\n            checkSession();\r\n        }\r\n        else {\r\n            getInfo();\r\n            setIsEditing(false);\r\n            //   booleanDispatch({ type: \"false\", key: \"userProfile\" });\r\n        }\r\n        realtimeAccess();\r\n    }\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { position: \"relative\" } },\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"IconButton\"], { style: { position: \"absolute\", top: -12, right: 0 }, onClick: () => setIsEditing((prev) => !prev) },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"Settings\"], null)),\r\n        isEditing ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"TextField\"], { style: { marginTop: 24 }, className: classes.textField, fullWidth: true, label: \"\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E17\\u0E35\\u0E48\\u0E41\\u0E2A\\u0E14\\u0E07\", value: thisData.displayname, onChange: (e) => setThisData({ ...thisData, displayname: e.target.value }) }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"TextField\"], { className: classes.textField, fullWidth: true, label: \"\\u0E0A\\u0E37\\u0E48\\u0E2D\", value: thisData.fullname, onChange: (e) => setThisData({ ...thisData, fullname: e.target.value }) }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"TextField\"], { className: classes.textField, fullWidth: true, label: \"\\u0E19\\u0E32\\u0E21\\u0E2A\\u0E01\\u0E38\\u0E25\", value: thisData.lastname, onChange: (e) => setThisData({ ...thisData, lastname: e.target.value }) }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Divider\"], { style: { margin: \"12px 0\" } }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"TextField\"], { className: classes.textField, fullWidth: true, label: \"\\u0E40\\u0E1A\\u0E2D\\u0E23\\u0E4C\\u0E42\\u0E17\\u0E23\\u0E28\\u0E31\\u0E1E\\u0E17\\u0E4C\", InputProps: {\r\n                    inputComponent: TextMaskCustom,\r\n                }, value: thisData.tel, onChange: (e) => setThisData({ ...thisData, tel: e.target.value }) }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"TextField\"], { className: classes.textField, fullWidth: true, label: \"\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E01\\u0E34\\u0E08\\u0E01\\u0E32\\u0E23\", value: thisData.business_name, onChange: (e) => setThisData({ ...thisData, business_name: e.target.value }) }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Divider\"], { style: { margin: \"12px 0\" } }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__[\"green\"], variant: \"outlined\", style: { flex: 1, margin: 8 }, onClick: () => {\r\n                        setThisData({\r\n                            ...data,\r\n                            tel: `0${data.tel}`,\r\n                        });\r\n                        setIsEditing(false);\r\n                    } }, \"\\u0E22\\u0E01\\u0E40\\u0E25\\u0E34\\u0E01\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__[\"green\"], variant: \"contained\", style: { flex: 1, margin: 8 }, onClick: onSave, disabled: checkDisabled() }, \"\\u0E1A\\u0E31\\u0E19\\u0E17\\u0E36\\u0E01\")))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Avatar\"], { src: data.picture, className: classes.avatar }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { align: \"center\", variant: \"h6\" }, data.displayname),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { align: \"center\" }, `${data.fullname} ${data.lastname}`),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { align: \"center\" }, data.statusmassage),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Divider\"], { style: { margin: \"12px 0\" } }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.label }, \"\\u0E40\\u0E1A\\u0E2D\\u0E23\\u0E4C\\u0E42\\u0E17\\u0E23\\u0E28\\u0E31\\u0E1E\\u0E17\\u0E4C\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.text }, stringToPhone(`0${data.tel}`))),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.label }, \"\\u0E0A\\u0E37\\u0E48\\u0E2D\\u0E01\\u0E34\\u0E08\\u0E01\\u0E32\\u0E23\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.text }, data.business_name)),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.label }, \"\\u0E1B\\u0E23\\u0E30\\u0E40\\u0E20\\u0E17\\u0E01\\u0E34\\u0E08\\u0E01\\u0E32\\u0E23\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.text }, data.business_type)),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.label }, \"\\u0E02\\u0E19\\u0E32\\u0E14\\u0E2D\\u0E07\\u0E04\\u0E4C\\u0E01\\u0E23\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.text }, data.org_size)),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { display: \"flex\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.label }, \"\\u0E2A\\u0E16\\u0E32\\u0E19\\u0E17\\u0E35\\u0E48\"),\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Typography\"], { className: classes.text }, data.location)),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Divider\"], { style: { margin: \"12px 0\" } }),\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { margin: \"8px 0\" } },\r\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppComponent_AppButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { buttonColor: _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_7__[\"green\"], variant: \"outlined\", size: \"large\", onClick: () => setIsUpload(true), style: { width: \"100%\" } }, \"\\u0E2D\\u0E31\\u0E1E\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E23\\u0E39\\u0E1B\\u0E40\\u0E2D\\u0E01\\u0E2A\\u0E32\\u0E23\")),\r\n            userDocs && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { style: { marginTop: 16 } }, userDocs\r\n                .filter((d) => d.split(\".\")[1] !== \"webp\" &&\r\n                d !== \"topup\" &&\r\n                d !== \"log.txt\")\r\n                .map((d, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserDocs, { key: d, data: d }))))))),\r\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GeneralDialog, { open: isUpload, onClose: onCloseUpload, title: \"\\u0E2D\\u0E31\\u0E1E\\u0E42\\u0E2B\\u0E25\\u0E14\\u0E23\\u0E39\\u0E1B\\u0E40\\u0E2D\\u0E01\\u0E2A\\u0E32\\u0E23\" },\r\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DocsForm, Object.assign({}, {\r\n                docs,\r\n                setDocs,\r\n                docsDisplay,\r\n                setDocsDisplay,\r\n                onCloseUpload,\r\n                docsType,\r\n                setDocsType,\r\n                handleChange,\r\n                getInfo,\r\n                setIsUpload,\r\n            })))));\r\n};\r\nconst UserProfile = (props) => {\r\n    const classes = useStyles();\r\n    const { userInfo } = props;\r\n    const { info, docs } = userInfo;\r\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, info && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProfileComponent, Object.assign({ data: info, userDocs: docs }, props))));\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserProfile);\r\n\n\n//# sourceURL=webpack:///./src/page/Customer/UserProfile.tsx?");

/***/ })

}]);