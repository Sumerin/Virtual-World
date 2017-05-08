webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _organism = __webpack_require__(13);

var _organism2 = _interopRequireDefault(_organism);

var _utilities = __webpack_require__(1);

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
        value: function action(condition) {
            var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            var dir = (0, _utilities.getRandom)(1, 9);
            var newPos = (0, _utilities.getPosAtDir)(this.pos, dir);
            for (var i = 0; i < range - 1; i++) {
                if ((0, _utilities.tryWithChance)(60)) {
                    dir = (0, _utilities.getRandom)(1, 9);
                    newPos = (0, _utilities.getPosAtDir)(newPos, dir);
                }
            }
            if ((0, _utilities.areEqual)(this.pos, newPos)) return false;
            var mapState = this.world.getMapState(newPos);
            if (!mapState) {
                this.move(newPos);
            } else if (mapState.pos && (condition || condition === undefined)) {
                this.collision(mapState);
            } else if (mapState == -1) {
                var freeSpace = this.world.getFreeSpace(this.pos);
                if (freeSpace) {
                    this.move(freeSpace);
                } else {
                    return false;
                }
            }
            return true;
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
        value: function fight(encountered, flee) {
            if (!encountered.defend(this) && !flee) {
                var newPos = void 0;
                if (this.strength >= encountered.strength) {
                    newPos = encountered.pos;
                    this.world.deleteOrganism(encountered);
                    this.move(newPos);
                } else {
                    this.world.deleteOrganism(this);
                }
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
    }, {
        key: 'defend',
        value: function defend() {
            return false;
        }
    }]);

    return Animal;
}(_organism2.default);

exports.default = Animal;
;

/***/ }),
/* 1 */
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

function tryWithChance(prob) {
    var outcome = Math.random();
    return outcome <= prob / 100;
}

function areEqual(first, second) {
    for (var property in first) {
        if (!second.hasOwnProperty(property) || first[property] !== second[property]) {
            return false;
        }
    }
    return true;
}

exports.getRandom = getRandom;
exports.getPosAtDir = getPosAtDir;
exports.tryWithChance = tryWithChance;
exports.areEqual = areEqual;

/***/ }),
/* 2 */,
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _animal = __webpack_require__(0);

var _animal2 = _interopRequireDefault(_animal);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Antelope = function (_Animal) {
    _inherits(Antelope, _Animal);

    function Antelope(pos) {
        _classCallCheck(this, Antelope);

        var _this = _possibleConstructorReturn(this, (Antelope.__proto__ || Object.getPrototypeOf(Antelope)).call(this, pos));

        _this.strength = 4;
        _this.initiative = 4;
        return _this;
    }

    _createClass(Antelope, [{
        key: 'action',
        value: function action() {
            _get(Antelope.prototype.__proto__ || Object.getPrototypeOf(Antelope.prototype), 'action', this).call(this, undefined, 2);
        }
    }, {
        key: 'defend',
        value: function defend() {
            if ((0, _utilities.tryWithChance)(50)) {
                var freeSpace = this.world.getFreeSpace(this.pos, true);
                if (freeSpace) {
                    this.move(freeSpace);
                }
                return true;
            }
        }
    }, {
        key: 'fight',
        value: function fight(encountered) {
            _get(Antelope.prototype.__proto__ || Object.getPrototypeOf(Antelope.prototype), 'fight', this).call(this, encountered, this.defend());
        }
    }]);

    return Antelope;
}(_animal2.default);

exports.default = Antelope;
;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _animal = __webpack_require__(0);

var _animal2 = _interopRequireDefault(_animal);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fox = function (_Animal) {
    _inherits(Fox, _Animal);

    function Fox(pos) {
        _classCallCheck(this, Fox);

        var _this = _possibleConstructorReturn(this, (Fox.__proto__ || Object.getPrototypeOf(Fox)).call(this, pos));

        _this.strength = 4;
        _this.initiative = 7;
        return _this;
    }

    _createClass(Fox, [{
        key: 'action',
        value: function action() {
            if (!_get(Fox.prototype.__proto__ || Object.getPrototypeOf(Fox.prototype), 'action', this).call(this)) {
                var freeSpace = this.smellForFreeSpace();
                if (freeSpace) {
                    var mapState = this.world.getMapState(freeSpace);
                    if (!mapState) {
                        this.move(freeSpace);
                    } else {
                        this.collision(mapState);
                    }
                }
            }
        }
    }, {
        key: 'smellForFreeSpace',
        value: function smellForFreeSpace() {
            var mapState = void 0;
            var newPos = void 0;
            for (var dir = 0; dir <= 9; ++dir) {
                if (dir == 5) continue;
                newPos = (0, _utilities.getPosAtDir)(this.pos, dir);
                mapState = this.world.getMapState(newPos);
                if (!mapState || mapState.pos && this.strength >= mapState.pos.strength) return newPos;
            }
        }
    }]);

    return Fox;
}(_animal2.default);

exports.default = Fox;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _animal = __webpack_require__(0);

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

        _this.strength = 3;
        _this.initiative = 4;
        return _this;
    }

    return Sheep;
}(_animal2.default);

exports.default = Sheep;
;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _animal = __webpack_require__(0);

var _animal2 = _interopRequireDefault(_animal);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Turtle = function (_Animal) {
    _inherits(Turtle, _Animal);

    function Turtle(pos) {
        _classCallCheck(this, Turtle);

        var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, pos));

        _this.strength = 2;
        _this.initiative = 1;
        return _this;
    }

    _createClass(Turtle, [{
        key: 'action',
        value: function action() {
            if ((0, _utilities.tryWithChance)(25)) {
                _get(Turtle.prototype.__proto__ || Object.getPrototypeOf(Turtle.prototype), 'action', this).call(this);
            }
        }
    }, {
        key: 'defend',
        value: function defend(opponent) {
            if (opponent.strength < 5) {
                return true;
            }
        }
    }]);

    return Turtle;
}(_animal2.default);

