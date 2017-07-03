/*!
 * pixometric - v0.0.1
 * Compiled Mon, 03 Jul 2017 13:31:44 UTC
 *
 * pixometric is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pixometric = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _world = require("../world/world");

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixometric = function Pixometric(stage, world, textures, textureLookup) {
    _classCallCheck(this, Pixometric);

    this.world = world;

    // Make this global for easy access 
    Pixometric.stage = stage;
    Pixometric.textures = textures;
    Pixometric.textureLookup = textureLookup;
};

exports.default = Pixometric;

},{"../world/world":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generate = generate;
exports.generateFilled = generateFilled;
exports.generateFilledClasses = generateFilledClasses;
exports.generate2D = generate2D;
exports.generate2DFilled = generate2DFilled;
exports.generate2DFilledClasses = generate2DFilledClasses;
// Optimalized filling methods
// 1D

function generate(size) {
    var array;
    (array = []).length = size;
    return array.fill(0);
}

function generateFilled(size, object) {
    var array;
    (array = []).length = size;
    for (var i = 0; i < size; i++) {
        array[i] = object;
    }
    return array;
}

function generateFilledClasses(size, object) {
    var array;
    (array = []).length = size;
    for (var i = 0; i < size; i++) {
        array[i] = new object();
    }
    return array;
}

// 2D
function generate2D(width, height) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        array[x].fill(0);
    }
    return array;
}

function generate2DFilled(width, height, object) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        for (var y = 0; y < height; y++) {
            array[x][y] = object;
        }
    }
    return array;
}

function generate2DFilledClasses(width, height, object) {
    var array;
    (array = []).length = width;
    for (var x = 0; x < width; x++) {
        (array[x] = []).length = height;
        for (var y = 0; y < height; y++) {
            array[x][y] = new object();
        }
    }
    return array;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require("../helpers/array");

var ArrayHelpers = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @todo Add possibility to change Chunk dimenstions
 * @export
 * @class Chunk
 */
var Chunk =
/**
 * Creates an instance of Chunk.
 * @param {Number} x 
 * @param {Number} y 
 * @memberof Chunk
 */
function Chunk(x, y) {
  _classCallCheck(this, Chunk);

  // 16x16x16
  this.voxels = ArrayHelpers.generateFilled(4096, 1);
  this.sprites = [];
  this.x = x;
  this.y = y;
};

exports.default = Chunk;

},{"../helpers/array":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chunk = require("./chunk");

var _chunk2 = _interopRequireDefault(_chunk);

var _array = require("../helpers/array");

var ArrayHelpers = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    /**
     * Creates an instance of World.
     * @todo Rotation
     * @todo Occulusion culling
     * @todo Frustrum culling
     * @todo Top-down view
     * @memberof World
     */
    function World() {
        _classCallCheck(this, World);

        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, _chunk2.default);
    }

    /**
     * Generate PIXI sprites from Area of Interest
     * @memberof World
     */


    _createClass(World, [{
        key: "generateSprites",
        value: function generateSprites() {
            // AoL Chunk x
            for (var x = 0; x < this.aoL.length; x++) {
                // AoL Chunk y
                for (var y = 0; y < this.aoL[x].length; y++) {
                    // Voxels in current chunk
                    for (var i = 0; i < this.aoL[x][y].voxels.length; i++) {
                        // Get voxel block value
                        var voxelValue = this.aoL[x][y].voxels[i];

                        // Check if current voxel is not air
                        if (voxelValue != 0) {
                            // Calculate position from 1d index
                            var voxelZ = i % 16;
                            var voxelY = Math.floor(i / 16) % 16;
                            var voxelX = Math.floor(i / (16 * 16));

                            // Calculate sprite position
                            var spriteX = (voxelX - voxelY + (x - y) * 16) * (32 / 2);
                            var spriteY = (voxelX + voxelY + (x + y) * 16) * (32 / 4) - voxelZ * (32 / 2);

                            // Create sprite from current block value
                            var sprite = new PIXI.Sprite(Pixometric.textures[Pixometric.textureLookup[voxelValue - 1]]);

                            // Add reference to current chunk for culling and unloading
                            this.aoL[x][y].sprites[i] = sprite;

                            // Set calculated values as position
                            sprite.x = spriteX;
                            sprite.y = spriteY;

                            // Add sprite to the stage
                            Pixometric.stage.addChild(sprite);
                        }
                    }
                }
            }
        }
    }]);

    return World;
}();

exports.default = World;

},{"../helpers/array":2,"./chunk":3}],5:[function(require,module,exports){
(function (global){
"use strict";

var _core = require("./core/core");

var _core2 = _interopRequireDefault(_core);

var _world = require("./world/world");

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core2.default.World = _world2.default;

global.Pixometric = _core2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./core/core":1,"./world/world":4}]},{},[5])(5)
});


//# sourceMappingURL=pixometric.js.map
