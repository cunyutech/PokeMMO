/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _Engine = __webpack_require__(75);

	var _Engine2 = _interopRequireDefault(_Engine);

	var _Renderer = __webpack_require__(150);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _Input = __webpack_require__(164);

	var _Input2 = _interopRequireDefault(_Input);

	var _Connection = __webpack_require__(167);

	var _Connection2 = _interopRequireDefault(_Connection);

	var _input = __webpack_require__(178);

	var Events = _interopRequireWildcard(_input);

	var _entities = __webpack_require__(179);

	var entities = _interopRequireWildcard(_entities);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Game
	 * @class Game
	 * @export
	 */
	var Game = function () {

	  /**
	   * @constructor
	   */
	  function Game() {
	    var _this = this;

	    (0, _classCallCheck3.default)(this, Game);


	    this.glNode = document.querySelector("#webgl");
	    this.canvasNode = document.querySelector("#canvas");

	    this.entities = entities;

	    this.engine = new _Engine2.default(this, function () {
	      return _this.setup();
	    });
	  }

	  /**
	   * Setup
	   * @param {Number} stage
	   */


	  (0, _createClass3.default)(Game, [{
	    key: "setup",
	    value: function setup() {
	      var _this2 = this;

	      var stage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stage === void 0 ? 0 : stage;


	      switch (++stage) {
	        case 1:
	          this.engine.renderer = new _Renderer2.default(this.engine);
	          window.rAF(function () {
	            return _this2.engine.renderer.render();
	          });
	          this.setup(stage);
	          return void 0;
	        case 2:
	          this.addWorld(function () {
	            return _this2.setup(stage);
	          });
	          return void 0;
	        case 3:
	          this.addMap(function () {
	            return _this2.setup(stage);
	          });
	          return void 0;
	        case 4:
	          this.addEntities(function () {
	            return _this2.setup(stage);
	          });
	          return void 0;
	        case 5:
	          this.animateNPC();
	          this.setup(stage);
	          return void 0;
	        case 6:
	          /** Instant focus local player */
	          this.engine.camera.focus(this.engine.getEntityByProperty("Felix", "name"), true);
	          this.setup(stage);
	          return void 0;
	        case 7:
	          this.input = new _Input2.default(Events, this);
	          this.setup(stage);
	          return void 0;
	        case 8:
	          if (!_cfg.OFFLINE_MODE) {
	            this.engine.connection = new _Connection2.default(this, _cfg.CONNECTION_URL + ":" + _cfg.CONNECTION_PORT);
	          }
	          this.setup(stage);
	          return void 0;
	      };

	      return void 0;
	    }
	  }, {
	    key: "animateNPC",
	    value: function animateNPC() {
	      setTimeout(function () {
	        var entity = this.engine.getEntityByProperty("Joy", "name");
	        var move = [_cfg.LEFT, _cfg.RIGHT, _cfg.UP, _cfg.DOWN][Math.random() * 3 << 0];
	        entity.move(move);
	        this.animateNPC();
	      }.bind(this), 2e3);
	    }

	    /**
	     * Add world
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addWorld",
	    value: function addWorld(resolve) {
	      this.engine.addWorld("worlds/kanto/index.js", resolve);
	    }

	    /**
	     * Add map
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addMap",
	    value: function addMap(resolve) {
	      this.engine.addMap("worlds/kanto/town/town.json", resolve);
	    }

	    /**
	     * Add entities
	     * @param {Function} resolve
	     */

	  }, {
	    key: "addEntities",
	    value: function addEntities(resolve) {

	      var player = this.entities.Player;

	      this.engine.addEntity(new entities.Light({
	        sprite: "assets/img/light.png",
	        map: "Town",
	        x: 168, y: 96,
	        width: 32, height: 32,
	        soft: false,
	        color: "#E6E6E6"
	      }));

	      this.engine.addEntity(new player({ name: "Joy", map: "Town", x: 96, y: 144, sprite: "assets/img/200.png", width: 16, height: 16, collidable: true,
	        facing: 1,
	        onCollide: {
	          JavaScript: function JavaScript(entity, engine) {
	            this.faceEntity(entity);
	            engine.instance.notify(this, "Stop!");
	          }
	        }
	      }));

	      this.engine.addEntity(new player({ name: "Merlin", map: "Town", x: 160, y: 144, sprite: "assets/img/85.png", width: 16, height: 16, collidable: true, shadowY: -3, normal: true,
	        onAction: {
	          EngelScript: "\n          if (trigger.facing == 2 || trigger.facing == 3) {\n            FLAGS.COUNTER += 1;\n          } {\n            FLAGS.COUNTER -= 1;\n          }\n          kernel.notify(this, '+' + FLAGS.COUNTER + \" \");\n          this.faceEntity(trigger);\n        "
	        }
	      }));

	      this.engine.addEntity(new player({ name: "Merlin2", map: "Town", x: 136, y: 120, sprite: "assets/img/85.png", width: 16, height: 16, collidable: true, shadowY: -3, normal: true,
	        onCollide: {
	          EngelScript: "\n          kernel.notify(this, trigger.name);\n        "
	        }
	      }));

	      this.engine.addEntity(new player({
	        name: "Mew", map: "Town",
	        sprite: "assets/img/151.png",
	        width: 16, height: 16,
	        collidable: false,
	        following: "Joy"
	      }));

	      this.engine.addEntity(new player({
	        name: "Charizard", map: "Town",
	        sprite: "assets/img/4.png",
	        width: 16, height: 16,
	        collidable: false,
	        following: "Felix",
	        onAction: {
	          EngelScript: "\n          kernel.notify(this, \":p\");\n          trigger.leader.faceEntity(trigger);\n        "
	        },
	        normal: true
	      }));

	      this.engine.addEntity(new player({
	        name: "Flareon", map: "Town",
	        sprite: "assets/img/136.png",
	        width: 16, height: 16,
	        collidable: false,
	        following: "Mew"
	      }));

	      if (_cfg.OFFLINE_MODE) {
	        this.engine.addEntity(new player({
	          name: "Felix", map: "Town", x: 144, y: 152, sprite: "assets/img/0.png", width: 16, height: 16, isLocalPlayer: true, collidable: true, normal: true,
	          onJump: function onJump(entity, map) {
	            if (entity.leader) {
	              setTimeout(function () {
	                return map.instance.notify(entity.leader, " :3 ");
	              }, 250);
	              setTimeout(function () {
	                return entity.leader.jump();
	              }, 500);
	            }
	          }
	        }));
	      }

	      return resolve();
	    }
	  }]);
	  return Game;
	}();

	exports.default = Game;


	window.game = new Game();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ColorPalette = exports.IS_CLIENT = exports.DEFAULT_LANG = exports.BROWSERS = exports.TYPES = exports.VOLUME = exports.BGS = exports.BGM = exports.GRAVITY = exports.DOWN = exports.RIGHT = exports.UP = exports.LEFT = exports.SHADOW_ALPHA = exports.SHADOW_Y = exports.SHADOW_X = exports.DISPLAY_SHADOWS = exports.MAX_SCALE = exports.MIN_SCALE = exports.PIXEL_SCALE = exports.DIMENSION = exports.Y_DEPTH_HACK = exports.DEBUG_FPS = exports.MINI_MAP = exports.TILESET_MODE = exports.GOD_MODE = exports.EDIT_MODE = exports.RECORD_MODE = exports.OFFLINE_MODE = exports.DEBUG_MODE = exports.DEV_MODE = exports.EASING_CAMERA = exports.FREE_CAMERA = exports.WALK_BY_KEYBOARD = exports.WGL_SUPPORT = exports.VERSION = exports.__dirname = exports.CONNECTION_PORT = exports.CONNECTION_URL = exports.LOCAL_PLAYER = exports.GRID_WIDTH = exports.RENDER_MODE = exports.WGL = exports.CANVAS = undefined;

	var _utils = __webpack_require__(22);

	/**
	 * Canvas rendering mode
	 * @constant
	 * @type {Number}
	 */
	var CANVAS = exports.CANVAS = 0;

	/**
	 * WebGL rendering mode
	 * @constant
	 * @type {Number}
	 */
	var WGL = exports.WGL = 1;

	/**
	 * Game rendering mode
	 * @type {Number}
	 */
	var RENDER_MODE = exports.RENDER_MODE = -1;

	/**
	 * Grid width
	 * @constant
	 * @type {Number}
	 */
	var GRID_WIDTH = exports.GRID_WIDTH = 1;

	/**
	 * Local player name
	 * @type {String}
	 */
	var LOCAL_PLAYER = exports.LOCAL_PLAYER = null;

	/**
	 * Connection url
	 * @constant
	 * @type {String}
	 */
	var CONNECTION_URL = exports.CONNECTION_URL = (0, _utils.getLocalHost)();

	/**
	 * Connection port
	 * @constant
	 * @type {String}
	 */
	var CONNECTION_PORT = exports.CONNECTION_PORT = 449;

	/**
	 * @constant
	 * @type {String}
	 */
	var __dirname = exports.__dirname = "./src/";

	/**
	 * Version
	 * @constant
	 * @type {String}
	 */
	var VERSION = exports.VERSION = "0.1.0";

	/**
	 * WebGL support
	 * @constant
	 * @type {Boolean}
	 */
	var WGL_SUPPORT = exports.WGL_SUPPORT = (0, _utils.supportWGL)();

	/**
	 * Walk by keyboard
	 * @constant
	 * @type {Boolean}
	 */
	var WALK_BY_KEYBOARD = exports.WALK_BY_KEYBOARD = true;

	/**
	 * Free camera
	 * @type {Boolean}
	 */
	var FREE_CAMERA = exports.FREE_CAMERA = false;

	/**
	 * Easing camera
	 * @type {Boolean}
	 */
	var EASING_CAMERA = exports.EASING_CAMERA = false;

	/**
	 * Developer mode
	 * @type {Boolean}
	 */
	var DEV_MODE = exports.DEV_MODE = true;

	/**
	 * Debug mode
	 * @type {Boolean}
	 */
	var DEBUG_MODE = exports.DEBUG_MODE = false;

	/**
	 * Offline mode
	 * @constant
	 * @type {Boolean}
	 */
	var OFFLINE_MODE = exports.OFFLINE_MODE = true;

	/**
	 * Record mode
	 * @type {Boolean}
	 */
	var RECORD_MODE = exports.RECORD_MODE = true;

	/**
	 * Edit mode
	 * @type {Boolean}
	 */
	var EDIT_MODE = exports.EDIT_MODE = true;

	/**
	 * God mode
	 * @type {Boolean}
	 */
	var GOD_MODE = exports.GOD_MODE = false;

	/**
	 * Tileset drawind mode
	 * @type {Boolean}
	 */
	var TILESET_MODE = exports.TILESET_MODE = true;

	/**
	 * Debug mode
	 * @type {Boolean}
	 */
	var MINI_MAP = exports.MINI_MAP = true;

	/**
	 * Debug fps
	 * @constant
	 * @type {Number}
	 */
	var DEBUG_FPS = exports.DEBUG_FPS = 60;

	/**
	 * Vertical depth sorting hack
	 * @constant
	 * @type {Number}
	 */
	var Y_DEPTH_HACK = exports.Y_DEPTH_HACK = .0001;

	/**
	 * @constant
	 * @type {Number}
	 */
	var DIMENSION = exports.DIMENSION = 8;

	/**
	 * PP rounding
	 * @constant
	 * @type {Number}
	 */
	var PIXEL_SCALE = exports.PIXEL_SCALE = .125;

	/**
	 * @constant
	 * @type {Number}
	 */
	var MIN_SCALE = exports.MIN_SCALE = 3.0;

	/**
	 * @constant
	 * @type {Number}
	 */
	var MAX_SCALE = exports.MAX_SCALE = 12.5;

	/**
	 * Display shadows
	 * @constant
	 * @type {Boolean}
	 */
	var DISPLAY_SHADOWS = exports.DISPLAY_SHADOWS = true;

	/**
	 * Shadow x scale
	 * @constant
	 * @type {Number}
	 */
	var SHADOW_X = exports.SHADOW_X = 1.0;

	/**
	 * Shadow y scale
	 * @constant
	 * @type {Number}
	 */
	var SHADOW_Y = exports.SHADOW_Y = 1.45;

	/**
	 * Shadow alpha
	 * @type {Number}
	 */
	var SHADOW_ALPHA = exports.SHADOW_ALPHA = .85;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var LEFT = exports.LEFT = 3;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var UP = exports.UP = 1;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var RIGHT = exports.RIGHT = 2;

	/**
	 * Direction
	 * @constant
	 * @type {Number}
	 */
	var DOWN = exports.DOWN = 0;

	/**
	 * Gravity
	 * @constant
	 * @type {Number}
	 */
	var GRAVITY = exports.GRAVITY = -1;

	/**
	 * Play bgm
	 * @constant
	 * @type {Number}
	 */
	var BGM = exports.BGM = true;

	/**
	 * Play bgs
	 * @constant
	 * @type {Number}
	 */
	var BGS = exports.BGS = true;

	/**
	 * @constant
	 * @type {Object}
	 */
	var VOLUME = exports.VOLUME = {
	  LOCAL_PLAYER: 100,
	  NETWORK_PLAYER: 10,
	  MUSIC: 30,
	  ENTITY_NOISE: 30
	};

	/**
	 * @constant
	 * @type {Object}
	 */
	var TYPES = exports.TYPES = {
	  Notification: 0,
	  MapEntity: 1,
	  Player: 2,
	  Ping: 3,
	  Light: 4
	};

	/**
	 * Which browser we
	 * are running on
	 * @type {Object}
	 */
	var BROWSERS = exports.BROWSERS = {
	  IE: false,
	  iOS: false,
	  Chrome: false,
	  Firefox: false,
	  Vivaldi: false,
	  Electron: false
	};

	(function () {

	  if (typeof window === "undefined") return void 0;

	  var isChrome = !!navigator.userAgent.match(/Chrome/i);
	  var isVivaldi = !!navigator.userAgent.match(/Vivaldi/i);
	  var isElectron = !!(typeof window !== "undefined" && window.process && window.process.type === "renderer");

	  this.IE = !!(typeof window !== "undefined" && window.ActiveXObject !== void 0);
	  this.iOS = !!(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i));
	  this.Firefox = !!navigator.userAgent.match(/Firefox/i);

	  this.Chrome = isChrome && !isVivaldi;
	  this.Vivaldi = !this.Chrome;

	  this.Electron = !this.Chrome && this.Vivaldi;
	}).call(BROWSERS);

	/**
	 * Default language packet
	 * to auto load and use,
	 * if no language file for
	 * the navigator was found
	 * @type {String}
	 */
	var DEFAULT_LANG = exports.DEFAULT_LANG = "en";

	/**
	 * Is client
	 * @type {Boolean}
	 */
	var IS_CLIENT = exports.IS_CLIENT = true;

	/**
	 * @constant
	 * @type {Array}
	 */
	var ColorPalette = exports.ColorPalette = [[135, 100, 100], [135, 105, 100], [140, 110, 100], [150, 115, 100], [155, 125, 100], [150, 135, 100], [135, 135, 100], [135, 125, 100], [130, 125, 100],
	/** Morning */
	[130, 120, 100], [135, 120, 100], [145, 130, 100], [150, 145, 100],
	/** Day */
	[135, 145, 100], [145, 150, 100], [150, 125, 100], [145, 130, 100], [135, 130, 100],
	/** Early night */
	[125, 135, 100], [135, 130, 100], [135, 135, 100], [135, 100, 100], [135, 105, 100], [140, 110, 100], [150, 115, 100]];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Maps = exports.TextureCache = undefined;

	var _promise = __webpack_require__(23);

	var _promise2 = _interopRequireDefault(_promise);

	exports.supportWGL = supportWGL;
	exports.parseString = parseString;
	exports.getLocalHost = getLocalHost;
	exports.getWGLContext = getWGLContext;
	exports.getSprite = getSprite;
	exports.uHash = uHash;
	exports.getPath = getPath;
	exports.inherit = inherit;
	exports.createCanvasBuffer = createCanvasBuffer;
	exports.imageToCanvas = imageToCanvas;
	exports.canvasToImage = canvasToImage;
	exports.tileContainsImageData = tileContainsImageData;
	exports.getTime = getTime;
	exports.antiCache = antiCache;
	exports.ajax = ajax;

	var _cfg = __webpack_require__(21);

	var _Texture = __webpack_require__(73);

	var _Texture2 = _interopRequireDefault(_Texture);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rx = {
	  path: /[^\\/]+$/
	};

	/**
	 * Cached textures
	 * @type {Object}
	 */
	var TextureCache = exports.TextureCache = {};

	var hashIndex = -1;
	var hashes = [];

	/**
	 * Parsed maps
	 * @type {Object}
	 */
	var Maps = exports.Maps = {};

	/**
	 * Check if webgl is supported
	 * @return {Boolean}
	 */
	function supportWGL() {

	  var canvas = null;

	  try {
	    canvas = document.createElement("canvas");
	    if (WebGLRenderingContext !== void 0) {
	      return !!getWGLContext(canvas);
	    }
	  } catch (e) {
	    return false;
	  };

	  return false;
	}

	/**
	 * Converts a string into corresponding type
	 * @param {String} value
	 * @return {*}
	 */
	function parseString(value) {

	  var isNumber = Number(value) >= 0 || Number(value) < 0;
	  var isBoolean = value === "true" || value === "false";
	  var isString = !isNumber && !isBoolean;

	  return isNumber ? Number(value) : isBoolean ? value === "true" : isString ? value : null;
	}

	/**
	 * Get local host
	 * @return {String}
	 */
	function getLocalHost() {
	  if (typeof document === "undefined") return void 0;
	  return document.location.host.replace(/:.*/, "");
	}

	/**
	 * Get wgl context of a canvas
	 * @return {Object}
	 */
	function getWGLContext(canvas) {
	  var options = {
	    alpha: false,
	    antialias: false,
	    premultipliedAlpha: false,
	    stencil: false,
	    preserveDrawingBuffer: false
	  };
	  return canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options);
	}

	/**
	 * Get a sprite
	 * @param {String}   sprite
	 * @param {Number}   width
	 * @param {Number}   height
	 * @param {Function} resolve
	 */
	function getSprite(sprite, width, height, resolve) {

	  if (TextureCache[sprite]) {
	    resolve(TextureCache[sprite]);
	    return void 0;
	  }

	  new _Texture2.default(sprite, width, height, function (instance) {
	    resolve(TextureCache[sprite] = instance);
	  });

	  return void 0;
	}

	/**
	 * Generate a unique hash
	 * @export
	 */
	function uHash() {

	  var index = ++hashIndex;

	  if (hashes.indexOf(index) > -1) return this.uHash();

	  hashes.push(index);

	  return index;
	}

	/**
	 * Get path without file ext
	 * @param  {String} path
	 * @return {String}
	 */
	function getPath(path) {
	  return path.replace(rx.path.exec(path)[0], "");
	}

	/**
	 * @param {Object} cls
	 * @param {Object} prot
	 * @export
	 */
	function inherit(cls, prot) {

	  var key = null;

	  for (key in prot) {
	    if (prot[key] instanceof Function) {
	      cls.prototype[key] = prot[key];
	    }
	  };
	}

	/**
	 * @param {Number} width
	 * @param {Number} height
	 */
	function createCanvasBuffer(width, height) {

	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");

	  ctx.setImageSmoothing(false);

	  canvas.width = width;
	  canvas.height = height;

	  return ctx;
	}

	/**
	 * @param  {Object} img
	 * @return {Object}
	 */
	function imageToCanvas(img) {

	  var ctx = createCanvasBuffer(img.width, img.height);

	  ctx.drawImage(img, 0, 0, img.width, img.height);

	  return ctx;
	}

	/**
	 * @param  {Object} canvas
	 * @return {Object}
	 */
	function canvasToImage(canvas) {

	  var image = new Image();

	  image.src = canvas.toDataURL("image/png");

	  return image;
	}

	/**
	 * Check if a tile contains any image data
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @return {Boolean}
	 */
	function tileContainsImageData(ctx, x, y, width, height) {

	  var ii = 0;
	  var length = 0;

	  var data = ctx.getImageData(x * 2, y * 2, width * 2, height * 2).data;

	  length = data.length;

	  for (; ii < length; ii += 4) {
	    if (data[ii] > 0) return true;
	    if (data[ii + 1] > 0) return true;
	    if (data[ii + 2] > 0) return true;
	    if (data[ii + 3] > 0) return true;
	  };

	  return false;
	}

	/**
	 * Get current time
	 * @return {Object}
	 */
	function getTime() {

	  var date = new Date();

	  return {
	    hours: date.getHours(),
	    minutes: date.getMinutes(),
	    seconds: date.getSeconds()
	  };
	}

	/**
	 * Anti cache
	 * @return {String}
	 */
	function antiCache() {
	  return "?" + +new Date();
	}

	/**
	 * Ajax
	 * @param {String} url
	 */
	function ajax(url) {
	  if (_cfg.DEV_MODE === true) {
	    url = url + antiCache();
	  }
	  return new _promise2.default(function (resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open("GET", url);
	    req.onload = function () {
	      if (req.status === 200) {
	        resolve(req.response);
	      } else {
	        reject(new Error(req.statusText));
	      }
	    };
	    req.onerror = function () {
	      reject(new Error("Network error"));
	    };
	    req.send();
	  });
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(55);
	__webpack_require__(59);
	module.exports = __webpack_require__(8).Promise;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(27)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(30)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , defined   = __webpack_require__(29);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(31)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(32)
	  , hide           = __webpack_require__(11)
	  , has            = __webpack_require__(33)
	  , Iterators      = __webpack_require__(34)
	  , $iterCreate    = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(53)
	  , ITERATOR       = __webpack_require__(52)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(36)
	  , descriptor     = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(51)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(52)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(13)
	  , dPs         = __webpack_require__(37)
	  , enumBugKeys = __webpack_require__(49)
	  , IE_PROTO    = __webpack_require__(46)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(18)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(50).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(12)
	  , anObject = __webpack_require__(13)
	  , getKeys  = __webpack_require__(38);

	module.exports = __webpack_require__(16) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(39)
	  , enumBugKeys = __webpack_require__(49);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(33)
	  , toIObject    = __webpack_require__(40)
	  , arrayIndexOf = __webpack_require__(43)(false)
	  , IE_PROTO     = __webpack_require__(46)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(41)
	  , defined = __webpack_require__(29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(42);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(40)
	  , toLength  = __webpack_require__(44)
	  , toIndex   = __webpack_require__(45);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(28)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(28)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(47)('keys')
	  , uid    = __webpack_require__(48);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7).document && document.documentElement;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(12).f
	  , has = __webpack_require__(33)
	  , TAG = __webpack_require__(52)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(47)('wks')
	  , uid        = __webpack_require__(48)
	  , Symbol     = __webpack_require__(7).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(33)
	  , toObject    = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(46)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(29);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var global        = __webpack_require__(7)
	  , hide          = __webpack_require__(11)
	  , Iterators     = __webpack_require__(34)
	  , TO_STRING_TAG = __webpack_require__(52)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(57)
	  , step             = __webpack_require__(58)
	  , Iterators        = __webpack_require__(34)
	  , toIObject        = __webpack_require__(40);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(30)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(31)
	  , global             = __webpack_require__(7)
	  , ctx                = __webpack_require__(9)
	  , classof            = __webpack_require__(60)
	  , $export            = __webpack_require__(6)
	  , isObject           = __webpack_require__(14)
	  , aFunction          = __webpack_require__(10)
	  , anInstance         = __webpack_require__(61)
	  , forOf              = __webpack_require__(62)
	  , speciesConstructor = __webpack_require__(66)
	  , task               = __webpack_require__(67).set
	  , microtask          = __webpack_require__(69)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(52)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(70)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(51)($Promise, PROMISE);
	__webpack_require__(71)(PROMISE);
	Wrapper = __webpack_require__(8)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(72)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(42)
	  , TAG = __webpack_require__(52)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(9)
	  , call        = __webpack_require__(63)
	  , isArrayIter = __webpack_require__(64)
	  , anObject    = __webpack_require__(13)
	  , toLength    = __webpack_require__(44)
	  , getIterFn   = __webpack_require__(65)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(13);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(34)
	  , ITERATOR   = __webpack_require__(52)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(60)
	  , ITERATOR  = __webpack_require__(52)('iterator')
	  , Iterators = __webpack_require__(34);
	module.exports = __webpack_require__(8).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(13)
	  , aFunction = __webpack_require__(10)
	  , SPECIES   = __webpack_require__(52)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(9)
	  , invoke             = __webpack_require__(68)
	  , html               = __webpack_require__(50)
	  , cel                = __webpack_require__(18)
	  , global             = __webpack_require__(7)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(42)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , macrotask = __webpack_require__(67).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(42)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(11);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(7)
	  , core        = __webpack_require__(8)
	  , dP          = __webpack_require__(12)
	  , DESCRIPTORS = __webpack_require__(16)
	  , SPECIES     = __webpack_require__(52)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(52)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _effects = __webpack_require__(74);

	var effect = _interopRequireWildcard(_effects);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Texture
	 * @class Texture
	 * @export
	 */
	var Texture = function () {

	  /**
	   * @param {String}   url
	   * @param {Number}   width
	   * @param {Number}   height
	   * @param {Function} resolve
	   * @constructor
	   */
	  function Texture(url, width, height, resolve) {
	    (0, _classCallCheck3.default)(this, Texture);


	    /**
	     * Texture
	     * @type {Object}
	     */
	    this.texture = null;

	    /**
	     * Texture effect
	     * @type {Object}
	     */
	    this.texture_effect = null;

	    /**
	     * Effect texture
	     * @type {Object}
	     */
	    this.effect_sprites = [];

	    /**
	     * Splitted sprites
	     * @type {Array}
	     */
	    this.sprites = [];

	    /**
	     * Image url
	     * @type {String}
	     */
	    this.imgUrl = url;

	    /**
	     * Width
	     * @type {Number}
	     */
	    this.width = 0;

	    /**
	     * Height
	     * @type {Number}
	     */
	    this.height = 0;

	    /**
	     * Sprite width
	     * @type {Number}
	     */
	    this.sWidth = width;

	    /**
	     * Sprite height
	     * @type {Number}
	     */
	    this.sHeight = height;

	    /**
	     * X multiplicator
	     * @type {Number}
	     */
	    this.xMul = 0;

	    /**
	     * Y multiplicator
	     * @type {Number}
	     */
	    this.yMul = 0;

	    /**
	     * Loading state
	     * @type {Boolean}
	     */
	    this.hasLoaded = false;

	    this.fromImage(this.imgUrl, function () {
	      resolve(this);
	    }.bind(this));
	  }

	  /**
	   * @param {String}   url
	   * @param {Function} resolve
	   */


	  (0, _createClass3.default)(Texture, [{
	    key: "fromImage",
	    value: function fromImage(url, resolve) {

	      var img = null;

	      var texture = _utils.TextureCache[url];

	      if (texture !== void 0 && texture instanceof Texture) {
	        this.hasLoaded = true;
	        return _utils.TextureCache[url];
	      }

	      img = new Image();

	      img.addEventListener('load', function () {
	        this.width = img.width;
	        this.height = img.height;
	        this.hasLoaded = true;
	        this.texture = (0, _utils.imageToCanvas)(img);
	        this.splitTexture();
	        _utils.TextureCache[url] = this;
	        this.renderEffects();
	        resolve();
	      }.bind(this));

	      if (_cfg.DEV_MODE === true) {
	        img.src = url + (0, _utils.antiCache)();
	      } else {
	        img.src = url;
	      }

	      return void 0;
	    }

	    /**
	     * Split texture into seperate sprites
	     */

	  }, {
	    key: "splitTexture",
	    value: function splitTexture() {

	      if (this.sWidth === -1 && this.sHeight === -1) {
	        this.sWidth = this.width / 2;
	        this.sHeight = this.height / 2;
	      }

	      this.xMul = this.height / (this.sWidth * 2);
	      this.yMul = this.width / (this.sHeight * 2);

	      var buffer = null;

	      var ii = 0;

	      var xx = 0;
	      var yy = 0;

	      var width = this.width / (this.sWidth * 2);
	      var height = this.height / (this.sHeight * 2);

	      for (; yy < height;) {
	        for (xx = 0; xx < width; ++xx) {
	          if (xx === 0) ++yy;
	          buffer = (0, _utils.createCanvasBuffer)(this.sWidth * 2, this.sHeight * 2);
	          buffer.drawImage(this.texture.canvas, this.sWidth * 2 * xx, this.sHeight * 2 * (yy - 1), this.width, this.height, 0, 0, this.width, this.height);
	          this.sprites.push(buffer);
	          buffer = null;
	        };
	      };
	    }

	    /**
	     * Render texture effects
	     */

	  }, {
	    key: "renderEffects",
	    value: function renderEffects() {
	      this.buildTimeLightning();
	    }

	    /**
	     * Build texture time lightning
	     */

	  }, {
	    key: "buildTimeLightning",
	    value: function buildTimeLightning() {

	      var ii = 0;
	      var length = 0;

	      var buffer = null;

	      var width = 0;
	      var height = 0;

	      length = this.sprites.length;

	      for (; ii < length; ++ii) {
	        width = this.sprites[ii].canvas.width;
	        height = this.sprites[ii].canvas.height;
	        buffer = (0, _utils.createCanvasBuffer)(width, height);
	        buffer.translate(0, height);
	        buffer.scale(1, -1);
	        this.drawTimeLightning(this.sprites[ii], buffer, 0, 0, width, height, _cfg.ColorPalette);
	        buffer.setTransform(1, 0, 0, 1, 0, 0);
	        this.effect_sprites[ii] = buffer;
	        buffer = null;
	      };
	    }
	  }]);
	  return Texture;
	}();

	exports.default = Texture;


	(0, _utils.inherit)(Texture, effect);

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drawTimeLightning = drawTimeLightning;
	exports.colorizePixels = colorizePixels;

	var _utils = __webpack_require__(22);

	/**
	 * Draw time based lightning
	 * @param {Object} buffer
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Array}  colors
	 */
	function drawTimeLightning(buffer, ctx, x, y, width, height, colors) {

	  var hour = 18 /*getTime().hours*/;

	  var imgData = buffer.getImageData(x, y, width, height);

	  this.colorizePixels(imgData, colors[hour][0] / 100, colors[hour][1] / 100, colors[hour][2] / 100, false);

	  ctx.putImageData(imgData, x, y);

	  return void 0;
	};

	/**
	 * Colorize pixels
	 * @param {Object} imgData
	 * @param {Number}  r
	 * @param {Number}  g
	 * @param {Number}  b
	 * @param {Boolean} strict
	 */
	function colorizePixels(imgData, r, g, b, strict) {

	  var ii = 0;
	  var length = 0;

	  var pixels = imgData.data;

	  length = pixels.length;

	  if (strict) {
	    for (; ii < length / 4; ++ii) {
	      if (pixels[ii * 4] > 0) {
	        pixels[ii * 4] = g;
	      }
	      if (pixels[ii * 4 + 1] > 0) {
	        pixels[ii * 4 + 1] = r;
	      }
	      if (pixels[ii * 4 + 2] > 0) {
	        pixels[ii * 4 + 2] = g;
	      }
	      if (pixels[ii * 4 + 3] > 2) {
	        pixels[ii * 4 + 3] = b;
	      }
	    };
	  } else {
	    for (; ii < length / 4; ++ii) {
	      pixels[ii * 4 + 1] = pixels[ii * 4 + 1] / r;
	      pixels[ii * 4 + 2] = pixels[ii * 4 + 2] / g;
	      pixels[ii * 4 + 3] = pixels[ii * 4 + 3] * b;
	    };
	  }

	  return void 0;
	}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var cfg = _interopRequireWildcard(_cfg);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(22);

	var _functions = __webpack_require__(114);

	var map = _interopRequireWildcard(_functions);

	var _sound = __webpack_require__(125);

	var sound = _interopRequireWildcard(_sound);

	var _logic = __webpack_require__(126);

	var logic = _interopRequireWildcard(_logic);

	var _functions2 = __webpack_require__(127);

	var entity = _interopRequireWildcard(_functions2);

	var _Map = __webpack_require__(116);

	var _Map2 = _interopRequireDefault(_Map);

	var _Camera = __webpack_require__(128);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Editor = __webpack_require__(129);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _MiniMap = __webpack_require__(134);

	var _MiniMap2 = _interopRequireDefault(_MiniMap);

	var _Language = __webpack_require__(135);

	var _Language2 = _interopRequireDefault(_Language);

	var _Controller = __webpack_require__(136);

	var _Controller2 = _interopRequireDefault(_Controller);

	var _Environment = __webpack_require__(138);

	var _Environment2 = _interopRequireDefault(_Environment);

	var _Notification = __webpack_require__(149);

	var _Notification2 = _interopRequireDefault(_Notification);

	var _DisplayObject2 = __webpack_require__(123);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Engine
	 * @class Engine
	 * @export
	 */
	var Engine = function (_DisplayObject) {
	  (0, _inherits3.default)(Engine, _DisplayObject);

	  /**
	   * @param {Object}   instance
	   * @param {Function} resolve
	   * @constructor
	   */
	  function Engine(instance, resolve) {
	    (0, _classCallCheck3.default)(this, Engine);

	    /**
	     * Instance
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Engine.__proto__ || (0, _getPrototypeOf2.default)(Engine)).call(this, null));

	    _this.instance = instance;

	    /**
	     * Current map
	     * @type {Object}
	     */
	    _this.currentMap = null;

	    /**
	     * Node
	     * @type {Object}
	     */
	    _this.node = _this.instance.canvasNode;

	    /**
	     * WebGL Node
	     * @type {Object}
	     */
	    _this.glNode = _this.instance.glNode;

	    /**
	     * Context
	     * @type {Object}
	     */
	    _this.context = _this.node.getContext("2d");

	    /**
	     * WebGL context
	     * @type {Object}
	     */
	    _this.glContext = null;

	    /** Attach webgl context */
	    if (cfg.WGL_SUPPORT && _this.glNode) {
	      _this.glContext = (0, _utils.getWGLContext)(_this.glNode);
	    }

	    /**
	     * Parsed maps
	     * @type {Object}
	     */
	    _this.maps = {};

	    /**
	     * Local entity ref
	     * @type {Object}
	     */
	    _this.localEntity = null;

	    /**
	     * Renderer instance
	     * @type {Object}
	     */
	    _this.renderer = null;

	    /**
	     * Connection instance
	     * @type {Object}
	     */
	    _this.connection = null;

	    /**
	     * Environment instance
	     * @type {Object}
	     */
	    _this.language = null;

	    /**
	     * Camera object
	     * @type {Object}
	     */
	    _this.camera = null;

	    /**
	     * Editor instance
	     * @type {Object}
	     */
	    _this.editor = null;

	    /**
	     * MiniMap instance
	     * @type {Object}
	     */
	    _this.mini = null;

	    /**
	     * Environment instance
	     * @type {Object}
	     */
	    _this.environment = null;

	    /**
	     * Controller instance
	     * @type {Object}
	     */
	    _this.controller = null;

	    _this.setup(resolve);

	    return _this;
	  }

	  /**
	   * Setup process
	   * @param {Function} resolve
	   */


	  (0, _createClass3.default)(Engine, [{
	    key: "setup",
	    value: function setup(resolve) {
	      var _this2 = this;

	      /**
	       * Environment instance
	       * @type {Object}
	       */
	      this.language = new _Language2.default(function () {

	        _this2.camera = new _Camera2.default(_this2);
	        _this2.mini = new _MiniMap2.default(_this2);
	        _this2.editor = new _Editor2.default(_this2);
	        _this2.controller = new _Controller2.default(_this2);
	        _this2.environment = new _Environment2.default(_this2);

	        _this2.camera.scale = cfg.MIN_SCALE;

	        _this2.handleAdressBar();

	        resolve();
	      });

	      return void 0;
	    }

	    /**
	     * Scan the adressbar and fetch
	     * configuration parameters
	     */

	  }, {
	    key: "handleAdressBar",
	    value: function handleAdressBar() {

	      var ii = 0;
	      var length = 0;

	      var tmp = null;
	      var key = null;
	      var val = null;

	      var params = [];

	      var search = window.location.search;

	      if (search.length <= 0) return void 0;

	      search = search.replace("?", "");
	      params = search.split("&");

	      length = params.length;

	      for (; ii < length; ++ii) {
	        tmp = params[ii].split("=");
	        /** Try uppercase */
	        key = tmp[0].toUpperCase();
	        val = tmp[1] === void 0 ? null : tmp[1];
	        /** Try lowercase */
	        if (cfg[key] === void 0) {
	          key = tmp[0];
	        }
	        /**
	         * Config key doesn't exist |
	         * Value to write is null
	         */
	        if (cfg[key] === void 0 || val === null) continue;
	        val = (0, _utils.parseString)(val);
	        if (val === null) continue;
	        cfg[key] = val;
	      };
	    }

	    /**
	     * Add a world
	     */

	  }, {
	    key: "addWorld",
	    value: function addWorld(path, resolve) {

	      (0, _utils.ajax)(path).then(function (data) {
	        var world = new Function(data)();
	        console.log(world);
	        if (resolve instanceof Function) {
	          return resolve();
	        }
	      }.bind(this));
	    }

	    /**
	     * @param {Number} width
	     * @setter
	     */

	  }, {
	    key: "sort",


	    /**
	     * Sort layers and entities
	     */
	    value: function sort() {

	      this.depthSort(this.currentMap.entities);

	      return void 0;
	    }

	    /**
	     * @param {Array} array
	     */

	  }, {
	    key: "depthSort",
	    value: function depthSort(array) {

	      var ii = 0;
	      var jj = 0;

	      var key = null;

	      var length = array.length;

	      for (; ii < length; ++ii) {
	        jj = ii;
	        key = array[jj];
	        for (; jj > 0 && (array[jj - 1].position.y + -array[jj - 1].z + array[jj - 1].yMargin + array[jj - 1].size.y * array[jj - 1].scale) * array[jj - 1].zIndex > (key.position.y + -key.z + key.yMargin + key.size.y * key.scale) * key.zIndex; --jj) {
	          array[jj] = array[jj - 1];
	        };
	        array[jj] = key;
	      };

	      return void 0;
	    }

	    /**
	     * Trigger a ping
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "ping",
	    value: function ping(x, y) {

	      var offset = this.camera.getGameMouseOffset(x, y);

	      var map = this.currentMap;

	      var tpl = map.objectTemplates["ping"];

	      tpl.x = offset.x;
	      tpl.y = offset.y;
	      tpl.z = 0;

	      var pushEntity = map.addEntity(tpl);

	      pushEntity.opacity = .0;
	      pushEntity.fadeIn(2);
	      pushEntity.lifeTime = this.renderer.now + 60;

	      pushEntity.type = cfg.TYPES.Ping;

	      map.entities.push(pushEntity);
	    }

	    /**
	     * Trigger a notification
	     * @param {Object} entity
	     * @param {String} msg
	     */

	  }, {
	    key: "notify",
	    value: function notify(entity, msg, type) {

	      var map = this.currentMap;

	      var isLocalEntity = this.localEntity !== null && entity.id !== this.localEntity.id;

	      var notification = new _Notification2.default(this, {
	        sprite: null,
	        hasShadow: false,
	        width: _Math2.default.roundTo(this.context.measureText(String(msg)).width, cfg.DIMENSION),
	        height: 16,
	        msg: msg,
	        follow: entity,
	        style: type || "ChatBubble",
	        fade: isLocalEntity || entity instanceof _Map2.default,
	        sound: isLocalEntity,
	        absolute: entity instanceof _Map2.default
	      });

	      map.entities.push(notification);
	    }

	    /**
	     * Local entity walk to
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "walkByMouse",
	    value: function walkByMouse(x, y) {

	      var local = this.localEntity;

	      if (local === null) return void 0;

	      var offset = this.camera.getGameMouseOffset(x, y);

	      local.walkTo(offset.x, offset.y);
	    }

	    /**
	     * Get language dependant string
	     * @param  {String} str
	     * @return {String}
	     */

	  }, {
	    key: "getString",
	    value: function getString(str) {
	      return this.language.get(this.language.strBase + str);
	    }

	    /**
	     * Get uppercased string
	     * @param  {String} str
	     * @return {String}
	     */

	  }, {
	    key: "getUpperCaseString",
	    value: function getUpperCaseString(str) {
	      return this.getString(str).toUpperCase();
	    }

	    /**
	     * Let all entities expect local jump
	     * @param {Number} amount
	     */

	  }, {
	    key: "everythingJump",
	    value: function everythingJump() {
	      var _this3 = this;

	      var ii = 0;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var entity = _step.value;

	          ++ii;
	          if (entity.id === _this3.localEntity.id) return "continue";
	          setTimeout(function () {
	            entity.jump();
	          }, ii * 25);
	        };

	        for (var _iterator = (0, _getIterator3.default)(game.engine.currentMap.entities), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _ret = _loop();

	          if (_ret === "continue") continue;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Rotate all entities expect local
	     * @param {Number} amount
	     */

	  }, {
	    key: "everythingRotate",
	    value: function everythingRotate(amount) {
	      var ii = 0;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(game.engine.currentMap.entities), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _entity = _step2.value;

	          ++ii;
	          if (_entity.id === this.localEntity.id) continue;
	          _entity.rotate(amount);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      ;
	    }
	  }, {
	    key: "width",
	    set: function set(width) {
	      this.width = width || 0;
	      this.camera.width = this.width;
	    }

	    /**
	     * @param {Number} height
	     * @setter
	     */

	  }, {
	    key: "height",
	    set: function set(height) {
	      this.height = height || 0;
	      this.camera.height = this.height;
	    }
	  }]);
	  return Engine;
	}(_DisplayObject3.default);

	exports.default = Engine;


	(0, _utils.inherit)(Engine, map);
	(0, _utils.inherit)(Engine, logic);
	(0, _utils.inherit)(Engine, sound);
	(0, _utils.inherit)(Engine, entity);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	__webpack_require__(26);
	module.exports = __webpack_require__(78);

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13)
	  , get      = __webpack_require__(65);
	module.exports = __webpack_require__(8).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	module.exports = __webpack_require__(8).Object.getPrototypeOf;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(54)
	  , $getPrototypeOf = __webpack_require__(53);

	__webpack_require__(82)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(6)
	  , core    = __webpack_require__(8)
	  , fails   = __webpack_require__(17);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(84);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(85);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(88);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(26);
	__webpack_require__(55);
	module.exports = __webpack_require__(87).f('iterator');

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(52);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	__webpack_require__(25);
	__webpack_require__(101);
	__webpack_require__(102);
	module.exports = __webpack_require__(8).Symbol;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(7)
	  , has            = __webpack_require__(33)
	  , DESCRIPTORS    = __webpack_require__(16)
	  , $export        = __webpack_require__(6)
	  , redefine       = __webpack_require__(32)
	  , META           = __webpack_require__(91).KEY
	  , $fails         = __webpack_require__(17)
	  , shared         = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(51)
	  , uid            = __webpack_require__(48)
	  , wks            = __webpack_require__(52)
	  , wksExt         = __webpack_require__(87)
	  , wksDefine      = __webpack_require__(92)
	  , keyOf          = __webpack_require__(93)
	  , enumKeys       = __webpack_require__(94)
	  , isArray        = __webpack_require__(97)
	  , anObject       = __webpack_require__(13)
	  , toIObject      = __webpack_require__(40)
	  , toPrimitive    = __webpack_require__(19)
	  , createDesc     = __webpack_require__(20)
	  , _create        = __webpack_require__(36)
	  , gOPNExt        = __webpack_require__(98)
	  , $GOPD          = __webpack_require__(100)
	  , $DP            = __webpack_require__(12)
	  , $keys          = __webpack_require__(38)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(99).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(96).f  = $propertyIsEnumerable;
	  __webpack_require__(95).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(31)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(48)('meta')
	  , isObject = __webpack_require__(14)
	  , has      = __webpack_require__(33)
	  , setDesc  = __webpack_require__(12).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(17)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(7)
	  , core           = __webpack_require__(8)
	  , LIBRARY        = __webpack_require__(31)
	  , wksExt         = __webpack_require__(87)
	  , defineProperty = __webpack_require__(12).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(38)
	  , toIObject = __webpack_require__(40);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(38)
	  , gOPS    = __webpack_require__(95)
	  , pIE     = __webpack_require__(96);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(42);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(40)
	  , gOPN      = __webpack_require__(99).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(39)
	  , hiddenKeys = __webpack_require__(49).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(96)
	  , createDesc     = __webpack_require__(20)
	  , toIObject      = __webpack_require__(40)
	  , toPrimitive    = __webpack_require__(19)
	  , has            = __webpack_require__(33)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(16) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(92)('asyncIterator');

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(92)('observable');

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(104);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(108);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(84);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	module.exports = __webpack_require__(8).Object.setPrototypeOf;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(6);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(107).set});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(14)
	  , anObject = __webpack_require__(13);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(9)(Function.call, __webpack_require__(100).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(110);
	var $Object = __webpack_require__(8).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(36)});

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _seed = __webpack_require__(112);

	var randSeed = _interopRequireWildcard(_seed);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Mathematical
	 * @class Mathematical
	 * @export
	 */
	var Mathematical = function () {

	  /**
	   * @constructor
	   */
	  function Mathematical() {
	    (0, _classCallCheck3.default)(this, Mathematical);
	  }

	  /**
	   * Seed
	   * @getter
	   */


	  (0, _createClass3.default)(Mathematical, null, [{
	    key: "clamp",


	    /**
	     * Clamp
	     * @param  {Number} value
	     * @param  {Number} min
	     * @param  {Number} max
	     * @return {Number}
	     */
	    value: function clamp(value, min, max) {
	      return Math.min(max, Math.max(min, value));
	    }

	    /**
	     * Get closest point
	     * @param  {Array} array
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Number} index
	     */

	  }, {
	    key: "get2DClosest",
	    value: function get2DClosest(array, x, y) {

	      var ii = 0;
	      var length = array.length;

	      var distance = null;

	      var distances = [];

	      for (; ii < length; ++ii) {
	        distance = this.distance(array[ii].x, array[ii].y, x, y + array[ii].height / 2 * array[ii].scaling);
	        distance.index = ii;
	        distance.width = array[ii].width * array[ii].scaling;
	        distance.height = array[ii].height * array[ii].scaling;
	        distances.push(distance);
	      };

	      /**
	       * Depth sorting
	       * ^= y - (width * height)
	       */
	      (function (array) {

	        var ii = 0;
	        var jj = 0;

	        var key = null;

	        var length = array.length;

	        for (; ii < length; ++ii) {
	          jj = ii;
	          key = array[jj];
	          for (; jj > 0 && array[jj - 1].y > key.y; --jj) {
	            array[jj] = array[jj - 1];
	          };
	          array[jj] = key;
	        };

	        return void 0;
	      })(distances);

	      return distances[distances.length - 1].index;
	    }

	    /**
	     * Linear intersection
	     * @param {Number} xx
	     * @param {Number} yy
	     * @param {Number} width
	     * @param {Number} height
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} scale
	     * @return {Boolean}
	     */

	  }, {
	    key: "linearIntersect",
	    value: function linearIntersect(xx, yy, width, height, x, y, scale) {
	      return Math.abs(2 * (x - xx * scale) + -(width * scale)) <= width * scale && Math.abs(2 * (y - yy * scale) + -(height * scale)) <= height * scale;
	    }

	    /**
	     * Cubic collision
	     * @param {Number} x1
	     * @param {Number} y1
	     * @param {Number} w1
	     * @param {Number} h1
	     * @param {Number} x2
	     * @param {Number} y2
	     * @param {Number} w2
	     * @param {Number} h2
	     * @return {Boolean}
	     */

	  }, {
	    key: "cubicCollision",
	    value: function cubicCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
	      return !(y1 + h1 < y2 || y1 > y2 + h2 || x1 + w1 < x2 || x1 > x2 + w2);
	    }

	    /**
	     * Round integer to its nearst X integer
	     * @param  {Number} a Number
	     * @param  {Number} b Round to
	     * @return {Number}
	     */

	  }, {
	    key: "roundTo",
	    value: function roundTo(a, b) {
	      b = 1 / b;
	      return Math.round(a * b) / b;
	    }

	    /**
	     * Zoom scale
	     * @param  {Number} factor
	     * @return {Number}
	     */

	  }, {
	    key: "zoomScale",
	    value: function zoomScale(factor) {
	      return factor >= 0 ? factor + 1 : factor < 0 ? -factor + 1 : factor + 1;
	    }

	    /**
	     * Hypotenuse
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Number}
	     */

	  }, {
	    key: "hypot",
	    value: function hypot(x, y) {
	      return Math.sqrt(x * x + y * y);
	    }

	    /**
	     * 2d point intersects circle
	     * @param  {Number} x
	     * @param  {Number} y
	     * @param  {Number} cx
	     * @param  {Number} cy
	     * @param  {Number} r
	     * @return {Number}
	     */

	  }, {
	    key: "pointIntersectsCircle",
	    value: function pointIntersectsCircle(x, y, cx, cy, r) {
	      return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) <= Math.pow(r, 2);
	    }

	    /**
	     * Distance between two points
	     * @param {Number} x1
	     * @param {Number} y1
	     * @param {Number} x2
	     * @param {Number} y2
	     * @return {Object}
	     */

	  }, {
	    key: "distance",
	    value: function distance(x1, y1, x2, y2) {

	      var x = Math.sqrt(Math.pow(x1 - x2, 2));
	      var y = Math.sqrt(Math.pow(y1 - y2, 2));

	      return {
	        x: x1 - x2 < 0 ? -x : x,
	        y: y1 - y2 < 0 ? -y : y
	      };
	    }

	    /**
	     * Sinus ease
	     * @param  {Number} n
	     * @return {Number}
	     */

	  }, {
	    key: "ease",
	    value: function ease(n) {
	      return .5 + Math.sin((n - .5) * Math.PI) / 2;
	    }

	    /**
	     * Hex to rgb
	     * @param  {Number} hex
	     * @return {Array}
	     */

	  }, {
	    key: "hexToRGB",
	    value: function hexToRGB(hex) {

	      var hx = parseInt(hex, 16);

	      var r = hx >> 16;
	      var g = hx >> 8 & 0xFF;
	      var b = hx & 0xFF;

	      var rr = parseInt(r, 16) / 255;
	      var gg = parseInt(g, 16) / 255;
	      var bb = parseInt(b, 16) / 255;

	      return [rr / 2, gg / 2, bb / 2, 1.0];
	    }

	    /**
	     * Get tile position
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} dir
	     */

	  }, {
	    key: "getTilePosition",
	    value: function getTilePosition(x, y, dir) {

	      var facing = -1;

	      var x = x;
	      var y = y;

	      switch (dir) {
	        case _cfg.LEFT:
	          x -= _cfg.DIMENSION;
	          facing = 3;
	          break;
	        case _cfg.UP:
	          y -= _cfg.DIMENSION;
	          facing = 1;
	          break;
	        case _cfg.RIGHT:
	          x += _cfg.DIMENSION;
	          facing = 2;
	          break;
	        case _cfg.DOWN:
	          y += _cfg.DIMENSION;
	          facing = 0;
	          break;
	        default:
	          facing = 0;
	          break;
	      };

	      return {
	        x: x,
	        y: y,
	        facing: facing
	      };
	    }
	  }, {
	    key: "Seed",
	    get: function get() {

	      return (
	        /**
	         * Seed
	         * @class Seed
	         */
	        function () {

	          /**
	           * @constructor
	           * @param {String} seed
	           */
	          function Seed(seed) {
	            (0, _classCallCheck3.default)(this, Seed);


	            /**
	             * Seed
	             * @type {String}
	             */
	            this.seed = seed;

	            this.generator = randSeed.create(this.seed);
	          }

	          /**
	           * Get a randomized float
	           * based on own seed
	           * @return {Number}
	           */


	          (0, _createClass3.default)(Seed, [{
	            key: "random",
	            value: function random() {
	              return this.generator(1e9);
	            }
	          }]);
	          return Seed;
	        }()
	      );
	    }

	    /**
	     * Point
	     * @getter
	     */

	  }, {
	    key: "Point",
	    get: function get() {

	      return (
	        /**
	         * Point
	         * @class Point
	         */
	        function () {

	          /**
	           * @param {Number} x
	           * @param {Number} y
	           * @constructor
	           */
	          function Point(x, y) {
	            (0, _classCallCheck3.default)(this, Point);

	            this.x = x || 0;
	            this.y = y || 0;
	          }

	          /**
	           * @param {Number} x
	           * @param {Number} y
	           */


	          (0, _createClass3.default)(Point, [{
	            key: "set",
	            value: function set(x, y) {
	              this.x = x;
	              this.y = y;
	            }

	            /**
	             * Round point
	             */

	          }, {
	            key: "round",
	            value: function round() {
	              this.x <<= 0;
	              this.y <<= 0;
	            }
	          }]);
	          return Point;
	        }()
	      );
	    }
	  }]);
	  return Mathematical;
	}();

	exports.default = Mathematical;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * random-seed
	 * https://github.com/skratchdot/random-seed
	 *
	 * This code was originally written by Steve Gibson and can be found here:
	 *
	 * https://www.grc.com/otg/uheprng.htm
	 *
	 * It was slightly modified for use in node, to pass jshint, and a few additional
	 * helper functions were added.
	 *
	 * Copyright (c) 2013 skratchdot
	 * Dual Licensed under the MIT license and the original GRC copyright/license
	 * included below.
	 */
	/*  ============================================================================
	                  Gibson Research Corporation
	        UHEPRNG - Ultra High Entropy Pseudo-Random Number Generator
	  ============================================================================
	  LICENSE AND COPYRIGHT:  THIS CODE IS HEREBY RELEASED INTO THE PUBLIC DOMAIN
	  Gibson Research Corporation releases and disclaims ALL RIGHTS AND TITLE IN
	  THIS CODE OR ANY DERIVATIVES. Anyone may be freely use it for any purpose.
	  ============================================================================
	  This is GRC's cryptographically strong PRNG (pseudo-random number generator)
	  for JavaScript. It is driven by 1536 bits of entropy, stored in an array of
	  48, 32-bit JavaScript variables.  Since many applications of this generator,
	  including ours with the "Off The Grid" Latin Square generator, may require
	  the deteriministic re-generation of a sequence of PRNs, this PRNG's initial
	  entropic state can be read and written as a static whole, and incrementally
	  evolved by pouring new source entropy into the generator's internal state.
	  ----------------------------------------------------------------------------
	  ENDLESS THANKS are due Johannes Baagoe for his careful development of highly
	  robust JavaScript implementations of JS PRNGs.  This work was based upon his
	  JavaScript "Alea" PRNG which is based upon the extremely robust Multiply-
	  With-Carry (MWC) PRNG invented by George Marsaglia. MWC Algorithm References:
	  http://www.GRC.com/otg/Marsaglia_PRNGs.pdf
	  http://www.GRC.com/otg/Marsaglia_MWC_Generators.pdf
	  ----------------------------------------------------------------------------
	  The quality of this algorithm's pseudo-random numbers have been verified by
	  multiple independent researchers. It handily passes the fermilab.ch tests as
	  well as the "diehard" and "dieharder" test suites.  For individuals wishing
	  to further verify the quality of this algorithm's pseudo-random numbers, a
	  256-megabyte file of this algorithm's output may be downloaded from GRC.com,
	  and a Microsoft Windows scripting host (WSH) version of this algorithm may be
	  downloaded and run from the Windows command prompt to generate unique files
	  of any size:
	  The Fermilab "ENT" tests: http://fourmilab.ch/random/
	  The 256-megabyte sample PRN file at GRC: https://www.GRC.com/otg/uheprng.bin
	  The Windows scripting host version: https://www.GRC.com/otg/wsh-uheprng.js
	  ----------------------------------------------------------------------------
	  Qualifying MWC multipliers are: 187884, 686118, 898134, 1104375, 1250205,
	  1460910 and 1768863. (We use the largest one that's < 2^21)
	  ============================================================================ */
	'use strict';

	var stringify = __webpack_require__(113);

	/*  ============================================================================
	This is based upon Johannes Baagoe's carefully designed and efficient hash
	function for use with JavaScript.  It has a proven "avalanche" effect such
	that every bit of the input affects every bit of the output 50% of the time,
	which is good.  See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
	============================================================================
	*/
	var Mash = function Mash() {
	  var n = 0xefc8249d;
	  var mash = function mash(data) {
	    if (data) {
	      data = data.toString();
	      for (var i = 0; i < data.length; i++) {
	        n += data.charCodeAt(i);
	        var h = 0.02519603282416938 * n;
	        n = h >>> 0;
	        h -= n;
	        h *= n;
	        n = h >>> 0;
	        h -= n;
	        n += h * 0x100000000; // 2^32
	      }
	      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
	    } else {
	      n = 0xefc8249d;
	    }
	  };
	  return mash;
	};

	var uheprng = function uheprng(seed) {
	  return function () {
	    var o = 48; // set the 'order' number of ENTROPY-holding 32-bit values
	    var c = 1; // init the 'carry' used by the multiply-with-carry (MWC) algorithm
	    var p = o; // init the 'phase' (max-1) of the intermediate variable pointer
	    var s = new Array(o); // declare our intermediate variables array
	    var i; // general purpose local
	    var j; // general purpose local
	    var k = 0; // general purpose local

	    // when our "uheprng" is initially invoked our PRNG state is initialized from the
	    // browser's own local PRNG. This is okay since although its generator might not
	    // be wonderful, it's useful for establishing large startup entropy for our usage.
	    var mash = new Mash(); // get a pointer to our high-performance "Mash" hash

	    // fill the array with initial mash hash values
	    for (i = 0; i < o; i++) {
	      s[i] = mash(Math.random());
	    }

	    // this PRIVATE (internal access only) function is the heart of the multiply-with-carry
	    // (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
	    // 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
	    // [0-1] return function, and by the random 'string(n)' function which returns 'n'
	    // characters from 33 to 126.
	    var rawprng = function rawprng() {
	      if (++p >= o) {
	        p = 0;
	      }
	      var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
	      return s[p] = t - (c = t | 0);
	    };

	    // this EXPORTED function is the default function returned by this library.
	    // The values returned are integers in the range from 0 to range-1. We first
	    // obtain two 32-bit fractions (from rawprng) to synthesize a single high
	    // resolution 53-bit prng (0 to <1), then we multiply this by the caller's
	    // "range" param and take the "floor" to return a equally probable integer.
	    var random = function random(range) {
	      return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); // 2^-53
	    };

	    // this EXPORTED function 'string(n)' returns a pseudo-random string of
	    // 'n' printable characters ranging from chr(33) to chr(126) inclusive.
	    random.string = function (count) {
	      var i;
	      var s = '';
	      for (i = 0; i < count; i++) {
	        s += String.fromCharCode(33 + random(94));
	      }
	      return s;
	    };

	    // this PRIVATE "hash" function is used to evolve the generator's internal
	    // entropy state. It is also called by the EXPORTED addEntropy() function
	    // which is used to pour entropy into the PRNG.
	    var hash = function hash() {
	      var args = Array.prototype.slice.call(arguments);
	      for (i = 0; i < args.length; i++) {
	        for (j = 0; j < o; j++) {
	          s[j] -= mash(args[i]);
	          if (s[j] < 0) {
	            s[j] += 1;
	          }
	        }
	      }
	    };

	    // this EXPORTED "clean string" function removes leading and trailing spaces and non-printing
	    // control characters, including any embedded carriage-return (CR) and line-feed (LF) characters,
	    // from any string it is handed. this is also used by the 'hashstring' function (below) to help
	    // users always obtain the same EFFECTIVE uheprng seeding key.
	    random.cleanString = function (inStr) {
	      inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ''); // remove any/all leading spaces
	      inStr = inStr.replace(/[\x00-\x1F]/gi, ''); // remove any/all control characters
	      inStr = inStr.replace(/\n /, '\n'); // remove any/all trailing spaces
	      return inStr; // return the cleaned up result
	    };

	    // this EXPORTED "hash string" function hashes the provided character string after first removing
	    // any leading or trailing spaces and ignoring any embedded carriage returns (CR) or Line Feeds (LF)
	    random.hashString = function (inStr) {
	      inStr = random.cleanString(inStr);
	      mash(inStr); // use the string to evolve the 'mash' state
	      for (i = 0; i < inStr.length; i++) {
	        // scan through the characters in our string
	        k = inStr.charCodeAt(i); // get the character code at the location
	        for (j = 0; j < o; j++) {
	          //  "mash" it into the UHEPRNG state
	          s[j] -= mash(k);
	          if (s[j] < 0) {
	            s[j] += 1;
	          }
	        }
	      }
	    };

	    // this EXPORTED function allows you to seed the random generator.
	    random.seed = function (seed) {
	      if (typeof seed === 'undefined' || seed === null) {
	        seed = Math.random();
	      }
	      if (typeof seed !== 'string') {
	        seed = stringify(seed, function (key, value) {
	          if (typeof value === 'function') {
	            return value.toString();
	          }
	          return value;
	        });
	      }
	      random.initState();
	      random.hashString(seed);
	    };

	    // this handy exported function is used to add entropy to our uheprng at any time
	    random.addEntropy = function () /* accept zero or more arguments */{
	      var args = [];
	      for (i = 0; i < arguments.length; i++) {
	        args.push(arguments[i]);
	      }
	      hash(k++ + new Date().getTime() + args.join('') + Math.random());
	    };

	    // if we want to provide a deterministic startup context for our PRNG,
	    // but without directly setting the internal state variables, this allows
	    // us to initialize the mash hash and PRNG's internal state before providing
	    // some hashing input
	    random.initState = function () {
	      mash(); // pass a null arg to force mash hash to init
	      for (i = 0; i < o; i++) {
	        s[i] = mash(' '); // fill the array with initial mash hash values
	      }
	      c = 1; // init our multiply-with-carry carry
	      p = o; // init our phase
	    };

	    // we use this (optional) exported function to signal the JavaScript interpreter
	    // that we're finished using the "Mash" hash function so that it can free up the
	    // local "instance variables" is will have been maintaining.  It's not strictly
	    // necessary, of course, but it's good JavaScript citizenship.
	    random.done = function () {
	      mash = null;
	    };

	    // if we called "uheprng" with a seed value, then execute random.seed() before returning
	    if (typeof seed !== 'undefined') {
	      random.seed(seed);
	    }

	    // Returns a random integer between 0 (inclusive) and range (exclusive)
	    random.range = function (range) {
	      return random(range);
	    };

	    // Returns a random float between 0 (inclusive) and 1 (exclusive)
	    random.random = function () {
	      return random(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
	    };

	    // Returns a random float between min (inclusive) and max (exclusive)
	    random.floatBetween = function (min, max) {
	      return random.random() * (max - min) + min;
	    };

	    // Returns a random integer between min (inclusive) and max (inclusive)
	    random.intBetween = function (min, max) {
	      return Math.floor(random.random() * (max - min + 1)) + min;
	    };

	    // when our main outer "uheprng" function is called, after setting up our
	    // initial variables and entropic state, we return an "instance pointer"
	    // to the internal anonymous function which can then be used to access
	    // the uheprng's various exported functions.  As with the ".done" function
	    // above, we should set the returned value to 'null' once we're finished
	    // using any of these functions.
	    return random;
	  }();
	};

	// Modification for use in node:
	uheprng.create = function (seed) {
	  return new uheprng(seed);
	};
	module.exports = uheprng;

/***/ }),
/* 113 */
/***/ (function(module, exports) {

	exports = module.exports = stringify
	exports.getSerialize = serializer

	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}

	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = []

	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  }

	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this)
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
	    }
	    else stack.push(value)

	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addMap = addMap;
	exports.distance = distance;

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _Audio = __webpack_require__(115);

	var _Audio2 = _interopRequireDefault(_Audio);

	var _cfg = __webpack_require__(21);

	var _Map = __webpack_require__(116);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Add a new map
	 * @param {String}   path
	 * @param {Function} resolve
	 */
	function addMap(path, resolve) {

	  (0, _utils.ajax)(path).then(JSON.parse).then(function (data) {
	    data.path = (0, _utils.getPath)(path);
	    var map = new _Map2.default(this, data, function () {
	      map.instance = this;
	      this.maps[map.name] = map;
	      this.currentMap = this.maps[map.name];
	      if (this.editor !== null) {
	        this.editor.map = this.currentMap;
	      }
	      if (map.settings.music && _cfg.BGM) {
	        _Audio2.default.playSong(map.settings.music, _cfg.VOLUME.MUSIC, true);
	      }
	      /** Map name notification */
	      //this.notify(map, map.name + map.name + map.name + map.name, "MapMessage");
	      return resolve();
	    }.bind(this));
	  }.bind(this));
	}

	/**
	 * Measure distance between entity and camera
	 * @param {Object} entity
	 * @param {Object} camera
	 * @return {Object}
	 */
	function distance(entity, camera) {

	  var distance = _Math2.default.distance(entity.position.x + entity.size.x / 2 + entity.xMargin, entity.position.y + entity.size.y / 2 + entity.position.z + entity.yMargin, (camera.size.x / 2 - camera.position.x) / camera.resolution, (camera.size.y / 2 - camera.position.y) / camera.resolution);

	  distance.x /= 1e2;
	  distance.y /= 1e2;

	  return distance;
	}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Audio
	 * @class Audio
	 * @export
	 */
	var Audio = function () {

	  /**
	   * @constructor
	   */
	  function Audio() {
	    (0, _classCallCheck3.default)(this, Audio);


	    /**
	     * Audio res path
	     * @type {String}
	     */
	    this.path = "assets/audio/";

	    /**
	     * Noises
	     * @type {Array}
	     */
	    this.noises = [];
	  }

	  /**
	   * Play a sound
	   * @param {String} name
	   * @param {Number} vol
	   * @param {Number} x
	   * @param {Number} y
	   */


	  (0, _createClass3.default)(Audio, [{
	    key: "playSound",
	    value: function playSound(name, vol, x, y) {
	      var path = this.path + (name + ".ogg");
	      var sound = new Howl({
	        urls: [path],
	        autoplay: true,
	        loop: false,
	        pos3d: [x, y, vol / 1e3]
	      });
	    }

	    /**
	     * Play a song
	     * @param {String}  name
	     * @param {Number}  vol
	     * @param {Boolean} fadeIn
	     */

	  }, {
	    key: "playSong",
	    value: function playSong(name, vol, fadeIn) {
	      vol = vol / 1e2;
	      var path = this.path + (name + ".ogg");
	      var song = new Howl({
	        urls: [path],
	        autoplay: true,
	        loop: true,
	        volume: fadeIn ? 0 : vol
	      });
	      if (fadeIn) {
	        song.fadeIn(vol, 2e3);
	      }
	    }

	    /**
	     * Play a noise
	     * @param  {String} name
	     * @param  {Number} vol
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Object}
	     */

	  }, {
	    key: "playNoise",
	    value: function playNoise(name, vol, x, y) {
	      var path = this.path + (name + ".ogg");
	      var noise = new Howl({
	        urls: [path],
	        autoplay: true,
	        loop: true,
	        volume: vol / 1e2,
	        pos3d: [x, y, vol / 1e3]
	      });
	      this.noises.push(noise);
	      /** This is for smooth out/in fading noise range area */
	      noise.isInView = true;
	      noise.fadingIn = false;
	      noise.fadingOut = false;
	      return noise;
	    }
	  }]);
	  return Audio;
	}();

	exports.default = Audio = new Audio();

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _Path = __webpack_require__(117);

	var _Path2 = _interopRequireDefault(_Path);

	var _Texture = __webpack_require__(73);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _MapEntity = __webpack_require__(120);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _DisplayObject2 = __webpack_require__(123);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _events = __webpack_require__(124);

	var events = _interopRequireWildcard(_events);

	var _functions = __webpack_require__(114);

	var functions = _interopRequireWildcard(_functions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Map
	 * @class Map
	 * @export
	 */
	var Map = function (_DisplayObject) {
	  (0, _inherits3.default)(Map, _DisplayObject);

	  /**
	   * @param {Object}   instance
	   * @param {Object}   obj
	   * @param {Function} resolve
	   * @constructor
	   */
	  function Map(instance, obj, resolve) {
	    (0, _classCallCheck3.default)(this, Map);

	    /**
	     * Instance
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call(this, null));

	    _this.instance = instance;

	    /**
	     * Tileset
	     * @type {String}
	     */
	    _this.tileset = obj.tileset;

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * Map buffers
	     * @type {Array}
	     */
	    _this.buffers = [];

	    /**
	     * Main map buffer
	     * @type {Object}
	     */
	    _this.mainBuffer = null;

	    /** Map size */
	    _this.width = obj.width;
	    _this.height = obj.height;

	    /**
	     * Map name
	     * @type {String}
	     */
	    _this.name = obj.name;

	    /**
	     * Layers
	     * @type {Array}
	     */
	    _this.layers = obj.layers;

	    /**
	     * Map objects
	     * @type {Object}
	     */
	    _this.objects = {};

	    /**
	     * Object templates
	     * @type {Array}
	     */
	    _this.objTpl = [];

	    /**
	     * Map object templates
	     * @type {Object}
	     */
	    _this.objectTemplates = {};

	    /**
	     * Map entities
	     * @type {Array}
	     */
	    _this.entities = [];

	    /**
	     * Map path
	     * @type {Object}
	     */
	    _this.mapPath = obj.path;

	    /**
	     * Path ref
	     * @type {Object}
	     */
	    _this.path = null;

	    /**
	     * Collision layer ref
	     * @type {Object}
	     */
	    _this.collisionLayer = null;

	    /**
	     * Settings
	     * @type {Object}
	     */
	    _this.settings = {};

	    _this.xMargin = 0;
	    _this.yMargin = 0;

	    /**
	     * Map texture loaded
	     * @type {Boolean}
	     */
	    _this.renderable = false;

	    /** Load texture */
	    (0, _utils.getSprite)(_this.tileset, -1, -1, function (texture) {
	      this.texture = _utils.TextureCache[this.tileset];
	      this.parseLayers();
	      /** Attach path finder */
	      this.path = new _Path2.default(this);
	      _utils.Maps[this.name] = this;
	      if (_cfg.WGL_SUPPORT) {
	        this.glTexture = this.instance.renderer.glRenderer.bufferTexture([this.mainBuffer]);
	      }
	      this.renderable = true;
	      this.loadMapFile(function () {
	        if (resolve instanceof Function) resolve();
	        this.instance.editor.updateTilesetPosition();
	      }.bind(this));
	    }.bind(_this));

	    return _this;
	  }

	  /**
	   * Load map file
	   * @param {Function} resolve
	   */


	  (0, _createClass3.default)(Map, [{
	    key: "loadMapFile",
	    value: function loadMapFile(resolve) {

	      var path = this.mapPath + this.name.toLowerCase() + ".js";

	      (0, _utils.ajax)(path).then(function (data) {
	        var map = new Function(data)();
	        this.entities = map.entities;
	        this.settings = map.settings;
	        this.loadMapObjectTypes();
	        this.loadMapObjects(function () {
	          if (resolve instanceof Function) {
	            return resolve();
	          }
	        });
	      }.bind(this));
	    }

	    /**
	     * Load all map object types
	     */

	  }, {
	    key: "loadMapObjectTypes",
	    value: function loadMapObjectTypes() {

	      var ii = 0;
	      var length = this.entities.length;

	      var entity = null;

	      for (; ii < length; ++ii) {
	        entity = this.entities[ii];
	        if (this.objTpl.indexOf(entity.type) <= -1) {
	          this.objTpl.push(entity.type);
	        }
	      };
	    }

	    /**
	     * Load map objects
	     * @param {Function} resolve
	     */

	  }, {
	    key: "loadMapObjects",
	    value: function loadMapObjects(resolve) {
	      var _this2 = this;

	      var length = this.objTpl.length;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var key = _step.value;

	          var path = _this2.mapPath + "objects/" + key;
	          (0, _utils.ajax)(path + ".json").then(JSON.parse).then(function (data) {
	            data.map = this.name;
	            data.sprite = path + ".png";
	            if (data.normal === true) {
	              data.normalSprite = path + "_normal" + ".png";
	            }
	            this.objects[key] = data;
	            if (--length <= 0) {
	              this.buildEntities();
	              return resolve();
	            }
	          }.bind(_this2));
	        };

	        for (var _iterator = (0, _getIterator3.default)(this.objTpl), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Fusionize entity
	     * @param {Function} resolve
	     */

	  }, {
	    key: "buildEntities",
	    value: function buildEntities(resolve) {

	      var ii = 0;
	      var length = 0;

	      var name = null;

	      length = this.entities.length;

	      for (; ii < length; ++ii) {
	        name = this.entities[ii].type;
	        this.objectTemplates[name] = this.objects[this.entities[ii].type];
	        this.entities[ii] = this.addEntity(this.inheritProperties(this.entities[ii], this.objects[this.entities[ii].type]));
	      };
	    }

	    /**
	     * Inherit properties
	     * @param  {Object} entity
	     * @param  {Object} parent
	     * @return {Object}
	     */

	  }, {
	    key: "inheritProperties",
	    value: function inheritProperties(entity, parent) {

	      var key = null;

	      for (key in parent) {
	        if (entity.hasOwnProperty(key) === false) {
	          entity[key] = parent[key];
	        }
	      };

	      return entity;
	    }

	    /**
	     * Add entity to map
	     * @param {Object} obj
	     */

	  }, {
	    key: "addEntity",
	    value: function addEntity(obj) {
	      return new _MapEntity2.default(obj);
	    }

	    /**
	     * Parse map layers
	     */

	  }, {
	    key: "parseLayers",
	    value: function parseLayers() {

	      var width = this.width * (_cfg.DIMENSION * 2) << 0;
	      var height = this.height * (_cfg.DIMENSION * 2) << 0;

	      var buffer = null;

	      var key = null;
	      var layer = null;

	      for (key in this.layers) {
	        layer = this.layers[key];
	        if (layer.collision === true) {
	          this.collisionLayer = layer;
	          continue;
	        }
	        buffer = (0, _utils.createCanvasBuffer)(width, height);
	        this.renderLayer(buffer, layer.data);
	        this.buffers.push(buffer);
	        buffer = null;
	      };

	      this.mainBuffer = this.buffers[0];

	      this.joinLayers();

	      return void 0;
	    }

	    /**
	     * Join layer buffers
	     */

	  }, {
	    key: "joinLayers",
	    value: function joinLayers() {

	      for (var ii = 1; ii < this.buffers.length; ++ii) {
	        this.mainBuffer.drawImage(this.buffers[ii].canvas, 0, 0);
	      };

	      return void 0;
	    }

	    /**
	     * Render a layer
	     * @param {Object} buffer
	     * @param {Array}  layer
	     */

	  }, {
	    key: "renderLayer",
	    value: function renderLayer(buffer, layer) {

	      var dim = _cfg.DIMENSION * 2;

	      var tile = 0;

	      var x = 0;
	      var y = 0;
	      var xx = 0;
	      var yy = 0;

	      var tileset = this.texture.effect_sprites[0].canvas;

	      var outerLength = layer.length;
	      var innerLength = 0;

	      for (; yy < outerLength; ++yy) {
	        for (!(xx = x = 0) && (innerLength = layer[yy].length) > 0; xx < innerLength; ++xx) {
	          if (layer[yy][xx] > 0) {
	            tile = layer[yy][xx] - 1;
	            buffer.drawImage(tileset, tile % dim * dim, (tile / dim << 0) * dim, dim, dim, x, y, dim, dim);
	          }
	          x += dim;
	        };
	        y += dim;
	      };

	      return void 0;
	    }
	  }]);
	  return Map;
	}(_DisplayObject3.default);

	exports.default = Map;


	(0, _utils.inherit)(Map, events);
	(0, _utils.inherit)(Map, functions);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _astar = __webpack_require__(118);

	var _astar2 = _interopRequireDefault(_astar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Path
	 * @class Path
	 * @export
	 */
	var Path = function () {

	  /**
	   * @param {Object} instance
	   * @constructor
	   */
	  function Path(instance) {
	    (0, _classCallCheck3.default)(this, Path);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Grid
	     * @type {Object}
	     */
	    this.grid = new _astar2.default.Graph(this.instance.collisionLayer.data);
	  }

	  /**
	   * Get shortest path
	   * @param {Number} x1
	   * @param {Number} y1
	   * @param {Number} x2
	   * @param {Number} y2
	   * @return {Array}
	   */


	  (0, _createClass3.default)(Path, [{
	    key: "getShortestPath",
	    value: function getShortestPath(x1, y1, x2, y2) {

	      return _astar2.default.astar.search(this.grid, this.grid.grid[(x1 << 0) / _cfg.DIMENSION][(y1 << 0) / _cfg.DIMENSION], this.grid.grid[(x2 << 0) / _cfg.DIMENSION][(y2 << 0) / _cfg.DIMENSION]);
	    }
	  }]);
	  return Path;
	}();

	exports.default = Path;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = __webpack_require__(84);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// javascript-astar 0.4.1
	// http://github.com/bgrins/javascript-astar
	// Freely distributable under the MIT License.
	// Implements the astar search algorithm in javascript using a Binary Heap.
	// Includes Binary Heap (with modifications) from Marijn Haverbeke.
	// http://eloquentjavascript.net/appendix2.html
	(function (definition) {
	  /* global module, define */
	  if (( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object' && (0, _typeof3.default)(module.exports) === 'object') {
	    module.exports = definition();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    var exports = definition();
	    window.astar = exports.astar;
	    window.Graph = exports.Graph;
	  }
	})(function () {

	  function pathTo(node) {
	    var curr = node;
	    var path = [];
	    while (curr.parent) {
	      path.unshift(curr);
	      curr = curr.parent;
	    }
	    return path;
	  }

	  function getHeap() {
	    return new BinaryHeap(function (node) {
	      return node.f;
	    });
	  }

	  var astar = {
	    /**
	    * Perform an A* Search on a graph given a start and end node.
	    * @param {Graph} graph
	    * @param {GridNode} start
	    * @param {GridNode} end
	    * @param {Object} [options]
	    * @param {bool} [options.closest] Specifies whether to return the
	               path to the closest node if the target is unreachable.
	    * @param {Function} [options.heuristic] Heuristic function (see
	    *          astar.heuristics).
	    */
	    search: function search(graph, start, end, options) {
	      graph.cleanDirty();
	      options = options || {};
	      var heuristic = options.heuristic || astar.heuristics.manhattan;
	      var closest = options.closest || false;

	      var openHeap = getHeap();
	      var closestNode = start; // set the start node to be the closest if required

	      start.h = heuristic(start, end);
	      graph.markDirty(start);

	      openHeap.push(start);

	      while (openHeap.size() > 0) {

	        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
	        var currentNode = openHeap.pop();

	        // End case -- result has been found, return the traced path.
	        if (currentNode === end) {
	          return pathTo(currentNode);
	        }

	        // Normal case -- move currentNode from open to closed, process each of its neighbors.
	        currentNode.closed = true;

	        // Find all neighbors for the current node.
	        var neighbors = graph.neighbors(currentNode);

	        for (var i = 0, il = neighbors.length; i < il; ++i) {
	          var neighbor = neighbors[i];

	          if (neighbor.closed || neighbor.isWall()) {
	            // Not a valid node to process, skip to next neighbor.
	            continue;
	          }

	          // The g score is the shortest distance from start to current node.
	          // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
	          var gScore = currentNode.g + neighbor.getCost(currentNode);
	          var beenVisited = neighbor.visited;

	          if (!beenVisited || gScore < neighbor.g) {

	            // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
	            neighbor.visited = true;
	            neighbor.parent = currentNode;
	            neighbor.h = neighbor.h || heuristic(neighbor, end);
	            neighbor.g = gScore;
	            neighbor.f = neighbor.g + neighbor.h;
	            graph.markDirty(neighbor);
	            if (closest) {
	              // If the neighbour is closer than the current closestNode or if it's equally close but has
	              // a cheaper path than the current closest node then it becomes the closest node
	              if (neighbor.h < closestNode.h || neighbor.h === closestNode.h && neighbor.g < closestNode.g) {
	                closestNode = neighbor;
	              }
	            }

	            if (!beenVisited) {
	              // Pushing to heap will put it in proper place based on the 'f' value.
	              openHeap.push(neighbor);
	            } else {
	              // Already seen the node, but since it has been rescored we need to reorder it in the heap
	              openHeap.rescoreElement(neighbor);
	            }
	          }
	        }
	      }

	      if (closest) {
	        return pathTo(closestNode);
	      }

	      // No result was found - empty array signifies failure to find path.
	      return [];
	    },
	    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
	    heuristics: {
	      manhattan: function manhattan(pos0, pos1) {
	        var d1 = Math.abs(pos1.x - pos0.x);
	        var d2 = Math.abs(pos1.y - pos0.y);
	        return d1 + d2;
	      },
	      diagonal: function diagonal(pos0, pos1) {
	        var D = 1;
	        var D2 = Math.sqrt(2);
	        var d1 = Math.abs(pos1.x - pos0.x);
	        var d2 = Math.abs(pos1.y - pos0.y);
	        return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
	      }
	    },
	    cleanNode: function cleanNode(node) {
	      node.f = 0;
	      node.g = 0;
	      node.h = 0;
	      node.visited = false;
	      node.closed = false;
	      node.parent = null;
	    }
	  };

	  /**
	   * A graph memory structure
	   * @param {Array} gridIn 2D array of input weights
	   * @param {Object} [options]
	   * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
	   */
	  function Graph(gridIn, options) {
	    options = options || {};
	    this.nodes = [];
	    this.diagonal = !!options.diagonal;
	    this.grid = [];
	    for (var x = 0; x < gridIn.length; x++) {
	      this.grid[x] = [];

	      for (var y = 0, row = gridIn[x]; y < row.length; y++) {
	        var node = new GridNode(x, y, row[y]);
	        this.grid[x][y] = node;
	        this.nodes.push(node);
	      }
	    }
	    this.init();
	  }

	  Graph.prototype.init = function () {
	    this.dirtyNodes = [];
	    for (var i = 0; i < this.nodes.length; i++) {
	      astar.cleanNode(this.nodes[i]);
	    }
	  };

	  Graph.prototype.cleanDirty = function () {
	    for (var i = 0; i < this.dirtyNodes.length; i++) {
	      astar.cleanNode(this.dirtyNodes[i]);
	    }
	    this.dirtyNodes = [];
	  };

	  Graph.prototype.markDirty = function (node) {
	    this.dirtyNodes.push(node);
	  };

	  Graph.prototype.neighbors = function (node) {
	    var ret = [];
	    var x = node.x;
	    var y = node.y;
	    var grid = this.grid;

	    // West
	    if (grid[x - 1] && grid[x - 1][y]) {
	      ret.push(grid[x - 1][y]);
	    }

	    // East
	    if (grid[x + 1] && grid[x + 1][y]) {
	      ret.push(grid[x + 1][y]);
	    }

	    // South
	    if (grid[x] && grid[x][y - 1]) {
	      ret.push(grid[x][y - 1]);
	    }

	    // North
	    if (grid[x] && grid[x][y + 1]) {
	      ret.push(grid[x][y + 1]);
	    }

	    if (this.diagonal) {
	      // Southwest
	      if (grid[x - 1] && grid[x - 1][y - 1]) {
	        ret.push(grid[x - 1][y - 1]);
	      }

	      // Southeast
	      if (grid[x + 1] && grid[x + 1][y - 1]) {
	        ret.push(grid[x + 1][y - 1]);
	      }

	      // Northwest
	      if (grid[x - 1] && grid[x - 1][y + 1]) {
	        ret.push(grid[x - 1][y + 1]);
	      }

	      // Northeast
	      if (grid[x + 1] && grid[x + 1][y + 1]) {
	        ret.push(grid[x + 1][y + 1]);
	      }
	    }

	    return ret;
	  };

	  Graph.prototype.toString = function () {
	    var graphString = [];
	    var nodes = this.grid;
	    for (var x = 0; x < nodes.length; x++) {
	      var rowDebug = [];
	      var row = nodes[x];
	      for (var y = 0; y < row.length; y++) {
	        rowDebug.push(row[y].weight);
	      }
	      graphString.push(rowDebug.join(" "));
	    }
	    return graphString.join("\n");
	  };

	  function GridNode(x, y, weight) {
	    this.x = x;
	    this.y = y;
	    this.weight = weight;
	  }

	  GridNode.prototype.toString = function () {
	    return "[" + this.x + " " + this.y + "]";
	  };

	  GridNode.prototype.getCost = function (fromNeighbor) {
	    // Take diagonal weight into consideration.
	    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
	      return this.weight * 1.41421;
	    }
	    return this.weight;
	  };

	  GridNode.prototype.isWall = function () {
	    return this.weight === 0;
	  };

	  function BinaryHeap(scoreFunction) {
	    this.content = [];
	    this.scoreFunction = scoreFunction;
	  }

	  BinaryHeap.prototype = {
	    push: function push(element) {
	      // Add the new element to the end of the array.
	      this.content.push(element);

	      // Allow it to sink down.
	      this.sinkDown(this.content.length - 1);
	    },
	    pop: function pop() {
	      // Store the first element so we can return it later.
	      var result = this.content[0];
	      // Get the element at the end of the array.
	      var end = this.content.pop();
	      // If there are any elements left, put the end element at the
	      // start, and let it bubble up.
	      if (this.content.length > 0) {
	        this.content[0] = end;
	        this.bubbleUp(0);
	      }
	      return result;
	    },
	    remove: function remove(node) {
	      var i = this.content.indexOf(node);

	      // When it is found, the process seen in 'pop' is repeated
	      // to fill up the hole.
	      var end = this.content.pop();

	      if (i !== this.content.length - 1) {
	        this.content[i] = end;

	        if (this.scoreFunction(end) < this.scoreFunction(node)) {
	          this.sinkDown(i);
	        } else {
	          this.bubbleUp(i);
	        }
	      }
	    },
	    size: function size() {
	      return this.content.length;
	    },
	    rescoreElement: function rescoreElement(node) {
	      this.sinkDown(this.content.indexOf(node));
	    },
	    sinkDown: function sinkDown(n) {
	      // Fetch the element that has to be sunk.
	      var element = this.content[n];

	      // When at 0, an element can not sink any further.
	      while (n > 0) {

	        // Compute the parent element's index, and fetch it.
	        var parentN = (n + 1 >> 1) - 1;
	        var parent = this.content[parentN];
	        // Swap the elements if the parent is greater.
	        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	          this.content[parentN] = element;
	          this.content[n] = parent;
	          // Update 'n' to continue at the new position.
	          n = parentN;
	        }
	        // Found a parent that is less, no need to sink any further.
	        else {
	            break;
	          }
	      }
	    },
	    bubbleUp: function bubbleUp(n) {
	      // Look up the target element and its score.
	      var length = this.content.length;
	      var element = this.content[n];
	      var elemScore = this.scoreFunction(element);

	      while (true) {
	        // Compute the indices of the child elements.
	        var child2N = n + 1 << 1;
	        var child1N = child2N - 1;
	        // This is used to store the new position of the element, if any.
	        var swap = null;
	        var child1Score;
	        // If the first child exists (is inside the array)...
	        if (child1N < length) {
	          // Look it up and compute its score.
	          var child1 = this.content[child1N];
	          child1Score = this.scoreFunction(child1);

	          // If the score is less than our element's, we need to swap.
	          if (child1Score < elemScore) {
	            swap = child1N;
	          }
	        }

	        // Do the same checks for the other child.
	        if (child2N < length) {
	          var child2 = this.content[child2N];
	          var child2Score = this.scoreFunction(child2);
	          if (child2Score < (swap === null ? elemScore : child1Score)) {
	            swap = child2N;
	          }
	        }

	        // If the element needs to be moved, swap it, and continue.
	        if (swap !== null) {
	          this.content[n] = this.content[swap];
	          this.content[swap] = element;
	          n = swap;
	        }
	        // Otherwise, we are done.
	        else {
	            break;
	          }
	      }
	    }
	  };

	  return {
	    astar: astar,
	    Graph: Graph
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(119)(module)))

/***/ }),
/* 119 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Entity2 = __webpack_require__(121);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * MapEntity
	 * @class MapEntity
	 * @export
	 */
	var MapEntity = function (_Entity) {
	  (0, _inherits3.default)(MapEntity, _Entity);

	  /**
	   * @param {Object} obj
	   * @constructor
	   */
	  function MapEntity(obj) {
	    var _ret;

	    (0, _classCallCheck3.default)(this, MapEntity);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (MapEntity.__proto__ || (0, _getPrototypeOf2.default)(MapEntity)).call(this, obj));

	    _this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

	    _this.frames = [0, 0];

	    _this.facing = 0;

	    _this.opacity = obj.opacity === void 0 ? 1.0 : obj.opacity;

	    _this.scale = obj.scale === void 0 ? 1.0 : obj.scale;

	    _this.frame = obj.frame === void 0 ? 1 : obj.frame;

	    _this.reversed = [0, 0];

	    _this.reverseShadow = [0, 0];

	    if (obj.collisionBox !== void 0) {
	      _this.collisionBox = obj.collisionBox;
	    }

	    return _ret = _this, (0, _possibleConstructorReturn3.default)(_this, _ret);
	  }

	  /**
	   * Get frame index
	   * @return {Number}
	   */


	  (0, _createClass3.default)(MapEntity, [{
	    key: "getFrameIndex",
	    value: function getFrameIndex() {
	      return 0;
	    }
	  }]);
	  return MapEntity;
	}(_Entity3.default);

	exports.default = MapEntity;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(22);

	var _Shadow = __webpack_require__(122);

	var _Shadow2 = _interopRequireDefault(_Shadow);

	var _Texture = __webpack_require__(73);

	var _Texture2 = _interopRequireDefault(_Texture);

	var _DisplayObject2 = __webpack_require__(123);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Entity
	 * @class Entity
	 * @export
	 */
	var Entity = function (_DisplayObject) {
	  (0, _inherits3.default)(Entity, _DisplayObject);

	  /**
	   * @param {Object} obj
	   * @constructor
	   */
	  function Entity(obj) {
	    var _ret, _ret2;

	    (0, _classCallCheck3.default)(this, Entity);

	    /**
	     * Name
	     * @type {String}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Entity.__proto__ || (0, _getPrototypeOf2.default)(Entity)).call(this, null));

	    _this.name = obj.name || null;

	    /**
	     * Entity's map
	     * @type {Object}
	     */
	    _this.map = obj.map;

	    /**
	     * Last position
	     * @type {Object}
	     */
	    _this.last = new _Math2.default.Point();

	    /**
	     * States
	     * @type {Object}
	     */
	    _this.STATES = {
	      JUMPING: false,
	      ROTATING: false,
	      LOCK: false,
	      EDITING: false,
	      NOISE: false
	    };

	    /**
	     * Socket
	     * @type {Object}
	     */
	    _this.socket = null;

	    /**
	     * Renderable
	     * @type {Boolean}
	     */
	    _this.renderable = false;

	    /**
	     * Jumpable
	     * @type {Boolean}
	     */
	    _this.jumpable = obj.jumpable === void 0 ? true : obj.jumpable;

	    /**
	     * Rotatable
	     * @type {Boolean}
	     */
	    _this.rotatable = obj.rotatable === void 0 ? true : obj.rotatable;

	    /**
	     * Life time
	     * @type {Number}
	     */
	    _this.lifeTime = 0;

	    /**
	     * Z priority
	     * @type {Number}
	     */
	    _this.zIndex = obj.zIndex === void 0 ? 1 : obj.zIndex;

	    /**
	     * Collidable
	     * @type {Boolean}
	     */
	    _this.collidable = obj.collidable || false;

	    /**
	     * Collision box
	     * @type {Array}
	     */
	    _this.collisionBox = obj.collisionBox === void 0 ? [] : obj.collisionBox;

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * Animation
	     * @type {Boolean}
	     */
	    _this.animation = obj.animation === true || false;

	    /**
	     * Animation start
	     * @type {Number}
	     */
	    _this.animationStart = obj.animationStart === void 0 ? 0 : obj.animationStart;

	    /**
	     * Animation speed
	     * @type {Number}
	     */
	    _this.animationSpeed = obj.animationSpeed === void 0 ? 300 : obj.animationSpeed;

	    /**
	     * Looped animation
	     * @type {Boolean}
	     */
	    _this.loop = obj.loop === void 0 ? false : obj.loop;

	    /**
	     * Animation frames
	     * @type {Number}
	     */
	    _this.animationFrames = obj.animationFrames === void 0 ? 0 : obj.animationFrames;

	    /**
	     * Frames
	     * @type {Array}
	     */
	    _this.frames = obj.frames === void 0 ? [0] : obj.frames;

	    /**
	     * Sprite frame
	     * @type {Number}
	     */
	    _this.sFrame = 0;

	    /**
	     * Current frame
	     * @type {Number}
	     */
	    _this.frame = 0;

	    /**
	     * Last frame
	     * @type {Number}
	     */
	    _this.lastFrame = 0;

	    /**
	     * Opacity
	     * @type {Number}
	     */
	    _this.opacity = .0;

	    /**
	     * Gravity
	     * @type {Number}
	     */
	    _this.gravity = _cfg.GRAVITY;

	    /**
	     * Sprite
	     * @type {String}
	     */
	    _this.sprite = obj.sprite;

	    /**
	     * Normal sprite
	     * @type {String}
	     */
	    _this.normalSprite = obj.normalSprite;

	    /**
	     * Reversed facing
	     * @type {Array}
	     */
	    _this.reversed = [2, 3, 0, 1];

	    /**
	     * Reverse shadow
	     * @type {Array}
	     */
	    _this.reverseShadow = [2, 3, 1, 0];

	    /**
	     * Entity scale
	     * @type {Number}
	     */
	    _this.scale = obj.scale === void 0 ? 1 : obj.scale;

	    /**
	     * Animations
	     * @type {Array}
	     */
	    _this.animations = [];

	    /**
	     * Shadow entity ref
	     * @type {Object}
	     */
	    _this.shadow = null;

	    /**
	     * Normal map
	     * @type {Object}
	     */
	    _this.normal = null;

	    /**
	     * Entity has shadow
	     * @type {Boolean}
	     */
	    _this.hasShadow = obj.shadow === void 0 ? true : obj.shadow instanceof _Shadow2.default ? true : obj.shadow;

	    /**
	     * Entity has normal map
	     * @type {Boolean}
	     */
	    _this.hasNormalMap = obj.normal === void 0 ? false : true;

	    /**
	     * Animation index
	     * @type {Number}
	     */
	    _this.animationIndex = 0;

	    /**
	     * Sprite margin
	     * @type {Number}
	     */
	    _this.xMargin = obj.xMargin === void 0 ? 0 : obj.xMargin;
	    _this.yMargin = obj.yMargin === void 0 ? 0 : obj.yMargin;

	    /**
	     * Sizes
	     * @type {Number}
	     */
	    _this.width = 0;
	    _this.height = 0;

	    /**
	     * Position
	     * @type {Number}
	     */
	    _this.x = 0;
	    _this.y = 0;
	    _this.z = 0;
	    _this.r = 0;

	    /**
	     * Floating
	     * @type {Boolean}
	     */
	    _this.floating = false;

	    /**
	     * Absolute positioning
	     * @type {Boolean}
	     */
	    _this.absolute = false;

	    /**
	     * Velocity
	     * @type {Number}
	     */
	    _this.velocity = 1.0;

	    /**
	     * Orbiting
	     * @type {Boolean}
	     */
	    _this.orbit = false;

	    /**
	     * Orbit angle
	     * @type {Number}
	     */
	    _this.orbitAngle = 0;

	    /**
	     * Target to orbit
	     * @type {Object}
	     */
	    _this.orbitTarget = null;

	    /**
	     * Stop orbit
	     * @type {Boolean}
	     */
	    _this.stopOrbit = false;

	    /**
	     * Idle time
	     * @type {Number}
	     */
	    _this.idleTime = 0;

	    if (obj.x !== void 0 && obj.y !== void 0) {
	      _this.x = obj.x;
	      _this.y = obj.y;
	    }

	    /** Entity size */
	    if (obj.width) _this.width = obj.width;
	    if (obj.height) _this.height = obj.height;

	    /**
	     * Shadow offsets
	     * @type {Number}
	     */
	    _this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
	    _this.shadowY = obj.shadowY === void 0 ? -_this.height / 2 : obj.shadowY;

	    /**
	     * WebGL texture
	     * @type {Object}
	     */
	    _this.glTexture = null;

	    /**
	     * Entity numeric type
	     * @type {Number}
	     */
	    _this.type = _this.getEntityType();

	    /**
	     * Entity makes a noise
	     * @type {String}
	     */
	    _this.noise = obj.noise === void 0 ? null : obj.noise;

	    /**
	     * Noise radius
	     * @type {Number}
	     */
	    _this.noiseRadius = obj.noiseRadius === void 0 ? 0 : obj.noiseRadius;

	    /**
	     * Following a entity
	     * @type {String}
	     */
	    _this.following = obj.following === void 0 ? null : obj.following;

	    /**
	     * Follow position
	     * @type {Object}
	     */
	    _this.followTarget = new _Math2.default.Point();

	    /**
	     * Entity to follow
	     * @type {Object}
	     */
	    _this.leader = null;

	    /**
	     * Action trigger
	     * @type {Function}
	     */
	    _this.onAction = null;

	    /**
	     * Enter trigger
	     * @type {Function}
	     */
	    _this.onLoad = null;

	    /**
	     * Enter trigger
	     * @type {Function}
	     */
	    _this.onEnter = null;

	    /**
	     * Leave trigger
	     * @type {Function}
	     */
	    _this.onLeave = null;

	    /**
	     * Collide trigger
	     * @type {Function}
	     */
	    _this.onCollide = null;

	    /**
	     * Jump trigger
	     * @type {Function}
	     */
	    _this.onJump = null;

	    if (obj.onAction !== void 0) {
	      _this.onAction = obj.onAction;
	    }
	    if (obj.onLoad !== void 0) {
	      _this.onLoad = obj.onLoad;
	    }
	    if (obj.onEnter !== void 0) {
	      _this.onEnter = obj.onEnter;
	    }
	    if (obj.onLeave !== void 0) {
	      _this.onLeave = obj.onLeave;
	    }
	    if (obj.onCollide !== void 0) {
	      _this.onCollide = obj.onCollide;
	    }
	    if (obj.onJump !== void 0) {
	      _this.onJump = obj.onJump;
	    }

	    /**
	     * X
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "x", {
	      get: function get() {
	        return this.position.x;
	      },
	      set: function set(value) {
	        this.position.x = value;
	      }
	    });

	    /**
	     * Y
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "y", {
	      get: function get() {
	        return this.position.y;
	      },
	      set: function set(value) {
	        this.position.y = value;
	      }
	    });

	    /**
	     * Z
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "z", {
	      get: function get() {
	        return this.position.z;
	      },
	      set: function set(value) {
	        this.position.z = value;
	      }
	    });
	    _this.z = obj.z === void 0 ? 0 : obj.z;

	    /**
	     * R radius
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "r", {
	      get: function get() {
	        return this.position.r;
	      },
	      set: function set(value) {
	        this.position.r = value;
	      }
	    });
	    _this.r = obj.r === void 0 ? 0 : obj.r;

	    /**
	     * Lock
	     * @type {Number}
	     * @getter
	     * @setter
	     * @overwrite
	     */
	    Object.defineProperty(_this, "lock", {
	      get: function get() {
	        return this.STATES.LOCK;
	      },
	      set: function set(value) {
	        this.STATES.LOCK = value === true;
	      }
	    });

	    if (_cfg.IS_CLIENT === false) return _ret = void 0, (0, _possibleConstructorReturn3.default)(_this, _ret);
	    if (_this.sprite === null) return _ret2 = void 0, (0, _possibleConstructorReturn3.default)(_this, _ret2);

	    /** Load sprite texture */
	    (0, _utils.getSprite)(_this.sprite, _this.width, _this.height, function (texture) {
	      this.texture = texture;
	      /** Shadow texture */
	      if (this.hasShadow === true) {
	        this.shadow = new _Shadow2.default(this);
	        this.shadow.position.set(this.shadowX, this.shadowY);
	      }
	      if (_cfg.WGL_SUPPORT === true) {
	        this.glTexture = _utils.Maps[this.map].instance.renderer.glRenderer.bufferTexture(this.texture.effect_sprites);
	        if (this.hasShadow === true) {
	          this.shadow.glTexture = _utils.Maps[this.map].instance.renderer.glRenderer.bufferTexture(this.shadow.sprites);
	        }
	      }
	      /** Normal map texture */
	      if (this.hasNormalMap === true) {
	        if (this.normalSprite === void 0) {
	          var split = this.sprite.split(".");
	          this.normalSprite = split[0] + "_normal." + split[1];
	        }
	        if (_cfg.WGL_SUPPORT === true) {
	          (0, _utils.getSprite)(this.normalSprite, this.width, this.height, function (texture) {
	            this.normal = _utils.Maps[this.map].instance.renderer.glRenderer.bufferTexture(texture.sprites);
	            this.setup();
	          }.bind(this));
	        } else {
	          this.setup();
	        }
	      } else {
	        this.setup();
	      }
	    }.bind(_this));

	    return _this;
	  }

	  /**
	   * Setup
	   */


	  (0, _createClass3.default)(Entity, [{
	    key: "setup",
	    value: function setup() {

	      /** Follower */
	      if (this.following !== null) {
	        var leader = _utils.Maps[this.map].instance.getEntityByProperty(this.following, "name");
	        leader.leader = this;
	        if (leader.last.x <= 0 || leader.last.y <= 0) {
	          var last = leader.getLastPosition();
	          this.x = leader.x + last.x;
	          this.y = leader.y + last.y;
	        } else {
	          this.x = leader.last.x;
	          this.y = leader.last.y;
	        }
	        this.facing = leader.facing;
	        leader.followTarget.x = this.x;
	        leader.followTarget.y = this.y;
	      }

	      if (this.onLoad !== null && this.onLoad instanceof Function) {
	        this.onLoad();
	      }
	    }

	    /**
	     * Get entity type
	     * @return {Number}
	     */

	  }, {
	    key: "getEntityType",
	    value: function getEntityType() {
	      if (this instanceof Entity) {
	        return _cfg.TYPES.Player;
	      }
	      return _cfg.TYPES.MapEntity;
	    }

	    /**
	     * Orbit around a entity
	     * @param  {Object} target
	     */

	  }, {
	    key: "orbitAround",
	    value: function orbitAround(target) {
	      if (target !== null) {
	        this.orbit = true;
	        this.orbitTarget = target;
	      } else {
	        this.orbit = false;
	      }
	    }

	    /**
	     * Refresh entity states
	     */

	  }, {
	    key: "refreshState",
	    value: function refreshState() {
	      this.STATES.JUMPING = this.z !== 0;
	      this.STATES.ROTATING = this.r !== 0;
	    }

	    /**
	     * Jump
	     */

	  }, {
	    key: "jump",
	    value: function jump(resolve) {

	      if (this.jumpable === false) return void 0;

	      this.refreshState();

	      if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	      this.STATES.JUMPING = true;

	      this.idleTime = 0;

	      this.jumpCB = resolve || null;
	    }

	    /**
	     * Jumping
	     */

	  }, {
	    key: "jumping",
	    value: function jumping() {

	      this.z += this.gravity;

	      this.refreshState();

	      if (this.z < 0) {
	        this.gravity += .1;
	      } else {
	        this.gravity = _cfg.GRAVITY;
	        this.z = 0;
	        this.updateShadow();
	        this.refreshState();
	        if (this.jumpCB) {
	          this.jumpCB();
	        }
	      }
	    }

	    /**
	     * Update shadow
	     */

	  }, {
	    key: "updateShadow",
	    value: function updateShadow() {

	      if (this.hasShadow === true) {
	        if (this.z < 0) {
	          this.shadow.position.x = -(this.z / 2);
	          this.shadow.position.y = this.shadowY - this.z;
	          this.shadow.scale.x = this.z;
	          this.shadow.scale.y = this.z;
	        } else {
	          this.shadow.position.x = this.shadowX;
	          this.shadow.position.y = this.shadowY;
	          this.shadow.scale.x = 0;
	          this.shadow.scale.y = 0;
	        }
	      }

	      return void 0;
	    }

	    /** Animate */

	  }, {
	    key: "animate",
	    value: function animate() {

	      if (this.STATES.JUMPING === true) {
	        this.jumping();
	      }

	      if (this.animations.length <= 0) return void 0;

	      this.animationIndex = 0;

	      for (var ii = 0; ii < this.animations.length; ++ii) {
	        this[this.animations[this.animationIndex].type](this.animations[this.animationIndex]);
	        this.animationIndex++;
	      };
	    }

	    /**
	     * Stop current animation
	     */

	  }, {
	    key: "stopAnimation",
	    value: function stopAnimation() {
	      this.animations.splice(this.animationIndex, 1);
	    }

	    /**
	     * Entity has customized opacity
	     * @return {Boolean}
	     */

	  }, {
	    key: "customOpacity",
	    value: function customOpacity() {
	      return this.opacity !== 1.0 && this.opacity !== 0.0;
	    }

	    /**
	     * Fade in
	     * @param {Number}   speed
	     * @param {Function} resolve
	     */

	  }, {
	    key: "fadeIn",
	    value: function fadeIn() {
	      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : speed || 1;
	      var resolve = arguments[1];

	      this.animations.push({
	        type: "fade",
	        fade: 1,
	        speed: speed
	      });
	      this.fadeInCB = resolve || null;
	    }

	    /**
	     * Fade out
	     * @param {Number}   speed
	     * @param {Boolean}  kill
	     * @param {Function} resolve
	     */

	  }, {
	    key: "fadeOut",
	    value: function fadeOut() {
	      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : speed || 1;
	      var kill = arguments[1];
	      var resolve = arguments[2];

	      this.animations.push({
	        type: "fade",
	        fade: 0,
	        kill: kill,
	        speed: speed
	      });
	      this.fadeOutCB = resolve || null;
	    }

	    /**
	     * Fade animation
	     * @param {Object} animation
	     */

	  }, {
	    key: "fade",
	    value: function fade(animation) {

	      var speed = animation.speed / 4 / 10;

	      this.opacity += animation.fade === 1 ? speed : -speed;

	      if (animation.fade === 1 && this.opacity > 1) {
	        this.opacity = 1.0;
	        this.stopAnimation();
	        if (this.fadeInCB !== null) {
	          this.fadeInCB();
	          this.fadeInCB = null;
	        }
	      } else if (animation.fade === 0 && this.opacity < 0) {
	        this.opacity = animation.kill === true ? -.01 : .0;
	        if (this.fadeOutCB !== null) {
	          this.fadeOutCB();
	        }
	        this.stopAnimation();
	      }
	    }

	    /**
	     * Rotate
	     * @param {Number} amount -1 ^= Infinite
	     */

	  }, {
	    key: "rotate",
	    value: function rotate(amount) {

	      if (this.rotatable === false) return void 0;

	      this.animations.push({
	        type: "rotation",
	        rotations: amount || -1,
	        rotationAmount: 0
	      });
	    }

	    /**
	     * Rotate animation
	     * @param {Object} entity
	     * @param {Number} amount
	     */

	  }, {
	    key: "rotation",
	    value: function rotation(animation) {

	      this.r += 1 * (Math.PI / 180);

	      if (this.r >= Math.PI / 2 * 4) {
	        animation.rotationAmount++;
	        this.r = .0;
	        /** Finite rotation */
	        if (animation.rotations !== -1) {
	          if (animation.rotationAmount >= animation.rotations) {
	            this.stopAnimation();
	          }
	        }
	      }

	      this.refreshState();
	    }

	    /**
	     * Shadow facing
	     * @param  {Number} dir
	     * @return {Number}
	     */

	  }, {
	    key: "shadowFacing",
	    value: function shadowFacing(dir) {
	      return this.reverseShadow[dir];
	    }

	    /**
	     * Reverse dir
	     * @param  {Number} dir
	     * @return {Number}
	     */

	  }, {
	    key: "reverseDir",
	    value: function reverseDir(dir) {
	      return this.reversed[dir];
	    }

	    /**
	     * Facing to key
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "facingToKey",
	    value: function facingToKey(facing) {
	      return facing === _cfg.LEFT ? 37 : facing === _cfg.UP ? 38 : facing === _cfg.RIGHT ? 39 : facing === _cfg.DOWN ? 40 : 38;
	    }

	    /**
	     * Key to facing
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "keyToFacing",
	    value: function keyToFacing(key) {
	      return key === 37 ? _cfg.LEFT : key === 38 ? _cfg.UP : key === 39 ? _cfg.RIGHT : key === 40 ? _cfg.DOWN : _cfg.UP;
	    }

	    /**
	     * Opposit facing
	     * @param  {Number} key
	     * @return {Number}
	     */

	  }, {
	    key: "oppositFacing",
	    value: function oppositFacing(key) {
	      return key === _cfg.LEFT ? _cfg.RIGHT : key === _cfg.RIGHT ? _cfg.LEFT : key === _cfg.DOWN ? _cfg.UP : key === _cfg.UP ? _cfg.DOWN : _cfg.UP;
	    }
	  }]);
	  return Entity;
	}(_DisplayObject3.default);

	exports.default = Entity;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(123);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	var _utils = __webpack_require__(22);

	var _effects = __webpack_require__(74);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Shadow
	 * @class Shadow
	 * @export
	 */
	var Shadow = function (_DisplayObject) {
	  (0, _inherits3.default)(Shadow, _DisplayObject);

	  /**
	   * @param {Object} parent
	   * @constructor
	   */
	  function Shadow(parent) {
	    (0, _classCallCheck3.default)(this, Shadow);

	    /**
	     * Parent ref
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Shadow.__proto__ || (0, _getPrototypeOf2.default)(Shadow)).call(this, null));

	    _this.parent = parent;

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * GL texture
	     * @type {Object}
	     */
	    _this.glTexture = null;

	    /**
	     * Splitted sprites
	     * @type {Array}
	     */
	    _this.sprites = [];

	    _this.scale.set(0, 0);

	    _this.init();

	    return _this;
	  }

	  /**
	   * Initialise
	   * Build shadow
	   */


	  (0, _createClass3.default)(Shadow, [{
	    key: "init",
	    value: function init() {

	      this.texture = this.buildShadow();
	    }

	    /**
	     * Build shadow
	     * @return {Object}
	     */

	  }, {
	    key: "buildShadow",
	    value: function buildShadow() {

	      var ii = 0;
	      var length = 0;

	      var buffer = null;

	      var parent = this.parent.texture;

	      var width = 0;
	      var height = 0;

	      length = parent.sprites.length;

	      for (; ii < length; ++ii) {
	        width = parent.sprites[ii].canvas.width;
	        height = parent.sprites[ii].canvas.height;
	        buffer = (0, _utils.createCanvasBuffer)(width, height);
	        buffer.translate(0, height);
	        buffer.scale(1, -1);
	        this.drawShadow(parent.sprites[ii], buffer, width, height);
	        buffer.setTransform(1, 0, 0, 1, 0, 0);
	        this.sprites[ii] = buffer;
	        buffer = null;
	      };

	      return this;
	    }

	    /**
	     * Create shadow of a sprite
	     * @param {Object} buffer
	     * @param {Object} ctx
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }, {
	    key: "drawShadow",
	    value: function drawShadow(buffer, ctx, width, height) {

	      ctx.clear();

	      ctx.drawImage(buffer.canvas, 0, 0, width, height);

	      this.drawTint(ctx, 0, 0, width, height, _cfg.SHADOW_ALPHA * 1e2);
	    }

	    /**
	     * Tint a canvas
	     * @param {Object} ctx
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     * @param {Number} value
	     */

	  }, {
	    key: "drawTint",
	    value: function drawTint(ctx, x, y, width, height, value) {

	      var imgData = ctx.getImageData(x, y, width, height);

	      (0, _effects.colorizePixels)(imgData, 0, 0, value, true);

	      ctx.putImageData(imgData, x, y);
	    }
	  }]);
	  return Shadow;
	}(_DisplayObject3.default);

	exports.default = Shadow;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Display object
	 * @class DisplayObject
	 * @export
	 */
	var DisplayObject =

	/**
	 * @constructor
	 * @param {Number} width
	 * @param {Number} height
	 */
	function DisplayObject(x, y, width, height) {
	  (0, _classCallCheck3.default)(this, DisplayObject);


	  /**
	   * Unique id
	   * @type {Number}
	   */
	  this.id = (0, _utils.uHash)();

	  /**
	   * Position
	   * @type {Object}
	   */
	  this.position = new _Math2.default.Point(x !== void 0 ? x : 0, y !== void 0 ? y : 0);

	  /** 
	   * Size
	   * @type {Object}
	   */
	  this.size = new _Math2.default.Point(width !== void 0 ? width : 0, height !== void 0 ? height : 0);

	  /** 
	   * Scale factor
	   * @type {Object}
	   */
	  this.scale = new _Math2.default.Point(1, 1);

	  /**
	   * X
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "x", {
	    get: function get() {
	      return this.position.x;
	    },
	    set: function set(value) {
	      this.position.x = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Y
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "y", {
	    get: function get() {
	      return this.position.y;
	    },
	    set: function set(value) {
	      this.position.y = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Width
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "width", {
	    get: function get() {
	      return this.size.x;
	    },
	    set: function set(value) {
	      this.size.x = value;
	    },
	    configurable: true,
	    enumerable: true
	  });

	  /**
	   * Height
	   * @type {Number}
	   * @getter
	   * @setter
	   */
	  Object.defineProperty(this, "height", {
	    get: function get() {
	      return this.size.y;
	    },
	    set: function set(value) {
	      this.size.y = value;
	    },
	    configurable: true,
	    enumerable: true
	  });
	};

	exports.default = DisplayObject;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.triggerEvent = triggerEvent;
	exports.actionTrigger = actionTrigger;
	exports.isObstacle = isObstacle;
	exports.isEntityCollidable = isEntityCollidable;
	exports.collidesWithCollisionBox = collidesWithCollisionBox;

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Trigger events
	 * @param {Object} entity
	 * @param {Object} parent
	 * @param {String} event
	 */
	function triggerEvent(entity, parent, event) {

	  var cmd = entity[event];

	  /** Collide event */
	  if (cmd !== null) {
	    /** JavaScript API */
	    if (cmd.JavaScript !== void 0) {
	      cmd.JavaScript.bind(entity)(parent, this);
	    }
	    /** EngelScript API */
	    if (cmd.EngelScript !== void 0) {
	      this.instance.environment.run(parent, entity, cmd.EngelScript);
	    } else {
	      if (cmd.JavaScript === void 0) {
	        if (cmd instanceof Function) {
	          cmd.bind(entity)(parent, this);
	        }
	      }
	    }
	  }

	  return void 0;
	}

	/**
	 * Action trigger
	 * @param {Object} position
	 * @param {Object} entity
	 */
	function actionTrigger(position, entity) {

	  var entities = this.entities;

	  var ii = 0;
	  var length = entities.length;

	  var event = null;

	  var id = entity.id;

	  var x = position.x << 0;
	  var y = position.y << 0;

	  for (; ii < length; ++ii) {
	    event = entities[ii];
	    if (event.id === id) continue;
	    if (event.x << 0 === x && event.y << 0 === y) {
	      this.triggerEvent(event, entity, "onAction");
	    }
	  };

	  return void 0;
	}

	/**
	 * Obstacle check
	 * @param {Object} entity
	 * @param {Number} dir
	 * @return {Boolean}
	 */
	function isObstacle(entity, dir) {

	  var position = _Math2.default.getTilePosition(entity.x << 0, entity.y << 0, dir << 0);

	  return this.collisionLayer.data[(position.y << 0) / _cfg.DIMENSION][(position.x << 0) / _cfg.DIMENSION] === 0 || this.isEntityCollidable(entity, position.x, position.y) === true;
	}

	/**
	 * Entity collidable check
	 * @param  {Object} entity
	 * @param  {Number} x
	 * @param  {Number} y
	 * @return {Boolean}
	 */
	function isEntityCollidable(entity, x, y) {

	  var entities = this.entities;

	  var ii = 0;
	  var length = entities.length;

	  var intersection = false;

	  var collide = false;

	  var id = entity.id;

	  var event = null;

	  for (; ii < length; ++ii) {
	    event = entities[ii];
	    if (event.id === id) continue;
	    intersection = _Math2.default.linearIntersect(event.position.x << 0, event.position.y << 0, _Math2.default.roundTo(event.size.x, _cfg.DIMENSION) * event.scale + event.xMargin - _cfg.DIMENSION, _Math2.default.roundTo(event.size.y, _cfg.DIMENSION) * event.scale + event.yMargin - _cfg.DIMENSION, x, y, 1);
	    /** Entity is a collidable */
	    if (event.collidable === true) {
	      /** Collision box */
	      if (event.collisionBox.length > 0) {
	        if (this.collidesWithCollisionBox(event, x, y) === true) {
	          this.triggerEvent(event, entity, "onCollide");
	          collide = true;
	        }
	        /** Cubic based collision */
	      } else {
	        if (intersection === true) {
	          this.triggerEvent(event, entity, "onCollide");
	          collide = true;
	        }
	      }
	    } else {
	      if (_Math2.default.linearIntersect(event.position.x << 0, event.position.y << 0, _Math2.default.roundTo(event.size.x, _cfg.DIMENSION) * event.scale + event.xMargin - _cfg.DIMENSION, _Math2.default.roundTo(event.size.y, _cfg.DIMENSION) * event.scale + event.yMargin - _cfg.DIMENSION, entity.position.x << 0, entity.position.y << 0, 1) === true) {
	        this.triggerEvent(event, entity, "onLeave");
	      }
	      if (intersection === true) {
	        this.triggerEvent(event, entity, "onEnter");
	      }
	    }
	  };

	  return collide;
	}

	/**
	 * Collides with a entity collision box
	 * @param  {Number} entity
	 * @param  {Number} x
	 * @param  {Number} y
	 * @return {Boolean}
	 */
	function collidesWithCollisionBox(entity, x, y) {

	  var tile = 0;

	  var ii = 0;

	  var xx = 0;
	  var yy = 0;

	  var dim = _cfg.DIMENSION * entity.scale;

	  var width = (_Math2.default.roundTo(entity.size.x, _cfg.DIMENSION) + entity.xMargin) / _cfg.DIMENSION;
	  var height = (_Math2.default.roundTo(entity.size.y, _cfg.DIMENSION) + entity.yMargin) / _cfg.DIMENSION;

	  var length = width * height;

	  var eX = entity.position.x << 0;
	  var eY = entity.position.y << 0;

	  for (; ii < length; ++ii) {
	    tile = entity.collisionBox[yy + xx];
	    if (tile === 1) {
	      if (eX + xx * dim === x && eY + yy / width * dim === y) {
	        return true;
	      }
	    }
	    ++xx;
	    if (xx >= width) {
	      yy += width;
	      xx = 0;
	    }
	  };

	  return false;
	}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateEntityNoise = updateEntityNoise;

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _Audio = __webpack_require__(115);

	var _Audio2 = _interopRequireDefault(_Audio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Update entity noise
	 * @param {Object} entity
	 * @param {Object} distance
	 */
	function updateEntityNoise(entity, dist) {

	  var radius = 0;

	  var cx = 0;
	  var cy = 0;
	  var dx = 0;
	  var dy = 0;

	  if (_cfg.BGS === false) {
	    dist.x = 99999;
	    dist.y = 99999;
	    radius = 0;
	    if (entity.noise._audioNode !== void 0) {
	      entity.noise._audioNode[0].gain.value = 0;
	    }
	  }

	  radius = entity.noiseRadius - _cfg.DIMENSION || _cfg.DIMENSION;
	  cx = radius / 2;
	  cy = radius / 2;
	  dx = Math.floor(dist.x * 1e2) + cx;
	  dy = Math.floor(dist.y * 1e2) + cy;

	  if (entity.STATES.NOISE === false) {
	    entity.noiseSrcPath = entity.noise;
	    entity.noise = _Audio2.default.playNoise(entity.noise, _cfg.VOLUME.ENTITY_NOISE, dist.x, dist.y);
	    entity.STATES.NOISE = true;
	  }

	  if (_Math2.default.pointIntersectsCircle(dx, dy, cx, cy, radius) === true) {
	    if (entity.noise.isInView === false) {
	      var gainNode = entity.noise._audioNode[0];
	      entity.noise.fadingIn = true;
	      var start = gainNode.context.currentTime;
	      var end = start + 1;
	      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, start);
	      gainNode.gain.linearRampToValueAtTime(_cfg.VOLUME.ENTITY_NOISE / 1e2, end);
	      entity.noise.isInView = true;
	    }
	  } else {
	    if (entity.noise.isInView === true) {
	      var _gainNode = entity.noise._audioNode[0];
	      entity.noise.fadingOut = true;
	      var _start = _gainNode.context.currentTime;
	      var _end = _start + 1;
	      _gainNode.gain.linearRampToValueAtTime(_gainNode.gain.value, _start);
	      _gainNode.gain.linearRampToValueAtTime(.0, _end);
	      entity.noise.isInView = false;
	    }
	  }

	  entity.noise.pos3d(dist.x, dist.y, 0);

	  return void 0;
	}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logic = logic;
	exports.updateNotification = updateNotification;
	exports.orbit = orbit;
	exports.float = float;
	exports.updateEntity = updateEntity;
	exports.isRenderable = isRenderable;

	var _cfg = __webpack_require__(21);

	/**
	 * Logic loop
	 */
	function logic() {

	  if (this.currentMap === null) return void 0;

	  /** Depth sort entities */
	  this.sort();

	  var ii = 0;
	  var length = 0;

	  var entity = null;
	  var entities = this.currentMap.entities;

	  length = entities.length;

	  for (; ii < length; ++ii) {
	    entity = entities[ii];
	    entity.idleTime++;
	    entity.renderable = this.updateEntity(entity);
	    if (entity.type === _cfg.TYPES.Notification) {
	      this.updateNotification(entity);
	    }
	    if (entity.opacity < 0) {
	      this.removeEntity(entity);
	      --length;
	      --ii;
	      continue;
	    }
	    if (entity.noise === null) continue;
	    this.updateEntityNoise(entity, this.currentMap.distance(entity, this.camera));
	  };

	  return void 0;
	}

	/**
	 * Update notification
	 * @param {Object} entity
	 */
	function updateNotification(entity) {

	  entity.xPadding = Math.max(entity.follow.size.x, entity.size.x / 2) / 2 - entity.follow.size.x / 2 - entity.follow.xMargin - (entity.size.x === entity.follow.size.x ? _cfg.DIMENSION : 0);

	  entity.yPadding = entity.size.y;
	}

	/**
	 * Orbit animation
	 * @param {Object} entity
	 */
	function orbit(entity) {

	  entity.orbitAngle += entity.velocity * 2 * Math.PI / 180;

	  var target = entity.orbitTarget;

	  var radius = (target.size.x * target.scale + target.size.y * target.scale) / _cfg.DIMENSION * 2;

	  var xPadding = radius - _cfg.DIMENSION / 2;
	  var yPadding = radius - _cfg.DIMENSION / 2;

	  xPadding += target.xMargin;
	  yPadding += target.yMargin / 2;

	  entity.x = target.position.x + xPadding + radius * Math.cos(entity.orbitAngle);
	  entity.y = target.position.y + yPadding + radius * Math.sin(entity.orbitAngle);

	  /** Stop the orbit on a dimension friendly position */
	  if (entity.stopOrbit === true && (entity.x << 0) % 8 === 0 && (entity.y << 0) % 8 === 0) {
	    entity.x = math.roundTo(entity.x, _cfg.DIMENSION);
	    entity.y = math.roundTo(entity.y, _cfg.DIMENSION);
	    entity.orbitAround(null);
	    entity.stopOrbit = false;
	  }

	  /*if (entity.orbitAngle > 360) {
	    entity.orbitAngle = 0;
	  }*/

	  return void 0;
	}

	/**
	 * Floating animation
	 * TODO: ENTITY CAN ONLY WALK IF ON FLOOR (Z =^ 0)
	 * @param {Object} entity
	 */
	function float(entity) {

	  entity.z += entity.gravity / 5;

	  if (entity.z < 0) {
	    entity.gravity += .1 / 5;
	  } else {
	    entity.gravity = _cfg.GRAVITY;
	    entity.z = 0;
	    entity.updateShadow();
	    entity.refreshState();
	  }

	  entity.updateShadow();

	  return void 0;
	}

	/**
	 * Update entity
	 * @param  {Object} entity
	 * @return {Boolean} renderable
	 */
	function updateEntity(entity) {

	  if (entity.lifeTime > 0) {
	    if (this.renderer.now >= entity.lifeTime) {
	      entity.lifeTime = 0;
	      entity.fadeOut(1, true);
	    }
	  }

	  entity.scaling = entity.scale + -entity.position.z / this.camera.resolution / ((entity.size.x + entity.size.y) / 2);

	  entity.animate();

	  if (entity.orbit === true) {
	    this.orbit(entity);
	  }

	  if (entity.floating === true) {
	    this.float(entity);
	  }

	  if (entity.z !== 0) {
	    entity.updateShadow();
	  }

	  if (entity.absolute === true) {
	    return this.isRenderable(entity) === true;
	  }

	  if (this.camera.isInView(entity.position.x + entity.xMargin, entity.position.y + entity.yMargin, entity.size.x * entity.scale, entity.size.y * 2 * entity.scale + entity.shadowY) === false) {
	    return false;
	  }

	  if (this.isRenderable(entity) === false) {
	    return false;
	  }

	  this.renderer.updateEntitySpriteFrame(entity);

	  return true;
	}

	/**
	 * Entity is renderable
	 * @param  {Object}  entity
	 * @return {Boolean} renderable
	 */
	function isRenderable(entity) {
	  return entity.texture !== null && entity.opacity !== .0;
	}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addEntity = addEntity;
	exports.cloneEntity = cloneEntity;
	exports.getEntityByProperty = getEntityByProperty;
	exports.removeEntity = removeEntity;
	exports.removeEntityFromArray = removeEntityFromArray;
	exports.getEntityById = getEntityById;
	exports.removeEntityById = removeEntityById;

	var _cfg = __webpack_require__(21);

	var _MapEntity = __webpack_require__(120);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _index = __webpack_require__(121);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Add a new entity
	 * @param {Object} entity
	 * @export
	 */
	function addEntity(entity) {

	  if (entity.isLocalPlayer) {
	    entity.instance = this.instance;
	    this.localEntity = entity;
	  }

	  if (entity.customOpacity() === false) {
	    entity.fadeIn(1);
	  }

	  if (entity.noise) {
	    if (entity.noise._audioNode !== void 0) {
	      entity.noise._audioNode[0].gain.linearRampToValueAtTime(_cfg.VOLUME.ENTITY_NOISE / 1e2, entity.noise._audioNode[0].context.currentTime);
	    }
	  }

	  this.currentMap.entities.push(entity);
	}

	/**
	 * Clone a entity
	 * @param  {Object} entity
	 * @return {Object}
	 */
	function cloneEntity(entity) {

	  var entities = this.instance.entities;

	  var map = this.currentMap;

	  var clone = null;
	  var tmp = null;

	  if (entity instanceof entities.Player) {
	    tmp = new entities.Player({
	      name: "undefined",
	      map: entity.map,
	      x: entity.x, y: entity.y,
	      zIndex: entity.zIndex,
	      sprite: entity.sprite,
	      width: entity.width, height: entity.height,
	      isLocalPlayer: false,
	      collidable: entity.collidable,
	      shadow: entity.hasShadow
	    });
	    if (entity.instance) {
	      tmp.instance = entity.instance;
	    }
	    if (tmp.hasShadow) {
	      tmp.shadow.x = entity.shadow.x;
	      tmp.shadow.y = entity.shadow.y;
	    }
	  } else if (entity instanceof _MapEntity2.default) {
	    tmp = map.objectTemplates[entity.name.toLowerCase()];
	  } else {
	    return void 0;
	  }

	  tmp.x = entity.x;
	  tmp.y = entity.y;
	  tmp.z = entity.z;

	  if (entity instanceof _MapEntity2.default) {
	    clone = new _MapEntity2.default(entity);
	    if (entity.noise) {
	      clone.noiseSrcPath = entity.noiseSrcPath;
	      clone.noise = clone.noiseSrcPath;
	    }
	    if (entity.normal) {
	      clone.normal = entity.normal;
	    }
	  } else {
	    clone = tmp;
	  }

	  return clone;
	}

	/**
	 * Get a entity by its
	 * matching property
	 * @param {*} key
	 * @param {String} prop
	 * @return {Number}
	 */
	function getEntityByProperty(key, prop) {

	  var ii = 0;
	  var length = 0;

	  length = this.currentMap.entities.length;

	  for (; ii < length; ++ii) {
	    if (this.currentMap.entities[ii][prop] === key) {
	      return this.currentMap.entities[ii];
	    }
	  };

	  return -1;
	}

	/**
	 * Remove a entity
	 * @param {Object} entity
	 */
	function removeEntity(entity) {

	  var noiseEntity = null;

	  /** Clear entity selection */
	  if (this.editor.entitySelection !== null && entity.id === this.editor.entitySelection.id) {
	    this.editor.entitySelection = null;
	  }

	  if (entity.noise) {
	    if (entity.noise._audioNode !== void 0) {
	      entity.noise._audioNode[0].gain.linearRampToValueAtTime(.0, entity.noise._audioNode[0].context.currentTime);
	    }
	  }

	  this.removeEntityFromArray(entity, this.currentMap.entities);
	}

	/**
	 * Remove a entity from an array
	 * @param  {Object} entity
	 * @param  {Array}  entities
	 * @return {Object}
	 */
	function removeEntityFromArray(entity, array) {

	  var ii = 0;
	  var length = 0;

	  var id = entity.id;

	  var cache = null;

	  length = array.length;

	  for (; ii < length; ++ii) {
	    if (array[ii].id === id) {
	      cache = array[ii];
	      array[ii] = null;
	      array.splice(ii, 1);
	      return cache;
	    }
	  };

	  return void 0;
	}

	/**
	 * Get a entity
	 * @param {Number} id
	 * @return {Number}
	 */
	function getEntityById(id) {

	  var property = "id";

	  var index = 0;

	  return this.getEntityByProperty(id, property);
	}

	/**
	 * Remove a entity by its id
	 * @param {Number} id
	 */
	function removeEntityById(id) {

	  var entity = null;

	  if ((entity = this.getEntityByProperty(id, property)) === void 0) return void 0;

	  this.removeEntity(entity);
	}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _DisplayObject2 = __webpack_require__(123);

	var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Camera
	 * @class Camera
	 * @export
	 */
	var Camera = function (_DisplayObject) {
	  (0, _inherits3.default)(Camera, _DisplayObject);

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function Camera(instance) {
	    (0, _classCallCheck3.default)(this, Camera);

	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Camera.__proto__ || (0, _getPrototypeOf2.default)(Camera)).call(this, null));

	    _this.instance = instance;

	    /**
	     * Camera size
	     * @type {Number}
	     */
	    _this.width = instance.width;
	    _this.height = instance.height;

	    /**
	     * Drag offset
	     * @type {Object}
	     */
	    _this.drag = {
	      px: 0,
	      py: 0,
	      pz: 0,
	      sx: 0,
	      sy: 0
	    };

	    /**
	     * Dragging state
	     * @type {Boolean}
	     */
	    _this.dragging = false;

	    /** Camera size */
	    _this.size.set(_this.width || 0, _this.height || 0);

	    /**
	     * Camera scaling
	     * @type {Number}
	     */
	    _this.scaling = .0;

	    /**
	     * Camera calculated resolution
	     * @type {Number}
	     */
	    _this.resolution = .0;

	    /**
	     * Base offset
	     * @type {Object}
	     */
	    _this.base = new _Math2.default.Point(.0, .0);

	    /**
	     * Target offset
	     * @type {Object}
	     */
	    _this.target = new _Math2.default.Point(.0, .0);

	    /**
	     * Object to focus
	     * @type {Object}
	     */
	    _this.objectFocus = null;

	    /**
	     * Scale
	     * @type {Number}
	     * @getter
	     * @setter
	     */
	    Object.defineProperty(_this, "scale", {
	      get: function get() {
	        return this.scaling;
	      },
	      set: function set(value) {
	        this.scaling = value;
	        this.refreshResolution();
	      }
	    });

	    return _this;
	  }

	  /**
	   * Get game relative mouse offset
	   * @param  {Number} x clientX
	   * @param  {Number} y clientY
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Camera, [{
	    key: "getGameMouseOffset",
	    value: function getGameMouseOffset(x, y) {

	      var xx = (x - this.x) / this.resolution;
	      var yy = (y - this.y) / this.resolution;

	      return {
	        x: Math.ceil(xx / _cfg.DIMENSION) * _cfg.DIMENSION - _cfg.DIMENSION << 0,
	        y: Math.ceil(yy / _cfg.DIMENSION) * _cfg.DIMENSION - _cfg.DIMENSION << 0
	      };
	    }

	    /**
	     * Move
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "move",
	    value: function move(x, y) {

	      this.x += x - this.drag.px;
	      this.y += y - this.drag.py;

	      this.drag.px = x;
	      this.drag.py = y;
	    }

	    /**
	     * Click
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "click",
	    value: function click(x, y) {

	      this.drag.sx = (x - this.x) / this.resolution;
	      this.drag.sy = (y - this.y) / this.resolution;

	      this.drag.px = x;
	      this.drag.py = y;
	    }

	    /**
	     * Refresh the resolution
	     */

	  }, {
	    key: "refreshResolution",
	    value: function refreshResolution() {
	      this.resolution = _Math2.default.roundTo(parseFloat(_Math2.default.zoomScale(this.scale)), _cfg.PIXEL_SCALE);
	    }

	    /**
	     * Zoom
	     * @param {Object} e
	     */

	  }, {
	    key: "zoom",
	    value: function zoom(e) {

	      var delta = e.deltaY === -0 ? e.deltaX : e.deltaY;

	      var amount = delta > 0 ? -100 : 100;

	      amount = amount / 2 / (_Math2.default.hypot(this.size.x, this.size.y) / Math.PI) * _Math2.default.zoomScale(this.scale);

	      this.drag.pz = this.resolution;

	      this.scale += amount / 2;

	      if (this.scale < _cfg.MIN_SCALE) this.scale = _cfg.MIN_SCALE;
	      if (this.scale > _cfg.MAX_SCALE) this.scale = _cfg.MAX_SCALE;

	      var focus = this.objectFocus;

	      if (_cfg.FREE_CAMERA === true) {
	        this.position.x -= this.drag.sx * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	        this.position.y -= this.drag.sy * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	      } else {
	        if (focus !== null) {
	          this.position.x -= (focus.position.x + focus.size.x * focus.scale / 2 + focus.xMargin) * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	          this.position.y -= (focus.position.y + (focus.size.y * focus.scale / 2 + focus.yMargin + focus.z)) * (_Math2.default.zoomScale(this.resolution) - _Math2.default.zoomScale(this.drag.pz));
	        }
	      }
	    }

	    /**
	     * Get x center position
	     * @param  {Object} object
	     * @return {Number}
	     */

	  }, {
	    key: "getX",
	    value: function getX(object) {
	      return this.size.x / 2 - (object.position.x + object.size.x * object.scale / 2 + object.xMargin) * this.resolution;
	    }

	    /**
	     * Get y center position
	     * @param  {Object} object
	     * @return {Number}
	     */

	  }, {
	    key: "getY",
	    value: function getY(object) {
	      return this.size.y / 2 - (object.position.y + (object.size.y * object.scale / 2 + object.yMargin + object.z)) * this.resolution;
	    }

	    /**
	     * Update object focus
	     * @param  {Number} object
	     */

	  }, {
	    key: "updateFocus",
	    value: function updateFocus(object) {

	      this.base = {
	        x: this.position.x,
	        y: this.position.y
	      };

	      this.target = {
	        x: this.getX(object),
	        y: this.getY(object)
	      };

	      this.deltaX = this.target.x - this.base.x;
	      this.deltaY = this.target.y - this.base.y;

	      return void 0;
	    }

	    /**
	     * Play camera animations
	     * @param {Object} object
	     */

	  }, {
	    key: "animate",
	    value: function animate(object) {

	      if (_cfg.FREE_CAMERA === true) return void 0;

	      this.updateFocus(object);

	      var velocity = _cfg.EASING_CAMERA === true ? 0 : _Math2.default.ease(Math.atan(_cfg.DEBUG_FPS / 60 + .05));

	      var x = Math.round((this.target.x - (this.base.x + velocity * this.deltaX)) * 1e2) / 1e2;
	      var y = Math.round((this.target.y - (this.base.y + velocity * this.deltaY)) * 1e2) / 1e2;

	      if (x !== -0 && x !== 0) {
	        this.position.x += x;
	      }

	      if (y !== -0 && y !== 0) {
	        this.position.y += y;
	      }

	      return void 0;
	    }

	    /**
	     * Animate focus
	     * @param {Object} object
	     */

	  }, {
	    key: "animateFocus",
	    value: function animateFocus(object) {
	      this.updateFocus(object);
	      this.objectFocus = object;
	    }

	    /**
	     * Focus a object
	     * @param {Object}  object
	     * @param {Boolean} instant
	     */

	  }, {
	    key: "focus",
	    value: function focus(object, instant) {
	      if (object === null || object === void 0 || object === -1) return void 0;
	      if (instant === true) {
	        this.objectFocus = object;
	        this.position.x = this.getX(object);
	        this.position.y = this.getY(object);
	        return void 0;
	      }
	      this.animateFocus(object);
	    }

	    /**
	     * Cubic in view
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     * @return {Boolean}
	     */

	  }, {
	    key: "inView",
	    value: function inView(x, y, width, height) {

	      return x + width >= 0 && x <= this.size.x && y + height >= 0 && y <= this.size.y;
	    }

	    /**
	     * Is in view
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }, {
	    key: "isInView",
	    value: function isInView(x, y, width, height) {

	      return this.inView(x * this.resolution + this.position.x << 0, y * this.resolution + this.position.y << 0, width * this.resolution << 0, height * this.resolution << 0);
	    }
	  }]);
	  return Camera;
	}(_DisplayObject3.default);

	exports.default = Camera;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _render = __webpack_require__(130);

	var render = _interopRequireWildcard(_render);

	var _tileset = __webpack_require__(131);

	var tileset = _interopRequireWildcard(_tileset);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _Commander = __webpack_require__(132);

	var _Commander2 = _interopRequireDefault(_Commander);

	var _commands = __webpack_require__(133);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Editor
	 * @class Editor
	 * @export
	 */
	var Editor = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function Editor(instance) {
	    (0, _classCallCheck3.default)(this, Editor);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Context ref
	     * @type {Object}
	     */
	    this.context = instance.context;

	    /**
	     * Instance reference
	     * @type {Object}
	     */
	    this.commander = new _Commander2.default();

	    /**
	     * Map reference
	     * @type {Object}
	     */
	    this.map = null;

	    /**
	     * Camera reference
	     * @type {Object}
	     */
	    this.camera = null;

	    /**
	     * Selected entity
	     * @type {Object}
	     */
	    this.entitySelection = null;

	    /**
	     * Selection
	     * @type {Object}
	     */
	    this.selection = {
	      x1: 0,
	      y1: 0,
	      x2: 0,
	      y2: 0
	    };

	    this.selectedEntities = [];

	    /**
	     * Copied entity
	     * @type {Object}
	     */
	    this.entityCopy = null;

	    /**
	     * Pasted entity
	     * @type {Object}
	     */
	    this.pastedEntity = null;

	    /**
	     * Editing states
	     * @type {Object}
	     */
	    this.STATES = {
	      DRAGGING: false,
	      SELECTING: false
	    };

	    /**
	     * Drag helper
	     * @type {Object}
	     */
	    this.drag = new _Math2.default.Point(0, 0);

	    /**
	     * Tileset position
	     * @type {Object}
	     */
	    this.tileset = new _Math2.default.Point(0, 0);

	    /**
	     * Dragging
	     * @type {Boolean}
	     * @getter
	     * @setter
	     */
	    Object.defineProperty(this, "dragging", {
	      get: function get() {
	        return this.STATES.DRAGGING;
	      },
	      set: function set(value) {
	        this.STATES.DRAGGING = value;
	      }
	    });

	    this.inheritInstance(instance);

	    this.init();
	  }

	  /**
	   * Inherit instance
	   * @param {Object} instance
	   */


	  (0, _createClass3.default)(Editor, [{
	    key: "inheritInstance",
	    value: function inheritInstance(instance) {

	      this.map = instance.currentMap;

	      this.camera = instance.camera;
	    }

	    /**
	     * Initialise
	     */

	  }, {
	    key: "init",
	    value: function init() {

	      /** Register all commands */
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(_commands.commands), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var cmd = _step.value;

	          this.commander.newCommand(cmd);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Do a selection
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "selectFrom",
	    value: function selectFrom(x, y) {

	      var offset = this.camera.getGameMouseOffset(x, y);

	      this.selection.x1 = offset.x;
	      this.selection.y1 = offset.y;

	      this.selection.x2 = 0;
	      this.selection.y2 = 0;
	    }

	    /**
	     * Do a selection
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "selectTo",
	    value: function selectTo(x, y) {

	      var offset = this.camera.getGameMouseOffset(x, y);

	      this.selection.x2 = offset.x;
	      this.selection.y2 = offset.y;

	      this.getSelectionRange(this.selection.x1, this.selection.y1, this.selection.x2, this.selection.y2);
	    }

	    /**
	     * Get selection out of a range
	     * @param {Number} x1
	     * @param {Number} y1
	     * @param {Number} x2
	     * @param {Number} y2
	     */

	  }, {
	    key: "getSelectionRange",
	    value: function getSelectionRange(x1, y1, x2, y2) {

	      var entity = null;

	      var entities = [];

	      var ii = 0;
	      var length = 0;

	      var xx1 = x1 > x2 ? x2 : x1 - _cfg.DIMENSION;
	      var yy1 = y1 > y2 ? y2 : y1;

	      var width = Math.abs(x2 - x1);
	      var height = Math.abs(y2 - y1);

	      var eWidth = 0;
	      var eHeight = 0;

	      length = this.map.entities.length;

	      for (; ii < length; ++ii) {
	        entity = this.map.entities[ii];
	        eWidth = _Math2.default.roundTo(entity.width, _cfg.DIMENSION) * entity.scale + (x2 >= x1 ? -_cfg.DIMENSION : 0);
	        eHeight = _Math2.default.roundTo(entity.height, _cfg.DIMENSION) * entity.scale;
	        if (_Math2.default.linearIntersect(xx1, yy1, width + eWidth - _cfg.DIMENSION, height + eHeight - _cfg.DIMENSION, entity.x + entity.xMargin + eWidth - _cfg.DIMENSION, entity.y + entity.yMargin + entity.z + _cfg.Y_DEPTH_HACK + eHeight - _cfg.DIMENSION, 1)) {
	          entities.push(entity.id);
	        }
	      };

	      this.selectedEntities = entities;
	    }

	    /**
	     * Get a entity by mouse offset
	     * @param  {Number} x
	     * @param  {Number} y
	     * @param  {Object}
	     * @return {Object}
	     */

	  }, {
	    key: "getEntityByMouse",
	    value: function getEntityByMouse(x, y) {

	      var object = null;

	      var entity = null;

	      var offset = this.camera.getGameMouseOffset(x, y);

	      var xx = offset.x << 0;
	      var yy = offset.y << 0;

	      var ii = 0;
	      var length = this.map.entities.length;;

	      var entities = [];

	      for (; ii < length; ++ii) {
	        entity = this.map.entities[ii];
	        if (_Math2.default.linearIntersect(_Math2.default.roundTo(entity.position.x, _cfg.DIMENSION), _Math2.default.roundTo(entity.position.y, _cfg.DIMENSION) << 0, _Math2.default.roundTo(entity.width, _cfg.DIMENSION) * entity.scale + entity.xMargin - _cfg.DIMENSION, _Math2.default.roundTo(entity.height, _cfg.DIMENSION) * entity.scale + entity.yMargin - _cfg.DIMENSION, xx, yy, 1) === true) {
	          entities.push(entity);
	        }
	      };

	      if (entities.length <= 0) return null;

	      return entities[_Math2.default.get2DClosest(entities, xx, yy)];
	    }

	    /**
	     * Drag a entity
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "dragEntity",
	    value: function dragEntity(x, y) {

	      var entity = null;
	      var offset = null;

	      var xx = 0;
	      var yy = 0;

	      if ((entity = this.entitySelection) === null) return void 0;

	      /** Don't allow dragging of focused entity */
	      if (_cfg.FREE_CAMERA === false && this.camera.objectFocus !== null && entity.id === this.camera.objectFocus.id) {
	        return void 0;
	      }

	      offset = this.camera.getGameMouseOffset(x, y);

	      /** Only fire drag if we got a new offset to drag to */
	      if (offset.x === this.drag.x && offset.y === this.drag.y) return void 0;

	      xx = offset.x - this.drag.x;
	      yy = offset.y - this.drag.y;

	      this.commander.push("drag", entity, [xx, yy]);

	      this.drag.x = offset.x;
	      this.drag.y = offset.y;
	    }

	    /**
	     * Select a entity
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "selectEntity",
	    value: function selectEntity(x, y) {

	      var entity = this.getEntityByMouse(x, y);

	      var offset = this.camera.getGameMouseOffset(x, y);

	      if (entity !== null && entity.texture !== null) {
	        if ((0, _utils.tileContainsImageData)(entity.texture.sprites[entity.sFrame], (offset.x - entity.x) / entity.scale << 0, (offset.y - entity.y) / entity.scale << 0, _cfg.DIMENSION, _cfg.DIMENSION) === false) {
	          entity = null;
	        }
	      }

	      this.commander.push("select", this, [entity, this.entitySelection]);

	      this.drag.x = offset.x;
	      this.drag.y = offset.y;
	    }

	    /**
	     * Edit a entity
	     * @param {Number} x
	     * @param {Number} y
	     */

	  }, {
	    key: "editEntity",
	    value: function editEntity(x, y) {

	      var entity = this.getEntityByMouse(x, y);

	      if (entity === null) return void 0;

	      console.log(entity);
	    }

	    /**
	     * Delete selected entity
	     */

	  }, {
	    key: "deleteEntity",
	    value: function deleteEntity() {

	      if (this.entitySelection !== null) {
	        this.commander.push("delete", this, [this.entitySelection]);
	      }
	    }

	    /**
	     * Cut out selected entity
	     */

	  }, {
	    key: "cutEntity",
	    value: function cutEntity() {

	      if (this.entitySelection !== null) {
	        this.commander.push("cut", this, [this.entitySelection]);
	      }
	    }

	    /**
	     * Copy selected entity
	     */

	  }, {
	    key: "copyEntity",
	    value: function copyEntity() {

	      if (this.entitySelection !== null) {
	        this.commander.push("copy", this, [this.entitySelection, this.entityCopy]);
	      }
	    }

	    /**
	     * Paste selected entity
	     */

	  }, {
	    key: "pasteEntity",
	    value: function pasteEntity() {

	      this.commander.push("paste", this, [this.entitySelection, this.pastedEntity]);
	    }
	  }]);
	  return Editor;
	}();

	exports.default = Editor;


	(0, _utils.inherit)(Editor, render);
	(0, _utils.inherit)(Editor, tileset);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderEditorMode = renderEditorMode;
	exports.renderSelectedEntities = renderSelectedEntities;
	exports.renderSelection = renderSelection;
	exports.renderEntitySelection = renderEntitySelection;
	exports.renderEntityNoise = renderEntityNoise;
	exports.renderEntityCollisionBox = renderEntityCollisionBox;
	exports.renderSelectionText = renderSelectionText;

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Edit mode
	 */
	function renderEditorMode() {

	  this.renderSelection();

	  if (this.instance.editor.STATES.SELECTING === true) {
	    //this.renderSelectedEntities();
	  }

	  this.renderEntitySelection();
	}

	/**
	 * Render selected entities
	 */
	function renderSelectedEntities() {

	  var ii = 0;
	  var length = 0;

	  var entity = null;
	  var entities = this.instance.editor.selectedEntities;

	  length = entities.length;

	  var resolution = 0;

	  var x = 0;
	  var y = 0;

	  var width = 0;
	  var height = 0;

	  for (; ii < length; ++ii) {

	    entity = entities[ii];

	    resolution = this.camera.resolution;

	    x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	    y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	    width = entity.size.x * resolution << 0;
	    height = entity.size.y * resolution << 0;

	    this.context.beginPath();

	    this.context.strokeStyle = "red";
	    this.context.lineWidth = resolution / 2 << 0;
	    this.context.strokeRect(x, y, width, height);
	    this.context.stroke();

	    this.context.closePath();
	  };
	}

	/**
	 * Render selection
	 */
	function renderSelection() {

	  if (this.instance.editor.STATES.SELECTING === false) return void 0;

	  var selection = this.instance.editor.selection;

	  var resolution = this.camera.resolution;

	  var x = this.camera.x + selection.x1 * resolution << 0;
	  var y = this.camera.y + selection.y1 * resolution << 0;

	  var width = (selection.x2 - selection.x1) * resolution << 0;
	  var height = (selection.y2 - selection.y1) * resolution << 0;

	  this.context.beginPath();

	  this.context.strokeStyle = "red";
	  this.context.lineWidth = resolution / 2 << 0;
	  this.context.strokeRect(x, y, width, height);
	  this.context.stroke();

	  this.context.closePath();

	  return void 0;
	}

	/**
	 * Render entity selection
	 */
	function renderEntitySelection() {

	  var entity = this.instance.editor.entitySelection;

	  if (entity === null) return void 0;

	  if (this.camera.isInView(entity.position.x, entity.position.y, entity.size.x * entity.scale, entity.size.y * entity.scale) === false) return void 0;
	  if (entity.opacity === .0) return void 0;
	  if (entity.texture === null) return void 0;

	  var resolution = this.camera.resolution;

	  var x = this.camera.x + (entity.position.x + entity.xMargin) * resolution << 0;
	  var y = this.camera.y + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;

	  var width = entity.size.x * entity.scale * resolution << 0;
	  var height = entity.size.y * entity.scale * resolution << 0;

	  if (entity.noise !== null) {
	    this.renderEntityNoise(entity, x, y, width, height);
	  }

	  this.context.beginPath();

	  this.context.strokeStyle = "red";
	  this.context.lineWidth = resolution / 2 << 0;
	  this.context.strokeRect(x, y, width, height);
	  this.context.stroke();

	  this.context.closePath();

	  this.renderSelectionText(entity, x, y);

	  this.context.globalAlpha = .25;

	  if (entity.collidable === true) {
	    if (entity.collisionBox.length > 0) {
	      this.renderEntityCollisionBox(entity, x, y);
	    } else {
	      this.context.fillStyle = "red";
	      this.context.fillRect(x, y, width, height);
	      this.context.fill();
	    }
	  }

	  this.context.globalAlpha = 1.0;

	  return void 0;
	}

	/**
	 * Render entity noise radius
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 */
	function renderEntityNoise(entity, x, y, width, height) {

	  var resolution = this.camera.resolution;

	  var radius = (entity.noiseRadius - _cfg.DIMENSION || _cfg.DIMENSION) * resolution;

	  x += width / 2;
	  y += height / 2;

	  this.context.globalAlpha = .2;

	  this.context.beginPath();

	  this.context.fillStyle = "green";
	  this.context.lineWidth = resolution / 2 << 0;
	  this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
	  this.context.fill();

	  this.context.closePath();

	  this.context.globalAlpha = 1.0;

	  return void 0;
	}

	/**
	 * Render entity collision box
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 */
	function renderEntityCollisionBox(entity, x, y) {

	  var collision = entity.collisionBox;

	  var resolution = this.camera.resolution;

	  var tile = 0;

	  var ii = 0;

	  var xx = 0;
	  var yy = 0;

	  var dim = _cfg.DIMENSION * entity.scale * resolution;

	  var width = entity.width / _cfg.DIMENSION;
	  var height = entity.height / _cfg.DIMENSION;

	  var length = width * height;

	  for (; ii < length; ++ii) {
	    tile = collision[yy + xx];
	    if (tile === 1) {
	      this.context.fillStyle = "red";
	      this.context.fillRect(x + xx * dim, y + yy / width * dim, dim, dim);
	      this.context.fill();
	    }
	    ++xx;
	    if (xx >= width) {
	      yy += width;
	      xx = 0;
	    }
	  };

	  return void 0;
	}

	/**
	 * Render entity selection text
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 */
	function renderSelectionText(entity, x, y) {

	  var resolution = this.camera.resolution;

	  var color = "red";

	  var ln = .5 * resolution;
	  var size = 2.5 * resolution;

	  var xx = x;
	  var yy = y - ln * 1.25 - size;

	  var decimals = 1;

	  var txtX = "X: " + entity.position.x.toFixed(decimals);
	  var txtY = "Y: " + entity.position.y.toFixed(decimals);

	  this.instance.renderer.drawPixelText(txtX, xx, yy, size, ln, color);

	  this.instance.renderer.drawPixelText(txtY, xx, yy += size, size, ln, color);

	  return void 0;
	}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateTilesetPosition = updateTilesetPosition;
	exports.clickedInsideTileset = clickedInsideTileset;
	exports.selectTile = selectTile;

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	function updateTilesetPosition() {
	  if (this.instance.currentMap !== null) {
	    var width = this.instance.currentMap.texture.width;
	    var height = this.instance.currentMap.texture.height;
	    this.tileset.x = _cfg.DIMENSION + this.instance.width - width;
	    this.tileset.y = 0;
	  }
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	function clickedInsideTileset(x, y) {
	  var tileX = this.instance.editor.tileset.x;
	  var tileY = this.instance.editor.tileset.y;
	  var tileWidth = this.instance.currentMap.texture.width;
	  var tileHeight = this.instance.currentMap.texture.height;
	  return x >= tileX && x <= tileX + tileWidth && y >= tileY && y <= tileY + tileHeight;
	}

	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	function selectTile(x, y) {

	  console.log(x, y);
	}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Commander
	 * @class Commander
	 * @export
	 */
	var Commander = function () {

	  /**
	   * @constructor
	   */
	  function Commander() {
	    (0, _classCallCheck3.default)(this, Commander);


	    /**
	     * Stack position
	     * @type {Number}
	     */
	    this.position = -1;

	    /**
	     * Command templates
	     * @type {Object}
	     */
	    this.commands = {};

	    /**
	     * Command stack
	     * @type {Array}
	     */
	    this.stack = [];
	  }

	  /**
	   * Register a new command
	   * @param {Object} cmd
	   */


	  (0, _createClass3.default)(Commander, [{
	    key: "newCommand",
	    value: function newCommand(cmd) {
	      this.commands[cmd.action] = cmd;
	      cmd = null;
	    }

	    /**
	     * Push a command
	     * @param {String} action
	     * @param {Object} scope
	     * @param {Array} data
	     */

	  }, {
	    key: "push",
	    value: function push(action, scope, data) {

	      var cmd = {
	        action: action,
	        data: data,
	        scope: scope
	      };

	      this.stack.splice(this.position + 1, this.stack.length);

	      this.stack.push(cmd);

	      this.redo();
	      this.undo();
	      this.redo();
	      this.undo();
	      this.redo();
	    }

	    /**
	     * Fire command
	     * @param {Object} cmd
	     * @param {String} action
	     */

	  }, {
	    key: "fire",
	    value: function fire(cmd, action) {
	      var template = this.commands[cmd.action][action];
	      template.bind(cmd.scope).apply(template, cmd.data);
	    }

	    /**
	     * Get cmd from current stack index
	     * @return {Object}
	     */

	  }, {
	    key: "getCurrentCmd",
	    value: function getCurrentCmd() {
	      return this.stack[this.position];
	    }

	    /**
	     * Undo
	     */

	  }, {
	    key: "undo",
	    value: function undo() {

	      if (this.position >= 0) {
	        this.fire(this.getCurrentCmd(), "onUndo");
	        this.position--;
	      }
	    }

	    /**
	     * Redo
	     */

	  }, {
	    key: "redo",
	    value: function redo() {

	      if (this.position < this.stack.length - 1) {
	        this.position++;
	        this.fire(this.getCurrentCmd(), "onRedo");
	      }
	    }
	  }]);
	  return Commander;
	}();

	exports.default = Commander;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.commands = undefined;

	var _cfg = __webpack_require__(21);

	var commands = exports.commands = [
	/** Select command */
	{
	  action: "select",
	  onUndo: function onUndo(entity, selection) {
	    this.entitySelection = null;
	    this.entitySelection = selection;
	  },
	  onRedo: function onRedo(entity, selection) {
	    this.entitySelection = null;
	    this.entitySelection = entity;
	  }
	},
	/** Drag command */
	{
	  action: "drag",
	  onUndo: function onUndo(x, y) {
	    this.x -= x;
	    this.y -= y;
	    this.y <<= 0;
	    this.y += _cfg.Y_DEPTH_HACK;
	    this.last.x = this.x;
	    this.last.y = this.y;
	  },
	  onRedo: function onRedo(x, y) {
	    this.x += x;
	    this.y += y;
	    this.y <<= 0;
	    this.y += _cfg.Y_DEPTH_HACK;
	    this.last.x = this.x;
	    this.last.y = this.y;
	  }
	},
	/** Delete command */
	{
	  action: "delete",
	  onUndo: function onUndo(entity) {
	    this.instance.addEntity(entity);
	    this.entitySelection = entity;
	  },
	  onRedo: function onRedo(entity) {
	    this.instance.removeEntity(entity);
	    this.entitySelection = null;
	  }
	},
	/** Cut command */
	{
	  action: "cut",
	  onUndo: function onUndo(entity) {
	    this.instance.editor.pasteEntity();
	  },
	  onRedo: function onRedo(entity) {
	    this.instance.editor.copyEntity();
	    this.instance.editor.deleteEntity();
	  }
	},
	/** Copy command */
	{
	  action: "copy",
	  onUndo: function onUndo(entity, copy) {
	    this.entityCopy = copy;
	    this.entitySelection = copy;
	  },
	  onRedo: function onRedo(entity, copy) {
	    this.entityCopy = entity;
	    this.entitySelection = entity;
	  }
	},
	/** Paste command */
	{
	  action: "paste",
	  onUndo: function onUndo(entity, paste) {
	    this.instance.removeEntity(paste);
	  },
	  onRedo: function onRedo(entity, paste) {

	    var map = this.map;

	    if (paste !== null && paste !== void 0) {
	      map.instance.addEntity(paste);
	      return void 0;
	    }

	    var clone = this.instance.cloneEntity(entity);

	    /** Fuck that */
	    this.instance.editor.commander.stack[this.instance.editor.commander.position].data[1] = clone;

	    map.instance.addEntity(clone);
	  }
	}];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _MapEntity = __webpack_require__(120);

	var _MapEntity2 = _interopRequireDefault(_MapEntity);

	var _Camera = __webpack_require__(128);

	var _Camera2 = _interopRequireDefault(_Camera);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * MiniMap
	 * @class MiniMap
	 * @export
	 */
	var MiniMap = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function MiniMap(instance) {
	    (0, _classCallCheck3.default)(this, MiniMap);


	    /**
	     * Game instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Camera ref
	     * @type {Object}
	     */
	    this.camera = new _Camera2.default(this);

	    /**
	     * Camera size ref
	     * @type {Object}
	     */
	    this.camera.size = this.instance.camera.size;

	    /**
	     * Camera pos ref
	     * @type {Object}
	     */
	    this.camera.position = this.instance.camera.position;

	    /**
	     * Width
	     * @type {Number}
	     */
	    this.width = 300;

	    /**
	     * Height
	     * @type {Number}
	     */
	    this.height = 200;

	    /**
	     * Minimap buffer
	     * @type {Object}
	     */
	    this.buffer = null;

	    /**
	     * Minimap background buffer
	     * @type {Object}
	     */
	    this.bgBuffer = null;

	    /**
	     * Minimap front buffer
	     * @type {Object}
	     */
	    this.frBuffer = null;

	    /**
	     * Redraw state
	     * @type {Boolean}
	     */
	    this.redraw = true;

	    this.entities = {};

	    this.resolution = 1.0;

	    this.position = new _Math2.default.Point();

	    this.init();
	  }

	  /**
	   * Initialise
	   */


	  (0, _createClass3.default)(MiniMap, [{
	    key: "init",
	    value: function init() {

	      this.buffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	      this.bgBuffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	      this.frBuffer = (0, _utils.createCanvasBuffer)(this.width, this.height);

	      this.createEntityBuffer("Player", "#DBB78A", "#905A23");
	      this.createEntityBuffer("Entity", "#697a21", "#c9db8a");
	      this.createEntityBuffer("LocalPlayer", "#119617", "#abf4c0");
	      this.createEntityBuffer("Tree", "#697a21", "darkgreen");

	      this.resize();

	      this.draw();
	    }

	    /**
	     * Resize
	     */

	  }, {
	    key: "resize",
	    value: function resize() {

	      this.position.x = this.camera.width - this.width;
	      this.position.y = this.camera.height - this.height;
	    }

	    /**
	     * Mouse inside this map offset
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Boolean}
	     */

	  }, {
	    key: "inside",
	    value: function inside(x, y) {

	      return _Math2.default.cubicCollision(x, y, 1, 1, this.position.x, this.position.y, this.width, this.height);
	    }

	    /**
	     * Create a entity buffer
	     * @param {String} type
	     * @param {String} fillColor
	     * @param {String} strokeColor
	     */

	  }, {
	    key: "createEntityBuffer",
	    value: function createEntityBuffer(type, fillColor, strokeColor) {

	      var radius = 6;

	      var width = 16;
	      var height = 16;

	      var link = null;

	      this.entities[type] = (0, _utils.createCanvasBuffer)(width, height);

	      link = this.entities[type];

	      link.beginPath();
	      link.arc(width / 2, height / 2, radius, 0, 2 * Math.PI, false);
	      link.fillStyle = fillColor;
	      link.fill();
	      link.lineWidth = 1.5;
	      link.strokeStyle = strokeColor;
	      link.stroke();
	    }

	    /**
	     * Draw mini map
	     * @param {Number} mode
	     * @param {Array}  entities
	     */

	  }, {
	    key: "draw",
	    value: function draw(mode, entities) {

	      this.buffer.clear();
	      this.bgBuffer.clear();
	      this.frBuffer.clear();

	      /** Redraw everything */
	      if (mode === 0) {
	        this.drawBackground();
	        this.drawFront(entities);
	        return void 0;
	      }

	      /** Redraw front only */
	      if (mode === 1) {
	        this.drawFront(entities);
	        return void 0;
	      }

	      return void 0;
	    }

	    /**
	     * Draw a background
	     */

	  }, {
	    key: "drawBackground",
	    value: function drawBackground() {

	      this.bgBuffer.strokeStyle = "red";
	      this.bgBuffer.strokeRect(0, 0, this.width, this.height);
	      this.bgBuffer.stroke();

	      return void 0;
	    }

	    /**
	     * Draw the front layer
	     * @param {Array} entities
	     */

	  }, {
	    key: "drawFront",
	    value: function drawFront(entities) {

	      var entity = null;

	      var ii = 0;
	      var length = 0;

	      length = entities.length;

	      var resolution = this.instance.camera.resolution;
	      var scaling = .0;

	      var camX = this.width / 2 - (this.camera.size.x / 2 - this.camera.position.x) / resolution;
	      var camY = this.height / 2 - (this.camera.size.y / 2 - this.camera.position.y) / resolution;

	      var color = null;

	      var x = 0;
	      var y = 0;

	      var width = 0;
	      var height = 0;

	      for (; ii < length; ++ii) {
	        entity = entities[ii];
	        scaling = entity.scale + -entity.z / this.resolution / ((entity.width + entity.height) / 2);
	        if (entity.texture === null) continue;
	        x = (camX + entity.x + entity.xMargin + entity.z / (entity.width / 2) / 2) * this.resolution << 0;
	        y = (camY + entity.y + entity.yMargin + entity.z) * this.resolution << 0;
	        width = entity.size.x * scaling << 0;
	        height = entity.size.y * scaling << 0;
	        this.drawEntity(entity, x, y, width, height);
	      };

	      this.drawCameraViewport(camX, camY);

	      return void 0;
	    }

	    /**
	     * Draw a entity
	     * @param  {Object} entity
	     * @param  {Number} x
	     * @param  {Number} y
	     * @param  {Number} width
	     * @param  {Number} height
	     */

	  }, {
	    key: "drawEntity",
	    value: function drawEntity(entity, x, y, width, height) {

	      var tmpl = null;

	      var Player = this.instance.instance.entities.Player;

	      if (this.instance.localEntity !== null && entity.id === this.instance.localEntity.id) {
	        tmpl = this.entities["LocalPlayer"];
	      } else if (entity instanceof Player) {
	        tmpl = this.entities["Player"];
	      } else if (entity.name === "Tree") {
	        tmpl = this.entities["Tree"];
	      } else {
	        tmpl = this.entities["Entity"];
	      }

	      this.bgBuffer.drawImage(tmpl.canvas, x, y);

	      return void 0;
	    }

	    /**
	     * Draw camera viewport
	     */

	  }, {
	    key: "drawCameraViewport",
	    value: function drawCameraViewport(x, y) {

	      var resolution = this.instance.camera.resolution;

	      this.bgBuffer.lineWidth = 1;
	      this.bgBuffer.strokeStyle = "red";
	      this.bgBuffer.strokeRect(x - this.camera.position.x / resolution, y - this.camera.position.y / resolution, this.camera.size.x / resolution, this.camera.size.y / resolution);
	      this.bgBuffer.stroke();

	      return void 0;
	    }
	  }]);
	  return MiniMap;
	}();

	exports.default = MiniMap;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Language
	 * @class Language
	 * @export
	 */
	var Language = function () {

	  /**
	   * @param {Function} resolve
	   * @constructor
	   */
	  function Language(resolve) {
	    var _this = this;

	    (0, _classCallCheck3.default)(this, Language);


	    /**
	     * Language packets
	     * @type {Object}
	     */
	    this.packets = {};

	    /**
	     * String base
	     * @type {String}
	     */
	    this.strBase = "s_";

	    /**
	     * Active packet ref
	     * @type {Object}
	     */
	    this.activePacket = null;

	    /**
	     * Default language
	     * @type {String}
	     */
	    this.defaultLanguage = _cfg.DEFAULT_LANG;

	    /**
	     * Download default lang packet
	     * Download navigators lang packet
	     * Auto switch to navigators lang
	     */
	    this.downloadPacket(this.defaultLanguage, function () {
	      _this.switch(_this.getNavigatorLanguage(), resolve);
	    });
	  }

	  /**
	   * Get navigators language
	   * @return {String}
	   */


	  (0, _createClass3.default)(Language, [{
	    key: "getNavigatorLanguage",
	    value: function getNavigatorLanguage() {

	      var lang = null;

	      if (navigator.languages) {
	        lang = navigator.languages[0];
	      } else if (navigator.userLanguage) {
	        lang = navigator.userLanguage;
	      } else {
	        lang = navigator.language;
	      }

	      return lang.split("-")[0];
	    }

	    /**
	     * Get language dependant string
	     * @param  {String} key
	     * @return {String}
	     */

	  }, {
	    key: "get",
	    value: function get(key) {
	      return this.activePacket[key] !== void 0 ? this.activePacket[key] : this.packets[this.defaultLanguage][key] !== void 0 ? this.packets[this.defaultLanguage][key] : "undefined";
	    }

	    /**
	     * Download language packet
	     * @param {String}   name
	     * @param {Function} resolve
	     */

	  }, {
	    key: "downloadPacket",
	    value: function downloadPacket(name, resolve) {

	      if (this.packets[name] !== void 0) {
	        return resolve();
	      }

	      var path = "assets/i18n/";

	      try {
	        (0, _utils.ajax)(path + name + ".json").then(JSON.parse).then(function (data) {
	          this.packets[name] = data;
	          resolve();
	        }.bind(this));
	      } catch (e) {
	        console.error(name + " is a invalid language packet!");
	        resolve();
	      }

	      return void 0;
	    }

	    /**
	     * Switch to another language packet
	     * @param {String}   name
	     * @param {Function} resolve
	     */

	  }, {
	    key: "switch",
	    value: function _switch(name, resolve) {
	      var _this2 = this;

	      if (this.packets[name] !== void 0) {
	        this.activePacket = this.packets[name];
	        return resolve && resolve();
	      }

	      this.downloadPacket(name, function () {
	        _this2.activePacket = _this2.packets[name];
	        return resolve && resolve();
	      });

	      return void 0;
	    }
	  }]);
	  return Language;
	}();

	exports.default = Language;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _actions = __webpack_require__(137);

	var actions = _interopRequireWildcard(_actions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Controller
	 * @class Controller
	 * @export
	 */
	var Controller = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function Controller(instance) {
	    (0, _classCallCheck3.default)(this, Controller);


	    /**
	     * Instance
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Engine ref
	     * @type {Object}
	     */
	    this.engine = this.instance;

	    /**
	     * Actions ref
	     * @type {Object}
	     */
	    this.actions = actions.actions;

	    /**
	     * Log array
	     * @type {Array}
	     */
	    this.logs = [];
	  }

	  /**
	   * Execute a action
	   * @param {String} name
	   * @param {Array}  args
	   */


	  (0, _createClass3.default)(Controller, [{
	    key: "action",
	    value: function action(name) {
	      var _context;

	      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : args || [];


	      var cmd = this.actions[name];
	      var rule = (_context = this.engine.instance, cmd.rule).call(_context) === true;

	      if (rule === true) {
	        cmd.action.bind(this.engine.instance).apply(this, args);
	      }

	      if (cmd.log !== false) this.log(name, rule);

	      return void 0;
	    }

	    /**
	     * Log a action
	     * @param {String} name
	     */

	  }, {
	    key: "log",
	    value: function log(name, failed) {

	      this.logs.push({
	        name: name,
	        success: failed,
	        timestamp: this.instance.renderer.now
	      });
	    }
	  }]);
	  return Controller;
	}();

	exports.default = Controller;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = undefined;

	var _cfg = __webpack_require__(21);

	var cfg = _interopRequireWildcard(_cfg);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var actions = exports.actions = {};

	actions["SHIFT"] = {
	  action: function action() {
	    this.engine.editor.STATES.SELECTING = false;
	    this.engine.editor.selectedEntities = [];
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["CTRL+Z"] = {
	  action: function action() {
	    this.engine.editor.commander.undo();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["CTRL+Y"] = {
	  action: function action() {
	    this.engine.editor.commander.redo();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["CTRL+C"] = {
	  action: function action() {
	    this.engine.editor.copyEntity();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["CTRL+V"] = {
	  action: function action() {
	    this.engine.editor.pasteEntity();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["CTRL+X"] = {
	  action: function action() {
	    this.engine.editor.cutEntity();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["DELETE"] = {
	  action: function action() {
	    this.engine.editor.deleteEntity();
	  },
	  rule: function rule() {
	    return cfg.EDIT_MODE;
	  }
	};

	actions["F1"] = {
	  action: function action() {
	    cfg.DEBUG_MODE = cfg.DEBUG_MODE ? false : true;
	    /*if (!cfg.DEBUG_MODE) {
	      cfg.FREE_CAMERA = false;
	      this.engine.camera.focus(this.engine.localEntity, false);
	    }*/
	    this.engine.renderer.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);
	    this.engine.renderer.resize(true);
	    this.engine.renderer.clear();
	    this.engine.renderer.draw();
	  },
	  rule: function rule() {
	    return true;
	  }
	};

	actions["F2"] = {
	  action: function action() {
	    cfg.EDIT_MODE = cfg.EDIT_MODE ? false : true;
	  },
	  rule: function rule() {
	    return cfg.DEBUG_MODE;
	  }
	};

	actions["F3"] = {
	  action: function action() {
	    cfg.FREE_CAMERA = cfg.FREE_CAMERA ? false : true;
	    if (!cfg.FREE_CAMERA) {
	      this.engine.camera.dragging = false;
	    }
	  },
	  rule: function rule() {
	    return cfg.DEBUG_MODE;
	  }
	};

	actions["F4"] = {
	  action: function action() {
	    cfg.GOD_MODE = cfg.GOD_MODE ? false : true;
	  },
	  rule: function rule() {
	    return cfg.DEBUG_MODE;
	  }
	};

	actions["F6"] = {
	  action: function action() {
	    cfg.MINI_MAP = cfg.MINI_MAP ? false : true;
	    cfg.TILESET_MODE = !cfg.MINI_MAP;
	  },
	  rule: function rule() {
	    return cfg.DEBUG_MODE;
	  }
	};

	actions["B"] = {
	  action: function action() {
	    this.engine.notify(this.engine.localEntity, "Hello World");
	  },
	  rule: function rule() {
	    return true;
	  }
	};

	actions["Z"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.action();
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["X_FIRE"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.velocity = 2;
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["X_LEAVE"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.velocity = 1;
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["C"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.jump();
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["←"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.move(cfg.LEFT);
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["→"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.move(cfg.RIGHT);
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["↑"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.move(cfg.UP);
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["↓"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    local.move(cfg.DOWN);
	  },
	  rule: function rule() {
	    return this.engine.localEntity !== null;
	  }
	};

	actions["SPACE"] = {
	  action: function action() {
	    var local = this.engine.localEntity;
	    this.engine.camera.focus(local, true);
	    cfg.FREE_CAMERA = false;
	  },
	  rule: function rule() {
	    return cfg.FREE_CAMERA || this.engine.camera.objectFocus !== null && this.engine.camera.objectFocus.id !== this.engine.localEntity.id;
	  },
	  log: false
	};

	actions["DBLCLICK"] = {
	  action: function action(e) {
	    e.preventDefault();
	    if (!cfg.DEBUG_MODE) return void 0;
	    cfg.FREE_CAMERA = false;
	    if (cfg.EDIT_MODE) {
	      if (cfg.TILESET_MODE === true && this.engine.editor.clickedInsideTileset(x, y)) {
	        return void 0;
	      }
	      if (!this.engine.editor.dragging) {
	        var entity = this.engine.editor.getEntityByMouse(e.clientX, e.clientY);
	        if (entity !== null) {
	          this.engine.camera.focus(entity, false);
	        }
	        this.engine.editor.editEntity(e.clientX, e.clientY);
	      }
	    }
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["LEFTCLICK"] = {
	  action: function action(e) {
	    if (e.target.id !== this.engine.node.id && e.target.id !== this.engine.glNode.id) {
	      return void 0;
	    }
	    var x = e.touches ? e.touches[0].clientX : e.clientX;
	    var y = e.touches ? e.touches[0].clientY : e.clientY;
	    e.preventDefault();
	    if (cfg.TILESET_MODE === true && this.engine.editor.clickedInsideTileset(x, y)) {
	      this.engine.editor.selectTile(x, y);
	      return void 0;
	    }
	    if (this.input.KeyBoard.isKeyPressed("G")) {
	      this.engine.ping(x, y, "notify");
	      return void 0;
	    }
	    //if (!cfg.DEBUG_MODE) return void 0;
	    if (e.which === 1 && this.input.KeyBoard.isKeyPressed("SHIFT")) {
	      this.engine.editor.STATES.SELECTING = true;
	      this.engine.editor.selectFrom(x, y);
	      this.engine.editor.selectTo(x, y);
	      return void 0;
	    }
	    if (e.which !== 1 && !this.input.KeyBoard.isKeyPressed("SPACE")) {
	      cfg.FREE_CAMERA = true;
	    }
	    if (cfg.FREE_CAMERA && (e.touches || e.which !== 1)) {
	      this.engine.camera.dragging = true;
	      this.engine.camera.click(x, y);
	    }
	    if ( /*cfg.EDIT_MODE && */e.touches || e.which === 1) {
	      this.engine.editor.dragging = true;
	      this.engine.editor.selectEntity(x, y);
	    }
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["RESIZE"] = {
	  action: function action() {
	    this.engine.renderer.resize(true);
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["MOUSEUP"] = {
	  action: function action(e) {
	    e.preventDefault();
	    //if (!cfg.DEBUG_MODE) return void 0;
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.dragging = false;
	    }
	    if ( /*cfg.EDIT_MODE*/true) {
	      if (e.touches || e.which === 1) {
	        this.engine.editor.dragging = false;
	        this.engine.editor.STATES.SELECTING = false;
	        this.engine.editor.selectedEntities = [];
	      }
	    }
	    this.engine.camera.moving = false;
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["MOUSEMOVE"] = {
	  action: function action(e) {
	    var x = e.touches ? e.touches[0].clientX : e.clientX;
	    var y = e.touches ? e.touches[0].clientY : e.clientY;
	    e.preventDefault();
	    //if (!cfg.DEBUG_MODE) return void 0;
	    if (cfg.FREE_CAMERA && this.engine.camera.dragging && !this.input.KeyBoard.isKeyPressed("SPACE")) {
	      this.engine.camera.move(x, y);
	      this.engine.camera.moving = true;
	    }
	    if (this.input.KeyBoard.isKeyPressed("SHIFT") && this.engine.editor.STATES.SELECTING) {
	      this.engine.editor.selectTo(x, y);
	      return void 0;
	    }
	    if ( /*cfg.EDIT_MODE && */this.engine.editor.dragging) {
	      this.engine.editor.dragEntity(x, y);
	    }
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["RIGHTCLICK"] = {
	  action: function action(e) {
	    e.preventDefault();
	    //this.engine.walkByMouse(e.clientX, e.clientY);
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

	actions["MOUSEWHEEL"] = {
	  action: function action(e) {
	    e.preventDefault();
	    if (cfg.FREE_CAMERA) {
	      this.engine.camera.click(e.clientX, e.clientY);
	    }
	    this.engine.camera.zoom(e);
	  },
	  rule: function rule() {
	    return true;
	  },
	  log: false
	};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _tokens = __webpack_require__(139);

	var tokens = _interopRequireWildcard(_tokens);

	var _Tester = __webpack_require__(140);

	var _Tester2 = _interopRequireDefault(_Tester);

	var _Tokenizer = __webpack_require__(143);

	var _Tokenizer2 = _interopRequireDefault(_Tokenizer);

	var _Parser = __webpack_require__(144);

	var _Parser2 = _interopRequireDefault(_Parser);

	var _Evaluator = __webpack_require__(148);

	var _Evaluator2 = _interopRequireDefault(_Evaluator);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Environment
	 * @class Environment
	 * @export
	 */
	var Environment = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function Environment(instance) {
	    (0, _classCallCheck3.default)(this, Environment);


	    /**
	     * Game instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Global flags
	     * @type {Object}
	     */
	    this.FLAGS = {
	      GOT_STARTER_PKMN: false,
	      COUNTER: 0
	    };

	    /**
	     * Tokenizer instance
	     * @type {Object}
	     */
	    this.tokenizer = new _Tokenizer2.default(tokens.TOKENS, tokens.IGNORE);

	    /**
	     * Parser instance
	     * @type {Object}
	     */
	    this.parser = new _Parser2.default();

	    /**
	     * Evaluator instance
	     * @type {Object}
	     */
	    this.evaluator = new _Evaluator2.default(this);

	    /**
	     * Tester instance
	     * @type {Object}
	     */
	    this.tester = new _Tester2.default(this.tokenizer, this.parser, this.evaluator);

	    console.log(this.FLAGS);
	  }

	  /**
	   * Run a stream
	   * @param {Object} local
	   * @param {Object} trigger
	   * @param {String} stream
	   */


	  (0, _createClass3.default)(Environment, [{
	    key: "run",
	    value: function run(local, trigger, stream) {

	      this.evaluator.setTriggerScope(local);
	      this.evaluator.setGlobalScope(trigger);

	      var tokens = this.tokenizer.scan(stream);

	      var ast = this.parser.parse(tokens);

	      this.evaluator.evaluate(ast, function (result) {
	        console.log("Ok!", result);
	      });
	    }
	  }]);
	  return Environment;
	}();

	exports.default = Environment;

/***/ }),
/* 139 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Tokens to match
	 * @type {Object}
	 */
	var TOKENS = exports.TOKENS = {
	  /** Punctuators */
	  "(": "LPAREN",
	  ")": "RPAREN",
	  "[": "LBRACK",
	  "]": "RBRACK",
	  "{": "LBRACE",
	  "}": "RBRACE",
	  ":": "COLON",
	  ";": "SEMICOLON",
	  ".": "PERIOD",
	  "?": "CONDITIONAL",
	  "$": "DOLLAR",
	  "@": "ATSIGN",
	  /** Logical operators */
	  "!": "NOT",
	  "||": "OR",
	  "&&": "AND",
	  /** Binary operators */
	  ",": "COMMA",
	  "+": "ADD",
	  "-": "SUB",
	  "*": "MUL",
	  "/": "DIV",
	  "%": "MOD",
	  "^": "POW",
	  "+=": "ADDSET",
	  "-=": "SUBSET",
	  "*=": "MULSET",
	  "/=": "DIVSET",
	  "%=": "MODSET",
	  /** Compare operators */
	  "<": "LT",
	  "<=": "LE",
	  ">": "GT",
	  ">=": "GE",
	  "==": "EQ",
	  "!=": "NEQ",
	  /** Assignment operators */
	  "=": "ASSIGN",
	  /** Bitwise operators */
	  "~": "BIT_NOT",
	  "|": "BIT_OR",
	  "&": "BIT_AND",
	  /** Literals */
	  "null": "NULL",
	  "true": "TRUE",
	  "false": "FALSE",
	  /** Keywords */
	  "if": "IF",
	  "else": "ELSE",
	  "while": "WHILE",
	  "do": "DO",
	  "for": "FOR",
	  "function": "FUNCTION",
	  "var": "VAR",
	  "const": "CONST",
	  "return": "RETURN",
	  " ": "BLANK",
	  "\t": "TAB",
	  "\n": "NL",
	  "\r": "X",
	  "\f": "X1",
	  "\v": "X2"
	};

	/**
	 * Tokens to ignore
	 * @type {Array}
	 */
	var IGNORE = exports.IGNORE = ["BLANK", "TAB", "NL", "X", "X1", "X2"];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(141);

	var _tests = __webpack_require__(142);

	var tests = _interopRequireWildcard(_tests);

	var _utils = __webpack_require__(22);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Tester
	 * @class Tester
	 * @export
	 */
	var Tester = function () {

	  /**
	   * @constructor
	   * @param {Object} tokenizer
	   * @param {Object} parser
	   * @param {Object} evaluator
	   */
	  function Tester(tokenizer, parser, evaluator) {
	    (0, _classCallCheck3.default)(this, Tester);


	    /**
	     * Tokenizer instance ref
	     * @type {Object}
	     */
	    this.tokenizer = tokenizer;

	    /**
	     * Parser instance ref
	     * @type {Object}
	     */
	    this.parser = parser;

	    /**
	     * Evaluator instance ref
	     * @type {Object}
	     */
	    this.evaluator = evaluator;

	    this.setup();
	  }

	  /**
	   * Test
	   * @param {Object}   key
	   * @param {Function} resolve
	   */


	  (0, _createClass3.default)(Tester, [{
	    key: "test",
	    value: function test(key, resolve) {

	      var ast = this.parser.parse(this.tokenizer.scan(key.expression));

	      this.evaluator.evaluate(ast, function (result) {
	        if (result !== key.expect) {
	          console.log(this.parser.parse(this.tokenizer.scan(key.expression)));
	          console.info("%c \u2613 " + key.name + " :: " + key.expression + " = " + result, "color: darkred;");
	          resolve(false);
	        }
	        resolve(true);
	      }.bind(this));

	      return void 0;
	    }

	    /**
	     * Setup
	     */

	  }, {
	    key: "setup",
	    value: function setup() {

	      var failures = 0;

	      for (var type in tests) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _getIterator3.default)(tests[type]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            this.test(key, function (result) {
	              return result === false && ++failures;
	            });
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        ;
	        if (failures <= 0) {
	          console.info("%c \u2713 " + type, "color: darkgreen;");
	        }
	      };

	      if (failures) {
	        console.error(failures + " " + (failures > 1 || failures === 0 ? "tests" : "test") + " failed!");
	      } else {
	        console.info("%cAll tests passed successfully!", "color: green;");
	      }
	    }
	  }]);
	  return Tester;
	}();

	exports.default = Tester;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NODE_TYPES = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Numeric node types
	 * @type {Object}
	 */
	var NODE_TYPES = exports.NODE_TYPES = {
	  Program: 1,
	  BlockStatement: 2,
	  ReturnStatement: 3,
	  Literal: 4,
	  Identifier: 5,
	  IfStatement: 6,
	  BinaryExpression: 7,
	  UnaryExpression: 8,
	  AsyncStatement: 9,
	  MemberExpression: 10,
	  CallExpression: 11,
	  AssignmentExpression: 12
	};

	/**
	 * NODE_LIST
	 * @class NODE_LIST
	 * @export
	 */

	var NODE_LIST = function () {
	  function NODE_LIST() {
	    (0, _classCallCheck3.default)(this, NODE_LIST);
	  }

	  (0, _createClass3.default)(NODE_LIST, null, [{
	    key: "Program",
	    get: function get() {
	      return function Program() {
	        (0, _classCallCheck3.default)(this, Program);

	        this.type = NODE_TYPES.Program;
	        this.body = [];
	      };
	    }
	  }, {
	    key: "BlockStatement",
	    get: function get() {
	      return function BlockStatement() {
	        (0, _classCallCheck3.default)(this, BlockStatement);

	        this.type = NODE_TYPES.BlockStatement;
	        this.body = [];
	      };
	    }
	  }, {
	    key: "ReturnStatement",
	    get: function get() {
	      return function ReturnStatement() {
	        (0, _classCallCheck3.default)(this, ReturnStatement);

	        this.type = NODE_TYPES.ReturnStatement;
	        this.value = null;
	      };
	    }
	  }, {
	    key: "Literal",
	    get: function get() {
	      return function Literal() {
	        (0, _classCallCheck3.default)(this, Literal);

	        this.type = NODE_TYPES.Literal;
	        this.name = null;
	        this.value = null;
	      };
	    }
	  }, {
	    key: "Identifier",
	    get: function get() {
	      return function Identifier() {
	        (0, _classCallCheck3.default)(this, Identifier);

	        this.type = NODE_TYPES.Identifier;
	        this.name = null;
	      };
	    }
	  }, {
	    key: "IfStatement",
	    get: function get() {
	      return function IfStatement() {
	        (0, _classCallCheck3.default)(this, IfStatement);

	        this.type = NODE_TYPES.IfStatement;
	        this.condition = null;
	        this.consequent = null;
	        this.alternate = null;
	      };
	    }
	  }, {
	    key: "BinaryExpression",
	    get: function get() {
	      return function BinaryExpression() {
	        (0, _classCallCheck3.default)(this, BinaryExpression);

	        this.type = NODE_TYPES.BinaryExpression;
	        this.operator = null;
	        this.left = null;
	        this.right = null;
	      };
	    }
	  }, {
	    key: "UnaryExpression",
	    get: function get() {
	      return function UnaryExpression() {
	        (0, _classCallCheck3.default)(this, UnaryExpression);

	        this.type = NODE_TYPES.UnaryExpression;
	        this.operator = null;
	        this.init = null;
	      };
	    }
	  }, {
	    key: "AsyncStatement",
	    get: function get() {
	      return function AsyncStatement() {
	        (0, _classCallCheck3.default)(this, AsyncStatement);

	        this.type = NODE_TYPES.AsyncStatement;
	        this.init = null;
	      };
	    }
	  }, {
	    key: "MemberExpression",
	    get: function get() {
	      return function MemberExpression() {
	        (0, _classCallCheck3.default)(this, MemberExpression);

	        this.type = NODE_TYPES.MemberExpression;
	        this.object = null;
	        this.property = null;
	      };
	    }
	  }, {
	    key: "CallExpression",
	    get: function get() {
	      return function CallExpression() {
	        (0, _classCallCheck3.default)(this, CallExpression);

	        this.type = NODE_TYPES.CallExpression;
	        this.callee = null;
	        this.arguments = [];
	      };
	    }
	  }, {
	    key: "AssignmentExpression",
	    get: function get() {
	      return function AssignmentExpression() {
	        (0, _classCallCheck3.default)(this, AssignmentExpression);

	        this.type = NODE_TYPES.AssignmentExpression;
	        this.operator = null;
	        this.left = null;
	        this.right = null;
	      };
	    }
	  }]);
	  return NODE_LIST;
	}();

	exports.default = NODE_LIST;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Mathematical tests
	 * @type {Array}
	 */
	var Mathematical = exports.Mathematical = [
	/** Logical */
	{
	  name: "Not",
	  expression: "!true",
	  expect: false
	}, {
	  name: "Not",
	  expression: "!!true",
	  expect: true
	}, {
	  name: "Not",
	  expression: "!!!false",
	  expect: true
	}, {
	  name: "Logical And",
	  expression: "1 && 2",
	  expect: 2
	}, {
	  name: "Logical And",
	  expression: "1 == 1 && 2 >= 2",
	  expect: true
	}, {
	  name: "Logical And",
	  expression: "1 != 1 && 2 < 2",
	  expect: false
	}, {
	  name: "Logical Or",
	  expression: "0 || 2",
	  expect: 2
	}, {
	  name: "Logical Or",
	  expression: "2 || 0",
	  expect: 2
	}, {
	  name: "Logical Or",
	  expression: "10 <= 2 || 5 < 2 || 50 / 2 == 25",
	  expect: true
	}, {
	  name: "Logical And Or",
	  expression: "5 == 1 || 1 == 2 || 5 == 5",
	  expect: true
	},
	/** Comparisions */
	{
	  name: "Equality",
	  expression: "1 == 5",
	  expect: false
	}, {
	  name: "Equality",
	  expression: "5 == 5",
	  expect: true
	}, {
	  name: "Inequality",
	  expression: "1 != 5",
	  expect: true
	}, {
	  name: "Inequality",
	  expression: "5 != 5",
	  expect: false
	}, {
	  name: "LW",
	  expression: "5 < 10",
	  expect: true
	}, {
	  name: "LW",
	  expression: "10 < 5",
	  expect: false
	}, {
	  name: "LW",
	  expression: "5 < 5",
	  expect: false
	}, {
	  name: "LE",
	  expression: "5 <= 10",
	  expect: true
	}, {
	  name: "LE",
	  expression: "10 <= 5",
	  expect: false
	}, {
	  name: "LE",
	  expression: "5 <= 5",
	  expect: true
	}, {
	  name: "GT",
	  expression: "5 > 10",
	  expect: false
	}, {
	  name: "GT",
	  expression: "10 > 5",
	  expect: true
	}, {
	  name: "GT",
	  expression: "5 > 5",
	  expect: false
	}, {
	  name: "GE",
	  expression: "5 >= 10",
	  expect: false
	}, {
	  name: "GE",
	  expression: "10 >= 5",
	  expect: true
	}, {
	  name: "GE",
	  expression: "5 >= 5",
	  expect: true
	},
	/** Binary operators */
	{
	  name: "Add operator",
	  expression: "5.5 + 2.5 + 7",
	  expect: 15
	}, {
	  name: "Minus operator",
	  expression: "5.5 - 2.5 - 7",
	  expect: -4
	}, {
	  name: "Mul operator",
	  expression: "5.5 * 2.5 * 7",
	  expect: 96.25
	}, {
	  name: "Div operator",
	  expression: "25 / 5 / 2.5",
	  expect: 2
	}, {
	  name: "Mod operator",
	  expression: "32 % 6",
	  expect: 2
	}, {
	  name: "Complex",
	  expression: "5 + 1 / 2 * 2 - ((2.5 * (6 + 4 * 2) / 5) * 5) - 1.5",
	  expect: -30.5
	},
	/** Numbers */
	{
	  name: "Negative integer",
	  expression: "-77.5",
	  expect: -77.5
	},
	/** Booleans */
	{
	  name: "True bool",
	  expression: "true",
	  expect: true
	}, {
	  name: "False bool",
	  expression: "false",
	  expect: false
	}];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Tokenizer
	 * @class Tokenizer
	 * @export
	 */
	var Tokenizer = function () {

	  /**
	   * @constructor
	   * @param {Object} tokens
	   * @param {Array}  ignore
	   */
	  function Tokenizer(tokens, ignore) {
	    (0, _classCallCheck3.default)(this, Tokenizer);


	    /**
	     * Operand lookup map
	     * @type {Object}
	     */
	    this.TOKEN_LIST = tokens || {};

	    /**
	     * Ignore token list
	     * @type {Array}
	     */
	    this.IGNORE_LIST = ignore || [];

	    /**
	     * Stream buffer
	     * @type {String}
	     */
	    this.buffer = null;

	    /**
	     * Stream index
	     * @type {Number}
	     */
	    this.index = 0;
	  }

	  /**
	   * Is digit
	   * @param {Number} c
	   * @return {Boolean}
	   */


	  (0, _createClass3.default)(Tokenizer, [{
	    key: "isDigit",
	    value: function isDigit(c) {
	      return c >= 48 && c <= 57;
	    }

	    /**
	     * Is alpha
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAlpha",
	    value: function isAlpha(c) {
	      return c > 64 && c < 91 || c > 96 && c < 123;
	    }

	    /**
	     * Is alpha digit
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAlphaDigit",
	    value: function isAlphaDigit(c) {
	      return c > 47 && c < 58 || c > 64 && c < 91 || c > 96 && c < 123 || c === 95;
	    }

	    /**
	     * Is string
	     * @param {Number} c
	     * @return {Boolean}
	     */

	  }, {
	    key: "isString",
	    value: function isString(c) {
	      return c === 34 || c === 39;
	    }

	    /**
	     * Token validation
	     * @param  {Object}  token
	     * @return {Boolean}
	     */

	  }, {
	    key: "isValidToken",
	    value: function isValidToken(token) {
	      return token.name !== void 0 && this.IGNORE_LIST.indexOf(token.name) <= -1;
	    }

	    /**
	     * Token name validation
	     * @param  {String}  name
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIgnoredName",
	    value: function isIgnoredName(name) {
	      return this.IGNORE_LIST.indexOf(name) <= -1;
	    }

	    /**
	     * Creates number token
	     * @return {Object}
	     */

	  }, {
	    key: "readNumber",
	    value: function readNumber() {

	      var end = this.index + 1;

	      var c = null;

	      for (; end < this.length; ++end) {
	        c = this.buffer.charAt(end).charCodeAt(0);
	        /** Also check for floating numbers */
	        if (c !== 46 && this.isDigit(c) === false) break;
	      };

	      var value = this.buffer.slice(this.index, end);

	      this.index = end;

	      return {
	        name: "NUMBER",
	        value: value
	      };
	    }

	    /**
	     * Creates identifier or keyword token
	     * @return {Object}
	     */

	  }, {
	    key: "readIdentifier",
	    value: function readIdentifier() {

	      var end = this.index + 1;

	      for (; end < this.length && this.isAlphaDigit(this.buffer.charAt(end).charCodeAt(0)) === true; ++end) {};

	      var value = this.buffer.slice(this.index, end);

	      this.index = end;

	      /** Keyword */
	      if (this.TOKEN_LIST[value] !== void 0) {
	        return {
	          name: this.TOKEN_LIST[value],
	          value: value
	        };
	        /** Identifier */
	      } else {
	        return {
	          name: "IDENTIFIER",
	          value: value
	        };
	      }
	    }

	    /**
	     * Creates string token
	     * @return {Object}
	     */

	  }, {
	    key: "readString",
	    value: function readString() {

	      var end = this.buffer.indexOf("'", this.index + 1);

	      if (end === -1) {
	        end = this.buffer.indexOf('"', this.index + 1);
	        if (end === -1) throw new Error("Unexpected quote at " + this.index + "!");
	      }

	      var token = {
	        name: "STRING",
	        value: this.buffer.slice(this.index, end + 1)
	      };

	      this.index = end + 1;

	      return token;
	    }
	  }, {
	    key: "readNegativeNumber",
	    value: function readNegativeNumber() {

	      var node = null;

	      node = this.readNumber();

	      node.value = "-" + node.value;

	      return node;
	    }

	    /**
	     * Read sign
	     * @return {Object}
	     */

	  }, {
	    key: "readSign",
	    value: function readSign() {

	      var c = null;

	      var code = 0;

	      var name = null;

	      var value = "";

	      for (;;) {
	        c = this.buffer.charAt(this.index);
	        code = c.charCodeAt(0);
	        if (this.isDigit(code) === true) {
	          if (value === "-") {
	            return this.readNegativeNumber();
	          }
	        }
	        value += c;
	        if (this.TOKEN_LIST[value] === void 0) break;
	        this.index++;
	        name = this.TOKEN_LIST[value];
	        if (this.index > this.length) break;
	      };

	      return {
	        name: name,
	        value: value
	      };
	    }

	    /**
	     * Lexical analysis
	     * @param {String} stream
	     * @return {Array}
	     */

	  }, {
	    key: "scan",
	    value: function scan(stream) {

	      this.index = 0;
	      this.vIndex = 0;
	      this.buffer = stream;
	      this.length = this.buffer.length;

	      var c = null;
	      var op = null;
	      var cCode = 0;
	      var token = null;

	      var tokens = [];

	      for (;;) {

	        if (!(c = this.buffer.charAt(this.index)) || this.index >= this.length) break;

	        cCode = c.charCodeAt(0);

	        if ((op = this.TOKEN_LIST[c]) !== void 0) {
	          token = this.readSign();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isDigit(cCode) === true) {
	          token = this.readNumber();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isAlpha(cCode) === true) {
	          token = this.readIdentifier();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	        if (this.isString(cCode) === true) {
	          token = this.readString();
	          if (this.isValidToken(token) === true) tokens.push(token);
	        }
	      };

	      return tokens;
	    }
	  }]);
	  return Tokenizer;
	}();

	exports.default = Tokenizer;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(141);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	var _precedence = __webpack_require__(145);

	var pr = _interopRequireWildcard(_precedence);

	var _parse = __webpack_require__(146);

	var parse = _interopRequireWildcard(_parse);

	var _expression = __webpack_require__(147);

	var expression = _interopRequireWildcard(_expression);

	var _utils = __webpack_require__(22);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Parser
	 * @class Parser
	 * @export
	 */
	var Parser = function () {

	  /**
	   * @constructor
	   */
	  function Parser() {
	    (0, _classCallCheck3.default)(this, Parser);


	    /**
	     * Token input
	     * @type {Array}
	     */
	    this.tokens = null;

	    /**
	     * Token index
	     * @type {Number}
	     */
	    this.index = 0;

	    /**
	     * Operator precedences
	     * @type {Array}
	     */
	    this.precedence = pr.precedence;

	    /**
	     * node
	     * @type {Object}
	     * @getter
	     */
	    Object.defineProperty(this, "node", {
	      get: function get() {
	        return this.tokens[this.index];
	      }
	    });
	  }

	  /**
	   * Parse
	   * @param {Array} tokens
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Parser, [{
	    key: "parse",
	    value: function parse(tokens) {

	      this.tokens = tokens;

	      this.index = 0;

	      var ast = new _NodeList2.default.Program();

	      var length = this.tokens.length;

	      var block = null;

	      for (;;) {
	        if (this.index >= length) break;
	        if ((block = this.parseBlock()) === null) continue;
	        ast.body.push(block);
	      };

	      return ast;
	    }

	    /**
	     * Increase token index
	     */

	  }, {
	    key: "next",
	    value: function next() {
	      this.index++;
	    }

	    /**
	     * Node type acception
	     * @param  {String} type
	     * @return {Boolean}
	     */

	  }, {
	    key: "accept",
	    value: function accept(type) {
	      if (this.node === void 0) return false;
	      if (this.node.name === type) {
	        return true;
	      }
	      return false;
	    }

	    /**
	     * Node type expection
	     * @param {String} name
	     */

	  }, {
	    key: "expect",
	    value: function expect(name) {
	      for (; true;) {
	        if (this.node.name === name) {
	          this.next();
	          break;
	        }
	        this.next();
	      }
	      return void 0;
	    }

	    /**
	     * Accept precedence state
	     * @param  {String}  state
	     * @return {Boolean}
	     */

	  }, {
	    key: "acceptPrecedenceState",
	    value: function acceptPrecedenceState(state) {
	      return state !== void 0 && this.node !== void 0 && state.indexOf(this.node.name) > -1;
	    }
	  }]);
	  return Parser;
	}();

	exports.default = Parser;


	(0, _utils.inherit)(Parser, parse);
	(0, _utils.inherit)(Parser, expression);

/***/ }),
/* 145 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var precedence = exports.precedence = [["OR"], ["AND"], ["EQ", "NEQ"], ["LE", "LT", "GE", "GT"], ["ADD", "SUB"], ["MUL", "DIV", "MOD"]];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseBlock = parseBlock;
	exports.parseAsyncStatement = parseAsyncStatement;
	exports.isSet = isSet;
	exports.parseIdentifierRoute = parseIdentifierRoute;
	exports.parseCallExpression = parseCallExpression;
	exports.parseAssignmentExpression = parseAssignmentExpression;
	exports.parseIfStatement = parseIfStatement;
	exports.parseReturnStatement = parseReturnStatement;
	exports.parseBlockStatement = parseBlockStatement;
	exports.parseArguments = parseArguments;
	exports.parseBraceBody = parseBraceBody;
	exports.parseParentheseExpression = parseParentheseExpression;

	var _NodeList = __webpack_require__(141);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Parse a block
	 * @return {Object}
	 */
	function parseBlock() {

	  if (this.accept("IF") === true) {
	    return this.parseIfStatement();
	  }

	  if (this.accept("RETURN") === true) {
	    return this.parseReturnStatement();
	  }

	  if (this.accept("ATSIGN") === true) {
	    return this.parseAsyncStatement();
	  }

	  if (this.accept("IDENTIFIER") === true) {
	    return this.parseIdentifierRoute();
	  }

	  return this.parseExpression(0);
	}

	/**
	 * Parse async statement
	 * Identifier () | = | ;
	 * @return {Object}
	 */
	function parseAsyncStatement() {

	  var ast = null;

	  this.next();
	  ast = new _NodeList2.default.AsyncStatement();
	  ast.init = this.parseBlock();

	  return ast;
	}

	/**
	 * Is assignment or assignset
	 * @return {Boolean}
	 */
	function isSet() {
	  return this.accept("ASSIGN") === true || this.accept("ADDSET") === true || this.accept("SUBSET") === true || this.accept("MULSET") === true || this.accept("DIVSET") === true || this.accept("MODSET") === true;
	}

	/**
	 * Parse identifier route
	 * Identifier () | = | . | ;
	 * @return {Object}
	 */
	function parseIdentifierRoute() {

	  var ast = null;

	  var tmp = this.parseExpression(0);

	  /** Call expression */
	  if (this.accept("LPAREN") === true) {
	    ast = this.parseCallExpression();
	    ast.callee = tmp;
	  }

	  /** Assignment expression */
	  if (this.isSet() === true) {
	    ast = this.parseAssignmentExpression();
	    ast.left = tmp;
	  }

	  if (ast === null) {
	    return tmp;
	  }

	  return ast;
	}

	/**
	 * Parse call expression
	 * MemberExpression () ;
	 * @return {Object}
	 */
	function parseCallExpression() {

	  var ast = null;

	  ast = new _NodeList2.default.CallExpression();
	  ast.arguments = this.parseArguments();

	  this.next();

	  return ast;
	}

	/**
	 * Parse assignment expression
	 * Expression = Expression
	 * @return {Object}
	 */
	function parseAssignmentExpression() {

	  var ast = null;

	  ast = new _NodeList2.default.AssignmentExpression();
	  ast.left = this.parseExpression(0);
	  ast.operator = this.node.name;
	  this.next();
	  ast.right = this.parseExpression(0);

	  if (this.accept("SEMICOLON") === true) {
	    this.next();
	  }

	  return ast;
	}

	/**
	 * Parse if statement
	 * if ( Expression ) { Body } | { Body }
	 * @return {Object}
	 */
	function parseIfStatement() {

	  var ast = null;

	  this.next();

	  ast = new _NodeList2.default.IfStatement();
	  ast.condition = this.parseParentheseExpression();
	  ast.consequent = this.parseBraceBody();

	  if (this.accept("LBRACE") === true) {
	    ast.alternate = this.parseBraceBody();
	  }

	  return ast;
	}

	/**
	 * Parse return statement
	 * return ( Expression )
	 * @return {Object}
	 */
	function parseReturnStatement() {

	  var ast = null;

	  this.next();
	  ast = new _NodeList2.default.ReturnStatement();
	  ast.value = this.parseParentheseExpression();
	  this.next();

	  return ast;
	}

	/**
	 * Parse block statement
	 * @return {Object}
	 */
	function parseBlockStatement() {

	  var ast = new _NodeList2.default.BlockStatement();

	  for (; true;) {
	    if (this.accept("RBRACE") === true) break;
	    ast.body.push(this.parseBlock());
	  };

	  return ast;
	}

	/**
	 * Parse arguments
	 * [ , ]
	 * @return {Array}
	 */
	function parseArguments() {

	  var args = [];

	  var tmp = null;

	  this.expect("LPAREN");

	  tmp = this.parseBlock();

	  if (tmp !== null) {
	    args.push(tmp);
	  }

	  for (; this.accept("COMMA") === true;) {
	    this.next();
	    if (this.accept("LPAREN") === true) {
	      this.next();
	      tmp = this.parseCallExpression();
	      if (tmp !== null) {
	        args.push(tmp);
	      }
	    } else {
	      tmp = this.parseBlock();
	      if (tmp !== null) {
	        args.push(tmp);
	      }
	    }
	    if (this.accept("RPAREN") === true) {
	      this.next();
	      break;
	    }
	  };

	  if (args.length <= 1 && this.accept("RPAREN") === true) {
	    this.next();
	  }

	  return args;
	}

	/**
	 * Parse brace body
	 * { Body }
	 * @return {Object}
	 */
	function parseBraceBody() {

	  var ast = null;

	  this.expect("LBRACE");
	  ast = this.parseBlockStatement();
	  this.expect("RBRACE");

	  return ast;
	}

	/**
	 * Parse parenthese expression
	 * ( Expression )
	 */
	function parseParentheseExpression() {

	  var ast = null;

	  this.expect("LPAREN");
	  ast = this.parseExpression(0);
	  this.expect("RPAREN");

	  return ast;
	}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseMemberExpression = parseMemberExpression;
	exports.parseExpression = parseExpression;
	exports.parseUnary = parseUnary;
	exports.parseBase = parseBase;

	var _NodeList = __webpack_require__(141);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Recursive object member parsing
	 * Identifier *. *Identifier
	 * @return {Object}
	 */
	function parseMemberExpression() {

	  var ast = null;
	  var tmp = null;
	  var parent = null;

	  ast = this.parseUnary();

	  for (; this.accept("PERIOD") === true;) {
	    parent = new _NodeList2.default.MemberExpression();
	    parent.object = ast;
	    this.next();
	    tmp = this.parseMemberExpression();
	    parent.property = tmp;
	    ast = parent;
	  };

	  return ast;
	}

	/**
	 * Recursive operator precedence based
	 * binary expression parsing
	 * @param  {Number} id
	 * @return {Object}
	 */
	function parseExpression(id) {

	  var state = null;
	  var ast = null;
	  var parent = null;
	  var tmp = null;

	  state = this.precedence[id];

	  ast = state === void 0 ? this.parseUnary() : this.parseExpression(id + 1);

	  for (; this.acceptPrecedenceState(state) === true;) {
	    parent = new _NodeList2.default.BinaryExpression();
	    parent.operator = this.node.name;
	    parent.left = ast;
	    this.next();
	    tmp = state === void 0 ? this.parseUnary() : this.parseExpression(id + 1);
	    if (tmp === null) return null;
	    parent.right = tmp;
	    ast = parent;
	    if (this.accept("SEMICOLON") === true) {
	      this.next();
	    }
	  };

	  return ast;
	}

	/**
	 * Parse unary
	 * @return {Object}
	 */
	function parseUnary() {

	  var ast = null;
	  var tmp = null;

	  if (this.accept("SUB") === true) {
	    ast = new _NodeList2.default.BinaryExpression();
	    ast.operator = this.node.name;
	    tmp = new _NodeList2.default.Literal();
	    tmp.name = "NUMBER";
	    tmp.value = 0;
	    ast.right = tmp;
	    this.next();
	    if ((tmp = this.parseBase()) === null) return null;
	    ast.left = tmp;
	  } else if (this.accept("NOT") === true) {
	    ast = new _NodeList2.default.UnaryExpression();
	    ast.operator = this.node.name;
	    this.next();
	    ast.init = this.parseExpression(0);
	  } else {
	    if (this.accept("ADD") === true) {
	      this.next();
	    }
	    if (!(ast = this.parseBase())) return null;
	  }

	  return ast;
	}

	/**
	 * Parse base
	 * @return {Object}
	 */
	function parseBase() {

	  var ast = null;

	  if (this.accept("TRUE") === true || this.accept("FALSE") === true) {
	    ast = new _NodeList2.default.Identifier();
	    ast.name = this.node.value;
	    this.next();
	    return ast;
	  }

	  if (this.accept("NUMBER") === true) {
	    ast = new _NodeList2.default.Literal();
	    ast.name = this.node.name;
	    ast.value = Number(this.node.value);
	    this.next();
	    return ast;
	  }

	  if (this.accept("STRING") === true) {
	    ast = new _NodeList2.default.Literal();
	    ast.name = this.node.name;
	    ast.value = this.node.value;
	    this.next();
	    return ast;
	  }

	  if (this.accept("LPAREN") === true) {
	    this.next();
	    ast = this.parseExpression(0);
	    this.next();
	    return ast;
	  }

	  if (this.accept("IDENTIFIER") === true) {
	    ast = new _NodeList2.default.Identifier();
	    ast.name = this.node.value;
	    if (this.tokens[this.index + 1].name === "PERIOD") {
	      this.next();
	      var exp = this.parseMemberExpression();
	      exp.object = ast;
	      return exp;
	    }
	    this.next();
	    return ast;
	  }

	  return ast;
	}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _NodeList = __webpack_require__(141);

	var _utils = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Evaluator
	 * @class Evaluator
	 * @export
	 */
	var Evaluator = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   */
	  function Evaluator(instance) {
	    (0, _classCallCheck3.default)(this, Evaluator);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Context object
	     * @type {Object}
	     */
	    this.context = {

	      /**
	       * Flags ref
	       * @type {Object}
	       */
	      FLAGS: this.instance.FLAGS,

	      /**
	       * Dynamic global scope ref
	       * @type {Object}
	       */
	      this: null,

	      /**
	       * Dynamic trigger scope ref
	       * @type {Object}
	       */
	      trigger: null,

	      console: window.console,

	      alert: window.alert,

	      kernel: this.instance.instance

	    };
	  }

	  /**
	   * Set global scope
	   * @param {Object} scope
	   */


	  (0, _createClass3.default)(Evaluator, [{
	    key: "setGlobalScope",
	    value: function setGlobalScope(scope) {
	      this.context["this"] = scope;
	    }

	    /**
	     * Set trigger scope
	     * @param {Object} scope
	     */

	  }, {
	    key: "setTriggerScope",
	    value: function setTriggerScope(scope) {
	      this.context["trigger"] = scope;
	    }

	    /**
	     * Is value
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isLiteral",
	    value: function isLiteral(ast) {
	      return ast.type === _NodeList.NODE_TYPES.Literal;
	    }

	    /**
	     * Is identifier
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIdentifier",
	    value: function isIdentifier(ast) {
	      return ast.type === _NodeList.NODE_TYPES.Identifier;
	    }

	    /**
	     * Is boolean
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isBoolean",
	    value: function isBoolean(ast) {
	      return ast.name === "true" || ast.name === "false";
	    }

	    /**
	     * Is if statement
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isIfStatement",
	    value: function isIfStatement(ast) {
	      return ast.type === _NodeList.NODE_TYPES.IfStatement;
	    }

	    /**
	     * Is assignment expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAssignmentExpression",
	    value: function isAssignmentExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.AssignmentExpression;
	    }

	    /**
	     * Is member expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isMemberExpression",
	    value: function isMemberExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.MemberExpression;
	    }

	    /**
	     * Is call expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isCallExpression",
	    value: function isCallExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.CallExpression;
	    }

	    /**
	     * Is asynchronous statement
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isAsyncStatement",
	    value: function isAsyncStatement(ast) {
	      return ast.type === _NodeList.NODE_TYPES.AsyncStatement;
	    }

	    /**
	     * Is binary expression
	     * @param  {Object}  ast
	     * @return {Boolean}
	     */

	  }, {
	    key: "isBinaryExpression",
	    value: function isBinaryExpression(ast) {
	      return ast.type === _NodeList.NODE_TYPES.BinaryExpression || ast.type === _NodeList.NODE_TYPES.UnaryExpression || this.isLiteral(ast) === true || this.isIdentifier(ast) === true || this.isMemberExpression(ast) === true;
	    }

	    /**
	     * Evaluate an ast
	     * @param  {Object} ast
	     * @return {*}
	     */

	  }, {
	    key: "evaluate",
	    value: function evaluate(ast, resolve) {
	      this.evaluateBody(ast, 0, function (result) {
	        return resolve(result);
	      });
	    }

	    /**
	     * Evaluate an ast body
	     * @param  {Object}   ast
	     * @param  {Number}   index
	     * @param  {Function} resolve
	     * @return {*}
	     */

	  }, {
	    key: "evaluateBody",
	    value: function evaluateBody(ast, index, resolve) {

	      this.evalStatement(ast.body[index], function (result) {
	        if (++index < ast.body.length) {
	          this.evaluateBody(ast, index, function (result) {
	            return resolve(result);
	          });
	        } else {
	          resolve(result);
	        }
	      }.bind(this));

	      return void 0;
	    }

	    /**
	     * Eval statement
	     * @param {Object} ast
	     */

	  }, {
	    key: "evalStatement",
	    value: function evalStatement(ast, resolve) {

	      if (this.isBinaryExpression(ast) === true) {
	        return resolve(this.evalBinaryExpression(ast));
	      }

	      if (this.isIfStatement(ast) === true) {
	        if (ast.condition !== null) {
	          /** Condition met */
	          if (this.evalExpression(ast.condition).value === true) {
	            return this.evaluateBody(ast.consequent, 0, function (result) {
	              return resolve(result);
	            });
	          }
	          if (ast.alternate !== null) {
	            return this.evaluateBody(ast.alternate, 0, function (result) {
	              return resolve(result);
	            });
	          }
	        } else {
	          throw new Error("Invalid if statement condition");
	        }
	        return resolve();
	      }

	      if (this.isAssignmentExpression(ast) === true) {
	        return resolve(this.evalAssignExpression(ast));
	      }

	      if (this.isCallExpression(ast) === true) {
	        this.evalCallExpression(ast);
	        return resolve();
	      }

	      if (this.isAsyncStatement(ast) === true) {
	        return this.evalCallExpression(ast.init, function (result) {
	          return resolve(result);
	        });
	      }

	      return resolve();
	    }

	    /**
	     * Eval assignment expression
	     * Assignments auto return its result
	     * @param {Object} ast
	     * @return {*}
	     */

	  }, {
	    key: "evalAssignExpression",
	    value: function evalAssignExpression(ast) {

	      var result = null;

	      var left = this.evalExpression(ast.left);
	      var right = this.evalExpression(ast.right);

	      result = right.link !== void 0 ? right.link[right.property] : right.value;

	      if (ast.operator === "ASSIGN") {
	        return left.link[left.property] = result;
	      }

	      if (ast.operator === "ADDSET") {
	        return left.link[left.property] += result;
	      }

	      if (ast.operator === "SUBSET") {
	        return left.link[left.property] -= result;
	      }

	      if (ast.operator === "MULSET") {
	        return left.link[left.property] *= result;
	      }

	      if (ast.operator === "DIVSET") {
	        return left.link[left.property] /= result;
	      }

	      if (ast.operator === "MODSET") {
	        return left.link[left.property] %= result;
	      }

	      return 0;
	    }

	    /**
	     * Eval call expression
	     * @param {Object} ast
	     */

	  }, {
	    key: "evalCallExpression",
	    value: function evalCallExpression(ast, resolve) {

	      var callee = this.evalExpression(ast.callee);
	      var cmd = null;

	      if (callee.link === void 0) {
	        cmd = this.context[ast.callee.name];
	      } else {
	        cmd = callee.link[callee.property];
	      }

	      this.evalArguments(ast.arguments, function (args) {

	        if (args.length >= 1) {
	          cmd.apply(callee.link, args);
	        } else {
	          cmd.bind(callee.link)(function (result) {
	            return resolve(result);
	          });
	        }
	      });

	      return void 0;
	    }

	    /**
	     * Eval arguments
	     * @param  {Array} args
	     * @param  {Function} resolve
	     * @return {Array}
	     */

	  }, {
	    key: "evalArguments",
	    value: function evalArguments(args, resolve) {

	      var eArgs = [];

	      var ii = 0;
	      var length = args.length;

	      var index = 0;

	      if (length >= 1) {
	        for (; ii < length; ++ii) {
	          this.evalStatement(args[ii], function (result) {
	            index++;
	            eArgs.push(result);
	            if (index >= length) {
	              return resolve(eArgs);
	            }
	          });
	        };
	      } else {
	        return resolve(eArgs);
	      }
	    }

	    /**
	     * Eval binary expression
	     * @param {Object} ast
	     * @return {Object}
	     */

	  }, {
	    key: "evalExpression",
	    value: function evalExpression(ast) {

	      if (this.isMemberExpression(ast) === true) {
	        return this.evalMemberExpression(this.context, ast);
	      }

	      return {
	        value: this.evalBinaryExpression(ast)
	      };
	    }

	    /**
	     * Eval member expression
	     * @param  {Object} root
	     * @param  {Object} ast
	     * @return {Object}
	     */

	  }, {
	    key: "evalMemberExpression",
	    value: function evalMemberExpression(root, ast) {

	      var link = null;

	      if (this.isLiteral(ast) === true) {
	        return {
	          value: this.evalBinaryExpression(ast)
	        };
	      }
	      if (this.isIdentifier(ast) === true) {
	        return root[ast.name];
	      }

	      if (this.isIdentifier(ast.object) === true) {
	        link = root = root[ast.object.name];
	      }

	      if (root === void 0) {
	        throw new Error(ast.object.name + " => " + ast.property.name + " does not exist!");
	      }

	      if (this.isIdentifier(ast.property) === true) {
	        root = root[ast.property.name];
	      }

	      if (this.isMemberExpression(ast.property) === true) {
	        return this.evalMemberExpression(link, ast.property);
	      }

	      return {
	        link: link,
	        property: ast.property.name
	      };
	    }

	    /**
	     * Eval binary expression
	     * @param {Object} ast
	     * @return {*}
	     */

	  }, {
	    key: "evalBinaryExpression",
	    value: function evalBinaryExpression(ast) {

	      if (this.isLiteral(ast) === true) {
	        return ast.value;
	      }

	      if (this.isIdentifier(ast) === true) {
	        if (this.isBoolean(ast) === true) {
	          return ast.name === "true";
	        }
	      }

	      if (this.isMemberExpression(ast) === true) {
	        var exp = this.evalMemberExpression(this.context, ast);
	        return exp.link[exp.property];
	      }

	      if (ast.operator === "EQ") {
	        return this.evalBinaryExpression(ast.left) === this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "NEQ") {
	        return this.evalBinaryExpression(ast.left) !== this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "LT") {
	        return this.evalBinaryExpression(ast.left) < this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "LE") {
	        return this.evalBinaryExpression(ast.left) <= this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "GT") {
	        return this.evalBinaryExpression(ast.left) > this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "GE") {
	        return this.evalBinaryExpression(ast.left) >= this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "ADD") {
	        return this.evalBinaryExpression(ast.left) + this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "SUB") {
	        return this.evalBinaryExpression(ast.left) - this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "MUL") {
	        return this.evalBinaryExpression(ast.left) * this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "DIV") {
	        return this.evalBinaryExpression(ast.left) / this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "MOD") {
	        return this.evalBinaryExpression(ast.left) % this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "AND") {
	        return this.evalBinaryExpression(ast.left) && this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "OR") {
	        return this.evalBinaryExpression(ast.left) || this.evalBinaryExpression(ast.right);
	      }

	      if (ast.operator === "NOT") {
	        return !this.evalBinaryExpression(ast.init);
	      }

	      if (this.isIdentifier(ast) === true) {
	        return this.context[ast.name];
	      }

	      return 0;
	    }
	  }]);
	  return Evaluator;
	}();

	exports.default = Evaluator;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(22);

	var _Audio = __webpack_require__(115);

	var _Audio2 = _interopRequireDefault(_Audio);

	var _Entity2 = __webpack_require__(121);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Notification
	 * @class Notification
	 * @export
	 */
	var Notification = function (_Entity) {
	  (0, _inherits3.default)(Notification, _Entity);

	  /**
	   * @param {Object} instance
	   * @param {Object} obj
	   * @constructor
	   */
	  function Notification(instance, obj) {
	    (0, _classCallCheck3.default)(this, Notification);

	    /**
	     * Instance
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).call(this, obj));

	    _this.instance = instance;

	    /**
	     * Entity to follow
	     * @type {Object}
	     */
	    _this.follow = obj.follow || null;

	    /**
	     * Has shadow
	     * @type {Boolean}
	     */
	    _this.hasShadow = false;

	    /**
	     * Attach type
	     * @type {Number}
	     */
	    _this.type = _cfg.TYPES.Notification;

	    /**
	     * Notification style
	     * @type {String}
	     */
	    _this.style = obj.style || "MapMessage";

	    /**
	     * Message
	     * @type {String}
	     */
	    _this.msg = obj.msg || "undefined";

	    /**
	     * Top left texture
	     * @type {String}
	     */
	    _this.topLeft = "assets/img/chat/tleft.png";

	    /**
	     * Top right texture
	     * @type {String}
	     */
	    _this.topRight = "assets/img/chat/tright.png";

	    /**
	     * Bottom left texture
	     * @type {String}
	     */
	    _this.bottomLeft = "assets/img/chat/bleft.png";

	    /**
	     * Bottom right texture
	     * @type {String}
	     */
	    _this.bottomRight = "assets/img/chat/bright.png";

	    /**
	     * Pointer texture
	     * @type {String}
	     */
	    _this.pointer = "assets/img/chat/point.png";

	    /**
	     * Fill texture
	     * @type {String}
	     */
	    _this.fill = "assets/img/chat/fill.png";

	    /**
	     * Texture
	     * @type {Object}
	     */
	    _this.texture = null;

	    /**
	     * Padding
	     * @type {Number}
	     */
	    _this.padding = 3;

	    /**
	     * zIndex
	     * @type {Number}
	     */
	    _this.zIndex = 9999;

	    /**
	     * Z position
	     * @type {Number}
	     */
	    _this.z = 0;

	    /**
	     * Padding
	     * @type {Number}
	     */
	    _this.xPadding = 0;
	    _this.yPadding = 0;

	    /**
	     * Sprite frame
	     * @type {Number}
	     */
	    _this.sFrame = 0;

	    /**
	     * To calc sprite frame
	     * @type {Number}
	     */
	    _this.facing = 0;

	    /**
	     * Absolute position
	     * @type {Boolean}
	     */
	    _this.absolute = obj.absolute || false;

	    /**
	     * Max lifetime
	     * @type {Number}
	     */
	    _this.maxLifeTime = 3e3 + Date.now();

	    /**
	     * Lifetime
	     * @type {Number}
	     */
	    _this.lifeTime = Date.now() + 60 * (_this.msg.length * 4);

	    _this.frames = [0, 0];

	    _this.frame = obj.frame === void 0 ? 1 : obj.frame;

	    _this.reversed = [0, 0];

	    _this.reverseShadow = [0, 0];

	    /** Follow */
	    if (_this.follow !== null) {
	      _this.position = _this.follow.position;
	    }

	    /** Fade notification */
	    if (obj.fade === true) {
	      _this.opacity = .0;
	      _this.fadeIn(2);
	    } else {
	      _this.opacity = 1.0;
	    }

	    /** Play notification sound */
	    if (obj.sound === true) {
	      _this.playSound();
	    }

	    /** Dont let notifications stay too long */
	    if (_this.lifeTime > _this.maxLifeTime) {
	      _this.lifeTime = _this.maxLifeTime;
	    }

	    _this.loadTexture();

	    return _this;
	  }

	  /**
	   * Get frame index
	   * @return {Number}
	   */


	  (0, _createClass3.default)(Notification, [{
	    key: "getFrameIndex",
	    value: function getFrameIndex() {
	      return 0;
	    }

	    /**
	     * Play notifcation sound
	     */

	  }, {
	    key: "playSound",
	    value: function playSound() {

	      if (_cfg.BGS === false) return void 0;

	      var dist = this.instance.currentMap.distance(this.follow, this.instance.camera);

	      _Audio2.default.playSound("notice", 75, dist.x, dist.y);
	    }

	    /**
	     * Load texture
	     */

	  }, {
	    key: "loadTexture",
	    value: function loadTexture() {
	      var _this2 = this;

	      var self = this;

	      function load(sprite, resolve) {
	        (0, _utils.getSprite)(self[sprite], self.width, self.height, function (texture) {
	          this[sprite] = texture;
	          resolve();
	        }.bind(self));
	      }

	      load("topLeft", function () {
	        return load("topRight", function () {
	          return load("bottomLeft", function () {
	            return load("bottomRight", function () {
	              return load("pointer", function () {
	                return load("fill", function () {
	                  this.draw();
	                }.bind(_this2));
	              });
	            });
	          });
	        });
	      });
	    }

	    /**
	     * Draw
	     */

	  }, {
	    key: "draw",
	    value: function draw() {

	      if (this.style === "ChatBubble") {
	        this.drawChatBubble();
	      } else if (this.style === "MapMessage") {
	        this.drawMapMessage();
	      } else if (this.style === "MessageBox") {
	        this.drawMessageBox();
	      }

	      this.texture.xMul = 1;
	      this.texture.yMul = 1;

	      this.glTexture = this.instance.renderer.glRenderer.bufferTexture([this.texture]);

	      return void 0;
	    }

	    /**
	     * Draw a map message
	     */

	  }, {
	    key: "drawMapMessage",
	    value: function drawMapMessage() {

	      this.position = {
	        x: _cfg.DIMENSION,
	        y: _cfg.DIMENSION
	      };

	      var height = this.size.y;

	      this.size = this.instance.size;

	      this.size.y = height * 7.5;

	      this.size.x = this.instance.width * 2 - this.padding * 10;

	      this.z = 0;

	      this.texture = (0, _utils.createCanvasBuffer)(this.width, this.height + this.pointer.height);

	      var ctx = this.texture;

	      this.drawBox(ctx, this.width, this.height, this.padding);

	      this.drawText(ctx, this.width, this.height, this.msg, 1.5);
	    }

	    /**
	     * Draw a chat bubble
	     */

	  }, {
	    key: "drawChatBubble",
	    value: function drawChatBubble() {

	      this.texture = (0, _utils.createCanvasBuffer)(this.width, this.height + this.pointer.height);

	      var ctx = this.texture;

	      this.drawBox(ctx, this.width, this.height, this.padding);

	      ctx.drawImage(this.pointer.texture.canvas, this.width / 2, this.height);

	      this.drawText(ctx, this.width, this.height + this.pointer.height, this.msg, .75);
	    }

	    /**
	     * Draw chat box
	     * @param {Object} ctx
	     * @param {Number} width
	     * @param {Number} height
	     * @param {Number} padding
	     */

	  }, {
	    key: "drawBox",
	    value: function drawBox(ctx, width, height, padding) {

	      ctx.drawImage(this.fill.texture.canvas, padding, padding, width - padding * 2, height - padding * 2);

	      ctx.drawImage(this.fill.texture.canvas, 0, padding, padding, height - padding * 2);
	      ctx.drawImage(this.fill.texture.canvas, width - padding, padding, padding, height - padding * 2);

	      ctx.drawImage(this.fill.texture.canvas, padding, 0, width - padding * 2, padding);
	      ctx.drawImage(this.fill.texture.canvas, padding, height - padding, width - padding * 2, padding);

	      ctx.drawImage(this.topLeft.texture.canvas, 0, 0);
	      ctx.drawImage(this.topRight.texture.canvas, width - this.topRight.width, 0);
	      ctx.drawImage(this.bottomLeft.texture.canvas, 0, height - this.bottomLeft.height);
	      ctx.drawImage(this.bottomRight.texture.canvas, width - this.topRight.width, height - this.bottomLeft.height);
	    }

	    /**
	     * Draw a text
	     * @param {Object} ctx
	     * @param {Number} width
	     * @param {Number} height
	     * @param {String} msg
	     * @param {Number} resolution
	     */

	  }, {
	    key: "drawText",
	    value: function drawText(ctx, width, height, msg, resolution) {

	      var txt = (0, _utils.createCanvasBuffer)(width, height);
	      var margin = 0;

	      txt.font = 25 + "px AdvoCut";
	      txt.strokeStyle = "#000";
	      txt.lineWidth = 2.75;
	      txt.strokeText(msg, width / 4, height);
	      txt.fillStyle = "white";
	      txt.fillText(msg, width / 4, height);

	      ctx.drawImage(txt.canvas, 0, 0, width * resolution << 0, height * resolution << 0);
	    }
	  }]);
	  return Notification;
	}(_Entity3.default);

	exports.default = Notification;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	__webpack_require__(151);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(21);

	var cfg = _interopRequireWildcard(_cfg);

	var _utils = __webpack_require__(22);

	var _functions = __webpack_require__(127);

	var entity = _interopRequireWildcard(_functions);

	var _render = __webpack_require__(156);

	var render = _interopRequireWildcard(_render);

	var _debug = __webpack_require__(158);

	var debug = _interopRequireWildcard(_debug);

	var _webgl = __webpack_require__(162);

	var _webgl2 = _interopRequireDefault(_webgl);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Renderer
	 * @class Renderer
	 * @export
	 */
	var Renderer = function () {

	  /**
	   * @param {Object} instance
	   * @constructor
	   */
	  function Renderer(instance) {
	    (0, _classCallCheck3.default)(this, Renderer);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * WebGL renderer
	     * @type {Object}
	     */
	    this.glRenderer = null;

	    /**
	     * Size
	     * @type {Object}
	     */
	    this.size = instance.size;

	    /**
	     * Layers ref
	     * @type {Object}
	     */
	    this.layers = instance.layers;

	    /**
	     * Node ref
	     * @type {Object}
	     */
	    this.node = instance.node;

	    /**
	     * WebGL node ref
	     * @type {Object}
	     */
	    this.glNode = instance.glNode;

	    /**
	     * Context ref
	     * @type {Object}
	     */
	    this.context = instance.context;

	    /**
	     * Gl context ref
	     * @type {Object}
	     */
	    this.gl = instance.glContext;

	    /**
	     * Image smoothing
	     * @type {Boolean}
	     */
	    this.imageSmoothing = false;

	    /**
	     * Dimension
	     * @type {Number}
	     */
	    this.dimension = cfg.DIMENSION;

	    /**
	     * Delta timer
	     * @type {Number}
	     */
	    this.delta = 0;

	    /**
	     * Now timestamp
	     * @type {Number}
	     */
	    this.now = 0;

	    /**
	     * Then timestamp
	     * @type {Number}
	     */
	    this.then = 0;

	    /**
	     * Width
	     * @type {Number}
	     */
	    this.width = 0;

	    /**
	     * Height
	     * @type {Number}
	     */
	    this.height = 0;

	    /**
	     * Camera ref
	     * @type {Object}
	     */
	    this.camera = instance.camera;

	    if (cfg.WGL_SUPPORT) {
	      this.glRenderer = new _webgl2.default(this);
	      this.glRenderer.init();
	    }

	    /**
	     * Auto switch to current game mode dependant rendering
	     */
	    this.switchRenderingMode(cfg.DEBUG_MODE ? 0 : 1);

	    this.resize(false);
	  }

	  /**
	   * Switch rendering mode
	   * @param {Number} mode
	   */


	  (0, _createClass3.default)(Renderer, [{
	    key: "switchRenderingMode",
	    value: function switchRenderingMode(mode) {

	      if (mode === cfg.WGL) {
	        if (cfg.WGL_SUPPORT) {
	          this.node.style.display = "none";
	          this.glNode.style.display = "block";
	          cfg.RENDER_MODE = mode;
	        } else {
	          mode = cfg.CANVAS;
	        }
	      }

	      if (mode === cfg.CANVAS) {
	        this.node.style.display = "block";
	        this.glNode.style.display = "none";
	        cfg.RENDER_MODE = mode;
	      }
	    }

	    /**
	     * @param {Boolean} value
	     * @setter
	     */

	  }, {
	    key: "update",


	    /**
	     * Update
	     */
	    value: function update() {

	      this.updateTimers();

	      if (this.camera.objectFocus !== null) {
	        this.camera.animate(this.camera.objectFocus);
	      }

	      return void 0;
	    }

	    /**
	     * Update timers
	     */

	  }, {
	    key: "updateTimers",
	    value: function updateTimers() {
	      this.now = Date.now();
	      this.delta = (this.now - this.then) / 1e3;
	      this.then = this.now;
	      return void 0;
	    }

	    /**
	     * Resize
	     * @param {Boolean} redraw
	     */

	  }, {
	    key: "resize",
	    value: function resize(redraw) {
	      this.width = window.innerWidth;
	      this.height = window.innerHeight;
	      this.camera.width = this.width;
	      this.camera.height = this.height;
	      this.instance.width = this.width;
	      this.instance.height = this.height;
	      if (cfg.RENDER_MODE === cfg.WGL) {
	        this.glNode.width = this.width;
	        this.glNode.height = this.height;
	        this.glRenderer.resize(this.width, this.height);
	      } else {
	        this.node.width = this.width;
	        this.node.height = this.height;
	      }
	      this.clear();
	      this.imageSmoothingEnabled = this.imageSmoothing;
	      this.instance.mini.resize();
	      this.instance.editor.updateTilesetPosition();
	      this.draw();
	    }
	  }, {
	    key: "imageSmoothingEnabled",
	    set: function set(value) {

	      value = value ? true : false;

	      this.imageSmoothing = value;

	      this.context.setImageSmoothing(value);
	    }
	  }]);
	  return Renderer;
	}();

	exports.default = Renderer;


	(0, _utils.inherit)(Renderer, debug);
	(0, _utils.inherit)(Renderer, render);
	(0, _utils.inherit)(Renderer, entity);
	(0, _utils.inherit)(Renderer, webgl);

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _Howler = __webpack_require__(152);

	window.rAF = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	}();

	/**
	 * @param {Boolean} value
	 */
	CanvasRenderingContext2D.prototype.setImageSmoothing = function (value) {

	  this.imageSmoothingEnabled = value;
	  this.oImageSmoothingEnabled = value;
	  this.msImageSmoothingEnabled = value;
	  this.mozImageSmoothingEnabled = value;
	  this.webkitImageSmoothingEnabled = value;

	  return void 0;
	};

	/**
	 * Clear a context
	 * @param {String} color Clear by color
	 */
	CanvasRenderingContext2D.prototype.clear = function (color) {

	  if (color) {
	    var original = this.fillStyle;
	    this.fillStyle = color;
	    this.fillRect(0, 0, this.canvas.width, this.canvas.height);
	    this.fillStyle = original;
	  } else {
	    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  }

	  return void 0;
	};

	// from: https://developer.mozilla.org/de/docs/Web/Events/wheel
	// creates a global "addWheelListener" method
	// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
	(function (window, document) {

	  var prefix = "",
	      _addEventListener,
	      support;

	  // detect event model
	  if (window.addEventListener) {
	    _addEventListener = "addEventListener";
	  } else {
	    _addEventListener = "attachEvent";
	    prefix = "on";
	  }

	  // detect available wheel event
	  support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
	  document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
	  "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	  window.addWheelListener = function (elem, callback, useCapture) {
	    _addWheelListener(elem, support, callback, useCapture);

	    // handle MozMousePixelScroll in older Firefox
	    if (support == "DOMMouseScroll") {
	      _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
	    }
	  };

	  function _addWheelListener(elem, eventName, callback, useCapture) {
	    elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
	      !originalEvent && (originalEvent = window.event);

	      // create a normalized event object
	      var event = {
	        // keep a ref to the original event object
	        originalEvent: originalEvent,
	        target: originalEvent.target || originalEvent.srcElement,
	        type: "wheel",
	        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
	        deltaX: 0,
	        deltaZ: 0,
	        preventDefault: function preventDefault() {
	          originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
	        }
	      };

	      // calculate deltaY (and deltaX) according to the event
	      if (support == "mousewheel") {
	        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
	        // Webkit also support wheelDeltaX
	        originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
	      } else {
	        event.deltaY = originalEvent.detail;
	      }

	      // it's time to fire the callback
	      return callback(event);
	    }, useCapture || false);
	  }
	})(window, document);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = __webpack_require__(84);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _getOwnPropertyNames = __webpack_require__(153);

	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 *  howler.js v1.1.29
	 *  howlerjs.com
	 *
	 *  (c) 2013-2016, James Simpson of GoldFire Studios
	 *  goldfirestudios.com
	 *
	 *  MIT License
	 */

	(function () {
	    // setup
	    var cache = {};

	    // setup the audio context
	    var ctx = null,
	        usingWebAudio = true,
	        noAudio = false;
	    try {
	        if (typeof AudioContext !== 'undefined') {
	            ctx = new AudioContext();
	        } else if (typeof webkitAudioContext !== 'undefined') {
	            ctx = new webkitAudioContext();
	        } else {
	            usingWebAudio = false;
	        }
	    } catch (e) {
	        usingWebAudio = false;
	    }

	    if (!usingWebAudio) {
	        if (typeof Audio !== 'undefined') {
	            try {
	                new Audio();
	            } catch (e) {
	                noAudio = true;
	            }
	        } else {
	            noAudio = true;
	        }
	    }

	    // create a master gain node
	    if (usingWebAudio) {
	        var masterGain = typeof ctx.createGain === 'undefined' ? ctx.createGainNode() : ctx.createGain();
	        masterGain.gain.value = 1;
	        masterGain.connect(ctx.destination);
	    }

	    // create global controller
	    var HowlerGlobal = function HowlerGlobal(codecs) {
	        this._volume = 1;
	        this._muted = false;
	        this.usingWebAudio = usingWebAudio;
	        this.ctx = ctx;
	        this.noAudio = noAudio;
	        this._howls = [];
	        this._codecs = codecs;
	        this.iOSAutoEnable = true;
	    };
	    HowlerGlobal.prototype = {
	        /**
	         * Get/set the global volume for all sounds.
	         * @param  {Float} vol Volume from 0.0 to 1.0.
	         * @return {Howler/Float}     Returns self or current volume.
	         */
	        volume: function volume(vol) {
	            var self = this;

	            // make sure volume is a number
	            vol = parseFloat(vol);

	            if (vol >= 0 && vol <= 1) {
	                self._volume = vol;

	                if (usingWebAudio) {
	                    masterGain.gain.value = vol;
	                }

	                // loop through cache and change volume of all nodes that are using HTML5 Audio
	                for (var key in self._howls) {
	                    if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	                        // loop through the audio nodes
	                        for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
	                            self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
	                        }
	                    }
	                }

	                return self;
	            }

	            // return the current global volume
	            return usingWebAudio ? masterGain.gain.value : self._volume;
	        },

	        /**
	         * Mute all sounds.
	         * @return {Howler}
	         */
	        mute: function mute() {
	            this._setMuted(true);

	            return this;
	        },

	        /**
	         * Unmute all sounds.
	         * @return {Howler}
	         */
	        unmute: function unmute() {
	            this._setMuted(false);

	            return this;
	        },

	        /**
	         * Handle muting and unmuting globally.
	         * @param  {Boolean} muted Is muted or not.
	         */
	        _setMuted: function _setMuted(muted) {
	            var self = this;

	            self._muted = muted;

	            if (usingWebAudio) {
	                masterGain.gain.value = muted ? 0 : self._volume;
	            }

	            for (var key in self._howls) {
	                if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
	                    // loop through the audio nodes
	                    for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
	                        self._howls[key]._audioNode[i].muted = muted;
	                    }
	                }
	            }
	        },

	        /**
	         * Check for codec support.
	         * @param  {String} ext Audio file extension.
	         * @return {Boolean}
	         */
	        codecs: function codecs(ext) {
	            return this._codecs[ext];
	        },

	        /**
	         * iOS will only allow audio to be played after a user interaction.
	         * Attempt to automatically unlock audio on the first user interaction.
	         * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
	         * @return {Howler}
	         */
	        _enableiOSAudio: function _enableiOSAudio() {
	            var self = this;

	            // only run this on iOS if audio isn't already eanbled
	            if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
	                return;
	            }

	            self._iOSEnabled = false;

	            // call this method on touch start to create and play a buffer,
	            // then check if the audio actually played to determine if
	            // audio has now been unlocked on iOS
	            var unlock = function unlock() {
	                // create an empty buffer
	                var buffer = ctx.createBuffer(1, 1, 22050);
	                var source = ctx.createBufferSource();
	                source.buffer = buffer;
	                source.connect(ctx.destination);

	                // play the empty buffer
	                if (typeof source.start === 'undefined') {
	                    source.noteOn(0);
	                } else {
	                    source.start(0);
	                }

	                // setup a timeout to check that we are unlocked on the next event loop
	                setTimeout(function () {
	                    if (source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE) {
	                        // update the unlocked state and prevent this check from happening again
	                        self._iOSEnabled = true;
	                        self.iOSAutoEnable = false;

	                        // remove the touch start listener
	                        window.removeEventListener('touchend', unlock, false);
	                    }
	                }, 0);
	            };

	            // setup a touch start listener to attempt an unlock in
	            window.addEventListener('touchend', unlock, false);

	            return self;
	        }
	    };

	    // check for browser codec support
	    var audioTest = null;
	    var codecs = {};
	    if (!noAudio) {
	        audioTest = new Audio();
	        codecs = {
	            mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
	            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
	            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
	            wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
	            aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
	            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	            mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
	            weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
	        };
	    }

	    // allow access to the global audio controls
	    var Howler = new HowlerGlobal(codecs);

	    // setup the audio object
	    var Howl = function Howl(o) {
	        var self = this;

	        // setup the defaults
	        self._autoplay = o.autoplay || false;
	        self._buffer = o.buffer || false;
	        self._duration = o.duration || 0;
	        self._format = o.format || null;
	        self._loop = o.loop || false;
	        self._loaded = false;
	        self._sprite = o.sprite || {};
	        self._src = o.src || '';
	        self._pos3d = o.pos3d || [0, 0, -0.5];
	        self._volume = o.volume !== undefined ? o.volume : 1;
	        self._urls = o.urls || [];
	        self._rate = o.rate || 1;

	        // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
	        // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
	        // if 3d sound is used
	        self._model = o.model || null;

	        // setup event functions
	        self._onload = [o.onload || function () {}];
	        self._onloaderror = [o.onloaderror || function () {}];
	        self._onend = [o.onend || function () {}];
	        self._onpause = [o.onpause || function () {}];
	        self._onplay = [o.onplay || function () {}];

	        self._onendTimer = [];

	        // Web Audio or HTML5 Audio?
	        self._webAudio = usingWebAudio && !self._buffer;

	        // check if we need to fall back to HTML5 Audio
	        self._audioNode = [];
	        if (self._webAudio) {
	            self._setupAudioNode();
	        }

	        // automatically try to enable audio on iOS
	        if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
	            Howler._enableiOSAudio();
	        }

	        // add this to an array of Howl's to allow global control
	        Howler._howls.push(self);

	        // load the track
	        self.load();
	    };

	    // setup all of the methods
	    Howl.prototype = {
	        /**
	         * Load an audio file.
	         * @return {Howl}
	         */
	        load: function load() {
	            var self = this,
	                url = null;

	            // if no audio is available, quit immediately
	            if (noAudio) {
	                self.on('loaderror', new Error('No audio support.'));
	                return;
	            }

	            // loop through source URLs and pick the first one that is compatible
	            for (var i = 0; i < self._urls.length; i++) {
	                var ext, urlItem;

	                if (self._format) {
	                    // use specified audio format if available
	                    ext = self._format;
	                } else {
	                    // figure out the filetype (whether an extension or base64 data)
	                    urlItem = self._urls[i];
	                    ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
	                    if (!ext) {
	                        ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
	                    }

	                    if (ext) {
	                        ext = ext[1].toLowerCase();
	                    } else {
	                        self.on('loaderror', new Error('Could not extract format from passed URLs, please add format parameter.'));
	                        return;
	                    }
	                }

	                if (codecs[ext]) {
	                    url = self._urls[i];
	                    break;
	                }
	            }

	            if (!url) {
	                self.on('loaderror', new Error('No codec support for selected audio sources.'));
	                return;
	            }

	            self._src = url;

	            if (self._webAudio) {
	                loadBuffer(self, url);
	            } else {
	                var newNode = new Audio();

	                // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
	                newNode.addEventListener('error', function () {
	                    if (newNode.error && newNode.error.code === 4) {
	                        HowlerGlobal.noAudio = true;
	                    }

	                    self.on('loaderror', {
	                        type: newNode.error ? newNode.error.code : 0
	                    });
	                }, false);

	                self._audioNode.push(newNode);

	                // setup the new audio node
	                newNode.src = url;
	                newNode._pos = 0;
	                newNode.preload = 'auto';
	                newNode.volume = Howler._muted ? 0 : self._volume * Howler.volume();

	                // setup the event listener to start playing the sound
	                // as soon as it has buffered enough
	                var listener = function listener() {
	                    // round up the duration when using HTML5 Audio to account for the lower precision
	                    self._duration = Math.ceil(newNode.duration * 10) / 10;

	                    // setup a sprite if none is defined
	                    if ((0, _getOwnPropertyNames2.default)(self._sprite).length === 0) {
	                        self._sprite = {
	                            _default: [0, self._duration * 1000]
	                        };
	                    }

	                    if (!self._loaded) {
	                        self._loaded = true;
	                        self.on('load');
	                    }

	                    if (self._autoplay) {
	                        self.play();
	                    }

	                    // clear the event listener
	                    newNode.removeEventListener('canplaythrough', listener, false);
	                };
	                newNode.addEventListener('canplaythrough', listener, false);
	                newNode.load();
	            }

	            return self;
	        },

	        /**
	         * Get/set the URLs to be pulled from to play in this source.
	         * @param  {Array} urls  Arry of URLs to load from
	         * @return {Howl}        Returns self or the current URLs
	         */
	        urls: function urls(_urls) {
	            var self = this;

	            if (_urls) {
	                self.stop();
	                self._urls = typeof _urls === 'string' ? [_urls] : _urls;
	                self._loaded = false;
	                self.load();

	                return self;
	            } else {
	                return self._urls;
	            }
	        },

	        /**
	         * Play a sound from the current time (0 by default).
	         * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
	         * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
	         * @return {Howl}
	         */
	        play: function play(sprite, callback) {
	            var self = this;

	            // if no sprite was passed but a callback was, update the variables
	            if (typeof sprite === 'function') {
	                callback = sprite;
	            }

	            // use the default sprite if none is passed
	            if (!sprite || typeof sprite === 'function') {
	                sprite = '_default';
	            }

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('load', function () {
	                    self.play(sprite, callback);
	                });

	                return self;
	            }

	            // if the sprite doesn't exist, play nothing
	            if (!self._sprite[sprite]) {
	                if (typeof callback === 'function') callback();
	                return self;
	            }

	            // get the node to playback
	            self._inactiveNode(function (node) {
	                // persist the sprite being played
	                node._sprite = sprite;

	                // determine where to start playing from
	                var pos = node._pos > 0 ? node._pos : self._sprite[sprite][0] / 1000;

	                // determine how long to play for
	                var duration = 0;
	                if (self._webAudio) {
	                    duration = self._sprite[sprite][1] / 1000 - node._pos;
	                    if (node._pos > 0) {
	                        pos = self._sprite[sprite][0] / 1000 + pos;
	                    }
	                } else {
	                    duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
	                }

	                // determine if this sound should be looped
	                var loop = !!(self._loop || self._sprite[sprite][2]);

	                // set timer to fire the 'onend' event
	                var soundId = typeof callback === 'string' ? callback : Math.round(Date.now() * Math.random()) + '',
	                    timerId;
	                (function () {
	                    var data = {
	                        id: soundId,
	                        sprite: sprite,
	                        loop: loop
	                    };
	                    timerId = setTimeout(function () {
	                        // if looping, restart the track
	                        if (!self._webAudio && loop) {
	                            self.stop(data.id).play(sprite, data.id);
	                        }

	                        // set web audio node to paused at end
	                        if (self._webAudio && !loop) {
	                            self._nodeById(data.id).paused = true;
	                            self._nodeById(data.id)._pos = 0;

	                            // clear the end timer
	                            self._clearEndTimer(data.id);
	                        }

	                        // end the track if it is HTML audio and a sprite
	                        if (!self._webAudio && !loop) {
	                            self.stop(data.id);
	                        }

	                        // fire ended event
	                        self.on('end', soundId);
	                    }, duration / self._rate * 1000);

	                    // store the reference to the timer
	                    self._onendTimer.push({
	                        timer: timerId,
	                        id: data.id
	                    });
	                })();

	                if (self._webAudio) {
	                    var loopStart = self._sprite[sprite][0] / 1000,
	                        loopEnd = self._sprite[sprite][1] / 1000;

	                    // set the play id to this node and load into context
	                    node.id = soundId;
	                    node.paused = false;
	                    refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
	                    self._playStart = ctx.currentTime;
	                    node.gain.value = self._volume;

	                    if (typeof node.bufferSource.start === 'undefined') {
	                        loop ? node.bufferSource.noteGrainOn(0, pos, 86400) : node.bufferSource.noteGrainOn(0, pos, duration);
	                    } else {
	                        loop ? node.bufferSource.start(0, pos, 86400) : node.bufferSource.start(0, pos, duration);
	                    }
	                } else {
	                    if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
	                        node.readyState = 4;
	                        node.id = soundId;
	                        node.currentTime = pos;
	                        node.muted = Howler._muted || node.muted;
	                        node.volume = self._volume * Howler.volume();
	                        setTimeout(function () {
	                            node.play();
	                        }, 0);
	                    } else {
	                        self._clearEndTimer(soundId);

	                        (function () {
	                            var sound = self,
	                                playSprite = sprite,
	                                fn = callback,
	                                newNode = node;
	                            var listener = function listener() {
	                                sound.play(playSprite, fn);

	                                // clear the event listener
	                                newNode.removeEventListener('canplaythrough', listener, false);
	                            };
	                            newNode.addEventListener('canplaythrough', listener, false);
	                        })();

	                        return self;
	                    }
	                }

	                // fire the play event and send the soundId back in the callback
	                self.on('play');
	                if (typeof callback === 'function') callback(soundId);

	                return self;
	            });

	            return self;
	        },

	        /**
	         * Pause playback and save the current position.
	         * @param {String} id (optional) The play instance ID.
	         * @return {Howl}
	         */
	        pause: function pause(id) {
	            var self = this;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('play', function () {
	                    self.pause(id);
	                });

	                return self;
	            }

	            // clear 'onend' timer
	            self._clearEndTimer(id);

	            var activeNode = id ? self._nodeById(id) : self._activeNode();
	            if (activeNode) {
	                activeNode._pos = self.pos(null, id);

	                if (self._webAudio) {
	                    // make sure the sound has been created
	                    if (!activeNode.bufferSource || activeNode.paused) {
	                        return self;
	                    }

	                    activeNode.paused = true;
	                    if (typeof activeNode.bufferSource.stop === 'undefined') {
	                        activeNode.bufferSource.noteOff(0);
	                    } else {
	                        activeNode.bufferSource.stop(0);
	                    }
	                } else {
	                    activeNode.pause();
	                }
	            }

	            self.on('pause');

	            return self;
	        },

	        /**
	         * Stop playback and reset to start.
	         * @param  {String} id  (optional) The play instance ID.
	         * @return {Howl}
	         */
	        stop: function stop(id) {
	            var self = this;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('play', function () {
	                    self.stop(id);
	                });

	                return self;
	            }

	            // clear 'onend' timer
	            self._clearEndTimer(id);

	            var activeNode = id ? self._nodeById(id) : self._activeNode();
	            if (activeNode) {
	                activeNode._pos = 0;

	                if (self._webAudio) {
	                    // make sure the sound has been created
	                    if (!activeNode.bufferSource || activeNode.paused) {
	                        return self;
	                    }

	                    activeNode.paused = true;

	                    if (typeof activeNode.bufferSource.stop === 'undefined') {
	                        activeNode.bufferSource.noteOff(0);
	                    } else {
	                        activeNode.bufferSource.stop(0);
	                    }
	                } else if (!isNaN(activeNode.duration)) {
	                    activeNode.pause();
	                    activeNode.currentTime = 0;
	                }
	            }

	            return self;
	        },

	        /**
	         * Mute this sound.
	         * @param  {String} id (optional) The play instance ID.
	         * @return {Howl}
	         */
	        mute: function mute(id) {
	            var self = this;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('play', function () {
	                    self.mute(id);
	                });

	                return self;
	            }

	            var activeNode = id ? self._nodeById(id) : self._activeNode();
	            if (activeNode) {
	                if (self._webAudio) {
	                    activeNode.gain.value = 0;
	                } else {
	                    activeNode.muted = true;
	                }
	            }

	            return self;
	        },

	        /**
	         * Unmute this sound.
	         * @param  {String} id (optional) The play instance ID.
	         * @return {Howl}
	         */
	        unmute: function unmute(id) {
	            var self = this;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('play', function () {
	                    self.unmute(id);
	                });

	                return self;
	            }

	            var activeNode = id ? self._nodeById(id) : self._activeNode();
	            if (activeNode) {
	                if (self._webAudio) {
	                    activeNode.gain.value = self._volume;
	                } else {
	                    activeNode.muted = false;
	                }
	            }

	            return self;
	        },

	        /**
	         * Get/set volume of this sound.
	         * @param  {Float}  vol Volume from 0.0 to 1.0.
	         * @param  {String} id  (optional) The play instance ID.
	         * @return {Howl/Float}     Returns self or current volume.
	         */
	        volume: function volume(vol, id) {
	            var self = this;

	            // make sure volume is a number
	            vol = parseFloat(vol);

	            if (vol >= 0 && vol <= 1) {
	                self._volume = vol;

	                // if the sound hasn't been loaded, add it to the event queue
	                if (!self._loaded) {
	                    self.on('play', function () {
	                        self.volume(vol, id);
	                    });

	                    return self;
	                }

	                var activeNode = id ? self._nodeById(id) : self._activeNode();
	                if (activeNode) {
	                    if (self._webAudio) {
	                        activeNode.gain.value = vol;
	                    } else {
	                        activeNode.volume = vol * Howler.volume();
	                    }
	                }

	                return self;
	            } else {
	                return self._volume;
	            }
	        },

	        /**
	         * Get/set whether to loop the sound.
	         * @param  {Boolean} loop To loop or not to loop, that is the question.
	         * @return {Howl/Boolean}      Returns self or current looping value.
	         */
	        loop: function loop(_loop) {
	            var self = this;

	            if (typeof _loop === 'boolean') {
	                self._loop = _loop;

	                return self;
	            } else {
	                return self._loop;
	            }
	        },

	        /**
	         * Get/set sound sprite definition.
	         * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
	         *                @param {Integer} offset   Where to begin playback in milliseconds
	         *                @param {Integer} duration How long to play in milliseconds
	         *                @param {Boolean} loop     (optional) Set true to loop this sprite
	         * @return {Howl}        Returns current sprite sheet or self.
	         */
	        sprite: function sprite(_sprite) {
	            var self = this;

	            if ((typeof _sprite === 'undefined' ? 'undefined' : (0, _typeof3.default)(_sprite)) === 'object') {
	                self._sprite = _sprite;

	                return self;
	            } else {
	                return self._sprite;
	            }
	        },

	        /**
	         * Get/set the position of playback.
	         * @param  {Float}  pos The position to move current playback to.
	         * @param  {String} id  (optional) The play instance ID.
	         * @return {Howl/Float}      Returns self or current playback position.
	         */
	        pos: function pos(_pos, id) {
	            var self = this;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('load', function () {
	                    self.pos(_pos);
	                });

	                return typeof _pos === 'number' ? self : self._pos || 0;
	            }

	            // make sure we are dealing with a number for pos
	            _pos = parseFloat(_pos);

	            var activeNode = id ? self._nodeById(id) : self._activeNode();
	            if (activeNode) {
	                if (_pos >= 0) {
	                    self.pause(id);
	                    activeNode._pos = _pos;
	                    self.play(activeNode._sprite, id);

	                    return self;
	                } else {
	                    return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
	                }
	            } else if (_pos >= 0) {
	                return self;
	            } else {
	                // find the first inactive node to return the pos for
	                for (var i = 0; i < self._audioNode.length; i++) {
	                    if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	                        return self._webAudio ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
	                    }
	                }
	            }
	        },

	        /**
	         * Get/set the 3D position of the audio source.
	         * The most common usage is to set the 'x' position
	         * to affect the left/right ear panning. Setting any value higher than
	         * 1.0 will begin to decrease the volume of the sound as it moves further away.
	         * NOTE: This only works with Web Audio API, HTML5 Audio playback
	         * will not be affected.
	         * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
	         * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
	         * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
	         * @param  {String} id (optional) The play instance ID.
	         * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
	         */
	        pos3d: function pos3d(x, y, z, id) {
	            var self = this;

	            // set a default for the optional 'y' & 'z'
	            y = typeof y === 'undefined' || !y ? 0 : y;
	            z = typeof z === 'undefined' || !z ? -0.5 : z;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('play', function () {
	                    self.pos3d(x, y, z, id);
	                });

	                return self;
	            }

	            if (x >= 0 || x < 0) {
	                if (self._webAudio) {
	                    var activeNode = id ? self._nodeById(id) : self._activeNode();
	                    if (activeNode) {
	                        self._pos3d = [x, y, z];
	                        activeNode.panner.setPosition(x, y, z);
	                        activeNode.panner.panningModel = self._model || 'HRTF';
	                    }
	                }
	            } else {
	                return self._pos3d;
	            }

	            return self;
	        },

	        /**
	         * Fade a currently playing sound between two volumes.
	         * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
	         * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
	         * @param  {Number}   len      Time in milliseconds to fade.
	         * @param  {Function} callback (optional) Fired when the fade is complete.
	         * @param  {String}   id       (optional) The play instance ID.
	         * @return {Howl}
	         */
	        fade: function fade(from, to, len, callback, id) {
	            var self = this,
	                diff = Math.abs(from - to),
	                dir = from > to ? 'down' : 'up',
	                steps = diff / 0.01,
	                stepTime = len / steps;

	            // if the sound hasn't been loaded, add it to the event queue
	            if (!self._loaded) {
	                self.on('load', function () {
	                    self.fade(from, to, len, callback, id);
	                });

	                return self;
	            }

	            // set the volume to the start position
	            self.volume(from, id);

	            for (var i = 1; i <= steps; i++) {
	                (function () {
	                    var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
	                        vol = Math.round(1000 * change) / 1000,
	                        toVol = to;

	                    setTimeout(function () {
	                        self.volume(vol, id);

	                        if (vol === toVol) {
	                            if (callback) callback();
	                        }
	                    }, stepTime * i);
	                })();
	            }
	        },

	        /**
	         * [DEPRECATED] Fade in the current sound.
	         * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
	         * @param  {Number}   len     Time in milliseconds to fade.
	         * @param  {Function} callback
	         * @return {Howl}
	         */
	        fadeIn: function fadeIn(to, len, callback) {
	            return this.volume(0).play().fade(0, to, len, callback);
	        },

	        /**
	         * [DEPRECATED] Fade out the current sound and pause when finished.
	         * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
	         * @param  {Number}   len      Time in milliseconds to fade.
	         * @param  {Function} callback
	         * @param  {String}   id       (optional) The play instance ID.
	         * @return {Howl}
	         */
	        fadeOut: function fadeOut(to, len, callback, id) {
	            var self = this;

	            return self.fade(self._volume, to, len, function () {
	                if (callback) callback();
	                self.pause(id);

	                // fire ended event
	                self.on('end');
	            }, id);
	        },

	        /**
	         * Get an audio node by ID.
	         * @return {Howl} Audio node.
	         */
	        _nodeById: function _nodeById(id) {
	            var self = this,
	                node = self._audioNode[0];

	            // find the node with this ID
	            for (var i = 0; i < self._audioNode.length; i++) {
	                if (self._audioNode[i].id === id) {
	                    node = self._audioNode[i];
	                    break;
	                }
	            }

	            return node;
	        },

	        /**
	         * Get the first active audio node.
	         * @return {Howl} Audio node.
	         */
	        _activeNode: function _activeNode() {
	            var self = this,
	                node = null;

	            // find the first playing node
	            for (var i = 0; i < self._audioNode.length; i++) {
	                if (!self._audioNode[i].paused) {
	                    node = self._audioNode[i];
	                    break;
	                }
	            }

	            // remove excess inactive nodes
	            self._drainPool();

	            return node;
	        },

	        /**
	         * Get the first inactive audio node.
	         * If there is none, create a new one and add it to the pool.
	         * @param  {Function} callback Function to call when the audio node is ready.
	         */
	        _inactiveNode: function _inactiveNode(callback) {
	            var self = this,
	                node = null;

	            // find first inactive node to recycle
	            for (var i = 0; i < self._audioNode.length; i++) {
	                if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
	                    // send the node back for use by the new play instance
	                    callback(self._audioNode[i]);
	                    node = true;
	                    break;
	                }
	            }

	            // remove excess inactive nodes
	            self._drainPool();

	            if (node) {
	                return;
	            }

	            // create new node if there are no inactives
	            var newNode;
	            if (self._webAudio) {
	                newNode = self._setupAudioNode();
	                callback(newNode);
	            } else {
	                self.load();
	                newNode = self._audioNode[self._audioNode.length - 1];

	                // listen for the correct load event and fire the callback
	                var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
	                var listener = function listener() {
	                    newNode.removeEventListener(listenerEvent, listener, false);
	                    callback(newNode);
	                };
	                newNode.addEventListener(listenerEvent, listener, false);
	            }
	        },

	        /**
	         * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
	         */
	        _drainPool: function _drainPool() {
	            var self = this,
	                inactive = 0,
	                i;

	            // count the number of inactive nodes
	            for (i = 0; i < self._audioNode.length; i++) {
	                if (self._audioNode[i].paused) {
	                    inactive++;
	                }
	            }

	            // remove excess inactive nodes
	            for (i = self._audioNode.length - 1; i >= 0; i--) {
	                if (inactive <= 5) {
	                    break;
	                }

	                if (self._audioNode[i].paused) {
	                    // disconnect the audio source if using Web Audio
	                    if (self._webAudio) {
	                        self._audioNode[i].disconnect(0);
	                    }

	                    inactive--;
	                    self._audioNode.splice(i, 1);
	                }
	            }
	        },

	        /**
	         * Clear 'onend' timeout before it ends.
	         * @param  {String} soundId  The play instance ID.
	         */
	        _clearEndTimer: function _clearEndTimer(soundId) {
	            var self = this,
	                index = -1;

	            // loop through the timers to find the one associated with this sound
	            for (var i = 0; i < self._onendTimer.length; i++) {
	                if (self._onendTimer[i].id === soundId) {
	                    index = i;
	                    break;
	                }
	            }

	            var timer = self._onendTimer[index];
	            if (timer) {
	                clearTimeout(timer.timer);
	                self._onendTimer.splice(index, 1);
	            }
	        },

	        /**
	         * Setup the gain node and panner for a Web Audio instance.
	         * @return {Object} The new audio node.
	         */
	        _setupAudioNode: function _setupAudioNode() {
	            var self = this,
	                node = self._audioNode,
	                index = self._audioNode.length;

	            // create gain node
	            node[index] = typeof ctx.createGain === 'undefined' ? ctx.createGainNode() : ctx.createGain();
	            node[index].gain.value = self._volume;
	            node[index].paused = true;
	            node[index]._pos = 0;
	            node[index].readyState = 4;
	            node[index].connect(masterGain);

	            // create the panner
	            node[index].panner = ctx.createPanner();
	            node[index].panner.panningModel = self._model || 'equalpower';
	            node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
	            node[index].panner.connect(node[index]);

	            return node[index];
	        },

	        /**
	         * Call/set custom events.
	         * @param  {String}   event Event type.
	         * @param  {Function} fn    Function to call.
	         * @return {Howl}
	         */
	        on: function on(event, fn) {
	            var self = this,
	                events = self['_on' + event];

	            if (typeof fn === 'function') {
	                events.push(fn);
	            } else {
	                for (var i = 0; i < events.length; i++) {
	                    if (fn) {
	                        events[i].call(self, fn);
	                    } else {
	                        events[i].call(self);
	                    }
	                }
	            }

	            return self;
	        },

	        /**
	         * Remove a custom event.
	         * @param  {String}   event Event type.
	         * @param  {Function} fn    Listener to remove.
	         * @return {Howl}
	         */
	        off: function off(event, fn) {
	            var self = this,
	                events = self['_on' + event];

	            if (fn) {
	                // loop through functions in the event for comparison
	                for (var i = 0; i < events.length; i++) {
	                    if (fn === events[i]) {
	                        events.splice(i, 1);
	                        break;
	                    }
	                }
	            } else {
	                self['_on' + event] = [];
	            }

	            return self;
	        },

	        /**
	         * Unload and destroy the current Howl object.
	         * This will immediately stop all play instances attached to this sound.
	         */
	        unload: function unload() {
	            var self = this;

	            // stop playing any active nodes
	            var nodes = self._audioNode;
	            for (var i = 0; i < self._audioNode.length; i++) {
	                // stop the sound if it is currently playing
	                if (!nodes[i].paused) {
	                    self.stop(nodes[i].id);
	                    self.on('end', nodes[i].id);
	                }

	                if (!self._webAudio) {
	                    // remove the source if using HTML5 Audio
	                    nodes[i].src = '';
	                } else {
	                    // disconnect the output from the master gain
	                    nodes[i].disconnect(0);
	                }
	            }

	            // make sure all timeouts are cleared
	            for (i = 0; i < self._onendTimer.length; i++) {
	                clearTimeout(self._onendTimer[i].timer);
	            }

	            // remove the reference in the global Howler object
	            var index = Howler._howls.indexOf(self);
	            if (index !== null && index >= 0) {
	                Howler._howls.splice(index, 1);
	            }

	            // delete this sound from the cache
	            delete cache[self._src];
	            self = null;
	        }

	    };

	    // only define these functions when using WebAudio
	    if (usingWebAudio) {

	        /**
	         * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
	         * @param  {Object} obj The Howl object for the sound to load.
	         * @param  {String} url The path to the sound file.
	         */
	        var loadBuffer = function loadBuffer(obj, url) {
	            // check if the buffer has already been cached
	            if (url in cache) {
	                // set the duration from the cache
	                obj._duration = cache[url].duration;

	                // load the sound into this object
	                loadSound(obj);
	                return;
	            }

	            if (/^data:[^;]+;base64,/.test(url)) {
	                // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
	                var data = atob(url.split(',')[1]);
	                var dataView = new Uint8Array(data.length);
	                for (var i = 0; i < data.length; ++i) {
	                    dataView[i] = data.charCodeAt(i);
	                }

	                decodeAudioData(dataView.buffer, obj, url);
	            } else {
	                // load the buffer from the URL
	                var xhr = new XMLHttpRequest();
	                xhr.open('GET', url, true);
	                xhr.responseType = 'arraybuffer';
	                xhr.onload = function () {
	                    decodeAudioData(xhr.response, obj, url);
	                };
	                xhr.onerror = function () {
	                    // if there is an error, switch the sound to HTML Audio
	                    if (obj._webAudio) {
	                        obj._buffer = true;
	                        obj._webAudio = false;
	                        obj._audioNode = [];
	                        delete obj._gainNode;
	                        delete cache[url];
	                        obj.load();
	                    }
	                };
	                try {
	                    xhr.send();
	                } catch (e) {
	                    xhr.onerror();
	                }
	            }
	        };

	        /**
	         * Decode audio data from an array buffer.
	         * @param  {ArrayBuffer} arraybuffer The audio data.
	         * @param  {Object} obj The Howl object for the sound to load.
	         * @param  {String} url The path to the sound file.
	         */
	        var decodeAudioData = function decodeAudioData(arraybuffer, obj, url) {
	            // decode the buffer into an audio source
	            ctx.decodeAudioData(arraybuffer, function (buffer) {
	                if (buffer) {
	                    cache[url] = buffer;
	                    loadSound(obj, buffer);
	                }
	            }, function (err) {
	                obj.on('loaderror', err);
	            });
	        };

	        /**
	         * Finishes loading the Web Audio API sound and fires the loaded event
	         * @param  {Object}  obj    The Howl object for the sound to load.
	         * @param  {Objecct} buffer The decoded buffer sound source.
	         */
	        var loadSound = function loadSound(obj, buffer) {
	            // set the duration
	            obj._duration = buffer ? buffer.duration : obj._duration;

	            // setup a sprite if none is defined
	            if ((0, _getOwnPropertyNames2.default)(obj._sprite).length === 0) {
	                obj._sprite = {
	                    _default: [0, obj._duration * 1000]
	                };
	            }

	            // fire the loaded event
	            if (!obj._loaded) {
	                obj._loaded = true;
	                obj.on('load');
	            }

	            if (obj._autoplay) {
	                obj.play();
	            }
	        };

	        /**
	         * Load the sound back into the buffer source.
	         * @param  {Object} obj   The sound to load.
	         * @param  {Array}  loop  Loop boolean, pos, and duration.
	         * @param  {String} id    (optional) The play instance ID.
	         */
	        var refreshBuffer = function refreshBuffer(obj, loop, id) {
	            // determine which node to connect to
	            var node = obj._nodeById(id);

	            // setup the buffer source for playback
	            node.bufferSource = ctx.createBufferSource();
	            node.bufferSource.buffer = cache[obj._src];
	            node.bufferSource.connect(node.panner);
	            node.bufferSource.loop = loop[0];
	            if (loop[0]) {
	                node.bufferSource.loopStart = loop[1];
	                node.bufferSource.loopEnd = loop[1] + loop[2];
	            }
	            node.bufferSource.playbackRate.value = obj._rate;
	        };
	    }

	    /**
	     * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
	     */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return {
	                Howler: Howler,
	                Howl: Howl
	            };
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }

	    /**
	     * Add support for CommonJS libraries such as browserify.
	     */
	    if (true) {
	        exports.Howler = Howler;
	        exports.Howl = Howl;
	    }

	    // define globally in case AMD is not available or available but not used

	    if (typeof window !== 'undefined') {
	        window.Howler = Howler;
	        window.Howl = Howl;
	    }
	})();

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(155);
	var $Object = __webpack_require__(8).Object;
	module.exports = function getOwnPropertyNames(it){
	  return $Object.getOwnPropertyNames(it);
	};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(82)('getOwnPropertyNames', function(){
	  return __webpack_require__(98).f;
	});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;
	exports.clear = clear;
	exports.draw = draw;
	exports.drawTileset = drawTileset;
	exports.renderMap = renderMap;
	exports.entityInSelectionRange = entityInSelectionRange;
	exports.getAnimationFrame = getAnimationFrame;
	exports.updateEntitySpriteFrame = updateEntitySpriteFrame;
	exports.renderEntities = renderEntities;
	exports.renderEntity = renderEntity;
	exports.renderShadow = renderShadow;
	exports.drawPixelText = drawPixelText;

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _grid = __webpack_require__(157);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Rendering
	 */
	function render() {
	  var _this = this;

	  this.clear();

	  this.update();

	  this.instance.logic();

	  this.draw();

	  if (_cfg.DEBUG_MODE === true) {
	    if (_cfg.DEBUG_FPS === 60) {
	      window.rAF(function () {
	        return _this.render();
	      });
	    } else {
	      setTimeout(function () {
	        return _this.render();
	      }, 1E3 / _cfg.DEBUG_FPS);
	    }
	    return void 0;
	  }

	  window.rAF(function () {
	    return _this.render();
	  });

	  return void 0;
	}

	/**
	 * Clear
	 */
	function clear() {
	  if (_cfg.RENDER_MODE === _cfg.CANVAS) {
	    this.context.clearRect(0, 0, this.width, this.height);
	  }
	  if (_cfg.RENDER_MODE === _cfg.WGL) {
	    this.glRenderer.clear();
	  }
	  return void 0;
	}

	/**
	 * Draw
	 */
	function draw() {

	  if (this.instance.currentMap === null) return void 0;

	  var gl = _cfg.RENDER_MODE === _cfg.WGL;

	  if (gl === false) {
	    this.renderEntities(1);
	    this.renderMap();
	    this.renderEntities(0);
	  } else {
	    if (this.glRenderer.ready === true) {
	      this.glRenderer.draw();
	    }
	    return void 0;
	  }

	  if (_cfg.DEBUG_MODE === true) {
	    (0, _grid.drawGrid)(this.context, this.camera.position.x, this.camera.position.y, this.width, this.height, this.dimension, this.camera.resolution * _cfg.GRID_WIDTH, .05, "#FFF", 0, 0);
	    if (_cfg.EDIT_MODE === true) {
	      this.instance.editor.renderEditorMode();
	    }
	    this.renderDebugScene();
	  }

	  if (_cfg.MINI_MAP === true) {
	    if (this.instance.mini.redraw === true) {
	      this.instance.mini.draw(0, this.instance.currentMap.entities);
	      this.context.drawImage(this.instance.mini.bgBuffer.canvas, this.instance.mini.position.x, this.instance.mini.position.y, this.instance.mini.width, this.instance.mini.height);
	    }
	  }

	  if (_cfg.TILESET_MODE === true) {
	    this.drawTileset(this.instance.currentMap.texture);
	  }

	  return void 0;
	}

	/**
	 * Draw a tileset
	 * @param {Object} texture
	 */
	function drawTileset(texture) {

	  var tileset = this.instance.editor.tileset;

	  (0, _grid.drawGrid)(this.context, texture.width, texture.height, texture.width + _cfg.DIMENSION, texture.height + _cfg.DIMENSION, _cfg.DIMENSION * 2, _cfg.GRID_WIDTH, .5, "#000", tileset.x - _cfg.DIMENSION * 2, tileset.y + -_cfg.GRID_WIDTH * 2);

	  this.context.drawImage(texture.texture.canvas, tileset.x - _cfg.DIMENSION + 2, tileset.y, texture.width, texture.height);
	}

	/**
	 * Render map
	 */
	function renderMap() {

	  var map = this.instance.currentMap;

	  var dim = _cfg.DIMENSION;

	  /** Render background layer */
	  this.context.drawImage(map.mainBuffer.canvas, 0, 0,
	  /** Scale */
	  map.size.x * 2 * dim, map.size.y * 2 * dim, this.camera.position.x << 0, this.camera.position.y << 0, map.size.x * dim * this.camera.resolution << 0, map.size.y * dim * this.camera.resolution << 0);

	  return void 0;
	}

	/**
	 * Check if entity is in selection range
	 * @param  {Number}  id
	 * @return {Boolean}
	 */
	function entityInSelectionRange(id) {

	  var ii = 0;
	  var length = 0;

	  var entities = this.instance.editor.selectedEntities;

	  length = entities.length;

	  for (; ii < length; ++ii) {
	    if (entities[ii] === id) return true;
	  };

	  return false;
	}

	/**
	 * Get animation frame
	 * @param  {Object} entity
	 * @return {Number}
	 */
	function getAnimationFrame(entity) {
	  var index = Math.floor((this.now - entity.animationStart) / entity.animationSpeed);
	  if (entity.loop === false && entity.sFrame + 1 >= entity.animationFrames) {
	    return 3 * (entity.size.x * 2) << 0;
	  }
	  return index % entity.animationFrames * (entity.size.x * 2) << 0;
	}

	/**
	 * Update a entitys sprite frame
	 * @param {Object} entity
	 */
	function updateEntitySpriteFrame(entity) {

	  if (entity.animation === true) {
	    entity.sFrame = this.getAnimationFrame(entity) / (entity.size.x * 2);
	  } else {
	    entity.sFrame = (entity.frames[entity.frame] + entity.getFrameIndex()) * (entity.size.x / entity.scale * 2) / (entity.size.x * 2) + entity.facing * entity.texture.yMul;
	  }

	  return void 0;
	}

	/**
	 * Render entities
	 * @param {Number} lowest Render entities below map
	 */
	function renderEntities(lowest) {

	  var entity = null;
	  var entities = this.instance.currentMap.entities;

	  var resolution = this.camera.resolution;

	  var camX = this.camera.position.x;
	  var camY = this.camera.position.y;

	  var ii = 0;
	  var length = entities.length;

	  var scaling = .0;

	  for (; ii < length; ++ii) {
	    entity = entities[ii];
	    if (lowest === 1) {
	      if (entity.zIndex > 0) continue;
	    } else {
	      if (entity.zIndex <= 0) continue;
	    }
	    if (entity.renderable === false) continue;
	    this.renderEntity(entity,
	    /** Position */
	    camX + (entity.position.x + entity.xMargin) * resolution << 0, camY + (entity.position.y + entity.yMargin + entity.position.z) * resolution << 0,
	    /** Size */
	    entity.size.x * resolution * entity.scaling << 0, entity.size.y * resolution * entity.scaling << 0,
	    /** Scale */
	    entity.size.x * 2 << 0, entity.size.y * 2 << 0);
	  };

	  return void 0;
	}

	/**
	 * Render a single entity
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderEntity(entity, x, y, width, height, eWidth, eHeight) {

	  var resolution = this.camera.resolution;

	  var cOpacity = entity.customOpacity();

	  if (cOpacity === true) {
	    this.context.globalAlpha = entity.opacity;
	  }

	  /** Shadow */
	  if (_cfg.DISPLAY_SHADOWS === true && entity.hasShadow === true) {
	    this.renderShadow(entity, x, y, width, height, eWidth, eHeight);
	  }

	  if (_cfg.EDIT_MODE === true) {
	    if (this.entityInSelectionRange(entity.id)) {
	      this.context.globalAlpha = .75;
	      this.context.globalCompositeOperation = "screen";
	    }
	  }

	  if (entity.type === _cfg.TYPES.Notification) {
	    this.context.drawImage(entity.texture.canvas, 0, 0,
	    /** Scale */
	    eWidth, eHeight, entity.absolute === true ? entity.position.x : x - entity.xPadding * resolution, entity.absolute === true ? entity.position.y : y - entity.yPadding * resolution, entity.absolute === true ? width / resolution : width, entity.absolute === true ? height / resolution : height);
	  } else {
	    this.context.drawImage(entity.texture.effect_sprites[entity.sFrame].canvas, 0, 0,
	    /** Scale */
	    eWidth, eHeight, x, y, width, height);
	  }

	  /** Reset ctx opacity */
	  if (cOpacity === true) {
	    this.context.globalAlpha = 1.0;
	  }

	  if (_cfg.EDIT_MODE === true) {
	    this.context.globalAlpha = 1.0;
	    this.context.globalCompositeOperation = "source-over";
	  }

	  this.context.resetTransform();

	  return void 0;
	}

	/**
	 * Render shadow
	 * @param {Object} entity
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} eWidth
	 * @param {Number} eHeight
	 */
	function renderShadow(entity, x, y, width, height, eWidth, eHeight) {

	  var resolution = this.camera.resolution;

	  this.context.drawImage(
	  /** Texture */
	  entity.shadow.texture.sprites[entity.sFrame].canvas, 0, 0,
	  /** Scale */
	  eWidth, eHeight,
	  /** Position */
	  x + entity.shadow.position.x * entity.scale * resolution << 0, y + entity.shadow.position.y * entity.scale * resolution + eHeight / 2 * entity.scale * resolution << 0,
	  /** Scretch */
	  (width + entity.shadow.scale.x * entity.scale * resolution) / _cfg.SHADOW_X << 0, (height + entity.shadow.scale.y * entity.scale * resolution) / _cfg.SHADOW_Y << 0);

	  return void 0;
	}

	/**
	 * Draw pixel based text
	 * @param {String} str
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} fontSize
	 * @param {Number} lineWidth
	 * @param {String} color
	 */
	function drawPixelText(str, x, y, fontSize, lineWidth, color) {

	  this.context.font = fontSize + "px AdvoCut";
	  this.context.strokeStyle = color;
	  this.context.lineWidth = lineWidth;
	  this.context.strokeText(str, x, y);
	  this.context.fillStyle = "white";
	  this.context.fillText(str, x, y);

	  return void 0;
	}

/***/ }),
/* 157 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drawGrid = drawGrid;
	/**
	 * Draw a grid
	 * @param {Object} ctx
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} dim
	 * @param {Number} scale
	 * @param {Number} ln
	 * @param {String} color
	 */
	function drawGrid(ctx, x, y, width, height, dim, scale, ln, color, xPad, yPad) {

	  var ww = dim * scale;
	  var hh = dim * scale;

	  var xx = x % ww;
	  var yy = y % hh;

	  ctx.beginPath();

	  for (; xx < width; xx += ww) {
	    ctx.moveTo(xx - ln + xPad, yPad);
	    ctx.lineTo(xx - ln + xPad, height + yPad);
	  };

	  for (; yy < height; yy += hh) {
	    ctx.moveTo(xPad, yy + ln + yPad);
	    ctx.lineTo(width + xPad, yy + ln + yPad);
	  };

	  ctx.strokeStyle = color;
	  ctx.lineWidth = ln;

	  ctx.stroke();

	  ctx.closePath();

	  return void 0;
	}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(159);

	var _keys2 = _interopRequireDefault(_keys);

	exports.renderDebugScene = renderDebugScene;

	var _utils = __webpack_require__(22);

	var _cfg = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Render debug scene
	 */
	function renderDebugScene() {
	  var _this = this;

	  var color = '#313131';

	  var get = function get(str) {
	    return _this.instance.getUpperCaseString(str);
	  };

	  this.drawPixelText(get("Width") + ": " + this.width + " " + get("Height") + ": " + this.height, 15, 30, 20, 1.5, color);

	  this.drawPixelText(get("Dimension") + ": " + _cfg.DIMENSION, 15, 60, 20, 1.5, color);

	  this.drawPixelText(get("X") + ": " + this.camera.x.toFixed(2) + " " + get("Y") + ": " + this.camera.y.toFixed(2), 15, 90, 20, 1.5, color);

	  this.drawPixelText(get("Delta") + ": " + this.delta * 1E3 + " " + get("MS"), 15, 120, 20, 1.5, color);

	  this.drawPixelText(get("Scale") + ": " + this.camera.resolution.toFixed(6), 15, 150, 20, 1.5, color);

	  if (this.instance.currentMap !== null) {
	    this.drawPixelText(get("Entities") + ": " + this.instance.currentMap.entities.length, 15, 180, 20, 1.5, color);
	  }

	  var ii = 0;
	  var kk = 0;

	  var length = 0;

	  if (this.instance.currentMap !== null) {

	    var entities = this.instance.currentMap.entities;

	    length = entities.length;

	    for (; ii < length; ++ii) {
	      if (this.instance.camera.isInView(entities[ii].position.x, entities[ii].position.y, entities[ii].size.x, entities[ii].size.y * 2 + entities[ii].shadowY) && ++kk) {}
	    };
	  }

	  this.drawPixelText(get("EntitiesInView") + ": " + kk, 15, 210, 20, 1.5, color);

	  this.drawPixelText(get("Textures") + ": " + (0, _keys2.default)(_utils.TextureCache).length, 15, 240, 20, 1.5);

	  if (this.instance.localEntity !== null) {
	    this.drawPixelText(get("Local") + " " + get("X") + ": " + this.instance.localEntity.x + " " + get("Y") + ": " + this.instance.localEntity.y.toFixed(2) + " " + get("Local") + " Z: " + -this.instance.localEntity.z.toFixed(4), 15, 270, 20, 1.5, color);
	  }

	  this.drawPixelText(get("CommandStack") + ": " + (this.instance.editor.commander.position + 1) + " | " + this.instance.editor.commander.stack.length, 15, 300, 20, 1.5, color);

	  this.drawPixelText(get("GodMode") + ": " + (_cfg.GOD_MODE === true ? get("Enabled") : get("Disabled")), 15, 330, 20, 1.5, color);

	  this.drawPixelText(get("FreeCamera") + ": " + (_cfg.FREE_CAMERA === true ? get("Enabled") : get("Disabled")), 15, 360, 20, 1.5, color);

	  this.drawPixelText(get("EditMode") + ": " + (_cfg.EDIT_MODE === true ? get("Enabled") : get("Disabled")), 15, 390, 20, 1.5, color);
	}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(161);
	module.exports = __webpack_require__(8).Object.keys;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(54)
	  , $keys    = __webpack_require__(38);

	__webpack_require__(82)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(22);

	var _shaders = __webpack_require__(163);

	var shaders = _interopRequireWildcard(_shaders);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * WebGL Renderer
	 * @class WGL_Renderer
	 * @export
	 */
	/** Inspired by gles.js web demo */
	var WGL_Renderer = function () {

	  /**
	   * @param {Object} instance
	   * @constructor
	   */
	  function WGL_Renderer(instance) {
	    (0, _classCallCheck3.default)(this, WGL_Renderer);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Sprite shader
	     * @type {Object}
	     */
	    this.spriteShader = null;

	    /**
	     * Shaders
	     * @type {Object}
	     */
	    this.vshader = null;
	    this.fshader = null;

	    /**
	     * Gl context ref
	     * @type {Object}
	     */
	    this.gl = instance.gl;

	    /**
	     * Sprite position buffer
	     * @type {Array}
	     */
	    this.spritepos = null;

	    /**
	     * Position buffer
	     * @type {Object}
	     */
	    this.posBuffer = null;

	    /**
	     * Rotation buffer
	     * @type {Object}
	     */
	    this.rotBuffer = null;

	    this.lightZ = 0.075;

	    this.ambientColor = new Float32Array([1.0, 1.0, 1.0, 0.8]);
	    this.lightColor = new Float32Array([1.0, 1.0, 1.0, 1.0]);
	    this.falloff = new Float32Array([0.4, 7.0, 30.0]);
	    this.lightPos = new Float32Array([0, 0, this.lightZ]);

	    this.spriteIdx = null;
	    this.spriteRot = null;

	    this.EMPTY_ARRAY = new Float32Array(0);

	    this.ready = false;
	  }

	  /**
	   * Initialise
	   */


	  (0, _createClass3.default)(WGL_Renderer, [{
	    key: "init",
	    value: function init() {

	      var gl = this.gl;

	      gl.disable(gl.DEPTH_TEST);
	      gl.disable(gl.CULL_FACE);
	      gl.disable(gl.BLEND);

	      this.buildShader();

	      this.ready = true;

	      console.log(this.gl);
	    }

	    /**
	     * Build a shader
	     */

	  }, {
	    key: "buildShader",
	    value: function buildShader() {

	      var gl = this.gl;

	      var loc = null;

	      var length = 1e3;

	      var shader = null;

	      var vshaderid = gl.createShader(gl.VERTEX_SHADER);
	      var fshaderid = gl.createShader(gl.FRAGMENT_SHADER);

	      this.compileShader(0, vshaderid, shaders.spritevs);
	      this.compileShader(1, fshaderid, shaders.spritefs);

	      shader = gl.createProgram();

	      gl.attachShader(shader, vshaderid);
	      gl.attachShader(shader, fshaderid);

	      gl.linkProgram(shader);

	      this.shader = shader;

	      this.spritePos = new Float32Array(length * 12);
	      this.spriteIdx = new Float32Array(length * 6);
	      this.spriteRot = new Float32Array(length * 6);

	      this.posBuffer = gl.createBuffer();
	      this.rotBuffer = gl.createBuffer();
	      this.idxBuffer = gl.createBuffer();

	      for (var i = 0; i < length; i++) {
	        this.spriteIdx[6 * i + 0] = 0;
	        this.spriteIdx[6 * i + 1] = 1;
	        this.spriteIdx[6 * i + 2] = 2;
	        this.spriteIdx[6 * i + 3] = 1;
	        this.spriteIdx[6 * i + 4] = 2;
	        this.spriteIdx[6 * i + 5] = 3;
	      };

	      this.setAttribute(this.shader, this.idxBuffer, "aIdx", length * 6, 1, this.spriteIdx);

	      gl.useProgram(this.shader);

	      loc = gl.getUniformLocation(this.shader, "u_normals");
	      gl.uniform1i(loc, 1);
	    }

	    /**
	     * Draw webgl based
	     */

	  }, {
	    key: "draw",
	    value: function draw() {

	      var gl = this.gl;

	      var loc = null;

	      var map = this.instance.instance.currentMap;

	      if (map.renderable === false) return void 0;

	      /** Set global size */
	      gl.uniform2f(gl.getUniformLocation(this.shader, "uScale"), this.instance.width, this.instance.height);

	      /** Set ambient color */
	      gl.uniform4fv(gl.getUniformLocation(this.shader, "AmbientColor"), this.ambientColor);

	      /** Set global resolution */
	      gl.uniform2f(gl.getUniformLocation(this.shader, "Resolution"), this.instance.camera.width, this.instance.camera.height);

	      this.updateLights();

	      this.renderEntities(1);
	      this.renderMap(map);
	      this.renderEntities(0);

	      return void 0;
	    }

	    /**
	     * Update lights
	     */

	  }, {
	    key: "updateLights",
	    value: function updateLights() {

	      var gl = this.gl;

	      var camera = this.instance.camera;
	      var resolution = this.instance.camera.resolution;

	      var light = this.instance.instance.getEntityByProperty("light183", "name");

	      var lightX = camera.position.x + (light.position.x + _cfg.DIMENSION / 2) * resolution;
	      var lightY = camera.position.y + (light.position.y + _cfg.DIMENSION / 2) * resolution;

	      this.lightPos[0] = lightX / camera.size.x;
	      this.lightPos[1] = 1.0 - lightY / camera.size.y;

	      /** Lights */
	      gl.uniform3fv(gl.getUniformLocation(this.shader, "LightPos"), this.lightPos);
	      gl.uniform3fv(gl.getUniformLocation(this.shader, "Falloff"), this.falloff);
	      gl.uniform4fv(gl.getUniformLocation(this.shader, "LightColor"), light.color);
	      gl.uniform1f(gl.getUniformLocation(this.shader, "SoftLight"), light.soft);
	      gl.uniform1f(gl.getUniformLocation(this.shader, "LightSize"), light.lightSize * resolution);
	    }

	    /**
	     * Render a map
	     * @param {Object} map
	     */

	  }, {
	    key: "renderMap",
	    value: function renderMap(map) {

	      var gl = this.gl;

	      var ii = 0;

	      var camera = this.instance.camera;

	      var x = camera.position.x;
	      var y = camera.position.y;

	      var width = map.size.x * _cfg.DIMENSION * camera.resolution << 0;
	      var height = map.size.y * _cfg.DIMENSION * camera.resolution << 0;

	      for (; ii < 6; ++ii) {
	        this.spritePos[2 * ii] = (x << 0) + width / 2 << 0;
	        this.spritePos[2 * ii + 1] = (y << 0) + height / 2 << 0;
	      };

	      gl.uniform2f(gl.getUniformLocation(this.shader, "uEntityScale"), width, height);

	      gl.activeTexture(gl.TEXTURE1);
	      gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
	      gl.activeTexture(gl.TEXTURE0);
	      gl.bindTexture(gl.TEXTURE_2D, map.glTexture[0]);
	      this.setAttribute(this.shader, this.idxBuffer, "aIdx", 6, 1, this.EMPTY_ARRAY);
	      this.setAttribute(this.shader, this.posBuffer, "aObjCen", 6, 2, this.spritePos);
	      gl.drawArrays(gl.TRIANGLES, 0, 6);
	    }

	    /**
	     * Render entities
	     * @param {Number} lowest
	     */

	  }, {
	    key: "renderEntities",
	    value: function renderEntities(lowest) {

	      var map = this.instance.instance.currentMap;

	      var entity = null;
	      var entities = map.entities;

	      var ii = 0;
	      var length = entities.length;

	      var x = 0;
	      var y = 0;

	      var width = 0;
	      var height = 0;

	      var camera = this.instance.camera;

	      var camX = camera.position.x;
	      var camY = camera.position.y;

	      var resolution = camera.resolution;

	      for (ii = 0; ii < length; ++ii) {
	        entity = entities[ii];
	        if (entity.type === _cfg.TYPES.Light) continue;
	        if (lowest === 1) {
	          if (entity.zIndex > 0) continue;
	        } else {
	          if (entity.zIndex <= 0) continue;
	        }
	        if (entity.renderable === false) continue;
	        width = entity.size.x * resolution * entity.scaling << 0;
	        height = entity.size.y * resolution * entity.scaling << 0;
	        x = camX + (entity.position.x + entity.xMargin) * resolution << 0;
	        y = camY + (entity.position.y + entity.yMargin + entity.z) * resolution << 0;
	        this.renderEntity(entity, ii, x, y, width, height);
	      };
	    }

	    /**
	     * Render a entity
	     * @param {Object} entity
	     * @param {Number} ii
	     * @param {Number} x
	     * @param {Number} y
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }, {
	    key: "renderEntity",
	    value: function renderEntity(entity, ii, x, y, width, height) {

	      var loc = null;

	      var gl = this.gl;

	      var jj = 0;

	      var resolution = this.instance.camera.resolution;

	      if (entity.type === _cfg.TYPES.Notification) {
	        x = entity.absolute === true ? entity.position.x : x - entity.xPadding * resolution;
	        y = entity.absolute === true ? entity.position.y : y - entity.yPadding * resolution;
	        width = entity.absolute === true ? width / resolution : width;
	        height = entity.absolute === true ? height / resolution : height;
	      }

	      for (jj = 0; jj < 6; ++jj) {
	        this.spritePos[12 * ii + 2 * jj] = x + width / 2;
	        this.spritePos[12 * ii + 2 * jj + 1] = y + height / 2;
	        this.spriteRot[6 * ii + jj] = entity.r;
	      };

	      this.setAttribute(this.shader, this.idxBuffer, "aIdx", 6, 1, this.EMPTY_ARRAY);
	      this.setAttribute(this.shader, this.posBuffer, "aObjCen", 6, 2, this.spritePos);
	      this.setAttribute(this.shader, this.rotBuffer, "aObjRot", 6, 1, this.spriteRot);

	      gl.uniform2f(gl.getUniformLocation(this.shader, "uEntityScale"), width, height);

	      var cOpacity = entity.customOpacity();

	      if (cOpacity === true) {
	        gl.uniform1f(gl.getUniformLocation(this.shader, "Opacity"), entity.opacity);
	      }

	      /** Normal */
	      gl.activeTexture(gl.TEXTURE1);
	      if (entity.hasNormalMap === true && entity.normal !== null) {
	        gl.bindTexture(gl.TEXTURE_2D, entity.normal[entity.sFrame]);
	      } else {
	        gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);
	      }

	      /** Diffuse */
	      gl.activeTexture(gl.TEXTURE0);
	      gl.bindTexture(gl.TEXTURE_2D, entity.glTexture[entity.sFrame]);

	      gl.drawArrays(gl.TRIANGLES, ii * 6, 6);

	      /** Reset ctx opacity */
	      if (cOpacity === true) {
	        gl.uniform1f(gl.getUniformLocation(this.shader, "Opacity"), 1.0);
	      }

	      return void 0;
	    }

	    /**
	     * Buffer a 2d texture
	     * @param  {Array} sprites
	     * @return {Array}
	     */

	  }, {
	    key: "bufferTexture",
	    value: function bufferTexture(sprites) {

	      var gl = this.gl;

	      var ii = 0;
	      var length = 0;

	      var image = null;
	      var texture = null;

	      var textures = [];

	      length = sprites.length;

	      for (; ii < length; ++ii) {
	        texture = gl.createTexture();
	        image = (0, _utils.canvasToImage)(sprites[ii].canvas);
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	        textures.push(texture);
	      };

	      return textures;
	    }

	    /**
	     * Compile a shader
	     * @param {Number} type
	     * @param {Object} shader
	     * @param {String} shader_src
	     */

	  }, {
	    key: "compileShader",
	    value: function compileShader(type, shader, shader_src) {

	      var gl = this.gl;

	      gl.shaderSource(shader, shader_src);
	      gl.compileShader(shader);

	      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        throw "shader " + type + " compile error: " + gl.getShaderInfoLog(shader);
	      }
	    }

	    /**
	     * Resize gl viewport
	     * @param {Number} width
	     * @param {Number} height
	     */

	  }, {
	    key: "resize",
	    value: function resize(width, height) {
	      this.gl.viewport(0, 0, width, height);
	      this.gl.enable(this.gl.BLEND);
	      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	    }

	    /**
	     * Clear
	     */

	  }, {
	    key: "clear",
	    value: function clear() {
	      this.gl.clearColor(0, 0, 0, 0);
	      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	      return void 0;
	    }

	    /**
	     * Gl attribute set
	     * @param {Object} program
	     * @param {Object} buffer
	     * @param {String} varname
	     * @param {Number} numitems
	     * @param {Number} itemsize
	     * @param {Array}  values
	     */

	  }, {
	    key: "setAttribute",
	    value: function setAttribute(program, buffer, varname, numitems, itemsize, values) {

	      var gl = this.gl;

	      var attribute = gl.getAttribLocation(program, varname);

	      gl.enableVertexAttribArray(attribute);
	      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	      if (values.length > 0) {
	        gl.bufferData(gl.ARRAY_BUFFER, values, gl.DYNAMIC_DRAW);
	      }

	      gl.vertexAttribPointer(attribute, itemsize, gl.FLOAT, false, 0, 0);
	    }
	  }]);
	  return WGL_Renderer;
	}();

	exports.default = WGL_Renderer;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Thanks to mattdesl for the
	 * normal mappping thingys
	 */
	var spritevs = exports.spritevs = "\n\n  precision lowp float;\n\n  uniform vec2 uScale;\n  uniform vec2 uEntityScale;\n  attribute vec2 aObjCen;\n  attribute float aObjRot;\n  attribute float aIdx;\n  varying vec2 uv;\n\n  void main(void) {\n    if (aIdx == 0.0) {\n      uv = vec2(0.0,0.0);\n    } else if (aIdx == 1.0) {\n      uv = vec2(1.0,0.0);\n    } else if (aIdx == 2.0) {\n      uv = vec2(0.0,1.0);\n    } else {\n      uv = vec2(1.0,1.0);\n    }\n    vec2 pos = vec2(\n      aObjCen.x + sin(aObjRot)*uEntityScale.y*(-0.5 + uv.y)\n      + cos(aObjRot)*uEntityScale.x*(-0.5 + uv.x),\n      aObjCen.y + cos(aObjRot)*uEntityScale.y*(-0.5 + uv.y)\n      - sin(aObjRot)*uEntityScale.x*(-0.5 + uv.x)\n    );\n    gl_Position = vec4(\n      -1.0 + 2.0*pos.x/uScale.x,\n      1.0 - 2.0*pos.y/uScale.y,\n      0.0, 1.0\n    );\n  }\n\n";

	var spritefs = exports.spritefs = "\n\n  precision lowp float;\n\n  #define STEP_A 0.4\n  #define STEP_B 0.6\n  #define STEP_C 0.8\n  #define STEP_D 1.0\n\n  uniform sampler2D u_texture0;\n  uniform sampler2D u_normals;\n\n  varying vec2 uv;\n\n  uniform vec4 AmbientColor;\n  uniform vec2 Resolution;\n\n  uniform float Opacity;\n\n  uniform float LightSize;\n  uniform bool SoftLight;\n  uniform vec3 LightPos;\n  uniform vec4 LightColor;\n  uniform vec3 Falloff;\n\n  void main() {\n\n    vec3 Sum = vec3(0.0);\n\n    vec4 DiffuseColor = texture2D(u_texture0, uv);\n\n    vec3 NormalMap = texture2D(u_normals, uv).rgb;\n\n    vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);\n\n    LightDir.x /= (LightSize / Resolution.x);\n    LightDir.y /= (LightSize / Resolution.y);\n\n    float D = length(LightDir);\n\n    vec3 N = normalize(NormalMap * 2.0 - 1.0);\n    vec3 L = normalize(LightDir);\n\n    N = mix(N, vec3(0), 0.5);\n\n    float df = max(dot(N, L), 0.0);\n\n    vec3 Diffuse = (LightColor.rgb * LightColor.a) * df;\n\n    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;\n\n    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );\n\n    if (SoftLight == false) {\n      if (Attenuation < STEP_A) Attenuation = 0.0;\n      else if (Attenuation < STEP_B) Attenuation = STEP_B;\n      else if (Attenuation < STEP_C) Attenuation = STEP_C;\n      else Attenuation = STEP_D;\n    }\n\n    vec3 Intensity = Ambient + Diffuse * Attenuation;\n    vec3 FinalColor = DiffuseColor.rgb * Intensity;\n\n    Sum += FinalColor;\n\n    if (SoftLight == false) {\n      gl_FragColor = vec4(Sum, DiffuseColor.a * Opacity);\n    } else {\n      gl_FragColor = vec4(FinalColor, DiffuseColor.a * Opacity);\n    }\n\n    if (gl_FragColor.a < 0.1) discard;\n\n  }\n\n";

	var outlinefs = exports.outlinefs = "\n\n  precision lowp float;\n\n  #define PI 3.14159265359\n  #define WIDTH 10.0\n  #define COLOR vec4(0.0,0.0,0.0,1.0)\n  #define NUM_FRAMES 6.0\n\n  uniform sampler2D u_texture0;\n\n  varying vec2 uv;\n  uniform vec2 uScale;\n  uniform vec2 uEntityScale;\n\n  void main() {\n\n    vec2 point = vec2( (WIDTH/uEntityScale.x)*cos(PI), (WIDTH/uEntityScale.y)*sin(PI));\n    point = clamp(uv + point, vec2(0.0), vec4(uEntityScale.xy, uEntityScale.xy).zw );\n    float sampledAlpha = texture2D(u_texture0,  point).a;\n    float outlineAlpha = max(0.0, sampledAlpha);\n\n    gl_FragColor = mix(vec4(0.0), COLOR, outlineAlpha);\n\n    vec4 tex0 = texture2D(u_texture0, uv);\n    gl_FragColor = mix(gl_FragColor, tex0, tex0.a);\n\n    if (gl_FragColor.a < 0.5) discard;\n\n  }\n\n";

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Keyboard = __webpack_require__(165);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _Mouse = __webpack_require__(166);

	var _Mouse2 = _interopRequireDefault(_Mouse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Input
	 * @class Input
	 * @export
	 */
	var Input = function () {

	  /**
	   * @constructor
	   */
	  function Input(events, instance) {
	    (0, _classCallCheck3.default)(this, Input);


	    this.instance = instance;

	    this.events = events;

	    this.KeyBoard = new _Keyboard2.default();
	    this.Mouse = new _Mouse2.default();

	    this.registerKeys();
	    this.registerMouse();
	    this.registerGlobal();
	  }

	  /**
	   * Register keys
	   */


	  (0, _createClass3.default)(Input, [{
	    key: "registerKeys",
	    value: function registerKeys() {

	      if (this.events.keys === void 0) return void 0;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.events.keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _context;

	          var key = _step.value;

	          this.KeyBoard.registerKey(key, (_context = this.instance.engine.controller, key.fire).bind(_context), key.leave instanceof Function ? (_context = this.instance.engine.controller, key.leave).bind(_context) : void 0);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register mouse
	     */

	  }, {
	    key: "registerMouse",
	    value: function registerMouse() {

	      if (this.events.mouse === void 0) return void 0;

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(this.events.mouse), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var ev = _step2.value;

	          this.Mouse.registerEvent(ev, this.instance.engine.controller);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register globals
	     */

	  }, {
	    key: "registerGlobal",
	    value: function registerGlobal() {

	      if (this.events.global === void 0) return void 0;

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = (0, _getIterator3.default)(this.events.global), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var ev = _step3.value;

	          this.registerGlobalEvent(ev, this.instance.engine.controller);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      ;
	    }

	    /**
	     * Register event
	     * @param {Object} event
	     */

	  }, {
	    key: "registerGlobalEvent",
	    value: function registerGlobalEvent(event) {
	      var _context2;

	      window.addEventListener(event.name, (_context2 = this.instance.engine.controller, event.fire).bind(_context2), false);
	    }
	  }]);
	  return Input;
	}();

	exports.default = Input;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(159);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Keyboard
	 * @class Keyboard
	 * @export
	 */
	var Keyboard = function () {

	  /**
	   * @param {Object} obj
	   * @constructor
	   */
	  function Keyboard(obj) {
	    (0, _classCallCheck3.default)(this, Keyboard);


	    /**
	     * Enter keycode
	     * @attribute ENTER
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.ENTER = 13;

	    /**
	     * SPACE keycode
	     * @attribute SPACE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SPACE = 32;

	    /**
	     * BACKSPACE keycode
	     * @attribute BACKSPACE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.BACKSPACE = 8;

	    /**
	     * TAB keycode
	     * @attribute TAB
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.TAB = 9;

	    /**
	     * SHIFT keycode
	     * @attribute SHIFT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SHIFT = 16;

	    /**
	     * CTRL keycode
	     * @attribute CTRL
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.CTRL = 17;

	    /**
	     * ALT keycode
	     * @attribute ALT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.ALT = 18;

	    /**
	     * PAUSE keycode
	     * @attribute PAUSE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.PAUSE = 19;

	    /**
	     * CAPSLOCK keycode
	     * @attribute CAPSLOCK
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.CAPSLOCK = 20;

	    /**
	     * ESCAPE keycode
	     * @attribute ESCAPE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.ESCAPE = 27;

	    /**
	     * PAGEUP keycode
	     * @attribute PAGEUP
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.PAGEUP = 33;

	    /**
	     * PAGEDOWN keycode
	     * @attribute PAGEDOWN
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.PAGEDOWN = 34;

	    /**
	     * END keycode
	     * @attribute END
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.END = 35;

	    /**
	     * HOME keycode
	     * @attribute HOME
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.HOME = 36;

	    /**
	     * LEFT keycode
	     * @attribute LEFT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["←"] = 37;

	    /**
	     * UP keycode
	     * @attribute UP
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["↑"] = 38;

	    /**
	     * RIGHT keycode
	     * @attribute RIGHT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["→"] = 39;

	    /**
	     * DOWN keycode
	     * @attribute DOWN
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["↓"] = 40;

	    /**
	     * INSERT keycode
	     * @attribute INSERT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.INSERT = 45;

	    /**
	     * DELETE keycode
	     * @attribute DELETE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.DELETE = 46;

	    /**
	     * 0 keycode
	     * @attribute 0
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["0"] = 48;

	    /**
	     * 1 keycode
	     * @attribute 1
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["1"] = 49;

	    /**
	     * 2 keycode
	     * @attribute 2
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["2"] = 50;

	    /**
	     * 3 keycode
	     * @attribute 3
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["3"] = 51;

	    /**
	     * 4 keycode
	     * @attribute 4
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["4"] = 52;

	    /**
	     * 5 keycode
	     * @attribute 5
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["5"] = 53;

	    /**
	     * 6 keycode
	     * @attribute 6
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["6"] = 54;

	    /**
	     * 7 keycode
	     * @attribute 7
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["7"] = 55;

	    /**
	     * 8 keycode
	     * @attribute 8
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["8"] = 56;

	    /**
	     * 9 keycode
	     * @attribute 9
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this["9"] = 57;

	    /**
	     * A keycode
	     * @attribute A
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.A = 65;

	    /**
	     * B keycode
	     * @attribute B
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.B = 66;

	    /**
	     * C keycode
	     * @attribute C
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.C = 67;

	    /**
	     * D keycode
	     * @attribute D
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.D = 68;

	    /**
	     * E keycode
	     * @attribute E
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.E = 69;

	    /**
	     * F keycode
	     * @attribute F
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F = 70;

	    /**
	     * G keycode
	     * @attribute G
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.G = 71;

	    /**
	     * H keycode
	     * @attribute H
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.H = 72;

	    /**
	     * I keycode
	     * @attribute I
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.I = 73;

	    /**
	     * J keycode
	     * @attribute J
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.J = 74;

	    /**
	     * K keycode
	     * @attribute K
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.K = 75;

	    /**
	     * L keycode
	     * @attribute L
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.L = 76;

	    /**
	     * M keycode
	     * @attribute M
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.M = 77;

	    /**
	     * N keycode
	     * @attribute N
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.N = 78;

	    /**
	     * O keycode
	     * @attribute O
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.O = 79;

	    /**
	     * P keycode
	     * @attribute P
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.P = 80;

	    /**
	     * Q keycode
	     * @attribute Q
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.Q = 81;

	    /**
	     * R keycode
	     * @attribute R
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.R = 82;

	    /**
	     * S keycode
	     * @attribute S
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.S = 83;

	    /**
	     * T keycode
	     * @attribute T
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.T = 84;

	    /**
	     * U keycode
	     * @attribute U
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.U = 85;

	    /**
	     * V keycode
	     * @attribute V
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.V = 86;

	    /**
	     * W keycode
	     * @attribute W
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.W = 87;

	    /**
	     * X keycode
	     * @attribute X
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.X = 88;

	    /**
	     * Y keycode
	     * @attribute Y
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.Y = 89;

	    /**
	     * Z keycode
	     * @attribute Z
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.Z = 90;

	    /**
	     * SELECT keycode
	     * @attribute SELECT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SELECT = 93;

	    /**
	     * NUMPAD0 keycode
	     * @attribute NUMPAD0
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD0 = 96;

	    /**
	     * NUMPAD1 keycode
	     * @attribute NUMPAD1
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD1 = 97;

	    /**
	     * NUMPAD2 keycode
	     * @attribute NUMPAD2
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD2 = 98;

	    /**
	     * NUMPAD3 keycode
	     * @attribute NUMPAD3
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD3 = 99;

	    /**
	     * NUMPAD4 keycode
	     * @attribute NUMPAD4
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD4 = 100;

	    /**
	     * NUMPAD5 keycode
	     * @attribute NUMPAD5
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD5 = 101;

	    /**
	     * NUMPAD6 keycode
	     * @attribute NUMPAD6
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD6 = 102;

	    /**
	     * NUMPAD7 keycode
	     * @attribute NUMPAD7
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD7 = 103;

	    /**
	     * NUMPAD8 keycode
	     * @attribute NUMPAD8
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD8 = 104;

	    /**
	     * NUMPAD9 keycode
	     * @attribute NUMPAD9
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMPAD9 = 105;

	    /**
	     * MULTIPLY keycode
	     * @attribute MULTIPLY
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.MULTIPLY = 106;

	    /**
	     * ADD keycode
	     * @attribute ADD
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.ADD = 107;

	    /**
	     * SUBTRACT keycode
	     * @attribute SUBTRACT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SUBTRACT = 109;

	    /**
	     * DECIMALPOINT keycode
	     * @attribute DECIMALPOINT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.DECIMALPOINT = 110;

	    /**
	     * DIVIDE keycode
	     * @attribute DIVIDE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.DIVIDE = 111;

	    /**
	     * F1 keycode
	     * @attribute F1
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F1 = 112;

	    /**
	     * F2 keycode
	     * @attribute F2
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F2 = 113;

	    /**
	     * F3 keycode
	     * @attribute F3
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F3 = 114;

	    /**
	     * F4 keycode
	     * @attribute F4
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F4 = 115;

	    /**
	     * F5 keycode
	     * @attribute F5
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F5 = 116;

	    /**
	     * F6 keycode
	     * @attribute F6
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F6 = 117;

	    /**
	     * F7 keycode
	     * @attribute F7
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F7 = 118;

	    /**
	     * F8 keycode
	     * @attribute F8
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F8 = 119;

	    /**
	     * F9 keycode
	     * @attribute F9
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F9 = 120;

	    /**
	     * F10 keycode
	     * @attribute F10
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F10 = 121;

	    /**
	     * F11 keycode
	     * @attribute F11
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F11 = 122;

	    /**
	     * F12 keycode
	     * @attribute F12
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.F12 = 123;

	    /**
	     * NUMLOCK keycode
	     * @attribute NUMLOCK
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.NUMLOCK = 144;

	    /**
	     * SCROLLLOCK keycode
	     * @attribute SCROLLLOCK
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SCROLLLOCK = 145;

	    /**
	     * SEMICOLON keycode
	     * @attribute SEMICOLON
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SEMICOLON = 186;

	    /**
	     * EQUALSIGN keycode
	     * @attribute EQUALSIGN
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.EQUALSIGN = 187;

	    /**
	     * COMMA keycode
	     * @attribute COMMA
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.COMMA = 188;

	    /**
	     * DASH keycode
	     * @attribute DASH
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.DASH = 189;

	    /**
	     * PERIOD keycode
	     * @attribute PERIOD
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.PERIOD = 190;

	    /**
	     * FORWARDSLASH keycode
	     * @attribute FORWARDSLASH
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.FORWARDSLASH = 191;

	    /**
	     * GRAVEACCENT keycode
	     * @attribute GRAVEACCENT
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.GRAVEACCENT = 192;

	    /**
	     * OPENBRACKET keycode
	     * @attribute OPENBRACKET
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.OPENBRACKET = 219;

	    /**
	     * BACKSLASH keycode
	     * @attribute BACKSLASH
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.BACKSLASH = 220;

	    /**
	     * CLOSEBRACKET keycode
	     * @attribute CLOSEBRACKET
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.CLOSEBRACKET = 221;

	    /**
	     * SINGLEQUOTE keycode
	     * @attribute SINGLEQUOTE
	     * @type {Number}
	     * @static
	     * @final
	     */
	    this.SINGLEQUOTE = 222;

	    /**
	     * Registered keys
	     * @attribute KEYS
	     * @type {Object}
	     */
	    this.KEYS = {};

	    /**
	     * Registered key combos
	     * @attribute COMBOS
	     * @type {Object}
	     */
	    this.COMBOS = {};

	    /**
	     * Hash table
	     * @type {Array}
	     */
	    this.hashes = [];

	    /** Keyboard hash */
	    this.hash = (0, _utils.uHash)();

	    /** Keyboard fresh rate */
	    this.rate = 60;

	    this.init(obj);

	    return this;
	  }

	  /**
	   * Initialise
	   * @param {Object} obj
	   */


	  (0, _createClass3.default)(Keyboard, [{
	    key: "init",
	    value: function init(obj) {

	      /** Register passed in keys */
	      if (obj instanceof Object && (0, _keys2.default)(obj).length > 0) {
	        /** Keyboard fresh rate */
	        this.rate = obj.rate || 60;
	        for (var key in obj) {
	          if (key.toUpperCase() === key && key !== "rate" && key !== "hash") {
	            this.registerKey(key, obj[key]);
	          }
	        };
	      }

	      this.loop();

	      this.fireKeys();

	      window.addEventListener('keydown', function (e) {
	        this.switchKey(this.hash, e.keyCode, 1, e);
	      }.bind(this));

	      window.addEventListener('keyup', function (e) {
	        this.switchKey(this.hash, e.keyCode, 0, e);
	      }.bind(this));
	    }

	    /**
	     * Key loop
	     */

	  }, {
	    key: "loop",
	    value: function loop() {
	      var _this = this;

	      this.fireKeys();

	      setTimeout(function () {
	        return _this.loop();
	      }, this.rate);
	    }

	    /**
	     * Fire a combo
	     * @param {Object} combo
	     */

	  }, {
	    key: "fireCombo",
	    value: function fireCombo(combo, name, state, event) {
	      this.COMBOS[name].state = state;
	      combo.state = 0;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(combo.combo), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var key = _step.value;

	          if (this.COMBOS[key].state !== 1) return void 0;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	      combo.state = 1;
	    }

	    /**
	     * Switch fire key
	     * @param {Number} hash
	     * @param {Number} name
	     * @param {Number} state
	     * @param {Object} event
	     */

	  }, {
	    key: "switchKey",
	    value: function switchKey(hash, name, state, event) {

	      var key = String(name);

	      if (this.isComboKey(name) === true) {
	        var combo = this.COMBOS[name].parent;
	        this.COMBOS[key].state = state;
	        this.updateKey(combo, state);
	        this.fireCombo(combo, name, state, event);
	      }

	      if (this.hash !== hash || this.validKey(key) === false || state > 1 || state < 0) {
	        return void 0;
	      }

	      this.updateKey(this.KEYS[key], state);

	      event.preventDefault();

	      return void 0;
	    }

	    /**
	     * Update a key
	     * @param {Object} key
	     * @param {Number} state
	     */

	  }, {
	    key: "updateKey",
	    value: function updateKey(key, state) {

	      key.state = state;

	      if (state === 0) {
	        key.left = 1;
	      }
	      if (key.spam === false) {
	        if (state === 0) {
	          key.fireable = true;
	        }
	      }
	    }

	    /**
	     * Registered key is valid
	     * @param {Number} name
	     * @return {Boolean}
	     */

	  }, {
	    key: "validKey",
	    value: function validKey(name) {

	      var key = String(name);

	      return this.KEYS[key] instanceof Object && this.KEYS[key].fire instanceof Function && this.KEYS[key].state <= 1 && this.KEYS[key].state >= 0;
	    }

	    /**
	     * Validate a key code
	     * @param  {String} code
	     * @return {Boolean}
	     */

	  }, {
	    key: "validCode",
	    value: function validCode(code) {
	      var key = code;
	      if ((code = this[key] || -1) === -1 || this.KEYS[key] !== void 0) {
	        throw new Error(key + " is a invalid key!");
	        return false;
	      }
	      return true;
	    }

	    /**
	     * Register key combo
	     * @param {Object}   obj
	     * @param {Function} fire
	     * @param {Function} leave
	     */

	  }, {
	    key: "registerKeyCombo",
	    value: function registerKeyCombo(obj, fire, leave) {

	      var key = String(obj.name);

	      var combo = key.split("+");

	      var codes = [];

	      this.COMBOS[key] = {};

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(combo), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var code = _step2.value;

	          if (this.validCode(code) === false) {
	            return void 0;
	          }
	          codes.push(this[code]);
	          this.COMBOS[this[code]] = {
	            parent: this.COMBOS[key],
	            name: code,
	            fire: fire,
	            leave: leave,
	            left: 0,
	            state: 0,
	            fireable: true,
	            spam: obj.spam
	          };
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      ;

	      this.COMBOS[key].combo = codes;
	      this.COMBOS[key].fire = fire;
	      this.COMBOS[key].leave = leave;
	      this.COMBOS[key].left = 0;
	      this.COMBOS[key].state = 0;
	      this.COMBOS[key].fireable = true;
	      this.COMBOS[key].spam = obj.spam;
	    }

	    /**
	     * Register a key
	     * @param {Object}   obj
	     * @param {Function} fire
	     * @param {Function} leave
	     */

	  }, {
	    key: "registerKey",
	    value: function registerKey(obj, fire, leave) {

	      var key = String(obj.name);

	      var isCombo = key.split("+").length > 1;

	      var code = null;

	      if (isCombo === true) {
	        this.registerKeyCombo(obj, fire, leave);
	        return void 0;
	      }

	      if (this.validCode(key) === false) return void 0;

	      this.KEYS[this[key]] = {
	        name: obj.name,
	        fire: fire,
	        leave: leave,
	        left: 0,
	        state: 0,
	        fireable: true,
	        spam: obj.spam
	      };

	      return void 0;
	    }

	    /**
	     * Fire registered keys
	     */

	  }, {
	    key: "fireKeys",
	    value: function fireKeys() {

	      var key = null;

	      for (key in this.KEYS) {
	        if (this.validKey(key) === true) {
	          if (this.isComboKey(key) === true) {
	            var combo = this.COMBOS[key].parent;
	            if (combo.simultaneous !== false && combo.state === 0) {
	              this.fireKey(this.hash, this.KEYS[key]);
	            }
	          } else {
	            this.fireKey(this.hash, this.KEYS[key]);
	          }
	        }
	      };

	      for (key in this.COMBOS) {
	        if (this.COMBOS[key].parent === void 0) {
	          this.fireKey(this.hash, this.COMBOS[key]);
	        }
	      };

	      return void 0;
	    }

	    /**
	     * Key is a combo key
	     * @param  {String} key
	     * @return {Boolean}
	     */

	  }, {
	    key: "isComboKey",
	    value: function isComboKey(key) {
	      return this.COMBOS[key] !== void 0 && this.COMBOS[key] instanceof Object === true;
	    }

	    /**
	     * Fire a single key
	     * @param {Number} hash
	     * @param {Object} key
	     */

	  }, {
	    key: "fireKey",
	    value: function fireKey(hash, key) {

	      if (key.state === 1) {
	        if (key.fireable === true) {
	          key.fire();
	          if (key.spam !== void 0) {
	            key.fireable = false;
	          }
	        }
	      } else {
	        if (key.leave !== void 0 && key.state === 0 && key.left === 1) {
	          key.leave();
	          key.left = 0;
	        }
	      }

	      return void 0;
	    }

	    /**
	     * Check if a key is pressed
	     * @param {String|Number} key
	     * @return {Boolean}
	     */

	  }, {
	    key: "isKeyPressed",
	    value: function isKeyPressed(key) {
	      var isString = typeof key === "string";
	      if (isString === true) {
	        if (this[key] !== void 0) {
	          return this.KEYS[this[key]] !== void 0 && this.KEYS[this[key]].state === 1;
	        }
	        return false;
	      }
	      return this.KEYS[key] !== void 0 && this.KEYS[key].state === 1;
	    }
	  }]);
	  return Keyboard;
	}();

	exports.default = Keyboard;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(76);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Mouse
	 * @class Mouse
	 * @export
	 */
	var Mouse = function () {

	  /**
	   * @constructor
	   * @param {Array} events
	   */
	  function Mouse(events) {
	    (0, _classCallCheck3.default)(this, Mouse);


	    return this;
	  }

	  /**
	   * Register a mouse event
	   * @param {Object} event
	   */


	  (0, _createClass3.default)(Mouse, [{
	    key: "registerEvent",
	    value: function registerEvent(event, root) {

	      var fire = null;

	      var events = event.name.split("|");

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(events), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var ev = _step.value;

	          if (ev === "mousewheel") {
	            window.addWheelListener(document.body, function (e) {
	              return event.fire.call(root, e);
	            });
	          } else {
	            window.addEventListener(ev, function (e) {
	              return event.fire.call(root, e);
	            }, false);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      ;
	    }
	  }]);
	  return Mouse;
	}();

	exports.default = Mouse;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(168);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Packets = __webpack_require__(173);

	var Packet = _interopRequireWildcard(_Packets);

	var _cfg = __webpack_require__(21);

	var cfg = _interopRequireWildcard(_cfg);

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Connection
	 * @class Connection
	 * @export
	 */
	var Connection = function () {

	  /**
	   * @constructor
	   * @param {Object} instance
	   * @param {String} url
	   */
	  function Connection(instance, url) {
	    (0, _classCallCheck3.default)(this, Connection);


	    /**
	     * Instance ref
	     * @type {Object}
	     */
	    this.instance = instance;

	    /**
	     * Websocket instance
	     * @type {Object}
	     */
	    this.ws = null;

	    /**
	     * Opening state
	     * @type {Boolean}
	     */
	    this.open = false;

	    this.init(url);
	  }

	  /**
	   * Initialise a ws connection
	   * @param {String} url
	   */


	  (0, _createClass3.default)(Connection, [{
	    key: "init",
	    value: function init(url) {

	      this.open = true;

	      this.ws = new window.WebSocket("ws://" + url);

	      this.ws.binaryType = "arraybuffer";

	      this.ws.addEventListener('open', this.onOpen.bind(this));
	      this.ws.addEventListener('close', this.onClose.bind(this));
	      this.ws.addEventListener('error', this.onError.bind(this));
	      this.ws.addEventListener('message', this.onMessage.bind(this));
	    }

	    /**
	     * On open
	     * @param {Object} e
	     */

	  }, {
	    key: "onOpen",
	    value: function onOpen(e) {

	      console.log("Socket Open!");

	      this.sendUserData();
	    }

	    /**
	     * On close
	     * @param {Object} e
	     */

	  }, {
	    key: "onClose",
	    value: function onClose(e) {
	      console.log(e);
	    }

	    /**
	     * On error
	     * @param {Object} e
	     */

	  }, {
	    key: "onError",
	    value: function onError(e) {
	      console.log("Socket closed!");
	    }

	    /**
	     * On message
	     * @param {Object} e
	     */

	  }, {
	    key: "onMessage",
	    value: function onMessage(e) {
	      /*let delta = this.instance.engine.renderer.delta * 1e3;
	      setTimeout(this::function() {
	        this.handleMessage(new DataView(e.data));
	      }, delta);*/
	      this.handleMessage(new DataView(e.data));
	    }

	    /**
	     * Handle a message
	     * @param {Object} msg
	     */

	  }, {
	    key: "handleMessage",
	    value: function handleMessage(msg) {

	      var offset = 0;

	      var key = msg.getUint8(offset++);

	      function getString() {
	        var text = "";
	        var char = 0;
	        while ((char = msg.getUint16(offset, true)) !== 0) {
	          offset += 2;
	          text += String.fromCharCode(char);
	        };
	        offset += 2;
	        return text;
	      }

	      if (key === 0) {
	        var data = this.getString(msg);
	        console.log(data);
	      }

	      /** User joined map */
	      if (key === 22) {
	        offset += 4;
	        offset += 4;
	        var _data = JSON.parse(getString());
	        var player = this.instance.entities.Player;
	        var entity = new player(_data);
	        entity.instance = this.instance.engine;
	        this.instance.engine.addEntity(entity);
	        if (entity.isLocalPlayer === true) {
	          this.instance.engine.localEntity = entity;
	          this.instance.engine.camera.focus(entity, false);
	        }
	      }

	      /** Nerby players */
	      if (key === 40) {
	        offset += 4;
	        offset += 4;
	        var _data2 = JSON.parse(getString());
	        for (var _key in _data2) {
	          this.instance.engine.addEntity(new this.instance.entities.Player(_data2[_key]));
	        };
	      }

	      /** Jumping */
	      if (key === 30) {
	        offset += 4;
	        offset += 4;
	        var _data3 = JSON.parse(getString());
	        var _entity = this.instance.engine.getEntityByProperty(_data3.name, "name");
	        _entity.jump();
	      }

	      /** Facing */
	      if (key === 31) {
	        offset += 4;
	        offset += 4;
	        var _data4 = JSON.parse(getString());
	        var _entity2 = this.instance.engine.getEntityByProperty(_data4.name, "name");
	        _entity2.changeFacing(_data4.dir);
	      }

	      /** Movement */
	      if (key === 32) {
	        offset += 4;
	        offset += 4;
	        var _data5 = JSON.parse(getString());
	        var _entity3 = this.instance.engine.getEntityByProperty(_data5.name, "name");
	        var position = _Math2.default.getTilePosition(_data5.x, _data5.y, _data5.dir);
	        var obstacle = _utils.Maps[_entity3.map].isEntityCollidable(_entity3, position.x, position.y) === true;
	        _entity3.onlineMove(position.x, position.y, position.facing);
	      }

	      /** Velocity */
	      if (key === 33) {
	        offset += 4;
	        offset += 4;
	        var _data6 = JSON.parse(getString());
	        var _entity4 = this.instance.engine.getEntityByProperty(_data6.name, "name");
	        _entity4.velocity = _data6.velocity;
	      }

	      /** Kill */
	      if (key === 34) {
	        offset += 4;
	        offset += 4;
	        var _data7 = JSON.parse(getString());
	        var _entity5 = this.instance.engine.getEntityByProperty(_data7.name, "name");
	        _entity5.fadeOut(1, true);
	      }

	      return void 0;
	    }

	    /**
	     * Prepare data to send
	     * @param  {Number} length
	     * @return {Object}
	     */

	  }, {
	    key: "prepareData",
	    value: function prepareData(length) {
	      return new DataView(new ArrayBuffer(length));
	    }

	    /**
	     * Send data
	     * @param {Object} a
	     */

	  }, {
	    key: "send",
	    value: function send(a) {
	      this.ws.send(a.buffer);
	      return void 0;
	    }

	    /**
	     * Send user data
	     */

	  }, {
	    key: "sendUserData",
	    value: function sendUserData() {

	      if (this.open === false) return void 0;

	      var name = cfg.LOCAL_PLAYER;

	      var msg = this.prepareData(1 + 2 * name.length);

	      msg.setUint8(0, 0);

	      for (var ii = 0; ii < name.length; ++ii) {
	        msg.setUint16(1 + 2 * ii, name.charCodeAt(ii), true);
	      };

	      this.send(msg);
	    }

	    /**
	     * Sto buffer
	     * @param {Array} message
	     * @return {Object}
	     */

	  }, {
	    key: "stobuf",
	    value: function stobuf(buffer) {

	      var ii = 0;
	      var length = buffer.length;
	      var arrayBuffer = new ArrayBuffer(length);
	      var view = new Uint8Array(arrayBuffer);

	      for (; ii < length; ++ii) {
	        view[ii] = buffer[ii];
	      };

	      return view.buffer;
	    }

	    /**
	     * Send data
	     * @param {String} type
	     * @param {Array}  data
	     */

	  }, {
	    key: "sendData",
	    value: function sendData(type, data) {

	      var pClass = Packet[type];

	      if (pClass === void 0 || pClass === null) return void 0;

	      var packet = new (Function.prototype.bind.apply(pClass, [null].concat((0, _toConsumableArray3.default)(data))))();

	      this.send(packet);
	    }
	  }, {
	    key: "getString",
	    value: function getString(view) {

	      if ((view.byteLength + 1) % 2 === 1) {
	        return void 0;
	      }

	      var txt = "";
	      var maxLen = 32 * 2;
	      for (var i = 1; i < view.byteLength && i <= maxLen; i += 2) {
	        var charCode = view.getUint16(i, true);
	        if (charCode == 0) {
	          return void 0;
	        }
	        txt += String.fromCharCode(charCode);
	      }
	      return txt;
	    }
	  }]);
	  return Connection;
	}();

	exports.default = Connection;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(169);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(26);
	__webpack_require__(171);
	module.exports = __webpack_require__(8).Array.from;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(9)
	  , $export        = __webpack_require__(6)
	  , toObject       = __webpack_require__(54)
	  , call           = __webpack_require__(63)
	  , isArrayIter    = __webpack_require__(64)
	  , toLength       = __webpack_require__(44)
	  , createProperty = __webpack_require__(172)
	  , getIterFn      = __webpack_require__(65);

	$export($export.S + $export.F * !__webpack_require__(72)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(12)
	  , createDesc      = __webpack_require__(20);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Facing = __webpack_require__(174);

	Object.defineProperty(exports, "Facing", {
	  enumerable: true,
	  get: function get() {
	    return _Facing.Facing;
	  }
	});

	var _Jumping = __webpack_require__(175);

	Object.defineProperty(exports, "Jumping", {
	  enumerable: true,
	  get: function get() {
	    return _Jumping.Jumping;
	  }
	});

	var _Position = __webpack_require__(176);

	Object.defineProperty(exports, "Position", {
	  enumerable: true,
	  get: function get() {
	    return _Position.Position;
	  }
	});

	var _Velocity = __webpack_require__(177);

	Object.defineProperty(exports, "Velocity", {
	  enumerable: true,
	  get: function get() {
	    return _Velocity.Velocity;
	  }
	});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Facing = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Facing packet
	 * @class Facing
	 * @export
	 */
	var Facing = exports.Facing = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} dir
	   * @return {Object}
	   * @constructor
	   */
	  function Facing(id, dir) {
	    (0, _classCallCheck3.default)(this, Facing);


	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Direction
	     * @type {Number}
	     */
	    this.dir = dir;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Facing, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(5);
	      var view = new DataView(buffer);

	      view.setUint8(0, 31, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.dir, true);

	      return view;
	    }
	  }]);
	  return Facing;
	}();

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Jumping = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Jumping packet
	 * @class Jumping
	 * @export
	 */
	var Jumping = exports.Jumping = function () {

	  /**
	   * @param  {Number} id
	   * @return {Object}
	   * @constructor
	   */
	  function Jumping(id) {
	    (0, _classCallCheck3.default)(this, Jumping);


	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Jumping, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(3);
	      var view = new DataView(buffer);

	      view.setUint8(0, 30, true);
	      view.setUint16(1, this.id, true);

	      return view;
	    }
	  }]);
	  return Jumping;
	}();

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Position = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Position packet
	 * @class Position
	 * @export
	 */
	var Position = exports.Position = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} dir
	   * @param  {Number} x
	   * @param  {Number} y
	   * @return {Object}
	   * @constructor
	   */
	  function Position(id, dir, x, y) {
	    (0, _classCallCheck3.default)(this, Position);


	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Direction
	     * @type {Number}
	     */
	    this.dir = dir;

	    /**
	     * X
	     * @type {Number}
	     */
	    this.x = x;

	    /**
	     * Y
	     * @type {Number}
	     */
	    this.y = y;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Position, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(9);
	      var view = new DataView(buffer);

	      view.setUint8(0, 32, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.dir, true);
	      view.setUint16(5, this.x, true);
	      view.setUint16(7, this.y, true);

	      return view;
	    }
	  }]);
	  return Position;
	}();

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Velocity = undefined;

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Velocity packet
	 * @class Velocity
	 * @export
	 */
	var Velocity = exports.Velocity = function () {

	  /**
	   * @param  {Number} id
	   * @param  {Number} velocity
	   * @return {Object}
	   * @constructor
	   */
	  function Velocity(id, velocity) {
	    (0, _classCallCheck3.default)(this, Velocity);


	    /**
	     * Entity id
	     * @type {Number}
	     */
	    this.id = id;

	    /**
	     * Velocity
	     * @type {Number}
	     */
	    this.velocity = velocity;

	    return this.encode();
	  }

	  /**
	   * Encode process
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Velocity, [{
	    key: "encode",
	    value: function encode() {

	      var buffer = new ArrayBuffer(5);
	      var view = new DataView(buffer);

	      view.setUint8(0, 33, true);
	      view.setUint16(1, this.id, true);
	      view.setUint16(3, this.velocity, true);

	      return view;
	    }
	  }]);
	  return Velocity;
	}();

/***/ }),
/* 178 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var keys = exports.keys = [{
	  name: "SHIFT",
	  fire: function fire() {},
	  leave: function leave() {
	    this.action("SHIFT");
	  }
	}, {
	  name: "CTRL+Z",
	  simultaneous: false,
	  fire: function fire() {
	    this.action("CTRL+Z");
	  }
	}, {
	  name: "CTRL+Y",
	  simultaneous: false,
	  fire: function fire() {
	    this.action("CTRL+Y");
	  }
	}, {
	  name: "CTRL+C",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    this.action("CTRL+C");
	  }
	}, {
	  name: "CTRL+V",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    this.action("CTRL+V");
	  }
	}, {
	  name: "CTRL+X",
	  spam: false,
	  simultaneous: false,
	  fire: function fire() {
	    this.action("CTRL+X");
	  }
	}, {
	  name: "DELETE",
	  fire: function fire() {
	    this.action("DELETE");
	  }
	}, {
	  name: "F1",
	  spam: false,
	  fire: function fire() {
	    this.action("F1");
	  }
	}, {
	  name: "F2",
	  spam: false,
	  fire: function fire() {
	    this.action("F2");
	  }
	}, {
	  name: "F3",
	  spam: false,
	  fire: function fire() {
	    this.action("F3");
	  }
	}, {
	  name: "F4",
	  spam: false,
	  fire: function fire() {
	    this.action("F4");
	  }
	}, {
	  name: "F6",
	  spam: false,
	  fire: function fire() {
	    this.action("F6");
	  }
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "Y",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "G",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "V",
	  fire: function fire() {}
	},
	/** BUGGY, KEY COMBOS DONT WORK WITHOUT THIS */
	{
	  name: "CTRL",
	  fire: function fire() {}
	}, {
	  name: "ESCAPE",
	  spam: false,
	  fire: function fire() {
	    this.action("ESCAPE");
	  }
	}, {
	  name: "B",
	  spam: false,
	  fire: function fire() {
	    this.action("B");
	  }
	}, {
	  name: "Z",
	  spam: false,
	  fire: function fire() {
	    this.action("Z");
	  }
	}, {
	  name: "X",
	  spam: false,
	  fire: function fire() {
	    this.action("X_FIRE");
	  },
	  leave: function leave() {
	    this.action("X_LEAVE");
	  }
	}, {
	  name: "C",
	  spam: false,
	  fire: function fire() {
	    this.action("C");
	  }
	}, {
	  name: "←",
	  fire: function fire() {
	    this.action("←");
	  }
	}, {
	  name: "→",
	  fire: function fire() {
	    this.action("→");
	  }
	}, {
	  name: "↑",
	  fire: function fire() {
	    this.action("↑");
	  }
	}, {
	  name: "↓",
	  fire: function fire() {
	    this.action("↓");
	  }
	}, {
	  name: "SPACE",
	  fire: function fire() {
	    this.action("SPACE");
	  }
	}];

	var mouse = exports.mouse = [{
	  name: "dblclick",
	  fire: function fire(e) {
	    this.action("DBLCLICK", [e]);
	  }
	}, {
	  name: "mousedown|touchstart",
	  fire: function fire(e) {
	    this.action("LEFTCLICK", [e]);
	  }
	}, {
	  name: "contextmenu",
	  fire: function fire(e) {
	    this.action("RIGHTCLICK", [e]);
	  }
	}, {
	  name: "mouseup|touchend",
	  fire: function fire(e) {
	    this.action("MOUSEUP", [e]);
	  }
	}, {
	  name: "mousemove|touchmove",
	  fire: function fire(e) {
	    this.action("MOUSEMOVE", [e]);
	  }
	}, {
	  name: "mousewheel",
	  fire: function fire(e) {
	    this.action("MOUSEWHEEL", [e]);
	  }
	}];

	var global = exports.global = [{
	  name: "resize",
	  fire: function fire(e) {
	    this.action("RESIZE");
	  }
	}];

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Light = __webpack_require__(180);

	Object.defineProperty(exports, "Light", {
	  enumerable: true,
	  get: function get() {
	    return _Light.Light;
	  }
	});

	var _Player = __webpack_require__(181);

	Object.defineProperty(exports, "Player", {
	  enumerable: true,
	  get: function get() {
	    return _Player.Player;
	  }
	});

	var _Monster = __webpack_require__(187);

	Object.defineProperty(exports, "Monster", {
	  enumerable: true,
	  get: function get() {
	    return _Monster.Monster;
	  }
	});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Light = undefined;

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _cfg = __webpack_require__(21);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _utils = __webpack_require__(22);

	var _MapEntity2 = __webpack_require__(120);

	var _MapEntity3 = _interopRequireDefault(_MapEntity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Light = exports.Light = function (_MapEntity) {
	  (0, _inherits3.default)(Light, _MapEntity);

	  /**
	   * @constructor
	   * @param {Object} obj
	   */
	  function Light(obj) {
	    (0, _classCallCheck3.default)(this, Light);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Light.__proto__ || (0, _getPrototypeOf2.default)(Light)).call(this, obj));

	    _this.scale = .25;

	    _this.name = "light" + _this.id;

	    _this.zIndex = 999999;

	    _this.isLight = true;

	    _this.lightSize = obj.lightSize === void 0 ? 512 : obj.lightSize;

	    _this.jumpable = false;

	    _this.hasShadow = false;

	    _this.lightSize = obj.lightSize === void 0 ? 256 : obj.lightSize;

	    _this.soft = obj.soft === void 0 ? true : obj.soft;

	    _this.color = _this.processColor(obj.color);

	    _this.type = _cfg.TYPES.Light;

	    return _this;
	  }

	  /**
	   * Process hex color
	   * @param  {String} color
	   * @return {Array}
	   */


	  (0, _createClass3.default)(Light, [{
	    key: "processColor",
	    value: function processColor(color) {
	      var cString = color[0] === "#" ? color.substr(1) : color;
	      return _Math2.default.hexToRGB(cString);
	    }
	  }]);
	  return Light;
	}(_MapEntity3.default);

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Player = undefined;

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _Entity2 = __webpack_require__(121);

	var _Entity3 = _interopRequireDefault(_Entity2);

	var _jump = __webpack_require__(182);

	var jump = _interopRequireWildcard(_jump);

	var _walk = __webpack_require__(183);

	var walk = _interopRequireWildcard(_walk);

	var _face = __webpack_require__(184);

	var face = _interopRequireWildcard(_face);

	var _sound = __webpack_require__(185);

	var sound = _interopRequireWildcard(_sound);

	var _follow = __webpack_require__(186);

	var follow = _interopRequireWildcard(_follow);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Player = exports.Player = function (_Entity) {
	  (0, _inherits3.default)(Player, _Entity);

	  /**
	   * @constructor
	   * @param {Object} obj
	   */
	  function Player(obj) {
	    (0, _classCallCheck3.default)(this, Player);

	    /**
	     * Local entity requires instance ref
	     * @type {Object}
	     */
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Player.__proto__ || (0, _getPrototypeOf2.default)(Player)).call(this, obj));

	    _this.instance = null;

	    /**
	     * Gravity
	     * @type {Number}
	     */
	    _this.gravity = _cfg.GRAVITY;

	    /**
	     * Player facing
	     * @type {Number}
	     */
	    _this.facing = obj.facing !== void 0 ? obj.facing : 0;

	    /**
	     * Idle state
	     * @type {Number}
	     */
	    _this.idle = 0;

	    /**
	     * States
	     * @type {Object}
	     */
	    _this.STATES["WALKING"] = false;
	    _this.STATES["RUNNING"] = false;
	    _this.STATES["BUMPING"] = false;
	    _this.STATES["WALKING"] = false;
	    _this.STATES["FACING"] = false;

	    /**
	     * Shadow offsets
	     * @type {Number}
	     */
	    _this.shadowX = obj.shadowX === void 0 ? 0 : obj.shadowX;
	    _this.shadowY = obj.shadowY === void 0 ? -1.75 : obj.shadowY;

	    /**
	     * Local player check
	     * @type {Boolean}
	     */
	    _this.isLocalPlayer = false;

	    /**
	     * NPC check
	     * @type {Boolean}
	     */
	    _this.isNPC = false;

	    /**
	     * Network player check
	     * @type {Boolean}
	     */
	    _this.isNetworkPlayer = false;

	    /**
	     * Animation frames
	     * @type {Array}
	     */
	    _this.frames = [0, 1, 0, 2, 3, 4];

	    /**
	     * Reset frame
	     * @type {Array}
	     */
	    _this.frameReset = [0, 2, 2, 0];

	    /**
	     * Last facing
	     * @type {Number}
	     */
	    _this.lastFacing = 0;

	    /**
	     * Step count
	     * @type {Number}
	     */
	    _this.stepCount = 0;

	    /**
	     * Face count
	     * @type {Number}
	     */
	    _this.faceCount = 0;

	    /**
	     * Latency
	     * @type {Number}
	     */
	    _this.latency = .5;

	    /**
	     * Map the player is on
	     * @type {String}
	     */
	    _this.map = obj.map;

	    /**
	     * Step sound
	     * @type {Number}
	     */
	    _this.soundSteps = _cfg.DIMENSION * 2;

	    _this.xMargin = -(_cfg.DIMENSION / 2);
	    _this.yMargin = -_cfg.DIMENSION;

	    if (obj.x !== void 0 && obj.y !== void 0) {
	      _this.x = obj.x;
	      _this.y = obj.y;
	    }

	    var last = _this.getLastPosition();

	    _this.last.x = _this.x + last.x;
	    _this.last.y = _this.y + last.y;

	    _this.init(obj);

	    return _this;
	  }

	  /**
	   * Last position
	   * @return {Object}
	   */


	  (0, _createClass3.default)(Player, [{
	    key: "getLastPosition",
	    value: function getLastPosition() {

	      var x = 0;
	      var y = 0;

	      if (this.facing === _cfg.LEFT || this.facing === _cfg.RIGHT) {
	        x = this.facing === _cfg.LEFT ? _cfg.DIMENSION : -_cfg.DIMENSION;
	      } else {
	        y = this.facing === _cfg.DOWN ? -_cfg.DIMENSION : _cfg.DIMENSION;
	      }

	      return {
	        x: x,
	        y: y
	      };
	    }

	    /**
	     * @getter
	     * @return {Number}
	     */

	  }, {
	    key: "init",


	    /**
	     * Initialise
	     * @param {Object} obj
	     */
	    value: function init(obj) {
	      this.setPlayerType(obj);
	    }

	    /**
	     * Set player entity type
	     * @param {Object} obj
	     */

	  }, {
	    key: "setPlayerType",
	    value: function setPlayerType(obj) {

	      if (obj.isLocalPlayer === true) {
	        this.isLocalPlayer = true;
	        this.isNPC = false;
	        this.isNetworkPlayer = false;
	      } else if (obj.isNPC === true) {
	        this.isLocalPlayer = false;
	        this.isNPC = true;
	        this.isNetworkPlayer = false;
	      } else if (obj.isNetworkPlayer === true) {
	        this.isLocalPlayer = false;
	        this.isNPC = false;
	        this.isNetworkPlayer = true;
	      }
	      /** Default is npc */
	      else {
	          this.isLocalPlayer = false;
	          this.isNPC = true;
	          this.isNetworkPlayer = false;
	        }
	    }

	    /**
	     * Get frame index
	     * @return {Number}
	     */

	  }, {
	    key: "getFrameIndex",
	    value: function getFrameIndex() {
	      return this.STATES.RUNNING === true ? 2 : 0;
	    }

	    /** Reset sprite frame */

	  }, {
	    key: "resetFrame",
	    value: function resetFrame() {
	      this.frame = this.frameReset[this.frame] + this.getFrameIndex();
	    }

	    /** Refresh entity states */

	  }, {
	    key: "refreshState",
	    value: function refreshState() {
	      this.STATES.RUNNING = this.velocity === .5 ? false : this.velocity >= 1 && this.STATES.WALKING === true ? true : false;
	      this.STATES.JUMPING = this.z !== 0;
	    }

	    /** Trigger faced tile */

	  }, {
	    key: "action",
	    value: function action() {
	      var position = _Math2.default.getTilePosition(this.x << 0, this.y << 0, this.facing);
	      _utils.Maps[this.map].actionTrigger(position, this);
	    }

	    /**
	     * Face a entity
	     * @param {Object} entity
	     */

	  }, {
	    key: "faceEntity",
	    value: function faceEntity(entity) {
	      var facing = this.oppositFacing(entity.facing);
	      if (this.facing !== facing) {
	        this.changeFacing(facing);
	      }
	    }

	    /** Animate */

	  }, {
	    key: "animate",
	    value: function animate() {

	      if (this.STATES.JUMPING === true) {
	        this.jumping();
	      }

	      if (this.animations.length <= 0) return void 0;

	      this.animationIndex = 0;

	      var ii = 0;
	      var animation = null;
	      var walking = false;
	      var bumping = false;

	      for (; ii < this.animations.length; ++ii) {
	        animation = this.animations[this.animationIndex];
	        if (animation.type === "walk" && walking === true) continue;
	        if (animation.type === "bump" && bumping === true) continue;
	        this[animation.type](animation);
	        if (animation.type === "walk") walking = true;
	        if (animation.type === "bump") bumping = true;
	        this.animationIndex++;
	      };
	    }
	  }, {
	    key: "velocity",
	    get: function get() {
	      return this.latency;
	    }

	    /**
	     * @param {Number} value
	     * @setter
	     */
	    ,
	    set: function set(value) {
	      this.latency = value / 2;
	      if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	        this.instance.engine.connection.sendData("Velocity", [this.id, value]);
	      }
	      if (this.leader) {
	        this.leader.velocity = value;
	      }
	      this.refreshState();
	    }

	    /**
	     * Player is moving
	     * @return {Boolean}
	     * @getter
	     */

	  }, {
	    key: "moving",
	    get: function get() {
	      return this.STATES.WALKING === true || this.STATES.RUNNING === true;
	    }

	    /**
	     * Player is moving
	     * @param {Boolean} value
	     * @setter
	     */
	    ,
	    set: function set(value) {
	      this.STATES.WALKING = value;
	      this.STATES.RUNNING = value;
	    }
	  }]);
	  return Player;
	}(_Entity3.default);

	(0, _utils.inherit)(Player, jump);
	(0, _utils.inherit)(Player, walk);
	(0, _utils.inherit)(Player, face);
	(0, _utils.inherit)(Player, sound);
	(0, _utils.inherit)(Player, follow);

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jump = jump;
	exports.jumping = jumping;

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	/**
	 * Jump
	 */
	function jump() {

	  if (this.jumpable === false) return void 0;

	  this.refreshState();

	  if (this.STATES.JUMPING === true || this.STATES.LOCK === true) return void 0;

	  this.STATES.JUMPING = true;

	  if (this.onJump !== null) {
	    _utils.Maps[this.map].triggerEvent(this, this, "onJump");
	  }

	  this.jumping();

	  if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	    this.instance.engine.connection.sendData("Jumping", [this.id]);
	  }

	  this.idleTime = 0;
	}

	/**
	 * Jumping
	 */
	function jumping() {

	  this.frame = 3;

	  if (this.z === 0) {
	    this.playStateSound();
	  }

	  this.z += this.gravity;

	  this.refreshState();

	  if (this.z < 0) {
	    this.gravity += .1;
	    this.shadow.position.set(-(this.z / 2), this.shadowY - this.z);
	    this.shadow.scale.set(this.z, this.z);
	  } else {
	    this.gravity = _cfg.GRAVITY;
	    this.z = 0;
	    this.resetFrame();
	    this.refreshState();
	    this.shadow.position.set(this.shadowX, this.shadowY);
	    this.shadow.scale.set(0, 0);

	    if (this.isLocalPlayer === true) {
	      this.instance.engine.everythingJump();
	      this.instance.engine.everythingRotate(1);
	    }
	  }
	}

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.walkTo = walkTo;
	exports.move = move;
	exports.onlineMove = onlineMove;
	exports.skipBump = skipBump;
	exports.halfStep = halfStep;
	exports.bump = bump;
	exports.startMoving = startMoving;
	exports.stopMoving = stopMoving;
	exports.walk = walk;

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _Math = __webpack_require__(111);

	var _Math2 = _interopRequireDefault(_Math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Walk to a position
	 * @param {Number} x
	 * @param {Number} y
	 */
	function walkTo(x, y) {

	  if (this.moving === true) return void 0;

	  var ii = 0;
	  var length = 0;

	  var lastX = _Math2.default.roundTo(this.x, _cfg.DIMENSION);
	  var lastY = _Math2.default.roundTo(this.y, _cfg.DIMENSION);

	  x = _Math2.default.roundTo(x, _cfg.DIMENSION);
	  y = _Math2.default.roundTo(y, _cfg.DIMENSION);

	  var xx = 0;
	  var yy = 0;

	  var dir = 0;

	  var path = _utils.Maps[this.map].path.getShortestPath(lastX, lastY, x, y);

	  if (path === void 0 || path === null || path.length <= 0) return void 0;

	  length = path.length;

	  for (; ii < length; ++ii) {
	    xx = path[ii].x * _cfg.DIMENSION;
	    yy = path[ii].y * _cfg.DIMENSION;
	    if (xx !== lastX) {
	      dir = xx < lastX ? _cfg.LEFT : _cfg.RIGHT;
	    } else {
	      if (yy !== lastY) {
	        dir = yy < lastY ? _cfg.UP : _cfg.DOWN;
	      }
	    }
	    this.animations.push({
	      type: "walk",
	      facing: dir,
	      obstacle: false,
	      x: xx,
	      y: yy,
	      oX: this.x,
	      oY: this.y,
	      isPath: true
	    });
	    lastX = xx;
	    lastY = yy;
	  };

	  return void 0;
	}

	/**
	 * Move player
	 * @param {Number}   facing
	 * @param {Function} resolve
	 */
	function move(facing, resolve) {

	  /** Wait until we finished */
	  if (this.moving === true) return void 0;

	  if (this.facing !== facing) {
	    if (this.STATES.BUMPING === true) {
	      this.skipBump();
	    }
	  } else {
	    if (this.STATES.BUMPING === true) return void 0;
	  }

	  if (this.STATES.BUMPING === true) return void 0;

	  this.moveCB = resolve || null;

	  this.startMoving(this.x, this.y, facing);

	  this.refreshState();
	}

	function onlineMove(x, y, facing) {

	  x = _Math2.default.roundTo(x, _cfg.DIMENSION);
	  y = _Math2.default.roundTo(y, _cfg.DIMENSION);
	  facing <<= 0;

	  var obstacle = _utils.Maps[this.map].collisionLayer.data[y / _cfg.DIMENSION][x / _cfg.DIMENSION] === 0 || _utils.Maps[this.map].isEntityCollidable(this, x, y) === true;

	  this.animations.push({
	    type: "walk",
	    facing: facing,
	    obstacle: obstacle,
	    x: x,
	    y: y,
	    oX: this.x,
	    oY: this.y
	  });

	  this.idleTime = 0;
	}

	/**
	 * Skip bumping
	 */
	function skipBump() {

	  this.stepCount = 0;

	  if (this.animations[this.animationIndex - 1].type === "bump") {
	    this.animations.splice(this.animationIndex - 1, 1);
	  }

	  this.moving = false;
	  this.STATES.BUMPING = false;
	}

	/**
	 * Do halfstep
	 */
	function halfStep() {

	  var half = Math.ceil(Math.ceil(_cfg.DIMENSION / (this.velocity * 2)) / 2);

	  if (this.stepCount === half) {
	    this.frame = (this.frame + 1 + this.getFrameIndex()) % 4;
	  }
	}

	/**
	 * Bump
	 * @param {Object} animation
	 */
	function bump(animation) {

	  if (this.stepCount <= 0) {
	    this.playStateSound();
	  }

	  this.stepCount += .5;

	  if (this.STATES.JUMPING === false) {
	    this.halfStep();
	  }

	  if (this.stepCount >= _cfg.DIMENSION * 2) {
	    if (this.STATES.JUMPING === false) {
	      this.halfStep();
	      this.resetFrame();
	    }
	    this.stepCount = 0;
	    this.stopAnimation();
	    this.STATES.BUMPING = false;
	    this.refreshState();
	  }
	}

	/**
	 * Start moving
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} dir
	 */
	function startMoving(x, y, dir) {

	  if (this.facing !== dir) {
	    this.changeFacing(dir);
	    if (this.moveCB) {
	      this.moveCB();
	    }
	    return void 0;
	  }

	  var position = _Math2.default.getTilePosition(x, y, dir);
	  var obstacle = _utils.Maps[this.map].isObstacle(this, dir);

	  if (this.isLocalPlayer === true && _cfg.GOD_MODE === true) {
	    obstacle = false;
	  }

	  if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	    this.instance.engine.connection.sendData("Position", [this.id, dir, x, y]);
	  }

	  /** Blocked, bump so */
	  if (obstacle === true) {
	    this.animations.push({
	      type: "bump",
	      x: x,
	      y: y
	    });
	    this.STATES.BUMPING = true;
	    /** Crossable */
	  } else {
	    this.animations.push({
	      type: "walk",
	      facing: dir,
	      obstacle: obstacle,
	      x: position.x,
	      y: position.y,
	      oX: x,
	      oY: y
	    });
	    this.moving = true;
	  }

	  this.idleTime = 0;
	}

	/**
	 * Stop moving
	 * @param {Object} animation
	 */
	function stopMoving(animation) {

	  var continuous = -1;

	  this.x = animation.x;
	  this.y = animation.y + _cfg.Y_DEPTH_HACK;

	  this.last.x = animation.oX;
	  this.last.y = animation.oY;

	  this.moving = false;

	  this.stepCount = 0;

	  setTimeout(function () {
	    if (this.moving === false && this.STATES.BUMPING === false && this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	  }.bind(this), 100);

	  this.stopAnimation();

	  this.refreshState();

	  /** Continue moving */
	  if (this.isLocalPlayer === true) {
	    if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.LEFT)) === true) {
	      continuous = _cfg.LEFT;
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.UP)) === true) {
	      continuous = _cfg.UP;
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.RIGHT)) === true) {
	      continuous = _cfg.RIGHT;
	    } else if (this.instance.input.KeyBoard.isKeyPressed(this.facingToKey(_cfg.DOWN)) === true) {
	      continuous = _cfg.DOWN;
	    } else {
	      this.soundSteps = _cfg.DIMENSION;
	    }
	    if (continuous >= 0) {
	      this.move(continuous);
	    }
	  } else {
	    this.soundSteps = _cfg.DIMENSION;
	  }

	  if (this.leader !== null) {
	    this.follow(this.last.x, this.last.y, false);
	  }

	  if (this.moveCB) {
	    this.moveCB();
	  }
	}

	/**
	 * Walk
	 * @param {Object} animation
	 */
	function walk(animation) {

	  if (this.facing !== animation.facing) {
	    this.changeFacing(animation.facing);
	    if (this.moveCB) {
	      this.moveCB();
	    }
	  }

	  if (this.stepCount <= 0) {
	    if (this.leader !== null) {
	      this.follow(this.x, this.y, false);
	    }
	    if (this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	    if (animation.obstacle === false) {
	      /** onEnter event => animation.x, animation.y */
	    }
	  }

	  this.playStateSound();

	  if (animation.obstacle === false) {
	    if (this.STATES.JUMPING === false) {
	      this.halfStep();
	    }
	    if (this.x > animation.x) {
	      this.x -= this.velocity;
	    } else if (this.x < animation.x) {
	      this.x += this.velocity;
	    } else if (this.y > animation.y) {
	      this.y -= this.velocity;
	    } else if (this.y < animation.y) {
	      this.y += this.velocity;
	    }
	    this.stepCount += this.velocity;
	  }

	  /** Reached destination */
	  if (this.stepCount >= _cfg.DIMENSION) {
	    this.lastFacing = this.facing;
	    this.stopMoving(animation);
	  }

	  this.soundSteps += this.velocity;
	}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeFacing = changeFacing;

	var _cfg = __webpack_require__(21);

	/**
	 * Change facing
	 * @param {Number} dir
	 */
	function changeFacing(dir) {

	  if (this.STATES.LOCK === true || this.moving === true) return void 0;

	  this.idleTime = 0;

	  if (this.moving === false && this.STATES.BUMPING === false) {
	    this.lastFacing = this.facing;
	    this.facing = dir;
	    if (this.isLocalPlayer === true && _cfg.OFFLINE_MODE === false) {
	      this.instance.engine.connection.sendData("Facing", [this.id, this.facing]);
	    }
	    this.frame = (this.frame + 3 + this.getFrameIndex()) % 4;
	  }

	  /** TODO: Avoid settimeout */
	  setTimeout(function () {
	    if (this.moving === false && this.STATES.BUMPING === false && this.STATES.JUMPING === false) {
	      this.resetFrame();
	    }
	  }.bind(this), 30);
	}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.playStateSound = playStateSound;

	var _cfg = __webpack_require__(21);

	var _utils = __webpack_require__(22);

	var _Audio = __webpack_require__(115);

	var _Audio2 = _interopRequireDefault(_Audio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Play sound
	 */
	function playStateSound() {

	  if (_cfg.BGS !== true) return void 0;

	  var volume = this.isLocalPlayer === true ? _cfg.VOLUME.NETWORK_PLAYER : _cfg.VOLUME.LOCAL_PLAYER;

	  var dist = _utils.Maps[this.map].distance(this, game.engine.camera);

	  if (Math.abs(dist.x) + Math.abs(dist.y) >= 1.0) {
	    dist.x *= 4;
	    dist.y *= 4;
	  }

	  if (this.STATES.JUMPING === true && this.z === 0) {
	    _Audio2.default.playSound("jump", volume, dist.x, dist.y);
	  }

	  /** Player is bumping */
	  if (this.STATES.BUMPING === true) {
	    _Audio2.default.playSound("bump", volume, dist.x, dist.y);
	    /** Player is walking */
	  } else {
	    if (this.moving === true) {
	      if (this.soundSteps >= _cfg.DIMENSION * 2) {
	        this.soundSteps = 0;
	        if (this.STATES.RUNNING === true) {
	          _Audio2.default.playSound("run_step", volume, dist.x, dist.y);
	        } else {
	          _Audio2.default.playSound("ground_step", volume, dist.x, dist.y);
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.follow = follow;

	var _cfg = __webpack_require__(21);

	/**
	 * Follow a entity
	 * @param {Number}  x
	 * @param {Number}  y
	 * @param {Boolean} obstacle
	 */
	function follow(x, y, obstacle) {

	  var leader = this.leader;

	  if (obstacle === false) {
	    if (leader.x << 0 === this.followTarget.x << 0 && leader.y << 0 === this.followTarget.y << 0) {
	      leader.walkTo(x << 0, y << 0);
	      this.followTarget.x = x << 0;
	      this.followTarget.y = y << 0;
	      /** Target has moved to new position */
	    }
	  }
	}

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Monster = undefined;

	var _getPrototypeOf = __webpack_require__(79);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(2);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(83);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(103);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Entity2 = __webpack_require__(121);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Monster = exports.Monster = function (_Entity) {
	  (0, _inherits3.default)(Monster, _Entity);

	  /**
	   * @constructor
	   * @param {Object} obj
	   */
	  function Monster(obj) {
	    (0, _classCallCheck3.default)(this, Monster);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Monster.__proto__ || (0, _getPrototypeOf2.default)(Monster)).call(this, obj));

	    _this.init(obj);
	    return _this;
	  }

	  (0, _createClass3.default)(Monster, [{
	    key: "init",
	    value: function init() {
	      console.log(this);
	    }
	  }]);
	  return Monster;
	}(_Entity3.default);

/***/ })
/******/ ]);