exports.default = Turtle;
;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _animal = __webpack_require__(0);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initializeWorld = exports.drawWorld = undefined;

var _jquery = __webpack_require__(2);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(3);

var _utilities = __webpack_require__(1);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(16)(content, options);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(11);

var _wolf = __webpack_require__(8);

var _wolf2 = _interopRequireDefault(_wolf);

var _sheep = __webpack_require__(6);

var _sheep2 = _interopRequireDefault(_sheep);

var _fox = __webpack_require__(5);

var _fox2 = _interopRequireDefault(_fox);

var _turtle = __webpack_require__(7);

var _turtle2 = _interopRequireDefault(_turtle);

var _antelope = __webpack_require__(4);

var _antelope2 = _interopRequireDefault(_antelope);

var _world = __webpack_require__(10);

var _world2 = _interopRequireDefault(_world);

var _representation = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var world = new _world2.default({ width: 20, height: 20 });

world.newOrganism(new _wolf2.default({ x: 3, y: 3 }));
world.newOrganism(new _wolf2.default({ x: 4, y: 4 }));

world.newOrganism(new _sheep2.default({ x: 15, y: 15 }));
world.newOrganism(new _sheep2.default({ x: 15, y: 16 }));

world.newOrganism(new _fox2.default({ x: 8, y: 8 }));
world.newOrganism(new _fox2.default({ x: 6, y: 7 }));

world.newOrganism(new _turtle2.default({ x: 1, y: 2 }));
world.newOrganism(new _turtle2.default({ x: 1, y: 3 }));

world.newOrganism(new _antelope2.default({ x: 1, y: 15 }));
world.newOrganism(new _antelope2.default({ x: 1, y: 16 }));

(0, _representation.initializeWorld)(world);
runGame();

function runGame() {
    (0, _representation.drawWorld)(world);
    world.turn();
    setTimeout(runGame, 100);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = __webpack_require__(3);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, ".row {\n  display: block; }\n\n.element {\n  display: inline-block;\n  width: 35px;\n  height: 35px;\n  background-color: white;\n  border: 1px solid black; }\n  .element.Wolf {\n    background: url(" + __webpack_require__(22) + "); }\n  .element.Sheep {\n    background: url(" + __webpack_require__(20) + "); }\n  .element.Fox {\n    background: url(" + __webpack_require__(19) + "); }\n  .element.Turtle {\n    background: url(" + __webpack_require__(21) + "); }\n  .element.Antelope {\n    background: url(" + __webpack_require__(18) + "); }\n", ""]);

// exports


