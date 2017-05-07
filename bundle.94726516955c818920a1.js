webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function WrongCoordinatesException(name) {
    this.message = 'Wrong coordinates given for ' + name;
}

function WrongSizeGivenException() {
    this.message = 'Wrong world size was given';
}

function OutOfRangeException(pos) {
    this.message = 'Given coordinates [' + pos.x + ',' + pos.y + '] are out of range';
}

function NoWorldAssignedException(name) {
    this.message = 'No world assigned for ' + name;
}

function NoMethodImplementedException(name) {
    this.message = 'No ' + name + ' method implemented';
}

function WrongOrganismIdWhileDeletingException(organism) {
    this.message = 'Wrong organism id';
    this.organism = organism;
    this.expected = organism.world.organisms[organism.index];
}

function OrganismAlreadyDeletedException(organism) {
    this.message = 'Organism is already deleted';
    this.organism = organism;
}

exports.WrongCoordinatesException = WrongCoordinatesException;
exports.WrongSizeGivenException = WrongSizeGivenException;
exports.OutOfRangeException = OutOfRangeException;
exports.NoWorldAssignedException = NoWorldAssignedException;
exports.NoMethodImplementedException = NoMethodImplementedException;
exports.WrongOrganismIdWhileDeletingException = WrongOrganismIdWhileDeletingException;
exports.OrganismAlreadyDeletedException = OrganismAlreadyDeletedException;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _organism = __webpack_require__(10);

var _organism2 = _interopRequireDefault(_organism);

var _utilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Animal = function (_Organism) {
    _inherits(Animal, _Organism);

    function Animal(pos) {
        _classCallCheck(this, Animal);

        return _possibleConstructorReturn(this, (Animal.__proto__ || Object.getPrototypeOf(Animal)).call(this, pos));
    }

    _createClass(Animal, [{
        key: 'action',
        value: function action() {
            var dir = (0, _utilities.getRandom)(1, 9);
            if (dir == 5) return;
            var newPos = (0, _utilities.getPosAtDir)(this.pos, dir);
            var mapState = this.world.getMapState(newPos);
            if (!mapState) {
                this.move(newPos);
            } else if (mapState.pos) {
                this.collision(mapState);
            } else if (mapState == -1) {
                var freeSpace = this.world.getFreeSpace(this.pos);
                if (freeSpace) {
                    this.move(freeSpace);
                }
            }
        }
    }, {
        key: 'collision',
        value: function collision(encountered) {
            if (this.constructor.name != encountered.constructor.name) {
                this.fight(encountered);
            } else {
                this.breed();
            }
        }
    }, {
        key: 'fight',
        value: function fight(encountered) {
            var newPos = void 0;
            if (this.strength >= encountered.strength) {
                newPos = encountered.pos;
                this.world.deleteOrganism(encountered);
                this.move(newPos);
            } else {
                this.world.deleteOrganism(this);
            }
        }
    }, {
        key: 'breed',
        value: function breed() {
            var dir = void 0;
            var newPos = void 0;
            var mapState = void 0;
            dir = (0, _utilities.getRandom)(1, 9);
            newPos = (0, _utilities.getPosAtDir)(this.pos, dir);
            mapState = this.world.getMapState(newPos);
            if (mapState) {
                var freeSpace = this.world.getFreeSpace(this.pos, true);
                if (freeSpace) {
                    newPos = freeSpace;
                } else {
                    return;
                }
            }
            var child = new this.constructor(newPos);
            this.world.newOrganism(child);
        }
    }]);

    return Animal;
}(_organism2.default);

exports.default = Animal;
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Direction is resembled by a number on numpad, so for example
//7 means moving to upper-left corner, or 6 means moving right
function getPosAtDir(pos, dir) {
    if (dir == 5) {
        return pos;
    }
    var x = pos.x;
    var y = pos.y;
    if (dir >= 1 && dir <= 3) {
        ++y;
    } else if (dir >= 7 && dir <= 9) {
        --y;
    }
    if (dir == 1 || dir == 4 || dir == 7) {
        --x;
    } else if (dir == 9 || dir == 6 || dir == 3) {
        ++x;
    }
    return {
        x: x,
        y: y
    };
}

exports.getRandom = getRandom;
exports.getPosAtDir = getPosAtDir;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _animal = __webpack_require__(2);

