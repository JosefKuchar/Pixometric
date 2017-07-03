import Chunk from "./chunk";
import * as ArrayHelpers from "../helpers/array";

export default class World {
    /**
     * Creates an instance of World.
     * @todo Rotation
     * @todo Occulusion culling
     * @todo Frustrum culling
     * @todo Top-down view
     * @memberof World
     */
    constructor() {
        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, Chunk);
    }

    /**
     * Generate PIXI sprites from Area of Interest
     * @memberof World
     */
    generateSprites() {
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
                        var voxelY = (Math.floor(i / 16)) % 16;
                        var voxelX = Math.floor(i / (16 * 16));

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
} 