/***/ }),
/* 15 */
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
/* 16 */
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
	fixUrls = __webpack_require__(17);

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
/* 17 */
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


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTE4LjI4MyAyNjIuNzI5Yy0xLjMzMy0uNDMtMzIuOTg4LTEwLjgxLTYyLjM4NC0zMy4xNzktMTQuMTQ4LTEwLjc2Ni0yNS4wNTctMjguMjEzLTMyLjQyMy01MS44NTQtNS4xOTktMTYuNjg1LTYuNzA1LTMwLjYxMi02Ljc2Ni0zMS4xOTZsLTEuNTk0LTE1LjE0MSAxNS4wMTktMi41Yy41OC0uMDk3IDE0LjQxMy0yLjM1NiAzMS44Ny0xLjc5NiAyNC43NTEuNzk3IDQ0LjQ3NCA2LjY2IDU4LjYyMiAxNy40MjYgMjkuMzk1IDIyLjM3IDQ3LjgzOCA1MC4xMSA0OC42MDkgNTEuMjgxbC01MC45NTMgNjYuOTU5eiIgZmlsbD0iI2Q4ZDlkZCIvPjxwYXRoIGQ9Ik0xNDIuMjQ0IDIxMy41NzdjLS4xNjEtLjI0My0xNi4zNDQtMjQuNDQyLTQxLjItNDMuMzU2LTguNTcxLTYuNTIyLTIyLjQzMi0xMC4yNy00MC4wOC0xMC44MzlhMTQ1Ljc1MiAxNDUuNzUyIDAgMCAwLTkuMDY0LS4wMDZjMy43NzggMTUuMjU1IDExLjEzOCAzNC45NzIgMjMuNTgxIDQ0LjQ0MSAyNS4wNTYgMTkuMDY2IDUyLjQ3NCAyOC4wNTQgNTIuNzQ4IDI4LjE0NGwxNC4wMTUtMTguMzg0eiIgZmlsbD0iIzk2NTUwMCIvPjxwYXRoIGQ9Ik0zOTMuNzE3IDI2Mi43MjljMS4zMzMtLjQzIDMyLjk4OC0xMC44MSA2Mi4zODQtMzMuMTc5IDE0LjE0OC0xMC43NjYgMjUuMDU3LTI4LjIxMyAzMi40MjMtNTEuODU0IDUuMTk5LTE2LjY4NSA2LjcwNC0zMC42MTIgNi43NjYtMzEuMTk2bDEuNTk0LTE1LjE0MS0xNS4wMTktMi41Yy0uNTgtLjA5Ny0xNC40MTMtMi4zNTYtMzEuODctMS43OTYtMjQuNzUxLjc5Ny00NC40NzQgNi42Ni01OC42MjIgMTcuNDI2LTI5LjM5NSAyMi4zNy00Ny44MzggNTAuMTEtNDguNjA5IDUxLjI4MWw1MC45NTMgNjYuOTU5eiIgZmlsbD0iI2EwYTFhNSIvPjxwYXRoIGQ9Ik0zNjkuNzU2IDIxMy41NzdjLjE2MS0uMjQzIDE2LjM0NC0yNC40NDIgNDEuMi00My4zNTYgOC41NzEtNi41MjIgMjIuNDMyLTEwLjI3IDQwLjA4LTEwLjgzOSAzLjE5Ni0uMTAzIDYuMjUxLS4wOTEgOS4wNjQtLjAwNi0zLjc3OCAxNS4yNTUtMTEuMTM4IDM0Ljk3Mi0yMy41ODEgNDQuNDQxLTI1LjA1NiAxOS4wNjYtNTIuNDc0IDI4LjA1NC01Mi43NDggMjguMTQ0bC0xNC4wMTUtMTguMzg0eiIgZmlsbD0iIzcwM2YwMCIvPjxwYXRoIGQ9Ik0xNzUuODA5IDE5MC4wNDVjLS4wMjUtLjM2OS0zLjAyMy00MC4xNjktMjQuMjYtNzIuMDE3LTMuMzI2LTQuOTktNi4zNy05LjQ2NS05LjA1NS0xMy40MTRDMTE3LjU5NyA2OCAxMTQuODY0IDYxLjkwNiAxMTQuODY0IDBoMzIuMzM3YzAgMjkuMDE1LjQ0MyA0Mi43NzkgMy4xODggNTIuOTE3IDIuNjExIDkuNjM3IDguMDM2IDE3LjYxNyAxOC44NDQgMzMuNTEzIDIuNzI0IDQuMDA3IDUuODEzIDguNTQ4IDkuMjIxIDEzLjY1OSAyNi4xNDUgMzkuMjExIDI5LjQ5MiA4NS44NjEgMjkuNjIyIDg3LjgyN2wtMzIuMjY3IDIuMTI5eiIgZmlsbD0iIzNlMmMyNyIvPjxwYXRoIGQ9Ik0zMzYuMTkgMTkwLjA3NWwtMzIuMjY2LTIuMTU5Yy4xMjktMS45NjYgMy40NzctNDguNjE3IDI5LjYyMi04Ny44MjcgMy40MDgtNS4xMTEgNi40OTYtOS42NTMgOS4yMjEtMTMuNjU5IDEwLjgwOC0xNS44OTYgMTYuMjM0LTIzLjg3NCAxOC44NDQtMzMuNTEzIDIuNzQ1LTEwLjEzOCAzLjE4OC0yMy45MDIgMy4xODgtNTIuOTE3aDMyLjMzN2MwIDYxLjkwNi0yLjczNCA2OC0yNy42MyAxMDQuNjEzLTIuNjg1IDMuOTQ5LTUuNzI5IDguNDI1LTkuMDU1IDEzLjQxNC0yMS4yMzYgMzEuODQ5LTI0LjIzNCA3MS42NDktMjQuMjYxIDcyLjA0OHoiIGZpbGw9IiMyZTIxMWQiLz48cGF0aCBkPSJNMTM3LjY4MyA0MTkuNjJDMTU2LjU0IDQ2Ny43NjMgMTg2LjE5NyA1MTIgMjU2IDUxMnM5OS40Ni00NC4yMzcgMTE4LjMxNy05Mi4zOGMtMjkuODItMjAuMTUzLTcyLjUyNy0zMS44MzktMTE4LjMxNy0zMS44MzlzLTg4LjQ5NyAxMS42ODctMTE4LjMxNyAzMS44Mzl6IiBmaWxsPSIjZDhkOWRkIi8+PHBhdGggZD0iTTM5My41MzQgMzY2LjA4OGMxMC4zMi0yNy40NyAxOC40NzItNDkuMTY4IDE4LjQ3Mi04NC42MjkgMC00NS45NjItMjAuMTY3LTgwLjExNS01OC4zMjItOTguNzY1LTMyLjUwNC0xNS44ODgtNzEuMzE3LTE3LjcyNi05Ny42ODMtMTcuNzI2cy02NS4xNzkgMS44MzgtOTcuNjgzIDE3LjcyNmMtMzguMTU0IDE4LjY1MS01OC4zMjIgNTIuODAzLTU4LjMyMiA5OC43NjUgMCAzNS40NiA4LjE1MiA1Ny4xNTggMTguNDcyIDg0LjYyOSAzLjQxNSA5LjA5IDYuOTQ2IDE4LjQ4OSAxMC41OTkgMjkuNDY2IDIuNjY1IDguMDA4IDUuNDk0IDE2LjA5IDguNjE4IDI0LjA2NiAyOS44Mi0yMC4xNTIgNzIuNTI3LTMxLjgzOSAxMTguMzE3LTMxLjgzOXM4OC40OTYgMTEuNjg1IDExOC4zMTcgMzEuODM5YzMuMTI0LTcuOTc2IDUuOTUzLTE2LjA1OSA4LjYxOC0yNC4wNjYgMy42NS0xMC45NzcgNy4xODItMjAuMzc4IDEwLjU5Ny0yOS40NjZ6IiBmaWxsPSIjOTY1NTAwIi8+PHBhdGggZD0iTTI1NiA0MDcuOTM1Yy0xNi4zOTUgMC0yOS42ODYgNi45ODktMjkuNjg2LTkuNDA2di02My44OTVjMC0xNi4zOTUgMTMuMjktMjkuNjg2IDI5LjY4Ni0yOS42ODYgMTYuMzk1IDAgMjkuNjg2IDEzLjI5IDI5LjY4NiAyOS42ODZ2NjMuODk1YzAgMTYuMzk1LTEzLjI5MSA5LjQwNi0yOS42ODYgOS40MDZ6IiBmaWxsPSIjZDhkOWRkIi8+PHBhdGggZD0iTTE4MC45NzEgMjY5LjQ3NGMwLTExLjg3NiA5LjUyLTIxLjQ5MyAyMS4yMTgtMjEuNDkzIDExLjcxMyAwIDIxLjIzMiA5LjYxOCAyMS4yMzIgMjEuNDkzIDAgMTEuODc0LTkuNTE5IDIxLjUwMS0yMS4yMzIgMjEuNTAxLTExLjY5OC0uMDAxLTIxLjIxOC05LjYyNy0yMS4yMTgtMjEuNTAxem0zMC41OSAxODAuMDk1YzAtOC4xOTMgNi41NjgtMTQuODI5IDE0LjYzOS0xNC44MjkgOC4wODEgMCAxNC42NDggNi42MzYgMTQuNjQ4IDE0LjgyOSAwIDguMTkyLTYuNTY3IDE0LjgzMy0xNC42NDggMTQuODMzLTguMDcyIDAtMTQuNjM5LTYuNjQxLTE0LjYzOS0xNC44MzN6IiBmaWxsPSIjMzMzIi8+PHBhdGggZD0iTTI1NiA1MTJjNjkuODAzIDAgOTkuNDYtNDQuMjM3IDExOC4zMTctOTIuMzgtMjkuODItMjAuMTUzLTcyLjUyNy0zMS44MzktMTE4LjMxNy0zMS44MzlWNTEyeiIgZmlsbD0iI2EwYTFhNSIvPjxwYXRoIGQ9Ik0zOTMuNTM0IDM2Ni4wODhjMTAuMzItMjcuNDcgMTguNDcyLTQ5LjE2OCAxOC40NzItODQuNjI5IDAtNDUuOTYyLTIwLjE2Ny04MC4xMTUtNTguMzIyLTk4Ljc2NS0zMi41MDQtMTUuODg4LTcxLjMxNy0xNy43MjYtOTcuNjgzLTE3LjcyNnYyMjIuODE0YzQ1Ljc5IDAgODguNDk2IDExLjY4NSAxMTguMzE3IDMxLjgzOSAzLjEyNC03Ljk3NiA1Ljk1My0xNi4wNTkgOC42MTgtMjQuMDY2IDMuNjUxLTEwLjk3OCA3LjE4My0yMC4zNzkgMTAuNTk4LTI5LjQ2N3oiIGZpbGw9IiM3MDNmMDAiLz48cGF0aCBkPSJNMjU2IDQwNy45MzVWMzA0Ljk0OGMxNi4zOTUgMCAyOS42ODYgMTMuMjkgMjkuNjg2IDI5LjY4NnY2My44OTVjMCAxNi4zOTUtMTMuMjkxIDkuNDA2LTI5LjY4NiA5LjQwNnoiIGZpbGw9IiNhMGExYTUiLz48cGF0aCBkPSJNMzMxLjAyOSAyNjkuNDc0YzAtMTEuOTY0LTkuNTgxLTIxLjY2MS0yMS4zNzktMjEuNjYxLTExLjgxMiAwLTIxLjM5MyA5LjY5OC0yMS4zOTMgMjEuNjYxczkuNTgxIDIxLjY2MSAyMS4zOTMgMjEuNjYxYzExLjc5OCAwIDIxLjM3OS05LjY5OCAyMS4zNzktMjEuNjYxem0tMzAuNTkgMTgwLjA5NWMwLTguMjUzLTYuNjEtMTQuOTQ0LTE0Ljc0OS0xNC45NDQtOC4xNDkgMC0xNC43NTkgNi42OTEtMTQuNzU5IDE0Ljk0NHM2LjYxIDE0Ljk0NCAxNC43NTkgMTQuOTQ0YzguMTQgMCAxNC43NDktNi42OSAxNC43NDktMTQuOTQ0eiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg=="

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMjE0LjAzMyA0ODUuMDI3QzIxNC4wMzMgNDk5LjkyMyAyMzIuODIyIDUxMiAyNTYgNTEyczQxLjk2Ny0xMi4wNzYgNDEuOTY3LTI2Ljk3M2gtODMuOTM0eiIgZmlsbD0iI2ZmY2Q5YiIvPjxwYXRoIGQ9Ik00NDAuNjU2IDMyOS4xMzdINzEuMzQ0UzM3Ljc3IDM2Mi43MTEgMzcuNzcgMzk2LjI4NWMwIDAgMTE3LjUwOC02Ny4xNDggMTQyLjY4OSA0MS45NjcgNS4xMDMgMjIuMTE2IDguMzkzIDc1LjU0MSA3NS41NDEgNTAuMzYxIDY3LjE0OCAyNS4xOCA3MC40MzgtMjguMjQ1IDc1LjU0MS01MC4zNjEgMjUuMTgtMTA5LjExNSAxNDIuNjg5LTQxLjk2NyAxNDIuNjg5LTQxLjk2Ny0uMDAxLTMzLjU3NC0zMy41NzQtNjcuMTQ4LTMzLjU3NC02Ny4xNDh6IiBmaWxsPSIjZmZkZWI3Ii8+PHBhdGggZD0iTTI5OC41OTYgMTU5LjQ3NVM0MjQuNDk4IDAgNDY2LjQ2NSAwYzI1LjE4IDAtMTYuNzg3IDIwMS40NDMtNDEuOTY3IDI2OC41OUwyOTguNTk2IDE1OS40NzV6IiBmaWxsPSIjZmY4YzQ2Ii8+PHBhdGggZD0iTTQ2Ni40NjUgMEMzODIuNTMgNTguNzU0IDM0OC45NTYgMjAxLjQ0MyAzNDguOTU2IDIwMS40NDNsLTIuODg5LS44MjYtNDcuNDcxLTQxLjE0MUMyOTguNTk2IDE1OS40NzUgNDI0LjQ5NyAwIDQ2Ni40NjUgMHoiIGZpbGw9IiNmZmE1NGIiLz48cGF0aCBkPSJNMjA1LjAxIDE1OS40NzVTNzkuMTA4IDAgMzcuMTQxIDBjLTI1LjE4IDAgMTYuNzg3IDIwMS40NDMgNDEuOTY3IDI2OC41OUwyMDUuMDEgMTU5LjQ3NXoiIGZpbGw9IiNmZjhjNDYiLz48ZyBmaWxsPSIjZmZhNTRiIj48cGF0aCBkPSJNMzcuMTQxIDBjODMuOTM0IDU4Ljc1NCAxMTcuNTA4IDIwMS40NDMgMTE3LjUwOCAyMDEuNDQzbDIuODg5LS44MjYgNDcuNDcxLTQxLjE0MUMyMDUuMDEgMTU5LjQ3NSA3OS4xMDggMCAzNy4xNDEgMHoiLz48cGF0aCBkPSJNMTIuNTkgMzg2LjA5OHM5Mi4zMjgtNTguNzU0IDE1OS40NzUtMTYuNzg3YzM1LjU4OCAyMi4yNDMgMjUuMTggODMuNTg1IDgzLjkzNCA4My41ODVzNDguMzQ2LTYxLjM0MiA4My45MzQtODMuNTg1YzY3LjE0OC00MS45NjcgMTU5LjQ3NSAxNi43ODcgMTU5LjQ3NSAxNi43ODctNDEuOTY3LTE1MS4wODItMTQ4LjQ3Ni0yNTEuODAzLTI0My40MDktMjUxLjgwM1M1NC41NTcgMjM1LjAxNiAxMi41OSAzODYuMDk4eiIvPjwvZz48ZyBmaWxsPSIjNDY0NjU1Ij48Y2lyY2xlIGN4PSIxODguODUyIiBjeT0iMzI3LjM0NCIgcj0iMTYuNzg3Ii8+PGNpcmNsZSBjeD0iMzIzLjE0OCIgY3k9IjMyNy4zNDQiIHI9IjE2Ljc4NyIvPjxwYXRoIGQ9Ik0yODUuMzc3IDQ0OC4xNzRjMCAxMC4xNC0xMy4xNTMgMjUuNzA1LTI5LjM3NyAyNS43MDVzLTI5LjM3Ny0xNS41NjUtMjkuMzc3LTI1LjcwNWMwLTEwLjE0IDEzLjE1My0xOC4zNjEgMjkuMzc3LTE4LjM2MSAxNi4yMjQgMCAyOS4zNzcgOC4yMjEgMjkuMzc3IDE4LjM2MXoiLz48L2c+PC9zdmc+"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIuMDAxIDUxMi4wMDEiPjxwYXRoIGQ9Ik00NDUuOTM2IDUzLjY3OGMzMy4wMzIgMCA2Ni4wNjUgMTMuMDE1IDY2LjA2NSAyNC43NzQgMCAxMy40MTktMzAuMjc5IDQ5LjU0OC01Ny44MDcgNDkuNTQ4LTMyLjUxNiAwLTQ5LjU0OCA4LjI1OC01Ny44MDcgMjQuNzc0bC00MS4yOS03NC4zMjNjNDkuNTQ5IDE2LjUxNyA0OS41NDktMjQuNzczIDkwLjgzOS0yNC43NzN6bS0zNzkuODcxIDBDMzMuMDMyIDUzLjY3OCAwIDY2LjY5MiAwIDc4LjQ1MiAwIDkxLjg3MSAzMC4yNzkgMTI4IDU3LjgwNyAxMjhjMzIuNTE2IDAgNDkuNTQ4IDguMjU4IDU3LjgwNyAyNC43NzRsNDEuMjktNzQuMzIzYy00OS41NDkgMTYuNTE3LTQ5LjU0OS0yNC43NzMtOTAuODM5LTI0Ljc3M3oiIGZpbGw9IiNlYmI0YTAiLz48ZyBmaWxsPSIjZmZlYmQyIj48cGF0aCBkPSJNNDQ1LjkzNiA1My42NzhjLTMzLjExNiAwLTM5LjcyMSAyNi40OTgtNjYuNTggMjguNDk1LTcuNjg3LTUuNTQtMTYuNjM4LTkuNTU4LTI2LjUzMS0xMS40MTEtMjUuNjUtNC44MDMtNTguNTU2LTguODI2LTk2LjgyNS04LjgyNnMtNzEuMTc1IDQuMDIzLTk2LjgyNSA4LjgyN2MtOS44OTIgMS44NTMtMTguODQzIDUuODctMjYuNTMxIDExLjQxMS0yNi44NTgtMS45OTctMzMuNDY1LTI4LjQ5Ni02Ni41OC0yOC40OTYtMTkuMzA1IDAtMzguNTU5IDQuNDU3LTUxLjI3IDEwLjUgMjEuNTA2LTUuNjg0IDM5LjIyMS02LjI1OSA1MS4yNy0yLjI0MiAxNi45MDEgNS42MzQgMzMuNzg2IDM0LjMwNSA0Mi44MjEgNTEuOTc0LTMuMjEgOS4xMzktNC40OTkgMTkuMDk2LTMuMzI5IDI5LjMzMmwyMi4wOCAyMDAuMDY5YTgyLjU4IDgyLjU4IDAgMCAwIDM5LjU5NCA2MS43NTNsNDYuMjggMjcuNzY4YTgyLjU4MyA4Mi41ODMgMCAwIDAgODQuOTc2IDBsNDYuMjgtMjcuNzY4YTgyLjU4IDgyLjU4IDAgMCAwIDM5LjU5NC02MS43NTNsMjIuMDgtMjAwLjA2OWMxLjE3LTEwLjIzNi0uMTE4LTIwLjE5My0zLjMyOS0yOS4zMzIgOS4wMzYtMTcuNjY5IDI1LjkyMi00Ni4zNDEgNDIuODIzLTUxLjk3NCAxMi4wNS00LjAxNyAyOS43NjMtMy40NDEgNTEuMjcgMi4yNDItMTIuNzA5LTYuMDQzLTMxLjk2Mi0xMC41LTUxLjI2OC0xMC41eiIvPjxwYXRoIGQ9Ik0yNzIuNTE3IDQ1OC4zMjRoLTMzLjAzMmMtMTguMjQzIDAtMzMuMDMyLTE0Ljc4OS0zMy4wMzItMzMuMDMydi0xNi41MTZjMC0xOC4yNDMgMTQuNzg5LTMzLjAzMiAzMy4wMzItMzMuMDMyaDMzLjAzMmMxOC4yNDMgMCAzMy4wMzIgMTQuNzg5IDMzLjAzMiAzMy4wMzJ2MTYuNTE2YzAgMTguMjQyLTE0Ljc4OSAzMy4wMzItMzMuMDMyIDMzLjAzMnoiLz48L2c+PHBhdGggZD0iTTMwMS42ODYgMjM1LjA4N2MtMi41LTIzLjMzLTIyLjE4OS00MS4wMjItNDUuNjU0LTQxLjAyMmgtLjA2NGMtMjMuNDY0IDAtNDMuMTU0IDE3LjY5Mi00NS42NTQgNDEuMDIzTDE5Mi4zMiA0MDMuMDNjLTEuMjc0IDExLjg5MSA4LjA0NCAyMi4yNjEgMjAuMDAzIDIyLjI2MWgxMy41MTRhNTcuOCA1Ny44IDAgMCAwIDI1Ljg1Mi02LjEwM2w0LjMxMS0yLjE1NSA0LjMxMSAyLjE1NWE1Ny44MSA1Ny44MSAwIDAgMCAyNS44NTIgNi4xMDNoMTMuNTE0YzExLjk1OSAwIDIxLjI3Ny0xMC4zNyAyMC4wMDItMjIuMjZsLTE3Ljk5My0xNjcuOTQ0eiIgZmlsbD0iI2ZmZiIvPjxnIGZpbGw9IiM0NjQ2NTUiPjxjaXJjbGUgY3g9IjE0OC42NDUiIGN5PSIxOTQuMDY1IiByPSIxNi41MTYiLz48Y2lyY2xlIGN4PSIzNjMuMzU2IiBjeT0iMTk0LjA2NSIgcj0iMTYuNTE2Ii8+PHBhdGggZD0iTTI5Ni43NDUgMzY5Ljk4NWMuMTQ3LS40NTUuMzk4LS44NzkuNDY1LTEuMzUyLjEwOC0uNzczLS4wMS0xLjU1Ni0uMTIzLTIuMzMzLS4wNC0uMjc3LjAyNC0uNTU1LS4wNDQtLjgyNy0uMTI5LS41MTEtLjQ2NC0uOTY1LS42OTQtMS40NTEtLjIzNy0uNTA1LS4zNzEtMS4wNDItLjcxOS0xLjUwNWwtLjAwNy0uMDA2di0uMDAxYy0yLjU3MS0zLjQyNi03LjI2Ni00LjE1Ny0xMC44MzItMS45NjktLjIzNC4xNDItLjUwMi4xNzktLjcyNi4zNDdsLTEuOTY3IDEuNDg2LTEuMjEyLjkxNWMtMTQuNjA0IDExLjAwOS0zNS4wMTcgMTEuMDQtNDkuNjUyLjA3NGwtMy4zMTUtMi40ODRjLTEuNzY2LTEuMzI1LTMuODg2LTEuNzk1LTUuOTE2LTEuNTU1LS4wNjguMDA4LS4xMzYtLjAyLS4yMDQtLjAxLS40MzUuMDYzLS44MjMuMjk5LTEuMjQzLjQzLTEuNjAyLjQ5NS0zLjExIDEuMzQxLTQuMTkzIDIuNzg4YTguMjQyIDguMjQyIDAgMCAwIDEuNjU0IDExLjU1NmwzLjMwNiAyLjQ4NGMuMDEuMDA4LjAyMi4wMTIuMDMzLjAyMWwyOS42OTMgMjIuMjdhOC4yNjMgOC4yNjMgMCAwIDAgOS41NC4yNjdjMS44NTMtMS4yNCAyMC44MDItMTUuNTI1IDMwLjIzMy0yMi42NDguMDEtLjAwOC4wMjMtLjAxMy4wMzMtLjAyMmwzLjE0NS0yLjM3OS4wMDUtLjAwNi4wMDItLjAwMmMuMTQ4LS4xMTEuMjE1LS4yOC4zNTMtLjM5OC43MTEtLjYxNSAxLjM3MS0xLjI3NiAxLjgyLTIuMDUzLjI5NS0uNTA5LjM4Ny0xLjA4NS41NjUtMS42Mzd6Ii8+PC9nPjwvc3ZnPg=="

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNTEyIDI5My4xNjFjMCA4NC4zNzUtMTE0LjYxNSAxNjUuMTYyLTI1Ni4wMDEgMTY1LjE2MlMwIDM3Ny41MzYgMCAyOTMuMTYxQzAgMTg1Ljc0MSA0Ni4yMDMgNzAuMTkzIDI1Ni4wMDEgNzAuMTkzUzUxMiAxODUuNzQxIDUxMiAyOTMuMTYxeiIgZmlsbD0iI2Q3YmU5NiIvPjxwYXRoIGQ9Ik00OS41NDggMjgwLjc3NGMwIDc5LjgxNCAxNTEuMDcgMTQ0LjUxNiAyMDYuNDUyIDE0NC41MTZzMjA2LjQ1Mi02NC43MDIgMjA2LjQ1Mi0xNDQuNTE2SDQ5LjU0OHoiIGZpbGw9IiNiYmEzODYiLz48cGF0aCBkPSJNMjU2LjAwMSA1My42NzdjMjMxLjc1OSAwIDI0Ny43NDIgMTIzLjg3MSAyNDcuNzQyIDE4MS42NzhzLTIzLjk3NSA5OS4wOTctNTUuOTQxIDkwLjgzOWMwIDAtMTEuMzIyLTguMjU4LTU1Ljk0Mi04LjI1OC01My45NDQgMC03OC41ODUgNDEuMjktMTM1Ljg1OSA0MS4yOXMtODEuOTE1LTQxLjI5LTEzNS44NTktNDEuMjljLTQ0LjYyIDAtNTUuOTQxIDguMjU4LTU1Ljk0MSA4LjI1OC0zMS45NjcgOC4yNTgtNTUuOTQyLTMzLjAzMi01NS45NDItOTAuODM5UzI0LjI0MiA1My42NzcgMjU2LjAwMSA1My42Nzd6IiBmaWxsPSIjOWY4OTc2Ii8+PGcgZmlsbD0iIzQ2NDY1NSI+PHBhdGggZD0iTTIzMS4yMjYgMjYwLjEyOWE4LjI1MyA4LjI1MyAwIDAgMS04LjI1OC04LjI1OHYtOC4yNThhOC4yNTMgOC4yNTMgMCAwIDEgOC4yNTgtOC4yNTggOC4yNTMgOC4yNTMgMCAwIDEgOC4yNTggOC4yNTh2OC4yNThhOC4yNTMgOC4yNTMgMCAwIDEtOC4yNTggOC4yNTh6bTQ5LjU0OSAwYTguMjUzIDguMjUzIDAgMCAxLTguMjU4LTguMjU4di04LjI1OGE4LjI1MyA4LjI1MyAwIDAgMSA4LjI1OC04LjI1OCA4LjI1MyA4LjI1MyAwIDAgMSA4LjI1OCA4LjI1OHY4LjI1OGE4LjI1MyA4LjI1MyAwIDAgMS04LjI1OCA4LjI1OHoiLz48Y2lyY2xlIGN4PSIxNDAuMzg3IiBjeT0iMjEwLjU4MSIgcj0iMjQuNzc0Ii8+PGNpcmNsZSBjeD0iMzcxLjYxNCIgY3k9IjIxMC41ODEiIHI9IjI0Ljc3NCIvPjwvZz48L3N2Zz4="

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIuMDAxIDUxMi4wMDEiPjxwYXRoIGQ9Ik0zMDQuODA0IDQ3MS4zNjZoLTk3LjYyMXMtLjc1LjA1OSAwIDEwLjE1OWMxLjE2MiAxNS42NjEgMjEuODU0IDMwLjQ3NiA0OC44MSAzMC40NzZoLjExM2MyNi44MzMgMCA0Ny40MjktMTQuODE1IDQ4LjU4Ni0zMC40NzYuNzQ2LTEwLjEwMS4xMTItMTAuMTU5LjExMi0xMC4xNTl6IiBmaWxsPSIjZmZkZWI3Ii8+PHBhdGggZD0iTTM1NC4xNTYgNTguNTA3Yy0xOC41NTMgMjAuMzU4LTE2LjMzMiA1Mi4xMTQgNC42OTUgNjkuOTA2bDQ5LjY2IDQyLjAxOWM2LjAzMS04OS40MjQtMi42MDQtMTQ0LjgyMS0xMC4wNzEtMTUzLjc5Ny03LjEwNSAzLjEzMi0yNC41OTMgMjAuMjY2LTQ0LjI4NCA0MS44NzJ6TTExMy41NiAxNi42MzVjLTcuNDY5IDguOTc2LTE2LjEwNCA2NC4zNzMtMTAuMDcxIDE1My43OTdsNDkuNjYtNDIuMDE5YzIxLjAyNy0xNy43OTEgMjMuMjQ3LTQ5LjU0NyA0LjY5NS02OS45MDYtMTkuNjktMjEuNjA2LTM3LjE3OS0zOC43NC00NC4yODQtNDEuODcyeiIgZmlsbD0iI2MzYjliMSIvPjxwYXRoIGQ9Ik0zNDUuMzk4IDQ1NS4xMTJjMTcuNzc4LTQwLjEyNyA3My4xNDMtMzIuNTA4IDczLjE0My0zMi41MDh2LTI0LjM4MWw0OC43NjIgMzIuNTA4di01Ni44ODlsMjQuMzgxIDguMTI3YzAtMzUuNzYyLTE2LjExNy0xNDIuNTE5LTc2Ljc3LTIyMC43MjUtODAuMTItMTAzLjMwNy0yMzcuNzA3LTEwMy4zMDctMzE3LjgyNyAwLTYwLjY1MyA3OC4yMDUtNzYuNzcgMTg0Ljk2Mi03Ni43NyAyMjAuNzI1bDI0LjM4MS04LjEyN3Y1Ni44ODlsNDguNzYyLTMyLjUwOHYyNC4zODFzNTUuMzY1LTcuNjE5IDczLjE0MyAzMi41MDhsMzIuNTA4LTguMTI3aDk3LjUyNGw0OC43NjMgOC4xMjd6IiBmaWxsPSIjZmZlYmQyIi8+PHBhdGggZD0iTTE2Ny40NSAzNDAuMjcxbDcyLjI5NyA5OC41ODdWMjI3LjU1Nkg1Ny43NzRDMjkuMDY3IDI5MS4wMyAyMC4zMTggMzU1LjY4IDIwLjMxOCAzODEuOTY5bDI0LjM4MS04LjEyN3Y1Ni44ODljMjMuMzktNTEuNDU2IDU0Ljg1NS04MS4zNzIgNzcuMzUyLTk3LjQ5NyAxNC41ODQtMTAuNDU0IDM0Ljc4Ny03LjQzMyA0NS4zOTkgNy4wMzd6bTE3Ny4xMDEgMGwtNzIuMjk3IDk4LjU4N1YyMjcuNTU2aDE4MS45NzNjMjguNzA2IDYzLjQ3NCAzNy40NTYgMTI4LjEyNCAzNy40NTYgMTU0LjQxM2wtMjQuMzgxLTguMTI3djU2Ljg4OWMtMjMuMzg5LTUxLjQ1Ni01NC44NTUtODEuMzcyLTc3LjM1Mi05Ny40OTctMTQuNTg1LTEwLjQ1NC0zNC43ODgtNy40MzMtNDUuMzk5IDcuMDM3eiIgZmlsbD0iI2MzYjliMSIvPjxwYXRoIGQ9Ik0yOTYuNjM2IDMwOC44MjZoLTgxLjI3Yy04LjYzNSA0Ni42NDItMzIuNTA4IDgxLjEwNC0zMi41MDggMTMzLjcwNiAwIDMyLjE4NiAyNC4zODEgNDQuNTg2IDQwLjYzNSA0NC41ODZzMzIuNTA4LTcuNjI1IDMyLjUwOC03LjYyNSAxNi4yNTQgNy42MjUgMzIuNTA4IDcuNjI1IDQwLjYzNS0xMi40IDQwLjYzNS00NC41ODZjMC01Mi42MDItMjMuODc0LTg3LjA2NC0zMi41MDgtMTMzLjcwNnoiIGZpbGw9IiNmZmViZDIiLz48cGF0aCBkPSJNNDI0LjUwOCAxNzQuMzk2YzUuMDE3LTcyLjk1MyAxLjcxNy0xNTEuNTA5LTE0LjY4NS0xNjkuMzRDNDA1Ljk4Ljg3NyA0MDEuOTAyIDAgMzk5LjE2MyAwYy0xNi4xOTkgMC02MC4yMjMgNDkuNjExLTg5LjA2OCA4NC4zNWwtLjQ5OC0uMTY5Yy0zNC42NjMtMTEuNzItNzIuNTMxLTExLjcyLTEwNy4xOTQgMGwtLjQ5OC4xNjlDMTczLjA2IDQ5LjYxMSAxMjkuMDM2IDAgMTEyLjgzNyAwYy0yLjczOCAwLTYuODE4Ljg3Ny0xMC42NTkgNS4wNTYtMTYuNDAyIDE3LjgzMi0xOS43MDMgOTYuMzg2LTE0LjY4NSAxNjkuMzQtNTIuNzcgNzYuNTg5LTY3LjE3NiAxNzMuNzc4LTY3LjE3NiAyMDcuNTczIDQzLjQ3NS05OS4zNzIgMTA1LjkzNS0xMzIuMjk1IDEzMi45NzMtMTQyLjI5NyA3LjYxOS0yLjgxOCAxNS42NTgtNC4xMzkgMjMuNzk0LTMuOTc2IDEyLjgzOS4yNTcgMjMuMzQzIDEwLjQyNiAyNC45NDggMjMuMTY2bDIxLjQ2IDE3MC4yNDJoNjUuMDE2bDIxLjQ1OS0xNzAuMjQyYzEuNjA2LTEyLjc0IDEyLjExLTIyLjkxIDI0Ljk0OS0yMy4xNjYgOC4xMzYtLjE2MyAxNi4xNzUgMS4xNTcgMjMuNzk0IDMuOTc2IDI3LjAzNiAxMC4wMDEgODkuNDk4IDQyLjkyNCAxMzIuOTczIDE0Mi4yOTcuMDAxLTMzLjc5NS0xNC40MDctMTMwLjk4NC02Ny4xNzUtMjA3LjU3M3pNMTEzLjU2IDE2LjYzNWM3LjEwNSAzLjEzMiAyNC41OTMgMjAuMjY2IDQ0LjI4NCA0MS44NzIgNy41NDcgOC4yODEgMTEuNjM5IDE4LjQ0NyAxMi40MzQgMjguNzk0LjQ4NiA2LjMxNC0yLjcyMyAxMi4yNDktOC4xNiAxNS40OTYtMjMuMyAxMy45MTEtNDMgMzEuNzI1LTU5LjU2NSA1MS43NDUtNC4wNDktODAuMDc0IDMuOTkyLTEyOS40NzUgMTEuMDA3LTEzNy45MDd6bTI0MC41OTcgNDEuODcyYzE5LjY5LTIxLjYwOCAzNy4xNzktMzguNzQgNDQuMjg0LTQxLjg3MiA3LjAxNSA4LjQzMiAxNS4wNTUgNTcuODMzIDExLjAwNiAxMzcuOTA3LTE2LjU2NS0yMC4wMjEtMzYuMjY2LTM3LjgzMy01OS41NjUtNTEuNzQ1LTUuNDM3LTMuMjQ3LTguNjQ1LTkuMTgyLTguMTYtMTUuNDk2Ljc5Ni0xMC4zNDUgNC44ODctMjAuNTEyIDEyLjQzNS0yOC43OTR6IiBmaWxsPSIjODc4NzkxIi8+PGcgZmlsbD0iIzQ2NDY1NSI+PGNpcmNsZSBjeD0iMTc0LjczMSIgY3k9IjI2OC4xOTEiIHI9IjE2LjI1NCIvPjxjaXJjbGUgY3g9IjMzNy4yNzEiIGN5PSIyNjguMTkxIiByPSIxNi4yNTQiLz48cGF0aCBkPSJNMjg4LjUwOSA0MjkuMTA2YzAgMTUuNzEtMTQuNTU0IDM0LjEzMy0zMi41MDggMzQuMTMzcy0zMi41MDgtMTguNDI0LTMyLjUwOC0zNC4xMzNjMC0xNS43MSAxNC41NTQtMjIuNzU2IDMyLjUwOC0yMi43NTYgMTcuOTUzIDAgMzIuNTA4IDcuMDQ2IDMyLjUwOCAyMi43NTZ6Ii8+PC9nPjwvc3ZnPg=="

/***/ })
],[12]);
//# sourceMappingURL=bundle.fc608f2b994e01ba3573.js.map