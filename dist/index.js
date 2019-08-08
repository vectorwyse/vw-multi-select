/*!
 * vw-multi-select v0.0.1
 * (c) Vectorwyse
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var __vue_create_injector__ = _interopDefault(require('vue-runtime-helpers/dist/inject-style/browser.js'));

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var bootstrap = {
  classes: {
    invalid: "border-danger",
    selected: "d-flex align-items-center p-1",
    selectedItem: "mx-1 badge badge-primary",
    selectedIcon: "text-primary mr-2",
    unselectedIcon: "text-muted mr-2",
    autoAddText: "ml-2 font-italic text-primary"
  },
  styles: {
    selected: {
      borderBottom: "solid 1px #ced4da"
    }
  }
};

var fa = {
  icons: {
    selectedIcon: "fa fa-check-square-o",
    unselectedIcon: "fa fa-square-o",
    removeIcon: "fa fa-times"
  }
};

var _this = undefined;
var script = {
  name: "MultiSelect",
  props: {
    value: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    selectedListDisplayFunction: {
      type: Function,
      required: false,
      "default": function _default(item) {
        return _this.listItemProperty ? item[_this.listItemProperty] : item;
      }
    },
    listItemDisplayFunction: {
      type: Function,
      required: false,
      "default": function _default(item) {
        return _this.listItemProperty ? item[_this.listItemProperty] : item;
      }
    },
    valueProperty: {
      type: String,
      required: false
    },
    listItemProperty: {
      type: String,
      required: false
    },
    isInvalid: {
      type: Boolean,
      "default": false
    },
    iconset: {
      type: String,
      required: false
    },
    template: {
      type: String,
      required: false
    },
    appendRandomId: {
      type: Boolean,
      "default": true
    },
    showSelectedFirst: {
      type: Boolean,
      "default": false
    },
    searchable: {
      type: Boolean,
      "default": false
    },
    tags: {
      type: Boolean,
      "default": false
    },
    classes: {
      type: Object,
      required: false,
      "default": function _default() {
        return {};
      }
    },
    styles: {
      type: Object,
      required: false,
      "default": function _default() {
        return {};
      }
    },
    icons: {
      type: Object,
      required: false,
      "default": function _default() {
        return {};
      } //remove
      //selected
      //unselected

    },
    inputPlaceholder: {
      type: String,
      required: false
    },
    autoAddText: {
      type: String,
      required: false,
      "default": ""
    }
  },
  data: function data() {
    return {
      defaultClasses: {
        autoAddText: "font-size-080 font-style-italic text-decoration-underline",
        input: "background-transparent border-none width-100 font-size-080",
        invalid: "border-darkred",
        list: "height-120px padding-6px overflow-y-auto",
        removeIcon: "margin-x-6px",
        selected: "border-bottom display-flex padding-6px",
        selectedIcon: "",
        selectedItem: "cursor-pointer border display-flex font-size-080 padding-6px margin-x-6px",
        selectedListItem: "cursor-pointer",
        selectedListItemText: "font-size-080 font-weight-bold",
        unselectedIcon: "",
        unselectedListItem: "cursor-pointer",
        unselectedListItemText: "font-size-080",
        wrapper: "border"
      },
      defaultStyles: {
        autoAddText: "",
        input: "",
        invalid: "",
        list: "",
        removeIcon: "",
        selected: "",
        selectedIcon: "",
        selectedItem: "",
        selectedListItem: "",
        selectedListItemText: "",
        unselectedIcon: "",
        unselectedListItem: "",
        unselectedListItemText: "",
        wrapper: ""
      },
      random: parseInt(Math.random() * 1e6),
      query: ""
    };
  },
  computed: {
    _icons: function _icons() {
      switch (this.iconset) {
        case "font-awesome":
          return Object.assign({}, fa.icons, {}, this.icons);

        default:
          return Object.assign({}, this.icons);
      }
    },
    _classes: function _classes() {
      switch (this.template) {
        case "bootstrap":
          return Object.assign({}, this.defaultClasses, {}, bootstrap.classes, {}, this.classes);

        default:
          return Object.assign({}, this.defaultClasses, {}, this.classes);
      }
    },
    _styles: function _styles() {
      switch (this.template) {
        case "bootstrap":
          return Object.assign({}, this.defaultStyles, {}, bootstrap.styles, {}, this.styles);

        default:
          return Object.assign({}, this.defaultStyles, {}, this.styles);
      }
    },
    selectedItems: function selectedItems() {
      var _this2 = this;

      return this.list.filter(function (item) {
        if (_this2.valueProperty) {
          return _this2.value.includes(item[_this2.valueProperty]);
        }

        return _this2.value.includes(item);
      });
    },
    unselectedItems: function unselectedItems() {
      var _this3 = this;

      return this.list.filter(function (item) {
        if (_this3.valueProperty) {
          return !_this3.value.includes(item[_this3.valueProperty]);
        }

        return !_this3.value.includes(item);
      });
    },
    autoAddItem: function autoAddItem() {
      var _this4 = this;

      var filteredItems = this.unselectedItems.filter(function (listItem) {
        return _this4.listItemDisplayFunction(listItem).toLowerCase().includes(_this4.query.toLowerCase().trim());
      });

      if (this.query && filteredItems.length === 1) {
        return filteredItems[0];
      }

      return null;
    }
  },
  mounted: function mounted() {
    setTimeout(this.scrollListToTop, 0);
  },
  methods: {
    autoAdd: function autoAdd(item) {
      this.toggleItem(item);
      this.query = "";
    },
    isItemSelected: function isItemSelected(item) {
      return this.itemIndex(item) > -1;
    },
    itemIndex: function itemIndex(item) {
      var _this5 = this;

      return this.selectedItems.findIndex(function (selected) {
        return _this5.valueProperty ? item[_this5.valueProperty] === selected[_this5.valueProperty] : item === selected;
      });
    },
    scrollListToTop: function scrollListToTop() {
      var list = document.getElementById("vwms-list".concat(this.appendRandomId ? this.random : ""));

      if (list) {
        list.scrollTop = 0;
      }
    },
    toggleItem: function toggleItem(item) {
      var _this6 = this;

      var resultingSelectedItems = _toConsumableArray(this.selectedItems);

      var itemIndex = this.itemIndex(item);

      if (itemIndex > -1) {
        resultingSelectedItems.splice(itemIndex, 1);
      } else {
        resultingSelectedItems.push(item);
      }

      var formattedResult = resultingSelectedItems.map(function (result) {
        return _this6.valueProperty ? result[_this6.valueProperty] : result;
      });
      this.$emit("input", formattedResult);

      if (this.showSelectedFirst) {
        this.scrollListToTop();
      }
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    "class": [_vm._classes.wrapper, _vm.isInvalid ? _vm._classes.invalid : ''],
    style: _vm._styles.wrapper,
    attrs: {
      "id": "vwms-wrapper" + (_vm.appendRandomId ? _vm.random : '')
    }
  }, [_vm.tags || _vm.searchable ? [_c('div', {
    "class": _vm._classes.selected,
    style: _vm._styles.selected,
    attrs: {
      "id": "vwms-selected" + (_vm.appendRandomId ? _vm.random : '')
    }
  }, [_vm.tags ? _vm._l(_vm.selectedItems, function (item) {
    return _c('span', {
      "class": _vm._classes.selectedItem,
      style: _vm._styles.selectedItem,
      on: {
        "click": function click() {
          return _vm.toggleItem(item);
        }
      }
    }, [_vm._v(_vm._s(_vm.selectedListDisplayFunction(item)) + "\n                    "), _vm._icons.removeIcon ? [_c('i', {
      "class": [_vm._classes.removeIcon, _vm._icons.removeIcon],
      style: _vm._styles.removeIcon,
      on: {
        "click": function click($event) {
          return _vm.toggleItem(item);
        }
      }
    })] : [_c('span', {
      "class": _vm._classes.removeIcon,
      style: _vm._styles.removeIcon
    }, [_vm._v("✖")])]], 2);
  }) : _vm._e(), _vm._v(" "), _vm.searchable ? [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.query,
      expression: "query"
    }],
    "class": _vm._classes.input,
    style: _vm._styles.input,
    attrs: {
      "type": "text",
      "placeholder": _vm.inputPlaceholder || 'Search...'
    },
    domProps: {
      "value": _vm.query
    },
    on: {
      "keyup": function keyup($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        $event.preventDefault();
        _vm.autoAddItem ? _vm.autoAdd(_vm.autoAddItem) : null;
      },
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.query = $event.target.value;
      }
    }
  })] : _vm._e()], 2)] : _vm._e(), _vm._v(" "), _c('div', {
    "class": _vm._classes.list,
    style: _vm._styles.list,
    attrs: {
      "id": "vwms-list" + (_vm.appendRandomId ? _vm.random : '')
    }
  }, [_vm.showSelectedFirst ? [_vm._l(_vm.selectedItems.filter(function (listItem) {
    return _vm.listItemDisplayFunction(listItem).toLowerCase().includes(_vm.query.toLowerCase().trim());
  }), function (item) {
    return _c('div', {
      key: _vm.listItemDisplayFunction(item),
      "class": _vm._classes.selectedListItem,
      style: _vm._styles.selectedListItem,
      on: {
        "click": function click() {
          return _vm.toggleItem(item);
        }
      }
    }, [_vm._icons.selectedIcon ? [_c('i', {
      "class": [_vm._classes.selectedIcon, _vm._icons.selectedIcon],
      style: _vm._styles.selectedIcon
    })] : [_c('input', {
      style: _vm._styles.selectedIcon,
      attrs: {
        "type": "checkbox",
        "checked": "checked"
      }
    })], _vm._v(" "), _c('span', {
      "class": _vm._classes.selectedListItemText,
      style: _vm._styles.selectedListItemText
    }, [_vm._v(_vm._s(_vm.listItemDisplayFunction(item)))])], 2);
  }), _vm._v(" "), _vm._l(_vm.unselectedItems.filter(function (listItem) {
    return _vm.listItemDisplayFunction(listItem).toLowerCase().includes(_vm.query.toLowerCase().trim());
  }), function (item) {
    return _c('div', {
      key: _vm.listItemDisplayFunction(item),
      "class": _vm._classes.unselectedListItem,
      style: _vm._styles.unselectedListItem,
      on: {
        "click": function click() {
          return _vm.toggleItem(item);
        }
      }
    }, [_vm._icons.unselectedIcon ? [_c('i', {
      "class": [_vm._classes.unselectedIcon, _vm._icons.unselectedIcon],
      style: _vm._styles.unselectedIcon
    })] : [_c('input', {
      style: _vm._styles.unselectedIcon,
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": false
      }
    })], _vm._v(" "), _c('span', {
      "class": _vm._classes.unselectedListItemText,
      style: _vm._styles.unselectedListItemText
    }, [_vm._v(_vm._s(_vm.listItemDisplayFunction(item)))]), _vm._v(" "), _vm.autoAddItem ? _c('span', {
      "class": _vm._classes.autoAddText,
      style: _vm._styles.autoAddText
    }, [_vm._v(_vm._s(_vm.autoAddText || "Hit enter to add"))]) : _vm._e()], 2);
  })] : _vm._l(_vm.list.filter(function (listItem) {
    return _vm.listItemDisplayFunction(listItem).toLowerCase().includes(_vm.query.toLowerCase().trim());
  }), function (item) {
    return _c('div', {
      key: _vm.listItemDisplayFunction(item),
      "class": _vm.isItemSelected(item) ? _vm._classes.selectedListItem : _vm._classes.unselectedListItem,
      style: _vm.isItemSelected(item) ? _vm._styles.selectedListItem : _vm._styles.unselectedListItem,
      on: {
        "click": function click() {
          return _vm.toggleItem(item);
        }
      }
    }, [_vm.isItemSelected(item) && _vm._icons.selectedIcon ? [_c('i', {
      "class": [_vm._classes.selectedIcon, _vm._icons.selectedIcon],
      style: _vm._styles.selectedIcon
    })] : _vm._e(), _vm._v(" "), _vm.isItemSelected(item) && !_vm._icons.selectedIcon ? [_c('input', {
      style: _vm._styles.selectedIcon,
      attrs: {
        "type": "checkbox",
        "checked": "checked"
      }
    })] : _vm._e(), _vm._v(" "), !_vm.isItemSelected(item) && _vm._icons.unselectedIcon ? [_c('i', {
      "class": [_vm._classes.unselectedIcon, _vm._icons.unselectedIcon],
      style: _vm._styles.unselectedIcon
    })] : _vm._e(), _vm._v(" "), !_vm.isItemSelected(item) && !_vm._icons.unselectedIcon ? [_c('input', {
      style: _vm._styles.unselectedIcon,
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": false
      }
    })] : _vm._e(), _vm._v(" "), _c('span', {
      "class": _vm.isItemSelected(item) ? _vm._classes.selectedListItemText : _vm._classes.unselectedListItemText,
      style: _vm.isItemSelected(item) ? _vm._styles.selectedListItemText : _vm._styles.unselectedListItemText
    }, [_vm._v(_vm._s(_vm.listItemDisplayFunction(item)))]), _vm._v(" "), _vm.autoAddItem ? _c('span', {
      "class": _vm._classes.autoAddText,
      style: _vm._styles.autoAddText
    }, [_vm._v(_vm._s(_vm.autoAddText || "Hit enter to add"))]) : _vm._e()], 2);
  })], 2)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-1a0223dc_0", {
    source: "[data-v-1a0223dc]:root{--border-style:solid 1px #ced4da}.background-transparent[data-v-1a0223dc]{background:0 0}.border-bottom[data-v-1a0223dc]{border-bottom:var(--border-style)}.border[data-v-1a0223dc]{border:var(--border-style);border-radius:4px}.border-darkred[data-v-1a0223dc]{border:solid 1px #8b0000;border-radius:4px}.border-none[data-v-1a0223dc]{border:none}.cursor-pointer[data-v-1a0223dc]{cursor:pointer}.display-flex[data-v-1a0223dc]{display:flex}.font-size-080[data-v-1a0223dc]{font-size:80%}.font-style-italic[data-v-1a0223dc]{font-style:italic}.font-weight-bold[data-v-1a0223dc]{font-weight:700}.height-120px[data-v-1a0223dc]{height:120px}.margin-x-6px[data-v-1a0223dc]{margin:0 6px 0 6px}.padding-6px[data-v-1a0223dc]{padding:6px}.overflow-y-auto[data-v-1a0223dc]{overflow-y:auto}.text-decoration-underline[data-v-1a0223dc]{text-decoration:underline}.width-100[data-v-1a0223dc]{width:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-1a0223dc";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var VwMultiSelect = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

var index = {
  install: function install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("vw-multi-select", VwMultiSelect);
  }
};

module.exports = index;
