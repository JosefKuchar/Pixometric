import Chunk from "./chunk";
import * as ArrayHelpers from "../helpers/array";

export default class World {
    /**
     * Creates an instance of World.
     * @todo Add option to disable rotation for better performance
     * @todo Occulusion culling
     * @todo Frustrum culling
     * @todo Top-down view
     * @todo Optimize rotation
     * @memberof World
     */
    constructor() {
        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, Chunk);
        
        // 0 - 3
        this.rotation = 0;
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
                    var voxelZ = i % 16;
                    var voxelY = (Math.floor(i / 16)) % 16;
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

                    var voxelIndex = voxelZ + tmpY*16 + tmpX*16*16;

                    // Get voxel block value
                    var voxelValue = this.aoL[chunkX][chunkY].voxels[voxelIndex];

                    // Check if current voxel is not air
                    if (voxelValue != 0) {
                        // Calculate sprite position
                        var spriteX = ((voxelX - voxelY) + (x - y) * 16) * (32 / 2);
                        var spriteY = ((voxelX + voxelY) + (x + y) * 16) * (32 / 4) - voxelZ * (32 / 2);
                        
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
     * 
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
        // 
    }
} 