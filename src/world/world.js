import Chunk from "./chunk";
import * as ArrayHelpers from "../helpers/array";

export default class World {
    /**
     * Creates an instance of World.
     * @todo Add option to disable rotation for better performance
     * @todo Frustrum culling
     * @todo Top-down view
     * @memberof World
     */
    constructor() {
        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, Chunk);
        
        // 0 - 3
        this.rotation = 3;
    }

    /**
     * Generate PIXI sprites from Area of Interest
     * @memberof World
     */
    generateSprites() {
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
                    var voxelZ = i % Pixometric.config.CHUNK.SIZE;
                    var voxelY = (Math.floor(i / Pixometric.config.CHUNK.SIZE)) % Pixometric.config.CHUNK.SIZE;
                    var voxelX = Math.floor(i / (Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE));

                    // Calculate rotated real voxel coordinates
                    // TODO: Optimize this 
                    switch (this.rotation) {
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
                    var voxelValue = this.aoL[chunkX][chunkY].voxels[voxelIndex];

                    // Check if current voxel is not air
                    if (voxelValue != 0) {
                        // Calculate sprite position
                        var spriteX = ((voxelX - voxelY) + (x - y) * Pixometric.config.CHUNK.SIZE) * (32 / 2);
                        var spriteY = ((voxelX + voxelY) + (x + y) * Pixometric.config.CHUNK.SIZE) * (32 / 4) - voxelZ * (32 / 2);
                        
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
    rotate(rotation) {
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
    occlusionCulling() {
        // Check "top"
        for (var chunkX = 0; chunkX < this.aoL.length; chunkX++) {
            for (var chunkY = 0; chunkY < this.aoL[0].length; chunkY++) {
                for (var x = 0; x < Pixometric.config.CHUNK.SIZE; x++) {
                    for (var y = 0; y < Pixometric.config.CHUNK.SIZE; y++) {
                        this.cull(chunkX, chunkY, x, y, Pixometric.config.CHUNK.HEIGHT - 1);
                    }
                }
            }
        }

        // Check "left"
        for (var chunkX = 0; chunkX < this.aoL.length; chunkX++) {
            for (var x = 0; x < Pixometric.config.CHUNK.SIZE; x++) {
                for (var z = 0; z < Pixometric.config.CHUNK.HEIGHT - 1; z++) {
                    this.cull(chunkX, this.aoL[0].length - 1, x, Pixometric.config.CHUNK.SIZE, z);
                }
            } 
        }
        
        // Check "right"
        for (var chunkY = 0; chunkY < this.aoL[0].length; chunkY++) {
            for (var y = 0; y < Pixometric.config.CHUNK.SIZE; y++) {
                for (var z = 0; z < Pixometric.config.CHUNK.HEIGHT - 1; z++) {
                    this.cull(this.aoL.length - 1, chunkY, Pixometric.config.CHUNK.SIZE - 1, y, z);
                }
            }
        }
    }

    cull(chunkX, chunkY, x, y, z) {
        var found = false;

        while(true) {
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
} 