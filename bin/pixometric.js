/*!
 * pixometric - v0.0.3
 * Compiled Tue, 04 Jul 2017 17:14:16 UTC
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
     * @todo Add option to disable rotation for better performance
     * @todo Frustrum culling
     * @todo Top-down view
     * @memberof World
     */
    function World() {
        _classCallCheck(this, World);

        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, _chunk2.default);

        // 0 - 3
        this.rotation = 3;
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
                for (var y = 0; y < this.aoL[0].length; y++) {
                    // Calculate rotated real coordinates, without specific function for performance
                    // Thanks to tulevik.EU (http://www.indiedb.com/games/office-management-101/features/rotating-a-25d-isometric-map)
                    switch (this.rotation) {
                        case 0:
                            var chunkX = x;
                            var chunkY = y;
                            break;
                        case 1:
                            var chunkX = this.aoL.length - y - 1;
                            var chunkY = x;
                            break;
                        case 2:
                            var chunkX = this.aoL.length - x - 1;
                            var chunkY = this.aoL[0].length - y - 1;
                            break;
                        case 3:
                            var chunkX = y;
                            var chunkY = this.aoL[0].length - x - 1;
                    }

                    // Voxels in current chunk
                    for (var i = 0; i < this.aoL[chunkX][chunkY].voxels.length; i++) {
                        // Calculate position from 1d index
                        var voxelZ = i % 16;
                        var voxelY = Math.floor(i / 16) % 16;
                        var voxelX = Math.floor(i / (16 * 16));

                        // Calculate rotated real voxel coordinates
                        // TODO: Optimize this 
                        switch (this.rotation) {
                            case 0:
                                var tmpX = voxelX;
                                var tmpY = voxelY;
                                break;
                            case 1:
                                var tmpX = 16 - voxelY - 1;
                                var tmpY = voxelX;
                                break;
                            case 2:
                                var tmpX = 16 - voxelX - 1;
                                var tmpY = 16 - voxelY - 1;
                                break;
                            case 3:
                                var tmpX = voxelY;
                                var tmpY = 16 - voxelX - 1;
                        }

                        var voxelIndex = voxelZ + tmpY * 16 + tmpX * 16 * 16;

                        // Get voxel block value
                        var voxelValue = this.aoL[chunkX][chunkY].voxels[voxelIndex];

                        // Check if current voxel is not air
                        if (voxelValue != 0) {
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

        /**
         * Rotate world
         * @todo Optimize this
         * @param {Number} rotation 
         * @memberof World
         */

    }, {
        key: "rotate",
        value: function rotate(rotation) {
            this.rotation = rotation;
            for (var x = 0; x < this.aoL.length; x++) {
                for (var y = 0; y < this.aoL[0].length; y++) {
                    for (var i = 0; i < this.aoL[0][0].sprites.length; i++) {
                        if (this.aoL[x][y].sprites[i]) {
                            this.aoL[x][y].sprites[i].destroy();
                        }
                    }
                }
            }
            this.generateSprites();
        }

        /**
         * Cull none visible voxels (behind each other)
         * 
         * @memberof World
         */

    }, {
        key: "occlusionCulling",
        value: function occlusionCulling() {
            // Check "top"
            for (var chunkX = 0; chunkX < this.aoL.length; chunkX++) {
                for (var chunkY = 0; chunkY < this.aoL[0].length; chunkY++) {
                    for (var x = 0; x < 16; x++) {
                        for (var y = 0; y < 16; y++) {
                            this.cull(chunkX, chunkY, x, y, 15);
                        }
                    }
                }
            }

            // Check "left"
            for (var chunkX = 0; chunkX < this.aoL.length; chunkX++) {
                for (var x = 0; x < 16; x++) {
                    for (var z = 0; z < 15; z++) {
                        this.cull(chunkX, this.aoL[0].length - 1, x, 15, z);
                    }
                }
            }

            // Check "right"
            for (var chunkY = 0; chunkY < this.aoL[0].length; chunkY++) {
                for (var y = 0; y < 16; y++) {
                    for (var z = 0; z < 15; z++) {
                        this.cull(this.aoL.length - 1, chunkY, 15, y, z);
                    }
                }
            }
        }
    }, {
        key: "cull",
        value: function cull(chunkX, chunkY, x, y, z) {
            var found = false;

            while (true) {
                if (z < 0) {
                    break;
                }

                if (y < 0) {
                    if (chunkY - 1 < 0) {
                        break;
                    } else {
                        chunkY--;
                        y = 15;
                    }
                }

                if (x < 0) {
                    if (chunkX - 1 < 0) {
                        break;
                    } else {
                        chunkX--;
                        x = 15;
                    }
                }

                // Calculate 1D index
                var index = z + y * 16 + x * 16 * 16;

                if (this.aoL[chunkX][chunkY].voxels[index] != 0) {
                    if (found) {
                        if (this.aoL[chunkX][chunkY].sprites[index]) {
                            this.aoL[chunkX][chunkY].sprites[index].visible = false;
                        }
                    } else {
                        found = true;
                    }
                }

                x--;
                y--;
                z--;
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
