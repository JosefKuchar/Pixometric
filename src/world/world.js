import Chunk from "./chunk";
import occlusionCulling from "./manipulation/occulusion-culling";
import generateSprites from "./manipulation/generate-sprites";
import rotate from "./manipulation/rotate";
import * as ArrayHelpers from "../helpers/array";

export default class World {
    /**
     * Creates an instance of World.
     * @todo Add option to disable rotation for better performance
     * @todo Frustrum culling
     * @todo Top-down view
     * @param {Function} loadChunkCB Callback loading function
     * @memberof World
     */
    constructor(loadChunkCB) {
        // Area of Interest, size need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2D(3, 3);

        // Rotation of world, 0 - 3
        this.rotation = 3;

        // Store reference of chunk loader
        this.loadChunkCB = loadChunkCB;
        
        // Load initial chunks
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
    occlusionCulling() {
        occlusionCulling(this.aoL);
    }

    /**
     * Generate PIXI sprites from Area of Interest
     * 
     * @memberof World
     */
    generateSprites() {
        generateSprites(this.aoL, this.rotation);
    }

    /**
     * Rotate world
     * 
     * @param {Number} rotation 
     * @memberof World
     */
    rotate(rotation) {
        this.rotation = rotation;
        rotate(this.aoL, this.rotation);
    }
}