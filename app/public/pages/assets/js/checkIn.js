/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/checkIn.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/checkIn.js":
/*!**********************************!*\
  !*** ./src/assets/js/checkIn.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/request */ \"./src/assets/js/module/request.js\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nvar button = document.querySelector('.main-check-in__button');\nvar question = document.querySelector('.main-check-in__question');\nvar formInner = document.querySelector('.form__inner');\n\nvar appendForm = function appendForm(HTML) {\n  formInner.innerHTML = HTML;\n};\n\nvar appendFirstForm = function appendFirstForm() {\n  appendForm(\"\\n    <input type=\\\"text\\\" name=\\\"name\\\" class=\\\"form__input form__input-text\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0432\\u0430\\u0448\\u0435 \\u0438\\u043C\\u044F\\\">\\n    <input type=\\\"password\\\" name=\\\"password\\\" class=\\\"form__input form__input-password\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u043F\\u0430\\u0440\\u043E\\u043B\\u044C\\\">\\n    <input type=\\\"checkbox\\\" name=\\\"checkbox\\\" class=\\\"form__checkbox\\\" value=\\\"\\\" checked=\\\"checked\\\">\\n  \");\n};\n\nvar appendSecondForm = function appendSecondForm() {\n  appendForm(\"\\n    <input type=\\\"text\\\" name=\\\"name\\\" class=\\\"form__input form__input-text\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0432\\u0430\\u0448\\u0435 \\u0438\\u043C\\u044F\\\">\\n    <input type=\\\"password\\\" name=\\\"password\\\" class=\\\"form__input form__input-password\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u043F\\u0430\\u0440\\u043E\\u043B\\u044C\\\">\\n    <input type=\\\"email\\\" name=\\\"email\\\" class=\\\"form__input form__input-email\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u042D\\u043B\\u0435\\u043A\\u0442\\u0440\\u043E\\u043D\\u043D\\u0443\\u044E \\u043F\\u043E\\u0447\\u0442\\u0443\\\">\\n    <input type=\\\"file\\\" name=\\\"image\\\" class=\\\"form__input form__input-file\\\" id=\\\"input-file\\\">\\n    <label class=\\\"form__label\\\" for=\\\"input-file\\\">\\u0412\\u044B\\u0431\\u0435\\u0440\\u0438\\u0442\\u0435 \\u0438\\u0437\\u043E\\u0431\\u0440\\u0430\\u0436\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F \\u0432\\u0430\\u0448\\u0435\\u0433\\u043E \\u043F\\u0440\\u043E\\u0444\\u0438\\u043B\\u044F</label>\\n    <input type=\\\"checkbox\\\" name=\\\"checkbox\\\" class=\\\"form__checkbox\\\" value=\\\"1\\\" checked=\\\"checked\\\">\\n  \");\n};\n\nvar bool = true;\nbutton.addEventListener('click', function () {\n  if (bool) {\n    bool = false;\n    button.innerText = 'войти';\n    question.innerText = 'Вы можете войти';\n    appendSecondForm();\n  } else {\n    bool = true;\n    button.innerText = 'зарегестрироваться';\n    question.innerText = 'Вы еще не зарегестрированы ?';\n    appendFirstForm();\n  }\n});\nvar formButton = document.querySelector('.form__button');\nformButton.addEventListener('click', function () {\n  var bool = true;\n  var formData = new FormData(document.querySelector('.form'));\n\n  var _iterator = _createForOfIteratorHelper(formData.keys()),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var key = _step.value;\n\n      if (key !== 'checkbox') {\n        if (key === 'image') {\n          if (!formData.get(key).name) {\n            bool = false;\n          }\n        } else {\n          if (!Boolean(formData.get(key))) {\n            bool = false;\n          }\n        }\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  if (bool) {\n    var requestURL = \"\".concat(document.location.origin, \"/login\");\n    Object(_module_request__WEBPACK_IMPORTED_MODULE_0__[\"request\"])(requestURL, 'POST', formData).then(function (data) {\n      if (!JSON.parse(data).error.flag) {\n        var userCookie = JSON.parse(JSON.parse(data).responce);\n\n        for (var key in userCookie) {\n          document.cookie = \"\".concat(key, \"=\").concat(userCookie[key]);\n        }\n\n        document.location.href = document.location.origin;\n      } else {\n        alert(JSON.parse(data).error.message);\n      }\n    }).catch(function (error) {\n      console.log(error);\n    });\n  } else {\n    alert('Заполните все поля!');\n  }\n}); // document.cookie = \"name=Стас\";\n// document.cookie = \"photoUrl=https://pbs.twimg.com/media/D_M-pFAXYAA3e_9.jpg:large\";\n// document.cookie = \"password=vdfvjdfknv\";\n\n//# sourceURL=webpack:///./src/assets/js/checkIn.js?");

/***/ }),

/***/ "./src/assets/js/module/request.js":
/*!*****************************************!*\
  !*** ./src/assets/js/module/request.js ***!
  \*****************************************/
/*! exports provided: request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return request; });\nvar request = function request(url) {\n  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';\n  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  var xhr = new XMLHttpRequest();\n  return new Promise(function (resolve, reject) {\n    xhr.open(type, url);\n    xhr.addEventListener('readystatechange', function () {\n      if (xhr.readyState === 4 && xhr.status === 200) {\n        resolve(xhr.response);\n      } else if (xhr.status !== 200) {\n        reject(xhr.status, xhr);\n      }\n    });\n    xhr.send(body);\n  });\n};\n\n//# sourceURL=webpack:///./src/assets/js/module/request.js?");

/***/ })

/******/ });