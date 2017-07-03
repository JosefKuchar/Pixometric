import * as ArrayHelpers from "../helpers/array";

/**
 * 
 * @todo Add possibility to change Chunk dimenstions
 * @export
 * @class Chunk
 */
export default class Chunk {
    /**
     * Creates an instance of Chunk.
     * @param {Number} x 
     * @param {Number} y 
     * @memberof Chunk
     */
    constructor(x, y) {
        // 16x16x16
        this.voxels = ArrayHelpers.generateFilled(4096, 1);
        this.sprites = [];
        this.x = x;
        this.y = y;
    }
}