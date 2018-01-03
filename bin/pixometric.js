/*!
 * pixometric - v0.0.3
 * Compiled Thu, 24 Aug 2017 19:55:33 UTC
 *
 * pixometric is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pixometric = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    CHUNK: {
        SIZE: 16,
        HEIGHT: 16
    },
    SPRITE: {
        SIZE: 32
    }
};

exports.default = config;

},{}],2:[function(require,module,exports){
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

},{"../world/world":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = require("../helpers/array");

var ArrayHelpers = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Segment of World
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

  this.voxels = ArrayHelpers.generateFilled(Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.HEIGHT, 1);
  this.x = x;
  this.y = y;
};

exports.default = Chunk;

},{"../helpers/array":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generateSprites;
/**
 * Generate PIXI sprites from Area of Interest
 * 
 * @export
 * @param {Chunk[][]} aoL 
 * @param {Number} rotation 
 */
function generateSprites(aoL, rotation) {
    // AoL Chunk x
    for (var x = 0; x < aoL.length; x++) {
        // AoL Chunk y
        for (var y = 0; y < aoL[0].length; y++) {
            // Calculate rotated real coordinates, without specific function for performance
            // Thanks to tulevik.EU (http://www.indiedb.com/games/office-management-101/features/rotating-a-25d-isometric-map)
            switch (rotation) {
                case 0:
                    var chunkX = x;
                    var chunkY = y;
                    break;
                case 1:
                    var chunkX = aoL.length - y - 1;
                    var chunkY = x;
                    break;
                case 2:
                    var chunkX = aoL.length - x - 1;
                    var chunkY = aoL[0].length - y - 1;
                    break;
                case 3:
                    var chunkX = y;
                    var chunkY = aoL[0].length - x - 1;
            }
            // Create container for chunk
            var chunkContainer = new PIXI.Container();

            // Add container to scene
            Pixometric.stage.addChild(chunkContainer);

            // Add reference to current chunk
            aoL[chunkX][chunkY].container = chunkContainer;

            // Voxels in current chunk
            for (var i = 0; i < aoL[chunkX][chunkY].voxels.length; i++) {
                // Calculate position from 1d index
                var voxelZ = i % Pixometric.config.CHUNK.SIZE;
                var voxelY = Math.floor(i / Pixometric.config.CHUNK.SIZE) % Pixometric.config.CHUNK.SIZE;
                var voxelX = Math.floor(i / (Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE));

                // Calculate rotated real voxel coordinates
                // TODO: Optimize this 
                switch (rotation) {
                    case 0:
                        var tmpX = voxelX;
                        var tmpY = voxelY;
                        break;
                    case 1:
                        var tmpX = Pixometric.config.CHUNK.SIZE - voxelY - 1;
                        var tmpY = voxelX;
                        break;
                    case 2:
                        var tmpX = Pixometric.config.CHUNK.SIZE - voxelX - 1;
                        var tmpY = Pixometric.config.CHUNK.SIZE - voxelY - 1;
                        break;
                    case 3:
                        var tmpX = voxelY;
                        var tmpY = Pixometric.config.CHUNK.SIZE - voxelX - 1;
                }

                var voxelIndex = voxelZ + tmpY * Pixometric.config.CHUNK.SIZE + tmpX * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE;

                // Get voxel block value
                var voxelValue = aoL[chunkX][chunkY].voxels[voxelIndex];

                // Check if current voxel is not air
                if (voxelValue != 0) {
                    // Calculate sprite position
                    // Thanks Clint Bellanger (http://clintbellanger.net/articles/isometric_math/)
                    var spriteX = (voxelX - voxelY + (x - y) * Pixometric.config.CHUNK.SIZE) * (Pixometric.config.SPRITE.SIZE / 2);
                    var spriteY = (voxelX + voxelY + (x + y) * Pixometric.config.CHUNK.SIZE) * (Pixometric.config.SPRITE.SIZE / 4) - voxelZ * (Pixometric.config.SPRITE.SIZE / 2);

                    // Create sprite from current block value
                    var sprite = new PIXI.Sprite(Pixometric.textures[Pixometric.textureLookup[voxelValue - 1]]);

                    // Set calculated values as position
                    sprite.x = spriteX;
                    sprite.y = spriteY;

                    // Add sprite to the container
                    chunkContainer.addChild(sprite);
                }
            }
        }
    }
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = occlusionCulling;

/**
 * Cull none visible voxels (behind each other)
 * 
 * @export
 * @param {Chunk[][]} aoL 
 */
function occlusionCulling(aoL) {
    // Check "top"
    for (var chunkX = 0; chunkX < aoL.length; chunkX++) {
        for (var chunkY = 0; chunkY < aoL[0].length; chunkY++) {
            for (var x = 0; x < Pixometric.config.CHUNK.SIZE; x++) {
                for (var y = 0; y < Pixometric.config.CHUNK.SIZE; y++) {
                    cull(aoL, chunkX, chunkY, x, y, Pixometric.config.CHUNK.HEIGHT - 1);
                }
            }
        }
    }

    // Check "left"
    for (var chunkX = 0; chunkX < aoL.length; chunkX++) {
        for (var x = 0; x < Pixometric.config.CHUNK.SIZE; x++) {
            for (var z = 0; z < Pixometric.config.CHUNK.HEIGHT - 1; z++) {
                cull(aoL, chunkX, aoL[0].length - 1, x, Pixometric.config.CHUNK.SIZE, z);
            }
        }
    }

    // Check "right"
    for (var chunkY = 0; chunkY < aoL[0].length; chunkY++) {
        for (var y = 0; y < Pixometric.config.CHUNK.SIZE; y++) {
            for (var z = 0; z < Pixometric.config.CHUNK.HEIGHT - 1; z++) {
                cull(aoL, aoL.length - 1, chunkY, Pixometric.config.CHUNK.SIZE - 1, y, z);
            }
        }
    }
}

/**
 * Occlusion culling helper
 * 
 * @param {Chunk[][]} aoL
 * @param {Number} chunkX 
 * @param {Number} chunkY 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 */
function cull(aoL, chunkX, chunkY, x, y, z) {
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
                y = Pixometric.config.CHUNK.SIZE - 1;
            }
        }

        if (x < 0) {
            if (chunkX - 1 < 0) {
                break;
            } else {
                chunkX--;
                x = Pixometric.config.CHUNK.SIZE - 1;
            }
        }

        // Calculate 1D index
        var index = z + y * Pixometric.config.CHUNK.SIZE + x * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE;

        if (aoL[chunkX][chunkY].voxels[index] != 0) {
            if (found) {
                if (aoL[chunkX][chunkY].sprites[index]) {
                    aoL[chunkX][chunkY].sprites[index].visible = false;
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotate;

var _generateSprites = require("./generate-sprites");

var _generateSprites2 = _interopRequireDefault(_generateSprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Rotate world
 * 
 * @export
 * @param {Chunk[][]} aoL 
 * @param {Number} rotation 
 */
function rotate(aoL, rotation) {
    for (var x = 0; x < aoL.length; x++) {
        for (var y = 0; y < aoL[0].length; y++) {
            for (var i = 0; i < aoL[0][0].sprites.length; i++) {
                if (aoL[x][y].sprites[i]) {
                    aoL[x][y].sprites[i].destroy();
                }
            }
        }
    }

    (0, _generateSprites2.default)(aoL, rotation);
}

},{"./generate-sprites":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chunk = require("./chunk");

var _chunk2 = _interopRequireDefault(_chunk);

var _occulusionCulling = require("./manipulation/occulusion-culling");

var _occulusionCulling2 = _interopRequireDefault(_occulusionCulling);

var _generateSprites2 = require("./manipulation/generate-sprites");

var _generateSprites3 = _interopRequireDefault(_generateSprites2);

var _rotate2 = require("./manipulation/rotate");

var _rotate3 = _interopRequireDefault(_rotate2);

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
     * @param {Function} loadChunkCB Callback loading function
     * @memberof World
     */
    function World(loadChunkCB) {
        _classCallCheck(this, World);

        // Area of Interest, size need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2D(3, 3);

        // Rotation of world, 0 - 3
        this.rotation = 3;

        this.offset = {
            x: 0,
            y: 0
        };

        this.loadChunkCB = loadChunkCB;

        for (var x = 0; x < this.aoL.length; x++) {
            for (var y = 0; y < this.aoL[0].length; y++) {
                this.aoL[x][y] = loadChunkCB(x, y);
            }
        }
    }

    /**
     * Occlusion cullling algorithm
     * 
     * @memberof World
     */


    _createClass(World, [{
        key: "occlusionCulling",
        value: function occlusionCulling() {
            (0, _occulusionCulling2.default)(this.aoL);
        }

        /**
         * Generate PIXI sprites from Area of Interest
         * 
         * @memberof World
         */

    }, {
        key: "generateSprites",
        value: function generateSprites() {
            (0, _generateSprites3.default)(this.aoL, this.rotation);
        }

        /**
         * Rotate world
         * 
         * @param {Number} rotation 
         * @memberof World
         */

    }, {
        key: "rotate",
        value: function rotate(rotation) {
            this.rotation = rotation;
            (0, _rotate3.default)(this.aoL, this.rotation);
        }
    }]);

    return World;
}();

exports.default = World;

},{"../helpers/array":3,"./chunk":4,"./manipulation/generate-sprites":5,"./manipulation/occulusion-culling":6,"./manipulation/rotate":7}],9:[function(require,module,exports){
(function (global){
"use strict";

var _core = require("./core/core");

var _core2 = _interopRequireDefault(_core);

var _config = require("./core/config");

var _config2 = _interopRequireDefault(_config);

var _world = require("./world/world");

var _world2 = _interopRequireDefault(_world);

var _chunk = require("./world/chunk");

var _chunk2 = _interopRequireDefault(_chunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add global config to Pixometric variable
_core2.default.config = _config2.default;

_core2.default.World = _world2.default;
_core2.default.Chunk = _chunk2.default;

global.Pixometric = _core2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./core/config":1,"./core/core":2,"./world/chunk":4,"./world/world":8}]},{},[9])(9)
});


//# sourceMappingURL=pixometric.js.map
