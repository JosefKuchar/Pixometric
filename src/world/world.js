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
     * @memberof World
     */
    constructor() {
        // Area of Interest, need to be recalculated after zooming
        this.aoL = ArrayHelpers.generate2DFilledClasses(3, 3, Chunk);

        // 0 - 3
        this.rotation = 3;
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