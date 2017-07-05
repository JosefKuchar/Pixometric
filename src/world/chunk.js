import * as ArrayHelpers from "../helpers/array";

/**
 * Segment of World
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
        this.voxels = ArrayHelpers.generateFilled(Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.SIZE * Pixometric.config.CHUNK.HEIGHT, 1);
        this.sprites = [];
        this.x = x;
        this.y = y;
    }
}