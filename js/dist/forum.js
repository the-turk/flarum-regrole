module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/components/ChooseRoleModal.js":
/*!*************************************************!*\
  !*** ./src/forum/components/ChooseRoleModal.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChooseRoleModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_GroupBadge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/GroupBadge */ "flarum/components/GroupBadge");
/* harmony import */ var flarum_components_GroupBadge__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_GroupBadge__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5__);






/**
 * The `ChooseRoleModal` component displays a modal dialog with allowed roles.
 */

var ChooseRoleModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChooseRoleModal, _Modal);

  function ChooseRoleModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = ChooseRoleModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    var user = this.attrs.user;
    this.showing = false;
    this.regRole = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()([]);
    this.username = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_5___default()(user.username() || '');
  };

  _proto.isDismissible = function isDismissible() {
    return false;
  };

  _proto.oncreate = function oncreate(vnode) {
    this.showing = true;
  };

  _proto.className = function className() {
    return 'Modal--small ChooseRoleModal';
  };

  _proto.title = function title() {
    return app.translator.trans('the-turk-regrole.forum.chooseRole');
  };

  _proto.content = function content() {
    return [m("div", {
      className: "Modal-body"
    }, this.body()), m("div", {
      className: "Modal-footer"
    }, this.footer())];
  };

  _proto.body = function body() {
    return [m("div", {
      className: "Form Form--centered"
    }, this.fields().toArray())];
  };

  _proto.roleField = function roleField() {
    var _this = this;

    return m("div", {
      className: "Form-group"
    }, m("div", {
      className: "regRole-container"
    }, app.store.all('groups').filter(function (group) {
      return app.forum.attribute('safeRoles').indexOf(group.id()) > -1;
    }).map(function (group) {
      return m("div", {
        className: "regRole-item"
      }, m("label", null, m("div", {
        className: "regRole-badge"
      }, flarum_components_GroupBadge__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        group: group,
        className: 'Group-icon',
        label: null
      })), m("input", {
        type: "checkbox",
        className: "regRole-input",
        name: "regRole[]",
        onchange: function onchange(e) {
          var index = _this.regRole().indexOf(group.id());

          var checked = e.target.checked;

          if (!app.forum.attribute('multipleRoles')) {
            _this.regRole(checked ? [group.id()] : []);
          } else {
            if (checked && index === -1) {
              _this.regRole().push(group.id());
            } else if (!checked && index > -1) {
              _this.regRole().splice(index, 1);
            }
          }
        },
        disabled: _this.loading
      }), group.nameSingular()));
    })));
  };

  _proto.fields = function fields() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_4___default.a();
    items.add('regroles', this.roleField(), 10);
    items.add('submit', m("div", {
      className: "Form-group"
    }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: "Button Button--primary Button--block",
      type: "submit",
      loading: this.loading
    }, app.translator.trans('the-turk-regrole.forum.save'))), -10);
    return items;
  };

  _proto.footer = function footer() {
    return [m("p", null, app.translator.trans('the-turk-regrole.forum.chooseRoleHelp'))];
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this2 = this;

    e.preventDefault();
    this.loading = true;
    app.request({
      url: app.forum.attribute('apiUrl') + "/regrole",
      method: 'POST',
      data: {
        regRoleIds: this.regRole()
      },
      errorHandler: this.onerror.bind(this)
    }).then(function () {
      window.location.reload();
    })["catch"](function () {
      _this2.loading = false;
      m.redraw();
    });
  };

  return ChooseRoleModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/SignUpModal */ "flarum/components/SignUpModal");
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ChooseRoleModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ChooseRoleModal */ "./src/forum/components/ChooseRoleModal.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6__);







flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('ianm-regrole', function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_Page__WEBPACK_IMPORTED_MODULE_5___default.a.prototype, 'oninit', function () {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('forceUsers')) {
      var user = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user;

      if (user) {
        var isAdmin = user.groups().filter(function (group) {
          return [flarum_models_Group__WEBPACK_IMPORTED_MODULE_2___default.a.ADMINISTRATOR_ID].indexOf(group.id()) > -1;
        }).length;

        if (!isAdmin) {
          var hasRole = user.groups().filter(function (group) {
            return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('safeRoles').indexOf(group.id()) > -1;
          }).length;
          if (!hasRole) flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(_components_ChooseRoleModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
            user: user
          });
        }
      }
    }

    var $body = $('body'); // buttons must work after an OAuth request

    $body.on('click', '.SignUpModal .regRole-input, .ChooseRoleModal .regRole-input', function () {
      var $container = $(this).closest('.regRole-item');

      if (!$container.hasClass('active')) {
        $container.addClass('active');

        if (!flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('multipleRoles')) {
          $container.siblings().removeClass('active');
          $container.siblings().find('input[type=checkbox]').prop('checked', false);
        }
      } else {
        $container.removeClass('active');
      }
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'oninit', function () {
    this.regRole = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_6___default()([]);
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'fields', function (items) {
    items.add('regroles', _components_ChooseRoleModal__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.roleField.bind(this)(), 9);
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'submitData', function (data) {
    data['regRole'] = this.regRole();
  });
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/GroupBadge":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/GroupBadge']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/GroupBadge'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/SignUpModal":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/SignUpModal']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SignUpModal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/models/Group":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['models/Group']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Group'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/Stream'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map