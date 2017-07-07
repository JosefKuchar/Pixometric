
/**
 * Cull none visible voxels (behind each other)
 * 
 * @export
 * @param {Chunk[][]} aoL 
 */
export default function occlusionCulling(aoL) {
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