var _animal2 = _interopRequireDefault(_animal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sheep = function (_Animal) {
    _inherits(Sheep, _Animal);

    function Sheep(pos) {
        _classCallCheck(this, Sheep);

        var _this = _possibleConstructorReturn(this, (Sheep.__proto__ || Object.getPrototypeOf(Sheep)).call(this, pos));

        _this.strength = 4;
        _this.initiative = 4;
        return _this;
    }

    return Sheep;
}(_animal2.default);

exports.default = Sheep;
;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _animal = __webpack_require__(2);

var _animal2 = _interopRequireDefault(_animal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wolf = function (_Animal) {
    _inherits(Wolf, _Animal);

    function Wolf(pos) {
        _classCallCheck(this, Wolf);

        var _this = _possibleConstructorReturn(this, (Wolf.__proto__ || Object.getPrototypeOf(Wolf)).call(this, pos));

        _this.strength = 9;
        _this.initiative = 5;
        return _this;
    }

    return Wolf;
}(_animal2.default);

exports.default = Wolf;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initializeWorld = exports.drawWorld = undefined;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeWorld(world) {
    var map = (0, _jquery2.default)('#map');

    var _loop = function _loop(y) {
        var row = (0, _jquery2.default)('<div/>', {
            class: 'row'
        });

        var _loop2 = function _loop2(x) {
            var className = 'empty';
            var el = (0, _jquery2.default)('<div/>', {
                class: 'element ' + className
            });
            el.on('click', function () {
                checkContent({ x: x, y: y }, el, world);
            });
            row.append(el);
        };

        for (var x = 0; x < world.size.width; x++) {
            _loop2(x);
        }
        map.append(row);
    };

    for (var y = 0; y < world.size.height; y++) {
        _loop(y);
    }
}

function checkContent(pos, node, world) {
    console.debug({
        pos: pos,
        organism: world.getMapState(pos),
        node: node,
        world: world
    });
}

function drawWorld(world) {
    var map = (0, _jquery2.default)('#map');
    var rows = map.find('.row');
    for (var y = 0; y < world.size.height; y++) {
        var elements = rows[y].childNodes;
        for (var x = 0; x < world.size.width; x++) {
            var obj = world.getMapState({ x: x, y: y });
            var className = void 0;
            if (obj) {
                className = obj.constructor.name;
            } else {
                className = 'empty';
            }
            elements[x].className = 'element ' + className;
        }
    }
}

exports.drawWorld = drawWorld;
exports.initializeWorld = initializeWorld;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(1);

var _utilities = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    function World(size) {
        _classCallCheck(this, World);

        if (size.width == null || size.height == null) {
            throw new _errors.WrongSizeGivenException();
        }
        this.size = size;
        this.map = new Array(size.height).fill(0).map(function () {
            return new Array(size.width).fill(0);
        });
        this.organisms = new Map();
        this.counter = 0;
    }

    _createClass(World, [{
        key: 'newOrganism',
        value: function newOrganism(organism) {
            organism.world = this;
            organism.key = this.counter++;
            this.organisms.set(organism.key, organism);
            this.setMapState(organism.pos, organism);
        }
    }, {
        key: 'deleteOrganism',
        value: function deleteOrganism(organism) {
            if (organism.deleted) throw new _errors.OrganismAlreadyDeletedException(organism);
            this.setMapState(organism.pos, 0);
            this.organisms.delete(organism.key);
            organism.deleted = true;
        }
    }, {
        key: 'getMapState',
        value: function getMapState(pos) {
            if (pos.x < 0 || pos.x >= this.size.width || pos.y < 0 || pos.y >= this.size.height) {
                return -1;
            }
            return this.map[pos.y][pos.x];
        }
    }, {
        key: 'setMapState',
        value: function setMapState(pos, obj) {
            if (obj && obj.deleted) throw new _errors.OrganismAlreadyDeletedException(obj);
            if (pos.x < 0 || pos.x >= this.size.width || pos.y < 0 || pos.y >= this.size.height) {
                throw new _errors.OutOfRangeException(pos);
            }
            this.map[pos.y][pos.x] = obj;
        }
    }, {
        key: 'turn',
        value: function turn() {
            this.organisms.forEach(function (el) {
                if (el.deleted) throw new _errors.OrganismAlreadyDeletedException(el);
                el.action();
            });
        }
    }, {
        key: 'getFreeSpace',
        value: function getFreeSpace(pos, empty) {
            var mapState = void 0;
            var newPos = void 0;
            for (var dir = 0; dir <= 9; ++dir) {
                if (dir == 5) continue;
                newPos = (0, _utilities.getPosAtDir)(pos, dir);
                mapState = this.getMapState(newPos);
                if (!mapState || mapState.pos && !empty || !mapState) return newPos;
            }
        }
    }]);

    return World;
}();

exports.default = World;
;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _wolf = __webpack_require__(5);

var _wolf2 = _interopRequireDefault(_wolf);

var _sheep = __webpack_require__(4);

var _sheep2 = _interopRequireDefault(_sheep);

var _world = __webpack_require__(7);

var _world2 = _interopRequireDefault(_world);

var _representation = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var world = new _world2.default({ width: 10, height: 10 });

var wolf = new _wolf2.default({
    x: 3,
    y: 3
});
world.newOrganism(wolf);

var wolf2 = new _wolf2.default({
    x: 4,
    y: 4
});
world.newOrganism(wolf2);

var sheep1 = new _sheep2.default({
    x: 6,
    y: 6
});
world.newOrganism(sheep1);

var sheep2 = new _sheep2.default({
    x: 6,
    y: 7
});
world.newOrganism(sheep2);

(0, _representation.initializeWorld)(world);
runGame();

function runGame() {
    (0, _representation.drawWorld)(world);
    world.turn();
    setTimeout(runGame, 100);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Organism = function () {
    function Organism(pos) {
        var _this = this;

        _classCallCheck(this, Organism);

        this.strength = 0;
        this.initiative = 0;
        this.world = null;
        this.pos = pos;
        if (pos.x == null || pos.y == null) {
            throw new _errors.WrongCoordinatesException(this.constructor.name);
        }
        setTimeout(function () {
            if (!_this.world) {
                throw new _errors.NoWorldAssignedException(_this.constructor.name);
            }
        }, 0);
    }

    _createClass(Organism, [{
        key: 'action',
        value: function action() {
            throw new _errors.NoMethodImplementedException('action');
        }
    }, {
        key: 'collision',
        value: function collision() {
            throw new _errors.NoMethodImplementedException('collision');
        }
    }, {
        key: 'move',
        value: function move(newPos) {
            this.world.setMapState(this.pos, 0);
            this.world.setMapState(newPos, this);
            this.pos = newPos;
        }
    }]);

    return Organism;
}();

exports.default = Organism;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, ".row {\n  display: block; }\n\n.element {\n  display: inline-block;\n  width: 50px;\n  height: 50px;\n  background-color: white;\n  border: 1px solid black; }\n  .element.Wolf {\n    background-color: #121212; }\n  .element.Sheep {\n    background-color: lightgray; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
],[9]);
//# sourceMappingURL=bundle.94726516955c818920a1.js.map