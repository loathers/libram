"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
  return function() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __commonJS = function(cb, mod) {
  return function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
};
var __export = function(target, all2) {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = function(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  );
}, __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// kolmafia-polyfill.js
var kolmafia, console, init_kolmafia_polyfill = __esm({
  "kolmafia-polyfill.js": function() {
    "use strict";
    kolmafia = require("kolmafia"), console = {
      log: kolmafia.print
    };
  }
});

// node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "node_modules/core-js/internals/global.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var check = function(it) {
      return it && it.Math == Math && it;
    };
    module2.exports = // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func -- fallback
    function() {
      return this;
    }() || Function("return this")();
  }
});

// node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "node_modules/core-js/internals/fails.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(exec) {
      try {
        return !!exec();
      } catch (error2) {
        return !0;
      }
    };
  }
});

// node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "node_modules/core-js/internals/descriptors.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails();
    module2.exports = !fails(function() {
      return Object.defineProperty({}, 1, {
        get: function() {
          return 7;
        }
      })[1] != 7;
    });
  }
});

// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "node_modules/core-js/internals/function-bind-native.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails();
    module2.exports = !fails(function() {
      var test = function() {
      }.bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
  }
});

// node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "node_modules/core-js/internals/function-call.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_BIND = require_function_bind_native(), call = Function.prototype.call;
    module2.exports = NATIVE_BIND ? call.bind(call) : function() {
      return call.apply(call, arguments);
    };
  }
});

// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "node_modules/core-js/internals/object-property-is-enumerable.js": function(exports) {
    "use strict";
    init_kolmafia_polyfill();
    var $propertyIsEnumerable = {}.propertyIsEnumerable, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
      1: 2
    }, 1);
    exports.f = NASHORN_BUG ? function(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
  }
});

// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "node_modules/core-js/internals/create-property-descriptor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_BIND = require_function_bind_native(), FunctionPrototype = Function.prototype, bind = FunctionPrototype.bind, call = FunctionPrototype.call, uncurryThis = NATIVE_BIND && bind.bind(call, call);
    module2.exports = NATIVE_BIND ? function(fn) {
      return fn && uncurryThis(fn);
    } : function(fn) {
      return fn && function() {
        return call.apply(fn, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "node_modules/core-js/internals/classof-raw.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), toString = uncurryThis({}.toString), stringSlice = uncurryThis("".slice);
    module2.exports = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
  }
});

// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "node_modules/core-js/internals/indexed-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), uncurryThis = require_function_uncurry_this(), fails = require_fails(), classof = require_classof_raw(), Object2 = global2.Object, split = uncurryThis("".split);
    module2.exports = fails(function() {
      return !Object2("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split(it, "") : Object2(it);
    } : Object2;
  }
});

// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "node_modules/core-js/internals/require-object-coercible.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), TypeError2 = global2.TypeError;
    module2.exports = function(it) {
      if (it == null)
        throw TypeError2("Can't call method on " + it);
      return it;
    };
  }
});

// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "node_modules/core-js/internals/to-indexed-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var IndexedObject = require_indexed_object(), requireObjectCoercible = require_require_object_coercible();
    module2.exports = function(it) {
      return IndexedObject(requireObjectCoercible(it));
    };
  }
});

// node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "node_modules/core-js/internals/is-callable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(argument) {
      return typeof argument == "function";
    };
  }
});

// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/internals/is-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isCallable = require_is_callable();
    module2.exports = function(it) {
      return typeof it == "object" ? it !== null : isCallable(it);
    };
  }
});

// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "node_modules/core-js/internals/get-built-in.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), aFunction = function(argument) {
      return isCallable(argument) ? argument : void 0;
    };
    module2.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global2[namespace]) : global2[namespace] && global2[namespace][method];
    };
  }
});

// node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-is-prototype-of.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this();
    module2.exports = uncurryThis({}.isPrototypeOf);
  }
});

// node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "node_modules/core-js/internals/engine-user-agent.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in();
    module2.exports = getBuiltIn("navigator", "userAgent") || "";
  }
});

// node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "node_modules/core-js/internals/engine-v8-version.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), userAgent = require_engine_user_agent(), process = global2.process, Deno = global2.Deno, versions = process && process.versions || Deno && Deno.version, v8 = versions && versions.v8, match, version;
    v8 && (match = v8.split("."), version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]));
    !version && userAgent && (match = userAgent.match(/Edge\/(\d+)/), (!match || match[1] >= 74) && (match = userAgent.match(/Chrome\/(\d+)/), match && (version = +match[1])));
    module2.exports = version;
  }
});

// node_modules/core-js/internals/native-symbol.js
var require_native_symbol = __commonJS({
  "node_modules/core-js/internals/native-symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var V8_VERSION = require_engine_v8_version(), fails = require_fails();
    module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
  }
});

// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "node_modules/core-js/internals/use-symbol-as-uid.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_SYMBOL = require_native_symbol();
    module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "node_modules/core-js/internals/is-symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), getBuiltIn = require_get_built_in(), isCallable = require_is_callable(), isPrototypeOf = require_object_is_prototype_of(), USE_SYMBOL_AS_UID = require_use_symbol_as_uid(), Object2 = global2.Object;
    module2.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn("Symbol");
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object2(it));
    };
  }
});

// node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "node_modules/core-js/internals/try-to-string.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), String2 = global2.String;
    module2.exports = function(argument) {
      try {
        return String2(argument);
      } catch (error2) {
        return "Object";
      }
    };
  }
});

// node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "node_modules/core-js/internals/a-callable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), tryToString = require_try_to_string(), TypeError2 = global2.TypeError;
    module2.exports = function(argument) {
      if (isCallable(argument))
        return argument;
      throw TypeError2(tryToString(argument) + " is not a function");
    };
  }
});

// node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "node_modules/core-js/internals/get-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var aCallable = require_a_callable();
    module2.exports = function(V, P) {
      var func = V[P];
      return func == null ? void 0 : aCallable(func);
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), call = require_function_call(), isCallable = require_is_callable(), isObject = require_is_object(), TypeError2 = global2.TypeError;
    module2.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)) || isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)) || pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      throw TypeError2("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "node_modules/core-js/internals/is-pure.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = !1;
  }
});

// node_modules/core-js/internals/set-global.js
var require_set_global = __commonJS({
  "node_modules/core-js/internals/set-global.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), defineProperty = Object.defineProperty;
    module2.exports = function(key, value) {
      try {
        defineProperty(global2, key, {
          value: value,
          configurable: !0,
          writable: !0
        });
      } catch (error2) {
        global2[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), setGlobal = require_set_global(), SHARED = "__core-js_shared__", store = global2[SHARED] || setGlobal(SHARED, {});
    module2.exports = store;
  }
});

// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "node_modules/core-js/internals/shared.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var IS_PURE = require_is_pure(), store = require_shared_store();
    (module2.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.21.0",
      mode: IS_PURE ? "pure" : "global",
      copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/internals/to-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), requireObjectCoercible = require_require_object_coercible(), Object2 = global2.Object;
    module2.exports = function(argument) {
      return Object2(requireObjectCoercible(argument));
    };
  }
});

// node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "node_modules/core-js/internals/has-own-property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), toObject = require_to_object(), hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module2.exports = Object.hasOwn || function(it, key) {
      return hasOwnProperty(toObject(it), key);
    };
  }
});

// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "node_modules/core-js/internals/uid.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), id = 0, postfix = Math.random(), toString = uncurryThis(1 .toString);
    module2.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/well-known-symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), shared = require_shared(), hasOwn = require_has_own_property(), uid = require_uid(), NATIVE_SYMBOL = require_native_symbol(), USE_SYMBOL_AS_UID = require_use_symbol_as_uid(), WellKnownSymbolsStore = shared("wks"), Symbol2 = global2.Symbol, symbolFor = Symbol2 && Symbol2.for, createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module2.exports = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        NATIVE_SYMBOL && hasOwn(Symbol2, name) ? WellKnownSymbolsStore[name] = Symbol2[name] : USE_SYMBOL_AS_UID && symbolFor ? WellKnownSymbolsStore[name] = symbolFor(description) : WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/internals/to-primitive.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), call = require_function_call(), isObject = require_is_object(), isSymbol = require_is_symbol(), getMethod = require_get_method(), ordinaryToPrimitive = require_ordinary_to_primitive(), wellKnownSymbol = require_well_known_symbol(), TypeError2 = global2.TypeError, TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module2.exports = function(input, pref) {
      if (!isObject(input) || isSymbol(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE), result;
      if (exoticToPrim) {
        if (pref === void 0 && (pref = "default"), result = call(exoticToPrim, input, pref), !isObject(result) || isSymbol(result))
          return result;
        throw TypeError2("Can't convert object to primitive value");
      }
      return pref === void 0 && (pref = "number"), ordinaryToPrimitive(input, pref);
    };
  }
});

// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "node_modules/core-js/internals/to-property-key.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toPrimitive = require_to_primitive(), isSymbol = require_is_symbol();
    module2.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol(key) ? key : key + "";
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isObject = require_is_object(), document2 = global2.document, EXISTS = isObject(document2) && isObject(document2.createElement);
    module2.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), fails = require_fails(), createElement = require_document_create_element();
    module2.exports = !DESCRIPTORS && !fails(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7;
    });
  }
});

// node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-descriptor.js": function(exports) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), call = require_function_call(), propertyIsEnumerableModule = require_object_property_is_enumerable(), createPropertyDescriptor = require_create_property_descriptor(), toIndexedObject = require_to_indexed_object(), toPropertyKey = require_to_property_key(), hasOwn = require_has_own_property(), IE8_DOM_DEFINE = require_ie8_dom_define(), $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function(O, P) {
      if (O = toIndexedObject(O), P = toPropertyKey(P), IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error2) {
        }
      if (hasOwn(O, P))
        return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
  }
});

// node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "node_modules/core-js/internals/v8-prototype-define-bug.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), fails = require_fails();
    module2.exports = DESCRIPTORS && fails(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: !1
      }).prototype != 42;
    });
  }
});

// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/internals/an-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isObject = require_is_object(), String2 = global2.String, TypeError2 = global2.TypeError;
    module2.exports = function(argument) {
      if (isObject(argument))
        return argument;
      throw TypeError2(String2(argument) + " is not an object");
    };
  }
});

// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "node_modules/core-js/internals/object-define-property.js": function(exports) {
    init_kolmafia_polyfill();
    var global2 = require_global(), DESCRIPTORS = require_descriptors(), IE8_DOM_DEFINE = require_ie8_dom_define(), V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug(), anObject = require_an_object(), toPropertyKey = require_to_property_key(), TypeError2 = global2.TypeError, $defineProperty = Object.defineProperty, $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, ENUMERABLE = "enumerable", CONFIGURABLE = "configurable", WRITABLE = "writable";
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function(O, P, Attributes) {
      if (anObject(O), P = toPropertyKey(P), anObject(Attributes), typeof O == "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        current && current[WRITABLE] && (O[P] = Attributes.value, Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: !1
        });
      }
      return $defineProperty(O, P, Attributes);
    } : $defineProperty : function(O, P, Attributes) {
      if (anObject(O), P = toPropertyKey(P), anObject(Attributes), IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error2) {
        }
      if ("get" in Attributes || "set" in Attributes)
        throw TypeError2("Accessors not supported");
      return "value" in Attributes && (O[P] = Attributes.value), O;
    };
  }
});

// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "node_modules/core-js/internals/create-non-enumerable-property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), definePropertyModule = require_object_define_property(), createPropertyDescriptor = require_create_property_descriptor();
    module2.exports = DESCRIPTORS ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      return object[key] = value, object;
    };
  }
});

// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "node_modules/core-js/internals/inspect-source.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), isCallable = require_is_callable(), store = require_shared_store(), functionToString = uncurryThis(Function.toString);
    isCallable(store.inspectSource) || (store.inspectSource = function(it) {
      return functionToString(it);
    });
    module2.exports = store.inspectSource;
  }
});

// node_modules/core-js/internals/native-weak-map.js
var require_native_weak_map = __commonJS({
  "node_modules/core-js/internals/native-weak-map.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), inspectSource = require_inspect_source(), WeakMap2 = global2.WeakMap;
    module2.exports = isCallable(WeakMap2) && /native code/.test(inspectSource(WeakMap2));
  }
});

// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/internals/shared-key.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var shared = require_shared(), uid = require_uid(), keys = shared("keys");
    module2.exports = function(key) {
      return keys[key] || (keys[key] = uid(key));
    };
  }
});

// node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "node_modules/core-js/internals/hidden-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = {};
  }
});

// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "node_modules/core-js/internals/internal-state.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_WEAK_MAP = require_native_weak_map(), global2 = require_global(), uncurryThis = require_function_uncurry_this(), isObject = require_is_object(), createNonEnumerableProperty = require_create_non_enumerable_property(), hasOwn = require_has_own_property(), shared = require_shared_store(), sharedKey = require_shared_key(), hiddenKeys = require_hidden_keys(), OBJECT_ALREADY_INITIALIZED = "Object already initialized", TypeError2 = global2.TypeError, WeakMap2 = global2.WeakMap, set3, get4, has, enforce = function(it) {
      return has(it) ? get4(it) : set3(it, {});
    }, getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject(it) || (state = get4(it)).type !== TYPE)
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        return state;
      };
    };
    NATIVE_WEAK_MAP || shared.state ? (store = shared.state || (shared.state = new WeakMap2()), wmget = uncurryThis(store.get), wmhas = uncurryThis(store.has), wmset = uncurryThis(store.set), set3 = function(it, metadata) {
      if (wmhas(store, it))
        throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
      return metadata.facade = it, wmset(store, it, metadata), metadata;
    }, get4 = function(it) {
      return wmget(store, it) || {};
    }, has = function(it) {
      return wmhas(store, it);
    }) : (STATE = sharedKey("state"), hiddenKeys[STATE] = !0, set3 = function(it, metadata) {
      if (hasOwn(it, STATE))
        throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
      return metadata.facade = it, createNonEnumerableProperty(it, STATE, metadata), metadata;
    }, get4 = function(it) {
      return hasOwn(it, STATE) ? it[STATE] : {};
    }, has = function(it) {
      return hasOwn(it, STATE);
    });
    var store, wmget, wmhas, wmset, STATE;
    module2.exports = {
      set: set3,
      get: get4,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };
  }
});

// node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "node_modules/core-js/internals/function-name.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), hasOwn = require_has_own_property(), FunctionPrototype = Function.prototype, getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor, EXISTS = hasOwn(FunctionPrototype, "name"), PROPER = EXISTS && function() {
    }.name === "something", CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
    module2.exports = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };
  }
});

// node_modules/core-js/internals/redefine.js
var require_redefine = __commonJS({
  "node_modules/core-js/internals/redefine.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), hasOwn = require_has_own_property(), createNonEnumerableProperty = require_create_non_enumerable_property(), setGlobal = require_set_global(), inspectSource = require_inspect_source(), InternalStateModule = require_internal_state(), CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE, getInternalState = InternalStateModule.get, enforceInternalState = InternalStateModule.enforce, TEMPLATE = String(String).split("String");
    (module2.exports = function(O, key, value, options) {
      var unsafe = options ? !!options.unsafe : !1, simple = options ? !!options.enumerable : !1, noTargetGet = options ? !!options.noTargetGet : !1, name = options && options.name !== void 0 ? options.name : key, state;
      if (isCallable(value) && (String(name).slice(0, 7) === "Symbol(" && (name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) && createNonEnumerableProperty(value, "name", name), state = enforceInternalState(value), state.source || (state.source = TEMPLATE.join(typeof name == "string" ? name : ""))), O === global2) {
        simple ? O[key] = value : setGlobal(key, value);
        return;
      } else
        unsafe ? !noTargetGet && O[key] && (simple = !0) : delete O[key];
      simple ? O[key] = value : createNonEnumerableProperty(O, key, value);
    })(Function.prototype, "toString", function() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    });
  }
});

// node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "node_modules/core-js/internals/to-integer-or-infinity.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var ceil = Math.ceil, floor = Math.floor;
    module2.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
    };
  }
});

// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/internals/to-absolute-index.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIntegerOrInfinity = require_to_integer_or_infinity(), max = Math.max, min = Math.min;
    module2.exports = function(index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIntegerOrInfinity = require_to_integer_or_infinity(), min = Math.min;
    module2.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "node_modules/core-js/internals/length-of-array-like.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toLength = require_to_length();
    module2.exports = function(obj) {
      return toLength(obj.length);
    };
  }
});

// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/internals/array-includes.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIndexedObject = require_to_indexed_object(), toAbsoluteIndex = require_to_absolute_index(), lengthOfArrayLike = require_length_of_array_like(), createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this), length = lengthOfArrayLike(O), index = toAbsoluteIndex(fromIndex, length), value;
        if (IS_INCLUDES && el != el) {
          for (; length > index; )
            if (value = O[index++], value != value)
              return !0;
        } else
          for (; length > index; index++)
            if ((IS_INCLUDES || index in O) && O[index] === el)
              return IS_INCLUDES || index || 0;
        return !IS_INCLUDES && -1;
      };
    };
    module2.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(!0),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(!1)
    };
  }
});

// node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "node_modules/core-js/internals/object-keys-internal.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), hasOwn = require_has_own_property(), toIndexedObject = require_to_indexed_object(), indexOf2 = require_array_includes().indexOf, hiddenKeys = require_hidden_keys(), push = uncurryThis([].push);
    module2.exports = function(object, names) {
      var O = toIndexedObject(object), i = 0, result = [], key;
      for (key in O)
        !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      for (; names.length > i; )
        hasOwn(O, key = names[i++]) && (~indexOf2(result, key) || push(result, key));
      return result;
    };
  }
});

// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/internals/enum-bug-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  }
});

// node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names.js": function(exports) {
    init_kolmafia_polyfill();
    var internalObjectKeys = require_object_keys_internal(), enumBugKeys = require_enum_bug_keys(), hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-symbols.js": function(exports) {
    init_kolmafia_polyfill();
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/internals/own-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in(), uncurryThis = require_function_uncurry_this(), getOwnPropertyNamesModule = require_object_get_own_property_names(), getOwnPropertySymbolsModule = require_object_get_own_property_symbols(), anObject = require_an_object(), concat = uncurryThis([].concat);
    module2.exports = getBuiltIn("Reflect", "ownKeys") || function(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it)), getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
  }
});

// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "node_modules/core-js/internals/copy-constructor-properties.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var hasOwn = require_has_own_property(), ownKeys7 = require_own_keys(), getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor(), definePropertyModule = require_object_define_property();
    module2.exports = function(target, source, exceptions) {
      for (var keys = ownKeys7(source), defineProperty = definePropertyModule.f, getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f, i = 0; i < keys.length; i++) {
        var key = keys[i];
        !hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key)) && defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };
  }
});

// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "node_modules/core-js/internals/is-forced.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails(), isCallable = require_is_callable(), replacement = /#|\.prototype\./, isForced = function(feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? !0 : value == NATIVE ? !1 : isCallable(detection) ? fails(detection) : !!detection;
    }, normalize = isForced.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    }, data = isForced.data = {}, NATIVE = isForced.NATIVE = "N", POLYFILL = isForced.POLYFILL = "P";
    module2.exports = isForced;
  }
});

// node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "node_modules/core-js/internals/export.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f, createNonEnumerableProperty = require_create_non_enumerable_property(), redefine = require_redefine(), setGlobal = require_set_global(), copyConstructorProperties = require_copy_constructor_properties(), isForced = require_is_forced();
    module2.exports = function(options, source) {
      var TARGET = options.target, GLOBAL = options.global, STATIC = options.stat, FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL ? target = global2 : STATIC ? target = global2[TARGET] || setGlobal(TARGET, {}) : target = (global2[TARGET] || {}).prototype, target)
        for (key in source) {
          if (sourceProperty = source[key], options.noTargetGet ? (descriptor = getOwnPropertyDescriptor(target, key), targetProperty = descriptor && descriptor.value) : targetProperty = target[key], FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced), !FORCED && targetProperty !== void 0) {
            if (typeof sourceProperty == typeof targetProperty)
              continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          (options.sham || targetProperty && targetProperty.sham) && createNonEnumerableProperty(sourceProperty, "sham", !0), redefine(target, key, sourceProperty, options);
        }
    };
  }
});

// node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
  "node_modules/core-js/internals/object-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var internalObjectKeys = require_object_keys_internal(), enumBugKeys = require_enum_bug_keys();
    module2.exports = Object.keys || function(O) {
      return internalObjectKeys(O, enumBugKeys);
    };
  }
});

// node_modules/core-js/internals/object-to-array.js
var require_object_to_array = __commonJS({
  "node_modules/core-js/internals/object-to-array.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), uncurryThis = require_function_uncurry_this(), objectKeys = require_object_keys(), toIndexedObject = require_to_indexed_object(), $propertyIsEnumerable = require_object_property_is_enumerable().f, propertyIsEnumerable = uncurryThis($propertyIsEnumerable), push = uncurryThis([].push), createMethod = function(TO_ENTRIES) {
      return function(it) {
        for (var O = toIndexedObject(it), keys = objectKeys(O), length = keys.length, i = 0, result = [], key; length > i; )
          key = keys[i++], (!DESCRIPTORS || propertyIsEnumerable(O, key)) && push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        return result;
      };
    };
    module2.exports = {
      // `Object.entries` method
      // https://tc39.es/ecma262/#sec-object.entries
      entries: createMethod(!0),
      // `Object.values` method
      // https://tc39.es/ecma262/#sec-object.values
      values: createMethod(!1)
    };
  }
});

// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/internals/is-array.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var classof = require_classof_raw();
    module2.exports = Array.isArray || function(argument) {
      return classof(argument) == "Array";
    };
  }
});

// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "node_modules/core-js/internals/function-bind-context.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), aCallable = require_a_callable(), NATIVE_BIND = require_function_bind_native(), bind = uncurryThis(uncurryThis.bind);
    module2.exports = function(fn, that) {
      return aCallable(fn), that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/flatten-into-array.js
var require_flatten_into_array = __commonJS({
  "node_modules/core-js/internals/flatten-into-array.js": function(exports, module2) {
    "use strict";
    init_kolmafia_polyfill();
    var global2 = require_global(), isArray = require_is_array(), lengthOfArrayLike = require_length_of_array_like(), bind = require_function_bind_context(), TypeError2 = global2.TypeError, flattenIntoArray = function flattenIntoArray2(target, original, source, sourceLen, start, depth, mapper, thisArg) {
      for (var targetIndex = start, sourceIndex = 0, mapFn = mapper ? bind(mapper, thisArg) : !1, element, elementLen; sourceIndex < sourceLen; ) {
        if (sourceIndex in source) {
          if (element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex], depth > 0 && isArray(element))
            elementLen = lengthOfArrayLike(element), targetIndex = flattenIntoArray2(target, original, element, elementLen, targetIndex, depth - 1) - 1;
          else {
            if (targetIndex >= 9007199254740991)
              throw TypeError2("Exceed the acceptable array length");
            target[targetIndex] = element;
          }
          targetIndex++;
        }
        sourceIndex++;
      }
      return targetIndex;
    };
    module2.exports = flattenIntoArray;
  }
});

// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "node_modules/core-js/internals/to-string-tag-support.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), TO_STRING_TAG = wellKnownSymbol("toStringTag"), test = {};
    test[TO_STRING_TAG] = "z";
    module2.exports = String(test) === "[object z]";
  }
});

// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "node_modules/core-js/internals/classof.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), TO_STRING_TAG_SUPPORT = require_to_string_tag_support(), isCallable = require_is_callable(), classofRaw = require_classof_raw(), wellKnownSymbol = require_well_known_symbol(), TO_STRING_TAG = wellKnownSymbol("toStringTag"), Object2 = global2.Object, CORRECT_ARGUMENTS = classofRaw(function() {
      return arguments;
    }()) == "Arguments", tryGet = function(it, key) {
      try {
        return it[key];
      } catch (error2) {
      }
    };
    module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object2(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable(O.callee) ? "Arguments" : result;
    };
  }
});

// node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
  "node_modules/core-js/internals/is-constructor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), fails = require_fails(), isCallable = require_is_callable(), classof = require_classof(), getBuiltIn = require_get_built_in(), inspectSource = require_inspect_source(), noop = function() {
    }, empty = [], construct = getBuiltIn("Reflect", "construct"), constructorRegExp = /^\s*(?:class|function)\b/, exec = uncurryThis(constructorRegExp.exec), INCORRECT_TO_STRING = !constructorRegExp.exec(noop), isConstructorModern = function(argument) {
      if (!isCallable(argument))
        return !1;
      try {
        return construct(noop, empty, argument), !0;
      } catch (error2) {
        return !1;
      }
    }, isConstructorLegacy = function(argument) {
      if (!isCallable(argument))
        return !1;
      switch (classof(argument)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return !1;
      }
      try {
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
      } catch (error2) {
        return !0;
      }
    };
    isConstructorLegacy.sham = !0;
    module2.exports = !construct || fails(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = !0;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
  }
});

// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/internals/array-species-constructor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isArray = require_is_array(), isConstructor = require_is_constructor(), isObject = require_is_object(), wellKnownSymbol = require_well_known_symbol(), SPECIES = wellKnownSymbol("species"), Array2 = global2.Array;
    module2.exports = function(originalArray) {
      var C;
      return isArray(originalArray) && (C = originalArray.constructor, isConstructor(C) && (C === Array2 || isArray(C.prototype)) ? C = void 0 : isObject(C) && (C = C[SPECIES], C === null && (C = void 0))), C === void 0 ? Array2 : C;
    };
  }
});

// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/internals/array-species-create.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var arraySpeciesConstructor = require_array_species_constructor();
    module2.exports = function(originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
  }
});

// node_modules/core-js/modules/es.array.flat.js
var require_es_array_flat = __commonJS({
  "node_modules/core-js/modules/es.array.flat.js": function() {
    "use strict";
    init_kolmafia_polyfill();
    var $4 = require_export(), flattenIntoArray = require_flatten_into_array(), toObject = require_to_object(), lengthOfArrayLike = require_length_of_array_like(), toIntegerOrInfinity = require_to_integer_or_infinity(), arraySpeciesCreate = require_array_species_create();
    $4({
      target: "Array",
      proto: !0
    }, {
      flat: function() {
        var depthArg = arguments.length ? arguments[0] : void 0, O = toObject(this), sourceLen = lengthOfArrayLike(O), A = arraySpeciesCreate(O, 0);
        return A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === void 0 ? 1 : toIntegerOrInfinity(depthArg)), A;
      }
    });
  }
});

// node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
  "node_modules/core-js/internals/object-define-properties.js": function(exports) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug(), definePropertyModule = require_object_define_property(), anObject = require_an_object(), toIndexedObject = require_to_indexed_object(), objectKeys = require_object_keys();
    exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function(O, Properties) {
      anObject(O);
      for (var props = toIndexedObject(Properties), keys = objectKeys(Properties), length = keys.length, index = 0, key; length > index; )
        definePropertyModule.f(O, key = keys[index++], props[key]);
      return O;
    };
  }
});

// node_modules/core-js/internals/html.js
var require_html = __commonJS({
  "node_modules/core-js/internals/html.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in();
    module2.exports = getBuiltIn("document", "documentElement");
  }
});

// node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
  "node_modules/core-js/internals/object-create.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var anObject = require_an_object(), definePropertiesModule = require_object_define_properties(), enumBugKeys = require_enum_bug_keys(), hiddenKeys = require_hidden_keys(), html = require_html(), documentCreateElement = require_document_create_element(), sharedKey = require_shared_key(), GT = ">", LT = "<", PROTOTYPE = "prototype", SCRIPT = "script", IE_PROTO = sharedKey("IE_PROTO"), EmptyConstructor = function() {
    }, scriptTag = function(content) {
      return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
    }, NullProtoObjectViaActiveX = function(activeXDocument2) {
      activeXDocument2.write(scriptTag("")), activeXDocument2.close();
      var temp = activeXDocument2.parentWindow.Object;
      return activeXDocument2 = null, temp;
    }, NullProtoObjectViaIFrame = function() {
      var iframe = documentCreateElement("iframe"), JS = "java" + SCRIPT + ":", iframeDocument;
      return iframe.style.display = "none", html.appendChild(iframe), iframe.src = String(JS), iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write(scriptTag("document.F=Object")), iframeDocument.close(), iframeDocument.F;
    }, activeXDocument, _NullProtoObject = function() {
      try {
        activeXDocument = new ActiveXObject("htmlfile");
      } catch (error2) {
      }
      _NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
      for (var length = enumBugKeys.length; length--; )
        delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return _NullProtoObject();
    };
    hiddenKeys[IE_PROTO] = !0;
    module2.exports = Object.create || function(O, Properties) {
      var result;
      return O !== null ? (EmptyConstructor[PROTOTYPE] = anObject(O), result = new EmptyConstructor(), EmptyConstructor[PROTOTYPE] = null, result[IE_PROTO] = O) : result = _NullProtoObject(), Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
    };
  }
});

// node_modules/core-js/internals/add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
  "node_modules/core-js/internals/add-to-unscopables.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), create = require_object_create(), definePropertyModule = require_object_define_property(), UNSCOPABLES = wellKnownSymbol("unscopables"), ArrayPrototype = Array.prototype;
    ArrayPrototype[UNSCOPABLES] == null && definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: !0,
      value: create(null)
    });
    module2.exports = function(key) {
      ArrayPrototype[UNSCOPABLES][key] = !0;
    };
  }
});

// node_modules/core-js/modules/es.array.unscopables.flat.js
var require_es_array_unscopables_flat = __commonJS({
  "node_modules/core-js/modules/es.array.unscopables.flat.js": function() {
    init_kolmafia_polyfill();
    var addToUnscopables = require_add_to_unscopables();
    addToUnscopables("flat");
  }
});

// node_modules/core-js/internals/entry-unbind.js
var require_entry_unbind = __commonJS({
  "node_modules/core-js/internals/entry-unbind.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), uncurryThis = require_function_uncurry_this();
    module2.exports = function(CONSTRUCTOR, METHOD) {
      return uncurryThis(global2[CONSTRUCTOR].prototype[METHOD]);
    };
  }
});

// node_modules/core-js/es/array/flat.js
var require_flat = __commonJS({
  "node_modules/core-js/es/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    require_es_array_flat();
    require_es_array_unscopables_flat();
    var entryUnbind = require_entry_unbind();
    module2.exports = entryUnbind("Array", "flat");
  }
});

// node_modules/core-js/stable/array/flat.js
var require_flat2 = __commonJS({
  "node_modules/core-js/stable/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat();
    module2.exports = parent;
  }
});

// node_modules/core-js/actual/array/flat.js
var require_flat3 = __commonJS({
  "node_modules/core-js/actual/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat2();
    module2.exports = parent;
  }
});

// node_modules/core-js/features/array/flat.js
var require_flat4 = __commonJS({
  "node_modules/core-js/features/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat3();
    module2.exports = parent;
  }
});

// node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
  "node_modules/core-js/internals/iterators.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = {};
  }
});

// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "node_modules/core-js/internals/is-array-iterator-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), Iterators = require_iterators(), ITERATOR = wellKnownSymbol("iterator"), ArrayPrototype = Array.prototype;
    module2.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    };
  }
});

// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "node_modules/core-js/internals/get-iterator-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var classof = require_classof(), getMethod = require_get_method(), Iterators = require_iterators(), wellKnownSymbol = require_well_known_symbol(), ITERATOR = wellKnownSymbol("iterator");
    module2.exports = function(it) {
      if (it != null)
        return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
    };
  }
});

// node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
  "node_modules/core-js/internals/get-iterator.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), call = require_function_call(), aCallable = require_a_callable(), anObject = require_an_object(), tryToString = require_try_to_string(), getIteratorMethod = require_get_iterator_method(), TypeError2 = global2.TypeError;
    module2.exports = function(argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
      if (aCallable(iteratorMethod))
        return anObject(call(iteratorMethod, argument));
      throw TypeError2(tryToString(argument) + " is not iterable");
    };
  }
});

// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "node_modules/core-js/internals/iterator-close.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var call = require_function_call(), anObject = require_an_object(), getMethod = require_get_method();
    module2.exports = function(iterator, kind, value) {
      var innerResult, innerError;
      anObject(iterator);
      try {
        if (innerResult = getMethod(iterator, "return"), !innerResult) {
          if (kind === "throw")
            throw value;
          return value;
        }
        innerResult = call(innerResult, iterator);
      } catch (error2) {
        innerError = !0, innerResult = error2;
      }
      if (kind === "throw")
        throw value;
      if (innerError)
        throw innerResult;
      return anObject(innerResult), value;
    };
  }
});

// node_modules/core-js/internals/iterate.js
var require_iterate = __commonJS({
  "node_modules/core-js/internals/iterate.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), bind = require_function_bind_context(), call = require_function_call(), anObject = require_an_object(), tryToString = require_try_to_string(), isArrayIteratorMethod = require_is_array_iterator_method(), lengthOfArrayLike = require_length_of_array_like(), isPrototypeOf = require_object_is_prototype_of(), getIterator = require_get_iterator(), getIteratorMethod = require_get_iterator_method(), iteratorClose = require_iterator_close(), TypeError2 = global2.TypeError, Result = function(stopped, result) {
      this.stopped = stopped, this.result = result;
    }, ResultPrototype = Result.prototype;
    module2.exports = function(iterable, unboundFunction, options) {
      var that = options && options.that, AS_ENTRIES = !!(options && options.AS_ENTRIES), IS_ITERATOR = !!(options && options.IS_ITERATOR), INTERRUPTED = !!(options && options.INTERRUPTED), fn = bind(unboundFunction, that), iterator, iterFn, index, length, result, next2, step, stop = function(condition) {
        return iterator && iteratorClose(iterator, "normal", condition), new Result(!0, condition);
      }, callFn = function(value) {
        return AS_ENTRIES ? (anObject(value), INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])) : INTERRUPTED ? fn(value, stop) : fn(value);
      };
      if (IS_ITERATOR)
        iterator = iterable;
      else {
        if (iterFn = getIteratorMethod(iterable), !iterFn)
          throw TypeError2(tryToString(iterable) + " is not iterable");
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++)
            if (result = callFn(iterable[index]), result && isPrototypeOf(ResultPrototype, result))
              return result;
          return new Result(!1);
        }
        iterator = getIterator(iterable, iterFn);
      }
      for (next2 = iterator.next; !(step = call(next2, iterator)).done; ) {
        try {
          result = callFn(step.value);
        } catch (error2) {
          iteratorClose(iterator, "throw", error2);
        }
        if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result))
          return result;
      }
      return new Result(!1);
    };
  }
});

// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/internals/create-property.js": function(exports, module2) {
    "use strict";
    init_kolmafia_polyfill();
    var toPropertyKey = require_to_property_key(), definePropertyModule = require_object_define_property(), createPropertyDescriptor = require_create_property_descriptor();
    module2.exports = function(object, key, value) {
      var propertyKey = toPropertyKey(key);
      propertyKey in object ? definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value)) : object[propertyKey] = value;
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  $bounties: function() {
    return $bounties;
  },
  $bounty: function() {
    return $bounty;
  },
  $class: function() {
    return $class;
  },
  $classes: function() {
    return $classes;
  },
  $coinmaster: function() {
    return $coinmaster;
  },
  $coinmasters: function() {
    return $coinmasters;
  },
  $effect: function() {
    return $effect;
  },
  $effects: function() {
    return $effects;
  },
  $element: function() {
    return $element;
  },
  $elements: function() {
    return $elements;
  },
  $familiar: function() {
    return $familiar;
  },
  $familiars: function() {
    return $familiars;
  },
  $item: function() {
    return $item;
  },
  $items: function() {
    return $items;
  },
  $location: function() {
    return $location;
  },
  $locations: function() {
    return $locations;
  },
  $monster: function() {
    return $monster;
  },
  $monsters: function() {
    return $monsters;
  },
  $path: function() {
    return $path;
  },
  $paths: function() {
    return $paths;
  },
  $phyla: function() {
    return $phyla;
  },
  $phylum: function() {
    return $phylum;
  },
  $servant: function() {
    return $servant;
  },
  $servants: function() {
    return $servants;
  },
  $skill: function() {
    return $skill;
  },
  $skills: function() {
    return $skills;
  },
  $slot: function() {
    return $slot;
  },
  $slots: function() {
    return $slots;
  },
  $stat: function() {
    return $stat;
  },
  $stats: function() {
    return $stats;
  },
  $thrall: function() {
    return $thrall;
  },
  $thralls: function() {
    return $thralls;
  },
  ActionSource: function() {
    return ActionSource;
  },
  AscendError: function() {
    return AscendError;
  },
  AscensionPrepError: function() {
    return AscensionPrepError;
  },
  AsdonMartin: function() {
    return AsdonMartin_exports;
  },
  AutumnAton: function() {
    return AutumnAton_exports;
  },
  Bandersnatch: function() {
    return Bandersnatch_exports;
  },
  BarrelShrine: function() {
    return BarrelShrine_exports;
  },
  BeachComb: function() {
    return BeachComb_exports;
  },
  Cartography: function() {
    return Cartography_exports;
  },
  ChateauMantegna: function() {
    return ChateauMantegna_exports;
  },
  Clan: function() {
    return Clan;
  },
  CombatLoversLocket: function() {
    return CombatLoversLocket_exports;
  },
  CommunityService: function() {
    return CommunityService;
  },
  Counter: function() {
    return counter_exports;
  },
  CrimboShrub: function() {
    return CrimboShrub_exports;
  },
  CrownOfThrones: function() {
    return CrownOfThrones_exports;
  },
  CrystalBall: function() {
    return CrystalBall_exports;
  },
  DNALab: function() {
    return DNALab_exports;
  },
  DaylightShavings: function() {
    return DaylightShavings_exports;
  },
  DeckOfEveryCard: function() {
    return DeckOfEveryCard_exports;
  },
  Diet: function() {
    return Diet;
  },
  Dinseylandfill: function() {
    return Dinseylandfill_exports;
  },
  Dreadsylvania: function() {
    return Dreadsylvania_exports;
  },
  EnsureError: function() {
    return EnsureError;
  },
  Environment: function() {
    return Environment;
  },
  FloristFriar: function() {
    return Florist_exports;
  },
  GreyGoose: function() {
    return GreyGoose_exports;
  },
  Guzzlr: function() {
    return Guzzlr_exports;
  },
  Hobopolis: function() {
    return Hobopolis_exports;
  },
  InvalidMacroError: function() {
    return InvalidMacroError;
  },
  JuneCleaver: function() {
    return JuneCleaver_exports;
  },
  Kmail: function() {
    return Kmail;
  },
  KolmafiaVersionError: function() {
    return KolmafiaVersionError;
  },
  Latte: function() {
    return LatteLoversMembersMug_exports;
  },
  Lifestyle: function() {
    return Lifestyle;
  },
  Macro: function() {
    return Macro;
  },
  MagicalSausages: function() {
    return MagicalSausages;
  },
  MayoClinic: function() {
    return MayoClinic_exports;
  },
  MenuItem: function() {
    return MenuItem;
  },
  Mood: function() {
    return Mood;
  },
  MpSource: function() {
    return MpSource;
  },
  MummingTrunk: function() {
    return MummingTrunk_exports;
  },
  NuclearAutumn: function() {
    return NuclearAutumn_exports;
  },
  ObtuseAngel: function() {
    return ObtuseAngel_exports;
  },
  OscusSoda: function() {
    return OscusSoda;
  },
  Pantogram: function() {
    return Pantogram_exports;
  },
  Path: function() {
    return Path5;
  },
  Paths: function() {
    return Paths;
  },
  PropertiesManager: function() {
    return PropertiesManager;
  },
  RainDoh: function() {
    return RainDoh_exports;
  },
  RainDohBlackBox: function() {
    return RainDohBlackBox;
  },
  ReagnimatedGnome: function() {
    return ReagnimatedGnome_exports;
  },
  Requirement: function() {
    return Requirement;
  },
  RetroCape: function() {
    return RetroCape_exports;
  },
  Robortender: function() {
    return Robortender_exports;
  },
  Session: function() {
    return Session;
  },
  SlimeTube: function() {
    return SlimeTube_exports;
  },
  Snapper: function() {
    return Snapper_exports;
  },
  SongBoom: function() {
    return SongBoom_exports;
  },
  SourceTerminal: function() {
    return SourceTerminal_exports;
  },
  Spacegate: function() {
    return Spacegate_exports;
  },
  SpookyPutty: function() {
    return SpookyPutty_exports;
  },
  SpookyPuttySheet: function() {
    return SpookyPuttySheet;
  },
  Stickers: function() {
    return Stickers_exports;
  },
  StompingBoots: function() {
    return StompingBoots_exports;
  },
  StrictMacro: function() {
    return StrictMacro;
  },
  TrainSet: function() {
    return TrainSet_exports;
  },
  TunnelOfLove: function() {
    return TunnelOfLove_exports;
  },
  Wanderer: function() {
    return Wanderer;
  },
  WinterGarden: function() {
    return WinterGarden_exports;
  },
  Witchess: function() {
    return Witchess_exports;
  },
  actionSourcesAvailable: function() {
    return actionSourcesAvailable;
  },
  adventureMacro: function() {
    return adventureMacro;
  },
  adventureMacroAuto: function() {
    return adventureMacroAuto;
  },
  applyModes: function() {
    return applyModes;
  },
  arrayContains: function() {
    return arrayContains;
  },
  arrayEquals: function() {
    return arrayEquals;
  },
  arrayToCountedMap: function() {
    return arrayToCountedMap;
  },
  ascend: function() {
    return ascend;
  },
  bestLibramToCast: function() {
    return bestLibramToCast;
  },
  canRememberSong: function() {
    return canRememberSong;
  },
  canUse: function() {
    return canUse;
  },
  canVisitUrl: function() {
    return canVisitUrl;
  },
  chunk: function() {
    return chunk;
  },
  clamp: function() {
    return clamp;
  },
  clearMaximizerCache: function() {
    return clearMaximizerCache;
  },
  console: function() {
    return console_exports;
  },
  couldUseRainDohBlackBox: function() {
    return couldUseRainDohBlackBox;
  },
  couldUseSpookyPuttySheet: function() {
    return couldUseSpookyPuttySheet;
  },
  countedMapToArray: function() {
    return countedMapToArray;
  },
  countedMapToString: function() {
    return countedMapToString;
  },
  damageTakenByElement: function() {
    return damageTakenByElement;
  },
  ensureEffect: function() {
    return ensureEffect;
  },
  ensureFreeKill: function() {
    return ensureFreeKill;
  },
  ensureFreeRun: function() {
    return ensureFreeRun;
  },
  examine: function() {
    return examine;
  },
  expectedLibramSummon: function() {
    return expectedLibramSummon;
  },
  findActionSource: function() {
    return findActionSource;
  },
  findFairyMultiplier: function() {
    return findFairyMultiplier;
  },
  findLeprechaunMultiplier: function() {
    return findLeprechaunMultiplier;
  },
  get: function() {
    return get;
  },
  getActiveEffects: function() {
    return getActiveEffects;
  },
  getActiveSongs: function() {
    return getActiveSongs;
  },
  getAverage: function() {
    return getAverage;
  },
  getAverageAdventures: function() {
    return getAverageAdventures;
  },
  getBanishedMonsters: function() {
    return getBanishedMonsters;
  },
  getCurrentModes: function() {
    return getCurrentModes;
  },
  getFamiliarWandererChance: function() {
    return getFamiliarWandererChance;
  },
  getFoldGroup: function() {
    return getFoldGroup;
  },
  getKramcoWandererChance: function() {
    return getKramcoWandererChance;
  },
  getMacroId: function() {
    return getMacroId;
  },
  getModifier: function() {
    return get2;
  },
  getMonsterLocations: function() {
    return getMonsterLocations;
  },
  getPlayerFromIdOrName: function() {
    return getPlayerFromIdOrName;
  },
  getRemainingLiver: function() {
    return getRemainingLiver;
  },
  getRemainingSpleen: function() {
    return getRemainingSpleen;
  },
  getRemainingStomach: function() {
    return getRemainingStomach;
  },
  getSaleValue: function() {
    return getSaleValue;
  },
  getSongCount: function() {
    return getSongCount;
  },
  getSongLimit: function() {
    return getSongLimit;
  },
  getTodaysHolidayWanderers: function() {
    return getTodaysHolidayWanderers;
  },
  getTotalPuttyLikeCopiesMade: function() {
    return getTotalPuttyLikeCopiesMade;
  },
  getWandererChance: function() {
    return getWandererChance;
  },
  getZapGroup: function() {
    return getZapGroup;
  },
  have: function() {
    return have;
  },
  haveCounter: function() {
    return haveCounter;
  },
  haveInCampground: function() {
    return haveInCampground;
  },
  haveWandererCounter: function() {
    return haveWandererCounter;
  },
  holidayWanderers: function() {
    return holidayWanderers;
  },
  invertMap: function() {
    return invertMap;
  },
  isBooleanProperty: function() {
    return isBooleanProperty;
  },
  isCurrentFamiliar: function() {
    return isCurrentFamiliar;
  },
  isFamiliarProperty: function() {
    return isFamiliarProperty;
  },
  isLocationProperty: function() {
    return isLocationProperty;
  },
  isMonsterProperty: function() {
    return isMonsterProperty;
  },
  isNumericOrStringProperty: function() {
    return isNumericOrStringProperty;
  },
  isNumericProperty: function() {
    return isNumericProperty;
  },
  isPhylumProperty: function() {
    return isPhylumProperty;
  },
  isSong: function() {
    return isSong;
  },
  isStatProperty: function() {
    return isStatProperty;
  },
  isStringProperty: function() {
    return isStringProperty;
  },
  isVoteWandererNow: function() {
    return isVoteWandererNow;
  },
  isWandererNow: function() {
    return isWandererNow;
  },
  logger: function() {
    return logger_default;
  },
  maxBy: function() {
    return maxBy;
  },
  maximizeCached: function() {
    return maximizeCached;
  },
  mergeMaximizeOptions: function() {
    return mergeMaximizeOptions;
  },
  modeableItems: function() {
    return modeableItems;
  },
  modeableState: function() {
    return modeableState;
  },
  noneToNull: function() {
    return noneToNull;
  },
  notNull: function() {
    return notNull;
  },
  parseNumber: function() {
    return parseNumber;
  },
  permedSkills: function() {
    return permedSkills;
  },
  possibleLibramSummons: function() {
    return possibleLibramSummons;
  },
  prepareAscension: function() {
    return prepareAscension;
  },
  property: function() {
    return property_exports;
  },
  propertyTypes: function() {
    return propertyTypes_exports;
  },
  questStep: function() {
    return questStep;
  },
  set: function() {
    return _set;
  },
  setDefaultMaximizeOptions: function() {
    return setDefaultMaximizeOptions;
  },
  setEqual: function() {
    return setEqual;
  },
  setProperties: function() {
    return setProperties;
  },
  sinceKolmafiaRevision: function() {
    return sinceKolmafiaRevision;
  },
  sinceKolmafiaVersion: function() {
    return sinceKolmafiaVersion;
  },
  splitByCommasWithEscapes: function() {
    return splitByCommasWithEscapes;
  },
  sum: function() {
    return sum;
  },
  sumNumbers: function() {
    return sumNumbers;
  },
  telescope: function() {
    return telescope;
  },
  tryFindFreeKill: function() {
    return tryFindFreeKill;
  },
  tryFindFreeRun: function() {
    return tryFindFreeRun;
  },
  uneffect: function() {
    return uneffect;
  },
  withChoice: function() {
    return withChoice;
  },
  withChoices: function() {
    return withChoices;
  },
  withProperties: function() {
    return withProperties;
  },
  withProperty: function() {
    return withProperty;
  }
});
module.exports = __toCommonJS(src_exports);
init_kolmafia_polyfill();

// src/actions/ActionSource.ts
init_kolmafia_polyfill();
var import_kolmafia7 = require("kolmafia");

// src/combat.ts
init_kolmafia_polyfill();
var import_kolmafia4 = require("kolmafia");

// src/lib.ts
init_kolmafia_polyfill();

// node_modules/core-js/modules/es.object.entries.js
init_kolmafia_polyfill();
var $ = require_export(), $entries = require_object_to_array().entries;
$({
  target: "Object",
  stat: !0
}, {
  entries: function(O) {
    return $entries(O);
  }
});

// src/lib.ts
var import_flat = __toESM(require_flat4()), import_kolmafia3 = require("kolmafia");

// src/property.ts
var property_exports = {};
__export(property_exports, {
  PropertiesManager: function() {
    return PropertiesManager;
  },
  get: function() {
    return get;
  },
  getBoolean: function() {
    return getBoolean;
  },
  getBounty: function() {
    return getBounty;
  },
  getClass: function() {
    return getClass;
  },
  getCoinmaster: function() {
    return getCoinmaster;
  },
  getCommaSeparated: function() {
    return getCommaSeparated;
  },
  getEffect: function() {
    return getEffect;
  },
  getElement: function() {
    return getElement;
  },
  getFamiliar: function() {
    return getFamiliar;
  },
  getItem: function() {
    return getItem;
  },
  getLocation: function() {
    return getLocation;
  },
  getMonster: function() {
    return getMonster;
  },
  getNumber: function() {
    return getNumber;
  },
  getPhylum: function() {
    return getPhylum;
  },
  getServant: function() {
    return getServant;
  },
  getSkill: function() {
    return getSkill;
  },
  getSlot: function() {
    return getSlot;
  },
  getStat: function() {
    return getStat;
  },
  getString: function() {
    return getString;
  },
  getThrall: function() {
    return getThrall;
  },
  set: function() {
    return _set;
  },
  setProperties: function() {
    return setProperties;
  },
  withChoice: function() {
    return withChoice;
  },
  withChoices: function() {
    return withChoices;
  },
  withProperties: function() {
    return withProperties;
  },
  withProperty: function() {
    return withProperty;
  }
});
init_kolmafia_polyfill();

// node_modules/core-js/modules/es.object.from-entries.js
init_kolmafia_polyfill();
var $2 = require_export(), iterate = require_iterate(), createProperty = require_create_property();
$2({
  target: "Object",
  stat: !0
}, {
  fromEntries: function(iterable) {
    var obj = {};
    return iterate(iterable, function(k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: !0
    }), obj;
  }
});

// src/property.ts
var import_kolmafia = require("kolmafia");

// src/propertyTyping.ts
init_kolmafia_polyfill();

// src/propertyTypes.ts
var propertyTypes_exports = {};
__export(propertyTypes_exports, {
  booleanProperties: function() {
    return booleanProperties;
  },
  familiarProperties: function() {
    return familiarProperties;
  },
  locationProperties: function() {
    return locationProperties;
  },
  monsterProperties: function() {
    return monsterProperties;
  },
  numericOrStringProperties: function() {
    return numericOrStringProperties;
  },
  numericProperties: function() {
    return numericProperties;
  },
  phylumProperties: function() {
    return phylumProperties;
  },
  statProperties: function() {
    return statProperties;
  },
  stringProperties: function() {
    return stringProperties;
  }
});
init_kolmafia_polyfill();
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "oasisAvailable", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByEffect", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "superconductorDefeated", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTraining", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lodestoneUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_molehillMountainUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pingPongGame", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_portableSteamUnitUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shadowForestLooted", "_shrubDecorated", "_silverDreadFlaskUsed", "_sitCourseCompleted", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_strangeStalagmiteUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"], numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "8BitBonusTurns", "8BitScore", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "asolDeferredPoints", "asolPointsPigSkinner", "asolPointsCheeseWizard", "asolPointsJazzAgent", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTrainingSkill", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "elfGratitude", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "hareTurnsUsed", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarElbowNC", "lastFriarHeartNC", "lastFriarNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastShadowForgeUnlockAdventure", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastTrainsetConfiguration", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pingpongSkill", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "trainsetPosition", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "whetstonesUsed", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_cloversPurchased", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDrops", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_greyYouAdventures", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_grubbyWoolDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_robinEggDrops", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shadowBricksUsed", "_shadowRiftCombats", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_speakeasyFreeFights", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_waxGlobDrops", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"], monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "motifMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"], locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation", "_sotParcelLocation"], stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "8BitColor", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "currentSITSkill", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questRufus", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "rufusDesiredArtifact", "rufusDesiredEntity", "rufusDesiredItems", "rufusQuestTarget", "rufusQuestType", "scriptMRUList", "seahorseName", "shadowRiftIngress", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trainsetConfiguration", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_sotParcelReturned  false", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"], numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475", "choiceAdventure1486", "choiceAdventure1487", "choiceAdventure1488", "choiceAdventure1489", "choiceAdventure1491", "choiceAdventure1494"], familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"], statProperties = ["nsChallenge1", "snojoSetting"], phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];

// src/propertyTyping.ts
var booleanPropertiesSet = new Set(booleanProperties), numericPropertiesSet = new Set(numericProperties), numericOrStringPropertiesSet = new Set(numericOrStringProperties), stringPropertiesSet = new Set(stringProperties), locationPropertiesSet = new Set(locationProperties), monsterPropertiesSet = new Set(monsterProperties), familiarPropertiesSet = new Set(familiarProperties), statPropertiesSet = new Set(statProperties), phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}

// src/property.ts
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var createPropertyGetter = function(transform) {
  return function(property, default_) {
    var value = (0, import_kolmafia.getProperty)(property);
    return default_ !== void 0 && value === "" ? default_ : transform(value, property);
  };
}, createMafiaClassPropertyGetter = function(Type, toType) {
  return createPropertyGetter(function(value) {
    if (value === "")
      return null;
    var v = toType(value);
    return v === Type.none ? null : v;
  });
}, getString = createPropertyGetter(function(value) {
  return value;
}), getCommaSeparated = createPropertyGetter(function(value) {
  return value.split(/, ?/);
}), getBoolean = createPropertyGetter(function(value) {
  return value === "true";
}), getNumber = createPropertyGetter(function(value) {
  return Number(value);
}), getBounty = createMafiaClassPropertyGetter(import_kolmafia.Bounty, import_kolmafia.toBounty), getClass = createMafiaClassPropertyGetter(import_kolmafia.Class, import_kolmafia.toClass), getCoinmaster = createMafiaClassPropertyGetter(import_kolmafia.Coinmaster, import_kolmafia.toCoinmaster), getEffect = createMafiaClassPropertyGetter(import_kolmafia.Effect, import_kolmafia.toEffect), getElement = createMafiaClassPropertyGetter(import_kolmafia.Element, import_kolmafia.toElement), getFamiliar = createMafiaClassPropertyGetter(import_kolmafia.Familiar, import_kolmafia.toFamiliar), getItem = createMafiaClassPropertyGetter(import_kolmafia.Item, import_kolmafia.toItem), getLocation = createMafiaClassPropertyGetter(import_kolmafia.Location, import_kolmafia.toLocation), getMonster = createMafiaClassPropertyGetter(import_kolmafia.Monster, import_kolmafia.toMonster), getPhylum = createMafiaClassPropertyGetter(import_kolmafia.Phylum, import_kolmafia.toPhylum), getServant = createMafiaClassPropertyGetter(import_kolmafia.Servant, import_kolmafia.toServant), getSkill = createMafiaClassPropertyGetter(import_kolmafia.Skill, import_kolmafia.toSkill), getSlot = createMafiaClassPropertyGetter(import_kolmafia.Slot, import_kolmafia.toSlot), getStat = createMafiaClassPropertyGetter(import_kolmafia.Stat, import_kolmafia.toStat), getThrall = createMafiaClassPropertyGetter(import_kolmafia.Thrall, import_kolmafia.toThrall);
function get(property, _default) {
  var value = getString(property);
  if (isBooleanProperty(property)) {
    var _getBoolean;
    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : !1;
  } else if (isNumericProperty(property)) {
    var _getNumber;
    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else {
    if (isNumericOrStringProperty(property))
      return value.match(/^\d+$/) ? parseInt(value) : value;
    if (isLocationProperty(property))
      return getLocation(property, _default);
    if (isMonsterProperty(property))
      return getMonster(property, _default);
    if (isFamiliarProperty(property))
      return getFamiliar(property, _default);
    if (isStatProperty(property))
      return getStat(property, _default);
    if (isPhylumProperty(property))
      return getPhylum(property, _default);
    if (isStringProperty(property))
      return value;
  }
  return _default instanceof import_kolmafia.Location ? getLocation(property, _default) : _default instanceof import_kolmafia.Monster ? getMonster(property, _default) : _default instanceof import_kolmafia.Familiar ? getFamiliar(property, _default) : _default instanceof import_kolmafia.Stat ? getStat(property, _default) : _default instanceof import_kolmafia.Phylum ? getPhylum(property, _default) : typeof _default == "boolean" ? value === "true" ? !0 : value === "false" ? !1 : _default : typeof _default == "number" ? value === "" ? _default : parseInt(value) : value === "" ? _default === void 0 ? "" : _default : value;
}
function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0, import_kolmafia.setProperty)(property, stringValue);
}
function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), prop = _Object$entries$_i[0], _value = _Object$entries$_i[1];
    _set(prop, _value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 1), prop = _ref2[0];
    return [prop, get(prop)];
  }));
  setProperties(properties);
  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices2, callback) {
  var properties = Object.fromEntries(Object.entries(choices2).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), choice = _ref4[0], option = _ref4[1];
    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /* @__PURE__ */ function() {
  function PropertiesManager2() {
    _classCallCheck(this, PropertiesManager2), _defineProperty(this, "properties", {});
  }
  return _createClass(PropertiesManager2, [{
    key: "storedValues",
    get: function() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */
  }, {
    key: "set",
    value: function(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), propertyName = _Object$entries2$_i[0], propertyValue = _Object$entries2$_i[1];
        this.properties[propertyName] === void 0 && (this.properties[propertyName] = get(propertyName)), _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */
  }, {
    key: "setChoices",
    value: function(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), choiceNumber = _ref6[0], choiceValue = _ref6[1];
        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */
  }, {
    key: "setChoice",
    value: function(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */
  }, {
    key: "reset",
    value: function() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++)
        properties[_key] = arguments[_key];
      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var _property = _properties[_i3], _value2 = this.properties[_property];
        _value2 && _set(_property, _value2);
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */
  }, {
    key: "resetAll",
    value: function() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */
  }, {
    key: "clear",
    value: function() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        properties[_key2] = arguments[_key2];
      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var _property2 = _properties2[_i4];
        this.properties[_property2] && delete this.properties[_property2];
      }
    }
    /**
     * Clears all properties.
     */
  }, {
    key: "clearAll",
    value: function() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMinimumValue",
    value: function(property, value) {
      return get(property, 0) < value ? (this.set(_defineProperty({}, property, value)), !0) : !1;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMaximumValue",
    value: function(property, value) {
      return get(property, 0) > value ? (this.set(_defineProperty({}, property, value)), !0) : !1;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */
  }, {
    key: "clone",
    value: function() {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = this.storedValues, newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */
  }, {
    key: "clamp",
    value: function(property, min, max) {
      if (max < min)
        return !1;
      var start = get(property);
      return this.setMinimumValue(property, min), this.setMaximumValue(property, max), start !== get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */
  }, {
    key: "equals",
    value: function(other) {
      var thisProps = Object.entries(this.storedValues), otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size)
        return !1;
      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2), propertyName = _thisProps$_i[0], propertyValue = _thisProps$_i[1];
        if (otherProps.get(propertyName) === propertyValue)
          return !1;
      }
      return !0;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */
  }, {
    key: "merge",
    value: function(other) {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties), newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */
  }], [{
    key: "merge",
    value: function() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
        mergees[_key3] = arguments[_key3];
      return mergees.length === 0 ? new PropertiesManager2() : mergees.reduce(function(a, b) {
        return a.merge(b);
      });
    }
  }]), PropertiesManager2;
}();

// src/template-string.ts
init_kolmafia_polyfill();
var import_kolmafia2 = require("kolmafia");

// src/utils.ts
init_kolmafia_polyfill();
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray2(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
}
function _iterableToArray(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray2(arr);
}
function _arrayLikeToArray2(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function chunk(array, chunkSize) {
  for (var result = [], i = 0; i < array.length; i += chunkSize)
    result.push(array.slice(i, i + chunkSize));
  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array))
    return array;
  var map = /* @__PURE__ */ new Map();
  return array.forEach(function(item8) {
    map.set(item8, (map.get(item8) || 0) + 1);
  }), map;
}
function countedMapToArray(map) {
  var _ref;
  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(function(_ref2) {
    var _ref3 = _slicedToArray2(_ref2, 2), item8 = _ref3[0], quantity = _ref3[1];
    return Array(quantity).fill(item8);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(function(_ref4) {
    var _ref5 = _slicedToArray2(_ref4, 2), item8 = _ref5[0], quantity = _ref5[1];
    return "".concat(quantity, " x ").concat(item8);
  }).join(", ");
}
function sum(addends, x) {
  return addends.reduce(function(subtotal, element) {
    return subtotal + (typeof x == "function" ? x(element) : element[x]);
  }, 0);
}
function sumNumbers(addends) {
  return sum(addends, function(x) {
    return x;
  });
}
function arrayContains(item8, array) {
  return array.includes(item8);
}
function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort(), sortedB = _toConsumableArray(b).sort();
  return a.length === b.length && sortedA.every(function(item8, index) {
    return item8 === sortedB[index];
  });
}
function invertMap(map) {
  var returnValue = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper(map), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray2(_step.value, 2), _key = _step$value[0], value = _step$value[1];
      returnValue.set(value, _key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}
function maxBy(array, optimizer) {
  var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!array.length)
    throw new Error("Cannot call maxBy on an empty array!");
  return typeof optimizer == "function" ? _toConsumableArray(array).reduce(function(_ref6, other) {
    var value = _ref6.value, item8 = _ref6.item, otherValue = optimizer(other);
    return value >= otherValue !== reverse ? {
      value: value,
      item: item8
    } : {
      value: otherValue,
      item: other
    };
  }, {
    item: array[0],
    value: optimizer(array[0])
  }).item : array.reduce(function(a, b) {
    return a[optimizer] >= b[optimizer] !== reverse ? a : b;
  });
}
function arrayEquals(left, right) {
  return left.length !== right.length ? !1 : left.every(function(element, index) {
    return element === right[index];
  });
}

// src/template-string.ts
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, createSingleConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };
  return tagFunction.none = Type.none, tagFunction;
}, createPluralConstant = function(Type) {
  return function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return input === "" ? Type.all() : Type.get(splitByCommasWithEscapes(input));
  };
}, $bounty = createSingleConstant(import_kolmafia2.Bounty), $bounties = createPluralConstant(import_kolmafia2.Bounty), $class = createSingleConstant(import_kolmafia2.Class), $classes = createPluralConstant(import_kolmafia2.Class), $coinmaster = createSingleConstant(import_kolmafia2.Coinmaster), $coinmasters = createPluralConstant(import_kolmafia2.Coinmaster), $effect = createSingleConstant(import_kolmafia2.Effect), $effects = createPluralConstant(import_kolmafia2.Effect), $element = createSingleConstant(import_kolmafia2.Element), $elements = createPluralConstant(import_kolmafia2.Element), $familiar = createSingleConstant(import_kolmafia2.Familiar), $familiars = createPluralConstant(import_kolmafia2.Familiar), $item = createSingleConstant(import_kolmafia2.Item), $items = createPluralConstant(import_kolmafia2.Item), $location = createSingleConstant(import_kolmafia2.Location), $locations = createPluralConstant(import_kolmafia2.Location), $monster = createSingleConstant(import_kolmafia2.Monster), $monsters = createPluralConstant(import_kolmafia2.Monster), $phylum = createSingleConstant(import_kolmafia2.Phylum), $phyla = createPluralConstant(import_kolmafia2.Phylum), $servant = createSingleConstant(import_kolmafia2.Servant), $servants = createPluralConstant(import_kolmafia2.Servant), $skill = createSingleConstant(import_kolmafia2.Skill), $skills = createPluralConstant(import_kolmafia2.Skill), $slot = createSingleConstant(import_kolmafia2.Slot), $slots = createPluralConstant(import_kolmafia2.Slot), $stat = createSingleConstant(import_kolmafia2.Stat), $stats = createPluralConstant(import_kolmafia2.Stat), $thrall = createSingleConstant(import_kolmafia2.Thrall), $thralls = createPluralConstant(import_kolmafia2.Thrall), $path = createSingleConstant(import_kolmafia2.Path), $paths = createPluralConstant(import_kolmafia2.Path);

// src/lib.ts
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties2(Constructor.prototype, protoProps), staticProps && _defineProperties2(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(Class6) {
    if (Class6 === null || !_isNativeFunction(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct(Class6, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, Class6);
  }, _wrapNativeSuper(Class5);
}
function _construct(Parent, args, Class5) {
  return _isNativeReflectConstruct() ? _construct = Reflect.construct : _construct = function(Parent2, args2, Class6) {
    var a = [null];
    a.push.apply(a, args2);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf(instance, Class6.prototype), instance;
  }, _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  return _setPrototypeOf = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf(o);
}
function _createForOfIteratorHelper2(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray3(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray3(arr, i) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
}
function _arrayLikeToArray3(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit3(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function getSongLimit() {
  return 3 + ((0, import_kolmafia3.booleanModifier)("Four Songs") ? 1 : 0) + (0, import_kolmafia3.numericModifier)("Additional Song");
}
function isSong(skillOrEffect) {
  if (skillOrEffect instanceof import_kolmafia3.Effect && skillOrEffect.attributes.includes("song"))
    return !0;
  var skill2 = skillOrEffect instanceof import_kolmafia3.Effect ? (0, import_kolmafia3.toSkill)(skillOrEffect) : skillOrEffect;
  return skill2.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill2.buff;
}
function getActiveEffects() {
  return Object.keys((0, import_kolmafia3.myEffects)()).map(function(e) {
    return import_kolmafia3.Effect.get(e);
  });
}
function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
function getSongCount() {
  return getActiveSongs().length;
}
function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
function getMonsterLocations(monster) {
  return import_kolmafia3.Location.all().filter(function(location) {
    return monster.name in (0, import_kolmafia3.appearanceRates)(location);
  });
}
function getRemainingLiver() {
  return (0, import_kolmafia3.inebrietyLimit)() - (0, import_kolmafia3.myInebriety)();
}
function getRemainingStomach() {
  return (0, import_kolmafia3.fullnessLimit)() - (0, import_kolmafia3.myFullness)();
}
function getRemainingSpleen() {
  return (0, import_kolmafia3.spleenLimit)() - (0, import_kolmafia3.mySpleenUse)();
}
function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if (thing instanceof import_kolmafia3.Effect)
    return (0, import_kolmafia3.haveEffect)(thing) >= quantity;
  if (thing instanceof import_kolmafia3.Familiar)
    return (0, import_kolmafia3.haveFamiliar)(thing);
  if (thing instanceof import_kolmafia3.Item)
    return (0, import_kolmafia3.availableAmount)(thing) >= quantity;
  if (thing instanceof import_kolmafia3.Servant)
    return (0, import_kolmafia3.haveServant)(thing);
  if (thing instanceof import_kolmafia3.Skill)
    return (0, import_kolmafia3.haveSkill)(thing);
  if (thing instanceof import_kolmafia3.Thrall) {
    var thrall = (0, import_kolmafia3.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }
  return !1;
}
function haveInCampground(item8) {
  return Object.keys((0, import_kolmafia3.getCampground)()).map(function(i) {
    return import_kolmafia3.Item.get(i);
  }).includes(item8);
}
var Wanderer;
(function(Wanderer2) {
  Wanderer2.Digitize = "Digitize Monster", Wanderer2.Enamorang = "Enamorang Monster", Wanderer2.Familiar = "Familiar", Wanderer2.Holiday = "Holiday Monster", Wanderer2.Kramco = "Kramco", Wanderer2.Nemesis = "Nemesis Assassin", Wanderer2.Portscan = "portscan.edu", Wanderer2.Romantic = "Romantic Monster", Wanderer2.Vote = "Vote Monster";
})(Wanderer || (Wanderer = {}));
var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, maxTurns = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 500;
  return (0, import_kolmafia3.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer);
  var begin = wanderer + " window begin", end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
function isVoteWandererNow() {
  return (0, import_kolmafia3.totalTurnsPlayed)() % 11 === 1 && get("lastVoteMonsterTurn") < (0, import_kolmafia3.totalTurnsPlayed)();
}
function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer, 0, 0);
  if (wanderer === Wanderer.Kramco)
    return !0;
  if (wanderer === Wanderer.Vote)
    return isVoteWandererNow();
  if (wanderer === Wanderer.Familiar)
    return get("_hipsterAdv") < 7;
  var begin = wanderer + " window begin", end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
function getKramcoWandererChance() {
  var fights = get("_sausageFights"), lastFight = get("_lastSausageMonsterTurn"), totalTurns = (0, import_kolmafia3.totalTurnsPlayed)();
  if (fights < 1)
    return lastFight === totalTurns && (0, import_kolmafia3.myTurncount)() < 1 ? 0.5 : 1;
  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.max(0, fights - 5) ** 3));
}
function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv"), probability = [0.5, 0.4, 0.3, 0.2];
  return totalFights < 4 ? probability[totalFights] : totalFights > 7 ? 0 : 0.1;
}
function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer))
    return haveCounter(wanderer, 0, 0) ? 1 : 0;
  if (wanderer === Wanderer.Kramco && getKramcoWandererChance(), wanderer === Wanderer.Vote)
    return isVoteWandererNow() ? 1 : 0;
  wanderer === Wanderer.Familiar && getFamiliarWandererChance();
  var begin = wanderer + " window begin", end = wanderer + " window end";
  if (haveCounter(begin, 1, 100))
    return 0;
  var counters = get("relayCounters"), re = new RegExp("(\\d+):" + end), matches = counters.match(re);
  if (matches && matches.length === 2) {
    var window2 = Number.parseInt(matches[1]) - (0, import_kolmafia3.myTurncount)();
    return 1 / window2;
  }
  return 0;
}
function isCurrentFamiliar(familiar6) {
  return (0, import_kolmafia3.myFamiliar)() === familiar6;
}
function getFoldGroup(item8) {
  return Object.entries((0, import_kolmafia3.getRelated)(item8, "fold")).sort(function(_ref, _ref2) {
    var _ref3 = _slicedToArray3(_ref, 2), a = _ref3[1], _ref4 = _slicedToArray3(_ref2, 2), b = _ref4[1];
    return a - b;
  }).map(function(_ref5) {
    var _ref6 = _slicedToArray3(_ref5, 1), i = _ref6[0];
    return import_kolmafia3.Item.get(i);
  });
}
function getZapGroup(item8) {
  return Object.keys((0, import_kolmafia3.getRelated)(item8, "zap")).map(function(i) {
    return import_kolmafia3.Item.get(i);
  });
}
function getBanishedMonsters() {
  var banishes = chunk(get("banishedMonsters").split(":"), 3), result = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper2(banishes), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray3(_step.value, 2), foe = _step$value[0], banisher = _step$value[1];
      if (foe === void 0 || banisher === void 0)
        break;
      var banisherItem = (0, import_kolmafia3.toItem)(banisher);
      if (banisher.toLowerCase() === "saber force")
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), import_kolmafia3.Monster.get(foe));
      else if (banisher.toLowerCase() === "nanorhino")
        result.set($skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Unleash Nanites"]))), import_kolmafia3.Monster.get(foe));
      else if ([import_kolmafia3.Item.none, import_kolmafia3.Item.get("training scroll:  Snokebomb"), import_kolmafia3.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (import_kolmafia3.Skill.get(banisher) === $skill.none)
          break;
        result.set(import_kolmafia3.Skill.get(banisher), import_kolmafia3.Monster.get(foe));
      } else
        result.set(banisherItem, import_kolmafia3.Monster.get(foe));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
function canUse(item8) {
  var path = (0, import_kolmafia3.myPath)();
  return !(path !== import_kolmafia3.Path.get("Nuclear Autumn") && $items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item8) || path === import_kolmafia3.Path.get("G-Lover") && !item8.name.toLowerCase().includes("g") || path === import_kolmafia3.Path.get("Bees Hate You") && item8.name.toLowerCase().includes("b"));
}
function noneToNull(thing) {
  return thing instanceof import_kolmafia3.Effect ? thing === import_kolmafia3.Effect.none ? null : thing : thing instanceof import_kolmafia3.Familiar ? thing === import_kolmafia3.Familiar.none ? null : thing : thing instanceof import_kolmafia3.Item && thing === import_kolmafia3.Item.none ? null : thing;
}
function getAverage(range) {
  var _range$match;
  if (range.indexOf("-") < 0)
    return Number(range);
  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"], _ref8 = _slicedToArray3(_ref7, 3), lower = _ref8[1], upper = _ref8[2];
  return (Number(lower) + Number(upper)) / 2;
}
function getAverageAdventures(item8) {
  return getAverage(item8.adventures);
}
function uneffect(effect2) {
  return (0, import_kolmafia3.cliExecute)("uneffect ".concat(effect2.name));
}
function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName == "number" ? idOrName : parseInt((0, import_kolmafia3.getPlayerId)(idOrName));
  return {
    name: (0, import_kolmafia3.getPlayerName)(id),
    id: id
  };
}
function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted")
    return -1;
  if (stringStep === "started")
    return 0;
  if (stringStep === "finished" || stringStep === "")
    return 999;
  if (stringStep.substring(0, 4) !== "step")
    throw new Error("Quest state parsing error.");
  return parseInt(stringStep.substring(4), 10);
}
var EnsureError = /* @__PURE__ */ function(_Error) {
  _inherits(EnsureError2, _Error);
  var _super = _createSuper(EnsureError2);
  function EnsureError2(cause, reason) {
    var _this;
    return _classCallCheck2(this, EnsureError2), _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : "")), _this.name = "Ensure Error", _this;
  }
  return _createClass2(EnsureError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if ((0, import_kolmafia3.haveEffect)(ef) < turns) {
    if (ef.default === null)
      throw new EnsureError(ef, "No default action");
    if (!(0, import_kolmafia3.cliExecute)(ef.default) || (0, import_kolmafia3.haveEffect)(ef) === 0)
      throw new EnsureError(ef);
  }
}
var valueMap = /* @__PURE__ */ new Map(), MALL_VALUE_MODIFIER = 0.9;
function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  return items.map(function(item8) {
    return valueMap.has(item8) || (item8.discardable ? valueMap.set(item8, (0, import_kolmafia3.mallPrice)(item8) > Math.max(2 * (0, import_kolmafia3.autosellPrice)(item8), 100) ? MALL_VALUE_MODIFIER * (0, import_kolmafia3.mallPrice)(item8) : (0, import_kolmafia3.autosellPrice)(item8)) : valueMap.set(item8, (0, import_kolmafia3.mallPrice)(item8) > 100 ? MALL_VALUE_MODIFIER * (0, import_kolmafia3.mallPrice)(item8) : 0)), valueMap.get(item8) || 0;
  }).reduce(function(s, price2) {
    return s + price2;
  }, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
function findLeprechaunMultiplier(familiar6) {
  if (familiar6 === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"]))))
    return (0, import_kolmafia3.numericModifier)(familiar6, "Leprechaun Effectiveness", 1, $item.none);
  if (familiar6 === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"]))))
    return 0;
  var meatBonus = (0, import_kolmafia3.numericModifier)(familiar6, "Meat Drop", 1, $item.none);
  return meatBonus === 0 ? 0 : Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
function findFairyMultiplier(familiar6) {
  if (familiar6 === $familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Mutant Fire Ant"]))))
    return (0, import_kolmafia3.numericModifier)(familiar6, "Fairy Effectiveness", 1, $item.none);
  if (familiar6 === $familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Reanimated Reanimator"]))))
    return 0;
  var itemBonus = (0, import_kolmafia3.numericModifier)(familiar6, "Item Drop", 1, $item.none);
  return itemBonus === 0 ? 0 : Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = /* @__PURE__ */ new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0, import_kolmafia3.holiday)().split("/").map(function(holiday2) {
    var _holidayWanderers$get;
    return (_holidayWanderers$get = holidayWanderers.get(holiday2)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
function canVisitUrl() {
  return (0, import_kolmafia3.currentRound)() ? (logger_default.debug("Current round is ".concat((0, import_kolmafia3.currentRound)(), "; you're in combat.")), !1) : (0, import_kolmafia3.inMultiFight)() ? (logger_default.debug("You're in a multifight."), !1) : (0, import_kolmafia3.choiceFollowsFight)() ? (logger_default.debug("A choice follows this fight."), !1) : (0, import_kolmafia3.handlingChoice)() ? (logger_default.debug("You're currently in a choice adventure"), !1) : !0;
}
function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0)
    return 1;
  var res = (0, import_kolmafia3.elementalResistance)(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = /* @__PURE__ */ new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]), telescopeElements = /* @__PURE__ */ new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap1 = /* @__PURE__ */ new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap2 = /* @__PURE__ */ new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap3 = /* @__PURE__ */ new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}
function examine(thing) {
  var url = thing instanceof import_kolmafia3.Item ? "desc_item.php?whichitem=".concat(thing.descid) : thing instanceof import_kolmafia3.Familiar ? "desc_familiar.php?which=".concat((0, import_kolmafia3.toInt)(thing)) : thing instanceof import_kolmafia3.Effect ? "desc_effect.php?whicheffect=".concat(thing.descid) : "desc_skill.php?whichskill=".concat((0, import_kolmafia3.toInt)(thing));
  return (0, import_kolmafia3.visitUrl)(url);
}

// src/combat.ts
var _templateObject35, _templateObject210;
function _get() {
  return typeof Reflect != "undefined" && Reflect.get ? _get = Reflect.get : _get = function(target, property, receiver) {
    var base = _superPropBase(target, property);
    if (base) {
      var desc = Object.getOwnPropertyDescriptor(base, property);
      return desc.get ? desc.get.call(arguments.length < 3 ? target : receiver) : desc.value;
    }
  }, _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  for (; !Object.prototype.hasOwnProperty.call(object, property) && (object = _getPrototypeOf2(object), object !== null); )
    ;
  return object;
}
function _createForOfIteratorHelper3(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray4(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray4(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray4(o, minLen);
  }
}
function _iterableToArray2(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray4(arr);
}
function _arrayLikeToArray4(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperty2(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties3(Constructor.prototype, protoProps), staticProps && _defineProperties3(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits2(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf2(subClass, superClass);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized2(self2);
}
function _assertThisInitialized2(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper2(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper2 = function(Class6) {
    if (Class6 === null || !_isNativeFunction2(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct2(Class6, arguments, _getPrototypeOf2(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf2(Wrapper, Class6);
  }, _wrapNativeSuper2(Class5);
}
function _construct2(Parent, args, Class5) {
  return _isNativeReflectConstruct2() ? _construct2 = Reflect.construct : _construct2 = function(Parent2, args2, Class6) {
    var a = [null];
    a.push.apply(a, args2);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf2(instance, Class6.prototype), instance;
  }, _construct2.apply(null, arguments);
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction2(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf2(o, p) {
  return _setPrototypeOf2 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf2(o, p);
}
function _getPrototypeOf2(o) {
  return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf2(o);
}
function _taggedTemplateLiteral2(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var MACRO_NAME = "Script Autoattack Macro";
function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MACRO_NAME, macroMatches = (0, import_kolmafia4.xpath)((0, import_kolmafia4.visitUrl)("account_combatmacros.php"), '//select[@name="macroid"]/option[text()="'.concat(name, '"]/@value'));
  if (macroMatches.length === 0) {
    (0, import_kolmafia4.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0, import_kolmafia4.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else
    return parseInt(macroMatches[0], 10);
}
function itemOrNameToItem(itemOrName) {
  return typeof itemOrName == "string" ? import_kolmafia4.Item.get(itemOrName) : itemOrName;
}
var substringCombatItems = $items(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral2(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, bowling ball, adder, red button, pile of sand, mushroom, deluxe mushroom"]))), substringCombatSkills = $skills(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral2(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Snipe, Cleave, Boil, Slice, Rainbow"])));
function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems))
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  var item8 = itemOrNameToItem(itemOrItems);
  return substringCombatItems.includes(item8) ? (0, import_kolmafia4.toInt)(item8).toString() : item8.name;
}
function itemOrItemsBallsMacroPredicate(itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ") : "hascombatitem ".concat(itemOrItems);
}
function skillOrNameToSkill(skillOrName) {
  return typeof skillOrName == "string" ? import_kolmafia4.Skill.get(skillOrName) : skillOrName;
}
function skillBallsMacroName(skillOrName) {
  var skill2 = skillOrNameToSkill(skillOrName);
  return skill2.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill2) ? skill2.name : (0, import_kolmafia4.toInt)(skill2);
}
var InvalidMacroError = /* @__PURE__ */ function(_Error) {
  _inherits2(InvalidMacroError2, _Error);
  var _super = _createSuper2(InvalidMacroError2);
  function InvalidMacroError2() {
    return _classCallCheck3(this, InvalidMacroError2), _super.apply(this, arguments);
  }
  return _createClass3(InvalidMacroError2);
}(/* @__PURE__ */ _wrapNativeSuper2(Error)), Macro = /* @__PURE__ */ function() {
  function Macro2() {
    _classCallCheck3(this, Macro2), _defineProperty2(this, "components", []), _defineProperty2(this, "name", MACRO_NAME);
  }
  return _createClass3(Macro2, [{
    key: "toString",
    value: (
      /**
       * Convert macro to string.
       */
      function() {
        return (this.components.join(";") + ";").replace(/;;+/g, ";");
      }
    )
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The macro in question
     */
  }, {
    key: "rename",
    value: function(name) {
      return this.name = name, this;
    }
    /**
     * Creates a new Macro with a name other than the default name.
     * @param name The name to assign this macro.
     * @returns A new Macro with the assigned name.
     */
  }, {
    key: "save",
    value: (
      /**
       * Save a macro to a Mafia property for use in a consult script.
       */
      function() {
        _set(Macro2.SAVED_MACRO_PROPERTY, this.toString());
      }
    )
    /**
     * Load a saved macro from the Mafia property.
     */
  }, {
    key: "step",
    value: (
      /**
       * Statefully add one or several steps to a macro.
       * @param nextSteps The steps to add to the macro.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _ref, _this$components, _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++)
          nextSteps[_key] = arguments[_key];
        var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray2(nextSteps.map(function(x) {
          return x instanceof Macro2 ? x.components : [x];
        })));
        return (_this$components = this.components).push.apply(_this$components, _toConsumableArray2(nextStepsStrings.filter(function(s) {
          return s.length > 0;
        }))), this;
      }
    )
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "submit",
    value: (
      /**
       * Submit the built macro to KoL. Only works inside combat.
       */
      function() {
        var final = this.toString();
        return (0, import_kolmafia4.visitUrl)("fight.php?action=macro&macrotext=".concat((0, import_kolmafia4.urlEncode)(final)), !0, !0);
      }
    )
    /**
     * Set this macro as a KoL native autoattack.
     */
  }, {
    key: "setAutoAttack",
    value: function() {
      var id = Macro2.cachedMacroIds.get(this.name);
      id === void 0 && (id = getMacroId(this.name), Macro2.cachedMacroIds.set(this.name, id)), !((0, import_kolmafia4.getAutoAttack)() === 99e6 + id && this.toString() === Macro2.cachedAutoAttacks.get(this.name)) && ((0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0, import_kolmafia4.urlEncode)(this.name), "&macrotext=").concat((0, import_kolmafia4.urlEncode)(this.toString()), "&action=save"), !0, !0), (0, import_kolmafia4.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99e6 + id, "&ajax=1")), Macro2.cachedAutoAttacks.set(this.name, this.toString()));
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */
  }, {
    key: "setAutoAttackAs",
    value: function(name) {
      this.name = name, this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */
  }, {
    key: "abort",
    value: (
      /**
       * Add an "abort" step to this macro.
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("abort");
      }
    )
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "runaway",
    value: (
      /**
       * Add a "runaway" step to this macro.
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("runaway");
      }
    )
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "if_",
    value: (
      /**
       * Add an "if" statement to this macro.
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.step("if ".concat(Macro2.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
      }
    )
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifNot",
    value: (
      /**
       * Add an "if" statement to this macro, inverting the condition.
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.step("if !(".concat(Macro2.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
      }
    )
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "while_",
    value: (
      /**
       * Add a "while" statement to this macro.
       * @param condition The BALLS condition for the if statement.
       * @param contents Loop to repeat while the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, contents) {
        return this.step("while ".concat(condition)).step(contents).step("endwhile");
      }
    )
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "externalIf",
    value: (
      /**
       * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
       * @param condition The JS condition.
       * @param ifTrue Continuation to add if the condition is true.
       * @param ifFalse Optional input to turn this into an if...else statement.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue, ifFalse) {
        return condition ? this.step(ifTrue) : ifFalse ? this.step(ifFalse) : this;
      }
    )
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "repeat",
    value: (
      /**
       * Add a repeat step to the macro.
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("repeat");
      }
    )
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "skill",
    value: function() {
      for (var _len2 = arguments.length, skills2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        skills2[_key2] = arguments[_key2];
      return this.step.apply(this, _toConsumableArray2(skills2.map(function(skill3) {
        return "skill ".concat(skillBallsMacroName(skill3));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       * @param skills Skills to try casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len3 = arguments.length, skills2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
          skills2[_key3] = arguments[_key3];
        return this.step.apply(this, _toConsumableArray2(skills2.map(function(skill2) {
          return Macro2.if_("hasskill ".concat(skillBallsMacroName(skill2)), Macro2.skill(skill2));
        })));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       * @param skills Skills to try repeatedly casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len4 = arguments.length, skills2 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
          skills2[_key4] = arguments[_key4];
        return this.step.apply(this, _toConsumableArray2(skills2.map(function(skill2) {
          return Macro2.if_("hasskill ".concat(skillBallsMacroName(skill2)), Macro2.skill(skill2).repeat());
        })));
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)
          items[_key5] = arguments[_key5];
        return this.step.apply(this, _toConsumableArray2(items.map(function(itemOrItems) {
          return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)
          items[_key6] = arguments[_key6];
        return this.step.apply(this, _toConsumableArray2(items.map(function(item8) {
          return Macro2.if_(itemOrItemsBallsMacroPredicate(item8), "use ".concat(itemOrItemsBallsMacroName(item8)));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "attack",
    value: (
      /**
       * Add an attack step to the macro.
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("attack");
      }
    )
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
       * @param macro The macro to place in the if_ statement
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this : this.if_(todaysWanderers.map(function(monster) {
          return "monsterid ".concat(monster.id);
        }).join(" || "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */
  }, {
    key: "ifNotHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
       * @param macro The macro to place in the if_ statement.
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this.step(macro) : this.if_(todaysWanderers.map(function(monster) {
          return "!monsterid ".concat(monster.id);
        }).join(" && "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */
  }], [{
    key: "rename",
    value: function(name) {
      return new this().rename(name);
    }
  }, {
    key: "load",
    value: function() {
      var _this;
      return (_this = new this()).step.apply(_this, _toConsumableArray2(get(Macro2.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */
  }, {
    key: "clearSaved",
    value: function() {
      (0, import_kolmafia4.removeProperty)(Macro2.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function() {
      var _this2;
      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function() {
      var _iterator = _createForOfIteratorHelper3(Macro2.cachedAutoAttacks.keys()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _Macro$cachedMacroIds, name = _step.value, id = (_Macro$cachedMacroIds = Macro2.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1")), Macro2.cachedAutoAttacks.delete(name), Macro2.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function(condition) {
      var ballsCondition = "";
      if (condition instanceof import_kolmafia4.Monster)
        ballsCondition = "monsterid ".concat(condition.id);
      else if (condition instanceof Array)
        ballsCondition = condition.map(function(mon) {
          return "monsterid ".concat(mon.id);
        }).join(" || "), ballsCondition = "(".concat(ballsCondition, ")");
      else if (condition instanceof import_kolmafia4.Effect)
        ballsCondition = "haseffect ".concat((0, import_kolmafia4.toInt)(condition));
      else if (condition instanceof import_kolmafia4.Skill)
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      else if (condition instanceof import_kolmafia4.Item) {
        if (!condition.combat)
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof import_kolmafia4.Location) {
        var snarfblat = condition.id;
        if (snarfblat < 1)
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof import_kolmafia4.Class) {
        if ((0, import_kolmafia4.toInt)(condition) > 6)
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else
        condition instanceof import_kolmafia4.Stat ? ballsCondition = "".concat(condition.toString().toLowerCase(), "class") : ballsCondition = condition;
      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function() {
      var _this3;
      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this4;
      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this5;
      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this6;
      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this7;
      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]), Macro2;
}();
_defineProperty2(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");
_defineProperty2(Macro, "cachedMacroIds", /* @__PURE__ */ new Map());
_defineProperty2(Macro, "cachedAutoAttacks", /* @__PURE__ */ new Map());
function adventureMacro(loc, macro) {
  macro.save(), (0, import_kolmafia4.setAutoAttack)(0);
  try {
    for ((0, import_kolmafia4.adv1)(loc, 0, ""); (0, import_kolmafia4.inMultiFight)(); )
      (0, import_kolmafia4.runCombat)();
    (0, import_kolmafia4.choiceFollowsFight)() && (0, import_kolmafia4.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro, nextMacro = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort(), autoMacro.setAutoAttack(), nextMacro.save();
  try {
    for ((0, import_kolmafia4.adv1)(loc, 0, ""); (0, import_kolmafia4.inMultiFight)(); )
      (0, import_kolmafia4.runCombat)();
    (0, import_kolmafia4.choiceFollowsFight)() && (0, import_kolmafia4.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /* @__PURE__ */ function(_Macro) {
  _inherits2(StrictMacro2, _Macro);
  var _super2 = _createSuper2(StrictMacro2);
  function StrictMacro2() {
    return _classCallCheck3(this, StrictMacro2), _super2.apply(this, arguments);
  }
  return _createClass3(StrictMacro2, [{
    key: "skill",
    value: (
      /**
       * Add one or more skill cast steps to the macro.
       * @param skills Skills to cast.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get2, _len7 = arguments.length, skills2 = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)
          skills2[_key7] = arguments[_key7];
        return (_get2 = _get(_getPrototypeOf2(StrictMacro2.prototype), "skill", this)).call.apply(_get2, [this].concat(skills2));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get3, _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)
          items[_key8] = arguments[_key8];
        return (_get3 = _get(_getPrototypeOf2(StrictMacro2.prototype), "item", this)).call.apply(_get3, [this].concat(items));
      }
    )
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       * @param skills Skills to try casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get4, _len9 = arguments.length, skills2 = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)
          skills2[_key9] = arguments[_key9];
        return (_get4 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills2));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get5, _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++)
          items[_key10] = arguments[_key10];
        return (_get5 = _get(_getPrototypeOf2(StrictMacro2.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       * @param skills Skills to try repeatedly casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get6, _len11 = arguments.length, skills2 = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++)
          skills2[_key11] = arguments[_key11];
        return (_get6 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills2));
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
  }], [{
    key: "skill",
    value: function() {
      var _this8;
      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this9;
      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this10;
      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this11;
      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this12;
      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]), StrictMacro2;
}(Macro);

// src/maximize.ts
init_kolmafia_polyfill();
var import_kolmafia6 = require("kolmafia");

// src/logger.ts
init_kolmafia_polyfill();
var import_kolmafia5 = require("kolmafia"), _defaultHandlers;
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties4(Constructor.prototype, protoProps), staticProps && _defineProperties4(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty3(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var LogLevels;
(function(LogLevels2) {
  LogLevels2[LogLevels2.NONE = 0] = "NONE", LogLevels2[LogLevels2.ERROR = 1] = "ERROR", LogLevels2[LogLevels2.WARNING = 2] = "WARNING", LogLevels2[LogLevels2.INFO = 3] = "INFO", LogLevels2[LogLevels2.DEBUG = 4] = "DEBUG";
})(LogLevels || (LogLevels = {}));
var defaultHandlers = (_defaultHandlers = {}, _defineProperty3(_defaultHandlers, LogLevels.INFO, function(message) {
  (0, import_kolmafia5.printHtml)("<b>[Libram Info]</b> ".concat(message)), (0, import_kolmafia5.logprint)("[Libram] ".concat(message));
}), _defineProperty3(_defaultHandlers, LogLevels.WARNING, function(message) {
  (0, import_kolmafia5.printHtml)('<span style="background: orange; color: white;"><b>[Libram Warning]</b> '.concat(message, "</span>")), (0, import_kolmafia5.logprint)("[Libram] ".concat(message));
}), _defineProperty3(_defaultHandlers, LogLevels.ERROR, function(error2) {
  (0, import_kolmafia5.printHtml)('<span style="background: red; color: white;"><b>[Libram Error]</b> '.concat(error2.toString(), "</span>")), (0, import_kolmafia5.logprint)("[Libram] ".concat(error2));
}), _defineProperty3(_defaultHandlers, LogLevels.DEBUG, function(message) {
  (0, import_kolmafia5.printHtml)('<span style="background: red; color: white;"><b>[Libram Debug]</b> '.concat(message, "</span>")), (0, import_kolmafia5.logprint)("[Libram] ".concat(message));
}), _defaultHandlers), Logger = /* @__PURE__ */ function() {
  function Logger2() {
    _classCallCheck4(this, Logger2), _defineProperty3(this, "handlers", defaultHandlers);
  }
  return _createClass4(Logger2, [{
    key: "level",
    get: function() {
      return Logger2.currentLevel;
    }
  }, {
    key: "setLevel",
    value: function(level) {
      Logger2.currentLevel = level;
    }
  }, {
    key: "setHandler",
    value: function(level, callback) {
      this.handlers[level] = callback;
    }
  }, {
    key: "log",
    value: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function(level, message) {
        this.level >= level && this.handlers[level](message);
      }
    )
  }, {
    key: "info",
    value: function(message) {
      this.log(LogLevels.INFO, message);
    }
  }, {
    key: "warning",
    value: function(message) {
      this.log(LogLevels.WARNING, message);
    }
  }, {
    key: "error",
    value: function(message) {
      this.log(LogLevels.ERROR, message);
    }
  }, {
    key: "debug",
    value: function(message) {
      this.log(LogLevels.DEBUG, message);
    }
  }]), Logger2;
}();
_defineProperty3(Logger, "currentLevel", LogLevels.ERROR);
var logger_default = new Logger();

// src/maximize.ts
var _templateObject36, _templateObject211, _templateObject37, _templateObject42, _templateObject52, _templateObject62, _templateObject72, _templateObject82, _templateObject92, _templateObject102, _templateObject112, _templateObject122, _templateObject132, _templateObject142, _templateObject152, _templateObject162, _templateObject172, _templateObject182, _templateObject192, _templateObject202, _templateObject212, _templateObject222, _templateObject232, _templateObject242, _templateObject252, _templateObject262, _templateObject272, _templateObject282, _templateObject292, _templateObject302, _templateObject312, _templateObject322, _templateObject332, _templateObject342, _templateObject352, _templateObject362, _templateObject372, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject422, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;
function _slicedToArray4(arr, i) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray5(arr, i) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit4(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _defineProperties5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties5(Constructor.prototype, protoProps), staticProps && _defineProperties5(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _createForOfIteratorHelper4(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray5(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral3(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), !0).forEach(function(key) {
      _defineProperty4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray5(o, minLen);
  }
}
function _iterableToArray3(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;
  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(_toConsumableArray3(defaultOptions.forceEquip), _toConsumableArray3((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(_toConsumableArray3(defaultOptions.preventEquip), _toConsumableArray3((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(function(item8) {
      var _addendums$forceEquip2;
      return !defaultOptions.forceEquip.includes(item8) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item8));
    }),
    bonusEquip: new Map([].concat(_toConsumableArray3(defaultOptions.bonusEquip), _toConsumableArray3((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(_toConsumableArray3(defaultOptions.preventSlot), _toConsumableArray3((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: _objectSpread2(_objectSpread2({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}
var defaultMaximizeOptions = {
  updateOnFamiliarChange: !0,
  updateOnCanEquipChanged: !0,
  useOutfitCaching: !0,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: /* @__PURE__ */ new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: !1,
  modes: {}
};
function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
}
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"], modeableItems = {
  backupcamera: $item(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral3(["backup camera"]))),
  umbrella: $item(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral3(["unbreakable umbrella"]))),
  snowsuit: $item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral3(["Snow Suit"]))),
  edpiece: $item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral3(["The Crown of Ed the Undying"]))),
  retrocape: $item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral3(["unwrapped knock-off retro superhero cape"]))),
  parka: $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral3(["Jurassic Parka"])))
}, modeableState = {
  backupcamera: function() {
    return (0, import_kolmafia6.getProperty)("backupCameraMode");
  },
  umbrella: function() {
    return (0, import_kolmafia6.getProperty)("umbrellaState");
  },
  snowsuit: function() {
    return (0, import_kolmafia6.getProperty)("snowsuit");
  },
  edpiece: function() {
    return (0, import_kolmafia6.getProperty)("edPiece");
  },
  retrocape: function() {
    return (0, import_kolmafia6.getProperty)("retroCapeSuperhero") + " " + (0, import_kolmafia6.getProperty)("retroCapeWashingInstructions");
  },
  parka: function() {
    return (0, import_kolmafia6.getProperty)("parkaMode");
  }
};
function getCurrentModes() {
  var modes = {}, _iterator = _createForOfIteratorHelper4(modeableCommands), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var key = _step.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[key]) && (modes[key] = modeableState[key]());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return modes;
}
function applyModes(modes) {
  var _iterator2 = _createForOfIteratorHelper4(modeableCommands), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var command = _step2.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[command]) && modes[command] !== void 0 && modeableState[command]() !== modes[command] && (0, import_kolmafia6.cliExecute)(command + " " + modes[command]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
var cachedSlots = $slots(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral3(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"]))), CacheEntry = /* @__PURE__ */ _createClass5(function CacheEntry2(equipment, rider, familiar6, canEquipItemCount2, modes) {
  _classCallCheck5(this, CacheEntry2), _defineProperty4(this, "equipment", void 0), _defineProperty4(this, "rider", void 0), _defineProperty4(this, "familiar", void 0), _defineProperty4(this, "canEquipItemCount", void 0), _defineProperty4(this, "modes", void 0), this.equipment = equipment, this.rider = rider, this.familiar = familiar6, this.canEquipItemCount = canEquipItemCount2, this.modes = modes;
}), _outfitSlots = /* @__PURE__ */ new WeakMap(), _useHistory = /* @__PURE__ */ new WeakMap(), _maxSize = /* @__PURE__ */ new WeakMap(), OutfitLRUCache = /* @__PURE__ */ function() {
  function OutfitLRUCache2(maxSize) {
    _classCallCheck5(this, OutfitLRUCache2), _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: !0,
      value: []
    }), _classPrivateFieldInitSpec(this, _useHistory, {
      writable: !0,
      value: []
    }), _classPrivateFieldInitSpec(this, _maxSize, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maxSize, maxSize);
  }
  return _createClass5(OutfitLRUCache2, [{
    key: "checkConsistent",
    value: function() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !_toConsumableArray3(_classPrivateFieldGet(this, _useHistory)).sort().every(function(value, index) {
        return value === index;
      }))
        throw new Error("Outfit cache consistency failed.");
    }
  }, {
    key: "promote",
    value: function(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(_toConsumableArray3(_classPrivateFieldGet(this, _useHistory).filter(function(i) {
        return i !== index;
      })))), this.checkConsistent();
    }
  }, {
    key: "get",
    value: function(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);
      if (!(index < 0))
        return this.promote(index), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function(key) {
      var lastUseIndex = void 0;
      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        if (lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop(), lastUseIndex === void 0)
          throw new Error("Outfit cache consistency failed.");
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex), _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key, this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, index), this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function() {
      _classPrivateFieldSet(this, _outfitSlots, []), _classPrivateFieldSet(this, _useHistory, []);
    }
  }]), OutfitLRUCache2;
}();
_defineProperty4(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");
function saveOutfit(name) {
  (0, import_kolmafia6.cliExecute)("outfit save ".concat(name));
}
var cachedObjectives = {}, outfitCache = new OutfitLRUCache(6), cachedStats = [0, 0, 0], cachedCanEquipItemCount = 0;
function canEquipItemCount() {
  var stats = $stats(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral3(["Muscle, Mysticality, Moxie"]))).map(function(stat) {
    return Math.min((0, import_kolmafia6.myBasestat)(stat), 300);
  });
  return stats.every(function(value, index) {
    return value === cachedStats[index];
  }) || (cachedStats = stats, cachedCanEquipItemCount = import_kolmafia6.Item.all().filter(function(item8) {
    return (0, import_kolmafia6.canEquip)(item8);
  }).length), cachedCanEquipItemCount;
}
function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];
  return entry ? options.updateOnFamiliarChange && (0, import_kolmafia6.myFamiliar)() !== entry.familiar ? (logger_default.warning("Equipment found in maximize cache but familiar is different."), null) : options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount() ? (logger_default.warning("Equipment found in maximize cache but equippable item list is out of date."), null) : entry : null;
}
function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : void 0;
  if (outfitName) {
    (0, import_kolmafia6.isWearingOutfit)(outfitName) || (0, import_kolmafia6.outfit)(outfitName);
    var familiarEquip = entry.equipment.get($slot(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral3(["familiar"]))));
    familiarEquip && (0, import_kolmafia6.equip)($slot(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral3(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = _createForOfIteratorHelper4(entry.equipment), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray4(_step3.value, 2), slot = _step3$value[0], item8 = _step3$value[1];
        (0, import_kolmafia6.equippedItem)(slot) !== item8 && (0, import_kolmafia6.availableAmount)(item8) > 0 && (0, import_kolmafia6.equip)(slot, item8);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);
      logger_default.info("Saving equipment to outfit ".concat(_outfitName, ".")), saveOutfit(_outfitName);
    }
  }
  (0, import_kolmafia6.equippedAmount)($item(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral3(["Crown of Thrones"])))) && (0, import_kolmafia6.enthroneFamiliar)(entry.rider.get($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral3(["Crown of Thrones"])))) || $familiar.none), (0, import_kolmafia6.equippedAmount)($item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) && (0, import_kolmafia6.bjornifyFamiliar)(entry.rider.get($item(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) || $familiar.none), applyModes(_objectSpread2(_objectSpread2({}, entry.modes), options.modes));
}
var slotStructure = [$slots(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral3(["hat"]))), $slots(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral3(["back"]))), $slots(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral3(["shirt"]))), $slots(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral3(["weapon, off-hand"]))), $slots(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral3(["pants"]))), $slots(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral3(["acc1, acc2, acc3"]))), $slots(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral3(["familiar"])))];
function verifyCached(entry) {
  var warn2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, success = !0, _iterator4 = _createForOfIteratorHelper4(slotStructure), _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var slotGroup = _step4.value, desiredSlots = slotGroup.map(function(slot) {
        var _entry$equipment$get;
        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(function(_ref) {
        var _ref2 = _slicedToArray4(_ref, 2), item8 = _ref2[1];
        return item8 !== null;
      }), desiredSet = desiredSlots.map(function(_ref3) {
        var _ref4 = _slicedToArray4(_ref3, 2), item8 = _ref4[1];
        return item8;
      }), equippedSet = desiredSlots.map(function(_ref5) {
        var _ref6 = _slicedToArray4(_ref5, 1), slot = _ref6[0];
        return (0, import_kolmafia6.equippedItem)(slot);
      });
      setEqual(desiredSet, equippedSet) || (warn2 && logger_default.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), ".")), success = !1);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return (0, import_kolmafia6.equippedAmount)($item(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral3(["Crown of Thrones"])))) && entry.rider.get($item(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral3(["Crown of Thrones"])))) !== (0, import_kolmafia6.myEnthronedFamiliar)() && (warn2 && logger_default.warning("Failed to apply ".concat(entry.rider.get($item(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral3(["Crown of Thrones"])))), " in ").concat($item(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral3(["Crown of Thrones"]))), ".")), success = !1), (0, import_kolmafia6.equippedAmount)($item(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) && entry.rider.get($item(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) !== (0, import_kolmafia6.myBjornedFamiliar)() && (warn2 && logger_default.warning("Failed to apply".concat(entry.rider.get($item(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), " in ").concat($item(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral3(["Buddy Bjorn"]))), ".")), success = !1), success;
}
function saveCached(cacheKey, options) {
  var equipment = /* @__PURE__ */ new Map(), rider = /* @__PURE__ */ new Map(), _iterator5 = _createForOfIteratorHelper4(cachedSlots), _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0, import_kolmafia6.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if ((0, import_kolmafia6.equippedAmount)($item(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral3(["card sleeve"])))) > 0 && equipment.set($slot(_templateObject352 || (_templateObject352 = _taggedTemplateLiteral3(["card-sleeve"]))), (0, import_kolmafia6.equippedItem)($slot(_templateObject362 || (_templateObject362 = _taggedTemplateLiteral3(["card-sleeve"]))))), (0, import_kolmafia6.equippedAmount)($item(_templateObject372 || (_templateObject372 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && rider.set($item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral3(["Crown of Thrones"]))), (0, import_kolmafia6.myEnthronedFamiliar)()), (0, import_kolmafia6.equippedAmount)($item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && rider.set($item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral3(["Buddy Bjorn"]))), (0, import_kolmafia6.myBjornedFamiliar)()), options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = _createForOfIteratorHelper4(options.preventSlot), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral3(["buddy-bjorn"])))) && rider.delete($item(_templateObject422 || (_templateObject422 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral3(["crown-of-thrones"])))) && rider.delete($item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral3(["Crown of Thrones"]))));
  }
  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = _createForOfIteratorHelper4(import_kolmafia6.Slot.all()), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        var _slot = _step7.value;
        options.onlySlot.includes(_slot) || equipment.delete(_slot);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral3(["buddy-bjorn"])))) || rider.delete($item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral3(["crown-of-thrones"])))) || rider.delete($item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral3(["Crown of Thrones"]))));
  }
  var entry = new CacheEntry(equipment, rider, (0, import_kolmafia6.myFamiliar)(), canEquipItemCount(), _objectSpread2(_objectSpread2({}, getCurrentModes()), options.modes));
  if (cachedObjectives[cacheKey] = entry, options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger_default.info("Saving equipment to outfit ".concat(outfitName, ".")), saveOutfit(outfitName);
  }
}
function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options), forceEquip = fullOptions.forceEquip, preventEquip = fullOptions.preventEquip, bonusEquip = fullOptions.bonusEquip, onlySlot = fullOptions.onlySlot, preventSlot = fullOptions.preventSlot, forceUpdate = fullOptions.forceUpdate, objective = _toConsumableArray3(new Set([].concat(_toConsumableArray3(objectives.sort()), _toConsumableArray3(forceEquip.map(function(item8) {
    return "equip ".concat(item8);
  }).sort()), _toConsumableArray3(preventEquip.map(function(item8) {
    return "-equip ".concat(item8);
  }).sort()), _toConsumableArray3(onlySlot.map(function(slot) {
    return "".concat(slot);
  }).sort()), _toConsumableArray3(preventSlot.map(function(slot) {
    return "-".concat(slot);
  }).sort()), _toConsumableArray3(Array.from(bonusEquip.entries()).filter(function(_ref7) {
    var _ref8 = _slicedToArray4(_ref7, 2), bonus = _ref8[1];
    return bonus !== 0;
  }).map(function(_ref9) {
    var _ref10 = _slicedToArray4(_ref9, 2), item8 = _ref10[0], bonus = _ref10[1];
    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item8);
  }).sort())))).join(", "), untouchedSlots = cachedSlots.filter(function(slot) {
    return preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot);
  }), cacheKey = [objective].concat(_toConsumableArray3(untouchedSlots.map(function(slot) {
    return "".concat(slot, ":").concat((0, import_kolmafia6.equippedItem)(slot));
  }).sort())).join("; "), cacheEntry = checkCache(cacheKey, fullOptions);
  if (cacheEntry && !forceUpdate) {
    if (verifyCached(cacheEntry, !1))
      return !0;
    if (logger_default.info("Equipment found in maximize cache, equipping..."), applyCached(cacheEntry, fullOptions), verifyCached(cacheEntry))
      return logger_default.info("Equipped cached ".concat(cacheKey)), !0;
    logger_default.warning("Maximize cache application failed, maximizing...");
  }
  var result = (0, import_kolmafia6.maximize)(objective, !1);
  return saveCached(cacheKey, fullOptions), result;
}
var _maximizeParameters = /* @__PURE__ */ new WeakMap(), _maximizeOptions = /* @__PURE__ */ new WeakMap(), Requirement = /* @__PURE__ */ function() {
  function Requirement2(maximizeParameters, maximizeOptions) {
    _classCallCheck5(this, Requirement2), _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters), _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }
  return _createClass5(Requirement2, [{
    key: "maximizeParameters",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */
  }, {
    key: "merge",
    value: function(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot, optionsA = this.maximizeOptions, optionsB = other.maximizeOptions;
      return new Requirement2([].concat(_toConsumableArray3(this.maximizeParameters), _toConsumableArray3(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(_toConsumableArray3((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), _toConsumableArray3((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(function(x) {
          var _other$maximizeOption2;
          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(_toConsumableArray3((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), _toConsumableArray3((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(function(x) {
          var _other$maximizeOption4;
          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(_toConsumableArray3((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), _toConsumableArray3((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(_toConsumableArray3((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), _toConsumableArray3((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(_toConsumableArray3((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), _toConsumableArray3((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */
  }, {
    key: "maximize",
    value: (
      /**
       * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
       * @returns Whether the maximize call succeeded.
       */
      function() {
        return maximizeCached(this.maximizeParameters, this.maximizeOptions);
      }
    )
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */
  }], [{
    key: "merge",
    value: function(allRequirements) {
      return allRequirements.reduce(function(x, y) {
        return x.merge(y);
      }, new Requirement2([], {}));
    }
  }, {
    key: "maximize",
    value: function() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++)
        requirements[_key] = arguments[_key];
      Requirement2.merge(requirements).maximize();
    }
  }]), Requirement2;
}();
function clearMaximizerCache() {
  outfitCache.clear();
  for (var member in cachedObjectives)
    delete cachedObjectives[member];
}

// src/actions/ActionSource.ts
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties6(Constructor.prototype, protoProps), staticProps && _defineProperties6(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty5(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper5(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray6(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray6(o, minLen);
  }
}
function _iterableToArray4(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mergeConstraints() {
  for (var _len = arguments.length, allConstraints = new Array(_len), _key = 0; _key < _len; _key++)
    allConstraints[_key] = arguments[_key];
  var familiars = allConstraints.map(function(constraints) {
    return constraints.familiar;
  }).filter(function(familiar6) {
    return familiar6;
  });
  return familiars.length > 1 ? null : {
    equipmentRequirements: function() {
      return Requirement.merge(_toConsumableArray4(allConstraints.map(function(constraints) {
        var _constraints$equipmen, _constraints$equipmen2;
        return (_constraints$equipmen = (_constraints$equipmen2 = constraints.equipmentRequirements) === null || _constraints$equipmen2 === void 0 ? void 0 : _constraints$equipmen2.call(constraints)) !== null && _constraints$equipmen !== void 0 ? _constraints$equipmen : new Requirement([], {});
      })));
    },
    preparation: function() {
      var success = !0, _iterator = _createForOfIteratorHelper5(allConstraints), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var constraints = _step.value;
          success = success && (!constraints.preparation || constraints.preparation());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return success;
    },
    familiar: familiars.find(function(familiar6) {
      return familiar6;
    }),
    cost: function() {
      return sum(allConstraints, function(constraints) {
        var _constraints$cost, _constraints$cost2;
        return (_constraints$cost = (_constraints$cost2 = constraints.cost) === null || _constraints$cost2 === void 0 ? void 0 : _constraints$cost2.call(constraints)) !== null && _constraints$cost !== void 0 ? _constraints$cost : 0;
      });
    }
  };
}
var ActionSource = /* @__PURE__ */ function() {
  function ActionSource2(source, potential, macro) {
    var constraints = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    _classCallCheck6(this, ActionSource2), _defineProperty5(this, "source", void 0), _defineProperty5(this, "potential", void 0), _defineProperty5(this, "macro", void 0), _defineProperty5(this, "constraints", void 0), this.source = source, this.potential = potential, this.macro = macro, this.constraints = constraints;
  }
  return _createClass6(ActionSource2, [{
    key: "name",
    value: function() {
      return this.source.toString();
    }
    /**
     * @returns Whether the action is available.
     */
  }, {
    key: "available",
    value: function() {
      return this.potential() > 0;
    }
    /**
     * @returns Cost in meat per usage of the action.
     */
  }, {
    key: "cost",
    value: function() {
      return this.constraints.cost ? this.constraints.cost() : 0;
    }
    /**
     * @returns Whether the action costs 0 meat to use.
     */
  }, {
    key: "isFree",
    value: function() {
      return !this.cost || this.cost() === 0;
    }
    /**
     * @returns Whether unlimited uses of the action are available.
     */
  }, {
    key: "isUnlimited",
    value: function() {
      return this.potential() === 1 / 0;
    }
    /**
     * Create a compound action source with merged constraints.
     * @param others Other actions to have available.
     * @returns Merged constraints, or null if they are inconsistent.
     */
  }, {
    key: "merge",
    value: function() {
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        others[_key2] = arguments[_key2];
      var actions = [this].concat(others), constraints = mergeConstraints.apply(void 0, _toConsumableArray4(actions.map(function(action) {
        return action.constraints;
      })));
      return constraints === null ? null : new ActionSource2(_toConsumableArray4(actions.map(function(action) {
        return action.source;
      }).flat()), function() {
        return sum(actions, function(action) {
          return action.potential();
        });
      }, Macro.step.apply(Macro, _toConsumableArray4(actions.map(function(action) {
        return action.macro;
      }))), constraints);
    }
    /**
     * Perform all preparation necessary to make this action available.
     * @param otherRequirements Any other equipment requirements.
     * @returns Whether preparation succeeded.
     */
  }, {
    key: "prepare",
    value: function(otherRequirements) {
      var _this$constraints$fam, _this$constraints;
      if ((_this$constraints$fam = (_this$constraints = this.constraints).familiar) !== null && _this$constraints$fam !== void 0 && _this$constraints$fam.call(_this$constraints) && !(0, import_kolmafia7.useFamiliar)(this.constraints.familiar()))
        return !1;
      if (this.constraints.equipmentRequirements) {
        var requirement = otherRequirements ? otherRequirements.merge(this.constraints.equipmentRequirements()) : this.constraints.equipmentRequirements();
        if (!requirement.maximize())
          return !1;
      }
      return this.constraints.preparation ? this.constraints.preparation() : !0;
    }
    /**
     * Perform all preparation necessary to make this action available.
     * Throws an error if preparation fails.
     * @param otherRequirements Any other equipment requirements.
     */
  }, {
    key: "ensure",
    value: function(otherRequirements) {
      if (!this.prepare(otherRequirements))
        throw new Error("Failed to prepare action ".concat(this.name(), "."));
    }
  }]), ActionSource2;
}();
_defineProperty5(ActionSource, "defaultPriceFunction", function(item8) {
  return (0, import_kolmafia7.mallPrice)(item8) > 0 ? (0, import_kolmafia7.mallPrice)(item8) : 1 / 0;
});
function filterAction(action, constraints) {
  var _constraints$requireF, _constraints$requireU, _constraints$noFamili, _constraints$noRequir, _constraints$noPrepar, _constraints$maximumC, _constraints$maximumC2;
  return action.available() && (constraints.allowedAction === void 0 || constraints.allowedAction(action)) && !((_constraints$requireF = constraints.requireFamiliar) !== null && _constraints$requireF !== void 0 && _constraints$requireF.call(constraints) && !action.constraints.familiar) && !((_constraints$requireU = constraints.requireUnlimited) !== null && _constraints$requireU !== void 0 && _constraints$requireU.call(constraints) && !action.isUnlimited()) && !((_constraints$noFamili = constraints.noFamiliar) !== null && _constraints$noFamili !== void 0 && _constraints$noFamili.call(constraints) && action.constraints.familiar) && !((_constraints$noRequir = constraints.noRequirements) !== null && _constraints$noRequir !== void 0 && _constraints$noRequir.call(constraints) && action.constraints.equipmentRequirements) && !((_constraints$noPrepar = constraints.noPreparation) !== null && _constraints$noPrepar !== void 0 && _constraints$noPrepar.call(constraints) && action.constraints.preparation) && action.cost() <= ((_constraints$maximumC = (_constraints$maximumC2 = constraints.maximumCost) === null || _constraints$maximumC2 === void 0 ? void 0 : _constraints$maximumC2.call(constraints)) !== null && _constraints$maximumC !== void 0 ? _constraints$maximumC : 0);
}
function findActionSource(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, validActions = actions.filter(function(actions2) {
    return filterAction(actions2, constraints);
  });
  return validActions.length < 1 ? null : validActions.reduce(function(a, b) {
    return a.cost() <= b.cost() ? a : b;
  });
}
function actionSourcesAvailable(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return sum(actions.filter(function(action) {
    return filterAction(action, constraints != null ? constraints : {});
  }), function(action) {
    return action.potential();
  });
}

// src/actions/FreeKill.ts
init_kolmafia_polyfill();
var import_kolmafia9 = require("kolmafia");

// src/resources/2017/AsdonMartin.ts
var AsdonMartin_exports = {};
__export(AsdonMartin_exports, {
  Driving: function() {
    return Driving;
  },
  drive: function() {
    return drive;
  },
  fillTo: function() {
    return fillTo;
  },
  fillWithInventoryTo: function() {
    return fillWithInventoryTo;
  },
  have: function() {
    return have2;
  },
  insertFuel: function() {
    return insertFuel;
  },
  installed: function() {
    return installed;
  }
});
init_kolmafia_polyfill();

// node_modules/core-js/modules/es.object.values.js
init_kolmafia_polyfill();
var $3 = require_export(), $values = require_object_to_array().values;
$3({
  target: "Object",
  stat: !0
}, {
  values: function(O) {
    return $values(O);
  }
});

// src/resources/2017/AsdonMartin.ts
var import_kolmafia8 = require("kolmafia");
var _templateObject49, _templateObject213, _templateObject310, _templateObject410, _templateObject53, _templateObject63, _templateObject73, _templateObject83, _templateObject93, _templateObject103, _templateObject113, _templateObject123, _templateObject133;
function _slicedToArray5(arr, i) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray7(arr, i) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray7(o, minLen);
  }
}
function _arrayLikeToArray7(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit5(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral4(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var PriceAge;
(function(PriceAge2) {
  PriceAge2[PriceAge2.HISTORICAL = 0] = "HISTORICAL", PriceAge2[PriceAge2.RECENT = 1] = "RECENT", PriceAge2[PriceAge2.TODAY = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));
function installed() {
  return (0, import_kolmafia8.getWorkshed)() === $item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral4(["Asdon Martin keyfob"])));
}
function have2() {
  return installed() || have($item(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral4(["Asdon Martin keyfob"]))));
}
var fuelSkiplist = $items(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral4(['cup of "tea", thermos of "whiskey", Lucky Lindy, Bee\'s Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"'])));
function priceTooOld(item8) {
  return (0, import_kolmafia8.historicalPrice)(item8) === 0 || (0, import_kolmafia8.historicalAge)(item8) >= 7;
}
function historicalPriceOrMax(item8) {
  var historical = (0, import_kolmafia8.historicalPrice)(item8);
  return historical < 0 ? 999999999 : historical;
}
function mallPriceOrMax(item8) {
  var mall = (0, import_kolmafia8.mallPrice)(item8);
  return mall < 0 ? 999999999 : mall;
}
function price(item8, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL: {
      var historical = historicalPriceOrMax(item8);
      return historical === 0 ? mallPriceOrMax(item8) : historical;
    }
    case PriceAge.RECENT:
      return priceTooOld(item8) ? mallPriceOrMax(item8) : historicalPriceOrMax(item8);
    case PriceAge.TODAY:
      return mallPriceOrMax(item8);
  }
}
function inventoryItems() {
  return import_kolmafia8.Item.all().filter(isFuelItem).filter(function(item8) {
    return have(item8) && [100, (0, import_kolmafia8.autosellPrice)(item8)].includes(price(item8, PriceAge.RECENT));
  });
}
function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : PriceAge.RECENT, units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}
function isFuelItem(it) {
  return !(0, import_kolmafia8.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}
function getBestFuels() {
  var allFuel = import_kolmafia8.Item.all().filter(isFuelItem);
  allFuel.filter(function(item8) {
    return (0, import_kolmafia8.historicalPrice)(item8) === 0;
  }).length > 100 && ((0, import_kolmafia8.mallPrices)("food"), (0, import_kolmafia8.mallPrices)("booze"));
  var keyHistorical = function(item8) {
    return calculateFuelUnitCost(item8, PriceAge.HISTORICAL);
  };
  allFuel.sort(function(x, y) {
    return keyHistorical(x) - keyHistorical(y);
  });
  var bestUnitCost = keyHistorical(allFuel[0]), firstBadIndex = allFuel.findIndex(function(item8) {
    return keyHistorical(item8) > 5 * bestUnitCost;
  }), potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel;
  potentialFuel.filter(function(item8) {
    return priceTooOld(item8);
  }).length > 100 && ((0, import_kolmafia8.mallPrices)("food"), (0, import_kolmafia8.mallPrices)("booze"));
  var key1 = function(item8) {
    return -getAverageAdventures(item8);
  }, key2 = function(item8) {
    return calculateFuelUnitCost(item8, PriceAge.RECENT);
  };
  potentialFuel.sort(function(x, y) {
    return key1(x) - key1(y);
  }), potentialFuel.sort(function(x, y) {
    return key2(x) - key2(y);
  });
  var candidates = potentialFuel.slice(0, 10), key3 = function(item8) {
    return calculateFuelUnitCost(item8, PriceAge.TODAY);
  };
  if (candidates.sort(function(x, y) {
    return key3(x) - key3(y);
  }), calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100)
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. This means something went wrong.");
  return candidates;
}
function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, result = (0, import_kolmafia8.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0, import_kolmafia8.toInt)(it), "&go=Convert%21"));
  return result.includes("The display updates with a");
}
function fillTo(targetUnits) {
  if (!installed())
    return !1;
  for (; (0, import_kolmafia8.getFuel)() < targetUnits; ) {
    var _ref = (0, import_kolmafia8.canInteract)() ? getBestFuels() : [$item(_templateObject410 || (_templateObject410 = _taggedTemplateLiteral4(["loaf of soda bread"]))), void 0], _ref2 = _slicedToArray5(_ref, 2), bestFuel = _ref2[0], secondBest = _ref2[1], count = Math.ceil(targetUnits / getAverageAdventures(bestFuel)), ceiling = void 0;
    if (secondBest) {
      var efficiencyOfSecondBest = (0, import_kolmafia8.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }
    if ((0, import_kolmafia8.canInteract)() ? ceiling ? (0, import_kolmafia8.buy)(count, bestFuel, ceiling) : (0, import_kolmafia8.buy)(count, bestFuel) : (0, import_kolmafia8.retrieveItem)(count, bestFuel), !insertFuel(bestFuel, Math.min((0, import_kolmafia8.itemAmount)(bestFuel), count)))
      throw new Error("Failed to fuel Asdon Martin.");
  }
  return (0, import_kolmafia8.getFuel)() >= targetUnits;
}
function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort(function(a, b) {
    return getAverageAdventures(b) / (0, import_kolmafia8.autosellPrice)(b) - getAverageAdventures(a) / (0, import_kolmafia8.autosellPrice)(a);
  });
  if (options.length === 0)
    return !1;
  var best = options[0];
  if ((0, import_kolmafia8.autosellPrice)(best) / getAverageAdventures(best) > 100)
    return !1;
  var amountToUse = clamp(Math.ceil(targetUnits / getAverageAdventures(best)), 0, (0, import_kolmafia8.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
function fillWithInventoryTo(targetUnits) {
  if (!installed())
    return !1;
  for (var continueFuelingFromInventory = !0; (0, import_kolmafia8.getFuel)() < targetUnits && continueFuelingFromInventory; )
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  return fillTo(targetUnits);
}
var Driving = {
  Obnoxiously: $effect(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral4(["Driving Obnoxiously"]))),
  Stealthily: $effect(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral4(["Driving Stealthily"]))),
  Wastefully: $effect(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral4(["Driving Wastefully"]))),
  Safely: $effect(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral4(["Driving Safely"]))),
  Recklessly: $effect(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral4(["Driving Recklessly"]))),
  Intimidatingly: $effect(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral4(["Driving Intimidatingly"]))),
  Quickly: $effect(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral4(["Driving Quickly"]))),
  Observantly: $effect(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral4(["Driving Observantly"]))),
  Waterproofly: $effect(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral4(["Driving Waterproofly"])))
};
function drive(style) {
  var turns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, preferInventory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!Object.values(Driving).includes(style) || !installed())
    return !1;
  if ((0, import_kolmafia8.haveEffect)(style) >= turns)
    return !0;
  var fuelNeeded = 37 * Math.ceil((turns - (0, import_kolmafia8.haveEffect)(style)) / 30);
  for ((preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded); (0, import_kolmafia8.getFuel)() >= 37 && (0, import_kolmafia8.haveEffect)(style) < turns; )
    (0, import_kolmafia8.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  return (0, import_kolmafia8.haveEffect)(style) >= turns;
}

// src/actions/FreeKill.ts
var _templateObject50, _templateObject214, _templateObject311, _templateObject411, _templateObject54, _templateObject64, _templateObject74, _templateObject84, _templateObject94, _templateObject104, _templateObject114, _templateObject124, _templateObject134, _templateObject143, _templateObject153, _templateObject163, _templateObject173, _templateObject183, _templateObject193, _templateObject203, _templateObject215, _templateObject223, _templateObject233, _templateObject243, _templateObject253, _templateObject263, _templateObject273, _templateObject283, _templateObject293, _templateObject303, _templateObject313, _templateObject323, _templateObject333, _templateObject343, _templateObject353, _templateObject363, _templateObject373, _templateObject382, _templateObject392, _templateObject402, _templateObject412, _templateObject423, _templateObject432, _templateObject442, _templateObject452;
function _taggedTemplateLiteral5(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray8(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray8(o, minLen);
  }
}
function _iterableToArray5(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray8(arr);
}
function _arrayLikeToArray8(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var freeKillSources = [
  // Free limited sources
  new ActionSource($skill(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"]))), function() {
    return !get("_gingerbreadMobHitUsed") && have($skill(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"])))) ? 1 : 0;
  }, Macro.skill($skill(_templateObject311 || (_templateObject311 = _taggedTemplateLiteral5(["Gingerbread Mob Hit"])))), {
    preparation: function() {
      return (0, import_kolmafia9.restoreMp)(30);
    }
  }),
  new ActionSource($skill(_templateObject411 || (_templateObject411 = _taggedTemplateLiteral5(["Shattering Punch"]))), function() {
    return have($skill(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral5(["Shattering Punch"])))) ? 3 - get("_shatteringPunchUsed") : 0;
  }, Macro.skill($skill(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral5(["Shattering Punch"])))), {
    preparation: function() {
      return (0, import_kolmafia9.restoreMp)(30);
    }
  }),
  new ActionSource($item(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral5(["replica bat-oomerang"]))), function() {
    return have($item(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral5(["replica bat-oomerang"])))) ? 3 - get("_usedReplicaBatoomerang") : 0;
  }, Macro.item($item(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral5(["replica bat-oomerang"]))))),
  new ActionSource($item(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral5(["The Jokester's gun"]))), function() {
    return !get("_firedJokestersGun") && have($item(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral5(["The Jokester's gun"])))) && (0, import_kolmafia9.canEquip)($item(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral5(["The Jokester's gun"])))) ? 1 : 0;
  }, Macro.skill($skill(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral5(["Fire the Jokester's Gun"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral5(["The Jokester's gun"])))
      });
    }
  }),
  new ActionSource($item(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"]))), function() {
    return have($item(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_chestXRayUsed") : 0;
  }, Macro.skill($skill(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral5(["Chest X-Ray"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral5(["Lil' Doctor\u2122 bag"])))
      });
    }
  }),
  new ActionSource($skill(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral5(["Asdon Martin: Missile Launcher"]))), function() {
    return !get("_missileLauncherUsed") && installed() ? 1 : 0;
  }, Macro.skill($skill(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral5(["Asdon Martin: Missile Launcher"])))), {
    preparation: function() {
      return fillTo(100);
    }
  }),
  // Heavy Rains
  new ActionSource($skill(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral5(["Lightning Strike"]))), function() {
    return have($skill(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral5(["Lightning Strike"])))) ? Math.floor((0, import_kolmafia9.myLightning)() / 20) : 0;
  }, Macro.skill($skill(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral5(["Lightning Strike"]))))),
  // Expensive limited sources
  new ActionSource($item(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral5(["powdered madness"]))), function() {
    return 5 - get("_powderedMadnessUses");
  }, Macro.item($item(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral5(["powdered madness"])))), {
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)($item(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral5(["powdered madness"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral5(["powdered madness"]))));
    }
  }),
  new ActionSource($familiar(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral5(["Puck Man"]))), function() {
    return have($familiar(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral5(["Puck Man"])))) ? 20 - get("_powerPillUses") : 0;
  }, Macro.item($item(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral5(["power pill"])))), {
    familiar: function() {
      return $familiar(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral5(["Puck Man"])));
    },
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)($item(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral5(["power pill"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral5(["power pill"]))));
    }
  }),
  new ActionSource($familiar(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral5(["Ms. Puck Man"]))), function() {
    return have($familiar(_templateObject353 || (_templateObject353 = _taggedTemplateLiteral5(["Ms. Puck Man"])))) ? 20 - get("_powerPillUses") : 0;
  }, Macro.item($item(_templateObject363 || (_templateObject363 = _taggedTemplateLiteral5(["power pill"])))), {
    familiar: function() {
      return $familiar(_templateObject373 || (_templateObject373 = _taggedTemplateLiteral5(["Ms. Puck Man"])));
    },
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)($item(_templateObject382 || (_templateObject382 = _taggedTemplateLiteral5(["power pill"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject392 || (_templateObject392 = _taggedTemplateLiteral5(["power pill"]))));
    }
  }),
  // Expensive unlimited sources
  new ActionSource($skill(_templateObject402 || (_templateObject402 = _taggedTemplateLiteral5(["Shocking Lick"]))), function() {
    return 1 / 0;
  }, Macro.skill($skill(_templateObject412 || (_templateObject412 = _taggedTemplateLiteral5(["Shocking Lick"])))), {
    preparation: function() {
      return get("shockingLickCharges") === 0 && (0, import_kolmafia9.retrieveItem)($item(_templateObject423 || (_templateObject423 = _taggedTemplateLiteral5(["battery (9-Volt)"])))) && (0, import_kolmafia9.use)($item(_templateObject432 || (_templateObject432 = _taggedTemplateLiteral5(["battery (9-Volt)"])))), get("shockingLickCharges") > 0;
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject442 || (_templateObject442 = _taggedTemplateLiteral5(["battery (AAA)"])))) * 4;
    }
  })
].concat(_toConsumableArray5($items(_templateObject452 || (_templateObject452 = _taggedTemplateLiteral5(["Daily Affirmation: Think Win-Lose, superduperheated metal"]))).map(function(item8) {
  return new ActionSource(item8, function() {
    return 1 / 0;
  }, Macro.item(item8), {
    preparation: function() {
      return (0, import_kolmafia9.retrieveItem)(item8);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item8);
    }
  });
})));
function tryFindFreeKill(constraints) {
  return findActionSource(freeKillSources, constraints);
}
function ensureFreeKill(constraints) {
  var source = tryFindFreeKill(constraints);
  if (!source)
    throw new Error("Failed to ensure Free Kill source");
  return source;
}

// src/actions/FreeRun.ts
init_kolmafia_polyfill();
var import_kolmafia12 = require("kolmafia");

// src/resources/2009/Bandersnatch.ts
var Bandersnatch_exports = {};
__export(Bandersnatch_exports, {
  canRunaway: function() {
    return canRunaway;
  },
  couldRunaway: function() {
    return couldRunaway;
  },
  familiar: function() {
    return familiar;
  },
  getMaxRunaways: function() {
    return getMaxRunaways;
  },
  getRemainingRunaways: function() {
    return getRemainingRunaways;
  },
  getRunaways: function() {
    return getRunaways;
  },
  have: function() {
    return have3;
  },
  prepareRunaway: function() {
    return prepareRunaway;
  }
});
init_kolmafia_polyfill();
var import_kolmafia10 = require("kolmafia");
var _templateObject51, _templateObject216, _templateObject314;
function _createForOfIteratorHelper6(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray9(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray9(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray9(o, minLen);
  }
}
function _arrayLikeToArray9(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral6(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar = $familiar(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral6(["Frumious Bandersnatch"])));
function have3() {
  return have(familiar);
}
function getRunaways() {
  return get("_banderRunaways");
}
function getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, weightBuffs = considerWeightAdjustment ? (0, import_kolmafia10.weightAdjustment)() : 0;
  return Math.floor(((0, import_kolmafia10.familiarWeight)(familiar) + weightBuffs) / 5);
}
function getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}
function couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have3() && getRemainingRunaways(considerWeightAdjustment) > 0;
}
var odeSkill = $skill(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral6(["The Ode to Booze"]))), odeEffect = $effect(_templateObject314 || (_templateObject314 = _taggedTemplateLiteral6(["Ode to Booze"])));
function canRunaway() {
  return isCurrentFamiliar(familiar) && couldRunaway() && have(odeEffect);
}
function prepareRunaway(songsToRemove) {
  if (!have(odeEffect)) {
    if (!have(odeSkill))
      return !1;
    if (!canRememberSong()) {
      var activeSongs = getActiveSongs(), _iterator = _createForOfIteratorHelper6(songsToRemove), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var song2 = _step.value;
          if (activeSongs.includes(song2) && uneffect(song2))
            break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    if (!(0, import_kolmafia10.useSkill)(odeSkill))
      return !1;
  }
  return (0, import_kolmafia10.useFamiliar)(familiar);
}

// src/resources/2011/StompingBoots.ts
var StompingBoots_exports = {};
__export(StompingBoots_exports, {
  canRunaway: function() {
    return canRunaway2;
  },
  couldRunaway: function() {
    return couldRunaway2;
  },
  familiar: function() {
    return familiar2;
  },
  getMaxRunaways: function() {
    return getMaxRunaways2;
  },
  getRemainingRunaways: function() {
    return getRemainingRunaways2;
  },
  getRunaways: function() {
    return getRunaways2;
  },
  have: function() {
    return have4;
  },
  prepareRunaway: function() {
    return prepareRunaway2;
  }
});
init_kolmafia_polyfill();
var import_kolmafia11 = require("kolmafia");
var _templateObject55;
function _taggedTemplateLiteral7(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar2 = $familiar(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral7(["Pair of Stomping Boots"])));
function have4() {
  return have(familiar2);
}
function getRunaways2() {
  return get("_banderRunaways");
}
function getMaxRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, weightBuffs = considerWeightAdjustment ? (0, import_kolmafia11.weightAdjustment)() : 0;
  return Math.floor(((0, import_kolmafia11.familiarWeight)(familiar2) + weightBuffs) / 5);
}
function getRemainingRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways2(considerWeightAdjustment) - getRunaways2());
}
function couldRunaway2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have4() && getRemainingRunaways2(considerWeightAdjustment) > 0;
}
function canRunaway2() {
  return isCurrentFamiliar(familiar2) && couldRunaway2();
}
function prepareRunaway2() {
  return (0, import_kolmafia11.useFamiliar)(familiar2);
}

// src/actions/FreeRun.ts
var _templateObject56, _templateObject217, _templateObject315, _templateObject413, _templateObject57, _templateObject65, _templateObject75, _templateObject85, _templateObject95, _templateObject105, _templateObject115, _templateObject125, _templateObject135, _templateObject144, _templateObject154, _templateObject164, _templateObject174, _templateObject184, _templateObject194, _templateObject204, _templateObject218, _templateObject224, _templateObject234, _templateObject244, _templateObject254, _templateObject264, _templateObject274, _templateObject284, _templateObject294, _templateObject304, _templateObject316, _templateObject324, _templateObject334, _templateObject344, _templateObject354, _templateObject364, _templateObject374, _templateObject383, _templateObject393, _templateObject403, _templateObject414, _templateObject424, _templateObject433, _templateObject443, _templateObject453, _templateObject462, _templateObject472, _templateObject482, _templateObject492, _templateObject502, _templateObject512, _templateObject522, _templateObject532, _templateObject542, _templateObject552, _templateObject562, _templateObject572, _templateObject58;
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray10(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray10(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray10(o, minLen);
  }
}
function _iterableToArray6(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray10(arr);
}
function _arrayLikeToArray10(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral8(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var scrapbookChargesLastUpdated = get("_lastCombatStarted"), asdonMartinSource = new ActionSource($skill(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral8(["Asdon Martin: Spring-Loaded Front Bumper"]))), function() {
  if (!installed())
    return 0;
  var banishes = get("banishedMonsters").split(":"), bumperIndex = banishes.map(function(string) {
    return string.toLowerCase();
  }).indexOf("spring-loaded front bumper");
  return bumperIndex === -1 || (0, import_kolmafia12.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
}, Macro.trySkill($skill(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral8(["Asdon Martin: Spring-Loaded Front Bumper"])))), {
  preparation: function() {
    return fillTo(50);
  }
}), freeRunSources = [
  // Free limited sources
  new ActionSource(familiar, function() {
    return (have($effect(_templateObject315 || (_templateObject315 = _taggedTemplateLiteral8(["Ode to Booze"])))) || getSongCount() < getSongLimit()) && couldRunaway() ? getRemainingRunaways() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    preparation: function() {
      return ensureEffect($effect(_templateObject413 || (_templateObject413 = _taggedTemplateLiteral8(["Ode to Booze"])))), have($effect(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral8(["Ode to Booze"]))));
    },
    familiar: function() {
      return familiar;
    }
  }),
  new ActionSource(familiar2, function() {
    return couldRunaway2() ? getRemainingRunaways2() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    familiar: function() {
      return familiar2;
    }
  }),
  new ActionSource($skill(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral8(["Snokebomb"]))), function() {
    return have($skill(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral8(["Snokebomb"])))) ? 3 - get("_snokebombUsed") : 0;
  }, Macro.skill($skill(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral8(["Snokebomb"])))), {
    preparation: function() {
      return (0, import_kolmafia12.restoreMp)(50);
    }
  }),
  new ActionSource($skill(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral8(["Emotionally Chipped"]))), function() {
    return have($skill(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral8(["Emotionally Chipped"])))) ? 3 - get("_feelHatredUsed") : 0;
  }, Macro.skill($skill(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral8(["Feel Hatred"]))))),
  new ActionSource($item(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral8(["Kremlin's Greatest Briefcase"]))), function() {
    return have($item(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral8(["Kremlin's Greatest Briefcase"])))) ? 3 - get("_kgbTranquilizerDartUses") : 0;
  }, Macro.skill($skill(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral8(["KGB tranquilizer dart"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral8(["Kremlin's Greatest Briefcase"])))
      });
    }
  }),
  new ActionSource($item(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral8(["latte lovers member's mug"]))), function() {
    return have($item(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral8(["latte lovers member's mug"])))) && !get("_latteBanishUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral8(["Throw Latte on Opponent"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral8(["latte lovers member's mug"])))
      });
    }
  }),
  new ActionSource($item(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral8(["Lil' Doctor\u2122 bag"]))), function() {
    return have($item(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral8(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_reflexHammerUsed") : 0;
  }, Macro.skill($skill(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral8(["Reflex Hammer"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral8(["Lil' Doctor\u2122 bag"])))
      });
    }
  }),
  new ActionSource($item(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral8(["mafia middle finger ring"]))), function() {
    return have($item(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral8(["mafia middle finger ring"])))) && (0, import_kolmafia12.canEquip)($item(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral8(["mafia middle finger ring"])))) && !get("_mafiaMiddleFingerRingUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral8(["Show them your ring"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral8(["mafia middle finger ring"])))
      });
    }
  }),
  new ActionSource($item(_templateObject294 || (_templateObject294 = _taggedTemplateLiteral8(["V for Vivala mask"]))), function() {
    return have($item(_templateObject304 || (_templateObject304 = _taggedTemplateLiteral8(["V for Vivala mask"])))) && !get("_vmaskBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject316 || (_templateObject316 = _taggedTemplateLiteral8(["Creepy Grin"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject324 || (_templateObject324 = _taggedTemplateLiteral8(["V for Vivala mask"])))
      });
    },
    preparation: function() {
      return (0, import_kolmafia12.restoreMp)(30);
    }
  }),
  new ActionSource($item(_templateObject334 || (_templateObject334 = _taggedTemplateLiteral8(["stinky cheese eye"]))), function() {
    return getFoldGroup($item(_templateObject344 || (_templateObject344 = _taggedTemplateLiteral8(["stinky cheese eye"])))).some(function(item8) {
      return have(item8);
    }) && !get("_stinkyCheeseBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject354 || (_templateObject354 = _taggedTemplateLiteral8(["Give Your Opponent the Stinkeye"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject364 || (_templateObject364 = _taggedTemplateLiteral8(["stinky cheese eye"])))
      });
    },
    preparation: function() {
      return have($item(_templateObject374 || (_templateObject374 = _taggedTemplateLiteral8(["stinky cheese eye"])))) || (0, import_kolmafia12.cliExecute)("fold stinky cheese eye"), have($item(_templateObject383 || (_templateObject383 = _taggedTemplateLiteral8(["stinky cheese eye"]))));
    }
  }),
  new ActionSource($item(_templateObject393 || (_templateObject393 = _taggedTemplateLiteral8(["navel ring of navel gazing"]))), function() {
    return have($item(_templateObject403 || (_templateObject403 = _taggedTemplateLiteral8(["navel ring of navel gazing"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject414 || (_templateObject414 = _taggedTemplateLiteral8(["navel ring of navel gazing"])))
      });
    }
  }),
  new ActionSource($item(_templateObject424 || (_templateObject424 = _taggedTemplateLiteral8(["Greatest American Pants"]))), function() {
    return have($item(_templateObject433 || (_templateObject433 = _taggedTemplateLiteral8(["Greatest American Pants"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject443 || (_templateObject443 = _taggedTemplateLiteral8(["Greatest American Pants"])))
      });
    }
  }),
  new ActionSource($skill(_templateObject453 || (_templateObject453 = _taggedTemplateLiteral8(["Show your boring familiar pictures"]))), function() {
    return have($item(_templateObject462 || (_templateObject462 = _taggedTemplateLiteral8(["familiar scrapbook"])))) ? (scrapbookChargesLastUpdated !== get("_lastCombatStarted") && ((0, import_kolmafia12.visitUrl)("desc_item.php?whichitem=463063785"), scrapbookChargesLastUpdated = get("_lastCombatStarted")), Math.floor(get("scrapbookCharges") / 100)) : 0;
  }, Macro.skill($skill(_templateObject472 || (_templateObject472 = _taggedTemplateLiteral8(["Show your boring familiar pictures"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject482 || (_templateObject482 = _taggedTemplateLiteral8(["familiar scrapbook"])))
      });
    }
  }),
  new ActionSource($item(_templateObject492 || (_templateObject492 = _taggedTemplateLiteral8(["peppermint parasol"]))), function() {
    return Math.max(0, 3 - get("_navelRunaways"));
  }, Macro.item($item(_templateObject502 || (_templateObject502 = _taggedTemplateLiteral8(["peppermint parasol"])))), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)($item(_templateObject512 || (_templateObject512 = _taggedTemplateLiteral8(["peppermint parasol"]))));
    },
    cost: function() {
      return Math.min(ActionSource.defaultPriceFunction($item(_templateObject522 || (_templateObject522 = _taggedTemplateLiteral8(["peppermint sprout"])))) * 5, ActionSource.defaultPriceFunction($item(_templateObject532 || (_templateObject532 = _taggedTemplateLiteral8(["peppermint parasol"]))))) / 10;
    }
    // Breaks after 10 successful runaways.
  }),
  new ActionSource($item(_templateObject542 || (_templateObject542 = _taggedTemplateLiteral8(["human musk"]))), function() {
    return Math.max(0, 3 - get("_humanMuskUses"));
  }, Macro.item($item(_templateObject552 || (_templateObject552 = _taggedTemplateLiteral8(["human musk"])))), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)($item(_templateObject562 || (_templateObject562 = _taggedTemplateLiteral8(["human musk"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject572 || (_templateObject572 = _taggedTemplateLiteral8(["human musk"]))));
    }
  })
].concat(_toConsumableArray6($items(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral8(["Louder Than Bomb, divine champagne popper, tennis ball"]))).map(function(item8) {
  return new ActionSource(item8, function() {
    return 1 / 0;
  }, Macro.item(item8), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)(item8);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item8);
    }
  });
})));
function tryFindFreeRun(constraints) {
  var source = findActionSource(freeRunSources, constraints);
  return source && asdonMartinSource.available() && (source = asdonMartinSource.merge(source)), source;
}
function ensureFreeRun(constraints) {
  var source = tryFindFreeRun(constraints);
  if (!source)
    throw new Error("Failed to ensure Free Run source");
  return source;
}

// src/ascend.ts
init_kolmafia_polyfill();
var import_kolmafia49 = require("kolmafia");

// src/resources/index.ts
init_kolmafia_polyfill();

// src/resources/2008/Stickers.ts
var Stickers_exports = {};
__export(Stickers_exports, {
  currentStickers: function() {
    return currentStickers;
  },
  foldWeapon: function() {
    return foldWeapon;
  },
  have: function() {
    return have5;
  },
  makeSword: function() {
    return makeSword;
  },
  setStickers: function() {
    return setStickers;
  },
  stickers: function() {
    return stickers;
  },
  weapon: function() {
    return weapon;
  }
});
init_kolmafia_polyfill();
var import_kolmafia13 = require("kolmafia");
var _templateObject59, _templateObject219, _templateObject317, _templateObject415, _templateObject510, _templateObject66, _templateObject76, _templateObject86, _templateObject96, _templateObject106, _templateObject116;
function _taggedTemplateLiteral9(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var stickers = {
  unicorn: $item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral9(["scratch 'n' sniff unicorn sticker"]))),
  apple: $item(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral9(["scratch 'n' sniff apple sticker"]))),
  UPC: $item(_templateObject317 || (_templateObject317 = _taggedTemplateLiteral9(["scratch 'n' sniff UPC sticker"]))),
  wrestler: $item(_templateObject415 || (_templateObject415 = _taggedTemplateLiteral9(["scratch 'n' sniff wrestler sticker"]))),
  dragon: $item(_templateObject510 || (_templateObject510 = _taggedTemplateLiteral9(["scratch 'n' sniff dragon sticker"]))),
  rockband: $item(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral9(["scratch 'n' sniff rock band sticker"])))
};
function have5() {
  return (0, import_kolmafia13.haveSkill)($skill(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral9(["Summon Stickers"]))));
}
function weapon() {
  var _find;
  return (_find = $items(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral9(["scratch 'n' sniff sword, scratch 'n' sniff crossbow"]))).find(function(i) {
    return (0, import_kolmafia13.availableAmount)(i);
  })) !== null && _find !== void 0 ? _find : null;
}
var weapons = {
  sword: $item(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral9(["scratch 'n' sniff sword"]))),
  crossbow: $item(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral9(["scratch 'n' sniff crossbow"])))
};
function makeSword(sticker) {
  if (!weapon()) {
    var id = (0, import_kolmafia13.toInt)(stickers[sticker]);
    (0, import_kolmafia13.visitUrl)("bedazzle.php?action=juststick&sticker=".concat(id, "&pwd"));
  }
}
function foldWeapon(mode) {
  var currentWep = weapon();
  return currentWep ? weapons[mode] === currentWep ? !0 : ((0, import_kolmafia13.visitUrl)("bedazzle.php?action=fold&pwd"), weapons[mode] === currentWep) : !1;
}
function currentStickers() {
  return $slots(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral9(["sticker1, sticker2, sticker3"]))).map(function(s) {
    return (0, import_kolmafia13.equippedItem)(s);
  });
}
function setStickers() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++)
    options[_key] = arguments[_key];
  for (var _loop = function() {
    var s = _options[_i];
    s && (0, import_kolmafia13.retrieveItem)(stickers[s], options.filter(function(x) {
      return x === s;
    }).length);
  }, _i = 0, _options = options; _i < _options.length; _i++)
    _loop();
  (0, import_kolmafia13.visitUrl)("bedazzle.php");
  for (var start = currentStickers(), i = 0; i <= 2; i++) {
    var sticker = options[i];
    if (sticker) {
      var item8 = stickers[sticker];
      start[i] !== item8 && ((0, import_kolmafia13.visitUrl)("bedazzle.php?action=peel&slot=".concat(i + 1, "&pwd")), (0, import_kolmafia13.visitUrl)("bedazzle.php?action=stick&slot=".concat(i + 1, "&sticker=").concat((0, import_kolmafia13.toInt)(item8), "&pwd")));
    }
  }
  return currentStickers();
}

// src/resources/2009/SpookyPutty.ts
var SpookyPutty_exports = {};
__export(SpookyPutty_exports, {
  getSpookyPuttySheetCopiesMade: function() {
    return getSpookyPuttySheetCopiesMade;
  },
  getSpookyPuttySheetMonster: function() {
    return getSpookyPuttySheetMonster;
  },
  have: function() {
    return have6;
  },
  prepareSpookyPuttySheet: function() {
    return prepareSpookyPuttySheet;
  },
  sheet: function() {
    return sheet;
  },
  useSpookyPuttySheet: function() {
    return useSpookyPuttySheet;
  }
});
init_kolmafia_polyfill();
var import_kolmafia14 = require("kolmafia");
var _templateObject60;
function _taggedTemplateLiteral10(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var sheet = $item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral10(["Spooky Putty sheet"])));
function have6() {
  return getFoldGroup(sheet).some(function(item8) {
    return have(item8);
  });
}
function getSpookyPuttySheetCopiesMade() {
  return Math.max(0, get("spookyPuttyCopiesMade"));
}
function prepareSpookyPuttySheet() {
  return have6() ? have(sheet) ? !0 : (0, import_kolmafia14.cliExecute)("fold Spooky putty sheet") : !1;
}
function getSpookyPuttySheetMonster() {
  return get("spookyPuttyMonster");
}
function useSpookyPuttySheet() {
  return (0, import_kolmafia14.use)(sheet);
}

// src/resources/2010/CrownOfThrones.ts
var CrownOfThrones_exports = {};
__export(CrownOfThrones_exports, {
  createRiderMode: function() {
    return createRiderMode;
  },
  pickRider: function() {
    return pickRider;
  },
  ridingFamiliars: function() {
    return ridingFamiliars;
  },
  valueRider: function() {
    return valueRider;
  }
});
init_kolmafia_polyfill();
var import_kolmafia15 = require("kolmafia");
var _templateObject61, _templateObject220, _modifier, _templateObject318, _templateObject416, _modifier2, _templateObject511, _templateObject67, _templateObject77, _templateObject87, _templateObject97, _templateObject107, _templateObject117, _templateObject126, _modifier7, _templateObject136, _templateObject145, _modifier8, _templateObject155, _templateObject165, _modifier9, _templateObject175, _templateObject185, _templateObject195, _templateObject205, _templateObject2110, _templateObject225, _templateObject235, _templateObject245, _templateObject255, _templateObject265, _templateObject275, _templateObject285, _modifier15, _templateObject295, _templateObject305, _templateObject319, _templateObject325, _templateObject335, _templateObject345, _templateObject355, _templateObject365, _templateObject375, _templateObject384, _templateObject394, _templateObject404, _templateObject417, _templateObject425, _templateObject434, _templateObject444, _templateObject454, _templateObject463, _templateObject473, _templateObject483, _templateObject493, _templateObject503, _modifier26, _templateObject513, _templateObject523, _modifier27, _templateObject533, _templateObject543, _modifier28, _templateObject553, _templateObject563, _templateObject573, _templateObject582, _templateObject592, _templateObject602, _modifier31, _templateObject612, _templateObject622, _modifier32, _templateObject632, _templateObject642, _templateObject652, _templateObject662, _modifier34, _templateObject672, _templateObject68, _modifier35, _templateObject69, _templateObject70, _modifier36, _templateObject71, _templateObject722, _templateObject732, _templateObject742, _templateObject752, _templateObject762, _templateObject772, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject822, _templateObject832, _templateObject842, _templateObject852, _templateObject862, _templateObject872, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject922, _templateObject932, _templateObject942, _templateObject952, _templateObject962, _templateObject972, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject1022, _templateObject1032, _templateObject1042;
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray11(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray11(o, minLen);
  }
}
function _iterableToArray7(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray11(arr);
}
function _arrayLikeToArray11(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperty6(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral11(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var ridingFamiliars = [{
  familiar: $familiar(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral11(["Puck Man"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral11(["yellow pixel"]))));
  },
  probability: 0.25,
  modifier: (_modifier = {}, _defineProperty6(_modifier, "Muscle", 10), _defineProperty6(_modifier, "Mysticality", 10), _defineProperty6(_modifier, "Moxie", 10), _modifier),
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject318 || (_templateObject318 = _taggedTemplateLiteral11(["Ms. Puck Man"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject416 || (_templateObject416 = _taggedTemplateLiteral11(["yellow pixel"]))));
  },
  probability: 0.25,
  modifier: (_modifier2 = {}, _defineProperty6(_modifier2, "Muscle", 10), _defineProperty6(_modifier2, "Mysticality", 10), _defineProperty6(_modifier2, "Moxie", 10), _modifier2),
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject511 || (_templateObject511 = _taggedTemplateLiteral11(["Grimstone Golem"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral11(["grimstone mask"]))));
  },
  probability: 0.5,
  modifier: _defineProperty6({}, "Combat Rate", -5),
  dropPredicate: function() {
    return get("_grimstoneMaskDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral11(["Knob Goblin Organ Grinder"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral11(["Happy Medium"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral11(["Garbage Fire"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral11(["burning newspaper"]))));
  },
  probability: 0.5,
  modifier: _defineProperty6({}, "Hot Spell Damage", 25),
  dropPredicate: function() {
    return get("_garbageFireDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral11(["Machine Elf"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral11(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"])))));
  },
  probability: 0.2,
  modifier: (_modifier7 = {}, _defineProperty6(_modifier7, "Muscle", 7), _defineProperty6(_modifier7, "Mysticality", 7), _defineProperty6(_modifier7, "Moxie", 7), _modifier7),
  dropPredicate: function() {
    return get("_abstractionDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral11(["Trick-or-Treating Tot"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral11(["hoarded candy wad"]))));
  },
  probability: 0.5,
  modifier: (_modifier8 = {}, _defineProperty6(_modifier8, "Muscle", 10), _defineProperty6(_modifier8, "Mysticality", 10), _defineProperty6(_modifier8, "Moxie", 10), _modifier8),
  dropPredicate: function() {
    return get("_hoardedCandyDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral11(["Warbear Drone"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral11(["warbear whosit"]))));
  },
  probability: 1 / 4.5,
  modifier: (_modifier9 = {}, _defineProperty6(_modifier9, "Maximum HP", 15), _defineProperty6(_modifier9, "Maximum MP", 15), _modifier9)
}, {
  familiar: $familiar(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral11(["Li'l Xenomorph"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral11(["lunar isotope"]))));
  },
  probability: 0.05,
  modifier: _defineProperty6({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral11(["Pottery Barn Owl"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral11(["volcanic ash"]))));
  },
  probability: 0.1,
  modifier: _defineProperty6({}, "Hot Damage", 10)
}, {
  familiar: $familiar(_templateObject2110 || (_templateObject2110 = _taggedTemplateLiteral11(["Grim Brother"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral11(["grim fairy tale"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Combat Rate", 5),
  dropPredicate: function() {
    return get("_grimFairyTaleDropsCrown") < 2;
  }
}, {
  familiar: $familiar(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral11(["Optimistic Candle"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral11(["glob of melted wax"]))));
  },
  probability: 1,
  dropPredicate: function() {
    return get("_optimisticCandleDropsCrown") < 3;
  },
  modifier: _defineProperty6({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral11(["Adventurous Spelunker"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral11(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"])))));
  },
  probability: 1,
  dropPredicate: function() {
    return get("_oreDropsCrown") < 6;
  },
  modifier: _defineProperty6({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral11(["Twitching Space Critter"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject285 || (_templateObject285 = _taggedTemplateLiteral11(["space beast fur"]))));
  },
  probability: 1,
  modifier: (_modifier15 = {}, _defineProperty6(_modifier15, "Hot Resistance", 2), _defineProperty6(_modifier15, "Cold Resistance", 2), _defineProperty6(_modifier15, "Spooky Resistance", 2), _defineProperty6(_modifier15, "Sleaze Resistance", 2), _defineProperty6(_modifier15, "Stench Resistance", 2), _modifier15),
  dropPredicate: function() {
    return get("_spaceFurDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject295 || (_templateObject295 = _taggedTemplateLiteral11(["Party Mouse"]))),
  meatVal: function() {
    return 50;
  },
  /*
  The below code is more accurate. However, party mouse is virtually never going to be worthwhile and this causes so many useless mall hits it isn't funny.
     getSaleValue(
      ...Item.all().filter(
        (booze) =>
          ["decent", "good"].includes(booze.quality) &&
          booze.inebriety > 0 &&
          booze.tradeable &&
          booze.discardable &&
          !$items`glass of "milk", cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy`.includes(
            booze
          )
      )
    ),
    */
  probability: 0.05,
  modifier: _defineProperty6({}, "Booze Drop", 25)
}, {
  familiar: $familiar(_templateObject305 || (_templateObject305 = _taggedTemplateLiteral11(["Yule Hound"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject319 || (_templateObject319 = _taggedTemplateLiteral11(["candy cane"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Candy Drop", 20)
}, {
  familiar: $familiar(_templateObject325 || (_templateObject325 = _taggedTemplateLiteral11(["Gluttonous Green Ghost"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject335 || (_templateObject335 = _taggedTemplateLiteral11(["bean burrito, enchanted bean burrito, jumping bean burrito"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Food Drop", 15)
}, {
  familiar: $familiar(_templateObject345 || (_templateObject345 = _taggedTemplateLiteral11(["Reassembled Blackbird"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject355 || (_templateObject355 = _taggedTemplateLiteral11(["blackberry"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject365 || (_templateObject365 = _taggedTemplateLiteral11(["Reconstituted Crow"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject375 || (_templateObject375 = _taggedTemplateLiteral11(["blackberry"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject384 || (_templateObject384 = _taggedTemplateLiteral11(["Hunchbacked Minion"]))),
  meatVal: function() {
    return 0.02 * getSaleValue($item(_templateObject394 || (_templateObject394 = _taggedTemplateLiteral11(["disembodied brain"])))) + 0.98 * getSaleValue($item(_templateObject404 || (_templateObject404 = _taggedTemplateLiteral11(["skeleton bone"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Muscle Experience", 2)
}, {
  familiar: $familiar(_templateObject417 || (_templateObject417 = _taggedTemplateLiteral11(["Reanimated Reanimator"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject425 || (_templateObject425 = _taggedTemplateLiteral11(["hot wing, broken skull"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Mysticality Experience", 2)
}, {
  familiar: $familiar(_templateObject434 || (_templateObject434 = _taggedTemplateLiteral11(["Attention-Deficit Demon"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject444 || (_templateObject444 = _taggedTemplateLiteral11(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject454 || (_templateObject454 = _taggedTemplateLiteral11(["Piano Cat"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject463 || (_templateObject463 = _taggedTemplateLiteral11(["beertini, papaya slung, salty slug, tomato daiquiri"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject473 || (_templateObject473 = _taggedTemplateLiteral11(["Golden Monkey"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject483 || (_templateObject483 = _taggedTemplateLiteral11(["gold nuggets"]))));
  },
  probability: 0.5,
  modifier: _defineProperty6({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject493 || (_templateObject493 = _taggedTemplateLiteral11(["Robot Reindeer"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject503 || (_templateObject503 = _taggedTemplateLiteral11(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier26 = {}, _defineProperty6(_modifier26, "Muscle", 10), _defineProperty6(_modifier26, "Mysticality", 10), _defineProperty6(_modifier26, "Moxie", 10), _modifier26)
}, {
  familiar: $familiar(_templateObject513 || (_templateObject513 = _taggedTemplateLiteral11(["Stocking Mimic"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject523 || (_templateObject523 = _taggedTemplateLiteral11(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"])))));
  },
  probability: 0.3,
  modifier: (_modifier27 = {}, _defineProperty6(_modifier27, "Muscle", 10), _defineProperty6(_modifier27, "Mysticality", 10), _defineProperty6(_modifier27, "Moxie", 10), _modifier27)
}, {
  familiar: $familiar(_templateObject533 || (_templateObject533 = _taggedTemplateLiteral11(["BRICKO chick"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject543 || (_templateObject543 = _taggedTemplateLiteral11(["BRICKO brick"]))));
  },
  probability: 1,
  modifier: (_modifier28 = {}, _defineProperty6(_modifier28, "Muscle Percent", 10), _defineProperty6(_modifier28, "Mysticality Percent", 10), _defineProperty6(_modifier28, "Moxie Percent", 10), _modifier28)
}, {
  familiar: $familiar(_templateObject553 || (_templateObject553 = _taggedTemplateLiteral11(["Cotton Candy Carnie"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject563 || (_templateObject563 = _taggedTemplateLiteral11(["cotton candy pinch"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Initiative", 20)
}, {
  familiar: $familiar(_templateObject573 || (_templateObject573 = _taggedTemplateLiteral11(["Untamed Turtle"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject582 || (_templateObject582 = _taggedTemplateLiteral11(["snailmail bits, turtlemail bits, turtle wax"])))));
  },
  probability: 0.35,
  modifier: _defineProperty6({}, "Initiative", 20)
}, {
  familiar: $familiar(_templateObject592 || (_templateObject592 = _taggedTemplateLiteral11(["Astral Badger"]))),
  meatVal: function() {
    return 2 * getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject602 || (_templateObject602 = _taggedTemplateLiteral11(["spooky mushroom, Knob mushroom, Knoll mushroom"])))));
  },
  probability: 1,
  modifier: (_modifier31 = {}, _defineProperty6(_modifier31, "Maximum HP", 10), _defineProperty6(_modifier31, "Maximum MP", 10), _modifier31)
}, {
  familiar: $familiar(_templateObject612 || (_templateObject612 = _taggedTemplateLiteral11(["Green Pixie"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject622 || (_templateObject622 = _taggedTemplateLiteral11(["bottle of tequila"]))));
  },
  probability: 0.2,
  modifier: (_modifier32 = {}, _defineProperty6(_modifier32, "Maximum HP", 10), _defineProperty6(_modifier32, "Maximum MP", 10), _modifier32)
}, {
  familiar: $familiar(_templateObject632 || (_templateObject632 = _taggedTemplateLiteral11(["Angry Goat"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject642 || (_templateObject642 = _taggedTemplateLiteral11(["goat cheese pizza"]))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Muscle Percent", 15)
}, {
  familiar: $familiar(_templateObject652 || (_templateObject652 = _taggedTemplateLiteral11(["Adorable Seal Larva"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject662 || (_templateObject662 = _taggedTemplateLiteral11(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"])))));
  },
  probability: 0.35,
  modifier: (_modifier34 = {}, _defineProperty6(_modifier34, "HP Regen Min", 2), _defineProperty6(_modifier34, "MP Regen Min", 2), _defineProperty6(_modifier34, "HP Regen Max", 8), _defineProperty6(_modifier34, "MP Regen Max", 8), _modifier34)
}, {
  familiar: $familiar(_templateObject672 || (_templateObject672 = _taggedTemplateLiteral11(["Ancient Yuletide Troll"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral11(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier35 = {}, _defineProperty6(_modifier35, "HP Regen Min", 2), _defineProperty6(_modifier35, "MP Regen Min", 2), _defineProperty6(_modifier35, "HP Regen Max", 8), _defineProperty6(_modifier35, "MP Regen Max", 8), _modifier35)
}, {
  familiar: $familiar(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral11(["Sweet Nutcracker"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray7($items(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral11(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier36 = {}, _defineProperty6(_modifier36, "HP Regen Min", 2), _defineProperty6(_modifier36, "MP Regen Min", 2), _defineProperty6(_modifier36, "HP Regen Max", 8), _defineProperty6(_modifier36, "MP Regen Max", 8), _modifier36)
}, {
  familiar: $familiar(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral11(["Casagnova Gnome"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject722 || (_templateObject722 = _taggedTemplateLiteral11(["Coffee Pixie"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject732 || (_templateObject732 = _taggedTemplateLiteral11(["Dancing Frog"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject742 || (_templateObject742 = _taggedTemplateLiteral11(["Grouper Groupie"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject752 || (_templateObject752 = _taggedTemplateLiteral11(["Hand Turkey"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject762 || (_templateObject762 = _taggedTemplateLiteral11(["Hippo Ballerina"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject772 || (_templateObject772 = _taggedTemplateLiteral11(["Jitterbug"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral11(["Leprechaun"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral11(["Obtuse Angel"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral11(["Psychedelic Bear"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral11(["Robortender"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject822 || (_templateObject822 = _taggedTemplateLiteral11(["Ghost of Crimbo Commerce"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject832 || (_templateObject832 = _taggedTemplateLiteral11(["Hobo Monkey"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject842 || (_templateObject842 = _taggedTemplateLiteral11(["Rockin' Robin"]))),
  meatVal: function() {
    return 60;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject852 || (_templateObject852 = _taggedTemplateLiteral11(["Feral Kobold"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject862 || (_templateObject862 = _taggedTemplateLiteral11(["Oily Woim"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject872 || (_templateObject872 = _taggedTemplateLiteral11(["Cat Burglar"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral11(["Misshapen Animal Skeleton"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty6({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral11(["Gelatinous Cubeling"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty6({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral11(["Frozen Gravy Fairy"]))),
  // drops a cold nugget every combat, 5 of which can be used to make a cold wad
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral11(["cold wad"])))), getSaleValue($item(_templateObject922 || (_templateObject922 = _taggedTemplateLiteral11(["cold nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Cold Damage", 20)
}, {
  familiar: $familiar(_templateObject932 || (_templateObject932 = _taggedTemplateLiteral11(["Stinky Gravy Fairy"]))),
  // drops a stench nugget every combat, 5 of which can be used to make a stench wad
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject942 || (_templateObject942 = _taggedTemplateLiteral11(["stench wad"])))), getSaleValue($item(_templateObject952 || (_templateObject952 = _taggedTemplateLiteral11(["stench nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Stench Damage", 20)
}, {
  familiar: $familiar(_templateObject962 || (_templateObject962 = _taggedTemplateLiteral11(["Sleazy Gravy Fairy"]))),
  // drops a sleaze nugget every combat, 5 of which can be used to make a sleaze wad
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject972 || (_templateObject972 = _taggedTemplateLiteral11(["sleaze wad"])))), getSaleValue($item(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral11(["sleaze nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Sleaze Damage", 20)
}, {
  familiar: $familiar(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral11(["Spooky Gravy Fairy"]))),
  // drops a spooky nugget every combat, 5 of which can be used to make a spooky wad
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral11(["spooky wad"])))), getSaleValue($item(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral11(["spooky nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Spooky Damage", 20)
}, {
  familiar: $familiar(_templateObject1022 || (_templateObject1022 = _taggedTemplateLiteral11(["Flaming Gravy Fairy"]))),
  // drops a hot nugget every combat, 5 of which can be used to make a hot wad
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject1032 || (_templateObject1032 = _taggedTemplateLiteral11(["hot wad"])))), getSaleValue($item(_templateObject1042 || (_templateObject1042 = _taggedTemplateLiteral11(["hot nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty6({}, "Hot Damage", 20)
}];
function valueRider(rider, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * rider.meatVal() : 0, modifierValue = modifierValueFunction(rider.modifier);
  return dropValue + modifierValue;
}
var riderModes = /* @__PURE__ */ new Map();
function createRiderMode(name, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, excludeCurrentFamiliar = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0;
  return riderModes.set(name, {
    modifierValueFunction: modifierValueFunction,
    ignoreLimitedDrops: ignoreLimitedDrops,
    excludeCurrentFamiliar: excludeCurrentFamiliar
  });
}
var riderLists = /* @__PURE__ */ new Map();
function pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData)
    return null;
  var modifierValueFunction = modeData.modifierValueFunction, ignoreLimitedDrops = modeData.ignoreLimitedDrops, excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;
  riderLists.has(mode) || riderLists.set(mode, ridingFamiliars.filter(function(rider) {
    return have(rider.familiar);
  }).sort(function(a, b) {
    return valueRider(b, modifierValueFunction, ignoreLimitedDrops) - valueRider(a, modifierValueFunction, ignoreLimitedDrops);
  }));
  var list = riderLists.get(mode);
  if (list) {
    var riderToReturn = list.find(function(rider) {
      return (!rider.dropPredicate || rider.dropPredicate()) && (!excludeCurrentFamiliar || (0, import_kolmafia15.myFamiliar)() !== rider.familiar);
    });
    return riderToReturn != null ? riderToReturn : null;
  }
  return null;
}

// src/resources/2011/ObtuseAngel.ts
var ObtuseAngel_exports = {};
__export(ObtuseAngel_exports, {
  BadlyRomanticArrow: function() {
    return BadlyRomanticArrow;
  },
  canUseBadlyRomanticArrow: function() {
    return canUseBadlyRomanticArrow;
  },
  couldUseBadlyRomanticArrow: function() {
    return couldUseBadlyRomanticArrow;
  },
  familiar: function() {
    return familiar3;
  },
  getBadlyRomanticArrowMonster: function() {
    return getBadlyRomanticArrowMonster;
  },
  getBadlyRomanticArrowUses: function() {
    return getBadlyRomanticArrowUses;
  },
  have: function() {
    return have7;
  },
  haveBadlyRomanticArrowUsesRemaining: function() {
    return haveBadlyRomanticArrowUsesRemaining;
  },
  prepareBadlyRomanticArrow: function() {
    return prepareBadlyRomanticArrow;
  }
});
init_kolmafia_polyfill();
var import_kolmafia16 = require("kolmafia");

// src/Copier.ts
init_kolmafia_polyfill();
function _defineProperties7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties7(Constructor.prototype, protoProps), staticProps && _defineProperties7(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty7(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Copier = /* @__PURE__ */ _createClass7(
  function Copier2(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
    _classCallCheck7(this, Copier2), _defineProperty7(this, "couldCopy", void 0), _defineProperty7(this, "prepare", void 0), _defineProperty7(this, "canCopy", void 0), _defineProperty7(this, "copiedMonster", void 0), _defineProperty7(this, "fightCopy", null), this.couldCopy = couldCopy, this.prepare = prepare, this.canCopy = canCopy, this.copiedMonster = copiedMonster, fightCopy && (this.fightCopy = fightCopy);
  }
  // static PrintScreenButton = new Copier(
  //   $item`print screen button`,
  //   null,
  //   $item`screencapped monster`,
  //   () => property.getMonster(`screencappedMonster`),
  //   () => 1,
  //   () => use($item`screencapped monster`)
  // );
  // static PulledGreenTaffy = new Copier(
  //   $item`pulled green taffy`,
  //   null,
  //   $item`envyfish egg`,
  //   () => property.getMonster(`screencappedMonster`),
  //   () => (property.getBoolean("_envyfishEggUsed") ? 0 : 1),
  //   () => use($item`envyfish egg`)
  // );
);

// src/resources/2011/ObtuseAngel.ts
var _templateObject108;
function _taggedTemplateLiteral12(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar3 = $familiar(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral12(["Obtuse Angel"])));
function have7() {
  return have(familiar3);
}
function getBadlyRomanticArrowUses() {
  return Math.max(0, get("_badlyRomanticArrows"));
}
function haveBadlyRomanticArrowUsesRemaining() {
  return getBadlyRomanticArrowUses() === 0;
}
function couldUseBadlyRomanticArrow() {
  return have7() && haveBadlyRomanticArrowUsesRemaining();
}
function prepareBadlyRomanticArrow() {
  return (0, import_kolmafia16.useFamiliar)(familiar3);
}
function canUseBadlyRomanticArrow() {
  return isCurrentFamiliar(familiar3) && haveBadlyRomanticArrowUsesRemaining();
}
function getBadlyRomanticArrowMonster() {
  return get("romanticTarget");
}
var BadlyRomanticArrow = new Copier(function() {
  return couldUseBadlyRomanticArrow();
}, function() {
  return prepareBadlyRomanticArrow();
}, function() {
  return canUseBadlyRomanticArrow();
}, function() {
  return getBadlyRomanticArrowMonster();
});

// src/resources/2012/RainDoh.ts
var RainDoh_exports = {};
__export(RainDoh_exports, {
  box: function() {
    return box;
  },
  getRainDohBlackBoxCopiesMade: function() {
    return getRainDohBlackBoxCopiesMade;
  },
  getRainDohBlackBoxMonster: function() {
    return getRainDohBlackBoxMonster;
  },
  have: function() {
    return have8;
  },
  useRainDohBlackBox: function() {
    return useRainDohBlackBox;
  }
});
init_kolmafia_polyfill();
var import_kolmafia17 = require("kolmafia");
var _templateObject109;
function _taggedTemplateLiteral13(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var box = $item(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral13(["Rain-Doh black box"])));
function have8() {
  return getFoldGroup(box).some(function(item8) {
    return have(item8);
  });
}
function getRainDohBlackBoxCopiesMade() {
  return Math.max(0, get("_raindohCopiesMade"));
}
function getRainDohBlackBoxMonster() {
  return get("rainDohMonster");
}
function useRainDohBlackBox() {
  return (0, import_kolmafia17.use)(box);
}

// src/resources/2012/ReagnimatedGnome.ts
var ReagnimatedGnome_exports = {};
__export(ReagnimatedGnome_exports, {
  bodyParts: function() {
    return bodyParts;
  },
  choosePart: function() {
    return choosePart;
  },
  chosenParts: function() {
    return chosenParts;
  },
  expectedAdvsPerCombat: function() {
    return expectedAdvsPerCombat;
  },
  have: function() {
    return have9;
  }
});
init_kolmafia_polyfill();
var import_kolmafia18 = require("kolmafia");
var _templateObject110, _templateObject221, _templateObject320, _templateObject418, _templateObject514, _templateObject610;
function _taggedTemplateLiteral14(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have9() {
  return have($familiar(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral14(["Reagnimated Gnome"]))));
}
var bodyParts = {
  ears: $item(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral14(["gnomish swimmer's ears"]))),
  lung: $item(_templateObject320 || (_templateObject320 = _taggedTemplateLiteral14(["gnomish coal miner's lung"]))),
  elbow: $item(_templateObject418 || (_templateObject418 = _taggedTemplateLiteral14(["gnomish tennis elbow"]))),
  kgnee: $item(_templateObject514 || (_templateObject514 = _taggedTemplateLiteral14(["gnomish housemaid's kgnee"]))),
  foot: $item(_templateObject610 || (_templateObject610 = _taggedTemplateLiteral14(["gnomish athlete's foot"])))
};
function chosenParts() {
  return Object.values(bodyParts).filter(function(part) {
    return have(part);
  });
}
function choosePart(part) {
  return have9() ? have(bodyParts[part]) ? !0 : ((0, import_kolmafia18.visitUrl)("arena.php"), (0, import_kolmafia18.runChoice)(4), chosenParts().includes(bodyParts[part])) : !1;
}
function expectedAdvsPerCombat(weight) {
  return Math.min(0.01 + weight / 1e3 * 0.99, 1);
}

// src/resources/2013/Florist.ts
var Florist_exports = {};
__export(Florist_exports, {
  AloeGuvnor: function() {
    return AloeGuvnor;
  },
  ArcticMoss: function() {
    return ArcticMoss;
  },
  Artichoker: function() {
    return Artichoker;
  },
  BamBoo: function() {
    return BamBoo;
  },
  BlusteryPuffball: function() {
    return BlusteryPuffball;
  },
  CannedSpinach: function() {
    return CannedSpinach;
  },
  CeleryStalker: function() {
    return CeleryStalker;
  },
  Chillterelle: function() {
    return Chillterelle;
  },
  Crookweed: function() {
    return Crookweed;
  },
  DeadlyCinnamon: function() {
    return DeadlyCinnamon;
  },
  DisLichen: function() {
    return DisLichen;
  },
  Duckweed: function() {
    return Duckweed;
  },
  ElectricEelgrass: function() {
    return ElectricEelgrass;
  },
  FoulToadstool: function() {
    return FoulToadstool;
  },
  HornOfPlenty: function() {
    return HornOfPlenty;
  },
  Impatiens: function() {
    return Impatiens;
  },
  Kelptomaniac: function() {
    return Kelptomaniac;
  },
  LettuceSpray: function() {
    return LettuceSpray;
  },
  LooseMorels: function() {
    return LooseMorels;
  },
  MaxHeadshroom: function() {
    return MaxHeadshroom;
  },
  OrcaOrchid: function() {
    return OrcaOrchid;
  },
  PitcherPlant: function() {
    return PitcherPlant;
  },
  Portlybella: function() {
    return Portlybella;
  },
  RabidDogwood: function() {
    return RabidDogwood;
  },
  RadishRadish: function() {
    return RadishRadish;
  },
  RedFern: function() {
    return RedFern;
  },
  Rutabeggar: function() {
    return Rutabeggar;
  },
  Sargassum: function() {
    return Sargassum;
  },
  SeltzerWatercress: function() {
    return SeltzerWatercress;
  },
  ShuffleTruffle: function() {
    return ShuffleTruffle;
  },
  SkunkCabbage: function() {
    return SkunkCabbage;
  },
  SmokeRa: function() {
    return SmokeRa;
  },
  Snori: function() {
    return Snori;
  },
  Spankton: function() {
    return Spankton;
  },
  SpiderPlant: function() {
    return SpiderPlant;
  },
  StealingMagnolia: function() {
    return StealingMagnolia;
  },
  SubSeaRose: function() {
    return SubSeaRose;
  },
  UpSeaDaisy: function() {
    return UpSeaDaisy;
  },
  WarLily: function() {
    return WarLily;
  },
  WizardsWig: function() {
    return WizardsWig;
  },
  all: function() {
    return all;
  },
  flowersAvailableFor: function() {
    return flowersAvailableFor;
  },
  flowersIn: function() {
    return flowersIn;
  },
  have: function() {
    return have10;
  },
  isFull: function() {
    return isFull;
  }
});
init_kolmafia_polyfill();
var import_kolmafia20 = require("kolmafia");

// src/modifier.ts
init_kolmafia_polyfill();
var import_kolmafia19 = require("kolmafia");

// src/modifierTypes.ts
init_kolmafia_polyfill();
var booleanModifiers = ["Softcore Only", "Single Equip", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Attacks Can't Miss", "Pirate", "Breakable", "Drops Items", "Drops Meat"], classModifiers = ["Class"], numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Surgeonosity", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Clowniness", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water"], effectModifiers = ["Effect", "Rollover Effect"], monsterModifiers = ["Avatar"], skillModifiers = ["Skill"], statModifiers = ["Plumber Stat"], stringModifiers = ["Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie"];

// src/modifier.ts
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), !0).forEach(function(key) {
      _defineProperty8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty8(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function get2(name, subject) {
  if (arrayContains(name, booleanModifiers))
    return subject === void 0 ? (0, import_kolmafia19.booleanModifier)(name) : (0, import_kolmafia19.booleanModifier)(subject, name);
  if (arrayContains(name, classModifiers))
    return (0, import_kolmafia19.classModifier)(subject, name);
  if (arrayContains(name, effectModifiers))
    return (0, import_kolmafia19.effectModifier)(subject, name);
  if (arrayContains(name, monsterModifiers))
    return (0, import_kolmafia19.monsterModifier)(subject, name);
  if (arrayContains(name, numericModifiers))
    return subject === void 0 ? (0, import_kolmafia19.numericModifier)(name) : (0, import_kolmafia19.numericModifier)(subject, name);
  if (arrayContains(name, skillModifiers))
    return (0, import_kolmafia19.skillModifier)(subject, name);
  if (arrayContains(name, stringModifiers))
    return subject === void 0 ? (0, import_kolmafia19.stringModifier)(name) : (0, import_kolmafia19.stringModifier)(subject, name);
  if (arrayContains(name, statModifiers))
    return (0, import_kolmafia19.statModifier)(subject, name);
}
function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = _objectSpread3(_objectSpread3({}, modifiers1), modifiers2);
  for (var modifier in modifiers1)
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        var _modifiers1$modifier, _modifiers2$modifier;
        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }
      if (arrayContains(modifier, booleanModifiers)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;
        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : !1) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : !1);
      }
    }
  return returnValue;
}
function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++)
    modifierss[_key] = arguments[_key];
  return modifierss.reduce(function(a, b) {
    return pairwiseMerge(a, b);
  }, {});
}

// src/resources/2013/Florist.ts
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray12(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray12(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray12(o, minLen);
  }
}
function _iterableToArray8(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray12(arr);
}
function _arrayLikeToArray12(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties8(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties8(Constructor.prototype, protoProps), staticProps && _defineProperties8(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty9(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Flower = /* @__PURE__ */ function() {
  function Flower2(name, id, environment, modifier) {
    var territorial = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    _classCallCheck8(this, Flower2), _defineProperty9(this, "name", void 0), _defineProperty9(this, "id", void 0), _defineProperty9(this, "environment", void 0), _defineProperty9(this, "modifier", void 0), _defineProperty9(this, "territorial", void 0), this.name = name, this.id = id, this.environment = environment, this.modifier = modifier, this.territorial = territorial;
  }
  return _createClass8(Flower2, [{
    key: "isPlantedHere",
    value: function() {
      var _Flower$plantNamesInZ, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)(), plantedHere = (_Flower$plantNamesInZ = Flower2.plantNamesInZone(location)) === null || _Flower$plantNamesInZ === void 0 ? void 0 : _Flower$plantNamesInZ.includes(this.name);
      return plantedHere !== void 0 && plantedHere;
    }
  }, {
    key: "available",
    value: function() {
      var location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)();
      return this.environment === location.environment && !get("_floristPlantsUsed").includes(this.name) && !this.isPlantedHere(location);
    }
  }, {
    key: "dig",
    value: function() {
      if (!this.isPlantedHere())
        return !1;
      var flowers = Flower2.plantNamesInZone();
      if (!flowers[2])
        return !1;
      var plantNumber = flowers.indexOf(this.name);
      return Flower2.visit(), (0, import_kolmafia20.runChoice)(2, "plnti=".concat(plantNumber)), !this.isPlantedHere();
    }
  }, {
    key: "plant",
    value: function() {
      return this.isPlantedHere() ? !0 : isFull() ? !1 : (Flower2.visit(), (0, import_kolmafia20.runChoice)(1, "plant=".concat(this.id)), this.isPlantedHere());
    }
  }], [{
    key: "visit",
    value: function() {
      (0, import_kolmafia20.visitUrl)("place.php?whichplace=forestvillage&action=fv_friar");
    }
  }, {
    key: "plantNamesInZone",
    value: function() {
      var _getFloristPlants$loc, location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)();
      return (_getFloristPlants$loc = (0, import_kolmafia20.getFloristPlants)()[location.toString()]) !== null && _getFloristPlants$loc !== void 0 ? _getFloristPlants$loc : [];
    }
  }, {
    key: "plantsInZone",
    value: function() {
      var location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)();
      return this.plantNamesInZone(location).map(function(flowerName) {
        return toFlower(flowerName);
      }).filter(function(flower) {
        return flower !== void 0;
      });
    }
  }, {
    key: "modifiersInZone",
    value: function() {
      var location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)(), plants = this.plantsInZone(location);
      if (!plants)
        return {};
      var modifiers = plants.map(function(plant) {
        return plant.modifier;
      }).map(function(modifier) {
        return typeof modifier == "string" ? {} : modifier;
      });
      return mergeModifiers.apply(void 0, _toConsumableArray8(modifiers));
    }
  }]), Flower2;
}();
function have10() {
  return (0, import_kolmafia20.floristAvailable)();
}
function toFlower(name) {
  return all.find(function(flower) {
    return name === flower.name;
  });
}
function flowersIn(location) {
  var returnValue = [];
  return Flower.plantNamesInZone(location).map(toFlower).forEach(function(flower) {
    flower && returnValue.push(flower);
  }), returnValue;
}
function flowersAvailableFor() {
  var location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)();
  return all.filter(function(flower) {
    return flower.available(location);
  });
}
function isFull() {
  var location = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia20.myLocation)();
  return flowersIn(location).length === 3;
}
var RabidDogwood = new Flower("Rabid Dogwood", 1, "outdoor", {
  "Monster Level": 30
}, !0), Rutabeggar = new Flower("Rutabeggar", 2, "outdoor", {
  "Item Drop": 25
}, !0), RadishRadish = new Flower("Rad-ish Radish", 3, "outdoor", {
  "Moxie Experience": 5
}, !0), Artichoker = new Flower("Artichoker", 4, "outdoor", "Delevels Enemy"), SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks Attacks"), SkunkCabbage = new Flower("Skunk Cabbage", 6, "outdoor", {
  "Stench Damage": 12.5
}), DeadlyCinnamon = new Flower("Deadly Cinnamon", 7, "outdoor", {
  "Hot Damage": 12.5
}), CeleryStalker = new Flower("Celery Stalker", 8, "outdoor", {
  "Spooky Damage": 12.5
}), LettuceSpray = new Flower("Lettus Spray", 9, "outdoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 29
}), SeltzerWatercress = new Flower("Seltzer Watercress", 10, "outdoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), WarLily = new Flower("War Lily", 11, "indoor", {
  "Monster Level": 30
}, !0), StealingMagnolia = new Flower("Stealing Magnolia", 12, "indoor", {
  "Item Drop": 25
}, !0), CannedSpinach = new Flower("Canned Spinach", 13, "indoor", {
  "Muscle Experience": 5
}, !0), Impatiens = new Flower("Impatiens", 14, "indoor", {
  Initiative: 25
}), SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison"), RedFern = new Flower("Red Fern", 16, "indoor", "Delevels Enemy"), BamBoo = new Flower("BamBOO!", 17, "indoor", {
  "Spooky Damage": 12.5
}), ArcticMoss = new Flower("Arctic Moss", 18, "indoor", {
  "Cold Damage": 12.5
}), AloeGuvnor = new Flower("Aloe Guv'nor", 19, "indoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
}), PitcherPlant = new Flower("Pitcher Plant", 20, "indoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), BlusteryPuffball = new Flower("Blustery Puffball", 21, "underground", {
  "Monster Level": 30
}, !0), HornOfPlenty = new Flower("Horn of Plenty", 22, "underground", {
  "Item Drop": 25
}, !0), WizardsWig = new Flower("Wizard's Wig", 23, "underground", {
  "Mysticality Experience": 5
}, !0), ShuffleTruffle = new Flower("Shuffle Truffle", 24, "underground", {
  Initiative: 25
}), DisLichen = new Flower("Dis Lichen", 25, "underground", "Delevels Enemy"), LooseMorels = new Flower("Loose Morels", 26, "underground", {
  "Sleaze Damage": 12.5
}), FoulToadstool = new Flower("Foul Toadstool", 27, "underground", {
  "Stench Damage": 12.5
}), Chillterelle = new Flower("Chillterelle", 28, "underground", {
  "Cold Damage": 12.5
}), Portlybella = new Flower("Portlybella", 29, "underground", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
}), MaxHeadshroom = new Flower("Max Headshroom", 30, "underground", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
}), Spankton = new Flower("Spankton", 31, "underwater", "Delevels Enemy", !0), Kelptomaniac = new Flower("Kelptomaniac", 32, "underwater", {
  "Item Drop": 40
}, !0), Crookweed = new Flower("Crookweed", 33, "underwater", {
  "Meat Drop": 60
}, !0), ElectricEelgrass = new Flower("Electric Eelgrass", 34, "underwater", "Blocks Attacks"), Duckweed = new Flower("Duckweed", 35, "underwater", "Blocks Attacks"), OrcaOrchid = new Flower("Orca Orchid", 36, "underwater", {
  "Weapon Damage": 12.5
}), Sargassum = new Flower("Sargassum", 37, "underwater", {
  "Stench Damage": 12.5
}), SubSeaRose = new Flower("Sub-Sea Rose", 38, "underwater", {
  "Cold Damage": 12.5
}), Snori = new Flower("Snori", 39, "underwater", {
  "HP Regen Min": 20,
  "HP Regen Max": 30,
  "MP Regen Min": 10,
  "MP Regen Max": 20
}), UpSeaDaisy = new Flower("Up Sea Daisy", 40, "underwater", {
  Experience: 30
}), all = Object.freeze([RabidDogwood, Rutabeggar, RadishRadish, Artichoker, SmokeRa, SkunkCabbage, DeadlyCinnamon, CeleryStalker, LettuceSpray, SeltzerWatercress, WarLily, StealingMagnolia, CannedSpinach, Impatiens, SpiderPlant, RedFern, BamBoo, ArcticMoss, AloeGuvnor, PitcherPlant, BlusteryPuffball, HornOfPlenty, WizardsWig, ShuffleTruffle, DisLichen, LooseMorels, FoulToadstool, Chillterelle, Portlybella, MaxHeadshroom, Spankton, Kelptomaniac, Crookweed, ElectricEelgrass, Duckweed, OrcaOrchid, Sargassum, SubSeaRose, Snori, UpSeaDaisy]);

// src/resources/2014/CrimboShrub.ts
var CrimboShrub_exports = {};
__export(CrimboShrub_exports, {
  decorate: function() {
    return decorate;
  },
  have: function() {
    return have11;
  }
});
init_kolmafia_polyfill();
var import_kolmafia21 = require("kolmafia");
var _templateObject111, _templateObject226, _templateObject321, _templateObject419;
function _taggedTemplateLiteral15(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have11() {
  return have($familiar(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral15(["Crimbo Shrub"]))));
}
var Toppers = {
  Muscle: 1,
  Mysticality: 2,
  Moxie: 3
}, Lights = {
  "Prismatic Damage": 1,
  "Hot Damage": 2,
  "Cold Damage": 3,
  "Stench Damage": 4,
  "Spooky Damage": 5,
  "Sleaze Damage": 6
}, Garland = {
  "HP Regen": 1,
  "PvP Fights": 2,
  Blocking: 3
}, Gifts = {
  "Yellow Ray": 1,
  "Red Ray": 2,
  Gifts: 3
}, Prefs = {
  Muscle: "Muscle",
  Mysticality: "Mysticality",
  Moxie: "Moxie",
  Prismatic: "Prismatic Damage",
  Hot: "Hot Damage",
  Cold: "Cold Damage",
  Stench: "Stench Damage",
  Spooky: "Spooky Damage",
  Sleaze: "Sleaze Damage",
  HP: "HP Regen",
  PvP: "PvP Fights",
  blocking: "Blocking",
  yellow: "Yellow Ray",
  meat: "Red Ray",
  gifts: "Gifts"
};
function isDecoratedWith(topper, lights, garland, gifts) {
  var decorations = [get("shrubTopper"), get("shrubLights"), get("shrubGarland"), get("shrubGifts")].map(function(x) {
    return Prefs[x];
  });
  return [topper, lights, garland, gifts].every(function(x, i) {
    return x === decorations[i];
  });
}
function decorate(topper, lights, garland, gifts) {
  return have11() ? get("_shrubDecorated") ? isDecoratedWith(topper, lights, garland, gifts) : (have($item(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral15(["box of old Crimbo decorations"])))) || (0, import_kolmafia21.useFamiliar)($familiar(_templateObject321 || (_templateObject321 = _taggedTemplateLiteral15(["Crimbo Shrub"])))), (0, import_kolmafia21.visitUrl)("inv_use.php?pwd=&which=99&whichitem=".concat((0, import_kolmafia21.toInt)($item(_templateObject419 || (_templateObject419 = _taggedTemplateLiteral15(["box of old Crimbo decorations"])))))), (0, import_kolmafia21.visitUrl)("choice.php?whichchoice=999&pwd=&option=1&topper=".concat(Toppers[topper], "&lights=").concat(Lights[lights], "&garland=").concat(Garland[garland], "&gift=").concat(Gifts[gifts])), !0) : !1;
}

// src/resources/2014/DNALab.ts
var DNALab_exports = {};
__export(DNALab_exports, {
  getEffect: function() {
    return getEffect2;
  },
  getTonic: function() {
    return getTonic;
  },
  have: function() {
    return have12;
  },
  hybridize: function() {
    return hybridize;
  },
  installed: function() {
    return installed2;
  },
  isHybridized: function() {
    return isHybridized;
  },
  makeTonic: function() {
    return makeTonic;
  },
  phylumFor: function() {
    return phylumFor;
  },
  tonicsLeft: function() {
    return tonicsLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia22 = require("kolmafia");
var _templateObject118, _templateObject227, _templateObject326, _templateObject420, _templateObject515, _templateObject611, _templateObject710, _templateObject810, _templateObject910, _templateObject1010, _templateObject119, _templateObject127, _templateObject137, _templateObject146, _templateObject156, _templateObject166, _templateObject176, _templateObject186, _templateObject196, _templateObject206, _templateObject2111, _templateObject228, _templateObject236, _templateObject246, _templateObject256, _templateObject266, _templateObject276, _templateObject286, _templateObject296, _templateObject306, _templateObject3110, _templateObject327, _templateObject336, _templateObject346, _templateObject356, _templateObject366, _templateObject376, _templateObject385, _templateObject395, _templateObject405, _templateObject4110, _templateObject426, _templateObject435, _templateObject445, _templateObject455, _templateObject464, _templateObject474, _templateObject484, _templateObject494, _templateObject504, _templateObject516, _templateObject524, _templateObject534, _templateObject544, _templateObject554, _templateObject564, _templateObject574, _templateObject583, _templateObject593, _templateObject603, _templateObject613, _templateObject623, _templateObject633, _templateObject643, _templateObject653, _templateObject663, _templateObject673, _templateObject682, _templateObject692, _templateObject702, _templateObject712, _templateObject723, _templateObject733, _templateObject743, _templateObject753, _templateObject763, _templateObject773, _templateObject782, _templateObject792, _templateObject802, _templateObject812, _templateObject823, _templateObject833, _templateObject843, _templateObject853;
function _slicedToArray6(arr, i) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray13(arr, i) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray13(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray13(o, minLen);
  }
}
function _arrayLikeToArray13(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit6(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral16(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var lab = $item(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral16(["Little Geneticist DNA-Splicing Lab"])));
function have12() {
  return have(lab) || (0, import_kolmafia22.getWorkshed)() === lab;
}
function installed2() {
  return (0, import_kolmafia22.getWorkshed)() === lab;
}
var phylaEffects = /* @__PURE__ */ new Map([[$phylum(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral16(["beast"]))), $effect(_templateObject326 || (_templateObject326 = _taggedTemplateLiteral16(["Human-Beast Hybrid"])))], [$phylum(_templateObject420 || (_templateObject420 = _taggedTemplateLiteral16(["bug"]))), $effect(_templateObject515 || (_templateObject515 = _taggedTemplateLiteral16(["Human-Insect Hybrid"])))], [$phylum(_templateObject611 || (_templateObject611 = _taggedTemplateLiteral16(["constellation"]))), $effect(_templateObject710 || (_templateObject710 = _taggedTemplateLiteral16(["Human-Constellation Hybrid"])))], [$phylum(_templateObject810 || (_templateObject810 = _taggedTemplateLiteral16(["construct"]))), $effect(_templateObject910 || (_templateObject910 = _taggedTemplateLiteral16(["Human-Machine Hybrid"])))], [$phylum(_templateObject1010 || (_templateObject1010 = _taggedTemplateLiteral16(["demon"]))), $effect(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral16(["Human-Demon Hybrid"])))], [$phylum(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral16(["dude"]))), $effect(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral16(["Human-Human Hybrid"])))], [$phylum(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral16(["elemental"]))), $effect(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral16(["Human-Elemental Hybrid"])))], [$phylum(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral16(["elf"]))), $effect(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral16(["Human-Elf Hybrid"])))], [$phylum(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral16(["fish"]))), $effect(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral16(["Human-Fish Hybrid"])))], [$phylum(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral16(["goblin"]))), $effect(_templateObject2111 || (_templateObject2111 = _taggedTemplateLiteral16(["Human-Goblin Hybrid"])))], [$phylum(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral16(["hippy"]))), $effect(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral16(["Human-Hobo Hybrid"])))], [$phylum(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral16(["horror"]))), $effect(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral16(["Human-Horror Hybrid"])))], [$phylum(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral16(["humanoid"]))), $effect(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral16(["Human-Humanoid Hybrid"])))], [$phylum(_templateObject286 || (_templateObject286 = _taggedTemplateLiteral16(["mer-kin"]))), $effect(_templateObject296 || (_templateObject296 = _taggedTemplateLiteral16(["Human-Mer-kin Hybrid"])))], [$phylum(_templateObject306 || (_templateObject306 = _taggedTemplateLiteral16(["orc"]))), $effect(_templateObject3110 || (_templateObject3110 = _taggedTemplateLiteral16(["Human-Orc Hybrid"])))], [$phylum(_templateObject327 || (_templateObject327 = _taggedTemplateLiteral16(["penguin"]))), $effect(_templateObject336 || (_templateObject336 = _taggedTemplateLiteral16(["Human-Penguin Hybrid"])))], [$phylum(_templateObject346 || (_templateObject346 = _taggedTemplateLiteral16(["pirate"]))), $effect(_templateObject356 || (_templateObject356 = _taggedTemplateLiteral16(["Human-Pirate Hybrid"])))], [$phylum(_templateObject366 || (_templateObject366 = _taggedTemplateLiteral16(["plant"]))), $effect(_templateObject376 || (_templateObject376 = _taggedTemplateLiteral16(["Human-Plant Hybrid"])))], [$phylum(_templateObject385 || (_templateObject385 = _taggedTemplateLiteral16(["slime"]))), $effect(_templateObject395 || (_templateObject395 = _taggedTemplateLiteral16(["Human-Slime Hybrid"])))], [$phylum(_templateObject405 || (_templateObject405 = _taggedTemplateLiteral16(["undead"]))), $effect(_templateObject4110 || (_templateObject4110 = _taggedTemplateLiteral16(["Human-Undead Hybrid"])))], [$phylum(_templateObject426 || (_templateObject426 = _taggedTemplateLiteral16(["weird"]))), $effect(_templateObject435 || (_templateObject435 = _taggedTemplateLiteral16(["Human-Weird Thing Hybrid"])))]]), phylaTonics = /* @__PURE__ */ new Map([[$phylum(_templateObject445 || (_templateObject445 = _taggedTemplateLiteral16(["beast"]))), $item(_templateObject455 || (_templateObject455 = _taggedTemplateLiteral16(["Gene Tonic: Beast"])))], [$phylum(_templateObject464 || (_templateObject464 = _taggedTemplateLiteral16(["bug"]))), $item(_templateObject474 || (_templateObject474 = _taggedTemplateLiteral16(["Gene Tonic: Insect"])))], [$phylum(_templateObject484 || (_templateObject484 = _taggedTemplateLiteral16(["constellation"]))), $item(_templateObject494 || (_templateObject494 = _taggedTemplateLiteral16(["Gene Tonic: Constellation"])))], [$phylum(_templateObject504 || (_templateObject504 = _taggedTemplateLiteral16(["construct"]))), $item(_templateObject516 || (_templateObject516 = _taggedTemplateLiteral16(["Gene Tonic: Construct"])))], [$phylum(_templateObject524 || (_templateObject524 = _taggedTemplateLiteral16(["demon"]))), $item(_templateObject534 || (_templateObject534 = _taggedTemplateLiteral16(["Gene Tonic: Demon"])))], [$phylum(_templateObject544 || (_templateObject544 = _taggedTemplateLiteral16(["dude"]))), $item(_templateObject554 || (_templateObject554 = _taggedTemplateLiteral16(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject564 || (_templateObject564 = _taggedTemplateLiteral16(["elemental"]))), $item(_templateObject574 || (_templateObject574 = _taggedTemplateLiteral16(["Gene Tonic: Elemental"])))], [$phylum(_templateObject583 || (_templateObject583 = _taggedTemplateLiteral16(["elf"]))), $item(_templateObject593 || (_templateObject593 = _taggedTemplateLiteral16(["Gene Tonic: Elf"])))], [$phylum(_templateObject603 || (_templateObject603 = _taggedTemplateLiteral16(["fish"]))), $item(_templateObject613 || (_templateObject613 = _taggedTemplateLiteral16(["Gene Tonic: Fish"])))], [$phylum(_templateObject623 || (_templateObject623 = _taggedTemplateLiteral16(["goblin"]))), $item(_templateObject633 || (_templateObject633 = _taggedTemplateLiteral16(["Gene Tonic: Goblin"])))], [$phylum(_templateObject643 || (_templateObject643 = _taggedTemplateLiteral16(["hippy"]))), $item(_templateObject653 || (_templateObject653 = _taggedTemplateLiteral16(["Gene Tonic: Hobo"])))], [$phylum(_templateObject663 || (_templateObject663 = _taggedTemplateLiteral16(["horror"]))), $item(_templateObject673 || (_templateObject673 = _taggedTemplateLiteral16(["Gene Tonic: Horror"])))], [$phylum(_templateObject682 || (_templateObject682 = _taggedTemplateLiteral16(["humanoid"]))), $item(_templateObject692 || (_templateObject692 = _taggedTemplateLiteral16(["Gene Tonic: Humanoid"])))], [$phylum(_templateObject702 || (_templateObject702 = _taggedTemplateLiteral16(["mer-kin"]))), $item(_templateObject712 || (_templateObject712 = _taggedTemplateLiteral16(["Gene Tonic: Mer-kin"])))], [$phylum(_templateObject723 || (_templateObject723 = _taggedTemplateLiteral16(["orc"]))), $item(_templateObject733 || (_templateObject733 = _taggedTemplateLiteral16(["Gene Tonic: Orc"])))], [$phylum(_templateObject743 || (_templateObject743 = _taggedTemplateLiteral16(["penguin"]))), $item(_templateObject753 || (_templateObject753 = _taggedTemplateLiteral16(["Gene Tonic: Penguin"])))], [$phylum(_templateObject763 || (_templateObject763 = _taggedTemplateLiteral16(["pirate"]))), $item(_templateObject773 || (_templateObject773 = _taggedTemplateLiteral16(["Gene Tonic: Pirate"])))], [$phylum(_templateObject782 || (_templateObject782 = _taggedTemplateLiteral16(["plant"]))), $item(_templateObject792 || (_templateObject792 = _taggedTemplateLiteral16(["Gene Tonic: Plant"])))], [$phylum(_templateObject802 || (_templateObject802 = _taggedTemplateLiteral16(["slime"]))), $item(_templateObject812 || (_templateObject812 = _taggedTemplateLiteral16(["Gene Tonic: Slime"])))], [$phylum(_templateObject823 || (_templateObject823 = _taggedTemplateLiteral16(["undead"]))), $item(_templateObject833 || (_templateObject833 = _taggedTemplateLiteral16(["Gene Tonic: Undead"])))], [$phylum(_templateObject843 || (_templateObject843 = _taggedTemplateLiteral16(["weird"]))), $item(_templateObject853 || (_templateObject853 = _taggedTemplateLiteral16(["Gene Tonic: Weird"])))]]), tonicEffects = Array.from(phylaEffects.values());
function isHybridized(tonic) {
  if (!tonic)
    return installed2() && get("_dnaHybrid");
  var tonicEffect = tonic instanceof import_kolmafia22.Effect ? tonic : tonic instanceof import_kolmafia22.Phylum ? getEffect2(tonic) : get2("Effect", tonic);
  return tonicEffects.includes(tonicEffect) && (0, import_kolmafia22.haveEffect)(tonicEffect) === 2147483647;
}
function getTonic(phylum) {
  var _phylaTonics$get;
  return (_phylaTonics$get = phylaTonics.get(phylum)) !== null && _phylaTonics$get !== void 0 ? _phylaTonics$get : $item.none;
}
function getEffect2(phylum) {
  var _phylaEffects$get;
  return (_phylaEffects$get = phylaEffects.get(phylum)) !== null && _phylaEffects$get !== void 0 ? _phylaEffects$get : $effect.none;
}
function phylumFor(dnatype) {
  if (dnatype instanceof import_kolmafia22.Effect) {
    var phylumPair = Array.from(phylaEffects.entries()).find(function(_ref) {
      var _ref2 = _slicedToArray6(_ref, 2), effect2 = _ref2[1];
      return effect2 === dnatype;
    });
    return phylumPair ? phylumPair[0] : null;
  } else {
    var _phylumPair = Array.from(phylaTonics.entries()).find(function(_ref3) {
      var _ref4 = _slicedToArray6(_ref3, 2), tonic = _ref4[1];
      return tonic === dnatype;
    });
    return _phylumPair ? _phylumPair[0] : null;
  }
}
function hybridize() {
  if (get("_dnaHybrid") || !installed2())
    return !1;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe)
    return !1;
  var tonicPotion = getTonic(currentSyringe), expectedEffect = get2("Effect", tonicPotion);
  return (0, import_kolmafia22.cliExecute)("camp dnainject"), isHybridized(expectedEffect);
}
function makeTonic() {
  var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  if (!installed2())
    return !1;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe)
    return !1;
  var tonicPotion = getTonic(currentSyringe), amountToMake = clamp(amount, 0, tonicsLeft()), startingAmount = (0, import_kolmafia22.itemAmount)(tonicPotion);
  return (0, import_kolmafia22.cliExecute)("camp dnapotion ".concat(amountToMake)), (0, import_kolmafia22.itemAmount)(tonicPotion) - startingAmount === amountToMake;
}
function tonicsLeft() {
  return clamp(3 - get("_dnaPotionsMade"), 0, 3);
}

// src/resources/2014/WinterGarden.ts
var WinterGarden_exports = {};
__export(WinterGarden_exports, {
  UnfinishedIceSculpture: function() {
    return UnfinishedIceSculpture;
  },
  couldUseUnfinishedIceSculpture: function() {
    return couldUseUnfinishedIceSculpture;
  },
  getUnfinishedIceSculptureMonster: function() {
    return getUnfinishedIceSculptureMonster;
  },
  have: function() {
    return have13;
  },
  haveUnfinishedIceSculpture: function() {
    return haveUnfinishedIceSculpture;
  },
  isUnfinishedIceSculptureUsed: function() {
    return isUnfinishedIceSculptureUsed;
  }
});
init_kolmafia_polyfill();
var _templateObject120, _templateObject229, _templateObject328, _templateObject421;
function _taggedTemplateLiteral17(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have13() {
  return haveInCampground($item(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral17(["packet of winter seeds"]))));
}
function haveUnfinishedIceSculpture() {
  return have($item(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral17(["unfinished ice sculpture"]))));
}
function isUnfinishedIceSculptureUsed() {
  return get("_iceSculptureUsed");
}
function couldUseUnfinishedIceSculpture() {
  return have($item(_templateObject328 || (_templateObject328 = _taggedTemplateLiteral17(["unfinished ice sculpture"])))) && !have($item(_templateObject421 || (_templateObject421 = _taggedTemplateLiteral17(["ice sculpture"]))));
}
function getUnfinishedIceSculptureMonster() {
  return get("iceSculptureMonster");
}
var UnfinishedIceSculpture = new Copier(function() {
  return couldUseUnfinishedIceSculpture();
}, null, function() {
  return couldUseUnfinishedIceSculpture();
}, function() {
  return getUnfinishedIceSculptureMonster();
});

// src/resources/2015/BarrelShrine.ts
var BarrelShrine_exports = {};
__export(BarrelShrine_exports, {
  have: function() {
    return have14;
  },
  smashParty: function() {
    return smashParty;
  }
});
init_kolmafia_polyfill();
var import_kolmafia23 = require("kolmafia");
var _templateObject121;
function _taggedTemplateLiteral18(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var BARRELS = $items(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral18(["little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel"])));
function have14() {
  return get("barrelShrineUnlocked");
}
function smashParty() {
  if (have14()) {
    var total = BARRELS.map(function(i2) {
      return (0, import_kolmafia23.availableAmount)(i2);
    }).reduce(function(sum2, q) {
      return sum2 + q;
    }, 0);
    if (!(total <= 0)) {
      (0, import_kolmafia23.visitUrl)("inv_use.php?pwd&whichitem=8568&choice=1");
      for (var i = 0; i < total / 100; i++)
        (0, import_kolmafia23.runChoice)(2);
    }
  }
}

// src/resources/2015/ChateauMantegna.ts
var ChateauMantegna_exports = {};
__export(ChateauMantegna_exports, {
  ceilings: function() {
    return ceilings;
  },
  changeCeiling: function() {
    return changeCeiling;
  },
  changeDesk: function() {
    return changeDesk;
  },
  changeNightstand: function() {
    return changeNightstand;
  },
  desks: function() {
    return desks;
  },
  fightPainting: function() {
    return fightPainting;
  },
  getCeiling: function() {
    return getCeiling;
  },
  getDesk: function() {
    return getDesk;
  },
  getNightstand: function() {
    return getNightstand;
  },
  have: function() {
    return have15;
  },
  nightstands: function() {
    return nightstands;
  },
  paintingFought: function() {
    return paintingFought;
  },
  paintingMonster: function() {
    return paintingMonster;
  }
});
init_kolmafia_polyfill();
var import_kolmafia24 = require("kolmafia");
function have15() {
  return get("chateauAvailable");
}
function paintingMonster() {
  return get("chateauMonster");
}
function paintingFought() {
  return get("_chateauMonsterFought");
}
function fightPainting() {
  return (0, import_kolmafia24.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", !1), (0, import_kolmafia24.runCombat)();
}
var desks = ["fancy stationery set", "Swiss piggy bank", "continental juice bar"], ceilings = ["antler chandelier", "ceiling fan", "artificial skylight"], nightstands = ["foreign language tapes", "bowl of potpourri", "electric muscle stimulator"];
function getDesk() {
  var _desks$find;
  return (_desks$find = desks.find(function(desk) {
    return Object.keys((0, import_kolmafia24.getChateau)()).includes(desk);
  })) !== null && _desks$find !== void 0 ? _desks$find : null;
}
function getCeiling() {
  var _ceilings$find;
  return (_ceilings$find = ceilings.find(function(ceiling) {
    return Object.keys((0, import_kolmafia24.getChateau)()).includes(ceiling);
  })) !== null && _ceilings$find !== void 0 ? _ceilings$find : null;
}
function getNightstand() {
  var _nightstands$find;
  return (_nightstands$find = nightstands.find(function(nightstand) {
    return Object.keys((0, import_kolmafia24.getChateau)()).includes(nightstand);
  })) !== null && _nightstands$find !== void 0 ? _nightstands$find : null;
}
function changeDesk(desk) {
  return getDesk() === desk ? !0 : desks.includes(desk) ? ((0, import_kolmafia24.buy)(import_kolmafia24.Item.get(desk)), getDesk() === desk) : !1;
}
function changeCeiling(ceiling) {
  return getCeiling() === ceiling ? !0 : ceilings.includes(ceiling) ? ((0, import_kolmafia24.buy)(import_kolmafia24.Item.get(ceiling)), getCeiling() === ceiling) : !1;
}
function changeNightstand(nightstand) {
  return getNightstand() === nightstand ? !0 : nightstands.includes(nightstand) ? ((0, import_kolmafia24.buy)(import_kolmafia24.Item.get(nightstand)), getNightstand() === nightstand) : !1;
}

// src/resources/2015/DeckOfEveryCard.ts
var DeckOfEveryCard_exports = {};
__export(DeckOfEveryCard_exports, {
  cheatCard: function() {
    return cheatCard;
  },
  getCardsDrawn: function() {
    return getCardsDrawn;
  },
  getCardsSeen: function() {
    return getCardsSeen;
  },
  getRemainingDraws: function() {
    return getRemainingDraws;
  },
  have: function() {
    return have16;
  }
});
init_kolmafia_polyfill();
var import_kolmafia25 = require("kolmafia");
var _templateObject128;
function _taggedTemplateLiteral19(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have16() {
  return have($item(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral19(["Deck of Every Card"]))));
}
function getCardsDrawn() {
  return clamp(get("_deckCardsDrawn"), 0, 15);
}
function getRemainingDraws() {
  return 15 - getCardsDrawn();
}
function getCardsSeen() {
  return get("_deckCardsSeen") ? get("_deckCardsSeen").split("|") : [];
}
function cheatCard(card) {
  return getCardsSeen().includes(card) ? !0 : getRemainingDraws() < 5 ? !1 : (0, import_kolmafia25.cliExecute)("cheat ".concat(card));
}

// src/resources/2015/Dinseylandfill.ts
var Dinseylandfill_exports = {};
__export(Dinseylandfill_exports, {
  acceptQuest: function() {
    return acceptQuest;
  },
  activeQuest: function() {
    return activeQuest;
  },
  available: function() {
    return available;
  },
  canFightWartDinsey: function() {
    return canFightWartDinsey;
  },
  coasterNextTurn: function() {
    return coasterNextTurn;
  },
  disposeGarbage: function() {
    return disposeGarbage;
  },
  foughtWartDinseyThisLife: function() {
    return foughtWartDinseyThisLife;
  },
  hasActiveQuest: function() {
    return hasActiveQuest;
  },
  hasDisposedGarbage: function() {
    return hasDisposedGarbage;
  },
  hasQuest: function() {
    return hasQuest;
  },
  have: function() {
    return have17;
  },
  keyCardsLocations: function() {
    return keyCardsLocations;
  },
  questComplete: function() {
    return questComplete;
  },
  quests: function() {
    return quests;
  },
  turnInQuest: function() {
    return turnInQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia26 = require("kolmafia");
var _templateObject129, _templateObject230, _templateObject329, _templateObject427, _templateObject517, _templateObject614, _templateObject711, _templateObject811, _templateObject911, _templateObject1011, _templateObject1110, _templateObject1210, _templateObject138, _templateObject147, _templateObject157, _templateObject167, _templateObject177, _templateObject187, _templateObject197, _templateObject207, _templateObject2112, _templateObject2210, _templateObject237, _templateObject247, _templateObject257, _templateObject267, _templateObject277;
function _createForOfIteratorHelper7(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray14(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray14(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray14(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray14(o, minLen);
  }
}
function _arrayLikeToArray14(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral20(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties9(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties9(Constructor.prototype, protoProps), staticProps && _defineProperties9(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty10(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function have17() {
  return get("stenchAirportAlways");
}
function available() {
  return have17() || get("_stenchAirportToday");
}
var QuestData = /* @__PURE__ */ function() {
  function QuestData2(name, priority, questNameKiosk, questNameQuestLog, questStateProperty, questProgressProperty, questProgressLimit, canUseWanderers, requiredItem, questLocation) {
    _classCallCheck9(this, QuestData2), _defineProperty10(this, "name", void 0), _defineProperty10(this, "priority", void 0), _defineProperty10(this, "questNameKiosk", void 0), _defineProperty10(this, "questNameQuestLog", void 0), _defineProperty10(this, "questStateProperty", void 0), _defineProperty10(this, "questProgressProperty", void 0), _defineProperty10(this, "questProgressLimit", void 0), _defineProperty10(this, "canUseWanderers", void 0), _defineProperty10(this, "requiredItem", void 0), _defineProperty10(this, "questLocation", void 0), this.name = name, this.priority = priority, this.questNameKiosk = questNameKiosk, this.questNameQuestLog = questNameQuestLog, this.questStateProperty = questStateProperty, this.questProgressProperty = questProgressProperty, this.questProgressLimit = questProgressLimit, this.canUseWanderers = canUseWanderers, this.requiredItem = requiredItem, this.questLocation = questLocation;
  }
  return _createClass9(QuestData2, [{
    key: "currentQuest",
    value: function() {
      return get(this.questStateProperty) !== "unstarted";
    }
  }]), QuestData2;
}(), kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk", maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels", quests = [new QuestData("lube", 1, "Track Maintenance", "Super Luber", "questEStSuperLuber", "", 0, !1, $item(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral20(["lube-shoes"]))), $location(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral20(["Barf Mountain"])))), new QuestData("fuel", 0, "Electrical Maintenance", "Give Me Fuel", "questEStGiveMeFuel", "", 0, !1, $item(_templateObject329 || (_templateObject329 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject427 || (_templateObject427 = _taggedTemplateLiteral20(["The Toxic Teacups"])))), new QuestData("sexism", 2, "Sexism Reduction", "Social Justice Adventurer I", "questEStSocialJusticeI", "dinseySocialJusticeIProgress", 15, !0, $item(_templateObject517 || (_templateObject517 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject614 || (_templateObject614 = _taggedTemplateLiteral20(["Pirates of the Garbage Barges"])))), new QuestData("racism", 3, "Racism Reduction", "Social Justice Adventurer II", "questEStSocialJusticeII", "dinseySocialJusticeIIProgress", 15, !0, $item(_templateObject711 || (_templateObject711 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject811 || (_templateObject811 = _taggedTemplateLiteral20(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("fun", 4, "Compulsory Fun", "Whistling Zippity-Doo-Dah", "questEStZippityDooDah", "dinseyFunProgress", 15, !0, $item(_templateObject911 || (_templateObject911 = _taggedTemplateLiteral20(["Dinsey mascot mask"]))), $location(_templateObject1011 || (_templateObject1011 = _taggedTemplateLiteral20(["The Toxic Teacups"])))), new QuestData("trash", 6, "Waterway Debris Removal", "Teach a Man to Fish Trash", "questEStFishTrash", "dinseyFilthLevel", 0, !0, $item(_templateObject1110 || (_templateObject1110 = _taggedTemplateLiteral20(["trash net"]))), $location(_templateObject1210 || (_templateObject1210 = _taggedTemplateLiteral20(["Pirates of the Garbage Barges"])))), new QuestData("bear", 5, "Bear Removal", "Nasty, Nasty Bears", "questEStNastyBears", "dinseyNastyBearsDefeated", 8, !1, $item(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral20(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("food", 7, "Guest Sustenance Assurance", "Will Work With Food", "questEStWorkWithFood", "dinseyTouristsFed", 30, !1, $item(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral20(["Barf Mountain"]))))];
function disposeGarbage() {
  !get("_dinseyGarbageDisposed") && have($item(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral20(["bag of park garbage"])))) && ((0, import_kolmafia26.visitUrl)(maintUrl), (0, import_kolmafia26.runChoice)(6));
}
function hasQuest() {
  return quests.some(function(q) {
    return q.currentQuest();
  });
}
var BLANK_QUEST = new QuestData("", -1, "", "", "", "", -1, !1, $item(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral20(["none"]))), $location(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral20(["none"]))));
function activeQuest() {
  return quests.find(function(q) {
    return q.currentQuest();
  }) || BLANK_QUEST;
}
function questComplete() {
  var quest = activeQuest();
  return quest !== BLANK_QUEST && get(quest.questStateProperty) === "finished";
}
function hasActiveQuest() {
  return hasQuest() && !questComplete();
}
function acceptQuest(priority) {
  var _quests$find$priority, _quests$find, page = (0, import_kolmafia26.visitUrl)(kioskUrl), choice = 6, at = (0, import_kolmafia26.indexOf)(page, "Available Assignments");
  if (at != -1) {
    var jobs = [];
    quests.forEach(function(quest2) {
      jobs.push(quest2.name);
    });
    var priorityNum = typeof priority == "string" ? (_quests$find$priority = (_quests$find = quests.find(function(q) {
      return q.name === priority;
    })) === null || _quests$find === void 0 ? void 0 : _quests$find.priority) !== null && _quests$find$priority !== void 0 ? _quests$find$priority : 7 : priority, availableJobs = [], jobChoices = [["none", 999]], _iterator = _createForOfIteratorHelper7(quests), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var quest = _step.value, job = quest.name, jobAt = (0, import_kolmafia26.indexOf)(page, job, at);
        if (jobAt != -1) {
          availableJobs.push(quest), jobChoices.push([job, jobAt]);
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var bestJob = availableJobs.sort(function(a, b) {
      return a.priority - b.priority;
    })[0], sortedChoices = jobChoices.sort(function(a, b) {
      return a[1] - b[1];
    });
    if (bestJob.priority <= priorityNum)
      for (var index in sortedChoices) {
        var jobName = sortedChoices[index][0];
        if (jobName === bestJob.name) {
          choice = parseInt(index) + 1;
          break;
        }
      }
    (0, import_kolmafia26.runChoice)(choice);
  }
}
function turnInQuest() {
  questComplete() && (activeQuest().name === "racism" && _set("questEStSocialJusticeI", "unstarted"), (0, import_kolmafia26.visitUrl)(kioskUrl), (0, import_kolmafia26.runChoice)(3));
}
var keyCardsLocations = /* @__PURE__ */ new Map([[$item(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral20(["keycard \u03B1"]))), $location(_templateObject2112 || (_templateObject2112 = _taggedTemplateLiteral20(["Barf Mountain"])))], [$item(_templateObject2210 || (_templateObject2210 = _taggedTemplateLiteral20(["keycard \u03B2"]))), $location(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral20(["Pirates of the Garbage Barges"])))], [$item(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral20(["keycard \u03B3"]))), $location(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral20(["The Toxic Teacups"])))], [$item(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral20(["keycard \u03B4"]))), $location(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral20(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))]]);
function canFightWartDinsey() {
  return Array.from(keyCardsLocations.keys()).every(function(keycard) {
    return have(keycard);
  }) && !foughtWartDinseyThisLife() && getRemainingLiver() >= 0 && (0, import_kolmafia26.myAdventures)() > 0;
}
function coasterNextTurn() {
  return get("dinseyRollercoasterNext");
}
function foughtWartDinseyThisLife() {
  return get("lastWartDinseyDefeated") === (0, import_kolmafia26.myAscensions)();
}
function hasDisposedGarbage() {
  return get("_dinseyGarbageDisposed");
}

// src/resources/2015/MayoClinic.ts
var MayoClinic_exports = {};
__export(MayoClinic_exports, {
  Mayo: function() {
    return Mayo;
  },
  have: function() {
    return have18;
  },
  installed: function() {
    return installed3;
  },
  setMayoMinder: function() {
    return setMayoMinder;
  }
});
init_kolmafia_polyfill();
var import_kolmafia27 = require("kolmafia");
var _templateObject130, _templateObject231, _templateObject330, _templateObject428, _templateObject518, _templateObject615, _templateObject713, _templateObject813, _templateObject912, _templateObject1012;
function _taggedTemplateLiteral21(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var Mayo = {
  nex: $item(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral21(["Mayonex"]))),
  diol: $item(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral21(["Mayodiol"]))),
  zapine: $item(_templateObject330 || (_templateObject330 = _taggedTemplateLiteral21(["Mayozapine"]))),
  flex: $item(_templateObject428 || (_templateObject428 = _taggedTemplateLiteral21(["Mayoflex"])))
};
function installed3() {
  return (0, import_kolmafia27.getWorkshed)() === $item(_templateObject518 || (_templateObject518 = _taggedTemplateLiteral21(["portable Mayo Clinic"])));
}
function have18() {
  return have($item(_templateObject615 || (_templateObject615 = _taggedTemplateLiteral21(["portable Mayo Clinic"])))) || installed3();
}
function setMayoMinder(mayo) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  return (0, import_kolmafia27.getWorkshed)() !== $item(_templateObject713 || (_templateObject713 = _taggedTemplateLiteral21(["portable Mayo Clinic"]))) ? !1 : Object.values(Mayo).includes(mayo) ? get("mayoInMouth") && get("mayoInMouth") !== mayo.name ? (logger_default.error("Currently have incorrect mayo in mouth"), !1) : ((0, import_kolmafia27.retrieveItem)(quantity, mayo), have($item(_templateObject813 || (_templateObject813 = _taggedTemplateLiteral21(["Mayo Minder\u2122"])))) || (0, import_kolmafia27.buy)($item(_templateObject912 || (_templateObject912 = _taggedTemplateLiteral21(["Mayo Minder\u2122"])))), get("mayoMinderSetting") !== mayo.name && withChoice(1076, (0, import_kolmafia27.toInt)(mayo) - 8260, function() {
    return (0, import_kolmafia27.use)($item(_templateObject1012 || (_templateObject1012 = _taggedTemplateLiteral21(["Mayo Minder\u2122"]))));
  }), get("mayoMinderSetting") === mayo.name) : (logger_default.error("Invalid mayo selected"), !1);
}

// src/resources/2016/SourceTerminal.ts
var SourceTerminal_exports = {};
__export(SourceTerminal_exports, {
  Buffs: function() {
    return Buffs;
  },
  Digitize: function() {
    return Digitize;
  },
  Items: function() {
    return Items;
  },
  RolloverBuffs: function() {
    return RolloverBuffs;
  },
  Skills: function() {
    return Skills;
  },
  canDigitize: function() {
    return canDigitize;
  },
  couldDigitize: function() {
    return couldDigitize;
  },
  duplicateUsesRemaining: function() {
    return duplicateUsesRemaining;
  },
  educate: function() {
    return educate;
  },
  enhance: function() {
    return enhance;
  },
  enhanceBuffDuration: function() {
    return enhanceBuffDuration;
  },
  enhanceUsesRemaining: function() {
    return enhanceUsesRemaining;
  },
  enquiry: function() {
    return enquiry;
  },
  enquiryBuffDuration: function() {
    return enquiryBuffDuration;
  },
  extrude: function() {
    return extrude;
  },
  getChips: function() {
    return getChips;
  },
  getDigitizeMonster: function() {
    return getDigitizeMonster;
  },
  getDigitizeMonsterCount: function() {
    return getDigitizeMonsterCount;
  },
  getDigitizeUses: function() {
    return getDigitizeUses;
  },
  getDigitizeUsesRemaining: function() {
    return getDigitizeUsesRemaining;
  },
  getDuplicateUses: function() {
    return getDuplicateUses;
  },
  getEnhanceUses: function() {
    return getEnhanceUses;
  },
  getMaximumDigitizeUses: function() {
    return getMaximumDigitizeUses;
  },
  getPortscanUses: function() {
    return getPortscanUses;
  },
  getSkills: function() {
    return getSkills;
  },
  have: function() {
    return have19;
  },
  isCurrentSkill: function() {
    return isCurrentSkill;
  },
  item: function() {
    return item;
  },
  maximumDuplicateUses: function() {
    return maximumDuplicateUses;
  },
  maximumEnhanceUses: function() {
    return maximumEnhanceUses;
  },
  prepareDigitize: function() {
    return prepareDigitize;
  }
});
init_kolmafia_polyfill();
var import_kolmafia28 = require("kolmafia");
var _templateObject131, _templateObject238, _templateObject331, _templateObject429, _templateObject519, _templateObject616, _templateObject714, _templateObject814, _templateObject913, _templateObject1013, _templateObject1111, _templateObject1211, _templateObject139, _templateObject148, _templateObject158, _templateObject168, _templateObject178, _templateObject188, _templateObject198, _templateObject208, _templateObject2113, _templateObject2211, _templateObject239, _templateObject248, _templateObject258, _templateObject268, _templateObject278;
function _createForOfIteratorHelper8(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray15(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray15(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray15(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray15(o, minLen);
  }
}
function _arrayLikeToArray15(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral22(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item = $item(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral22(["Source terminal"])));
function have19() {
  return haveInCampground(item);
}
var Buffs = {
  Items: $effect(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral22(["items.enh"]))),
  Meat: $effect(_templateObject331 || (_templateObject331 = _taggedTemplateLiteral22(["meat.enh"]))),
  Init: $effect(_templateObject429 || (_templateObject429 = _taggedTemplateLiteral22(["init.enh"]))),
  Critical: $effect(_templateObject519 || (_templateObject519 = _taggedTemplateLiteral22(["critical.enh"]))),
  Damage: $effect(_templateObject616 || (_templateObject616 = _taggedTemplateLiteral22(["damage.enh"]))),
  Substats: $effect(_templateObject714 || (_templateObject714 = _taggedTemplateLiteral22(["substats.enh"])))
};
function enhance(buff) {
  return Object.values(Buffs).includes(buff) ? (0, import_kolmafia28.cliExecute)("terminal enhance ".concat(buff.name)) : !1;
}
var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: $effect(_templateObject814 || (_templateObject814 = _taggedTemplateLiteral22(["familiar.enq"]))),
  /** +25 ML */
  Monsters: $effect(_templateObject913 || (_templateObject913 = _taggedTemplateLiteral22(["monsters.enq"]))),
  /** +5 Prismatic Resistance */
  Protect: $effect(_templateObject1013 || (_templateObject1013 = _taggedTemplateLiteral22(["protect.enq"]))),
  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: $effect(_templateObject1111 || (_templateObject1111 = _taggedTemplateLiteral22(["stats.enq"])))
};
function enquiry(rolloverBuff) {
  return Object.values(RolloverBuffs).includes(rolloverBuff) ? (0, import_kolmafia28.cliExecute)("terminal enquiry ".concat(rolloverBuff.name)) : !1;
}
var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: $skill(_templateObject1211 || (_templateObject1211 = _taggedTemplateLiteral22(["Extract"]))),
  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: $skill(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral22(["Digitize"]))),
  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: $skill(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral22(["Compress"]))),
  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: $skill(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral22(["Duplicate"]))),
  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: $skill(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral22(["Portscan"]))),
  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: $skill(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral22(["Turbo"])))
};
function educate(skills2) {
  var skillsArray = Array.isArray(skills2) ? skills2.slice(0, 2) : [skills2];
  if (arrayEquals(skillsArray, getSkills()))
    return !0;
  var _iterator = _createForOfIteratorHelper8(skillsArray), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var skill2 = _step.value;
      if (!Object.values(Skills).includes(skill2))
        return !1;
      (0, import_kolmafia28.cliExecute)("terminal educate ".concat(skill2.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return !0;
}
function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(function(p) {
    return get(p);
  }).filter(function(s) {
    return s !== "";
  }).map(function(s) {
    return import_kolmafia28.Skill.get(s.slice(0, -4));
  });
}
function isCurrentSkill(skills2) {
  var currentSkills = getSkills(), skillsArray = Array.isArray(skills2) ? skills2.slice(0, 2) : [skills2];
  return skillsArray.every(function(skill2) {
    return currentSkills.includes(skill2);
  });
}
var Items = /* @__PURE__ */ new Map([[$item(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral22(["browser cookie"]))), "food.ext"], [$item(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral22(["hacked gibson"]))), "booze.ext"], [$item(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral22(["Source shades"]))), "goggles.ext"], [$item(_templateObject2113 || (_templateObject2113 = _taggedTemplateLiteral22(["Source terminal GRAM chip"]))), "gram.ext"], [$item(_templateObject2211 || (_templateObject2211 = _taggedTemplateLiteral22(["Source terminal PRAM chip"]))), "pram.ext"], [$item(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral22(["Source terminal SPAM chip"]))), "spam.ext"], [$item(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral22(["Source terminal CRAM chip"]))), "cram.ext"], [$item(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral22(["Source terminal DRAM chip"]))), "dram.ext"], [$item(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral22(["Source terminal TRAM chip"]))), "tram.ext"], [$item(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral22(["software bug"]))), "familiar.ext"]]);
function extrude(item8) {
  var fileName = Items.get(item8);
  return fileName ? (0, import_kolmafia28.cliExecute)("terminal extrude ".concat(fileName)) : !1;
}
function getChips() {
  return get("sourceTerminalChips").split(",");
}
function getDigitizeUses() {
  return get("_sourceTerminalDigitizeUses");
}
function getDigitizeMonster() {
  return get("_sourceTerminalDigitizeMonster");
}
function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  return isCurrentSkill(Skills.Digitize) ? !0 : educate(Skills.Digitize);
}
function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(function() {
  return couldDigitize();
}, function() {
  return prepareDigitize();
}, function() {
  return canDigitize();
}, function() {
  return getDigitizeMonster();
});
function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
function maximumDuplicateUses() {
  return (0, import_kolmafia28.myPath)() === import_kolmafia28.Path.get("The Source") ? 5 : 1;
}
function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
function maximumEnhanceUses() {
  return 1 + getChips().filter(function(chip) {
    return ["CRAM", "SCRAM"].includes(chip);
  }).length;
}
function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}

// src/resources/2016/Witchess.ts
var Witchess_exports = {};
__export(Witchess_exports, {
  fightPiece: function() {
    return fightPiece;
  },
  fightsDone: function() {
    return fightsDone;
  },
  have: function() {
    return have20;
  },
  item: function() {
    return item2;
  },
  pieces: function() {
    return pieces;
  }
});
init_kolmafia_polyfill();
var import_kolmafia29 = require("kolmafia");
var _templateObject140;
function _taggedTemplateLiteral23(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item2 = $item(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral23(["Witchess Set"])));
function have20() {
  return haveInCampground(item2);
}
function fightsDone() {
  return get("_witchessFights");
}
var pieces = import_kolmafia29.Monster.get(["Witchess Pawn", "Witchess Knight", "Witchess Bishop", "Witchess Rook", "Witchess Queen", "Witchess King", "Witchess Witch", "Witchess Ox"]);
function fightPiece(piece) {
  if (!pieces.includes(piece))
    throw new Error("That is not a valid piece.");
  if (!(0, import_kolmafia29.visitUrl)("campground.php?action=witchess").includes("whichchoice value=1181"))
    throw new Error("Failed to open Witchess.");
  if (!(0, import_kolmafia29.runChoice)(1).includes("whichchoice=1182"))
    throw new Error("Failed to visit shrink ray.");
  if (!(0, import_kolmafia29.visitUrl)("choice.php?option=1&pwd=".concat((0, import_kolmafia29.myHash)(), "&whichchoice=1182&piece=").concat((0, import_kolmafia29.toInt)(piece)), !1).includes(piece.name))
    throw new Error("Failed to start fight.");
  return (0, import_kolmafia29.runCombat)();
}

// src/resources/2017/MummingTrunk.ts
var MummingTrunk_exports = {};
__export(MummingTrunk_exports, {
  currentCostumes: function() {
    return currentCostumes;
  }
});
init_kolmafia_polyfill();
var import_kolmafia30 = require("kolmafia");
function _createForOfIteratorHelper9(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray16(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray16(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray16(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray16(o, minLen);
  }
}
function _arrayLikeToArray16(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function toModifier(input) {
  var regExp = new RegExp(/Experience \((.*?)\)/), matcher = input.match(regExp);
  return matcher ? "".concat(matcher[2], " Experience") : input;
}
function currentCostumes() {
  var entries2 = get("_mummeryMods").split(","), returnValue = /* @__PURE__ */ new Map(), regExp = new RegExp(/([^:]+): \[(d+)\*fam\(([^)]+)\)\]/), _iterator = _createForOfIteratorHelper9(entries2), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var entry = _step.value, matcher = entry.match(regExp);
      matcher && returnValue.set((0, import_kolmafia30.toFamiliar)(matcher[3]), [toModifier(matcher[1]), parseInt(matcher[2])]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}

// src/resources/2017/Pantogram.ts
var Pantogram_exports = {};
__export(Pantogram_exports, {
  findRequirements: function() {
    return findRequirements;
  },
  have: function() {
    return have21;
  },
  havePants: function() {
    return havePants;
  },
  makePants: function() {
    return makePants;
  },
  makePantsFromObject: function() {
    return makePantsFromObject;
  }
});
init_kolmafia_polyfill();
var import_kolmafia31 = require("kolmafia");
var _templateObject141, _templateObject240, _Alignment, _Element, _templateObject337, _templateObject430, _templateObject520, _templateObject617, _templateObject715, _templateObject815, _templateObject914, _LeftSacrifice, _templateObject1014, _templateObject1112, _templateObject1212, _templateObject1310, _templateObject149, _templateObject159, _templateObject169, _templateObject179, _templateObject189, _MiddleSacrifice, _templateObject199, _templateObject209, _templateObject2114, _templateObject2212, _templateObject2310, _templateObject249, _templateObject259, _templateObject269, _templateObject279, _templateObject287, _RightSacrifice;
function _slicedToArray7(arr, i) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i) || _unsupportedIterableToArray17(arr, i) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray17(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray17(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray17(o, minLen);
  }
}
function _arrayLikeToArray17(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit7(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _defineProperty11(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral24(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var pantogram = $item(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral24(["portable pantogram"]))), pants = $item(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral24(["pantogram pants"])));
function have21() {
  return have(pantogram);
}
function havePants() {
  return have(pants);
}
var Alignment = (_Alignment = {}, _defineProperty11(_Alignment, "Muscle", 1), _defineProperty11(_Alignment, "Mysticality", 2), _defineProperty11(_Alignment, "Moxie", 3), _Alignment), Element3 = (_Element = {}, _defineProperty11(_Element, "Hot Resistance: 2", 1), _defineProperty11(_Element, "Cold Resistance: 2", 2), _defineProperty11(_Element, "Spooky Resistance: 2", 3), _defineProperty11(_Element, "Sleaze Resistance: 2", 4), _defineProperty11(_Element, "Stench Resistance: 2", 5), _Element), LeftSacrifice = (_LeftSacrifice = {}, _defineProperty11(_LeftSacrifice, "Maximum HP: 40", [-1, 0]), _defineProperty11(_LeftSacrifice, "Maximum MP: 20", [-2, 0]), _defineProperty11(_LeftSacrifice, "HP Regen Max: 10", [$item(_templateObject337 || (_templateObject337 = _taggedTemplateLiteral24(["red pixel potion"]))), 1]), _defineProperty11(_LeftSacrifice, "HP Regen Max: 15", [$item(_templateObject430 || (_templateObject430 = _taggedTemplateLiteral24(["royal jelly"]))), 1]), _defineProperty11(_LeftSacrifice, "HP Regen Max: 20", [$item(_templateObject520 || (_templateObject520 = _taggedTemplateLiteral24(["scented massage oil"]))), 1]), _defineProperty11(_LeftSacrifice, "MP Regen Max: 10", [$item(_templateObject617 || (_templateObject617 = _taggedTemplateLiteral24(["Cherry Cloaca Cola"]))), 1]), _defineProperty11(_LeftSacrifice, "MP Regen Max: 15", [$item(_templateObject715 || (_templateObject715 = _taggedTemplateLiteral24(["bubblin' crude"]))), 1]), _defineProperty11(_LeftSacrifice, "MP Regen Max: 20", [$item(_templateObject815 || (_templateObject815 = _taggedTemplateLiteral24(["glowing New Age crystal"]))), 1]), _defineProperty11(_LeftSacrifice, "Mana Cost: -3", [$item(_templateObject914 || (_templateObject914 = _taggedTemplateLiteral24(["baconstone"]))), 1]), _LeftSacrifice);
function getLeftSacPair(mod) {
  return LeftSacrifice[mod];
}
var MiddleSacrifice = (_MiddleSacrifice = {}, _defineProperty11(_MiddleSacrifice, "Combat Rate: -5", [-1, 0]), _defineProperty11(_MiddleSacrifice, "Combat Rate: 5", [-2, 0]), _defineProperty11(_MiddleSacrifice, "Critical Hit Percent: 10", [$item(_templateObject1014 || (_templateObject1014 = _taggedTemplateLiteral24(["hamethyst"]))), 1]), _defineProperty11(_MiddleSacrifice, "Initiative: 50", [$item(_templateObject1112 || (_templateObject1112 = _taggedTemplateLiteral24(["bar skin"]))), 1]), _defineProperty11(_MiddleSacrifice, "Familiar Weight: 10", [$item(_templateObject1212 || (_templateObject1212 = _taggedTemplateLiteral24(["lead necklace"]))), 11]), _defineProperty11(_MiddleSacrifice, "Candy Drop: 100", [$item(_templateObject1310 || (_templateObject1310 = _taggedTemplateLiteral24(["huge bowl of candy"]))), 1]), _defineProperty11(_MiddleSacrifice, "Item Drop Penalty: -10", [$item(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral24(["sea salt crystal"]))), 11]), _defineProperty11(_MiddleSacrifice, "Fishing Skill: 5", [$item(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral24(["wriggling worm"]))), 1]), _defineProperty11(_MiddleSacrifice, "Pool Skill: 5", [$item(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral24(["8-ball"]))), 15]), _defineProperty11(_MiddleSacrifice, "Avatar: Purple", [$item(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral24(["moxie weed"]))), 99]), _defineProperty11(_MiddleSacrifice, "Drops Items: true", [$item(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral24(["ten-leaf clover"]))), 1]), _MiddleSacrifice);
function getMiddleSacPair(mod) {
  return MiddleSacrifice[mod];
}
var RightSacrifice = (_RightSacrifice = {}, _defineProperty11(_RightSacrifice, "Weapon Damage: 20", [-1, 0]), _defineProperty11(_RightSacrifice, "Spell Damage Percent: 20", [-2, 0]), _defineProperty11(_RightSacrifice, "Meat Drop: 30", [$item(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral24(["taco shell"]))), 1]), _defineProperty11(_RightSacrifice, "Meat Drop: 60", [$item(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral24(["porquoise"]))), 1]), _defineProperty11(_RightSacrifice, "Item Drop: 15", [$item(_templateObject2114 || (_templateObject2114 = _taggedTemplateLiteral24(["fairy gravy boat"]))), 1]), _defineProperty11(_RightSacrifice, "Item Drop: 30", [$item(_templateObject2212 || (_templateObject2212 = _taggedTemplateLiteral24(["tiny dancer"]))), 1]), _defineProperty11(_RightSacrifice, "Muscle Experience: 3", [$item(_templateObject2310 || (_templateObject2310 = _taggedTemplateLiteral24(["Knob Goblin firecracker"]))), 3]), _defineProperty11(_RightSacrifice, "Mysticality Experience: 3", [$item(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral24(["razor-sharp can lid"]))), 3]), _defineProperty11(_RightSacrifice, "Moxie Experience: 3", [$item(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral24(["spider web"]))), 3]), _defineProperty11(_RightSacrifice, "Muscle Experience Percent: 25", [$item(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral24(["synthetic marrow"]))), 5]), _defineProperty11(_RightSacrifice, "Mysticality Experience Percent: 25", [$item(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral24(["haunted battery"]))), 5]), _defineProperty11(_RightSacrifice, "Moxie Experience Percent: 25", [$item(_templateObject287 || (_templateObject287 = _taggedTemplateLiteral24(["the funk"]))), 5]), _RightSacrifice);
function getRightSacPair(mod) {
  return RightSacrifice[mod];
}
function findRequirements(modifiers) {
  var leftSac = modifiers.leftSac, rightSac = modifiers.rightSac, middleSac = modifiers.middleSac, returnValue = /* @__PURE__ */ new Map();
  if (leftSac) {
    var _getLeftSacPair = getLeftSacPair(leftSac), _getLeftSacPair2 = _slicedToArray7(_getLeftSacPair, 2), sacrifice = _getLeftSacPair2[0], quantity = _getLeftSacPair2[1];
    sacrifice instanceof import_kolmafia31.Item && returnValue.set(sacrifice, quantity);
  }
  if (rightSac) {
    var _getRightSacPair = getRightSacPair(rightSac), _getRightSacPair2 = _slicedToArray7(_getRightSacPair, 2), _sacrifice = _getRightSacPair2[0], _quantity = _getRightSacPair2[1];
    _sacrifice instanceof import_kolmafia31.Item && returnValue.set(_sacrifice, _quantity);
  }
  if (middleSac) {
    var _getMiddleSacPair = getMiddleSacPair(middleSac), _getMiddleSacPair2 = _slicedToArray7(_getMiddleSacPair, 2), _sacrifice2 = _getMiddleSacPair2[0], _quantity2 = _getMiddleSacPair2[1];
    _sacrifice2 instanceof import_kolmafia31.Item && returnValue.set(_sacrifice2, _quantity2);
  }
  return returnValue;
}
function sacrificePairToURL(pair) {
  var _pair = _slicedToArray7(pair, 2), rawSacrifice = _pair[0], quantity = _pair[1], sacrifice = rawSacrifice instanceof import_kolmafia31.Item ? (0, import_kolmafia31.toInt)(rawSacrifice) : rawSacrifice;
  return "".concat(sacrifice, ",").concat(quantity);
}
function makePants(alignment, element, leftSac, middleSac, rightSac) {
  if (have(pants) || !have(pantogram))
    return !1;
  var requirements = findRequirements({
    alignment: alignment,
    element: element,
    leftSac: leftSac,
    rightSac: rightSac,
    middleSac: middleSac
  });
  if (Array.from(requirements.entries()).some(function(_ref) {
    var _ref2 = _slicedToArray7(_ref, 2), item8 = _ref2[0], quantity = _ref2[1];
    return !have(item8, quantity);
  }))
    return !1;
  var s1 = sacrificePairToURL(getLeftSacPair(leftSac)), s2 = sacrificePairToURL(getRightSacPair(rightSac)), s3 = sacrificePairToURL(getMiddleSacPair(middleSac)), url = "choice.php?whichchoice=1270&pwd&option=1&m=".concat(Alignment[alignment], "&e=").concat(Element3[element], "&s1=").concat(s1, "&s2=").concat(s2, "&s3=").concat(s3);
  return (0, import_kolmafia31.visitUrl)("inv_use.php?pwd&whichitem=9573"), (0, import_kolmafia31.visitUrl)(url), have(pants);
}
function makePantsFromObject(pants2) {
  return makePants(pants2.alignment, pants2.element, pants2.leftSac, pants2.middleSac, pants2.rightSac);
}

// src/resources/2017/Robortender.ts
var Robortender_exports = {};
__export(Robortender_exports, {
  currentDrinks: function() {
    return currentDrinks;
  },
  drinks: function() {
    return drinks;
  },
  dropChance: function() {
    return dropChance;
  },
  dropFrom: function() {
    return dropFrom;
  },
  familiar: function() {
    return familiar4;
  },
  feed: function() {
    return feed;
  },
  have: function() {
    return have22;
  },
  majorDrinks: function() {
    return majorDrinks;
  },
  minorDrinks: function() {
    return minorDrinks;
  }
});
init_kolmafia_polyfill();
var import_kolmafia32 = require("kolmafia");
var _templateObject150, _templateObject241, _templateObject338, _templateObject431, _templateObject521, _templateObject618, _templateObject716, _templateObject816, _templateObject915, _templateObject1015, _templateObject1113, _templateObject1213, _templateObject1311, _templateObject1410, _templateObject1510, _templateObject1610, _templateObject1710, _templateObject1810, _templateObject1910, _templateObject2010, _templateObject2115, _templateObject2213, _templateObject2311, _templateObject2410, _templateObject2510, _templateObject2610, _templateObject2710, _templateObject288, _templateObject297, _templateObject307, _templateObject3111, _templateObject3210, _templateObject339, _templateObject347, _templateObject357, _templateObject367, _templateObject377;
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray18(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray18(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray18(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray18(o, minLen);
  }
}
function _iterableToArray9(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray18(arr);
}
function _arrayLikeToArray18(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral25(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar4 = $familiar(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral25(["Robortender"])));
function have22() {
  return (0, import_kolmafia32.haveFamiliar)(familiar4);
}
var phylumDrops = /* @__PURE__ */ new Map([
  [$phylum(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral25(["Bug"]))), $item(_templateObject338 || (_templateObject338 = _taggedTemplateLiteral25(["pickled grasshopper"])))],
  // bottle of anís
  [$phylum(_templateObject431 || (_templateObject431 = _taggedTemplateLiteral25(["Constellation"]))), import_kolmafia32.Item.get(9348)],
  [$phylum(_templateObject521 || (_templateObject521 = _taggedTemplateLiteral25(["Demon"]))), $item(_templateObject618 || (_templateObject618 = _taggedTemplateLiteral25(["bottle of novelty hot sauce"])))],
  [$phylum(_templateObject716 || (_templateObject716 = _taggedTemplateLiteral25(["Elemental"]))), $item(_templateObject816 || (_templateObject816 = _taggedTemplateLiteral25(["elemental sugarcube"])))],
  [$phylum(_templateObject915 || (_templateObject915 = _taggedTemplateLiteral25(["Elf"]))), $item(_templateObject1015 || (_templateObject1015 = _taggedTemplateLiteral25(["peppermint sprig"])))],
  [$phylum(_templateObject1113 || (_templateObject1113 = _taggedTemplateLiteral25(["Fish"]))), $item(_templateObject1213 || (_templateObject1213 = _taggedTemplateLiteral25(["bottle of clam juice"])))],
  [$phylum(_templateObject1311 || (_templateObject1311 = _taggedTemplateLiteral25(["Goblin"]))), $item(_templateObject1410 || (_templateObject1410 = _taggedTemplateLiteral25(["cocktail mushroom"])))],
  [$phylum(_templateObject1510 || (_templateObject1510 = _taggedTemplateLiteral25(["Hippy"]))), $item(_templateObject1610 || (_templateObject1610 = _taggedTemplateLiteral25(["shot of granola liqueur"])))],
  [$phylum(_templateObject1710 || (_templateObject1710 = _taggedTemplateLiteral25(["Hobo"]))), $item(_templateObject1810 || (_templateObject1810 = _taggedTemplateLiteral25(["can of cherry-flavored sterno"])))],
  [$phylum(_templateObject1910 || (_templateObject1910 = _taggedTemplateLiteral25(["Horror"]))), $item(_templateObject2010 || (_templateObject2010 = _taggedTemplateLiteral25(["lump of black ichor"])))],
  [$phylum(_templateObject2115 || (_templateObject2115 = _taggedTemplateLiteral25(["Humanoid"]))), $item(_templateObject2213 || (_templateObject2213 = _taggedTemplateLiteral25(["bottle of gregnadigne"])))],
  // bottle of Crème de Fugu
  [$phylum(_templateObject2311 || (_templateObject2311 = _taggedTemplateLiteral25(["Mer-kin"]))), import_kolmafia32.Item.get(9358)],
  [$phylum(_templateObject2410 || (_templateObject2410 = _taggedTemplateLiteral25(["Orc"]))), $item(_templateObject2510 || (_templateObject2510 = _taggedTemplateLiteral25(["baby oil shooter"])))],
  [$phylum(_templateObject2610 || (_templateObject2610 = _taggedTemplateLiteral25(["Penguin"]))), $item(_templateObject2710 || (_templateObject2710 = _taggedTemplateLiteral25(["fish head"])))],
  [$phylum(_templateObject288 || (_templateObject288 = _taggedTemplateLiteral25(["Pirate"]))), $item(_templateObject297 || (_templateObject297 = _taggedTemplateLiteral25(["limepatch"])))],
  [$phylum(_templateObject307 || (_templateObject307 = _taggedTemplateLiteral25(["Plant"]))), $item(_templateObject3111 || (_templateObject3111 = _taggedTemplateLiteral25(["pile of dirt"])))],
  [$phylum(_templateObject3210 || (_templateObject3210 = _taggedTemplateLiteral25(["Slime"]))), $item(_templateObject339 || (_templateObject339 = _taggedTemplateLiteral25(["slime shooter"])))],
  [$phylum(_templateObject347 || (_templateObject347 = _taggedTemplateLiteral25(["Weird"]))), $item(_templateObject357 || (_templateObject357 = _taggedTemplateLiteral25(["imaginary lemon"])))]
]);
function dropFrom(target) {
  var _phylumDrops$get, phylum = target instanceof import_kolmafia32.Monster ? target.phylum : target;
  return (_phylumDrops$get = phylumDrops.get(phylum)) !== null && _phylumDrops$get !== void 0 ? _phylumDrops$get : $item.none;
}
function dropChance() {
  var _dropNumber, dropNumber = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_roboDrops");
  return (_dropNumber = [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber]) !== null && _dropNumber !== void 0 ? _dropNumber : 0.2;
}
var minorDrinks = $items(_templateObject367 || (_templateObject367 = _taggedTemplateLiteral25(["literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini"]))), majorDrinks = $items(_templateObject377 || (_templateObject377 = _taggedTemplateLiteral25(["eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins"]))), drinks = [].concat(_toConsumableArray9(minorDrinks), _toConsumableArray9(majorDrinks));
function currentDrinks() {
  var pref = get("_roboDrinks");
  return pref ? pref.split(",").filter(function(x) {
    return x.trim();
  }).map(function(name) {
    return (0, import_kolmafia32.toItem)(name);
  }).filter(function(drink) {
    return drinks.includes(drink);
  }) : [];
}
function feed(beverage) {
  if (currentDrinks().includes(beverage))
    return !0;
  if (currentDrinks().length >= 5 || !drinks.includes(beverage) || !(0, import_kolmafia32.itemAmount)(beverage) || !have22())
    return !1;
  var priorFamiliar = (0, import_kolmafia32.myFamiliar)();
  return (0, import_kolmafia32.useFamiliar)(familiar4), (0, import_kolmafia32.visitUrl)("inventory.php?action=robooze&which=1&whichitem=".concat((0, import_kolmafia32.toInt)(beverage))), (0, import_kolmafia32.useFamiliar)(priorFamiliar), currentDrinks().includes(beverage);
}

// src/resources/2017/Spacegate.ts
var Spacegate_exports = {};
__export(Spacegate_exports, {
  animalLife: function() {
    return animalLife;
  },
  dial: function() {
    return dial;
  },
  dialled: function() {
    return dialled;
  },
  getHazardEquipment: function() {
    return getHazardEquipment;
  },
  getVaccine: function() {
    return getVaccine;
  },
  have: function() {
    return have23;
  },
  hazardEquipment: function() {
    return hazardEquipment;
  },
  hazards: function() {
    return hazards;
  },
  intelligentLife: function() {
    return intelligentLife;
  },
  murderBots: function() {
    return murderBots;
  },
  planetCoords: function() {
    return planetCoords;
  },
  planetName: function() {
    return planetName;
  },
  plantLife: function() {
    return plantLife;
  },
  ruins: function() {
    return ruins;
  },
  spants: function() {
    return spants;
  },
  updateStatus: function() {
    return updateStatus;
  }
});
init_kolmafia_polyfill();
var import_kolmafia33 = require("kolmafia");
var _templateObject151, _templateObject250, _templateObject340, _templateObject436, _templateObject525;
function _slicedToArray8(arr, i) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i) || _unsupportedIterableToArray19(arr, i) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray19(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray19(o, minLen);
  }
}
function _arrayLikeToArray19(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit8(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral26(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have23() {
  return get("spacegateAlways") || get("_spacegateToday");
}
function updateStatus() {
  (0, import_kolmafia33.visitUrl)("place.php?whichplace=spacegate&action=sg_Terminal");
}
function dialled() {
  return updateStatus(), get("_spacegateCoordinates") !== "";
}
function hazards() {
  return get("_spacegateHazards");
}
function planetName() {
  return get("_spacegatePlanetName");
}
function planetCoords() {
  return get("_spacegateCoordinates");
}
function plantLife() {
  return get("_spacegatePlantLife");
}
function animalLife() {
  return get("_spacegateAnimalLife");
}
function intelligentLife() {
  return get("_spacegateIntelligentLife");
}
function ruins() {
  return get("_spacegateRuins");
}
function spants() {
  return get("_spacegateSpant");
}
function murderBots() {
  return get("_spacegateMurderbot");
}
function hazardEquipment(hazards2) {
  var hazardEquipment2 = {
    "toxic atmosphere": $item(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral26(["filter helmet"]))),
    "high gravity": $item(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral26(["exo-servo leg braces"]))),
    irradiated: $item(_templateObject340 || (_templateObject340 = _taggedTemplateLiteral26(["rad cloak"]))),
    "magnetic storms": $item(_templateObject436 || (_templateObject436 = _taggedTemplateLiteral26(["gate transceiver"]))),
    "high winds": $item(_templateObject525 || (_templateObject525 = _taggedTemplateLiteral26(["high-friction boots"])))
  };
  return Object.entries(hazardEquipment2).filter(function(_ref) {
    var _ref2 = _slicedToArray8(_ref, 1), clue = _ref2[0];
    return hazards2.includes(clue);
  }).map(function(_ref3) {
    var _ref4 = _slicedToArray8(_ref3, 2), item8 = _ref4[1];
    return item8;
  });
}
function getHazardEquipment() {
  var equipment = hazardEquipment(hazards());
  equipment.forEach(function(equip2) {
    var num = (0, import_kolmafia33.toInt)(equip2) - 9404;
    (0, import_kolmafia33.visitUrl)("place.php?whichplace=spacegate&action=sg_requisition"), (0, import_kolmafia33.visitUrl)("choice.php?whichchoice=1233&option=".concat(num));
  });
}
function getVaccine(choice) {
  if (!get("_spacegateVaccine")) {
    var nums = {
      Rainbow: 1,
      "Elemental Resistance": 1,
      "Broad-Spectrum": 2,
      Stats: 2,
      Emotional: 3,
      "Monster Level": 3
    }, num = nums[choice];
    if (!get("spacegateVaccine".concat(num)))
      throw "You don't appear to have that Vaccine Unlocked!";
    (0, import_kolmafia33.cliExecute)("spacegate vaccine ".concat(num));
  }
}
function dial(address) {
  if (!(!have23() || dialled())) {
    if (!address.match("^[[alpha]]+$") || address.length !== 7)
      throw "Invalid Spacegate Address - must be exactly 7 alphabetic characters";
    (0, import_kolmafia33.cliExecute)("spacegate destination ".concat(address));
  }
}

// src/resources/2017/TunnelOfLove.ts
var TunnelOfLove_exports = {};
__export(TunnelOfLove_exports, {
  LovEnamorang: function() {
    return LovEnamorang;
  },
  couldUseLoveEnamorang: function() {
    return couldUseLoveEnamorang;
  },
  fightAll: function() {
    return fightAll;
  },
  getLovEnamorangMonster: function() {
    return getLovEnamorangMonster;
  },
  getLovEnamorangUses: function() {
    return getLovEnamorangUses;
  },
  have: function() {
    return have24;
  },
  haveLovEnamorang: function() {
    return haveLovEnamorang;
  },
  isUsed: function() {
    return isUsed;
  }
});
init_kolmafia_polyfill();
var import_kolmafia34 = require("kolmafia");
var _templateObject160, _templateObject251;
function _taggedTemplateLiteral27(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have24() {
  return get("loveTunnelAvailable");
}
function isUsed() {
  return get("_loveTunnelUsed");
}
function haveLovEnamorang() {
  return have($item(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral27(["LOV Enamorang"]))));
}
function getLovEnamorangUses() {
  return get("_enamorangs");
}
function couldUseLoveEnamorang() {
  return !haveWandererCounter(Wanderer.Enamorang) && getLovEnamorangUses() < 3 && haveLovEnamorang();
}
function getLovEnamorangMonster() {
  return get("enamorangMonster");
}
var LovEnamorang = new Copier(function() {
  return couldUseLoveEnamorang();
}, null, function() {
  return couldUseLoveEnamorang();
}, function() {
  return getLovEnamorangMonster();
});
function equipmentChoice(equipment) {
  switch (equipment) {
    case "LOV Eardigan":
      return 1;
    case "LOV Epaulettes":
      return 2;
    case "LOV Earring":
      return 3;
  }
}
function effectChoice(effect2) {
  switch (effect2) {
    case "Lovebotamy":
      return 1;
    case "Open Heart Surgery":
      return 2;
    case "Wandering Eye Surgery":
      return 3;
  }
}
function extraChoice(extra) {
  switch (extra) {
    case "LOV Enamorang":
      return 1;
    case "LOV Emotionizer":
      return 2;
    case "LOV Extraterrestrial Chocolate":
      return 3;
    case "LOV Echinacea Bouquet":
      return 4;
    case "LOV Elephant":
      return 5;
    case "toast":
      return 6;
    case null:
      return 7;
  }
}
function fightAll(equipment, effect2, extra) {
  _set("choiceAdventure1222", 1), _set("choiceAdventure1223", 1), _set("choiceAdventure1224", equipmentChoice(equipment)), _set("choiceAdventure1225", 1), _set("choiceAdventure1226", effectChoice(effect2)), _set("choiceAdventure1227", 1), _set("choiceAdventure1228", extraChoice(extra)), (0, import_kolmafia34.adv1)($location(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral27(["The Tunnel of L.O.V.E."]))), 0, "");
}

// src/resources/2018/LatteLoversMembersMug.ts
var LatteLoversMembersMug_exports = {};
__export(LatteLoversMembersMug_exports, {
  have: function() {
    return have25;
  },
  refillsRemaining: function() {
    return refillsRemaining;
  },
  sniffedMonster: function() {
    return sniffedMonster;
  }
});
init_kolmafia_polyfill();
var import_kolmafia35 = require("kolmafia");
var _templateObject161;
function _taggedTemplateLiteral28(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have25() {
  return have($item(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral28(["latte lovers member's mug"]))));
}
function sniffedMonster() {
  return (0, import_kolmafia35.getCounter)("Latte Monster") !== -1 ? get("_latteMonster") : null;
}
function refillsRemaining() {
  return 3 - get("_latteRefillsUsed");
}

// src/resources/2018/SongBoom.ts
var SongBoom_exports = {};
__export(SongBoom_exports, {
  dropProgress: function() {
    return dropProgress;
  },
  have: function() {
    return have26;
  },
  item: function() {
    return item3;
  },
  setSong: function() {
    return setSong;
  },
  song: function() {
    return song;
  },
  songBoomSongs: function() {
    return songBoomSongs;
  },
  songChangesLeft: function() {
    return songChangesLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia36 = require("kolmafia");
var _templateObject170;
function _taggedTemplateLiteral29(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item3 = $item(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral29(["SongBoom\u2122 BoomBox"])));
function have26() {
  return have(item3);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
}, songBoomSongs = new Set(Object.keys(keywords));
function song() {
  var stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
function songChangesLeft() {
  return get("_boomBoxSongsLeft");
}
function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0)
      throw new Error("Out of song changes!");
    return (0, import_kolmafia36.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none")), !0;
  } else
    return !1;
}
function dropProgress() {
  return get("_boomBoxFights");
}

// src/resources/2019/BeachComb.ts
var BeachComb_exports = {};
__export(BeachComb_exports, {
  canComb: function() {
    return canComb;
  },
  comb: function() {
    return comb;
  },
  freeCombs: function() {
    return freeCombs;
  },
  have: function() {
    return have27;
  },
  head: function() {
    return head;
  },
  headAvailable: function() {
    return headAvailable;
  },
  headBuffs: function() {
    return headBuffs;
  },
  tideLevel: function() {
    return tideLevel;
  },
  tryHead: function() {
    return tryHead;
  }
});
init_kolmafia_polyfill();
var import_kolmafia37 = require("kolmafia");
var _templateObject171, _templateObject260, _templateObject341, _templateObject437, _templateObject526, _templateObject619, _templateObject717, _templateObject817, _templateObject916, _templateObject1016, _templateObject1114, _templateObject1214, _templateObject1312, _templateObject1411, _templateObject1511, _templateObject1611, _templateObject1711, _templateObject1811, _templateObject1911, _templateObject2011, _templateObject2116;
function _taggedTemplateLiteral30(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function have27() {
  return have(import_kolmafia37.Item.get("Beach Comb"));
}
var headBuffs = [$effect(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral30(["Hot-Headed"]))), $effect(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral30(["Cold as Nice"]))), $effect(_templateObject341 || (_templateObject341 = _taggedTemplateLiteral30(["A Brush with Grossness"]))), $effect(_templateObject437 || (_templateObject437 = _taggedTemplateLiteral30(["Does It Have a Skull In There??"]))), $effect(_templateObject526 || (_templateObject526 = _taggedTemplateLiteral30(["Oiled, Slick"]))), $effect(_templateObject619 || (_templateObject619 = _taggedTemplateLiteral30(["Lack of Body-Building"]))), $effect(_templateObject717 || (_templateObject717 = _taggedTemplateLiteral30(["We're All Made of Starfish"]))), $effect(_templateObject817 || (_templateObject817 = _taggedTemplateLiteral30(["Pomp & Circumsands"]))), $effect(_templateObject916 || (_templateObject916 = _taggedTemplateLiteral30(["Resting Beach Face"]))), $effect(_templateObject1016 || (_templateObject1016 = _taggedTemplateLiteral30(["Do I Know You From Somewhere?"]))), $effect(_templateObject1114 || (_templateObject1114 = _taggedTemplateLiteral30(["You Learned Something Maybe!"])))], head = {
  HOT: $effect(_templateObject1214 || (_templateObject1214 = _taggedTemplateLiteral30(["Hot-Headed"]))),
  COLD: $effect(_templateObject1312 || (_templateObject1312 = _taggedTemplateLiteral30(["Cold as Nice"]))),
  STENCH: $effect(_templateObject1411 || (_templateObject1411 = _taggedTemplateLiteral30(["A Brush with Grossness"]))),
  SPOOKY: $effect(_templateObject1511 || (_templateObject1511 = _taggedTemplateLiteral30(["Does It Have a Skull In There??"]))),
  SLEAZE: $effect(_templateObject1611 || (_templateObject1611 = _taggedTemplateLiteral30(["Oiled, Slick"]))),
  MUSCLE: $effect(_templateObject1711 || (_templateObject1711 = _taggedTemplateLiteral30(["Lack of Body-Building"]))),
  MYSTICALITY: $effect(_templateObject1811 || (_templateObject1811 = _taggedTemplateLiteral30(["We're All Made of Starfish"]))),
  INITIATIVE: $effect(_templateObject1911 || (_templateObject1911 = _taggedTemplateLiteral30(["Resting Beach Face"]))),
  FAMILIAR: $effect(_templateObject2011 || (_templateObject2011 = _taggedTemplateLiteral30(["Do I Know You From Somewhere?"]))),
  EXPERIENCE: $effect(_templateObject2116 || (_templateObject2116 = _taggedTemplateLiteral30(["You Learned Something Maybe!"])))
};
function tideLevel() {
  var day = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia37.gamedayToInt)(), dayOfMonth = 1 + day % 8;
  return 4 - Math.abs(4 - dayOfMonth);
}
function canComb(_ref) {
  var row = _ref.row;
  return row > tideLevel();
}
function freeCombs() {
  return have27() ? clamp(11 - get("_freeBeachWalksUsed"), 0, 11) : 0;
}
function comb() {
  for (var _len = arguments.length, tiles = new Array(_len), _key = 0; _key < _len; _key++)
    tiles[_key] = arguments[_key];
  if (!(!have27() || !tiles.length)) {
    for (var _i = 0, _tiles = tiles; _i < _tiles.length; _i++) {
      var tile = _tiles[_i];
      if (canComb(tile)) {
        var minute = tile.minute, row = tile.row, column = tile.column;
        (0, import_kolmafia37.cliExecute)("beach wander ".concat(minute)), (0, import_kolmafia37.cliExecute)("beach comb ".concat(row, " ").concat(column));
      }
    }
    (0, import_kolmafia37.handlingChoice)() && (0, import_kolmafia37.runChoice)(5);
  }
}
function headAvailable(target) {
  var effect2 = target instanceof import_kolmafia37.Effect ? target : head[target], headNumber = 1 + headBuffs.indexOf(effect2);
  return (0, import_kolmafia37.getProperty)("beachHeadsUnlocked").split(",").includes(headNumber.toString()) && !(0, import_kolmafia37.getProperty)("_beachHeadsUsed").split(",").includes(headNumber.toString());
}
function tryHead(target) {
  var effect2 = target instanceof import_kolmafia37.Effect ? target : head[target];
  return !headBuffs.includes(effect2) || !headAvailable(target) ? !1 : ((0, import_kolmafia37.cliExecute)(effect2.default), have(effect2));
}

// src/resources/2019/Snapper.ts
var Snapper_exports = {};
__export(Snapper_exports, {
  getProgress: function() {
    return getProgress;
  },
  getTrackedPhylum: function() {
    return getTrackedPhylum;
  },
  have: function() {
    return have28;
  },
  itemPhylum: function() {
    return itemPhylum;
  },
  phylumItem: function() {
    return phylumItem;
  },
  trackPhylum: function() {
    return trackPhylum;
  }
});
init_kolmafia_polyfill();
var import_kolmafia38 = require("kolmafia");
function _slicedToArray9(arr, i) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i) || _unsupportedIterableToArray20(arr, i) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit9(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray10(arr) {
  return _arrayWithoutHoles10(arr) || _iterableToArray10(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray20(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray20(o, minLen);
  }
}
function _iterableToArray10(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles10(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray20(arr);
}
function _arrayLikeToArray20(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var familiar5 = import_kolmafia38.Familiar.get("Red-Nosed Snapper"), phylumItem = /* @__PURE__ */ new Map([[import_kolmafia38.Phylum.get("beast"), import_kolmafia38.Item.get("patch of extra-warm fur")], [import_kolmafia38.Phylum.get("bug"), import_kolmafia38.Item.get("a bug's lymph")], [import_kolmafia38.Phylum.get("constellation"), import_kolmafia38.Item.get("micronova")], [import_kolmafia38.Phylum.get("construct"), import_kolmafia38.Item.get("industrial lubricant")], [import_kolmafia38.Phylum.get("demon"), import_kolmafia38.Item.get("infernal snowball")], [import_kolmafia38.Phylum.get("dude"), import_kolmafia38.Item.get("human musk")], [import_kolmafia38.Phylum.get("elemental"), import_kolmafia38.Item.get("livid energy")], [import_kolmafia38.Phylum.get("elf"), import_kolmafia38.Item.get("peppermint syrup")], [import_kolmafia38.Phylum.get("fish"), import_kolmafia38.Item.get("fish sauce")], [import_kolmafia38.Phylum.get("goblin"), import_kolmafia38.Item.get("guffin")], [import_kolmafia38.Phylum.get("hippy"), import_kolmafia38.Item.get("organic potpourri")], [import_kolmafia38.Phylum.get("hobo"), import_kolmafia38.Item.get("beggin' cologne")], [import_kolmafia38.Phylum.get("horror"), import_kolmafia38.Item.get("powdered madness")], [import_kolmafia38.Phylum.get("humanoid"), import_kolmafia38.Item.get("vial of humanoid growth hormone")], [import_kolmafia38.Phylum.get("mer-kin"), import_kolmafia38.Item.get("Mer-kin eyedrops")], [import_kolmafia38.Phylum.get("orc"), import_kolmafia38.Item.get("boot flask")], [import_kolmafia38.Phylum.get("penguin"), import_kolmafia38.Item.get("envelope full of Meat")], [import_kolmafia38.Phylum.get("pirate"), import_kolmafia38.Item.get("Shantix\u2122")], [import_kolmafia38.Phylum.get("plant"), import_kolmafia38.Item.get("goodberry")], [import_kolmafia38.Phylum.get("slime"), import_kolmafia38.Item.get("extra-strength goo")], [import_kolmafia38.Phylum.get("undead"), import_kolmafia38.Item.get("unfinished pleasure")], [import_kolmafia38.Phylum.get("weird"), import_kolmafia38.Item.get("non-Euclidean angle")]]), itemPhylum = new Map(_toConsumableArray10(phylumItem).map(function(_ref) {
  var _ref2 = _slicedToArray9(_ref, 2), phylum = _ref2[0], item8 = _ref2[1];
  return [item8, phylum];
}));
function have28() {
  return (0, import_kolmafia38.haveFamiliar)(familiar5);
}
function getTrackedPhylum() {
  return get("redSnapperPhylum");
}
function trackPhylum(phylum) {
  var currentFamiliar = (0, import_kolmafia38.myFamiliar)();
  try {
    (0, import_kolmafia38.useFamiliar)(familiar5), (0, import_kolmafia38.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0, import_kolmafia38.useFamiliar)(currentFamiliar);
  }
}
function getProgress() {
  return get("redSnapperProgress");
}

// src/resources/2020/Cartography.ts
var Cartography_exports = {};
__export(Cartography_exports, {
  have: function() {
    return have29;
  },
  mapMonster: function() {
    return mapMonster;
  },
  passive: function() {
    return passive;
  },
  skill: function() {
    return skill;
  }
});
init_kolmafia_polyfill();
var import_kolmafia39 = require("kolmafia");
var _templateObject180, _templateObject261, _templateObject348;
function _taggedTemplateLiteral31(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var passive = $skill(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral31(["Comprehensive Cartography"]))), skill = $skill(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral31(["Map the Monsters"])));
function have29() {
  return have(passive);
}
function mapMonster(location, monster) {
  if (!have29() || get("_monstersMapped") >= 3 || !(0, import_kolmafia39.canAdventure)(location) || ((0, import_kolmafia39.useSkill)($skill(_templateObject348 || (_templateObject348 = _taggedTemplateLiteral31(["Map the Monsters"])))), !get("mappingMonsters")))
    return !1;
  for (var turns = (0, import_kolmafia39.myTurncount)(); (0, import_kolmafia39.currentRound)() < 1; ) {
    if ((0, import_kolmafia39.myTurncount)() > turns)
      throw new Error("Map the Monsters unsuccessful?");
    if ((0, import_kolmafia39.visitUrl)((0, import_kolmafia39.toUrl)(location)), (0, import_kolmafia39.handlingChoice)() && (0, import_kolmafia39.lastChoice)() === 1435)
      return (0, import_kolmafia39.runChoice)(1, "heyscriptswhatsupwinkwink=".concat(monster.id)), !0;
    (0, import_kolmafia39.runChoice)(-1, !1);
  }
  return !1;
}

// src/resources/2020/Guzzlr.ts
var Guzzlr_exports = {};
__export(Guzzlr_exports, {
  Cocktails: function() {
    return Cocktails;
  },
  abandon: function() {
    return abandon;
  },
  acceptBronze: function() {
    return acceptBronze;
  },
  acceptGold: function() {
    return acceptGold;
  },
  acceptPlatinum: function() {
    return acceptPlatinum;
  },
  canAbandon: function() {
    return canAbandon;
  },
  canGold: function() {
    return canGold;
  },
  canPlatinum: function() {
    return canPlatinum;
  },
  expectedReward: function() {
    return expectedReward;
  },
  getBooze: function() {
    return getBooze;
  },
  getBronze: function() {
    return getBronze;
  },
  getCheapestPlatinumCocktail: function() {
    return getCheapestPlatinumCocktail;
  },
  getGold: function() {
    return getGold;
  },
  getGoldToday: function() {
    return getGoldToday;
  },
  getLocation: function() {
    return getLocation2;
  },
  getPlatinum: function() {
    return getPlatinum;
  },
  getPlatinumToday: function() {
    return getPlatinumToday;
  },
  getTier: function() {
    return getTier;
  },
  have: function() {
    return have30;
  },
  haveBooze: function() {
    return haveBooze;
  },
  haveFullBronzeBonus: function() {
    return haveFullBronzeBonus;
  },
  haveFullGoldBonus: function() {
    return haveFullGoldBonus;
  },
  haveFullPlatinumBonus: function() {
    return haveFullPlatinumBonus;
  },
  havePlatinumBooze: function() {
    return havePlatinumBooze;
  },
  ingredientToPlatinumCocktail: function() {
    return ingredientToPlatinumCocktail;
  },
  isQuestActive: function() {
    return isQuestActive;
  },
  item: function() {
    return item4;
  },
  platinumCocktailToIngredient: function() {
    return platinumCocktailToIngredient;
  },
  turnsLeftOnQuest: function() {
    return turnsLeftOnQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia40 = require("kolmafia");
var _templateObject181, _templateObject270, _templateObject349, _templateObject438, _templateObject527, _templateObject620, _templateObject718, _templateObject818, _templateObject917, _templateObject1017, _templateObject1115, _templateObject1215, _templateObject1313;
function _slicedToArray10(arr, i) {
  return _arrayWithHoles10(arr) || _iterableToArrayLimit10(arr, i) || _unsupportedIterableToArray21(arr, i) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit10(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles10(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray11(arr) {
  return _arrayWithoutHoles11(arr) || _iterableToArray11(arr) || _unsupportedIterableToArray21(arr) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray21(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray21(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray21(o, minLen);
  }
}
function _iterableToArray11(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles11(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray21(arr);
}
function _arrayLikeToArray21(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral32(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item4 = $item(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral32(["Guzzlr tablet"])));
function have30() {
  return have(item4);
}
function useTabletWithChoice(option) {
  withChoice(1412, option, function() {
    return (0, import_kolmafia40.use)(1, item4);
  });
}
function isQuestActive() {
  return get("questGuzzlr") !== "unstarted";
}
function getPlatinum() {
  return get("guzzlrPlatinumDeliveries");
}
function getPlatinumToday() {
  return get("_guzzlrPlatinumDeliveries");
}
function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
function acceptPlatinum() {
  return canPlatinum() ? (useTabletWithChoice(4), !0) : !1;
}
function getGold() {
  return get("guzzlrGoldDeliveries");
}
function getGoldToday() {
  return get("_guzzlrGoldDeliveries");
}
function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
function haveFullGoldBonus() {
  return getGold() >= 150;
}
function acceptGold() {
  return canGold() ? (useTabletWithChoice(3), !0) : !1;
}
function getBronze() {
  return get("guzzlrBronzeDeliveries");
}
function acceptBronze() {
  return isQuestActive() ? !1 : (useTabletWithChoice(2), !0);
}
function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
function canAbandon() {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}
function abandon() {
  return canAbandon() ? ((0, import_kolmafia40.visitUrl)("inventory.php?tap=guzzlr", !1), (0, import_kolmafia40.runChoice)(1), (0, import_kolmafia40.runChoice)(5), !0) : !1;
}
function getLocation2() {
  return get("guzzlrQuestLocation");
}
function getTier() {
  var tier = get("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
function getBooze() {
  var booze = get("guzzlrQuestBooze");
  return booze === "" ? null : import_kolmafia40.Item.get(booze);
}
var Cocktails = $items(_templateObject270 || (_templateObject270 = _taggedTemplateLiteral32(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
function havePlatinumBooze() {
  return Cocktails.some(function(cock) {
    return have(cock);
  });
}
function haveBooze() {
  var booze = getBooze();
  switch (booze) {
    case null:
      return !1;
    case $item(_templateObject349 || (_templateObject349 = _taggedTemplateLiteral32(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();
    default:
      return have(booze);
  }
}
var ingredientToPlatinumCocktail = /* @__PURE__ */ new Map([[$item(_templateObject438 || (_templateObject438 = _taggedTemplateLiteral32(["miniature boiler"]))), $item(_templateObject527 || (_templateObject527 = _taggedTemplateLiteral32(["Steamboat"])))], [$item(_templateObject620 || (_templateObject620 = _taggedTemplateLiteral32(["cold wad"]))), $item(_templateObject718 || (_templateObject718 = _taggedTemplateLiteral32(["Ghiaccio Colada"])))], [$item(_templateObject818 || (_templateObject818 = _taggedTemplateLiteral32(["robin's egg"]))), $item(_templateObject917 || (_templateObject917 = _taggedTemplateLiteral32(["Nog-on-the-Cob"])))], [$item(_templateObject1017 || (_templateObject1017 = _taggedTemplateLiteral32(["mangled finger"]))), $item(_templateObject1115 || (_templateObject1115 = _taggedTemplateLiteral32(["Sourfinger"])))], [$item(_templateObject1215 || (_templateObject1215 = _taggedTemplateLiteral32(["Dish of Clarified Butter"]))), $item(_templateObject1313 || (_templateObject1313 = _taggedTemplateLiteral32(["Buttery Boy"])))]]), platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return freeCraft ? maxBy(Array.from(ingredientToPlatinumCocktail), function(ingredientAndCocktail) {
    return Math.min.apply(Math, _toConsumableArray11(ingredientAndCocktail.map(function(item8) {
      return (0, import_kolmafia40.mallPrice)(item8);
    })));
  }, !0)[1] : maxBy(Array.from(ingredientToPlatinumCocktail), function(_ref) {
    var _ref2 = _slicedToArray10(_ref, 2), cocktail = _ref2[1];
    return (0, import_kolmafia40.mallPrice)(cocktail);
  })[1];
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
  switch (getTier()) {
    case "platinum":
      return 22.5 + (usePants ? 5 : 0);
    case "gold":
      return 6 + (usePants ? 3 : 0);
    case "bronze":
      return 3 + (usePants ? 3 : 0);
    default:
      return 0;
  }
}

// src/resources/2020/RetroCape.ts
var RetroCape_exports = {};
__export(RetroCape_exports, {
  currentHero: function() {
    return currentHero;
  },
  currentMode: function() {
    return currentMode;
  },
  getModifier: function() {
    return getModifier;
  },
  have: function() {
    return have31;
  },
  item: function() {
    return item5;
  },
  set: function() {
    return set;
  },
  tuneToSkill: function() {
    return tuneToSkill;
  }
});
init_kolmafia_polyfill();
var import_kolmafia41 = require("kolmafia");
var _templateObject190, _templateObject271, _templateObject350, _templateObject439, _templateObject528, _templateObject621, _templateObject719, _templateObject819, _templateObject918, _templateObject1018, _templateObject1116, _templateObject1216, _templateObject1314;
function _toConsumableArray12(arr) {
  return _arrayWithoutHoles12(arr) || _iterableToArray12(arr) || _unsupportedIterableToArray22(arr) || _nonIterableSpread12();
}
function _nonIterableSpread12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray22(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray22(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray22(o, minLen);
  }
}
function _iterableToArray12(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles12(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray22(arr);
}
function _arrayLikeToArray22(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys4(Object(source), !0).forEach(function(key) {
      _defineProperty12(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty12(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral33(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item5 = $item(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral33(["unwrapped knock-off retro superhero cape"])));
function have31() {
  return have(item5);
}
var Heroes = {
  vampire: {
    "Muscle Percent": 30,
    "Maximum HP": 50
  },
  heck: {
    "Mysticality Percent": 30,
    "Maximum MP": 50
  },
  robot: {
    "Moxie Percent": 30,
    "Maximum HP": 25,
    "Maximum MP": 25
  }
}, currentHero = function() {
  return get("retroCapeSuperhero");
}, currentMode = function() {
  return get("retroCapeWashingInstructions");
}, modeMap = /* @__PURE__ */ new Map([[["vampire", "hold"], {
  "Hot Resistance": 3,
  "Cold Resistance": 3,
  "Stench Resistance": 3,
  "Spooky Resistance": 3,
  "Sleaze Resistance": 3
}], [["vampire", "thrill"], {
  "Muscle Experience": 3
}], [["vampire", "kiss"], {
  Skill: $skill(_templateObject271 || (_templateObject271 = _taggedTemplateLiteral33(["Smooch of the Daywalker"])))
}], [["vampire", "kill"], {
  Skill: $skill(_templateObject350 || (_templateObject350 = _taggedTemplateLiteral33(["Slay the Dead"])))
}], [["heck", "thrill"], {
  "Mysticality Experience": 3
}], [["heck", "kiss"], {
  Skill: $skill(_templateObject439 || (_templateObject439 = _taggedTemplateLiteral33(["Unleash the Devil's Kiss"])))
}], [["robot", "hold"], {
  Skill: $skill(_templateObject528 || (_templateObject528 = _taggedTemplateLiteral33(["Deploy Robo-Handcuffs"])))
}], [["robot", "thrill"], {
  "Moxie Experience": 3
}], [["robot", "kiss"], {
  Skill: $skill(_templateObject621 || (_templateObject621 = _taggedTemplateLiteral33(["Blow a Robo-Kiss"])))
}], [["robot", "kill"], {
  Skill: $skill(_templateObject719 || (_templateObject719 = _taggedTemplateLiteral33(["Precision Shot"])))
}]]);
function set(hero, mode) {
  return have31() ? currentHero() === hero && currentMode() === mode ? !0 : ((0, import_kolmafia41.cliExecute)("retrocape ".concat(hero, " ").concat(mode)), currentHero() === hero && currentMode() === mode) : !1;
}
function getModifier() {
  var _modeMap$get, hero = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentHero(), mode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentMode();
  return _objectSpread4(_objectSpread4({}, Heroes[hero]), (_modeMap$get = modeMap.get([hero, mode])) !== null && _modeMap$get !== void 0 ? _modeMap$get : {});
}
var skills = /* @__PURE__ */ new Map([[$skill(_templateObject819 || (_templateObject819 = _taggedTemplateLiteral33(["Smooch of the Daywalker"]))), ["vampire", "kiss"]], [$skill(_templateObject918 || (_templateObject918 = _taggedTemplateLiteral33(["Slay the Dead"]))), ["vampire", "kill"]], [$skill(_templateObject1018 || (_templateObject1018 = _taggedTemplateLiteral33(["Unleash the Devil's Kiss"]))), ["heck", "kiss"]], [$skill(_templateObject1116 || (_templateObject1116 = _taggedTemplateLiteral33(["Deploy Robo-Handcuffs"]))), ["robot", "hold"]], [$skill(_templateObject1216 || (_templateObject1216 = _taggedTemplateLiteral33(["Blow a Robo-Kiss"]))), ["robot", "kiss"]], [$skill(_templateObject1314 || (_templateObject1314 = _taggedTemplateLiteral33(["Precision Shot"]))), ["robot", "kill"]]]);
function tuneToSkill(skill2) {
  var setting = skills.get(skill2);
  return !setting || !have31() ? !1 : (set.apply(void 0, _toConsumableArray12(setting)), [currentHero(), currentMode()].every(function(element, index) {
    return element === setting[index];
  }));
}

// src/resources/2021/CrystalBall.ts
var CrystalBall_exports = {};
__export(CrystalBall_exports, {
  have: function() {
    return have32;
  },
  orb: function() {
    return orb;
  },
  ponder: function() {
    return ponder;
  }
});
init_kolmafia_polyfill();
var import_kolmafia42 = require("kolmafia");
function _slicedToArray11(arr, i) {
  return _arrayWithHoles11(arr) || _iterableToArrayLimit11(arr, i) || _unsupportedIterableToArray23(arr, i) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray23(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray23(o, minLen);
  }
}
function _arrayLikeToArray23(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit11(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles11(arr) {
  if (Array.isArray(arr))
    return arr;
}
var orb = import_kolmafia42.Item.get("miniature crystal ball");
function have32() {
  return (0, import_kolmafia42.availableAmount)(orb) > 0;
}
var parsedProp = function() {
  return get("crystalBallPredictions").split("|").map(function(element) {
    return element.split(":");
  }).map(function(_ref) {
    var _ref2 = _slicedToArray11(_ref, 3), location = _ref2[1], monster = _ref2[2];
    return [(0, import_kolmafia42.toLocation)(location), (0, import_kolmafia42.toMonster)(monster)];
  });
};
function ponder() {
  return have32() ? (canVisitUrl() ? (logger_default.debug("Now pondering Crystal Ball."), (0, import_kolmafia42.visitUrl)("inventory.php?ponder=1", !1)) : logger_default.debug("Failed to ponder Crystall Ball."), new Map(parsedProp())) : /* @__PURE__ */ new Map();
}

// src/resources/2021/DaylightShavings.ts
var DaylightShavings_exports = {};
__export(DaylightShavings_exports, {
  buffAvailable: function() {
    return buffAvailable;
  },
  buffCycle: function() {
    return buffCycle;
  },
  buffs: function() {
    return buffs;
  },
  buffsUntil: function() {
    return buffsUntil;
  },
  hasBuff: function() {
    return hasBuff;
  },
  have: function() {
    return have33;
  },
  helmet: function() {
    return helmet;
  },
  nextBuff: function() {
    return nextBuff;
  }
});
init_kolmafia_polyfill();
var import_kolmafia43 = require("kolmafia");
var _templateObject191, _templateObject280;
function _taggedTemplateLiteral34(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var helmet = $item(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral34(["Daylight Shavings Helmet"])));
function have33() {
  return have(helmet);
}
var buffs = $effects(_templateObject280 || (_templateObject280 = _taggedTemplateLiteral34(["Spectacle Moustache, Toiletbrush Moustache, Barbell Moustache, Grizzly Beard, Surrealist's Moustache, Musician's Musician's Moustache, Gull-Wing Moustache, Space Warlord's Beard, Pointy Wizard Beard, Cowboy Stache, Friendly Chops"])));
function hasBuff() {
  return buffs.some(function(buff) {
    return have(buff);
  });
}
function buffAvailable() {
  return !buffs.some(function(buff) {
    return have(buff, 2);
  });
}
function buffCycle() {
  var playerclass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia43.myClass)();
  if ((0, import_kolmafia43.toInt)(playerclass) <= 0)
    return [];
  for (var returnValue = [], id = (0, import_kolmafia43.toInt)(playerclass), seed = id > 6 ? id % 6 + 1 : id, i = 1; i < 12; i++) {
    var index = i * seed % 11;
    returnValue.push(buffs[index]);
  }
  return returnValue;
}
function nextBuff() {
  var currentBuff = (0, import_kolmafia43.toEffect)(get("lastBeardBuff").toFixed(0)), cycle2 = buffCycle(), index = cycle2.indexOf(currentBuff), newIndex = (1 + index) % 11;
  return cycle2[newIndex];
}
function buffsUntil(buff) {
  if (!buffs.includes(buff))
    return null;
  var currentIndex = buffs.indexOf(nextBuff()) - 1, newIndex = buffs.indexOf(buff), diff = (newIndex - currentIndex) % 11;
  return diff === 0 ? 11 : diff;
}

// src/resources/2022/AutumnAton.ts
var AutumnAton_exports = {};
__export(AutumnAton_exports, {
  available: function() {
    return available2;
  },
  availableLocations: function() {
    return availableLocations;
  },
  currentUpgrades: function() {
    return currentUpgrades;
  },
  currentlyIn: function() {
    return currentlyIn;
  },
  getUniques: function() {
    return getUniques;
  },
  have: function() {
    return have34;
  },
  item: function() {
    return item6;
  },
  legs: function() {
    return legs;
  },
  possibleUpgrades: function() {
    return possibleUpgrades;
  },
  seasonalItems: function() {
    return seasonalItems;
  },
  sendTo: function() {
    return sendTo;
  },
  turnsForQuest: function() {
    return turnsForQuest;
  },
  turnsLeft: function() {
    return turnsLeft;
  },
  upgrade: function() {
    return upgrade;
  },
  visualAcuity: function() {
    return visualAcuity;
  },
  zoneItems: function() {
    return zoneItems;
  }
});
init_kolmafia_polyfill();
var import_kolmafia44 = require("kolmafia");
var _templateObject200, _templateObject281, _templateObject351, _templateObject440, _templateObject529, _templateObject624, _templateObject720, _templateObject820, _templateObject919;
function _taggedTemplateLiteral35(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item6 = import_kolmafia44.Item.get("autumn-aton");
function available2() {
  return (0, import_kolmafia44.availableAmount)(item6) > 0;
}
function have34() {
  return get("hasAutumnaton") || available2();
}
function checkLocations(html) {
  return (0, import_kolmafia44.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(function(name) {
    return (0, import_kolmafia44.toLocation)(name);
  });
}
var use6 = function() {
  return (0, import_kolmafia44.visitUrl)("inv_use.php?pwd&whichitem=10954");
};
function currentlyIn() {
  return get("autumnatonQuestLocation");
}
function sendTo(target) {
  var upgrade2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (!available2())
    return null;
  var pageHtml = use6();
  upgrade2 && (0, import_kolmafia44.availableChoiceOptions)()[1] && (0, import_kolmafia44.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml), location = target instanceof import_kolmafia44.Location ? target : Array.isArray(target) ? target.find(function(l) {
    return locationsAvailable.includes(l);
  }) : target(locationsAvailable);
  return !location || !locationsAvailable.includes(location) ? null : ((0, import_kolmafia44.handlingChoice)() || use6(), (0, import_kolmafia44.runChoice)(2, "heythereprogrammer=".concat(location.id)), (0, import_kolmafia44.handlingChoice)() && (0, import_kolmafia44.visitUrl)("main.php"), location);
}
function upgrade() {
  use6();
  var canUpgrade = (0, import_kolmafia44.availableChoiceOptions)()[1] !== void 0;
  return canUpgrade && (0, import_kolmafia44.runChoice)(1), (0, import_kolmafia44.visitUrl)("main.php"), canUpgrade;
}
function availableLocations() {
  if (!available2())
    return [];
  var pageHtml = use6();
  return (0, import_kolmafia44.visitUrl)("main.php"), checkLocations(pageHtml);
}
var possibleUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"];
function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
function turnsLeft() {
  return get("autumnatonQuestTurn") - (0, import_kolmafia44.totalTurnsPlayed)();
}
function legs() {
  return currentUpgrades().filter(function(u) {
    return u.includes("leg");
  }).length;
}
function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - legs());
}
function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(function(u) {
    return visualUpgrades.includes(u);
  }).length;
}
function zoneItems() {
  return 3 + currentUpgrades().filter(function(u) {
    return u.includes("arm");
  }).length;
}
function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
var difficulties = ["low", "mid", "high"], UNIQUES = {
  outdoor: {
    low: {
      index: 4,
      item: $item(_templateObject200 || (_templateObject200 = _taggedTemplateLiteral35(["autumn leaf"])))
    },
    mid: {
      index: 2,
      item: $item(_templateObject281 || (_templateObject281 = _taggedTemplateLiteral35(["autumn debris shield"])))
    },
    high: {
      index: 6,
      item: $item(_templateObject351 || (_templateObject351 = _taggedTemplateLiteral35(["autumn leaf pendant"])))
    }
  },
  indoor: {
    low: {
      index: 0,
      item: $item(_templateObject440 || (_templateObject440 = _taggedTemplateLiteral35(["AutumnFest ale"])))
    },
    mid: {
      index: 3,
      item: $item(_templateObject529 || (_templateObject529 = _taggedTemplateLiteral35(["autumn-spice donut"])))
    },
    high: {
      index: 7,
      item: $item(_templateObject624 || (_templateObject624 = _taggedTemplateLiteral35(["autumn breeze"])))
    }
  },
  underground: {
    low: {
      index: 1,
      item: $item(_templateObject720 || (_templateObject720 = _taggedTemplateLiteral35(["autumn sweater-weather sweater"])))
    },
    mid: {
      index: 5,
      item: $item(_templateObject820 || (_templateObject820 = _taggedTemplateLiteral35(["autumn dollar"])))
    },
    high: {
      index: 8,
      item: $item(_templateObject919 || (_templateObject919 = _taggedTemplateLiteral35(["autumn years wisdom"])))
    }
  }
};
function getUniques(location) {
  var env = location.environment, difficulty = location.difficultyLevel;
  if (arrayContains(env, ["outdoor", "indoor", "underground"]) && arrayContains(difficulty, difficulties)) {
    var _UNIQUES$env$difficul = UNIQUES[env][difficulty], index = _UNIQUES$env$difficul.index, _item = _UNIQUES$env$difficul.item;
    return {
      upgrade: possibleUpgrades[index],
      item: _item
    };
  }
  return null;
}

// src/resources/2022/CombatLoversLocket.ts
var CombatLoversLocket_exports = {};
__export(CombatLoversLocket_exports, {
  availableLocketMonsters: function() {
    return availableLocketMonsters;
  },
  findMonster: function() {
    return findMonster;
  },
  have: function() {
    return have35;
  },
  locket: function() {
    return locket;
  },
  monstersReminisced: function() {
    return monstersReminisced;
  },
  reminisce: function() {
    return reminisce;
  },
  reminiscesLeft: function() {
    return reminiscesLeft;
  },
  unlockedLocketMonsters: function() {
    return unlockedLocketMonsters;
  }
});
init_kolmafia_polyfill();
var import_kolmafia45 = require("kolmafia");
var _templateObject201;
function _slicedToArray12(arr, i) {
  return _arrayWithHoles12(arr) || _iterableToArrayLimit12(arr, i) || _unsupportedIterableToArray24(arr, i) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray24(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray24(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray24(o, minLen);
  }
}
function _arrayLikeToArray24(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit12(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles12(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral36(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var locket = $item(_templateObject201 || (_templateObject201 = _taggedTemplateLiteral36(["Combat Lover's Locket"])));
function have35() {
  return have(locket);
}
function availableLocketMonsters() {
  return reminiscesLeft() === 0 ? [] : Object.entries((0, import_kolmafia45.getLocketMonsters)()).filter(function(_ref) {
    var _ref2 = _slicedToArray12(_ref, 2), unused = _ref2[1];
    return unused;
  }).map(function(_ref3) {
    var _ref4 = _slicedToArray12(_ref3, 1), name = _ref4[0];
    return (0, import_kolmafia45.toMonster)(name);
  });
}
function unlockedLocketMonsters() {
  return Object.entries((0, import_kolmafia45.getLocketMonsters)()).map(function(_ref5) {
    var _ref6 = _slicedToArray12(_ref5, 1), name = _ref6[0];
    return (0, import_kolmafia45.toMonster)(name);
  });
}
function parseLocketProperty() {
  return get("_locketMonstersFought").split(",").filter(function(id) {
    return id.trim().length > 0;
  });
}
function reminiscesLeft() {
  return have35() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
function monstersReminisced() {
  return parseLocketProperty().map(function(id) {
    return (0, import_kolmafia45.toMonster)(id);
  });
}
function reminisce(monster) {
  return !have35() || reminiscesLeft() === 0 || !(0, import_kolmafia45.getLocketMonsters)()[monster.name] ? !1 : ((0, import_kolmafia45.cliExecute)("reminisce ".concat(monster)), (0, import_kolmafia45.runCombat)(), monstersReminisced().includes(monster));
}
function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    return 1;
  };
  if (!have35() || reminiscesLeft() === 0)
    return null;
  var options = availableLocketMonsters().filter(criteria);
  return options.length ? options.reduce(function(a, b) {
    return value(a) > value(b) ? a : b;
  }) : null;
}

// src/resources/2022/GreyGoose.ts
var GreyGoose_exports = {};
__export(GreyGoose_exports, {
  currentDrones: function() {
    return currentDrones;
  },
  currentExperience: function() {
    return currentExperience;
  },
  currentWeight: function() {
    return currentWeight;
  },
  expectedDrones: function() {
    return expectedDrones;
  },
  expectedExperience: function() {
    return expectedExperience;
  },
  expectedMeat: function() {
    return expectedMeat;
  },
  fightsUntil: function() {
    return fightsUntil;
  },
  goose: function() {
    return goose;
  },
  hasMeatified: function() {
    return hasMeatified;
  },
  have: function() {
    return have36;
  }
});
init_kolmafia_polyfill();
var import_kolmafia46 = require("kolmafia");
var _templateObject289, _templateObject290, _templateObject358, _templateObject441;
function _taggedTemplateLiteral37(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var goose = $familiar(_templateObject289 || (_templateObject289 = _taggedTemplateLiteral37(["Grey Goose"])));
function have36() {
  return have(goose);
}
function currentExperience() {
  return goose.experience || have($familiar(_templateObject290 || (_templateObject290 = _taggedTemplateLiteral37(["Shorter-Order Cook"])))) && !get("gooseReprocessed") ? 81 + (have($item(_templateObject358 || (_templateObject358 = _taggedTemplateLiteral37(["blue plate"])))) ? 19 : 0) : 0;
}
function currentWeight() {
  return Math.min(Math.floor(Math.sqrt(currentExperience())), 20);
}
function expectedDrones() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.max(0, weight - 5);
}
function expectedExperience() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), (0, import_kolmafia46.toInt)((0, import_kolmafia46.myClass)()) === 27 ? 2 : 3);
}
function expectedMeat() {
  var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), 4);
}
function hasMeatified() {
  return get("_meatifyMatterUsed");
}
function fightsUntil(target) {
  var bonusExperience = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : get2("Familiar Experience"), diff = target - currentWeight();
  return diff <= 0 ? 0 : Math.ceil(diff / (1 + bonusExperience + (have($skill(_templateObject441 || (_templateObject441 = _taggedTemplateLiteral37(["Testudinal Teachings"])))) ? 1 / 6 : 0)));
}
function currentDrones() {
  return get("gooseDronesRemaining");
}

// src/resources/2022/JuneCleaver.ts
var JuneCleaver_exports = {};
__export(JuneCleaver_exports, {
  choices: function() {
    return choices;
  },
  choicesAvailable: function() {
    return choicesAvailable;
  },
  cleaver: function() {
    return cleaver;
  },
  damage: function() {
    return damage;
  },
  getInterval: function() {
    return getInterval;
  },
  getSkippedInterval: function() {
    return getSkippedInterval;
  },
  have: function() {
    return have37;
  },
  queue: function() {
    return queue;
  },
  skipsRemaining: function() {
    return skipsRemaining;
  }
});
init_kolmafia_polyfill();
var import_kolmafia47 = require("kolmafia");
var cleaver = (0, import_kolmafia47.toItem)("June cleaver");
function have37() {
  return (0, import_kolmafia47.availableAmount)(cleaver) > 0;
}
function getInterval() {
  var _encounters, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters = [1, 6, 10, 12, 15, 20][encounters]) !== null && _encounters !== void 0 ? _encounters : 30;
}
function getSkippedInterval() {
  var _encounters2, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters2 = [1, 2, 3, 3, 4, 5][encounters]) !== null && _encounters2 !== void 0 ? _encounters2 : 8;
}
function damage(element) {
  return get("_juneCleaver".concat(element));
}
function skipsRemaining() {
  return 5 - get("_juneCleaverSkips");
}
var choices = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475];
function queue() {
  return get("juneCleaverQueue").split(",").filter(function(x) {
    return x.trim().length > 0;
  }).map(function(x) {
    return parseInt(x);
  });
}
function choicesAvailable() {
  var currentQueue = queue();
  return choices.filter(function(choice) {
    return !currentQueue.includes(choice);
  });
}

// src/resources/2022/TrainSet.ts
var TrainSet_exports = {};
__export(TrainSet_exports, {
  Station: function() {
    return Station;
  },
  canConfigure: function() {
    return canConfigure;
  },
  cycle: function() {
    return cycle;
  },
  doubledEffect: function() {
    return doubledEffect;
  },
  effect: function() {
    return effect;
  },
  have: function() {
    return have38;
  },
  installed: function() {
    return installed4;
  },
  item: function() {
    return item7;
  },
  next: function() {
    return next;
  },
  nextConfigurable: function() {
    return nextConfigurable;
  },
  setConfiguration: function() {
    return setConfiguration;
  }
});
init_kolmafia_polyfill();
var import_kolmafia48 = require("kolmafia");
var _templateObject291;
function _taggedTemplateLiteral38(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item7 = $item(_templateObject291 || (_templateObject291 = _taggedTemplateLiteral38(["model train set"])));
function installed4() {
  return (0, import_kolmafia48.getWorkshed)() === item7;
}
function have38() {
  return installed4() || have(item7);
}
var Station;
(function(Station2) {
  Station2.UNKNOWN = "", Station2.EMPTY = "empty", Station2.GAIN_MEAT = "meat_mine", Station2.TOWER_FIZZY = "tower_fizzy", Station2.VIEWING_PLATFORM = "viewing_platform", Station2.TOWER_FROZEN = "tower_frozen", Station2.SPOOKY_GRAVEYARD = "spooky_graveyard", Station2.LOGGING_MILL = "logging_mill", Station2.CANDY_FACTORY = "candy_factory", Station2.COAL_HOPPER = "coal_hopper", Station2.TOWER_SEWAGE = "tower_sewage", Station2.OIL_REFINERY = "oil_refinery", Station2.OIL_BRIDGE = "oil_bridge", Station2.WATER_BRIDGE = "water_bridge", Station2.GROIN_SILO = "groin_silo", Station2.GRAIN_SILO = "grain_silo", Station2.BRAIN_SILO = "brain_silo", Station2.BRAWN_SILO = "brawn_silo", Station2.PRAWN_SILO = "prawn_silo", Station2.TRACKSIDE_DINER = "trackside_diner", Station2.ORE_HOPPER = "ore_hopper";
})(Station || (Station = {}));
var trainsetEffects = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia48.Effect.get("Carbonated")], [Station.TOWER_FROZEN, import_kolmafia48.Effect.get("Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia48.Effect.get("Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia48.Effect.get("Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia48.Effect.get("Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia48.Effect.get("Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia48.Effect.get("Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia48.Effect.get("Craving Prawns")]]), trainsetEffectsDoubled = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia48.Effect.get("Double Carbonated")], [Station.TOWER_FROZEN, import_kolmafia48.Effect.get("Double Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia48.Effect.get("Doubly Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia48.Effect.get("Double Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia48.Effect.get("Doubly Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia48.Effect.get("Doubly Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia48.Effect.get("Doubly Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia48.Effect.get("Doubly Craving Prawns")]]);
function effect(station) {
  var _trainsetEffects$get;
  return (_trainsetEffects$get = trainsetEffects.get(station)) !== null && _trainsetEffects$get !== void 0 ? _trainsetEffects$get : null;
}
function doubledEffect(station) {
  var _trainsetEffectsDoubl;
  return (_trainsetEffectsDoubl = trainsetEffectsDoubled.get(station)) !== null && _trainsetEffectsDoubl !== void 0 ? _trainsetEffectsDoubl : null;
}
function cycle() {
  return get("trainsetConfiguration").split(",");
}
function nextConfigurable() {
  return clamp(get("lastTrainsetConfiguration") + 40 - get("trainsetPosition"), 0, 40);
}
function canConfigure() {
  return installed4() && !nextConfigurable();
}
var pieces2 = [Station.EMPTY, Station.GAIN_MEAT, Station.TOWER_FIZZY, Station.VIEWING_PLATFORM, Station.TOWER_FROZEN, Station.SPOOKY_GRAVEYARD, Station.LOGGING_MILL, Station.CANDY_FACTORY, Station.COAL_HOPPER, Station.TOWER_SEWAGE, Station.UNKNOWN, Station.OIL_REFINERY, Station.OIL_BRIDGE, Station.WATER_BRIDGE, Station.GROIN_SILO, Station.GRAIN_SILO, Station.BRAIN_SILO, Station.BRAWN_SILO, Station.PRAWN_SILO, Station.TRACKSIDE_DINER, Station.ORE_HOPPER];
function stationToInt(station) {
  return pieces2.indexOf(station);
}
function setConfiguration(configuration) {
  if (!canConfigure())
    return !1;
  (0, import_kolmafia48.visitUrl)("campground.php?action=workshed"), (0, import_kolmafia48.runChoice)(1, "forceoption=0".concat(configuration.map(function(station, index) {
    return "&slot[".concat(index, "]=").concat(stationToInt(station));
  }).join(""))), (0, import_kolmafia48.visitUrl)("main.php");
  var currentConfiguration = cycle();
  return configuration.every(function(station, index) {
    return station === currentConfiguration[index];
  });
}
function next() {
  return cycle()[get("trainsetPosition") % 8];
}

// src/resources/putty-likes.ts
init_kolmafia_polyfill();
function getTotalPuttyLikeCopiesMade() {
  return getSpookyPuttySheetCopiesMade() + getRainDohBlackBoxCopiesMade();
}
function couldUseRainDohBlackBox() {
  return have8() && getRainDohBlackBoxCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var RainDohBlackBox = new Copier(function() {
  return couldUseRainDohBlackBox();
}, null, function() {
  return couldUseRainDohBlackBox();
}, function() {
  return getRainDohBlackBoxMonster();
}, function() {
  return useRainDohBlackBox();
});
function couldUseSpookyPuttySheet() {
  return have6() && getSpookyPuttySheetCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var SpookyPuttySheet = new Copier(function() {
  return couldUseSpookyPuttySheet();
}, function() {
  return prepareSpookyPuttySheet();
}, function() {
  return couldUseSpookyPuttySheet();
}, function() {
  return getSpookyPuttySheetMonster();
}, function() {
  return useSpookyPuttySheet();
});

// src/resources/LibramSummon.ts
init_kolmafia_polyfill();

// src/resources/2007/CandyHearts.ts
init_kolmafia_polyfill();
var _templateObject298, _templateObject299, _templateObject359, _templateObject446, _templateObject530, _templateObject625, _templateObject721;
function _taggedTemplateLiteral39(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill = $skill(_templateObject298 || (_templateObject298 = _taggedTemplateLiteral39(["Summon Candy Heart"]))), libramChance = 1 / 6, libramExpected = /* @__PURE__ */ new Map([[$item(_templateObject299 || (_templateObject299 = _taggedTemplateLiteral39(["green candy heart"]))), libramChance], [$item(_templateObject359 || (_templateObject359 = _taggedTemplateLiteral39(["lavender candy heart"]))), libramChance], [$item(_templateObject446 || (_templateObject446 = _taggedTemplateLiteral39(["orange candy heart"]))), libramChance], [$item(_templateObject530 || (_templateObject530 = _taggedTemplateLiteral39(["pink candy heart"]))), libramChance], [$item(_templateObject625 || (_templateObject625 = _taggedTemplateLiteral39(["white candy heart"]))), libramChance], [$item(_templateObject721 || (_templateObject721 = _taggedTemplateLiteral39(["yellow candy heart"]))), libramChance]]);
function have39() {
  return have(summonSkill);
}
function expected() {
  return libramExpected;
}

// src/resources/2008/DivineFavors.ts
init_kolmafia_polyfill();
var _templateObject300, _templateObject2100, _templateObject360, _templateObject447, _templateObject531, _templateObject626, _templateObject724;
function _taggedTemplateLiteral40(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill2 = $skill(_templateObject300 || (_templateObject300 = _taggedTemplateLiteral40(["Summon Party Favor"])));
function have40() {
  return have(summonSkill2);
}
function expected2() {
  var rareSummons = get("_favorRareSummons"), totalRareChance = 1 / 2 ** (rareSummons + 1), commonChance2 = (1 - totalRareChance) / 3, rareChance2 = totalRareChance / 3;
  return /* @__PURE__ */ new Map([[$item(_templateObject2100 || (_templateObject2100 = _taggedTemplateLiteral40(["divine blowout"]))), commonChance2], [$item(_templateObject360 || (_templateObject360 = _taggedTemplateLiteral40(["divine can of silly string"]))), commonChance2], [$item(_templateObject447 || (_templateObject447 = _taggedTemplateLiteral40(["divine noisemaker"]))), commonChance2], [$item(_templateObject531 || (_templateObject531 = _taggedTemplateLiteral40(["divine champagne flute"]))), rareChance2], [$item(_templateObject626 || (_templateObject626 = _taggedTemplateLiteral40(["divine champagne popper"]))), rareChance2], [$item(_templateObject724 || (_templateObject724 = _taggedTemplateLiteral40(["divine cracker"]))), rareChance2]]);
}

// src/resources/2009/LoveSongs.ts
init_kolmafia_polyfill();
var _templateObject301, _templateObject2101, _templateObject361, _templateObject448, _templateObject535, _templateObject627, _templateObject725;
function _taggedTemplateLiteral41(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill3 = $skill(_templateObject301 || (_templateObject301 = _taggedTemplateLiteral41(["Summon Love Song"]))), libramChance2 = 1 / 6, libramExpected2 = /* @__PURE__ */ new Map([[$item(_templateObject2101 || (_templateObject2101 = _taggedTemplateLiteral41(["love song of disturbing obsession"]))), libramChance2], [$item(_templateObject361 || (_templateObject361 = _taggedTemplateLiteral41(["love song of icy revenge"]))), libramChance2], [$item(_templateObject448 || (_templateObject448 = _taggedTemplateLiteral41(["love song of naughty innuendo"]))), libramChance2], [$item(_templateObject535 || (_templateObject535 = _taggedTemplateLiteral41(["love song of smoldering passion"]))), libramChance2], [$item(_templateObject627 || (_templateObject627 = _taggedTemplateLiteral41(["love song of sugary cuteness"]))), libramChance2], [$item(_templateObject725 || (_templateObject725 = _taggedTemplateLiteral41(["love song of vague ambiguity"]))), libramChance2]]);
function have41() {
  return have(summonSkill3);
}
function expected3() {
  return libramExpected2;
}

// src/resources/2010/Brickos.ts
init_kolmafia_polyfill();
var _templateObject308, _templateObject2102, _templateObject368;
function _taggedTemplateLiteral42(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill4 = $skill(_templateObject308 || (_templateObject308 = _taggedTemplateLiteral42(["Summon BRICKOs"])));
function have42() {
  return have(summonSkill4);
}
function expected4() {
  var eyeSummons = get("_brickoEyeSummons"), eyeChance = eyeSummons === 3 ? 0 : eyeSummons === 0 ? 0.5 : 1 / 3;
  return /* @__PURE__ */ new Map([[$item(_templateObject2102 || (_templateObject2102 = _taggedTemplateLiteral42(["BRICKO eye brick"]))), eyeChance], [$item(_templateObject368 || (_templateObject368 = _taggedTemplateLiteral42(["BRICKO brick"]))), 3 - eyeChance]]);
}

// src/resources/2011/Gygaxian.ts
init_kolmafia_polyfill();
var _templateObject309, _templateObject2103, _templateObject369, _templateObject449, _templateObject536, _templateObject628, _templateObject726;
function _taggedTemplateLiteral43(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill5 = $skill(_templateObject309 || (_templateObject309 = _taggedTemplateLiteral43(["Summon Dice"]))), libramChance3 = 1 / 6, libramExpected3 = /* @__PURE__ */ new Map([[$item(_templateObject2103 || (_templateObject2103 = _taggedTemplateLiteral43(["d4"]))), libramChance3], [$item(_templateObject369 || (_templateObject369 = _taggedTemplateLiteral43(["d6"]))), libramChance3], [$item(_templateObject449 || (_templateObject449 = _taggedTemplateLiteral43(["d8"]))), libramChance3], [$item(_templateObject536 || (_templateObject536 = _taggedTemplateLiteral43(["d10"]))), libramChance3], [$item(_templateObject628 || (_templateObject628 = _taggedTemplateLiteral43(["d12"]))), libramChance3], [$item(_templateObject726 || (_templateObject726 = _taggedTemplateLiteral43(["d20"]))), libramChance3]]);
function have43() {
  return have(summonSkill5);
}
function expected5() {
  return libramExpected3;
}

// src/resources/2012/Resolutions.ts
init_kolmafia_polyfill();
var _templateObject370, _templateObject2104, _templateObject371, _templateObject450, _templateObject537, _templateObject629, _templateObject727, _templateObject821, _templateObject920, _templateObject1019;
function _taggedTemplateLiteral44(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill6 = $skill(_templateObject370 || (_templateObject370 = _taggedTemplateLiteral44(["Summon Resolutions"]))), commonChance = 0.98 / 6, rareChance = 0.02 / 3, libramExpected4 = /* @__PURE__ */ new Map([[$item(_templateObject2104 || (_templateObject2104 = _taggedTemplateLiteral44(["resolution: be feistier"]))), commonChance], [$item(_templateObject371 || (_templateObject371 = _taggedTemplateLiteral44(["resolution: be happier"]))), commonChance], [$item(_templateObject450 || (_templateObject450 = _taggedTemplateLiteral44(["resolution: be sexier"]))), commonChance], [$item(_templateObject537 || (_templateObject537 = _taggedTemplateLiteral44(["resolution: be smarter"]))), commonChance], [$item(_templateObject629 || (_templateObject629 = _taggedTemplateLiteral44(["resolution: be stronger"]))), commonChance], [$item(_templateObject727 || (_templateObject727 = _taggedTemplateLiteral44(["resolution: be wealthier"]))), commonChance], [$item(_templateObject821 || (_templateObject821 = _taggedTemplateLiteral44(["resolution: be kinder"]))), rareChance], [$item(_templateObject920 || (_templateObject920 = _taggedTemplateLiteral44(["resolution: be luckier"]))), rareChance], [$item(_templateObject1019 || (_templateObject1019 = _taggedTemplateLiteral44(["resolution: be more adventurous"]))), rareChance]]);
function have44() {
  return have(summonSkill6);
}
function expected6() {
  return libramExpected4;
}

// src/resources/2013/PulledTaffy.ts
init_kolmafia_polyfill();
var _templateObject378, _templateObject2105, _templateObject379, _templateObject451, _templateObject538, _templateObject630, _templateObject728, _templateObject824;
function _taggedTemplateLiteral45(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var summonSkill7 = $skill(_templateObject378 || (_templateObject378 = _taggedTemplateLiteral45(["Summon Taffy"])));
function have45() {
  return have(summonSkill7);
}
function expected7() {
  var rareSummons = get("_taffyRareSummons"), yellowSummons = get("_taffyYellowSummons"), onlyYellow = yellowSummons === 0 && rareSummons === 3, totalRareChance = rareSummons < 4 ? 1 / 2 ** (rareSummons + 1) : 0, commonChance2 = (1 - totalRareChance) / 4, rareChance2 = onlyYellow ? 0 : totalRareChance / (3 - get("_taffyYellowSummons")), yellowChance = yellowSummons === 1 ? 0 : onlyYellow ? totalRareChance : rareChance2;
  return /* @__PURE__ */ new Map([[$item(_templateObject2105 || (_templateObject2105 = _taggedTemplateLiteral45(["pulled blue taffy"]))), commonChance2], [$item(_templateObject379 || (_templateObject379 = _taggedTemplateLiteral45(["pulled orange taffy"]))), commonChance2], [$item(_templateObject451 || (_templateObject451 = _taggedTemplateLiteral45(["pulled violet taffy"]))), commonChance2], [$item(_templateObject538 || (_templateObject538 = _taggedTemplateLiteral45(["pulled red taffy"]))), commonChance2], [$item(_templateObject630 || (_templateObject630 = _taggedTemplateLiteral45(["pulled indigo taffy"]))), rareChance2], [$item(_templateObject728 || (_templateObject728 = _taggedTemplateLiteral45(["pulled green taffy"]))), rareChance2], [$item(_templateObject824 || (_templateObject824 = _taggedTemplateLiteral45(["pulled yellow taffy"]))), yellowChance]]);
}

// src/resources/LibramSummon.ts
function _slicedToArray13(arr, i) {
  return _arrayWithHoles13(arr) || _iterableToArrayLimit13(arr, i) || _unsupportedIterableToArray25(arr, i) || _nonIterableRest13();
}
function _nonIterableRest13() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray25(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray25(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray25(o, minLen);
  }
}
function _arrayLikeToArray25(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit13(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles13(arr) {
  if (Array.isArray(arr))
    return arr;
}
function expectedLibramSummon(summonSkill8) {
  switch (summonSkill8) {
    case summonSkill:
      return expected();
    case summonSkill2:
      return expected2();
    case summonSkill3:
      return expected3();
    case summonSkill4:
      return expected4();
    case summonSkill5:
      return expected5();
    case summonSkill6:
      return expected6();
    case summonSkill7:
      return expected7();
  }
  return /* @__PURE__ */ new Map();
}
function possibleLibramSummons() {
  var results = /* @__PURE__ */ new Map();
  return have39() && results.set(summonSkill, expected()), have40() && results.set(summonSkill2, expected2()), have41() && results.set(summonSkill3, expected3()), have42() && results.set(summonSkill4, expected4()), have43() && results.set(summonSkill5, expected5()), have44() && results.set(summonSkill6, expected6()), have45() && results.set(summonSkill7, expected7()), results;
}
function bestLibramToCast() {
  var arr = Array.from(possibleLibramSummons().entries());
  return arr.length ? maxBy(arr, function(_ref) {
    var _ref2 = _slicedToArray13(_ref, 2), itemMap = _ref2[1];
    return sum(Array.from(itemMap.entries()), function(_ref3) {
      var _ref4 = _slicedToArray13(_ref3, 2), item8 = _ref4[0], weight = _ref4[1];
      return weight * getSaleValue(item8);
    });
  })[0] : null;
}

// src/ascend.ts
var _templateObject380, _templateObject2106, _templateObject381, _templateObject456, _templateObject539, _templateObject631;
function _createForOfIteratorHelper10(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray26(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral46(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _defineProperties10(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass10(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties10(Constructor.prototype, protoProps), staticProps && _defineProperties10(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck10(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits3(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf3(subClass, superClass);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn3(this, result);
  };
}
function _possibleConstructorReturn3(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized3(self2);
}
function _assertThisInitialized3(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper3(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper3 = function(Class6) {
    if (Class6 === null || !_isNativeFunction3(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct3(Class6, arguments, _getPrototypeOf3(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf3(Wrapper, Class6);
  }, _wrapNativeSuper3(Class5);
}
function _construct3(Parent, args, Class5) {
  return _isNativeReflectConstruct3() ? _construct3 = Reflect.construct : _construct3 = function(Parent2, args2, Class6) {
    var a = [null];
    a.push.apply(a, args2);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf3(instance, Class6.prototype), instance;
  }, _construct3.apply(null, arguments);
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction3(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf3(o, p) {
  return _setPrototypeOf3 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf3(o, p);
}
function _getPrototypeOf3(o) {
  return _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf3(o);
}
function _defineProperty13(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _slicedToArray14(arr, i) {
  return _arrayWithHoles14(arr) || _iterableToArrayLimit14(arr, i) || _unsupportedIterableToArray26(arr, i) || _nonIterableRest14();
}
function _nonIterableRest14() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray26(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray26(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray26(o, minLen);
  }
}
function _arrayLikeToArray26(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit14(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles14(arr) {
  if (Array.isArray(arr))
    return arr;
}
var Lifestyle;
(function(Lifestyle2) {
  Lifestyle2[Lifestyle2.casual = 1] = "casual", Lifestyle2[Lifestyle2.softcore = 2] = "softcore", Lifestyle2[Lifestyle2.normal = 2] = "normal", Lifestyle2[Lifestyle2.hardcore = 3] = "hardcore";
})(Lifestyle || (Lifestyle = {}));
function permedSkills() {
  return new Map(Array.from(Object.entries((0, import_kolmafia49.getPermedSkills)())).map(function(_ref) {
    var _ref2 = _slicedToArray14(_ref, 2), skillName = _ref2[0], isHardcore = _ref2[1];
    return [(0, import_kolmafia49.toSkill)(skillName), isHardcore ? Lifestyle.hardcore : Lifestyle.softcore];
  }));
}
var AscendError = /* @__PURE__ */ function(_Error) {
  _inherits3(AscendError2, _Error);
  var _super = _createSuper3(AscendError2);
  function AscendError2(cause) {
    var _this;
    if (_classCallCheck10(this, AscendError2), !cause)
      _this = _super.call(this, "Failed to ascend--do you have a pending trade offer?"), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0);
    else if (cause instanceof import_kolmafia49.Skill) {
      var reason = cause.permable ? (0, import_kolmafia49.haveSkill)(cause) ? "too karmaically expensive" : "not a skill you currently know" : "unpermable";
      _this = _super.call(this, "Skill ".concat(cause, " is ").concat(reason, "!")), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0);
    } else
      cause instanceof import_kolmafia49.Item ? (_this = _super.call(this, "Invalid astral item: ".concat(cause, "!")), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0)) : cause instanceof import_kolmafia49.Class ? (_this = _super.call(this, "Invalid class ".concat(cause, " for this path!")), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0)) : cause instanceof import_kolmafia49.Path ? (_this = _super.call(this, "Invalid path ".concat(cause, "!")), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0)) : (_this = _super.call(this, cause), _defineProperty13(_assertThisInitialized3(_this), "cause", void 0));
    return _this.cause = cause, _possibleConstructorReturn3(_this);
  }
  return _createClass10(AscendError2);
}(/* @__PURE__ */ _wrapNativeSuper3(Error)), gardens = ["packet of pumpkin seeds", "Peppermint Pip Packet", "packet of dragon's teeth", "packet of beer seeds", "packet of winter seeds", "packet of thanksgarden seeds", "packet of tall grass seeds", "packet of mushroom spores"], eudorae = ["My Own Pen Pal kit", "GameInformPowerDailyPro subscription card", "Xi Receiver Unit", "New-You Club Membership Form", "Our Daily Candles\u2122 order form"], isGarden = function(x) {
  return arrayContains(x, gardens);
}, isEudora = function(x) {
  return arrayContains(x, eudorae);
}, isDesk = function(x) {
  return arrayContains(x, ChateauMantegna_exports.desks);
}, isNightstand = function(x) {
  return arrayContains(x, ChateauMantegna_exports.nightstands);
}, isCeiling = function(x) {
  return arrayContains(x, ChateauMantegna_exports.ceilings);
}, AscensionPrepError = /* @__PURE__ */ function(_Error2) {
  _inherits3(AscensionPrepError2, _Error2);
  var _super2 = _createSuper3(AscensionPrepError2);
  function AscensionPrepError2(cause, original) {
    var _this2;
    return _classCallCheck10(this, AscensionPrepError2), isGarden(cause) ? (_this2 = _super2.call(this, "Unable to swap garden to ".concat(cause, "; garden is currently ").concat(original, ".")), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)) : isEudora(cause) ? (_this2 = _super2.call(this, "Unable to swap eudora to ".concat(cause, "; eudora is currently ").concat(original, ".")), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)) : isDesk(cause) ? (_this2 = _super2.call(this, "Unable to swap chateau desk to ".concat(cause, "; desk is currently ").concat(original, ".")), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)) : isNightstand(cause) ? (_this2 = _super2.call(this, "Unable to swap chateau nightstand to ".concat(cause, "; nightstand is currently ").concat(original, ".")), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)) : isCeiling(cause) ? (_this2 = _super2.call(this, "Unable to swap chateau ceiling to ".concat(cause, "; ceiling is currently ").concat(original, ".")), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)) : (_this2 = _super2.call(this, cause), _defineProperty13(_assertThisInitialized3(_this2), "cause", void 0)), _this2.cause = cause, _possibleConstructorReturn3(_this2);
  }
  return _createClass10(AscensionPrepError2);
}(/* @__PURE__ */ _wrapNativeSuper3(Error));
function toMoonId(moon, playerClass) {
  if (typeof moon == "number")
    return moon;
  var offset = function() {
    switch (playerClass.primestat) {
      case $stat(_templateObject380 || (_templateObject380 = _taggedTemplateLiteral46(["Muscle"]))):
        return 0;
      case $stat(_templateObject2106 || (_templateObject2106 = _taggedTemplateLiteral46(["Mysticality"]))):
        return 1;
      case $stat(_templateObject381 || (_templateObject381 = _taggedTemplateLiteral46(["Moxie"]))):
        return 2;
      default:
        throw new AscendError("unknown prime stat for ".concat(playerClass));
    }
  };
  switch (moon.toLowerCase()) {
    case "mongoose":
      return 1;
    case "wallaby":
      return 2;
    case "vole":
      return 3;
    case "platypus":
      return 4;
    case "opossum":
      return 5;
    case "marmot":
      return 6;
    case "wombat":
      return 7;
    case "blender":
      return 8;
    case "packrat":
      return 9;
    case "degrassi":
    case "degrassi knoll":
    case "friendly degrassi knoll":
    case "knoll":
      return 1 + offset();
    case "canada":
    case "canadia":
    case "little canadia":
      return 4 + offset();
    case "gnomads":
    case "gnomish":
    case "gnomish gnomads camp":
      return 7 + offset();
    default:
      throw new AscendError("Invalid moon sign!");
  }
}
function isInValhalla() {
  var charPaneText = (0, import_kolmafia49.visitUrl)("charpane.php"), matches = charPaneText.match(/<img src="[^"]*\/otherimages\/inf_\w+\.gif">/);
  return matches !== null;
}
function ascend(path, playerClass, lifestyle, moon) {
  var consumable = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : $item(_templateObject456 || (_templateObject456 = _taggedTemplateLiteral46(["astral six-pack"]))), pet = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : void 0, permOptions = arguments.length > 6 ? arguments[6] : void 0;
  if (playerClass.path !== (path.avatar ? path : import_kolmafia49.Path.none))
    throw new AscendError(playerClass);
  if (path.id < 0)
    throw new AscendError(path);
  var moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9)
    throw new Error("Invalid moon ".concat(moon));
  if (consumable && !$items(_templateObject539 || (_templateObject539 = _taggedTemplateLiteral46(["astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks"]))).includes(consumable))
    throw new AscendError(consumable);
  if (pet && !$items(_templateObject631 || (_templateObject631 = _taggedTemplateLiteral46(["astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt"]))).includes(pet))
    throw new AscendError(pet);
  var illegalSkill = permOptions ? Array.from(permOptions.permSkills.keys()).find(function(skill3) {
    return !skill3.permable || !(0, import_kolmafia49.haveSkill)(skill3);
  }) : void 0;
  if (illegalSkill)
    throw new AscendError(illegalSkill);
  if (isInValhalla() || (0, import_kolmafia49.visitUrl)("ascend.php?action=ascend&confirm=on&confirm2=on"), !isInValhalla())
    throw new AscendError();
  if ((0, import_kolmafia49.visitUrl)("afterlife.php?action=pearlygates"), consumable && (0, import_kolmafia49.visitUrl)("afterlife.php?action=buydeli&whichitem=".concat((0, import_kolmafia49.toInt)(consumable))), pet && (0, import_kolmafia49.visitUrl)("afterlife.php?action=buyarmory&whichitem=".concat((0, import_kolmafia49.toInt)(pet))), permOptions) {
    var currentPerms = permedSkills(), karma = get("bankedKarma"), _iterator = _createForOfIteratorHelper10(permOptions.permSkills.entries()), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _currentPerms$get, _step$value = _slicedToArray14(_step.value, 2), skill2 = _step$value[0], prospectivePermLevel = _step$value[1], currentPermLevel = (_currentPerms$get = currentPerms.get(skill2)) !== null && _currentPerms$get !== void 0 ? _currentPerms$get : Lifestyle.casual;
        if (prospectivePermLevel > currentPermLevel) {
          var expectedKarma = 100 * (prospectivePermLevel - currentPermLevel);
          if (karma < expectedKarma) {
            if (!permOptions.neverAbort)
              throw new AscendError(skill2);
            continue;
          }
          karma -= expectedKarma;
          var permText = prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
          (0, import_kolmafia49.visitUrl)("afterlife.php?action=".concat(permText, "&whichskill=").concat((0, import_kolmafia49.toInt)(skill2)));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  (0, import_kolmafia49.visitUrl)("afterlife.php?action=ascend&confirmascend=1&whichsign=".concat(moonId, "&gender=2&whichclass=").concat((0, import_kolmafia49.toInt)(playerClass), "&whichpath=").concat(path.id, "&asctype=").concat(lifestyle, "&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd"), !0);
}
function prepareAscension() {
  var _throwOnFail, _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, garden = _ref3.garden, eudora = _ref3.eudora, chateau = _ref3.chateau, throwOnFail = _ref3.throwOnFail;
  if (throwOnFail = (_throwOnFail = throwOnFail) !== null && _throwOnFail !== void 0 ? _throwOnFail : !0, garden && !Object.getOwnPropertyNames((0, import_kolmafia49.getCampground)()).includes(garden)) {
    (0, import_kolmafia49.use)(import_kolmafia49.Item.get(garden));
    var gardenName = Object.getOwnPropertyNames((0, import_kolmafia49.getCampground)()).find(isGarden);
    if (gardenName !== garden && throwOnFail)
      throw new AscensionPrepError(garden, gardenName);
  }
  if (eudora && (0, import_kolmafia49.eudoraItem)().name !== eudora) {
    var eudoraNumber = 1 + eudorae.indexOf(eudora);
    if (!(0, import_kolmafia49.xpath)((0, import_kolmafia49.visitUrl)("account.php?tab=correspondence"), '//select[@name="whichpenpal"]/option/@value').includes(eudoraNumber.toString()) && throwOnFail)
      throw new AscensionPrepError("Unable to swap eudora to ".concat(eudora, " because you are not subscribed to it."));
    if ((0, import_kolmafia49.visitUrl)("account.php?actions[]=whichpenpal&whichpenpal=".concat(eudoraNumber, "&action=Update"), !0), (0, import_kolmafia49.eudoraItem)() !== import_kolmafia49.Item.get(eudora) && throwOnFail)
      throw new AscensionPrepError(eudora, (0, import_kolmafia49.eudoraItem)());
  }
  if (chateau && ChateauMantegna_exports.have()) {
    var desk = chateau.desk, ceiling = chateau.ceiling, nightstand = chateau.nightstand;
    if (ceiling && ChateauMantegna_exports.getCeiling() !== ceiling && !ChateauMantegna_exports.changeCeiling(ceiling) && throwOnFail) {
      var _ChateauMantegna$getC;
      throw new AscensionPrepError(ceiling, (_ChateauMantegna$getC = ChateauMantegna_exports.getCeiling()) !== null && _ChateauMantegna$getC !== void 0 ? _ChateauMantegna$getC : "unknown");
    }
    if (desk && ChateauMantegna_exports.getDesk() !== desk && !ChateauMantegna_exports.changeDesk(desk) && throwOnFail) {
      var _ChateauMantegna$getD;
      throw new AscensionPrepError(desk, (_ChateauMantegna$getD = ChateauMantegna_exports.getDesk()) !== null && _ChateauMantegna$getD !== void 0 ? _ChateauMantegna$getD : "unknown");
    }
    if (nightstand && ChateauMantegna_exports.getNightstand() !== nightstand && !ChateauMantegna_exports.changeNightstand(nightstand) && throwOnFail) {
      var _ChateauMantegna$getN;
      throw new AscensionPrepError(nightstand, (_ChateauMantegna$getN = ChateauMantegna_exports.getNightstand()) !== null && _ChateauMantegna$getN !== void 0 ? _ChateauMantegna$getN : "unknown");
    }
  }
}

// src/Clan.ts
init_kolmafia_polyfill();
var import_kolmafia50 = require("kolmafia");
function _toConsumableArray13(arr) {
  return _arrayWithoutHoles13(arr) || _iterableToArray13(arr) || _unsupportedIterableToArray27(arr) || _nonIterableSpread13();
}
function _nonIterableSpread13() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray13(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles13(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray27(arr);
}
function _createForOfIteratorHelper11(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray27(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray15(arr, i) {
  return _arrayWithHoles15(arr) || _iterableToArrayLimit15(arr, i) || _unsupportedIterableToArray27(arr, i) || _nonIterableRest15();
}
function _nonIterableRest15() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray27(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray27(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray27(o, minLen);
  }
}
function _arrayLikeToArray27(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit15(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles15(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classCallCheck11(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties11(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass11(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties11(Constructor.prototype, protoProps), staticProps && _defineProperties11(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty14(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _wrapRegExp() {
  _wrapRegExp = function(re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };
  var _super = RegExp.prototype, _groups = /* @__PURE__ */ new WeakMap();
  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);
    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf4(_this, BabelRegExp.prototype);
  }
  function buildGroups(result, re) {
    var g = _groups.get(re);
    return Object.keys(g).reduce(function(groups, name) {
      return groups[name] = result[g[name]], groups;
    }, /* @__PURE__ */ Object.create(null));
  }
  return _inherits4(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(str) {
    var result = _super.exec.call(this, str);
    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
    if (typeof substitution == "string") {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function(_, name) {
        return "$" + groups[name];
      }));
    }
    if (typeof substitution == "function") {
      var _this = this;
      return _super[Symbol.replace].call(this, str, function() {
        var args = arguments;
        return typeof args[args.length - 1] != "object" && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }
    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}
function _inherits4(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf4(subClass, superClass);
}
function _setPrototypeOf4(o, p) {
  return _setPrototypeOf4 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf4(o, p);
}
var clanIdCache = {}, toPlayerId = function(player) {
  return typeof player == "string" ? (0, import_kolmafia50.getPlayerId)(player) : player;
}, LOG_FAX_PATTERN = /* @__PURE__ */ _wrapRegExp(/(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (.*?))<br>/, {
  monster: 3
}), WHITELIST_DEGREE_PATTERN = /* @__PURE__ */ _wrapRegExp(/(.*?) \(\xB0(\d+)\)/, {
  name: 1,
  degree: 2
}), Clan = /* @__PURE__ */ function() {
  function Clan2(id, name) {
    _classCallCheck11(this, Clan2), _defineProperty14(this, "id", void 0), _defineProperty14(this, "name", void 0), this.id = id, this.name = name;
  }
  return _createClass11(Clan2, [{
    key: "_check",
    value: function() {
      if (this.id !== (0, import_kolmafia50.getClanId)())
        throw new Error("You are no longer a member of this clan");
    }
    /**
     * Join clan
     */
  }, {
    key: "join",
    value: function() {
      return Clan2.join(this.id);
    }
  }, {
    key: "check",
    value: function() {
      return (0, import_kolmafia50.visitUrl)("clan_hall.php").includes("<b>".concat(this.name, "</b>"));
    }
    /**
     * Return the monster that is currently in the current clan's fax machine if any
     */
  }, {
    key: "getCurrentFax",
    value: function() {
      this._check();
      var logs = (0, import_kolmafia50.visitUrl)("clan_log.php"), lastFax = logs.match(LOG_FAX_PATTERN);
      if (!lastFax)
        return null;
      var _lastFax = _slicedToArray15(lastFax, 4), monsterName = _lastFax[3];
      return monsterName ? import_kolmafia50.Monster.get(monsterName) : null;
    }
    /**
     * List available ranks (name, degree and id) from the current clan
     */
  }, {
    key: "getRanks",
    value: function() {
      this._check();
      var page = (0, import_kolmafia50.visitUrl)("clan_whitelist.php");
      return (0, import_kolmafia50.xpath)(page, '//select[@name="level"]//option').map(function(option) {
        var validHtml = "<select>".concat(option, "</select>"), match = (0, import_kolmafia50.xpath)(validHtml, "//text()")[0].match(WHITELIST_DEGREE_PATTERN), id = (0, import_kolmafia50.xpath)(validHtml, "//@value")[0];
        if (!match || !id)
          return null;
        var _match = _slicedToArray15(match, 3), name = _match[1], degree = _match[2];
        return {
          name: name,
          degree: Number.parseInt(degree),
          id: Number.parseInt(id)
        };
      }).filter(notNull);
    }
    /**
     * Add a player to the current clan's whitelist.
     * If the player is already in the whitelist this will change their rank or title.
     * @param player Player id or name
     * @param rankName Rank to give the player. If not provided they will be given the lowest rank
     * @param title Title to give the player. If not provided, will be blank
     */
  }, {
    key: "addPlayerToWhitelist",
    value: function(player, rankName) {
      var title = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
      this._check();
      var playerId = toPlayerId(player), ranks = this.getRanks(), rank = rankName ? ranks.find(function(r) {
        return r.name === rankName;
      }) : ranks.sort(function(a, b) {
        return a.degree - b.degree;
      })[0];
      if (!rank)
        return !1;
      var result = (0, import_kolmafia50.visitUrl)("clan_whitelist.php?action=add&pwd&addwho=".concat(playerId, "&level=").concat(rank.id, "&title=").concat(title));
      return result.includes("added to whitelist.") || result.includes("That player is already on the whitelist");
    }
    /**
     * Remove a player from the current clan's whitelist
     * @param player Player id or name
     */
  }, {
    key: "removePlayerFromWhitelist",
    value: function(player) {
      this._check();
      var playerId = toPlayerId(player), result = (0, import_kolmafia50.visitUrl)("clan_whitelist.php?action=updatewl&pwd&who=".concat(playerId, "&remove=Remove"));
      return result.includes("Whitelist updated.");
    }
    /**
     * Return the amount of meat in the current clan's coffer.
     */
  }, {
    key: "getMeatInCoffer",
    value: function() {
      this._check();
      var page = (0, import_kolmafia50.visitUrl)("clan_stash.php"), _ref = page.match(/Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./) || ["0", "0"], _ref2 = _slicedToArray15(_ref, 2), meat = _ref2[1];
      return parseNumber(meat);
    }
    /**
     * Add the given amount of meat to the current clan's coffer.
     * @param amount Amount of meat to put in coffer
     */
  }, {
    key: "putMeatInCoffer",
    value: function(amount) {
      this._check();
      var result = (0, import_kolmafia50.visitUrl)("clan_stash.php?pwd&action=contribute&howmuch=".concat(amount));
      return result.includes("You contributed");
    }
    /**
     * Take items from the stash
     *
     * This function will also take equivalent foldables if the original item cannot be found
     *
     * @param items Items to take
     * @returns Items successfully taken
     */
  }, {
    key: "take",
    value: function(items) {
      this._check();
      var map = arrayToCountedMap(items);
      return map.forEach(function(quantity, item8) {
        var needed = Math.max(0, quantity - (0, import_kolmafia50.availableAmount)(item8));
        if (needed === 0)
          return map.set(item8, 0);
        var foldGroup = getFoldGroup(item8), _iterator = _createForOfIteratorHelper11(foldGroup), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            for (var foldable = _step.value, quantityToFold = Math.min(needed, (0, import_kolmafia50.availableAmount)(foldable)), _i3 = 0; _i3 < quantityToFold; _i3++)
              (0, import_kolmafia50.cliExecute)("fold ".concat(item8.name)), needed--;
            return map.set(item8, needed);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        (0, import_kolmafia50.refreshStash)();
        for (var _i2 = 0, _arr2 = [item8].concat(_toConsumableArray13(foldGroup)); _i2 < _arr2.length; _i2++) {
          var matchingItem = _arr2[_i2], quantityToTake = Math.min(needed, (0, import_kolmafia50.stashAmount)(matchingItem));
          if (quantityToTake !== 0) {
            if (!(0, import_kolmafia50.takeStash)(quantityToTake, matchingItem))
              return;
            if (matchingItem === item8)
              needed -= quantityToTake;
            else
              for (var i = 0; i < quantityToTake; i++)
                (0, import_kolmafia50.cliExecute)("fold ".concat(matchingItem.name)), needed--;
          }
        }
      }), Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Put items in the stash
     * @param items Items to put in the stash
     * @returns Items successfully put in the stash
     */
  }, {
    key: "put",
    value: function(items) {
      this._check();
      var map = arrayToCountedMap(items);
      if (!this.check())
        throw new Error("Wanted to return ".concat(countedMapToString(map), " to ").concat(this.name, " but KoLmafia's clan data is out of sync"));
      return map.forEach(function(quantity, item8) {
        (0, import_kolmafia50.retrieveItem)(quantity, item8);
        var returned = Math.min(quantity, (0, import_kolmafia50.availableAmount)(item8));
        (0, import_kolmafia50.putStash)(returned, item8), map.set(item8, quantity - returned);
      }), Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Return the monster that is currently in the current clan's fax machine if any
     */
  }, {
    key: "withStash",
    value: function(items, callback) {
      var _this = this;
      this._check();
      var map = arrayToCountedMap(items);
      return Clan2._withStash(function() {
        return _this.take(map);
      }, function(borrowed) {
        return _this.put(borrowed);
      }, callback);
    }
  }], [{
    key: "_join",
    value: function(id) {
      var result = (0, import_kolmafia50.visitUrl)("showclan.php?recruiter=1&whichclan=".concat(id, "&pwd&whichclan=").concat(id, "&action=joinclan&apply=Apply+to+this+Clan&confirm=on"));
      if (!result.includes("clanhalltop.gif"))
        throw new Error("Could not join clan");
      return Clan2.get();
    }
  }, {
    key: "_withStash",
    value: function(borrowFn, returnFn, callback) {
      var borrowed = borrowFn(), map = arrayToCountedMap(borrowed);
      try {
        return callback(borrowed);
      } finally {
        if (map.size > 0) {
          var returned = arrayToCountedMap(returnFn(borrowed));
          map.forEach(function(quantity, item8) {
            var remaining = quantity - (returned.get(item8) || 0);
            remaining > 0 ? map.set(item8, remaining) : map.delete(item8);
          }), map.size > 0 && logger_default.error("Failed to return <b>".concat(countedMapToString(map), "</b> to <b>").concat(this.name, "</b> stash"));
        }
      }
    }
    /**
     * Join a clan and return its instance
     * @param clanIdOrName Clan id or name
     */
  }, {
    key: "join",
    value: function(clanIdOrName) {
      var clanId;
      if (typeof clanIdOrName == "string") {
        var _clanName = clanIdOrName.toLowerCase();
        if (_clanName === (0, import_kolmafia50.getClanName)().toLowerCase())
          return Clan2.get();
        if (!(_clanName in clanIdCache)) {
          var clan = Clan2.getWhitelisted().find(function(c) {
            return c.name.toLowerCase() === _clanName;
          });
          if (!clan)
            throw new Error("Player is not whitelisted to clan");
          clanIdCache[_clanName] = clan.id;
        }
        clanId = clanIdCache[_clanName];
      } else if (clanId = clanIdOrName, clanId === (0, import_kolmafia50.getClanId)())
        return Clan2.get();
      return Clan2._join(clanId);
    }
    /**
     * Execute callback as a member of a clan
     * and then restore prior membership
     * @param clanIdOrName Clan id or name
     */
  }, {
    key: "with",
    value: function(clanIdOrName, callback) {
      var startingClan = Clan2.get(), clan = Clan2.join(clanIdOrName);
      try {
        return callback(clan);
      } finally {
        startingClan.join();
      }
    }
    /**
     * Execute callback with items from a clan stash
     * and then restore those items to the stash
     *
     * During the execution of the callback, player will not be in the stash clan
     *
     * @param clanIdOrName Clan id or name
     */
  }, {
    key: "withStash",
    value: function(clanIdOrName, items, callback) {
      return Clan2._withStash(function() {
        return Clan2.with(clanIdOrName, function(clan) {
          return clan.take(items);
        });
      }, function(borrowed) {
        return Clan2.with(clanIdOrName, function(clan) {
          return clan.put(borrowed);
        });
      }, callback);
    }
    /**
     * Return player's current Clan
     */
  }, {
    key: "get",
    value: function() {
      return new Clan2((0, import_kolmafia50.getClanId)(), (0, import_kolmafia50.getClanName)());
    }
    /**
     * Get list of clans to which the player is whitelisted
     */
  }, {
    key: "getWhitelisted",
    value: function() {
      var page = (0, import_kolmafia50.visitUrl)("clan_signup.php");
      return (0, import_kolmafia50.xpath)(page, '//select[@name="whichclan"]//option').map(function(option) {
        var validHtml = "<select>".concat(option, "</select>"), id = Number.parseInt((0, import_kolmafia50.xpath)(validHtml, "//@value")[0]), name = (0, import_kolmafia50.xpath)(validHtml, "//text()")[0];
        return new Clan2(id, name);
      });
    }
  }]), Clan2;
}();

// src/challengePaths/index.ts
init_kolmafia_polyfill();

// src/challengePaths/2015/CommunityService.ts
init_kolmafia_polyfill();
var import_kolmafia51 = require("kolmafia");
var _templateObject386, _templateObject2107, _templateObject387, _templateObject457, _templateObject540, _templateObject634, _templateObject729, _templateObject825, _templateObject921, _templateObject1020, _templateObject1117, _templateObject1217, _templateObject1315, _templateObject1412, _templateObject1512, _templateObject1612, _templateObject1712, _templateObject1812, _templateObject1912, _templateObject2012, _templateObject2117, _templateObject2214, _templateObject2312, _templateObject2411, _templateObject2511, _templateObject2611, _templateObject2711;
function _slicedToArray16(arr, i) {
  return _arrayWithHoles16(arr) || _iterableToArrayLimit16(arr, i) || _unsupportedIterableToArray28(arr, i) || _nonIterableRest16();
}
function _nonIterableRest16() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray28(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray28(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray28(o, minLen);
  }
}
function _arrayLikeToArray28(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit16(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles16(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classCallCheck12(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties12(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass12(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties12(Constructor.prototype, protoProps), staticProps && _defineProperties12(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty15(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral47(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var thralls = /* @__PURE__ */ new Map([[$stat(_templateObject386 || (_templateObject386 = _taggedTemplateLiteral47(["muscle"]))), $thrall(_templateObject2107 || (_templateObject2107 = _taggedTemplateLiteral47(["Elbow Macaroni"])))], [$stat(_templateObject387 || (_templateObject387 = _taggedTemplateLiteral47(["moxie"]))), $thrall(_templateObject457 || (_templateObject457 = _taggedTemplateLiteral47(["Penne Dreadful"])))]]), statCommunityServicePredictor = function(stat) {
  return function() {
    return 60 - Math.floor(1 / 30 * ((0, import_kolmafia51.myBuffedstat)(stat) - (0, import_kolmafia51.myBasestat)(thralls.get(stat) === (0, import_kolmafia51.myThrall)() && !have($effect(_templateObject540 || (_templateObject540 = _taggedTemplateLiteral47(["Expert Oiliness"])))) ? $stat(_templateObject634 || (_templateObject634 = _taggedTemplateLiteral47(["mysticality"]))) : stat)));
  };
}, visitCouncil = function() {
  return (0, import_kolmafia51.visitUrl)("council.php");
}, baseWeight = function() {
  return have($effect(_templateObject729 || (_templateObject729 = _taggedTemplateLiteral47(["Fidoxene"])))) ? 20 : (0, import_kolmafia51.familiarWeight)((0, import_kolmafia51.myFamiliar)());
}, CommunityService = /* @__PURE__ */ function() {
  function CommunityService2(id, stat, property, predictor, maximizeRequirements) {
    _classCallCheck12(this, CommunityService2), _defineProperty15(this, "choice", void 0), _defineProperty15(this, "stat", void 0), _defineProperty15(this, "property", void 0), _defineProperty15(this, "predictor", void 0), _defineProperty15(this, "maximizeRequirements", void 0), this.choice = id, this.stat = stat, this.property = property, this.predictor = predictor, this.maximizeRequirements = maximizeRequirements;
  }
  return _createClass12(CommunityService2, [{
    key: "id",
    get: function() {
      return this.choice;
    }
    /**
     * @returns The primary stat the test measures, used primarily as memorable shorthand in place of test names.
     */
  }, {
    key: "statName",
    get: function() {
      return this.stat;
    }
    /**
     * @returns The name of the test, used primarily as part of the string property "csServicesPerformed"
     */
  }, {
    key: "name",
    get: function() {
      return this.property;
    }
    /**
     *  @returns The predicted number of turns this test will take given your character's current state.
     */
  }, {
    key: "prediction",
    get: function() {
      return this.predictor();
    }
    /**
     * @returns A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
     */
  }, {
    key: "requirement",
    get: function() {
      return this.maximizeRequirements;
    }
  }, {
    key: "isDone",
    value: (
      /**
       * Checks the "csServicesPerformed" property to see whether mafia currently believes this test is complete.
       * @returns Whether mafia currently believes this test is complete.
       */
      function() {
        return get("csServicesPerformed").includes(this.property);
      }
    )
    /**
     * Maximizes based on the Requirement associated with this particular test.
     */
  }, {
    key: "maximize",
    value: function() {
      this.maximizeRequirements && this.maximizeRequirements.maximize();
    }
    /**
     * Attempts to turn in the test to the Council of Loathing.
     * @returns Whether mafia believes the test is complete at the end of this function.
     */
  }, {
    key: "do",
    value: function() {
      get("csServicesPerformed").trim().length === 0 && visitCouncil(), visitCouncil();
      var councilText = (0, import_kolmafia51.runChoice)(this.choice);
      return this._verifyIsDone(councilText);
    }
    /**
     * Wrapper function that prepares for a test and then completes it, adding time and turn details to the log.
     * @param prepare A function that does all necessary preparations for this CS test, including choosing your outfit. Optionally returns the number of turns you expect to spend preparing for the test.
     * @param maxTurns We will run the test iff the predicted/actual turns is less than or equal to this parameter.
     * @returns "completed", "failed", or "already completed".
     */
  }, {
    key: "run",
    value: function(prepare) {
      var maxTurns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0;
      if (this.isDone())
        return "already completed";
      var startTime = Date.now(), startTurns = (0, import_kolmafia51.myTurncount)(), additionalTurns;
      try {
        var _prepare;
        additionalTurns = (_prepare = prepare()) !== null && _prepare !== void 0 ? _prepare : 0;
      } catch (e) {
        return (0, import_kolmafia51.print)("".concat(e), "red"), "failed";
      }
      var prediction = this.predictor(), council = visitCouncil(), turns = this._actualCost(council);
      return turns ? turns > Math.min(maxTurns, (0, import_kolmafia51.myAdventures)()) || !this.do() ? "failed" : (CommunityService2.log[this.property] = {
        predictedTurns: prediction + additionalTurns,
        turnCost: (0, import_kolmafia51.myTurncount)() - startTurns,
        seconds: (Date.now() - startTime) / 1e3,
        type: "test"
      }, "completed") : "already completed";
    }
  }, {
    key: "_verifyIsDone",
    value: function(councilText) {
      return !councilText.includes("<input type=hidden name=option value=".concat(this.choice, ">"));
    }
    /**
     * Checks council.php to verify that a test is complete; more reliable than isDone, but requires an additional pagehit.
     * @returns Whether council.php suggests that the test is complete.
     */
  }, {
    key: "verifyIsDone",
    value: function() {
      return this._verifyIsDone(visitCouncil());
    }
  }, {
    key: "_actualCost",
    value: function(councilText) {
      var match = councilText.match("<input type=hidden name=option value=".concat(this.id, ">.*?Perform Service \\((\\d+) Adventures\\)"));
      return match ? parseInt(match[1]) : 0;
    }
    /**
     * Checks council.php for the number of turns this test will take; more reliable than prediction, but requires an additional pagehit.
     * @returns The number of turns to complete this test according to council.php.
     */
  }, {
    key: "actualCost",
    value: function() {
      return this._actualCost(visitCouncil());
    }
    /**
     * A log of the predicted turns, actual turns, and duration of each CS test performed.
     */
  }], [{
    key: "logTask",
    value: function(name, action) {
      var _action, startTime = Date.now(), startTurns = (0, import_kolmafia51.myTurncount)(), estimatedTurns = (_action = action()) !== null && _action !== void 0 ? _action : 0;
      CommunityService2.log[name] = {
        type: "task",
        turnCost: (0, import_kolmafia51.myTurncount)() - startTurns,
        predictedTurns: estimatedTurns,
        seconds: (Date.now() - startTime) / 1e3
      };
    }
  }, {
    key: "printLog",
    value: (
      /**
       * Prints turncount and time details of the test in question.
       * @param colour The colour (or color) you'd like the log to be printed in.
       */
      function() {
        for (var colour = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "blue", logEntries = Object.entries(CommunityService2.log), _i = 0, _logEntries = logEntries; _i < _logEntries.length; _i++) {
          var _logEntries$_i = _slicedToArray16(_logEntries[_i], 2), testName = _logEntries$_i[0], testEntry = _logEntries$_i[1], type = testEntry.type, predictedTurns = testEntry.predictedTurns, turnCost = testEntry.turnCost, seconds = testEntry.seconds;
          type === "test" ? ((0, import_kolmafia51.print)("We predicted the ".concat(testName, " test would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour), (0, import_kolmafia51.print)("".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour)) : (predictedTurns === 0 && turnCost === 0 || (0, import_kolmafia51.print)("We predicted the task ".concat(testName, " would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour), (0, import_kolmafia51.print)("The task ".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour));
        }
        var totalTime = sum(logEntries, function(_ref) {
          var _ref2 = _slicedToArray16(_ref, 2), testEntry2 = _ref2[1];
          return testEntry2.seconds;
        });
        (0, import_kolmafia51.print)("All together, you have spent ".concat(totalTime.toFixed(1), " seconds during this Community Service run"), colour);
      }
    )
    // Below, we have the tests themselves.
  }]), CommunityService2;
}();
_defineProperty15(CommunityService, "log", {});
_defineProperty15(CommunityService, "HP", new CommunityService(1, "HP", "Donate Blood", function() {
  return 60 - Math.floor(((0, import_kolmafia51.myMaxhp)() - (0, import_kolmafia51.myBuffedstat)($stat(_templateObject825 || (_templateObject825 = _taggedTemplateLiteral47(["muscle"])))) - 3) / 30);
}, new Requirement(["HP"], {})));
_defineProperty15(CommunityService, "Muscle", new CommunityService(2, "Muscle", "Feed The Children", statCommunityServicePredictor($stat(_templateObject921 || (_templateObject921 = _taggedTemplateLiteral47(["Muscle"])))), new Requirement(["Muscle"], {})));
_defineProperty15(CommunityService, "Mysticality", new CommunityService(3, "Mysticality", "Build Playground Mazes", statCommunityServicePredictor($stat(_templateObject1020 || (_templateObject1020 = _taggedTemplateLiteral47(["Mysticality"])))), new Requirement(["Mysticality"], {})));
_defineProperty15(CommunityService, "Moxie", new CommunityService(4, "Moxie", "Feed Conspirators", statCommunityServicePredictor($stat(_templateObject1117 || (_templateObject1117 = _taggedTemplateLiteral47(["Moxie"])))), new Requirement(["Moxie"], {})));
_defineProperty15(CommunityService, "FamiliarWeight", new CommunityService(5, "Familiar Weight", "Breed More Collies", function() {
  return 60 - Math.floor((baseWeight() + (0, import_kolmafia51.weightAdjustment)()) / 5);
}, new Requirement(["Familiar Weight"], {})));
_defineProperty15(CommunityService, "WeaponDamage", new CommunityService(6, "Weapon Damage", "Reduce Gazelle Population", function() {
  var weaponPower = (0, import_kolmafia51.getPower)((0, import_kolmafia51.equippedItem)($slot(_templateObject1217 || (_templateObject1217 = _taggedTemplateLiteral47(["weapon"]))))), offhandPower = (0, import_kolmafia51.toSlot)((0, import_kolmafia51.equippedItem)($slot(_templateObject1315 || (_templateObject1315 = _taggedTemplateLiteral47(["off-hand"]))))) === $slot(_templateObject1412 || (_templateObject1412 = _taggedTemplateLiteral47(["weapon"]))) ? (0, import_kolmafia51.getPower)((0, import_kolmafia51.equippedItem)($slot(_templateObject1512 || (_templateObject1512 = _taggedTemplateLiteral47(["off-hand"]))))) : 0, familiarPower = (0, import_kolmafia51.toSlot)((0, import_kolmafia51.equippedItem)($slot(_templateObject1612 || (_templateObject1612 = _taggedTemplateLiteral47(["familiar"]))))) === $slot(_templateObject1712 || (_templateObject1712 = _taggedTemplateLiteral47(["weapon"]))) ? (0, import_kolmafia51.getPower)((0, import_kolmafia51.equippedItem)($slot(_templateObject1812 || (_templateObject1812 = _taggedTemplateLiteral47(["familiar"]))))) : 0, multiplier = have($effect(_templateObject1912 || (_templateObject1912 = _taggedTemplateLiteral47(["Bow-Legged Swagger"])))) ? 2 : 1;
  return 60 - Math.floor(multiplier * (get2("Weapon Damage") - 0.15 * (weaponPower + offhandPower + familiarPower)) / 50 + 1e-3) - Math.floor(multiplier * get2("Weapon Damage Percent") / 50 + 1e-3);
}, new Requirement(["Weapon Damage", "Weapon Damage Percent"], {})));
_defineProperty15(CommunityService, "SpellDamage", new CommunityService(7, "Spell Damage", "Make Sausage", function() {
  var dragonfishDamage = (0, import_kolmafia51.myFamiliar)() === $familiar(_templateObject2012 || (_templateObject2012 = _taggedTemplateLiteral47(["Magic Dragonfish"]))) ? (0, import_kolmafia51.numericModifier)($familiar(_templateObject2117 || (_templateObject2117 = _taggedTemplateLiteral47(["Magic Dragonfish"]))), "Spell Damage Percent", baseWeight() + (0, import_kolmafia51.weightAdjustment)(), $item.none) : 0;
  return 60 - Math.floor(get2("Spell Damage") / 50 + 1e-3) - Math.floor((get2("Spell Damage Percent") - dragonfishDamage) / 50 + 1e-3);
}, new Requirement(["Spell Damage", "Spell Damage Percent"], {})));
_defineProperty15(CommunityService, "Noncombat", new CommunityService(8, "Non-Combat", "Be a Living Statue", function() {
  var noncombatRate = -1 * get2("Combat Rate"), unsoftcappedRate = noncombatRate > 25 ? 25 + (noncombatRate - 25) * 5 : noncombatRate;
  return 60 - 3 * Math.floor(unsoftcappedRate / 5);
}, new Requirement(["-combat"], {})));
_defineProperty15(CommunityService, "BoozeDrop", new CommunityService(9, "Item Drop", "Make Margaritas", function() {
  var mummingCostume = MummingTrunk_exports.currentCostumes().get((0, import_kolmafia51.myFamiliar)()), mummingBuff = mummingCostume && mummingCostume[0] === "Item Drop" ? mummingCostume[1] : 0, familiarItemDrop = (0, import_kolmafia51.numericModifier)((0, import_kolmafia51.myFamiliar)(), "Item Drop", baseWeight() + (0, import_kolmafia51.weightAdjustment)(), (0, import_kolmafia51.equippedItem)($slot(_templateObject2214 || (_templateObject2214 = _taggedTemplateLiteral47(["familiar"]))))) + mummingBuff - (0, import_kolmafia51.numericModifier)((0, import_kolmafia51.equippedItem)($slot(_templateObject2312 || (_templateObject2312 = _taggedTemplateLiteral47(["familiar"])))), "Item Drop"), familiarBoozeDrop = (0, import_kolmafia51.numericModifier)((0, import_kolmafia51.myFamiliar)(), "Booze Drop", baseWeight() + (0, import_kolmafia51.weightAdjustment)(), (0, import_kolmafia51.equippedItem)($slot(_templateObject2411 || (_templateObject2411 = _taggedTemplateLiteral47(["familiar"]))))) - (0, import_kolmafia51.numericModifier)((0, import_kolmafia51.equippedItem)($slot(_templateObject2511 || (_templateObject2511 = _taggedTemplateLiteral47(["familiar"])))), "Booze Drop"), multiplier = (0, import_kolmafia51.haveEquipped)($item(_templateObject2611 || (_templateObject2611 = _taggedTemplateLiteral47(["broken champagne bottle"])))) && get("garbageChampagneCharge") > 0 ? 0.5 : 1;
  return 60 - Math.floor(multiplier * (get2("Item Drop") - familiarItemDrop - (0, import_kolmafia51.numericModifier)((0, import_kolmafia51.myThrall)(), "Item Drop")) / 30 + 1e-3) - Math.floor((get2("Booze Drop") - familiarBoozeDrop) / 15 + 1e-3);
}, new Requirement(["Item Drop", "2 Booze Drop"], {
  preventEquip: $items(_templateObject2711 || (_templateObject2711 = _taggedTemplateLiteral47(["broken champagne bottle"])))
})));
_defineProperty15(CommunityService, "HotRes", new CommunityService(10, "Hot Resistance", "Clean Steam Tunnels", function() {
  return 60 - get2("Hot Resistance");
}, new Requirement(["Hot Resistance"], {})));
_defineProperty15(CommunityService, "CoilWire", new CommunityService(11, "Coil Wire", "Coil Wire", function() {
  return 60;
}, new Requirement([], {})));
_defineProperty15(CommunityService, "donate", function() {
  visitCouncil(), (0, import_kolmafia51.visitUrl)("choice.php?whichchoice=1089&option=30");
});

// src/challengePaths/2016/NuclearAutumn.ts
var NuclearAutumn_exports = {};
__export(NuclearAutumn_exports, {
  chronoLab: function() {
    return chronoLab;
  },
  coolingTank: function() {
    return coolingTank;
  },
  spa: function() {
    return spa;
  }
});
init_kolmafia_polyfill();
var import_kolmafia52 = require("kolmafia");
function coolingTank() {
  (0, import_kolmafia52.visitUrl)("place.php?whichplace=falloutshelter&action=vault8");
}
function spa() {
  (0, import_kolmafia52.visitUrl)("place.php?whichplace=falloutshelter&action=vault3");
}
function chronoLab() {
  (0, import_kolmafia52.visitUrl)("place.php?whichplace=falloutshelter&action=vault5");
}

// src/counter.ts
var counter_exports = {};
__export(counter_exports, {
  exists: function() {
    return exists;
  },
  get: function() {
    return get3;
  },
  set: function() {
    return set2;
  }
});
init_kolmafia_polyfill();
var import_kolmafia53 = require("kolmafia");
function get3(counter) {
  var value = (0, import_kolmafia53.getCounter)(counter);
  return value === -1 ? (0, import_kolmafia53.getCounters)(counter, -1, -1).trim() === "" ? 1 / 0 : -1 : value;
}
function exists(counter) {
  return (0, import_kolmafia53.getCounter)(counter) !== -1 || (0, import_kolmafia53.getCounters)(counter, -1, -1).trim() !== "";
}
function set2(counter, duration) {
  return (0, import_kolmafia53.cliExecute)("counters add ".concat(duration, " ").concat(counter)), get3(counter) !== null;
}

// src/diet/index.ts
init_kolmafia_polyfill();
var import_kolmafia54 = require("kolmafia");

// src/diet/knapsack.ts
init_kolmafia_polyfill();
function _toConsumableArray14(arr) {
  return _arrayWithoutHoles14(arr) || _iterableToArray14(arr) || _unsupportedIterableToArray29(arr) || _nonIterableSpread14();
}
function _nonIterableSpread14() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray14(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles14(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray29(arr);
}
function _slicedToArray17(arr, i) {
  return _arrayWithHoles17(arr) || _iterableToArrayLimit17(arr, i) || _unsupportedIterableToArray29(arr, i) || _nonIterableRest17();
}
function _nonIterableRest17() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit17(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles17(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper12(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray29(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray29(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray29(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray29(o, minLen);
  }
}
function _arrayLikeToArray29(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperties13(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass13(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties13(Constructor.prototype, protoProps), staticProps && _defineProperties13(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck13(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty16(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Not = /* @__PURE__ */ _createClass13(function Not2(thing) {
  _classCallCheck13(this, Not2), _defineProperty16(this, "thing", void 0), this.thing = thing;
});
function aggregate(list, isEqual) {
  var aggregatedList = [], _iterator = _createForOfIteratorHelper12(list), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var item8 = _step.value;
      if (aggregatedList.length === 0)
        aggregatedList.push([item8, 1]);
      else {
        var last = aggregatedList[aggregatedList.length - 1], _last = _slicedToArray17(last, 1), lastItem = _last[0];
        (isEqual ? isEqual(item8, lastItem) : item8 === lastItem) ? last[1]++ : aggregatedList.push([item8, 1]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return aggregatedList;
}
function knapsack(values2, capacity) {
  var _ref5;
  if (!Number.isFinite(capacity))
    throw new Error("Invalid capacity.");
  var valuesInverted = values2.map(function(_ref) {
    var _ref2 = _slicedToArray17(_ref, 4), thing = _ref2[0], value2 = _ref2[1], weight = _ref2[2], maximum2 = _ref2[3];
    return weight < 0 && maximum2 !== void 0 ? [new Not(thing), -value2, -weight, maximum2] : [thing, value2, weight, maximum2];
  }), capacityAdjustment = sum(values2, function(_ref3) {
    var _ref4 = _slicedToArray17(_ref3, 4), weight = _ref4[2], maximum2 = _ref4[3];
    return weight < 0 && maximum2 !== void 0 ? -weight * maximum2 : 0;
  }), adjustedCapacity = capacity + capacityAdjustment;
  if (adjustedCapacity < 0)
    return [-1 / 0, []];
  for (var valuesSorted = _toConsumableArray14(valuesInverted).sort(function(x, y) {
    return x[2] - y[2];
  }), values01 = (_ref5 = []).concat.apply(_ref5, _toConsumableArray14(valuesSorted.map(function(_ref6) {
    var _ref7 = _slicedToArray17(_ref6, 4), thing = _ref7[0], value2 = _ref7[1], weight = _ref7[2], maximum2 = _ref7[3];
    if (!Number.isFinite(weight) || weight < 0)
      throw new Error("Invalid weight ".concat(weight, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    var maxQuantity = Math.floor(maximum2 != null ? maximum2 : adjustedCapacity / weight);
    if (maxQuantity < 0)
      throw new Error("Invalid max quantity ".concat(maxQuantity, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    return new Array(maxQuantity).fill([thing, value2, weight]);
  }))), memoizationTable = new Array(values01.length), i = 0; i < values01.length; i++)
    memoizationTable[i] = new Array(adjustedCapacity).fill(null);
  var _bestSolution = bestSolution(memoizationTable, values01, values01.length - 1, adjustedCapacity), _bestSolution2 = _slicedToArray17(_bestSolution, 2), value = _bestSolution2[0], invertedSolution = _bestSolution2[1], aggregatedSolution = aggregate(invertedSolution), countMap = new Map(aggregatedSolution), valueAdjustment = 0, solution = aggregatedSolution.filter(function(_ref8) {
    var _ref9 = _slicedToArray17(_ref8, 1), thingOrNot2 = _ref9[0];
    return !(thingOrNot2 instanceof Not);
  }), _iterator2 = _createForOfIteratorHelper12(valuesSorted), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var _step2$value = _slicedToArray17(_step2.value, 4), thingOrNot = _step2$value[0], _value = _step2$value[1], maximum = _step2$value[3];
      if (thingOrNot instanceof Not) {
        var _countMap$get, notCount = (_countMap$get = countMap.get(thingOrNot)) !== null && _countMap$get !== void 0 ? _countMap$get : 0;
        if (maximum === void 0)
          throw new Error("Cannot find maximum for item ".concat(thingOrNot.thing, "."));
        if (notCount > maximum)
          throw new Error("Somehow picked ".concat(notCount, " more than the maximum ").concat(notCount, " for item ").concat(thingOrNot.thing, "."));
        notCount < maximum && solution.push([thingOrNot.thing, maximum - notCount]), valueAdjustment -= maximum * _value;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return [value + valueAdjustment, solution];
}
function bestSolution(memoizationTable, values2, currentIndex, remainingCapacity) {
  if (remainingCapacity < 0)
    return [-1 / 0, []];
  if (remainingCapacity === 0 || currentIndex < 0)
    return [0, []];
  var memoized = memoizationTable[currentIndex][remainingCapacity - 1];
  if (memoized !== null)
    return memoized;
  var _values$currentIndex = _slicedToArray17(values2[currentIndex], 3), item8 = _values$currentIndex[0], value = _values$currentIndex[1], weight = _values$currentIndex[2], _bestSolution3 = bestSolution(memoizationTable, values2, currentIndex - 1, remainingCapacity - weight), _bestSolution4 = _slicedToArray17(_bestSolution3, 2), valueIncludeRest = _bestSolution4[0], itemsInclude = _bestSolution4[1], valueInclude = valueIncludeRest + value, _bestSolution5 = bestSolution(memoizationTable, values2, currentIndex - 1, remainingCapacity), _bestSolution6 = _slicedToArray17(_bestSolution5, 2), valueExclude = _bestSolution6[0], itemsExclude = _bestSolution6[1], result = valueInclude > valueExclude ? [valueInclude, [].concat(_toConsumableArray14(itemsInclude), [item8])] : [valueExclude, itemsExclude];
  return memoizationTable[currentIndex][remainingCapacity - 1] = result, result;
}

// src/diet/index.ts
var _templateObject388, _templateObject2108, _templateObject389, _templateObject458, _templateObject541, _templateObject635, _templateObject730, _templateObject826, _templateObject923, _templateObject1021, _templateObject1118, _templateObject1218, _templateObject1316, _templateObject1413, _templateObject1513, _templateObject1613, _templateObject1713, _templateObject1813, _templateObject1913, _templateObject2013, _templateObject2118, _templateObject2215, _templateObject2313, _templateObject2412, _templateObject2512, _templateObject2612, _templateObject2712, _templateObject2810, _templateObject2910, _templateObject3010, _templateObject3112, _templateObject3211, _templateObject3310, _templateObject3410, _templateObject3510, _templateObject3610, _templateObject3710, _templateObject3810, _templateObject396, _templateObject406, _templateObject4111, _templateObject4210, _templateObject4310, _templateObject4410, _templateObject459, _templateObject465, _templateObject475, _templateObject485, _templateObject495, _templateObject505, _templateObject5110, _templateObject5210, _templateObject5310, _templateObject545, _templateObject555, _templateObject565, _templateObject575, _templateObject584, _templateObject594;
function _createForOfIteratorHelper13(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray30(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function ownKeys5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys5(Object(source), !0).forEach(function(key) {
      _defineProperty17(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck14(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties14(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass14(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties14(Constructor.prototype, protoProps), staticProps && _defineProperties14(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty17(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray15(arr) {
  return _arrayWithoutHoles15(arr) || _iterableToArray15(arr) || _unsupportedIterableToArray30(arr) || _nonIterableSpread15();
}
function _nonIterableSpread15() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray15(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles15(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray30(arr);
}
function _slicedToArray18(arr, i) {
  return _arrayWithHoles18(arr) || _iterableToArrayLimit18(arr, i) || _unsupportedIterableToArray30(arr, i) || _nonIterableRest18();
}
function _nonIterableRest18() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray30(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray30(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray30(o, minLen);
  }
}
function _arrayLikeToArray30(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit18(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles18(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral48(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function isMonday() {
  return get2("Muscle Percent", $item(_templateObject388 || (_templateObject388 = _taggedTemplateLiteral48(["Tuesday's ruby"])))) > 0;
}
function _expectedAdventures(item8, modifiers) {
  var _item$notes, _item$notes2, _item$notes3, _item$notes4, _item$notes5;
  if (item8.adventures === "")
    return 0;
  var _item$adventures$spli = item8.adventures.split(/[-]/).map(function(s) {
    return parseInt(s);
  }), _item$adventures$spli2 = _slicedToArray18(_item$adventures$spli, 2), min = _item$adventures$spli2[0], recordedMax = _item$adventures$spli2[1], max = recordedMax != null ? recordedMax : min, interpolated = _toConsumableArray15(new Array(max - min + 1).keys()).map(function(n) {
    return n + min;
  }), forkMugMultiplier = (0, import_kolmafia54.itemType)(item8) === "food" && (_item$notes = item8.notes) !== null && _item$notes !== void 0 && _item$notes.includes("SALAD") || (0, import_kolmafia54.itemType)(item8) === "booze" && (_item$notes2 = item8.notes) !== null && _item$notes2 !== void 0 && _item$notes2.includes("BEER") ? 1.5 : 1.3, seasoningAdventures = max - min <= 1 ? 1 : 0.5, garish = modifiers.garish && ((_item$notes3 = item8.notes) === null || _item$notes3 === void 0 ? void 0 : _item$notes3.includes("LASAGNA")) && !isMonday(), refinedPalate = modifiers.refinedPalate && ((_item$notes4 = item8.notes) === null || _item$notes4 === void 0 ? void 0 : _item$notes4.includes("WINE")), pinkyRing = modifiers.pinkyRing && ((_item$notes5 = item8.notes) === null || _item$notes5 === void 0 ? void 0 : _item$notes5.includes("WINE"));
  return sum(interpolated, function(baseAdventures) {
    var _item$notes6, _item$notes7, adventures = baseAdventures;
    return modifiers.forkMug && (adventures = Math.floor(adventures * forkMugMultiplier)), (_item$notes6 = item8.notes) !== null && _item$notes6 !== void 0 && _item$notes6.includes("SAUCY") && modifiers.saucemaven && (adventures += (0, import_kolmafia54.myPrimestat)() === $stat(_templateObject2108 || (_templateObject2108 = _taggedTemplateLiteral48(["Mysticality"]))) ? 5 : 3), garish && (adventures += 5), refinedPalate && (adventures = Math.floor(adventures * 1.25)), pinkyRing && (adventures = Math.round(adventures * 1.125)), (_item$notes7 = item8.notes) !== null && _item$notes7 !== void 0 && _item$notes7.includes("MARTINI") && modifiers.tuxedoShirt && (adventures += 2), (0, import_kolmafia54.itemType)(item8) === "food" && modifiers.mayoflex && adventures++, (0, import_kolmafia54.itemType)(item8) === "food" && modifiers.seasoning && (adventures += seasoningAdventures), adventures;
  }) / interpolated.length;
}
var MenuItem = /* @__PURE__ */ function() {
  function MenuItem2(item8) {
    var _MenuItem$defaultOpti, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck14(this, MenuItem2), _defineProperty17(this, "item", void 0), _defineProperty17(this, "organ", void 0), _defineProperty17(this, "size", void 0), _defineProperty17(this, "maximum", void 0), _defineProperty17(this, "additionalValue", void 0), _defineProperty17(this, "effect", void 0), _defineProperty17(this, "priceOverride", void 0), _defineProperty17(this, "mayo", void 0), _defineProperty17(this, "data", void 0);
    var _options = _objectSpread5(_objectSpread5({}, options), (_MenuItem$defaultOpti = MenuItem2.defaultOptions().get(item8)) !== null && _MenuItem$defaultOpti !== void 0 ? _MenuItem$defaultOpti : {}), size = _options.size, organ = _options.organ, maximum = _options.maximum, additionalValue = _options.additionalValue, effect2 = _options.effect, priceOverride = _options.priceOverride, mayo = _options.mayo, data = _options.data;
    this.item = item8, this.maximum = maximum === "auto" ? item8.dailyusesleft : maximum, this.additionalValue = additionalValue, this.effect = effect2, this.priceOverride = priceOverride, this.mayo = mayo, this.data = data;
    var typ = (0, import_kolmafia54.itemType)(this.item);
    this.organ = organ != null ? organ : isOrgan(typ) ? typ : void 0, this.size = size != null ? size : this.organ === "food" ? this.item.fullness : this.organ === "booze" ? this.item.inebriety : this.organ === "spleen item" ? this.item.spleen : 0;
  }
  return _createClass14(MenuItem2, [{
    key: "equals",
    value: function(other) {
      return this.item === other.item && this.effect === other.effect;
    }
  }, {
    key: "toString",
    value: function() {
      return this.effect ? "".concat(this.item, ":").concat(this.effect) : this.item.toString();
    }
  }, {
    key: "price",
    value: function() {
      var _this$priceOverride, _MenuItem$defaultPric;
      return (_this$priceOverride = this.priceOverride) !== null && _this$priceOverride !== void 0 ? _this$priceOverride : (_MenuItem$defaultPric = MenuItem2.defaultPriceFunction) === null || _MenuItem$defaultPric === void 0 ? void 0 : _MenuItem$defaultPric.call(MenuItem2, this.item);
    }
  }], [{
    key: "defaultOptions",
    value: function() {
      return /* @__PURE__ */ new Map([[$item(_templateObject389 || (_templateObject389 = _taggedTemplateLiteral48(["distention pill"]))), {
        organ: "food",
        maximum: !have($item(_templateObject458 || (_templateObject458 = _taggedTemplateLiteral48(["distention pill"])))) || get("_distentionPillUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject541 || (_templateObject541 = _taggedTemplateLiteral48(["synthetic dog hair pill"]))), {
        organ: "booze",
        maximum: !have($item(_templateObject635 || (_templateObject635 = _taggedTemplateLiteral48(["synthetic dog hair pill"])))) || get("_syntheticDogHairPillUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject730 || (_templateObject730 = _taggedTemplateLiteral48(["cuppa Voraci tea"]))), {
        organ: "food",
        maximum: get("_voraciTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject826 || (_templateObject826 = _taggedTemplateLiteral48(["cuppa Sobrie tea"]))), {
        organ: "booze",
        maximum: get("_sobrieTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(_templateObject923 || (_templateObject923 = _taggedTemplateLiteral48(["mojo filter"]))), {
        organ: "spleen item",
        maximum: 3 - get("currentMojoFilters"),
        size: -1
      }], [$item(_templateObject1021 || (_templateObject1021 = _taggedTemplateLiteral48(["spice melange"]))), {
        maximum: get("spiceMelangeUsed") ? 0 : 1
      }], [$item(_templateObject1118 || (_templateObject1118 = _taggedTemplateLiteral48(["Ultra Mega Sour Ball"]))), {
        maximum: get("_ultraMegaSourBallUsed") ? 0 : 1
      }], [$item(_templateObject1218 || (_templateObject1218 = _taggedTemplateLiteral48(["The Plumber's mushroom stew"]))), {
        maximum: get("_plumbersMushroomStewEaten") ? 0 : 1
      }], [$item(_templateObject1316 || (_templateObject1316 = _taggedTemplateLiteral48(["The Mad Liquor"]))), {
        maximum: get("_madLiquorDrunk") ? 0 : 1
      }], [$item(_templateObject1413 || (_templateObject1413 = _taggedTemplateLiteral48(["Doc Clock's thyme cocktail"]))), {
        maximum: get("_docClocksThymeCocktailDrunk") ? 0 : 1
      }], [$item(_templateObject1513 || (_templateObject1513 = _taggedTemplateLiteral48(["Mr. Burnsger"]))), {
        maximum: get("_mrBurnsgerEaten") ? 0 : 1
      }]]);
    }
  }]), MenuItem2;
}();
_defineProperty17(MenuItem, "defaultPriceFunction", function(item8) {
  return (0, import_kolmafia54.npcPrice)(item8) > 0 ? (0, import_kolmafia54.npcPrice)(item8) : (0, import_kolmafia54.mallPrice)(item8);
});
var organs = ["food", "booze", "spleen item"];
function isOrgan(x) {
  return organs.includes(x);
}
var DietPlanner = /* @__PURE__ */ function() {
  function DietPlanner2(mpa, menu) {
    var _this2 = this;
    var _this = this;
    if (_classCallCheck14(this, DietPlanner2), _defineProperty17(this, "mpa", void 0), _defineProperty17(this, "menu", void 0), _defineProperty17(this, "mayoLookup", void 0), _defineProperty17(this, "fork", void 0), _defineProperty17(this, "mug", void 0), _defineProperty17(this, "seasoning", void 0), _defineProperty17(this, "spleenValue", 0), this.mpa = mpa, this.fork = menu.find(function(item8) {
      return item8.item === $item(_templateObject1613 || (_templateObject1613 = _taggedTemplateLiteral48(["Ol' Scratch's salad fork"])));
    }), this.mug = menu.find(function(item8) {
      return item8.item === $item(_templateObject1713 || (_templateObject1713 = _taggedTemplateLiteral48(["Frosty's frosty mug"])));
    }), this.seasoning = menu.find(function(item8) {
      return item8.item === $item(_templateObject1813 || (_templateObject1813 = _taggedTemplateLiteral48(["Special Seasoning"])));
    }), this.mayoLookup = /* @__PURE__ */ new Map(), installed3())
      for (var _loop = function() {
        var mayo = _arr2[_i2], menuItem = menu.find(function(item8) {
          return item8.item === mayo;
        });
        menuItem && _this.mayoLookup.set(mayo, menuItem);
      }, _i2 = 0, _arr2 = [Mayo.flex, Mayo.zapine]; _i2 < _arr2.length; _i2++)
        _loop();
    this.menu = menu.filter(function(item8) {
      return item8.organ;
    }), menu.filter(function(item8) {
      return (0, import_kolmafia54.historicalPrice)(item8.item) === 0 || (0, import_kolmafia54.historicalAge)(item8.item) >= 1;
    }).length > 100 && ((0, import_kolmafia54.mallPrices)("food"), (0, import_kolmafia54.mallPrices)("booze"));
    var spleenItems = menu.filter(function(item8) {
      return (0, import_kolmafia54.itemType)(item8.item) === "spleen item";
    });
    if (spleenItems.sort(function(x, y) {
      return -(_this2.consumptionValue(x) / x.item.spleen - _this2.consumptionValue(y) / y.item.spleen);
    }), spleenItems.length > 0) {
      var bestMarginalSpleenItem = spleenItems.find(function(spleenItem) {
        return spleenItem.maximum === void 0 || spleenItem.maximum * spleenItem.size >= (0, import_kolmafia54.spleenLimit)() - (0, import_kolmafia54.mySpleenUse)();
      });
      bestMarginalSpleenItem && (this.spleenValue = Math.max(0, this.consumptionValue(bestMarginalSpleenItem) / bestMarginalSpleenItem.size));
    }
  }
  return _createClass14(DietPlanner2, [{
    key: "consumptionValue",
    value: function(menuItem) {
      return this.consumptionHelpersAndValue(menuItem, {})[1];
    }
    /**
     * Determine which helpers will be used with a menu item and its resulting value.
     * @param menuItem Menu item to check.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair [array of helpers and base menu item, value].
     */
  }, {
    key: "consumptionHelpersAndValue",
    value: function(menuItem, overrideModifiers) {
      var _menuItem$additionalV, _menuItem$additionalV2, helpers = [];
      if ((0, import_kolmafia54.itemType)(menuItem.item) === "food" && this.mayoLookup.size) {
        var mayo = menuItem.mayo ? this.mayoLookup.get(menuItem.mayo) : this.mayoLookup.get(Mayo.flex);
        mayo && helpers.push(mayo);
      }
      var defaultModifiers = _objectSpread5({
        forkMug: !1,
        seasoning: this.seasoning ? helpers.includes(this.seasoning) : !1,
        mayoflex: this.mayoLookup.size ? helpers.some(function(item8) {
          return item8.item === Mayo.flex;
        }) : !1,
        refinedPalate: have($effect(_templateObject1913 || (_templateObject1913 = _taggedTemplateLiteral48(["Refined Palate"])))),
        garish: have($effect(_templateObject2013 || (_templateObject2013 = _taggedTemplateLiteral48(["Gar-ish"])))),
        saucemaven: have($skill(_templateObject2118 || (_templateObject2118 = _taggedTemplateLiteral48(["Saucemaven"])))),
        pinkyRing: have($item(_templateObject2215 || (_templateObject2215 = _taggedTemplateLiteral48(["mafia pinky ring"])))) && (0, import_kolmafia54.canEquip)($item(_templateObject2313 || (_templateObject2313 = _taggedTemplateLiteral48(["mafia pinky ring"])))),
        tuxedoShirt: have($item(_templateObject2412 || (_templateObject2412 = _taggedTemplateLiteral48(["tuxedo shirt"])))) && (0, import_kolmafia54.canEquip)($item(_templateObject2512 || (_templateObject2512 = _taggedTemplateLiteral48(["tuxedo shirt"]))))
      }, overrideModifiers);
      this.seasoning && (0, import_kolmafia54.itemType)(menuItem.item) === "food" && this.mpa * (_expectedAdventures(menuItem.item, _objectSpread5(_objectSpread5({}, defaultModifiers), {}, {
        seasoning: !0
      })) - _expectedAdventures(menuItem.item, _objectSpread5(_objectSpread5({}, defaultModifiers), {}, {
        seasoning: !1
      }))) > (0, import_kolmafia54.mallPrice)($item(_templateObject2612 || (_templateObject2612 = _taggedTemplateLiteral48(["Special Seasoning"])))) && helpers.push(this.seasoning);
      var forkMug = (0, import_kolmafia54.itemType)(menuItem.item) === "food" ? this.fork : (0, import_kolmafia54.itemType)(menuItem.item) === "booze" ? this.mug : null, forkMugPrice = forkMug ? forkMug.price() : 1 / 0, baseCost = menuItem.price() + sum(helpers, function(item8) {
        return item8.price();
      }), valueRaw = _expectedAdventures(menuItem.item, defaultModifiers) * this.mpa - baseCost + ((_menuItem$additionalV = menuItem.additionalValue) !== null && _menuItem$additionalV !== void 0 ? _menuItem$additionalV : 0), valueForkMug = _expectedAdventures(menuItem.item, _objectSpread5(_objectSpread5({}, defaultModifiers), {}, {
        forkMug: !0
      })) * this.mpa - baseCost - forkMugPrice + ((_menuItem$additionalV2 = menuItem.additionalValue) !== null && _menuItem$additionalV2 !== void 0 ? _menuItem$additionalV2 : 0), valueSpleen = $items(_templateObject2712 || (_templateObject2712 = _taggedTemplateLiteral48(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item) ? 5 * this.spleenValue : 0;
      return forkMug && valueForkMug > valueRaw ? [[].concat(helpers, [forkMug, menuItem]), valueForkMug + valueSpleen] : [[].concat(helpers, [menuItem]), valueRaw + valueSpleen];
    }
    /**
     * Plan an individual organ.
     * @param capacity Organ capacity.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgan",
    value: function(organ, capacity) {
      var _this = this;
      var overrideModifiers = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, submenu = this.menu.filter(function(menuItem) {
        return menuItem.organ === organ && (0, import_kolmafia54.myLevel)() >= menuItem.item.levelreq;
      }), knapsackValues = submenu.map(function(menuItem) {
        return [].concat(_toConsumableArray15(_this.consumptionHelpersAndValue(menuItem, overrideModifiers)), [menuItem.size, menuItem.maximum]);
      });
      return knapsack(knapsackValues, capacity);
    }
    /**
     * Plan organs.
     * @param organCapacities Organ capacities.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgans",
    value: function(organCapacities) {
      var _this = this;
      var _ref5, overrideModifiers = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, valuePlans = organCapacities.map(function(_ref) {
        var _ref2 = _slicedToArray18(_ref, 2), organ = _ref2[0], capacity = _ref2[1];
        return _this.planOrgan(organ, capacity, overrideModifiers);
      });
      return [sum(valuePlans, function(_ref3) {
        var _ref4 = _slicedToArray18(_ref3, 1), value = _ref4[0];
        return value;
      }), (_ref5 = []).concat.apply(_ref5, _toConsumableArray15(valuePlans.map(function(_ref6) {
        var _ref7 = _slicedToArray18(_ref6, 2), plan = _ref7[1];
        return plan;
      })))];
    }
    /**
     * Plan organs, retrying with and without each trial item. Runtime is
     * proportional to 2 ^ trialItems.length.
     * @param organCapacities Organ capacities.
     * @param trialItems Items to rerun solver with and without.
     * @param overrideModifiers Overrides for consumption modifiers, if any.
     * @returns Pair of [value, menu items and quantities].
     */
  }, {
    key: "planOrgansWithTrials",
    value: function(organCapacities, trialItems, overrideModifiers) {
      if (trialItems.length === 0)
        return this.planOrgans(organCapacities, overrideModifiers);
      var _trialItems$ = _slicedToArray18(trialItems[0], 2), trialItem = _trialItems$[0], organSizes = _trialItems$[1];
      if (trialItem.maximum !== void 0 && trialItem.maximum <= 0)
        return this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers);
      var organCapacitiesWithMap = new Map(organCapacities), _iterator = _createForOfIteratorHelper13(organSizes), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray18(_step.value, 2), organ = _step$value[0], size = _step$value[1], current = organCapacitiesWithMap.get(organ);
          current !== void 0 && organCapacitiesWithMap.set(organ, current - size);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var organCapacitiesWith = _toConsumableArray15(organCapacitiesWithMap), isRefinedPalate = trialItem.item === $item(_templateObject2810 || (_templateObject2810 = _taggedTemplateLiteral48(["pocket wish"]))) && trialItem.effect === $effect(_templateObject2910 || (_templateObject2910 = _taggedTemplateLiteral48(["Refined Palate"]))) || trialItem.item === $item(_templateObject3010 || (_templateObject3010 = _taggedTemplateLiteral48(["toasted brie"]))), isGarish = trialItem.item === $item(_templateObject3112 || (_templateObject3112 = _taggedTemplateLiteral48(["pocket wish"]))) && trialItem.effect === $effect(_templateObject3211 || (_templateObject3211 = _taggedTemplateLiteral48(["Gar-ish"]))) || trialItem.item === $item(_templateObject3310 || (_templateObject3310 = _taggedTemplateLiteral48(["potion of the field gar"]))), _this$planOrgansWithT = this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers), _this$planOrgansWithT2 = _slicedToArray18(_this$planOrgansWithT, 2), valueWithout = _this$planOrgansWithT2[0], planWithout = _this$planOrgansWithT2[1], _this$planOrgansWithT3 = this.planOrgansWithTrials(organCapacitiesWith, trialItems.slice(1), _objectSpread5(_objectSpread5(_objectSpread5({}, overrideModifiers), isRefinedPalate ? {
        refinedPalate: !0
      } : {}), isGarish ? {
        garish: !0
      } : {})), _this$planOrgansWithT4 = _slicedToArray18(_this$planOrgansWithT3, 2), valueWith = _this$planOrgansWithT4[0], planWith = _this$planOrgansWithT4[1], _this$consumptionHelp = this.consumptionHelpersAndValue(trialItem, {}), _this$consumptionHelp2 = _slicedToArray18(_this$consumptionHelp, 2), helpersAndItem = _this$consumptionHelp2[0], value = _this$consumptionHelp2[1];
      return valueWithout > valueWith + value ? [valueWithout, planWithout] : [valueWith + value, [].concat(_toConsumableArray15(planWith), [[helpersAndItem, 1]])];
    }
  }]), DietPlanner2;
}(), interactingItems = [[$item(_templateObject3410 || (_templateObject3410 = _taggedTemplateLiteral48(["spice melange"]))), [["food", -3], ["booze", -3]]], [$item(_templateObject3510 || (_templateObject3510 = _taggedTemplateLiteral48(["Ultra Mega Sour Ball"]))), [["food", -3], ["booze", -3]]], [$item(_templateObject3610 || (_templateObject3610 = _taggedTemplateLiteral48(["The Plumber's mushroom stew"]))), [["food", 3], ["booze", -1]]], [$item(_templateObject3710 || (_templateObject3710 = _taggedTemplateLiteral48(["The Mad Liquor"]))), [["food", -1], ["booze", 3]]], [$item(_templateObject3810 || (_templateObject3810 = _taggedTemplateLiteral48(["Doc Clock's thyme cocktail"]))), [["food", -2], ["booze", 4]]], [$item(_templateObject396 || (_templateObject396 = _taggedTemplateLiteral48(["Mr. Burnsger"]))), [["food", 4], ["booze", -2]]], [$effect(_templateObject406 || (_templateObject406 = _taggedTemplateLiteral48(["Refined Palate"]))), []], [$item(_templateObject4111 || (_templateObject4111 = _taggedTemplateLiteral48(["toasted brie"]))), [["food", 2]]], [$effect(_templateObject4210 || (_templateObject4210 = _taggedTemplateLiteral48(["Gar-ish"]))), []], [$item(_templateObject4310 || (_templateObject4310 = _taggedTemplateLiteral48(["potion of the field gar"]))), []]];
function planDiet(mpa, menu) {
  var organCapacities = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [["food", null], ["booze", null], ["spleen item", null]], resolvedOrganCapacities = organCapacities.map(function(_ref8) {
    var _ref9 = _slicedToArray18(_ref8, 2), organ = _ref9[0], size = _ref9[1];
    return [organ, size != null ? size : organ === "food" ? (0, import_kolmafia54.fullnessLimit)() - (0, import_kolmafia54.myFullness)() : organ === "booze" ? (0, import_kolmafia54.inebrietyLimit)() - (0, import_kolmafia54.myInebriety)() : organ === "spleen item" ? (0, import_kolmafia54.spleenLimit)() - (0, import_kolmafia54.mySpleenUse)() : 0];
  }), includedInteractingItems = menu.map(function(menuItem) {
    var interacting = interactingItems.find(function(_ref10) {
      var _ref11 = _slicedToArray18(_ref10, 1), itemOrEffect = _ref11[0];
      return menuItem.item === itemOrEffect || menuItem.item === $item(_templateObject4410 || (_templateObject4410 = _taggedTemplateLiteral48(["pocket wish"]))) && menuItem.effect === itemOrEffect;
    });
    if (interacting) {
      var _interacting = _slicedToArray18(interacting, 2), organSizes = _interacting[1];
      return [menuItem, organSizes];
    } else
      return null;
  }).filter(function(value) {
    return value !== null;
  }), dietPlanner = new DietPlanner(mpa, menu.filter(function(menuItem) {
    return !includedInteractingItems.some(function(_ref12) {
      var _ref13 = _slicedToArray18(_ref12, 1), interacting = _ref13[0];
      return interacting === menuItem;
    });
  })), _dietPlanner$planOrga = dietPlanner.planOrgansWithTrials(resolvedOrganCapacities.filter(function(_ref14) {
    var _ref15 = _slicedToArray18(_ref14, 2), organ = _ref15[0], capacity = _ref15[1];
    return ["food", "booze"].includes(organ) && capacity >= 0;
  }), includedInteractingItems, {}), _dietPlanner$planOrga2 = _slicedToArray18(_dietPlanner$planOrga, 2), planFoodBooze = _dietPlanner$planOrga2[1], spleenCapacity = resolvedOrganCapacities.find(function(_ref16) {
    var _ref17 = _slicedToArray18(_ref16, 1), organ = _ref17[0];
    return organ === "spleen item";
  });
  if (spleenCapacity) {
    var additionalSpleen = sum(planFoodBooze, function(_ref18) {
      var _ref19 = _slicedToArray18(_ref18, 2), items = _ref19[0], number = _ref19[1];
      return items.some(function(menuItem) {
        return $items(_templateObject459 || (_templateObject459 = _taggedTemplateLiteral48(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item);
      }) ? 5 * number : 0;
    }), _spleenCapacity = _slicedToArray18(spleenCapacity, 2), availableSpleen = _spleenCapacity[1], _dietPlanner$planOrga3 = dietPlanner.planOrgan("spleen item", availableSpleen + additionalSpleen), _dietPlanner$planOrga4 = _slicedToArray18(_dietPlanner$planOrga3, 2), planSpleen = _dietPlanner$planOrga4[1];
    return [].concat(_toConsumableArray15(planFoodBooze), _toConsumableArray15(planSpleen));
  } else
    return planFoodBooze;
}
var DietEntry = /* @__PURE__ */ function() {
  function DietEntry2(menuItems, quantity) {
    _classCallCheck14(this, DietEntry2), _defineProperty17(this, "quantity", void 0), this.quantity = quantity;
  }
  return _createClass14(DietEntry2, [{
    key: "target",
    value: function() {
      return this.menuItems[this.menuItems.length - 1];
    }
  }, {
    key: "helpers",
    value: function() {
      return this.menuItems.length > 1 ? this.menuItems.slice(0, -1) : [];
    }
  }, {
    key: "expectedAdventures",
    value: function(diet) {
      {
        if (this.menuItems.length === 0 || this.quantity === 0)
          return 0;
        var items = this.menuItems.map(function(m) {
          return m.item;
        }), targetItem = this.menuItems[this.menuItems.length - 1].item, fork = (0, import_kolmafia54.itemType)(targetItem) === "food" && items.includes($item(_templateObject465 || (_templateObject465 = _taggedTemplateLiteral48(["Ol' Scratch's salad fork"])))), mug = (0, import_kolmafia54.itemType)(targetItem) === "booze" && items.includes($item(_templateObject475 || (_templateObject475 = _taggedTemplateLiteral48(["Frosty's frosty mug"]))));
        return this.quantity * _expectedAdventures(this.menuItems[this.menuItems.length - 1].item, {
          forkMug: fork || mug,
          seasoning: items.includes($item(_templateObject485 || (_templateObject485 = _taggedTemplateLiteral48(["Special Seasoning"])))),
          mayoflex: items.includes(Mayo.flex),
          refinedPalate: diet.refinedPalate,
          garish: diet.garish,
          saucemaven: diet.saucemaven,
          pinkyRing: diet.pinkyRing,
          tuxedoShirt: diet.tuxedoShirt
        });
      }
    }
  }, {
    key: "expectedValue",
    value: function(mpa, diet) {
      var method = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "gross", gross = mpa * this.expectedAdventures(diet) + this.quantity * sumNumbers(this.menuItems.map(function(menuItem) {
        var _menuItem$additionalV3;
        return (_menuItem$additionalV3 = menuItem.additionalValue) !== null && _menuItem$additionalV3 !== void 0 ? _menuItem$additionalV3 : 0;
      }));
      return method === "gross" ? gross : gross - this.expectedPrice();
    }
  }, {
    key: "expectedPrice",
    value: function() {
      return this.quantity * sumNumbers(this.menuItems.map(function(menuItem) {
        return menuItem.price();
      }));
    }
  }]), DietEntry2;
}(), Diet = /* @__PURE__ */ function() {
  function Diet2() {
    var entries2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck14(this, Diet2), _defineProperty17(this, "entries", void 0), this.entries = entries2;
  }
  return _createClass14(Diet2, [{
    key: "refinedPalate",
    get: function() {
      return this.entries.some(function(dietEntry) {
        return dietEntry.menuItems.some(function(trialItem) {
          return trialItem.item === $item(_templateObject495 || (_templateObject495 = _taggedTemplateLiteral48(["pocket wish"]))) && trialItem.effect === $effect(_templateObject505 || (_templateObject505 = _taggedTemplateLiteral48(["Refined Palate"]))) || trialItem.item === $item(_templateObject5110 || (_templateObject5110 = _taggedTemplateLiteral48(["toasted brie"])));
        });
      });
    }
  }, {
    key: "garish",
    get: function() {
      return this.entries.some(function(dietEntry) {
        return dietEntry.menuItems.some(function(trialItem) {
          return trialItem.item === $item(_templateObject5210 || (_templateObject5210 = _taggedTemplateLiteral48(["pocket wish"]))) && trialItem.effect === $effect(_templateObject5310 || (_templateObject5310 = _taggedTemplateLiteral48(["Gar-ish"]))) || trialItem.item === $item(_templateObject545 || (_templateObject545 = _taggedTemplateLiteral48(["potion of the field gar"])));
        });
      });
    }
  }, {
    key: "saucemaven",
    get: function() {
      return have($skill(_templateObject555 || (_templateObject555 = _taggedTemplateLiteral48(["Saucemaven"]))));
    }
  }, {
    key: "tuxedoShirt",
    get: function() {
      return have($item(_templateObject565 || (_templateObject565 = _taggedTemplateLiteral48(["tuxedo shirt"])))) && (0, import_kolmafia54.canEquip)($item(_templateObject575 || (_templateObject575 = _taggedTemplateLiteral48(["tuxedo shirt"]))));
    }
  }, {
    key: "pinkyRing",
    get: function() {
      return have($item(_templateObject584 || (_templateObject584 = _taggedTemplateLiteral48(["mafia pinky ring"])))) && (0, import_kolmafia54.canEquip)($item(_templateObject594 || (_templateObject594 = _taggedTemplateLiteral48(["mafia pinky ring"]))));
    }
  }, {
    key: "expectedAdventures",
    value: function() {
      var _this = this;
      return sumNumbers(this.entries.map(function(dietEntry) {
        return dietEntry.expectedAdventures(_this);
      }));
    }
  }, {
    key: "expectedValue",
    value: function(mpa) {
      var _this = this;
      var method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "gross";
      return sumNumbers(this.entries.map(function(dietEntry) {
        return dietEntry.expectedValue(mpa, _this, method);
      }));
    }
  }, {
    key: "expectedPrice",
    value: function() {
      return sumNumbers(this.entries.map(function(dietEntry) {
        return dietEntry.expectedPrice();
      }));
    }
  }, {
    key: "copy",
    value: function() {
      return new Diet2(_toConsumableArray15(this.entries));
    }
  }], [{
    key: "from",
    value: function(rawDiet) {
      var diet = rawDiet.map(function(item8) {
        var _item = _slicedToArray18(item8, 2), menuItems = _item[0], quantity = _item[1];
        return new DietEntry(menuItems, quantity);
      });
      return new Diet2(diet);
    }
  }, {
    key: "plan",
    value: function(mpa, menu) {
      var organCapacities = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        food: "auto",
        booze: "auto",
        spleen: "auto"
      }, food = organCapacities.food, booze = organCapacities.booze, spleen = organCapacities.spleen, plannerCapacity = [];
      return food && plannerCapacity.push(["food", food === "auto" ? null : food]), booze && plannerCapacity.push(["booze", booze === "auto" ? null : booze]), spleen && plannerCapacity.push(["spleen item", spleen === "auto" ? null : spleen]), Diet2.from(planDiet(mpa, menu, plannerCapacity));
    }
  }]), Diet2;
}();

// src/mood.ts
init_kolmafia_polyfill();
var import_kolmafia55 = require("kolmafia");
var _templateObject390, _templateObject2109, _templateObject391, _templateObject460, _templateObject546, _templateObject636, _templateObject731, _templateObject827, _templateObject924, _templateObject1023;
function ownKeys6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys6(Object(source), !0).forEach(function(key) {
      _defineProperty18(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createForOfIteratorHelper14(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray31(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray31(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray31(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray31(o, minLen);
  }
}
function _arrayLikeToArray31(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral49(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _inherits5(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf5(subClass, superClass);
}
function _setPrototypeOf5(o, p) {
  return _setPrototypeOf5 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf5(o, p);
}
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn4(this, result);
  };
}
function _possibleConstructorReturn4(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized4(self2);
}
function _assertThisInitialized4(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf4(o) {
  return _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf4(o);
}
function _defineProperty18(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _classCallCheck15(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties15(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass15(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties15(Constructor.prototype, protoProps), staticProps && _defineProperties15(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
var MpSource = /* @__PURE__ */ function() {
  function MpSource2() {
    _classCallCheck15(this, MpSource2);
  }
  return _createClass15(MpSource2, [{
    key: "usesRemaining",
    value: function() {
      return 0;
    }
  }, {
    key: "availableMpMax",
    value: function() {
      return this.availableMpMin();
    }
  }]), MpSource2;
}(), OscusSoda = /* @__PURE__ */ function(_MpSource) {
  _inherits5(OscusSoda2, _MpSource);
  var _super = _createSuper4(OscusSoda2);
  function OscusSoda2() {
    return _classCallCheck15(this, OscusSoda2), _super.apply(this, arguments);
  }
  return _createClass15(OscusSoda2, [{
    key: "available",
    value: function() {
      return have($item(_templateObject390 || (_templateObject390 = _taggedTemplateLiteral49(["Oscus's neverending soda"]))));
    }
  }, {
    key: "usesRemaining",
    value: function() {
      return get("oscusSodaUsed") ? 0 : 1;
    }
  }, {
    key: "availableMpMin",
    value: function() {
      return this.available() && this.usesRemaining() > 0 ? 200 : 0;
    }
  }, {
    key: "availableMpMax",
    value: function() {
      return this.available() && this.usesRemaining() > 0 ? 300 : 0;
    }
  }, {
    key: "execute",
    value: function() {
      (0, import_kolmafia55.use)($item(_templateObject2109 || (_templateObject2109 = _taggedTemplateLiteral49(["Oscus's neverending soda"]))));
    }
  }]), OscusSoda2;
}(MpSource);
_defineProperty18(OscusSoda, "instance", new OscusSoda());
var MagicalSausages = /* @__PURE__ */ function(_MpSource2) {
  _inherits5(MagicalSausages2, _MpSource2);
  var _super2 = _createSuper4(MagicalSausages2);
  function MagicalSausages2() {
    return _classCallCheck15(this, MagicalSausages2), _super2.apply(this, arguments);
  }
  return _createClass15(MagicalSausages2, [{
    key: "available",
    value: function() {
      return have($item(_templateObject391 || (_templateObject391 = _taggedTemplateLiteral49(["Kramco Sausage-o-Matic\u2122"]))));
    }
  }, {
    key: "usesRemaining",
    value: function() {
      var maxSausages = (0, import_kolmafia55.availableAmount)($item(_templateObject460 || (_templateObject460 = _taggedTemplateLiteral49(["magical sausage"])))) + (0, import_kolmafia55.availableAmount)($item(_templateObject546 || (_templateObject546 = _taggedTemplateLiteral49(["magical sausage casing"]))));
      return this.available() ? clamp(23 - get("_sausagesEaten"), 0, maxSausages) : 0;
    }
  }, {
    key: "availableMpMin",
    value: function() {
      return this.available() ? Math.min((0, import_kolmafia55.myMaxmp)(), 999) * this.usesRemaining() : 0;
    }
  }, {
    key: "execute",
    value: function() {
      var mpSpaceAvailable = (0, import_kolmafia55.myMaxmp)() - (0, import_kolmafia55.myMp)();
      if (!(mpSpaceAvailable < 700)) {
        var maxSausages = Math.min(this.usesRemaining(), Math.floor(((0, import_kolmafia55.myMaxmp)() - (0, import_kolmafia55.myMp)()) / Math.min((0, import_kolmafia55.myMaxmp)() - (0, import_kolmafia55.myMp)(), 999)));
        (0, import_kolmafia55.retrieveItem)(maxSausages, $item(_templateObject636 || (_templateObject636 = _taggedTemplateLiteral49(["magical sausage"])))), (0, import_kolmafia55.eat)(maxSausages, $item(_templateObject731 || (_templateObject731 = _taggedTemplateLiteral49(["magical sausage"]))));
      }
    }
  }]), MagicalSausages2;
}(MpSource);
_defineProperty18(MagicalSausages, "instance", new MagicalSausages());
var MoodElement = /* @__PURE__ */ function() {
  function MoodElement2() {
    _classCallCheck15(this, MoodElement2);
  }
  return _createClass15(MoodElement2, [{
    key: "mpCostPerTurn",
    value: function() {
      return 0;
    }
  }, {
    key: "turnIncrement",
    value: function() {
      return 1;
    }
  }]), MoodElement2;
}(), SkillMoodElement = /* @__PURE__ */ function(_MoodElement) {
  _inherits5(SkillMoodElement2, _MoodElement);
  var _super3 = _createSuper4(SkillMoodElement2);
  function SkillMoodElement2(skill2) {
    var _this;
    return _classCallCheck15(this, SkillMoodElement2), _this = _super3.call(this), _defineProperty18(_assertThisInitialized4(_this), "skill", void 0), _this.skill = skill2, _this;
  }
  return _createClass15(SkillMoodElement2, [{
    key: "mpCostPerTurn",
    value: function() {
      var turns = (0, import_kolmafia55.turnsPerCast)(this.skill);
      return turns > 0 ? (0, import_kolmafia55.mpCost)(this.skill) / turns : 0;
    }
  }, {
    key: "turnIncrement",
    value: function() {
      return (0, import_kolmafia55.turnsPerCast)(this.skill);
    }
  }, {
    key: "execute",
    value: function(mood, ensureTurns) {
      var effect2 = (0, import_kolmafia55.toEffect)(this.skill), initialTurns = (0, import_kolmafia55.haveEffect)(effect2);
      if (!(0, import_kolmafia55.haveSkill)(this.skill))
        return !1;
      if (initialTurns >= ensureTurns)
        return !0;
      if (mood.options.songSlots.length > 0 && isSong(this.skill) && !have(effect2)) {
        var activeSongs = getActiveSongs(), _iterator = _createForOfIteratorHelper14(activeSongs), _step;
        try {
          var _loop = function() {
            var song2 = _step.value, slot = mood.options.songSlots.find(function(slot2) {
              return slot2.includes(song2);
            });
            if (!slot || slot.includes(effect2))
              return (0, import_kolmafia55.cliExecute)("shrug ".concat(song2)), "break";
          };
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _ret = _loop();
            if (_ret === "break")
              break;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      for (var oldRemainingCasts = -1, remainingCasts = Math.ceil((ensureTurns - (0, import_kolmafia55.haveEffect)(effect2)) / (0, import_kolmafia55.turnsPerCast)(this.skill)); remainingCasts > 0 && oldRemainingCasts !== remainingCasts; ) {
        var maxCasts = void 0;
        if ((0, import_kolmafia55.hpCost)(this.skill) > 0)
          maxCasts = Math.max(0, Math.floor(((0, import_kolmafia55.myHp)() - 1) / (0, import_kolmafia55.hpCost)(this.skill)));
        else {
          var cost = (0, import_kolmafia55.mpCost)(this.skill);
          if (maxCasts = Math.floor(Math.min(mood.availableMp(), (0, import_kolmafia55.myMp)()) / cost), maxCasts < remainingCasts) {
            var bestMp = Math.min(remainingCasts * (0, import_kolmafia55.mpCost)(this.skill), (0, import_kolmafia55.myMaxmp)());
            mood.moreMp(bestMp), maxCasts = Math.floor(Math.min(mood.availableMp(), (0, import_kolmafia55.myMp)()) / cost);
          }
        }
        var casts = clamp(remainingCasts, 0, Math.min(100, maxCasts));
        (0, import_kolmafia55.useSkill)(casts, this.skill), oldRemainingCasts = remainingCasts, remainingCasts = Math.ceil((ensureTurns - (0, import_kolmafia55.haveEffect)(effect2)) / (0, import_kolmafia55.turnsPerCast)(this.skill));
      }
      return (0, import_kolmafia55.haveEffect)(effect2) > ensureTurns;
    }
  }]), SkillMoodElement2;
}(MoodElement), PotionMoodElement = /* @__PURE__ */ function(_MoodElement2) {
  _inherits5(PotionMoodElement2, _MoodElement2);
  var _super4 = _createSuper4(PotionMoodElement2);
  function PotionMoodElement2(potion, maxPricePerTurn) {
    var _this2;
    return _classCallCheck15(this, PotionMoodElement2), _this2 = _super4.call(this), _defineProperty18(_assertThisInitialized4(_this2), "potion", void 0), _defineProperty18(_assertThisInitialized4(_this2), "maxPricePerTurn", void 0), _this2.potion = potion, _this2.maxPricePerTurn = maxPricePerTurn, _this2;
  }
  return _createClass15(PotionMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      var effect2 = (0, import_kolmafia55.effectModifier)(this.potion, "Effect"), effectTurns = (0, import_kolmafia55.haveEffect)(effect2), turnsPerUse = (0, import_kolmafia55.numericModifier)(this.potion, "Effect Duration");
      if ((0, import_kolmafia55.mallPrice)(this.potion) > this.maxPricePerTurn * turnsPerUse)
        return !1;
      if (effectTurns < ensureTurns) {
        var uses = Math.floor((ensureTurns - effectTurns) / turnsPerUse), quantityToBuy = clamp(uses - (0, import_kolmafia55.availableAmount)(this.potion), 0, 100);
        (0, import_kolmafia55.buy)(quantityToBuy, this.potion, Math.floor(this.maxPricePerTurn * turnsPerUse));
        var quantityToUse = clamp(uses, 0, (0, import_kolmafia55.availableAmount)(this.potion));
        (0, import_kolmafia55.use)(quantityToUse, this.potion);
      }
      var remainingDifference = ensureTurns - (0, import_kolmafia55.haveEffect)(effect2);
      if (remainingDifference > 0) {
        var price2 = Math.floor(this.maxPricePerTurn * remainingDifference);
        price2 <= (0, import_kolmafia55.mallPrice)(this.potion) && ((0, import_kolmafia55.availableAmount)(this.potion) || (0, import_kolmafia55.buy)(1, this.potion, price2)) && (0, import_kolmafia55.use)(1, this.potion);
      }
      return (0, import_kolmafia55.haveEffect)(effect2) >= ensureTurns;
    }
  }]), PotionMoodElement2;
}(MoodElement), GenieMoodElement = /* @__PURE__ */ function(_MoodElement3) {
  _inherits5(GenieMoodElement2, _MoodElement3);
  var _super5 = _createSuper4(GenieMoodElement2);
  function GenieMoodElement2(effect2) {
    var _this3;
    return _classCallCheck15(this, GenieMoodElement2), _this3 = _super5.call(this), _defineProperty18(_assertThisInitialized4(_this3), "effect", void 0), _this3.effect = effect2, _this3;
  }
  return _createClass15(GenieMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      if ((0, import_kolmafia55.haveEffect)(this.effect) >= ensureTurns)
        return !0;
      var neededWishes = Math.ceil(((0, import_kolmafia55.haveEffect)(this.effect) - ensureTurns) / 20), wishesToBuy = clamp(neededWishes - (0, import_kolmafia55.availableAmount)($item(_templateObject827 || (_templateObject827 = _taggedTemplateLiteral49(["pocket wish"])))), 0, 20);
      (0, import_kolmafia55.buy)(wishesToBuy, $item(_templateObject924 || (_templateObject924 = _taggedTemplateLiteral49(["pocket wish"]))), 5e4);
      for (var wishesToUse = clamp(neededWishes, 0, (0, import_kolmafia55.availableAmount)($item(_templateObject1023 || (_templateObject1023 = _taggedTemplateLiteral49(["pocket wish"]))))); wishesToUse > 0; wishesToUse--)
        (0, import_kolmafia55.cliExecute)("genie effect ".concat(this.effect.name));
      return (0, import_kolmafia55.haveEffect)(this.effect) >= ensureTurns;
    }
  }]), GenieMoodElement2;
}(MoodElement), CustomMoodElement = /* @__PURE__ */ function(_MoodElement4) {
  _inherits5(CustomMoodElement2, _MoodElement4);
  var _super6 = _createSuper4(CustomMoodElement2);
  function CustomMoodElement2(effect2, gainEffect) {
    var _this4;
    return _classCallCheck15(this, CustomMoodElement2), _this4 = _super6.call(this), _defineProperty18(_assertThisInitialized4(_this4), "effect", void 0), _defineProperty18(_assertThisInitialized4(_this4), "gainEffect", void 0), _this4.effect = effect2, _this4.gainEffect = gainEffect != null ? gainEffect : function() {
      return (0, import_kolmafia55.cliExecute)(effect2.default);
    }, _this4;
  }
  return _createClass15(CustomMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      for (var currentTurns = (0, import_kolmafia55.haveEffect)(this.effect), lastCurrentTurns = -1; currentTurns < ensureTurns && currentTurns !== lastCurrentTurns; )
        this.gainEffect(), lastCurrentTurns = currentTurns, currentTurns = (0, import_kolmafia55.haveEffect)(this.effect);
      return (0, import_kolmafia55.haveEffect)(this.effect) > ensureTurns;
    }
  }]), CustomMoodElement2;
}(MoodElement), AsdonMoodElement = /* @__PURE__ */ function(_MoodElement5) {
  _inherits5(AsdonMoodElement2, _MoodElement5);
  var _super7 = _createSuper4(AsdonMoodElement2);
  function AsdonMoodElement2(effect2) {
    var _this5, preferInventory = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return _classCallCheck15(this, AsdonMoodElement2), _this5 = _super7.call(this), _defineProperty18(_assertThisInitialized4(_this5), "effect", void 0), _defineProperty18(_assertThisInitialized4(_this5), "preferInventory", void 0), _this5.effect = effect2, _this5.preferInventory = preferInventory, _this5;
  }
  return _createClass15(AsdonMoodElement2, [{
    key: "execute",
    value: function(mood, ensureTurns) {
      return AsdonMartin_exports.drive(this.effect, ensureTurns, this.preferInventory);
    }
  }]), AsdonMoodElement2;
}(MoodElement), Mood = /* @__PURE__ */ function() {
  function Mood2() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck15(this, Mood2), _defineProperty18(this, "options", void 0), _defineProperty18(this, "elements", []), this.options = _objectSpread6(_objectSpread6({}, Mood2.defaultOptions), options);
  }
  return _createClass15(Mood2, [{
    key: "availableMp",
    value: function() {
      return this.options.useNativeRestores ? 1 / 0 : sum(this.options.mpSources, function(mpSource) {
        return mpSource.availableMpMin();
      }) + Math.max((0, import_kolmafia55.myMp)() - this.options.reserveMp, 0);
    }
  }, {
    key: "moreMp",
    value: function(minimumTarget) {
      if (!((0, import_kolmafia55.myMp)() >= minimumTarget)) {
        var _iterator2 = _createForOfIteratorHelper14(this.options.mpSources), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var mpSource = _step2.value;
            if (mpSource.usesRemaining() > 0 && (mpSource.execute(), (0, import_kolmafia55.myMp)() >= minimumTarget))
              break;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.options.useNativeRestores && (0, import_kolmafia55.restoreMp)(minimumTarget);
      }
    }
    /**
     * Add a skill to the mood.
     * @param skill Skill to add.
     */
  }, {
    key: "skill",
    value: function(_skill) {
      return this.elements.push(new SkillMoodElement(_skill)), this;
    }
    /**
     * Add an effect to the mood, with casting based on {effect.default}.
     * @param effect Effect to add.
     * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
     */
  }, {
    key: "effect",
    value: function(_effect, gainEffect) {
      var skill2 = (0, import_kolmafia55.toSkill)(_effect);
      return !gainEffect && skill2 !== $skill.none ? this.skill(skill2) : this.elements.push(new CustomMoodElement(_effect, gainEffect)), this;
    }
    /**
     * Add a potion to the mood.
     * @param potion Potion to add.
     * @param maxPricePerTurn Maximum price to pay per turn of the effect.
     */
  }, {
    key: "potion",
    value: function(_potion, maxPricePerTurn) {
      return this.elements.push(new PotionMoodElement(_potion, maxPricePerTurn)), this;
    }
    /**
     * Add an effect to acquire via pocket wishes to the mood.
     * @param effect Effect to wish for in the mood.
     */
  }, {
    key: "genie",
    value: function(effect2) {
      return this.elements.push(new GenieMoodElement(effect2)), this;
    }
    /**
     * Add an Asdon Martin driving style to the mood.
     * @param effect Driving style to add to the mood.
     */
  }, {
    key: "drive",
    value: function(effect2) {
      return Object.values(AsdonMartin_exports.Driving).includes(effect2) && AsdonMartin_exports.installed() && this.elements.push(new AsdonMoodElement(effect2)), this;
    }
    /**
     * Execute the mood, trying to ensure {ensureTurns} of each effect.
     * @param ensureTurns Turns of each effect to try and achieve.
     * @returns Whether or not we successfully got this many turns of every effect in the mood.
     */
  }, {
    key: "execute",
    value: function() {
      var ensureTurns = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, availableMp = this.availableMp(), totalMpPerTurn = sum(this.elements, function(element2) {
        return element2.mpCostPerTurn();
      }), potentialTurns = Math.floor(availableMp / totalMpPerTurn), completeSuccess = !0, _iterator3 = _createForOfIteratorHelper14(this.elements), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var element = _step3.value, elementTurns = ensureTurns;
          if (element.mpCostPerTurn() > 0) {
            var elementPotentialTurns = Math.floor(potentialTurns / element.turnIncrement()) * element.turnIncrement();
            elementTurns = Math.min(ensureTurns, elementPotentialTurns);
          }
          completeSuccess = element.execute(this, elementTurns) && completeSuccess;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return this.moreMp(this.options.reserveMp), completeSuccess;
    }
  }], [{
    key: "setDefaultOptions",
    value: (
      /**
       * Set default options for new Mood instances.
       * @param options Default options for new Mood instances.
       */
      function(options) {
        Mood2.defaultOptions = _objectSpread6(_objectSpread6({}, Mood2.defaultOptions), options);
      }
    )
  }]), Mood2;
}();
_defineProperty18(Mood, "defaultOptions", {
  songSlots: [],
  mpSources: [MagicalSausages.instance, OscusSoda.instance],
  reserveMp: 0,
  useNativeRestores: !1
});

// src/since.ts
init_kolmafia_polyfill();
var import_kolmafia56 = require("kolmafia");
function _defineProperties16(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass16(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties16(Constructor.prototype, protoProps), staticProps && _defineProperties16(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck16(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits6(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf6(subClass, superClass);
}
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn5(this, result);
  };
}
function _possibleConstructorReturn5(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized5(self2);
}
function _assertThisInitialized5(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper4(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper4 = function(Class6) {
    if (Class6 === null || !_isNativeFunction4(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct4(Class6, arguments, _getPrototypeOf5(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf6(Wrapper, Class6);
  }, _wrapNativeSuper4(Class5);
}
function _construct4(Parent, args, Class5) {
  return _isNativeReflectConstruct5() ? _construct4 = Reflect.construct : _construct4 = function(Parent2, args2, Class6) {
    var a = [null];
    a.push.apply(a, args2);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf6(instance, Class6.prototype), instance;
  }, _construct4.apply(null, arguments);
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction4(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf6(o, p) {
  return _setPrototypeOf6 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf6(o, p);
}
function _getPrototypeOf5(o) {
  return _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf5(o);
}
var KolmafiaVersionError = /* @__PURE__ */ function(_Error) {
  _inherits6(KolmafiaVersionError2, _Error);
  var _super = _createSuper5(KolmafiaVersionError2);
  function KolmafiaVersionError2(message) {
    var _this;
    return _classCallCheck16(this, KolmafiaVersionError2), _this = _super.call(this, message), Object.setPrototypeOf(_assertThisInitialized5(_this), KolmafiaVersionError2.prototype), _this;
  }
  return _createClass16(KolmafiaVersionError2);
}(/* @__PURE__ */ _wrapNativeSuper4(Error));
KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
function getScriptName() {
  var _require$main, scriptName = (_require$main = require.main) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision))
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  var currentRevision = (0, import_kolmafia56.getRevision)();
  if (currentRevision > 0 && currentRevision < revision)
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0, import_kolmafia56.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
}
function sinceKolmafiaVersion(majorVersion, minorVersion) {
  if (!((0, import_kolmafia56.getRevision)() >= 25720)) {
    if (!Number.isInteger(majorVersion))
      throw new TypeError("Invalid major version number ".concat(majorVersion, " (must be an integer)"));
    if (!Number.isInteger(minorVersion))
      throw new TypeError("Invalid minor version number ".concat(minorVersion, " (must be an integer)"));
    if (majorVersion > 21 || majorVersion === 20 && minorVersion > 9)
      throw new Error("There were no versions released after 21.09. This command will always fail");
    var versionStr = (0, import_kolmafia56.getVersion)(), versionStrMatch = /v(\d+)\.(\d+)/.exec(versionStr);
    if (!versionStrMatch)
      throw new Error('Unexpected KoLmafia version string: "'.concat(versionStr, '". You may need to update the script.'));
    var currentMajorVersion = Number(versionStrMatch[1]), currentMinorVersion = Number(versionStrMatch[2]);
    if (currentMajorVersion < majorVersion || currentMajorVersion === majorVersion && currentMinorVersion < minorVersion)
      throw new KolmafiaVersionError("".concat(getScriptName(), " requires version ").concat(majorVersion, ".").concat(minorVersion, " of kolmafia or higher (current: ").concat(currentMajorVersion, ".").concat(currentMinorVersion, "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}

// src/Kmail.ts
init_kolmafia_polyfill();
var import_kolmafia57 = require("kolmafia");
function _createForOfIteratorHelper15(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray32(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray16(arr) {
  return _arrayWithoutHoles16(arr) || _iterableToArray16(arr) || _unsupportedIterableToArray32(arr) || _nonIterableSpread16();
}
function _nonIterableSpread16() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray16(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles16(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray32(arr);
}
function _slicedToArray19(arr, i) {
  return _arrayWithHoles19(arr) || _iterableToArrayLimit19(arr, i) || _unsupportedIterableToArray32(arr, i) || _nonIterableRest19();
}
function _nonIterableRest19() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray32(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray32(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray32(o, minLen);
  }
}
function _arrayLikeToArray32(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit19(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles19(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classCallCheck17(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties17(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass17(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties17(Constructor.prototype, protoProps), staticProps && _defineProperties17(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty19(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Kmail = /* @__PURE__ */ function() {
  function Kmail2(rawKmail) {
    _classCallCheck17(this, Kmail2), _defineProperty19(this, "id", void 0), _defineProperty19(this, "date", void 0), _defineProperty19(this, "type", void 0), _defineProperty19(this, "senderId", void 0), _defineProperty19(this, "senderName", void 0), _defineProperty19(this, "rawMessage", void 0);
    var date = new Date(rawKmail.localtime);
    date.setFullYear(date.getFullYear() + 100), this.id = Number(rawKmail.id), this.date = date, this.type = rawKmail.type, this.senderId = Number(rawKmail.fromid), this.senderName = rawKmail.fromname, this.rawMessage = rawKmail.message;
  }
  return _createClass17(Kmail2, [{
    key: "delete",
    value: function() {
      return Kmail2.delete([this]) === 1;
    }
    /**
     * Message contents without any HTML from items or meat
     */
  }, {
    key: "message",
    get: function() {
      var match = this.rawMessage.match(/^([\s\S]*?)</);
      return match ? match[1] : this.rawMessage;
    }
    /**
     * Get items attached to the kmail
     *
     * @returns Map of items attached to the kmail and their quantities
     */
  }, {
    key: "items",
    value: function() {
      return new Map(Object.entries((0, import_kolmafia57.extractItems)(this.rawMessage)).map(function(_ref) {
        var _ref2 = _slicedToArray19(_ref, 2), itemName = _ref2[0], quantity = _ref2[1];
        return [import_kolmafia57.Item.get(itemName), quantity];
      }));
    }
    /**
     * Get meat attached to the kmail
     *
     * @returns Meat attached to the kmail
     */
  }, {
    key: "meat",
    value: function() {
      return (0, import_kolmafia57.extractMeat)(this.rawMessage);
    }
    /**
     * Reply to kmail
     *
     * @see Kmail.send
     *
     * @returns True if the kmail was successfully sent
     */
  }, {
    key: "reply",
    value: function() {
      var message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", items = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], meat = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      return Kmail2.send(this.senderId, message, items, meat);
    }
  }], [{
    key: "parse",
    value: (
      /**
       * Parses a kmail from KoL's native format
       *
       * @param rawKmail Kmail in the format supplies by api.php
       * @returns Parsed kmail
       */
      function(rawKmail) {
        return new Kmail2(rawKmail);
      }
    )
    /**
     * Returns all of the player's kmails
     *
     * @param count Number of kmails to fetch
     * @returns Parsed kmails
     */
  }, {
    key: "inbox",
    value: function() {
      var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
      return JSON.parse((0, import_kolmafia57.visitUrl)("api.php?what=kmail&for=libram&count=".concat(count))).map(Kmail2.parse);
    }
    /**
     * Bulk delete kmails
     *
     * @param kmails Kmails to delete
     * @returns Number of kmails deleted
     */
  }, {
    key: "delete",
    value: function(kmails) {
      var _results$match$, _results$match, results = (0, import_kolmafia57.visitUrl)("messages.php?the_action=delete&box=Inbox&pwd&".concat(kmails.map(function(k) {
        return "sel".concat(k.id, "=on");
      }).join("&")));
      return Number((_results$match$ = (_results$match = results.match(/<td>(\d) messages? deleted.<\/td>/)) === null || _results$match === void 0 ? void 0 : _results$match[1]) !== null && _results$match$ !== void 0 ? _results$match$ : 0);
    }
  }, {
    key: "_genericSend",
    value: function(to, message, items, meat, chunkSize, constructUrl, successString) {
      var m = meat, sendableItems = _toConsumableArray16(arrayToCountedMap(items).entries()).filter(function(_ref3) {
        var _ref4 = _slicedToArray19(_ref3, 1), item8 = _ref4[0];
        return (0, import_kolmafia57.isGiftable)(item8);
      }), result = !0, chunks = chunk(sendableItems, chunkSize), _iterator = _createForOfIteratorHelper15(chunks.length > 0 ? chunks : [null]), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var c = _step.value, _itemsQuery = c === null ? [] : c.map(function(_ref5, index) {
            var _ref6 = _slicedToArray19(_ref5, 2), item8 = _ref6[0], quantity = _ref6[1];
            return "whichitem".concat(index + 1, "=").concat((0, import_kolmafia57.toInt)(item8), "&howmany").concat(index + 1, "=").concat(quantity);
          }), r = (0, import_kolmafia57.visitUrl)(constructUrl(m, _itemsQuery.join("&"), _itemsQuery.length));
          if (r.includes("That player cannot receive Meat or items"))
            return Kmail2.gift(to, message, items, meat);
          m = 0, result && (result = r.includes(successString));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
    /**
     * Sends a kmail to a player
     *
     * Sends multiple kmails if more than 11 unique item types are attached.
     * Ignores any ungiftable items.
     * Sends a gift package to players in run
     *
     * @param to The player name or id to receive the kmail
     * @param message The text contents of the message
     * @param items The items to be attached
     * @param meat The quantity of meat to be attached
     * @returns True if the kmail was successfully sent
     */
  }, {
    key: "send",
    value: function(to) {
      var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", items = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], meat = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
      return Kmail2._genericSend(to, message, items, meat, 11, function(meat2, itemsQuery) {
        return "sendmessage.php?action=send&pwd&towho=".concat(to, "&message=").concat(message).concat(itemsQuery ? "&".concat(itemsQuery) : "", "&sendmeat=").concat(meat2);
      }, ">Message sent.</");
    }
    /**
     * Sends a gift to a player
     *
     * Sends multiple kmails if more than 3 unique item types are attached.
     * Ignores any ungiftable items.
     *
     * @param to The player name or id to receive the gift
     * @param note The note on the outside of the gift
     * @param items The items to be attached
     * @param meat The quantity of meat to be attached
     * @param insideNode The note on the inside of the gift
     * @returns True if the gift was successfully sent
     */
  }, {
    key: "gift",
    value: function(to) {
      var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", items = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], meat = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, insideNote = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : "", baseUrl = "town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=".concat(message, "&insidenote=").concat(insideNote, "&towho=").concat(to);
      return Kmail2._genericSend(to, message, items, meat, 3, function(m, itemsQuery, chunkSize) {
        return "".concat(baseUrl, "&whichpackage=").concat(chunkSize).concat(itemsQuery ? "&".concat(itemsQuery) : "", "&sendmeat=").concat(m);
      }, ">Package sent.</");
    }
  }]), Kmail2;
}();

// src/Path.ts
init_kolmafia_polyfill();
var _templateObject397, _templateObject2119, _templateObject398, _templateObject461, _templateObject547, _templateObject637, _templateObject734, _templateObject828, _templateObject925, _templateObject1024, _templateObject1119;
function _taggedTemplateLiteral50(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _defineProperties18(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass18(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties18(Constructor.prototype, protoProps), staticProps && _defineProperties18(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck18(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty20(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Path5 = /* @__PURE__ */ _createClass18(
  //here, we define avatar-ness around being its own class
  //Defined as the lowest inebriety that makes you unable to drink more, just to make it fifteens across the board
  /**
   *
   * @param name Name of path
   * @param id Path ID
   * @param hasAllPerms Does the player have immediate access to all permed skills>
   * @param canUseSkillbooks Does the player have ability to learn skills from skillbooks>
   * @param hasCampground Does the player have access to the campground?
   * @param hasTerrarium Does the player have access to terrarium.php
   * @param stomachSize Maximum fullness achievable at turn 0
   * @param liverSize The lowest inebriety that makes you unable to drink more
   * @param spleenSize Maximum spleen achievable at turn 0
   * @param classes Classes available in this path
   */
  function Path6(name, id) {
    var hasAllPerms = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, canUseSkillbooks = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, hasCampground = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, hasTerrarium = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, stomachSize = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 15, liverSize = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 15, spleenSize = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 15, classes = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : $classes(_templateObject397 || (_templateObject397 = _taggedTemplateLiteral50(["Seal Clubber, Turtle Tamer, Sauceror, Pastamancer, Disco Bandit, Accordion Thief"])));
    _classCallCheck18(this, Path6), _defineProperty20(this, "name", void 0), _defineProperty20(this, "id", void 0), _defineProperty20(this, "hasAllPerms", void 0), _defineProperty20(this, "canUseSkillbooks", void 0), _defineProperty20(this, "hasCampground", void 0), _defineProperty20(this, "hasTerrarium", void 0), _defineProperty20(this, "stomachSize", void 0), _defineProperty20(this, "liverSize", void 0), _defineProperty20(this, "spleenSize", void 0), _defineProperty20(this, "classes", void 0), this.name = name, this.id = id, this.hasAllPerms = hasAllPerms, this.canUseSkillbooks = canUseSkillbooks, this.hasCampground = hasCampground, this.hasTerrarium = hasTerrarium, this.stomachSize = stomachSize, this.liverSize = liverSize, this.spleenSize = spleenSize, this.classes = classes;
  }
), Paths = {
  Unrestricted: new Path5("Unrestricted", 0),
  Boozetafarian: new Path5("Boozetafarian", 1, !0, !0, !0, !0, 0),
  Teetotaler: new Path5("Teetotaler", 2, !0, !0, !0, !0, 15, 0),
  Oxygenarian: new Path5("Oxygenarian", 3, !0, !0, !0, !0, 0, 0),
  BeesHateYou: new Path5("Bees Hate You", 4),
  WayOfTheSurprisingFist: new Path5("Way of the Surprising Fist", 6),
  Trendy: new Path5("Trendy", 7),
  AvatarOfBoris: new Path5("Avatar of Boris", 8, !1, !1, !0, !1, 20, 5, 15, $classes(_templateObject2119 || (_templateObject2119 = _taggedTemplateLiteral50(["Avatar of Boris"])))),
  BugbearInvasion: new Path5("Bugbear Invasion", 9),
  ZombieSlayer: new Path5("Zombie Slayer", 10, !1, !1, !0, !0, 15, 5, 15, $classes(_templateObject398 || (_templateObject398 = _taggedTemplateLiteral50(["Zombie Master"])))),
  ClassAct: new Path5("Class Act", 11, !1, !1),
  AvatarofJarlsberg: new Path5("Avatar of Jarlsberg", 12, !1, !1, !0, !1, 10, 10, 15, $classes(_templateObject461 || (_templateObject461 = _taggedTemplateLiteral50(["Avatar of Jarlsberg"])))),
  Big: new Path5("BIG!", 14),
  KolHs: new Path5("KOLHS", 15),
  ClassAct2: new Path5("Class Act II: A Class For Pigs", 16, !1),
  AvatarofSneakyPete: new Path5("Avatar of Sneaky Pete", 17, !1, !1, !0, !1, 5, 20, 15, $classes(_templateObject547 || (_templateObject547 = _taggedTemplateLiteral50(["Avatar of Sneaky Pete"])))),
  SlowAndSteady: new Path5("Slow and Steady", 18),
  HeavyRains: new Path5("Heavy Rains", 19),
  Picky: new Path5("Picky", 21, !1, !1),
  Standard: new Path5("Standard", 22),
  ActuallyEdTheUndying: new Path5("Actually Ed the Undying", 23, !1, !1, !1, !1, 0, 0, 5, $classes(_templateObject637 || (_templateObject637 = _taggedTemplateLiteral50(["Ed the Undying"])))),
  OneCrazyRandomSummer: new Path5("One Crazy Random Summer", 24),
  CommunityService: new Path5("Community Service", 25),
  AvatarOfWestOfLoathing: new Path5("Avatar of West of Loathing", 26, !1, !1, !0, !0, 10, 10, 10, $classes(_templateObject734 || (_templateObject734 = _taggedTemplateLiteral50(["Cow Puncher, Snake Oiler, Beanslinger"])))),
  TheSource: new Path5("The Source", 27),
  NuclearAutumn: new Path5("Nuclear Autumn", 28, !1, !1, !1, !0, 3, 3, 3),
  GelatinousNoob: new Path5("Gelatinous Noob", 29, !1, !1, !0, !0, 0, 0, 0, $classes(_templateObject828 || (_templateObject828 = _taggedTemplateLiteral50(["Gelatinous Noob"])))),
  LicenseToAdventure: new Path5("License to Adventure", 30, !0, !0, !0, !1, 0, 2, 15),
  //Unsure how to log liver size here
  LiveAscendRepeat: new Path5("Live. Ascend. Repeat.", 31),
  PocketFamiliars: new Path5("Pocket Familiars", 32, !1, !1, !0, !1),
  //This is my opinion on the matter
  GLover: new Path5("G-Lover", 33),
  DisguisesDelimit: new Path5("Disguises Delimit", 34),
  DarkGyffte: new Path5("Dark Gyffte", 35, !1, !1, !0, !1, 5, 5, 15, $classes(_templateObject925 || (_templateObject925 = _taggedTemplateLiteral50(["Vampyre"])))),
  TwoCrazyRandomSummer: new Path5("Two Crazy Random Summer", 36),
  KingdomOfExploathing: new Path5("Kingdom of Exploathing", 37),
  PathOfThePlumber: new Path5("Path of the Plumber", 38, !1, !1, !0, !0, 20, 0, 5, $classes(_templateObject1024 || (_templateObject1024 = _taggedTemplateLiteral50(["Plumber"])))),
  LowKeySummer: new Path5("Low Key Summer", 39),
  GreyGoo: new Path5("Grey Goo", 40),
  YouRobot: new Path5("You, Robot", 41, !1, !1, !1, !0, 0, 0, 0),
  QuantumTerrarium: new Path5("Quantum Terrarium", 42, !0, !0, !0, !1),
  Wildfire: new Path5("Wildfire", 43),
  GreyYou: new Path5(
    "Grey You",
    44,
    !1,
    !1,
    !0,
    !0,
    0,
    0,
    0,
    // eslint-disable-next-line libram/verify-constants
    $classes(_templateObject1119 || (_templateObject1119 = _taggedTemplateLiteral50(["Grey Goo"])))
  ),
  Journeyman: new Path5("Journeyman", 45, !1, !1)
};

// src/console.ts
var console_exports = {};
__export(console_exports, {
  error: function() {
    return error;
  },
  info: function() {
    return info;
  },
  log: function() {
    return log;
  },
  warn: function() {
    return warn;
  }
});
init_kolmafia_polyfill();
var import_kolmafia58 = require("kolmafia"), logColor = function(color) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)
      args[_key] = arguments[_key];
    var output = args.map(function(x) {
      return x.toString();
    }).join(" ");
    color ? (0, import_kolmafia58.print)(output, color) : (0, import_kolmafia58.print)(output);
  };
}, log = logColor(), info = logColor("blue"), warn = logColor("red"), error = logColor("red");

// src/session.ts
init_kolmafia_polyfill();
var import_kolmafia59 = require("kolmafia");
var _templateObject399, _templateObject2120, _templateObject3100, _templateObject466, _templateObject548, _templateObject638, _templateObject735, _templateObject829, _templateObject926, _templateObject1025, _templateObject1120, _templateObject1219, _templateObject1317, _templateObject1414, _templateObject1514, _templateObject1614, _templateObject1714, _templateObject1814, _templateObject1914, _templateObject2014, _templateObject2121, _templateObject2216, _templateObject2314, _templateObject2413, _templateObject2513, _templateObject2613, _templateObject2713, _templateObject2811, _templateObject2911, _templateObject3011;
function _classCallCheck19(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties19(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass19(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties19(Constructor.prototype, protoProps), staticProps && _defineProperties19(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty21(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper16(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray33(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray20(arr, i) {
  return _arrayWithHoles20(arr) || _iterableToArrayLimit20(arr, i) || _unsupportedIterableToArray33(arr, i) || _nonIterableRest20();
}
function _nonIterableRest20() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit20(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles20(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral51(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray17(arr) {
  return _arrayWithoutHoles17(arr) || _iterableToArray17(arr) || _unsupportedIterableToArray33(arr) || _nonIterableSpread17();
}
function _nonIterableSpread17() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray33(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray33(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray33(o, minLen);
  }
}
function _iterableToArray17(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles17(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray33(arr);
}
function _arrayLikeToArray33(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mySessionItemsWrapper() {
  for (var manyToOne = function(primary, mapped) {
    return mapped.map(function(target) {
      return [target, primary];
    });
  }, foldable = function(item8) {
    return manyToOne(item8, getFoldGroup(item8));
  }, itemMappings = new Map([].concat(_toConsumableArray17(foldable($item(_templateObject399 || (_templateObject399 = _taggedTemplateLiteral51(["liar's pants"]))))), _toConsumableArray17(foldable($item(_templateObject2120 || (_templateObject2120 = _taggedTemplateLiteral51(["ice pick"]))))), _toConsumableArray17(manyToOne($item(_templateObject3100 || (_templateObject3100 = _taggedTemplateLiteral51(["Spooky Putty sheet"]))), [$item(_templateObject466 || (_templateObject466 = _taggedTemplateLiteral51(["Spooky Putty monster"])))].concat(_toConsumableArray17(getFoldGroup($item(_templateObject548 || (_templateObject548 = _taggedTemplateLiteral51(["Spooky Putty sheet"])))))))), _toConsumableArray17(foldable($item(_templateObject638 || (_templateObject638 = _taggedTemplateLiteral51(["stinky cheese sword"]))))), _toConsumableArray17(foldable($item(_templateObject735 || (_templateObject735 = _taggedTemplateLiteral51(["naughty paper shuriken"]))))), _toConsumableArray17(foldable($item(_templateObject829 || (_templateObject829 = _taggedTemplateLiteral51(["Loathing Legion knife"]))))), _toConsumableArray17(foldable($item(_templateObject926 || (_templateObject926 = _taggedTemplateLiteral51(["deceased crimbo tree"]))))), _toConsumableArray17(foldable($item(_templateObject1025 || (_templateObject1025 = _taggedTemplateLiteral51(["makeshift turban"]))))), _toConsumableArray17(foldable($item(_templateObject1120 || (_templateObject1120 = _taggedTemplateLiteral51(["turtle wax shield"]))))), _toConsumableArray17(foldable($item(_templateObject1219 || (_templateObject1219 = _taggedTemplateLiteral51(["metallic foil bow"]))))), _toConsumableArray17(foldable($item(_templateObject1317 || (_templateObject1317 = _taggedTemplateLiteral51(["ironic moustache"]))))), _toConsumableArray17(foldable($item(_templateObject1414 || (_templateObject1414 = _taggedTemplateLiteral51(["bugged balaclava"]))))), _toConsumableArray17(foldable($item(_templateObject1514 || (_templateObject1514 = _taggedTemplateLiteral51(["toggle switch (Bartend)"]))))), _toConsumableArray17(foldable($item(_templateObject1614 || (_templateObject1614 = _taggedTemplateLiteral51(["mushroom cap"]))))), _toConsumableArray17(manyToOne($item(_templateObject1714 || (_templateObject1714 = _taggedTemplateLiteral51(["can of Rain-Doh"]))), $items(_templateObject1814 || (_templateObject1814 = _taggedTemplateLiteral51(["empty Rain-Doh can"]))))), _toConsumableArray17(manyToOne($item(_templateObject1914 || (_templateObject1914 = _taggedTemplateLiteral51(["meteorite fragment"]))), $items(_templateObject2014 || (_templateObject2014 = _taggedTemplateLiteral51(["meteorite earring, meteorite necklace, meteorite ring"]))))), _toConsumableArray17(manyToOne($item(_templateObject2121 || (_templateObject2121 = _taggedTemplateLiteral51(["Sneaky Pete's leather jacket"]))), $items(_templateObject2216 || (_templateObject2216 = _taggedTemplateLiteral51(["Sneaky Pete's leather jacket (collar popped)"]))))), _toConsumableArray17(manyToOne($item(_templateObject2314 || (_templateObject2314 = _taggedTemplateLiteral51(["Boris's Helm"]))), $items(_templateObject2413 || (_templateObject2413 = _taggedTemplateLiteral51(["Boris's Helm (askew)"]))))), _toConsumableArray17(manyToOne($item(_templateObject2513 || (_templateObject2513 = _taggedTemplateLiteral51(["Jarlsberg's pan"]))), $items(_templateObject2613 || (_templateObject2613 = _taggedTemplateLiteral51(["Jarlsberg's pan (Cosmic portal mode)"]))))), _toConsumableArray17(manyToOne($item(_templateObject2713 || (_templateObject2713 = _taggedTemplateLiteral51(["tiny plastic sword"]))), $items(_templateObject2811 || (_templateObject2811 = _taggedTemplateLiteral51(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), _toConsumableArray17(manyToOne($item(_templateObject2911 || (_templateObject2911 = _taggedTemplateLiteral51(["earthenware muffin tin"]))), $items(_templateObject3011 || (_templateObject3011 = _taggedTemplateLiteral51(["blueberry muffin, bran muffin, chocolate chip muffin"]))))))), inventory = /* @__PURE__ */ new Map(), _i = 0, _Object$entries = Object.entries((0, import_kolmafia59.mySessionItems)()); _i < _Object$entries.length; _i++) {
    var _itemMappings$get, _inventory$get, _Object$entries$_i = _slicedToArray20(_Object$entries[_i], 2), itemStr = _Object$entries$_i[0], quantity = _Object$entries$_i[1], _item = (0, import_kolmafia59.toItem)(itemStr), mappedItem = (_itemMappings$get = itemMappings.get(_item)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : _item;
    inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
  }
  return inventory;
}
function inventoryOperation(a, b, op) {
  var difference = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper16(new Set([].concat(_toConsumableArray17(a.keys()), _toConsumableArray17(b.keys())))), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _a$get, _b$get, _item2 = _step.value;
      difference.set(_item2, op((_a$get = a.get(_item2)) !== null && _a$get !== void 0 ? _a$get : 0, (_b$get = b.get(_item2)) !== null && _b$get !== void 0 ? _b$get : 0));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var diffEntries = _toConsumableArray17(difference.entries());
  return new Map(diffEntries.filter(function(value) {
    return value[1] !== 0;
  }));
}
var Session = /* @__PURE__ */ function() {
  function Session2(meat, items) {
    _classCallCheck19(this, Session2), _defineProperty21(this, "meat", void 0), _defineProperty21(this, "items", void 0), this.meat = meat, this.items = items;
  }
  return _createClass19(Session2, [{
    key: "register",
    value: function(target, quantity) {
      if (target === "meat")
        this.meat += quantity;
      else {
        var _this$items$get;
        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this session
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */
  }, {
    key: "value",
    value: function(itemValue) {
      var meat = Math.floor(this.meat), itemDetails = _toConsumableArray17(this.items.entries()).map(function(_ref) {
        var _ref2 = _slicedToArray20(_ref, 2), item8 = _ref2[0], quantity = _ref2[1];
        return {
          item: item8,
          quantity: quantity,
          value: itemValue(item8) * quantity
        };
      }), items = Math.floor(sumNumbers(itemDetails.map(function(detail) {
        return detail.value;
      })));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails
      };
    }
    /**
     * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param other the session from which to pull values to remove from this session
     * @returns a new session representing the difference between this session and the other session
     */
  }, {
    key: "diff",
    value: function(other) {
      return new Session2(this.meat - other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a - b;
      }));
    }
    /**
     * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     * @param a the session from which to subtract elements
     * @param b the session from which to add elements
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "add",
    value: (
      /**
       * Generate a new session combining multiple sessions together
       * @param other the session from which to add elements to this set
       * @returns a new session representing the addition of other to this
       */
      function(other) {
        return new Session2(this.meat + other.meat, inventoryOperation(this.items, other.items, function(a, b) {
          return a + b;
        }));
      }
    )
    /**
     * Combine the contents of sessions
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "toFile",
    value: (
      /**
       * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
       * @param filename The file into which to export
       */
      function(filename) {
        var val = {
          meat: this.meat,
          items: Object.fromEntries(this.items)
        };
        (0, import_kolmafia59.bufferToFile)(JSON.stringify(val), Session2.getFilepath(filename));
      }
    )
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     * @param filename The file from which to import
     * @returns the session represented by the file
     */
  }], [{
    key: "diff",
    value: function(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++)
        sessions[_key] = arguments[_key];
      return sessions.reduce(function(previousSession, currentSession) {
        return previousSession.add(currentSession);
      });
    }
  }, {
    key: "getFilepath",
    value: function(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0, import_kolmafia59.myName)(), "/").concat((0, import_kolmafia59.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function(filename) {
      var fileValue = (0, import_kolmafia59.fileToBuffer)(Session2.getFilepath(filename));
      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue), parsedItems = Object.entries(val.items).map(function(_ref3) {
          var _ref4 = _slicedToArray20(_ref3, 2), itemStr = _ref4[0], quantity = _ref4[1];
          return [(0, import_kolmafia59.toItem)(itemStr), quantity];
        });
        return new Session2(val.meat, new Map(parsedItems));
      } else
        return new Session2(0, /* @__PURE__ */ new Map());
    }
  }, {
    key: "current",
    value: function() {
      return new Session2((0, import_kolmafia59.mySessionMeat)(), mySessionItemsWrapper());
    }
  }]), Session2;
}();

// src/dungeons/Dreadsylvania.ts
var Dreadsylvania_exports = {};
__export(Dreadsylvania_exports, {
  close: function() {
    return close2;
  },
  distribute: function() {
    return distribute2;
  },
  findLoot: function() {
    return findLoot2;
  },
  open: function() {
    return open2;
  }
});
init_kolmafia_polyfill();
var import_kolmafia61 = require("kolmafia");

// src/dungeons/Dungeon.ts
init_kolmafia_polyfill();
var import_kolmafia60 = require("kolmafia");
var _templateObject400, _templateObject2122, _templateObject3101;
function _createForOfIteratorHelper17(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray34(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray34(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray34(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray34(o, minLen);
  }
}
function _arrayLikeToArray34(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral52(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function distribute(dungeon) {
  var idOrName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (0, import_kolmafia60.myId)(), loot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : dungeon.loot, distributeAllOfAGivenItem = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, player = getPlayerFromIdOrName(idOrName), lootList = loot instanceof Map ? countedMapToArray(loot) : Array.isArray(loot) ? loot : [loot], badLoot = lootList.find(function(lootItem) {
    return !dungeon.loot.includes(lootItem);
  });
  if (badLoot)
    throw new Error("".concat(badLoot, " is not a valid piece of dungeon loot"));
  var pageText = (0, import_kolmafia60.visitUrl)("clan_basement.php");
  if (!pageText.match(new RegExp(player.name, "i")))
    throw new Error("".concat(player.name, " cannot be distributed loot from ").concat((0, import_kolmafia60.getClanName)()));
  var itemNames = (0, import_kolmafia60.xpath)(pageText, "//tr/td[2]/b/text()"), whichLoots = (0, import_kolmafia60.xpath)(pageText, '//form[@action="clan_basement.php"]//input[@type="hidden"][@name="whichloot"]/@value');
  itemNames.forEach(function(itemName, index) {
    lootList.includes((0, import_kolmafia60.toItem)(itemName)) && ((0, import_kolmafia60.visitUrl)("clan_basement.php?whichloot=".concat(whichLoots[index], "&recipient=").concat(player.id)), distributeAllOfAGivenItem || lootList.splice(lootList.indexOf((0, import_kolmafia60.toItem)(itemName))));
  });
}
function close(dungeon) {
  (0, import_kolmafia60.visitUrl)("clan_basement.php?action=".concat(dungeon.closeAction, "&confirm=true"), !0);
  var pageText = (0, import_kolmafia60.visitUrl)("clan_basement.php");
  return pageText.includes(dungeon.closedImage);
}
function open(dungeon) {
  var paymentPolicy = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Difference", pageText = (0, import_kolmafia60.visitUrl)("clan_basement.php");
  if (pageText.includes(dungeon.openImage))
    return !0;
  var clan = Clan.get();
  if (paymentPolicy === "All")
    clan.putMeatInCoffer(dungeon.openCost);
  else {
    var stashMeat = clan.getMeatInCoffer(), payDifference = dungeon.openCost - stashMeat;
    if (payDifference > 0) {
      if (paymentPolicy === "None")
        return !1;
      clan.putMeatInCoffer(payDifference);
    }
  }
  return (0, import_kolmafia60.visitUrl)("clan_basement.php?action=".concat(dungeon.openAction), !0), (0, import_kolmafia60.visitUrl)("clan_basement.php").includes(dungeon.openImage);
}
function createDungeon(name, loot, openAction, closeAction, openCost, openImage, closedImage) {
  return {
    name: name,
    loot: loot,
    openAction: openAction,
    closeAction: closeAction,
    openCost: openCost,
    openImage: openImage,
    closedImage: closedImage
  };
}
var Dreadsylvania = createDungeon("Dreadsylvania", $items(_templateObject400 || (_templateObject400 = _taggedTemplateLiteral52(["Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce"]))), "translatemap", "foldmap", 1e6, "dvmap.gif", "foldmap.gif"), Hobopolis = createDungeon("Hobopolis", $items(_templateObject2122 || (_templateObject2122 = _taggedTemplateLiteral52(["Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster"]))), "cleansewer", "floodsewer", 1e6, "opengrate.gif", "sewergrate.gif"), SlimeTube = createDungeon("The Slime Tube", $items(_templateObject3101 || (_templateObject3101 = _taggedTemplateLiteral52(["slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants"]))), "cleanspot", "sealtube", 25e4, "slimehole.gif", "greasespot.gif");
function findLoot(dungeon) {
  var returnValue = /* @__PURE__ */ new Map(), pageText = (0, import_kolmafia60.visitUrl)("clan_basement.php"), _iterator = _createForOfIteratorHelper17(dungeon.loot), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _pageText$match$lengt, _pageText$match, lootItem = _step.value;
      returnValue.set(lootItem, (_pageText$match$lengt = (_pageText$match = pageText.match(new RegExp(lootItem.name, "g"))) === null || _pageText$match === void 0 ? void 0 : _pageText$match.length) !== null && _pageText$match$lengt !== void 0 ? _pageText$match$lengt : 0);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}

// src/dungeons/Dreadsylvania.ts
function close2() {
  return close(Dreadsylvania);
}
function open2() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Difference";
  return open(Dreadsylvania, paymentPolicy);
}
function distribute2() {
  var idOrName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia61.myId)(), loot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Dreadsylvania.loot, distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  distribute(Dreadsylvania, idOrName, loot, distributeAllOfAGivenItem);
}
function findLoot2() {
  return findLoot(Dreadsylvania);
}

// src/dungeons/Hobopolis.ts
var Hobopolis_exports = {};
__export(Hobopolis_exports, {
  close: function() {
    return close3;
  },
  distribute: function() {
    return distribute3;
  },
  findLoot: function() {
    return findLoot3;
  },
  open: function() {
    return open3;
  }
});
init_kolmafia_polyfill();
var import_kolmafia62 = require("kolmafia");
function close3() {
  return close(Hobopolis);
}
function open3() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Difference";
  return open(Hobopolis, paymentPolicy);
}
function distribute3() {
  var idOrName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia62.myId)(), loot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Hobopolis.loot, distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  distribute(Hobopolis, idOrName, loot, distributeAllOfAGivenItem);
}
function findLoot3() {
  return findLoot(Hobopolis);
}

// src/dungeons/SlimeTube.ts
var SlimeTube_exports = {};
__export(SlimeTube_exports, {
  close: function() {
    return close4;
  },
  distribute: function() {
    return distribute4;
  },
  findLoot: function() {
    return findLoot4;
  },
  open: function() {
    return open4;
  }
});
init_kolmafia_polyfill();
var import_kolmafia63 = require("kolmafia");
function close4() {
  return close(SlimeTube);
}
function open4() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Difference";
  return open(SlimeTube, paymentPolicy);
}
function distribute4() {
  var idOrName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, import_kolmafia63.myId)(), loot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : SlimeTube.loot, distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  distribute(SlimeTube, idOrName, loot, distributeAllOfAGivenItem);
}
function findLoot4() {
  return findLoot(SlimeTube);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $bounties,
  $bounty,
  $class,
  $classes,
  $coinmaster,
  $coinmasters,
  $effect,
  $effects,
  $element,
  $elements,
  $familiar,
  $familiars,
  $item,
  $items,
  $location,
  $locations,
  $monster,
  $monsters,
  $path,
  $paths,
  $phyla,
  $phylum,
  $servant,
  $servants,
  $skill,
  $skills,
  $slot,
  $slots,
  $stat,
  $stats,
  $thrall,
  $thralls,
  ActionSource,
  AscendError,
  AscensionPrepError,
  AsdonMartin,
  AutumnAton,
  Bandersnatch,
  BarrelShrine,
  BeachComb,
  Cartography,
  ChateauMantegna,
  Clan,
  CombatLoversLocket,
  CommunityService,
  Counter,
  CrimboShrub,
  CrownOfThrones,
  CrystalBall,
  DNALab,
  DaylightShavings,
  DeckOfEveryCard,
  Diet,
  Dinseylandfill,
  Dreadsylvania,
  EnsureError,
  Environment,
  FloristFriar,
  GreyGoose,
  Guzzlr,
  Hobopolis,
  InvalidMacroError,
  JuneCleaver,
  Kmail,
  KolmafiaVersionError,
  Latte,
  Lifestyle,
  Macro,
  MagicalSausages,
  MayoClinic,
  MenuItem,
  Mood,
  MpSource,
  MummingTrunk,
  NuclearAutumn,
  ObtuseAngel,
  OscusSoda,
  Pantogram,
  Path,
  Paths,
  PropertiesManager,
  RainDoh,
  RainDohBlackBox,
  ReagnimatedGnome,
  Requirement,
  RetroCape,
  Robortender,
  Session,
  SlimeTube,
  Snapper,
  SongBoom,
  SourceTerminal,
  Spacegate,
  SpookyPutty,
  SpookyPuttySheet,
  Stickers,
  StompingBoots,
  StrictMacro,
  TrainSet,
  TunnelOfLove,
  Wanderer,
  WinterGarden,
  Witchess,
  actionSourcesAvailable,
  adventureMacro,
  adventureMacroAuto,
  applyModes,
  arrayContains,
  arrayEquals,
  arrayToCountedMap,
  ascend,
  bestLibramToCast,
  canRememberSong,
  canUse,
  canVisitUrl,
  chunk,
  clamp,
  clearMaximizerCache,
  console,
  couldUseRainDohBlackBox,
  couldUseSpookyPuttySheet,
  countedMapToArray,
  countedMapToString,
  damageTakenByElement,
  ensureEffect,
  ensureFreeKill,
  ensureFreeRun,
  examine,
  expectedLibramSummon,
  findActionSource,
  findFairyMultiplier,
  findLeprechaunMultiplier,
  get,
  getActiveEffects,
  getActiveSongs,
  getAverage,
  getAverageAdventures,
  getBanishedMonsters,
  getCurrentModes,
  getFamiliarWandererChance,
  getFoldGroup,
  getKramcoWandererChance,
  getMacroId,
  getModifier,
  getMonsterLocations,
  getPlayerFromIdOrName,
  getRemainingLiver,
  getRemainingSpleen,
  getRemainingStomach,
  getSaleValue,
  getSongCount,
  getSongLimit,
  getTodaysHolidayWanderers,
  getTotalPuttyLikeCopiesMade,
  getWandererChance,
  getZapGroup,
  have,
  haveCounter,
  haveInCampground,
  haveWandererCounter,
  holidayWanderers,
  invertMap,
  isBooleanProperty,
  isCurrentFamiliar,
  isFamiliarProperty,
  isLocationProperty,
  isMonsterProperty,
  isNumericOrStringProperty,
  isNumericProperty,
  isPhylumProperty,
  isSong,
  isStatProperty,
  isStringProperty,
  isVoteWandererNow,
  isWandererNow,
  logger,
  maxBy,
  maximizeCached,
  mergeMaximizeOptions,
  modeableItems,
  modeableState,
  noneToNull,
  notNull,
  parseNumber,
  permedSkills,
  possibleLibramSummons,
  prepareAscension,
  property,
  propertyTypes,
  questStep,
  set,
  setDefaultMaximizeOptions,
  setEqual,
  setProperties,
  sinceKolmafiaRevision,
  sinceKolmafiaVersion,
  splitByCommasWithEscapes,
  sum,
  sumNumbers,
  telescope,
  tryFindFreeKill,
  tryFindFreeRun,
  uneffect,
  withChoice,
  withChoices,
  withProperties,
  withProperty
});
