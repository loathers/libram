/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7981);

module.exports = parent;

/***/ }),

/***/ 2529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9390);

__webpack_require__(5892);

var entryUnbind = __webpack_require__(1305);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 1755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7987);

module.exports = parent;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 6288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var create = __webpack_require__(3590);

var definePropertyModule = __webpack_require__(4615);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isArray = __webpack_require__(4521);

var isConstructor = __webpack_require__(2097);

var isObject = __webpack_require__(794);

var wellKnownSymbol = __webpack_require__(3649);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

/***/ }),

/***/ 4822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5289); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 1305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var redefine = __webpack_require__(1270);

var setGlobal = __webpack_require__(460);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 1266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var global = __webpack_require__(7583);

var isArray = __webpack_require__(4521);

var lengthOfArrayLike = __webpack_require__(1825);

var bind = __webpack_require__(2938);

var TypeError = global.TypeError; // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(8257);

var NATIVE_BIND = __webpack_require__(8987);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

module.exports = !fails(function () {
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 5897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(8257);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(8257); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 4521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9624); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 2097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var classof = __webpack_require__(3058);

var getBuiltIn = __webpack_require__(5897);

var inspectSource = __webpack_require__(9734);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getBuiltIn = __webpack_require__(5897);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var TypeError = global.TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 3590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(2569);

var definePropertiesModule = __webpack_require__(8728);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = __webpack_require__(4639);

var html = __webpack_require__(482);

var documentCreateElement = __webpack_require__(6668);

var sharedKey = __webpack_require__(9137);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var definePropertyModule = __webpack_require__(4615);

var anObject = __webpack_require__(2569);

var toIndexedObject = __webpack_require__(2977);

var objectKeys = __webpack_require__(5432); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var uncurryThis = __webpack_require__(7386);

var objectKeys = __webpack_require__(5432);

var toIndexedObject = __webpack_require__(2977);

var $propertyIsEnumerable = (__webpack_require__(112).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 1270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var createNonEnumerableProperty = __webpack_require__(57);

var setGlobal = __webpack_require__(460);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

/***/ }),

/***/ 3955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var setGlobal = __webpack_require__(460);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var requireObjectCoercible = __webpack_require__(3955);

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(2670);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 7670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(7263);

var flattenIntoArray = __webpack_require__(1266);

var toObject = __webpack_require__(1324);

var lengthOfArrayLike = __webpack_require__(1825);

var toIntegerOrInfinity = __webpack_require__(7486);

var arraySpeciesCreate = __webpack_require__(4822); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 5892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6288); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $entries = (__webpack_require__(9953).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 9628:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $values = (__webpack_require__(9953).values); // `Object.values` method
// https://tc39.es/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

/***/ }),

/***/ 9940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var DataView = getNative(root, 'DataView');
module.exports = DataView;

/***/ }),

/***/ 1979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(9129),
    hashDelete = __webpack_require__(7644),
    hashGet = __webpack_require__(3486),
    hashHas = __webpack_require__(4786),
    hashSet = __webpack_require__(6444);
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ 2768:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(3708),
    listCacheDelete = __webpack_require__(6993),
    listCacheGet = __webpack_require__(286),
    listCacheHas = __webpack_require__(1678),
    listCacheSet = __webpack_require__(9743);
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ 4804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ 8423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(6977),
    mapCacheDelete = __webpack_require__(7474),
    mapCacheGet = __webpack_require__(727),
    mapCacheHas = __webpack_require__(3653),
    mapCacheSet = __webpack_require__(6140);
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ 7114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Promise = getNative(root, 'Promise');
module.exports = Promise;

/***/ }),

/***/ 689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var Set = getNative(root, 'Set');
module.exports = Set;

/***/ }),

/***/ 9832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8423),
    setCacheAdd = __webpack_require__(9911),
    setCacheHas = __webpack_require__(7447);
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */


function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
module.exports = SetCache;

/***/ }),

/***/ 959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    stackClear = __webpack_require__(7553),
    stackDelete = __webpack_require__(6038),
    stackGet = __webpack_require__(2397),
    stackHas = __webpack_require__(2421),
    stackSet = __webpack_require__(2936);
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ 2773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Symbol = root.Symbol;
module.exports = Symbol;

/***/ }),

/***/ 2496:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Built-in value references. */


var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ 5284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203),
    root = __webpack_require__(4362);
/* Built-in method references that are verified to be native. */


var WeakMap = getNative(root, 'WeakMap');
module.exports = WeakMap;

/***/ }),

/***/ 6523:
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

module.exports = arrayFilter;

/***/ }),

/***/ 8083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(5094),
    isArguments = __webpack_require__(9246),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isIndex = __webpack_require__(4782),
    isTypedArray = __webpack_require__(1589);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ 9258:
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

module.exports = arrayMap;

/***/ }),

/***/ 8421:
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

module.exports = arrayPush;

/***/ }),

/***/ 4481:
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

module.exports = arraySome;

/***/ }),

/***/ 6213:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(7950);
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ 2478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(4655);
/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */


function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      var computed = current,
          result = value;
    }
  }

  return result;
}

module.exports = baseExtremum;

/***/ }),

/***/ 5974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(6883),
    toKey = __webpack_require__(7102);
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

module.exports = baseGet;

/***/ }),

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(8421),
    isArray = __webpack_require__(3670);
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),

/***/ 1185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    getRawTag = __webpack_require__(3888),
    objectToString = __webpack_require__(2299);
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ 582:
/***/ ((module) => {

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt(value, other) {
  return value > other;
}

module.exports = baseGt;

/***/ }),

/***/ 5529:
/***/ ((module) => {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

/***/ }),

/***/ 1075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ 9856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(1829),
    isObjectLike = __webpack_require__(4939);
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),

/***/ 1829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(959),
    equalArrays = __webpack_require__(3426),
    equalByTag = __webpack_require__(1402),
    equalObjects = __webpack_require__(4572),
    getTag = __webpack_require__(2417),
    isArray = __webpack_require__(3670),
    isBuffer = __webpack_require__(2343),
    isTypedArray = __webpack_require__(1589);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),

/***/ 4656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(959),
    baseIsEqual = __webpack_require__(9856);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

module.exports = baseIsMatch;

/***/ }),

/***/ 4106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isMasked = __webpack_require__(9249),
    isObject = __webpack_require__(71),
    toSource = __webpack_require__(1214);
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ 3638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isLength = __webpack_require__(7100),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ 9047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMatches = __webpack_require__(8334),
    baseMatchesProperty = __webpack_require__(5941),
    identity = __webpack_require__(1559),
    isArray = __webpack_require__(3670),
    property = __webpack_require__(8886);
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */


function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity;
  }

  if (typeof value == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }

  return property(value);
}

module.exports = baseIteratee;

/***/ }),

/***/ 7521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(2803),
    nativeKeys = __webpack_require__(3865);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeys;

/***/ }),

/***/ 8334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMatch = __webpack_require__(4656),
    getMatchData = __webpack_require__(2811),
    matchesStrictComparable = __webpack_require__(4248);
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */


function baseMatches(source) {
  var matchData = getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

/***/ }),

/***/ 5941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(9856),
    get = __webpack_require__(643),
    hasIn = __webpack_require__(9059),
    isKey = __webpack_require__(837),
    isStrictComparable = __webpack_require__(3631),
    matchesStrictComparable = __webpack_require__(4248),
    toKey = __webpack_require__(7102);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

/***/ }),

/***/ 3184:
/***/ ((module) => {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

/***/ }),

/***/ 886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(5974);
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */


function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

/***/ }),

/***/ 5094:
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ 1620:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    arrayMap = __webpack_require__(9258),
    isArray = __webpack_require__(3670),
    isSymbol = __webpack_require__(4655);
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),

/***/ 9081:
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ 3159:
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

/***/ }),

/***/ 6883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3670),
    isKey = __webpack_require__(837),
    stringToPath = __webpack_require__(376),
    toString = __webpack_require__(2049);
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }

  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

/***/ }),

/***/ 1741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(4362);
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ 3426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(9832),
    arraySome = __webpack_require__(4481),
    cacheHas = __webpack_require__(3159);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),

/***/ 1402:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773),
    Uint8Array = __webpack_require__(2496),
    eq = __webpack_require__(7950),
    equalArrays = __webpack_require__(3426),
    mapToArray = __webpack_require__(8961),
    setToArray = __webpack_require__(6983);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

module.exports = equalByTag;

/***/ }),

/***/ 4572:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(5788);
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),

/***/ 8556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ 5788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(891),
    getSymbols = __webpack_require__(7976),
    keys = __webpack_require__(3225);
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(4480);
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ 2811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isStrictComparable = __webpack_require__(3631),
    keys = __webpack_require__(3225);
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */


function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }

  return result;
}

module.exports = getMatchData;

/***/ }),

/***/ 3203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(4106),
    getValue = __webpack_require__(7338);
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ 3888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2773);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ 7976:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(6523),
    stubArray = __webpack_require__(4043);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;

/***/ }),

/***/ 2417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(9940),
    Map = __webpack_require__(4804),
    Promise = __webpack_require__(7114),
    Set = __webpack_require__(689),
    WeakMap = __webpack_require__(5284),
    baseGetTag = __webpack_require__(1185),
    toSource = __webpack_require__(1214);
/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

module.exports = getTag;

/***/ }),

/***/ 7338:
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ 4727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(6883),
    isArguments = __webpack_require__(9246),
    isArray = __webpack_require__(3670),
    isIndex = __webpack_require__(4782),
    isLength = __webpack_require__(7100),
    toKey = __webpack_require__(7102);
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */


function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

module.exports = hasPath;

/***/ }),

/***/ 9129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ 7644:
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ 3486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ 4786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ 6444:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(6326);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ 4782:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ 837:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(3670),
    isSymbol = __webpack_require__(4655);
/** Used to match property names within property paths. */


var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

module.exports = isKey;

/***/ }),

/***/ 4480:
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ 9249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(1741);
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ 2803:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ 3631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(71);
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */


function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

/***/ }),

/***/ 3708:
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ 6993:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ 286:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ 1678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ 9743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(6213);
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ 6977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(1979),
    ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804);
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ 7474:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ 727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ 3653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ 6140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(404);
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ 8961:
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

/***/ }),

/***/ 4248:
/***/ ((module) => {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

module.exports = matchesStrictComparable;

/***/ }),

/***/ 5933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoize = __webpack_require__(104);
/** Used as the maximum memoize cache size. */


var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

/***/ }),

/***/ 6326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(3203);
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ 3865:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(5290);
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

/***/ }),

/***/ 1985:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(8556);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;

/***/ }),

/***/ 2299:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ 5290:
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ 4362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(8556);
/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ 9911:
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}

module.exports = setCacheAdd;

/***/ }),

/***/ 7447:
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

/***/ }),

/***/ 6983:
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

/***/ }),

/***/ 7553:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768);
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ 6038:
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ 2397:
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ 2421:
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ 2936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(2768),
    Map = __webpack_require__(4804),
    MapCache = __webpack_require__(8423);
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ 376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoizeCapped = __webpack_require__(5933);
/** Used to match property names within property paths. */


var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
module.exports = stringToPath;

/***/ }),

/***/ 7102:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(4655);
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = toKey;

/***/ }),

/***/ 1214:
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ 7950:
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ 643:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(5974);
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */


function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/***/ }),

/***/ 9059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHasIn = __webpack_require__(5529),
    hasPath = __webpack_require__(4727);
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */


function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

/***/ }),

/***/ 1559:
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ 9246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(1075),
    isObjectLike = __webpack_require__(4939);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ 3670:
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ 6175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(3626),
    isLength = __webpack_require__(7100);
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ 2343:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(4362),
    stubFalse = __webpack_require__(3444);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;

/***/ }),

/***/ 7120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(9856);
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */


function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

/***/ }),

/***/ 3626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObject = __webpack_require__(71);
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ 7100:
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ 71:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ 4939:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ 4655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(1185),
    isObjectLike = __webpack_require__(4939);
/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),

/***/ 1589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(3638),
    baseUnary = __webpack_require__(9081),
    nodeUtil = __webpack_require__(1985);
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ 3225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(8083),
    baseKeys = __webpack_require__(7521),
    isArrayLike = __webpack_require__(6175);
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),

/***/ 4378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseExtremum = __webpack_require__(2478),
    baseGt = __webpack_require__(582),
    baseIteratee = __webpack_require__(9047);
/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */


function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : undefined;
}

module.exports = maxBy;

/***/ }),

/***/ 104:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(8423);
/** Error message constants. */


var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = MapCache;
module.exports = memoize;

/***/ }),

/***/ 8886:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(3184),
    basePropertyDeep = __webpack_require__(886),
    isKey = __webpack_require__(837),
    toKey = __webpack_require__(7102);
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */


function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

/***/ }),

/***/ 4043:
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),

/***/ 3444:
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ 2049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(1620);
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),

/***/ 9189:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "$bounties": () => (/* reexport */ $bounties),
  "$bounty": () => (/* reexport */ $bounty),
  "$class": () => (/* reexport */ $class),
  "$classes": () => (/* reexport */ $classes),
  "$coinmaster": () => (/* reexport */ $coinmaster),
  "$coinmasters": () => (/* reexport */ $coinmasters),
  "$effect": () => (/* reexport */ $effect),
  "$effects": () => (/* reexport */ $effects),
  "$element": () => (/* reexport */ $element),
  "$elements": () => (/* reexport */ $elements),
  "$familiar": () => (/* reexport */ $familiar),
  "$familiars": () => (/* reexport */ $familiars),
  "$item": () => (/* reexport */ $item),
  "$items": () => (/* reexport */ $items),
  "$location": () => (/* reexport */ $location),
  "$locations": () => (/* reexport */ $locations),
  "$monster": () => (/* reexport */ $monster),
  "$monsters": () => (/* reexport */ $monsters),
  "$path": () => (/* reexport */ $path),
  "$paths": () => (/* reexport */ $paths),
  "$phyla": () => (/* reexport */ $phyla),
  "$phylum": () => (/* reexport */ $phylum),
  "$servant": () => (/* reexport */ $servant),
  "$servants": () => (/* reexport */ $servants),
  "$skill": () => (/* reexport */ $skill),
  "$skills": () => (/* reexport */ $skills),
  "$slot": () => (/* reexport */ $slot),
  "$slots": () => (/* reexport */ $slots),
  "$stat": () => (/* reexport */ $stat),
  "$stats": () => (/* reexport */ $stats),
  "$thrall": () => (/* reexport */ $thrall),
  "$thralls": () => (/* reexport */ $thralls),
  "ActionSource": () => (/* reexport */ ActionSource),
  "AscendError": () => (/* reexport */ AscendError),
  "AscensionPrepError": () => (/* reexport */ AscensionPrepError),
  "AsdonMartin": () => (/* reexport */ AsdonMartin_namespaceObject),
  "AutumnAton": () => (/* reexport */ AutumnAton_namespaceObject),
  "Bandersnatch": () => (/* reexport */ Bandersnatch_namespaceObject),
  "BarrelShrine": () => (/* reexport */ BarrelShrine_namespaceObject),
  "BeachComb": () => (/* reexport */ BeachComb_namespaceObject),
  "Cartography": () => (/* reexport */ Cartography_namespaceObject),
  "ChateauMantegna": () => (/* reexport */ ChateauMantegna_namespaceObject),
  "Clan": () => (/* reexport */ Clan),
  "CombatLoversLocket": () => (/* reexport */ CombatLoversLocket_namespaceObject),
  "CommunityService": () => (/* reexport */ CommunityService),
  "Counter": () => (/* reexport */ counter_namespaceObject),
  "CrimboShrub": () => (/* reexport */ CrimboShrub_namespaceObject),
  "CrownOfThrones": () => (/* reexport */ CrownOfThrones_namespaceObject),
  "CrystalBall": () => (/* reexport */ CrystalBall_namespaceObject),
  "DNALab": () => (/* reexport */ DNALab_namespaceObject),
  "DaylightShavings": () => (/* reexport */ DaylightShavings_namespaceObject),
  "Diet": () => (/* reexport */ Diet),
  "Dinseylandfill": () => (/* reexport */ Dinseylandfill_namespaceObject),
  "Dreadsylvania": () => (/* reexport */ Dreadsylvania_namespaceObject),
  "EnsureError": () => (/* reexport */ EnsureError),
  "Environment": () => (/* reexport */ Environment),
  "FloristFriar": () => (/* reexport */ Florist_namespaceObject),
  "GreyGoose": () => (/* reexport */ GreyGoose_namespaceObject),
  "Guzzlr": () => (/* reexport */ Guzzlr_namespaceObject),
  "Hobopolis": () => (/* reexport */ Hobopolis_namespaceObject),
  "InvalidMacroError": () => (/* reexport */ InvalidMacroError),
  "JuneCleaver": () => (/* reexport */ JuneCleaver_namespaceObject),
  "Kmail": () => (/* reexport */ Kmail),
  "KolmafiaVersionError": () => (/* reexport */ KolmafiaVersionError),
  "Latte": () => (/* reexport */ LatteLoversMembersMug_namespaceObject),
  "Lifestyle": () => (/* reexport */ Lifestyle),
  "Macro": () => (/* reexport */ Macro),
  "MagicalSausages": () => (/* reexport */ MagicalSausages),
  "MayoClinic": () => (/* reexport */ MayoClinic_namespaceObject),
  "MenuItem": () => (/* reexport */ MenuItem),
  "Mood": () => (/* reexport */ Mood),
  "MpSource": () => (/* reexport */ MpSource),
  "MummingTrunk": () => (/* reexport */ MummingTrunk_namespaceObject),
  "NuclearAutumn": () => (/* reexport */ NuclearAutumn_namespaceObject),
  "ObtuseAngel": () => (/* reexport */ ObtuseAngel_namespaceObject),
  "OscusSoda": () => (/* reexport */ OscusSoda),
  "Pantogram": () => (/* reexport */ Pantogram_namespaceObject),
  "Path": () => (/* reexport */ Path),
  "Paths": () => (/* reexport */ Paths),
  "PropertiesManager": () => (/* reexport */ PropertiesManager),
  "RainDoh": () => (/* reexport */ RainDoh_namespaceObject),
  "RainDohBlackBox": () => (/* reexport */ RainDohBlackBox),
  "ReagnimatedGnome": () => (/* reexport */ ReagnimatedGnome_namespaceObject),
  "Requirement": () => (/* reexport */ Requirement),
  "RetroCape": () => (/* reexport */ RetroCape_namespaceObject),
  "Robortender": () => (/* reexport */ Robortender_namespaceObject),
  "Session": () => (/* reexport */ Session),
  "SlimeTube": () => (/* reexport */ SlimeTube_namespaceObject),
  "Snapper": () => (/* reexport */ Snapper_namespaceObject),
  "SongBoom": () => (/* reexport */ SongBoom_namespaceObject),
  "SourceTerminal": () => (/* reexport */ SourceTerminal_namespaceObject),
  "Spacegate": () => (/* reexport */ Spacegate_namespaceObject),
  "SpookyPutty": () => (/* reexport */ SpookyPutty_namespaceObject),
  "SpookyPuttySheet": () => (/* reexport */ SpookyPuttySheet),
  "Stickers": () => (/* reexport */ Stickers_namespaceObject),
  "StompingBoots": () => (/* reexport */ StompingBoots_namespaceObject),
  "StrictMacro": () => (/* reexport */ StrictMacro),
  "TunnelOfLove": () => (/* reexport */ TunnelOfLove_namespaceObject),
  "Wanderer": () => (/* reexport */ Wanderer),
  "WinterGarden": () => (/* reexport */ WinterGarden_namespaceObject),
  "Witchess": () => (/* reexport */ Witchess_namespaceObject),
  "actionSourcesAvailable": () => (/* reexport */ actionSourcesAvailable),
  "adventureMacro": () => (/* reexport */ adventureMacro),
  "adventureMacroAuto": () => (/* reexport */ adventureMacroAuto),
  "applyModes": () => (/* reexport */ applyModes),
  "arrayContains": () => (/* reexport */ arrayContains),
  "arrayToCountedMap": () => (/* reexport */ arrayToCountedMap),
  "ascend": () => (/* reexport */ ascend),
  "bestLibramToCast": () => (/* reexport */ bestLibramToCast),
  "canRememberSong": () => (/* reexport */ canRememberSong),
  "canUse": () => (/* reexport */ canUse),
  "canVisitUrl": () => (/* reexport */ canVisitUrl),
  "chunk": () => (/* reexport */ chunk),
  "clamp": () => (/* reexport */ clamp),
  "console": () => (/* reexport */ console_namespaceObject),
  "couldUseRainDohBlackBox": () => (/* reexport */ couldUseRainDohBlackBox),
  "couldUseSpookyPuttySheet": () => (/* reexport */ couldUseSpookyPuttySheet),
  "countedMapToArray": () => (/* reexport */ countedMapToArray),
  "countedMapToString": () => (/* reexport */ countedMapToString),
  "createStringUnionTypeGuardFunction": () => (/* reexport */ createStringUnionTypeGuardFunction),
  "damageTakenByElement": () => (/* reexport */ damageTakenByElement),
  "ensureEffect": () => (/* reexport */ ensureEffect),
  "ensureFreeKill": () => (/* reexport */ ensureFreeKill),
  "ensureFreeRun": () => (/* reexport */ ensureFreeRun),
  "expectedLibramSummon": () => (/* reexport */ expectedLibramSummon),
  "findActionSource": () => (/* reexport */ findActionSource),
  "findFairyMultiplier": () => (/* reexport */ findFairyMultiplier),
  "findLeprechaunMultiplier": () => (/* reexport */ findLeprechaunMultiplier),
  "get": () => (/* reexport */ get),
  "getActiveEffects": () => (/* reexport */ getActiveEffects),
  "getActiveSongs": () => (/* reexport */ getActiveSongs),
  "getAverage": () => (/* reexport */ getAverage),
  "getAverageAdventures": () => (/* reexport */ getAverageAdventures),
  "getBanishedMonsters": () => (/* reexport */ getBanishedMonsters),
  "getCurrentModes": () => (/* reexport */ getCurrentModes),
  "getFamiliarWandererChance": () => (/* reexport */ getFamiliarWandererChance),
  "getFoldGroup": () => (/* reexport */ getFoldGroup),
  "getKramcoWandererChance": () => (/* reexport */ getKramcoWandererChance),
  "getMacroId": () => (/* reexport */ getMacroId),
  "getModifier": () => (/* reexport */ modifier_get),
  "getMonsterLocations": () => (/* reexport */ getMonsterLocations),
  "getPlayerFromIdOrName": () => (/* reexport */ getPlayerFromIdOrName),
  "getRemainingLiver": () => (/* reexport */ getRemainingLiver),
  "getRemainingSpleen": () => (/* reexport */ getRemainingSpleen),
  "getRemainingStomach": () => (/* reexport */ getRemainingStomach),
  "getSaleValue": () => (/* reexport */ getSaleValue),
  "getSongCount": () => (/* reexport */ getSongCount),
  "getSongLimit": () => (/* reexport */ getSongLimit),
  "getTodaysHolidayWanderers": () => (/* reexport */ getTodaysHolidayWanderers),
  "getTotalPuttyLikeCopiesMade": () => (/* reexport */ getTotalPuttyLikeCopiesMade),
  "getWandererChance": () => (/* reexport */ getWandererChance),
  "getZapGroup": () => (/* reexport */ getZapGroup),
  "have": () => (/* reexport */ have),
  "haveCounter": () => (/* reexport */ haveCounter),
  "haveInCampground": () => (/* reexport */ haveInCampground),
  "haveWandererCounter": () => (/* reexport */ haveWandererCounter),
  "holidayWanderers": () => (/* reexport */ holidayWanderers),
  "invertMap": () => (/* reexport */ invertMap),
  "isBooleanProperty": () => (/* reexport */ isBooleanProperty),
  "isCurrentFamiliar": () => (/* reexport */ isCurrentFamiliar),
  "isFamiliarProperty": () => (/* reexport */ isFamiliarProperty),
  "isLocationProperty": () => (/* reexport */ isLocationProperty),
  "isMonsterProperty": () => (/* reexport */ isMonsterProperty),
  "isNumericOrStringProperty": () => (/* reexport */ isNumericOrStringProperty),
  "isNumericProperty": () => (/* reexport */ isNumericProperty),
  "isPhylumProperty": () => (/* reexport */ isPhylumProperty),
  "isSong": () => (/* reexport */ isSong),
  "isStatProperty": () => (/* reexport */ isStatProperty),
  "isStringProperty": () => (/* reexport */ isStringProperty),
  "isVoteWandererNow": () => (/* reexport */ isVoteWandererNow),
  "isWandererNow": () => (/* reexport */ isWandererNow),
  "logger": () => (/* reexport */ logger),
  "maximizeCached": () => (/* reexport */ maximizeCached),
  "modeableItems": () => (/* reexport */ modeableItems),
  "modeableState": () => (/* reexport */ modeableState),
  "noneToNull": () => (/* reexport */ noneToNull),
  "notNull": () => (/* reexport */ notNull),
  "parseNumber": () => (/* reexport */ parseNumber),
  "permedSkills": () => (/* reexport */ permedSkills),
  "possibleLibramSummons": () => (/* reexport */ possibleLibramSummons),
  "prepareAscension": () => (/* reexport */ prepareAscension),
  "property": () => (/* reexport */ property_namespaceObject),
  "propertyTypes": () => (/* reexport */ propertyTypes_namespaceObject),
  "questStep": () => (/* reexport */ questStep),
  "set": () => (/* reexport */ _set),
  "setDefaultMaximizeOptions": () => (/* reexport */ setDefaultMaximizeOptions),
  "setEqual": () => (/* reexport */ setEqual),
  "setProperties": () => (/* reexport */ setProperties),
  "sinceKolmafiaRevision": () => (/* reexport */ sinceKolmafiaRevision),
  "sinceKolmafiaVersion": () => (/* reexport */ sinceKolmafiaVersion),
  "splitByCommasWithEscapes": () => (/* reexport */ splitByCommasWithEscapes),
  "sum": () => (/* reexport */ sum),
  "sumNumbers": () => (/* reexport */ sumNumbers),
  "telescope": () => (/* reexport */ telescope),
  "tryFindFreeKill": () => (/* reexport */ tryFindFreeKill),
  "tryFindFreeRun": () => (/* reexport */ tryFindFreeRun),
  "uneffect": () => (/* reexport */ uneffect),
  "withChoice": () => (/* reexport */ withChoice),
  "withChoices": () => (/* reexport */ withChoices),
  "withProperties": () => (/* reexport */ withProperties),
  "withProperty": () => (/* reexport */ withProperty)
});

// NAMESPACE OBJECT: ./src/propertyTypes.ts
var propertyTypes_namespaceObject = {};
__webpack_require__.r(propertyTypes_namespaceObject);
__webpack_require__.d(propertyTypes_namespaceObject, {
  "booleanProperties": () => (booleanProperties),
  "familiarProperties": () => (familiarProperties),
  "locationProperties": () => (locationProperties),
  "monsterProperties": () => (monsterProperties),
  "numericOrStringProperties": () => (numericOrStringProperties),
  "numericProperties": () => (numericProperties),
  "phylumProperties": () => (phylumProperties),
  "statProperties": () => (statProperties),
  "stringProperties": () => (stringProperties)
});

// NAMESPACE OBJECT: ./src/property.ts
var property_namespaceObject = {};
__webpack_require__.r(property_namespaceObject);
__webpack_require__.d(property_namespaceObject, {
  "PropertiesManager": () => (PropertiesManager),
  "get": () => (get),
  "getBoolean": () => (getBoolean),
  "getBounty": () => (getBounty),
  "getClass": () => (getClass),
  "getCoinmaster": () => (getCoinmaster),
  "getCommaSeparated": () => (getCommaSeparated),
  "getEffect": () => (getEffect),
  "getElement": () => (getElement),
  "getFamiliar": () => (getFamiliar),
  "getItem": () => (getItem),
  "getLocation": () => (getLocation),
  "getMonster": () => (getMonster),
  "getNumber": () => (getNumber),
  "getPhylum": () => (getPhylum),
  "getServant": () => (getServant),
  "getSkill": () => (getSkill),
  "getSlot": () => (getSlot),
  "getStat": () => (getStat),
  "getString": () => (getString),
  "getThrall": () => (getThrall),
  "set": () => (_set),
  "setProperties": () => (setProperties),
  "withChoice": () => (withChoice),
  "withChoices": () => (withChoices),
  "withProperties": () => (withProperties),
  "withProperty": () => (withProperty)
});

// NAMESPACE OBJECT: ./src/resources/2017/AsdonMartin.ts
var AsdonMartin_namespaceObject = {};
__webpack_require__.r(AsdonMartin_namespaceObject);
__webpack_require__.d(AsdonMartin_namespaceObject, {
  "Driving": () => (Driving),
  "drive": () => (drive),
  "fillTo": () => (fillTo),
  "fillWithInventoryTo": () => (fillWithInventoryTo),
  "have": () => (AsdonMartin_have),
  "insertFuel": () => (insertFuel),
  "installed": () => (installed)
});

// NAMESPACE OBJECT: ./src/resources/2009/Bandersnatch.ts
var Bandersnatch_namespaceObject = {};
__webpack_require__.r(Bandersnatch_namespaceObject);
__webpack_require__.d(Bandersnatch_namespaceObject, {
  "canRunaway": () => (canRunaway),
  "couldRunaway": () => (couldRunaway),
  "familiar": () => (familiar),
  "getMaxRunaways": () => (getMaxRunaways),
  "getRemainingRunaways": () => (getRemainingRunaways),
  "getRunaways": () => (getRunaways),
  "have": () => (Bandersnatch_have),
  "prepareRunaway": () => (prepareRunaway)
});

// NAMESPACE OBJECT: ./src/resources/2011/StompingBoots.ts
var StompingBoots_namespaceObject = {};
__webpack_require__.r(StompingBoots_namespaceObject);
__webpack_require__.d(StompingBoots_namespaceObject, {
  "canRunaway": () => (StompingBoots_canRunaway),
  "couldRunaway": () => (StompingBoots_couldRunaway),
  "familiar": () => (StompingBoots_familiar),
  "getMaxRunaways": () => (StompingBoots_getMaxRunaways),
  "getRemainingRunaways": () => (StompingBoots_getRemainingRunaways),
  "getRunaways": () => (StompingBoots_getRunaways),
  "have": () => (StompingBoots_have),
  "prepareRunaway": () => (StompingBoots_prepareRunaway)
});

// NAMESPACE OBJECT: ./src/resources/2015/ChateauMantegna.ts
var ChateauMantegna_namespaceObject = {};
__webpack_require__.r(ChateauMantegna_namespaceObject);
__webpack_require__.d(ChateauMantegna_namespaceObject, {
  "ceilings": () => (ceilings),
  "changeCeiling": () => (changeCeiling),
  "changeDesk": () => (changeDesk),
  "changeNightstand": () => (changeNightstand),
  "desks": () => (desks),
  "fightPainting": () => (fightPainting),
  "getCeiling": () => (getCeiling),
  "getDesk": () => (getDesk),
  "getNightstand": () => (getNightstand),
  "have": () => (ChateauMantegna_have),
  "nightstands": () => (nightstands),
  "paintingFought": () => (paintingFought),
  "paintingMonster": () => (paintingMonster)
});

// NAMESPACE OBJECT: ./src/resources/2017/MummingTrunk.ts
var MummingTrunk_namespaceObject = {};
__webpack_require__.r(MummingTrunk_namespaceObject);
__webpack_require__.d(MummingTrunk_namespaceObject, {
  "currentCostumes": () => (currentCostumes)
});

// NAMESPACE OBJECT: ./src/challengePaths/2016/NuclearAutumn.ts
var NuclearAutumn_namespaceObject = {};
__webpack_require__.r(NuclearAutumn_namespaceObject);
__webpack_require__.d(NuclearAutumn_namespaceObject, {
  "chronoLab": () => (chronoLab),
  "coolingTank": () => (coolingTank),
  "spa": () => (spa)
});

// NAMESPACE OBJECT: ./src/counter.ts
var counter_namespaceObject = {};
__webpack_require__.r(counter_namespaceObject);
__webpack_require__.d(counter_namespaceObject, {
  "exists": () => (exists),
  "get": () => (counter_get),
  "set": () => (set)
});

// NAMESPACE OBJECT: ./src/resources/2015/MayoClinic.ts
var MayoClinic_namespaceObject = {};
__webpack_require__.r(MayoClinic_namespaceObject);
__webpack_require__.d(MayoClinic_namespaceObject, {
  "Mayo": () => (Mayo),
  "have": () => (MayoClinic_have),
  "installed": () => (MayoClinic_installed),
  "setMayoMinder": () => (setMayoMinder)
});

// NAMESPACE OBJECT: ./src/resources/2008/Stickers.ts
var Stickers_namespaceObject = {};
__webpack_require__.r(Stickers_namespaceObject);
__webpack_require__.d(Stickers_namespaceObject, {
  "currentStickers": () => (currentStickers),
  "foldWeapon": () => (foldWeapon),
  "have": () => (Stickers_have),
  "makeSword": () => (makeSword),
  "setStickers": () => (setStickers),
  "stickers": () => (stickers),
  "weapon": () => (weapon)
});

// NAMESPACE OBJECT: ./src/resources/2009/SpookyPutty.ts
var SpookyPutty_namespaceObject = {};
__webpack_require__.r(SpookyPutty_namespaceObject);
__webpack_require__.d(SpookyPutty_namespaceObject, {
  "getSpookyPuttySheetCopiesMade": () => (getSpookyPuttySheetCopiesMade),
  "getSpookyPuttySheetMonster": () => (getSpookyPuttySheetMonster),
  "have": () => (SpookyPutty_have),
  "prepareSpookyPuttySheet": () => (prepareSpookyPuttySheet),
  "sheet": () => (sheet),
  "useSpookyPuttySheet": () => (useSpookyPuttySheet)
});

// NAMESPACE OBJECT: ./src/resources/2010/CrownOfThrones.ts
var CrownOfThrones_namespaceObject = {};
__webpack_require__.r(CrownOfThrones_namespaceObject);
__webpack_require__.d(CrownOfThrones_namespaceObject, {
  "createRiderMode": () => (createRiderMode),
  "pickRider": () => (pickRider),
  "ridingFamiliars": () => (ridingFamiliars),
  "valueRider": () => (valueRider)
});

// NAMESPACE OBJECT: ./src/resources/2011/ObtuseAngel.ts
var ObtuseAngel_namespaceObject = {};
__webpack_require__.r(ObtuseAngel_namespaceObject);
__webpack_require__.d(ObtuseAngel_namespaceObject, {
  "BadlyRomanticArrow": () => (BadlyRomanticArrow),
  "canUseBadlyRomanticArrow": () => (canUseBadlyRomanticArrow),
  "couldUseBadlyRomanticArrow": () => (couldUseBadlyRomanticArrow),
  "familiar": () => (ObtuseAngel_familiar),
  "getBadlyRomanticArrowMonster": () => (getBadlyRomanticArrowMonster),
  "getBadlyRomanticArrowUses": () => (getBadlyRomanticArrowUses),
  "have": () => (ObtuseAngel_have),
  "haveBadlyRomanticArrowUsesRemaining": () => (haveBadlyRomanticArrowUsesRemaining),
  "prepareBadlyRomanticArrow": () => (prepareBadlyRomanticArrow)
});

// NAMESPACE OBJECT: ./src/resources/2012/RainDoh.ts
var RainDoh_namespaceObject = {};
__webpack_require__.r(RainDoh_namespaceObject);
__webpack_require__.d(RainDoh_namespaceObject, {
  "box": () => (box),
  "getRainDohBlackBoxCopiesMade": () => (getRainDohBlackBoxCopiesMade),
  "getRainDohBlackBoxMonster": () => (getRainDohBlackBoxMonster),
  "have": () => (RainDoh_have),
  "useRainDohBlackBox": () => (useRainDohBlackBox)
});

// NAMESPACE OBJECT: ./src/resources/2012/ReagnimatedGnome.ts
var ReagnimatedGnome_namespaceObject = {};
__webpack_require__.r(ReagnimatedGnome_namespaceObject);
__webpack_require__.d(ReagnimatedGnome_namespaceObject, {
  "bodyParts": () => (bodyParts),
  "choosePart": () => (choosePart),
  "chosenParts": () => (chosenParts),
  "expectedAdvsPerCombat": () => (expectedAdvsPerCombat),
  "have": () => (ReagnimatedGnome_have)
});

// NAMESPACE OBJECT: ./src/resources/2013/Florist.ts
var Florist_namespaceObject = {};
__webpack_require__.r(Florist_namespaceObject);
__webpack_require__.d(Florist_namespaceObject, {
  "AloeGuvnor": () => (AloeGuvnor),
  "ArcticMoss": () => (ArcticMoss),
  "Artichoker": () => (Artichoker),
  "BamBoo": () => (BamBoo),
  "BlusteryPuffball": () => (BlusteryPuffball),
  "CannedSpinach": () => (CannedSpinach),
  "CeleryStalker": () => (CeleryStalker),
  "Chillterelle": () => (Chillterelle),
  "Crookweed": () => (Crookweed),
  "DeadlyCinnamon": () => (DeadlyCinnamon),
  "DisLichen": () => (DisLichen),
  "Duckweed": () => (Duckweed),
  "ElectricEelgrass": () => (ElectricEelgrass),
  "FoulToadstool": () => (FoulToadstool),
  "HornOfPlenty": () => (HornOfPlenty),
  "Impatiens": () => (Impatiens),
  "Kelptomaniac": () => (Kelptomaniac),
  "LettuceSpray": () => (LettuceSpray),
  "LooseMorels": () => (LooseMorels),
  "MaxHeadshroom": () => (MaxHeadshroom),
  "OrcaOrchid": () => (OrcaOrchid),
  "PitcherPlant": () => (PitcherPlant),
  "Portlybella": () => (Portlybella),
  "RabidDogwood": () => (RabidDogwood),
  "RadishRadish": () => (RadishRadish),
  "RedFern": () => (RedFern),
  "Rutabeggar": () => (Rutabeggar),
  "Sargassum": () => (Sargassum),
  "SeltzerWatercress": () => (SeltzerWatercress),
  "ShuffleTruffle": () => (ShuffleTruffle),
  "SkunkCabbage": () => (SkunkCabbage),
  "SmokeRa": () => (SmokeRa),
  "Snori": () => (Snori),
  "Spankton": () => (Spankton),
  "SpiderPlant": () => (SpiderPlant),
  "StealingMagnolia": () => (StealingMagnolia),
  "SubSeaRose": () => (SubSeaRose),
  "UpSeaDaisy": () => (UpSeaDaisy),
  "WarLily": () => (WarLily),
  "WizardsWig": () => (WizardsWig),
  "all": () => (Florist_all),
  "flowersAvailableFor": () => (flowersAvailableFor),
  "flowersIn": () => (flowersIn),
  "have": () => (Florist_have),
  "isFull": () => (isFull)
});

// NAMESPACE OBJECT: ./src/resources/2014/CrimboShrub.ts
var CrimboShrub_namespaceObject = {};
__webpack_require__.r(CrimboShrub_namespaceObject);
__webpack_require__.d(CrimboShrub_namespaceObject, {
  "decorate": () => (decorate),
  "have": () => (CrimboShrub_have)
});

// NAMESPACE OBJECT: ./src/resources/2014/DNALab.ts
var DNALab_namespaceObject = {};
__webpack_require__.r(DNALab_namespaceObject);
__webpack_require__.d(DNALab_namespaceObject, {
  "getEffect": () => (DNALab_getEffect),
  "getTonic": () => (getTonic),
  "have": () => (DNALab_have),
  "hybridize": () => (hybridize),
  "installed": () => (DNALab_installed),
  "isHybridized": () => (isHybridized),
  "makeTonic": () => (makeTonic),
  "phylumFor": () => (phylumFor),
  "tonicsLeft": () => (tonicsLeft)
});

// NAMESPACE OBJECT: ./src/resources/2014/WinterGarden.ts
var WinterGarden_namespaceObject = {};
__webpack_require__.r(WinterGarden_namespaceObject);
__webpack_require__.d(WinterGarden_namespaceObject, {
  "UnfinishedIceSculpture": () => (UnfinishedIceSculpture),
  "couldUseUnfinishedIceSculpture": () => (couldUseUnfinishedIceSculpture),
  "getUnfinishedIceSculptureMonster": () => (getUnfinishedIceSculptureMonster),
  "have": () => (WinterGarden_have),
  "haveUnfinishedIceSculpture": () => (haveUnfinishedIceSculpture),
  "isUnfinishedIceSculptureUsed": () => (isUnfinishedIceSculptureUsed)
});

// NAMESPACE OBJECT: ./src/resources/2015/BarrelShrine.ts
var BarrelShrine_namespaceObject = {};
__webpack_require__.r(BarrelShrine_namespaceObject);
__webpack_require__.d(BarrelShrine_namespaceObject, {
  "have": () => (BarrelShrine_have),
  "smashParty": () => (smashParty)
});

// NAMESPACE OBJECT: ./src/resources/2015/Dinseylandfill.ts
var Dinseylandfill_namespaceObject = {};
__webpack_require__.r(Dinseylandfill_namespaceObject);
__webpack_require__.d(Dinseylandfill_namespaceObject, {
  "acceptQuest": () => (acceptQuest),
  "activeQuest": () => (activeQuest),
  "available": () => (available),
  "canFightWartDinsey": () => (canFightWartDinsey),
  "coasterNextTurn": () => (coasterNextTurn),
  "disposeGarbage": () => (disposeGarbage),
  "foughtWartDinseyThisLife": () => (foughtWartDinseyThisLife),
  "hasActiveQuest": () => (hasActiveQuest),
  "hasDisposedGarbage": () => (hasDisposedGarbage),
  "hasQuest": () => (hasQuest),
  "have": () => (Dinseylandfill_have),
  "keyCardsLocations": () => (keyCardsLocations),
  "questComplete": () => (questComplete),
  "quests": () => (quests),
  "turnInQuest": () => (turnInQuest)
});

// NAMESPACE OBJECT: ./src/resources/2016/SourceTerminal.ts
var SourceTerminal_namespaceObject = {};
__webpack_require__.r(SourceTerminal_namespaceObject);
__webpack_require__.d(SourceTerminal_namespaceObject, {
  "Buffs": () => (Buffs),
  "Digitize": () => (Digitize),
  "Items": () => (Items),
  "RolloverBuffs": () => (RolloverBuffs),
  "Skills": () => (Skills),
  "canDigitize": () => (canDigitize),
  "couldDigitize": () => (couldDigitize),
  "duplicateUsesRemaining": () => (duplicateUsesRemaining),
  "educate": () => (educate),
  "enhance": () => (enhance),
  "enhanceBuffDuration": () => (enhanceBuffDuration),
  "enhanceUsesRemaining": () => (enhanceUsesRemaining),
  "enquiry": () => (enquiry),
  "enquiryBuffDuration": () => (enquiryBuffDuration),
  "extrude": () => (extrude),
  "getChips": () => (getChips),
  "getDigitizeMonster": () => (getDigitizeMonster),
  "getDigitizeMonsterCount": () => (getDigitizeMonsterCount),
  "getDigitizeUses": () => (getDigitizeUses),
  "getDigitizeUsesRemaining": () => (getDigitizeUsesRemaining),
  "getDuplicateUses": () => (getDuplicateUses),
  "getEnhanceUses": () => (getEnhanceUses),
  "getMaximumDigitizeUses": () => (getMaximumDigitizeUses),
  "getPortscanUses": () => (getPortscanUses),
  "getSkills": () => (getSkills),
  "have": () => (SourceTerminal_have),
  "isCurrentSkill": () => (isCurrentSkill),
  "item": () => (item),
  "maximumDuplicateUses": () => (maximumDuplicateUses),
  "maximumEnhanceUses": () => (maximumEnhanceUses),
  "prepareDigitize": () => (prepareDigitize)
});

// NAMESPACE OBJECT: ./src/resources/2016/Witchess.ts
var Witchess_namespaceObject = {};
__webpack_require__.r(Witchess_namespaceObject);
__webpack_require__.d(Witchess_namespaceObject, {
  "fightPiece": () => (fightPiece),
  "fightsDone": () => (fightsDone),
  "have": () => (Witchess_have),
  "item": () => (Witchess_item),
  "pieces": () => (pieces)
});

// NAMESPACE OBJECT: ./src/resources/2017/Pantogram.ts
var Pantogram_namespaceObject = {};
__webpack_require__.r(Pantogram_namespaceObject);
__webpack_require__.d(Pantogram_namespaceObject, {
  "findRequirements": () => (findRequirements),
  "have": () => (Pantogram_have),
  "havePants": () => (havePants),
  "makePants": () => (makePants),
  "makePantsFromObject": () => (makePantsFromObject)
});

// NAMESPACE OBJECT: ./src/resources/2017/Robortender.ts
var Robortender_namespaceObject = {};
__webpack_require__.r(Robortender_namespaceObject);
__webpack_require__.d(Robortender_namespaceObject, {
  "currentDrinks": () => (currentDrinks),
  "drinks": () => (drinks),
  "dropChance": () => (dropChance),
  "dropFrom": () => (dropFrom),
  "familiar": () => (Robortender_familiar),
  "feed": () => (feed),
  "have": () => (Robortender_have),
  "majorDrinks": () => (majorDrinks),
  "minorDrinks": () => (minorDrinks)
});

// NAMESPACE OBJECT: ./src/resources/2017/Spacegate.ts
var Spacegate_namespaceObject = {};
__webpack_require__.r(Spacegate_namespaceObject);
__webpack_require__.d(Spacegate_namespaceObject, {
  "animalLife": () => (animalLife),
  "dial": () => (dial),
  "dialled": () => (dialled),
  "getHazardEquipment": () => (getHazardEquipment),
  "getVaccine": () => (getVaccine),
  "have": () => (Spacegate_have),
  "hazardEquipment": () => (hazardEquipment),
  "hazards": () => (hazards),
  "intelligentLife": () => (intelligentLife),
  "murderBots": () => (murderBots),
  "planetCoords": () => (planetCoords),
  "planetName": () => (planetName),
  "plantLife": () => (plantLife),
  "ruins": () => (ruins),
  "spants": () => (spants),
  "updateStatus": () => (updateStatus)
});

// NAMESPACE OBJECT: ./src/resources/2017/TunnelOfLove.ts
var TunnelOfLove_namespaceObject = {};
__webpack_require__.r(TunnelOfLove_namespaceObject);
__webpack_require__.d(TunnelOfLove_namespaceObject, {
  "LovEnamorang": () => (LovEnamorang),
  "couldUseLoveEnamorang": () => (couldUseLoveEnamorang),
  "fightAll": () => (fightAll),
  "getLovEnamorangMonster": () => (getLovEnamorangMonster),
  "getLovEnamorangUses": () => (getLovEnamorangUses),
  "have": () => (TunnelOfLove_have),
  "haveLovEnamorang": () => (haveLovEnamorang),
  "isUsed": () => (isUsed)
});

// NAMESPACE OBJECT: ./src/resources/2018/LatteLoversMembersMug.ts
var LatteLoversMembersMug_namespaceObject = {};
__webpack_require__.r(LatteLoversMembersMug_namespaceObject);
__webpack_require__.d(LatteLoversMembersMug_namespaceObject, {
  "have": () => (LatteLoversMembersMug_have),
  "refillsRemaining": () => (refillsRemaining),
  "sniffedMonster": () => (sniffedMonster)
});

// NAMESPACE OBJECT: ./src/resources/2018/SongBoom.ts
var SongBoom_namespaceObject = {};
__webpack_require__.r(SongBoom_namespaceObject);
__webpack_require__.d(SongBoom_namespaceObject, {
  "dropProgress": () => (dropProgress),
  "have": () => (SongBoom_have),
  "item": () => (SongBoom_item),
  "setSong": () => (setSong),
  "song": () => (song),
  "songBoomSongs": () => (songBoomSongs),
  "songChangesLeft": () => (songChangesLeft)
});

// NAMESPACE OBJECT: ./src/resources/2019/BeachComb.ts
var BeachComb_namespaceObject = {};
__webpack_require__.r(BeachComb_namespaceObject);
__webpack_require__.d(BeachComb_namespaceObject, {
  "headBuffs": () => (headBuffs),
  "tryHead": () => (tryHead)
});

// NAMESPACE OBJECT: ./src/resources/2019/Snapper.ts
var Snapper_namespaceObject = {};
__webpack_require__.r(Snapper_namespaceObject);
__webpack_require__.d(Snapper_namespaceObject, {
  "getProgress": () => (getProgress),
  "getTrackedPhylum": () => (getTrackedPhylum),
  "have": () => (Snapper_have),
  "itemPhylum": () => (itemPhylum),
  "phylumItem": () => (phylumItem),
  "trackPhylum": () => (trackPhylum)
});

// NAMESPACE OBJECT: ./src/resources/2020/Cartography.ts
var Cartography_namespaceObject = {};
__webpack_require__.r(Cartography_namespaceObject);
__webpack_require__.d(Cartography_namespaceObject, {
  "have": () => (Cartography_have),
  "mapMonster": () => (mapMonster),
  "passive": () => (passive),
  "skill": () => (skill)
});

// NAMESPACE OBJECT: ./src/resources/2020/Guzzlr.ts
var Guzzlr_namespaceObject = {};
__webpack_require__.r(Guzzlr_namespaceObject);
__webpack_require__.d(Guzzlr_namespaceObject, {
  "Cocktails": () => (Cocktails),
  "abandon": () => (abandon),
  "acceptBronze": () => (acceptBronze),
  "acceptGold": () => (acceptGold),
  "acceptPlatinum": () => (acceptPlatinum),
  "canAbandon": () => (canAbandon),
  "canGold": () => (canGold),
  "canPlatinum": () => (canPlatinum),
  "expectedReward": () => (expectedReward),
  "getBooze": () => (getBooze),
  "getBronze": () => (getBronze),
  "getCheapestPlatinumCocktail": () => (getCheapestPlatinumCocktail),
  "getGold": () => (getGold),
  "getGoldToday": () => (getGoldToday),
  "getLocation": () => (Guzzlr_getLocation),
  "getPlatinum": () => (getPlatinum),
  "getPlatinumToday": () => (getPlatinumToday),
  "getTier": () => (getTier),
  "have": () => (Guzzlr_have),
  "haveBooze": () => (haveBooze),
  "haveFullBronzeBonus": () => (haveFullBronzeBonus),
  "haveFullGoldBonus": () => (haveFullGoldBonus),
  "haveFullPlatinumBonus": () => (haveFullPlatinumBonus),
  "havePlatinumBooze": () => (havePlatinumBooze),
  "ingredientToPlatinumCocktail": () => (ingredientToPlatinumCocktail),
  "isQuestActive": () => (isQuestActive),
  "item": () => (Guzzlr_item),
  "platinumCocktailToIngredient": () => (platinumCocktailToIngredient),
  "turnsLeftOnQuest": () => (turnsLeftOnQuest)
});

// NAMESPACE OBJECT: ./src/resources/2020/RetroCape.ts
var RetroCape_namespaceObject = {};
__webpack_require__.r(RetroCape_namespaceObject);
__webpack_require__.d(RetroCape_namespaceObject, {
  "currentHero": () => (currentHero),
  "currentMode": () => (currentMode),
  "getModifier": () => (getModifier),
  "have": () => (RetroCape_have),
  "item": () => (RetroCape_item),
  "set": () => (RetroCape_set),
  "tuneToSkill": () => (tuneToSkill)
});

// NAMESPACE OBJECT: ./src/resources/2021/CrystalBall.ts
var CrystalBall_namespaceObject = {};
__webpack_require__.r(CrystalBall_namespaceObject);
__webpack_require__.d(CrystalBall_namespaceObject, {
  "have": () => (CrystalBall_have),
  "orb": () => (orb),
  "ponder": () => (ponder)
});

// NAMESPACE OBJECT: ./src/resources/2021/DaylightShavings.ts
var DaylightShavings_namespaceObject = {};
__webpack_require__.r(DaylightShavings_namespaceObject);
__webpack_require__.d(DaylightShavings_namespaceObject, {
  "buffAvailable": () => (buffAvailable),
  "buffCycle": () => (buffCycle),
  "buffs": () => (buffs),
  "buffsUntil": () => (buffsUntil),
  "hasBuff": () => (hasBuff),
  "have": () => (DaylightShavings_have),
  "helmet": () => (helmet),
  "nextBuff": () => (nextBuff)
});

// NAMESPACE OBJECT: ./src/resources/2022/AutumnAton.ts
var AutumnAton_namespaceObject = {};
__webpack_require__.r(AutumnAton_namespaceObject);
__webpack_require__.d(AutumnAton_namespaceObject, {
  "available": () => (AutumnAton_available),
  "availableLocations": () => (availableLocations),
  "currentUpgrades": () => (currentUpgrades),
  "currentlyIn": () => (currentlyIn),
  "have": () => (AutumnAton_have),
  "item": () => (AutumnAton_item),
  "possibleUpgrades": () => (possibleUpgrades),
  "seasonalItems": () => (seasonalItems),
  "sendTo": () => (sendTo),
  "turnsForQuest": () => (turnsForQuest),
  "turnsLeft": () => (turnsLeft),
  "upgrade": () => (upgrade),
  "visualAcuity": () => (visualAcuity),
  "zoneItems": () => (zoneItems)
});

// NAMESPACE OBJECT: ./src/resources/2022/CombatLoversLocket.ts
var CombatLoversLocket_namespaceObject = {};
__webpack_require__.r(CombatLoversLocket_namespaceObject);
__webpack_require__.d(CombatLoversLocket_namespaceObject, {
  "availableLocketMonsters": () => (availableLocketMonsters),
  "findMonster": () => (findMonster),
  "have": () => (CombatLoversLocket_have),
  "locket": () => (locket),
  "monstersReminisced": () => (monstersReminisced),
  "reminisce": () => (reminisce),
  "reminiscesLeft": () => (reminiscesLeft),
  "unlockedLocketMonsters": () => (unlockedLocketMonsters)
});

// NAMESPACE OBJECT: ./src/resources/2022/GreyGoose.ts
var GreyGoose_namespaceObject = {};
__webpack_require__.r(GreyGoose_namespaceObject);
__webpack_require__.d(GreyGoose_namespaceObject, {
  "currentDrones": () => (currentDrones),
  "currentExperience": () => (currentExperience),
  "currentWeight": () => (currentWeight),
  "expectedDrones": () => (expectedDrones),
  "expectedExperience": () => (expectedExperience),
  "expectedMeat": () => (expectedMeat),
  "fightsUntil": () => (fightsUntil),
  "goose": () => (goose),
  "hasMeatified": () => (hasMeatified),
  "have": () => (GreyGoose_have)
});

// NAMESPACE OBJECT: ./src/resources/2022/JuneCleaver.ts
var JuneCleaver_namespaceObject = {};
__webpack_require__.r(JuneCleaver_namespaceObject);
__webpack_require__.d(JuneCleaver_namespaceObject, {
  "choices": () => (choices),
  "choicesAvailable": () => (choicesAvailable),
  "cleaver": () => (cleaver),
  "damage": () => (damage),
  "getInterval": () => (getInterval),
  "getSkippedInterval": () => (getSkippedInterval),
  "have": () => (JuneCleaver_have),
  "queue": () => (queue),
  "skipsRemaining": () => (skipsRemaining)
});

// NAMESPACE OBJECT: ./src/console.ts
var console_namespaceObject = {};
__webpack_require__.r(console_namespaceObject);
__webpack_require__.d(console_namespaceObject, {
  "error": () => (error),
  "info": () => (info),
  "log": () => (log),
  "warn": () => (warn)
});

// NAMESPACE OBJECT: ./src/dungeons/Dreadsylvania.ts
var Dreadsylvania_namespaceObject = {};
__webpack_require__.r(Dreadsylvania_namespaceObject);
__webpack_require__.d(Dreadsylvania_namespaceObject, {
  "close": () => (Dreadsylvania_close),
  "distribute": () => (Dreadsylvania_distribute),
  "findLoot": () => (Dreadsylvania_findLoot),
  "open": () => (Dreadsylvania_open)
});

// NAMESPACE OBJECT: ./src/dungeons/Hobopolis.ts
var Hobopolis_namespaceObject = {};
__webpack_require__.r(Hobopolis_namespaceObject);
__webpack_require__.d(Hobopolis_namespaceObject, {
  "close": () => (Hobopolis_close),
  "distribute": () => (Hobopolis_distribute),
  "findLoot": () => (Hobopolis_findLoot),
  "open": () => (Hobopolis_open)
});

// NAMESPACE OBJECT: ./src/dungeons/SlimeTube.ts
var SlimeTube_namespaceObject = {};
__webpack_require__.r(SlimeTube_namespaceObject);
__webpack_require__.d(SlimeTube_namespaceObject, {
  "close": () => (SlimeTube_close),
  "distribute": () => (SlimeTube_distribute),
  "findLoot": () => (SlimeTube_findLoot),
  "open": () => (SlimeTube_open)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(6737);
// EXTERNAL MODULE: ./node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(1755);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(5809);
;// CONCATENATED MODULE: ./src/propertyTypes.ts
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"];
var numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarElbowNC", "lastFriarHeartNC", "lastFriarNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_speakeasyFreeFights", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./src/propertyTyping.ts

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
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
;// CONCATENATED MODULE: ./src/property.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_namespaceObject.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.none ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Bounty, external_kolmafia_namespaceObject.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Class, external_kolmafia_namespaceObject.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Coinmaster, external_kolmafia_namespaceObject.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Effect, external_kolmafia_namespaceObject.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Element, external_kolmafia_namespaceObject.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Familiar, external_kolmafia_namespaceObject.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Item, external_kolmafia_namespaceObject.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Location, external_kolmafia_namespaceObject.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Monster, external_kolmafia_namespaceObject.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Phylum, external_kolmafia_namespaceObject.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Servant, external_kolmafia_namespaceObject.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Skill, external_kolmafia_namespaceObject.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Slot, external_kolmafia_namespaceObject.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Stat, external_kolmafia_namespaceObject.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Thrall, external_kolmafia_namespaceObject.toThrall);
/**
 * Returns the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param _default Default value for the property to take if not set
 */

function get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_namespaceObject.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
}
/**
 * Sets the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param value Value to give the property
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_namespaceObject.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        _value = _Object$entries$_i[1];

    _set(prop, _value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

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
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

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
    value: function setChoice(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var _property = _properties[_i3];
        var _value2 = this.properties[_property];

        if (_value2) {
          _set(_property, _value2);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var _property2 = _properties2[_i4];

        if (this.properties[_property2]) {
          delete this.properties[_property2];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
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
    value: function setMinimumValue(property, value) {
      if (get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     * @returns A new PropertiesManager, with identical stored values to this one.
     */

  }, {
    key: "clone",
    value: function clone() {
      var newGuy = new PropertiesManager();
      newGuy.properties = this.storedValues;
      return newGuy;
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
    value: function clamp(property, min, max) {
      if (max < min) return false;
      var start = get(property);
      this.setMinimumValue(property, min);
      this.setMaximumValue(property, max);
      return start !== get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */

  }, {
    key: "equals",
    value: function equals(other) {
      var thisProps = Object.entries(this.storedValues);
      var otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size) return false;

      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2),
            propertyName = _thisProps$_i[0],
            propertyValue = _thisProps$_i[1];

        if (otherProps.get(propertyName) === propertyValue) return false;
      }

      return true;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var newGuy = new PropertiesManager();
      newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties);
      return newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */

  }], [{
    key: "merge",
    value: function merge() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        mergees[_key3] = arguments[_key3];
      }

      if (mergees.length === 0) return new PropertiesManager();
      return mergees.reduce((a, b) => a.merge(b));
    }
  }]);

  return PropertiesManager;
}();
;// CONCATENATED MODULE: ./src/utils.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
    var _ref5 = utils_slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = _createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = utils_slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
/**
 * Creates a Type Guard function for a string union type defined via an array as const.
 */

function createStringUnionTypeGuardFunction(array) {
  return function (x) {
    return array.includes(x);
  };
}
/**
 * Splits a string by commas while also respecting escaping commas with a backslash
 * @param str String to split
 * @returns List of tokens
 */

function splitByCommasWithEscapes(str) {
  var returnValue = [];
  var ignoreNext = false;
  var currentString = "";

  var _iterator2 = _createForOfIteratorHelper(str.split("")),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var char = _step2.value;

      if (char === "\\") {
        ignoreNext = true;
      } else {
        if (char == "," && !ignoreNext) {
          returnValue.push(currentString.trim());
          currentString = "";
        } else {
          currentString += char;
        }

        ignoreNext = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  returnValue.push(currentString.trim());
  return returnValue;
}
;// CONCATENATED MODULE: ./src/template-string.ts



var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.raw.reduce((acc, literal, i) => {
    var _placeholders$i;

    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
};

var createSingleConstant = Type => {
  var tagFunction = function tagFunction(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      placeholders[_key2 - 1] = arguments[_key2];
    }

    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };

  tagFunction.none = Type.none;
  return tagFunction;
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(splitByCommasWithEscapes(input));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(external_kolmafia_namespaceObject.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_namespaceObject.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_namespaceObject.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_namespaceObject.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_namespaceObject.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_namespaceObject.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var $familiar = createSingleConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var $item = createSingleConstant(external_kolmafia_namespaceObject.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var $items = createPluralConstant(external_kolmafia_namespaceObject.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(external_kolmafia_namespaceObject.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_namespaceObject.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A Path specified by name.
 *
 * @category In-game constant
 */

var $path = createSingleConstant(external_kolmafia_namespaceObject.Path);
/**
 * A list of Paths specified by a comma-separated list of names.
 * For a list of all possible Paths, leave the template string blank.
 *
 * @category In-game constant
 */

var $paths = createPluralConstant(external_kolmafia_namespaceObject.Path);
;// CONCATENATED MODULE: ./src/lib.ts
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;

function lib_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lib_createClass(Constructor, protoProps, staticProps) { if (protoProps) lib_defineProperties(Constructor.prototype, protoProps); if (staticProps) lib_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function lib_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_slicedToArray(arr, i) { return lib_arrayWithHoles(arr) || lib_iterableToArrayLimit(arr, i) || lib_unsupportedIterableToArray(arr, i) || lib_nonIterableRest(); }

function lib_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function lib_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + ((0,external_kolmafia_namespaceObject.booleanModifier)("Four Songs") ? 1 : 0) + (0,external_kolmafia_namespaceObject.numericModifier)("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof external_kolmafia_namespaceObject.Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof external_kolmafia_namespaceObject.Effect ? (0,external_kolmafia_namespaceObject.toSkill)(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).map(e => external_kolmafia_namespaceObject.Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return external_kolmafia_namespaceObject.Location.all().filter(location => monster.name in (0,external_kolmafia_namespaceObject.appearanceRates)(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return (0,external_kolmafia_namespaceObject.inebrietyLimit)() - (0,external_kolmafia_namespaceObject.myInebriety)();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return (0,external_kolmafia_namespaceObject.fullnessLimit)() - (0,external_kolmafia_namespaceObject.myFullness)();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return (0,external_kolmafia_namespaceObject.spleenLimit)() - (0,external_kolmafia_namespaceObject.mySpleenUse)();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return (0,external_kolmafia_namespaceObject.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return (0,external_kolmafia_namespaceObject.haveFamiliar)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return (0,external_kolmafia_namespaceObject.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Servant) {
    return (0,external_kolmafia_namespaceObject.haveServant)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Skill) {
    return (0,external_kolmafia_namespaceObject.haveSkill)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Thrall) {
    var thrall = (0,external_kolmafia_namespaceObject.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys((0,external_kolmafia_namespaceObject.getCampground)()).map(i => external_kolmafia_namespaceObject.Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return (0,external_kolmafia_namespaceObject.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() % 11 === 1 && get("lastVoteMonsterTurn") < (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer === Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = get("_sausageFights");
  var lastFight = get("_lastSausageMonsterTurn");
  var totalTurns = (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,external_kolmafia_namespaceObject.myTurncount)() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.max(0, fights - 5) ** 3));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - (0,external_kolmafia_namespaceObject.myTurncount)();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return (0,external_kolmafia_namespaceObject.myFamiliar)() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries((0,external_kolmafia_namespaceObject.getRelated)(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = lib_slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = lib_slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = lib_slicedToArray(_ref5, 1),
        i = _ref6[0];

    return external_kolmafia_namespaceObject.Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys((0,external_kolmafia_namespaceObject.getRelated)(item, "zap")).map(i => external_kolmafia_namespaceObject.Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = chunk(get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = lib_createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = lib_slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = (0,external_kolmafia_namespaceObject.toItem)(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set($skill(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if (banisher.toLowerCase() === "nanorhino") {
        result.set($skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Unleash Nanites"]))), external_kolmafia_namespaceObject.Monster.get(foe));
      } else if ([external_kolmafia_namespaceObject.Item.none, external_kolmafia_namespaceObject.Item.get("training scroll:  Snokebomb"), external_kolmafia_namespaceObject.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (external_kolmafia_namespaceObject.Skill.get(banisher) === $skill.none) {
          break;
        } else {
          result.set(external_kolmafia_namespaceObject.Skill.get(banisher), external_kolmafia_namespaceObject.Monster.get(foe));
        }
      } else {
        result.set(banisherItem, external_kolmafia_namespaceObject.Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = (0,external_kolmafia_namespaceObject.myPath)();

  if (path !== external_kolmafia_namespaceObject.Path.get("Nuclear Autumn")) {
    if ($items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === external_kolmafia_namespaceObject.Path.get("G-Lover")) {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === external_kolmafia_namespaceObject.Path.get("Bees Hate You")) {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return thing === external_kolmafia_namespaceObject.Effect.none ? null : thing;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return thing === external_kolmafia_namespaceObject.Familiar.none ? null : thing;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return thing === external_kolmafia_namespaceObject.Item.none ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = lib_slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return (0,external_kolmafia_namespaceObject.cliExecute)("uneffect ".concat(effect.name));
}

/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */
function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt((0,external_kolmafia_namespaceObject.getPlayerId)(idOrName));
  return {
    name: (0,external_kolmafia_namespaceObject.getPlayerName)(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause, reason) {
    var _this;

    lib_classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : ""));
    _this.name = "Ensure Error";
    return _this;
  }

  return lib_createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 *
 * @throws {EnsureError} Throws an error if the effect cannot be guaranteed
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) < turns) {
    if (ef.default === null) {
      throw new EnsureError(ef, "No default action");
    }

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > Math.max(2 * (0,external_kolmafia_namespaceObject.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : (0,external_kolmafia_namespaceObject.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,external_kolmafia_namespaceObject.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,external_kolmafia_namespaceObject.mallPrice)(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};

/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */
function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) {
    return (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Leprechaun Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var meatBonus = (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Meat Drop", 1, $item.none);
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === $familiar(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) {
    return (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Fairy Effectiveness", 1, $item.none);
  }

  if (familiar === $familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Reanimated Reanimator"])))) return 0;
  var itemBonus = (0,external_kolmafia_namespaceObject.numericModifier)(familiar, "Item Drop", 1, $item.none);
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,external_kolmafia_namespaceObject.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !((0,external_kolmafia_namespaceObject.currentRound)() || (0,external_kolmafia_namespaceObject.inMultiFight)() || (0,external_kolmafia_namespaceObject.choiceFollowsFight)() || (0,external_kolmafia_namespaceObject.handlingChoice)());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = (0,external_kolmafia_namespaceObject.elementalResistance)(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}
var telescopeStats = new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]);
var telescopeElements = new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap1 = new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap2 = new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]);
var hedgeTrap3 = new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
/**
 * @returns An object with all information the telescope gives you about the sorceress's contests and maze
 */

function telescope() {
  return {
    statContest: telescopeStats.get(get("telescope1")),
    elementContest: telescopeElements.get(get("telescope2")),
    hedge1: hedgeTrap1.get(get("telescope3")),
    hedge2: hedgeTrap2.get(get("telescope4")),
    hedge3: hedgeTrap3.get(get("telescope5"))
  };
}
;// CONCATENATED MODULE: ./src/combat.ts
var combat_templateObject, combat_templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = combat_getPrototypeOf(object); if (object === null) break; } return object; }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function combat_toConsumableArray(arr) { return combat_arrayWithoutHoles(arr) || combat_iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || combat_nonIterableSpread(); }

function combat_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function combat_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function combat_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) combat_setPrototypeOf(subClass, superClass); }

function combat_createSuper(Derived) { var hasNativeReflectConstruct = combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return combat_possibleConstructorReturn(this, result); }; }

function combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return combat_assertThisInitialized(self); }

function combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combat_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; combat_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !combat_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return combat_construct(Class, arguments, combat_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return combat_setPrototypeOf(Wrapper, Class); }; return combat_wrapNativeSuper(Class); }

function combat_construct(Parent, args, Class) { if (combat_isNativeReflectConstruct()) { combat_construct = Reflect.construct; } else { combat_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) combat_setPrototypeOf(instance, Class.prototype); return instance; }; } return combat_construct.apply(null, arguments); }

function combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function combat_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function combat_setPrototypeOf(o, p) { combat_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return combat_setPrototypeOf(o, p); }

function combat_getPrototypeOf(o) { combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return combat_getPrototypeOf(o); }

function combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = $items(combat_templateObject || (combat_templateObject = combat_taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = $skills(combat_templateObject2 || (combat_templateObject2 = combat_taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,external_kolmafia_namespaceObject.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  combat_inherits(InvalidMacroError, _Error);

  var _super = combat_createSuper(InvalidMacroError);

  function InvalidMacroError() {
    combat_classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return combat_createClass(InvalidMacroError);
}( /*#__PURE__*/combat_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    combat_classCallCheck(this, Macro);

    combat_defineProperty(this, "components", []);

    combat_defineProperty(this, "name", MACRO_NAME);
  }

  combat_createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return (this.components.join(";") + ";").replace(/;;+/g, ";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      _set(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref, _this$components;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, combat_toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      (_this$components = this.components).push.apply(_this$components, combat_toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));

      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat((0,external_kolmafia_namespaceObject.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.name), "&macrotext=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      return this.step("if ".concat(Macro.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifNot",
    value:
    /**
     * Add an "if" statement to this macro, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function ifNot(condition, ifTrue) {
      return this.step("if !(".concat(Macro.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, combat_toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, combat_toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, combat_toConsumableArray(get(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = combat_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
          Macro.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function makeBALLSPredicate(condition) {
      var ballsCondition = "";

      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function ifNot(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

combat_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

combat_defineProperty(Macro, "cachedMacroIds", new Map());

combat_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  (0,external_kolmafia_namespaceObject.setAutoAttack)(0);

  try {
    (0,external_kolmafia_namespaceObject.adv1)(loc, 0, "");

    while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
      (0,external_kolmafia_namespaceObject.runCombat)();
    }

    if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    (0,external_kolmafia_namespaceObject.adv1)(loc, 0, "");

    while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
      (0,external_kolmafia_namespaceObject.runCombat)();
    }

    if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/function (_Macro) {
  combat_inherits(StrictMacro, _Macro);

  var _super2 = combat_createSuper(StrictMacro);

  function StrictMacro() {
    combat_classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  combat_createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(combat_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(combat_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(combat_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro);
;// CONCATENATED MODULE: ./src/logger.ts
function logger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function logger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function logger_createClass(Constructor, protoProps, staticProps) { if (protoProps) logger_defineProperties(Constructor.prototype, protoProps); if (staticProps) logger_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function logger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,external_kolmafia_namespaceObject.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,external_kolmafia_namespaceObject.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    logger_classCallCheck(this, Logger);

    logger_defineProperty(this, "handlers", defaultHandlers);
  }

  logger_createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    }
  }, {
    key: "log",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const logger = (new Logger());
;// CONCATENATED MODULE: ./src/maximize.ts
var maximize_templateObject, maximize_templateObject2, maximize_templateObject3, maximize_templateObject4, maximize_templateObject5, maximize_templateObject6, maximize_templateObject7, maximize_templateObject8, maximize_templateObject9, maximize_templateObject10, maximize_templateObject11, maximize_templateObject12, maximize_templateObject13, maximize_templateObject14, maximize_templateObject15, maximize_templateObject16, maximize_templateObject17, maximize_templateObject18, maximize_templateObject19, maximize_templateObject20, maximize_templateObject21, maximize_templateObject22, maximize_templateObject23, maximize_templateObject24, maximize_templateObject25, maximize_templateObject26, maximize_templateObject27, maximize_templateObject28, maximize_templateObject29, maximize_templateObject30, maximize_templateObject31, maximize_templateObject32, maximize_templateObject33, maximize_templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;

function maximize_slicedToArray(arr, i) { return maximize_arrayWithHoles(arr) || maximize_iterableToArrayLimit(arr, i) || maximize_unsupportedIterableToArray(arr, i) || maximize_nonIterableRest(); }

function maximize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function maximize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function maximize_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function maximize_createClass(Constructor, protoProps, staticProps) { if (protoProps) maximize_defineProperties(Constructor.prototype, protoProps); if (staticProps) maximize_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function maximize_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maximize_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = maximize_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function maximize_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function maximize_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function maximize_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? maximize_ownKeys(Object(source), !0).forEach(function (key) { maximize_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : maximize_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function maximize_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maximize_toConsumableArray(arr) { return maximize_arrayWithoutHoles(arr) || maximize_iterableToArray(arr) || maximize_unsupportedIterableToArray(arr) || maximize_nonIterableSpread(); }

function maximize_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return maximize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return maximize_arrayLikeToArray(o, minLen); }

function maximize_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function maximize_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return maximize_arrayLikeToArray(arr); }

function maximize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */
function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(maximize_toConsumableArray(defaultOptions.forceEquip), maximize_toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(maximize_toConsumableArray(defaultOptions.preventEquip), maximize_toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(maximize_toConsumableArray(defaultOptions.bonusEquip), maximize_toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(maximize_toConsumableArray(defaultOptions.preventSlot), maximize_toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: maximize_objectSpread(maximize_objectSpread({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: false,
  modes: {}
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
}
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"];
var modeableItems = {
  backupcamera: $item(maximize_templateObject || (maximize_templateObject = maximize_taggedTemplateLiteral(["backup camera"]))),
  umbrella: $item(maximize_templateObject2 || (maximize_templateObject2 = maximize_taggedTemplateLiteral(["unbreakable umbrella"]))),
  snowsuit: $item(maximize_templateObject3 || (maximize_templateObject3 = maximize_taggedTemplateLiteral(["Snow Suit"]))),
  edpiece: $item(maximize_templateObject4 || (maximize_templateObject4 = maximize_taggedTemplateLiteral(["The Crown of Ed the Undying"]))),
  retrocape: $item(maximize_templateObject5 || (maximize_templateObject5 = maximize_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
  parka: $item(maximize_templateObject6 || (maximize_templateObject6 = maximize_taggedTemplateLiteral(["Jurassic Parka"])))
};
var modeableState = {
  backupcamera: () => (0,external_kolmafia_namespaceObject.getProperty)("backupCameraMode"),
  umbrella: () => (0,external_kolmafia_namespaceObject.getProperty)("umbrellaState"),
  snowsuit: () => (0,external_kolmafia_namespaceObject.getProperty)("snowsuit"),
  edpiece: () => (0,external_kolmafia_namespaceObject.getProperty)("edPiece"),
  retrocape: () => (0,external_kolmafia_namespaceObject.getProperty)("retroCapeSuperhero") + " " + (0,external_kolmafia_namespaceObject.getProperty)("retroCapeWashingInstructions"),
  parka: () => (0,external_kolmafia_namespaceObject.getProperty)("parkaMode")
};
function getCurrentModes() {
  var modes = {};

  var _iterator = maximize_createForOfIteratorHelper(modeableCommands),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[key])) {
        modes[key] = modeableState[key]();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return modes;
}
function applyModes(modes) {
  var _iterator2 = maximize_createForOfIteratorHelper(modeableCommands),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var command = _step2.value;

      if ((0,external_kolmafia_namespaceObject.haveEquipped)(modeableItems[command])) {
        if (modeableState[command]() !== modes[command]) {
          (0,external_kolmafia_namespaceObject.cliExecute)(command + " " + modes[command]);
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
} // Subset of slots that are valid for caching.

var cachedSlots = $slots(maximize_templateObject7 || (maximize_templateObject7 = maximize_taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = /*#__PURE__*/maximize_createClass(function CacheEntry(equipment, rider, familiar, canEquipItemCount, modes) {
  maximize_classCallCheck(this, CacheEntry);

  maximize_defineProperty(this, "equipment", void 0);

  maximize_defineProperty(this, "rider", void 0);

  maximize_defineProperty(this, "familiar", void 0);

  maximize_defineProperty(this, "canEquipItemCount", void 0);

  maximize_defineProperty(this, "modes", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
  this.modes = modes;
});

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    maximize_classCallCheck(this, OutfitLRUCache);

    _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _useHistory, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _maxSize, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  maximize_createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


maximize_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,external_kolmafia_namespaceObject.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = $stats(maximize_templateObject8 || (maximize_templateObject8 = maximize_taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,external_kolmafia_namespaceObject.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = external_kolmafia_namespaceObject.Item.all().filter(item => (0,external_kolmafia_namespaceObject.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,external_kolmafia_namespaceObject.myFamiliar)() !== entry.familiar) {
    logger.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    logger.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,external_kolmafia_namespaceObject.isWearingOutfit)(outfitName)) {
      (0,external_kolmafia_namespaceObject.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get($slot(maximize_templateObject9 || (maximize_templateObject9 = maximize_taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,external_kolmafia_namespaceObject.equip)($slot(maximize_templateObject10 || (maximize_templateObject10 = maximize_taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = maximize_createForOfIteratorHelper(entry.equipment),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = maximize_slicedToArray(_step3.value, 2),
            slot = _step3$value[0],
            item = _step3$value[1];

        if ((0,external_kolmafia_namespaceObject.equippedItem)(slot) !== item && (0,external_kolmafia_namespaceObject.availableAmount)(item) > 0) {
          (0,external_kolmafia_namespaceObject.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      logger.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(maximize_templateObject11 || (maximize_templateObject11 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get($item(maximize_templateObject12 || (maximize_templateObject12 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,external_kolmafia_namespaceObject.enthroneFamiliar)(entry.rider.get($item(maximize_templateObject13 || (maximize_templateObject13 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) || $familiar.none);
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(maximize_templateObject14 || (maximize_templateObject14 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(maximize_templateObject15 || (maximize_templateObject15 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,external_kolmafia_namespaceObject.bjornifyFamiliar)(entry.rider.get($item(maximize_templateObject16 || (maximize_templateObject16 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) || $familiar.none);
  }

  applyModes(maximize_objectSpread(maximize_objectSpread({}, entry.modes), options.modes));
}

var slotStructure = [$slots(maximize_templateObject17 || (maximize_templateObject17 = maximize_taggedTemplateLiteral(["hat"]))), $slots(maximize_templateObject18 || (maximize_templateObject18 = maximize_taggedTemplateLiteral(["back"]))), $slots(maximize_templateObject19 || (maximize_templateObject19 = maximize_taggedTemplateLiteral(["shirt"]))), $slots(maximize_templateObject20 || (maximize_templateObject20 = maximize_taggedTemplateLiteral(["weapon, off-hand"]))), $slots(maximize_templateObject21 || (maximize_templateObject21 = maximize_taggedTemplateLiteral(["pants"]))), $slots(maximize_templateObject22 || (maximize_templateObject22 = maximize_taggedTemplateLiteral(["acc1, acc2, acc3"]))), $slots(maximize_templateObject23 || (maximize_templateObject23 = maximize_taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator4 = maximize_createForOfIteratorHelper(slotStructure),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var slotGroup = _step4.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = maximize_slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = maximize_slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = maximize_slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,external_kolmafia_namespaceObject.equippedItem)(slot);
      });

      if (!setEqual(desiredSet, equippedSet)) {
        logger.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(maximize_templateObject24 || (maximize_templateObject24 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get($item(maximize_templateObject25 || (maximize_templateObject25 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get($item(maximize_templateObject26 || (maximize_templateObject26 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)()) {
      logger.warning("Failed to apply ".concat(entry.rider.get($item(maximize_templateObject27 || (maximize_templateObject27 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat($item(maximize_templateObject28 || (maximize_templateObject28 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(maximize_templateObject29 || (maximize_templateObject29 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(maximize_templateObject30 || (maximize_templateObject30 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get($item(maximize_templateObject31 || (maximize_templateObject31 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,external_kolmafia_namespaceObject.myBjornedFamiliar)()) {
      logger.warning("Failed to apply".concat(entry.rider.get($item(maximize_templateObject32 || (maximize_templateObject32 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat($item(maximize_templateObject33 || (maximize_templateObject33 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator5 = maximize_createForOfIteratorHelper(cachedSlots),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0,external_kolmafia_namespaceObject.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(maximize_templateObject34 || (maximize_templateObject34 = maximize_taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set($slot(_templateObject35 || (_templateObject35 = maximize_taggedTemplateLiteral(["card-sleeve"]))), (0,external_kolmafia_namespaceObject.equippedItem)($slot(_templateObject36 || (_templateObject36 = maximize_taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(_templateObject37 || (_templateObject37 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set($item(_templateObject38 || (_templateObject38 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), (0,external_kolmafia_namespaceObject.myEnthronedFamiliar)());
  }

  if ((0,external_kolmafia_namespaceObject.equippedAmount)($item(_templateObject39 || (_templateObject39 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set($item(_templateObject40 || (_templateObject40 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), (0,external_kolmafia_namespaceObject.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = maximize_createForOfIteratorHelper(options.preventSlot),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    if (options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete($item(_templateObject42 || (_templateObject42 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete($item(_templateObject44 || (_templateObject44 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = maximize_createForOfIteratorHelper(external_kolmafia_namespaceObject.Slot.all()),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var _slot = _step7.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (!options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete($item(_templateObject46 || (_templateObject46 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete($item(_templateObject48 || (_templateObject48 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,external_kolmafia_namespaceObject.myFamiliar)(), canEquipItemCount(), maximize_objectSpread(maximize_objectSpread({}, getCurrentModes()), options.modes));
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot,
      forceUpdate = fullOptions.forceUpdate; // Sort each group in objective to ensure consistent ordering in string

  var objective = maximize_toConsumableArray(new Set([].concat(maximize_toConsumableArray(objectives.sort()), maximize_toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), maximize_toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), maximize_toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), maximize_toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), maximize_toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = maximize_slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = maximize_slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())))).join(", "); // Items equipped in slots not touched by the maximizer must be in the cache key


  var untouchedSlots = cachedSlots.filter(slot => preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot));
  var cacheKey = [objective].concat(maximize_toConsumableArray(untouchedSlots.map(slot => "".concat(slot, ":").concat((0,external_kolmafia_namespaceObject.equippedItem)(slot))).sort())).join("; ");
  var cacheEntry = checkCache(cacheKey, fullOptions);

  if (cacheEntry && !forceUpdate) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      logger.info("Equipped cached ".concat(cacheKey));
      return true;
    }

    logger.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,external_kolmafia_namespaceObject.maximize)(objective, false);
  saveCached(cacheKey, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    maximize_classCallCheck(this, Requirement);

    _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  maximize_createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(maximize_toConsumableArray(this.maximizeParameters), maximize_toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(maximize_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), maximize_toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(x => {
          var _other$maximizeOption2;

          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(maximize_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), maximize_toConsumableArray((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(x => {
          var _other$maximizeOption4;

          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(maximize_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), maximize_toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(maximize_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), maximize_toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(maximize_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), maximize_toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();
;// CONCATENATED MODULE: ./src/actions/ActionSource.ts
function ActionSource_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ActionSource_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ActionSource_createClass(Constructor, protoProps, staticProps) { if (protoProps) ActionSource_defineProperties(Constructor.prototype, protoProps); if (staticProps) ActionSource_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function ActionSource_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ActionSource_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = ActionSource_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ActionSource_toConsumableArray(arr) { return ActionSource_arrayWithoutHoles(arr) || ActionSource_iterableToArray(arr) || ActionSource_unsupportedIterableToArray(arr) || ActionSource_nonIterableSpread(); }

function ActionSource_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ActionSource_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ActionSource_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ActionSource_arrayLikeToArray(o, minLen); }

function ActionSource_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function ActionSource_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return ActionSource_arrayLikeToArray(arr); }

function ActionSource_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function mergeConstraints() {
  for (var _len = arguments.length, allConstraints = new Array(_len), _key = 0; _key < _len; _key++) {
    allConstraints[_key] = arguments[_key];
  }

  var familiars = allConstraints.map(constraints => constraints.familiar).filter(familiar => familiar);

  if (familiars.length > 1) {
    // Inconsistent requirements.
    return null;
  }

  return {
    equipmentRequirements: () => Requirement.merge(ActionSource_toConsumableArray(allConstraints.map(constraints => {
      var _constraints$equipmen, _constraints$equipmen2;

      return (_constraints$equipmen = (_constraints$equipmen2 = constraints.equipmentRequirements) === null || _constraints$equipmen2 === void 0 ? void 0 : _constraints$equipmen2.call(constraints)) !== null && _constraints$equipmen !== void 0 ? _constraints$equipmen : new Requirement([], {});
    }))),
    preparation: () => {
      var success = true;

      var _iterator = ActionSource_createForOfIteratorHelper(allConstraints),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
    familiar: familiars.find(familiar => familiar),
    cost: () => sum(allConstraints, constraints => {
      var _constraints$cost, _constraints$cost2;

      return (_constraints$cost = (_constraints$cost2 = constraints.cost) === null || _constraints$cost2 === void 0 ? void 0 : _constraints$cost2.call(constraints)) !== null && _constraints$cost !== void 0 ? _constraints$cost : 0;
    })
  };
}
/**
 * A combat-based action resource in the game (e.g. a free run or free kill).
 */


var ActionSource = /*#__PURE__*/function () {
  // Infinity: unlimited

  /**
   * @param source Source(s) of the action (e.g. item, skill, or familiar needed).
   * @param potential Function returning how many times this action can be used.
   * @param macro Macro to execute this action in combat.
   * @param constraints Constraints required for this action to be available.
   */
  function ActionSource(source, potential, macro) {
    var constraints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    ActionSource_classCallCheck(this, ActionSource);

    ActionSource_defineProperty(this, "source", void 0);

    ActionSource_defineProperty(this, "potential", void 0);

    ActionSource_defineProperty(this, "macro", void 0);

    ActionSource_defineProperty(this, "constraints", void 0);

    this.source = source;
    this.potential = potential;
    this.macro = macro;
    this.constraints = constraints;
  }
  /**
   * @returns Name of the action source.
   */


  ActionSource_createClass(ActionSource, [{
    key: "name",
    value: function name() {
      return this.source.toString();
    }
    /**
     * @returns Whether the action is available.
     */

  }, {
    key: "available",
    value: function available() {
      return this.potential() > 0;
    }
    /**
     * @returns Cost in meat per usage of the action.
     */

  }, {
    key: "cost",
    value: function cost() {
      return this.constraints.cost ? this.constraints.cost() : 0;
    }
    /**
     * @returns Whether the action costs 0 meat to use.
     */

  }, {
    key: "isFree",
    value: function isFree() {
      return !this.cost || this.cost() === 0;
    }
    /**
     * @returns Whether unlimited uses of the action are available.
     */

  }, {
    key: "isUnlimited",
    value: function isUnlimited() {
      return this.potential() === Infinity;
    }
    /**
     * Create a compound action source with merged constraints.
     * @param others Other actions to have available.
     * @returns Merged constraints, or null if they are inconsistent.
     */

  }, {
    key: "merge",
    value: function merge() {
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        others[_key2] = arguments[_key2];
      }

      var actions = [this].concat(others);
      var constraints = mergeConstraints.apply(void 0, ActionSource_toConsumableArray(actions.map(action => action.constraints)));

      if (constraints === null) {
        // Inconsistent constraints - no path forward here.
        return null;
      }

      return new ActionSource(ActionSource_toConsumableArray(actions.map(action => action.source).flat()), () => sum(actions, action => action.potential()), Macro.step.apply(Macro, ActionSource_toConsumableArray(actions.map(action => action.macro))), constraints);
    }
    /**
     * Perform all preparation necessary to make this action available.
     * @param otherRequirements Any other equipment requirements.
     * @returns Whether preparation succeeded.
     */

  }, {
    key: "prepare",
    value: function prepare(otherRequirements) {
      var _this$constraints$fam, _this$constraints;

      if ((_this$constraints$fam = (_this$constraints = this.constraints).familiar) !== null && _this$constraints$fam !== void 0 && _this$constraints$fam.call(_this$constraints)) {
        if (!(0,external_kolmafia_namespaceObject.useFamiliar)(this.constraints.familiar())) return false;
      }

      if (this.constraints.equipmentRequirements) {
        var requirement = otherRequirements ? otherRequirements.merge(this.constraints.equipmentRequirements()) : this.constraints.equipmentRequirements();
        if (!requirement.maximize()) return false;
      }

      if (this.constraints.preparation) return this.constraints.preparation();
      return true;
    }
    /**
     * Perform all preparation necessary to make this action available.
     * Throws an error if preparation fails.
     * @param otherRequirements Any other equipment requirements.
     */

  }, {
    key: "ensure",
    value: function ensure(otherRequirements) {
      if (!this.prepare(otherRequirements)) {
        throw new Error("Failed to prepare action ".concat(this.name(), "."));
      }
    }
  }]);

  return ActionSource;
}();

ActionSource_defineProperty(ActionSource, "defaultPriceFunction", item => (0,external_kolmafia_namespaceObject.mallPrice)(item) > 0 ? (0,external_kolmafia_namespaceObject.mallPrice)(item) : Infinity);

function filterAction(action, constraints) {
  var _constraints$requireF, _constraints$requireU, _constraints$noFamili, _constraints$noRequir, _constraints$noPrepar, _constraints$maximumC, _constraints$maximumC2;

  return action.available() && (constraints.allowedAction === undefined || constraints.allowedAction(action)) && !((_constraints$requireF = constraints.requireFamiliar) !== null && _constraints$requireF !== void 0 && _constraints$requireF.call(constraints) && !action.constraints.familiar) && !((_constraints$requireU = constraints.requireUnlimited) !== null && _constraints$requireU !== void 0 && _constraints$requireU.call(constraints) && !action.isUnlimited()) && !((_constraints$noFamili = constraints.noFamiliar) !== null && _constraints$noFamili !== void 0 && _constraints$noFamili.call(constraints) && action.constraints.familiar) && !((_constraints$noRequir = constraints.noRequirements) !== null && _constraints$noRequir !== void 0 && _constraints$noRequir.call(constraints) && action.constraints.equipmentRequirements) && !((_constraints$noPrepar = constraints.noPreparation) !== null && _constraints$noPrepar !== void 0 && _constraints$noPrepar.call(constraints) && action.constraints.preparation) && action.cost() <= ((_constraints$maximumC = (_constraints$maximumC2 = constraints.maximumCost) === null || _constraints$maximumC2 === void 0 ? void 0 : _constraints$maximumC2.call(constraints)) !== null && _constraints$maximumC !== void 0 ? _constraints$maximumC : 0);
}
/**
 * Find an available action source subject to constraints.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Available action source satisfying constraints, or null.
 */


function findActionSource(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validActions = actions.filter(actions => filterAction(actions, constraints));
  if (validActions.length < 1) return null;
  return validActions.reduce((a, b) => a.cost() <= b.cost() ? a : b);
}
/**
 * Count available action sources subject to constraints. Note that, if
 * constraints.maximumCost is high enough, this will return Infinity.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Count of available action sources.
 */

function actionSourcesAvailable(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // TODO: This will overcount if any Actions share a counter
  return sum(actions.filter(action => filterAction(action, constraints !== null && constraints !== void 0 ? constraints : {})), action => action.potential());
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(9628);
;// CONCATENATED MODULE: ./src/resources/2017/AsdonMartin.ts
var AsdonMartin_templateObject, AsdonMartin_templateObject2, AsdonMartin_templateObject3, AsdonMartin_templateObject4, AsdonMartin_templateObject5, AsdonMartin_templateObject6, AsdonMartin_templateObject7, AsdonMartin_templateObject8, AsdonMartin_templateObject9, AsdonMartin_templateObject10, AsdonMartin_templateObject11, AsdonMartin_templateObject12, AsdonMartin_templateObject13;

function AsdonMartin_slicedToArray(arr, i) { return AsdonMartin_arrayWithHoles(arr) || AsdonMartin_iterableToArrayLimit(arr, i) || AsdonMartin_unsupportedIterableToArray(arr, i) || AsdonMartin_nonIterableRest(); }

function AsdonMartin_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function AsdonMartin_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return AsdonMartin_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return AsdonMartin_arrayLikeToArray(o, minLen); }

function AsdonMartin_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function AsdonMartin_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function AsdonMartin_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function AsdonMartin_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var PriceAge;
/**
 * Returns whether or not we have the Asdon installed in the workshed at present.
 */

(function (PriceAge) {
  PriceAge[PriceAge["HISTORICAL"] = 0] = "HISTORICAL";
  PriceAge[PriceAge["RECENT"] = 1] = "RECENT";
  PriceAge[PriceAge["TODAY"] = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));

function installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === $item(AsdonMartin_templateObject || (AsdonMartin_templateObject = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"])));
}
/**
 * Returns true if we have the Asdon or if it's installed.
 */

function AsdonMartin_have() {
  return installed() || have($item(AsdonMartin_templateObject2 || (AsdonMartin_templateObject2 = AsdonMartin_taggedTemplateLiteral(["Asdon Martin keyfob"]))));
}
var fuelSkiplist = $items(AsdonMartin_templateObject3 || (AsdonMartin_templateObject3 = AsdonMartin_taggedTemplateLiteral(["cup of \"tea\", thermos of \"whiskey\", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of \"milk\""])));

function priceTooOld(item) {
  return (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0 || (0,external_kolmafia_namespaceObject.historicalAge)(item) >= 7;
} // Return mall max if historicalPrice returns -1.


function historicalPriceOrMax(item) {
  var historical = (0,external_kolmafia_namespaceObject.historicalPrice)(item);
  return historical < 0 ? 999999999 : historical;
} // Return mall max if mallPrice returns -1.


function mallPriceOrMax(item) {
  var mall = (0,external_kolmafia_namespaceObject.mallPrice)(item);
  return mall < 0 ? 999999999 : mall;
}

function price(item, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL:
      {
        var historical = historicalPriceOrMax(item);
        return historical === 0 ? mallPriceOrMax(item) : historical;
      }

    case PriceAge.RECENT:
      return priceTooOld(item) ? mallPriceOrMax(item) : historicalPriceOrMax(item);

    case PriceAge.TODAY:
      return mallPriceOrMax(item);
  }
}

function inventoryItems() {
  return external_kolmafia_namespaceObject.Item.all().filter(isFuelItem).filter(item => have(item) && [100, (0,external_kolmafia_namespaceObject.autosellPrice)(item)].includes(price(item, PriceAge.RECENT)));
} // Efficiency in meat per fuel.


function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PriceAge.RECENT;
  var units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}

function isFuelItem(it) {
  return !(0,external_kolmafia_namespaceObject.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}

function getBestFuels() {
  // Three stages.
  // 1. Filter to reasonable items using historical cost (within 5x of historical best).
  var allFuel = external_kolmafia_namespaceObject.Item.all().filter(isFuelItem);

  if (allFuel.filter(item => (0,external_kolmafia_namespaceObject.historicalPrice)(item) === 0).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var keyHistorical = item => calculateFuelUnitCost(item, PriceAge.HISTORICAL);

  allFuel.sort((x, y) => keyHistorical(x) - keyHistorical(y));
  var bestUnitCost = keyHistorical(allFuel[0]);
  var firstBadIndex = allFuel.findIndex(item => keyHistorical(item) > 5 * bestUnitCost);
  var potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel; // 2. Filter to top 10 candidates using prices at most a week old.

  if (potentialFuel.filter(item => priceTooOld(item)).length > 100) {
    (0,external_kolmafia_namespaceObject.mallPrices)("food");
    (0,external_kolmafia_namespaceObject.mallPrices)("booze");
  }

  var key1 = item => -getAverageAdventures(item);

  var key2 = item => calculateFuelUnitCost(item, PriceAge.RECENT);

  potentialFuel.sort((x, y) => key1(x) - key1(y));
  potentialFuel.sort((x, y) => key2(x) - key2(y)); // 3. Find result using precise price for those top candidates.

  var candidates = potentialFuel.slice(0, 10);

  var key3 = item => calculateFuelUnitCost(item, PriceAge.TODAY);

  candidates.sort((x, y) => key3(x) - key3(y));

  if (calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100) {
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. " + "This means something went wrong.");
  }

  return candidates;
}
/**
 * Fuel your Asdon Martin with a given quantity of a given item
 * @param it Item to fuel with.
 * @param quantity Number of items to fuel with.
 * @returns Whether we succeeded at fueling with the given items.
 */


function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat((0,external_kolmafia_namespaceObject.toInt)(it), "&go=Convert%21"));
  return result.includes("The display updates with a");
}
/**
 * Fill your Asdon Martin to the given fuel level in the cheapest way possible
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */

function fillTo(targetUnits) {
  if (!installed()) return false;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits) {
    // if in Hardcore/ronin, skip the price calculation and just use soda bread
    var _ref = (0,external_kolmafia_namespaceObject.canInteract)() ? getBestFuels() : [$item(AsdonMartin_templateObject4 || (AsdonMartin_templateObject4 = AsdonMartin_taggedTemplateLiteral(["loaf of soda bread"]))), undefined],
        _ref2 = AsdonMartin_slicedToArray(_ref, 2),
        bestFuel = _ref2[0],
        secondBest = _ref2[1];

    var count = Math.ceil(targetUnits / getAverageAdventures(bestFuel));
    var ceiling = undefined;

    if (secondBest) {
      var efficiencyOfSecondBest = (0,external_kolmafia_namespaceObject.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }

    ceiling ? (0,external_kolmafia_namespaceObject.buy)(count, bestFuel, ceiling) : (0,external_kolmafia_namespaceObject.buy)(count, bestFuel);

    if (!insertFuel(bestFuel, Math.min((0,external_kolmafia_namespaceObject.itemAmount)(bestFuel), count))) {
      throw new Error("Failed to fuel Asdon Martin.");
    }
  }

  return (0,external_kolmafia_namespaceObject.getFuel)() >= targetUnits;
}

function fillWithBestInventoryItem(targetUnits) {
  var options = inventoryItems().sort((a, b) => getAverageAdventures(b) / (0,external_kolmafia_namespaceObject.autosellPrice)(b) - getAverageAdventures(a) / (0,external_kolmafia_namespaceObject.autosellPrice)(a));
  if (options.length === 0) return false;
  var best = options[0];
  if ((0,external_kolmafia_namespaceObject.autosellPrice)(best) / getAverageAdventures(best) > 100) return false;
  var amountToUse = clamp(Math.ceil(targetUnits / getAverageAdventures(best)), 0, (0,external_kolmafia_namespaceObject.itemAmount)(best));
  return insertFuel(best, amountToUse);
}
/**
 * Fill your Asdon Martin by prioritizing mallmin items in your inventory. Default to the behavior of fillTo.
 * @param targetUnits Fuel level to attempt to reach.
 * @returns Whether we succeeded at filling to the target fuel level.
 */


function fillWithInventoryTo(targetUnits) {
  if (!installed()) return false;
  var continueFuelingFromInventory = true;

  while ((0,external_kolmafia_namespaceObject.getFuel)() < targetUnits && continueFuelingFromInventory) {
    continueFuelingFromInventory && (continueFuelingFromInventory = fillWithBestInventoryItem(targetUnits));
  }

  return fillTo(targetUnits);
}
/**
 * Object consisting of the various Asdon driving styles
 */

var Driving = {
  Obnoxiously: $effect(AsdonMartin_templateObject5 || (AsdonMartin_templateObject5 = AsdonMartin_taggedTemplateLiteral(["Driving Obnoxiously"]))),
  Stealthily: $effect(AsdonMartin_templateObject6 || (AsdonMartin_templateObject6 = AsdonMartin_taggedTemplateLiteral(["Driving Stealthily"]))),
  Wastefully: $effect(AsdonMartin_templateObject7 || (AsdonMartin_templateObject7 = AsdonMartin_taggedTemplateLiteral(["Driving Wastefully"]))),
  Safely: $effect(AsdonMartin_templateObject8 || (AsdonMartin_templateObject8 = AsdonMartin_taggedTemplateLiteral(["Driving Safely"]))),
  Recklessly: $effect(AsdonMartin_templateObject9 || (AsdonMartin_templateObject9 = AsdonMartin_taggedTemplateLiteral(["Driving Recklessly"]))),
  Intimidatingly: $effect(AsdonMartin_templateObject10 || (AsdonMartin_templateObject10 = AsdonMartin_taggedTemplateLiteral(["Driving Intimidatingly"]))),
  Quickly: $effect(AsdonMartin_templateObject11 || (AsdonMartin_templateObject11 = AsdonMartin_taggedTemplateLiteral(["Driving Quickly"]))),
  Observantly: $effect(AsdonMartin_templateObject12 || (AsdonMartin_templateObject12 = AsdonMartin_taggedTemplateLiteral(["Driving Observantly"]))),
  Waterproofly: $effect(AsdonMartin_templateObject13 || (AsdonMartin_templateObject13 = AsdonMartin_taggedTemplateLiteral(["Driving Waterproofly"])))
};
/**
 * Attempt to drive with a particular style for a particular number of turns.
 * @param style The driving style to use.
 * @param turns The number of turns to attempt to get.
 * @param preferInventory Whether we should preferentially value items currently in our inventory.
 * @returns Whether we have at least as many turns as requested of said driving style.
 */

function drive(style) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var preferInventory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!Object.values(Driving).includes(style)) return false;
  if (!installed()) return false;
  if ((0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns) return true;
  var fuelNeeded = 37 * Math.ceil((turns - (0,external_kolmafia_namespaceObject.haveEffect)(style)) / 30);
  (preferInventory ? fillWithInventoryTo : fillTo)(fuelNeeded);

  while ((0,external_kolmafia_namespaceObject.getFuel)() >= 37 && (0,external_kolmafia_namespaceObject.haveEffect)(style) < turns) {
    (0,external_kolmafia_namespaceObject.cliExecute)("asdonmartin drive ".concat(style.name.replace("Driving ", "")));
  }

  return (0,external_kolmafia_namespaceObject.haveEffect)(style) >= turns;
}
;// CONCATENATED MODULE: ./src/actions/FreeKill.ts
var FreeKill_templateObject, FreeKill_templateObject2, FreeKill_templateObject3, FreeKill_templateObject4, FreeKill_templateObject5, FreeKill_templateObject6, FreeKill_templateObject7, FreeKill_templateObject8, FreeKill_templateObject9, FreeKill_templateObject10, FreeKill_templateObject11, FreeKill_templateObject12, FreeKill_templateObject13, FreeKill_templateObject14, FreeKill_templateObject15, FreeKill_templateObject16, FreeKill_templateObject17, FreeKill_templateObject18, FreeKill_templateObject19, FreeKill_templateObject20, FreeKill_templateObject21, FreeKill_templateObject22, FreeKill_templateObject23, FreeKill_templateObject24, FreeKill_templateObject25, FreeKill_templateObject26, FreeKill_templateObject27, FreeKill_templateObject28, FreeKill_templateObject29, FreeKill_templateObject30, FreeKill_templateObject31, FreeKill_templateObject32, FreeKill_templateObject33, FreeKill_templateObject34, FreeKill_templateObject35, FreeKill_templateObject36, FreeKill_templateObject37, FreeKill_templateObject38, FreeKill_templateObject39, FreeKill_templateObject40, FreeKill_templateObject41, FreeKill_templateObject42, FreeKill_templateObject43, FreeKill_templateObject44, FreeKill_templateObject45;

function FreeKill_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function FreeKill_toConsumableArray(arr) { return FreeKill_arrayWithoutHoles(arr) || FreeKill_iterableToArray(arr) || FreeKill_unsupportedIterableToArray(arr) || FreeKill_nonIterableSpread(); }

function FreeKill_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function FreeKill_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return FreeKill_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return FreeKill_arrayLikeToArray(o, minLen); }

function FreeKill_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function FreeKill_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return FreeKill_arrayLikeToArray(arr); }

function FreeKill_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var freeKillSources = [// Free limited sources
new ActionSource($skill(FreeKill_templateObject || (FreeKill_templateObject = FreeKill_taggedTemplateLiteral(["Gingerbread Mob Hit"]))), () => !get("_gingerbreadMobHitUsed") && have($skill(FreeKill_templateObject2 || (FreeKill_templateObject2 = FreeKill_taggedTemplateLiteral(["Gingerbread Mob Hit"])))) ? 1 : 0, Macro.skill($skill(FreeKill_templateObject3 || (FreeKill_templateObject3 = FreeKill_taggedTemplateLiteral(["Gingerbread Mob Hit"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.restoreMp)(30)
}), new ActionSource($skill(FreeKill_templateObject4 || (FreeKill_templateObject4 = FreeKill_taggedTemplateLiteral(["Shattering Punch"]))), () => have($skill(FreeKill_templateObject5 || (FreeKill_templateObject5 = FreeKill_taggedTemplateLiteral(["Shattering Punch"])))) ? 3 - get("_shatteringPunchUsed") : 0, Macro.skill($skill(FreeKill_templateObject6 || (FreeKill_templateObject6 = FreeKill_taggedTemplateLiteral(["Shattering Punch"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.restoreMp)(30)
}), new ActionSource($item(FreeKill_templateObject7 || (FreeKill_templateObject7 = FreeKill_taggedTemplateLiteral(["replica bat-oomerang"]))), () => have($item(FreeKill_templateObject8 || (FreeKill_templateObject8 = FreeKill_taggedTemplateLiteral(["replica bat-oomerang"])))) ? 3 - get("_usedReplicaBatoomerang") : 0, Macro.item($item(FreeKill_templateObject9 || (FreeKill_templateObject9 = FreeKill_taggedTemplateLiteral(["replica bat-oomerang"]))))), new ActionSource($item(FreeKill_templateObject10 || (FreeKill_templateObject10 = FreeKill_taggedTemplateLiteral(["The Jokester's gun"]))), () => !get("_firedJokestersGun") && have($item(FreeKill_templateObject11 || (FreeKill_templateObject11 = FreeKill_taggedTemplateLiteral(["The Jokester's gun"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(FreeKill_templateObject12 || (FreeKill_templateObject12 = FreeKill_taggedTemplateLiteral(["The Jokester's gun"])))) ? 1 : 0, Macro.skill($skill(FreeKill_templateObject13 || (FreeKill_templateObject13 = FreeKill_taggedTemplateLiteral(["Fire the Jokester's Gun"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeKill_templateObject14 || (FreeKill_templateObject14 = FreeKill_taggedTemplateLiteral(["The Jokester's gun"])))
  })
}), new ActionSource($item(FreeKill_templateObject15 || (FreeKill_templateObject15 = FreeKill_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))), () => have($item(FreeKill_templateObject16 || (FreeKill_templateObject16 = FreeKill_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_chestXRayUsed") : 0, Macro.skill($skill(FreeKill_templateObject17 || (FreeKill_templateObject17 = FreeKill_taggedTemplateLiteral(["Chest X-Ray"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeKill_templateObject18 || (FreeKill_templateObject18 = FreeKill_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))
  })
}), new ActionSource($skill(FreeKill_templateObject19 || (FreeKill_templateObject19 = FreeKill_taggedTemplateLiteral(["Asdon Martin: Missile Launcher"]))), () => !get("_missileLauncherUsed") && installed() ? 1 : 0, Macro.skill($skill(FreeKill_templateObject20 || (FreeKill_templateObject20 = FreeKill_taggedTemplateLiteral(["Asdon Martin: Missile Launcher"])))), {
  preparation: () => fillTo(100)
}), // Heavy Rains
new ActionSource($skill(FreeKill_templateObject21 || (FreeKill_templateObject21 = FreeKill_taggedTemplateLiteral(["Lightning Strike"]))), () => have($skill(FreeKill_templateObject22 || (FreeKill_templateObject22 = FreeKill_taggedTemplateLiteral(["Lightning Strike"])))) ? Math.floor((0,external_kolmafia_namespaceObject.myLightning)() / 20) : 0, Macro.skill($skill(FreeKill_templateObject23 || (FreeKill_templateObject23 = FreeKill_taggedTemplateLiteral(["Lightning Strike"]))))), // Expensive limited sources
new ActionSource($item(FreeKill_templateObject24 || (FreeKill_templateObject24 = FreeKill_taggedTemplateLiteral(["powdered madness"]))), () => 5 - get("_powderedMadnessUses"), Macro.item($item(FreeKill_templateObject25 || (FreeKill_templateObject25 = FreeKill_taggedTemplateLiteral(["powdered madness"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)($item(FreeKill_templateObject26 || (FreeKill_templateObject26 = FreeKill_taggedTemplateLiteral(["powdered madness"])))),
  cost: () => ActionSource.defaultPriceFunction($item(FreeKill_templateObject27 || (FreeKill_templateObject27 = FreeKill_taggedTemplateLiteral(["powdered madness"]))))
}), new ActionSource($familiar(FreeKill_templateObject28 || (FreeKill_templateObject28 = FreeKill_taggedTemplateLiteral(["Puck Man"]))), () => have($familiar(FreeKill_templateObject29 || (FreeKill_templateObject29 = FreeKill_taggedTemplateLiteral(["Puck Man"])))) ? 20 - get("_powerPillUses") : 0, Macro.item($item(FreeKill_templateObject30 || (FreeKill_templateObject30 = FreeKill_taggedTemplateLiteral(["power pill"])))), {
  familiar: () => $familiar(FreeKill_templateObject31 || (FreeKill_templateObject31 = FreeKill_taggedTemplateLiteral(["Puck Man"]))),
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)($item(FreeKill_templateObject32 || (FreeKill_templateObject32 = FreeKill_taggedTemplateLiteral(["power pill"])))),
  cost: () => ActionSource.defaultPriceFunction($item(FreeKill_templateObject33 || (FreeKill_templateObject33 = FreeKill_taggedTemplateLiteral(["power pill"]))))
}), new ActionSource($familiar(FreeKill_templateObject34 || (FreeKill_templateObject34 = FreeKill_taggedTemplateLiteral(["Ms. Puck Man"]))), () => have($familiar(FreeKill_templateObject35 || (FreeKill_templateObject35 = FreeKill_taggedTemplateLiteral(["Ms. Puck Man"])))) ? 20 - get("_powerPillUses") : 0, Macro.item($item(FreeKill_templateObject36 || (FreeKill_templateObject36 = FreeKill_taggedTemplateLiteral(["power pill"])))), {
  familiar: () => $familiar(FreeKill_templateObject37 || (FreeKill_templateObject37 = FreeKill_taggedTemplateLiteral(["Ms. Puck Man"]))),
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)($item(FreeKill_templateObject38 || (FreeKill_templateObject38 = FreeKill_taggedTemplateLiteral(["power pill"])))),
  cost: () => ActionSource.defaultPriceFunction($item(FreeKill_templateObject39 || (FreeKill_templateObject39 = FreeKill_taggedTemplateLiteral(["power pill"]))))
}), // Expensive unlimited sources
new ActionSource($skill(FreeKill_templateObject40 || (FreeKill_templateObject40 = FreeKill_taggedTemplateLiteral(["Shocking Lick"]))), () => Infinity, Macro.skill($skill(FreeKill_templateObject41 || (FreeKill_templateObject41 = FreeKill_taggedTemplateLiteral(["Shocking Lick"])))), {
  preparation: () => {
    if (get("shockingLickCharges") === 0 && (0,external_kolmafia_namespaceObject.retrieveItem)($item(FreeKill_templateObject42 || (FreeKill_templateObject42 = FreeKill_taggedTemplateLiteral(["battery (9-Volt)"]))))) {
      (0,external_kolmafia_namespaceObject.use)($item(FreeKill_templateObject43 || (FreeKill_templateObject43 = FreeKill_taggedTemplateLiteral(["battery (9-Volt)"]))));
    }

    return get("shockingLickCharges") > 0;
  },
  cost: () => ActionSource.defaultPriceFunction($item(FreeKill_templateObject44 || (FreeKill_templateObject44 = FreeKill_taggedTemplateLiteral(["battery (AAA)"])))) * 4
})].concat(FreeKill_toConsumableArray($items(FreeKill_templateObject45 || (FreeKill_templateObject45 = FreeKill_taggedTemplateLiteral(["Daily Affirmation: Think Win-Lose, superduperheated metal"]))).map(item => new ActionSource(item, () => Infinity, Macro.item(item), {
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)(item),
  cost: () => ActionSource.defaultPriceFunction(item)
}))));
/**
 * Find an available free kill source subject to constraints.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free kill source satisfying constraints, or null.
 */

function tryFindFreeKill(constraints) {
  return findActionSource(freeKillSources, constraints);
}
/**
 * Ensure an available free kill source subject to constraints.
 * Throws an error if no source can be found.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free kill source satisfying constraints.
 */

function ensureFreeKill(constraints) {
  var source = tryFindFreeKill(constraints);

  if (!source) {
    throw new Error("Failed to ensure Free Kill source");
  }

  return source;
}
;// CONCATENATED MODULE: ./src/resources/2009/Bandersnatch.ts
var Bandersnatch_templateObject, Bandersnatch_templateObject2, Bandersnatch_templateObject3;

function Bandersnatch_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Bandersnatch_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Bandersnatch_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Bandersnatch_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Bandersnatch_arrayLikeToArray(o, minLen); }

function Bandersnatch_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Bandersnatch_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var familiar = $familiar(Bandersnatch_templateObject || (Bandersnatch_templateObject = Bandersnatch_taggedTemplateLiteral(["Frumious Bandersnatch"])));
/**
 * Returns true if the player has the Frumious Bandersnatch in their
 * terrarium
 */

function Bandersnatch_have() {
  return have(familiar);
}
/**
 * Returns the number of free runaways that have already been used
 * @see StompingBoots with which the Bandersnatch shares a counter
 */

function getRunaways() {
  return get("_banderRunaways");
}
/**
 * Returns the total number of free runaways that the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var weightBuffs = considerWeightAdjustment ? (0,external_kolmafia_namespaceObject.weightAdjustment)() : 0;
  return Math.floor(((0,external_kolmafia_namespaceObject.familiarWeight)(familiar) + weightBuffs) / 5);
}
/**
 * Returns the number of remaining free runaways the player can
 * get from their Bandersnatch
 *
 * @param considerWeightAdjustment
 */

function getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}
/**
 * Returns true if the player could use their Bandersnatch to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Bandersnatch_have() && getRemainingRunaways(considerWeightAdjustment) > 0;
}
var odeSkill = $skill(Bandersnatch_templateObject2 || (Bandersnatch_templateObject2 = Bandersnatch_taggedTemplateLiteral(["The Ode to Booze"])));
var odeEffect = $effect(Bandersnatch_templateObject3 || (Bandersnatch_templateObject3 = Bandersnatch_taggedTemplateLiteral(["Ode to Booze"])));
/**
 * Returns true if the player can use their Bandersnatch to get a
 * free run right now
 */

function canRunaway() {
  return isCurrentFamiliar(familiar) && couldRunaway() && have(odeEffect);
}
/**
 * Prepare a Bandersnatch runaway.
 *
 * This will cast Ode to Booze and take your Bandersnatch with you.
 * If any of those steps fail, it will return false.
 *
 * @param songsToRemove Ordered list of songs that could be shrugged to make room for Ode to Booze
 */

function prepareRunaway(songsToRemove) {
  if (!have(odeEffect)) {
    if (!have(odeSkill)) {
      return false;
    }

    if (!canRememberSong()) {
      var activeSongs = getActiveSongs();

      var _iterator = Bandersnatch_createForOfIteratorHelper(songsToRemove),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var song = _step.value;

          if (activeSongs.includes(song) && uneffect(song)) {
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (!(0,external_kolmafia_namespaceObject.useSkill)(odeSkill)) {
      return false;
    }
  }

  return (0,external_kolmafia_namespaceObject.useFamiliar)(familiar);
}
;// CONCATENATED MODULE: ./src/resources/2011/StompingBoots.ts
var StompingBoots_templateObject;

function StompingBoots_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var StompingBoots_familiar = $familiar(StompingBoots_templateObject || (StompingBoots_templateObject = StompingBoots_taggedTemplateLiteral(["Pair of Stomping Boots"])));
/**
 * Returns true if the player has the Pair of Stomping Boots in their
 * terrarium
 */

function StompingBoots_have() {
  return have(StompingBoots_familiar);
}
/**
 * Returns the number of free runaways that have already been used
 * @see Bandersnatch with which the Stomping Boots shares a counter
 */

function StompingBoots_getRunaways() {
  return get("_banderRunaways");
}
/**
 * Returns the total number of free runaways that the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function StompingBoots_getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var weightBuffs = considerWeightAdjustment ? (0,external_kolmafia_namespaceObject.weightAdjustment)() : 0;
  return Math.floor(((0,external_kolmafia_namespaceObject.familiarWeight)(StompingBoots_familiar) + weightBuffs) / 5);
}
/**
 * Returns the number of remaining free runaways the player can
 * get from their Stomping Boots
 *
 * @param considerWeightAdjustment
 */

function StompingBoots_getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return Math.max(0, StompingBoots_getMaxRunaways(considerWeightAdjustment) - StompingBoots_getRunaways());
}
/**
 * Returns true if the player could use their Stomping Boots to
 * get a free run in theory
 *
 * @param considerWeightAdjustment Include familiar weight modifiers
 */

function StompingBoots_couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return StompingBoots_have() && StompingBoots_getRemainingRunaways(considerWeightAdjustment) > 0;
}
/**
 * Returns true if the player can use their Stomping Boots to get a
 * free run right now
 */

function StompingBoots_canRunaway() {
  return isCurrentFamiliar(StompingBoots_familiar) && StompingBoots_couldRunaway();
}
/**
 * Prepare a Stomping Boots runaway.
 *
 * This will take your Stomping Boots with you.
 * If any of those steps fail, it will return false.
 */

function StompingBoots_prepareRunaway() {
  return (0,external_kolmafia_namespaceObject.useFamiliar)(StompingBoots_familiar);
}
;// CONCATENATED MODULE: ./src/actions/FreeRun.ts
var FreeRun_templateObject, FreeRun_templateObject2, FreeRun_templateObject3, FreeRun_templateObject4, FreeRun_templateObject5, FreeRun_templateObject6, FreeRun_templateObject7, FreeRun_templateObject8, FreeRun_templateObject9, FreeRun_templateObject10, FreeRun_templateObject11, FreeRun_templateObject12, FreeRun_templateObject13, FreeRun_templateObject14, FreeRun_templateObject15, FreeRun_templateObject16, FreeRun_templateObject17, FreeRun_templateObject18, FreeRun_templateObject19, FreeRun_templateObject20, FreeRun_templateObject21, FreeRun_templateObject22, FreeRun_templateObject23, FreeRun_templateObject24, FreeRun_templateObject25, FreeRun_templateObject26, FreeRun_templateObject27, FreeRun_templateObject28, FreeRun_templateObject29, FreeRun_templateObject30, FreeRun_templateObject31, FreeRun_templateObject32, FreeRun_templateObject33, FreeRun_templateObject34, FreeRun_templateObject35, FreeRun_templateObject36, FreeRun_templateObject37, FreeRun_templateObject38, FreeRun_templateObject39, FreeRun_templateObject40, FreeRun_templateObject41, FreeRun_templateObject42, FreeRun_templateObject43, FreeRun_templateObject44, FreeRun_templateObject45, FreeRun_templateObject46, FreeRun_templateObject47, FreeRun_templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58;

function FreeRun_toConsumableArray(arr) { return FreeRun_arrayWithoutHoles(arr) || FreeRun_iterableToArray(arr) || FreeRun_unsupportedIterableToArray(arr) || FreeRun_nonIterableSpread(); }

function FreeRun_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function FreeRun_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return FreeRun_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return FreeRun_arrayLikeToArray(o, minLen); }

function FreeRun_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function FreeRun_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return FreeRun_arrayLikeToArray(arr); }

function FreeRun_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function FreeRun_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










 // Value of _lastCombatStarted the last time we updated scrapbook charges.

var scrapbookChargesLastUpdated = get("_lastCombatStarted"); // Free unlimited source every 30 turns.
// Does not work on special monsters so needs a backup, see tryFindFreeRun.
// banishedMonsters isn't updated if the free run succeeds on an unbanishable monster

var asdonMartinSource = new ActionSource($skill(FreeRun_templateObject || (FreeRun_templateObject = FreeRun_taggedTemplateLiteral(["Asdon Martin: Spring-Loaded Front Bumper"]))), () => {
  if (!installed()) return 0;
  var banishes = get("banishedMonsters").split(":");
  var bumperIndex = banishes.map(string => string.toLowerCase()).indexOf("spring-loaded front bumper");
  if (bumperIndex === -1) return 1;
  return (0,external_kolmafia_namespaceObject.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
}, Macro.trySkill($skill(FreeRun_templateObject2 || (FreeRun_templateObject2 = FreeRun_taggedTemplateLiteral(["Asdon Martin: Spring-Loaded Front Bumper"])))), {
  preparation: () => fillTo(50)
});
var freeRunSources = [// Free limited sources
new ActionSource(familiar, () => (have($effect(FreeRun_templateObject3 || (FreeRun_templateObject3 = FreeRun_taggedTemplateLiteral(["Ode to Booze"])))) || getSongCount() < getSongLimit()) && couldRunaway() ? getRemainingRunaways() : 0, Macro.step("runaway"), {
  equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
  preparation: () => {
    ensureEffect($effect(FreeRun_templateObject4 || (FreeRun_templateObject4 = FreeRun_taggedTemplateLiteral(["Ode to Booze"]))));
    return have($effect(FreeRun_templateObject5 || (FreeRun_templateObject5 = FreeRun_taggedTemplateLiteral(["Ode to Booze"]))));
  },
  familiar: () => familiar
}), new ActionSource(StompingBoots_familiar, () => StompingBoots_couldRunaway() ? StompingBoots_getRemainingRunaways() : 0, Macro.step("runaway"), {
  equipmentRequirements: () => new Requirement(["Familiar Weight"], {}),
  familiar: () => StompingBoots_familiar
}), new ActionSource($skill(FreeRun_templateObject6 || (FreeRun_templateObject6 = FreeRun_taggedTemplateLiteral(["Snokebomb"]))), () => have($skill(FreeRun_templateObject7 || (FreeRun_templateObject7 = FreeRun_taggedTemplateLiteral(["Snokebomb"])))) ? 3 - get("_snokebombUsed") : 0, Macro.skill($skill(FreeRun_templateObject8 || (FreeRun_templateObject8 = FreeRun_taggedTemplateLiteral(["Snokebomb"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.restoreMp)(50)
}), new ActionSource($skill(FreeRun_templateObject9 || (FreeRun_templateObject9 = FreeRun_taggedTemplateLiteral(["Emotionally Chipped"]))), () => have($skill(FreeRun_templateObject10 || (FreeRun_templateObject10 = FreeRun_taggedTemplateLiteral(["Emotionally Chipped"])))) ? 3 - get("_feelHatredUsed") : 0, Macro.skill($skill(FreeRun_templateObject11 || (FreeRun_templateObject11 = FreeRun_taggedTemplateLiteral(["Feel Hatred"]))))), new ActionSource($item(FreeRun_templateObject12 || (FreeRun_templateObject12 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))), () => have($item(FreeRun_templateObject13 || (FreeRun_templateObject13 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))) ? 3 - get("_kgbTranquilizerDartUses") : 0, Macro.skill($skill(FreeRun_templateObject14 || (FreeRun_templateObject14 = FreeRun_taggedTemplateLiteral(["KGB tranquilizer dart"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject15 || (FreeRun_templateObject15 = FreeRun_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))
  })
}), new ActionSource($item(FreeRun_templateObject16 || (FreeRun_templateObject16 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"]))), () => have($item(FreeRun_templateObject17 || (FreeRun_templateObject17 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"])))) && !get("_latteBanishUsed") ? 1 : 0, Macro.skill($skill(FreeRun_templateObject18 || (FreeRun_templateObject18 = FreeRun_taggedTemplateLiteral(["Throw Latte on Opponent"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject19 || (FreeRun_templateObject19 = FreeRun_taggedTemplateLiteral(["latte lovers member's mug"])))
  })
}), new ActionSource($item(FreeRun_templateObject20 || (FreeRun_templateObject20 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))), () => have($item(FreeRun_templateObject21 || (FreeRun_templateObject21 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_reflexHammerUsed") : 0, Macro.skill($skill(FreeRun_templateObject22 || (FreeRun_templateObject22 = FreeRun_taggedTemplateLiteral(["Reflex Hammer"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject23 || (FreeRun_templateObject23 = FreeRun_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))
  })
}), new ActionSource($item(FreeRun_templateObject24 || (FreeRun_templateObject24 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"]))), () => have($item(FreeRun_templateObject25 || (FreeRun_templateObject25 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(FreeRun_templateObject26 || (FreeRun_templateObject26 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))) && !get("_mafiaMiddleFingerRingUsed") ? 1 : 0, Macro.skill($skill(FreeRun_templateObject27 || (FreeRun_templateObject27 = FreeRun_taggedTemplateLiteral(["Show them your ring"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject28 || (FreeRun_templateObject28 = FreeRun_taggedTemplateLiteral(["mafia middle finger ring"])))
  })
}), new ActionSource($item(FreeRun_templateObject29 || (FreeRun_templateObject29 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"]))), () => have($item(FreeRun_templateObject30 || (FreeRun_templateObject30 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"])))) && !get("_vmaskBanisherUsed") ? 1 : 0, Macro.skill($skill(FreeRun_templateObject31 || (FreeRun_templateObject31 = FreeRun_taggedTemplateLiteral(["Creepy Grin"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject32 || (FreeRun_templateObject32 = FreeRun_taggedTemplateLiteral(["V for Vivala mask"])))
  }),
  preparation: () => (0,external_kolmafia_namespaceObject.restoreMp)(30)
}), new ActionSource($item(FreeRun_templateObject33 || (FreeRun_templateObject33 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))), () => getFoldGroup($item(FreeRun_templateObject34 || (FreeRun_templateObject34 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"])))).some(item => have(item)) && !get("_stinkyCheeseBanisherUsed") ? 1 : 0, Macro.skill($skill(FreeRun_templateObject35 || (FreeRun_templateObject35 = FreeRun_taggedTemplateLiteral(["Give Your Opponent the Stinkeye"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject36 || (FreeRun_templateObject36 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"])))
  }),
  preparation: () => {
    if (!have($item(FreeRun_templateObject37 || (FreeRun_templateObject37 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))))) {
      (0,external_kolmafia_namespaceObject.cliExecute)("fold stinky cheese eye");
    }

    return have($item(FreeRun_templateObject38 || (FreeRun_templateObject38 = FreeRun_taggedTemplateLiteral(["stinky cheese eye"]))));
  }
}), new ActionSource($item(FreeRun_templateObject39 || (FreeRun_templateObject39 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"]))), () => have($item(FreeRun_templateObject40 || (FreeRun_templateObject40 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0, Macro.step("runaway"), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject41 || (FreeRun_templateObject41 = FreeRun_taggedTemplateLiteral(["navel ring of navel gazing"])))
  })
}), new ActionSource($item(FreeRun_templateObject42 || (FreeRun_templateObject42 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"]))), () => have($item(FreeRun_templateObject43 || (FreeRun_templateObject43 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0, Macro.step("runaway"), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject44 || (FreeRun_templateObject44 = FreeRun_taggedTemplateLiteral(["Greatest American Pants"])))
  })
}), new ActionSource($skill(FreeRun_templateObject45 || (FreeRun_templateObject45 = FreeRun_taggedTemplateLiteral(["Show your boring familiar pictures"]))), () => {
  if (have($item(FreeRun_templateObject46 || (FreeRun_templateObject46 = FreeRun_taggedTemplateLiteral(["familiar scrapbook"]))))) {
    if (scrapbookChargesLastUpdated !== get("_lastCombatStarted")) {
      (0,external_kolmafia_namespaceObject.visitUrl)("desc_item.php?whichitem=463063785");
      scrapbookChargesLastUpdated = get("_lastCombatStarted");
    }

    return Math.floor(get("scrapbookCharges") / 100);
  }

  return 0;
}, Macro.skill($skill(FreeRun_templateObject47 || (FreeRun_templateObject47 = FreeRun_taggedTemplateLiteral(["Show your boring familiar pictures"])))), {
  equipmentRequirements: () => new Requirement([], {
    forceEquip: $items(FreeRun_templateObject48 || (FreeRun_templateObject48 = FreeRun_taggedTemplateLiteral(["familiar scrapbook"])))
  })
}), new ActionSource($item(_templateObject49 || (_templateObject49 = FreeRun_taggedTemplateLiteral(["peppermint parasol"]))), () => Math.max(0, 3 - get("_navelRunaways")), Macro.item($item(_templateObject50 || (_templateObject50 = FreeRun_taggedTemplateLiteral(["peppermint parasol"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)($item(_templateObject51 || (_templateObject51 = FreeRun_taggedTemplateLiteral(["peppermint parasol"])))),
  cost: () => Math.min(ActionSource.defaultPriceFunction($item(_templateObject52 || (_templateObject52 = FreeRun_taggedTemplateLiteral(["peppermint sprout"])))) * 5, ActionSource.defaultPriceFunction($item(_templateObject53 || (_templateObject53 = FreeRun_taggedTemplateLiteral(["peppermint parasol"]))))) / 10 // Breaks after 10 successful runaways.

}), new ActionSource($item(_templateObject54 || (_templateObject54 = FreeRun_taggedTemplateLiteral(["human musk"]))), () => Math.max(0, 3 - get("_humanMuskUses")), Macro.item($item(_templateObject55 || (_templateObject55 = FreeRun_taggedTemplateLiteral(["human musk"])))), {
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)($item(_templateObject56 || (_templateObject56 = FreeRun_taggedTemplateLiteral(["human musk"])))),
  cost: () => ActionSource.defaultPriceFunction($item(_templateObject57 || (_templateObject57 = FreeRun_taggedTemplateLiteral(["human musk"]))))
})].concat(FreeRun_toConsumableArray($items(_templateObject58 || (_templateObject58 = FreeRun_taggedTemplateLiteral(["Louder Than Bomb, divine champagne popper, tennis ball"]))).map(item => new ActionSource(item, () => Infinity, Macro.item(item), {
  preparation: () => (0,external_kolmafia_namespaceObject.retrieveItem)(item),
  cost: () => ActionSource.defaultPriceFunction(item)
}))));
/**
 * Find an available free run source subject to constraints.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints, or null.
 */

function tryFindFreeRun(constraints) {
  var source = findActionSource(freeRunSources, constraints); // Always try to use Asdon Martin: Spring-Loaded Front Bumper first,
  // but only if another source has been found.

  if (source && asdonMartinSource.available()) {
    source = asdonMartinSource.merge(source);
  }

  return source;
}
/**
 * Ensure an available free run source subject to constraints.
 * Throws an error if no source can be found.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Free run source satisfying constraints.
 */

function ensureFreeRun(constraints) {
  var source = tryFindFreeRun(constraints);

  if (!source) {
    throw new Error("Failed to ensure Free Run source");
  }

  return source;
}
;// CONCATENATED MODULE: ./src/actions/index.ts



;// CONCATENATED MODULE: ./src/resources/2015/ChateauMantegna.ts


function ChateauMantegna_have() {
  return get("chateauAvailable");
}
function paintingMonster() {
  return get("chateauMonster");
}
function paintingFought() {
  return get("_chateauMonsterFought");
}
function fightPainting() {
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", false);
  return (0,external_kolmafia_namespaceObject.runCombat)();
}
var desks = ["fancy stationery set", "Swiss piggy bank", "continental juice bar"];
var ceilings = ["antler chandelier", "ceiling fan", "artificial skylight"];
var nightstands = ["foreign language tapes", "bowl of potpourri", "electric muscle stimulator"];
function getDesk() {
  var _desks$find;

  return (_desks$find = desks.find(desk => Object.keys((0,external_kolmafia_namespaceObject.getChateau)()).includes(desk))) !== null && _desks$find !== void 0 ? _desks$find : null;
}
function getCeiling() {
  var _ceilings$find;

  return (_ceilings$find = ceilings.find(ceiling => Object.keys((0,external_kolmafia_namespaceObject.getChateau)()).includes(ceiling))) !== null && _ceilings$find !== void 0 ? _ceilings$find : null;
}
function getNightstand() {
  var _nightstands$find;

  return (_nightstands$find = nightstands.find(nightstand => Object.keys((0,external_kolmafia_namespaceObject.getChateau)()).includes(nightstand))) !== null && _nightstands$find !== void 0 ? _nightstands$find : null;
}
function changeDesk(desk) {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  (0,external_kolmafia_namespaceObject.buy)(external_kolmafia_namespaceObject.Item.get(desk));
  return getDesk() === desk;
}
function changeCeiling(ceiling) {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  (0,external_kolmafia_namespaceObject.buy)(external_kolmafia_namespaceObject.Item.get(ceiling));
  return getCeiling() === ceiling;
}
function changeNightstand(nightstand) {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  (0,external_kolmafia_namespaceObject.buy)(external_kolmafia_namespaceObject.Item.get(nightstand));
  return getNightstand() === nightstand;
}
;// CONCATENATED MODULE: ./src/ascend.ts
var ascend_templateObject, ascend_templateObject2, ascend_templateObject3, ascend_templateObject4, ascend_templateObject5, ascend_templateObject6;

function ascend_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = ascend_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ascend_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ascend_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ascend_createClass(Constructor, protoProps, staticProps) { if (protoProps) ascend_defineProperties(Constructor.prototype, protoProps); if (staticProps) ascend_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function ascend_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ascend_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) ascend_setPrototypeOf(subClass, superClass); }

function ascend_createSuper(Derived) { var hasNativeReflectConstruct = ascend_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ascend_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ascend_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ascend_possibleConstructorReturn(this, result); }; }

function ascend_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return ascend_assertThisInitialized(self); }

function ascend_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ascend_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; ascend_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !ascend_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return ascend_construct(Class, arguments, ascend_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return ascend_setPrototypeOf(Wrapper, Class); }; return ascend_wrapNativeSuper(Class); }

function ascend_construct(Parent, args, Class) { if (ascend_isNativeReflectConstruct()) { ascend_construct = Reflect.construct; } else { ascend_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) ascend_setPrototypeOf(instance, Class.prototype); return instance; }; } return ascend_construct.apply(null, arguments); }

function ascend_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ascend_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function ascend_setPrototypeOf(o, p) { ascend_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ascend_setPrototypeOf(o, p); }

function ascend_getPrototypeOf(o) { ascend_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ascend_getPrototypeOf(o); }

function ascend_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ascend_slicedToArray(arr, i) { return ascend_arrayWithHoles(arr) || ascend_iterableToArrayLimit(arr, i) || ascend_unsupportedIterableToArray(arr, i) || ascend_nonIterableRest(); }

function ascend_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ascend_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ascend_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ascend_arrayLikeToArray(o, minLen); }

function ascend_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ascend_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ascend_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Lifestyle;

(function (Lifestyle) {
  Lifestyle[Lifestyle["casual"] = 1] = "casual";
  Lifestyle[Lifestyle["softcore"] = 2] = "softcore";
  Lifestyle[Lifestyle["normal"] = 2] = "normal";
  Lifestyle[Lifestyle["hardcore"] = 3] = "hardcore";
})(Lifestyle || (Lifestyle = {}));

function permedSkills() {
  return new Map(Array.from(Object.entries((0,external_kolmafia_namespaceObject.getPermedSkills)())).map(_ref => {
    var _ref2 = ascend_slicedToArray(_ref, 2),
        skillName = _ref2[0],
        isHardcore = _ref2[1];

    return [(0,external_kolmafia_namespaceObject.toSkill)(skillName), isHardcore ? Lifestyle.hardcore : Lifestyle.softcore];
  }));
}
var AscendError = /*#__PURE__*/function (_Error) {
  ascend_inherits(AscendError, _Error);

  var _super = ascend_createSuper(AscendError);

  function AscendError(cause) {
    var _this;

    ascend_classCallCheck(this, AscendError);

    if (!cause) {
      _this = _super.call(this, "Failed to ascend--do you have a pending trade offer?");

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Skill) {
      var reason = cause.permable ? (0,external_kolmafia_namespaceObject.haveSkill)(cause) ? "too karmaically expensive" : "not a skill you currently know" : "unpermable";
      _this = _super.call(this, "Skill ".concat(cause, " is ").concat(reason, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Item) {
      _this = _super.call(this, "Invalid astral item: ".concat(cause, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Class) {
      _this = _super.call(this, "Invalid class ".concat(cause, " for this path!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else if (cause instanceof external_kolmafia_namespaceObject.Path) {
      _this = _super.call(this, "Invalid path ".concat(cause, "!"));

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    } else {
      _this = _super.call(this, cause);

      ascend_defineProperty(ascend_assertThisInitialized(_this), "cause", void 0);
    }

    _this.cause = cause;
    return ascend_possibleConstructorReturn(_this);
  }

  return ascend_createClass(AscendError);
}( /*#__PURE__*/ascend_wrapNativeSuper(Error));
var worksheds = ["warbear LP-ROM burner", "warbear jackhammer drill press", "warbear induction oven", "warbear high-efficiency still", "warbear chemistry lab", "warbear auto-anvil", "spinning wheel", "snow machine", "Little Geneticist DNA-Splicing Lab", "portable Mayo Clinic", "Asdon Martin keyfob", "diabolic pizza cube", "cold medicine cabinet"];
var gardens = ["packet of pumpkin seeds", "Peppermint Pip Packet", "packet of dragon's teeth", "packet of beer seeds", "packet of winter seeds", "packet of thanksgarden seeds", "packet of tall grass seeds", "packet of mushroom spores"];
var eudorae = ["My Own Pen Pal kit", "GameInformPowerDailyPro subscription card", "Xi Receiver Unit", "New-You Club Membership Form", "Our Daily Candles™ order form"];
var isWorkshed = createStringUnionTypeGuardFunction(worksheds);
var isGarden = createStringUnionTypeGuardFunction(gardens);
var isEudora = createStringUnionTypeGuardFunction(eudorae);
var isDesk = createStringUnionTypeGuardFunction(desks);
var isNightstand = createStringUnionTypeGuardFunction(nightstands);
var isCeiling = createStringUnionTypeGuardFunction(ceilings);
var AscensionPrepError = /*#__PURE__*/function (_Error2) {
  ascend_inherits(AscensionPrepError, _Error2);

  var _super2 = ascend_createSuper(AscensionPrepError);

  function AscensionPrepError(cause, original) {
    var _this2;

    ascend_classCallCheck(this, AscensionPrepError);

    if (isWorkshed(cause)) {
      _this2 = _super2.call(this, "Unable to swap workshed to ".concat(cause, "; workshed is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isGarden(cause)) {
      _this2 = _super2.call(this, "Unable to swap garden to ".concat(cause, "; garden is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isEudora(cause)) {
      _this2 = _super2.call(this, "Unable to swap eudora to ".concat(cause, "; eudora is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isDesk(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau desk to ".concat(cause, "; desk is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isNightstand(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau nightstand to ".concat(cause, "; nightstand is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else if (isCeiling(cause)) {
      _this2 = _super2.call(this, "Unable to swap chateau ceiling to ".concat(cause, "; ceiling is currently ").concat(original, "."));

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    } else {
      _this2 = _super2.call(this, cause);

      ascend_defineProperty(ascend_assertThisInitialized(_this2), "cause", void 0);
    }

    _this2.cause = cause;
    return ascend_possibleConstructorReturn(_this2);
  }

  return ascend_createClass(AscensionPrepError);
}( /*#__PURE__*/ascend_wrapNativeSuper(Error));

function toMoonId(moon, playerClass) {
  if (typeof moon === "number") return moon;

  var offset = () => {
    switch (playerClass.primestat) {
      case $stat(ascend_templateObject || (ascend_templateObject = ascend_taggedTemplateLiteral(["Muscle"]))):
        return 0;

      case $stat(ascend_templateObject2 || (ascend_templateObject2 = ascend_taggedTemplateLiteral(["Mysticality"]))):
        return 1;

      case $stat(ascend_templateObject3 || (ascend_templateObject3 = ascend_taggedTemplateLiteral(["Moxie"]))):
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
  var charPaneText = (0,external_kolmafia_namespaceObject.visitUrl)("charpane.php"); // Match the infinity images (inf_small.gif, inf_large.gif)
  // At time of writing, the full img tag used is:
  // <img src="https://d2uyhvukfffg5a.cloudfront.net/otherimages/inf_small.gif">

  var matches = charPaneText.match(/<img src="[^"]*\/otherimages\/inf_\w+\.gif">/);
  return matches !== null;
}
/**
 * Hops the gash, perming no skills
 * @param path path of choice, as a Path object--these exist as properties of Paths
 * @param playerClass Your class of choice for this ascension
 * @param lifestyle 1 for casual, 2 for softcore, 3 for hardcore. Alternately, use the Lifestyle enum
 * @param moon Your moon sign as a string, or the zone you're looking for as a string
 * @param consumable From the astral deli. Pick the container item, not the product.
 * @param pet From the astral pet store.
 * @param permSkills A Map<Skill, Lifestyle> of skills you'd like to perm, ordered by priority.
 */


function ascend(path, playerClass, lifestyle, moon) {
  var consumable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : $item(ascend_templateObject4 || (ascend_templateObject4 = ascend_taggedTemplateLiteral(["astral six-pack"])));
  var pet = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
  var permOptions = arguments.length > 6 ? arguments[6] : undefined;

  if (playerClass.path !== (path.avatar ? path : external_kolmafia_namespaceObject.Path.none)) {
    throw new AscendError(playerClass);
  }

  if (path.id < 0) throw new AscendError(path);
  var moonId = toMoonId(moon, playerClass);
  if (moonId < 1 || moonId > 9) throw new Error("Invalid moon ".concat(moon));

  if (consumable && !$items(ascend_templateObject5 || (ascend_templateObject5 = ascend_taggedTemplateLiteral(["astral six-pack, astral hot dog dinner, [10882]carton of astral energy drinks"]))).includes(consumable)) {
    throw new AscendError(consumable);
  }

  if (pet && !$items(ascend_templateObject6 || (ascend_templateObject6 = ascend_taggedTemplateLiteral(["astral bludgeon, astral shield, astral chapeau, astral bracer, astral longbow, astral shorts, astral mace, astral trousers, astral ring, astral statuette, astral pistol, astral mask, astral pet sweater, astral shirt, astral belt"]))).includes(pet)) {
    throw new AscendError(pet);
  }

  var illegalSkill = permOptions ? Array.from(permOptions.permSkills.keys()).find(skill => !skill.permable || !(0,external_kolmafia_namespaceObject.haveSkill)(skill)) : undefined;

  if (illegalSkill) {
    throw new AscendError(illegalSkill);
  }

  if (!isInValhalla()) {
    (0,external_kolmafia_namespaceObject.visitUrl)("ascend.php?action=ascend&confirm=on&confirm2=on");
  }

  if (!isInValhalla()) {
    throw new AscendError();
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=pearlygates");

  if (consumable) {
    (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=buydeli&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(consumable)));
  }

  if (pet) (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=buyarmory&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(pet)));

  if (permOptions) {
    var currentPerms = permedSkills();
    var karma = get("bankedKarma");

    var _iterator = ascend_createForOfIteratorHelper(permOptions.permSkills.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _currentPerms$get;

        var _step$value = ascend_slicedToArray(_step.value, 2),
            skill = _step$value[0],
            prospectivePermLevel = _step$value[1];

        var currentPermLevel = (_currentPerms$get = currentPerms.get(skill)) !== null && _currentPerms$get !== void 0 ? _currentPerms$get : Lifestyle.casual;

        if (prospectivePermLevel > currentPermLevel) {
          var expectedKarma = 100 * (prospectivePermLevel - currentPermLevel);

          if (karma < expectedKarma) {
            if (!permOptions.neverAbort) throw new AscendError(skill);
            continue;
          }

          karma -= expectedKarma;
          var permText = prospectivePermLevel === Lifestyle.hardcore ? "hcperm" : "scperm";
          (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=".concat(permText, "&whichskill=").concat((0,external_kolmafia_namespaceObject.toInt)(skill)));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("afterlife.php?action=ascend&confirmascend=1&whichsign=".concat(moonId, "&gender=2&whichclass=").concat((0,external_kolmafia_namespaceObject.toInt)(playerClass), "&whichpath=").concat(path.id, "&asctype=").concat(lifestyle, "&nopetok=1&noskillsok=1&lamepathok=1&lamesignok=1&pwd"), true);
}
/**
 * Sets up various iotms you may want to use in the coming ascension
 * @param ascensionItems.workshed Workshed to switch to.
 * @param ascensionItems.garden Garden to switch to.
 * @param ascensionItems An object potentially containing your workshed, garden, chateau, and eudora, all as strings
 * @param throwOnFail If true, this will throw an error when it fails to switch something
 */

function prepareAscension() {
  var _throwOnFail;

  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      workshed = _ref3.workshed,
      garden = _ref3.garden,
      eudora = _ref3.eudora,
      chateau = _ref3.chateau,
      throwOnFail = _ref3.throwOnFail;

  throwOnFail = (_throwOnFail = throwOnFail) !== null && _throwOnFail !== void 0 ? _throwOnFail : true;

  if (workshed && (0,external_kolmafia_namespaceObject.getWorkshed)() !== external_kolmafia_namespaceObject.Item.get(workshed)) {
    (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get(workshed));

    if ((0,external_kolmafia_namespaceObject.getWorkshed)().name !== workshed && throwOnFail) {
      throw new AscensionPrepError(workshed, (0,external_kolmafia_namespaceObject.getWorkshed)());
    }
  }

  if (garden && !Object.getOwnPropertyNames((0,external_kolmafia_namespaceObject.getCampground)()).includes(garden)) {
    (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get(garden));
    var gardenName = Object.getOwnPropertyNames((0,external_kolmafia_namespaceObject.getCampground)()).find(isGarden);

    if (gardenName !== garden && throwOnFail) {
      throw new AscensionPrepError(garden, gardenName);
    }
  }

  if (eudora && (0,external_kolmafia_namespaceObject.eudoraItem)().name !== eudora) {
    var eudoraNumber = 1 + eudorae.indexOf(eudora);

    if (!(0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account.php?tab=correspondence"), "//select[@name=\"whichpenpal\"]/option/@value").includes(eudoraNumber.toString()) && throwOnFail) {
      throw new AscensionPrepError("Unable to swap eudora to ".concat(eudora, " because you are not subscribed to it."));
    } else {
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?actions[]=whichpenpal&whichpenpal=".concat(eudoraNumber, "&action=Update"), true);
    }

    if ((0,external_kolmafia_namespaceObject.eudoraItem)() !== external_kolmafia_namespaceObject.Item.get(eudora) && throwOnFail) {
      throw new AscensionPrepError(eudora, (0,external_kolmafia_namespaceObject.eudoraItem)());
    }
  }

  if (chateau && ChateauMantegna_have()) {
    var desk = chateau.desk,
        ceiling = chateau.ceiling,
        nightstand = chateau.nightstand;

    if (ceiling && getCeiling() !== ceiling) {
      if (!changeCeiling(ceiling) && throwOnFail) {
        var _ChateauMantegna$getC;

        throw new AscensionPrepError(ceiling, (_ChateauMantegna$getC = getCeiling()) !== null && _ChateauMantegna$getC !== void 0 ? _ChateauMantegna$getC : "unknown");
      }
    }

    if (desk && getDesk() !== desk) {
      if (!changeDesk(desk) && throwOnFail) {
        var _ChateauMantegna$getD;

        throw new AscensionPrepError(desk, (_ChateauMantegna$getD = getDesk()) !== null && _ChateauMantegna$getD !== void 0 ? _ChateauMantegna$getD : "unknown");
      }
    }

    if (nightstand && getNightstand() !== nightstand) {
      if (!changeNightstand(nightstand) && throwOnFail) {
        var _ChateauMantegna$getN;

        throw new AscensionPrepError(nightstand, (_ChateauMantegna$getN = getNightstand()) !== null && _ChateauMantegna$getN !== void 0 ? _ChateauMantegna$getN : "unknown");
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/Clan.ts
function Clan_toConsumableArray(arr) { return Clan_arrayWithoutHoles(arr) || Clan_iterableToArray(arr) || Clan_unsupportedIterableToArray(arr) || Clan_nonIterableSpread(); }

function Clan_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Clan_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Clan_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Clan_arrayLikeToArray(arr); }

function Clan_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Clan_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Clan_slicedToArray(arr, i) { return Clan_arrayWithHoles(arr) || Clan_iterableToArrayLimit(arr, i) || Clan_unsupportedIterableToArray(arr, i) || Clan_nonIterableRest(); }

function Clan_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Clan_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Clan_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Clan_arrayLikeToArray(o, minLen); }

function Clan_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Clan_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Clan_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Clan_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Clan_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Clan_createClass(Constructor, protoProps, staticProps) { if (protoProps) Clan_defineProperties(Constructor.prototype, protoProps); if (staticProps) Clan_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Clan_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, void 0, groups); }; var _super = RegExp.prototype, _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); return _groups.set(_this, groups || _groups.get(re)), Clan_setPrototypeOf(_this, BabelRegExp.prototype); } function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { return groups[name] = result[g[name]], groups; }, Object.create(null)); } return Clan_inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); return result && (result.groups = buildGroups(result, this)), result; }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if ("string" == typeof substitution) { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } if ("function" == typeof substitution) { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args); }); } return _super[Symbol.replace].call(this, str, substitution); }, _wrapRegExp.apply(this, arguments); }

function Clan_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Clan_setPrototypeOf(subClass, superClass); }

function Clan_setPrototypeOf(o, p) { Clan_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Clan_setPrototypeOf(o, p); }





var clanIdCache = {};

var toPlayerId = player => typeof player === "string" ? (0,external_kolmafia_namespaceObject.getPlayerId)(player) : player;

var LOG_FAX_PATTERN = /*#__PURE__*/_wrapRegExp(/(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (.*?))<br>/, {
  monster: 3
});

var WHITELIST_DEGREE_PATTERN = /*#__PURE__*/_wrapRegExp(/(.*?) \(\xB0(\d+)\)/, {
  name: 1,
  degree: 2
});

var Clan = /*#__PURE__*/function () {
  function Clan(id, name) {
    Clan_classCallCheck(this, Clan);

    Clan_defineProperty(this, "id", void 0);

    Clan_defineProperty(this, "name", void 0);

    this.id = id;
    this.name = name;
  }

  Clan_createClass(Clan, [{
    key: "_check",
    value: function _check() {
      if (this.id !== (0,external_kolmafia_namespaceObject.getClanId)()) {
        throw new Error("You are no longer a member of this clan");
      }
    }
    /**
     * Join clan
     */

  }, {
    key: "join",
    value: function join() {
      return Clan.join(this.id);
    }
  }, {
    key: "check",
    value: function check() {
      return (0,external_kolmafia_namespaceObject.visitUrl)("clan_hall.php").includes("<b>".concat(this.name, "</b>"));
    }
    /**
     * Return the monster that is currently in the current clan's fax machine if any
     */

  }, {
    key: "getCurrentFax",
    value: function getCurrentFax() {
      this._check();

      var logs = (0,external_kolmafia_namespaceObject.visitUrl)("clan_log.php");
      var lastFax = logs.match(LOG_FAX_PATTERN);
      if (!lastFax) return null;

      var _lastFax = Clan_slicedToArray(lastFax, 4),
          monsterName = _lastFax[3];

      if (!monsterName) return null;
      return external_kolmafia_namespaceObject.Monster.get(monsterName);
    }
    /**
     * List available ranks (name, degree and id) from the current clan
     */

  }, {
    key: "getRanks",
    value: function getRanks() {
      this._check();

      var page = (0,external_kolmafia_namespaceObject.visitUrl)("clan_whitelist.php");
      return (0,external_kolmafia_namespaceObject.xpath)(page, '//select[@name="level"]//option').map(option => {
        var validHtml = "<select>".concat(option, "</select>");
        var match = (0,external_kolmafia_namespaceObject.xpath)(validHtml, "//text()")[0].match(WHITELIST_DEGREE_PATTERN);
        var id = (0,external_kolmafia_namespaceObject.xpath)(validHtml, "//@value")[0];
        if (!match || !id) return null;

        var _match = Clan_slicedToArray(match, 3),
            name = _match[1],
            degree = _match[2];

        return {
          name,
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
    value: function addPlayerToWhitelist(player, rankName) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      this._check();

      var playerId = toPlayerId(player);
      var ranks = this.getRanks();
      var rank = rankName ? ranks.find(r => r.name === rankName) : ranks.sort((a, b) => a.degree - b.degree)[0];
      if (!rank) return false;
      var result = (0,external_kolmafia_namespaceObject.visitUrl)("clan_whitelist.php?action=add&pwd&addwho=".concat(playerId, "&level=").concat(rank.id, "&title=").concat(title));
      return result.includes("added to whitelist.") || result.includes("That player is already on the whitelist");
    }
    /**
     * Remove a player from the current clan's whitelist
     * @param player Player id or name
     */

  }, {
    key: "removePlayerFromWhitelist",
    value: function removePlayerFromWhitelist(player) {
      this._check();

      var playerId = toPlayerId(player);
      var result = (0,external_kolmafia_namespaceObject.visitUrl)("clan_whitelist.php?action=updatewl&pwd&who=".concat(playerId, "&remove=Remove"));
      return result.includes("Whitelist updated.");
    }
    /**
     * Return the amount of meat in the current clan's coffer.
     */

  }, {
    key: "getMeatInCoffer",
    value: function getMeatInCoffer() {
      this._check();

      var page = (0,external_kolmafia_namespaceObject.visitUrl)("clan_stash.php");

      var _ref = page.match(/Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./) || ["0", "0"],
          _ref2 = Clan_slicedToArray(_ref, 2),
          meat = _ref2[1];

      return parseNumber(meat);
    }
    /**
     * Add the given amount of meat to the current clan's coffer.
     * @param amount Amount of meat to put in coffer
     */

  }, {
    key: "putMeatInCoffer",
    value: function putMeatInCoffer(amount) {
      this._check();

      var result = (0,external_kolmafia_namespaceObject.visitUrl)("clan_stash.php?pwd&action=contribute&howmuch=".concat(amount));
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
    value: function take(items) {
      this._check();

      var map = arrayToCountedMap(items);
      map.forEach((quantity, item) => {
        var needed = Math.max(0, quantity - (0,external_kolmafia_namespaceObject.availableAmount)(item));

        if (needed === 0) {
          return map.set(item, 0);
        }

        var foldGroup = getFoldGroup(item);

        var _iterator = Clan_createForOfIteratorHelper(foldGroup),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var foldable = _step.value;
            var quantityToFold = Math.min(needed, (0,external_kolmafia_namespaceObject.availableAmount)(foldable));

            for (var _i3 = 0; _i3 < quantityToFold; _i3++) {
              (0,external_kolmafia_namespaceObject.cliExecute)("fold ".concat(item.name));
              needed--;
            }

            return map.set(item, needed);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        (0,external_kolmafia_namespaceObject.refreshStash)();

        for (var _i2 = 0, _arr2 = [item].concat(Clan_toConsumableArray(foldGroup)); _i2 < _arr2.length; _i2++) {
          var matchingItem = _arr2[_i2];
          var quantityToTake = Math.min(needed, (0,external_kolmafia_namespaceObject.stashAmount)(matchingItem));
          if (quantityToTake === 0) continue; // If we can't take from the stash, there's no sense in iterating through the whole fold group

          if (!(0,external_kolmafia_namespaceObject.takeStash)(quantityToTake, matchingItem)) return;

          if (matchingItem === item) {
            needed -= quantityToTake;
          } else {
            for (var i = 0; i < quantityToTake; i++) {
              (0,external_kolmafia_namespaceObject.cliExecute)("fold ".concat(matchingItem.name));
              needed--;
            }
          }
        }
      });
      return Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Put items in the stash
     * @param items Items to put in the stash
     * @returns Items successfully put in the stash
     */

  }, {
    key: "put",
    value: function put(items) {
      this._check();

      var map = arrayToCountedMap(items);
      if (!this.check()) throw new Error("Wanted to return ".concat(countedMapToString(map), " to ").concat(this.name, " but KoLmafia's clan data is out of sync"));
      map.forEach((quantity, item) => {
        (0,external_kolmafia_namespaceObject.retrieveItem)(quantity, item);
        var returned = Math.min(quantity, (0,external_kolmafia_namespaceObject.availableAmount)(item));
        (0,external_kolmafia_namespaceObject.putStash)(returned, item);
        map.set(item, quantity - returned);
      });
      return Array.isArray(items) ? countedMapToArray(map) : map;
    }
    /**
     * Return the monster that is currently in the current clan's fax machine if any
     */

  }, {
    key: "withStash",
    value: function withStash(items, callback) {
      this._check();

      var map = arrayToCountedMap(items);
      return Clan._withStash(() => this.take(map), borrowed => this.put(borrowed), callback);
    }
  }], [{
    key: "_join",
    value: function _join(id) {
      var result = (0,external_kolmafia_namespaceObject.visitUrl)("showclan.php?recruiter=1&whichclan=".concat(id, "&pwd&whichclan=").concat(id, "&action=joinclan&apply=Apply+to+this+Clan&confirm=on"));

      if (!result.includes("clanhalltop.gif")) {
        throw new Error("Could not join clan");
      }

      return Clan.get();
    }
  }, {
    key: "_withStash",
    value: function _withStash(borrowFn, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    returnFn, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback) {
      var borrowed = borrowFn();
      var map = arrayToCountedMap(borrowed);

      try {
        return callback(borrowed);
      } finally {
        if (map.size > 0) {
          var returned = arrayToCountedMap(returnFn(borrowed));
          map.forEach((quantity, item) => {
            var remaining = quantity - (returned.get(item) || 0);

            if (remaining > 0) {
              map.set(item, remaining);
            } else {
              map.delete(item);
            }
          });

          if (map.size > 0) {
            logger.error("Failed to return <b>".concat(countedMapToString(map), "</b> to <b>").concat(this.name, "</b> stash"));
          }
        }
      }
    }
    /**
     * Join a clan and return its instance
     * @param clanIdOrName Clan id or name
     */

  }, {
    key: "join",
    value: function join(clanIdOrName) {
      var clanId;

      if (typeof clanIdOrName === "string") {
        var _clanName = clanIdOrName.toLowerCase();

        if (_clanName === (0,external_kolmafia_namespaceObject.getClanName)().toLowerCase()) {
          return Clan.get();
        }

        if (!(_clanName in clanIdCache)) {
          var clan = Clan.getWhitelisted().find(c => c.name.toLowerCase() === _clanName);

          if (!clan) {
            throw new Error("Player is not whitelisted to clan");
          }

          clanIdCache[_clanName] = clan.id;
        }

        clanId = clanIdCache[_clanName];
      } else {
        clanId = clanIdOrName;

        if (clanId === (0,external_kolmafia_namespaceObject.getClanId)()) {
          return Clan.get();
        }
      }

      return Clan._join(clanId);
    }
    /**
     * Execute callback as a member of a clan
     * and then restore prior membership
     * @param clanIdOrName Clan id or name
     */

  }, {
    key: "with",
    value: function _with(clanIdOrName, callback) {
      var startingClan = Clan.get();
      var clan = Clan.join(clanIdOrName);

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
    value: function withStash(clanIdOrName, items, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    callback) {
      return Clan._withStash(() => Clan.with(clanIdOrName, clan => clan.take(items)), borrowed => Clan.with(clanIdOrName, clan => clan.put(borrowed)), callback);
    }
    /**
     * Return player's current Clan
     */

  }, {
    key: "get",
    value: function get() {
      return new Clan((0,external_kolmafia_namespaceObject.getClanId)(), (0,external_kolmafia_namespaceObject.getClanName)());
    }
    /**
     * Get list of clans to which the player is whitelisted
     */

  }, {
    key: "getWhitelisted",
    value: function getWhitelisted() {
      var page = (0,external_kolmafia_namespaceObject.visitUrl)("clan_signup.php");
      return (0,external_kolmafia_namespaceObject.xpath)(page, '//select[@name="whichclan"]//option').map(option => {
        var validHtml = "<select>".concat(option, "</select>");
        var id = Number.parseInt((0,external_kolmafia_namespaceObject.xpath)(validHtml, "//@value")[0]);
        var name = (0,external_kolmafia_namespaceObject.xpath)(validHtml, "//text()")[0];
        return new Clan(id, name);
      });
    }
  }]);

  return Clan;
}();
;// CONCATENATED MODULE: ./src/modifierTypes.ts
// THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseModifiers.ts for more information
var booleanModifiers = ["Softcore Only", "Single Equip", "Never Fumble", "Weakens Monster", "Free Pull", "Variable", "Nonstackable Watch", "Cold Immunity", "Hot Immunity", "Sleaze Immunity", "Spooky Immunity", "Stench Immunity", "Cold Vulnerability", "Hot Vulnerability", "Sleaze Vulnerability", "Spooky Vulnerability", "Stench Vulnerability", "Moxie Controls MP", "Moxie May Control MP", "Four Songs", "Adventure Underwater", "Underwater Familiar", "Generic", "Unarmed", "No Pull", "Lasts Until Rollover", "Attacks Can't Miss", "Pirate", "Breakable", "Drops Items", "Drops Meat"];
var classModifiers = ["Class"];
var numericModifiers = ["Familiar Weight", "Monster Level", "Combat Rate", "Initiative", "Experience", "Item Drop", "Meat Drop", "Damage Absorption", "Damage Reduction", "Cold Resistance", "Hot Resistance", "Sleaze Resistance", "Spooky Resistance", "Stench Resistance", "Mana Cost", "Moxie", "Moxie Percent", "Muscle", "Muscle Percent", "Mysticality", "Mysticality Percent", "Maximum HP", "Maximum HP Percent", "Maximum MP", "Maximum MP Percent", "Weapon Damage", "Ranged Damage", "Spell Damage", "Spell Damage Percent", "Cold Damage", "Hot Damage", "Sleaze Damage", "Spooky Damage", "Stench Damage", "Cold Spell Damage", "Hot Spell Damage", "Sleaze Spell Damage", "Spooky Spell Damage", "Stench Spell Damage", "Underwater Combat Rate", "Fumble", "HP Regen Min", "HP Regen Max", "MP Regen Min", "MP Regen Max", "Adventures", "Familiar Weight Percent", "Weapon Damage Percent", "Ranged Damage Percent", "Stackable Mana Cost", "Hobo Power", "Base Resting HP", "Resting HP Percent", "Bonus Resting HP", "Base Resting MP", "Resting MP Percent", "Bonus Resting MP", "Critical Hit Percent", "PvP Fights", "Volleyball", "Sombrero", "Leprechaun", "Fairy", "Meat Drop Penalty", "Hidden Familiar Weight", "Item Drop Penalty", "Initiative Penalty", "Food Drop", "Booze Drop", "Hat Drop", "Weapon Drop", "Offhand Drop", "Shirt Drop", "Pants Drop", "Accessory Drop", "Volleyball Effectiveness", "Sombrero Effectiveness", "Leprechaun Effectiveness", "Fairy Effectiveness", "Familiar Weight Cap", "Slime Resistance", "Slime Hates It", "Spell Critical Percent", "Muscle Experience", "Mysticality Experience", "Moxie Experience", "Effect Duration", "Candy Drop", "DB Combat Damage", "Sombrero Bonus", "Familiar Experience", "Sporadic Meat Drop", "Sporadic Item Drop", "Meat Bonus", "Pickpocket Chance", "Combat Mana Cost", "Muscle Experience Percent", "Mysticality Experience Percent", "Moxie Experience Percent", "Minstrel Level", "Muscle Limit", "Mysticality Limit", "Moxie Limit", "Song Duration", "Prismatic Damage", "Smithsness", "Supercold Resistance", "Reduce Enemy Defense", "Pool Skill", "Surgeonosity", "Familiar Damage", "Gear Drop", "Maximum Hooch", "Water Level", "Crimbot Outfit Power", "Familiar Tuning Muscle", "Familiar Tuning Mysticality", "Familiar Tuning Moxie", "Random Monster Modifiers", "Luck", "Othello Skill", "Disco Style", "Rollover Effect Duration", "Sixgun Damage", "Fishing Skill", "Additional Song", "Sprinkle Drop", "Absorb Adventures", "Absorb Stats", "Rubee Drop", "Kruegerand Drop", "WarBear Armor Penetration", "Clowniness", "Maximum PP", "Plumber Power", "Drippy Damage", "Drippy Resistance", "Energy", "Scrap", "Familiar Action Bonus", "Water"];
var effectModifiers = ["Effect", "Rollover Effect"];
var monsterModifiers = ["Avatar"];
var skillModifiers = ["Skill"];
var statModifiers = ["Plumber Stat"];
var stringModifiers = ["Intrinsic Effect", "Equalize", "Wiki Name", "Modifiers", "Outfit", "Stat Tuning", "Equips On", "Familiar Effect", "Jiggle", "Equalize Muscle", "Equalize Mysticality", "Equalize Moxie", "Floor Buffed Muscle", "Floor Buffed Mysticality", "Floor Buffed Moxie"];
;// CONCATENATED MODULE: ./src/modifier.ts
function modifier_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function modifier_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? modifier_ownKeys(Object(source), !0).forEach(function (key) { modifier_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : modifier_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function modifier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function modifier_get(name, subject) {
  if (arrayContains(name, booleanModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.booleanModifier)(name) : (0,external_kolmafia_namespaceObject.booleanModifier)(subject, name);
  }

  if (arrayContains(name, classModifiers)) {
    return (0,external_kolmafia_namespaceObject.classModifier)(subject, name);
  }

  if (arrayContains(name, effectModifiers)) {
    return (0,external_kolmafia_namespaceObject.effectModifier)(subject, name);
  }

  if (arrayContains(name, monsterModifiers)) {
    return (0,external_kolmafia_namespaceObject.monsterModifier)(subject, name);
  }

  if (arrayContains(name, numericModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.numericModifier)(name) : (0,external_kolmafia_namespaceObject.numericModifier)(subject, name);
  }

  if (arrayContains(name, skillModifiers)) {
    return (0,external_kolmafia_namespaceObject.skillModifier)(subject, name);
  }

  if (arrayContains(name, stringModifiers)) {
    return subject === undefined ? (0,external_kolmafia_namespaceObject.stringModifier)(name) : (0,external_kolmafia_namespaceObject.stringModifier)(subject, name);
  }

  if (arrayContains(name, statModifiers)) {
    return (0,external_kolmafia_namespaceObject.statModifier)(subject, name);
  }
}

/**
 * Merge two Modifiers objects into one, summing all numeric modifiers, ||ing all boolean modifiers, and otherwise letting the second object overwrite the first.
 * @param modifiers1 Modifiers objects to be merged onto.
 * @param modifiers2 Modifiers object to merge.
 * @returns A single Modifiers object obtained by merging.
 */
function pairwiseMerge(modifiers1, modifiers2) {
  var returnValue = modifier_objectSpread(modifier_objectSpread({}, modifiers1), modifiers2);

  for (var modifier in modifiers1) {
    if (Array.from(Object.values(modifiers2)).includes(modifier)) {
      if (arrayContains(modifier, numericModifiers)) {
        var _modifiers1$modifier, _modifiers2$modifier;

        returnValue[modifier] = ((_modifiers1$modifier = modifiers1[modifier]) !== null && _modifiers1$modifier !== void 0 ? _modifiers1$modifier : 0) + ((_modifiers2$modifier = modifiers2[modifier]) !== null && _modifiers2$modifier !== void 0 ? _modifiers2$modifier : 0);
      }

      if (arrayContains(modifier, booleanModifiers)) {
        var _modifiers1$modifier2, _modifiers2$modifier2;

        returnValue[modifier] = ((_modifiers1$modifier2 = modifiers1[modifier]) !== null && _modifiers1$modifier2 !== void 0 ? _modifiers1$modifier2 : false) || ((_modifiers2$modifier2 = modifiers2[modifier]) !== null && _modifiers2$modifier2 !== void 0 ? _modifiers2$modifier2 : false);
      }
    }
  }

  return returnValue;
}
/**
 * Merge arbitrarily many Modifiers objects into one, summing all numeric modifiers, and ||ing all boolean modifiers.
 * @param modifierss Modifiers objects to be merged together.
 * @returns A single Modifiers object obtained by merging.
 */


function mergeModifiers() {
  for (var _len = arguments.length, modifierss = new Array(_len), _key = 0; _key < _len; _key++) {
    modifierss[_key] = arguments[_key];
  }

  return modifierss.reduce((a, b) => pairwiseMerge(a, b), {});
}
;// CONCATENATED MODULE: ./src/resources/2017/MummingTrunk.ts
function MummingTrunk_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = MummingTrunk_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function MummingTrunk_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return MummingTrunk_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return MummingTrunk_arrayLikeToArray(o, minLen); }

function MummingTrunk_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function toModifier(input) {
  var regExp = new RegExp(/Experience \((.*?)\)/);
  var matcher = input.match(regExp);
  return matcher ? "".concat(matcher[2], " Experience") : input;
}
/**
 * Parses the _mummeryMods preference into a Map for easier use.
 * @returns A map, mapping Familiars to a Tuple consisting of the NumericModifier attached to the familiar, and the value thereof.
 */


function currentCostumes() {
  var entries = get("_mummeryMods").split(",");
  var returnValue = new Map();
  var regExp = new RegExp(/([^:]+): \[(d+)\*fam\(([^)]+)\)\]/);

  var _iterator = MummingTrunk_createForOfIteratorHelper(entries),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var entry = _step.value;
      var matcher = entry.match(regExp);

      if (matcher) {
        returnValue.set((0,external_kolmafia_namespaceObject.toFamiliar)(matcher[3]), [toModifier(matcher[1]), parseInt(matcher[2])]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
;// CONCATENATED MODULE: ./src/challengePaths/2015/CommunityService.ts
var CommunityService_templateObject, CommunityService_templateObject2, CommunityService_templateObject3, CommunityService_templateObject4, CommunityService_templateObject5, CommunityService_templateObject6, CommunityService_templateObject7, CommunityService_templateObject8, CommunityService_templateObject9, CommunityService_templateObject10, CommunityService_templateObject11, CommunityService_templateObject12, CommunityService_templateObject13, CommunityService_templateObject14, CommunityService_templateObject15, CommunityService_templateObject16, CommunityService_templateObject17, CommunityService_templateObject18, CommunityService_templateObject19, CommunityService_templateObject20, CommunityService_templateObject21, CommunityService_templateObject22, CommunityService_templateObject23, CommunityService_templateObject24, CommunityService_templateObject25, CommunityService_templateObject26, CommunityService_templateObject27;

function CommunityService_slicedToArray(arr, i) { return CommunityService_arrayWithHoles(arr) || CommunityService_iterableToArrayLimit(arr, i) || CommunityService_unsupportedIterableToArray(arr, i) || CommunityService_nonIterableRest(); }

function CommunityService_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CommunityService_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CommunityService_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CommunityService_arrayLikeToArray(o, minLen); }

function CommunityService_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CommunityService_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CommunityService_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CommunityService_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CommunityService_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CommunityService_createClass(Constructor, protoProps, staticProps) { if (protoProps) CommunityService_defineProperties(Constructor.prototype, protoProps); if (staticProps) CommunityService_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function CommunityService_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CommunityService_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var thralls = new Map([[$stat(CommunityService_templateObject || (CommunityService_templateObject = CommunityService_taggedTemplateLiteral(["muscle"]))), $thrall(CommunityService_templateObject2 || (CommunityService_templateObject2 = CommunityService_taggedTemplateLiteral(["Elbow Macaroni"])))], [$stat(CommunityService_templateObject3 || (CommunityService_templateObject3 = CommunityService_taggedTemplateLiteral(["moxie"]))), $thrall(CommunityService_templateObject4 || (CommunityService_templateObject4 = CommunityService_taggedTemplateLiteral(["Penne Dreadful"])))]]);

var statCommunityServicePredictor = stat => {
  return () => 60 - Math.floor(1 / 30 * ((0,external_kolmafia_namespaceObject.myBuffedstat)(stat) - (0,external_kolmafia_namespaceObject.myBasestat)(thralls.get(stat) === (0,external_kolmafia_namespaceObject.myThrall)() && !have($effect(CommunityService_templateObject5 || (CommunityService_templateObject5 = CommunityService_taggedTemplateLiteral(["Expert Oiliness"])))) ? $stat(CommunityService_templateObject6 || (CommunityService_templateObject6 = CommunityService_taggedTemplateLiteral(["mysticality"]))) : stat)));
};

var visitCouncil = () => (0,external_kolmafia_namespaceObject.visitUrl)("council.php");

var CommunityService = /*#__PURE__*/function () {
  /**
   * Class to store properties of various CS tests.
   * @param id The id the game HTML uses to identify the test; this is used primarily in runChoice.
   * @param stat The principle stat the test measures, often used as more easily memorable shorthand for the specific tests
   * @param property The name of the test as a string, often used as part of the string property "csServicesPerformed".
   * @param predictor A function that returns an estimate for the number of turns that the test will take given your character's current state.
   * @param maximizeRequirements A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
   */
  function CommunityService(id, stat, property, predictor, maximizeRequirements) {
    CommunityService_classCallCheck(this, CommunityService);

    CommunityService_defineProperty(this, "choice", void 0);

    CommunityService_defineProperty(this, "stat", void 0);

    CommunityService_defineProperty(this, "property", void 0);

    CommunityService_defineProperty(this, "predictor", void 0);

    CommunityService_defineProperty(this, "maximizeRequirements", void 0);

    this.choice = id;
    this.stat = stat;
    this.property = property;
    this.predictor = predictor;
    this.maximizeRequirements = maximizeRequirements;
  }
  /**
   * @returns The id number of the test, used primarily in runChoice.
   */


  CommunityService_createClass(CommunityService, [{
    key: "id",
    get: function get() {
      return this.choice;
    }
    /**
     * @returns The primary stat the test measures, used primarily as memorable shorthand in place of test names.
     */

  }, {
    key: "statName",
    get: function get() {
      return this.stat;
    }
    /**
     * @returns The name of the test, used primarily as part of the string property "csServicesPerformed"
     */

  }, {
    key: "name",
    get: function get() {
      return this.property;
    }
    /**
     *  @returns The predicted number of turns this test will take given your character's current state.
     */

  }, {
    key: "prediction",
    get: function get() {
      return this.predictor();
    }
    /**
     * @returns A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
     */

  }, {
    key: "requirement",
    get: function get() {
      return this.maximizeRequirements;
    }
  }, {
    key: "isDone",
    value:
    /**
     * Checks the "csServicesPerformed" property to see whether mafia currently believes this test is complete.
     * @returns Whether mafia currently believes this test is complete.
     */
    function isDone() {
      return get("csServicesPerformed").includes(this.property);
    }
    /**
     * Maximizes based on the Requirement associated with this particular test.
     */

  }, {
    key: "maximize",
    value: function maximize() {
      if (this.maximizeRequirements) this.maximizeRequirements.maximize();
    }
    /**
     * Attempts to turn in the test to the Council of Loathing.
     * @returns Whether mafia believes the test is complete at the end of this function.
     */

  }, {
    key: "do",
    value: function _do() {
      if (get("csServicesPerformed").trim().length === 0) visitCouncil();
      visitCouncil();
      var councilText = (0,external_kolmafia_namespaceObject.runChoice)(this.choice);
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
    value: function run(prepare) {
      var maxTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      if (this.isDone()) return "already completed";
      var startTime = Date.now();
      var startTurns = (0,external_kolmafia_namespaceObject.myTurncount)();
      var additionalTurns;

      try {
        var _prepare;

        additionalTurns = (_prepare = prepare()) !== null && _prepare !== void 0 ? _prepare : 0;
      } catch (_unused) {
        return "failed";
      }

      var prediction = this.predictor();
      var council = visitCouncil();

      var turns = this._actualCost(council);

      if (!turns) return "already completed";

      if (turns > Math.min(maxTurns, (0,external_kolmafia_namespaceObject.myAdventures)())) {
        return "failed";
      }

      if (!this.do()) return "failed";
      CommunityService.log[this.property] = {
        predictedTurns: prediction + additionalTurns,
        turnCost: (0,external_kolmafia_namespaceObject.myTurncount)() - startTurns,
        seconds: (Date.now() - startTime) / 1000,
        type: "test"
      };
      return "completed";
    }
  }, {
    key: "_verifyIsDone",
    value: function _verifyIsDone(councilText) {
      return !councilText.includes("<input type=hidden name=option value=".concat(this.choice, ">"));
    }
    /**
     * Checks council.php to verify that a test is complete; more reliable than isDone, but requires an additional pagehit.
     * @returns Whether council.php suggests that the test is complete.
     */

  }, {
    key: "verifyIsDone",
    value: function verifyIsDone() {
      return this._verifyIsDone(visitCouncil());
    }
  }, {
    key: "_actualCost",
    value: function _actualCost(councilText) {
      var match = councilText.match("<input type=hidden name=option value=".concat(this.id, ">.*?Perform Service \\((\\d+) Adventures\\)"));
      return match ? parseInt(match[1]) : 0;
    }
    /**
     * Checks council.php for the number of turns this test will take; more reliable than prediction, but requires an additional pagehit.
     * @returns The number of turns to complete this test according to council.php.
     */

  }, {
    key: "actualCost",
    value: function actualCost() {
      return this._actualCost(visitCouncil());
    }
    /**
     * A log of the predicted turns, actual turns, and duration of each CS test performed.
     */

  }], [{
    key: "logTask",
    value: function logTask(name, action) {
      var _action;

      var startTime = Date.now();
      var startTurns = (0,external_kolmafia_namespaceObject.myTurncount)();
      var estimatedTurns = (_action = action()) !== null && _action !== void 0 ? _action : 0;
      CommunityService.log[name] = {
        type: "task",
        turnCost: (0,external_kolmafia_namespaceObject.myTurncount)() - startTurns,
        predictedTurns: estimatedTurns,
        seconds: (Date.now() - startTime) / 1000
      };
    }
  }, {
    key: "printLog",
    value:
    /**
     * Prints turncount and time details of the test in question.
     * @param colour The colour (or color) you'd like the log to be printed in.
     */
    function printLog() {
      var colour = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "blue";
      var logEntries = Object.entries(CommunityService.log);

      for (var _i = 0, _logEntries = logEntries; _i < _logEntries.length; _i++) {
        var _logEntries$_i = CommunityService_slicedToArray(_logEntries[_i], 2),
            testName = _logEntries$_i[0],
            testEntry = _logEntries$_i[1];

        var type = testEntry.type,
            predictedTurns = testEntry.predictedTurns,
            turnCost = testEntry.turnCost,
            seconds = testEntry.seconds;

        if (type === "test") {
          (0,external_kolmafia_namespaceObject.print)("We predicted the ".concat(testName, " test would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour);
          (0,external_kolmafia_namespaceObject.print)("".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour);
        } else {
          if (!(predictedTurns === 0 && turnCost === 0)) {
            (0,external_kolmafia_namespaceObject.print)("We predicted the task ".concat(testName, " would take ").concat(predictedTurns, " turns, ").concat(predictedTurns === turnCost ? "and" : "but", " it took ").concat(turnCost, " turns."), colour);
          }

          (0,external_kolmafia_namespaceObject.print)("The task ".concat(testName, " took ").concat(seconds.toFixed(1), " seconds."), colour);
        }
      }

      var totalTime = sum(logEntries, _ref => {
        var _ref2 = CommunityService_slicedToArray(_ref, 2),
            testEntry = _ref2[1];

        return testEntry.seconds;
      });
      (0,external_kolmafia_namespaceObject.print)("All together, you have spent ".concat(totalTime.toFixed(1), " seconds during this Community Service run"), colour);
    } // Below, we have the tests themselves.

  }]);

  return CommunityService;
}();

CommunityService_defineProperty(CommunityService, "log", {});

CommunityService_defineProperty(CommunityService, "HP", new CommunityService(1, "HP", "Donate Blood", () => 60 - Math.floor(((0,external_kolmafia_namespaceObject.myMaxhp)() - (0,external_kolmafia_namespaceObject.myBuffedstat)($stat(CommunityService_templateObject7 || (CommunityService_templateObject7 = CommunityService_taggedTemplateLiteral(["muscle"])))) - 3) / 30), new Requirement(["HP"], {})));

CommunityService_defineProperty(CommunityService, "Muscle", new CommunityService(2, "Muscle", "Feed The Children", statCommunityServicePredictor($stat(CommunityService_templateObject8 || (CommunityService_templateObject8 = CommunityService_taggedTemplateLiteral(["Muscle"])))), new Requirement(["Muscle"], {})));

CommunityService_defineProperty(CommunityService, "Mysticality", new CommunityService(3, "Mysticality", "Build Playground Mazes", statCommunityServicePredictor($stat(CommunityService_templateObject9 || (CommunityService_templateObject9 = CommunityService_taggedTemplateLiteral(["Mysticality"])))), new Requirement(["Mysticality"], {})));

CommunityService_defineProperty(CommunityService, "Moxie", new CommunityService(4, "Moxie", "Feed Conspirators", statCommunityServicePredictor($stat(CommunityService_templateObject10 || (CommunityService_templateObject10 = CommunityService_taggedTemplateLiteral(["Moxie"])))), new Requirement(["Moxie"], {})));

CommunityService_defineProperty(CommunityService, "FamiliarWeight", new CommunityService(5, "Familiar Weight", "Breed More Collies", () => 60 - Math.floor(((0,external_kolmafia_namespaceObject.familiarWeight)((0,external_kolmafia_namespaceObject.myFamiliar)()) + (0,external_kolmafia_namespaceObject.weightAdjustment)()) / 5), new Requirement(["Familiar Weight"], {})));

CommunityService_defineProperty(CommunityService, "WeaponDamage", new CommunityService(6, "Weapon Damage", "Reduce Gazelle Population", () => {
  var weaponPower = (0,external_kolmafia_namespaceObject.getPower)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject11 || (CommunityService_templateObject11 = CommunityService_taggedTemplateLiteral(["weapon"])))));
  var offhandPower = (0,external_kolmafia_namespaceObject.toSlot)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject12 || (CommunityService_templateObject12 = CommunityService_taggedTemplateLiteral(["off-hand"]))))) === $slot(CommunityService_templateObject13 || (CommunityService_templateObject13 = CommunityService_taggedTemplateLiteral(["weapon"]))) ? (0,external_kolmafia_namespaceObject.getPower)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject14 || (CommunityService_templateObject14 = CommunityService_taggedTemplateLiteral(["off-hand"]))))) : 0;
  var familiarPower = (0,external_kolmafia_namespaceObject.toSlot)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject15 || (CommunityService_templateObject15 = CommunityService_taggedTemplateLiteral(["familiar"]))))) === $slot(CommunityService_templateObject16 || (CommunityService_templateObject16 = CommunityService_taggedTemplateLiteral(["weapon"]))) ? (0,external_kolmafia_namespaceObject.getPower)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject17 || (CommunityService_templateObject17 = CommunityService_taggedTemplateLiteral(["familiar"]))))) : 0; // mafia does not currently count swagger

  var multiplier = have($effect(CommunityService_templateObject18 || (CommunityService_templateObject18 = CommunityService_taggedTemplateLiteral(["Bow-Legged Swagger"])))) ? 2 : 1; // We add 0.001 because the floor function sometimes introduces weird rounding errors

  return 60 - Math.floor(multiplier * (modifier_get("Weapon Damage") - 0.15 * (weaponPower + offhandPower + familiarPower)) / 50 + 0.001) - Math.floor(multiplier * modifier_get("Weapon Damage Percent") / 50 + 0.001);
}, new Requirement(["Weapon Damage", "Weapon Damage Percent"], {})));

CommunityService_defineProperty(CommunityService, "SpellDamage", new CommunityService(7, "Spell Damage", "Make Sausage", () => {
  var dragonfishDamage = (0,external_kolmafia_namespaceObject.myFamiliar)() === $familiar(CommunityService_templateObject19 || (CommunityService_templateObject19 = CommunityService_taggedTemplateLiteral(["Magic Dragonfish"]))) ? (0,external_kolmafia_namespaceObject.numericModifier)($familiar(CommunityService_templateObject20 || (CommunityService_templateObject20 = CommunityService_taggedTemplateLiteral(["Magic Dragonfish"]))), "Spell Damage Percent", (0,external_kolmafia_namespaceObject.familiarWeight)($familiar(CommunityService_templateObject21 || (CommunityService_templateObject21 = CommunityService_taggedTemplateLiteral(["Magic Dragonfish"])))) + (0,external_kolmafia_namespaceObject.weightAdjustment)(), $item.none) : 0; // We add 0.001 because the floor function sometimes introduces weird rounding errors

  return 60 - Math.floor(modifier_get("Spell Damage") / 50 + 0.001) - Math.floor((modifier_get("Spell Damage Percent") - dragonfishDamage) / 50 + 0.001);
}, new Requirement(["Spell Damage", "Spell Damage Percent"], {})));

CommunityService_defineProperty(CommunityService, "Noncombat", new CommunityService(8, "Non-Combat", "Be a Living Statue", () => {
  var noncombatRate = -1 * modifier_get("Combat Rate");
  var unsoftcappedRate = noncombatRate > 25 ? 25 + (noncombatRate - 25) * 5 : noncombatRate;
  return 60 - 3 * Math.floor(unsoftcappedRate / 5);
}, new Requirement(["-combat"], {})));

CommunityService_defineProperty(CommunityService, "BoozeDrop", new CommunityService(9, "Item Drop", "Make Margaritas", () => {
  var mummingCostume = currentCostumes().get((0,external_kolmafia_namespaceObject.myFamiliar)());
  var mummingBuff = mummingCostume && mummingCostume[0] === "Item Drop" ? mummingCostume[1] : 0;
  var familiarItemDrop = (0,external_kolmafia_namespaceObject.numericModifier)((0,external_kolmafia_namespaceObject.myFamiliar)(), "Item Drop", (0,external_kolmafia_namespaceObject.familiarWeight)((0,external_kolmafia_namespaceObject.myFamiliar)()) + (0,external_kolmafia_namespaceObject.weightAdjustment)(), (0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject22 || (CommunityService_templateObject22 = CommunityService_taggedTemplateLiteral(["familiar"]))))) + mummingBuff - (0,external_kolmafia_namespaceObject.numericModifier)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject23 || (CommunityService_templateObject23 = CommunityService_taggedTemplateLiteral(["familiar"])))), "Item Drop");
  var familiarBoozeDrop = (0,external_kolmafia_namespaceObject.numericModifier)((0,external_kolmafia_namespaceObject.myFamiliar)(), "Booze Drop", (0,external_kolmafia_namespaceObject.familiarWeight)((0,external_kolmafia_namespaceObject.myFamiliar)()) + (0,external_kolmafia_namespaceObject.weightAdjustment)(), (0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject24 || (CommunityService_templateObject24 = CommunityService_taggedTemplateLiteral(["familiar"]))))) - (0,external_kolmafia_namespaceObject.numericModifier)((0,external_kolmafia_namespaceObject.equippedItem)($slot(CommunityService_templateObject25 || (CommunityService_templateObject25 = CommunityService_taggedTemplateLiteral(["familiar"])))), "Booze Drop"); // Champagne doubling does NOT count for CS, so we undouble

  var multiplier = (0,external_kolmafia_namespaceObject.haveEquipped)($item(CommunityService_templateObject26 || (CommunityService_templateObject26 = CommunityService_taggedTemplateLiteral(["broken champagne bottle"])))) && get("garbageChampagneCharge") > 0 ? 0.5 : 1; // We add 0.001 because the floor function sometimes introduces weird rounding errors

  return 60 - Math.floor(multiplier * (modifier_get("Item Drop") - familiarItemDrop) / 30 + 0.001) - Math.floor((modifier_get("Booze Drop") - familiarBoozeDrop) / 15 + 0.001);
}, new Requirement(["Item Drop", "2 Booze Drop"], {
  preventEquip: $items(CommunityService_templateObject27 || (CommunityService_templateObject27 = CommunityService_taggedTemplateLiteral(["broken champagne bottle"])))
})));

CommunityService_defineProperty(CommunityService, "HotRes", new CommunityService(10, "Hot Resistance", "Clean Steam Tunnels", () => 60 - modifier_get("Hot Resistance"), new Requirement(["Hot Resistance"], {})));

CommunityService_defineProperty(CommunityService, "CoilWire", new CommunityService(11, "Coil Wire", "Coil Wire", () => 60, new Requirement([], {})));

CommunityService_defineProperty(CommunityService, "donate", () => {
  visitCouncil();
  (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1089&option=30");
});


;// CONCATENATED MODULE: ./src/challengePaths/2016/NuclearAutumn.ts

/**
 * Visits the Cooling Tank on level 8 of the Fallout shelter to gain 300 rads
 */

function coolingTank() {
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=falloutshelter&action=vault8");
}
/**
 * Visits the Spa Simulation Chamber on level 4 of the Fallout shelter for 100 turns of "100% all stats"
 */

function spa() {
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=falloutshelter&action=vault3");
}
/**
 * Visits the Chronodynamics Laboratory on level 5 of the Fallout shelter to permanently increase radiation level by 3
 */

function chronoLab() {
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=falloutshelter&action=vault5");
}
;// CONCATENATED MODULE: ./src/challengePaths/index.ts



;// CONCATENATED MODULE: ./src/counter.ts

/**
 * Returns Infinity for counters that do not exist, and otherwise returns the duration of the counter
 * @param counter The name of the counter in question
 * @returns Infinity if the counter does not exist; otherwise returns the duration of the counter
 */

function counter_get(counter) {
  var value = (0,external_kolmafia_namespaceObject.getCounter)(counter); // getCounter returns -1 for counters that don't exist, but it also returns -1 for counters whose value is -1

  if (value === -1) {
    // if we have a counter with value -1, we check to see if that counter exists via getCounters()
    // We return null if it doesn't exist
    return (0,external_kolmafia_namespaceObject.getCounters)(counter, -1, -1).trim() === "" ? Infinity : -1;
  }

  return value;
}
/**
 * The world is everything that is the case. This determines which counters are the case.
 * @param counter The name of the counter in question
 * @returns True for counters which currently exist; false for those which do not
 */

function exists(counter) {
  return (0,external_kolmafia_namespaceObject.getCounter)(counter) !== -1 || (0,external_kolmafia_namespaceObject.getCounters)(counter, -1, -1).trim() !== "";
}
/**
 * Creates a manual counter with specified name and duration
 * @param counter Name of the counter to manually create
 * @param duration Duration of counter to manually set
 * @returns Whether the counter was successfully set
 */

function set(counter, duration) {
  (0,external_kolmafia_namespaceObject.cliExecute)("counters add ".concat(duration, " ").concat(counter));
  return counter_get(counter) !== null;
}
;// CONCATENATED MODULE: ./src/resources/2015/MayoClinic.ts
var MayoClinic_templateObject, MayoClinic_templateObject2, MayoClinic_templateObject3, MayoClinic_templateObject4, MayoClinic_templateObject5, MayoClinic_templateObject6, MayoClinic_templateObject7, MayoClinic_templateObject8, MayoClinic_templateObject9, MayoClinic_templateObject10;

function MayoClinic_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Mayo = {
  nex: $item(MayoClinic_templateObject || (MayoClinic_templateObject = MayoClinic_taggedTemplateLiteral(["Mayonex"]))),
  diol: $item(MayoClinic_templateObject2 || (MayoClinic_templateObject2 = MayoClinic_taggedTemplateLiteral(["Mayodiol"]))),
  zapine: $item(MayoClinic_templateObject3 || (MayoClinic_templateObject3 = MayoClinic_taggedTemplateLiteral(["Mayozapine"]))),
  flex: $item(MayoClinic_templateObject4 || (MayoClinic_templateObject4 = MayoClinic_taggedTemplateLiteral(["Mayoflex"])))
};
function MayoClinic_installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === $item(MayoClinic_templateObject5 || (MayoClinic_templateObject5 = MayoClinic_taggedTemplateLiteral(["portable Mayo Clinic"])));
}
function MayoClinic_have() {
  return have($item(MayoClinic_templateObject6 || (MayoClinic_templateObject6 = MayoClinic_taggedTemplateLiteral(["portable Mayo Clinic"])))) || MayoClinic_installed();
}
/**
 * Sets mayo minder to a particular mayo, and ensures you have enough of it.
 * @param mayo Mayo to use
 * @param quantity Quantity to ensure
 */

function setMayoMinder(mayo) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if ((0,external_kolmafia_namespaceObject.getWorkshed)() !== $item(MayoClinic_templateObject7 || (MayoClinic_templateObject7 = MayoClinic_taggedTemplateLiteral(["portable Mayo Clinic"])))) return false;

  if (!Object.values(Mayo).includes(mayo)) {
    logger.error("Invalid mayo selected");
    return false;
  }

  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name) {
    logger.error("Currently have incorrect mayo in mouth");
    return false;
  }

  (0,external_kolmafia_namespaceObject.retrieveItem)(quantity, mayo);
  if (!have($item(MayoClinic_templateObject8 || (MayoClinic_templateObject8 = MayoClinic_taggedTemplateLiteral(["Mayo Minder\u2122"]))))) (0,external_kolmafia_namespaceObject.buy)($item(MayoClinic_templateObject9 || (MayoClinic_templateObject9 = MayoClinic_taggedTemplateLiteral(["Mayo Minder\u2122"]))));

  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, (0,external_kolmafia_namespaceObject.toInt)(mayo) - 8260, () => (0,external_kolmafia_namespaceObject.use)($item(MayoClinic_templateObject10 || (MayoClinic_templateObject10 = MayoClinic_taggedTemplateLiteral(["Mayo Minder\u2122"])))));
  }

  return get("mayoMinderSetting") === mayo.name;
}
;// CONCATENATED MODULE: ./src/diet/knapsack.ts
function knapsack_toConsumableArray(arr) { return knapsack_arrayWithoutHoles(arr) || knapsack_iterableToArray(arr) || knapsack_unsupportedIterableToArray(arr) || knapsack_nonIterableSpread(); }

function knapsack_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function knapsack_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function knapsack_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return knapsack_arrayLikeToArray(arr); }

function knapsack_slicedToArray(arr, i) { return knapsack_arrayWithHoles(arr) || knapsack_iterableToArrayLimit(arr, i) || knapsack_unsupportedIterableToArray(arr, i) || knapsack_nonIterableRest(); }

function knapsack_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function knapsack_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function knapsack_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function knapsack_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = knapsack_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function knapsack_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return knapsack_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return knapsack_arrayLikeToArray(o, minLen); }

function knapsack_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function knapsack_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function knapsack_createClass(Constructor, protoProps, staticProps) { if (protoProps) knapsack_defineProperties(Constructor.prototype, protoProps); if (staticProps) knapsack_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function knapsack_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function knapsack_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Not = /*#__PURE__*/knapsack_createClass(function Not(thing) {
  knapsack_classCallCheck(this, Not);

  knapsack_defineProperty(this, "thing", void 0);

  this.thing = thing;
}); // Assuming list is already sorted, count adjacent items.
// Effectively run-length encoding.


function aggregate(list, isEqual) {
  var aggregatedList = [];

  var _iterator = knapsack_createForOfIteratorHelper(list),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (aggregatedList.length === 0) {
        aggregatedList.push([item, 1]);
      } else {
        var last = aggregatedList[aggregatedList.length - 1];

        var _last = knapsack_slicedToArray(last, 1),
            lastItem = _last[0];

        if (isEqual ? isEqual(item, lastItem) : item === lastItem) {
          last[1]++;
        } else {
          aggregatedList.push([item, 1]);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return aggregatedList;
}
/**
 * Solve the knapsack problem.
 * @param values Array of {[item, value, weight, maximum]} tuples for knapsack parameter.
 * @param capacity Capacity of knapsack.
 * @returns Tuple {[totalValue, items]} of selected items and total value of those items.
 */


function knapsack(values, capacity) {
  var _ref5;

  if (!Number.isFinite(capacity)) {
    throw new Error("Invalid capacity.");
  } // Invert negative values into a fake value for not using it.


  var valuesInverted = values.map(_ref => {
    var _ref2 = knapsack_slicedToArray(_ref, 4),
        thing = _ref2[0],
        value = _ref2[1],
        weight = _ref2[2],
        maximum = _ref2[3];

    return weight < 0 && maximum !== undefined ? [new Not(thing), -value, -weight, maximum] : [thing, value, weight, maximum];
  });
  var capacityAdjustment = sum(values, _ref3 => {
    var _ref4 = knapsack_slicedToArray(_ref3, 4),
        weight = _ref4[2],
        maximum = _ref4[3];

    return weight < 0 && maximum !== undefined ? -weight * maximum : 0;
  });
  var adjustedCapacity = capacity + capacityAdjustment;

  if (adjustedCapacity < 0) {
    // We don't have enough cleaners to create any space, so can't fit anything.
    return [-Infinity, []];
  } // Sort values by weight.


  var valuesSorted = knapsack_toConsumableArray(valuesInverted).sort((x, y) => x[2] - y[2]); // Convert the problem into 0/1 knapsack - just include as many copies as possible of each item.


  var values01 = (_ref5 = []).concat.apply(_ref5, knapsack_toConsumableArray(valuesSorted.map(_ref6 => {
    var _ref7 = knapsack_slicedToArray(_ref6, 4),
        thing = _ref7[0],
        value = _ref7[1],
        weight = _ref7[2],
        maximum = _ref7[3];

    if (!Number.isFinite(weight) || weight < 0) {
      throw new Error("Invalid weight ".concat(weight, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    }

    var maxQuantity = Math.floor(maximum !== null && maximum !== void 0 ? maximum : adjustedCapacity / weight);

    if (maxQuantity < 0) {
      throw new Error("Invalid max quantity ".concat(maxQuantity, " for ").concat(thing instanceof Not ? "not ".concat(thing.thing) : thing));
    }

    return new Array(maxQuantity).fill([thing, value, weight]);
  })));

  var memoizationTable = new Array(values01.length);

  for (var i = 0; i < values01.length; i++) {
    memoizationTable[i] = new Array(adjustedCapacity).fill(null);
  }

  var _bestSolution = bestSolution(memoizationTable, values01, values01.length - 1, adjustedCapacity),
      _bestSolution2 = knapsack_slicedToArray(_bestSolution, 2),
      value = _bestSolution2[0],
      invertedSolution = _bestSolution2[1]; // Still need to replace Not<T>s with right quantity of T's.


  var aggregatedSolution = aggregate(invertedSolution);
  var countMap = new Map(aggregatedSolution);
  var valueAdjustment = 0;
  var solution = aggregatedSolution.filter(_ref8 => {
    var _ref9 = knapsack_slicedToArray(_ref8, 1),
        thingOrNot = _ref9[0];

    return !(thingOrNot instanceof Not);
  });

  var _iterator2 = knapsack_createForOfIteratorHelper(valuesSorted),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = knapsack_slicedToArray(_step2.value, 4),
          thingOrNot = _step2$value[0],
          _value = _step2$value[1],
          maximum = _step2$value[3];

      if (thingOrNot instanceof Not) {
        var _countMap$get;

        var notCount = (_countMap$get = countMap.get(thingOrNot)) !== null && _countMap$get !== void 0 ? _countMap$get : 0;

        if (maximum === undefined) {
          throw new Error("Cannot find maximum for item ".concat(thingOrNot.thing, "."));
        }

        if (notCount > maximum) {
          throw new Error("Somehow picked ".concat(notCount, " more than the maximum ").concat(notCount, " for item ").concat(thingOrNot.thing, "."));
        }

        if (notCount < maximum) {
          solution.push([thingOrNot.thing, maximum - notCount]);
        }

        valueAdjustment -= maximum * _value;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return [value + valueAdjustment, solution];
}
/**
 * Find the best solution to a knapsack subproblem.
 * @param memoizationTable Memoization table for dynamic programming approach.
 * @param values Array of {[item, value, weight, maximum]} tuples for knapsack parameter.
 * @param currentIndex Current index into values array - only add items before this index.
 * @param remainingCapacity Remaining capacity of knapsack.
 * @returns
 */

function bestSolution(memoizationTable, values, currentIndex, remainingCapacity) {
  // If we've used all our capacity, this solution is no good.
  if (remainingCapacity < 0) return [-Infinity, []];
  if (remainingCapacity === 0 || currentIndex < 0) return [0, []];
  var memoized = memoizationTable[currentIndex][remainingCapacity - 1];
  if (memoized !== null) return memoized;

  var _values$currentIndex = knapsack_slicedToArray(values[currentIndex], 3),
      item = _values$currentIndex[0],
      value = _values$currentIndex[1],
      weight = _values$currentIndex[2];

  var _bestSolution3 = bestSolution(memoizationTable, values, currentIndex - 1, remainingCapacity - weight),
      _bestSolution4 = knapsack_slicedToArray(_bestSolution3, 2),
      valueIncludeRest = _bestSolution4[0],
      itemsInclude = _bestSolution4[1];

  var valueInclude = valueIncludeRest + value;

  var _bestSolution5 = bestSolution(memoizationTable, values, currentIndex - 1, remainingCapacity),
      _bestSolution6 = knapsack_slicedToArray(_bestSolution5, 2),
      valueExclude = _bestSolution6[0],
      itemsExclude = _bestSolution6[1]; // Pick the better of the two options between including/excluding.


  var result = valueInclude > valueExclude ? [valueInclude, [].concat(knapsack_toConsumableArray(itemsInclude), [item])] : [valueExclude, itemsExclude];
  memoizationTable[currentIndex][remainingCapacity - 1] = result;
  return result;
}
;// CONCATENATED MODULE: ./src/diet/index.ts
var diet_templateObject, diet_templateObject2, diet_templateObject3, diet_templateObject4, diet_templateObject5, diet_templateObject6, diet_templateObject7, diet_templateObject8, diet_templateObject9, diet_templateObject10, diet_templateObject11, diet_templateObject12, diet_templateObject13, diet_templateObject14, diet_templateObject15, diet_templateObject16, diet_templateObject17, diet_templateObject18, diet_templateObject19, diet_templateObject20, diet_templateObject21, diet_templateObject22, diet_templateObject23, diet_templateObject24, diet_templateObject25, diet_templateObject26, diet_templateObject27, diet_templateObject28, diet_templateObject29, diet_templateObject30, diet_templateObject31, diet_templateObject32, diet_templateObject33, diet_templateObject34, diet_templateObject35, diet_templateObject36, diet_templateObject37, diet_templateObject38, diet_templateObject39, diet_templateObject40, diet_templateObject41, diet_templateObject42, diet_templateObject43, diet_templateObject44, diet_templateObject45, diet_templateObject46, diet_templateObject47, diet_templateObject48, diet_templateObject49, diet_templateObject50, diet_templateObject51, diet_templateObject52, diet_templateObject53, diet_templateObject54, diet_templateObject55, diet_templateObject56, diet_templateObject57, diet_templateObject58, _templateObject59;

function diet_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = diet_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function diet_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function diet_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? diet_ownKeys(Object(source), !0).forEach(function (key) { diet_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : diet_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function diet_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function diet_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function diet_createClass(Constructor, protoProps, staticProps) { if (protoProps) diet_defineProperties(Constructor.prototype, protoProps); if (staticProps) diet_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function diet_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function diet_toConsumableArray(arr) { return diet_arrayWithoutHoles(arr) || diet_iterableToArray(arr) || diet_unsupportedIterableToArray(arr) || diet_nonIterableSpread(); }

function diet_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function diet_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function diet_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return diet_arrayLikeToArray(arr); }

function diet_slicedToArray(arr, i) { return diet_arrayWithHoles(arr) || diet_iterableToArrayLimit(arr, i) || diet_unsupportedIterableToArray(arr, i) || diet_nonIterableRest(); }

function diet_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function diet_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return diet_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return diet_arrayLikeToArray(o, minLen); }

function diet_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function diet_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function diet_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function diet_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










function isMonday() {
  // Checking Tuesday's ruby is a hack to see if it's Monday in Arizona.
  return modifier_get("Muscle Percent", $item(diet_templateObject || (diet_templateObject = diet_taggedTemplateLiteral(["Tuesday's ruby"])))) > 0;
} // TODO: Include Salty Mouth and potentially other modifiers.


function _expectedAdventures(item, modifiers) {
  var _item$notes, _item$notes2, _item$notes3, _item$notes4, _item$notes5;

  if (item.adventures === "") return 0;

  var _item$adventures$spli = item.adventures.split(/[-]/).map(s => parseInt(s)),
      _item$adventures$spli2 = diet_slicedToArray(_item$adventures$spli, 2),
      min = _item$adventures$spli2[0],
      recordedMax = _item$adventures$spli2[1];

  var max = recordedMax !== null && recordedMax !== void 0 ? recordedMax : min;

  var interpolated = diet_toConsumableArray(new Array(max - min + 1).keys()).map(n => n + min);

  var forkMugMultiplier = (0,external_kolmafia_namespaceObject.itemType)(item) === "food" && (_item$notes = item.notes) !== null && _item$notes !== void 0 && _item$notes.includes("SALAD") || (0,external_kolmafia_namespaceObject.itemType)(item) === "booze" && (_item$notes2 = item.notes) !== null && _item$notes2 !== void 0 && _item$notes2.includes("BEER") ? 1.5 : 1.3;
  var seasoningAdventures = max - min <= 1 ? 1 : 0.5;
  var garish = modifiers.garish && ((_item$notes3 = item.notes) === null || _item$notes3 === void 0 ? void 0 : _item$notes3.includes("LASAGNA")) && !isMonday();
  var refinedPalate = modifiers.refinedPalate && ((_item$notes4 = item.notes) === null || _item$notes4 === void 0 ? void 0 : _item$notes4.includes("WINE"));
  var pinkyRing = modifiers.pinkyRing && ((_item$notes5 = item.notes) === null || _item$notes5 === void 0 ? void 0 : _item$notes5.includes("WINE"));
  return sum(interpolated, baseAdventures => {
    var _item$notes6, _item$notes7;

    var adventures = baseAdventures;

    if (modifiers.forkMug) {
      adventures = Math.floor(adventures * forkMugMultiplier);
    }

    if ((_item$notes6 = item.notes) !== null && _item$notes6 !== void 0 && _item$notes6.includes("SAUCY") && modifiers.saucemaven) {
      adventures += (0,external_kolmafia_namespaceObject.myPrimestat)() === $stat(diet_templateObject2 || (diet_templateObject2 = diet_taggedTemplateLiteral(["Mysticality"]))) ? 5 : 3;
    }

    if (garish) adventures += 5;
    if (refinedPalate) adventures = Math.floor(adventures * 1.25);
    if (pinkyRing) adventures = Math.round(adventures * 1.125);

    if ((_item$notes7 = item.notes) !== null && _item$notes7 !== void 0 && _item$notes7.includes("MARTINI") && modifiers.tuxedoShirt) {
      adventures += 2;
    }

    if ((0,external_kolmafia_namespaceObject.itemType)(item) === "food" && modifiers.mayoflex) adventures++;
    if ((0,external_kolmafia_namespaceObject.itemType)(item) === "food" && modifiers.seasoning) adventures += seasoningAdventures;
    return adventures;
  }) / interpolated.length;
}

var MenuItem = /*#__PURE__*/function () {
  /**
   * Construct a new menu item, possibly with extra properties. Items in MenuItem.defaultOptions have intelligent defaults.
   * @param item Item to add to menu.
   * @param options.organ Designate item as belonging to a specific organ.
   * @param options.size Override item organ size. Necessary for any non-food/booze/spleen item.
   * @param options.maximum Maximum uses remaining today, or "auto" to check dailyusesleft Mafia property.
   * @param options.additionalValue Additional value (positive) or cost (negative) to consider with item, e.g. from buffs.
   * @param options.effect Effect associated with this menu item (pocket wish effect, sweet synthesis effect, pill keeper potion extension)
   * @param options.mayo Which mayo to use before item (ignored if mayo clinic is not installed or item is not a food)
   * @param options.note Any note to track information about item, to be used later
   */
  function MenuItem(item) {
    var _MenuItem$defaultOpti;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    diet_classCallCheck(this, MenuItem);

    diet_defineProperty(this, "item", void 0);

    diet_defineProperty(this, "organ", void 0);

    diet_defineProperty(this, "size", void 0);

    diet_defineProperty(this, "maximum", void 0);

    diet_defineProperty(this, "additionalValue", void 0);

    diet_defineProperty(this, "effect", void 0);

    diet_defineProperty(this, "priceOverride", void 0);

    diet_defineProperty(this, "mayo", void 0);

    diet_defineProperty(this, "data", void 0);

    var _options = diet_objectSpread(diet_objectSpread({}, options), (_MenuItem$defaultOpti = MenuItem.defaultOptions().get(item)) !== null && _MenuItem$defaultOpti !== void 0 ? _MenuItem$defaultOpti : {}),
        size = _options.size,
        organ = _options.organ,
        maximum = _options.maximum,
        additionalValue = _options.additionalValue,
        effect = _options.effect,
        priceOverride = _options.priceOverride,
        mayo = _options.mayo,
        data = _options.data;

    this.item = item;
    this.maximum = maximum === "auto" ? item.dailyusesleft : maximum;
    this.additionalValue = additionalValue;
    this.effect = effect;
    this.priceOverride = priceOverride;
    this.mayo = mayo;
    this.data = data;
    var typ = (0,external_kolmafia_namespaceObject.itemType)(this.item);
    this.organ = organ !== null && organ !== void 0 ? organ : isOrgan(typ) ? typ : undefined;
    this.size = size !== null && size !== void 0 ? size : this.organ === "food" ? this.item.fullness : this.organ === "booze" ? this.item.inebriety : this.organ === "spleen item" ? this.item.spleen : 0;
  }

  diet_createClass(MenuItem, [{
    key: "equals",
    value: function equals(other) {
      return this.item === other.item && this.effect === other.effect;
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.effect) {
        return "".concat(this.item, ":").concat(this.effect);
      }

      return this.item.toString();
    }
  }, {
    key: "price",
    value: function price() {
      var _this$priceOverride, _MenuItem$defaultPric;

      return (_this$priceOverride = this.priceOverride) !== null && _this$priceOverride !== void 0 ? _this$priceOverride : (_MenuItem$defaultPric = MenuItem.defaultPriceFunction) === null || _MenuItem$defaultPric === void 0 ? void 0 : _MenuItem$defaultPric.call(MenuItem, this.item);
    }
  }], [{
    key: "defaultOptions",
    value: function defaultOptions() {
      return new Map([[$item(diet_templateObject3 || (diet_templateObject3 = diet_taggedTemplateLiteral(["distention pill"]))), {
        organ: "food",
        maximum: !have($item(diet_templateObject4 || (diet_templateObject4 = diet_taggedTemplateLiteral(["distention pill"])))) || get("_distentionPillUsed") ? 0 : 1,
        size: -1
      }], [$item(diet_templateObject5 || (diet_templateObject5 = diet_taggedTemplateLiteral(["synthetic dog hair pill"]))), {
        organ: "booze",
        maximum: !have($item(diet_templateObject6 || (diet_templateObject6 = diet_taggedTemplateLiteral(["synthetic dog hair pill"])))) || get("_syntheticDogHairPillUsed") ? 0 : 1,
        size: -1
      }], [$item(diet_templateObject7 || (diet_templateObject7 = diet_taggedTemplateLiteral(["cuppa Voraci tea"]))), {
        organ: "food",
        maximum: get("_voraciTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(diet_templateObject8 || (diet_templateObject8 = diet_taggedTemplateLiteral(["cuppa Sobrie tea"]))), {
        organ: "booze",
        maximum: get("_sobrieTeaUsed") ? 0 : 1,
        size: -1
      }], [$item(diet_templateObject9 || (diet_templateObject9 = diet_taggedTemplateLiteral(["mojo filter"]))), {
        organ: "spleen item",
        maximum: 3 - get("currentMojoFilters"),
        size: -1
      }], [$item(diet_templateObject10 || (diet_templateObject10 = diet_taggedTemplateLiteral(["spice melange"]))), {
        maximum: get("spiceMelangeUsed") ? 0 : 1
      }], [$item(diet_templateObject11 || (diet_templateObject11 = diet_taggedTemplateLiteral(["Ultra Mega Sour Ball"]))), {
        maximum: get("_ultraMegaSourBallUsed") ? 0 : 1
      }], [$item(diet_templateObject12 || (diet_templateObject12 = diet_taggedTemplateLiteral(["The Plumber's mushroom stew"]))), {
        maximum: get("_plumbersMushroomStewEaten") ? 0 : 1
      }], [$item(diet_templateObject13 || (diet_templateObject13 = diet_taggedTemplateLiteral(["The Mad Liquor"]))), {
        maximum: get("_madLiquorDrunk") ? 0 : 1
      }], [$item(diet_templateObject14 || (diet_templateObject14 = diet_taggedTemplateLiteral(["Doc Clock's thyme cocktail"]))), {
        maximum: get("_docClocksThymeCocktailDrunk") ? 0 : 1
      }], [$item(diet_templateObject15 || (diet_templateObject15 = diet_taggedTemplateLiteral(["Mr. Burnsger"]))), {
        maximum: get("_mrBurnsgerEaten") ? 0 : 1
      }]]);
    }
  }]);

  return MenuItem;
}();

diet_defineProperty(MenuItem, "defaultPriceFunction", item => (0,external_kolmafia_namespaceObject.npcPrice)(item) > 0 ? (0,external_kolmafia_namespaceObject.npcPrice)(item) : (0,external_kolmafia_namespaceObject.mallPrice)(item));

var organs = ["food", "booze", "spleen item"];

function isOrgan(x) {
  return organs.includes(x);
}

var DietPlanner = /*#__PURE__*/function () {
  function DietPlanner(mpa, menu) {
    var _this = this;

    diet_classCallCheck(this, DietPlanner);

    diet_defineProperty(this, "mpa", void 0);

    diet_defineProperty(this, "menu", void 0);

    diet_defineProperty(this, "mayoLookup", void 0);

    diet_defineProperty(this, "fork", void 0);

    diet_defineProperty(this, "mug", void 0);

    diet_defineProperty(this, "seasoning", void 0);

    diet_defineProperty(this, "spleenValue", 0);

    this.mpa = mpa;
    this.fork = menu.find(item => item.item === $item(diet_templateObject16 || (diet_templateObject16 = diet_taggedTemplateLiteral(["Ol' Scratch's salad fork"]))));
    this.mug = menu.find(item => item.item === $item(diet_templateObject17 || (diet_templateObject17 = diet_taggedTemplateLiteral(["Frosty's frosty mug"]))));
    this.seasoning = menu.find(item => item.item === $item(diet_templateObject18 || (diet_templateObject18 = diet_taggedTemplateLiteral(["Special Seasoning"]))));
    this.mayoLookup = new Map();

    if (MayoClinic_installed()) {
      var _loop = function _loop() {
        var mayo = _arr2[_i2];
        var menuItem = menu.find(item => item.item === mayo);
        if (menuItem) _this.mayoLookup.set(mayo, menuItem);
      };

      for (var _i2 = 0, _arr2 = [Mayo.flex, Mayo.zapine]; _i2 < _arr2.length; _i2++) {
        _loop();
      }
    }

    this.menu = menu.filter(item => item.organ);

    if (menu.filter(item => (0,external_kolmafia_namespaceObject.historicalPrice)(item.item) === 0 || (0,external_kolmafia_namespaceObject.historicalAge)(item.item) >= 1).length > 100) {
      (0,external_kolmafia_namespaceObject.mallPrices)("food");
      (0,external_kolmafia_namespaceObject.mallPrices)("booze");
    }

    var spleenItems = menu.filter(item => (0,external_kolmafia_namespaceObject.itemType)(item.item) === "spleen item");
    spleenItems.sort((x, y) => -(this.consumptionValue(x) / x.item.spleen - this.consumptionValue(y) / y.item.spleen));

    if (spleenItems.length > 0) {
      // Marginal value for sliders and jars depends on our best unlimited spleen item.
      // TODO: spleenLimit() - mySpleenUse() is a poor estimate.
      var bestMarginalSpleenItem = spleenItems.find(spleenItem => spleenItem.maximum === undefined || spleenItem.maximum * spleenItem.size >= (0,external_kolmafia_namespaceObject.spleenLimit)() - (0,external_kolmafia_namespaceObject.mySpleenUse)());

      if (bestMarginalSpleenItem) {
        this.spleenValue = Math.max(0, this.consumptionValue(bestMarginalSpleenItem) / bestMarginalSpleenItem.size);
      }
    }
  }
  /**
   * Determine the value of consuming a menu item with any profitable helpers.
   * @param menuItem Menu item to check.
   * @returns Value for consuming that menu item.
   */


  diet_createClass(DietPlanner, [{
    key: "consumptionValue",
    value: function consumptionValue(menuItem) {
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
    value: function consumptionHelpersAndValue(menuItem, overrideModifiers) {
      var _menuItem$additionalV, _menuItem$additionalV2;

      var helpers = [];

      if ((0,external_kolmafia_namespaceObject.itemType)(menuItem.item) === "food" && this.mayoLookup.size) {
        var mayo = menuItem.mayo ? this.mayoLookup.get(menuItem.mayo) : this.mayoLookup.get(Mayo.flex);
        if (mayo) helpers.push(mayo);
      }

      var defaultModifiers = diet_objectSpread({
        forkMug: false,
        seasoning: this.seasoning ? helpers.includes(this.seasoning) : false,
        mayoflex: this.mayoLookup.size ? helpers.some(item => item.item === Mayo.flex) : false,
        refinedPalate: have($effect(diet_templateObject19 || (diet_templateObject19 = diet_taggedTemplateLiteral(["Refined Palate"])))),
        garish: have($effect(diet_templateObject20 || (diet_templateObject20 = diet_taggedTemplateLiteral(["Gar-ish"])))),
        saucemaven: have($skill(diet_templateObject21 || (diet_templateObject21 = diet_taggedTemplateLiteral(["Saucemaven"])))),
        pinkyRing: have($item(diet_templateObject22 || (diet_templateObject22 = diet_taggedTemplateLiteral(["mafia pinky ring"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(diet_templateObject23 || (diet_templateObject23 = diet_taggedTemplateLiteral(["mafia pinky ring"])))),
        tuxedoShirt: have($item(diet_templateObject24 || (diet_templateObject24 = diet_taggedTemplateLiteral(["tuxedo shirt"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(diet_templateObject25 || (diet_templateObject25 = diet_taggedTemplateLiteral(["tuxedo shirt"]))))
      }, overrideModifiers);

      if (this.seasoning && (0,external_kolmafia_namespaceObject.itemType)(menuItem.item) === "food" && this.mpa * (_expectedAdventures(menuItem.item, diet_objectSpread(diet_objectSpread({}, defaultModifiers), {}, {
        seasoning: true
      })) - _expectedAdventures(menuItem.item, diet_objectSpread(diet_objectSpread({}, defaultModifiers), {}, {
        seasoning: false
      }))) > (0,external_kolmafia_namespaceObject.mallPrice)($item(diet_templateObject26 || (diet_templateObject26 = diet_taggedTemplateLiteral(["Special Seasoning"]))))) {
        helpers.push(this.seasoning);
      }

      var forkMug = (0,external_kolmafia_namespaceObject.itemType)(menuItem.item) === "food" ? this.fork : (0,external_kolmafia_namespaceObject.itemType)(menuItem.item) === "booze" ? this.mug : null;
      var forkMugPrice = forkMug ? forkMug.price() : Infinity;
      var baseCost = menuItem.price() + sum(helpers, item => item.price());
      var valueRaw = _expectedAdventures(menuItem.item, defaultModifiers) * this.mpa - baseCost + ((_menuItem$additionalV = menuItem.additionalValue) !== null && _menuItem$additionalV !== void 0 ? _menuItem$additionalV : 0);
      var valueForkMug = _expectedAdventures(menuItem.item, diet_objectSpread(diet_objectSpread({}, defaultModifiers), {}, {
        forkMug: true
      })) * this.mpa - baseCost - forkMugPrice + ((_menuItem$additionalV2 = menuItem.additionalValue) !== null && _menuItem$additionalV2 !== void 0 ? _menuItem$additionalV2 : 0);
      var valueSpleen = $items(diet_templateObject27 || (diet_templateObject27 = diet_taggedTemplateLiteral(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item) ? 5 * this.spleenValue : 0;
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
    value: function planOrgan(organ, capacity) {
      var overrideModifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var submenu = this.menu.filter(menuItem => menuItem.organ === organ && (0,external_kolmafia_namespaceObject.myLevel)() >= menuItem.item.levelreq);
      var knapsackValues = submenu.map(menuItem => [].concat(diet_toConsumableArray(this.consumptionHelpersAndValue(menuItem, overrideModifiers)), [menuItem.size, menuItem.maximum]));
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
    value: function planOrgans(organCapacities) {
      var _ref5;

      var overrideModifiers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var valuePlans = organCapacities.map(_ref => {
        var _ref2 = diet_slicedToArray(_ref, 2),
            organ = _ref2[0],
            capacity = _ref2[1];

        return this.planOrgan(organ, capacity, overrideModifiers);
      });
      return [sum(valuePlans, _ref3 => {
        var _ref4 = diet_slicedToArray(_ref3, 1),
            value = _ref4[0];

        return value;
      }), (_ref5 = []).concat.apply(_ref5, diet_toConsumableArray(valuePlans.map(_ref6 => {
        var _ref7 = diet_slicedToArray(_ref6, 2),
            plan = _ref7[1];

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
    value: function planOrgansWithTrials(organCapacities, trialItems, overrideModifiers) {
      if (trialItems.length === 0) {
        return this.planOrgans(organCapacities, overrideModifiers);
      }

      var _trialItems$ = diet_slicedToArray(trialItems[0], 2),
          trialItem = _trialItems$[0],
          organSizes = _trialItems$[1];

      if (trialItem.maximum !== undefined && trialItem.maximum <= 0) {
        return this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers);
      }

      var organCapacitiesWithMap = new Map(organCapacities);

      var _iterator = diet_createForOfIteratorHelper(organSizes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = diet_slicedToArray(_step.value, 2),
              organ = _step$value[0],
              size = _step$value[1];

          var current = organCapacitiesWithMap.get(organ);

          if (current !== undefined) {
            organCapacitiesWithMap.set(organ, current - size);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var organCapacitiesWith = diet_toConsumableArray(organCapacitiesWithMap);

      var isRefinedPalate = trialItem.item === $item(diet_templateObject28 || (diet_templateObject28 = diet_taggedTemplateLiteral(["pocket wish"]))) && trialItem.effect === $effect(diet_templateObject29 || (diet_templateObject29 = diet_taggedTemplateLiteral(["Refined Palate"]))) || trialItem.item === $item(diet_templateObject30 || (diet_templateObject30 = diet_taggedTemplateLiteral(["toasted brie"])));
      var isGarish = trialItem.item === $item(diet_templateObject31 || (diet_templateObject31 = diet_taggedTemplateLiteral(["pocket wish"]))) && trialItem.effect === $effect(diet_templateObject32 || (diet_templateObject32 = diet_taggedTemplateLiteral(["Gar-ish"]))) || trialItem.item === $item(diet_templateObject33 || (diet_templateObject33 = diet_taggedTemplateLiteral(["potion of the field gar"])));

      var _this$planOrgansWithT = this.planOrgansWithTrials(organCapacities, trialItems.slice(1), overrideModifiers),
          _this$planOrgansWithT2 = diet_slicedToArray(_this$planOrgansWithT, 2),
          valueWithout = _this$planOrgansWithT2[0],
          planWithout = _this$planOrgansWithT2[1];

      var _this$planOrgansWithT3 = this.planOrgansWithTrials(organCapacitiesWith, trialItems.slice(1), diet_objectSpread(diet_objectSpread(diet_objectSpread({}, overrideModifiers), isRefinedPalate ? {
        refinedPalate: true
      } : {}), isGarish ? {
        garish: true
      } : {})),
          _this$planOrgansWithT4 = diet_slicedToArray(_this$planOrgansWithT3, 2),
          valueWith = _this$planOrgansWithT4[0],
          planWith = _this$planOrgansWithT4[1];

      var _this$consumptionHelp = this.consumptionHelpersAndValue(trialItem, {}),
          _this$consumptionHelp2 = diet_slicedToArray(_this$consumptionHelp, 2),
          helpersAndItem = _this$consumptionHelp2[0],
          value = _this$consumptionHelp2[1];

      return valueWithout > valueWith + value ? [valueWithout, planWithout] : [valueWith + value, [].concat(diet_toConsumableArray(planWith), [[helpersAndItem, 1]])];
    }
  }]);

  return DietPlanner;
}();
/**
 * Because the knapsack solver is one-dimensional only, any items that touch
 * multiple organs have to be treated specially. What we do is run the knapsack
 * solver multiple times, trying with + without each interacting item.
 */


var interactingItems = [[$item(diet_templateObject34 || (diet_templateObject34 = diet_taggedTemplateLiteral(["spice melange"]))), [["food", -3], ["booze", -3]]], [$item(diet_templateObject35 || (diet_templateObject35 = diet_taggedTemplateLiteral(["Ultra Mega Sour Ball"]))), [["food", -3], ["booze", -3]]], [$item(diet_templateObject36 || (diet_templateObject36 = diet_taggedTemplateLiteral(["The Plumber's mushroom stew"]))), [["food", 3], ["booze", -1]]], [$item(diet_templateObject37 || (diet_templateObject37 = diet_taggedTemplateLiteral(["The Mad Liquor"]))), [["food", -1], ["booze", 3]]], [$item(diet_templateObject38 || (diet_templateObject38 = diet_taggedTemplateLiteral(["Doc Clock's thyme cocktail"]))), [["food", -2], ["booze", 4]]], [$item(diet_templateObject39 || (diet_templateObject39 = diet_taggedTemplateLiteral(["Mr. Burnsger"]))), [["food", 4], ["booze", -2]]], [$effect(diet_templateObject40 || (diet_templateObject40 = diet_taggedTemplateLiteral(["Refined Palate"]))), []], [$item(diet_templateObject41 || (diet_templateObject41 = diet_taggedTemplateLiteral(["toasted brie"]))), [["food", 2]]], [$effect(diet_templateObject42 || (diet_templateObject42 = diet_taggedTemplateLiteral(["Gar-ish"]))), []], [$item(diet_templateObject43 || (diet_templateObject43 = diet_taggedTemplateLiteral(["potion of the field gar"]))), []]];
/**
 * Plan out an optimal diet using a knapsack algorithm.
 * @param mpa Meat per adventure value.
 * @param menu Array of MenuItems to consider for diet purposes.
 * @param organCapacities Optional override of each organ's capacity.
 * @returns Array of [menu item and helpers, count].
 */

function planDiet(mpa, menu) {
  var organCapacities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["food", null], ["booze", null], ["spleen item", null]];
  // FIXME: Figure out a better way to handle overfull organs (e.g. coming out of Ed).
  var resolvedOrganCapacities = organCapacities.map(_ref8 => {
    var _ref9 = diet_slicedToArray(_ref8, 2),
        organ = _ref9[0],
        size = _ref9[1];

    return [organ, size !== null && size !== void 0 ? size : organ === "food" ? (0,external_kolmafia_namespaceObject.fullnessLimit)() - (0,external_kolmafia_namespaceObject.myFullness)() : organ === "booze" ? (0,external_kolmafia_namespaceObject.inebrietyLimit)() - (0,external_kolmafia_namespaceObject.myInebriety)() : organ === "spleen item" ? (0,external_kolmafia_namespaceObject.spleenLimit)() - (0,external_kolmafia_namespaceObject.mySpleenUse)() : 0];
  });
  /**
   * Per above description, separate out items with cross-organ interaction
   * ("interacting items") for special treatment. These will be checked by
   * running the solver several times.
   */

  var includedInteractingItems = menu.map(menuItem => {
    var interacting = interactingItems.find(_ref10 => {
      var _ref11 = diet_slicedToArray(_ref10, 1),
          itemOrEffect = _ref11[0];

      return menuItem.item === itemOrEffect || menuItem.item === $item(diet_templateObject44 || (diet_templateObject44 = diet_taggedTemplateLiteral(["pocket wish"]))) && menuItem.effect === itemOrEffect;
    });

    if (interacting) {
      var _interacting = diet_slicedToArray(interacting, 2),
          organSizes = _interacting[1];

      return [menuItem, organSizes];
    } else {
      return null;
    }
  }).filter(value => value !== null); // Filter out interacting items from natural consideration.

  var dietPlanner = new DietPlanner(mpa, menu.filter(menuItem => !includedInteractingItems.some(_ref12 => {
    var _ref13 = diet_slicedToArray(_ref12, 1),
        interacting = _ref13[0];

    return interacting === menuItem;
  })));
  /**
   * Because our knapsack solver is one-dimensional, we have to consider
   * each organ separately. Since there are no spleen items that affect
   * stomach/liver, we consider those two first, with an approximation of the
   * value of spleen-cleaning. Afterwards, we see how much spleen we have and
   * plan that.
   */

  var _dietPlanner$planOrga = dietPlanner.planOrgansWithTrials(resolvedOrganCapacities.filter(_ref14 => {
    var _ref15 = diet_slicedToArray(_ref14, 2),
        organ = _ref15[0],
        capacity = _ref15[1];

    return ["food", "booze"].includes(organ) && capacity >= 0;
  }), includedInteractingItems, {}),
      _dietPlanner$planOrga2 = diet_slicedToArray(_dietPlanner$planOrga, 2),
      planFoodBooze = _dietPlanner$planOrga2[1];

  var spleenCapacity = resolvedOrganCapacities.find(_ref16 => {
    var _ref17 = diet_slicedToArray(_ref16, 1),
        organ = _ref17[0];

    return organ === "spleen item";
  });

  if (spleenCapacity) {
    // Count sliders and pickle juice, figure out how much extra spleen we got.
    var additionalSpleen = sum(planFoodBooze, _ref18 => {
      var _ref19 = diet_slicedToArray(_ref18, 2),
          items = _ref19[0],
          number = _ref19[1];

      return items.some(menuItem => $items(diet_templateObject45 || (diet_templateObject45 = diet_taggedTemplateLiteral(["jar of fermented pickle juice, extra-greasy slider"]))).includes(menuItem.item)) ? 5 * number : 0;
    });

    var _spleenCapacity = diet_slicedToArray(spleenCapacity, 2),
        availableSpleen = _spleenCapacity[1];

    var _dietPlanner$planOrga3 = dietPlanner.planOrgan("spleen item", availableSpleen + additionalSpleen),
        _dietPlanner$planOrga4 = diet_slicedToArray(_dietPlanner$planOrga3, 2),
        planSpleen = _dietPlanner$planOrga4[1];

    return [].concat(diet_toConsumableArray(planFoodBooze), diet_toConsumableArray(planSpleen));
  } else {
    return planFoodBooze;
  }
}

var DietEntry = /*#__PURE__*/function () {
  function DietEntry(menuItems, quantity) {
    diet_classCallCheck(this, DietEntry);

    diet_defineProperty(this, "quantity", void 0);

    this.quantity = quantity;
  }

  diet_createClass(DietEntry, [{
    key: "target",
    value: function target() {
      return this.menuItems[this.menuItems.length - 1];
    }
  }, {
    key: "helpers",
    value: function helpers() {
      if (this.menuItems.length > 1) {
        return this.menuItems.slice(0, -1);
      }

      return [];
    }
  }, {
    key: "expectedAdventures",
    value: function expectedAdventures(diet) {
      {
        if (this.menuItems.length === 0 || this.quantity === 0) {
          return 0;
        } else {
          var items = this.menuItems.map(m => m.item);
          var targetItem = this.menuItems[this.menuItems.length - 1].item;
          var fork = (0,external_kolmafia_namespaceObject.itemType)(targetItem) === "food" && items.includes($item(diet_templateObject46 || (diet_templateObject46 = diet_taggedTemplateLiteral(["Ol' Scratch's salad fork"]))));
          var mug = (0,external_kolmafia_namespaceObject.itemType)(targetItem) === "booze" && items.includes($item(diet_templateObject47 || (diet_templateObject47 = diet_taggedTemplateLiteral(["Frosty's frosty mug"]))));
          return this.quantity * _expectedAdventures(this.menuItems[this.menuItems.length - 1].item, {
            forkMug: fork || mug,
            seasoning: items.includes($item(diet_templateObject48 || (diet_templateObject48 = diet_taggedTemplateLiteral(["Special Seasoning"])))),
            mayoflex: items.includes(Mayo.flex),
            refinedPalate: diet.refinedPalate,
            garish: diet.garish,
            saucemaven: diet.saucemaven,
            pinkyRing: diet.pinkyRing,
            tuxedoShirt: diet.tuxedoShirt
          });
        }
      }
    }
  }, {
    key: "expectedValue",
    value: function expectedValue(mpa, diet) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "gross";
      var gross = mpa * this.expectedAdventures(diet) + this.quantity * sumNumbers(this.menuItems.map(menuItem => {
        var _menuItem$additionalV3;

        return (_menuItem$additionalV3 = menuItem.additionalValue) !== null && _menuItem$additionalV3 !== void 0 ? _menuItem$additionalV3 : 0;
      }));

      if (method === "gross") {
        return gross;
      } else {
        return gross - this.expectedPrice();
      }
    }
  }, {
    key: "expectedPrice",
    value: function expectedPrice() {
      return this.quantity * sumNumbers(this.menuItems.map(menuItem => menuItem.price()));
    }
  }]);

  return DietEntry;
}();

/**
 * A representation of a potential diet
 */
var Diet = /*#__PURE__*/function () {
  function Diet() {
    var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    diet_classCallCheck(this, Diet);

    diet_defineProperty(this, "entries", void 0);

    this.entries = entries;
  }

  diet_createClass(Diet, [{
    key: "refinedPalate",
    get: function get() {
      return this.entries.some(dietEntry => dietEntry.menuItems.some(trialItem => trialItem.item === $item(diet_templateObject49 || (diet_templateObject49 = diet_taggedTemplateLiteral(["pocket wish"]))) && trialItem.effect === $effect(diet_templateObject50 || (diet_templateObject50 = diet_taggedTemplateLiteral(["Refined Palate"]))) || trialItem.item === $item(diet_templateObject51 || (diet_templateObject51 = diet_taggedTemplateLiteral(["toasted brie"])))));
    }
  }, {
    key: "garish",
    get: function get() {
      return this.entries.some(dietEntry => dietEntry.menuItems.some(trialItem => trialItem.item === $item(diet_templateObject52 || (diet_templateObject52 = diet_taggedTemplateLiteral(["pocket wish"]))) && trialItem.effect === $effect(diet_templateObject53 || (diet_templateObject53 = diet_taggedTemplateLiteral(["Gar-ish"]))) || trialItem.item === $item(diet_templateObject54 || (diet_templateObject54 = diet_taggedTemplateLiteral(["potion of the field gar"])))));
    }
  }, {
    key: "saucemaven",
    get: function get() {
      return have($skill(diet_templateObject55 || (diet_templateObject55 = diet_taggedTemplateLiteral(["Saucemaven"]))));
    }
  }, {
    key: "tuxedoShirt",
    get: function get() {
      return have($item(diet_templateObject56 || (diet_templateObject56 = diet_taggedTemplateLiteral(["tuxedo shirt"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(diet_templateObject57 || (diet_templateObject57 = diet_taggedTemplateLiteral(["tuxedo shirt"]))));
    }
  }, {
    key: "pinkyRing",
    get: function get() {
      return have($item(diet_templateObject58 || (diet_templateObject58 = diet_taggedTemplateLiteral(["mafia pinky ring"])))) && (0,external_kolmafia_namespaceObject.canEquip)($item(_templateObject59 || (_templateObject59 = diet_taggedTemplateLiteral(["mafia pinky ring"]))));
    }
  }, {
    key: "expectedAdventures",
    value: function expectedAdventures() {
      return sumNumbers(this.entries.map(dietEntry => dietEntry.expectedAdventures(this)));
    }
  }, {
    key: "expectedValue",
    value: function expectedValue(mpa) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "gross";
      return sumNumbers(this.entries.map(dietEntry => dietEntry.expectedValue(mpa, this, method)));
    }
  }, {
    key: "expectedPrice",
    value: function expectedPrice() {
      return sumNumbers(this.entries.map(dietEntry => dietEntry.expectedPrice()));
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Diet(diet_toConsumableArray(this.entries));
    }
  }], [{
    key: "from",
    value: function from(rawDiet) {
      var diet = rawDiet.map(item => {
        var _item = diet_slicedToArray(item, 2),
            menuItems = _item[0],
            quantity = _item[1];

        return new DietEntry(menuItems, quantity);
      });
      return new Diet(diet);
    }
  }, {
    key: "plan",
    value: function plan(mpa, menu) {
      var organCapacities = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        food: "auto",
        booze: "auto",
        spleen: "auto"
      };
      var food = organCapacities.food,
          booze = organCapacities.booze,
          spleen = organCapacities.spleen;
      var plannerCapacity = [];

      if (food) {
        plannerCapacity.push(["food", food === "auto" ? null : food]);
      }

      if (booze) {
        plannerCapacity.push(["booze", booze === "auto" ? null : booze]);
      }

      if (spleen) {
        plannerCapacity.push(["spleen item", spleen === "auto" ? null : spleen]);
      }

      return Diet.from(planDiet(mpa, menu, plannerCapacity));
    }
  }]);

  return Diet;
}();
;// CONCATENATED MODULE: ./src/mood.ts
var mood_templateObject, mood_templateObject2, mood_templateObject3, mood_templateObject4, mood_templateObject5, mood_templateObject6, mood_templateObject7, mood_templateObject8, mood_templateObject9, mood_templateObject10;

function mood_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function mood_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? mood_ownKeys(Object(source), !0).forEach(function (key) { mood_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : mood_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function mood_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = mood_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function mood_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return mood_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return mood_arrayLikeToArray(o, minLen); }

function mood_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function mood_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function mood_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) mood_setPrototypeOf(subClass, superClass); }

function mood_setPrototypeOf(o, p) { mood_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return mood_setPrototypeOf(o, p); }

function mood_createSuper(Derived) { var hasNativeReflectConstruct = mood_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = mood_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = mood_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return mood_possibleConstructorReturn(this, result); }; }

function mood_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return mood_assertThisInitialized(self); }

function mood_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function mood_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function mood_getPrototypeOf(o) { mood_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return mood_getPrototypeOf(o); }

function mood_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mood_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mood_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function mood_createClass(Constructor, protoProps, staticProps) { if (protoProps) mood_defineProperties(Constructor.prototype, protoProps); if (staticProps) mood_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var MpSource = /*#__PURE__*/function () {
  function MpSource() {
    mood_classCallCheck(this, MpSource);
  }

  mood_createClass(MpSource, [{
    key: "usesRemaining",
    value: function usesRemaining() {
      return 0;
    }
  }, {
    key: "availableMpMax",
    value: function availableMpMax() {
      return this.availableMpMin();
    }
  }]);

  return MpSource;
}();
var OscusSoda = /*#__PURE__*/function (_MpSource) {
  mood_inherits(OscusSoda, _MpSource);

  var _super = mood_createSuper(OscusSoda);

  function OscusSoda() {
    mood_classCallCheck(this, OscusSoda);

    return _super.apply(this, arguments);
  }

  mood_createClass(OscusSoda, [{
    key: "available",
    value: function available() {
      return have($item(mood_templateObject || (mood_templateObject = mood_taggedTemplateLiteral(["Oscus's neverending soda"]))));
    }
  }, {
    key: "usesRemaining",
    value: function usesRemaining() {
      return get("oscusSodaUsed") ? 0 : 1;
    }
  }, {
    key: "availableMpMin",
    value: function availableMpMin() {
      return this.available() && this.usesRemaining() > 0 ? 200 : 0;
    }
  }, {
    key: "availableMpMax",
    value: function availableMpMax() {
      return this.available() && this.usesRemaining() > 0 ? 300 : 0;
    }
  }, {
    key: "execute",
    value: function execute() {
      (0,external_kolmafia_namespaceObject.use)($item(mood_templateObject2 || (mood_templateObject2 = mood_taggedTemplateLiteral(["Oscus's neverending soda"]))));
    }
  }]);

  return OscusSoda;
}(MpSource);

mood_defineProperty(OscusSoda, "instance", new OscusSoda());

var MagicalSausages = /*#__PURE__*/function (_MpSource2) {
  mood_inherits(MagicalSausages, _MpSource2);

  var _super2 = mood_createSuper(MagicalSausages);

  function MagicalSausages() {
    mood_classCallCheck(this, MagicalSausages);

    return _super2.apply(this, arguments);
  }

  mood_createClass(MagicalSausages, [{
    key: "available",
    value: function available() {
      return have($item(mood_templateObject3 || (mood_templateObject3 = mood_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
    }
  }, {
    key: "usesRemaining",
    value: function usesRemaining() {
      var maxSausages = (0,external_kolmafia_namespaceObject.availableAmount)($item(mood_templateObject4 || (mood_templateObject4 = mood_taggedTemplateLiteral(["magical sausage"])))) + (0,external_kolmafia_namespaceObject.availableAmount)($item(mood_templateObject5 || (mood_templateObject5 = mood_taggedTemplateLiteral(["magical sausage casing"]))));
      return this.available() ? clamp(23 - get("_sausagesEaten"), 0, maxSausages) : 0;
    }
  }, {
    key: "availableMpMin",
    value: function availableMpMin() {
      return this.available() ? Math.min((0,external_kolmafia_namespaceObject.myMaxmp)(), 999) * this.usesRemaining() : 0;
    }
  }, {
    key: "execute",
    value: function execute() {
      var mpSpaceAvailable = (0,external_kolmafia_namespaceObject.myMaxmp)() - (0,external_kolmafia_namespaceObject.myMp)();
      if (mpSpaceAvailable < 700) return;
      var maxSausages = Math.min(this.usesRemaining(), Math.floor(((0,external_kolmafia_namespaceObject.myMaxmp)() - (0,external_kolmafia_namespaceObject.myMp)()) / Math.min((0,external_kolmafia_namespaceObject.myMaxmp)() - (0,external_kolmafia_namespaceObject.myMp)(), 999)));
      (0,external_kolmafia_namespaceObject.retrieveItem)(maxSausages, $item(mood_templateObject6 || (mood_templateObject6 = mood_taggedTemplateLiteral(["magical sausage"]))));
      (0,external_kolmafia_namespaceObject.eat)(maxSausages, $item(mood_templateObject7 || (mood_templateObject7 = mood_taggedTemplateLiteral(["magical sausage"]))));
    }
  }]);

  return MagicalSausages;
}(MpSource);

mood_defineProperty(MagicalSausages, "instance", new MagicalSausages());

var MoodElement = /*#__PURE__*/function () {
  function MoodElement() {
    mood_classCallCheck(this, MoodElement);
  }

  mood_createClass(MoodElement, [{
    key: "mpCostPerTurn",
    value: function mpCostPerTurn() {
      return 0;
    }
  }, {
    key: "turnIncrement",
    value: function turnIncrement() {
      return 1;
    }
  }]);

  return MoodElement;
}();

var SkillMoodElement = /*#__PURE__*/function (_MoodElement) {
  mood_inherits(SkillMoodElement, _MoodElement);

  var _super3 = mood_createSuper(SkillMoodElement);

  function SkillMoodElement(skill) {
    var _this;

    mood_classCallCheck(this, SkillMoodElement);

    _this = _super3.call(this);

    mood_defineProperty(mood_assertThisInitialized(_this), "skill", void 0);

    _this.skill = skill;
    return _this;
  }

  mood_createClass(SkillMoodElement, [{
    key: "mpCostPerTurn",
    value: function mpCostPerTurn() {
      var turns = (0,external_kolmafia_namespaceObject.turnsPerCast)(this.skill);
      return turns > 0 ? (0,external_kolmafia_namespaceObject.mpCost)(this.skill) / turns : 0;
    }
  }, {
    key: "turnIncrement",
    value: function turnIncrement() {
      return (0,external_kolmafia_namespaceObject.turnsPerCast)(this.skill);
    }
  }, {
    key: "execute",
    value: function execute(mood, ensureTurns) {
      var effect = (0,external_kolmafia_namespaceObject.toEffect)(this.skill);
      var initialTurns = (0,external_kolmafia_namespaceObject.haveEffect)(effect);
      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.skill)) return false;
      if (initialTurns >= ensureTurns) return true; // Deal with song slots.

      if (mood.options.songSlots.length > 0 && isSong(this.skill) && !have(effect)) {
        var activeSongs = getActiveSongs();

        var _iterator = mood_createForOfIteratorHelper(activeSongs),
            _step;

        try {
          var _loop = function _loop() {
            var song = _step.value;
            var slot = mood.options.songSlots.find(slot => slot.includes(song));

            if (!slot || slot.includes(effect)) {
              (0,external_kolmafia_namespaceObject.cliExecute)("shrug ".concat(song));
              return "break";
            }
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var oldRemainingCasts = -1;
      var remainingCasts = Math.ceil((ensureTurns - (0,external_kolmafia_namespaceObject.haveEffect)(effect)) / (0,external_kolmafia_namespaceObject.turnsPerCast)(this.skill));

      while (remainingCasts > 0 && oldRemainingCasts !== remainingCasts) {
        var maxCasts = void 0;

        if ((0,external_kolmafia_namespaceObject.hpCost)(this.skill) > 0) {
          // FIXME: restore HP
          maxCasts = Math.max(0, Math.floor(((0,external_kolmafia_namespaceObject.myHp)() - 1) / (0,external_kolmafia_namespaceObject.hpCost)(this.skill))); // Do not allow ourselves to hit 0 hp
        } else {
          var cost = (0,external_kolmafia_namespaceObject.mpCost)(this.skill);
          maxCasts = Math.floor(Math.min(mood.availableMp(), (0,external_kolmafia_namespaceObject.myMp)()) / cost);

          if (maxCasts < remainingCasts) {
            var bestMp = Math.min(remainingCasts * (0,external_kolmafia_namespaceObject.mpCost)(this.skill), (0,external_kolmafia_namespaceObject.myMaxmp)());
            mood.moreMp(bestMp);
            maxCasts = Math.floor(Math.min(mood.availableMp(), (0,external_kolmafia_namespaceObject.myMp)()) / cost);
          }
        }

        var casts = clamp(remainingCasts, 0, Math.min(100, maxCasts));
        (0,external_kolmafia_namespaceObject.useSkill)(casts, this.skill);
        oldRemainingCasts = remainingCasts;
        remainingCasts = Math.ceil((ensureTurns - (0,external_kolmafia_namespaceObject.haveEffect)(effect)) / (0,external_kolmafia_namespaceObject.turnsPerCast)(this.skill));
      }

      return (0,external_kolmafia_namespaceObject.haveEffect)(effect) > ensureTurns;
    }
  }]);

  return SkillMoodElement;
}(MoodElement);

var PotionMoodElement = /*#__PURE__*/function (_MoodElement2) {
  mood_inherits(PotionMoodElement, _MoodElement2);

  var _super4 = mood_createSuper(PotionMoodElement);

  function PotionMoodElement(potion, maxPricePerTurn) {
    var _this2;

    mood_classCallCheck(this, PotionMoodElement);

    _this2 = _super4.call(this);

    mood_defineProperty(mood_assertThisInitialized(_this2), "potion", void 0);

    mood_defineProperty(mood_assertThisInitialized(_this2), "maxPricePerTurn", void 0);

    _this2.potion = potion;
    _this2.maxPricePerTurn = maxPricePerTurn;
    return _this2;
  }

  mood_createClass(PotionMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      // FIXME: Smarter buying logic.
      // FIXME: Allow constructing stuff (e.g. snow cleats)
      var effect = (0,external_kolmafia_namespaceObject.effectModifier)(this.potion, "Effect");
      var effectTurns = (0,external_kolmafia_namespaceObject.haveEffect)(effect);
      var turnsPerUse = (0,external_kolmafia_namespaceObject.numericModifier)(this.potion, "Effect Duration");

      if ((0,external_kolmafia_namespaceObject.mallPrice)(this.potion) > this.maxPricePerTurn * turnsPerUse) {
        return false;
      } // integer part


      if (effectTurns < ensureTurns) {
        var uses = Math.floor((ensureTurns - effectTurns) / turnsPerUse);
        var quantityToBuy = clamp(uses - (0,external_kolmafia_namespaceObject.availableAmount)(this.potion), 0, 100);
        (0,external_kolmafia_namespaceObject.buy)(quantityToBuy, this.potion, Math.floor(this.maxPricePerTurn * turnsPerUse));
        var quantityToUse = clamp(uses, 0, (0,external_kolmafia_namespaceObject.availableAmount)(this.potion));
        (0,external_kolmafia_namespaceObject.use)(quantityToUse, this.potion);
      } // fractional part


      var remainingDifference = ensureTurns - (0,external_kolmafia_namespaceObject.haveEffect)(effect);

      if (remainingDifference > 0) {
        var price = Math.floor(this.maxPricePerTurn * remainingDifference);

        if (price <= (0,external_kolmafia_namespaceObject.mallPrice)(this.potion)) {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.potion) || (0,external_kolmafia_namespaceObject.buy)(1, this.potion, price)) {
            (0,external_kolmafia_namespaceObject.use)(1, this.potion);
          }
        }
      }

      return (0,external_kolmafia_namespaceObject.haveEffect)(effect) >= ensureTurns;
    }
  }]);

  return PotionMoodElement;
}(MoodElement);

var GenieMoodElement = /*#__PURE__*/function (_MoodElement3) {
  mood_inherits(GenieMoodElement, _MoodElement3);

  var _super5 = mood_createSuper(GenieMoodElement);

  function GenieMoodElement(effect) {
    var _this3;

    mood_classCallCheck(this, GenieMoodElement);

    _this3 = _super5.call(this);

    mood_defineProperty(mood_assertThisInitialized(_this3), "effect", void 0);

    _this3.effect = effect;
    return _this3;
  }

  mood_createClass(GenieMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) >= ensureTurns) return true;
      var neededWishes = Math.ceil(((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) - ensureTurns) / 20);
      var wishesToBuy = clamp(neededWishes - (0,external_kolmafia_namespaceObject.availableAmount)($item(mood_templateObject8 || (mood_templateObject8 = mood_taggedTemplateLiteral(["pocket wish"])))), 0, 20);
      (0,external_kolmafia_namespaceObject.buy)(wishesToBuy, $item(mood_templateObject9 || (mood_templateObject9 = mood_taggedTemplateLiteral(["pocket wish"]))), 50000);
      var wishesToUse = clamp(neededWishes, 0, (0,external_kolmafia_namespaceObject.availableAmount)($item(mood_templateObject10 || (mood_templateObject10 = mood_taggedTemplateLiteral(["pocket wish"])))));

      for (; wishesToUse > 0; wishesToUse--) {
        (0,external_kolmafia_namespaceObject.cliExecute)("genie effect ".concat(this.effect.name));
      }

      return (0,external_kolmafia_namespaceObject.haveEffect)(this.effect) >= ensureTurns;
    }
  }]);

  return GenieMoodElement;
}(MoodElement);

var CustomMoodElement = /*#__PURE__*/function (_MoodElement4) {
  mood_inherits(CustomMoodElement, _MoodElement4);

  var _super6 = mood_createSuper(CustomMoodElement);

  function CustomMoodElement(effect, gainEffect) {
    var _this4;

    mood_classCallCheck(this, CustomMoodElement);

    _this4 = _super6.call(this);

    mood_defineProperty(mood_assertThisInitialized(_this4), "effect", void 0);

    mood_defineProperty(mood_assertThisInitialized(_this4), "gainEffect", void 0);

    _this4.effect = effect;
    _this4.gainEffect = gainEffect !== null && gainEffect !== void 0 ? gainEffect : () => (0,external_kolmafia_namespaceObject.cliExecute)(effect.default);
    return _this4;
  }

  mood_createClass(CustomMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      var currentTurns = (0,external_kolmafia_namespaceObject.haveEffect)(this.effect);
      var lastCurrentTurns = -1;

      while (currentTurns < ensureTurns && currentTurns !== lastCurrentTurns) {
        this.gainEffect();
        lastCurrentTurns = currentTurns;
        currentTurns = (0,external_kolmafia_namespaceObject.haveEffect)(this.effect);
      }

      return (0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > ensureTurns;
    }
  }]);

  return CustomMoodElement;
}(MoodElement);

var AsdonMoodElement = /*#__PURE__*/function (_MoodElement5) {
  mood_inherits(AsdonMoodElement, _MoodElement5);

  var _super7 = mood_createSuper(AsdonMoodElement);

  function AsdonMoodElement(effect) {
    var _this5;

    var preferInventory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    mood_classCallCheck(this, AsdonMoodElement);

    _this5 = _super7.call(this);

    mood_defineProperty(mood_assertThisInitialized(_this5), "effect", void 0);

    mood_defineProperty(mood_assertThisInitialized(_this5), "preferInventory", void 0);

    _this5.effect = effect;
    _this5.preferInventory = preferInventory;
    return _this5;
  }

  mood_createClass(AsdonMoodElement, [{
    key: "execute",
    value: function execute(mood, ensureTurns) {
      return drive(this.effect, ensureTurns, this.preferInventory);
    }
  }]);

  return AsdonMoodElement;
}(MoodElement);
/**
 * Class representing a mood object. Add mood elements using the instance methods, which can be chained.
 */


var Mood = /*#__PURE__*/function () {
  /**
   * Construct a new Mood instance.
   * @param options Options for mood.
   */
  function Mood() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    mood_classCallCheck(this, Mood);

    mood_defineProperty(this, "options", void 0);

    mood_defineProperty(this, "elements", []);

    this.options = mood_objectSpread(mood_objectSpread({}, Mood.defaultOptions), options);
  }
  /**
   * Get the MP available for casting skills.
   */


  mood_createClass(Mood, [{
    key: "availableMp",
    value: function availableMp() {
      return this.options.useNativeRestores ? Infinity : sum(this.options.mpSources, mpSource => mpSource.availableMpMin()) + Math.max((0,external_kolmafia_namespaceObject.myMp)() - this.options.reserveMp, 0);
    }
  }, {
    key: "moreMp",
    value: function moreMp(minimumTarget) {
      if ((0,external_kolmafia_namespaceObject.myMp)() >= minimumTarget) return;

      var _iterator2 = mood_createForOfIteratorHelper(this.options.mpSources),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mpSource = _step2.value;

          if (mpSource.usesRemaining() > 0) {
            mpSource.execute();
            if ((0,external_kolmafia_namespaceObject.myMp)() >= minimumTarget) break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (this.options.useNativeRestores) {
        (0,external_kolmafia_namespaceObject.restoreMp)(minimumTarget);
      }
    }
    /**
     * Add a skill to the mood.
     * @param skill Skill to add.
     */

  }, {
    key: "skill",
    value: function skill(_skill) {
      this.elements.push(new SkillMoodElement(_skill));
      return this;
    }
    /**
     * Add an effect to the mood, with casting based on {effect.default}.
     * @param effect Effect to add.
     * @param gainEffect How to gain the effect. Only runs if we don't have the effect.
     */

  }, {
    key: "effect",
    value: function effect(_effect, gainEffect) {
      var skill = (0,external_kolmafia_namespaceObject.toSkill)(_effect);

      if (!gainEffect && skill !== $skill.none) {
        this.skill(skill);
      } else {
        this.elements.push(new CustomMoodElement(_effect, gainEffect));
      }

      return this;
    }
    /**
     * Add a potion to the mood.
     * @param potion Potion to add.
     * @param maxPricePerTurn Maximum price to pay per turn of the effect.
     */

  }, {
    key: "potion",
    value: function potion(_potion, maxPricePerTurn) {
      this.elements.push(new PotionMoodElement(_potion, maxPricePerTurn));
      return this;
    }
    /**
     * Add an effect to acquire via pocket wishes to the mood.
     * @param effect Effect to wish for in the mood.
     */

  }, {
    key: "genie",
    value: function genie(effect) {
      this.elements.push(new GenieMoodElement(effect));
      return this;
    }
    /**
     * Add an Asdon Martin driving style to the mood.
     * @param effect Driving style to add to the mood.
     */

  }, {
    key: "drive",
    value: function drive(effect) {
      if (Object.values(Driving).includes(effect) && installed()) {
        this.elements.push(new AsdonMoodElement(effect));
      }

      return this;
    }
    /**
     * Execute the mood, trying to ensure {ensureTurns} of each effect.
     * @param ensureTurns Turns of each effect to try and achieve.
     * @returns Whether or not we successfully got this many turns of every effect in the mood.
     */

  }, {
    key: "execute",
    value: function execute() {
      var ensureTurns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var availableMp = this.availableMp();
      var totalMpPerTurn = sum(this.elements, element => element.mpCostPerTurn());
      var potentialTurns = Math.floor(availableMp / totalMpPerTurn);
      var completeSuccess = true;

      var _iterator3 = mood_createForOfIteratorHelper(this.elements),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          var elementTurns = ensureTurns;

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

      this.moreMp(this.options.reserveMp);
      return completeSuccess;
    }
  }], [{
    key: "setDefaultOptions",
    value:
    /**
     * Set default options for new Mood instances.
     * @param options Default options for new Mood instances.
     */
    function setDefaultOptions(options) {
      Mood.defaultOptions = mood_objectSpread(mood_objectSpread({}, Mood.defaultOptions), options);
    }
  }]);

  return Mood;
}();

mood_defineProperty(Mood, "defaultOptions", {
  songSlots: [],
  mpSources: [MagicalSausages.instance, OscusSoda.instance],
  reserveMp: 0,
  useNativeRestores: false
});
;// CONCATENATED MODULE: ./src/resources/2008/Stickers.ts
var Stickers_templateObject, Stickers_templateObject2, Stickers_templateObject3, Stickers_templateObject4, Stickers_templateObject5, Stickers_templateObject6, Stickers_templateObject7, Stickers_templateObject8, Stickers_templateObject9, Stickers_templateObject10, Stickers_templateObject11;

function Stickers_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var stickers = {
  unicorn: $item(Stickers_templateObject || (Stickers_templateObject = Stickers_taggedTemplateLiteral(["scratch 'n' sniff unicorn sticker"]))),
  apple: $item(Stickers_templateObject2 || (Stickers_templateObject2 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff apple sticker"]))),
  UPC: $item(Stickers_templateObject3 || (Stickers_templateObject3 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff UPC sticker"]))),
  wrestler: $item(Stickers_templateObject4 || (Stickers_templateObject4 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff wrestler sticker"]))),
  dragon: $item(Stickers_templateObject5 || (Stickers_templateObject5 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff dragon sticker"]))),
  rockband: $item(Stickers_templateObject6 || (Stickers_templateObject6 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff rock band sticker"])))
};
function Stickers_have() {
  return (0,external_kolmafia_namespaceObject.haveSkill)($skill(Stickers_templateObject7 || (Stickers_templateObject7 = Stickers_taggedTemplateLiteral(["Summon Stickers"]))));
}
function weapon() {
  var _find;

  return (_find = $items(Stickers_templateObject8 || (Stickers_templateObject8 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff sword, scratch 'n' sniff crossbow"]))).find(i => (0,external_kolmafia_namespaceObject.availableAmount)(i))) !== null && _find !== void 0 ? _find : null;
}
var weapons = {
  sword: $item(Stickers_templateObject9 || (Stickers_templateObject9 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff sword"]))),
  crossbow: $item(Stickers_templateObject10 || (Stickers_templateObject10 = Stickers_taggedTemplateLiteral(["scratch 'n' sniff crossbow"])))
};
function makeSword(sticker) {
  if (weapon()) return;
  var id = (0,external_kolmafia_namespaceObject.toInt)(stickers[sticker]);
  (0,external_kolmafia_namespaceObject.visitUrl)("bedazzle.php?action=juststick&sticker=".concat(id, "&pwd"));
}
function foldWeapon(mode) {
  var currentWep = weapon();
  if (!currentWep) return false;
  if (weapons[mode] === currentWep) return true;
  (0,external_kolmafia_namespaceObject.visitUrl)("bedazzle.php?action=fold&pwd");
  return weapons[mode] === currentWep;
}
function currentStickers() {
  return $slots(Stickers_templateObject11 || (Stickers_templateObject11 = Stickers_taggedTemplateLiteral(["sticker1, sticker2, sticker3"]))).map(s => (0,external_kolmafia_namespaceObject.equippedItem)(s));
}
function setStickers() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  var _loop = function _loop() {
    var s = _options[_i];
    if (s) (0,external_kolmafia_namespaceObject.retrieveItem)(stickers[s], options.filter(x => x === s).length);
  };

  for (var _i = 0, _options = options; _i < _options.length; _i++) {
    _loop();
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("bedazzle.php");
  var start = currentStickers();

  for (var i = 0; i <= 2; i++) {
    var sticker = options[i];
    if (!sticker) continue;
    var item = stickers[sticker];
    if (start[i] === item) continue;
    (0,external_kolmafia_namespaceObject.visitUrl)("bedazzle.php?action=peel&slot=".concat(i + 1, "&pwd"));
    (0,external_kolmafia_namespaceObject.visitUrl)("bedazzle.php?action=stick&slot=".concat(i + 1, "&sticker=").concat((0,external_kolmafia_namespaceObject.toInt)(item), "&pwd"));
  }

  return currentStickers();
}
;// CONCATENATED MODULE: ./src/resources/2009/SpookyPutty.ts
var SpookyPutty_templateObject;

function SpookyPutty_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var sheet = $item(SpookyPutty_templateObject || (SpookyPutty_templateObject = SpookyPutty_taggedTemplateLiteral(["Spooky Putty sheet"])));
function SpookyPutty_have() {
  return getFoldGroup(sheet).some(item => have(item));
}
function getSpookyPuttySheetCopiesMade() {
  return Math.max(0, get("spookyPuttyCopiesMade"));
}
function prepareSpookyPuttySheet() {
  if (!SpookyPutty_have()) return false;
  if (have(sheet)) return true;
  return (0,external_kolmafia_namespaceObject.cliExecute)("fold Spooky putty sheet");
}
function getSpookyPuttySheetMonster() {
  return get("spookyPuttyMonster");
}
function useSpookyPuttySheet() {
  return (0,external_kolmafia_namespaceObject.use)(sheet);
}
;// CONCATENATED MODULE: ./src/resources/2010/CrownOfThrones.ts
var CrownOfThrones_templateObject, CrownOfThrones_templateObject2, _modifier, CrownOfThrones_templateObject3, CrownOfThrones_templateObject4, _modifier2, CrownOfThrones_templateObject5, CrownOfThrones_templateObject6, CrownOfThrones_templateObject7, CrownOfThrones_templateObject8, CrownOfThrones_templateObject9, CrownOfThrones_templateObject10, CrownOfThrones_templateObject11, CrownOfThrones_templateObject12, _modifier7, CrownOfThrones_templateObject13, CrownOfThrones_templateObject14, _modifier8, CrownOfThrones_templateObject15, CrownOfThrones_templateObject16, _modifier9, CrownOfThrones_templateObject17, CrownOfThrones_templateObject18, CrownOfThrones_templateObject19, CrownOfThrones_templateObject20, CrownOfThrones_templateObject21, CrownOfThrones_templateObject22, CrownOfThrones_templateObject23, CrownOfThrones_templateObject24, CrownOfThrones_templateObject25, CrownOfThrones_templateObject26, CrownOfThrones_templateObject27, CrownOfThrones_templateObject28, _modifier15, CrownOfThrones_templateObject29, CrownOfThrones_templateObject30, CrownOfThrones_templateObject31, CrownOfThrones_templateObject32, CrownOfThrones_templateObject33, CrownOfThrones_templateObject34, CrownOfThrones_templateObject35, CrownOfThrones_templateObject36, CrownOfThrones_templateObject37, CrownOfThrones_templateObject38, CrownOfThrones_templateObject39, CrownOfThrones_templateObject40, CrownOfThrones_templateObject41, CrownOfThrones_templateObject42, CrownOfThrones_templateObject43, CrownOfThrones_templateObject44, CrownOfThrones_templateObject45, CrownOfThrones_templateObject46, CrownOfThrones_templateObject47, CrownOfThrones_templateObject48, CrownOfThrones_templateObject49, CrownOfThrones_templateObject50, _modifier26, CrownOfThrones_templateObject51, CrownOfThrones_templateObject52, _modifier27, CrownOfThrones_templateObject53, CrownOfThrones_templateObject54, _modifier28, CrownOfThrones_templateObject55, CrownOfThrones_templateObject56, CrownOfThrones_templateObject57, CrownOfThrones_templateObject58, CrownOfThrones_templateObject59, _templateObject60, _modifier31, _templateObject61, _templateObject62, _modifier32, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _modifier34, _templateObject67, _templateObject68, _modifier35, _templateObject69, _templateObject70, _modifier36, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104;

function CrownOfThrones_toConsumableArray(arr) { return CrownOfThrones_arrayWithoutHoles(arr) || CrownOfThrones_iterableToArray(arr) || CrownOfThrones_unsupportedIterableToArray(arr) || CrownOfThrones_nonIterableSpread(); }

function CrownOfThrones_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CrownOfThrones_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CrownOfThrones_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CrownOfThrones_arrayLikeToArray(o, minLen); }

function CrownOfThrones_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function CrownOfThrones_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return CrownOfThrones_arrayLikeToArray(arr); }

function CrownOfThrones_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CrownOfThrones_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CrownOfThrones_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var ridingFamiliars = [{
  familiar: $familiar(CrownOfThrones_templateObject || (CrownOfThrones_templateObject = CrownOfThrones_taggedTemplateLiteral(["Puck Man"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject2 || (CrownOfThrones_templateObject2 = CrownOfThrones_taggedTemplateLiteral(["yellow pixel"])))),
  probability: 0.25,
  modifier: (_modifier = {}, CrownOfThrones_defineProperty(_modifier, "Muscle", 10), CrownOfThrones_defineProperty(_modifier, "Mysticality", 10), CrownOfThrones_defineProperty(_modifier, "Moxie", 10), _modifier),
  dropPredicate: () => get("_yellowPixelDropsCrown") < 25
}, {
  familiar: $familiar(CrownOfThrones_templateObject3 || (CrownOfThrones_templateObject3 = CrownOfThrones_taggedTemplateLiteral(["Ms. Puck Man"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject4 || (CrownOfThrones_templateObject4 = CrownOfThrones_taggedTemplateLiteral(["yellow pixel"])))),
  probability: 0.25,
  modifier: (_modifier2 = {}, CrownOfThrones_defineProperty(_modifier2, "Muscle", 10), CrownOfThrones_defineProperty(_modifier2, "Mysticality", 10), CrownOfThrones_defineProperty(_modifier2, "Moxie", 10), _modifier2),
  dropPredicate: () => get("_yellowPixelDropsCrown") < 25
}, {
  familiar: $familiar(CrownOfThrones_templateObject5 || (CrownOfThrones_templateObject5 = CrownOfThrones_taggedTemplateLiteral(["Grimstone Golem"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject6 || (CrownOfThrones_templateObject6 = CrownOfThrones_taggedTemplateLiteral(["grimstone mask"])))),
  probability: 0.5,
  modifier: CrownOfThrones_defineProperty({}, "Combat Rate", -5),
  dropPredicate: () => get("_grimstoneMaskDropsCrown") < 1
}, {
  familiar: $familiar(CrownOfThrones_templateObject7 || (CrownOfThrones_templateObject7 = CrownOfThrones_taggedTemplateLiteral(["Knob Goblin Organ Grinder"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 25)
}, {
  familiar: $familiar(CrownOfThrones_templateObject8 || (CrownOfThrones_templateObject8 = CrownOfThrones_taggedTemplateLiteral(["Happy Medium"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 25)
}, {
  familiar: $familiar(CrownOfThrones_templateObject9 || (CrownOfThrones_templateObject9 = CrownOfThrones_taggedTemplateLiteral(["Garbage Fire"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject10 || (CrownOfThrones_templateObject10 = CrownOfThrones_taggedTemplateLiteral(["burning newspaper"])))),
  probability: 0.5,
  modifier: CrownOfThrones_defineProperty({}, "Hot Spell Damage", 25),
  dropPredicate: () => get("_garbageFireDropsCrown") < 3
}, {
  familiar: $familiar(CrownOfThrones_templateObject11 || (CrownOfThrones_templateObject11 = CrownOfThrones_taggedTemplateLiteral(["Machine Elf"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject12 || (CrownOfThrones_templateObject12 = CrownOfThrones_taggedTemplateLiteral(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"]))))),
  probability: 0.2,
  modifier: (_modifier7 = {}, CrownOfThrones_defineProperty(_modifier7, "Muscle", 7), CrownOfThrones_defineProperty(_modifier7, "Mysticality", 7), CrownOfThrones_defineProperty(_modifier7, "Moxie", 7), _modifier7),
  dropPredicate: () => get("_abstractionDropsCrown") < 25
}, {
  familiar: $familiar(CrownOfThrones_templateObject13 || (CrownOfThrones_templateObject13 = CrownOfThrones_taggedTemplateLiteral(["Trick-or-Treating Tot"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject14 || (CrownOfThrones_templateObject14 = CrownOfThrones_taggedTemplateLiteral(["hoarded candy wad"])))),
  probability: 0.5,
  modifier: (_modifier8 = {}, CrownOfThrones_defineProperty(_modifier8, "Muscle", 10), CrownOfThrones_defineProperty(_modifier8, "Mysticality", 10), CrownOfThrones_defineProperty(_modifier8, "Moxie", 10), _modifier8),
  dropPredicate: () => get("_hoardedCandyDropsCrown") < 3
}, {
  familiar: $familiar(CrownOfThrones_templateObject15 || (CrownOfThrones_templateObject15 = CrownOfThrones_taggedTemplateLiteral(["Warbear Drone"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject16 || (CrownOfThrones_templateObject16 = CrownOfThrones_taggedTemplateLiteral(["warbear whosit"])))),
  probability: 1 / 4.5,
  modifier: (_modifier9 = {}, CrownOfThrones_defineProperty(_modifier9, "Maximum HP", 15), CrownOfThrones_defineProperty(_modifier9, "Maximum MP", 15), _modifier9)
}, {
  familiar: $familiar(CrownOfThrones_templateObject17 || (CrownOfThrones_templateObject17 = CrownOfThrones_taggedTemplateLiteral(["Li'l Xenomorph"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject18 || (CrownOfThrones_templateObject18 = CrownOfThrones_taggedTemplateLiteral(["lunar isotope"])))),
  probability: 0.05,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 15)
}, {
  familiar: $familiar(CrownOfThrones_templateObject19 || (CrownOfThrones_templateObject19 = CrownOfThrones_taggedTemplateLiteral(["Pottery Barn Owl"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject20 || (CrownOfThrones_templateObject20 = CrownOfThrones_taggedTemplateLiteral(["volcanic ash"])))),
  probability: 0.1,
  modifier: CrownOfThrones_defineProperty({}, "Hot Damage", 10)
}, {
  familiar: $familiar(CrownOfThrones_templateObject21 || (CrownOfThrones_templateObject21 = CrownOfThrones_taggedTemplateLiteral(["Grim Brother"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject22 || (CrownOfThrones_templateObject22 = CrownOfThrones_taggedTemplateLiteral(["grim fairy tale"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Combat Rate", 5),
  dropPredicate: () => get("_grimFairyTaleDropsCrown") < 2
}, {
  familiar: $familiar(CrownOfThrones_templateObject23 || (CrownOfThrones_templateObject23 = CrownOfThrones_taggedTemplateLiteral(["Optimistic Candle"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject24 || (CrownOfThrones_templateObject24 = CrownOfThrones_taggedTemplateLiteral(["glob of melted wax"])))),
  probability: 1,
  dropPredicate: () => get("_optimisticCandleDropsCrown") < 3,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 15)
}, {
  familiar: $familiar(CrownOfThrones_templateObject25 || (CrownOfThrones_templateObject25 = CrownOfThrones_taggedTemplateLiteral(["Adventurous Spelunker"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject26 || (CrownOfThrones_templateObject26 = CrownOfThrones_taggedTemplateLiteral(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"]))))),
  probability: 1,
  dropPredicate: () => get("_oreDropsCrown") < 6,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 15)
}, {
  familiar: $familiar(CrownOfThrones_templateObject27 || (CrownOfThrones_templateObject27 = CrownOfThrones_taggedTemplateLiteral(["Twitching Space Critter"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject28 || (CrownOfThrones_templateObject28 = CrownOfThrones_taggedTemplateLiteral(["space beast fur"])))),
  probability: 1,
  modifier: (_modifier15 = {}, CrownOfThrones_defineProperty(_modifier15, "Hot Resistance", 2), CrownOfThrones_defineProperty(_modifier15, "Cold Resistance", 2), CrownOfThrones_defineProperty(_modifier15, "Spooky Resistance", 2), CrownOfThrones_defineProperty(_modifier15, "Sleaze Resistance", 2), CrownOfThrones_defineProperty(_modifier15, "Stench Resistance", 2), _modifier15),
  dropPredicate: () => get("_spaceFurDropsCrown") < 1
}, {
  familiar: $familiar(CrownOfThrones_templateObject29 || (CrownOfThrones_templateObject29 = CrownOfThrones_taggedTemplateLiteral(["Party Mouse"]))),
  meatVal: () => 50,

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
  modifier: CrownOfThrones_defineProperty({}, "Booze Drop", 25)
}, {
  familiar: $familiar(CrownOfThrones_templateObject30 || (CrownOfThrones_templateObject30 = CrownOfThrones_taggedTemplateLiteral(["Yule Hound"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject31 || (CrownOfThrones_templateObject31 = CrownOfThrones_taggedTemplateLiteral(["candy cane"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Candy Drop", 20)
}, {
  familiar: $familiar(CrownOfThrones_templateObject32 || (CrownOfThrones_templateObject32 = CrownOfThrones_taggedTemplateLiteral(["Gluttonous Green Ghost"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject33 || (CrownOfThrones_templateObject33 = CrownOfThrones_taggedTemplateLiteral(["bean burrito, enchanted bean burrito, jumping bean burrito"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Food Drop", 15)
}, {
  familiar: $familiar(CrownOfThrones_templateObject34 || (CrownOfThrones_templateObject34 = CrownOfThrones_taggedTemplateLiteral(["Reassembled Blackbird"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject35 || (CrownOfThrones_templateObject35 = CrownOfThrones_taggedTemplateLiteral(["blackberry"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 10)
}, {
  familiar: $familiar(CrownOfThrones_templateObject36 || (CrownOfThrones_templateObject36 = CrownOfThrones_taggedTemplateLiteral(["Reconstituted Crow"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject37 || (CrownOfThrones_templateObject37 = CrownOfThrones_taggedTemplateLiteral(["blackberry"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 10)
}, {
  familiar: $familiar(CrownOfThrones_templateObject38 || (CrownOfThrones_templateObject38 = CrownOfThrones_taggedTemplateLiteral(["Hunchbacked Minion"]))),
  meatVal: () => 0.02 * getSaleValue($item(CrownOfThrones_templateObject39 || (CrownOfThrones_templateObject39 = CrownOfThrones_taggedTemplateLiteral(["disembodied brain"])))) + 0.98 * getSaleValue($item(CrownOfThrones_templateObject40 || (CrownOfThrones_templateObject40 = CrownOfThrones_taggedTemplateLiteral(["skeleton bone"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Muscle Experience", 2)
}, {
  familiar: $familiar(CrownOfThrones_templateObject41 || (CrownOfThrones_templateObject41 = CrownOfThrones_taggedTemplateLiteral(["Reanimated Reanimator"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject42 || (CrownOfThrones_templateObject42 = CrownOfThrones_taggedTemplateLiteral(["hot wing, broken skull"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Mysticality Experience", 2)
}, {
  familiar: $familiar(CrownOfThrones_templateObject43 || (CrownOfThrones_templateObject43 = CrownOfThrones_taggedTemplateLiteral(["Attention-Deficit Demon"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject44 || (CrownOfThrones_templateObject44 = CrownOfThrones_taggedTemplateLiteral(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(CrownOfThrones_templateObject45 || (CrownOfThrones_templateObject45 = CrownOfThrones_taggedTemplateLiteral(["Piano Cat"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject46 || (CrownOfThrones_templateObject46 = CrownOfThrones_taggedTemplateLiteral(["beertini, papaya slung, salty slug, tomato daiquiri"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(CrownOfThrones_templateObject47 || (CrownOfThrones_templateObject47 = CrownOfThrones_taggedTemplateLiteral(["Golden Monkey"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject48 || (CrownOfThrones_templateObject48 = CrownOfThrones_taggedTemplateLiteral(["gold nuggets"])))),
  probability: 0.5,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 25)
}, {
  familiar: $familiar(CrownOfThrones_templateObject49 || (CrownOfThrones_templateObject49 = CrownOfThrones_taggedTemplateLiteral(["Robot Reindeer"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject50 || (CrownOfThrones_templateObject50 = CrownOfThrones_taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier26 = {}, CrownOfThrones_defineProperty(_modifier26, "Muscle", 10), CrownOfThrones_defineProperty(_modifier26, "Mysticality", 10), CrownOfThrones_defineProperty(_modifier26, "Moxie", 10), _modifier26)
}, {
  familiar: $familiar(CrownOfThrones_templateObject51 || (CrownOfThrones_templateObject51 = CrownOfThrones_taggedTemplateLiteral(["Stocking Mimic"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject52 || (CrownOfThrones_templateObject52 = CrownOfThrones_taggedTemplateLiteral(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"]))))),
  probability: 0.3,
  modifier: (_modifier27 = {}, CrownOfThrones_defineProperty(_modifier27, "Muscle", 10), CrownOfThrones_defineProperty(_modifier27, "Mysticality", 10), CrownOfThrones_defineProperty(_modifier27, "Moxie", 10), _modifier27)
}, {
  familiar: $familiar(CrownOfThrones_templateObject53 || (CrownOfThrones_templateObject53 = CrownOfThrones_taggedTemplateLiteral(["BRICKO chick"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject54 || (CrownOfThrones_templateObject54 = CrownOfThrones_taggedTemplateLiteral(["BRICKO brick"])))),
  probability: 1,
  modifier: (_modifier28 = {}, CrownOfThrones_defineProperty(_modifier28, "Muscle Percent", 10), CrownOfThrones_defineProperty(_modifier28, "Mysticality Percent", 10), CrownOfThrones_defineProperty(_modifier28, "Moxie Percent", 10), _modifier28)
}, {
  familiar: $familiar(CrownOfThrones_templateObject55 || (CrownOfThrones_templateObject55 = CrownOfThrones_taggedTemplateLiteral(["Cotton Candy Carnie"]))),
  meatVal: () => getSaleValue($item(CrownOfThrones_templateObject56 || (CrownOfThrones_templateObject56 = CrownOfThrones_taggedTemplateLiteral(["cotton candy pinch"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Initiative", 20)
}, {
  familiar: $familiar(CrownOfThrones_templateObject57 || (CrownOfThrones_templateObject57 = CrownOfThrones_taggedTemplateLiteral(["Untamed Turtle"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(CrownOfThrones_templateObject58 || (CrownOfThrones_templateObject58 = CrownOfThrones_taggedTemplateLiteral(["snailmail bits, turtlemail bits, turtle wax"]))))),
  probability: 0.35,
  modifier: CrownOfThrones_defineProperty({}, "Initiative", 20)
}, {
  familiar: $familiar(CrownOfThrones_templateObject59 || (CrownOfThrones_templateObject59 = CrownOfThrones_taggedTemplateLiteral(["Astral Badger"]))),
  meatVal: () => 2 * getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(_templateObject60 || (_templateObject60 = CrownOfThrones_taggedTemplateLiteral(["spooky mushroom, Knob mushroom, Knoll mushroom"]))))),
  probability: 1,
  modifier: (_modifier31 = {}, CrownOfThrones_defineProperty(_modifier31, "Maximum HP", 10), CrownOfThrones_defineProperty(_modifier31, "Maximum MP", 10), _modifier31)
}, {
  familiar: $familiar(_templateObject61 || (_templateObject61 = CrownOfThrones_taggedTemplateLiteral(["Green Pixie"]))),
  meatVal: () => getSaleValue($item(_templateObject62 || (_templateObject62 = CrownOfThrones_taggedTemplateLiteral(["bottle of tequila"])))),
  probability: 0.2,
  modifier: (_modifier32 = {}, CrownOfThrones_defineProperty(_modifier32, "Maximum HP", 10), CrownOfThrones_defineProperty(_modifier32, "Maximum MP", 10), _modifier32)
}, {
  familiar: $familiar(_templateObject63 || (_templateObject63 = CrownOfThrones_taggedTemplateLiteral(["Angry Goat"]))),
  meatVal: () => getSaleValue($item(_templateObject64 || (_templateObject64 = CrownOfThrones_taggedTemplateLiteral(["goat cheese pizza"])))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Muscle Percent", 15)
}, {
  familiar: $familiar(_templateObject65 || (_templateObject65 = CrownOfThrones_taggedTemplateLiteral(["Adorable Seal Larva"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(_templateObject66 || (_templateObject66 = CrownOfThrones_taggedTemplateLiteral(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"]))))),
  probability: 0.35,
  modifier: (_modifier34 = {}, CrownOfThrones_defineProperty(_modifier34, "HP Regen Min", 2), CrownOfThrones_defineProperty(_modifier34, "MP Regen Min", 2), CrownOfThrones_defineProperty(_modifier34, "HP Regen Max", 8), CrownOfThrones_defineProperty(_modifier34, "MP Regen Max", 8), _modifier34)
}, {
  familiar: $familiar(_templateObject67 || (_templateObject67 = CrownOfThrones_taggedTemplateLiteral(["Ancient Yuletide Troll"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(_templateObject68 || (_templateObject68 = CrownOfThrones_taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier35 = {}, CrownOfThrones_defineProperty(_modifier35, "HP Regen Min", 2), CrownOfThrones_defineProperty(_modifier35, "MP Regen Min", 2), CrownOfThrones_defineProperty(_modifier35, "HP Regen Max", 8), CrownOfThrones_defineProperty(_modifier35, "MP Regen Max", 8), _modifier35)
}, {
  familiar: $familiar(_templateObject69 || (_templateObject69 = CrownOfThrones_taggedTemplateLiteral(["Sweet Nutcracker"]))),
  meatVal: () => getSaleValue.apply(void 0, CrownOfThrones_toConsumableArray($items(_templateObject70 || (_templateObject70 = CrownOfThrones_taggedTemplateLiteral(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))))),
  probability: 0.3,
  modifier: (_modifier36 = {}, CrownOfThrones_defineProperty(_modifier36, "HP Regen Min", 2), CrownOfThrones_defineProperty(_modifier36, "MP Regen Min", 2), CrownOfThrones_defineProperty(_modifier36, "HP Regen Max", 8), CrownOfThrones_defineProperty(_modifier36, "MP Regen Max", 8), _modifier36)
}, {
  familiar: $familiar(_templateObject71 || (_templateObject71 = CrownOfThrones_taggedTemplateLiteral(["Casagnova Gnome"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject72 || (_templateObject72 = CrownOfThrones_taggedTemplateLiteral(["Coffee Pixie"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject73 || (_templateObject73 = CrownOfThrones_taggedTemplateLiteral(["Dancing Frog"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject74 || (_templateObject74 = CrownOfThrones_taggedTemplateLiteral(["Grouper Groupie"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject75 || (_templateObject75 = CrownOfThrones_taggedTemplateLiteral(["Hand Turkey"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject76 || (_templateObject76 = CrownOfThrones_taggedTemplateLiteral(["Hippo Ballerina"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject77 || (_templateObject77 = CrownOfThrones_taggedTemplateLiteral(["Jitterbug"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject78 || (_templateObject78 = CrownOfThrones_taggedTemplateLiteral(["Leprechaun"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject79 || (_templateObject79 = CrownOfThrones_taggedTemplateLiteral(["Obtuse Angel"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject80 || (_templateObject80 = CrownOfThrones_taggedTemplateLiteral(["Psychedelic Bear"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject81 || (_templateObject81 = CrownOfThrones_taggedTemplateLiteral(["Robortender"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject82 || (_templateObject82 = CrownOfThrones_taggedTemplateLiteral(["Ghost of Crimbo Commerce"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject83 || (_templateObject83 = CrownOfThrones_taggedTemplateLiteral(["Hobo Monkey"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject84 || (_templateObject84 = CrownOfThrones_taggedTemplateLiteral(["Rockin' Robin"]))),
  meatVal: () => 60,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject85 || (_templateObject85 = CrownOfThrones_taggedTemplateLiteral(["Feral Kobold"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject86 || (_templateObject86 = CrownOfThrones_taggedTemplateLiteral(["Oily Woim"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject87 || (_templateObject87 = CrownOfThrones_taggedTemplateLiteral(["Cat Burglar"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject88 || (_templateObject88 = CrownOfThrones_taggedTemplateLiteral(["Misshapen Animal Skeleton"]))),
  meatVal: () => 30,
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject89 || (_templateObject89 = CrownOfThrones_taggedTemplateLiteral(["Gelatinous Cubeling"]))),
  meatVal: () => 0,
  probability: 0,
  modifier: CrownOfThrones_defineProperty({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject90 || (_templateObject90 = CrownOfThrones_taggedTemplateLiteral(["Frozen Gravy Fairy"]))),
  // drops a cold nugget every combat, 5 of which can be used to make a cold wad
  meatVal: () => Math.max(0.2 * getSaleValue($item(_templateObject91 || (_templateObject91 = CrownOfThrones_taggedTemplateLiteral(["cold wad"])))), getSaleValue($item(_templateObject92 || (_templateObject92 = CrownOfThrones_taggedTemplateLiteral(["cold nuggets"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Cold Damage", 20)
}, {
  familiar: $familiar(_templateObject93 || (_templateObject93 = CrownOfThrones_taggedTemplateLiteral(["Stinky Gravy Fairy"]))),
  // drops a stench nugget every combat, 5 of which can be used to make a stench wad
  meatVal: () => Math.max(0.2 * getSaleValue($item(_templateObject94 || (_templateObject94 = CrownOfThrones_taggedTemplateLiteral(["stench wad"])))), getSaleValue($item(_templateObject95 || (_templateObject95 = CrownOfThrones_taggedTemplateLiteral(["stench nuggets"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Stench Damage", 20)
}, {
  familiar: $familiar(_templateObject96 || (_templateObject96 = CrownOfThrones_taggedTemplateLiteral(["Sleazy Gravy Fairy"]))),
  // drops a sleaze nugget every combat, 5 of which can be used to make a sleaze wad
  meatVal: () => Math.max(0.2 * getSaleValue($item(_templateObject97 || (_templateObject97 = CrownOfThrones_taggedTemplateLiteral(["sleaze wad"])))), getSaleValue($item(_templateObject98 || (_templateObject98 = CrownOfThrones_taggedTemplateLiteral(["sleaze nuggets"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Sleaze Damage", 20)
}, {
  familiar: $familiar(_templateObject99 || (_templateObject99 = CrownOfThrones_taggedTemplateLiteral(["Spooky Gravy Fairy"]))),
  // drops a spooky nugget every combat, 5 of which can be used to make a spooky wad
  meatVal: () => Math.max(0.2 * getSaleValue($item(_templateObject100 || (_templateObject100 = CrownOfThrones_taggedTemplateLiteral(["spooky wad"])))), getSaleValue($item(_templateObject101 || (_templateObject101 = CrownOfThrones_taggedTemplateLiteral(["spooky nuggets"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Spooky Damage", 20)
}, {
  familiar: $familiar(_templateObject102 || (_templateObject102 = CrownOfThrones_taggedTemplateLiteral(["Flaming Gravy Fairy"]))),
  // drops a hot nugget every combat, 5 of which can be used to make a hot wad
  meatVal: () => Math.max(0.2 * getSaleValue($item(_templateObject103 || (_templateObject103 = CrownOfThrones_taggedTemplateLiteral(["hot wad"])))), getSaleValue($item(_templateObject104 || (_templateObject104 = CrownOfThrones_taggedTemplateLiteral(["hot nuggets"]))))),
  probability: 1,
  modifier: CrownOfThrones_defineProperty({}, "Hot Damage", 20)
}];
function valueRider(rider, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * rider.meatVal() : 0;
  var modifierValue = modifierValueFunction(rider.modifier);
  return dropValue + modifierValue;
}
var riderModes = new Map();
function createRiderMode(name, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var excludeCurrentFamiliar = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return riderModes.set(name, {
    modifierValueFunction: modifierValueFunction,
    ignoreLimitedDrops: ignoreLimitedDrops,
    excludeCurrentFamiliar: excludeCurrentFamiliar
  });
}
var riderLists = new Map();
function pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData) return null;
  var modifierValueFunction = modeData.modifierValueFunction,
      ignoreLimitedDrops = modeData.ignoreLimitedDrops,
      excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;

  if (!riderLists.has(mode)) {
    riderLists.set(mode, ridingFamiliars.filter(rider => have(rider.familiar)).sort((a, b) => valueRider(b, modifierValueFunction, ignoreLimitedDrops) - valueRider(a, modifierValueFunction, ignoreLimitedDrops)));
  }

  var list = riderLists.get(mode);

  if (list) {
    var riderToReturn = list.find(rider => (!rider.dropPredicate || rider.dropPredicate()) && (!excludeCurrentFamiliar || (0,external_kolmafia_namespaceObject.myFamiliar)() !== rider.familiar));
    return riderToReturn !== null && riderToReturn !== void 0 ? riderToReturn : null;
  }

  return null;
}
;// CONCATENATED MODULE: ./src/Copier.ts
function Copier_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Copier_createClass(Constructor, protoProps, staticProps) { if (protoProps) Copier_defineProperties(Constructor.prototype, protoProps); if (staticProps) Copier_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Copier_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Copier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Copier = /*#__PURE__*/Copier_createClass(function Copier(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  Copier_classCallCheck(this, Copier);

  Copier_defineProperty(this, "couldCopy", void 0);

  Copier_defineProperty(this, "prepare", void 0);

  Copier_defineProperty(this, "canCopy", void 0);

  Copier_defineProperty(this, "copiedMonster", void 0);

  Copier_defineProperty(this, "fightCopy", null);

  this.couldCopy = couldCopy;
  this.prepare = prepare;
  this.canCopy = canCopy;
  this.copiedMonster = copiedMonster;
  if (fightCopy) this.fightCopy = fightCopy;
} // static PrintScreenButton = new Copier(
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
;// CONCATENATED MODULE: ./src/resources/2011/ObtuseAngel.ts
var ObtuseAngel_templateObject;

function ObtuseAngel_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var ObtuseAngel_familiar = $familiar(ObtuseAngel_templateObject || (ObtuseAngel_templateObject = ObtuseAngel_taggedTemplateLiteral(["Obtuse Angel"])));
/**
 * Returns true if the player has an Obtuse Angel
 */

function ObtuseAngel_have() {
  return have(ObtuseAngel_familiar);
}
/**
 * Returns number of badly romantic arrows used
 */

function getBadlyRomanticArrowUses() {
  return Math.max(0, get("_badlyRomanticArrows"));
}
/**
 * Returns true if badly romantic arrow can still be used
 */

function haveBadlyRomanticArrowUsesRemaining() {
  return getBadlyRomanticArrowUses() === 0;
}
/**
 * Returns true if the player could use badly romantic arrow in theory
 */

function couldUseBadlyRomanticArrow() {
  return ObtuseAngel_have() && haveBadlyRomanticArrowUsesRemaining();
}
/**
 * Prepares badly romantic arrow for use
 */

function prepareBadlyRomanticArrow() {
  return (0,external_kolmafia_namespaceObject.useFamiliar)(ObtuseAngel_familiar);
}
/**
 * Returns true if the player can use badly romantic arrow right now
 */

function canUseBadlyRomanticArrow() {
  return isCurrentFamiliar(ObtuseAngel_familiar) && haveBadlyRomanticArrowUsesRemaining();
}
/**
 * Returns the current badly romantic arrow monster target
 */

function getBadlyRomanticArrowMonster() {
  return get("romanticTarget");
}
var BadlyRomanticArrow = new Copier(() => couldUseBadlyRomanticArrow(), () => prepareBadlyRomanticArrow(), () => canUseBadlyRomanticArrow(), () => getBadlyRomanticArrowMonster());
;// CONCATENATED MODULE: ./src/resources/2012/RainDoh.ts
var RainDoh_templateObject;

function RainDoh_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var box = $item(RainDoh_templateObject || (RainDoh_templateObject = RainDoh_taggedTemplateLiteral(["Rain-Doh black box"])));
function RainDoh_have() {
  return getFoldGroup(box).some(item => have(item));
}
function getRainDohBlackBoxCopiesMade() {
  return Math.max(0, get("_raindohCopiesMade"));
}
function getRainDohBlackBoxMonster() {
  return get("rainDohMonster");
}
function useRainDohBlackBox() {
  return (0,external_kolmafia_namespaceObject.use)(box);
}
;// CONCATENATED MODULE: ./src/resources/2012/ReagnimatedGnome.ts
var ReagnimatedGnome_templateObject, ReagnimatedGnome_templateObject2, ReagnimatedGnome_templateObject3, ReagnimatedGnome_templateObject4, ReagnimatedGnome_templateObject5, ReagnimatedGnome_templateObject6;

function ReagnimatedGnome_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




function ReagnimatedGnome_have() {
  return have($familiar(ReagnimatedGnome_templateObject || (ReagnimatedGnome_templateObject = ReagnimatedGnome_taggedTemplateLiteral(["Reagnimated Gnome"]))));
}
var bodyParts = {
  ears: $item(ReagnimatedGnome_templateObject2 || (ReagnimatedGnome_templateObject2 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish swimmer's ears"]))),
  lung: $item(ReagnimatedGnome_templateObject3 || (ReagnimatedGnome_templateObject3 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish coal miner's lung"]))),
  elbow: $item(ReagnimatedGnome_templateObject4 || (ReagnimatedGnome_templateObject4 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish tennis elbow"]))),
  kgnee: $item(ReagnimatedGnome_templateObject5 || (ReagnimatedGnome_templateObject5 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))),
  foot: $item(ReagnimatedGnome_templateObject6 || (ReagnimatedGnome_templateObject6 = ReagnimatedGnome_taggedTemplateLiteral(["gnomish athlete's foot"])))
};
function chosenParts() {
  return Object.values(bodyParts).filter(part => have(part));
}
function choosePart(part) {
  if (!ReagnimatedGnome_have()) return false;
  if (have(bodyParts[part])) return true;
  (0,external_kolmafia_namespaceObject.visitUrl)("arena.php");
  (0,external_kolmafia_namespaceObject.runChoice)(4);
  return chosenParts().includes(bodyParts[part]);
}
function expectedAdvsPerCombat(weight) {
  return Math.min(0.01 + weight / 1000 * 0.99, 1);
}
;// CONCATENATED MODULE: ./src/resources/2013/Florist.ts
function Florist_toConsumableArray(arr) { return Florist_arrayWithoutHoles(arr) || Florist_iterableToArray(arr) || Florist_unsupportedIterableToArray(arr) || Florist_nonIterableSpread(); }

function Florist_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Florist_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Florist_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Florist_arrayLikeToArray(o, minLen); }

function Florist_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Florist_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Florist_arrayLikeToArray(arr); }

function Florist_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Florist_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Florist_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Florist_createClass(Constructor, protoProps, staticProps) { if (protoProps) Florist_defineProperties(Constructor.prototype, protoProps); if (staticProps) Florist_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Florist_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Flower = /*#__PURE__*/function () {
  function Flower(name, id, environment, modifier) {
    var territorial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    Florist_classCallCheck(this, Flower);

    Florist_defineProperty(this, "name", void 0);

    Florist_defineProperty(this, "id", void 0);

    Florist_defineProperty(this, "environment", void 0);

    Florist_defineProperty(this, "modifier", void 0);

    Florist_defineProperty(this, "territorial", void 0);

    this.name = name;
    this.id = id;
    this.environment = environment;
    this.modifier = modifier;
    this.territorial = territorial;
  }

  Florist_createClass(Flower, [{
    key: "isPlantedHere",
    value: function isPlantedHere() {
      var _Flower$plantNamesInZ;

      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      var plantedHere = (_Flower$plantNamesInZ = Flower.plantNamesInZone(location)) === null || _Flower$plantNamesInZ === void 0 ? void 0 : _Flower$plantNamesInZ.includes(this.name);
      return plantedHere !== undefined && plantedHere;
    }
  }, {
    key: "available",
    value: function available() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return this.environment === location.environment && !get("_floristPlantsUsed").includes(this.name) && !this.isPlantedHere(location);
    }
  }, {
    key: "dig",
    value: function dig() {
      if (!this.isPlantedHere()) return false;
      var flowers = Flower.plantNamesInZone();
      if (!flowers[2]) return false;
      var plantNumber = flowers.indexOf(this.name);
      Flower.visit();
      (0,external_kolmafia_namespaceObject.runChoice)(2, "plnti=".concat(plantNumber));
      return !this.isPlantedHere();
    }
  }, {
    key: "plant",
    value: function plant() {
      if (this.isPlantedHere()) return true;
      if (isFull()) return false;
      Flower.visit();
      (0,external_kolmafia_namespaceObject.runChoice)(1, "plant=".concat(this.id));
      return this.isPlantedHere();
    }
  }], [{
    key: "visit",
    value: function visit() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_friar");
    }
  }, {
    key: "plantNamesInZone",
    value: function plantNamesInZone() {
      var _getFloristPlants$loc;

      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return (_getFloristPlants$loc = (0,external_kolmafia_namespaceObject.getFloristPlants)()[location.toString()]) !== null && _getFloristPlants$loc !== void 0 ? _getFloristPlants$loc : [];
    }
  }, {
    key: "plantsInZone",
    value: function plantsInZone() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      return this.plantNamesInZone(location).map(flowerName => toFlower(flowerName)).filter(flower => flower !== undefined);
    }
  }, {
    key: "modifiersInZone",
    value: function modifiersInZone() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
      var plants = this.plantsInZone(location);
      if (!plants) return {};
      var modifiers = plants.map(plant => plant.modifier).map(modifier => typeof modifier === "string" ? {} : modifier);
      return mergeModifiers.apply(void 0, Florist_toConsumableArray(modifiers));
    }
  }]);

  return Flower;
}();

function Florist_have() {
  return (0,external_kolmafia_namespaceObject.floristAvailable)();
}

function toFlower(name) {
  return Florist_all.find(flower => name === flower.name);
}

function flowersIn(location) {
  var returnValue = [];
  Flower.plantNamesInZone(location).map(toFlower).forEach(flower => {
    if (flower) returnValue.push(flower);
  });
  return returnValue;
}
function flowersAvailableFor() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
  return Florist_all.filter(flower => flower.available(location));
}
function isFull() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myLocation)();
  return flowersIn(location).length === 3;
}
var RabidDogwood = new Flower("Rabid Dogwood", 1, "outdoor", {
  "Monster Level": 30
}, true);
var Rutabeggar = new Flower("Rutabeggar", 2, "outdoor", {
  "Item Drop": 25
}, true);
var RadishRadish = new Flower("Rad-ish Radish", 3, "outdoor", {
  "Moxie Experience": 5
}, true);
var Artichoker = new Flower("Artichoker", 4, "outdoor", "Delevels Enemy");
var SmokeRa = new Flower("Smoke-ra", 5, "outdoor", "Blocks Attacks");
var SkunkCabbage = new Flower("Skunk Cabbage", 6, "outdoor", {
  "Stench Damage": 12.5
});
var DeadlyCinnamon = new Flower("Deadly Cinnamon", 7, "outdoor", {
  "Hot Damage": 12.5
});
var CeleryStalker = new Flower("Celery Stalker", 8, "outdoor", {
  "Spooky Damage": 12.5
});
var LettuceSpray = new Flower("Lettus Spray", 9, "outdoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 29
});
var SeltzerWatercress = new Flower("Seltzer Watercress", 10, "outdoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var WarLily = new Flower("War Lily", 11, "indoor", {
  "Monster Level": 30
}, true);
var StealingMagnolia = new Flower("Stealing Magnolia", 12, "indoor", {
  "Item Drop": 25
}, true);
var CannedSpinach = new Flower("Canned Spinach", 13, "indoor", {
  "Muscle Experience": 5
}, true);
var Impatiens = new Flower("Impatiens", 14, "indoor", {
  Initiative: 25
});
var SpiderPlant = new Flower("Spider Plant", 15, "indoor", "Poison");
var RedFern = new Flower("Red Fern", 16, "indoor", "Delevels Enemy");
var BamBoo = new Flower("BamBOO!", 17, "indoor", {
  "Spooky Damage": 12.5
});
var ArcticMoss = new Flower("Arctic Moss", 18, "indoor", {
  "Cold Damage": 12.5
});
var AloeGuvnor = new Flower("Aloe Guv'nor", 19, "indoor", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
});
var PitcherPlant = new Flower("Pitcher Plant", 20, "indoor", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var BlusteryPuffball = new Flower("Blustery Puffball", 21, "underground", {
  "Monster Level": 30
}, true);
var HornOfPlenty = new Flower("Horn of Plenty", 22, "underground", {
  "Item Drop": 25
}, true);
var WizardsWig = new Flower("Wizard's Wig", 23, "underground", {
  "Mysticality Experience": 5
}, true);
var ShuffleTruffle = new Flower("Shuffle Truffle", 24, "underground", {
  Initiative: 25
});
var DisLichen = new Flower("Dis Lichen", 25, "underground", "Delevels Enemy");
var LooseMorels = new Flower("Loose Morels", 26, "underground", {
  "Sleaze Damage": 12.5
});
var FoulToadstool = new Flower("Foul Toadstool", 27, "underground", {
  "Stench Damage": 12.5
});
var Chillterelle = new Flower("Chillterelle", 28, "underground", {
  "Cold Damage": 12.5
});
var Portlybella = new Flower("Portlybella", 29, "underground", {
  "HP Regen Min": 10,
  "HP Regen Max": 30
});
var MaxHeadshroom = new Flower("Max Headshroom", 30, "underground", {
  "MP Regen Min": 5,
  "MP Regen Max": 15
});
var Spankton = new Flower("Spankton", 31, "underwater", "Delevels Enemy", true);
var Kelptomaniac = new Flower("Kelptomaniac", 32, "underwater", {
  "Item Drop": 40
}, true);
var Crookweed = new Flower("Crookweed", 33, "underwater", {
  "Meat Drop": 60
}, true);
var ElectricEelgrass = new Flower("Electric Eelgrass", 34, "underwater", "Blocks Attacks");
var Duckweed = new Flower("Duckweed", 35, "underwater", "Blocks Attacks");
var OrcaOrchid = new Flower("Orca Orchid", 36, "underwater", {
  "Weapon Damage": 12.5
});
var Sargassum = new Flower("Sargassum", 37, "underwater", {
  "Stench Damage": 12.5
});
var SubSeaRose = new Flower("Sub-Sea Rose", 38, "underwater", {
  "Cold Damage": 12.5
});
var Snori = new Flower("Snori", 39, "underwater", {
  "HP Regen Min": 20,
  "HP Regen Max": 30,
  "MP Regen Min": 10,
  "MP Regen Max": 20
});
var UpSeaDaisy = new Flower("Up Sea Daisy", 40, "underwater", {
  Experience: 30
});
var Florist_all = Object.freeze([RabidDogwood, Rutabeggar, RadishRadish, Artichoker, SmokeRa, SkunkCabbage, DeadlyCinnamon, CeleryStalker, LettuceSpray, SeltzerWatercress, WarLily, StealingMagnolia, CannedSpinach, Impatiens, SpiderPlant, RedFern, BamBoo, ArcticMoss, AloeGuvnor, PitcherPlant, BlusteryPuffball, HornOfPlenty, WizardsWig, ShuffleTruffle, DisLichen, LooseMorels, FoulToadstool, Chillterelle, Portlybella, MaxHeadshroom, Spankton, Kelptomaniac, Crookweed, ElectricEelgrass, Duckweed, OrcaOrchid, Sargassum, SubSeaRose, Snori, UpSeaDaisy]);
;// CONCATENATED MODULE: ./src/resources/2014/CrimboShrub.ts
var CrimboShrub_templateObject, CrimboShrub_templateObject2, CrimboShrub_templateObject3, CrimboShrub_templateObject4;

function CrimboShrub_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function CrimboShrub_have() {
  return have($familiar(CrimboShrub_templateObject || (CrimboShrub_templateObject = CrimboShrub_taggedTemplateLiteral(["Crimbo Shrub"]))));
}
var Toppers = {
  Muscle: 1,
  Mysticality: 2,
  Moxie: 3
};
var Lights = {
  "Prismatic Damage": 1,
  "Hot Damage": 2,
  "Cold Damage": 3,
  "Stench Damage": 4,
  "Spooky Damage": 5,
  "Sleaze Damage": 6
};
var Garland = {
  "HP Regen": 1,
  "PvP Fights": 2,
  Blocking: 3
};
var Gifts = {
  "Yellow Ray": 1,
  "Red Ray": 2,
  Gifts: 3
};
var Prefs = {
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
  var decorations = [get("shrubTopper"), get("shrubLights"), get("shrubGarland"), get("shrubGifts")].map(x => Prefs[x]);
  return [topper, lights, garland, gifts].every((x, i) => x === decorations[i]);
}

function decorate(topper, lights, garland, gifts) {
  if (!CrimboShrub_have()) return false;
  if (get("_shrubDecorated")) return isDecoratedWith(topper, lights, garland, gifts);

  if (!have($item(CrimboShrub_templateObject2 || (CrimboShrub_templateObject2 = CrimboShrub_taggedTemplateLiteral(["box of old Crimbo decorations"]))))) {
    (0,external_kolmafia_namespaceObject.useFamiliar)($familiar(CrimboShrub_templateObject3 || (CrimboShrub_templateObject3 = CrimboShrub_taggedTemplateLiteral(["Crimbo Shrub"]))));
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd=&which=99&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)($item(CrimboShrub_templateObject4 || (CrimboShrub_templateObject4 = CrimboShrub_taggedTemplateLiteral(["box of old Crimbo decorations"]))))));
  (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=999&pwd=&option=1&topper=".concat(Toppers[topper], "&lights=").concat(Lights[lights], "&garland=").concat(Garland[garland], "&gift=").concat(Gifts[gifts]));
  return true;
}
;// CONCATENATED MODULE: ./src/resources/2014/DNALab.ts
var DNALab_templateObject, DNALab_templateObject2, DNALab_templateObject3, DNALab_templateObject4, DNALab_templateObject5, DNALab_templateObject6, DNALab_templateObject7, DNALab_templateObject8, DNALab_templateObject9, DNALab_templateObject10, DNALab_templateObject11, DNALab_templateObject12, DNALab_templateObject13, DNALab_templateObject14, DNALab_templateObject15, DNALab_templateObject16, DNALab_templateObject17, DNALab_templateObject18, DNALab_templateObject19, DNALab_templateObject20, DNALab_templateObject21, DNALab_templateObject22, DNALab_templateObject23, DNALab_templateObject24, DNALab_templateObject25, DNALab_templateObject26, DNALab_templateObject27, DNALab_templateObject28, DNALab_templateObject29, DNALab_templateObject30, DNALab_templateObject31, DNALab_templateObject32, DNALab_templateObject33, DNALab_templateObject34, DNALab_templateObject35, DNALab_templateObject36, DNALab_templateObject37, DNALab_templateObject38, DNALab_templateObject39, DNALab_templateObject40, DNALab_templateObject41, DNALab_templateObject42, DNALab_templateObject43, DNALab_templateObject44, DNALab_templateObject45, DNALab_templateObject46, DNALab_templateObject47, DNALab_templateObject48, DNALab_templateObject49, DNALab_templateObject50, DNALab_templateObject51, DNALab_templateObject52, DNALab_templateObject53, DNALab_templateObject54, DNALab_templateObject55, DNALab_templateObject56, DNALab_templateObject57, DNALab_templateObject58, DNALab_templateObject59, DNALab_templateObject60, DNALab_templateObject61, DNALab_templateObject62, DNALab_templateObject63, DNALab_templateObject64, DNALab_templateObject65, DNALab_templateObject66, DNALab_templateObject67, DNALab_templateObject68, DNALab_templateObject69, DNALab_templateObject70, DNALab_templateObject71, DNALab_templateObject72, DNALab_templateObject73, DNALab_templateObject74, DNALab_templateObject75, DNALab_templateObject76, DNALab_templateObject77, DNALab_templateObject78, DNALab_templateObject79, DNALab_templateObject80, DNALab_templateObject81, DNALab_templateObject82, DNALab_templateObject83, DNALab_templateObject84, DNALab_templateObject85;

function DNALab_slicedToArray(arr, i) { return DNALab_arrayWithHoles(arr) || DNALab_iterableToArrayLimit(arr, i) || DNALab_unsupportedIterableToArray(arr, i) || DNALab_nonIterableRest(); }

function DNALab_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function DNALab_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return DNALab_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DNALab_arrayLikeToArray(o, minLen); }

function DNALab_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function DNALab_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function DNALab_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DNALab_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var lab = $item(DNALab_templateObject || (DNALab_templateObject = DNALab_taggedTemplateLiteral(["Little Geneticist DNA-Splicing Lab"])));
/**
 * Checks if you have DNA lab in inventory or installed
 */

function DNALab_have() {
  return have(lab) || (0,external_kolmafia_namespaceObject.getWorkshed)() === lab;
}
/**
 * Checks if you have DNA lab installed
 */

function DNALab_installed() {
  return (0,external_kolmafia_namespaceObject.getWorkshed)() === lab;
}
var phylaEffects = new Map([[$phylum(DNALab_templateObject2 || (DNALab_templateObject2 = DNALab_taggedTemplateLiteral(["beast"]))), $effect(DNALab_templateObject3 || (DNALab_templateObject3 = DNALab_taggedTemplateLiteral(["Human-Beast Hybrid"])))], [$phylum(DNALab_templateObject4 || (DNALab_templateObject4 = DNALab_taggedTemplateLiteral(["bug"]))), $effect(DNALab_templateObject5 || (DNALab_templateObject5 = DNALab_taggedTemplateLiteral(["Human-Insect Hybrid"])))], [$phylum(DNALab_templateObject6 || (DNALab_templateObject6 = DNALab_taggedTemplateLiteral(["constellation"]))), $effect(DNALab_templateObject7 || (DNALab_templateObject7 = DNALab_taggedTemplateLiteral(["Human-Constellation Hybrid"])))], [$phylum(DNALab_templateObject8 || (DNALab_templateObject8 = DNALab_taggedTemplateLiteral(["construct"]))), $effect(DNALab_templateObject9 || (DNALab_templateObject9 = DNALab_taggedTemplateLiteral(["Human-Machine Hybrid"])))], [$phylum(DNALab_templateObject10 || (DNALab_templateObject10 = DNALab_taggedTemplateLiteral(["demon"]))), $effect(DNALab_templateObject11 || (DNALab_templateObject11 = DNALab_taggedTemplateLiteral(["Human-Demon Hybrid"])))], [$phylum(DNALab_templateObject12 || (DNALab_templateObject12 = DNALab_taggedTemplateLiteral(["dude"]))), $effect(DNALab_templateObject13 || (DNALab_templateObject13 = DNALab_taggedTemplateLiteral(["Human-Human Hybrid"])))], [$phylum(DNALab_templateObject14 || (DNALab_templateObject14 = DNALab_taggedTemplateLiteral(["elemental"]))), $effect(DNALab_templateObject15 || (DNALab_templateObject15 = DNALab_taggedTemplateLiteral(["Human-Elemental Hybrid"])))], [$phylum(DNALab_templateObject16 || (DNALab_templateObject16 = DNALab_taggedTemplateLiteral(["elf"]))), $effect(DNALab_templateObject17 || (DNALab_templateObject17 = DNALab_taggedTemplateLiteral(["Human-Elf Hybrid"])))], [$phylum(DNALab_templateObject18 || (DNALab_templateObject18 = DNALab_taggedTemplateLiteral(["fish"]))), $effect(DNALab_templateObject19 || (DNALab_templateObject19 = DNALab_taggedTemplateLiteral(["Human-Fish Hybrid"])))], [$phylum(DNALab_templateObject20 || (DNALab_templateObject20 = DNALab_taggedTemplateLiteral(["goblin"]))), $effect(DNALab_templateObject21 || (DNALab_templateObject21 = DNALab_taggedTemplateLiteral(["Human-Goblin Hybrid"])))], [$phylum(DNALab_templateObject22 || (DNALab_templateObject22 = DNALab_taggedTemplateLiteral(["hippy"]))), $effect(DNALab_templateObject23 || (DNALab_templateObject23 = DNALab_taggedTemplateLiteral(["Human-Hobo Hybrid"])))], [$phylum(DNALab_templateObject24 || (DNALab_templateObject24 = DNALab_taggedTemplateLiteral(["horror"]))), $effect(DNALab_templateObject25 || (DNALab_templateObject25 = DNALab_taggedTemplateLiteral(["Human-Horror Hybrid"])))], [$phylum(DNALab_templateObject26 || (DNALab_templateObject26 = DNALab_taggedTemplateLiteral(["humanoid"]))), $effect(DNALab_templateObject27 || (DNALab_templateObject27 = DNALab_taggedTemplateLiteral(["Human-Humanoid Hybrid"])))], [$phylum(DNALab_templateObject28 || (DNALab_templateObject28 = DNALab_taggedTemplateLiteral(["mer-kin"]))), $effect(DNALab_templateObject29 || (DNALab_templateObject29 = DNALab_taggedTemplateLiteral(["Human-Mer-kin Hybrid"])))], [$phylum(DNALab_templateObject30 || (DNALab_templateObject30 = DNALab_taggedTemplateLiteral(["orc"]))), $effect(DNALab_templateObject31 || (DNALab_templateObject31 = DNALab_taggedTemplateLiteral(["Human-Orc Hybrid"])))], [$phylum(DNALab_templateObject32 || (DNALab_templateObject32 = DNALab_taggedTemplateLiteral(["penguin"]))), $effect(DNALab_templateObject33 || (DNALab_templateObject33 = DNALab_taggedTemplateLiteral(["Human-Penguin Hybrid"])))], [$phylum(DNALab_templateObject34 || (DNALab_templateObject34 = DNALab_taggedTemplateLiteral(["pirate"]))), $effect(DNALab_templateObject35 || (DNALab_templateObject35 = DNALab_taggedTemplateLiteral(["Human-Pirate Hybrid"])))], [$phylum(DNALab_templateObject36 || (DNALab_templateObject36 = DNALab_taggedTemplateLiteral(["plant"]))), $effect(DNALab_templateObject37 || (DNALab_templateObject37 = DNALab_taggedTemplateLiteral(["Human-Plant Hybrid"])))], [$phylum(DNALab_templateObject38 || (DNALab_templateObject38 = DNALab_taggedTemplateLiteral(["slime"]))), $effect(DNALab_templateObject39 || (DNALab_templateObject39 = DNALab_taggedTemplateLiteral(["Human-Slime Hybrid"])))], [$phylum(DNALab_templateObject40 || (DNALab_templateObject40 = DNALab_taggedTemplateLiteral(["undead"]))), $effect(DNALab_templateObject41 || (DNALab_templateObject41 = DNALab_taggedTemplateLiteral(["Human-Undead Hybrid"])))], [$phylum(DNALab_templateObject42 || (DNALab_templateObject42 = DNALab_taggedTemplateLiteral(["weird"]))), $effect(DNALab_templateObject43 || (DNALab_templateObject43 = DNALab_taggedTemplateLiteral(["Human-Weird Thing Hybrid"])))]]);
var phylaTonics = new Map([[$phylum(DNALab_templateObject44 || (DNALab_templateObject44 = DNALab_taggedTemplateLiteral(["beast"]))), $item(DNALab_templateObject45 || (DNALab_templateObject45 = DNALab_taggedTemplateLiteral(["Gene Tonic: Beast"])))], [$phylum(DNALab_templateObject46 || (DNALab_templateObject46 = DNALab_taggedTemplateLiteral(["bug"]))), $item(DNALab_templateObject47 || (DNALab_templateObject47 = DNALab_taggedTemplateLiteral(["Gene Tonic: Insect"])))], [$phylum(DNALab_templateObject48 || (DNALab_templateObject48 = DNALab_taggedTemplateLiteral(["constellation"]))), $item(DNALab_templateObject49 || (DNALab_templateObject49 = DNALab_taggedTemplateLiteral(["Gene Tonic: Constellation"])))], [$phylum(DNALab_templateObject50 || (DNALab_templateObject50 = DNALab_taggedTemplateLiteral(["construct"]))), $item(DNALab_templateObject51 || (DNALab_templateObject51 = DNALab_taggedTemplateLiteral(["Gene Tonic: Construct"])))], [$phylum(DNALab_templateObject52 || (DNALab_templateObject52 = DNALab_taggedTemplateLiteral(["demon"]))), $item(DNALab_templateObject53 || (DNALab_templateObject53 = DNALab_taggedTemplateLiteral(["Gene Tonic: Demon"])))], [$phylum(DNALab_templateObject54 || (DNALab_templateObject54 = DNALab_taggedTemplateLiteral(["dude"]))), $item(DNALab_templateObject55 || (DNALab_templateObject55 = DNALab_taggedTemplateLiteral(["Gene Tonic: Humanoid"])))], [$phylum(DNALab_templateObject56 || (DNALab_templateObject56 = DNALab_taggedTemplateLiteral(["elemental"]))), $item(DNALab_templateObject57 || (DNALab_templateObject57 = DNALab_taggedTemplateLiteral(["Gene Tonic: Elemental"])))], [$phylum(DNALab_templateObject58 || (DNALab_templateObject58 = DNALab_taggedTemplateLiteral(["elf"]))), $item(DNALab_templateObject59 || (DNALab_templateObject59 = DNALab_taggedTemplateLiteral(["Gene Tonic: Elf"])))], [$phylum(DNALab_templateObject60 || (DNALab_templateObject60 = DNALab_taggedTemplateLiteral(["fish"]))), $item(DNALab_templateObject61 || (DNALab_templateObject61 = DNALab_taggedTemplateLiteral(["Gene Tonic: Fish"])))], [$phylum(DNALab_templateObject62 || (DNALab_templateObject62 = DNALab_taggedTemplateLiteral(["goblin"]))), $item(DNALab_templateObject63 || (DNALab_templateObject63 = DNALab_taggedTemplateLiteral(["Gene Tonic: Goblin"])))], [$phylum(DNALab_templateObject64 || (DNALab_templateObject64 = DNALab_taggedTemplateLiteral(["hippy"]))), $item(DNALab_templateObject65 || (DNALab_templateObject65 = DNALab_taggedTemplateLiteral(["Gene Tonic: Hobo"])))], [$phylum(DNALab_templateObject66 || (DNALab_templateObject66 = DNALab_taggedTemplateLiteral(["horror"]))), $item(DNALab_templateObject67 || (DNALab_templateObject67 = DNALab_taggedTemplateLiteral(["Gene Tonic: Horror"])))], [$phylum(DNALab_templateObject68 || (DNALab_templateObject68 = DNALab_taggedTemplateLiteral(["humanoid"]))), $item(DNALab_templateObject69 || (DNALab_templateObject69 = DNALab_taggedTemplateLiteral(["Gene Tonic: Humanoid"])))], [$phylum(DNALab_templateObject70 || (DNALab_templateObject70 = DNALab_taggedTemplateLiteral(["mer-kin"]))), $item(DNALab_templateObject71 || (DNALab_templateObject71 = DNALab_taggedTemplateLiteral(["Gene Tonic: Mer-kin"])))], [$phylum(DNALab_templateObject72 || (DNALab_templateObject72 = DNALab_taggedTemplateLiteral(["orc"]))), $item(DNALab_templateObject73 || (DNALab_templateObject73 = DNALab_taggedTemplateLiteral(["Gene Tonic: Orc"])))], [$phylum(DNALab_templateObject74 || (DNALab_templateObject74 = DNALab_taggedTemplateLiteral(["penguin"]))), $item(DNALab_templateObject75 || (DNALab_templateObject75 = DNALab_taggedTemplateLiteral(["Gene Tonic: Penguin"])))], [$phylum(DNALab_templateObject76 || (DNALab_templateObject76 = DNALab_taggedTemplateLiteral(["pirate"]))), $item(DNALab_templateObject77 || (DNALab_templateObject77 = DNALab_taggedTemplateLiteral(["Gene Tonic: Pirate"])))], [$phylum(DNALab_templateObject78 || (DNALab_templateObject78 = DNALab_taggedTemplateLiteral(["plant"]))), $item(DNALab_templateObject79 || (DNALab_templateObject79 = DNALab_taggedTemplateLiteral(["Gene Tonic: Plant"])))], [$phylum(DNALab_templateObject80 || (DNALab_templateObject80 = DNALab_taggedTemplateLiteral(["slime"]))), $item(DNALab_templateObject81 || (DNALab_templateObject81 = DNALab_taggedTemplateLiteral(["Gene Tonic: Slime"])))], [$phylum(DNALab_templateObject82 || (DNALab_templateObject82 = DNALab_taggedTemplateLiteral(["undead"]))), $item(DNALab_templateObject83 || (DNALab_templateObject83 = DNALab_taggedTemplateLiteral(["Gene Tonic: Undead"])))], [$phylum(DNALab_templateObject84 || (DNALab_templateObject84 = DNALab_taggedTemplateLiteral(["weird"]))), $item(DNALab_templateObject85 || (DNALab_templateObject85 = DNALab_taggedTemplateLiteral(["Gene Tonic: Weird"])))]]);
var tonicEffects = Array.from(phylaEffects.values());
/**
 * Tells you whether you are currently hybridized. When passed with an input of any sort, tells you whether you are currently hybridized with that effect.
 * @param tonic Optional input. When passed, the function returns whether that specific effect is hybridized.
 */

function isHybridized(tonic) {
  if (!tonic) return DNALab_installed() && get("_dnaHybrid");
  var tonicEffect = tonic instanceof external_kolmafia_namespaceObject.Effect ? tonic : tonic instanceof external_kolmafia_namespaceObject.Phylum ? DNALab_getEffect(tonic) : modifier_get("Effect", tonic);
  return tonicEffects.includes(tonicEffect) && (0,external_kolmafia_namespaceObject.haveEffect)(tonicEffect) === 2147483647;
}
/**
 * Returns the tonic item associated with a particular phylum.
 * @param phylum The phylum in question.
 * @returns The tonic item associated with that phylum; returns $item.none for $phylum.none.
 */

function getTonic(phylum) {
  var _phylaTonics$get;

  return (_phylaTonics$get = phylaTonics.get(phylum)) !== null && _phylaTonics$get !== void 0 ? _phylaTonics$get : $item.none; //return $item.none rather than null because it should never happen.
}
/**
 * Returns the tonic effect associated with a particular phylum.
 * @param phylum The phylum in question.
 * @returns The tonic effect associated with that phylum; returns $effect.none for $phylum.none.
 */

function DNALab_getEffect(phylum) {
  var _phylaEffects$get;

  return (_phylaEffects$get = phylaEffects.get(phylum)) !== null && _phylaEffects$get !== void 0 ? _phylaEffects$get : $effect.none; //return $effect.none rather than null because it should never happen
}
/**
 * Tells you which phylum to hunt down for a given effect or item.
 * @param dnatype The tonic effect or item in question
 * @returns The Phylum associated with that effect or item; null if an invalid choice
 */

function phylumFor(dnatype) {
  if (dnatype instanceof external_kolmafia_namespaceObject.Effect) {
    var phylumPair = Array.from(phylaEffects.entries()).find(_ref => {
      var _ref2 = DNALab_slicedToArray(_ref, 2),
          effect = _ref2[1];

      return effect === dnatype;
    });
    return phylumPair ? phylumPair[0] : null;
  } else {
    var _phylumPair = Array.from(phylaTonics.entries()).find(_ref3 => {
      var _ref4 = DNALab_slicedToArray(_ref3, 2),
          tonic = _ref4[1];

      return tonic === dnatype;
    });

    return _phylumPair ? _phylumPair[0] : null;
  }
}
/**
 * Hybridize yourself with the current contents of your syringe, if possible.
 * @returns Whether or not we succeeded
 */

function hybridize() {
  if (get("_dnaHybrid")) return false;
  if (!DNALab_installed()) return false;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  var tonicPotion = getTonic(currentSyringe);
  var expectedEffect = modifier_get("Effect", tonicPotion);
  (0,external_kolmafia_namespaceObject.cliExecute)("camp dnainject");
  return isHybridized(expectedEffect);
}
/**
 * Makes tonics with whatever phylum is currently in your syringe
 * @param {number} [amount=1] the number of tonics to make
 * @returns Whether we successfully made tonics; returns true if we made as many as we could, regardless of whether that was the number requested
 */

function makeTonic() {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (!DNALab_installed()) return false;
  var currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  var tonicPotion = getTonic(currentSyringe);
  var amountToMake = clamp(amount, 0, tonicsLeft());
  var startingAmount = (0,external_kolmafia_namespaceObject.itemAmount)(tonicPotion);
  (0,external_kolmafia_namespaceObject.cliExecute)("camp dnapotion ".concat(amountToMake));
  return (0,external_kolmafia_namespaceObject.itemAmount)(tonicPotion) - startingAmount === amountToMake;
}
/**
 * Tells you how many tonics you can make the rest of the day.
 * @returns The remaining tonics you can make
 */

function tonicsLeft() {
  return clamp(3 - get("_dnaPotionsMade"), 0, 3);
}
;// CONCATENATED MODULE: ./src/resources/2014/WinterGarden.ts
var WinterGarden_templateObject, WinterGarden_templateObject2, WinterGarden_templateObject3, WinterGarden_templateObject4;

function WinterGarden_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function WinterGarden_have() {
  return haveInCampground($item(WinterGarden_templateObject || (WinterGarden_templateObject = WinterGarden_taggedTemplateLiteral(["packet of winter seeds"]))));
}
function haveUnfinishedIceSculpture() {
  return have($item(WinterGarden_templateObject2 || (WinterGarden_templateObject2 = WinterGarden_taggedTemplateLiteral(["unfinished ice sculpture"]))));
}
function isUnfinishedIceSculptureUsed() {
  return get("_iceSculptureUsed");
}
function couldUseUnfinishedIceSculpture() {
  return have($item(WinterGarden_templateObject3 || (WinterGarden_templateObject3 = WinterGarden_taggedTemplateLiteral(["unfinished ice sculpture"])))) && !have($item(WinterGarden_templateObject4 || (WinterGarden_templateObject4 = WinterGarden_taggedTemplateLiteral(["ice sculpture"]))));
}
function getUnfinishedIceSculptureMonster() {
  return get("iceSculptureMonster");
}
var UnfinishedIceSculpture = new Copier(() => couldUseUnfinishedIceSculpture(), null, () => couldUseUnfinishedIceSculpture(), () => getUnfinishedIceSculptureMonster());
;// CONCATENATED MODULE: ./src/resources/2015/BarrelShrine.ts
var BarrelShrine_templateObject;

function BarrelShrine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var BARRELS = $items(BarrelShrine_templateObject || (BarrelShrine_templateObject = BarrelShrine_taggedTemplateLiteral(["little firkin, normal barrel, big tun, weathered barrel, dusty barrel, disintegrating barrel, moist barrel, rotting barrel, mouldering barrel, barnacled barrel"])));
function BarrelShrine_have() {
  return get("barrelShrineUnlocked");
}
function smashParty() {
  if (!BarrelShrine_have()) return;
  var total = BARRELS.map(i => (0,external_kolmafia_namespaceObject.availableAmount)(i)).reduce((sum, q) => sum + q, 0);
  if (total <= 0) return;
  (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&whichitem=8568&choice=1");

  for (var i = 0; i < total / 100; i++) {
    (0,external_kolmafia_namespaceObject.runChoice)(2);
  }
}
;// CONCATENATED MODULE: ./src/resources/2015/Dinseylandfill.ts
var Dinseylandfill_templateObject, Dinseylandfill_templateObject2, Dinseylandfill_templateObject3, Dinseylandfill_templateObject4, Dinseylandfill_templateObject5, Dinseylandfill_templateObject6, Dinseylandfill_templateObject7, Dinseylandfill_templateObject8, Dinseylandfill_templateObject9, Dinseylandfill_templateObject10, Dinseylandfill_templateObject11, Dinseylandfill_templateObject12, Dinseylandfill_templateObject13, Dinseylandfill_templateObject14, Dinseylandfill_templateObject15, Dinseylandfill_templateObject16, Dinseylandfill_templateObject17, Dinseylandfill_templateObject18, Dinseylandfill_templateObject19, Dinseylandfill_templateObject20, Dinseylandfill_templateObject21, Dinseylandfill_templateObject22, Dinseylandfill_templateObject23, Dinseylandfill_templateObject24, Dinseylandfill_templateObject25, Dinseylandfill_templateObject26, Dinseylandfill_templateObject27;

function Dinseylandfill_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Dinseylandfill_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Dinseylandfill_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Dinseylandfill_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Dinseylandfill_arrayLikeToArray(o, minLen); }

function Dinseylandfill_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Dinseylandfill_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Dinseylandfill_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dinseylandfill_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Dinseylandfill_createClass(Constructor, protoProps, staticProps) { if (protoProps) Dinseylandfill_defineProperties(Constructor.prototype, protoProps); if (staticProps) Dinseylandfill_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Dinseylandfill_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function Dinseylandfill_have() {
  return get("stenchAirportAlways");
}
function available() {
  return Dinseylandfill_have() || get("_stenchAirportToday");
}

var QuestData = /*#__PURE__*/function () {
  /**
   * Process for determining where to put a wanderer to extract additional value from it
   * @param name easy to refer to name of the quest
   * @param priority ranked preference of quests
   * @param questNameKiosk returns the name of the quest as found at the dinseylandfill Job Kiosk
   * @param questNameQuestLog returns the name of the quest as found in the quest log
   * @param questStateProperty name of the mafia property tracing the current state of the quest (e.g. unstarted, step[x], finished)
   * @param questProgressProperty name of the mafia property that tracks progress of the current quest state
   * @param questProgressLimit Maximum questProgressProperty can reach
   * @param canUseWanderers whether wandering monsters can be used to progress the quest
   * @param requiredItem the required item (if any) needed to be equipped to progress the quest
   * @param questLocation where to adventure to progress the quest
   */
  function QuestData(name, priority, questNameKiosk, questNameQuestLog, questStateProperty, questProgressProperty, questProgressLimit, canUseWanderers, requiredItem, questLocation) {
    Dinseylandfill_classCallCheck(this, QuestData);

    Dinseylandfill_defineProperty(this, "name", void 0);

    Dinseylandfill_defineProperty(this, "priority", void 0);

    Dinseylandfill_defineProperty(this, "questNameKiosk", void 0);

    Dinseylandfill_defineProperty(this, "questNameQuestLog", void 0);

    Dinseylandfill_defineProperty(this, "questStateProperty", void 0);

    Dinseylandfill_defineProperty(this, "questProgressProperty", void 0);

    Dinseylandfill_defineProperty(this, "questProgressLimit", void 0);

    Dinseylandfill_defineProperty(this, "canUseWanderers", void 0);

    Dinseylandfill_defineProperty(this, "requiredItem", void 0);

    Dinseylandfill_defineProperty(this, "questLocation", void 0);

    this.name = name;
    this.priority = priority;
    this.questNameKiosk = questNameKiosk;
    this.questNameQuestLog = questNameQuestLog;
    this.questStateProperty = questStateProperty;
    this.questProgressProperty = questProgressProperty;
    this.questProgressLimit = questProgressLimit;
    this.canUseWanderers = canUseWanderers;
    this.requiredItem = requiredItem;
    this.questLocation = questLocation;
  }

  Dinseylandfill_createClass(QuestData, [{
    key: "currentQuest",
    value: function currentQuest() {
      return get(this.questStateProperty) !== "unstarted";
    }
  }]);

  return QuestData;
}();

var kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk";
var maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels";
var quests = [new QuestData("lube", 1, "Track Maintenance", "Super Luber", "questEStSuperLuber", "", 0, false, $item(Dinseylandfill_templateObject || (Dinseylandfill_templateObject = Dinseylandfill_taggedTemplateLiteral(["lube-shoes"]))), $location(Dinseylandfill_templateObject2 || (Dinseylandfill_templateObject2 = Dinseylandfill_taggedTemplateLiteral(["Barf Mountain"])))), new QuestData("fuel", 0, "Electrical Maintenance", "Give Me Fuel", "questEStGiveMeFuel", "", 0, false, $item(Dinseylandfill_templateObject3 || (Dinseylandfill_templateObject3 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject4 || (Dinseylandfill_templateObject4 = Dinseylandfill_taggedTemplateLiteral(["The Toxic Teacups"])))), new QuestData("sexism", 2, "Sexism Reduction", "Social Justice Adventurer I", "questEStSocialJusticeI", "dinseySocialJusticeIProgress", 15, true, $item(Dinseylandfill_templateObject5 || (Dinseylandfill_templateObject5 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject6 || (Dinseylandfill_templateObject6 = Dinseylandfill_taggedTemplateLiteral(["Pirates of the Garbage Barges"])))), new QuestData("racism", 3, "Racism Reduction", "Social Justice Adventurer II", "questEStSocialJusticeII", "dinseySocialJusticeIIProgress", 15, true, $item(Dinseylandfill_templateObject7 || (Dinseylandfill_templateObject7 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject8 || (Dinseylandfill_templateObject8 = Dinseylandfill_taggedTemplateLiteral(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("fun", 4, "Compulsory Fun", "Whistling Zippity-Doo-Dah", "questEStZippityDooDah", "dinseyFunProgress", 15, true, $item(Dinseylandfill_templateObject9 || (Dinseylandfill_templateObject9 = Dinseylandfill_taggedTemplateLiteral(["Dinsey mascot mask"]))), $location(Dinseylandfill_templateObject10 || (Dinseylandfill_templateObject10 = Dinseylandfill_taggedTemplateLiteral(["The Toxic Teacups"])))), new QuestData("trash", 6, "Waterway Debris Removal", "Teach a Man to Fish Trash", "questEStFishTrash", "dinseyFilthLevel", 0, true, $item(Dinseylandfill_templateObject11 || (Dinseylandfill_templateObject11 = Dinseylandfill_taggedTemplateLiteral(["trash net"]))), $location(Dinseylandfill_templateObject12 || (Dinseylandfill_templateObject12 = Dinseylandfill_taggedTemplateLiteral(["Pirates of the Garbage Barges"])))), new QuestData("bear", 5, "Bear Removal", "Nasty, Nasty Bears", "questEStNastyBears", "dinseyNastyBearsDefeated", 8, false, $item(Dinseylandfill_templateObject13 || (Dinseylandfill_templateObject13 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject14 || (Dinseylandfill_templateObject14 = Dinseylandfill_taggedTemplateLiteral(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))), new QuestData("food", 7, "Guest Sustenance Assurance", "Will Work With Food", "questEStWorkWithFood", "dinseyTouristsFed", 30, false, $item(Dinseylandfill_templateObject15 || (Dinseylandfill_templateObject15 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject16 || (Dinseylandfill_templateObject16 = Dinseylandfill_taggedTemplateLiteral(["Barf Mountain"]))))];
function disposeGarbage() {
  if (!get("_dinseyGarbageDisposed") && have($item(Dinseylandfill_templateObject17 || (Dinseylandfill_templateObject17 = Dinseylandfill_taggedTemplateLiteral(["bag of park garbage"]))))) {
    (0,external_kolmafia_namespaceObject.visitUrl)(maintUrl);
    (0,external_kolmafia_namespaceObject.runChoice)(6);
  }
}
function hasQuest() {
  return quests.some(q => q.currentQuest());
}
var BLANK_QUEST = new QuestData("", -1, "", "", "", "", -1, false, $item(Dinseylandfill_templateObject18 || (Dinseylandfill_templateObject18 = Dinseylandfill_taggedTemplateLiteral(["none"]))), $location(Dinseylandfill_templateObject19 || (Dinseylandfill_templateObject19 = Dinseylandfill_taggedTemplateLiteral(["none"]))));
function activeQuest() {
  return quests.find(q => q.currentQuest()) || BLANK_QUEST;
}
function questComplete() {
  var quest = activeQuest();
  return quest !== BLANK_QUEST && get(quest.questStateProperty) === "finished";
}
function hasActiveQuest() {
  return hasQuest() && !questComplete();
}
function acceptQuest(priority) {
  var _quests$find$priority, _quests$find;

  var page = (0,external_kolmafia_namespaceObject.visitUrl)(kioskUrl);
  var choice = 6;
  var at = (0,external_kolmafia_namespaceObject.indexOf)(page, "Available Assignments");

  if (at == -1) {
    return;
  }

  var jobs = [];
  quests.forEach(quest => {
    jobs.push(quest.name);
  });
  var priorityNum = typeof priority === "string" ? (_quests$find$priority = (_quests$find = quests.find(q => q.name === priority)) === null || _quests$find === void 0 ? void 0 : _quests$find.priority) !== null && _quests$find$priority !== void 0 ? _quests$find$priority : 7 : priority;
  var availableJobs = [];
  var jobChoices = [["none", 999]];

  var _iterator = Dinseylandfill_createForOfIteratorHelper(quests),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var quest = _step.value;
      var job = quest.name;
      var jobAt = (0,external_kolmafia_namespaceObject.indexOf)(page, job, at);

      if (jobAt != -1) {
        availableJobs.push(quest);
        jobChoices.push([job, jobAt]);
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var bestJob = availableJobs.sort((a, b) => a.priority - b.priority)[0];
  var sortedChoices = jobChoices.sort((a, b) => a[1] - b[1]);

  if (bestJob.priority <= priorityNum) {
    for (var index in sortedChoices) {
      var jobName = sortedChoices[index][0];

      if (jobName === bestJob.name) {
        choice = parseInt(index) + 1;
        break;
      }
    }
  }

  (0,external_kolmafia_namespaceObject.runChoice)(choice);
}
function turnInQuest() {
  if (questComplete()) {
    if (activeQuest().name === "racism") _set("questEStSocialJusticeI", "unstarted");
    (0,external_kolmafia_namespaceObject.visitUrl)(kioskUrl);
    (0,external_kolmafia_namespaceObject.runChoice)(3);
  }
}
var keyCardsLocations = new Map([[$item(Dinseylandfill_templateObject20 || (Dinseylandfill_templateObject20 = Dinseylandfill_taggedTemplateLiteral(["keycard \u03B1"]))), $location(Dinseylandfill_templateObject21 || (Dinseylandfill_templateObject21 = Dinseylandfill_taggedTemplateLiteral(["Barf Mountain"])))], [$item(Dinseylandfill_templateObject22 || (Dinseylandfill_templateObject22 = Dinseylandfill_taggedTemplateLiteral(["keycard \u03B2"]))), $location(Dinseylandfill_templateObject23 || (Dinseylandfill_templateObject23 = Dinseylandfill_taggedTemplateLiteral(["Pirates of the Garbage Barges"])))], [$item(Dinseylandfill_templateObject24 || (Dinseylandfill_templateObject24 = Dinseylandfill_taggedTemplateLiteral(["keycard \u03B3"]))), $location(Dinseylandfill_templateObject25 || (Dinseylandfill_templateObject25 = Dinseylandfill_taggedTemplateLiteral(["The Toxic Teacups"])))], [$item(Dinseylandfill_templateObject26 || (Dinseylandfill_templateObject26 = Dinseylandfill_taggedTemplateLiteral(["keycard \u03B4"]))), $location(Dinseylandfill_templateObject27 || (Dinseylandfill_templateObject27 = Dinseylandfill_taggedTemplateLiteral(["Uncle Gator's Country Fun-Time Liquid Waste Sluice"])))]]);
function canFightWartDinsey() {
  return Array.from(keyCardsLocations.keys()).every(keycard => have(keycard)) && !foughtWartDinseyThisLife() && getRemainingLiver() >= 0 && (0,external_kolmafia_namespaceObject.myAdventures)() > 0;
}
function coasterNextTurn() {
  return get("dinseyRollercoasterNext");
}
function foughtWartDinseyThisLife() {
  return get("lastWartDinseyDefeated") === (0,external_kolmafia_namespaceObject.myAscensions)();
}
function hasDisposedGarbage() {
  return get("_dinseyGarbageDisposed");
}
// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(7120);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
;// CONCATENATED MODULE: ./src/resources/2016/SourceTerminal.ts
var SourceTerminal_templateObject, SourceTerminal_templateObject2, SourceTerminal_templateObject3, SourceTerminal_templateObject4, SourceTerminal_templateObject5, SourceTerminal_templateObject6, SourceTerminal_templateObject7, SourceTerminal_templateObject8, SourceTerminal_templateObject9, SourceTerminal_templateObject10, SourceTerminal_templateObject11, SourceTerminal_templateObject12, SourceTerminal_templateObject13, SourceTerminal_templateObject14, SourceTerminal_templateObject15, SourceTerminal_templateObject16, SourceTerminal_templateObject17, SourceTerminal_templateObject18, SourceTerminal_templateObject19, SourceTerminal_templateObject20, SourceTerminal_templateObject21, SourceTerminal_templateObject22, SourceTerminal_templateObject23, SourceTerminal_templateObject24, SourceTerminal_templateObject25, SourceTerminal_templateObject26, SourceTerminal_templateObject27;

function SourceTerminal_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = SourceTerminal_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function SourceTerminal_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SourceTerminal_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SourceTerminal_arrayLikeToArray(o, minLen); }

function SourceTerminal_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function SourceTerminal_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var item = $item(SourceTerminal_templateObject || (SourceTerminal_templateObject = SourceTerminal_taggedTemplateLiteral(["Source terminal"])));
function SourceTerminal_have() {
  return haveInCampground(item);
}
/**
 * Buffs that can be acquired from Enhance
 *
 * - Items: +30% Item Drop
 * - Meat: +60% Meat Drop
 * - Init: +50% Initiative
 * - Critical: +10% chance of Critical Hit, +10% chance of Spell Critical Hit
 * - Damage: +5 Prismatic Damage
 * - Substats: +3 Stats Per Fight
 */

var Buffs = {
  Items: $effect(SourceTerminal_templateObject2 || (SourceTerminal_templateObject2 = SourceTerminal_taggedTemplateLiteral(["items.enh"]))),
  Meat: $effect(SourceTerminal_templateObject3 || (SourceTerminal_templateObject3 = SourceTerminal_taggedTemplateLiteral(["meat.enh"]))),
  Init: $effect(SourceTerminal_templateObject4 || (SourceTerminal_templateObject4 = SourceTerminal_taggedTemplateLiteral(["init.enh"]))),
  Critical: $effect(SourceTerminal_templateObject5 || (SourceTerminal_templateObject5 = SourceTerminal_taggedTemplateLiteral(["critical.enh"]))),
  Damage: $effect(SourceTerminal_templateObject6 || (SourceTerminal_templateObject6 = SourceTerminal_taggedTemplateLiteral(["damage.enh"]))),
  Substats: $effect(SourceTerminal_templateObject7 || (SourceTerminal_templateObject7 = SourceTerminal_taggedTemplateLiteral(["substats.enh"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see Buffs
 */

function enhance(buff) {
  if (!Object.values(Buffs).includes(buff)) {
    return false;
  }

  return (0,external_kolmafia_namespaceObject.cliExecute)("terminal enhance ".concat(buff.name));
}
/**
 * Rollover buffs that can be acquired from Enquiry
 */

var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: $effect(SourceTerminal_templateObject8 || (SourceTerminal_templateObject8 = SourceTerminal_taggedTemplateLiteral(["familiar.enq"]))),

  /** +25 ML */
  Monsters: $effect(SourceTerminal_templateObject9 || (SourceTerminal_templateObject9 = SourceTerminal_taggedTemplateLiteral(["monsters.enq"]))),

  /** +5 Prismatic Resistance */
  Protect: $effect(SourceTerminal_templateObject10 || (SourceTerminal_templateObject10 = SourceTerminal_taggedTemplateLiteral(["protect.enq"]))),

  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: $effect(SourceTerminal_templateObject11 || (SourceTerminal_templateObject11 = SourceTerminal_taggedTemplateLiteral(["stats.enq"])))
};
/**
 * Acquire a buff from the Source Terminal
 * @param buff The buff to acquire
 * @see RolloverBuffs
 */

function enquiry(rolloverBuff) {
  if (!Object.values(RolloverBuffs).includes(rolloverBuff)) {
    return false;
  }

  return (0,external_kolmafia_namespaceObject.cliExecute)("terminal enquiry ".concat(rolloverBuff.name));
}
/**
 * Skills that can be acquired from Enhance
 */

var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: $skill(SourceTerminal_templateObject12 || (SourceTerminal_templateObject12 = SourceTerminal_taggedTemplateLiteral(["Extract"]))),

  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: $skill(SourceTerminal_templateObject13 || (SourceTerminal_templateObject13 = SourceTerminal_taggedTemplateLiteral(["Digitize"]))),

  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: $skill(SourceTerminal_templateObject14 || (SourceTerminal_templateObject14 = SourceTerminal_taggedTemplateLiteral(["Compress"]))),

  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: $skill(SourceTerminal_templateObject15 || (SourceTerminal_templateObject15 = SourceTerminal_taggedTemplateLiteral(["Duplicate"]))),

  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: $skill(SourceTerminal_templateObject16 || (SourceTerminal_templateObject16 = SourceTerminal_taggedTemplateLiteral(["Portscan"]))),

  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: $skill(SourceTerminal_templateObject17 || (SourceTerminal_templateObject17 = SourceTerminal_taggedTemplateLiteral(["Turbo"])))
};
/**
 * Make a skill available.
 * The Source Terminal can give the player access to two skills at any time
 * @param skill Skill to learn
 * @see Skills
 */

function educate(skills) {
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  if (isEqual_default()(skillsArray, getSkills())) return true;

  var _iterator = SourceTerminal_createForOfIteratorHelper(skillsArray),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill)) return false;
      (0,external_kolmafia_namespaceObject.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 * Return the Skills currently available from Source Terminal
 */

function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(p => get(p)).filter(s => s !== "").map(s => external_kolmafia_namespaceObject.Skill.get(s.slice(0, -4)));
}
function isCurrentSkill(skills) {
  var currentSkills = getSkills();
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  return skillsArray.every(skill => currentSkills.includes(skill));
}
/**
 * Items that can be generated by the Source Terminal
 */

var Items = new Map([[$item(SourceTerminal_templateObject18 || (SourceTerminal_templateObject18 = SourceTerminal_taggedTemplateLiteral(["browser cookie"]))), "food.ext"], [$item(SourceTerminal_templateObject19 || (SourceTerminal_templateObject19 = SourceTerminal_taggedTemplateLiteral(["hacked gibson"]))), "booze.ext"], [$item(SourceTerminal_templateObject20 || (SourceTerminal_templateObject20 = SourceTerminal_taggedTemplateLiteral(["Source shades"]))), "goggles.ext"], [$item(SourceTerminal_templateObject21 || (SourceTerminal_templateObject21 = SourceTerminal_taggedTemplateLiteral(["Source terminal GRAM chip"]))), "gram.ext"], [$item(SourceTerminal_templateObject22 || (SourceTerminal_templateObject22 = SourceTerminal_taggedTemplateLiteral(["Source terminal PRAM chip"]))), "pram.ext"], [$item(SourceTerminal_templateObject23 || (SourceTerminal_templateObject23 = SourceTerminal_taggedTemplateLiteral(["Source terminal SPAM chip"]))), "spam.ext"], [$item(SourceTerminal_templateObject24 || (SourceTerminal_templateObject24 = SourceTerminal_taggedTemplateLiteral(["Source terminal CRAM chip"]))), "cram.ext"], [$item(SourceTerminal_templateObject25 || (SourceTerminal_templateObject25 = SourceTerminal_taggedTemplateLiteral(["Source terminal DRAM chip"]))), "dram.ext"], [$item(SourceTerminal_templateObject26 || (SourceTerminal_templateObject26 = SourceTerminal_taggedTemplateLiteral(["Source terminal TRAM chip"]))), "tram.ext"], [$item(SourceTerminal_templateObject27 || (SourceTerminal_templateObject27 = SourceTerminal_taggedTemplateLiteral(["software bug"]))), "familiar.ext"]]);
/**
 * Collect an item from the Source Terminal (up to three times a day)
 * @param item Item to collect
 * @see Items
 */

function extrude(item) {
  var fileName = Items.get(item);
  if (!fileName) return false;
  return (0,external_kolmafia_namespaceObject.cliExecute)("terminal extrude ".concat(fileName));
}

/**
 * Return chips currently installed to player's Source Terminal
 */
function getChips() {
  return get("sourceTerminalChips").split(",");
}
/**
 * Return number of times digitize was cast today
 */

function getDigitizeUses() {
  return get("_sourceTerminalDigitizeUses");
}
/**
 * Return Monster that is currently digitized, else null
 */

function getDigitizeMonster() {
  return get("_sourceTerminalDigitizeMonster");
}
/**
 * Return number of digitized monsters encountered since it was last cast
 */

function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
/**
 * Return maximum number of digitizes player can cast
 */

function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
/**
 * Returns the current day's number of remaining digitize uses
 */

function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
/**
 * Returns whether the player could theoretically cast Digitize
 */

function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  if (!isCurrentSkill(Skills.Digitize)) {
    return educate(Skills.Digitize);
  }

  return true;
}
/**
 * Returns whether the player can cast Digitize immediately
 * This only considers whether the player has learned the skill
 * and has sufficient daily casts remaining, not whether they have sufficient MP
 */

function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(() => couldDigitize(), () => prepareDigitize(), () => canDigitize(), () => getDigitizeMonster());
/**
 * Return number of times duplicate was cast today
 */

function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
/**
 * Return number of times enhance was cast today
 */

function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
/**
 * Return number of times portscan was cast today
 */

function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
/**
 * Returns maximum number of times duplicate can be used
 */

function maximumDuplicateUses() {
  return (0,external_kolmafia_namespaceObject.myPath)() === external_kolmafia_namespaceObject.Path.get("The Source") ? 5 : 1;
}
/**
 * Returns number of remaining times duplicate can be used today
 */

function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
/**
 * Return number of times enhance can be used per day
 */

function maximumEnhanceUses() {
  return 1 + getChips().filter(chip => ["CRAM", "SCRAM"].includes(chip)).length;
}
/**
 * Returns number of remaining times enahce can be used today
 */

function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
/**
 * Returns expected duration of an enhance buff
 */

function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
/**
 * Returns expected duration of an enquiry buff
 */

function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}
;// CONCATENATED MODULE: ./src/resources/2016/Witchess.ts
var Witchess_templateObject;

function Witchess_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var Witchess_item = $item(Witchess_templateObject || (Witchess_templateObject = Witchess_taggedTemplateLiteral(["Witchess Set"])));
function Witchess_have() {
  return haveInCampground(Witchess_item);
}
function fightsDone() {
  return get("_witchessFights");
}
var pieces = external_kolmafia_namespaceObject.Monster.get(["Witchess Pawn", "Witchess Knight", "Witchess Bishop", "Witchess Rook", "Witchess Queen", "Witchess King", "Witchess Witch", "Witchess Ox"]);
function fightPiece(piece) {
  if (!pieces.includes(piece)) throw new Error("That is not a valid piece.");

  if (!(0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=witchess").includes("whichchoice value=1181")) {
    throw new Error("Failed to open Witchess.");
  }

  if (!(0,external_kolmafia_namespaceObject.runChoice)(1).includes("whichchoice=1182")) {
    throw new Error("Failed to visit shrink ray.");
  }

  if (!(0,external_kolmafia_namespaceObject.visitUrl)("choice.php?option=1&pwd=".concat((0,external_kolmafia_namespaceObject.myHash)(), "&whichchoice=1182&piece=").concat((0,external_kolmafia_namespaceObject.toInt)(piece)), false).includes(piece.name)) {
    throw new Error("Failed to start fight.");
  }

  return (0,external_kolmafia_namespaceObject.runCombat)();
}
;// CONCATENATED MODULE: ./src/resources/2017/Pantogram.ts
var Pantogram_templateObject, Pantogram_templateObject2, _Alignment, _Element, Pantogram_templateObject3, Pantogram_templateObject4, Pantogram_templateObject5, Pantogram_templateObject6, Pantogram_templateObject7, Pantogram_templateObject8, Pantogram_templateObject9, _LeftSacrifice, Pantogram_templateObject10, Pantogram_templateObject11, Pantogram_templateObject12, Pantogram_templateObject13, Pantogram_templateObject14, Pantogram_templateObject15, Pantogram_templateObject16, Pantogram_templateObject17, Pantogram_templateObject18, _MiddleSacrifice, Pantogram_templateObject19, Pantogram_templateObject20, Pantogram_templateObject21, Pantogram_templateObject22, Pantogram_templateObject23, Pantogram_templateObject24, Pantogram_templateObject25, Pantogram_templateObject26, Pantogram_templateObject27, Pantogram_templateObject28, _RightSacrifice;

function Pantogram_slicedToArray(arr, i) { return Pantogram_arrayWithHoles(arr) || Pantogram_iterableToArrayLimit(arr, i) || Pantogram_unsupportedIterableToArray(arr, i) || Pantogram_nonIterableRest(); }

function Pantogram_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Pantogram_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Pantogram_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Pantogram_arrayLikeToArray(o, minLen); }

function Pantogram_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Pantogram_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Pantogram_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Pantogram_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Pantogram_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var pantogram = $item(Pantogram_templateObject || (Pantogram_templateObject = Pantogram_taggedTemplateLiteral(["portable pantogram"])));
var pants = $item(Pantogram_templateObject2 || (Pantogram_templateObject2 = Pantogram_taggedTemplateLiteral(["pantogram pants"])));
function Pantogram_have() {
  return have(pantogram);
}
function havePants() {
  return have(pants);
}
var Alignment = (_Alignment = {}, Pantogram_defineProperty(_Alignment, "Muscle", 1), Pantogram_defineProperty(_Alignment, "Mysticality", 2), Pantogram_defineProperty(_Alignment, "Moxie", 3), _Alignment);
var Element = (_Element = {}, Pantogram_defineProperty(_Element, "Hot Resistance: 2", 1), Pantogram_defineProperty(_Element, "Cold Resistance: 2", 2), Pantogram_defineProperty(_Element, "Spooky Resistance: 2", 3), Pantogram_defineProperty(_Element, "Sleaze Resistance: 2", 4), Pantogram_defineProperty(_Element, "Stench Resistance: 2", 5), _Element);
var LeftSacrifice = (_LeftSacrifice = {}, Pantogram_defineProperty(_LeftSacrifice, "Maximum HP: 40", [-1, 0]), Pantogram_defineProperty(_LeftSacrifice, "Maximum MP: 20", [-2, 0]), Pantogram_defineProperty(_LeftSacrifice, "HP Regen Max: 10", [$item(Pantogram_templateObject3 || (Pantogram_templateObject3 = Pantogram_taggedTemplateLiteral(["red pixel potion"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "HP Regen Max: 15", [$item(Pantogram_templateObject4 || (Pantogram_templateObject4 = Pantogram_taggedTemplateLiteral(["royal jelly"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "HP Regen Max: 20", [$item(Pantogram_templateObject5 || (Pantogram_templateObject5 = Pantogram_taggedTemplateLiteral(["scented massage oil"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "MP Regen Max: 10", [$item(Pantogram_templateObject6 || (Pantogram_templateObject6 = Pantogram_taggedTemplateLiteral(["Cherry Cloaca Cola"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "MP Regen Max: 15", [$item(Pantogram_templateObject7 || (Pantogram_templateObject7 = Pantogram_taggedTemplateLiteral(["bubblin' crude"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "MP Regen Max: 20", [$item(Pantogram_templateObject8 || (Pantogram_templateObject8 = Pantogram_taggedTemplateLiteral(["glowing New Age crystal"]))), 1]), Pantogram_defineProperty(_LeftSacrifice, "Mana Cost: -3", [$item(Pantogram_templateObject9 || (Pantogram_templateObject9 = Pantogram_taggedTemplateLiteral(["baconstone"]))), 1]), _LeftSacrifice);

function getLeftSacPair(mod) {
  return LeftSacrifice[mod];
}

var MiddleSacrifice = (_MiddleSacrifice = {}, Pantogram_defineProperty(_MiddleSacrifice, "Combat Rate: -5", [-1, 0]), Pantogram_defineProperty(_MiddleSacrifice, "Combat Rate: 5", [-2, 0]), Pantogram_defineProperty(_MiddleSacrifice, "Critical Hit Percent: 10", [$item(Pantogram_templateObject10 || (Pantogram_templateObject10 = Pantogram_taggedTemplateLiteral(["hamethyst"]))), 1]), Pantogram_defineProperty(_MiddleSacrifice, "Initiative: 50", [$item(Pantogram_templateObject11 || (Pantogram_templateObject11 = Pantogram_taggedTemplateLiteral(["bar skin"]))), 1]), Pantogram_defineProperty(_MiddleSacrifice, "Familiar Weight: 10", [$item(Pantogram_templateObject12 || (Pantogram_templateObject12 = Pantogram_taggedTemplateLiteral(["lead necklace"]))), 11]), Pantogram_defineProperty(_MiddleSacrifice, "Candy Drop: 100", [$item(Pantogram_templateObject13 || (Pantogram_templateObject13 = Pantogram_taggedTemplateLiteral(["huge bowl of candy"]))), 1]), Pantogram_defineProperty(_MiddleSacrifice, "Item Drop Penalty: -10", [$item(Pantogram_templateObject14 || (Pantogram_templateObject14 = Pantogram_taggedTemplateLiteral(["sea salt crystal"]))), 11]), Pantogram_defineProperty(_MiddleSacrifice, "Fishing Skill: 5", [$item(Pantogram_templateObject15 || (Pantogram_templateObject15 = Pantogram_taggedTemplateLiteral(["wriggling worm"]))), 1]), Pantogram_defineProperty(_MiddleSacrifice, "Pool Skill: 5", [$item(Pantogram_templateObject16 || (Pantogram_templateObject16 = Pantogram_taggedTemplateLiteral(["8-ball"]))), 15]), Pantogram_defineProperty(_MiddleSacrifice, "Avatar: Purple", [$item(Pantogram_templateObject17 || (Pantogram_templateObject17 = Pantogram_taggedTemplateLiteral(["moxie weed"]))), 99]), Pantogram_defineProperty(_MiddleSacrifice, "Drops Items: true", [$item(Pantogram_templateObject18 || (Pantogram_templateObject18 = Pantogram_taggedTemplateLiteral(["ten-leaf clover"]))), 1]), _MiddleSacrifice);

function getMiddleSacPair(mod) {
  return MiddleSacrifice[mod];
}

var RightSacrifice = (_RightSacrifice = {}, Pantogram_defineProperty(_RightSacrifice, "Weapon Damage: 20", [-1, 0]), Pantogram_defineProperty(_RightSacrifice, "Spell Damage Percent: 20", [-2, 0]), Pantogram_defineProperty(_RightSacrifice, "Meat Drop: 30", [$item(Pantogram_templateObject19 || (Pantogram_templateObject19 = Pantogram_taggedTemplateLiteral(["taco shell"]))), 1]), Pantogram_defineProperty(_RightSacrifice, "Meat Drop: 60", [$item(Pantogram_templateObject20 || (Pantogram_templateObject20 = Pantogram_taggedTemplateLiteral(["porquoise"]))), 1]), Pantogram_defineProperty(_RightSacrifice, "Item Drop: 15", [$item(Pantogram_templateObject21 || (Pantogram_templateObject21 = Pantogram_taggedTemplateLiteral(["fairy gravy boat"]))), 1]), Pantogram_defineProperty(_RightSacrifice, "Item Drop: 30", [$item(Pantogram_templateObject22 || (Pantogram_templateObject22 = Pantogram_taggedTemplateLiteral(["tiny dancer"]))), 1]), Pantogram_defineProperty(_RightSacrifice, "Muscle Experience: 3", [$item(Pantogram_templateObject23 || (Pantogram_templateObject23 = Pantogram_taggedTemplateLiteral(["Knob Goblin firecracker"]))), 3]), Pantogram_defineProperty(_RightSacrifice, "Mysticality Experience: 3", [$item(Pantogram_templateObject24 || (Pantogram_templateObject24 = Pantogram_taggedTemplateLiteral(["razor-sharp can lid"]))), 3]), Pantogram_defineProperty(_RightSacrifice, "Moxie Experience: 3", [$item(Pantogram_templateObject25 || (Pantogram_templateObject25 = Pantogram_taggedTemplateLiteral(["spider web"]))), 3]), Pantogram_defineProperty(_RightSacrifice, "Muscle Experience Percent: 25", [$item(Pantogram_templateObject26 || (Pantogram_templateObject26 = Pantogram_taggedTemplateLiteral(["synthetic marrow"]))), 5]), Pantogram_defineProperty(_RightSacrifice, "Mysticality Experience Percent: 25", [$item(Pantogram_templateObject27 || (Pantogram_templateObject27 = Pantogram_taggedTemplateLiteral(["haunted battery"]))), 5]), Pantogram_defineProperty(_RightSacrifice, "Moxie Experience Percent: 25", [$item(Pantogram_templateObject28 || (Pantogram_templateObject28 = Pantogram_taggedTemplateLiteral(["the funk"]))), 5]), _RightSacrifice);

function getRightSacPair(mod) {
  return RightSacrifice[mod];
}

/**
 * Finds the item requirements for a particular pair of pants.
 * @param modifiers An object consisting of the modifiers you want on your pants. For modifiers repeated across a particular sacrifice, use a tuple of that modifier and its value.
 * @returns A map of the items you need to make these pants and the quantities needed.
 */
function findRequirements(modifiers) {
  var leftSac = modifiers.leftSac,
      rightSac = modifiers.rightSac,
      middleSac = modifiers.middleSac;
  var returnValue = new Map();

  if (leftSac) {
    var _getLeftSacPair = getLeftSacPair(leftSac),
        _getLeftSacPair2 = Pantogram_slicedToArray(_getLeftSacPair, 2),
        sacrifice = _getLeftSacPair2[0],
        quantity = _getLeftSacPair2[1];

    if (sacrifice instanceof external_kolmafia_namespaceObject.Item) {
      returnValue.set(sacrifice, quantity);
    }
  }

  if (rightSac) {
    var _getRightSacPair = getRightSacPair(rightSac),
        _getRightSacPair2 = Pantogram_slicedToArray(_getRightSacPair, 2),
        _sacrifice = _getRightSacPair2[0],
        _quantity = _getRightSacPair2[1];

    if (_sacrifice instanceof external_kolmafia_namespaceObject.Item) {
      returnValue.set(_sacrifice, _quantity);
    }
  }

  if (middleSac) {
    var _getMiddleSacPair = getMiddleSacPair(middleSac),
        _getMiddleSacPair2 = Pantogram_slicedToArray(_getMiddleSacPair, 2),
        _sacrifice2 = _getMiddleSacPair2[0],
        _quantity2 = _getMiddleSacPair2[1];

    if (_sacrifice2 instanceof external_kolmafia_namespaceObject.Item) {
      returnValue.set(_sacrifice2, _quantity2);
    }
  }

  return returnValue;
}

function sacrificePairToURL(pair) {
  var _pair = Pantogram_slicedToArray(pair, 2),
      rawSacrifice = _pair[0],
      quantity = _pair[1];

  var sacrifice = rawSacrifice instanceof external_kolmafia_namespaceObject.Item ? (0,external_kolmafia_namespaceObject.toInt)(rawSacrifice) : rawSacrifice;
  return "".concat(sacrifice, ",").concat(quantity);
}
/**
 * Makes a pair of pants with the given modifiers
 * @param alignment The stat you'd like your pants to improve. Moxie, Mysticality, or Muscle
 * @param element The element you'd like your pants to provide resistance for
 * @param leftSac The modifier you'd like to get from your leftmost sacrifice in Pantagramming.
 * @param middleSac The modifier you'd like to get from your middle sacrifice in Pantagramming.
 * @param rightSac The modifier you'd like to get from your rightmost sacrifice in Pantagramming.
 * @returns Whether or not you successfully created a pair of pants. False if you don't own the pantogram or if you already have pantogram pants.
 */


function makePants(alignment, element, leftSac, middleSac, rightSac) {
  if (have(pants) || !have(pantogram)) return false;
  var requirements = findRequirements({
    alignment: alignment,
    element: element,
    leftSac: leftSac,
    rightSac: rightSac,
    middleSac: middleSac
  });

  if (Array.from(requirements.entries()).some(_ref => {
    var _ref2 = Pantogram_slicedToArray(_ref, 2),
        item = _ref2[0],
        quantity = _ref2[1];

    return !have(item, quantity);
  })) {
    return false;
  }

  var s1 = sacrificePairToURL(getLeftSacPair(leftSac));
  var s2 = sacrificePairToURL(getRightSacPair(rightSac));
  var s3 = sacrificePairToURL(getMiddleSacPair(middleSac));
  var url = "choice.php?whichchoice=1270&pwd&option=1&m=".concat(Alignment[alignment], "&e=").concat(Element[element], "&s1=").concat(s1, "&s2=").concat(s2, "&s3=").concat(s3);
  (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&whichitem=9573");
  (0,external_kolmafia_namespaceObject.visitUrl)(url);
  return have(pants);
}
/**
 * Creates a pair of pants from a Pants object.
 * @param pants An object consisting of the modifiers you'd like the pants to give you.
 * @returns Whether or not you successfully created a pair of pants. False if you don't own the pantogram or if you already have pantogram pants.
 */

function makePantsFromObject(pants) {
  return makePants(pants.alignment, pants.element, pants.leftSac, pants.middleSac, pants.rightSac);
}
;// CONCATENATED MODULE: ./src/resources/2017/Robortender.ts
var Robortender_templateObject, Robortender_templateObject2, Robortender_templateObject3, Robortender_templateObject4, Robortender_templateObject5, Robortender_templateObject6, Robortender_templateObject7, Robortender_templateObject8, Robortender_templateObject9, Robortender_templateObject10, Robortender_templateObject11, Robortender_templateObject12, Robortender_templateObject13, Robortender_templateObject14, Robortender_templateObject15, Robortender_templateObject16, Robortender_templateObject17, Robortender_templateObject18, Robortender_templateObject19, Robortender_templateObject20, Robortender_templateObject21, Robortender_templateObject22, Robortender_templateObject23, Robortender_templateObject24, Robortender_templateObject25, Robortender_templateObject26, Robortender_templateObject27, Robortender_templateObject28, Robortender_templateObject29, Robortender_templateObject30, Robortender_templateObject31, Robortender_templateObject32, Robortender_templateObject33, Robortender_templateObject34, Robortender_templateObject35, Robortender_templateObject36, Robortender_templateObject37;

function Robortender_toConsumableArray(arr) { return Robortender_arrayWithoutHoles(arr) || Robortender_iterableToArray(arr) || Robortender_unsupportedIterableToArray(arr) || Robortender_nonIterableSpread(); }

function Robortender_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Robortender_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Robortender_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Robortender_arrayLikeToArray(o, minLen); }

function Robortender_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Robortender_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Robortender_arrayLikeToArray(arr); }

function Robortender_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Robortender_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




/**
 * The Robortender itself
 */

var Robortender_familiar = $familiar(Robortender_templateObject || (Robortender_templateObject = Robortender_taggedTemplateLiteral(["Robortender"])));
/**
 * @returns Whether you have the Robortender in your terrarium/available
 */

function Robortender_have() {
  return (0,external_kolmafia_namespaceObject.haveFamiliar)(Robortender_familiar);
}
var phylumDrops = new Map([[$phylum(Robortender_templateObject2 || (Robortender_templateObject2 = Robortender_taggedTemplateLiteral(["Bug"]))), $item(Robortender_templateObject3 || (Robortender_templateObject3 = Robortender_taggedTemplateLiteral(["pickled grasshopper"])))], // bottle of anís
[$phylum(Robortender_templateObject4 || (Robortender_templateObject4 = Robortender_taggedTemplateLiteral(["Constellation"]))), external_kolmafia_namespaceObject.Item.get(9348)], [$phylum(Robortender_templateObject5 || (Robortender_templateObject5 = Robortender_taggedTemplateLiteral(["Demon"]))), $item(Robortender_templateObject6 || (Robortender_templateObject6 = Robortender_taggedTemplateLiteral(["bottle of novelty hot sauce"])))], [$phylum(Robortender_templateObject7 || (Robortender_templateObject7 = Robortender_taggedTemplateLiteral(["Elemental"]))), $item(Robortender_templateObject8 || (Robortender_templateObject8 = Robortender_taggedTemplateLiteral(["elemental sugarcube"])))], [$phylum(Robortender_templateObject9 || (Robortender_templateObject9 = Robortender_taggedTemplateLiteral(["Elf"]))), $item(Robortender_templateObject10 || (Robortender_templateObject10 = Robortender_taggedTemplateLiteral(["peppermint sprig"])))], [$phylum(Robortender_templateObject11 || (Robortender_templateObject11 = Robortender_taggedTemplateLiteral(["Fish"]))), $item(Robortender_templateObject12 || (Robortender_templateObject12 = Robortender_taggedTemplateLiteral(["bottle of clam juice"])))], [$phylum(Robortender_templateObject13 || (Robortender_templateObject13 = Robortender_taggedTemplateLiteral(["Goblin"]))), $item(Robortender_templateObject14 || (Robortender_templateObject14 = Robortender_taggedTemplateLiteral(["cocktail mushroom"])))], [$phylum(Robortender_templateObject15 || (Robortender_templateObject15 = Robortender_taggedTemplateLiteral(["Hippy"]))), $item(Robortender_templateObject16 || (Robortender_templateObject16 = Robortender_taggedTemplateLiteral(["shot of granola liqueur"])))], [$phylum(Robortender_templateObject17 || (Robortender_templateObject17 = Robortender_taggedTemplateLiteral(["Hobo"]))), $item(Robortender_templateObject18 || (Robortender_templateObject18 = Robortender_taggedTemplateLiteral(["can of cherry-flavored sterno"])))], [$phylum(Robortender_templateObject19 || (Robortender_templateObject19 = Robortender_taggedTemplateLiteral(["Horror"]))), $item(Robortender_templateObject20 || (Robortender_templateObject20 = Robortender_taggedTemplateLiteral(["lump of black ichor"])))], [$phylum(Robortender_templateObject21 || (Robortender_templateObject21 = Robortender_taggedTemplateLiteral(["Humanoid"]))), $item(Robortender_templateObject22 || (Robortender_templateObject22 = Robortender_taggedTemplateLiteral(["bottle of gregnadigne"])))], // bottle of Crème de Fugu
[$phylum(Robortender_templateObject23 || (Robortender_templateObject23 = Robortender_taggedTemplateLiteral(["Mer-kin"]))), external_kolmafia_namespaceObject.Item.get(9358)], [$phylum(Robortender_templateObject24 || (Robortender_templateObject24 = Robortender_taggedTemplateLiteral(["Orc"]))), $item(Robortender_templateObject25 || (Robortender_templateObject25 = Robortender_taggedTemplateLiteral(["baby oil shooter"])))], [$phylum(Robortender_templateObject26 || (Robortender_templateObject26 = Robortender_taggedTemplateLiteral(["Penguin"]))), $item(Robortender_templateObject27 || (Robortender_templateObject27 = Robortender_taggedTemplateLiteral(["fish head"])))], [$phylum(Robortender_templateObject28 || (Robortender_templateObject28 = Robortender_taggedTemplateLiteral(["Pirate"]))), $item(Robortender_templateObject29 || (Robortender_templateObject29 = Robortender_taggedTemplateLiteral(["limepatch"])))], [$phylum(Robortender_templateObject30 || (Robortender_templateObject30 = Robortender_taggedTemplateLiteral(["Plant"]))), $item(Robortender_templateObject31 || (Robortender_templateObject31 = Robortender_taggedTemplateLiteral(["pile of dirt"])))], [$phylum(Robortender_templateObject32 || (Robortender_templateObject32 = Robortender_taggedTemplateLiteral(["Slime"]))), $item(Robortender_templateObject33 || (Robortender_templateObject33 = Robortender_taggedTemplateLiteral(["slime shooter"])))], [$phylum(Robortender_templateObject34 || (Robortender_templateObject34 = Robortender_taggedTemplateLiteral(["Weird"]))), $item(Robortender_templateObject35 || (Robortender_templateObject35 = Robortender_taggedTemplateLiteral(["imaginary lemon"])))]]);
/**
 *
 * @param target The phylum or monster you want to know the robortender drop of
 * @returns The robortender drop associated with that phylum or monster
 */

function dropFrom(target) {
  var _phylumDrops$get;

  var phylum = target instanceof external_kolmafia_namespaceObject.Monster ? target.phylum : target;
  return (_phylumDrops$get = phylumDrops.get(phylum)) !== null && _phylumDrops$get !== void 0 ? _phylumDrops$get : $item.none;
}
/**
 * Determines the probability of getting a robortender drop based on number of drops received
 * @param dropNumber The number of drops to assume you've already received; defaults to mafia's tracked amount
 * @returns The probability of getting a robort drop
 */

function dropChance() {
  var _dropNumber;

  var dropNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : get("_roboDrops");
  return (_dropNumber = [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber]) !== null && _dropNumber !== void 0 ? _dropNumber : 0.2;
}
var minorDrinks = $items(Robortender_templateObject36 || (Robortender_templateObject36 = Robortender_taggedTemplateLiteral(["literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini"])));
var majorDrinks = $items(Robortender_templateObject37 || (Robortender_templateObject37 = Robortender_taggedTemplateLiteral(["eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins"])));
var drinks = [].concat(Robortender_toConsumableArray(minorDrinks), Robortender_toConsumableArray(majorDrinks));
/**
 * @returns An array consisting of the drinks you've fed your robortender today.
 */

function currentDrinks() {
  var pref = get("_roboDrinks");
  if (!pref) return [];
  return pref.split(",").filter(x => x.trim()).map(name => (0,external_kolmafia_namespaceObject.toItem)(name)).filter(drink => drinks.includes(drink));
}
/**
 * @param beverage A robortender-consumable drink of choice (i.e. Drive-By Shooting, Single Entendre, etc)
 * @returns A boolean; if true, the user's robortender has drunk that drink after execution. If false, it has not. This ALSO returns false if the user has not passed the function a robortender-consumable drink. If the user does not already have the beverage in their inventory, this function will not purchase the requested for you.
 */

function feed(beverage) {
  if (currentDrinks().includes(beverage)) return true;
  if (currentDrinks().length >= 5) return false;
  if (!drinks.includes(beverage)) return false;
  if (!(0,external_kolmafia_namespaceObject.itemAmount)(beverage)) return false;
  (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?action=robooze&which=1&whichitem=".concat((0,external_kolmafia_namespaceObject.toInt)(beverage)));
  return currentDrinks().includes(beverage);
}
;// CONCATENATED MODULE: ./src/resources/2017/Spacegate.ts
var Spacegate_templateObject, Spacegate_templateObject2, Spacegate_templateObject3, Spacegate_templateObject4, Spacegate_templateObject5;

function Spacegate_slicedToArray(arr, i) { return Spacegate_arrayWithHoles(arr) || Spacegate_iterableToArrayLimit(arr, i) || Spacegate_unsupportedIterableToArray(arr, i) || Spacegate_nonIterableRest(); }

function Spacegate_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Spacegate_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Spacegate_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Spacegate_arrayLikeToArray(o, minLen); }

function Spacegate_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Spacegate_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Spacegate_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Spacegate_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




function Spacegate_have() {
  return get("spacegateAlways") || get("_spacegateToday");
}
function updateStatus() {
  (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=spacegate&action=sg_Terminal");
}
function dialled() {
  updateStatus();
  return get("_spacegateCoordinates") !== "";
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
function hazardEquipment(hazards) {
  var hazardEquipment = {
    "toxic atmosphere": $item(Spacegate_templateObject || (Spacegate_templateObject = Spacegate_taggedTemplateLiteral(["filter helmet"]))),
    "high gravity": $item(Spacegate_templateObject2 || (Spacegate_templateObject2 = Spacegate_taggedTemplateLiteral(["exo-servo leg braces"]))),
    irradiated: $item(Spacegate_templateObject3 || (Spacegate_templateObject3 = Spacegate_taggedTemplateLiteral(["rad cloak"]))),
    "magnetic storms": $item(Spacegate_templateObject4 || (Spacegate_templateObject4 = Spacegate_taggedTemplateLiteral(["gate transceiver"]))),
    "high winds": $item(Spacegate_templateObject5 || (Spacegate_templateObject5 = Spacegate_taggedTemplateLiteral(["high-friction boots"])))
  };
  return Object.entries(hazardEquipment).filter(_ref => {
    var _ref2 = Spacegate_slicedToArray(_ref, 1),
        clue = _ref2[0];

    return hazards.includes(clue);
  }).map(_ref3 => {
    var _ref4 = Spacegate_slicedToArray(_ref3, 2),
        item = _ref4[1];

    return item;
  });
}
function getHazardEquipment() {
  var equipment = hazardEquipment(hazards());
  equipment.forEach(equip => {
    var num = (0,external_kolmafia_namespaceObject.toInt)(equip) - 9404; //Equipment items are 9405 - 9409,

    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=spacegate&action=sg_requisition");
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1233&option=".concat(num));
  });
}
function getVaccine(choice) {
  if (get("_spacegateVaccine")) {
    return;
  }

  var nums = {
    Rainbow: 1,
    "Elemental Resistance": 1,
    "Broad-Spectrum": 2,
    Stats: 2,
    Emotional: 3,
    "Monster Level": 3
  };
  var num = nums[choice];

  if (!get("spacegateVaccine".concat(num))) {
    throw "You don't appear to have that Vaccine Unlocked!";
  }

  (0,external_kolmafia_namespaceObject.cliExecute)("spacegate vaccine ".concat(num));
}
function dial(address) {
  if (!Spacegate_have() || dialled()) {
    //cannot dial if we already have or don't own it.
    return;
  }

  if (!address.match("^[[alpha]]+$") || address.length !== 7) {
    throw "Invalid Spacegate Address - must be exactly 7 alphabetic characters";
  } else {
    (0,external_kolmafia_namespaceObject.cliExecute)("spacegate destination ".concat(address));
  }
}
;// CONCATENATED MODULE: ./src/resources/2017/TunnelOfLove.ts
var TunnelOfLove_templateObject, TunnelOfLove_templateObject2;

function TunnelOfLove_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






function TunnelOfLove_have() {
  return get("loveTunnelAvailable");
}
function isUsed() {
  return get("_loveTunnelUsed");
}
function haveLovEnamorang() {
  return have($item(TunnelOfLove_templateObject || (TunnelOfLove_templateObject = TunnelOfLove_taggedTemplateLiteral(["LOV Enamorang"]))));
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
var LovEnamorang = new Copier(() => couldUseLoveEnamorang(), null, () => couldUseLoveEnamorang(), () => getLovEnamorangMonster());

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

function effectChoice(effect) {
  switch (effect) {
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
/**
 * Fight all LOV monsters and get buffs/equipment.
 * @param equipment Equipment to take from LOV.
 * @param effect Effect to take from LOV.
 * @param extra Extra item to take from LOV.
 */


function fightAll(equipment, effect, extra) {
  _set("choiceAdventure1222", 1); // Entrance

  _set("choiceAdventure1223", 1); // Fight LOV Enforcer

  _set("choiceAdventure1224", equipmentChoice(equipment));
  _set("choiceAdventure1225", 1); // Fight LOV Engineer

  _set("choiceAdventure1226", effectChoice(effect));
  _set("choiceAdventure1227", 1); // Fight LOV Equivocator

  _set("choiceAdventure1228", extraChoice(extra));
  (0,external_kolmafia_namespaceObject.adv1)($location(TunnelOfLove_templateObject2 || (TunnelOfLove_templateObject2 = TunnelOfLove_taggedTemplateLiteral(["The Tunnel of L.O.V.E."]))), 0, "");
}
;// CONCATENATED MODULE: ./src/resources/2018/LatteLoversMembersMug.ts
var LatteLoversMembersMug_templateObject;

function LatteLoversMembersMug_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function LatteLoversMembersMug_have() {
  return have($item(LatteLoversMembersMug_templateObject || (LatteLoversMembersMug_templateObject = LatteLoversMembersMug_taggedTemplateLiteral(["latte lovers member's mug"]))));
}
function sniffedMonster() {
  return (0,external_kolmafia_namespaceObject.getCounter)("Latte Monster") !== -1 ? get("_latteMonster") : null;
}
function refillsRemaining() {
  return 3 - get("_latteRefillsUsed");
}
;// CONCATENATED MODULE: ./src/resources/2018/SongBoom.ts
var SongBoom_templateObject;

function SongBoom_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var SongBoom_item = $item(SongBoom_templateObject || (SongBoom_templateObject = SongBoom_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])));
function SongBoom_have() {
  return have(SongBoom_item);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
};
var songBoomSongs = new Set(Object.keys(keywords));
/**
 * Current song.
 */

function song() {
  var stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
/**
 * Song changes left today.
 */

function songChangesLeft() {
  return get("_boomBoxSongsLeft");
}
/**
 * Change the song.
 * @param newSong Song to change to.
 */

function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0) throw new Error("Out of song changes!");
    (0,external_kolmafia_namespaceObject.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none"));
    return true;
  } else {
    return false;
  }
}
/**
 * Progress to next song drop (e.g. gathered meat-clip).
 */

function dropProgress() {
  return get("_boomBoxFights");
}
;// CONCATENATED MODULE: ./src/resources/2019/BeachComb.ts
var BeachComb_templateObject, BeachComb_templateObject2, BeachComb_templateObject3, BeachComb_templateObject4, BeachComb_templateObject5, BeachComb_templateObject6, BeachComb_templateObject7, BeachComb_templateObject8, BeachComb_templateObject9, BeachComb_templateObject10, BeachComb_templateObject11;

function BeachComb_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var headBuffs = [$effect(BeachComb_templateObject || (BeachComb_templateObject = BeachComb_taggedTemplateLiteral(["Hot-Headed"]))), $effect(BeachComb_templateObject2 || (BeachComb_templateObject2 = BeachComb_taggedTemplateLiteral(["Cold as Nice"]))), $effect(BeachComb_templateObject3 || (BeachComb_templateObject3 = BeachComb_taggedTemplateLiteral(["A Brush with Grossness"]))), $effect(BeachComb_templateObject4 || (BeachComb_templateObject4 = BeachComb_taggedTemplateLiteral(["Does It Have a Skull In There??"]))), $effect(BeachComb_templateObject5 || (BeachComb_templateObject5 = BeachComb_taggedTemplateLiteral(["Oiled, Slick"]))), $effect(BeachComb_templateObject6 || (BeachComb_templateObject6 = BeachComb_taggedTemplateLiteral(["Lack of Body-Building"]))), $effect(BeachComb_templateObject7 || (BeachComb_templateObject7 = BeachComb_taggedTemplateLiteral(["We're All Made of Starfish"]))), $effect(BeachComb_templateObject8 || (BeachComb_templateObject8 = BeachComb_taggedTemplateLiteral(["Pomp & Circumsands"]))), $effect(BeachComb_templateObject9 || (BeachComb_templateObject9 = BeachComb_taggedTemplateLiteral(["Resting Beach Face"]))), $effect(BeachComb_templateObject10 || (BeachComb_templateObject10 = BeachComb_taggedTemplateLiteral(["Do I Know You From Somewhere?"]))), $effect(BeachComb_templateObject11 || (BeachComb_templateObject11 = BeachComb_taggedTemplateLiteral(["You Learned Something Maybe!"])))];
function tryHead(effect) {
  if (!headBuffs.includes(effect)) return false;
  var headNumber = 1 + headBuffs.indexOf(effect);
  if (getString("_beachHeadsUsed").split(",").includes(headNumber.toString())) return false;
  (0,external_kolmafia_namespaceObject.cliExecute)(effect.default);
  return have(effect);
}
;// CONCATENATED MODULE: ./src/resources/2019/Snapper.ts
function Snapper_slicedToArray(arr, i) { return Snapper_arrayWithHoles(arr) || Snapper_iterableToArrayLimit(arr, i) || Snapper_unsupportedIterableToArray(arr, i) || Snapper_nonIterableRest(); }

function Snapper_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Snapper_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Snapper_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Snapper_toConsumableArray(arr) { return Snapper_arrayWithoutHoles(arr) || Snapper_iterableToArray(arr) || Snapper_unsupportedIterableToArray(arr) || Snapper_nonIterableSpread(); }

function Snapper_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Snapper_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Snapper_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Snapper_arrayLikeToArray(o, minLen); }

function Snapper_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Snapper_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Snapper_arrayLikeToArray(arr); }

function Snapper_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var Snapper_familiar = external_kolmafia_namespaceObject.Familiar.get("Red-Nosed Snapper");
/**
 * Map of phylum to item that phylum drops.
 */

var phylumItem = new Map([[external_kolmafia_namespaceObject.Phylum.get("beast"), external_kolmafia_namespaceObject.Item.get("patch of extra-warm fur")], [external_kolmafia_namespaceObject.Phylum.get("bug"), external_kolmafia_namespaceObject.Item.get("a bug's lymph")], [external_kolmafia_namespaceObject.Phylum.get("constellation"), external_kolmafia_namespaceObject.Item.get("micronova")], [external_kolmafia_namespaceObject.Phylum.get("construct"), external_kolmafia_namespaceObject.Item.get("industrial lubricant")], [external_kolmafia_namespaceObject.Phylum.get("demon"), external_kolmafia_namespaceObject.Item.get("infernal snowball")], [external_kolmafia_namespaceObject.Phylum.get("dude"), external_kolmafia_namespaceObject.Item.get("human musk")], [external_kolmafia_namespaceObject.Phylum.get("elemental"), external_kolmafia_namespaceObject.Item.get("livid energy")], [external_kolmafia_namespaceObject.Phylum.get("elf"), external_kolmafia_namespaceObject.Item.get("peppermint syrup")], [external_kolmafia_namespaceObject.Phylum.get("fish"), external_kolmafia_namespaceObject.Item.get("fish sauce")], [external_kolmafia_namespaceObject.Phylum.get("goblin"), external_kolmafia_namespaceObject.Item.get("guffin")], [external_kolmafia_namespaceObject.Phylum.get("hippy"), external_kolmafia_namespaceObject.Item.get("organic potpourri")], [external_kolmafia_namespaceObject.Phylum.get("hobo"), external_kolmafia_namespaceObject.Item.get("beggin' cologne")], [external_kolmafia_namespaceObject.Phylum.get("horror"), external_kolmafia_namespaceObject.Item.get("powdered madness")], [external_kolmafia_namespaceObject.Phylum.get("humanoid"), external_kolmafia_namespaceObject.Item.get("vial of humanoid growth hormone")], [external_kolmafia_namespaceObject.Phylum.get("mer-kin"), external_kolmafia_namespaceObject.Item.get("Mer-kin eyedrops")], [external_kolmafia_namespaceObject.Phylum.get("orc"), external_kolmafia_namespaceObject.Item.get("boot flask")], [external_kolmafia_namespaceObject.Phylum.get("penguin"), external_kolmafia_namespaceObject.Item.get("envelope full of Meat")], [external_kolmafia_namespaceObject.Phylum.get("pirate"), external_kolmafia_namespaceObject.Item.get("Shantix™")], [external_kolmafia_namespaceObject.Phylum.get("plant"), external_kolmafia_namespaceObject.Item.get("goodberry")], [external_kolmafia_namespaceObject.Phylum.get("slime"), external_kolmafia_namespaceObject.Item.get("extra-strength goo")], [external_kolmafia_namespaceObject.Phylum.get("undead"), external_kolmafia_namespaceObject.Item.get("unfinished pleasure")], [external_kolmafia_namespaceObject.Phylum.get("weird"), external_kolmafia_namespaceObject.Item.get("non-Euclidean angle")]]);
/**
 * Map of drop item to phylum it drops from.
 */

var itemPhylum = new Map(Snapper_toConsumableArray(phylumItem).map(_ref => {
  var _ref2 = Snapper_slicedToArray(_ref, 2),
      phylum = _ref2[0],
      item = _ref2[1];

  return [item, phylum];
}));
/**
 * Return whether you have a Red-Nosed Snapper.
 * @returns True if you have a Red-Nosed Snapper, false otherwise.
 */

function Snapper_have() {
  return (0,external_kolmafia_namespaceObject.haveFamiliar)(Snapper_familiar);
}
/**
 * Get the phylum currently being tracked by the snapper.
 * @returns Tracked phylum, or null if no phylum tracked.
 */

function getTrackedPhylum() {
  return get("redSnapperPhylum");
}
/**
 * Set snapper tracking to a certain phylum.
 * @param phylum Phylum to track.
 */

function trackPhylum(phylum) {
  var currentFamiliar = (0,external_kolmafia_namespaceObject.myFamiliar)();

  try {
    (0,external_kolmafia_namespaceObject.useFamiliar)(Snapper_familiar);
    (0,external_kolmafia_namespaceObject.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0,external_kolmafia_namespaceObject.useFamiliar)(currentFamiliar);
  }
}
/**
 * Get progress to next snapper drop.
 * @returns Number of fights completed (out of 11) to reach next drop.
 */

function getProgress() {
  return get("redSnapperProgress");
}
;// CONCATENATED MODULE: ./src/resources/2020/Cartography.ts
var Cartography_templateObject, Cartography_templateObject2, Cartography_templateObject3;

function Cartography_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var passive = $skill(Cartography_templateObject || (Cartography_templateObject = Cartography_taggedTemplateLiteral(["Comprehensive Cartography"])));
var skill = $skill(Cartography_templateObject2 || (Cartography_templateObject2 = Cartography_taggedTemplateLiteral(["Map the Monsters"])));
function Cartography_have() {
  return have(passive);
}
function mapMonster(location, monster) {
  if (!Cartography_have()) return false;
  if (get("_monstersMapped") >= 3) return false;
  if (!(0,external_kolmafia_namespaceObject.canAdventure)(location)) return false;
  (0,external_kolmafia_namespaceObject.useSkill)($skill(Cartography_templateObject3 || (Cartography_templateObject3 = Cartography_taggedTemplateLiteral(["Map the Monsters"]))));
  if (!get("mappingMonsters")) return false;
  var turns = (0,external_kolmafia_namespaceObject.myTurncount)();

  while ((0,external_kolmafia_namespaceObject.currentRound)() < 1) {
    // Not in combat
    if ((0,external_kolmafia_namespaceObject.myTurncount)() > turns) {
      throw new Error("Map the Monsters unsuccessful?");
    }

    (0,external_kolmafia_namespaceObject.visitUrl)((0,external_kolmafia_namespaceObject.toUrl)(location));

    if ((0,external_kolmafia_namespaceObject.handlingChoice)() && (0,external_kolmafia_namespaceObject.lastChoice)() === 1435) {
      (0,external_kolmafia_namespaceObject.runChoice)(1, "heyscriptswhatsupwinkwink=".concat(monster.id));
      return true;
    } else {
      (0,external_kolmafia_namespaceObject.runChoice)(-1, false);
    }
  }

  return false;
}
// EXTERNAL MODULE: ./node_modules/lodash/maxBy.js
var maxBy = __webpack_require__(4378);
var maxBy_default = /*#__PURE__*/__webpack_require__.n(maxBy);
;// CONCATENATED MODULE: ./src/resources/2020/Guzzlr.ts
var Guzzlr_templateObject, Guzzlr_templateObject2, Guzzlr_templateObject3, Guzzlr_templateObject4, Guzzlr_templateObject5, Guzzlr_templateObject6, Guzzlr_templateObject7, Guzzlr_templateObject8, Guzzlr_templateObject9, Guzzlr_templateObject10, Guzzlr_templateObject11, Guzzlr_templateObject12, Guzzlr_templateObject13, Guzzlr_templateObject14, Guzzlr_templateObject15;

function Guzzlr_toConsumableArray(arr) { return Guzzlr_arrayWithoutHoles(arr) || Guzzlr_iterableToArray(arr) || Guzzlr_unsupportedIterableToArray(arr) || Guzzlr_nonIterableSpread(); }

function Guzzlr_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Guzzlr_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Guzzlr_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Guzzlr_arrayLikeToArray(o, minLen); }

function Guzzlr_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Guzzlr_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Guzzlr_arrayLikeToArray(arr); }

function Guzzlr_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Guzzlr_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Guzzlr_item = $item(Guzzlr_templateObject || (Guzzlr_templateObject = Guzzlr_taggedTemplateLiteral(["Guzzlr tablet"])));
function Guzzlr_have() {
  return have(Guzzlr_item);
}

function useTabletWithChoice(option) {
  withChoice(1412, option, () => (0,external_kolmafia_namespaceObject.use)(1, Guzzlr_item));
}

function isQuestActive() {
  return get("questGuzzlr") !== "unstarted";
}
/**
 * Platinum deliveries completed overall
 */

function getPlatinum() {
  return get("guzzlrPlatinumDeliveries");
}
/**
 * Platinum deliveries completed today
 */

function getPlatinumToday() {
  return get("_guzzlrPlatinumDeliveries");
}
/**
 * Can do a platinum delivery (haven't done one today)
 */

function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
/**
 * Accept platinum delivery
 */

function acceptPlatinum() {
  if (!canPlatinum()) return false;
  useTabletWithChoice(4);
  return true;
}
/**
 * Gold deliveries completed overall
 */

function getGold() {
  return get("guzzlrGoldDeliveries");
}
/**
 * Gold deliveries completed today
 */

function getGoldToday() {
  return get("_guzzlrGoldDeliveries");
}
/**
 * Can do a gold delivery (have done fewer than 3 today)
 */

function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullGoldBonus() {
  return getGold() >= 150;
}
/**
 * Accept gold delivery
 */

function acceptGold() {
  if (!canGold()) return false;
  useTabletWithChoice(3);
  return true;
}
/**
 * Bronze deliveries completed overall
 */

function getBronze() {
  return get("guzzlrBronzeDeliveries");
}
/**
 * Accept bronze delivery
 */

function acceptBronze() {
  if (isQuestActive()) return false;
  useTabletWithChoice(2);
  return true;
}
/**
 * Have fully unlocked the platinum delivery bonuses (done >= 30)
 */

function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
/**
 * Can abandon the current Guzzlr quest
 */

function canAbandon() {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}
/**
 * Abandon Guzzlr quest
 */

function abandon() {
  if (!canAbandon()) return false;
  (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?tap=guzzlr", false);
  (0,external_kolmafia_namespaceObject.runChoice)(1);
  (0,external_kolmafia_namespaceObject.runChoice)(5);
  return true;
}
/**
 * Get current Guzzlr quest location
 */

function Guzzlr_getLocation() {
  return get("guzzlrQuestLocation");
}
/**
 * Get current Guzzlr quest tier
 */

function getTier() {
  var tier = get("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
/**
 * Get current Guzzlr quest booze
 */

function getBooze() {
  var booze = get("guzzlrQuestBooze");
  if (booze === "") return null;
  return external_kolmafia_namespaceObject.Item.get(booze);
}
/**
 * List of the platinum cocktails
 */

var Cocktails = $items(Guzzlr_templateObject2 || (Guzzlr_templateObject2 = Guzzlr_taggedTemplateLiteral(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
/**
 * Returns true if the user has a platinum cocktail in their inventory
 */

function havePlatinumBooze() {
  return Cocktails.some(cock => have(cock));
}
/**
 * Returns true if the user has the cocktail that they need for their current quest
 *
 * If they have no quest, returns false
 */

function haveBooze() {
  var booze = getBooze();

  switch (booze) {
    case null:
      return false;

    case $item(Guzzlr_templateObject3 || (Guzzlr_templateObject3 = Guzzlr_taggedTemplateLiteral(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();

    default:
      return have(booze);
  }
}
var ingredientToPlatinumCocktail = new Map([[$item(Guzzlr_templateObject4 || (Guzzlr_templateObject4 = Guzzlr_taggedTemplateLiteral(["miniature boiler"]))), $item(Guzzlr_templateObject5 || (Guzzlr_templateObject5 = Guzzlr_taggedTemplateLiteral(["Steamboat"])))], [$item(Guzzlr_templateObject6 || (Guzzlr_templateObject6 = Guzzlr_taggedTemplateLiteral(["cold wad"]))), $item(Guzzlr_templateObject7 || (Guzzlr_templateObject7 = Guzzlr_taggedTemplateLiteral(["Ghiaccio Colada"])))], [$item(Guzzlr_templateObject8 || (Guzzlr_templateObject8 = Guzzlr_taggedTemplateLiteral(["robin's egg"]))), $item(Guzzlr_templateObject9 || (Guzzlr_templateObject9 = Guzzlr_taggedTemplateLiteral(["Nog-on-the-Cob"])))], [$item(Guzzlr_templateObject10 || (Guzzlr_templateObject10 = Guzzlr_taggedTemplateLiteral(["mangled finger"]))), $item(Guzzlr_templateObject11 || (Guzzlr_templateObject11 = Guzzlr_taggedTemplateLiteral(["Sourfinger"])))], [$item(Guzzlr_templateObject12 || (Guzzlr_templateObject12 = Guzzlr_taggedTemplateLiteral(["Dish of Clarified Butter"]))), $item(Guzzlr_templateObject13 || (Guzzlr_templateObject13 = Guzzlr_taggedTemplateLiteral(["Buttery Boy"])))]]);
var platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var defaultCocktail = [$item(Guzzlr_templateObject14 || (Guzzlr_templateObject14 = Guzzlr_taggedTemplateLiteral(["Dish of Clarified Butter"]))), $item(Guzzlr_templateObject15 || (Guzzlr_templateObject15 = Guzzlr_taggedTemplateLiteral(["Buttery Boy"])))];

  if (freeCraft) {
    var _maxBy;

    return ((_maxBy = maxBy_default()(Array.from(ingredientToPlatinumCocktail), ingredientAndCocktail => Math.max.apply(Math, Guzzlr_toConsumableArray(ingredientAndCocktail.map(item => -(0,external_kolmafia_namespaceObject.mallPrice)(item)))))) !== null && _maxBy !== void 0 ? _maxBy : defaultCocktail)[1];
  } else {
    var _maxBy2;

    return ((_maxBy2 = maxBy_default()(Array.from(ingredientToPlatinumCocktail), ingredientAndCocktail => -(0,external_kolmafia_namespaceObject.mallPrice)(ingredientAndCocktail[1]))) !== null && _maxBy2 !== void 0 ? _maxBy2 : defaultCocktail)[1];
  }
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  switch (getTier()) {
    case "platinum":
      // 20-25
      return 22.5 + (usePants ? 5 : 0);

    case "gold":
      // 5-7
      return 6 + (usePants ? 3 : 0);

    case "bronze":
      // 2-4
      return 3 + (usePants ? 3 : 0);

    default:
      return 0;
  }
}
;// CONCATENATED MODULE: ./src/resources/2020/RetroCape.ts
var RetroCape_templateObject, RetroCape_templateObject2, RetroCape_templateObject3, RetroCape_templateObject4, RetroCape_templateObject5, RetroCape_templateObject6, RetroCape_templateObject7, RetroCape_templateObject8, RetroCape_templateObject9, RetroCape_templateObject10, RetroCape_templateObject11, RetroCape_templateObject12, RetroCape_templateObject13;

function RetroCape_toConsumableArray(arr) { return RetroCape_arrayWithoutHoles(arr) || RetroCape_iterableToArray(arr) || RetroCape_unsupportedIterableToArray(arr) || RetroCape_nonIterableSpread(); }

function RetroCape_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function RetroCape_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return RetroCape_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RetroCape_arrayLikeToArray(o, minLen); }

function RetroCape_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function RetroCape_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return RetroCape_arrayLikeToArray(arr); }

function RetroCape_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function RetroCape_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function RetroCape_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? RetroCape_ownKeys(Object(source), !0).forEach(function (key) { RetroCape_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : RetroCape_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function RetroCape_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function RetroCape_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var RetroCape_item = $item(RetroCape_templateObject || (RetroCape_templateObject = RetroCape_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])));
/**
 * Determines whether you have() the Retro Cape.
 * @returns Whether you have the Retro Cape available.
 */

function RetroCape_have() {
  return have(RetroCape_item);
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
};
var currentHero = () => get("retroCapeSuperhero");
var currentMode = () => get("retroCapeWashingInstructions");
var modeMap = new Map([[["vampire", "hold"], {
  "Hot Resistance": 3,
  "Cold Resistance": 3,
  "Stench Resistance": 3,
  "Spooky Resistance": 3,
  "Sleaze Resistance": 3
}], [["vampire", "thrill"], {
  "Muscle Experience": 3
}], [["vampire", "kiss"], {
  Skill: $skill(RetroCape_templateObject2 || (RetroCape_templateObject2 = RetroCape_taggedTemplateLiteral(["Smooch of the Daywalker"])))
}], [["vampire", "kill"], {
  Skill: $skill(RetroCape_templateObject3 || (RetroCape_templateObject3 = RetroCape_taggedTemplateLiteral(["Slay the Dead"])))
}], [["heck", "thrill"], {
  "Mysticality Experience": 3
}], [["heck", "kiss"], {
  Skill: $skill(RetroCape_templateObject4 || (RetroCape_templateObject4 = RetroCape_taggedTemplateLiteral(["Unleash the Devil's Kiss"])))
}], [["robot", "hold"], {
  Skill: $skill(RetroCape_templateObject5 || (RetroCape_templateObject5 = RetroCape_taggedTemplateLiteral(["Deploy Robo-Handcuffs"])))
}], [["robot", "thrill"], {
  "Moxie Experience": 3
}], [["robot", "kiss"], {
  Skill: $skill(RetroCape_templateObject6 || (RetroCape_templateObject6 = RetroCape_taggedTemplateLiteral(["Blow a Robo-Kiss"])))
}], [["robot", "kill"], {
  Skill: $skill(RetroCape_templateObject7 || (RetroCape_templateObject7 = RetroCape_taggedTemplateLiteral(["Precision Shot"])))
}]]);
/**
 * Tunes retro cape to a given setting
 * @param hero The Superhero to set it to
 * @param mode The washing instructions to set it to
 * @returns Whether we successfully tuned the Retro Cape.
 */

function RetroCape_set(hero, mode) {
  if (!RetroCape_have()) return false;
  if (currentHero() === hero && currentMode() === mode) return true;
  (0,external_kolmafia_namespaceObject.cliExecute)("retrocape ".concat(hero, " ").concat(mode));
  return currentHero() === hero && currentMode() === mode;
}
/**
 * Returns the expected Modifiers of the Retro Cape for a particular setting
 * @param hero The Superhero setting
 * @param mode The washing instructions setting
 * @returns A Modifiers object describing the Retro Cape were it to be tuned to that setting.
 */

function getModifier() {
  var _modeMap$get;

  var hero = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentHero();
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentMode();
  return RetroCape_objectSpread(RetroCape_objectSpread({}, Heroes[hero]), (_modeMap$get = modeMap.get([hero, mode])) !== null && _modeMap$get !== void 0 ? _modeMap$get : {});
}
var skills = new Map([[$skill(RetroCape_templateObject8 || (RetroCape_templateObject8 = RetroCape_taggedTemplateLiteral(["Smooch of the Daywalker"]))), ["vampire", "kiss"]], [$skill(RetroCape_templateObject9 || (RetroCape_templateObject9 = RetroCape_taggedTemplateLiteral(["Slay the Dead"]))), ["vampire", "kill"]], [$skill(RetroCape_templateObject10 || (RetroCape_templateObject10 = RetroCape_taggedTemplateLiteral(["Unleash the Devil's Kiss"]))), ["heck", "kiss"]], [$skill(RetroCape_templateObject11 || (RetroCape_templateObject11 = RetroCape_taggedTemplateLiteral(["Deploy Robo-Handcuffs"]))), ["robot", "hold"]], [$skill(RetroCape_templateObject12 || (RetroCape_templateObject12 = RetroCape_taggedTemplateLiteral(["Blow a Robo-Kiss"]))), ["robot", "kiss"]], [$skill(RetroCape_templateObject13 || (RetroCape_templateObject13 = RetroCape_taggedTemplateLiteral(["Precision Shot"]))), ["robot", "kill"]]]);
/**
 * Tunes the Retro Cape to allow it to grant a particular skill.
 * @param skill The skill to tune the Retro Cape to.
 * @returns Whether we successfully tuned the cape.
 */

function tuneToSkill(skill) {
  var setting = skills.get(skill);
  if (!setting || !RetroCape_have()) return false;
  RetroCape_set.apply(void 0, RetroCape_toConsumableArray(setting));
  return [currentHero(), currentMode()].every((element, index) => element === setting[index]);
}
;// CONCATENATED MODULE: ./src/resources/2021/CrystalBall.ts
function CrystalBall_slicedToArray(arr, i) { return CrystalBall_arrayWithHoles(arr) || CrystalBall_iterableToArrayLimit(arr, i) || CrystalBall_unsupportedIterableToArray(arr, i) || CrystalBall_nonIterableRest(); }

function CrystalBall_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CrystalBall_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CrystalBall_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CrystalBall_arrayLikeToArray(o, minLen); }

function CrystalBall_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CrystalBall_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CrystalBall_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var orb = external_kolmafia_namespaceObject.Item.get("miniature crystal ball");
function CrystalBall_have() {
  return (0,external_kolmafia_namespaceObject.availableAmount)(orb) > 0;
}

var parsedProp = () => get("crystalBallPredictions").split("|").map(element => element.split(":")).map(_ref => {
  var _ref2 = CrystalBall_slicedToArray(_ref, 3),
      location = _ref2[1],
      monster = _ref2[2];

  return [(0,external_kolmafia_namespaceObject.toLocation)(location), (0,external_kolmafia_namespaceObject.toMonster)(monster)];
});
/**
 * Ponders your orb (if it is able to do so safely) and then returns a Map keyed by location consisting of extant predictions
 * @returns A map of all predictions currently active in an adventurer's miniature crystal ball, after visiting the "ponder" URL to refresh them.
 */


function ponder() {
  if (!CrystalBall_have()) return new Map();
  if (canVisitUrl()) (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?ponder=1", false);
  return new Map(parsedProp());
}
;// CONCATENATED MODULE: ./src/resources/2021/DaylightShavings.ts
var DaylightShavings_templateObject, DaylightShavings_templateObject2;

function DaylightShavings_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var helmet = $item(DaylightShavings_templateObject || (DaylightShavings_templateObject = DaylightShavings_taggedTemplateLiteral(["Daylight Shavings Helmet"])));
/**
 * Returns whether the player owns an unpackaged Daylight Shavings Helmet, and it's available in either the inventory or other zones as determined by autoSatisfy settings.
 * @returns whether we have the Daylight Shavings Helmet.
 */

function DaylightShavings_have() {
  return have(helmet);
}
var buffs = $effects(DaylightShavings_templateObject2 || (DaylightShavings_templateObject2 = DaylightShavings_taggedTemplateLiteral(["Spectacle Moustache, Toiletbrush Moustache, Barbell Moustache, Grizzly Beard, Surrealist's Moustache, Musician's Musician's Moustache, Gull-Wing Moustache, Space Warlord's Beard, Pointy Wizard Beard, Cowboy Stache, Friendly Chops"])));
/**
 * Tells you whether you currently have a beardbuff active. Warning: because of spaghetti, this does not determine buff eligibility.
 * @returns Whether you currently have a beardbuff active
 */

function hasBuff() {
  return buffs.some(buff => have(buff));
}
/**
 * Checks to see if there are any beardbuffs you have more than 1 turn of, determining whether you are eligible to receive a buff post-combat.
 * @returns Whether you current are able to get a buff from the Daylight Shaving Helmet.
 */

function buffAvailable() {
  return !buffs.some(buff => have(buff, 2));
}
/**
 * Calculates and returns the cycle of buffs that the hat should cycle through.
 * @param playerclass The class to generate a cycle for
 * @returns An ordered array consisting of the cycle for this class. The first element of the array will be the first buff a player should expect to get in a given ascension.
 */

function buffCycle() {
  var playerclass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myClass)();
  if ((0,external_kolmafia_namespaceObject.toInt)(playerclass) <= 0) return [];
  var returnValue = [];
  var id = (0,external_kolmafia_namespaceObject.toInt)(playerclass);
  var seed = id > 6 ? id % 6 + 1 : id;

  for (var i = 1; i < 12; i++) {
    var index = i * seed % 11;
    returnValue.push(buffs[index]);
  }

  return returnValue;
}
/**
 * Returns the next buff we expect to get from the shaving hat.
 * @returns The next buff we expect to get from the shaving hat.
 */

function nextBuff() {
  var currentBuff = (0,external_kolmafia_namespaceObject.toEffect)(get("lastBeardBuff").toFixed(0));
  var cycle = buffCycle();
  var index = cycle.indexOf(currentBuff);
  var newIndex = (1 + index) % 11;
  return cycle[newIndex];
}
/**
 * Returns the number of buffs we expect it'll take to get to a given buff. Returns 1 for the next buff, 2 for the one after that, and so on. Returns 11 for the most recent buff.
 * @param buff The shaving buff in question
 * @returns The number of buffs we expect it'll take to get to the inputted buff; null if said buff is not granted by the shaving hat.
 */

function buffsUntil(buff) {
  if (!buffs.includes(buff)) return null;
  var currentIndex = buffs.indexOf(nextBuff()) - 1;
  var newIndex = buffs.indexOf(buff);
  var diff = (newIndex - currentIndex) % 11;
  return diff === 0 ? 11 : diff;
}
;// CONCATENATED MODULE: ./src/resources/2022/AutumnAton.ts


var AutumnAton_item = external_kolmafia_namespaceObject.Item.get("autumn-aton");
/**
 * Is the autumn-aton currently in your inventory, available to deploy?
 */

function AutumnAton_available() {
  return (0,external_kolmafia_namespaceObject.availableAmount)(AutumnAton_item) > 0;
}
/**
 * Do you own the autumn-aton?
 */

function AutumnAton_have() {
  return get("hasAutumnaton") || AutumnAton_available();
}

function checkLocations(html) {
  return (0,external_kolmafia_namespaceObject.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(name => (0,external_kolmafia_namespaceObject.toLocation)(name));
}

var use = () => (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&whichitem=10954");
/**
 * @returns The current location the autumn-aton is questing in; null if it is not on a quest.
 */


function currentlyIn() {
  return get("autumnatonQuestLocation");
}
/**
 * Deploy the autumn-aton to a location of your choosing.
 * @param target A location to send the autumn-aton to, or a prioritized list of locations to send it to, or a function to pick which location to send it to.
 * @param upgrade Should we apply any upgrades we see available?
 * @returns Where we ended up sending the autumn-aton; null if we didn't send it off.
 */

function sendTo(target) {
  var upgrade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!AutumnAton_available()) return null;
  var pageHtml = use();
  if (upgrade && (0,external_kolmafia_namespaceObject.availableChoiceOptions)()[1]) (0,external_kolmafia_namespaceObject.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml);
  var location = target instanceof external_kolmafia_namespaceObject.Location ? target : Array.isArray(target) ? target.find(l => locationsAvailable.includes(l)) : target(locationsAvailable);
  if (!location) return null;
  if (!locationsAvailable.includes(location)) return null;
  (0,external_kolmafia_namespaceObject.runChoice)(2, "heythereprogrammer=".concat(location.id));
  if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  return location;
}
/**
 * Install any available upgrades for the autumn-aton.
 * @returns Whether there were any upgrades to install.
 */

function upgrade() {
  use();
  var canUpgrade = (0,external_kolmafia_namespaceObject.availableChoiceOptions)()[1] !== undefined;
  if (canUpgrade) (0,external_kolmafia_namespaceObject.runChoice)(1);
  (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  return canUpgrade;
}
/**
 * @returns A list of all locations you can send your autumn-aton to right now. Empty if you are unable to send it anywhere.
 */

function availableLocations() {
  if (!AutumnAton_available()) return [];
  var pageHtml = use();
  (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
  return checkLocations(pageHtml);
}
/**
 * The mafia names for the autumn-aton upgrades
 */

var possibleUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"];

/**
 * @returns An array containing the upgrades that you currently have on your autumn-aton.
 */
function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
/**
 * @returns The number of turns remaining in your current autumn-aton quest. This number may be negative for any number of reasons.
 */

function turnsLeft() {
  return get("autumnatonQuestTurn") - (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();
}
/**
 * @returns The number of turns we expect your next autumn-aton quest to take.
 */

function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - currentUpgrades().filter(u => u.includes("leg")).length);
}
/**
 * @returns The current visual acuity level of your autumn-aton as determined by the current upgrade-state.
 */

function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(u => visualUpgrades.includes(u)).length;
}
/**
 * @returns The number of items from a zone we expect the autumn-aton to steal based on the current upgrade-state. It may not succeed in stealing every item it can.
 */

function zoneItems() {
  return 3 + currentUpgrades().filter(u => u.includes("arm")).length;
}
/**
 * @returns The number of seasonal items we expect the autumn-aton to return with given its current upgrade-state.
 */

function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
;// CONCATENATED MODULE: ./src/resources/2022/CombatLoversLocket.ts
var CombatLoversLocket_templateObject;

function CombatLoversLocket_slicedToArray(arr, i) { return CombatLoversLocket_arrayWithHoles(arr) || CombatLoversLocket_iterableToArrayLimit(arr, i) || CombatLoversLocket_unsupportedIterableToArray(arr, i) || CombatLoversLocket_nonIterableRest(); }

function CombatLoversLocket_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CombatLoversLocket_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CombatLoversLocket_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CombatLoversLocket_arrayLikeToArray(o, minLen); }

function CombatLoversLocket_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CombatLoversLocket_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CombatLoversLocket_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CombatLoversLocket_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = $item(CombatLoversLocket_templateObject || (CombatLoversLocket_templateObject = CombatLoversLocket_taggedTemplateLiteral(["Combat Lover's Locket"])));
function CombatLoversLocket_have() {
  return have(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries((0,external_kolmafia_namespaceObject.getLocketMonsters)()).filter(_ref => {
    var _ref2 = CombatLoversLocket_slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = CombatLoversLocket_slicedToArray(_ref3, 1),
        name = _ref4[0];

    return (0,external_kolmafia_namespaceObject.toMonster)(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map(_ref5 => {
    var _ref6 = CombatLoversLocket_slicedToArray(_ref5, 1),
        name = _ref6[0];

    return (0,external_kolmafia_namespaceObject.toMonster)(name);
  });
}

function parseLocketProperty() {
  return get("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return CombatLoversLocket_have() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => (0,external_kolmafia_namespaceObject.toMonster)(id));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0 || !(0,external_kolmafia_namespaceObject.getLocketMonsters)()[monster.name]) {
    return false;
  }

  (0,external_kolmafia_namespaceObject.cliExecute)("reminisce ".concat(monster));
  (0,external_kolmafia_namespaceObject.runCombat)();
  return monstersReminisced().includes(monster);
}
/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return options.reduce((a, b) => value(a) > value(b) ? a : b);
}
;// CONCATENATED MODULE: ./src/resources/2022/GreyGoose.ts
var GreyGoose_templateObject, GreyGoose_templateObject2, GreyGoose_templateObject3, GreyGoose_templateObject4;

function GreyGoose_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var goose = $familiar(GreyGoose_templateObject || (GreyGoose_templateObject = GreyGoose_taggedTemplateLiteral(["Grey Goose"])));
function GreyGoose_have() {
  return have(goose);
}
function currentExperience() {
  return goose.experience || have($familiar(GreyGoose_templateObject2 || (GreyGoose_templateObject2 = GreyGoose_taggedTemplateLiteral(["Shorter-Order Cook"])))) && !get("gooseReprocessed") ? 81 + (have($item(GreyGoose_templateObject3 || (GreyGoose_templateObject3 = GreyGoose_taggedTemplateLiteral(["blue plate"])))) ? 19 : 0) : 0;
}
function currentWeight() {
  return Math.min(Math.floor(Math.sqrt(currentExperience())), 20);
}
function expectedDrones() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentWeight();
  return Math.max(0, weight - 5);
}
/**
 * @param weight The goose weight you care about; defaults to current weight
 * @returns In Grey You, returns the fullstats you'll gain from goose levelling; outside Grey You, returns substats
 */

function expectedExperience() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.myClass)()) === 27 ? 2 : 3);
}
function expectedMeat() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentWeight();
  return Math.pow(Math.max(weight - 5, 0), 4);
}
function hasMeatified() {
  return get("_meatifyMatterUsed");
}
function fightsUntil(target) {
  var bonusExperience = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : modifier_get("Familiar Experience");
  var diff = target - currentWeight();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1 + bonusExperience + (have($skill(GreyGoose_templateObject4 || (GreyGoose_templateObject4 = GreyGoose_taggedTemplateLiteral(["Testudinal Teachings"])))) ? 1 / 6 : 0)));
}
function currentDrones() {
  return get("gooseDronesRemaining");
}
;// CONCATENATED MODULE: ./src/resources/2022/JuneCleaver.ts


var cleaver = (0,external_kolmafia_namespaceObject.toItem)("June cleaver");
function JuneCleaver_have() {
  return (0,external_kolmafia_namespaceObject.availableAmount)(cleaver) > 0;
}
/**
 * @returns The number of cleaver-combats it takes to get a particular encounter number--this is agnostic of your current fights.
 */

function getInterval() {
  var _encounters;

  var encounters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters = [1, 6, 10, 12, 15, 20][encounters]) !== null && _encounters !== void 0 ? _encounters : 30;
}
/**
 * @returns The number of cleaver-combats it would take to get a particular encounter after skipping.
 */

function getSkippedInterval() {
  var _encounters2;

  var encounters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters2 = [1, 2, 3, 3, 4, 5][encounters]) !== null && _encounters2 !== void 0 ? _encounters2 : 8;
}
/**
 * @returns The bonus damage your cleaver currently gives for a given element.
 */

function damage(element) {
  return get("_juneCleaver".concat(element));
}
/**
 * @returns The number of additional times you can select option 4 in a cleaver choice today.
 */

function skipsRemaining() {
  return 5 - get("_juneCleaverSkips");
}
var choices = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475];
/**
 * @returns An array consisting of the cleaver choice adventures currently in the queue.
 */

function queue() {
  return get("juneCleaverQueue").split(",").filter(x => x.trim().length > 0).map(x => parseInt(x));
}
/**
 * @returns An array consisting of the cleaver choice adventures not currently in the queue.
 */

function choicesAvailable() {
  var currentQueue = queue();
  return choices.filter(choice => !currentQueue.includes(choice));
}
;// CONCATENATED MODULE: ./src/resources/putty-likes.ts



function getTotalPuttyLikeCopiesMade() {
  return getSpookyPuttySheetCopiesMade() + getRainDohBlackBoxCopiesMade();
}
function couldUseRainDohBlackBox() {
  return RainDoh_have() && getRainDohBlackBoxCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var RainDohBlackBox = new Copier(() => couldUseRainDohBlackBox(), null, () => couldUseRainDohBlackBox(), () => getRainDohBlackBoxMonster(), () => useRainDohBlackBox());
function couldUseSpookyPuttySheet() {
  return SpookyPutty_have() && getSpookyPuttySheetCopiesMade() < 5 && getTotalPuttyLikeCopiesMade() < 6;
}
var SpookyPuttySheet = new Copier(() => couldUseSpookyPuttySheet(), () => prepareSpookyPuttySheet(), () => couldUseSpookyPuttySheet(), () => getSpookyPuttySheetMonster(), () => useSpookyPuttySheet());
;// CONCATENATED MODULE: ./src/resources/2007/CandyHearts.ts
var CandyHearts_templateObject, CandyHearts_templateObject2, CandyHearts_templateObject3, CandyHearts_templateObject4, CandyHearts_templateObject5, CandyHearts_templateObject6, CandyHearts_templateObject7;

function CandyHearts_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var CandyHearts_summonSkill = $skill(CandyHearts_templateObject || (CandyHearts_templateObject = CandyHearts_taggedTemplateLiteral(["Summon Candy Heart"])));
var libramChance = 1.0 / 6;
var libramExpected = new Map([[$item(CandyHearts_templateObject2 || (CandyHearts_templateObject2 = CandyHearts_taggedTemplateLiteral(["green candy heart"]))), libramChance], [$item(CandyHearts_templateObject3 || (CandyHearts_templateObject3 = CandyHearts_taggedTemplateLiteral(["lavender candy heart"]))), libramChance], [$item(CandyHearts_templateObject4 || (CandyHearts_templateObject4 = CandyHearts_taggedTemplateLiteral(["orange candy heart"]))), libramChance], [$item(CandyHearts_templateObject5 || (CandyHearts_templateObject5 = CandyHearts_taggedTemplateLiteral(["pink candy heart"]))), libramChance], [$item(CandyHearts_templateObject6 || (CandyHearts_templateObject6 = CandyHearts_taggedTemplateLiteral(["white candy heart"]))), libramChance], [$item(CandyHearts_templateObject7 || (CandyHearts_templateObject7 = CandyHearts_taggedTemplateLiteral(["yellow candy heart"]))), libramChance]]);
/**
 * @returns true if the player can Summon Candy Heart
 */

function CandyHearts_have() {
  return have(CandyHearts_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function expected() {
  return libramExpected;
}
;// CONCATENATED MODULE: ./src/resources/2008/DivineFavors.ts
var DivineFavors_templateObject, DivineFavors_templateObject2, DivineFavors_templateObject3, DivineFavors_templateObject4, DivineFavors_templateObject5, DivineFavors_templateObject6, DivineFavors_templateObject7;

function DivineFavors_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var DivineFavors_summonSkill = $skill(DivineFavors_templateObject || (DivineFavors_templateObject = DivineFavors_taggedTemplateLiteral(["Summon Party Favor"])));
/**
 * @returns true if the player can Summon Party Favors
 */

function DivineFavors_have() {
  return have(DivineFavors_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function DivineFavors_expected() {
  var rareSummons = get("_favorRareSummons");
  var totalRareChance = 1.0 / 2 ** (rareSummons + 1);
  var commonChance = (1.0 - totalRareChance) / 3;
  var rareChance = totalRareChance / 3;
  return new Map([[$item(DivineFavors_templateObject2 || (DivineFavors_templateObject2 = DivineFavors_taggedTemplateLiteral(["divine blowout"]))), commonChance], [$item(DivineFavors_templateObject3 || (DivineFavors_templateObject3 = DivineFavors_taggedTemplateLiteral(["divine can of silly string"]))), commonChance], [$item(DivineFavors_templateObject4 || (DivineFavors_templateObject4 = DivineFavors_taggedTemplateLiteral(["divine noisemaker"]))), commonChance], [$item(DivineFavors_templateObject5 || (DivineFavors_templateObject5 = DivineFavors_taggedTemplateLiteral(["divine champagne flute"]))), rareChance], [$item(DivineFavors_templateObject6 || (DivineFavors_templateObject6 = DivineFavors_taggedTemplateLiteral(["divine champagne popper"]))), rareChance], [$item(DivineFavors_templateObject7 || (DivineFavors_templateObject7 = DivineFavors_taggedTemplateLiteral(["divine cracker"]))), rareChance]]);
}
;// CONCATENATED MODULE: ./src/resources/2009/LoveSongs.ts
var LoveSongs_templateObject, LoveSongs_templateObject2, LoveSongs_templateObject3, LoveSongs_templateObject4, LoveSongs_templateObject5, LoveSongs_templateObject6, LoveSongs_templateObject7;

function LoveSongs_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var LoveSongs_summonSkill = $skill(LoveSongs_templateObject || (LoveSongs_templateObject = LoveSongs_taggedTemplateLiteral(["Summon Love Song"])));
var LoveSongs_libramChance = 1.0 / 6;
var LoveSongs_libramExpected = new Map([[$item(LoveSongs_templateObject2 || (LoveSongs_templateObject2 = LoveSongs_taggedTemplateLiteral(["love song of disturbing obsession"]))), LoveSongs_libramChance], [$item(LoveSongs_templateObject3 || (LoveSongs_templateObject3 = LoveSongs_taggedTemplateLiteral(["love song of icy revenge"]))), LoveSongs_libramChance], [$item(LoveSongs_templateObject4 || (LoveSongs_templateObject4 = LoveSongs_taggedTemplateLiteral(["love song of naughty innuendo"]))), LoveSongs_libramChance], [$item(LoveSongs_templateObject5 || (LoveSongs_templateObject5 = LoveSongs_taggedTemplateLiteral(["love song of smoldering passion"]))), LoveSongs_libramChance], [$item(LoveSongs_templateObject6 || (LoveSongs_templateObject6 = LoveSongs_taggedTemplateLiteral(["love song of sugary cuteness"]))), LoveSongs_libramChance], [$item(LoveSongs_templateObject7 || (LoveSongs_templateObject7 = LoveSongs_taggedTemplateLiteral(["love song of vague ambiguity"]))), LoveSongs_libramChance]]);
/**
 * @returns true if the player can Summon Love Song
 */

function LoveSongs_have() {
  return have(LoveSongs_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function LoveSongs_expected() {
  return LoveSongs_libramExpected;
}
;// CONCATENATED MODULE: ./src/resources/2010/Brickos.ts
var Brickos_templateObject, Brickos_templateObject2, Brickos_templateObject3;

function Brickos_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var Brickos_summonSkill = $skill(Brickos_templateObject || (Brickos_templateObject = Brickos_taggedTemplateLiteral(["Summon BRICKOs"])));
/**
 * @returns true if the player can Summon BRICKOs
 */

function Brickos_have() {
  return have(Brickos_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function Brickos_expected() {
  var eyeSummons = get("_brickoEyeSummons");
  var eyeChance = eyeSummons === 3 ? 0.0 : eyeSummons === 0 ? 0.5 : 1.0 / 3.0;
  return new Map([[$item(Brickos_templateObject2 || (Brickos_templateObject2 = Brickos_taggedTemplateLiteral(["BRICKO eye brick"]))), eyeChance], [$item(Brickos_templateObject3 || (Brickos_templateObject3 = Brickos_taggedTemplateLiteral(["BRICKO brick"]))), 3.0 - eyeChance]]);
}
;// CONCATENATED MODULE: ./src/resources/2011/Gygaxian.ts
var Gygaxian_templateObject, Gygaxian_templateObject2, Gygaxian_templateObject3, Gygaxian_templateObject4, Gygaxian_templateObject5, Gygaxian_templateObject6, Gygaxian_templateObject7;

function Gygaxian_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var Gygaxian_summonSkill = $skill(Gygaxian_templateObject || (Gygaxian_templateObject = Gygaxian_taggedTemplateLiteral(["Summon Dice"])));
var Gygaxian_libramChance = 1.0 / 6;
var Gygaxian_libramExpected = new Map([[$item(Gygaxian_templateObject2 || (Gygaxian_templateObject2 = Gygaxian_taggedTemplateLiteral(["d4"]))), Gygaxian_libramChance], [$item(Gygaxian_templateObject3 || (Gygaxian_templateObject3 = Gygaxian_taggedTemplateLiteral(["d6"]))), Gygaxian_libramChance], [$item(Gygaxian_templateObject4 || (Gygaxian_templateObject4 = Gygaxian_taggedTemplateLiteral(["d8"]))), Gygaxian_libramChance], [$item(Gygaxian_templateObject5 || (Gygaxian_templateObject5 = Gygaxian_taggedTemplateLiteral(["d10"]))), Gygaxian_libramChance], [$item(Gygaxian_templateObject6 || (Gygaxian_templateObject6 = Gygaxian_taggedTemplateLiteral(["d12"]))), Gygaxian_libramChance], [$item(Gygaxian_templateObject7 || (Gygaxian_templateObject7 = Gygaxian_taggedTemplateLiteral(["d20"]))), Gygaxian_libramChance]]);
/**
 * @returns true if the player can Summon Dice
 */

function Gygaxian_have() {
  return have(Gygaxian_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function Gygaxian_expected() {
  return Gygaxian_libramExpected;
}
;// CONCATENATED MODULE: ./src/resources/2012/Resolutions.ts
var Resolutions_templateObject, Resolutions_templateObject2, Resolutions_templateObject3, Resolutions_templateObject4, Resolutions_templateObject5, Resolutions_templateObject6, Resolutions_templateObject7, Resolutions_templateObject8, Resolutions_templateObject9, Resolutions_templateObject10;

function Resolutions_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var Resolutions_summonSkill = $skill(Resolutions_templateObject || (Resolutions_templateObject = Resolutions_taggedTemplateLiteral(["Summon Resolutions"])));
var commonChance = 0.98 / 6;
var rareChance = 0.02 / 3;
var Resolutions_libramExpected = new Map([[$item(Resolutions_templateObject2 || (Resolutions_templateObject2 = Resolutions_taggedTemplateLiteral(["resolution: be feistier"]))), commonChance], [$item(Resolutions_templateObject3 || (Resolutions_templateObject3 = Resolutions_taggedTemplateLiteral(["resolution: be happier"]))), commonChance], [$item(Resolutions_templateObject4 || (Resolutions_templateObject4 = Resolutions_taggedTemplateLiteral(["resolution: be sexier"]))), commonChance], [$item(Resolutions_templateObject5 || (Resolutions_templateObject5 = Resolutions_taggedTemplateLiteral(["resolution: be smarter"]))), commonChance], [$item(Resolutions_templateObject6 || (Resolutions_templateObject6 = Resolutions_taggedTemplateLiteral(["resolution: be stronger"]))), commonChance], [$item(Resolutions_templateObject7 || (Resolutions_templateObject7 = Resolutions_taggedTemplateLiteral(["resolution: be wealthier"]))), commonChance], [$item(Resolutions_templateObject8 || (Resolutions_templateObject8 = Resolutions_taggedTemplateLiteral(["resolution: be kinder"]))), rareChance], [$item(Resolutions_templateObject9 || (Resolutions_templateObject9 = Resolutions_taggedTemplateLiteral(["resolution: be luckier"]))), rareChance], [$item(Resolutions_templateObject10 || (Resolutions_templateObject10 = Resolutions_taggedTemplateLiteral(["resolution: be more adventurous"]))), rareChance]]);
/**
 * @returns true if the player can Summon Resolutions
 */

function Resolutions_have() {
  return have(Resolutions_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function Resolutions_expected() {
  return Resolutions_libramExpected;
}
;// CONCATENATED MODULE: ./src/resources/2013/PulledTaffy.ts
var PulledTaffy_templateObject, PulledTaffy_templateObject2, PulledTaffy_templateObject3, PulledTaffy_templateObject4, PulledTaffy_templateObject5, PulledTaffy_templateObject6, PulledTaffy_templateObject7, PulledTaffy_templateObject8;

function PulledTaffy_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var PulledTaffy_summonSkill = $skill(PulledTaffy_templateObject || (PulledTaffy_templateObject = PulledTaffy_taggedTemplateLiteral(["Summon Taffy"])));
/**
 * @returns true if the player can Summon Taffy
 */

function PulledTaffy_have() {
  return have(PulledTaffy_summonSkill);
}
/**
 * @returns map containing the chance of an item to be summoned
 */

function PulledTaffy_expected() {
  var rareSummons = get("_taffyRareSummons");
  var yellowSummons = get("_taffyYellowSummons");
  var onlyYellow = yellowSummons === 0 && rareSummons === 3;
  var totalRareChance = rareSummons < 4 ? 1.0 / 2 ** (rareSummons + 1) : 0.0;
  var commonChance = (1.0 - totalRareChance) / 4;
  var rareChance = onlyYellow ? 0.0 : totalRareChance / (3 - get("_taffyYellowSummons"));
  var yellowChance = yellowSummons === 1 ? 0.0 : onlyYellow ? totalRareChance : rareChance;
  return new Map([[$item(PulledTaffy_templateObject2 || (PulledTaffy_templateObject2 = PulledTaffy_taggedTemplateLiteral(["pulled blue taffy"]))), commonChance], [$item(PulledTaffy_templateObject3 || (PulledTaffy_templateObject3 = PulledTaffy_taggedTemplateLiteral(["pulled orange taffy"]))), commonChance], [$item(PulledTaffy_templateObject4 || (PulledTaffy_templateObject4 = PulledTaffy_taggedTemplateLiteral(["pulled violet taffy"]))), commonChance], [$item(PulledTaffy_templateObject5 || (PulledTaffy_templateObject5 = PulledTaffy_taggedTemplateLiteral(["pulled red taffy"]))), commonChance], [$item(PulledTaffy_templateObject6 || (PulledTaffy_templateObject6 = PulledTaffy_taggedTemplateLiteral(["pulled indigo taffy"]))), rareChance], [$item(PulledTaffy_templateObject7 || (PulledTaffy_templateObject7 = PulledTaffy_taggedTemplateLiteral(["pulled green taffy"]))), rareChance], [$item(PulledTaffy_templateObject8 || (PulledTaffy_templateObject8 = PulledTaffy_taggedTemplateLiteral(["pulled yellow taffy"]))), yellowChance]]);
}
;// CONCATENATED MODULE: ./src/resources/LibramSummon.ts
function LibramSummon_slicedToArray(arr, i) { return LibramSummon_arrayWithHoles(arr) || LibramSummon_iterableToArrayLimit(arr, i) || LibramSummon_unsupportedIterableToArray(arr, i) || LibramSummon_nonIterableRest(); }

function LibramSummon_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function LibramSummon_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return LibramSummon_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return LibramSummon_arrayLikeToArray(o, minLen); }

function LibramSummon_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function LibramSummon_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function LibramSummon_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











/**
 *
 * @param summonSkill The libram summoning skill
 * @returns map containing the chance of an item to be summoned
 */

function expectedLibramSummon(summonSkill) {
  switch (summonSkill) {
    case CandyHearts_summonSkill:
      return expected();

    case DivineFavors_summonSkill:
      return DivineFavors_expected();

    case LoveSongs_summonSkill:
      return LoveSongs_expected();

    case Brickos_summonSkill:
      return Brickos_expected();

    case Gygaxian_summonSkill:
      return Gygaxian_expected();

    case Resolutions_summonSkill:
      return Resolutions_expected();

    case PulledTaffy_summonSkill:
      return PulledTaffy_expected();
  }

  return new Map();
}
/**
 *
 * @returns map containing the chance of items to be summoned for each libram summoning skill available
 */

function possibleLibramSummons() {
  var results = new Map();

  if (CandyHearts_have()) {
    results.set(CandyHearts_summonSkill, expected());
  }

  if (DivineFavors_have()) {
    results.set(DivineFavors_summonSkill, DivineFavors_expected());
  }

  if (LoveSongs_have()) {
    results.set(LoveSongs_summonSkill, LoveSongs_expected());
  }

  if (Brickos_have()) {
    results.set(Brickos_summonSkill, Brickos_expected());
  }

  if (Gygaxian_have()) {
    results.set(Gygaxian_summonSkill, Gygaxian_expected());
  }

  if (Resolutions_have()) {
    results.set(Resolutions_summonSkill, Resolutions_expected());
  }

  if (PulledTaffy_have()) {
    results.set(PulledTaffy_summonSkill, PulledTaffy_expected());
  }

  return results;
}
function bestLibramToCast() {
  var _maxBy;

  return ((_maxBy = maxBy_default()(Array.from(possibleLibramSummons().entries()), _ref => {
    var _ref2 = LibramSummon_slicedToArray(_ref, 2),
        itemMap = _ref2[1];

    return sumNumbers(Array.from(itemMap.entries()).map(_ref3 => {
      var _ref4 = LibramSummon_slicedToArray(_ref3, 2),
          item = _ref4[0],
          weight = _ref4[1];

      return weight * getSaleValue(item);
    }));
  })) !== null && _maxBy !== void 0 ? _maxBy : [null])[0];
}
;// CONCATENATED MODULE: ./src/resources/index.ts








































;// CONCATENATED MODULE: ./src/since.ts
function since_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function since_createClass(Constructor, protoProps, staticProps) { if (protoProps) since_defineProperties(Constructor.prototype, protoProps); if (staticProps) since_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function since_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function since_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) since_setPrototypeOf(subClass, superClass); }

function since_createSuper(Derived) { var hasNativeReflectConstruct = since_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = since_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = since_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return since_possibleConstructorReturn(this, result); }; }

function since_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return since_assertThisInitialized(self); }

function since_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function since_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; since_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !since_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return since_construct(Class, arguments, since_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return since_setPrototypeOf(Wrapper, Class); }; return since_wrapNativeSuper(Class); }

function since_construct(Parent, args, Class) { if (since_isNativeReflectConstruct()) { since_construct = Reflect.construct; } else { since_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) since_setPrototypeOf(instance, Class.prototype); return instance; }; } return since_construct.apply(null, arguments); }

function since_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function since_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function since_setPrototypeOf(o, p) { since_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return since_setPrototypeOf(o, p); }

function since_getPrototypeOf(o) { since_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return since_getPrototypeOf(o); }

/**
 * Provides functions for checking KoLmafia's version and revision.
 * @packageDocumentation
 */

/**
 * Represents an exception thrown when the current KoLmafia version does not
 * match an expected condition.
 */

var KolmafiaVersionError = /*#__PURE__*/function (_Error) {
  since_inherits(KolmafiaVersionError, _Error);

  var _super = since_createSuper(KolmafiaVersionError);

  function KolmafiaVersionError(message) {
    var _this;

    since_classCallCheck(this, KolmafiaVersionError);

    _this = _super.call(this, message); // Explicitly set the prototype, so that 'instanceof' still works in Node.js
    // even when the class is transpiled down to ES5
    // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Note that this code isn't needed for Rhino.

    Object.setPrototypeOf(since_assertThisInitialized(_this), KolmafiaVersionError.prototype);
    return _this;
  }

  return since_createClass(KolmafiaVersionError);
}( /*#__PURE__*/since_wrapNativeSuper(Error)); // Manually set class name, so that the stack trace shows proper name in Rhino

KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
/**
 * Returns the currently executing script name, suitable for embedding in an
 * error message.
 * @returns Path of the main script wrapped in single-quotes, or `"This script"`
 *    if the path cannot be determined
 */

function getScriptName() {
  var _require$main;

  // In Rhino, the current script name is available in require.main.id
  var scriptName = (_require$main = __webpack_require__.c[__webpack_require__.s]) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
/**
 * If KoLmafia's revision number is less than `revision`, throws an exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since rXXX;` statement in ASH.
 * @param revision Revision number
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's revision number is less than `revision`.
 * @throws {TypeError} If `revision` is not an integer
 *
 * @example
 * ```ts
 * // Throws if KoLmafia revision is less than r20500
 * sinceKolmafiaRevision(20500);
 * ```
 */


function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision)) {
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  } // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()


  var currentRevision = (0,external_kolmafia_namespaceObject.getRevision)();

  if (currentRevision > 0 && currentRevision < revision) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0,external_kolmafia_namespaceObject.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
/**
 * If KoLmafia's version is less than `majorVersion.minorVersion`, throws an
 * exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since X.Y;` statement in ASH.
 * @param majorVersion Major version number
 * @param minorVersion Minor version number
 * @deprecated Point versions are no longer released by KoLmafia
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's major version is less than `majorVersion`, or if the major
 *    versions are equal but the minor version is less than `minorVersion`
 * @throws {TypeError}
 *    If either `majorVersion` or `minorVersion` are not integers
 *
 * @example
 * ```ts
 * // Throws if KoLmafia version is less than 20.7
 * sinceKolmafiaVersion(20, 7);
 * ```
 */

function sinceKolmafiaVersion(majorVersion, minorVersion) {
  if ((0,external_kolmafia_namespaceObject.getRevision)() >= 25720) {
    return;
  }

  if (!Number.isInteger(majorVersion)) {
    throw new TypeError("Invalid major version number ".concat(majorVersion, " (must be an integer)"));
  }

  if (!Number.isInteger(minorVersion)) {
    throw new TypeError("Invalid minor version number ".concat(minorVersion, " (must be an integer)"));
  }

  if (majorVersion > 21 || majorVersion === 20 && minorVersion > 9) {
    throw new Error("There were no versions released after 21.09. This command will always fail");
  }

  var versionStr = (0,external_kolmafia_namespaceObject.getVersion)();
  var versionStrMatch = /v(\d+)\.(\d+)/.exec(versionStr);

  if (!versionStrMatch) {
    // This is not something the user should handle
    throw new Error("Unexpected KoLmafia version string: \"".concat(versionStr, "\". You may need to update the script."));
  }

  var currentMajorVersion = Number(versionStrMatch[1]);
  var currentMinorVersion = Number(versionStrMatch[2]); // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()

  if (currentMajorVersion < majorVersion || currentMajorVersion === majorVersion && currentMinorVersion < minorVersion) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires version ").concat(majorVersion, ".").concat(minorVersion, " of kolmafia or higher (current: ").concat(currentMajorVersion, ".").concat(currentMinorVersion, "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
;// CONCATENATED MODULE: ./src/Kmail.ts
function Kmail_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Kmail_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Kmail_toConsumableArray(arr) { return Kmail_arrayWithoutHoles(arr) || Kmail_iterableToArray(arr) || Kmail_unsupportedIterableToArray(arr) || Kmail_nonIterableSpread(); }

function Kmail_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Kmail_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function Kmail_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Kmail_arrayLikeToArray(arr); }

function Kmail_slicedToArray(arr, i) { return Kmail_arrayWithHoles(arr) || Kmail_iterableToArrayLimit(arr, i) || Kmail_unsupportedIterableToArray(arr, i) || Kmail_nonIterableRest(); }

function Kmail_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Kmail_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Kmail_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Kmail_arrayLikeToArray(o, minLen); }

function Kmail_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Kmail_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Kmail_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Kmail_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Kmail_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Kmail_createClass(Constructor, protoProps, staticProps) { if (protoProps) Kmail_defineProperties(Constructor.prototype, protoProps); if (staticProps) Kmail_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Kmail_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Kmail = /*#__PURE__*/function () {
  function Kmail(rawKmail) {
    Kmail_classCallCheck(this, Kmail);

    Kmail_defineProperty(this, "id", void 0);

    Kmail_defineProperty(this, "date", void 0);

    Kmail_defineProperty(this, "type", void 0);

    Kmail_defineProperty(this, "senderId", void 0);

    Kmail_defineProperty(this, "senderName", void 0);

    Kmail_defineProperty(this, "rawMessage", void 0);

    var date = new Date(rawKmail.localtime); // Date come from KoL formatted with YY and so will be parsed 19YY, which is wrong.
    // We can safely add 100 because if 19YY was a leap year, 20YY will be too!

    date.setFullYear(date.getFullYear() + 100);
    this.id = Number(rawKmail.id);
    this.date = date;
    this.type = rawKmail.type;
    this.senderId = Number(rawKmail.fromid);
    this.senderName = rawKmail.fromname;
    this.rawMessage = rawKmail.message;
  }
  /**
   * Delete the kmail
   *
   * @returns Whether the kmail was deleted
   */


  Kmail_createClass(Kmail, [{
    key: "delete",
    value: function _delete() {
      return Kmail.delete([this]) === 1;
    }
    /**
     * Message contents without any HTML from items or meat
     */

  }, {
    key: "message",
    get: function get() {
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
    value: function items() {
      return new Map(Object.entries((0,external_kolmafia_namespaceObject.extractItems)(this.rawMessage)).map(_ref => {
        var _ref2 = Kmail_slicedToArray(_ref, 2),
            itemName = _ref2[0],
            quantity = _ref2[1];

        return [external_kolmafia_namespaceObject.Item.get(itemName), quantity];
      }));
    }
    /**
     * Get meat attached to the kmail
     *
     * @returns Meat attached to the kmail
     */

  }, {
    key: "meat",
    value: function meat() {
      return (0,external_kolmafia_namespaceObject.extractMeat)(this.rawMessage);
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
    value: function reply() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var meat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return Kmail.send(this.senderId, message, items, meat);
    }
  }], [{
    key: "parse",
    value:
    /**
     * Parses a kmail from KoL's native format
     *
     * @param rawKmail Kmail in the format supplies by api.php
     * @returns Parsed kmail
     */
    function parse(rawKmail) {
      return new Kmail(rawKmail);
    }
    /**
     * Returns all of the player's kmails
     *
     * @param count Number of kmails to fetch
     * @returns Parsed kmails
     */

  }, {
    key: "inbox",
    value: function inbox() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      return JSON.parse((0,external_kolmafia_namespaceObject.visitUrl)("api.php?what=kmail&for=libram&count=".concat(count))).map(Kmail.parse);
    }
    /**
     * Bulk delete kmails
     *
     * @param kmails Kmails to delete
     * @returns Number of kmails deleted
     */

  }, {
    key: "delete",
    value: function _delete(kmails) {
      var _results$match$, _results$match;

      var results = (0,external_kolmafia_namespaceObject.visitUrl)("messages.php?the_action=delete&box=Inbox&pwd&".concat(kmails.map(k => "sel".concat(k.id, "=on")).join("&")));
      return Number((_results$match$ = (_results$match = results.match(/<td>(\d) messages? deleted.<\/td>/)) === null || _results$match === void 0 ? void 0 : _results$match[1]) !== null && _results$match$ !== void 0 ? _results$match$ : 0);
    }
  }, {
    key: "_genericSend",
    value: function _genericSend(to, message, items, meat, chunkSize, constructUrl, successString) {
      var m = meat;

      var sendableItems = Kmail_toConsumableArray(arrayToCountedMap(items).entries()).filter(_ref3 => {
        var _ref4 = Kmail_slicedToArray(_ref3, 1),
            item = _ref4[0];

        return (0,external_kolmafia_namespaceObject.isGiftable)(item);
      });

      var result = true;
      var chunks = chunk(sendableItems, chunkSize); // Split the items to be sent into chunks of max 11 item types

      var _iterator = Kmail_createForOfIteratorHelper(chunks.length > 0 ? chunks : [null]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;

          var _itemsQuery = c === null ? [] : c.map((_ref5, index) => {
            var _ref6 = Kmail_slicedToArray(_ref5, 2),
                item = _ref6[0],
                quantity = _ref6[1];

            return "whichitem".concat(index + 1, "=").concat((0,external_kolmafia_namespaceObject.toInt)(item), "&howmany").concat(index + 1, "=").concat(quantity);
          });

          var r = (0,external_kolmafia_namespaceObject.visitUrl)(constructUrl(m, _itemsQuery.join("&"), _itemsQuery.length));

          if (r.includes("That player cannot receive Meat or items")) {
            return Kmail.gift(to, message, items, meat);
          } // Make sure we don't send the same batch of meat with every chunk


          m = 0;
          result && (result = r.includes(successString));
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
    value: function send(to) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var meat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      return Kmail._genericSend(to, message, items, meat, 11, (meat, itemsQuery) => "sendmessage.php?action=send&pwd&towho=".concat(to, "&message=").concat(message).concat(itemsQuery ? "&".concat(itemsQuery) : "", "&sendmeat=").concat(meat), ">Message sent.</");
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
    value: function gift(to) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var meat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var insideNote = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      var baseUrl = "town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=".concat(message, "&insidenote=").concat(insideNote, "&towho=").concat(to);
      return Kmail._genericSend(to, message, items, meat, 3, (m, itemsQuery, chunkSize) => "".concat(baseUrl, "&whichpackage=").concat(chunkSize).concat(itemsQuery ? "&".concat(itemsQuery) : "", "&sendmeat=").concat(m), ">Package sent.</");
    }
  }]);

  return Kmail;
}();


;// CONCATENATED MODULE: ./src/Path.ts
var Path_templateObject, Path_templateObject2, Path_templateObject3, Path_templateObject4, Path_templateObject5, Path_templateObject6, Path_templateObject7, Path_templateObject8, Path_templateObject9, Path_templateObject10, Path_templateObject11;

function Path_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Path_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Path_createClass(Constructor, protoProps, staticProps) { if (protoProps) Path_defineProperties(Constructor.prototype, protoProps); if (staticProps) Path_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Path_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Path_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var Path = /*#__PURE__*/Path_createClass( //here, we define avatar-ness around being its own class
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
function Path(name, id) {
  var hasAllPerms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var canUseSkillbooks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var hasCampground = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var hasTerrarium = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var stomachSize = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 15;
  var liverSize = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 15;
  var spleenSize = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 15;
  var classes = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : $classes(Path_templateObject || (Path_templateObject = Path_taggedTemplateLiteral(["Seal Clubber, Turtle Tamer, Sauceror, Pastamancer, Disco Bandit, Accordion Thief"])));

  Path_classCallCheck(this, Path);

  Path_defineProperty(this, "name", void 0);

  Path_defineProperty(this, "id", void 0);

  Path_defineProperty(this, "hasAllPerms", void 0);

  Path_defineProperty(this, "canUseSkillbooks", void 0);

  Path_defineProperty(this, "hasCampground", void 0);

  Path_defineProperty(this, "hasTerrarium", void 0);

  Path_defineProperty(this, "stomachSize", void 0);

  Path_defineProperty(this, "liverSize", void 0);

  Path_defineProperty(this, "spleenSize", void 0);

  Path_defineProperty(this, "classes", void 0);

  this.name = name;
  this.id = id;
  this.hasAllPerms = hasAllPerms;
  this.canUseSkillbooks = canUseSkillbooks;
  this.hasCampground = hasCampground;
  this.hasTerrarium = hasTerrarium;
  this.stomachSize = stomachSize;
  this.liverSize = liverSize;
  this.spleenSize = spleenSize;
  this.classes = classes;
});
var Paths = {
  Unrestricted: new Path("Unrestricted", 0),
  Boozetafarian: new Path("Boozetafarian", 1, true, true, true, true, 0),
  Teetotaler: new Path("Teetotaler", 2, true, true, true, true, 15, 0),
  Oxygenarian: new Path("Oxygenarian", 3, true, true, true, true, 0, 0),
  BeesHateYou: new Path("Bees Hate You", 4),
  WayOfTheSurprisingFist: new Path("Way of the Surprising Fist", 6),
  Trendy: new Path("Trendy", 7),
  AvatarOfBoris: new Path("Avatar of Boris", 8, false, false, true, false, 20, 5, 15, $classes(Path_templateObject2 || (Path_templateObject2 = Path_taggedTemplateLiteral(["Avatar of Boris"])))),
  BugbearInvasion: new Path("Bugbear Invasion", 9),
  ZombieSlayer: new Path("Zombie Slayer", 10, false, false, true, true, 15, 5, 15, $classes(Path_templateObject3 || (Path_templateObject3 = Path_taggedTemplateLiteral(["Zombie Master"])))),
  ClassAct: new Path("Class Act", 11, false, false),
  AvatarofJarlsberg: new Path("Avatar of Jarlsberg", 12, false, false, true, false, 10, 10, 15, $classes(Path_templateObject4 || (Path_templateObject4 = Path_taggedTemplateLiteral(["Avatar of Jarlsberg"])))),
  Big: new Path("BIG!", 14),
  KolHs: new Path("KOLHS", 15),
  ClassAct2: new Path("Class Act II: A Class For Pigs", 16, false),
  AvatarofSneakyPete: new Path("Avatar of Sneaky Pete", 17, false, false, true, false, 5, 20, 15, $classes(Path_templateObject5 || (Path_templateObject5 = Path_taggedTemplateLiteral(["Avatar of Sneaky Pete"])))),
  SlowAndSteady: new Path("Slow and Steady", 18),
  HeavyRains: new Path("Heavy Rains", 19),
  Picky: new Path("Picky", 21, false, false),
  Standard: new Path("Standard", 22),
  ActuallyEdTheUndying: new Path("Actually Ed the Undying", 23, false, false, false, false, 0, 0, 5, $classes(Path_templateObject6 || (Path_templateObject6 = Path_taggedTemplateLiteral(["Ed the Undying"])))),
  OneCrazyRandomSummer: new Path("One Crazy Random Summer", 24),
  CommunityService: new Path("Community Service", 25),
  AvatarOfWestOfLoathing: new Path("Avatar of West of Loathing", 26, false, false, true, true, 10, 10, 10, $classes(Path_templateObject7 || (Path_templateObject7 = Path_taggedTemplateLiteral(["Cow Puncher, Snake Oiler, Beanslinger"])))),
  TheSource: new Path("The Source", 27),
  NuclearAutumn: new Path("Nuclear Autumn", 28, false, false, false, true, 3, 3, 3),
  GelatinousNoob: new Path("Gelatinous Noob", 29, false, false, true, true, 0, 0, 0, $classes(Path_templateObject8 || (Path_templateObject8 = Path_taggedTemplateLiteral(["Gelatinous Noob"])))),
  LicenseToAdventure: new Path("License to Adventure", 30, true, true, true, false, 0, 2, 15),
  //Unsure how to log liver size here
  LiveAscendRepeat: new Path("Live. Ascend. Repeat.", 31),
  PocketFamiliars: new Path("Pocket Familiars", 32, false, false, true, false),
  //This is my opinion on the matter
  GLover: new Path("G-Lover", 33),
  DisguisesDelimit: new Path("Disguises Delimit", 34),
  DarkGyffte: new Path("Dark Gyffte", 35, false, false, true, false, 5, 5, 15, $classes(Path_templateObject9 || (Path_templateObject9 = Path_taggedTemplateLiteral(["Vampyre"])))),
  TwoCrazyRandomSummer: new Path("Two Crazy Random Summer", 36),
  KingdomOfExploathing: new Path("Kingdom of Exploathing", 37),
  PathOfThePlumber: new Path("Path of the Plumber", 38, false, false, true, true, 20, 0, 5, $classes(Path_templateObject10 || (Path_templateObject10 = Path_taggedTemplateLiteral(["Plumber"])))),
  LowKeySummer: new Path("Low Key Summer", 39),
  GreyGoo: new Path("Grey Goo", 40),
  YouRobot: new Path("You, Robot", 41, false, false, false, true, 0, 0, 0),
  QuantumTerrarium: new Path("Quantum Terrarium", 42, true, true, true, false),
  Wildfire: new Path("Wildfire", 43),
  GreyYou: new Path("Grey You", 44, false, false, true, true, 0, 0, 0, // eslint-disable-next-line libram/verify-constants
  $classes(Path_templateObject11 || (Path_templateObject11 = Path_taggedTemplateLiteral(["Grey Goo"])))),
  Journeyman: new Path("Journeyman", 45, false, false)
};
;// CONCATENATED MODULE: ./src/console.ts


var logColor = color => function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var output = args.map(x => x.toString()).join(" ");

  if (color) {
    (0,external_kolmafia_namespaceObject.print)(output, color);
  } else {
    (0,external_kolmafia_namespaceObject.print)(output);
  }
};

var log = logColor();
var info = logColor("blue");
var warn = logColor("red");
var error = logColor("red");
;// CONCATENATED MODULE: ./src/session.ts
var session_templateObject, session_templateObject2, session_templateObject3, session_templateObject4, session_templateObject5, session_templateObject6, session_templateObject7, session_templateObject8, session_templateObject9, session_templateObject10, session_templateObject11, session_templateObject12, session_templateObject13, session_templateObject14, session_templateObject15, session_templateObject16, session_templateObject17, session_templateObject18, session_templateObject19, session_templateObject20, session_templateObject21, session_templateObject22, session_templateObject23, session_templateObject24, session_templateObject25, session_templateObject26, session_templateObject27, session_templateObject28, session_templateObject29, session_templateObject30;

function session_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function session_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function session_createClass(Constructor, protoProps, staticProps) { if (protoProps) session_defineProperties(Constructor.prototype, protoProps); if (staticProps) session_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function session_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function session_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = session_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function session_slicedToArray(arr, i) { return session_arrayWithHoles(arr) || session_iterableToArrayLimit(arr, i) || session_unsupportedIterableToArray(arr, i) || session_nonIterableRest(); }

function session_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function session_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function session_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function session_toConsumableArray(arr) { return session_arrayWithoutHoles(arr) || session_iterableToArray(arr) || session_unsupportedIterableToArray(arr) || session_nonIterableSpread(); }

function session_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function session_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return session_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return session_arrayLikeToArray(o, minLen); }

function session_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function session_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return session_arrayLikeToArray(arr); }

function session_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */

function mySessionItemsWrapper() {
  var manyToOne = (primary, mapped) => mapped.map(target => [target, primary]);

  var foldable = item => manyToOne(item, getFoldGroup(item));

  var itemMappings = new Map([].concat(session_toConsumableArray(foldable($item(session_templateObject || (session_templateObject = session_taggedTemplateLiteral(["liar's pants"]))))), session_toConsumableArray(foldable($item(session_templateObject2 || (session_templateObject2 = session_taggedTemplateLiteral(["ice pick"]))))), session_toConsumableArray(manyToOne($item(session_templateObject3 || (session_templateObject3 = session_taggedTemplateLiteral(["Spooky Putty sheet"]))), [$item(session_templateObject4 || (session_templateObject4 = session_taggedTemplateLiteral(["Spooky Putty monster"])))].concat(session_toConsumableArray(getFoldGroup($item(session_templateObject5 || (session_templateObject5 = session_taggedTemplateLiteral(["Spooky Putty sheet"])))))))), session_toConsumableArray(foldable($item(session_templateObject6 || (session_templateObject6 = session_taggedTemplateLiteral(["stinky cheese sword"]))))), session_toConsumableArray(foldable($item(session_templateObject7 || (session_templateObject7 = session_taggedTemplateLiteral(["naughty paper shuriken"]))))), session_toConsumableArray(foldable($item(session_templateObject8 || (session_templateObject8 = session_taggedTemplateLiteral(["Loathing Legion knife"]))))), session_toConsumableArray(foldable($item(session_templateObject9 || (session_templateObject9 = session_taggedTemplateLiteral(["deceased crimbo tree"]))))), session_toConsumableArray(foldable($item(session_templateObject10 || (session_templateObject10 = session_taggedTemplateLiteral(["makeshift turban"]))))), session_toConsumableArray(foldable($item(session_templateObject11 || (session_templateObject11 = session_taggedTemplateLiteral(["turtle wax shield"]))))), session_toConsumableArray(foldable($item(session_templateObject12 || (session_templateObject12 = session_taggedTemplateLiteral(["metallic foil bow"]))))), session_toConsumableArray(foldable($item(session_templateObject13 || (session_templateObject13 = session_taggedTemplateLiteral(["ironic moustache"]))))), session_toConsumableArray(foldable($item(session_templateObject14 || (session_templateObject14 = session_taggedTemplateLiteral(["bugged balaclava"]))))), session_toConsumableArray(foldable($item(session_templateObject15 || (session_templateObject15 = session_taggedTemplateLiteral(["toggle switch (Bartend)"]))))), session_toConsumableArray(foldable($item(session_templateObject16 || (session_templateObject16 = session_taggedTemplateLiteral(["mushroom cap"]))))), session_toConsumableArray(manyToOne($item(session_templateObject17 || (session_templateObject17 = session_taggedTemplateLiteral(["can of Rain-Doh"]))), $items(session_templateObject18 || (session_templateObject18 = session_taggedTemplateLiteral(["empty Rain-Doh can"]))))), session_toConsumableArray(manyToOne($item(session_templateObject19 || (session_templateObject19 = session_taggedTemplateLiteral(["meteorite fragment"]))), $items(session_templateObject20 || (session_templateObject20 = session_taggedTemplateLiteral(["meteorite earring, meteorite necklace, meteorite ring"]))))), session_toConsumableArray(manyToOne($item(session_templateObject21 || (session_templateObject21 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket"]))), $items(session_templateObject22 || (session_templateObject22 = session_taggedTemplateLiteral(["Sneaky Pete's leather jacket (collar popped)"]))))), session_toConsumableArray(manyToOne($item(session_templateObject23 || (session_templateObject23 = session_taggedTemplateLiteral(["Boris's Helm"]))), $items(session_templateObject24 || (session_templateObject24 = session_taggedTemplateLiteral(["Boris's Helm (askew)"]))))), session_toConsumableArray(manyToOne($item(session_templateObject25 || (session_templateObject25 = session_taggedTemplateLiteral(["Jarlsberg's pan"]))), $items(session_templateObject26 || (session_templateObject26 = session_taggedTemplateLiteral(["Jarlsberg's pan (Cosmic portal mode)"]))))), session_toConsumableArray(manyToOne($item(session_templateObject27 || (session_templateObject27 = session_taggedTemplateLiteral(["tiny plastic sword"]))), $items(session_templateObject28 || (session_templateObject28 = session_taggedTemplateLiteral(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), session_toConsumableArray(manyToOne($item(session_templateObject29 || (session_templateObject29 = session_taggedTemplateLiteral(["earthenware muffin tin"]))), $items(session_templateObject30 || (session_templateObject30 = session_taggedTemplateLiteral(["blueberry muffin, bran muffin, chocolate chip muffin"])))))));
  var inventory = new Map();

  for (var _i = 0, _Object$entries = Object.entries((0,external_kolmafia_namespaceObject.mySessionItems)()); _i < _Object$entries.length; _i++) {
    var _itemMappings$get, _inventory$get;

    var _Object$entries$_i = session_slicedToArray(_Object$entries[_i], 2),
        itemStr = _Object$entries$_i[0],
        quantity = _Object$entries$_i[1];

    var _item = (0,external_kolmafia_namespaceObject.toItem)(itemStr);

    var mappedItem = (_itemMappings$get = itemMappings.get(_item)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : _item;
    inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
  }

  return inventory;
}
/**
 * Performa a binary element-wise operation on two inventories
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @param commutative if true use the value of b for any items not in a. if false, ignore values not in a
 * @returns a new map representing the combined inventories
 */


function inventoryOperation(a, b, op, commutative) {
  // return every entry that is in a and not in b
  var difference = new Map();

  var _iterator = session_createForOfIteratorHelper(a.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _b$get;

      var _step$value = session_slicedToArray(_step.value, 2),
          _item3 = _step$value[0],
          _quantity = _step$value[1];

      var combinedQuantity = op(_quantity, (_b$get = b.get(_item3)) !== null && _b$get !== void 0 ? _b$get : 0);
      difference.set(_item3, combinedQuantity);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (commutative) {
    var _iterator2 = session_createForOfIteratorHelper(b.entries()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = session_slicedToArray(_step2.value, 2),
            _item2 = _step2$value[0],
            quantity = _step2$value[1];

        if (!a.has(_item2)) {
          difference.set(_item2, quantity);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var diffEntries = session_toConsumableArray(difference.entries());

  return new Map(diffEntries.filter(value => value[1] !== 0));
}
/**
 * An entry showing the value of each Item in a session
 * @member item the item associated with this detail
 * @member value the numeric value of the full quantity of items (to get value of each item, do value / quantity) (can be negative)
 * @member quantity the number of items for this detail
 */


/**
 * A wrapper around tracking items and meat gained from this session
 * Smartly handles foldables being added/removed based on their state
 * Provides operations to add sessions and subtract Sessions so you can isolate the value of each Session using a baseline
 * @member meat the raw meat associated with this Session
 * @member items a map representing the items gained/lost during this Session
 */
var Session = /*#__PURE__*/function () {
  /**
   * Construct a new session
   * @param meat the amount of meat associated with this session
   * @param items the items associated with this session
   */
  function Session(meat, items) {
    session_classCallCheck(this, Session);

    session_defineProperty(this, "meat", void 0);

    session_defineProperty(this, "items", void 0);

    this.meat = meat;
    this.items = items;
  }
  /**
   * Register session results that do not get tracked natively
   * @param target either the Item or a string saying "meat" of what quantity to modify
   * @param quantity How much to modify the tracked amount by
   */


  session_createClass(Session, [{
    key: "register",
    value: function register(target, quantity) {
      if (target === "meat") {
        this.meat += quantity;
      } else {
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
    value: function value(itemValue) {
      // TODO: add garbo specific pricing (sugar equipment for synth, etc.)
      var meat = Math.floor(this.meat);

      var itemDetails = session_toConsumableArray(this.items.entries()).map(_ref => {
        var _ref2 = session_slicedToArray(_ref, 2),
            item = _ref2[0],
            quantity = _ref2[1];

        return {
          item,
          quantity,
          value: itemValue(item) * quantity
        };
      });

      var items = Math.floor(sumNumbers(itemDetails.map(detail => detail.value)));
      return {
        meat,
        items,
        total: meat + items,
        itemDetails
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
    value: function diff(other) {
      return new Session(this.meat - other.meat, inventoryOperation(this.items, other.items, (a, b) => a - b, false));
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
    value:
    /**
     * Generate a new session combining multiple sessions together
     * @param other the session from which to add elements to this set
     * @returns a new session representing the addition of other to this
     */
    function add(other) {
      return new Session(this.meat + other.meat, inventoryOperation(this.items, other.items, (a, b) => a + b, true));
    }
    /**
     * Combine the contents of sessions
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */

  }, {
    key: "toFile",
    value:
    /**
     * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
     * @param filename The file into which to export
     */
    function toFile(filename) {
      var val = {
        meat: this.meat,
        items: Object.fromEntries(this.items)
      };
      (0,external_kolmafia_namespaceObject.bufferToFile)(JSON.stringify(val), Session.getFilepath(filename));
    }
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     * @param filename The file from which to import
     * @returns the session represented by the file
     */

  }], [{
    key: "diff",
    value: function diff(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++) {
        sessions[_key] = arguments[_key];
      }

      return sessions.reduce((previousSession, currentSession) => previousSession.add(currentSession));
    }
  }, {
    key: "getFilepath",
    value: function getFilepath(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0,external_kolmafia_namespaceObject.myName)(), "/").concat((0,external_kolmafia_namespaceObject.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function fromFile(filename) {
      var fileValue = (0,external_kolmafia_namespaceObject.fileToBuffer)(Session.getFilepath(filename)); // fileToBuffer returns empty string for files that don't exist

      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue);
        var parsedItems = Object.entries(val.items).map(_ref3 => {
          var _ref4 = session_slicedToArray(_ref3, 2),
              itemStr = _ref4[0],
              quantity = _ref4[1];

          return [(0,external_kolmafia_namespaceObject.toItem)(itemStr), quantity];
        });
        return new Session(val.meat, new Map(parsedItems));
      } else {
        // if the file does not exist, return an empty session
        return new Session(0, new Map());
      }
    }
  }, {
    key: "current",
    value: function current() {
      return new Session((0,external_kolmafia_namespaceObject.mySessionMeat)(), mySessionItemsWrapper());
    }
  }]);

  return Session;
}();
;// CONCATENATED MODULE: ./src/dungeons/Dungeon.ts
var Dungeon_templateObject, Dungeon_templateObject2, Dungeon_templateObject3;

function Dungeon_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = Dungeon_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function Dungeon_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Dungeon_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Dungeon_arrayLikeToArray(o, minLen); }

function Dungeon_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Dungeon_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







/**
 * Distributes loot from given dungeon
 * @param dungeon The dungeon to distribute loot from
 * @param idOrName The player you're trying to distribute to, either as a username or a player ID. Defaults to self.
 * @param loot The loot you're looking to distribute, specific to this dungeon
 * @param distributeAllOfAGivenItem For items that you can get multiple of in a dungeon. When true, this will give everything of that ilk to your chosen player.
 */
function distribute(dungeon) {
  var idOrName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0,external_kolmafia_namespaceObject.myId)();
  var loot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dungeon.loot;
  var distributeAllOfAGivenItem = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var player = getPlayerFromIdOrName(idOrName);
  var lootList = loot instanceof Map ? countedMapToArray(loot) : Array.isArray(loot) ? loot : [loot];
  var badLoot = lootList.find(lootItem => !dungeon.loot.includes(lootItem));

  if (badLoot) {
    throw new Error("".concat(badLoot, " is not a valid piece of dungeon loot"));
  }

  var pageText = (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php");

  if (!pageText.match(new RegExp(player.name, "i"))) {
    throw new Error("".concat(player.name, " cannot be distributed loot from ").concat((0,external_kolmafia_namespaceObject.getClanName)()));
  }

  var itemNames = (0,external_kolmafia_namespaceObject.xpath)(pageText, "//tr/td[2]/b/text()");
  var whichLoots = (0,external_kolmafia_namespaceObject.xpath)(pageText, '//form[@action="clan_basement.php"]//input[@type="hidden"][@name="whichloot"]/@value');
  itemNames.forEach((itemName, index) => {
    if (lootList.includes((0,external_kolmafia_namespaceObject.toItem)(itemName))) {
      (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php?whichloot=".concat(whichLoots[index], "&recipient=").concat(player.id));
      if (!distributeAllOfAGivenItem) lootList.splice(lootList.indexOf((0,external_kolmafia_namespaceObject.toItem)(itemName)));
    }
  });
}
function Dungeon_close(dungeon) {
  (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php?action=".concat(dungeon.closeAction, "&confirm=true"), true);
  var pageText = (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php");
  return pageText.includes(dungeon.closedImage);
}
/**
 * Opens clan dungeon and, if relevant, pays meat to do so
 * @param dungeon The Dungeon to open
 * @param paymentPolicy "None", "All", or "Difference". Difference pays into the stash the exact amount needed to open the dungeon.
 */

function Dungeon_open(dungeon) {
  var paymentPolicy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Difference";
  var pageText = (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php");
  if (pageText.includes(dungeon.openImage)) return true;
  var clan = Clan.get();

  if (paymentPolicy === "All") {
    clan.putMeatInCoffer(dungeon.openCost);
  } else {
    var stashMeat = clan.getMeatInCoffer();
    var payDifference = dungeon.openCost - stashMeat;

    if (payDifference > 0) {
      if (paymentPolicy === "None") return false;
      clan.putMeatInCoffer(payDifference);
    }
  }

  (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php?action=".concat(dungeon.openAction), true);
  return (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php").includes(dungeon.openImage);
}
/**
 * Creates dungeon object for managing clan dungeons
 * @param name Name of the dungeon in question
 * @param loot Distributable loot dropped by bosses in dungeon
 * @param openAction String action used in form submission to open dungeon
 * @param closeAction String action used in form submission to close dungeon
 * @param openCost Meat cost of opening dungeon
 * @param openImage Image text to search clan_basement.php for to check if dungeon is open
 * @param closedImage Image text to search clan_basement.php for to check if dungeon is closed
 */

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

var Dreadsylvania = createDungeon("Dreadsylvania", $items(Dungeon_templateObject || (Dungeon_templateObject = Dungeon_taggedTemplateLiteral(["Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce, Hunger\u2122 Sauce"]))), "translatemap", "foldmap", 1000000, "dvmap.gif", "foldmap.gif");
var Hobopolis = createDungeon("Hobopolis", $items(Dungeon_templateObject2 || (Dungeon_templateObject2 = Dungeon_taggedTemplateLiteral(["Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster"]))), "cleansewer", "floodsewer", 1000000, "opengrate.gif", "sewergrate.gif");
var SlimeTube = createDungeon("The Slime Tube", $items(Dungeon_templateObject3 || (Dungeon_templateObject3 = Dungeon_taggedTemplateLiteral(["slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants"]))), "cleanspot", "sealtube", 250000, "slimehole.gif", "greasespot.gif");
function findLoot(dungeon) {
  var returnValue = new Map();
  var pageText = (0,external_kolmafia_namespaceObject.visitUrl)("clan_basement.php");

  var _iterator = Dungeon_createForOfIteratorHelper(dungeon.loot),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _pageText$match$lengt, _pageText$match;

      var lootItem = _step.value;
      returnValue.set(lootItem, (_pageText$match$lengt = (_pageText$match = pageText.match(new RegExp(lootItem.name, "g"))) === null || _pageText$match === void 0 ? void 0 : _pageText$match.length) !== null && _pageText$match$lengt !== void 0 ? _pageText$match$lengt : 0);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
;// CONCATENATED MODULE: ./src/dungeons/Dreadsylvania.ts


function Dreadsylvania_close() {
  return Dungeon_close(Dreadsylvania);
}
function Dreadsylvania_open() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Difference";
  return Dungeon_open(Dreadsylvania, paymentPolicy);
}
function Dreadsylvania_distribute() {
  var idOrName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myId)();
  var loot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Dreadsylvania.loot;
  var distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  distribute(Dreadsylvania, idOrName, loot, distributeAllOfAGivenItem);
}
function Dreadsylvania_findLoot() {
  return findLoot(Dreadsylvania);
}
;// CONCATENATED MODULE: ./src/dungeons/Hobopolis.ts


function Hobopolis_close() {
  return Dungeon_close(Hobopolis);
}
function Hobopolis_open() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Difference";
  return Dungeon_open(Hobopolis, paymentPolicy);
}
function Hobopolis_distribute() {
  var idOrName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myId)();
  var loot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Hobopolis.loot;
  var distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  distribute(Hobopolis, idOrName, loot, distributeAllOfAGivenItem);
}
function Hobopolis_findLoot() {
  return findLoot(Hobopolis);
}
;// CONCATENATED MODULE: ./src/dungeons/SlimeTube.ts


function SlimeTube_close() {
  return Dungeon_close(SlimeTube);
}
function SlimeTube_open() {
  var paymentPolicy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Difference";
  return Dungeon_open(SlimeTube, paymentPolicy);
}
function SlimeTube_distribute() {
  var idOrName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.myId)();
  var loot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SlimeTube.loot;
  var distributeAllOfAGivenItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  distribute(SlimeTube, idOrName, loot, distributeAllOfAGivenItem);
}
function SlimeTube_findLoot() {
  return findLoot(SlimeTube);
}
;// CONCATENATED MODULE: ./src/index.ts

































 // Necessary to avoid webpack error when reexporting type-only symbols.
// See https://github.com/microsoft/TypeScript/issues/28481

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 9189);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;